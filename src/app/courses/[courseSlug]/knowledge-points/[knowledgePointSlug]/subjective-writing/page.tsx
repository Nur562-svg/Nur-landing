import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectiveWritingRoom } from "@/components/subjective-writing-room";
import { getCourseBySlug, registeredCourses } from "@/content/courses";
import { getDemoLearnerStateByCourseId } from "@/content/demo";
import { assertValidLearnerCourseState } from "@/lib/course-validation";
import {
  selectAssessmentItemsForKnowledgePoint,
  selectChapterForKnowledgePoint,
  selectKnowledgePointBySlug,
  selectSourcesByIds,
  selectSubjectiveWritingItems,
} from "@/lib/course-selectors";

type SubjectiveWritingPageProps = {
  params: Promise<{
    courseSlug: string;
    knowledgePointSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return registeredCourses.flatMap((course) => (
    course.knowledgePoints
      .filter((knowledgePoint) => (
        selectSubjectiveWritingItems(course, knowledgePoint.id).length > 0
      ))
      .map((knowledgePoint) => ({
        courseSlug: course.slug,
        knowledgePointSlug: knowledgePoint.slug,
      }))
  ));
}

export async function generateMetadata({
  params,
}: SubjectiveWritingPageProps): Promise<Metadata> {
  const { courseSlug, knowledgePointSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const knowledgePoint = course
    ? selectKnowledgePointBySlug(course, knowledgePointSlug)
    : undefined;

  if (!course || !knowledgePoint) {
    return { title: "写作训练室未找到｜NUR LEARN" };
  }

  return {
    title: `主观题写作训练室｜${knowledgePoint.title}｜NUR LEARN`,
    description: `围绕${knowledgePoint.title}训练完整的名词解释与简答题表达。`,
  };
}

export default async function SubjectiveWritingPage({
  params,
}: SubjectiveWritingPageProps) {
  const { courseSlug, knowledgePointSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  const knowledgePoint = selectKnowledgePointBySlug(course, knowledgePointSlug);
  if (!knowledgePoint) {
    notFound();
  }

  const chapter = selectChapterForKnowledgePoint(course, knowledgePoint.id);
  const learnerState = getDemoLearnerStateByCourseId(course.id);
  const writingItems = selectSubjectiveWritingItems(course, knowledgePoint.id);
  if (!chapter || !learnerState || writingItems.length === 0) {
    notFound();
  }

  assertValidLearnerCourseState(course, learnerState);

  const assessmentItems = selectAssessmentItemsForKnowledgePoint(
    course,
    knowledgePoint.id,
  );
  const sourceCandidates = assessmentItems.filter((item) => (
    item.promptSource.wording === "source-verbatim"
  ));
  const referenceSources = selectSourcesByIds(
    course,
    assessmentItems.flatMap((item) => item.sourceIds),
  );

  return (
    <SubjectiveWritingRoom
      course={course}
      chapter={chapter}
      knowledgePoint={knowledgePoint}
      learnerState={learnerState}
      writingItems={writingItems}
      sourceCandidates={sourceCandidates}
      referenceSources={referenceSources}
    />
  );
}
