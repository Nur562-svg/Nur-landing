import type { AuthUserView } from "@/types/auth";
import type { HiDocTextbookView } from "@/types/hidoc";

/**
 * Workspace 壳的数据源（R1）。
 * 主入口为静态聚合；书架教材列表由客户端按需拉取，失败时静默降级为空。
 */

export type ShellEntry = {
  id: string;
  label: string;
  href: string;
};

/** 主入口：学习主环为默认工作台；Hi doc / 题库为从属入口（IA 拍板 2026-09-21）。 */
export const PRIMARY_ENTRIES: readonly ShellEntry[] = [
  { id: "learn", label: "学习主环", href: "/learn" },
  { id: "hidoc", label: "Hi doc", href: "/learn/hi-doc" },
  { id: "courses", label: "官方课程", href: "/courses" },
  { id: "question-bank", label: "题库", href: "/question-bank" },
  { id: "membership", label: "会员", href: "/account/billing" },
];

/** 进行中课程（试点课对所有人免费）。 */
export const ACTIVE_COURSE_ENTRIES: readonly ShellEntry[] = [
  { id: "course-tcm-diagnostics", label: "中医诊断学", href: "/courses/tcm-diagnostics" },
  { id: "course-physiology", label: "生理学", href: "/courses/physiology" },
];

export type ShellTextbook = Pick<HiDocTextbookView, "id" | "title" | "chapterCount" | "isFrozen">;

/** 书架最近教材（最多 3 本，按创建时间倒序——API 已排序）。 */
export async function fetchRecentTextbooks(): Promise<readonly ShellTextbook[]> {
  try {
    const response = await fetch("/api/hidoc/textbooks", { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const payload = (await response.json()) as { ok?: boolean; shelf?: { textbooks?: HiDocTextbookView[] } };
    const textbooks = payload.shelf?.textbooks ?? [];
    return textbooks.slice(0, 3).map((book) => ({
      id: book.id,
      title: book.title,
      chapterCount: book.chapterCount,
      isFrozen: book.isFrozen,
    }));
  } catch {
    return [];
  }
}

/** 会话用户（复用 /api/auth/session；仅在需要展示用户/会员状态时调用）。 */
export function toShellUser(user: AuthUserView): { displayName: string; membershipTier: string } {
  return { displayName: user.displayName, membershipTier: user.membershipTier };
}
