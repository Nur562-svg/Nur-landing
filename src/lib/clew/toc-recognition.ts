import "server-only";

import { prisma } from "@/lib/prisma";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import type { MembershipTier } from "@/types/auth";
import type { ClewChapterSource, ClewErrorCode, ClewTocStrategy } from "@/types/clew";
import {
  CLEW_TOC_SCAN_PAGE_LIMIT,
  collectTocLikePageNumbers,
  normalizeChapterEntries,
  pageTextMatchesTitle,
  parsePrintedTocPages,
  pdfTextItemsToLines,
  resolveConsensusOffset,
  selectOutlineChapters,
  type ClewChapterDraft,
  type ClewPrintedTocEntry,
} from "./toc-heuristic";
import {
  CLEW_TOC_TEXT_MAX_CHARS,
  createClewTocProviderFromEnv,
} from "./toc-provider";
import { ClewProviderConfigError } from "./providers/model-config";
import {
  openClewPdf,
  readClewPdfOutline,
  readClewPdfPageTexts,
  type ClewPdfDocument,
} from "./pdf-document";
import { getClewStorage } from "./storage";
import { chaptersFromDocxHtml, readClewSource } from "./source-intake";
import { isClewDocx } from "./source-label";

/**
 * Clew 目录识别编排（server-only）。
 * 确定性优先：PDF 书签 → 印刷目录页启发式 → （仅在启发式不足时）模型辅助。
 * 每一步都通过 onProgress 汇报；识别不到就如实失败，绝不编造章节。
 */

export type ClewTocProgressEvent = {
  stage: "read" | "outline" | "toc-page" | "model" | "save";
  message: string;
};

export type ClewTocRecognitionSuccess = {
  ok: true;
  chapters: ClewChapterDraft[];
  strategy: ClewTocStrategy;
  source: ClewChapterSource;
  notes: string[];
};

export type ClewTocRecognitionFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewTocRecognitionResult =
  | ClewTocRecognitionSuccess
  | ClewTocRecognitionFailure;

export type ClewTocRecognitionInput = {
  userId: string;
  tier: MembershipTier;
  textbook: {
    id: string;
    title: string;
    storageKey: string;
    pageCount: number;
    fileName: string;
  };
  onProgress: (event: ClewTocProgressEvent) => void;
};

/** 页码偏移探针：在印刷页码附近的窗口里寻找章节标题，投票出偏移。 */
const offsetProbeWindowBefore = 2;
const offsetProbeWindowAfter = 12;

async function estimatePrintedPageOffset(
  document: ClewPdfDocument,
  entries: readonly ClewPrintedTocEntry[],
  pageCount: number,
  excludedPages: ReadonlySet<number>,
): Promise<{ offset: number | null; probes: number }> {
  if (entries.length === 0) {
    return { offset: null, probes: 0 };
  }

  const probeIndexes = [...new Set([0, Math.floor(entries.length / 2), entries.length - 1])];
  const probes = probeIndexes.map((index) => entries[index]).filter((entry) => entry !== undefined);
  const pageCache = new Map<number, string[]>();
  const candidates: (number | null)[] = [];

  const readLines = async (pageNumber: number): Promise<string[]> => {
    const cached = pageCache.get(pageNumber);
    if (cached) {
      return cached;
    }
    const page = await document.getPage(pageNumber);
    const textContent = await page.getTextContent({ includeMarkedContent: false });
    const lines = pdfTextItemsToLines(
      textContent.items as readonly { str?: string; hasEOL?: boolean }[],
    );
    pageCache.set(pageNumber, lines);
    return lines;
  };

  for (const probe of probes) {
    let found: number | null = null;
    const from = Math.max(1, probe.pageNumber - offsetProbeWindowBefore);
    const to = Math.min(pageCount, probe.pageNumber + offsetProbeWindowAfter);
    for (let pageNumber = from; pageNumber <= to; pageNumber += 1) {
      // 目录页自身也含章节标题，必须排除，否则偏移投票会被污染
      if (excludedPages.has(pageNumber)) {
        continue;
      }
      const lines = await readLines(pageNumber);
      if (pageTextMatchesTitle(lines, probe.title)) {
        found = pageNumber - probe.pageNumber;
        break;
      }
    }
    candidates.push(found);
  }

  return { offset: resolveConsensusOffset(candidates), probes: probes.length };
}

