import "server-only";

import {
  HiDocChatProviderError,
  type HiDocChatModelInput,
  type HiDocChatProvider,
} from "../chat-provider";
import { streamDashScopeChatCompletion } from "./dashscope-stream";

/**
 * DashScope 讲解对话适配器（OpenAI 兼容 chat/completions，流式回答）。
 * system 提示词由 chat-prompt.ts 组装（含教材原文片段与讲义），这里只负责传输与增量回调。
 */

const requestTimeoutMs = 120_000;
const maxOutputTokens = 1600;

export function createDashScopeHiDocChatProvider(
  apiKey: string,
  model: string,
  baseUrl?: string,
): HiDocChatProvider {
  return {
    id: "dashscope",
    model,
    async streamReply(input: HiDocChatModelInput, onDelta) {
      try {
        return await streamDashScopeChatCompletion({
          apiKey,
          model,
          baseUrl,
          messages: input.messages,
          onDelta,
          temperature: 0.3,
          maxOutputTokens,
          timeoutMs: requestTimeoutMs,
        });
      } catch (error) {
        throw new HiDocChatProviderError(
          error instanceof Error ? error.message : "讲解对话模型调用失败",
        );
      }
    },
  };
}