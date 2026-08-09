import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseReasoningRoom } from "@/components/case-reasoning-room";
import { getCourseBySlug, registeredCourses } from "@/content/courses";
import { getDemoLearnerStateByCourseId } from "@/content/demo";
import { assertValidLearnerCourseState } from "@/lib/course-validation";
import {
  selectChapterForKnowledgePoint,
  selectKnowledgePointBySlug,
  selectPrimaryCaseForKnowledgePoint,
  selectSourcesByIds,
} from "@/lib/course-selectors";

type CaseReasoningPageProps = {
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
        selectPrimaryCaseForKnowledgePoint(course, knowledgePoint.id) !== undefined
      ))
      .map((knowledgePoint) => ({
        courseSlug: course.slug,
        knowledgePointSlug: knowledgePoint.slug,
      }))
  ));
}

export async function generateMetadata({
  params,
}: CaseReasoningPageProps): Promise<Metadata> {
  const { courseSlug, knowledgePointSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const knowledgePoint = course
    ? selectKnowledgePointBySlug(course, knowledgePointSlug)
    : undefined;
  const caseDefinition = course && knowledgePoint
    ? selectPrimaryCaseForKnowledgePoint(course, knowledgePoint.id)
    : undefined;

  if (!course || !knowledgePoint || !caseDefinition) {
    return { title: "案例推理训练室未找到｜NUR LEARN" };
  }

  return {
    title: `案例推理训练室｜${knowledgePoint.title}｜NUR LEARN`,
    description: `围绕${knowledgePoint.title}训练证据、病机、证型与鉴别排除的完整推理链。`,
  };
}

export default async function CaseReasoningPage({
  params,
}: CaseReasoningPageProps) {
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
  const caseDefinition = selectPrimaryCaseForKnowledgePoint(course, knowledgePoint.id);
  if (!chapter || !learnerState || !caseDefinition) {
    notFound();
  }

  assertValidLearnerCourseState(course, learnerState);
  const referenceSources = selectSourcesByIds(course, caseDefinition.sourceIds);

  return (
    <CaseReasoningRoom
      course={course}
      chapter={chapter}
      knowledgePoint={knowledgePoint}
      learnerState={learnerState}
      caseDefinition={caseDefinition}
      referenceSources={referenceSources}
    />
  );
}
