/**
 * 错题中心选择器 — 跨课程聚合错题与弱项知识点。
 *
 * 数据来源：
 * - question-bank-store 中的 QBAttemptRecord（选择题做题记录）
 * - mock-exam-store 中的 MockExamSession（模考中的客观题错误）
 * - learning-memory 中的已确认 attempts（结构薄弱点）与 fsrsState（临遗忘高危准则）
 *
 * 不创建新的存储；只读取已有 localStorage 数据并聚合。
 * 不进入课程真相；不编造来源或答案。
 */

import type {
  AssessmentItemDefinition,
  CourseDefinition,
  FsrsCriterionState,
  KnowledgePointDefinition,
  LearnerAttemptRecord,
  LearningAttemptSurface,
  LearningMemoryState,
} from "@/types/learning";
import type { QBAttemptRecord } from "@/types/question-bank";
import type { MockExamAnswer, MockExamSession } from "@/types/mock-exam";
import { getMockExamSessions } from "@/lib/mock-exam-store";
import { computeFsrsInterval, selectRepeatedOmissions } from "@/lib/learning-memory";
import {
  flattenCourseAssessmentItems,
  selectKnowledgePointById,
  selectChapterForKnowledgePoint,
  selectPrimaryCaseForKnowledgePoint,
  selectSubjectiveWritingItems,
} from "@/lib/course-selectors";

/** 一道题的错题摘要（聚合了所有来源的错答记录）。 */
export type WrongQuestionSummary = {
  questionId: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgePointTitle: string;
  knowledgePointSlug: string;
  chapterSlug: string;
  prompt: string;
  questionKind: string;
  wrongCount: number;
  totalAttempts: number;
  lastWrongAt: string;
  hasChoices: boolean;
  /** 是否可在题库重做（仅选择题） */
  canRedo: boolean;
  /** 主观题是否有写作训练室 */
  hasWritingRoom: boolean;
};

/** 一个弱项知识点的聚合统计。 */
export type WeakKnowledgePoint = {
  knowledgePointId: string;
  knowledgePointTitle: string;
  knowledgePointSlug: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  chapterSlug: string;
  wrongCount: number;
  totalAttempts: number;
  wrongQuestionIds: readonly string[];
  /** 错误率（0-1），totalAttempts 为 0 时为 0 */
  wrongRatio: number;
  /** 最近一次错答时间 */
  lastWrongAt: string | null;
  /** 是否有知识点课程可学习 */
  hasLesson: boolean;
};

/** 一个结构薄弱点：同一知识点内同一记忆准则在 ≥3 个不同任务中被漏掉。 */
export type StructuralWeakness = {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgePointTitle: string;
  knowledgePointSlug: string;
  criterionId: string;
  /** 从课程定义 learningMemoryCriteria 解析的标签，不硬编码 */
  criterionLabel: string;
  /** 漏掉该准则的不同任务数（surface:taskId:segmentId 去重） */
  distinctTaskCount: number;
  /** 最近一次漏掉的确认时间（ISO） */
  lastOmittedAt: string;
  /** 最近一次漏掉发生的界面（用于快捷入口优先级） */
  latestSurface: LearningAttemptSurface;
  hasWritingRoom: boolean;
  hasCaseRoom: boolean;
  hasLesson: boolean;
};

/** 一条 FSRS 高危记忆准则：relearning 或 lapses ≥ 2。 */
export type FsrsHighRiskItem = {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgePointTitle: string;
  knowledgePointSlug: string;
  criterionId: string;
  criterionLabel: string;
  fsrs: FsrsCriterionState;
  /** FSRS 建议的下次复习间隔（天），复用现有算法 */
  suggestedIntervalDays: number;
  hasWritingRoom: boolean;
  hasCaseRoom: boolean;
  hasLesson: boolean;
};

