/**
 * 课程对公发布面（与课程注册表分离）。
 *
 * registeredCourses 仍是完整校验真相。学习者列表/路由使用已发布子集。
 *
 * 默认：全部**已注册**课程可见（内测/无法取得出版社授权时不阻塞做题）。
 * 对公收窄时用环境变量显式名单，不要靠改代码。
 *
 * 覆盖：
 * - 未设置或 NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS=*  → 全部已注册课程
 * - NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS=a,b         → 仅这些 slug
 *
 * 未注册底稿（如传染病学 A16 extracted）不在 registeredCourses，直链仍 404。
 * 无授权不得对外售卖题库内容——这是经营约束，不是把课从产品里拆掉。
 */

/** 若将来要对公收窄，可把 env 设成这些 slug。 */
export const NARROW_LAUNCH_COURSE_SLUGS = [
  "tcm-diagnostics",
  "physiology",
  "physiology-qb",
] as const;

export function resolvePublishedCourseSlugs(): readonly string[] | "all" {
  const raw = process.env.NEXT_PUBLIC_PUBLISHED_COURSE_SLUGS?.trim();
  if (!raw || raw === "*") {
    return "all";
  }
  return raw.split(",").map((slug) => slug.trim()).filter((slug) => slug.length > 0);
}

export function isPublishedCourseSlug(slug: string): boolean {
  const resolved = resolvePublishedCourseSlugs();
  if (resolved === "all") return true;
  return resolved.includes(slug);
}
