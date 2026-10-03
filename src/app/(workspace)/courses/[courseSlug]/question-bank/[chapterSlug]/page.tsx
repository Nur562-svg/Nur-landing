import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionBankChapter } from "@/components/question-bank-chapter";
import { getPublishedCourseBySlug, publishedCourses } from "@/content/courses";
import {
  selectAssessmentItemsForChapter,
  selectChapterBySlug,
} from "@/lib/course-selectors";

type QuestionBankChapterPageProps = {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCourses.flatMap((course) =>
    course.chapters.map((chapter) => ({
      courseSlug: course.slug,
      chapterSlug: chapter.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: QuestionBankChapterPageProps): Promise<Metadata> {
  const { courseSlug, chapterSlug } = await params;
  const course = getPublishedCourseBySlug(courseSlug);

  if (!course) {
    return { title: "题库章节未找到｜Ariadne" };
  }

  const chapter = selectChapterBySlug(course, chapterSlug);
  if (!chapter) {
    return { title: "题库章节未找到｜Ariadne" };
  }

  return {
    title: `${chapter.title} · 题库｜${course.title}｜Ariadne`,
    description: `查看${course.title}中${chapter.title}的所有题目并开始刷题。`,
  };
}

export default async function QuestionBankChapterPage({
  params,
}: QuestionBankChapterPageProps) {
  const { courseSlug, chapterSlug } = await params;
  const course = getPublishedCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  const chapter = selectChapterBySlug(course, chapterSlug);
  if (!chapter) {
    notFound();
  }

  const items = selectAssessmentItemsForChapter(course, chapter.id);

  return (
    <QuestionBankChapter
      course={course}
      chapter={chapter}
      items={items}
    />
  );
}