/** 错题中心汇总数据。 */
export type WrongQuestionCenterData = {
  wrongQuestions: readonly WrongQuestionSummary[];
  weakKnowledgePoints: readonly WeakKnowledgePoint[];
  totalWrong: number;
  totalAttempts: number;
  weakKpCount: number;
  structuralWeaknesses: readonly StructuralWeakness[];
  fsrsHighRisk: readonly FsrsHighRiskItem[];
};

function computeWrongQBAttempts(
  allAttempts: Record<string, QBAttemptRecord[]>,
): Map<string, QBAttemptRecord[]> {
  const wrongMap = new Map<string, QBAttemptRecord[]>();
  for (const [questionId, attempts] of Object.entries(allAttempts)) {
    const wrong = attempts.filter((a) => !a.isCorrect);
    if (wrong.length > 0) {
      wrongMap.set(questionId, wrong);
    }
  }
  return wrongMap;
}

function computeWrongMockExamAnswers(
  courses: readonly CourseDefinition[],
): Map<string, { answer: MockExamAnswer; session: MockExamSession; courseId: string }[]> {
  const wrongMap = new Map<string, { answer: MockExamAnswer; session: MockExamSession; courseId: string }[]>();
  for (const course of courses) {
    const sessions = getMockExamSessions(course.id);
    for (const session of sessions) {
      if (!session.completedAt || session.abandoned) continue;
      for (const answer of session.answers) {
        if (answer.status === "auto-graded" && answer.isCorrect === false) {
          const existing = wrongMap.get(answer.itemId) ?? [];
          existing.push({ answer, session, courseId: course.id });
          wrongMap.set(answer.itemId, existing);
        }
      }
    }
  }
  return wrongMap;
}

/**
 * 聚合结构薄弱点：复用 learning-memory 的 selectRepeatedOmissions
 * （每任务取最新确认稿、同一准则 ≥3 个不同任务漏掉才成立）。
 * 准则标签从注册课程的 learningMemoryCriteria 解析；无法归属注册知识点的记录跳过。
 */
export function selectStructuralWeaknesses(
  courses: readonly CourseDefinition[],
  memoryState: LearningMemoryState | null,
): StructuralWeakness[] {
  if (!memoryState || memoryState.attempts.length === 0) {
    return [];
  }
  const attemptById = new Map(
    memoryState.attempts.map((attempt) => [attempt.id, attempt]),
  );

  const weaknesses: StructuralWeakness[] = [];
  for (const course of courses) {
    for (const kp of course.knowledgePoints) {
      const criteriaById = new Map(
        kp.learningMemoryCriteria.map((criterion) => [criterion.id, criterion]),
      );
      for (const omission of selectRepeatedOmissions(memoryState.attempts, course.id, kp.id)) {
        const criterion = criteriaById.get(omission.criterionId);
        if (!criterion) continue;
        const omittedAttempts = omission.attemptIds
          .map((id) => attemptById.get(id))
          .filter((attempt): attempt is LearnerAttemptRecord => attempt !== undefined);
        if (omittedAttempts.length === 0) continue;

        const latest = omittedAttempts.reduce((acc, cur) => (
          Date.parse(cur.confirmedAt) > Date.parse(acc.confirmedAt) ? cur : acc
        ));
        weaknesses.push({
          courseId: course.id,
          courseSlug: course.slug,
          courseTitle: course.title,
          knowledgePointId: kp.id,
          knowledgePointTitle: kp.title,
          knowledgePointSlug: kp.slug,
          criterionId: criterion.id,
          criterionLabel: criterion.label,
          distinctTaskCount: omission.distinctTaskCount,
          lastOmittedAt: latest.confirmedAt,
          latestSurface: latest.surface,
          hasWritingRoom: selectSubjectiveWritingItems(course, kp.id).length > 0,
          hasCaseRoom: selectPrimaryCaseForKnowledgePoint(course, kp.id) !== undefined,
          hasLesson: kp.lesson !== null,
        });
      }
    }
  }

  weaknesses.sort((a, b) => {
    const timeDiff = Date.parse(b.lastOmittedAt) - Date.parse(a.lastOmittedAt);
    if (timeDiff !== 0) return timeDiff;
    return b.distinctTaskCount - a.distinctTaskCount;
  });
  return weaknesses;
}

