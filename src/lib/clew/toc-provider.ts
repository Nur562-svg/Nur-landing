import "server-only";

import type { HiDocPrintedTocEntry } from "./toc-heuristic";

/**
 * Hi doc 目录解析模型边界（provider-neutral，仿 course-builder/nur-agent 适配器模式）。
 * 模型只做一件事：把「目录页文字」整理成章节条目（标题 + 页码）。
 * 不写库、不改状态、不生成课程事实；页码偏移与合法性由确定性代码负责。
 */

export type HiDocTocModelInput = {
  textbookTitle: string;
  pageCount: number;
  /** 目录页文字（已在调用方做长度上限裁剪）。 */
  tocText: string;
};

export type HiDocTocProvider = {
  id: string;
  model: string;
  parseToc(input: HiDocTocModelInput): Promise<HiDocPrintedTocEntry[]>;
};

export class HiDocTocProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiDocTocProviderError";
  }
}

/** 目录文字传输上限：只发目录页文字，绝不发整本教材。 */
export const HIDOC_TOC_TEXT_MAX_CHARS = 12_000;

const DEFAULT_HIDOC_TOC_PROVIDER = "dashscope";
const DEFAULT_HIDOC_TOC_MODEL = "qwen3.7-plus";

export function resolveHiDocTocProviderId(): string {
  return process.env.HIDOC_TOC_PROVIDER?.trim() || DEFAULT_HIDOC_TOC_PROVIDER;
}

export function resolveHiDocTocModel(): string {
  return process.env.HIDOC_TOC_MODEL?.trim() || DEFAULT_HIDOC_TOC_MODEL;
}

/**
 * 按环境变量构造目录解析 provider。
 * 未配置密钥或 provider 未接入时返回 null（调用方如实降级为纯启发式，不静默假装调用过模型）。
 */
export async function createHiDocTocProviderFromEnv(): Promise<HiDocTocProvider | null> {
  const providerId = resolveHiDocTocProviderId();
  if (providerId !== "dashscope") {
    return null;
  }
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const { createDashScopeHiDocTocProvider } = await import("./providers/dashscope-toc");
  return createDashScopeHiDocTocProvider(
    apiKey,
    resolveHiDocTocModel(),
    process.env.DASHSCOPE_BASE_URL?.trim(),
  );
}