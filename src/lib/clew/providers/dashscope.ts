import "server-only";

import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";
import {
  ClewProviderConfigError,
  describeClewTaskModel,
  isClewTaskConfigured,
  resolveClewTaskModel,
  type ClewProviderTask,
} from "./model-config";

/**
 * Clew 模型门面（ZCODE-M4 Phase 3）：保留既有导出名，语义改为基于
 * model-config 的任务级解析（默认 task = lesson）。
 * API key 只在服务端读取（.env.local），绝不落入客户端 bundle 或数据库。
 */

export { ClewProviderConfigError };
export type { ClewProviderTask } from "./model-config";

/** 默认任务（lesson）是否已配置可用模型（未配置时调用方应走明确报错或既有启发式兜底，不静默放行）。 */
export function isClewModelConfigured(): boolean {
  return isClewTaskConfigured("lesson");
}

function toLanguageModel(config: ReturnType<typeof resolveClewTaskModel>): LanguageModel {
  const openai = createOpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
  });
  return openai(config.model);
}

/** 按任务解析并构造 LanguageModel；未实现 provider / 缺 key / baseURL 非法 → 抛 ClewProviderConfigError。 */
export function getClewModelForTask(task: ClewProviderTask): LanguageModel {
  const config = resolveClewTaskModel(task);
  if (!isClewTaskConfigured(task)) {
    throw new ClewProviderConfigError(
      `未配置 Clew 模型（任务 ${task}，provider=${config.provider} 的密钥未就绪），请先在服务端配置密钥。`,
    );
  }
  return toLanguageModel(config);
}

/** 获取 Clew 默认模型（LanguageModel，供 ToolLoopAgent 使用；默认 task = lesson）。 */
export function getClewModel(): LanguageModel {
  return getClewModelForTask("lesson");
}

/** 当前生效的模型描述（不含密钥），供事件与日志如实标注生成来源；格式恒为 `{provider}:{model}`。 */
export function describeClewModel(): string {
  return describeClewTaskModel("lesson");
}