async function recognizeFromOutline(
  document: ClewPdfDocument,
  pageCount: number,
  notes: string[],
): Promise<ClewChapterDraft[] | null> {
  const outline = await readClewPdfOutline(document);
  const selection = selectOutlineChapters(outline);
  if (selection.entries.length < 2) {
    if (outline.length > 0) {
      notes.push(`书签不可用（共 ${outline.length} 条，可用一级/章级条目不足 2 条）。`);
    }
    return null;
  }

  const { chapters, droppedCount } = normalizeChapterEntries(selection.entries, pageCount);
  if (chapters.length < 2) {
    return null;
  }

  const basisLabel = selection.basis === "chapter-title"
    ? "章标题匹配"
    : selection.basis === "part-title"
    ? "篇标题匹配"
    : `层级 ${selection.level} 兜底`;
  notes.push(`来源：PDF 书签（${selection.entries.length} 条，${basisLabel}）。`);
  if (selection.ignoredCount > 0) {
    notes.push(`忽略了 ${selection.ignoredCount} 条次级/未定位书签条目。`);
  }
  if (droppedCount > 0) {
    notes.push(`丢弃了 ${droppedCount} 条越界或重复书签。`);
  }
  return chapters;
}

export async function recognizeClewToc(
  input: ClewTocRecognitionInput,
): Promise<ClewTocRecognitionResult> {
  const { onProgress } = input;
  const notes: string[] = [];

  onProgress({ stage: "read", message: "读取教材文件…" });
  let bytes: Uint8Array;
  try {
    bytes = await getClewStorage().readObject(input.textbook.storageKey);
  } catch (error) {
    console.error("[clew] 目录识别读取教材文件失败", error);
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: "教材文件读取失败，请稍后重试；若持续失败请联系管理员。",
    };
  }

  if (isClewDocx(input.textbook.fileName)) {
    onProgress({ stage: "read", message: "读取 DOCX 文字（页码待确认）…" });
    const read = await readClewSource(input.textbook.fileName, bytes.slice());
    if (!read.ok) {
      return { ok: false, status: 422, code: read.code, message: read.message };
    }
    const chapters = chaptersFromDocxHtml(read.html, input.textbook.title);
    notes.push("DOCX 没有印刷页码，章节位置记为待确认。");
    return {
      ok: true,
      chapters,
      strategy: "docx-heading",
      source: "docx-heading",
      notes,
    };
  }

  const runtime = await openClewPdf(bytes);
  if (!runtime.ok) {
    return { ok: false, status: 422, code: "pdf-unreadable", message: runtime.message };
  }

  try {
    const document = runtime.document;
    const pageCount = document.numPages;
    if (pageCount !== input.textbook.pageCount) {
      notes.push(`PDF 实际页数 ${pageCount} 与记录 ${input.textbook.pageCount} 不一致，以文件为准。`);
    }

    onProgress({ stage: "outline", message: "检查 PDF 书签…" });
    const outlineChapters = await recognizeFromOutline(document, pageCount, notes);
    if (outlineChapters) {
      return { ok: true, chapters: outlineChapters, strategy: "outline", source: "outline", notes };
    }
    onProgress({ stage: "toc-page", message: "书签不可用，扫描前 15 页找目录页…" });

    const pages = await readClewPdfPageTexts(document, {
      maxPages: CLEW_TOC_SCAN_PAGE_LIMIT,
      itemsToLines: pdfTextItemsToLines,
    });
    const printed = parsePrintedTocPages(pages, pageCount);
    let entries = printed.entries;
    let strategy: ClewTocStrategy = entries.length >= 2 ? "toc-page" : "none";
    let source: ClewChapterSource = "toc-page";
    let offset: number | null = null;

    if (entries.length >= 2) {
      notes.push(
        `来源：印刷目录页（第 ${printed.tocPageNumbers.join("、")} 页，解析到 ${entries.length} 条一级章节）。`,
      );
      if (printed.ignoredCount > 0) {
        notes.push(`忽略了 ${printed.ignoredCount} 行次级条目或无页码行。`);
      }
    } else {
      notes.push("印刷目录页未解析到足够的章节行。");
    }

    if (strategy === "none") {
      onProgress({ stage: "model", message: "启发式未成功，尝试模型辅助识别…" });
      const tocText = pages
        .flatMap((page) => page.lines)
        .join("\n")
        .slice(0, CLEW_TOC_TEXT_MAX_CHARS);
      // ZCODE-M4 多模型：显式配置了未实现 provider / 非法 baseURL → 明确报错，
      // 不静默回落到纯启发式结果（与「未配置密钥 → 仅启发式」的既有分支区分）
      let provider: Awaited<ReturnType<typeof createClewTocProviderFromEnv>>;
      try {
        provider = await createClewTocProviderFromEnv();
      } catch (error) {
        if (error instanceof ClewProviderConfigError) {
          return { ok: false, status: 503, code: "server-error", message: error.message };
        }
        throw error;
      }
      if (!provider) {
        notes.push("未配置目录解析模型（DASHSCOPE_API_KEY / CLEW_TOC_PROVIDER），本次仅完成启发式识别。");
      } else if (tocText.replace(/\s+/g, "").length < 40) {
        notes.push("前 15 页文字层内容过少，未调用模型。");
      } else {
        const quotas = await computeUserQuotas(input.userId);
        const quotaItem = quotas.quotas.clewParses;
        if (!canUseResource(quotaItem)) {
          return {
            ok: false,
            status: 503,
            code: "quota-exceeded",
            message: `${getQuotaLabel("clewParses")} 已用完（${quotaItem.used}/${quotaItem.limit}），模型辅助识别已停止。可升级会员档位，或等待额度重置后重试。`,
          };
        }
        let modelOutcome: "success" | "failed" | null = null;
        let modelChapterCount = 0;
        try {
          onProgress({ stage: "model", message: `调用 ${provider.model} 解析目录页…` });
          const modelEntries = await provider.parseToc({
            textbookTitle: input.textbook.title,
            pageCount,
            tocText,
          });
          entries = modelEntries;
          strategy = "model";
          source = "model";
          modelOutcome = "success";
          modelChapterCount = entries.length;
          notes.push(`来源：模型解析 · ${provider.model}，${entries.length} 条一级章节。`);
        } catch (error) {
          const message = error instanceof Error ? error.message : "未知错误";
          console.error("[clew] 目录解析模型调用失败", error);
          modelOutcome = "failed";
          notes.push(`模型解析失败：${message}（已保留启发式结果）。`);
          onProgress({ stage: "model", message: "模型解析失败，回退到启发式结果。" });
        }

        // token 已经消耗：无论模型是否给出可用结果，都要记账（不静默放过成本）
        if (modelOutcome) {
          try {
            await recordServerUsage(input.userId, "clewParses");
            await prisma.eventLog.create({
              data: {
                event: "clew_toc_parse",
                userId: input.userId,
                props: {
                  textbookId: input.textbook.id,
                  provider: provider.id,
                  model: provider.model,
                  outcome: modelOutcome,
                  chapterCount: modelChapterCount,
                },
              },
            });
          } catch (error) {
            console.error("[clew] 目录解析用量记录失败", error);
            notes.push("提示：本次模型调用的配额计数写入失败，已记录服务端日志。");
          }
        }
      }
    }

    if (entries.length < 2) {
      return {
        ok: false,
        status: 422,
        code: "no-toc",
        message:
          "未能从这本 PDF 识别出章节：没有可用书签，前 15 页也没有解析到目录行。请确认上传的是含目录的完整教材，或稍后人工录入章节。",
      };
    }

    if (strategy === "toc-page" || strategy === "model") {
      onProgress({ stage: "toc-page", message: "校验印刷页码与 PDF 页序的偏移…" });
      try {
        const tocLikePages = collectTocLikePageNumbers(pages, pageCount);
        const offsetResult = await estimatePrintedPageOffset(document, entries, pageCount, tocLikePages);
        offset = offsetResult.offset;
        if (offset === null) {
          notes.push("未能校验印刷页码偏移（探针未取得一致结果），页码按印刷值直接映射，请人工核对。");
        } else if (offset === 0) {
          notes.push(`页码偏移校验通过（${offsetResult.probes} 个探针命中，偏移 0）。`);
        } else {
          notes.push(
            `印刷页码 → PDF 页序偏移 ${offset > 0 ? "+" : ""}${offset}（${offsetResult.probes} 个探针校验）。`,
          );
        }
      } catch (error) {
        console.error("[clew] 页码偏移校验失败", error);
        notes.push("页码偏移校验失败，已按印刷页码直接映射，请人工核对。");
      }
    }

    const shiftedEntries = offset === null || offset === 0
      ? entries
      : entries.map((entry) => ({ title: entry.title, pageNumber: entry.pageNumber + offset }));
    const { chapters, droppedCount } = normalizeChapterEntries(shiftedEntries, pageCount);
    if (droppedCount > 0) {
      notes.push(`丢弃了 ${droppedCount} 条越界或重复条目。`);
    }
    if (chapters.length < 2) {
      return {
        ok: false,
        status: 422,
        code: "no-toc",
        message: "识别结果不足 2 个有效章节，已放弃写入；请人工录入章节或检查教材文件。",
      };
    }

    return { ok: true, chapters, strategy, source, notes };
  } finally {
    await runtime.release();
  }
}