import "server-only";

import type { ClewLessonStyle } from "@/types/clew";
import { isClewTaskConfigured, resolveClewTaskModel } from "./providers/model-config";

/**
 * Clew 讲义生成模型边界（provider-neutral，复用目录解析/萃取的同一套 DashScope 密钥）。
 * 模型只做一件事：读知识点信息 + 该页教材原文片段，流式写出一份结构化讲义 markdown。
 * 不写库、不改状态；结构合法性由确定性代码（lesson-heuristic）校验。
 */

export type ClewLessonModelInput = {
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
  style: ClewLessonStyle;
};

export type ClewLessonProvider = {
  id: string;
  model: string;
  /** 流式生成讲义；增量通过 onDelta 回调，返回完整 markdown。 */
  generateLesson(
    input: ClewLessonModelInput,
    onDelta: (text: string) => void,
  ): Promise<string>;
};

export class ClewLessonProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewLessonProviderError";
  }
}

/**
 * 按任务级 env 解析构造讲义 provider（ZCODE-M4 多模型：resolve → 校验 → 动态 import adapter）。
 * 未配置密钥时返回 null（调用方改走启发式兜底并明确标注「未接入模型」）；
 * provider 未实现 / baseURL 非法时抛 ClewProviderConfigError（明确报错，不静默回落）。
 */
export async function createClewLessonProviderFromEnv(): Promise<ClewLessonProvider | null> {
  const config = resolveClewTaskModel("lesson");
  if (!isClewTaskConfigured("lesson")) {
    return null;
  }
  const { createDashScopeClewLessonProvider } = await import("./providers/dashscope-lesson");
  return createDashScopeClewLessonProvider(config);
}