import "server-only";

import type { ResolvedClewModelConfig } from "./model-config";

/**
 * Clew 通用模型传输层（ZCODE-M4 Phase 3，server-only）：
 * OpenAI 兼容 chat/completions（流式 SSE 与非流式 JSON 共用），逐块回调增量文本。
 * 密钥只在服务端使用（Authorization: Bearer），永不进入客户端。
 * `enable_thinking: false` 是 DashScope/百炼扩展参数（非 OpenAI 标准参数），
 * 仅在 provider === "dashscope" 时注入；个别 DashScope 强制思考模型会因该参数报 400，
 * 按明确报错路径原样透出，不自动改装、不重试猜测。
 */

export type ClewChatTransportMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export class ClewChatTransportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewChatTransportError";
  }
}

/** URL 组装：容忍无路径 / 带 /v1 / 多段前缀 / 尾斜杠等形态；dashscope 主机校验仅对 dashscope 生效。 */
export function resolveChatCompletionsUrl(config: ResolvedClewModelConfig): string {
  const url = new URL(config.baseURL);
  if (config.provider === "dashscope") {
    if (
      url.protocol !== "https:"
      || (url.hostname !== "dashscope.aliyuncs.com" && !url.hostname.endsWith(".aliyuncs.com"))
    ) {
      throw new ClewChatTransportError("DashScope base URL 必须是 HTTPS 的 aliyuncs.com 域名");
    }
  }
  const path = url.pathname.replace(/\/+$/, "");
  url.pathname = path.endsWith("/chat/completions") ? path : `${path}/chat/completions`;
  url.search = "";
  url.hash = "";
  return url.toString();
}

export type ClewChatCompletionsBodyOptions = {
  config: ResolvedClewModelConfig;
  messages: readonly ClewChatTransportMessage[];
  stream: boolean;
  temperature: number;
  maxOutputTokens: number;
  responseFormat?: { type: "json_object" };
};

/** 请求体构建（纯函数）：`enable_thinking: false` 仅对 dashscope 注入。 */
export function buildChatCompletionsBody(options: ClewChatCompletionsBodyOptions): Record<string, unknown> {
  return {
    model: options.config.model,
    messages: options.messages,
    stream: options.stream,
    ...(options.config.provider === "dashscope" ? { enable_thinking: false } : {}),
    ...(options.responseFormat ? { response_format: options.responseFormat } : {}),
    temperature: options.temperature,
    max_tokens: options.maxOutputTokens,
  };
}

function readDeltaContent(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }
  const error = (payload as { error?: unknown }).error;
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message;
    throw new ClewChatTransportError(
      typeof message === "string" ? message : "模型流式响应返回错误",
    );
  }
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    return null;
  }
  const first = choices[0];
  if (typeof first !== "object" || first === null) {
    return null;
  }
  const delta = (first as { delta?: unknown }).delta;
  if (typeof delta !== "object" || delta === null) {
    return null;
  }
  const content = (delta as { content?: unknown }).content;
  return typeof content === "string" && content.length > 0 ? content : null;
}

async function postChatCompletions(
  body: Record<string, unknown>,
  config: ResolvedClewModelConfig,
  timeoutMs: number,
): Promise<Response> {
  return fetch(resolveChatCompletionsUrl(config), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });
}

export type ClewChatCompletionOptions = {
  config: ResolvedClewModelConfig;
  messages: readonly ClewChatTransportMessage[];
  temperature: number;
  maxOutputTokens: number;
  timeoutMs: number;
};

/** 流式补全：增量交给 onDelta；返回完整文本；空响应视为失败（不静默返回空讲义/空回答）。 */
export async function streamChatCompletion(
  options: ClewChatCompletionOptions & { onDelta: (text: string) => void },
): Promise<string> {
  const response = await postChatCompletions(
    buildChatCompletionsBody({
      config: options.config,
      messages: options.messages,
      stream: true,
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
    }),
    options.config,
    options.timeoutMs,
  );

  if (!response.ok || !response.body) {
    throw new ClewChatTransportError(`模型请求失败（HTTP ${response.status}）`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  for (;;) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) {
        continue;
      }
      const payloadText = trimmed.slice(5).trim();
      if (payloadText.length === 0 || payloadText === "[DONE]") {
        continue;
      }
      let payload: unknown;
      try {
        payload = JSON.parse(payloadText);
      } catch {
        continue;
      }
      const delta = readDeltaContent(payload);
      if (delta) {
        text += delta;
        options.onDelta(delta);
      }
    }
  }

  if (text.trim().length === 0) {
    throw new ClewChatTransportError("模型没有返回任何内容");
  }
  return text;
}

/** 非流式补全：返回 assistant 消息文本（供萃取/目录这类 JSON 任务复用）。 */
export async function completeChatJson(
  options: ClewChatCompletionOptions & { responseFormat?: { type: "json_object" } },
): Promise<string> {
  const response = await postChatCompletions(
    buildChatCompletionsBody({
      config: options.config,
      messages: options.messages,
      stream: false,
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
      ...(options.responseFormat ? { responseFormat: options.responseFormat } : {}),
    }),
    options.config,
    options.timeoutMs,
  );

  if (!response.ok) {
    throw new ClewChatTransportError(`模型请求失败（HTTP ${response.status}）`);
  }

  const payload: unknown = await response.json();
  if (typeof payload !== "object" || payload === null) {
    throw new ClewChatTransportError("模型响应格式不正确");
  }
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new ClewChatTransportError("模型响应缺少 choices");
  }
  const first = choices[0];
  if (typeof first !== "object" || first === null) {
    throw new ClewChatTransportError("模型响应缺少 message");
  }
  const message = (first as { message?: unknown }).message;
  if (typeof message !== "object" || message === null) {
    throw new ClewChatTransportError("模型响应缺少 message");
  }
  const content = (message as { content?: unknown }).content;
  if (typeof content !== "string") {
    throw new ClewChatTransportError("模型响应缺少文本内容");
  }
  return content;
}
