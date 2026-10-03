import "server-only";

import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { ClewChatMessage, ClewConversationView, ClewErrorCode } from "@/types/clew";
import { buildClewChatModelMessages, type ClewChatContext } from "./chat-prompt";
import { createClewChatProviderFromEnv } from "./chat-provider";
import { ClewProviderConfigError } from "./providers/model-config";
import {
  CLEW_CHAT_MESSAGE_MAX_CHARS,
  appendClewChatMessage,
} from "./conversation";
import {
  loadClewConversationMessages,
  loadClewKnowledgePointContext,
  listChapterKnowledgePointTitles,
  saveClewConversationMessages,
} from "./knowledge-points";
import { loadClewAccountLessonStyle, loadClewLesson } from "./lesson";
import { isClewDocx } from "./source-label";
import { readClewKnowledgePointExcerpt } from "./source-excerpt";

/**
 * Clew 讲解对话编排（server-only，每轮一次模型调用）。
 * 上下文 = 该知识点讲义 + 教材原文片段 + 本章已萃取知识点清单；历史由服务端从库中读取。
 * 提问先落库（不会丢失），回答成功后再落库；失败如实报错且不保存半截回答。
 */

/** 用户单轮提问长度上限。 */
export const CLEW_CHAT_QUESTION_MAX_CHARS = 1000;

export type ClewChatSuccess = {
  ok: true;
  conversation: ClewConversationView;
  notes: string[];
};

export type ClewChatFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewChatResult = ClewChatSuccess | ClewChatFailure;

export type ClewChatRequest = {
  userId: string;
  kpId: string;
  message: string;
  onDelta: (text: string) => void;
};

export async function sendClewKnowledgePointMessage(
  input: ClewChatRequest,
): Promise<ClewChatResult> {
  const question = input.message.trim();
  if (question.length === 0) {
    return { ok: false, status: 400, code: "invalid-request", message: "请输入要追问的问题。" };
  }
  if (question.length > CLEW_CHAT_QUESTION_MAX_CHARS) {
    return {
      ok: false,
      status: 400,
      code: "invalid-request",
      message: `提问过长（${question.length} 字），请控制在 ${CLEW_CHAT_QUESTION_MAX_CHARS} 字以内。`,
    };
  }

  const context = await loadClewKnowledgePointContext(input.userId, input.kpId);
  if (!context.ok) {
    return { ok: false, status: context.status, code: context.code, message: context.message };
  }
  const { knowledgePoint, chapter, textbook } = context.data;

  // ZCODE-M4 多模型：显式配置了未实现 provider / 非法 baseURL → 明确报错
  let provider: Awaited<ReturnType<typeof createClewChatProviderFromEnv>>;
  try {
    provider = await createClewChatProviderFromEnv();
  } catch (error) {
    if (error instanceof ClewProviderConfigError) {
      return { ok: false, status: 503, code: "chat-failed", message: error.message };
    }
    throw error;
  }
  if (!provider) {
    return {
      ok: false,
      status: 503,
      code: "chat-failed",
      message: "未配置讲解模型（DASHSCOPE_API_KEY / CLEW_EXTRACT_PROVIDER），讲解对话暂不可用。",
    };
  }

  const quotas = await computeUserQuotas(input.userId);
  const quotaItem = quotas.quotas.clewChats;
  if (!canUseResource(quotaItem)) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: `${getQuotaLabel("clewChats")} 已用完（${quotaItem.used}/${quotaItem.limit}），本轮提问已停止。可升级会员档位，或等待额度重置后重试。`,
    };
  }

  const notes: string[] = [];
  const history = await loadClewConversationMessages(input.userId, input.kpId);
  const lesson = await loadClewLesson(input.kpId);
  const chapterKnowledgePointTitles = await listChapterKnowledgePointTitles(chapter.id);

  // 原文片段优先复用讲义生成时保存的片段（避免每轮重解析 PDF）；缺失时才按 sourcePage 现读
  let sourceExcerpt = lesson?.sourceExcerpt && lesson.sourceExcerpt.length > 0
    ? lesson.sourceExcerpt
    : null;
  if (!sourceExcerpt) {
    const excerptResult = await readClewKnowledgePointExcerpt({
      storageKey: textbook.storageKey,
      fileName: textbook.fileName,
      chapterTitle: chapter.title,
      sourcePage: knowledgePoint.sourcePage,
      chapterPageStart: chapter.pageStart,
      chapterPageEnd: chapter.pageEnd,
    });
    if (excerptResult.ok) {
      sourceExcerpt = excerptResult.excerpt;
    } else {
      notes.push(`未取得教材原文片段（${excerptResult.message}），本次回答仅依据讲义与知识点信息。`);
    }
  }
  const locator = isClewDocx(textbook.fileName) ? "页码待确认的" : `第 ${knowledgePoint.sourcePage} 页附近`;
  notes.push(
    lesson
      ? `上下文：讲义 + ${locator}原文 + 本章 ${chapterKnowledgePointTitles.length} 个知识点。`
      : `上下文：${locator}原文 + 本章 ${chapterKnowledgePointTitles.length} 个知识点（该知识点尚未生成讲义）。`,
  );

  // 提问先落库：即使模型失败，学生的问题也不会丢
  const withQuestion = appendClewChatMessage(history, {
    role: "user",
    content: question,
    createdAt: new Date().toISOString(),
  });
  await saveClewConversationMessages(input.userId, input.kpId, withQuestion);

  const chatContext: ClewChatContext = {
    textbookTitle: textbook.title,
    chapterTitle: chapter.title,
    knowledgePoint,
    chapterKnowledgePointTitles,
    lessonMarkdown: lesson?.view.contentMd ?? null,
    sourceExcerpt,
    fileName: textbook.fileName,
    style: await loadClewAccountLessonStyle(input.userId),
  };

  let modelOutcome: "success" | "failed" = "success";
  let answer = "";
  try {
    answer = await provider.streamReply(
      {
        messages: buildClewChatModelMessages(chatContext, history, question),
        question,
      },
      input.onDelta,
    );
  } catch (error) {
    modelOutcome = "failed";
    const message = error instanceof Error ? error.message : "未知错误";
    console.error("[clew] 讲解对话模型调用失败", error);
    return {
      ok: false,
      status: 503,
      code: "chat-failed",
      message: `本次讲解失败：${message}。本轮回答未保存（提问已保留），可稍后重试。`,
    };
  } finally {
    try {
      await recordServerUsage(input.userId, "clewChats");
      await prisma.eventLog.create({
        data: {
          event: "clew_kp_chat",
          userId: input.userId,
          props: {
            kpId: input.kpId,
            chapterOrder: chapter.order,
            provider: provider.id,
            model: provider.model,
            outcome: modelOutcome,
            questionChars: question.length,
            answerChars: answer.length,
          },
        },
      });
    } catch (error) {
      console.error("[clew] 讲解对话用量记录失败", error);
      notes.push("提示：本轮对话的配额计数写入失败，已记录服务端日志。");
    }
  }

  const finalMessages: ClewChatMessage[] = appendClewChatMessage(withQuestion, {
    role: "assistant",
    content: answer.slice(0, CLEW_CHAT_MESSAGE_MAX_CHARS),
    createdAt: new Date().toISOString(),
  });
  await saveClewConversationMessages(input.userId, input.kpId, finalMessages);

  return { ok: true, conversation: { kpId: input.kpId, messages: finalMessages }, notes };
}