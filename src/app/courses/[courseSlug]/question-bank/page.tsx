import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionBankHome } from "@/components/question-bank-home";
import { getCourseBySlug, registeredCourses } from "@/content/courses";
import { getDemoLearnerStateByCourseId } from "@/content/demo";
import { assertValidLearnerCourseState } from "@/lib/course-validation";

type QuestionBankPageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return registeredCourses.map((course) => ({
    courseSlug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: QuestionBankPageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return { title: "题库未找到｜NUR LEARN" };
  }

  return {
    title: `${course.title} · 题库｜NUR LEARN`,
    description: `${course.title}的章节题库，按章节浏览题目、分题型练习并查看作答统计。`,
  };
}

export default async function QuestionBankPage({
  params,
}: QuestionBankPageProps) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  const learnerState = getDemoLearnerStateByCourseId(course.id);
  if (!learnerState) {
    notFound();
  }

  assertValidLearnerCourseState(course, learnerState);

  return (
    <QuestionBankHome
      course={course}
      learnerState={learnerState}
    />
  );
}
