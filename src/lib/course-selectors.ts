import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
  CaseDefinition,
  ChapterDefinition,
  ChapterLearnerProgress,
  CourseDefinition,
  CourseScope,
  KnowledgePointDefinition,
  LearnerCourseState,
  LearningRouteDefinition,
  SourceReference,
  VersionDimension,
} from "@/types/learning";

export type KnowledgePointWorkspaceView = KnowledgePointDefinition & {
  completed: boolean;
};

export type ChapterWorkspaceView = ChapterDefinition & ChapterLearnerProgress & {
  knowledgePoints: readonly KnowledgePointWorkspaceView[];
};

export type ExamSummaryRow = {
  id: string;
  label: string;
  points: number;
};

export type ExamPrioritySummary = {
  lead: string;
  points: number;
  guidance: string;
};

function orderByOrder<T extends { order: number }>(items: readonly T[]): T[] {
  return [...items].sort((left, right) => left.order - right.order);
}

function selectChapterProgress(
  state: LearnerCourseState,
  chapterId: string,
): ChapterLearnerProgress {
  const progress = state.chapterProgress.find((item) => item.chapterId === chapterId);
  if (!progress) {
    throw new Error(`Missing learner progress for chapter: ${chapterId}`);
  }
  return progress;
}

export function selectKnowledgePointById(
  course: CourseDefinition,
  knowledgePointId: string,
): KnowledgePointDefinition | undefined {
  return course.knowledgePoints.find((point) => point.id === knowledgePointId);
}

export function selectKnowledgePointBySlug(
  course: CourseDefinition,
  knowledgePointSlug: string,
): KnowledgePointDefinition | undefined {
  return course.knowledgePoints.find((point) => point.slug === knowledgePointSlug);
}

export function selectChapterById(
  course: CourseDefinition,
  chapterId: string,
): ChapterDefinition | undefined {
  return course.chapters.find((chapter) => chapter.id === chapterId);
}

export function selectChapterForKnowledgePoint(
  course: CourseDefinition,
  knowledgePointId: string,
): ChapterDefinition | undefined {
  return course.chapters.find((chapter) => (
    chapter.knowledgePointIds.includes(knowledgePointId)
  ));
}

export function selectKnowledgePointHref(
  course: CourseDefinition,
  knowledgePoint: KnowledgePointDefinition,
): string {
  return `/courses/${course.slug}/knowledge-points/${knowledgePoint.slug}`;
}

export function selectSubjectiveWritingHref(
  course: CourseDefinition,
  knowledgePoint: KnowledgePointDefinition,
): string {
  return `${selectKnowledgePointHref(course, knowledgePoint)}/subjective-writing`;
}

export function selectCaseReasoningHref(
  course: CourseDefinition,
  knowledgePoint: KnowledgePointDefinition,
): string {
  return `${selectKnowledgePointHref(course, knowledgePoint)}/case-reasoning`;
}

export function selectCasesForKnowledgePoint(
  course: CourseDefinition,
  knowledgePointId: string,
): CaseDefinition[] {
  const knowledgePoint = selectKnowledgePointById(course, knowledgePointId);
  if (!knowledgePoint) {
    return [];
  }

  return orderByOrder(
    knowledgePoint.caseIds
      .map((caseId) => course.cases.find((item) => item.id === caseId))
      .filter((item) => item !== undefined),
  );
}

export function selectPrimaryCaseForKnowledgePoint(
  course: CourseDefinition,
  knowledgePointId: string,
): CaseDefinition | undefined {
  return selectCasesForKnowledgePoint(course, knowledgePointId)[0];
}

export function selectAssessmentItemsForKnowledgePoint(
  course: CourseDefinition,
  knowledgePointId: string,
): AssessmentItemDefinition[] {
  return orderByOrder(course.assessmentItems.filter((item) => (
    item.knowledgePointId === knowledgePointId
  )));
}

/**
 * 展平全部可作答题目：顶层 assessmentItems + assessmentGroups 的成员。
 * B1/B2 组以成员形式参与题库、错题与组卷统计；组上下文另行查找。
 */
export function flattenCourseAssessmentItems(
  course: CourseDefinition,
): AssessmentItemDefinition[] {
  const members = course.assessmentGroups.flatMap((group) => group.members);
  return [...course.assessmentItems, ...members];
}

/** 按 id 查找题目（含组成员），并返回其所属组（若为组题）。 */
export function findAssessmentItemWithGroup(
  course: CourseDefinition,
  itemId: string,
): { item: AssessmentItemDefinition; group?: AssessmentItemGroupDefinition } | undefined {
  const plain = course.assessmentItems.find((item) => item.id === itemId);
  if (plain) {
    return { item: plain };
  }
  for (const group of course.assessmentGroups) {
    const member = group.members.find((item) => item.id === itemId);
    if (member) {
      return { item: member, group };
    }
  }
  return undefined;
}

export function selectSubjectiveWritingItems(
  course: CourseDefinition,
  knowledgePointId: string,
): AssessmentItemDefinition[] {
  return selectAssessmentItemsForKnowledgePoint(course, knowledgePointId).filter((item) => (
    (item.questionKind === "term" || item.questionKind === "short-answer")
    && item.scoring !== null
  ));
}

