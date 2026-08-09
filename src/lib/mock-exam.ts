import type {
  MockExamAnswer,
  MockExamPaper,
  MockExamPaperItem,
  MockExamReport,
  MockExamReportPendingItem,
  MockExamReportRow,
  MockExamRowPlan,
  MockExamRowShortfall,
  MockExamSession,
} from "@/types/mock-exam";
import type {
  AssessmentItemDefinition,
  CourseDefinition,
  ExamBlueprint,
} from "@/types/learning";

/**
 * 模考组卷与能力报告（确定性逻辑，无模型参与）。
 * 原则：题目不足是诚实结果（partial / empty + shortfalls），
 * 不伪造完整组卷；客观题自动判定，主观题标记待核对。
 */

const automaticQuestionKinds: readonly string[] = ["a1-single", "b1", "b2"];

/** 一道题是否可自动判定（有选项且指定正确答案）。 */
export function canAutomaticallyScoreItem(item: Pick<MockExamPaperItem, "choices" | "correctChoiceIndex">): boolean {
  return item.choices.length > 0 && item.correctChoiceIndex !== null;
}

function isAutomaticKind(kind: string): boolean {
  return automaticQuestionKinds.includes(kind);
}

function buildRowPlan(
  row: ExamBlueprint["rows"][number],
  availableCount: number,
): MockExamRowPlan {
  const includedCount = Math.min(row.count, availableCount);
  return {
    rowId: row.id,
    kind: row.kind,
    label: row.label,
    order: row.order,
    requiredCount: row.count,
    availableCount,
    includedCount,
    pointsEach: row.pointsEach,
    includedPoints: includedCount * row.pointsEach,
    requiredPoints: row.totalPoints,
    status: includedCount === row.count ? "complete" : includedCount > 0 ? "partial" : "empty",
  };
}

function buildShortfalls(
  blueprint: ExamBlueprint,
  rowPlans: readonly MockExamRowPlan[],
): MockExamRowShortfall[] {
  return rowPlans.flatMap((plan) => {
    if (plan.includedCount >= plan.requiredCount) {
      return [];
    }
    return [{
      kind: plan.kind,
      label: plan.label,
      required: plan.requiredCount,
      available: plan.availableCount,
    }];
  });
}

function toPaperItem(
  item: AssessmentItemDefinition,
  rowId: string,
  order: number,
  points: number,
  group?: { groupId: string; groupPrompt: string | null; sharedChoices: readonly string[] | null },
): MockExamPaperItem {
  const choices = item.choices && item.choices.length > 0
    ? item.choices
    : (group?.sharedChoices ?? []);
  const correctChoiceIndex = item.correctChoiceIndex ?? null;
  return {
    itemId: item.id,
    rowId,
    order,
    questionKind: item.questionKind,
    knowledgePointId: item.knowledgePointId,
    prompt: item.prompt,
    choices,
    correctChoiceIndex,
    points,
    automaticallyScored: isAutomaticKind(item.questionKind)
      && choices.length > 0
      && correctChoiceIndex !== null,
    answerStatus: item.answer.status,
    sourceIds: item.sourceIds,
    ...(group ? { groupId: group.groupId, groupPrompt: group.groupPrompt, sharedChoices: group.sharedChoices } : {}),
  };
}

/** B1/B2 组卷候选：把组展开为携带组上下文的成员题。 */
type GroupMemberCandidate = {
  item: AssessmentItemDefinition;
  group?: { groupId: string; groupPrompt: string | null; sharedChoices: readonly string[] | null };
};

function buildCandidatesForKind(
  course: CourseDefinition,
  kind: string,
): GroupMemberCandidate[] {
  const plain = course.assessmentItems
    .filter((item) => item.questionKind === kind)
    .map((item) => ({ item }));
  const grouped = course.assessmentGroups.flatMap((group) =>
    group.members
      .filter((member) => member.questionKind === kind)
      .map((member) => ({
        item: member,
        group: {
          groupId: group.id,
          groupPrompt: group.groupPrompt,
          sharedChoices: group.sharedChoices,
        },
      })),
  );
  return [...plain, ...grouped];
}

/**
 * 按 blueprint 从课程题库组卷。
 * 每行按 order 取题；行内题目按知识点广度优先（先不同知识点，再剩余同知识点）。
 */
