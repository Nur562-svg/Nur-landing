/**
 * Clew Agent 循环（ZCODE-M2 Phase 1，基于 Vercel AI SDK v7 ToolLoopAgent）。
 * 借鉴 Grok Build 的 agentic loop，简化为学习场景：无代码执行，只有内容生成。
 *
 * 设计边界（CLEW_ARCHITECTURE_CONFIRMATION 铁律）：
 * - 每次工具执行前检查配额，不足抛 ClewQuotaExhaustedError（路由层映射 503，不静默放行）；
 * - 工具 handler 全部依赖注入（server 工厂绑定真实服务；测试注入 stub）；
 * - 本文件不 import server-only，可被 node:test 直接测试。
 */

import { ToolLoopAgent, isStepCount, tool, type LanguageModel } from "ai";
import { z } from "zod";
import { suggestLoopProfile, type LoopProfileSuggestionInput } from "@/lib/loop-profile";
import { buildClewSystemPrompt } from "./prompts";
import type { ClewKnowledgePointDraft } from "./extraction-heuristic";

/** Clew 工具上下文（每次调用注入）。 */
export type ClewToolContext = {
  userId: string;
  /** 会员档位（配额与限制计算用）。 */
  tier?: string;
  textbookId?: string;
  chapterId?: string;
  kpId?: string;
  /** 本次 Agent 循环开始时的剩余配额（快照）；工具每执行一次消耗 1。 */
  quotaRemaining: number;
};

/** 配额耗尽（工具执行前硬门槛）。 */
export class ClewQuotaExhaustedError extends Error {
  constructor(actionLabel: string) {
    super(`配额不足，无法继续${actionLabel}。可升级会员档位，或等待额度重置后重试。`);
    this.name = "ClewQuotaExhaustedError";
  }
}

/** 工具 handler 端口：server 工厂绑定真实服务，测试绑定 stub。 */
export type ClewToolHandlers = {
  extractKnowledgePoints: (
    input: { chapterId: string; chapterText: string },
    context: ClewToolContext,
  ) => Promise<{ knowledgePoints: ClewKnowledgePointDraft[]; notes: string[] }>;
  generateLesson: (
    input: { kpId: string; kpTitle: string; kpDescription: string; sourceText: string },
    context: ClewToolContext,
  ) => Promise<{ contentMd: string; generator: string }>;
  answerQuestion: (
    input: { kpId: string; question: string; lessonContent?: string },
    context: ClewToolContext,
  ) => Promise<{ answerMd: string }>;
  generateNote: (
    input: {
      chapterId: string;
      lessons: Array<{ kpTitle: string; content: string }>;
      highlights: Array<{ quote: string; note?: string }>;
    },
    context: ClewToolContext,
  ) => Promise<{ contentMd: string; generator: string }>;
};

/** 流式事件类型（SSE 输出契约）。 */
export type ClewAgentEvent =
  | { type: "text-delta"; text: string }
  | { type: "tool-call"; toolName: string; input: unknown }
  | { type: "tool-result"; toolName: string; result: unknown }
  | { type: "step-complete"; stepNumber: number }
  | { type: "done"; totalTokens: number }
  | { type: "error"; error: string };

/** 默认步数上限（控制成本：isStepCount(10)）。 */
export const CLEW_AGENT_MAX_STEPS = 10;

type QuotaGuard = (actionLabel: string) => void;

function createQuotaGuard(initialRemaining: number): QuotaGuard {
  let remaining = initialRemaining;
  return (actionLabel: string) => {
    if (remaining <= 0) {
      throw new ClewQuotaExhaustedError(actionLabel);
    }
    remaining -= 1;
  };
}

/**
 * 组装 Clew 工具集（萃取 / 讲义 / 答疑 / 笔记 / profile 建议）。
 * 每个工具 execute 内先过配额门槛，再调用注入的 handler；
 * suggestLoopProfile 走确定性规则引擎，不消耗模型配额。
 */