export function selectChapterWorkspaceView(
  course: CourseDefinition,
  state: LearnerCourseState,
  chapterId: string,
): ChapterWorkspaceView | undefined {
  const chapter = selectChapterById(course, chapterId);
  if (!chapter) {
    return undefined;
  }

  const progress = selectChapterProgress(state, chapter.id);
  const completedIds = new Set(progress.completedKnowledgePointIds);
  const knowledgePoints = chapter.knowledgePointIds
    .map((pointId) => selectKnowledgePointById(course, pointId))
    .filter((point) => point !== undefined)
    .sort((left, right) => left.order - right.order)
    .map((point) => ({ ...point, completed: completedIds.has(point.id) }));

  return { ...chapter, ...progress, knowledgePoints };
}

export function selectVisibleChapterViews(
  course: CourseDefinition,
  state: LearnerCourseState,
  scope: CourseScope,
): ChapterWorkspaceView[] {
  const stageChapterIds = new Set(state.currentStage.chapterIds);

  return orderByOrder(course.chapters)
    .map((chapter) => selectChapterWorkspaceView(course, state, chapter.id))
    .filter((chapter) => chapter !== undefined)
    .filter((chapter) => {
      if (scope === "stage") {
        return stageChapterIds.has(chapter.id);
      }
      if (scope === "weak") {
        return chapter.progress > 0 && chapter.progress < 80;
      }
      return true;
    });
}

export function selectFirstIncompleteKnowledgePoint(
  chapter: ChapterWorkspaceView,
): KnowledgePointWorkspaceView | undefined {
  return chapter.knowledgePoints.find((point) => !point.completed)
    ?? chapter.knowledgePoints[0];
}

export function selectLearningRoutes(
  course: CourseDefinition,
): LearningRouteDefinition[] {
  return orderByOrder(course.learningRoutes);
}

export function selectExamSummaryRows(
  course: CourseDefinition,
): ExamSummaryRow[] {
  return orderByOrder(course.examBlueprint.summaryGroups).map((group) => ({
    id: group.id,
    label: group.label,
    points: course.examBlueprint.rows
      .filter((row) => group.questionKinds.includes(row.kind))
      .reduce((total, row) => total + row.totalPoints, 0),
  }));
}

export function selectExamPrioritySummary(
  course: CourseDefinition,
): ExamPrioritySummary | null {
  const notice = course.examBlueprint.priorityNotice;
  if (!notice) {
    return null;
  }

  return {
    lead: notice.lead,
    points: course.examBlueprint.rows
      .filter((row) => notice.questionKinds.includes(row.kind))
      .reduce((total, row) => total + row.totalPoints, 0),
    guidance: notice.guidance,
  };
}

export function selectOrderedSources(
  course: CourseDefinition,
): SourceReference[] {
  return orderByOrder(
    course.sources.filter((source) => source.role === "course-material"),
  );
}

export function selectAvailableSourceCount(course: CourseDefinition): number {
  return course.sources.filter((source) => (
    source.role === "course-material" && source.status !== "pending"
  )).length;
}

export function selectKnowledgeReferenceSources(
  course: CourseDefinition,
  sourceIds: readonly string[],
): SourceReference[] {
  const referencedIds = new Set(sourceIds);
  return orderByOrder(course.sources.filter((source) => (
    source.role === "knowledge-reference" && referencedIds.has(source.id)
  )));
}

export function selectSourcesByIds(
  course: CourseDefinition,
  sourceIds: readonly string[],
): SourceReference[] {
  const referencedIds = new Set(sourceIds);
  return orderByOrder(course.sources.filter((source) => referencedIds.has(source.id)));
}

export function selectVersionDimensionLabel(
  dimension: VersionDimension,
): string {
  return dimension.status === "pending" ? dimension.missingLabel : dimension.value;
}

export function selectAssessmentItemsForChapter(
  course: CourseDefinition,
  chapterId: string,
): AssessmentItemDefinition[] {
  const chapter = selectChapterById(course, chapterId);
  if (!chapter) {
    return [];
  }

  const chapterPointIds = new Set(chapter.knowledgePointIds);
  const chapterMembers = course.assessmentGroups.flatMap((group) =>
    group.members.filter((member) => chapterPointIds.has(member.knowledgePointId)),
  );

  return orderByOrder([
    ...selectAssessmentItemsForKnowledgePointFlat(course, chapter.knowledgePointIds),
    ...chapterMembers,
  ]);
}

/** 平铺取多个知识点的顶层题目（不含组）。 */
function selectAssessmentItemsForKnowledgePointFlat(
  course: CourseDefinition,
  knowledgePointIds: readonly string[],
): AssessmentItemDefinition[] {
  return course.assessmentItems.filter((item) => knowledgePointIds.includes(item.knowledgePointId));
}

export function selectObjectiveItems(
  course: CourseDefinition,
  chapterId: string,
): AssessmentItemDefinition[] {
  return selectAssessmentItemsForChapter(course, chapterId).filter(
    (item) => item.choices && item.choices.length > 0,
  );
}

export function selectChapterBySlug(
  course: CourseDefinition,
  chapterSlug: string,
): ChapterDefinition | undefined {
  return course.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function selectQuestionById(
  course: CourseDefinition,
  questionId: string,
): AssessmentItemDefinition | undefined {
  return findAssessmentItemWithGroup(course, questionId)?.item;
}
