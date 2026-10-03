/**
 * Clew 编译范围与指纹决策（ZCODE-M3 Phase 3，纯函数可测试）。
 * - pending 过滤在路由层调用（compiler.ts 纯编排不动）；
 * - 指纹比较：缓存指纹非空且与当前不一致 → 强制全量编译并给出提示文案。
 */

import type { ClewChapterStatus } from "@/types/clew";

export type CompileScope = "pending" | "all";

export type CompileScopeChapter = {
  id: string;
  order: number;
  title: string;
  status: ClewChapterStatus;
};

/** 待编译章节：status 为 pending | failed（失败章计入重试范围）。 */
export function filterCompileChapters<Chapter extends CompileScopeChapter>(
  chapters: readonly Chapter[],
  scope: CompileScope,
): Chapter[] {
  if (scope === "all") {
    return [...chapters];
  }
  return chapters.filter((chapter) => chapter.status === "pending" || chapter.status === "failed");
}

export type ResolvedCompileScope = {
  scope: CompileScope;
  /** 指纹变化强制全量时的提示（SSE progress 事件文案）；无变化为 undefined。 */
  forcedNote?: string;
};

/**
 * 指纹决策：缓存指纹非空、当前指纹可得、且两者不同 → 强制 "all"。
 * 其余情况沿用调用方请求的 scope（默认 pending）。
 */
export function resolveCompileScope(
  requested: CompileScope,
  cachedFingerprint: string | null | undefined,
  currentFingerprint: string | null,
): ResolvedCompileScope {
  const cached = (cachedFingerprint ?? "").trim();
  const current = (currentFingerprint ?? "").trim();
  if (cached.length > 0 && current.length > 0 && cached !== current) {
    return {
      scope: "all",
      forcedNote: "检测到教材内容已变化，本次改为全量编译。",
    };
  }
  return { scope: requested };
}
