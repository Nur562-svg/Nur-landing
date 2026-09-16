import "server-only";

import {
  HiDocExtractProviderError,
  type HiDocExtractModelInput,
  type HiDocExtractProvider,
} from "../extraction-provider";
import {
  HIDOC_MAX_KNOWLEDGE_POINTS_PER_CHAPTER,
  parseModelKnowledgePointsPayload,
} from "../extraction-heuristic";

/**
 * DashScope 知识点萃取适配器（OpenAI 兼容 chat/completions，严格 JSON 输出）。
 * 输入是带【PDF 第 X 页】标记的单章文字；输出必须携带页内可溯源的 sourcePage。
 */

const defaultBaseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const requestTimeoutMs = 180_000;
const maxOutputTokens = 8000;

function resolveChatCompletionsUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  if (
    url.protocol !== "https:"
    || (url.hostname !== "dashscope.aliyuncs.com" && !url.hostname.endsWith(".aliyuncs.com"))
  ) {
    throw new HiDocExtractProviderError("DashScope base URL 必须是 HTTPS 的 aliyuncs.com 域名");
  }
  const path = url.pathname.replace(/\/+$/, "");
  url.pathname = path.endsWith("/chat/completions") ? path : `${path}/chat/completions`;
  url.search = "";
  url.hash = "";
  return url.toString();
}

function buildPrompt(input: HiDocExtractModelInput): string {
  const requiredOutputShape = {
    knowledgePoints: [
      {
        title: "知识点标题（来自本章内容，不得新增概念）",
        description: "60–200 字的知识点说明：定义 / 机制 / 适用条件",
        keyTerms: ["关键术语"],
        prerequisites: ["同章内先修知识点标题（没有则为空数组）"],
        sourcePage: input.chapterPageStart,
      },
    ],
  };
  return [
    "你是 NUR LEARN 的受限知识点萃取器。输入是一章教材文字（带【PDF 第 X 页】页标记），请定位定义、公式、要点与例题，整理为知识点列表。",
    `知识点数量 1–${HIDOC_MAX_KNOWLEDGE_POINTS_PER_CHAPTER} 个；宁缺毋滥，只取本章真实讲解的知识点。`,
    `sourcePage 必须是该知识点依据内容所在的 PDF 页序（${input.chapterPageStart}–${input.chapterPageEnd} 的整数）；对应页找不到时不要编造，直接省略该知识点。`,
    "title 必须来自本章内容；description 只依据给定文字，不得补充教材外知识；keyTerms 是该知识点的核心术语（0–10 个）；prerequisites 只能引用同一次输出里的其它知识点标题（0–5 个，没有就空数组）。",
    "不得输出任何解释、Markdown 或代码围栏。",
    `返回 JSON 对象，字段与 requiredOutputShape 完全一致：${JSON.stringify(requiredOutputShape)}`,
    `上下文：${JSON.stringify({
      textbookTitle: input.textbookTitle,
      chapterTitle: input.chapterTitle,
      chapterPageStart: input.chapterPageStart,
      chapterPageEnd: input.chapterPageEnd,
      chapterText: input.chapterText,
    })}`,
  ].join("\n\n");
}

function extractMessageContent(value: unknown): string {
  if (typeof value !== "object" || value === null) {
    throw new HiDocExtractProviderError("DashScope 响应格式不正确");
  }
  const choices = (value as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new HiDocExtractProviderError("DashScope 响应缺少 choices");
  }
  const first = choices[0];
  if (typeof first !== "object" || first === null) {
    throw new HiDocExtractProviderError("DashScope 响应缺少 message");
  }
  const message = (first as { message?: unknown }).message;
  if (typeof message !== "object" || message === null) {
    throw new HiDocExtractProviderError("DashScope 响应缺少 message");
  }
  const content = (message as { content?: unknown }).content;
  if (typeof content !== "string") {
    throw new HiDocExtractProviderError("DashScope 响应缺少文本内容");
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
      throw new HiDocExtractProviderError(`DashScope 返回的 JSON 不完整（${trimmed.length} 字符）`);
    }
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      throw new HiDocExtractProviderError(`DashScope 返回的 JSON 无法解析（${trimmed.length} 字符）`);
    }
  }
}

export function createDashScopeHiDocExtractProvider(
  apiKey: string,
  model: string,
  baseUrl = defaultBaseUrl,
): HiDocExtractProvider {
  const chatCompletionsUrl = resolveChatCompletionsUrl(baseUrl);

  return {
    id: "dashscope",
    model,
    async extractKnowledgePoints(input) {
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
              content: "只根据给定章节文字萃取知识点 JSON；sourcePage 必须可溯源，缺失即省略，不得编造。",
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
        throw new HiDocExtractProviderError(`DashScope 请求失败（HTTP ${response.status}）`);
      }

      const payload: unknown = await response.json();
      const parsed = parseJsonObjectText(extractMessageContent(payload));
      const { knowledgePoints, droppedCount, droppedPrerequisiteCount } = parseModelKnowledgePointsPayload(
        parsed,
        input.chapterPageStart,
        input.chapterPageEnd,
      );
      if (knowledgePoints.length === 0) {
        throw new HiDocExtractProviderError(
          droppedCount > 0
            ? `模型返回的知识点条目全部不合法（丢弃 ${droppedCount} 条），本次萃取未产生可用结果`
            : "模型没有返回可用知识点",
        );
      }
      return { knowledgePoints, droppedCount, droppedPrerequisiteCount };
    },
  };
}