/**
 * 聚合 FSRS 高危准则：state === "relearning" 或 lapses >= 2。
 * fsrsState 的 key 不带课程/知识点维度，归属由注册课程的
 * learningMemoryCriteria 反查确定；无法归属的准则不显示（无标签、无入口）。
 */
export function selectFsrsHighRiskItems(
  courses: readonly CourseDefinition[],
  memoryState: LearningMemoryState | null,
): FsrsHighRiskItem[] {
  const fsrsState = memoryState?.fsrsState ?? null;
  if (!fsrsState) {
    return [];
  }

  const items: FsrsHighRiskItem[] = [];
  for (const course of courses) {
    for (const kp of course.knowledgePoints) {
      for (const criterion of kp.learningMemoryCriteria) {
        const state = fsrsState.criteria[criterion.id];
        if (!state) continue;
        if (state.state !== "relearning" && state.lapses < 2) continue;
        items.push({
          courseId: course.id,
          courseSlug: course.slug,
          courseTitle: course.title,
          knowledgePointId: kp.id,
          knowledgePointTitle: kp.title,
          knowledgePointSlug: kp.slug,
          criterionId: criterion.id,
          criterionLabel: criterion.label,
          fsrs: state,
          suggestedIntervalDays: computeFsrsInterval(criterion.id, fsrsState),
          hasWritingRoom: selectSubjectiveWritingItems(course, kp.id).length > 0,
          hasCaseRoom: selectPrimaryCaseForKnowledgePoint(course, kp.id) !== undefined,
          hasLesson: kp.lesson !== null,
        });
      }
    }
  }

  items.sort((a, b) => {
    if (b.fsrs.lapses !== a.fsrs.lapses) return b.fsrs.lapses - a.fsrs.lapses;
    return a.fsrs.stability - b.fsrs.stability;
  });
  return items;
}

/**
 * 聚合所有课程的错题数据。
 * 在组件中通过 useMemo 调用，依赖 localStorage 快照。
 * memoryState 为可选第三参：客观错题聚合与原有行为完全一致。
 */
