import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionBankPractice } from "@/components/question-bank-practice";
import { getPublishedCourseBySlug } from "@/content/courses";
import {
  selectAssessmentItemsForChapter,
  selectChapterBySlug,
  selectQuestionById,
} from "@/lib/course-selectors";

type QuestionBankPracticePageProps = {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    questionId: string;
  }>;
};

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: QuestionBankPracticePageProps): Promise<Metadata> {
  const { courseSlug, chapterSlug, questionId } = await params;
  const course = getPublishedCourseBySlug(courseSlug);

  if (!course) {
    return { title: "题目未找到｜NUR LEARN" };
  }

  const chapter = selectChapterBySlug(course, chapterSlug);
  const question = selectQuestionById(course, questionId);

  if (!chapter || !question) {
    return { title: "题目未找到｜NUR LEARN" };
  }

  const truncatedPrompt =
    question.prompt.length > 50
      ? question.prompt.slice(0, 47) + "..."
      : question.prompt;

  return {
    title: `${truncatedPrompt} · ${chapter.title}｜NUR LEARN`,
  };
}

export default async function QuestionBankPracticePage({
  params,
}: QuestionBankPracticePageProps) {
  const { courseSlug, chapterSlug, questionId } = await params;
  const course = getPublishedCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  const chapter = selectChapterBySlug(course, chapterSlug);
  if (!chapter) {
    notFound();
  }

  const question = selectQuestionById(course, questionId);
  if (!question) {
    notFound();
  }

  const items = selectAssessmentItemsForChapter(course, chapter.id);
  const currentIndex = items.findIndex((item) => item.id === questionId);
  if (currentIndex === -1) {
    notFound();
  }

  return (
    <QuestionBankPractice
      course={course}
      chapter={chapter}
      items={items}
      currentIndex={currentIndex}
    />
  );
}
