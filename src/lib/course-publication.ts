/**
 * 课程对公发布面（与课程注册表分离）。
 *
 * registeredCourses 仍是完整校验真相；对学习者露出的列表/静态路由
 * 只使用已发布子集。默认白名单：中诊闭环 + 生理学闭环 + 生理学题库。
 *
 * 覆盖：
 * - NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS=*  → 全部已注册课程（本地/内测）
 * - NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS=a,b → 显式名单
 * - 未设置 → 使用 DEFAULT_PUBLISHED_COURSE_SLUGS
 *
 * 传染病学等未注册 extracted 底稿不在此列，也不进入本次发布。
 */

export const DEFAULT_PUBLISHED_COURSE_SLUGS = [
  "tcm-diagnostics",
  "physiology",
  "physiology-qb",
] as const;

export function resolvePublishedCourseSlugs(): readonly string[] | "all" {
  const raw = process.env.NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS?.trim();
  if (!raw) {
    return DEFAULT_PUBLISHED_COURSE_SLUGS;
  }
  if (raw === "*") {
    return "all";
  }
  return raw.split(",").map((slug) => slug.trim()).filter((slug) => slug.length > 0);
}

export function isPublishedCourseSlug(slug: string): boolean {
  const resolved = resolvePublishedCourseSlugs();
  if (resolved === "all") return true;
  return resolved.includes(slug);
}
