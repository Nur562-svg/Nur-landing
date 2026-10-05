import "server-only";

import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { ClewErrorCode, ClewNoteView } from "@/types/clew";
import { parseClewChatMessages } from "./conversation";
import { loadClewHighlightsByKnowledgePoint } from "./highlights";
import {
  CLEW_MODEL_NOTE_NOTICE,
  buildHeuristicClewNote,
  buildClewNoteHeader,
  buildClewNoteModelInput,
  validateGeneratedNote,
  type ClewNoteContext,
  type ClewNoteHighlightEntry,
  type ClewNotePoint,
} from "./note-heuristic";
import { createClewNoteProviderFromEnv } from "./note-provider";
import { ClewProviderConfigError } from "./providers/model-config";
import { normalizeLessonMarkdown, parseClewLessonGenerator } from "./lesson-heuristic";

/**
 * Clew 学霸笔记编排（server-only，按章一次调用）。
 * 聚合该章的全部讲义 + 讲解对话 + 划重点 + 批注：模型可用时流式汇总并做结构校验；
 * 未配置密钥时启发式确定性拼装并明确标注「未接入模型」（不占模型额度）。
 * 笔记只汇总真实存在的学习痕迹，缺失小节如实略去，不编造「你曾问到…」。
 */

/** 每个知识点进入笔记的追问条数上限（超出取最近若干条并如实说明）。 */
export const CLEW_NOTE_QUESTIONS_PER_KP = 10;

export type ClewNoteProgressEvent = {
  stage: "collect" | "generating" | "save";
  message: string;
};

export type ClewNoteSuccess = {
  ok: true;
  note: ClewNoteView;
  notes: string[];
};

export type ClewNoteFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewNoteResult = ClewNoteSuccess | ClewNoteFailure;

export type ClewNoteRequest = {
  userId: string;
  textbookId: string;
  chapterOrder: number;
  onProgress: (event: ClewNoteProgressEvent) => void;
  onDelta: (text: string) => void;
};

export type ClewNoteRow = {
  chapterId: string;
  contentMd: string;
  generator: string;
  generatedAt: Date;
};

/** 学霸笔记数据库行 → 对外视图。 */
export function toClewNoteView(row: ClewNoteRow): ClewNoteView {
  return {
    chapterId: row.chapterId,
    contentMd: row.contentMd,
    generator: parseClewLessonGenerator(row.generator),
    generatedAt: row.generatedAt.toISOString(),
  };
}

/** 读取某用户在某章的学霸笔记（不存在返回 null）。 */
export async function loadClewChapterNote(
  userId: string,
  chapterId: string,
): Promise<ClewNoteView | null> {
  const row = await prisma.clewNote.findUnique({
    where: { userId_chapterId: { userId, chapterId } },
    select: { chapterId: true, contentMd: true, generator: true, generatedAt: true },
  });
  return row ? toClewNoteView(row) : null;
}