export function createMockExamPaper(
  course: CourseDefinition,
  durationMinutes = 120,
): MockExamPaper {
  const blueprint = course.examBlueprint;
  const candidatesByKind = new Map<string, GroupMemberCandidate[]>();
  for (const row of blueprint.rows) {
    if (!candidatesByKind.has(row.kind)) {
      candidatesByKind.set(row.kind, buildCandidatesForKind(course, row.kind));
    }
  }

  const rowPlans: MockExamRowPlan[] = [];
  const paperItems: MockExamPaperItem[] = [];
  let order = 1;

  for (const row of [...blueprint.rows].sort((a, b) => a.order - b.order)) {
    const candidates = candidatesByKind.get(row.kind) ?? [];
    const availableCount = candidates.length;
    rowPlans.push(buildRowPlan(row, availableCount));

    // 按知识点广度优先：同一知识点至多取一题，再按需回填。
    const byKnowledgePoint = new Map<string, GroupMemberCandidate[]>();
    for (const candidate of candidates) {
      const group = byKnowledgePoint.get(candidate.item.knowledgePointId) ?? [];
      group.push(candidate);
      byKnowledgePoint.set(candidate.item.knowledgePointId, group);
    }
    const breadthFirst: GroupMemberCandidate[] = [];
    const knowledgePointIds = Array.from(byKnowledgePoint.keys());
    let cursor = 0;
    while (breadthFirst.length < candidates.length) {
      for (const kpId of knowledgePointIds) {
        const group = byKnowledgePoint.get(kpId) ?? [];
        if (cursor < group.length) {
          breadthFirst.push(group[cursor]);
        }
      }
      cursor += 1;
    }

    for (const candidate of breadthFirst.slice(0, row.count)) {
      paperItems.push(toPaperItem(candidate.item, row.id, order, row.pointsEach, candidate.group));
      order += 1;
    }
  }

  const totalPoints = paperItems.reduce((sum, item) => sum + item.points, 0);
  const shortfalls = buildShortfalls(blueprint, rowPlans);
  const complete = shortfalls.length === 0;

  const notice = complete
    ? `已按《${blueprint.title}》完整组卷：${blueprint.rows.length} 个题型、${paperItems.length} 题、${totalPoints} 分。`
    : `题库当前不足以完整复现《${blueprint.title}》：${shortfalls.map((s) => `${s.label}需 ${s.required} 题、现有 ${s.available} 题`).join("；")}。本次按现有题目诚实组卷，缺失题型不会伪造题目。`;

  return {
    version: 1,
    sessionId: `mock-exam-${globalThis.crypto.randomUUID()}`,
    courseId: course.id,
    courseTitle: course.title,
    blueprintId: blueprint.id,
    blueprintTitle: blueprint.title,
    createdAt: new Date().toISOString(),
    durationMinutes,
    rows: rowPlans,
    items: paperItems,
    totalPoints,
    blueprintTotalPoints: blueprint.totalPoints,
    complete,
    shortfalls,
    notice,
  };
}

/** 生成初始作答状态（全部 unanswered）。 */
export function createInitialAnswers(items: readonly MockExamPaperItem[]): MockExamAnswer[] {
  return items.map((item) => ({
    itemId: item.itemId,
    status: "unanswered",
    selectedIndex: null,
    text: "",
    isCorrect: null,
    answeredAt: "",
  }));
}

/**
 * 记录一道题的作答并返回更新后的答案。
 * 客观题自动判定；主观题（含 fill/term/short-answer/case）标记 pending-review，
 * 不伪造判定结果。
 */
export function recordMockExamAnswer(
  answers: readonly MockExamAnswer[],
  item: MockExamPaperItem,
  input: { selectedIndex: number | null; text: string },
): MockExamAnswer[] {
  const now = new Date().toISOString();
  const isAutoScored = item.automaticallyScored;
  const next: MockExamAnswer = isAutoScored
    ? {
        itemId: item.itemId,
        status: "auto-graded",
        selectedIndex: input.selectedIndex,
        text: input.text,
        isCorrect: input.selectedIndex === item.correctChoiceIndex,
        answeredAt: now,
      }
    : {
        itemId: item.itemId,
        status: input.text.trim().length > 0 ? "pending-review" : "unanswered",
        selectedIndex: null,
        text: input.text,
        isCorrect: null,
        answeredAt: input.text.trim().length > 0 ? now : "",
      };
  return answers.map((answer) => (answer.itemId === item.itemId ? next : answer));
}

/** 汇总客观题得分。 */
export function summarizeSession(
  paper: MockExamPaper,
  answers: readonly MockExamAnswer[],
): {
  objectiveEarnedPoints: number;
  objectiveTotalPoints: number;
  pendingReviewItemIds: string[];
} {
  let objectiveEarnedPoints = 0;
  let objectiveTotalPoints = 0;
  const pendingReviewItemIds: string[] = [];
  const answerById = new Map(answers.map((answer) => [answer.itemId, answer]));

  for (const item of paper.items) {
    const answer = answerById.get(item.itemId);
    if (item.automaticallyScored) {
      objectiveTotalPoints += item.points;
      if (answer?.isCorrect) {
        objectiveEarnedPoints += item.points;
      }
    } else if (answer?.status === "pending-review") {
      pendingReviewItemIds.push(item.itemId);
    }
  }
  return { objectiveEarnedPoints, objectiveTotalPoints, pendingReviewItemIds };
}

