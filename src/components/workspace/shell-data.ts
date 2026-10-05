import type { AuthUserView } from "@/types/auth";
import type { ClewTextbookView } from "@/types/clew";

/**
 * Workspace 壳的数据源（R1）。
 * 主入口为静态聚合；书架教材列表由客户端按需拉取，失败时静默降级为空。
 */

export type ShellEntry = {
  id: string;
  label: string;
  href: string;
};

/** 主入口：我的学习为默认工作台（个人学习状态 + 官方更新）；Clew / 题库为从属入口（IA 拍板 2026-09-21；命名 2026-10-05 改定——「学习闭环」叙事属官方课，本页不冒用）。 */
export const PRIMARY_ENTRIES: readonly ShellEntry[] = [
  { id: "learn", label: "我的学习", href: "/learn" },
  { id: "clew", label: "Clew", href: "/learn/clew" },
  { id: "courses", label: "官方课程", href: "/courses" },
  { id: "question-bank", label: "题库", href: "/question-bank" },
  { id: "membership", label: "会员", href: "/account/billing" },
];

/** 进行中课程（试点课对所有人免费）。 */
export const ACTIVE_COURSE_ENTRIES: readonly ShellEntry[] = [
  { id: "course-tcm-diagnostics", label: "中医诊断学", href: "/courses/tcm-diagnostics" },
  { id: "course-physiology", label: "生理学", href: "/courses/physiology" },
];

export type ShellTextbook = Pick<ClewTextbookView, "id" | "title" | "chapterCount" | "isFrozen">;

/** 左栏常驻配额 chip 用：本月教材名额（真实数据，来自书架 API 的 quota）。 */
export type ShellQuota = {
  used: number;
  limit: number;
};

/** 书架最近教材 + 当月名额（最多 3 本，按创建时间倒序——API 已排序；失败时静默降级）。 */
export async function fetchShelfSummary(): Promise<{
  textbooks: readonly ShellTextbook[];
  quota: ShellQuota | null;
}> {
  try {
    const response = await fetch("/api/clew/textbooks", { cache: "no-store" });
    if (!response.ok) {
      return { textbooks: [], quota: null };
    }
    const payload = (await response.json()) as {
      ok?: boolean;
      shelf?: { textbooks?: ClewTextbookView[]; quota?: { used?: number; limit?: number } };
    };
    const textbooks = payload.shelf?.textbooks ?? [];
    const quota = payload.shelf?.quota;
    return {
      textbooks: textbooks.slice(0, 3).map((book) => ({
        id: book.id,
        title: book.title,
        chapterCount: book.chapterCount,
        isFrozen: book.isFrozen,
      })),
      quota:
        quota && typeof quota.used === "number" && typeof quota.limit === "number"
          ? { used: quota.used, limit: quota.limit }
          : null,
    };
  } catch {
    return { textbooks: [], quota: null };
  }
}

/** 会话用户（复用 /api/auth/session；仅在需要展示用户/会员状态时调用）。 */
export function toShellUser(user: AuthUserView): { displayName: string; membershipTier: string } {
  return { displayName: user.displayName, membershipTier: user.membershipTier };
}