function formatGeneratedAtLabel(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export async function generateClewChapterNote(input: ClewNoteRequest): Promise<ClewNoteResult> {
  const textbook = await prisma.clewTextbook.findFirst({
    where: { id: input.textbookId, userId: input.userId, deletedAt: null },
    select: { id: true, title: true, fileName: true },
  });
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const chapters = await prisma.clewChapter.findMany({
    where: { textbookId: textbook.id },
    orderBy: { order: "asc" },
    select: { id: true, order: true, title: true, pageStart: true, pageEnd: true },
  });
  const chapter = chapters.find((row) => row.order === input.chapterOrder);
  if (!chapter) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在，请先识别或修正目录。" };
  }

  const knowledgePointRows = await prisma.clewKnowledgePoint.findMany({
    where: { chapterId: chapter.id },
    orderBy: { order: "asc" },
    include: { lesson: { select: { contentMd: true } } },
  });
  if (knowledgePointRows.length === 0) {
    return {
      ok: false,
      status: 422,
      code: "note-failed",
      message: "本章尚未萃取知识点，无法生成学霸笔记。请先在教材详情页对本章运行「萃取知识点」。",
    };
  }

  input.onProgress({
    stage: "collect",
    message: `读取《${chapter.title}》的讲义、追问与划重点…`,
  });

  const kpIds = knowledgePointRows.map((row) => row.id);
  const conversationRows = await prisma.clewConversation.findMany({
    where: { userId: input.userId, kpId: { in: kpIds } },
    select: { kpId: true, messages: true },
  });
  const questionsByKp = new Map<string, string[]>();
  for (const row of conversationRows) {
    if (!row.kpId) {
      continue;
    }
    const questions = parseClewChatMessages(row.messages)
      .filter((message) => message.role === "user")
      .map((message) => message.content);
    questionsByKp.set(row.kpId, questions);
  }
  const highlightsByKp = await loadClewHighlightsByKnowledgePoint(input.userId, kpIds);

  const notes: string[] = [];
  let questionCount = 0;
  let highlightCount = 0;
  const points: ClewNotePoint[] = knowledgePointRows.map((row) => {
    const allQuestions = questionsByKp.get(row.id) ?? [];
    if (allQuestions.length > CLEW_NOTE_QUESTIONS_PER_KP) {
      notes.push(
        `知识点「${row.title}」的追问较多（${allQuestions.length} 条），笔记只取最近 ${CLEW_NOTE_QUESTIONS_PER_KP} 条。`,
      );
    }
    const questions = allQuestions.slice(-CLEW_NOTE_QUESTIONS_PER_KP);
    questionCount += questions.length;
    const highlights: ClewNoteHighlightEntry[] = (highlightsByKp.get(row.id) ?? []).map((item) => ({
      quote: item.quote,
      note: item.note,
      color: item.color,
    }));
    highlightCount += highlights.length;
    return {
      id: row.id,
      order: row.order,
      title: row.title,
      description: row.description,
      keyTerms: Array.isArray(row.keyTerms)
        ? row.keyTerms.filter((term): term is string => typeof term === "string")
        : [],
      sourcePage: row.sourcePage,
      lessonMarkdown: row.lesson?.contentMd ?? null,
      questions,
      highlights,
    };
  });

  const context: ClewNoteContext = {
    textbookTitle: textbook.title,
    chapterOrder: chapter.order,
    chapterTotal: chapters.length,
    chapterTitle: chapter.title,
    pageStart: chapter.pageStart,
    pageEnd: chapter.pageEnd,
    fileName: textbook.fileName,
    points,
  };

  const lessonCount = points.filter((point) => point.lessonMarkdown !== null).length;
  notes.push(
    `聚合范围：${points.length} 个知识点（${lessonCount} 份讲义）、${questionCount} 条追问、${highlightCount} 条划重点/批注。`,
  );

  const generatedAt = new Date();
  const generatedAtLabel = formatGeneratedAtLabel(generatedAt);

  let contentMd: string;
  let generator: ClewNoteView["generator"];

  // ZCODE-M4 多模型：显式配置了未实现 provider / 非法 baseURL → 明确报错，不走启发式兜底
  let provider: Awaited<ReturnType<typeof createClewNoteProviderFromEnv>>;
  try {
    provider = await createClewNoteProviderFromEnv();
  } catch (error) {
    if (error instanceof ClewProviderConfigError) {
      return { ok: false, status: 503, code: "note-failed", message: error.message };
    }
    throw error;
  }
  if (!provider) {
    generator = { kind: "heuristic" };
    notes.push(
      "未接入模型（DASHSCOPE_API_KEY / CLEW_EXTRACT_PROVIDER 未配置）：本次笔记由讲义、划重点、批注与追问确定性地汇总。",
    );
    contentMd = buildHeuristicClewNote({ context, generatedAtLabel });
  } else {
    const quotas = await computeUserQuotas(input.userId);
    const quotaItem = quotas.quotas.clewNotes;
    if (!canUseResource(quotaItem)) {
      return {
        ok: false,
        status: 503,
        code: "quota-exceeded",
        message: `${getQuotaLabel("clewNotes")} 已用完（${quotaItem.used}/${quotaItem.limit}），本次笔记生成已停止。可升级会员档位，或等待额度重置后重试。`,
      };
    }

    const modelContext = buildClewNoteModelInput(context);
    notes.push(...modelContext.notes);

    let modelOutcome: "success" | "failed" = "success";
    let answerChars = 0;
    try {
      input.onProgress({
        stage: "generating",
        message: `调用模型汇总学霸笔记（${provider.model}）…`,
      });
      const raw = await provider.generateNote(modelContext.input, input.onDelta);
      answerChars = raw.length;
      const body = normalizeLessonMarkdown(raw);
      const validation = validateGeneratedNote(body);
      if (!validation.ok) {
        modelOutcome = "failed";
        return {
          ok: false,
          status: 422,
          code: "note-failed",
          message: `模型返回的笔记结构不完整（${validation.reason}），本次生成已停止，旧笔记未被覆盖；可重试。`,
        };
      }
      generator = { kind: "model", provider: provider.id, model: provider.model };
      contentMd = [
        buildClewNoteHeader({
          title: `${chapter.title} · 学霸笔记`,
          generator,
          generatedAtLabel,
          context,
          notice: CLEW_MODEL_NOTE_NOTICE,
        }),
        body,
      ].join("\n");
      notes.push(`来源：模型生成 · ${provider.model}，结构校验通过。`);
    } catch (error) {
      modelOutcome = "failed";
      const message = error instanceof Error ? error.message : "未知错误";
      console.error("[clew] 学霸笔记模型调用失败", error);
      return {
        ok: false,
        status: 503,
        code: "note-failed",
        message: `学霸笔记生成失败：${message}。旧笔记未被覆盖，可稍后重试。`,
      };
    } finally {
      // token 已消耗：无论成败都记账（与目录解析/萃取/讲义同一原则）
      try {
        await recordServerUsage(input.userId, "clewNotes");
        await prisma.eventLog.create({
          data: {
            event: "clew_chapter_note",
            userId: input.userId,
            props: {
              textbookId: textbook.id,
              chapterOrder: chapter.order,
              provider: provider.id,
              model: provider.model,
              outcome: modelOutcome,
              noteChars: answerChars,
              knowledgePointCount: points.length,
              lessonCount,
              highlightCount,
              questionCount,
            },
          },
        });
      } catch (error) {
        console.error("[clew] 学霸笔记用量记录失败", error);
        notes.push("提示：本次笔记生成的配额计数写入失败，已记录服务端日志。");
      }
    }
  }

  input.onProgress({ stage: "save", message: "保存学霸笔记…" });
  const previous = await loadClewChapterNote(input.userId, chapter.id);
  const storedGenerator =
    generator.kind === "model" ? `model:${generator.provider}:${generator.model}` : "heuristic";
  const row = await prisma.clewNote.upsert({
    where: { userId_chapterId: { userId: input.userId, chapterId: chapter.id } },
    create: {
      userId: input.userId,
      chapterId: chapter.id,
      contentMd,
      generator: storedGenerator,
      generatedAt,
    },
    update: { contentMd, generator: storedGenerator, generatedAt },
  });

  if (previous) {
    notes.push("本次生成覆盖了此前的学霸笔记（重新生成将覆盖旧版本）。");
  }
  if (generator.kind === "heuristic") {
    // 未消耗模型 token，不占模型额度；仅记录事件便于排查
    try {
      await prisma.eventLog.create({
        data: {
          event: "clew_chapter_note",
          userId: input.userId,
          props: {
            textbookId: textbook.id,
            chapterOrder: chapter.order,
            generator: "heuristic",
            outcome: "success",
            knowledgePointCount: points.length,
            lessonCount,
            highlightCount,
            questionCount,
          },
        },
      });
    } catch (error) {
      console.error("[clew] 学霸笔记事件记录失败", error);
    }
  }

  return { ok: true, note: toClewNoteView(row), notes };
}