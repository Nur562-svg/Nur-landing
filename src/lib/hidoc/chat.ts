import "server-only";

import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { HiDocChatMessage, HiDocConversationView, HiDocErrorCode } from "@/types/hidoc";
import { buildHiDocChatModelMessages, type HiDocChatContext } from "./chat-prompt";
import { createHiDocChatProviderFromEnv } from "./chat-provider";
import {
  HIDOC_CHAT_MESSAGE_MAX_CHARS,
  appendHiDocChatMessage,
} from "./conversation";
import {
  loadHiDocConversationMessages,
  loadHiDocKnowledgePointContext,
  listChapterKnowledgePointTitles,
  saveHiDocConversationMessages,
} from "./knowledge-points";
import { loadHiDocAccountLessonStyle, loadHiDocLesson } from "./lesson";
import { readHiDocKnowledgePointExcerpt } from "./source-excerpt";

/**
 * Hi doc 讲解对话编排（server-only，每轮一次模型调用）。
 * 上下文 = 该知识点讲义 + 教材原文片段 + 本章已萃取知识点清单；历史由服务端从库中读取。
 * 提问先落库（不会丢失），回答成功后再落库；失败如实报错且不保存半截回答。
 */

/** 用户单轮提问长度上限。 */
export const HIDOC_CHAT_QUESTION_MAX_CHARS = 1000;

export type HiDocChatSuccess = {
  ok: true;
  conversation: HiDocConversationView;
  notes: string[];
};

export type HiDocChatFailure = {
  ok: false;
  status: number;
  code: HiDocErrorCode;
  message: string;
};

export type HiDocChatResult = HiDocChatSuccess | HiDocChatFailure;

export type HiDocChatRequest = {
  userId: string;
  kpId: string;
  message: string;
  onDelta: (text: string) => void;
};

export async function sendHiDocKnowledgePointMessage(
  input: HiDocChatRequest,
): Promise<HiDocChatResult> {
  const question = input.message.trim();
  if (question.length === 0) {
    return { ok: false, status: 400, code: "invalid-request", message: "请输入要追问的问题。" };
  }
  if (question.length > HIDOC_CHAT_QUESTION_MAX_CHARS) {
    return {
      ok: false,
      status: 400,
      code: "invalid-request",
      message: `提问过长（${question.length} 字），请控制在 ${HIDOC_CHAT_QUESTION_MAX_CHARS} 字以内。`,
    };
  }

  const context = await loadHiDocKnowledgePointContext(input.userId, input.kpId);
  if (!context.ok) {
    return { ok: false, status: context.status, code: context.code, message: context.message };
  }
  const { knowledgePoint, chapter, textbook } = context.data;

  const provider = await createHiDocChatProviderFromEnv();
  if (!provider) {
    return {
      ok: false,
      status: 503,
      code: "chat-failed",
      message: "未配置讲解模型（DASHSCOPE_API_KEY / HIDOC_EXTRACT_PROVIDER），讲解对话暂不可用。",
    };
  }

  const quotas = await computeUserQuotas(input.userId);
  const quotaItem = quotas.quotas.hidocChats;
  if (!canUseResource(quotaItem)) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: `${getQuotaLabel("hidocChats")} 已用完（${quotaItem.used}/${quotaItem.limit}），本轮提问已停止。可升级会员档位，或等待额度重置后重试。`,
    };
  }

  const notes: string[] = [];
  const history = await loadHiDocConversationMessages(input.userId, input.kpId);
  const lesson = await loadHiDocLesson(input.kpId);
  const chapterKnowledgePointTitles = await listChapterKnowledgePointTitles(chapter.id);

  // 原文片段优先复用讲义生成时保存的片段（避免每轮重解析 PDF）；缺失时才按 sourcePage 现读
  let sourceExcerpt = lesson?.sourceExcerpt && lesson.sourceExcerpt.length > 0
    ? lesson.sourceExcerpt
    : null;
  if (!sourceExcerpt) {
    const excerptResult = await readHiDocKnowledgePointExcerpt({
      storageKey: textbook.storageKey,
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
  notes.push(
    lesson
      ? `上下文：讲义 + 第 ${knowledgePoint.sourcePage} 页附近原文 + 本章 ${chapterKnowledgePointTitles.length} 个知识点。`
      : `上下文：第 ${knowledgePoint.sourcePage} 页附近原文 + 本章 ${chapterKnowledgePointTitles.length} 个知识点（该知识点尚未生成讲义）。`,
  );

  // 提问先落库：即使模型失败，学生的问题也不会丢
  const withQuestion = appendHiDocChatMessage(history, {
    role: "user",
    content: question,
    createdAt: new Date().toISOString(),
  });
  await saveHiDocConversationMessages(input.userId, input.kpId, withQuestion);

  const chatContext: HiDocChatContext = {
    textbookTitle: textbook.title,
    chapterTitle: chapter.title,
    knowledgePoint,
    chapterKnowledgePointTitles,
    lessonMarkdown: lesson?.view.contentMd ?? null,
    sourceExcerpt,
    style: await loadHiDocAccountLessonStyle(input.userId),
  };

  let modelOutcome: "success" | "failed" = "success";
  let answer = "";
  try {
    answer = await provider.streamReply(
      {
        messages: buildHiDocChatModelMessages(chatContext, history, question),
        question,
      },
      input.onDelta,
    );
  } catch (error) {
    modelOutcome = "failed";
    const message = error instanceof Error ? error.message : "未知错误";
    console.error("[hidoc] 讲解对话模型调用失败", error);
    return {
      ok: false,
      status: 503,
      code: "chat-failed",
      message: `本次讲解失败：${message}。本轮回答未保存（提问已保留），可稍后重试。`,
    };
  } finally {
    try {
      await recordServerUsage(input.userId, "hidocChats");
      await prisma.eventLog.create({
        data: {
          event: "hidoc_kp_chat",
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
      console.error("[hidoc] 讲解对话用量记录失败", error);
      notes.push("提示：本轮对话的配额计数写入失败，已记录服务端日志。");
    }
  }

  const finalMessages: HiDocChatMessage[] = appendHiDocChatMessage(withQuestion, {
    role: "assistant",
    content: answer.slice(0, HIDOC_CHAT_MESSAGE_MAX_CHARS),
    createdAt: new Date().toISOString(),
  });
  await saveHiDocConversationMessages(input.userId, input.kpId, finalMessages);

  return { ok: true, conversation: { kpId: input.kpId, messages: finalMessages }, notes };
}