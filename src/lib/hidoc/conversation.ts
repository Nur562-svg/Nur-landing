import type { HiDocChatMessage, HiDocChatRole } from "@/types/hidoc";

/**
 * Hi doc 对话消息规则（纯函数，可测试）：JSON 列的严格解析、追加与裁剪。
 * `messages` 是 Json 列，按不可信输入处理：解析不出的条目直接丢弃，不猜测。
 */

/** 单条消息内容上限（用户提问与模型回答同一边界）。 */
export const HIDOC_CHAT_MESSAGE_MAX_CHARS = 4000;

/** 落库保留的最近消息条数（超出从头裁剪）。 */
export const HIDOC_CONVERSATION_MAX_MESSAGES = 40;

/** 送入模型的历史条数（更早的轮次不再进入上下文）。 */
export const HIDOC_CHAT_HISTORY_LIMIT = 12;

export function isHiDocChatRole(value: unknown): value is HiDocChatRole {
  return value === "user" || value === "assistant";
}

export function parseHiDocChatMessages(value: unknown): HiDocChatMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const messages: HiDocChatMessage[] = [];
  for (const raw of value) {
    if (typeof raw !== "object" || raw === null) {
      continue;
    }
    const candidate = raw as Record<string, unknown>;
    const role = candidate.role;
    const content = candidate.content;
    if (!isHiDocChatRole(role) || typeof content !== "string" || content.trim().length === 0) {
      continue;
    }
    const createdAt = typeof candidate.createdAt === "string" ? candidate.createdAt : "";
    messages.push({
      role,
      content: content.slice(0, HIDOC_CHAT_MESSAGE_MAX_CHARS),
      createdAt,
    });
  }
  return messages;
}

/** 追加消息并按上限裁剪（保留最近 HIDOC_CONVERSATION_MAX_MESSAGES 条）。 */
export function appendHiDocChatMessage(
  messages: readonly HiDocChatMessage[],
  message: HiDocChatMessage,
): HiDocChatMessage[] {
  const next = [...messages, message];
  return next.length > HIDOC_CONVERSATION_MAX_MESSAGES
    ? next.slice(next.length - HIDOC_CONVERSATION_MAX_MESSAGES)
    : next;
}

/** 送入模型的历史窗口（最近 N 条）。 */
export function trimHiDocChatHistory(
  messages: readonly HiDocChatMessage[],
  limit: number = HIDOC_CHAT_HISTORY_LIMIT,
): HiDocChatMessage[] {
  return messages.length > limit ? messages.slice(messages.length - limit) : [...messages];
}