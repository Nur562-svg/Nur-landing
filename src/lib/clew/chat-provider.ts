import "server-only";

import type { ClewChatModelMessage } from "./chat-prompt";
import { isClewTaskConfigured, resolveClewTaskModel } from "./providers/model-config";

/**
 * Clew 讲解对话模型边界（provider-neutral，复用同一套 DashScope 密钥）。
 * 模型只负责回答：上下文（讲义 + 原文片段 + 已萃取知识点）由服务端组装；
 * 对话历史由服务端从库里读取后送入，不接受客户端注入。
 */

export type ClewChatModelInput = {
  messages: readonly ClewChatModelMessage[];
  /** 本次提问（同时用于日志与落库，模型消息里已含同一条）。 */
  question: string;
};

export type ClewChatProvider = {
  id: string;
  model: string;
  streamReply(input: ClewChatModelInput, onDelta: (text: string) => void): Promise<string>;
};

export class ClewChatProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewChatProviderError";
  }
}

/** 未配置密钥时返回 null（对话没有模型即不可用，调用方如实报错，不静默降级）。 */
/**
 * 按任务级 env 解析构造讲解对话 provider（ZCODE-M4 多模型：resolve → 校验 → 动态 import adapter）。
 * 未配置密钥时返回 null（对话没有模型即不可用，调用方如实报错，不静默降级）；
 * provider 未实现 / baseURL 非法时抛 ClewProviderConfigError（明确报错，不静默回落）。
 */
export async function createClewChatProviderFromEnv(): Promise<ClewChatProvider | null> {
  const config = resolveClewTaskModel("chat");
  if (!isClewTaskConfigured("chat")) {
    return null;
  }
  const { createDashScopeClewChatProvider } = await import("./providers/dashscope-chat");
  return createDashScopeClewChatProvider(config);
}