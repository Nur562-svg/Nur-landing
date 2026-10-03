import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedCourseBySlug, publishedCourses } from "@/content/courses";
import { MockExamRoom } from "@/components/mock-exam-room";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCourses.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getPublishedCourseBySlug(courseSlug);
  if (!course) {
    return { title: "模考｜Ariadne" };
  }
  return {
    title: `${course.title} 模考｜Ariadne`,
    description: `按蓝图组卷的完整模考（100 分）。客观题自动评分，主观题提供自核与 NUR 结构参考。`,
  };
}

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getPublishedCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }
  return <MockExamRoom course={course} />;
}
