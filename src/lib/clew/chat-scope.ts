import type { ClewChatScope } from "@/types/clew";

/**
 * 讲解「依据范围」常量（client-safe 纯函数；DESIGN_V4 §五 P0-3 / 批 3）。
 * 缺省 lesson+source 与 M1–M4 现状逐字一致；数组顺序即 composer chip 排展示顺序。
 */

export const CLEW_CHAT_SCOPES: readonly ClewChatScope[] = [
  "lesson-only",
  "lesson+source",
  "extended",
];

export const CLEW_CHAT_SCOPE_LABELS: Record<ClewChatScope, string> = {
  "lesson-only": "仅依据讲义",
  "lesson+source": "讲义 + 教材原文",
  extended: "允许结合背景拓展",
};

/** 校验任意输入是否为已注册的依据范围（chip 选择 / 请求参数校验用）。 */
export function isClewChatScope(value: unknown): value is ClewChatScope {
  return typeof value === "string" && (CLEW_CHAT_SCOPES as readonly string[]).includes(value);
}

/** 校验任意不可信输入（请求体 / localStorage）；非法值回落缺省（不猜）。 */
export function resolveClewChatScope(value: unknown): ClewChatScope {
  return isClewChatScope(value) ? value : "lesson+source";
}
