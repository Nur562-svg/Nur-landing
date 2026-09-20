import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionBankPractice } from "@/components/question-bank-practice";
import { getPublishedCourseBySlug } from "@/content/courses";
import {
  selectAssessmentItemsForChapter,
  selectChapterBySlug,
  selectQuestionById,
} from "@/lib/course-selectors";
import {
  filterQuestionBankItemsByKinds,
  parseQuestionBankKindQuery,
} from "@/lib/question-kind-labels";

type QuestionBankPracticePageProps = {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    questionId: string;
  }>;
  searchParams: Promise<{
    kinds?: string | string[];
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
  searchParams,
}: QuestionBankPracticePageProps) {
  const { courseSlug, chapterSlug, questionId } = await params;
  const query = await searchParams;
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

  const kindsValue = Array.isArray(query.kinds) ? query.kinds[0] : query.kinds;
  const kinds = parseQuestionBankKindQuery(kindsValue);
  const chapterItems = selectAssessmentItemsForChapter(course, chapter.id);
  const items = filterQuestionBankItemsByKinds(chapterItems, kinds);
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
      progressItems={chapterItems}
      kindsQuery={kinds.length > 0 ? kinds.join(",") : null}
    />
  );
}
