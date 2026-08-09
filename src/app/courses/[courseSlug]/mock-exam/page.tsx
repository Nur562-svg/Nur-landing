import type { Metadata } from "next";
import { getRequiredCourseBySlug } from "@/content/courses";
import { MockExamRoom } from "@/components/mock-exam-room";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await params;
  try {
    const course = getRequiredCourseBySlug(courseSlug);
    return {
      title: `${course.title} 模考｜NUR LEARN`,
      description: `按蓝图组卷的完整模考（100 分）。客观题自动评分，主观题提供自核与 NUR 结构参考。`,
    };
  } catch {
    return { title: "模考｜NUR LEARN" };
  }
}

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getRequiredCourseBySlug(courseSlug);
  return <MockExamRoom course={course} />;
}