/** 完成会话（供持久化调用方使用）。 */
export function completeMockExamSession(
  session: MockExamSession,
  paper: MockExamPaper,
  answers: readonly MockExamAnswer[],
): MockExamSession {
  const summary = summarizeSession(paper, answers);
  return {
    ...session,
    completedAt: new Date().toISOString(),
    answers,
    objectiveEarnedPoints: summary.objectiveEarnedPoints,
    objectiveTotalPoints: summary.objectiveTotalPoints,
    pendingReviewItemIds: summary.pendingReviewItemIds,
    abandoned: false,
  };
}

/** 放弃会话。 */
export function abandonMockExamSession(
  session: MockExamSession,
  paper: MockExamPaper,
  answers: readonly MockExamAnswer[],
): MockExamSession {
  const summary = summarizeSession(paper, answers);
  return {
    ...session,
    completedAt: new Date().toISOString(),
    answers,
    objectiveEarnedPoints: summary.objectiveEarnedPoints,
    objectiveTotalPoints: summary.objectiveTotalPoints,
    pendingReviewItemIds: summary.pendingReviewItemIds,
    abandoned: true,
  };
}

function buildReportRow(
  row: MockExamRowPlan,
  paper: MockExamPaper,
  answers: readonly MockExamAnswer[],
): MockExamReportRow {
  const rowItems = paper.items.filter((item) => item.rowId === row.rowId);
  const answerById = new Map(answers.map((answer) => [answer.itemId, answer]));
  let answeredCount = 0;
  let autoGradedCount = 0;
  let autoCorrectCount = 0;
  let earnedPoints = 0;
  let maxPoints = 0;

  for (const item of rowItems) {
    const answer = answerById.get(item.itemId);
    maxPoints += item.points;
    if (answer?.status === "auto-graded" || answer?.status === "pending-review") {
      answeredCount += 1;
    }
    if (answer?.status === "auto-graded") {
      autoGradedCount += 1;
      if (answer.isCorrect) {
        autoCorrectCount += 1;
        earnedPoints += item.points;
      }
    }
  }

  const status: MockExamReportRow["status"] = row.status === "empty"
    ? "empty"
    : answeredCount === 0
      ? "skipped"
      : row.status;

  return {
    rowId: row.rowId,
    kind: row.kind,
    label: row.label,
    requiredCount: row.requiredCount,
    includedCount: row.includedCount,
    answeredCount,
    autoGradedCount,
    autoCorrectCount,
    earnedPoints,
    maxPoints,
    status,
  };
}

function buildPendingReviewItems(
  paper: MockExamPaper,
  session: MockExamSession,
  rowLabelById: Map<string, string>,
): MockExamReportPendingItem[] {
  const pendingSet = new Set(session.pendingReviewItemIds);
  return paper.items
    .filter((item) => pendingSet.has(item.itemId))
    .map((item) => ({
      itemId: item.itemId,
      kind: item.questionKind,
      label: rowLabelById.get(item.rowId) ?? item.questionKind,
      prompt: item.prompt,
      points: item.points,
    }));
}

/** 从已完成的会话生成能力报告。 */
export function buildMockExamReport(
  paper: MockExamPaper,
  session: MockExamSession,
): MockExamReport {
  const rowLabelById = new Map(paper.rows.map((row) => [row.rowId, row.label]));
  const rows = paper.rows.map((row) => buildReportRow(row, paper, session.answers));

  const objectiveTotal = session.objectiveTotalPoints;
  const objectiveEarned = session.objectiveEarnedPoints;
  const ratio = objectiveTotal > 0 ? objectiveEarned / objectiveTotal : 0;
  const pendingReview = buildPendingReviewItems(paper, session, rowLabelById);

  const subjectiveCount = paper.items.filter((item) => !item.automaticallyScored).length;
  const subjectiveDone = pendingReview.length;
  const noticeLines: string[] = [];
  noticeLines.push(session.abandoned
    ? "本次模考提前结束。已作答的客观题按现有答案判定；未作答题目不计分。"
    : "本次模考已交卷。客观题按题库指定答案自动判定；主观题不做自动判分，保留在待核对清单。");
  if (paper.shortfalls.length > 0) {
    noticeLines.push(`题库不足：${paper.shortfalls.map((s) => `${s.label}缺 ${s.required - s.available} 题`).join("；")}。本次未组入这些题，能力报告只反映现有题目。`);
  }
  if (subjectiveCount > 0) {
    noticeLines.push(`主观题 ${subjectiveDone}/${subjectiveCount} 已作答并进入待核对；作答记录不会伪装成教师评分。`);
  }

  return {
    version: 1,
    sessionId: session.sessionId,
    courseId: session.courseId,
    courseTitle: session.courseTitle,
    blueprintId: session.blueprintId,
    blueprintTitle: paper.blueprintTitle,
    completedAt: session.completedAt ?? new Date().toISOString(),
    durationMinutes: session.durationMinutes,
    objectiveScore: {
      earned: objectiveEarned,
      total: objectiveTotal,
      ratio,
    },
    rows,
    pendingReview,
    shortfalls: paper.shortfalls,
    notice: noticeLines.join(" "),
  };
}
