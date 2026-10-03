import "server-only";

/**
 * DashScope 流式补全共用适配（server-only）：
 * OpenAI 兼容 chat/completions + stream，逐块回调增量文本，返回完整文本。
 * 密钥只在服务端使用（Authorization: Bearer），永不进入客户端。
 */

const defaultBaseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";

export type HiDocDashScopeMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export class HiDocDashScopeStreamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiDocDashScopeStreamError";
  }
}

export function resolveDashScopeChatCompletionsUrl(baseUrl = defaultBaseUrl): string {
  const url = new URL(baseUrl);
  if (
    url.protocol !== "https:"
    || (url.hostname !== "dashscope.aliyuncs.com" && !url.hostname.endsWith(".aliyuncs.com"))
  ) {
    throw new HiDocDashScopeStreamError("DashScope base URL 必须是 HTTPS 的 aliyuncs.com 域名");
  }
  const path = url.pathname.replace(/\/+$/, "");
  url.pathname = path.endsWith("/chat/completions") ? path : `${path}/chat/completions`;
  url.search = "";
  url.hash = "";
  return url.toString();
}

function readDeltaContent(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }
  const error = (payload as { error?: unknown }).error;
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message;
    throw new HiDocDashScopeStreamError(
      typeof message === "string" ? message : "DashScope 流式响应返回错误",
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

export type HiDocDashScopeStreamOptions = {
  apiKey: string;
  model: string;
  messages: readonly HiDocDashScopeMessage[];
  onDelta: (text: string) => void;
  temperature: number;
  maxOutputTokens: number;
  timeoutMs: number;
  baseUrl?: string;
};

/** 流式补全：增量交给 onDelta；返回完整文本；空响应视为失败（不静默返回空讲义/空回答）。 */
export async function streamDashScopeChatCompletion(
  options: HiDocDashScopeStreamOptions,
): Promise<string> {
  const url = resolveDashScopeChatCompletionsUrl(options.baseUrl);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      stream: true,
      enable_thinking: false,
      temperature: options.temperature,
      max_tokens: options.maxOutputTokens,
    }),
    signal: AbortSignal.timeout(options.timeoutMs),
  });

  if (!response.ok || !response.body) {
    throw new HiDocDashScopeStreamError(`DashScope 请求失败（HTTP ${response.status}）`);
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
    throw new HiDocDashScopeStreamError("模型没有返回任何内容");
  }
  return text;
}