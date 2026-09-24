import "server-only";

import type { HiDocLessonStyle } from "@/types/hidoc";
import { resolveHiDocExtractModel, resolveHiDocExtractProviderId } from "./extraction-provider";

/**
 * Hi doc 讲义生成模型边界（provider-neutral，复用目录解析/萃取的同一套 DashScope 密钥）。
 * 模型只做一件事：读知识点信息 + 该页教材原文片段，流式写出一份结构化讲义 markdown。
 * 不写库、不改状态；结构合法性由确定性代码（lesson-heuristic）校验。
 */

export type HiDocLessonModelInput = {
  textbookTitle: string;
  chapterTitle: string;
  knowledgePoint: {
    title: string;
    description: string;
    keyTerms: readonly string[];
    prerequisites: readonly string[];
    sourcePage: number;
  };
  /** 该知识点附近的教材原文（PDF 带页标记；DOCX 带【页码待确认】）。 */
  sourceExcerpt: string;
  fileName?: string;
  style: HiDocLessonStyle;
};

export type HiDocLessonProvider = {
  id: string;
  model: string;
  /** 流式生成讲义；增量通过 onDelta 回调，返回完整 markdown。 */
  generateLesson(
    input: HiDocLessonModelInput,
    onDelta: (text: string) => void,
  ): Promise<string>;
};

export class HiDocLessonProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiDocLessonProviderError";
  }
}

const DEFAULT_MODEL = "qwen3.7-plus";

export function resolveHiDocLessonModel(): string {
  return process.env.HIDOC_LESSON_MODEL?.trim() || resolveHiDocExtractModel() || DEFAULT_MODEL;
}

/** 未配置密钥时返回 null（调用方改走启发式兜底并明确标注「未接入模型」）。 */
export async function createHiDocLessonProviderFromEnv(): Promise<HiDocLessonProvider | null> {
  if (resolveHiDocExtractProviderId() !== "dashscope") {
    return null;
  }
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const { createDashScopeHiDocLessonProvider } = await import("./providers/dashscope-lesson");
  return createDashScopeHiDocLessonProvider(
    apiKey,
    resolveHiDocLessonModel(),
    process.env.DASHSCOPE_BASE_URL?.trim(),
  );
}