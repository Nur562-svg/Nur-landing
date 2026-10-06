import "server-only";

/**
 * Clew 多模型任务级配置解析（ZCODE-M4 Phase 3，server-only）。
 * 五类任务（toc/extraction/lesson/chat/note）可分别指向任意 OpenAI 兼容端点：
 * DashScope / DeepSeek / Kimi / 智谱 / 本地 Ollama，全部通过服务端 env 配置；
 * 默认行为（DashScope qwen3.7-plus）与 M4 之前分毫不变。
 * 铁律：未实现 provider 与非法 baseURL 必须抛 ClewProviderConfigError（明确报错，绝不静默回落）；
 * 密钥只在服务端 env 读取，绝不进入日志、notes、事件 payload 或客户端 bundle。
 *
 * 环境变量与优先级（任务级 > 全局 > 缺省）：
 * - provider：CLEW_{TASK}_PROVIDER（EXTRACT/TOC 为既有变量）→ CLEW_MODEL_PROVIDER → dashscope
 * - model：CLEW_{TASK}_MODEL（既有）→ [lesson/chat/note 既有 legacy 链：CLEW_EXTRACT_MODEL] → CLEW_MODEL → qwen3.7-plus
 * - baseURL：CLEW_{TASK}_BASE_URL → CLEW_MODEL_BASE_URL → (dashscope) DASHSCOPE_BASE_URL → compatible-mode 缺省；(openai-compatible) 必填
 * - apiKey：CLEW_{TASK}_API_KEY → dashscope: DASHSCOPE_API_KEY ｜ openai-compatible: CLEW_MODEL_API_KEY
 */

export type ClewModelProviderId =
  | "dashscope"
  | "deepseek"
  | "kimi"
  | "zhipu"
  | "openai-compatible";

export type ClewProviderTask = "toc" | "extraction" | "lesson" | "chat" | "note" | "practice";

/** ZCODE-M6：练习生成思考强度（D8 定案：模型路由——standard=qwen 非思考 / deep=deepseek-flash 默认思考）。 */
export type ClewPracticeIntensity = "standard" | "deep";

export type ResolvedClewModelConfig = {
  provider: string;
  model: string;
  apiKey: string;
  baseURL: string;
  task: ClewProviderTask;
};

export class ClewProviderConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClewProviderConfigError";
  }
}

const IMPLEMENTED_PROVIDERS: readonly string[] = ["dashscope", "deepseek", "openai-compatible"];

const DASHSCOPE_DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const DEEPSEEK_DEFAULT_BASE_URL = "https://api.deepseek.com/v1";
const DEFAULT_MODEL = "qwen3.7-plus";
/** DeepSeek V4.1 Flash 的 API 模型 id（营销名 deepseek-v4.1-flash 会被 API 400 拒绝；M6-0 探针实测）。 */
export const DEEPSEEK_FLASH_MODEL = "deepseek-flash";

/** 已核实的 OpenAI 兼容端点示例（2026-10-02，来源：各家官方文档），用于报错指引。 */
const PROVIDER_GUIDANCE =
  "可用 openai-compatible + 对应 baseURL。已核实端点示例："
  + "DeepSeek https://api.deepseek.com ｜ Kimi https://api.moonshot.cn/v1 ｜ "
  + "智谱 GLM https://open.bigmodel.cn/api/paas/v4 ｜ "
  + "本地 Ollama http://localhost:11434/v1（API key 可填任意占位值，如 ollama）。";

/** 任务级 env 变量名 = 任务前缀 + 后缀（PROVIDER / MODEL / BASE_URL / API_KEY）。 */
const TASK_ENV_PREFIX: Record<ClewProviderTask, string> = {
  toc: "CLEW_TOC",
  extraction: "CLEW_EXTRACT",
  lesson: "CLEW_LESSON",
  chat: "CLEW_CHAT",
  note: "CLEW_NOTE",
  practice: "CLEW_PRACTICE",
};

function taskEnvName(task: ClewProviderTask, suffix: "PROVIDER" | "MODEL" | "BASE_URL" | "API_KEY"): string {
  return `${TASK_ENV_PREFIX[task]}_${suffix}`;
}

export type ClewEnvSource = Record<string, string | undefined>;

