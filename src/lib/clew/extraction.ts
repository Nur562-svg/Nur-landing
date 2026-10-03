import "server-only";

import { prisma } from "@/lib/prisma";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import type { MembershipTier } from "@/types/auth";
import type { HiDocChapterView, HiDocErrorCode, HiDocKnowledgePointView } from "@/types/hidoc";
import { buildChapterModelText, type HiDocKnowledgePointDraft } from "./extraction-heuristic";
import { createHiDocExtractProviderFromEnv } from "./extraction-provider";
import { pdfTextItemsToLines } from "./toc-heuristic";
import { openHiDocPdf, readHiDocPdfPageRange } from "./pdf-document";
import { getHiDocStorage } from "./storage";
import { readHiDocSource, sliceDocxChapter } from "./source-intake";
import { isHiDocDocx } from "./source-label";
import {
  getHiDocTextbookDetail,
  replaceChapterKnowledgePoints,
  type HiDocChapterServiceResult,
} from "./chapters";

/**
 * Hi doc 知识点萃取编排（server-only，单章一次模型调用）。
 * 进度事件对齐「精读章节 → 逐知识点写入」的心智模型；0 结果与失败都如实上报，绝不伪造知识点。
 */

export type HiDocExtractProgressEvent = {
  stage: "read" | "extracting" | "save";
  chapterIndex?: number;
  chapterTotal?: number;
  message: string;
};

export type HiDocExtractSuccess = {
  ok: true;
  chapter: HiDocChapterView;
  knowledgePoints: HiDocKnowledgePointView[];
  notes: string[];
};

export type HiDocExtractFailure = {
  ok: false;
  status: number;
  code: HiDocErrorCode;
  message: string;
};

export type HiDocExtractResult = HiDocExtractSuccess | HiDocExtractFailure;

export type HiDocExtractInput = {
  userId: string;
  tier: MembershipTier;
  textbookId: string;
  chapterOrder: number;
  onProgress: (event: HiDocExtractProgressEvent) => void;
  /** 每写入一个知识点调用（落库后按序回放）。 */
  onKnowledgePoint: (knowledgePoint: HiDocKnowledgePointView) => void;
};

