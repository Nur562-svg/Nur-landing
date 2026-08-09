/**
 * 错题中心选择器 — 跨课程聚合错题与弱项知识点。
 *
 * 数据来源：
 * - question-bank-store 中的 QBAttemptRecord（选择题做题记录）
 * - mock-exam-store 中的 MockExamSession（模考中的客观题错误）
 *
 * 不创建新的存储；只读取已有 localStorage 数据并聚合。
 * 不进入课程真相；不编造来源或答案。
 */

import type {
  AssessmentItemDefinition,
  CourseDefinition,
  KnowledgePointDefinition,
} from "@/types/learning";
import type { QBAttemptRecord } from "@/types/question-bank";
import type { MockExamAnswer, MockExamSession } from "@/types/mock-exam";
import { getMockExamSessions } from "@/lib/mock-exam-store";
import {
  flattenCourseAssessmentItems,
  selectKnowledgePointById,
  selectChapterForKnowledgePoint,
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

/** 错题中心汇总数据。 */
export type WrongQuestionCenterData = {
  wrongQuestions: readonly WrongQuestionSummary[];
  weakKnowledgePoints: readonly WeakKnowledgePoint[];
  totalWrong: number;
  totalAttempts: number;
  weakKpCount: number;
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
 * 聚合所有课程的错题数据。
 * 在组件中通过 useMemo 调用，依赖 localStorage 快照。
 */
export function selectWrongQuestionCenter(
  courses: readonly CourseDefinition[],
  attemptsSnapshot: Record<string, QBAttemptRecord[]>,
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
  };
}
