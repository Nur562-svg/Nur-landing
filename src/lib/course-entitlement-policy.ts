import type { MembershipTier } from "@/types/auth";

export const PILOT_FREE_COURSE_IDS = [
  "course-tcm-diagnostics",
  "course-physiology",
] as const;

export type CourseEntitlementLimit = number | "unlimited";

export function isPilotFreeCourse(courseId: string): boolean {
  return PILOT_FREE_COURSE_IDS.includes(courseId as (typeof PILOT_FREE_COURSE_IDS)[number]);
}

export function getCourseEntitlementLimit(tier: MembershipTier): CourseEntitlementLimit {
  switch (tier) {
    case "free":
    case "basic":
      return 2;
    case "pro":
      return 5;
    case "max":
      return "unlimited";
  }
}
