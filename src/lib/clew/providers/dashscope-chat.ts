import "server-only";

import {
  ClewChatProviderError,
  type ClewChatModelInput,
  type ClewChatProvider,
} from "../chat-provider";
import { streamChatCompletion } from "./chat-transport";
import type { ResolvedClewModelConfig } from "./model-config";

/**
 * 讲解对话适配器（OpenAI 兼容 chat/completions，流式回答；ZCODE-M4 起接收任务级解析配置）。
 * system 提示词由 chat-prompt.ts 组装（含教材原文片段与讲义），这里只负责传输与增量回调。
 */

const requestTimeoutMs = 120_000;
const maxOutputTokens = 1600;

export function createDashScopeClewChatProvider(
  config: ResolvedClewModelConfig,
): ClewChatProvider {
  return {
    id: config.provider,
    model: config.model,
    async streamReply(input: ClewChatModelInput, onDelta) {
      try {
        return await streamChatCompletion({
          config,
          messages: input.messages,
          onDelta,
          temperature: 0.3,
          maxOutputTokens,
          timeoutMs: requestTimeoutMs,
        });
      } catch (error) {
        throw new ClewChatProviderError(
          error instanceof Error ? error.message : "讲解对话模型调用失败",
        );
      }
    },
  };
}