export function selectWrongQuestionCenter(
  courses: readonly CourseDefinition[],
  attemptsSnapshot: Record<string, QBAttemptRecord[]>,
  memoryState?: LearningMemoryState | null,
): WrongQuestionCenterData {
  const wrongQB = computeWrongQBAttempts(attemptsSnapshot);
  const wrongMock = computeWrongMockExamAnswers(courses);

  // Build a lookup: questionId → AssessmentItemDefinition + course context
  const itemLookup = new Map<string, {
    item: AssessmentItemDefinition;
    course: CourseDefinition;
    kp: KnowledgePointDefinition | undefined;
    chapter: ReturnType<typeof selectChapterForKnowledgePoint>;
  }>();

  for (const course of courses) {
    for (const item of flattenCourseAssessmentItems(course)) {
      itemLookup.set(item.id, {
        item,
        course,
        kp: selectKnowledgePointById(course, item.knowledgePointId),
        chapter: selectChapterForKnowledgePoint(course, item.knowledgePointId),
      });
    }
  }

  // Combine all wrong question IDs
  const allWrongIds = new Set([...wrongQB.keys(), ...wrongMock.keys()]);

  const wrongQuestions: WrongQuestionSummary[] = [];
  const kpAggregator = new Map<string, {
    wrongCount: number;
    totalAttempts: number;
    wrongQuestionIds: string[];
    lastWrongAt: string | null;
  }>();

  for (const questionId of allWrongIds) {
    const lookup = itemLookup.get(questionId);
    if (!lookup) continue;

    const { item, course, kp, chapter } = lookup;
    const qbWrong = wrongQB.get(questionId) ?? [];
    const mockWrong = wrongMock.get(questionId) ?? [];

    // Total attempts: all QB attempts (wrong + correct) + mock wrong
    const allQBAttempts = attemptsSnapshot[questionId] ?? [];
    const totalAttempts = allQBAttempts.length + mockWrong.length;
    const wrongCount = qbWrong.length + mockWrong.length;

    const allWrongTimes = [
      ...qbWrong.map((a) => a.attemptedAt),
      ...mockWrong.map((m) => m.answer.answeredAt),
    ].sort((a, b) => Date.parse(b) - Date.parse(a));
    const lastWrongAt = allWrongTimes[0] ?? "";

    const hasChoices = !!(item.choices && item.choices.length > 0);
    const hasWritingRoom = (item.questionKind === "term" || item.questionKind === "short-answer") && item.scoring !== null;

    wrongQuestions.push({
      questionId,
      courseId: course.id,
      courseSlug: course.slug,
      courseTitle: course.title,
      knowledgePointId: item.knowledgePointId,
      knowledgePointTitle: kp?.title ?? "未知知识点",
      knowledgePointSlug: kp?.slug ?? "",
      chapterSlug: chapter?.slug ?? "",
      prompt: item.prompt,
      questionKind: item.questionKind,
      wrongCount,
      totalAttempts,
      lastWrongAt,
      hasChoices,
      canRedo: hasChoices,
      hasWritingRoom,
    });

    // Aggregate by knowledge point
    const kpKey = `${course.id}:${item.knowledgePointId}`;
    const existing = kpAggregator.get(kpKey) ?? {
      wrongCount: 0,
      totalAttempts: 0,
      wrongQuestionIds: [],
      lastWrongAt: null,
    };
    existing.wrongCount += wrongCount;
    existing.totalAttempts += totalAttempts;
    if (wrongCount > 0) {
      existing.wrongQuestionIds.push(questionId);
    }
    if (lastWrongAt && (!existing.lastWrongAt || Date.parse(lastWrongAt) > Date.parse(existing.lastWrongAt))) {
      existing.lastWrongAt = lastWrongAt;
    }
    kpAggregator.set(kpKey, existing);
  }

  // Build weak knowledge points
  const weakKnowledgePoints: WeakKnowledgePoint[] = [];
  for (const [kpKey, agg] of kpAggregator) {
    if (agg.wrongCount === 0) continue;
    const [courseId, knowledgePointId] = kpKey.split(":");
    const course = courses.find((c) => c.id === courseId);
    if (!course) continue;
    const kp = selectKnowledgePointById(course, knowledgePointId);
    if (!kp) continue;
    const chapter = selectChapterForKnowledgePoint(course, knowledgePointId);
    weakKnowledgePoints.push({
      knowledgePointId,
      knowledgePointTitle: kp.title,
      knowledgePointSlug: kp.slug,
      courseId: course.id,
      courseSlug: course.slug,
      courseTitle: course.title,
      chapterSlug: chapter?.slug ?? "",
      wrongCount: agg.wrongCount,
      totalAttempts: agg.totalAttempts,
      wrongQuestionIds: agg.wrongQuestionIds,
      wrongRatio: agg.totalAttempts > 0 ? agg.wrongCount / agg.totalAttempts : 0,
      lastWrongAt: agg.lastWrongAt,
      hasLesson: kp.lesson !== null,
    });
  }

  // Sort: by wrong count desc, then by wrong ratio desc
  weakKnowledgePoints.sort((a, b) => {
    if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
    return b.wrongRatio - a.wrongRatio;
  });

  // Sort wrong questions: by last wrong time desc
  wrongQuestions.sort((a, b) => Date.parse(b.lastWrongAt) - Date.parse(a.lastWrongAt));

  return {
    wrongQuestions,
    weakKnowledgePoints,
    totalWrong: wrongQuestions.length,
    totalAttempts: wrongQuestions.reduce((sum, q) => sum + q.totalAttempts, 0),
    weakKpCount: weakKnowledgePoints.length,
    structuralWeaknesses: selectStructuralWeaknesses(courses, memoryState ?? null),
    fsrsHighRisk: selectFsrsHighRiskItems(courses, memoryState ?? null),
  };
}
