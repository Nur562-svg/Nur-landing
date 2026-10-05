import "server-only";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { ClewChatMessage, ClewChatScope, ClewConversationView, ClewErrorCode, ClewLessonStyle } from "@/types/clew";
import { buildClewChatModelMessages, type ClewChatContext } from "./chat-prompt";
import { isClewChatScope } from "./chat-scope";
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
import { CLEW_LESSON_STYLE_LABELS, isClewLessonStyle } from "./lesson-heuristic";
import { isClewDocx } from "./source-label";
import { readClewKnowledgePointExcerpt } from "./source-excerpt";

/**
 * Clew 讲解对话编排（server-only，每轮一次模型调用）。
 * 上下文 = 该知识点讲义 + 教材原文片段 + 本章已萃取知识点清单；历史由服务端从库中读取。
 * 提问先落库（不会丢失），回答成功后再落库；失败如实报错且不保存半截回答。
 * 批 3 向后兼容新增：可选 style（直传并沿用「最近一次选择即账户默认」写入机制）、
 * 可选 scope（缺省 lesson+source，与既有行为逐字一致）、可选 onStatus（SSE 状态里程碑）。
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
  /** 显式讲解风格（composer chip 直传）；缺省走账户默认。 */
  style?: string;
  /** 依据范围；缺省 lesson+source。 */
  scope?: string;
  /** 状态里程碑回调（SSE status 事件；缺省不发生）。 */
  onStatus?: (phase: "source" | "compose", message: string) => void;
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

  // 批 3：可选讲解风格（显式传入时校验；非法 400，与讲义生成同一口径）。
  let explicitStyle: ClewLessonStyle | null = null;
  if (input.style !== undefined) {
    const trimmed = input.style.trim();
    if (!isClewLessonStyle(trimmed)) {
      return {
        ok: false,
        status: 400,
        code: "invalid-request",
        message: `未知的讲解风格「${trimmed.slice(0, 24)}」，请刷新页面后重试。`,
      };
    }
    explicitStyle = trimmed;
  }
  // 批 3：可选依据范围（显式传入时校验；缺省 lesson+source = 既有行为）。
  let scope: ClewChatScope = "lesson+source";
  if (input.scope !== undefined) {
    if (!isClewChatScope(input.scope)) {
      return {
        ok: false,
        status: 400,
        code: "invalid-request",
        message: `未知的依据范围「${input.scope.slice(0, 24)}」，请刷新页面后重试。`,
      };
    }
    scope = input.scope;
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

  // 状态里程碑 ①：进入上下文准备（真实阶段；lesson-only 无需读原文）
  input.onStatus?.(
    "source",
    scope === "lesson-only" ? "正在整理讲义上下文…" : "正在对照教材原文…",
  );

  // 原文片段优先复用讲义生成时保存的片段（避免每轮重解析 PDF）；缺失时才按 sourcePage 现读。
  // lesson-only：按用户选择不引用原文，跳过读取。
  let sourceExcerpt: string | null = null;
  if (scope !== "lesson-only") {
    sourceExcerpt = lesson?.sourceExcerpt && lesson.sourceExcerpt.length > 0
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
  }
  const locator = isClewDocx(textbook.fileName) ? "页码待确认的" : `第 ${knowledgePoint.sourcePage} 页附近`;
  // 缺省（lesson+source）措辞与既有版本逐字一致
  if (scope === "lesson-only") {
    notes.push(
      lesson
        ? `上下文：仅讲义（按你的选择，本轮不引用教材原文）+ 本章 ${chapterKnowledgePointTitles.length} 个知识点。`
        : `上下文：仅知识点信息（尚未生成讲义，建议先生成讲义再追问）。`,
    );
  } else {
    const extendSuffix = scope === "extended" ? "（已允许结合背景拓展）" : "";
    notes.push(
      lesson
        ? `上下文：讲义 + ${locator}原文 + 本章 ${chapterKnowledgePointTitles.length} 个知识点${extendSuffix}。`
        : `上下文：${locator}原文 + 本章 ${chapterKnowledgePointTitles.length} 个知识点（该知识点尚未生成讲义）${extendSuffix}。`,
    );
  }

  // 提问先落库：即使模型失败，学生的问题也不会丢
  const withQuestion = appendClewChatMessage(history, {
    role: "user",
    content: question,
    createdAt: new Date().toISOString(),
  });
  await saveClewConversationMessages(input.userId, input.kpId, withQuestion);

  const accountStyle = await loadClewAccountLessonStyle(input.userId);
  // 显式风格沿用「最近一次选择即账户默认」写入机制（与讲义生成同一行为）；缺省路径不产生任何写。
  if (explicitStyle && explicitStyle !== accountStyle) {
    try {
      await prisma.user.update({
        where: { id: input.userId },
        data: { clewLessonStyle: explicitStyle },
      });
      notes.push(`讲解风格已设为「${CLEW_LESSON_STYLE_LABELS[explicitStyle]}」，之后的讲解与生成默认使用该风格。`);
    } catch (error) {
      console.error("[clew] 讲解风格账户默认更新失败", error);
    }
  }

  const chatContext: ClewChatContext = {
    textbookTitle: textbook.title,
    chapterTitle: chapter.title,
    knowledgePoint,
    chapterKnowledgePointTitles,
    lessonMarkdown: lesson?.view.contentMd ?? null,
    sourceExcerpt,
    fileName: textbook.fileName,
    style: explicitStyle ?? accountStyle,
    scope,
  };

  // 状态里程碑 ②：上下文就绪，模型即将开始流式输出
  input.onStatus?.("compose", "正在组织讲解…");

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
      const eventProps: { [key: string]: Prisma.InputJsonValue } = {
        kpId: input.kpId,
        chapterOrder: chapter.order,
        provider: provider.id,
        model: provider.model,
        outcome: modelOutcome,
        questionChars: question.length,
        answerChars: answer.length,
        scope,
      };
      if (explicitStyle) {
        eventProps.styleExplicit = explicitStyle;
      }
      await prisma.eventLog.create({
        data: {
          event: "clew_kp_chat",
          userId: input.userId,
          props: eventProps,
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