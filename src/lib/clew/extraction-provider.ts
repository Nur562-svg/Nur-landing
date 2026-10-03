import "server-only";

import type { ClewKnowledgePointDraft } from "./extraction-heuristic";
import { isClewTaskConfigured, resolveClewTaskModel } from "./providers/model-config";

/**
 * Clew 知识点萃取模型边界（provider-neutral）。
 * 模型只做一件事：读单章文字层草稿，产出带页码溯源的知识点列表。
 * 不写库、不改状态；payload 合法性由确定性代码（extraction-heuristic）负责。
 */

export type ClewExtractModelInput = {
  textbookTitle: string;
  chapterTitle: string;
  chapterPageStart: number;
  chapterPageEnd: number;
  /** 带页标记的章节文字（已在调用方裁剪）。 */
  chapterText: string;
};

export type ClewExtractProviderOutput = {
  knowledgePoints: ClewKnowledgePointDraft[];
  /** 未通过严格校验被丢弃的条目数（如实告知用户）。 */
  droppedCount: number;
  /** 无法在同章对上而被丢弃的先修引用数。 */
  droppedPrerequisiteCount: number;
};

export type ClewExtractProvider = {
  id: string;
  model: string;
  extractKnowledgePoints(input: ClewExtractModelInput): Promise<ClewExtractProviderOutput>;
};

export class ClewExtractProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewExtractProviderError";
  }
}

/**
 * 按任务级 env 解析构造萃取 provider（ZCODE-M4 多模型：resolve → 校验 → 动态 import adapter）。
 * 未配置密钥时返回 null（调用方如实拒绝，不假装萃取）；
 * provider 未实现 / baseURL 非法时抛 ClewProviderConfigError（明确报错，不静默回落）。
 */
export async function createClewExtractProviderFromEnv(): Promise<ClewExtractProvider | null> {
  const config = resolveClewTaskModel("extraction");
  if (!isClewTaskConfigured("extraction")) {
    return null;
  }
  const { createDashScopeClewExtractProvider } = await import("./providers/dashscope-extract");
  return createDashScopeClewExtractProvider(config);
}
