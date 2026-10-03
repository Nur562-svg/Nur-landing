import "server-only";

import type { HiDocKnowledgePointDraft } from "./extraction-heuristic";

/**
 * Hi doc 知识点萃取模型边界（provider-neutral，复用目录解析同一套 DashScope 密钥）。
 * 模型只做一件事：读单章文字层草稿，产出带页码溯源的知识点列表。
 * 不写库、不改状态；payload 合法性由确定性代码（extraction-heuristic）负责。
 */

export type HiDocExtractModelInput = {
  textbookTitle: string;
  chapterTitle: string;
  chapterPageStart: number;
  chapterPageEnd: number;
  /** 带页标记的章节文字（已在调用方裁剪）。 */
  chapterText: string;
};

export type HiDocExtractProviderOutput = {
  knowledgePoints: HiDocKnowledgePointDraft[];
  /** 未通过严格校验被丢弃的条目数（如实告知用户）。 */
  droppedCount: number;
  /** 无法在同章对上而被丢弃的先修引用数。 */
  droppedPrerequisiteCount: number;
};

export type HiDocExtractProvider = {
  id: string;
  model: string;
  extractKnowledgePoints(input: HiDocExtractModelInput): Promise<HiDocExtractProviderOutput>;
};

export class HiDocExtractProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiDocExtractProviderError";
  }
}

const DEFAULT_PROVIDER = "dashscope";
const DEFAULT_MODEL = "qwen3.7-plus";

export function resolveHiDocExtractProviderId(): string {
  return process.env.HIDOC_EXTRACT_PROVIDER?.trim() || DEFAULT_PROVIDER;
}

export function resolveHiDocExtractModel(): string {
  return process.env.HIDOC_EXTRACT_MODEL?.trim() || DEFAULT_MODEL;
}

/** 未配置密钥时返回 null（调用方如实拒绝，不假装萃取）。 */
export async function createHiDocExtractProviderFromEnv(): Promise<HiDocExtractProvider | null> {
  const providerId = resolveHiDocExtractProviderId();
  if (providerId !== "dashscope") {
    return null;
  }
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const { createDashScopeHiDocExtractProvider } = await import("./providers/dashscope-extract");
  return createDashScopeHiDocExtractProvider(
    apiKey,
    resolveHiDocExtractModel(),
    process.env.DASHSCOPE_BASE_URL?.trim(),
  );
}
