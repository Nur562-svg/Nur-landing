import "server-only";

import type { HiDocChatModelMessage } from "./chat-prompt";
import { resolveHiDocExtractModel, resolveHiDocExtractProviderId } from "./extraction-provider";

/**
 * Hi doc 讲解对话模型边界（provider-neutral，复用同一套 DashScope 密钥）。
 * 模型只负责回答：上下文（讲义 + 原文片段 + 已萃取知识点）由服务端组装；
 * 对话历史由服务端从库里读取后送入，不接受客户端注入。
 */

export type HiDocChatModelInput = {
  messages: readonly HiDocChatModelMessage[];
  /** 本次提问（同时用于日志与落库，模型消息里已含同一条）。 */
  question: string;
};

export type HiDocChatProvider = {
  id: string;
  model: string;
  streamReply(input: HiDocChatModelInput, onDelta: (text: string) => void): Promise<string>;
};

export class HiDocChatProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiDocChatProviderError";
  }
}

const DEFAULT_MODEL = "qwen3.7-plus";

export function resolveHiDocChatModel(): string {
  return process.env.HIDOC_CHAT_MODEL?.trim() || resolveHiDocExtractModel() || DEFAULT_MODEL;
}

/** 未配置密钥时返回 null（对话没有模型即不可用，调用方如实报错，不静默降级）。 */
export async function createHiDocChatProviderFromEnv(): Promise<HiDocChatProvider | null> {
  if (resolveHiDocExtractProviderId() !== "dashscope") {
    return null;
  }
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const { createDashScopeHiDocChatProvider } = await import("./providers/dashscope-chat");
  return createDashScopeHiDocChatProvider(
    apiKey,
    resolveHiDocChatModel(),
    process.env.DASHSCOPE_BASE_URL?.trim(),
  );
}