/** 读 env：undefined 或 trim 后为空串一律视为未设置（与既有 resolver 语义一致）。 */
function readEnv(env: ClewEnvSource, name: string): string | undefined {
  const value = env[name];
  if (value === undefined) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function resolveProviderId(task: ClewProviderTask, env: ClewEnvSource): string {
  return readEnv(env, taskEnvName(task, "PROVIDER"))
    ?? readEnv(env, "CLEW_MODEL_PROVIDER")
    ?? "dashscope";
}

function resolveModelId(task: ClewProviderTask, env: ClewEnvSource): string {
  return readEnv(env, taskEnvName(task, "MODEL"))
    // 既有 legacy 链：lesson/chat/note 的模型曾回落到 CLEW_EXTRACT_MODEL，继续生效
    ?? (task === "lesson" || task === "chat" || task === "note"
      ? readEnv(env, "CLEW_EXTRACT_MODEL")
      : undefined)
    ?? readEnv(env, "CLEW_MODEL")
    ?? DEFAULT_MODEL;
}

function resolveBaseURL(task: ClewProviderTask, provider: string, env: ClewEnvSource): string {
  const explicit = readEnv(env, taskEnvName(task, "BASE_URL")) ?? readEnv(env, "CLEW_MODEL_BASE_URL");
  if (explicit) {
    return explicit;
  }
  if (provider === "dashscope") {
    return readEnv(env, "DASHSCOPE_BASE_URL") ?? DASHSCOPE_DEFAULT_BASE_URL;
  }
  if (provider === "deepseek") {
    return DEEPSEEK_DEFAULT_BASE_URL;
  }
  throw new ClewProviderConfigError(
    `openai-compatible provider 必须提供 baseURL：设置 ${taskEnvName(task, "BASE_URL")} 或 CLEW_MODEL_BASE_URL（如 https://api.deepseek.com）。`,
  );
}

function resolveApiKey(task: ClewProviderTask, provider: string, env: ClewEnvSource): string {
  const taskKey = readEnv(env, taskEnvName(task, "API_KEY"));
  if (taskKey) {
    return taskKey;
  }
  if (provider === "dashscope") {
    return env["DASHSCOPE_API_KEY"]?.trim() ?? "";
  }
  if (provider === "deepseek") {
    return env["DEEPSEEK_API_KEY"]?.trim() ?? "";
  }
  if (provider === "openai-compatible") {
    return env["CLEW_MODEL_API_KEY"]?.trim() ?? "";
  }
  return "";
}

function isLoopbackHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1";
}

function parseBaseURL(baseURL: string): URL {
  try {
    return new URL(baseURL);
  } catch {
    throw new ClewProviderConfigError(`模型 baseURL 不是合法 URL：${baseURL}`);
  }
}

/** baseURL 安全规则：dashscope = https + *.aliyuncs.com；openai-compatible = https（loopback 允许 http）。 */
function assertProviderBaseUrl(provider: string, baseURL: string): void {
  const url = parseBaseURL(baseURL);
  if (provider === "dashscope") {
    if (
      url.protocol !== "https:"
      || (url.hostname !== "dashscope.aliyuncs.com" && !url.hostname.endsWith(".aliyuncs.com"))
    ) {
      throw new ClewProviderConfigError("DashScope base URL 必须是 HTTPS 的 aliyuncs.com 域名");
    }
    return;
  }
  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLoopbackHostname(url.hostname))) {
    throw new ClewProviderConfigError(
      `openai-compatible base URL 必须是 HTTPS（仅本地回环地址允许 HTTP）：${baseURL}`,
    );
  }
}

function assertProviderImplemented(provider: string): void {
  if (IMPLEMENTED_PROVIDERS.includes(provider)) {
    return;
  }
  throw new ClewProviderConfigError(
    `Clew 模型 provider "${provider}" 尚未实现；${PROVIDER_GUIDANCE}`,
  );
}

/** 纯解析核心（供测试直接传 env 对象）；配置错误一律抛 ClewProviderConfigError。 */
export function resolveClewTaskModelFrom(
  task: ClewProviderTask,
  env: ClewEnvSource,
): ResolvedClewModelConfig {
  const provider = resolveProviderId(task, env);
  assertProviderImplemented(provider);
  const model = resolveModelId(task, env);
  const baseURL = resolveBaseURL(task, provider, env);
  assertProviderBaseUrl(provider, baseURL);
  const apiKey = resolveApiKey(task, provider, env);
  return { provider, model, apiKey, baseURL, task };
}

