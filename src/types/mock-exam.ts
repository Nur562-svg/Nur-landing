import type { QuestionKind } from "./learning";

/** 题型行组卷结果：按 blueprint row 统计实际可组数量。 */
export type MockExamRowPlan = {
  rowId: string;
  kind: QuestionKind;
  label: string;
  order: number;
  requiredCount: number;
  availableCount: number;
  includedCount: number;
  pointsEach: number;
  includedPoints: number;
  requiredPoints: number;
  status: "complete" | "partial" | "empty";
};

/** 卷内一道题（来自题库 assessmentItems 或 assessmentGroups 的成员，保留来源引用）。 */
export type MockExamPaperItem = {
  itemId: string;
  rowId: string;
  order: number;
  questionKind: QuestionKind;
  knowledgePointId: string;
  prompt: string;
  choices: readonly string[];
  correctChoiceIndex: number | null;
  points: number;
  automaticallyScored: boolean;
  answerStatus: "available" | "missing" | "conflict";
  sourceIds: readonly string[];
  /** B1/B2 组上下文：来自 assessmentGroups 的成员时携带。 */
  groupId?: string;
  groupPrompt?: string | null;
  sharedChoices?: readonly string[] | null;
};

export type MockExamRowShortfall = {
  kind: QuestionKind;
  label: string;
  required: number;
  available: number;
};

/** 组卷结果（服务端/选择器确定性生成，不涉及模型）。 */
export type MockExamPaper = {
  version: 1;
  sessionId: string;
  courseId: string;
  courseTitle: string;
  blueprintId: string;
  blueprintTitle: string;
  createdAt: string;
  durationMinutes: number;
  rows: readonly MockExamRowPlan[];
  items: readonly MockExamPaperItem[];
  totalPoints: number;
  blueprintTotalPoints: number;
  complete: boolean;
  shortfalls: readonly MockExamRowShortfall[];
  notice: string;
};

export type MockExamAnswer = {
  itemId: string;
  status: "unanswered" | "auto-graded" | "pending-review";
  selectedIndex: number | null;
  text: string;
  isCorrect: boolean | null;
  answeredAt: string;
};

export type MockExamSession = {
  version: 1;
  sessionId: string;
  courseId: string;
  courseTitle: string;
  blueprintId: string;
  startedAt: string;
  completedAt: string | null;
  durationMinutes: number;
  answers: readonly MockExamAnswer[];
  objectiveEarnedPoints: number;
  objectiveTotalPoints: number;
  pendingReviewItemIds: readonly string[];
  abandoned: boolean;
};

export type MockExamReportRow = {
  rowId: string;
  kind: QuestionKind;
  label: string;
  requiredCount: number;
  includedCount: number;
  answeredCount: number;
  autoGradedCount: number;
  autoCorrectCount: number;
  earnedPoints: number;
  maxPoints: number;
  status: "complete" | "partial" | "empty" | "skipped";
};

export type MockExamReportPendingItem = {
  itemId: string;
  kind: QuestionKind;
  label: string;
  prompt: string;
  points: number;
};

export type MockExamReport = {
  version: 1;
  sessionId: string;
  courseId: string;
  courseTitle: string;
  blueprintId: string;
  blueprintTitle: string;
  completedAt: string;
  durationMinutes: number;
  objectiveScore: {
    earned: number;
    total: number;
    ratio: number;
  };
  rows: readonly MockExamReportRow[];
  pendingReview: readonly MockExamReportPendingItem[];
  shortfalls: readonly MockExamRowShortfall[];
  notice: string;
};