export function createClewTools(context: ClewToolContext, handlers: ClewToolHandlers) {
  const guard = createQuotaGuard(context.quotaRemaining);
  return {
    extractKnowledgePoints: tool({
      description: "从教材章节萃取知识点（返回标题/描述/关键术语/先修/来源页码的 JSON 列表）",
      inputSchema: z.object({
        chapterId: z.string().min(1),
        chapterText: z.string().min(1),
      }),
      execute: async ({ chapterId, chapterText }) => {
        guard("萃取");
        return handlers.extractKnowledgePoints({ chapterId, chapterText }, context);
      },
    }),
    generateLesson: tool({
      description: "为知识点生成讲义（基于教材原文片段的 Markdown 讲义）",
      inputSchema: z.object({
        kpId: z.string().min(1),
        kpTitle: z.string().min(1),
        kpDescription: z.string(),
        sourceText: z.string(),
      }),
      execute: async (input) => {
        guard("讲义生成");
        return handlers.generateLesson(input, context);
      },
    }),
    answerQuestion: tool({
      description: "回答学生关于知识点的问题（只依据教材与已有讲义，不编造）",
      inputSchema: z.object({
        kpId: z.string().min(1),
        question: z.string().min(1),
        lessonContent: z.string().optional(),
      }),
      execute: async (input) => {
        guard("讲解对话");
        return handlers.answerQuestion(input, context);
      },
    }),
    generateNote: tool({
      description: "生成章节学霸笔记（汇总本章讲义要点与划重点/批注）",
      inputSchema: z.object({
        chapterId: z.string().min(1),
        lessons: z.array(
          z.object({
            kpTitle: z.string().min(1),
            content: z.string(),
          }),
        ),
        highlights: z.array(
          z.object({
            quote: z.string().min(1),
            note: z.string().optional(),
          }),
        ),
      }),
      execute: async (input) => {
        guard("笔记生成");
        return handlers.generateNote(input, context);
      },
    }),
    suggestLoopProfile: tool({
      description: "为知识点建议学习闭环类型（概念理解/技能应用/考前冲刺等，确定性规则引擎）",
      inputSchema: z.object({
        kpTitle: z.string().min(1),
        kpDescription: z.string(),
        hasPractice: z.boolean(),
        hasCase: z.boolean(),
        questionKinds: z.array(z.string()),
        estimatedMinutes: z.number().int().min(0),
      }),
      execute: async (input: {
        kpTitle: string;
        kpDescription: string;
        hasPractice: boolean;
        hasCase: boolean;
        questionKinds: string[];
        estimatedMinutes: number;
      }) => {
        const features: LoopProfileSuggestionInput = {
          type: "clew-kp",
          title: input.kpTitle,
          description: input.kpDescription,
          hasLesson: true,
          hasPractice: input.hasPractice,
          hasCase: input.hasCase,
          questionKinds: input.questionKinds,
          estimatedDurationMinutes: input.estimatedMinutes,
        };
        return { profileId: suggestLoopProfile(features), suggestedBy: "rule-engine" };
      },
    }),
  };
}

export type ClewAgentConfig = {
  model: LanguageModel;
  handlers: ClewToolHandlers;
  /** 步数上限，默认 CLEW_AGENT_MAX_STEPS（10）。 */
  maxSteps?: number;
};

/** 创建 Clew Agent（ToolLoopAgent + Clew 工具集 + 系统 Prompt + 步数硬限制）。 */
export function createClewAgent(context: ClewToolContext, config: ClewAgentConfig) {
  return new ToolLoopAgent({
    model: config.model,
    instructions: buildClewSystemPrompt(context),
    tools: createClewTools(context, config.handlers),
    stopWhen: isStepCount(config.maxSteps ?? CLEW_AGENT_MAX_STEPS),
  });
}

/** Clew Agent 实例类型（具体工具集由 createClewTools 推导）。 */
export type ClewAgent = ReturnType<typeof createClewAgent>;
