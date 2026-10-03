import "server-only";

import {
  HiDocTocProviderError,
  type HiDocTocModelInput,
  type HiDocTocProvider,
} from "../toc-provider";
import { HIDOC_MAX_CHAPTERS, parseModelChaptersPayload } from "../toc-heuristic";

/**
 * DashScope 目录解析适配器（OpenAI 兼容 chat/completions，严格 JSON 输出）。
 * 只根据目录页文字整理章节；不得新增章节、不得猜测页码或页码偏移。
 */

const defaultBaseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const requestTimeoutMs = 120_000;
const maxOutputTokens = 4000;

function resolveChatCompletionsUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  if (
    url.protocol !== "https:"
    || (url.hostname !== "dashscope.aliyuncs.com" && !url.hostname.endsWith(".aliyuncs.com"))
  ) {
    throw new HiDocTocProviderError("DashScope base URL 必须是 HTTPS 的 aliyuncs.com 域名");
  }
  const path = url.pathname.replace(/\/+$/, "");
  url.pathname = path.endsWith("/chat/completions") ? path : `${path}/chat/completions`;
  url.search = "";
  url.hash = "";
  return url.toString();
}

function buildPrompt(input: HiDocTocModelInput): string {
  const requiredOutputShape = {
    chapters: [{ title: "章节标题（与目录页一致）", pageStart: 1 }],
  };
  return [
    "你是 NUR LEARN 的受限目录解析器。输入是一本书目录页的文字，请把它整理成章节列表。",
    `只输出「第X章 / 第X篇」一级章节；第X节等次级条目忽略。最多 ${HIDOC_MAX_CHAPTERS} 章。`,
    "pageStart 必须是目录页上紧跟标题的印刷页码；页码缺失或无法辨认时不要编造，直接省略该条。",
    "不得新增、改写或翻译标题；不得推断页码偏移；不得输出任何解释。",
    `返回 JSON 对象，字段与 requiredOutputShape 完全一致：${JSON.stringify(requiredOutputShape)}`,
    `上下文：${JSON.stringify({ pageCount: input.pageCount, tocText: input.tocText })}`,
  ].join("\n\n");
}

function extractMessageContent(value: unknown): string {
  if (typeof value !== "object" || value === null) {
    throw new HiDocTocProviderError("DashScope 响应格式不正确");
  }
  const choices = (value as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new HiDocTocProviderError("DashScope 响应缺少 choices");
  }
  const first = choices[0];
  if (typeof first !== "object" || first === null) {
    throw new HiDocTocProviderError("DashScope 响应缺少 message");
  }
  const message = (first as { message?: unknown }).message;
  if (typeof message !== "object" || message === null) {
    throw new HiDocTocProviderError("DashScope 响应缺少 message");
  }
  const content = (message as { content?: unknown }).content;
  if (typeof content !== "string") {
    throw new HiDocTocProviderError("DashScope 响应缺少文本内容");
  }
  return content;
}

function parseJsonObjectText(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace < 0 || lastBrace <= firstBrace) {
      throw new HiDocTocProviderError(`DashScope 返回的 JSON 不完整（${trimmed.length} 字符）`);
    }
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      throw new HiDocTocProviderError(`DashScope 返回的 JSON 无法解析（${trimmed.length} 字符）`);
    }
  }
}

export function createDashScopeHiDocTocProvider(
  apiKey: string,
  model: string,
  baseUrl = defaultBaseUrl,
): HiDocTocProvider {
  const chatCompletionsUrl = resolveChatCompletionsUrl(baseUrl);

  return {
    id: "dashscope",
    model,
    async parseToc(input) {
      const response = await fetch(chatCompletionsUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: "只根据给定目录页文字整理一级章节 JSON；缺失页码必须省略，不得编造。",
            },
            { role: "user", content: buildPrompt(input) },
          ],
          response_format: { type: "json_object" },
          enable_thinking: false,
          temperature: 0.1,
          max_tokens: maxOutputTokens,
        }),
        signal: AbortSignal.timeout(requestTimeoutMs),
      });

      if (!response.ok) {
        throw new HiDocTocProviderError(`DashScope 请求失败（HTTP ${response.status}）`);
      }

      const payload: unknown = await response.json();
      const parsed = parseJsonObjectText(extractMessageContent(payload));
      const { entries, droppedCount } = parseModelChaptersPayload(parsed, input.pageCount);
      if (entries.length === 0) {
        throw new HiDocTocProviderError(
          droppedCount > 0
            ? "模型返回的章节条目全部不合法，已放弃本次模型结果"
            : "模型没有返回可用章节",
        );
      }
      return entries;
    },
  };
}