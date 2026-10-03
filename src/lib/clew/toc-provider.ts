import "server-only";

import type { ClewPrintedTocEntry } from "./toc-heuristic";
import { isClewTaskConfigured, resolveClewTaskModel } from "./providers/model-config";

/**
 * Clew 目录解析模型边界（provider-neutral，仿 course-builder/nur-agent 适配器模式）。
 * 模型只做一件事：把「目录页文字」整理成章节条目（标题 + 页码）。
 * 不写库、不改状态、不生成课程事实；页码偏移与合法性由确定性代码负责。
 */

export type ClewTocModelInput = {
  textbookTitle: string;
  pageCount: number;
  /** 目录页文字（已在调用方做长度上限裁剪）。 */
  tocText: string;
};

export type ClewTocProvider = {
  id: string;
  model: string;
  parseToc(input: ClewTocModelInput): Promise<ClewPrintedTocEntry[]>;
};

export class ClewTocProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewTocProviderError";
  }
}

/** 目录文字传输上限：只发目录页文字，绝不发整本教材。 */
export const CLEW_TOC_TEXT_MAX_CHARS = 12_000;

/**
 * 按任务级 env 解析构造目录解析 provider（ZCODE-M4 多模型：resolve → 校验 → 动态 import adapter）。
 * 未配置密钥时返回 null（调用方如实降级为纯启发式，不静默假装调用过模型）；
 * provider 未实现 / baseURL 非法时抛 ClewProviderConfigError（明确报错，不静默回落）。
 */
export async function createClewTocProviderFromEnv(): Promise<ClewTocProvider | null> {
  const config = resolveClewTaskModel("toc");
  if (!isClewTaskConfigured("toc")) {
    return null;
  }
  const { createDashScopeClewTocProvider } = await import("./providers/dashscope-toc");
  return createDashScopeClewTocProvider(config);
}