import "server-only";

import {
  ClewTocProviderError,
  type ClewTocModelInput,
  type ClewTocProvider,
} from "../toc-provider";
import { CLEW_MAX_CHAPTERS, parseModelChaptersPayload } from "../toc-heuristic";
import { completeChatJson } from "./chat-transport";
import type { ResolvedClewModelConfig } from "./model-config";

/**
 * 目录解析适配器（OpenAI 兼容 chat/completions，严格 JSON 输出；ZCODE-M4 起接收任务级解析配置）。
 * 只根据目录页文字整理章节；不得新增章节、不得猜测页码或页码偏移。
 */

const requestTimeoutMs = 120_000;
const maxOutputTokens = 4000;

function buildPrompt(input: ClewTocModelInput): string {
  const requiredOutputShape = {
    chapters: [{ title: "章节标题（与目录页一致）", pageStart: 1 }],
  };
  return [
    "你是 Ariadne 的受限目录解析器。输入是一本书目录页的文字，请把它整理成章节列表。",
    `只输出「第X章 / 第X篇」一级章节；第X节等次级条目忽略。最多 ${CLEW_MAX_CHAPTERS} 章。`,
    "pageStart 必须是目录页上紧跟标题的印刷页码；页码缺失或无法辨认时不要编造，直接省略该条。",
    "不得新增、改写或翻译标题；不得推断页码偏移；不得输出任何解释。",
    `返回 JSON 对象，字段与 requiredOutputShape 完全一致：${JSON.stringify(requiredOutputShape)}`,
    `上下文：${JSON.stringify({ pageCount: input.pageCount, tocText: input.tocText })}`,
  ].join("\n\n");
}

function parseJsonObjectText(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace < 0 || lastBrace <= firstBrace) {
      throw new ClewTocProviderError(`模型返回的 JSON 不完整（${trimmed.length} 字符）`);
    }
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      throw new ClewTocProviderError(`模型返回的 JSON 无法解析（${trimmed.length} 字符）`);
    }
  }
}

export function createDashScopeClewTocProvider(
  config: ResolvedClewModelConfig,
): ClewTocProvider {
  return {
    id: config.provider,
    model: config.model,
    async parseToc(input) {
      let content: string;
      try {
        content = await completeChatJson({
          config,
          messages: [
            {
              role: "system",
              content: "只根据给定目录页文字整理一级章节 JSON；缺失页码必须省略，不得编造。",
            },
            { role: "user", content: buildPrompt(input) },
          ],
          temperature: 0.1,
          maxOutputTokens,
          timeoutMs: requestTimeoutMs,
          responseFormat: { type: "json_object" },
        });
      } catch (error) {
        throw new ClewTocProviderError(
          error instanceof Error ? error.message : "目录解析模型调用失败",
        );
      }
      const parsed = parseJsonObjectText(content);
      const { entries, droppedCount } = parseModelChaptersPayload(parsed, input.pageCount);
      if (entries.length === 0) {
        throw new ClewTocProviderError(
          droppedCount > 0
            ? "模型返回的章节条目全部不合法，已放弃本次模型结果"
            : "模型没有返回可用章节",
        );
      }
      return entries;
    },
  };
}