/** 按当前 process.env 解析任务模型配置；未实现 provider / baseURL 非法时抛错。 */
export function resolveClewTaskModel(task: ClewProviderTask): ResolvedClewModelConfig {
  return resolveClewTaskModelFrom(task, process.env as ClewEnvSource);
}

/** 任务是否已配置可用的模型（key+model 齐备）；未实现 provider 视为未配置。 */
export function isClewTaskConfiguredFrom(task: ClewProviderTask, env: ClewEnvSource): boolean {
  const provider = resolveProviderId(task, env);
  if (!IMPLEMENTED_PROVIDERS.includes(provider)) {
    return false;
  }
  return resolveApiKey(task, provider, env).length > 0 && resolveModelId(task, env).length > 0;
}

export function isClewTaskConfigured(task: ClewProviderTask): boolean {
  return isClewTaskConfiguredFrom(task, process.env as ClewEnvSource);
}

/** 非抛错的来源描述（`{provider}:{model}`，供事件与 notes 如实标注生成来源）。 */
export function describeClewTaskModelFrom(task: ClewProviderTask, env: ClewEnvSource): string {
  return `${resolveProviderId(task, env)}:${resolveModelId(task, env)}`;
}

export function describeClewTaskModel(task: ClewProviderTask): string {
  return describeClewTaskModelFrom(task, process.env as ClewEnvSource);
}

/* ---------------- ZCODE-M6：练习生成思考强度（D8：模型路由） ---------------- */

const PRACTICE_DEEP_MODEL_ENV = "CLEW_PRACTICE_DEEP_MODEL";
const PRACTICE_DEEP_BASE_URL_ENV = "CLEW_PRACTICE_DEEP_BASE_URL";
const PRACTICE_DEEP_API_KEY_ENV = "CLEW_PRACTICE_DEEP_API_KEY";

/**
 * 练习生成目标解析（纯函数，供测试直接传 env）：
 * - standard：任务级配置（CLEW_PRACTICE_* → 缺省 dashscope qwen3.7-plus；transport 对 dashscope 注入 enable_thinking:false）；
 * - deep：deepseek-flash（默认思考，探针实测 enable_thinking 对其 no-op）；
 *   未配置 DEEPSEEK_API_KEY（或显式覆盖 key）→ 抛 ClewProviderConfigError，**不静默回落 standard**。
 */
export function resolveClewPracticeTargetFrom(
  intensity: ClewPracticeIntensity,
  env: ClewEnvSource,
): ResolvedClewModelConfig {
  if (intensity === "standard") {
    return resolveClewTaskModelFrom("practice", env);
  }
  const apiKey = readEnv(env, PRACTICE_DEEP_API_KEY_ENV) ?? readEnv(env, "DEEPSEEK_API_KEY");
  if (!apiKey) {
    throw new ClewProviderConfigError(
      "深度档未配置：请在服务端环境设置 DEEPSEEK_API_KEY（或 CLEW_PRACTICE_DEEP_API_KEY）后使用深度模式；本次生成已停止，不降级到标准档。",
    );
  }
  const baseURL = readEnv(env, PRACTICE_DEEP_BASE_URL_ENV) ?? DEEPSEEK_DEFAULT_BASE_URL;
  assertProviderBaseUrl("deepseek", baseURL);
  return {
    provider: "deepseek",
    model: readEnv(env, PRACTICE_DEEP_MODEL_ENV) ?? DEEPSEEK_FLASH_MODEL,
    apiKey,
    baseURL,
    task: "practice",
  };
}

export function resolveClewPracticeTarget(intensity: ClewPracticeIntensity): ResolvedClewModelConfig {
  return resolveClewPracticeTargetFrom(intensity, process.env as ClewEnvSource);
}

/** 校验任意字符串为合法强度（API 输入用）；非法返回 null。 */
export function coerceClewPracticeIntensity(value: unknown): ClewPracticeIntensity | null {
  return value === "standard" || value === "deep" ? value : null;
}
