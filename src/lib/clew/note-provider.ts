import "server-only";

import type { HiDocNoteModelInput } from "./note-heuristic";
import { resolveHiDocExtractModel, resolveHiDocExtractProviderId } from "./extraction-provider";

/**
 * Hi doc 学霸笔记模型边界（provider-neutral，复用讲义/萃取同一套 DashScope 密钥）。
 * 模型只做一件事：读该章聚合上下文（讲义要点/划重点/批注/追问），流式写出一份章级复习笔记 markdown。
 * 不写库、不改状态；结构合法性由确定性代码（note-heuristic）校验。
 */

export type HiDocNoteProvider = {
  id: string;
  model: string;
  /** 流式生成章级笔记；增量通过 onDelta 回调，返回完整 markdown。 */
  generateNote(input: HiDocNoteModelInput, onDelta: (text: string) => void): Promise<string>;
};

export class HiDocNoteProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiDocNoteProviderError";
  }
}

const DEFAULT_MODEL = "qwen3.7-plus";

export function resolveHiDocNoteModel(): string {
  return process.env.HIDOC_NOTE_MODEL?.trim() || resolveHiDocExtractModel() || DEFAULT_MODEL;
}

/** 未配置密钥时返回 null（调用方改走启发式兜底并明确标注「未接入模型」，不占模型额度）。 */
export async function createHiDocNoteProviderFromEnv(): Promise<HiDocNoteProvider | null> {
  if (resolveHiDocExtractProviderId() !== "dashscope") {
    return null;
  }
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const { createDashScopeHiDocNoteProvider } = await import("./providers/dashscope-note");
  return createDashScopeHiDocNoteProvider(
    apiKey,
    resolveHiDocNoteModel(),
    process.env.DASHSCOPE_BASE_URL?.trim(),
  );
}