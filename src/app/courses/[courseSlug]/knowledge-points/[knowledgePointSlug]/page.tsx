import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgePointLesson } from "@/components/knowledge-point-lesson";
import { getCourseBySlug, registeredCourses } from "@/content/courses";
import { getDemoLearnerStateByCourseId } from "@/content/demo";
import { assertValidLearnerCourseState } from "@/lib/course-validation";
import {
  selectChapterForKnowledgePoint,
  selectKnowledgePointBySlug,
  selectPrimaryCaseForKnowledgePoint,
  selectSourcesByIds,
} from "@/lib/course-selectors";

type KnowledgePointPageProps = {
  params: Promise<{
    courseSlug: string;
    knowledgePointSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return registeredCourses.flatMap((course) => (
    course.knowledgePoints
      .filter((knowledgePoint) => knowledgePoint.lesson !== null)
      .map((knowledgePoint) => ({
        courseSlug: course.slug,
        knowledgePointSlug: knowledgePoint.slug,
      }))
  ));
}

export async function generateMetadata({
  params,
}: KnowledgePointPageProps): Promise<Metadata> {
  const { courseSlug, knowledgePointSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const knowledgePoint = course
    ? selectKnowledgePointBySlug(course, knowledgePointSlug)
    : undefined;

  if (!course || !knowledgePoint?.lesson) {
    return { title: "知识点未找到｜NUR LEARN" };
  }

  return {
    title: `${knowledgePoint.title}｜${course.title}｜NUR LEARN`,
    description: knowledgePoint.lesson.objective,
  };
}

export default async function KnowledgePointPage({
  params,
}: KnowledgePointPageProps) {
  const { courseSlug, knowledgePointSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  const knowledgePoint = selectKnowledgePointBySlug(course, knowledgePointSlug);
  if (!knowledgePoint?.lesson) {
    notFound();
  }

  const chapter = selectChapterForKnowledgePoint(course, knowledgePoint.id);
  const learnerState = getDemoLearnerStateByCourseId(course.id);
  const transferCase = selectPrimaryCaseForKnowledgePoint(course, knowledgePoint.id);
  if (!chapter || !learnerState) {
    notFound();
  }

  assertValidLearnerCourseState(course, learnerState);
  const referenceSources = selectSourcesByIds(
    course,
    knowledgePoint.lesson.sourceIds,
  );

  return (
    <KnowledgePointLesson
      course={course}
      chapter={chapter}
      knowledgePoint={knowledgePoint}
      learnerState={learnerState}
      referenceSources={referenceSources}
      transferCase={transferCase ?? null}
    />
  );
}
