import "server-only";

import type { ClewNoteModelInput } from "./note-heuristic";
import { isClewTaskConfigured, resolveClewTaskModel } from "./providers/model-config";

/**
 * Clew 学霸笔记模型边界（provider-neutral）。
 * 模型只做一件事：读该章聚合上下文（讲义要点/划重点/批注/追问），流式写出一份章级复习笔记 markdown。
 * 不写库、不改状态；结构合法性由确定性代码（note-heuristic）校验。
 */

export type ClewNoteProvider = {
  id: string;
  model: string;
  /** 流式生成章级笔记；增量通过 onDelta 回调，返回完整 markdown。 */
  generateNote(input: ClewNoteModelInput, onDelta: (text: string) => void): Promise<string>;
};

export class ClewNoteProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewNoteProviderError";
  }
}

/**
 * 按任务级 env 解析构造笔记 provider（ZCODE-M4 多模型：resolve → 校验 → 动态 import adapter）。
 * 未配置密钥时返回 null（调用方改走启发式兜底并明确标注「未接入模型」，不占模型额度）；
 * provider 未实现 / baseURL 非法时抛 ClewProviderConfigError（明确报错，不静默回落）。
 */
export async function createClewNoteProviderFromEnv(): Promise<ClewNoteProvider | null> {
  const config = resolveClewTaskModel("note");
  if (!isClewTaskConfigured("note")) {
    return null;
  }
  const { createDashScopeClewNoteProvider } = await import("./providers/dashscope-note");
  return createDashScopeClewNoteProvider(config);
}
