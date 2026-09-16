import "server-only";

import { prisma } from "@/lib/prisma";
import { isPilotFreeCourse } from "@/lib/course-entitlement-policy";

export type CourseAccessResult = {
  access: boolean;
  reason: "pilot-free" | "entitled" | "not-entitled";
};

export async function hasCourseAccess(userId: string, courseId: string): Promise<CourseAccessResult> {
  if (isPilotFreeCourse(courseId)) {
    return { access: true, reason: "pilot-free" };
  }

  const count = await prisma.courseEntitlement.count({
    where: { userId, courseId },
  });
  return { access: count > 0, reason: count > 0 ? "entitled" : "not-entitled" };
}

export async function grantCourseEntitlement(userId: string, courseId: string): Promise<void> {
  if (isPilotFreeCourse(courseId)) {
    throw new Error("试点课程对所有人免费，不需要占用官方课名额。");
  }

  await prisma.courseEntitlement.upsert({
    where: { userId_courseId: { userId, courseId } },
    create: { userId, courseId },
    update: { grantedAt: new Date() },
  });
}
