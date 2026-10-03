import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseLanding } from "@/components/course-landing";
import { getPublishedCourseBySlug, publishedCourses } from "@/content/courses";

type CourseLandingPageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  // 有专属工作台页面的课程（tcm-diagnostics）由静态路由优先渲染，不在此生成
  return publishedCourses
    .filter((course) => course.slug !== "tcm-diagnostics")
    .map((course) => ({
      courseSlug: course.slug,
    }));
}

export async function generateMetadata({
  params,
}: CourseLandingPageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getPublishedCourseBySlug(courseSlug);

  if (!course) {
    return { title: "课程未找到｜Ariadne" };
  }

  return {
    title: `${course.title} 课程工作台｜Ariadne`,
    description: `${course.title}的章节题库、模拟考试与材料来源总入口。`,
  };
}

export default async function CourseLandingPage({
  params,
}: CourseLandingPageProps) {
  const { courseSlug } = await params;
  const course = getPublishedCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  return <CourseLanding course={course} />;
}