export async function extractHiDocChapterKnowledgePoints(
  input: HiDocExtractInput,
): Promise<HiDocExtractResult> {
  const { onProgress } = input;
  const notes: string[] = [];

  // 章节归属与当前状态
  const detail = await getHiDocTextbookDetail(input.userId, input.textbookId);
  if (!detail.ok) {
    return { ok: false, status: detail.status, code: detail.code, message: detail.message };
  }
  const chapter = detail.data.chapters.find((row) => row.order === input.chapterOrder);
  if (!chapter) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在，请先识别或修正目录。" };
  }

  const file = await loadTextbookFile(input.userId, input.textbookId);
  if (!file) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  let bytes: Uint8Array;
  try {
    bytes = await getHiDocStorage().readObject(file.storageKey);
  } catch (error) {
    console.error("[hidoc] 萃取读取教材文件失败", error);
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: "教材文件读取失败，请稍后重试。",
    };
  }

  const docx = isHiDocDocx(file.fileName);
  let chapterText = "";
  let truncated = false;
  let release: (() => Promise<void>) | null = null;

  if (docx) {
    onProgress({ stage: "read", message: `读取《${chapter.title}》（页码待确认）…` });
    const read = await readHiDocSource(file.fileName, bytes.slice());
    if (!read.ok) {
      return { ok: false, status: 422, code: "extraction-failed", message: read.message };
    }
    chapterText = `【出处】页码待确认。\n${sliceDocxChapter(read.html, chapter.title)}`;
    notes.push("DOCX 无印刷页码，知识点出处记为待确认。");
  } else {
    onProgress({ stage: "read", message: `读取《${chapter.title}》（第 ${chapter.pageStart}–${chapter.pageEnd} 页）…` });
    const runtime = await openHiDocPdf(bytes);
    if (!runtime.ok) {
      return { ok: false, status: 422, code: "pdf-unreadable", message: runtime.message };
    }
    release = () => runtime.release();
    try {
      const pages = await readHiDocPdfPageRange(runtime.document, {
        fromPage: chapter.pageStart,
        toPage: chapter.pageEnd,
        itemsToLines: pdfTextItemsToLines,
      });
      const built = buildChapterModelText(pages);
      chapterText = built.text;
      truncated = built.truncated;
    } catch (error) {
      await release();
      return {
        ok: false,
        status: 422,
        code: "pdf-unreadable",
        message: `PDF 无法读取章节文字：${error instanceof Error ? error.message : "未知错误"}`,
      };
    }
  }

  let drafts: HiDocKnowledgePointDraft[];
  try {
    const truncatedNote = truncated;
    if (truncatedNote) {
      notes.push(`该章文字较长，仅前 ${chapterText.length.toLocaleString("zh-CN")} 字进入本次精读（按页截断）。`);
    }
    if (chapterText.replace(/\s+/g, "").length < 40) {
      return {
        ok: false,
        status: 422,
        code: "extraction-failed",
        message: `《${chapter.title}》的文字层内容过少（约 ${chapterText.replace(/\s+/g, "").length} 字），无法萃取知识点。`,
      };
    }

    const provider = await createHiDocExtractProviderFromEnv();
    if (!provider) {
      return {
        ok: false,
        status: 503,
        code: "extraction-failed",
        message: "未配置萃取模型（DASHSCOPE_API_KEY / HIDOC_EXTRACT_PROVIDER），知识点萃取暂不可用。",
      };
    }

    const quotas = await computeUserQuotas(input.userId);
    const quotaItem = quotas.quotas.hidocExtracts;
    if (!canUseResource(quotaItem)) {
      return {
        ok: false,
        status: 503,
        code: "quota-exceeded",
        message: `${getQuotaLabel("hidocExtracts")} 已用完（${quotaItem.used}/${quotaItem.limit}），本次萃取已停止。可升级会员档位，或等待额度重置后重试。`,
      };
    }

    let modelOutcome: "success" | "failed" = "success";
    let modelPointCount = 0;
    let modelDroppedCount = 0;
    let modelDroppedPrerequisiteCount = 0;
    try {
      onProgress({ stage: "extracting", message: `精读《${chapter.title}》并萃取知识点（${provider.model}）…` });
      const output = await provider.extractKnowledgePoints({
        textbookTitle: detail.data.textbook.title,
        chapterTitle: chapter.title,
        chapterPageStart: chapter.pageStart,
        chapterPageEnd: chapter.pageEnd,
        chapterText,
      });
      drafts = output.knowledgePoints;
      modelPointCount = output.knowledgePoints.length;
      modelDroppedCount = output.droppedCount;
      modelDroppedPrerequisiteCount = output.droppedPrerequisiteCount;
      notes.push(docx
        ? `来源：模型萃取（${provider.id} · ${provider.model}，${drafts.length} 个知识点，出处待确认）。`
        : `来源：模型萃取（${provider.id} · ${provider.model}，${drafts.length} 个知识点，页码可溯源）。`);
      if (modelDroppedCount > 0) {
        notes.push(`丢弃了 ${modelDroppedCount} 条未通过校验的模型条目（页码越界/字段缺失等）。`);
      }
      if (modelDroppedPrerequisiteCount > 0) {
        notes.push(`丢弃了 ${modelDroppedPrerequisiteCount} 条无法在同章对上的先修引用。`);
      }
    } catch (error) {
      modelOutcome = "failed";
      const message = error instanceof Error ? error.message : "未知错误";
      console.error("[hidoc] 知识点萃取模型调用失败", error);
      return {
        ok: false,
        status: 503,
        code: "extraction-failed",
        message: `知识点萃取失败：${message}。章节状态未改变，可稍后重试。`,
      };
    } finally {
      // token 已消耗：无论成败都记账（与目录解析同一原则）
      try {
        await recordServerUsage(input.userId, "hidocExtracts");
        await prisma.eventLog.create({
          data: {
            event: "hidoc_chapter_extract",
            userId: input.userId,
            props: {
              textbookId: input.textbookId,
              chapterOrder: chapter.order,
              provider: provider.id,
              model: provider.model,
              outcome: modelOutcome,
              knowledgePointCount: modelPointCount,
            },
          },
        });
      } catch (error) {
        console.error("[hidoc] 萃取用量记录失败", error);
        notes.push("提示：本次萃取的配额计数写入失败，已记录服务端日志。");
      }
    }

    onProgress({ stage: "save", message: `写入 ${drafts.length} 个知识点…` });
    const saved = await replaceChapterKnowledgePoints(input.userId, input.textbookId, chapter.order, drafts);
    if (!saved.ok) {
      return { ok: false, status: saved.status, code: saved.code, message: saved.message };
    }
    for (const knowledgePoint of saved.data) {
      input.onKnowledgePoint(knowledgePoint);
    }

    return {
      ok: true,
      chapter: {
        ...chapter,
        status: "extracted",
        knowledgePointCount: saved.data.length,
      },
      knowledgePoints: saved.data,
      notes,
    };
  } finally {
    await release?.();
  }
}

async function loadTextbookFile(
  userId: string,
  textbookId: string,
): Promise<{ storageKey: string; fileName: string } | null> {
  const row = await prisma.hiDocTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    select: { storageKey: true, fileName: true },
  });
  return row ?? null;
}

export type { HiDocChapterServiceResult };
