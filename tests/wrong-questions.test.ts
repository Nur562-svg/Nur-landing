import { describe, it } from "node:test";
import assert from "node:assert";
import type {
  CourseDefinition,
  FsrsLearningState,
  LearnerAttemptRecord,
  LearningMemoryState,
} from "@/types/learning";
import {
  selectFsrsHighRiskItems,
  selectStructuralWeaknesses,
  selectWeakKnowledgePointHref,
  selectWrongQuestionCenter,
  selectWrongQuestionRedoHref,
  selectWrongQuestionRedoLabel,
} from "@/lib/wrong-questions";
import { flattenCourseAssessmentItems } from "@/lib/course-selectors";
import { registeredCourses } from "@/content/courses";
import { createDefaultLearningMemoryState } from "@/lib/learning-memory";

function makeCourse(): CourseDefinition {
  const pendingDimension = {
    status: "pending" as const,
    value: null,
    missingLabel: "待确认",
    verifiedAt: null,
  };
  return {
    id: "course-1",
    slug: "course-one",
    title: "中医诊断学（测试）",
    catalogLabel: "测试课程",
    classification: "测试",
    description: "合成课程，仅用于选择器测试",
    ghostWordmark: "测",
    curriculumMode: "tcm-primary",
    contentStatus: "demo",
    version: {
      id: "cv-1",
      status: "demo",
      textbookEdition: pendingDimension,
      school: pendingDimension,
      program: pendingDimension,
      learnerYear: pendingDimension,
      teacher: pendingDimension,
      academicYear: pendingDimension,
      semester: pendingDimension,
    },
    sources: [],
    examBlueprint: {
      id: "exam-1",
      title: "考试蓝图（测试）",
      status: "pending",
      missingLabel: "待确认",
      provenance: "user-provided",
      scope: {
        school: "",
        program: "",
        learnerYear: "",
        academicYear: "",
        semester: "",
        teacher: null,
      },
      sourceIds: [],
      totalPoints: 0,
      rows: [],
      summaryGroups: [],
      priorityNotice: null,
      integrity: null,
    },
    learningRoutes: [],
    chapters: [{
      id: "ch-1",
      slug: "ch-1",
      order: 1,
      indexLabel: "一",
      title: "问诊",
      focus: "",
      knowledgePointIds: ["kp-1"],
    }],
    knowledgePoints: [{
      id: "kp-1",
      slug: "kp-one",
      order: 1,
      title: "问诊 · 问饮食口味",
      note: "",
      emphasis: "基础",
      contentStatus: "demo",
      evidenceFramework: [],
      lenses: [],
      relationships: [],
      learningMemoryCriteria: [
        { id: "memory-evidence-completeness", order: 1, label: "证据与定义要素不完整", detail: "合成准则" },
        { id: "memory-reasoning-chain", order: 2, label: "推理链缺少连接", detail: "合成准则" },
      ],
      sourceIds: [],
      learningTaskIds: [],
      assessmentItemIds: ["assessment-1"],
      caseIds: [],
      lesson: null,
    }],
    learningTasks: [],
    assessmentItems: [
      {
        id: "assessment-1",
        order: 1,
        knowledgePointId: "kp-1",
        questionKind: "term",
        status: "demo",
        prompt: "解释消谷善饥",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: "NUR 合成",
          note: "",
          sourceIds: [],
        },
        answer: {
          status: "missing",
          authority: null,
          confidence: "missing",
          content: null,
          notice: "",
          sourceIds: [],
        },
        scoring: {
          id: "scoring-1",
          standardVersion: "1",
          status: "demo",
          authority: "nur-platform",
          title: "NUR 测试量表",
          totalPoints: 6,
          suggestedCharacters: 80,
          notice: "",
          answerFramework: [],
          criteria: [
            { id: "sc-1", order: 1, perspective: "tcm", label: "要素完整", detail: "", points: 6 },
          ],
          assistanceRules: [],
          sourceIds: [],
        },
        sourceIds: [],
      },
    ],
    assessmentGroups: [],
    cases: [],
  };
}

let attemptCounter = 0;

function makeAttempt(overrides: {
  taskId: string;
  criterionId?: string;
  status?: "present" | "missing";
  confirmedAt?: string;
  surface?: "subjective-writing" | "case-reasoning";
}): LearnerAttemptRecord {
  attemptCounter += 1;
  return {
    version: 1,
    id: `attempt-${attemptCounter}`,
    courseId: "course-1",
    courseVersionId: "cv-1",
    offeringId: "offering-1",
    knowledgePointId: "kp-1",
    surface: overrides.surface ?? "subjective-writing",
    taskId: overrides.taskId,
    segmentId: null,
    confirmedText: "合成确认作答",
    confirmedAt: overrides.confirmedAt ?? "2026-08-10T10:00:00.000Z",
    scoringStandard: { id: "scoring-1", version: "1", authority: "nur-platform" },
    criterionResults: [{
      criterionId: "sc-1",
      memoryCriterionId: overrides.criterionId ?? "memory-evidence-completeness",
      status: overrides.status ?? "missing",
    }],
    answerConfidence: "unverified",
  };
}

function makeMemoryState(
  attempts: readonly LearnerAttemptRecord[],
  fsrsState: FsrsLearningState | null = null,
): LearningMemoryState {
  return {
    ...createDefaultLearningMemoryState(),
    attempts,
    fsrsState,
  };
}

describe("selectStructuralWeaknesses", () => {
  const course = makeCourse();

  it("forms a weakness after the same criterion is missed in 3 distinct tasks", () => {
    const state = makeMemoryState([
      makeAttempt({ taskId: "task-a", confirmedAt: "2026-08-08T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-b", confirmedAt: "2026-08-09T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-c", confirmedAt: "2026-08-10T10:00:00.000Z" }),
    ]);
    const weaknesses = selectStructuralWeaknesses([course], state);

    assert.strictEqual(weaknesses.length, 1);
    const weakness = weaknesses[0];
    assert.strictEqual(weakness?.criterionId, "memory-evidence-completeness");
    assert.strictEqual(weakness?.criterionLabel, "证据与定义要素不完整");
    assert.strictEqual(weakness?.distinctTaskCount, 3);
    assert.strictEqual(weakness?.lastOmittedAt, "2026-08-10T10:00:00.000Z");
    assert.strictEqual(weakness?.latestSurface, "subjective-writing");
    assert.strictEqual(weakness?.knowledgePointId, "kp-1");
    assert.strictEqual(weakness?.hasWritingRoom, true);
    assert.strictEqual(weakness?.hasCaseRoom, false);
    assert.strictEqual(weakness?.hasLesson, false);
  });

  it("uses only the latest confirmed version per task and stays quiet below the threshold", () => {
    const state = makeMemoryState([
      makeAttempt({ taskId: "task-a", status: "missing" }),
      // task-a 的最新一次确认已补上该准则，不再计入
      makeAttempt({ taskId: "task-a", status: "present", confirmedAt: "2026-08-11T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-b", status: "missing" }),
    ]);
    const weaknesses = selectStructuralWeaknesses([course], state);
    assert.strictEqual(weaknesses.length, 0);
  });

  it("drops omissions whose criterion is not declared in course truth", () => {
    const state = makeMemoryState([
      makeAttempt({ taskId: "task-a", criterionId: "memory-unknown" }),
      makeAttempt({ taskId: "task-b", criterionId: "memory-unknown" }),
      makeAttempt({ taskId: "task-c", criterionId: "memory-unknown" }),
    ]);
    const weaknesses = selectStructuralWeaknesses([course], state);
    assert.strictEqual(weaknesses.length, 0);
  });

  it("sorts by latest omission time descending", () => {
    const state = makeMemoryState([
      makeAttempt({ taskId: "task-a", confirmedAt: "2026-08-10T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-b", confirmedAt: "2026-08-10T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-c", confirmedAt: "2026-08-10T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-d", criterionId: "memory-reasoning-chain", confirmedAt: "2026-08-12T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-e", criterionId: "memory-reasoning-chain", confirmedAt: "2026-08-12T10:00:00.000Z" }),
      makeAttempt({ taskId: "task-f", criterionId: "memory-reasoning-chain", confirmedAt: "2026-08-12T10:00:00.000Z" }),
    ]);
    const weaknesses = selectStructuralWeaknesses([course], state);
    assert.strictEqual(weaknesses.length, 2);
    assert.strictEqual(weaknesses[0]?.criterionId, "memory-reasoning-chain");
    assert.strictEqual(weaknesses[1]?.criterionId, "memory-evidence-completeness");
  });

  it("returns empty for null memory state", () => {
    assert.deepStrictEqual(selectStructuralWeaknesses([course], null), []);
  });
});

describe("selectFsrsHighRiskItems", () => {
  const course = makeCourse();

  function makeFsrs(criteria: FsrsLearningState["criteria"]): FsrsLearningState {
    return { version: 2, criteria };
  }

  it("includes relearning criteria and criteria with lapses >= 2", () => {
    const state = makeMemoryState([], makeFsrs({
      "memory-evidence-completeness": {
        state: "relearning", difficulty: 5, stability: 2, reps: 3, lapses: 1, lastReviewAt: "2026-08-10T10:00:00.000Z",
      },
      "memory-reasoning-chain": {
        state: "review", difficulty: 5, stability: 3, reps: 4, lapses: 2, lastReviewAt: "2026-08-10T10:00:00.000Z",
      },
      "memory-quiet": {
        state: "review", difficulty: 5, stability: 20, reps: 4, lapses: 0, lastReviewAt: "2026-08-10T10:00:00.000Z",
      },
    }));
    const items = selectFsrsHighRiskItems([course], state);

    assert.deepStrictEqual(
      items.map((item) => item.criterionId),
      ["memory-reasoning-chain", "memory-evidence-completeness"],
    );
    const first = items[0];
    assert.strictEqual(first?.criterionLabel, "推理链缺少连接");
    assert.strictEqual(first?.fsrs.lapses, 2);
    assert.strictEqual(first?.knowledgePointId, "kp-1");
    assert.strictEqual(first?.hasWritingRoom, true);
    assert.ok(first !== undefined && first.suggestedIntervalDays >= 1);
  });

  it("omits criteria that no registered knowledge point declares", () => {
    const state = makeMemoryState([], makeFsrs({
      "memory-orphan": {
        state: "relearning", difficulty: 5, stability: 2, reps: 3, lapses: 3, lastReviewAt: null,
      },
    }));
    const items = selectFsrsHighRiskItems([course], state);
    assert.strictEqual(items.length, 0);
  });

  it("returns empty when fsrsState is null", () => {
    assert.deepStrictEqual(selectFsrsHighRiskItems([course], makeMemoryState([])), []);
    assert.deepStrictEqual(selectFsrsHighRiskItems([course], null), []);
  });
});

describe("selectWrongQuestionCenter three-layer compatibility", () => {
  const course = makeCourse();

  it("keeps objective aggregation unchanged without memory state", () => {
    const data = selectWrongQuestionCenter([course], {
      "assessment-1": [{
        questionId: "assessment-1",
        selectedIndex: 0,
        isCorrect: false,
        attemptedAt: "2026-08-10T10:00:00.000Z",
      }],
    });
    assert.strictEqual(data.totalWrong, 1);
    assert.strictEqual(data.weakKpCount, 1);
    assert.deepStrictEqual(data.structuralWeaknesses, []);
    assert.deepStrictEqual(data.fsrsHighRisk, []);
    assert.strictEqual(data.hasFsrsMemory, false);
  });

  it("aggregates all three layers when memory state is provided", () => {
    const state = makeMemoryState(
      [
        makeAttempt({ taskId: "task-a" }),
        makeAttempt({ taskId: "task-b" }),
        makeAttempt({ taskId: "task-c" }),
      ],
      { version: 2, criteria: {
        "memory-evidence-completeness": {
          state: "relearning", difficulty: 5, stability: 2, reps: 3, lapses: 2, lastReviewAt: null,
        },
      } },
    );
    const data = selectWrongQuestionCenter([course], {}, state);
    assert.strictEqual(data.totalWrong, 0);
    assert.strictEqual(data.structuralWeaknesses.length, 1);
    assert.strictEqual(data.fsrsHighRisk.length, 1);
    assert.strictEqual(data.hasFsrsMemory, true);
    // 同一准则可同时出现在结构薄弱与临遗忘两层，互不排斥
    assert.strictEqual(data.structuralWeaknesses[0]?.criterionId, data.fsrsHighRisk[0]?.criterionId);
  });
});

describe("wrong-question hrefs for question-bank courses", () => {
  it("lets B1 members redo via the practice route even without item.choices", () => {
    const qb = registeredCourses.find((c) => c.slug === "physiology-qb");
    assert.ok(qb);
    const b1 = flattenCourseAssessmentItems(qb).find((item) => item.questionKind === "b1");
    assert.ok(b1);
    assert.ok(!b1.choices || b1.choices.length === 0);

    const data = selectWrongQuestionCenter([qb], {
      [b1.id]: [{
        questionId: b1.id,
        selectedIndex: 0,
        isCorrect: false,
        attemptedAt: "2026-09-10T10:00:00.000Z",
      }],
    });
    assert.strictEqual(data.totalWrong, 1);
    const question = data.wrongQuestions[0];
    assert.ok(question);
    assert.strictEqual(question.canRedo, true);
    assert.strictEqual(question.hasWritingRoom, false);
    const href = selectWrongQuestionRedoHref(question);
    assert.ok(!href.includes("knowledge-points"));
    assert.ok(href.includes(`/question-bank/${question.chapterSlug}/${b1.id}`));
    assert.strictEqual(selectWrongQuestionRedoLabel(question), "重做");

    const weak = data.weakKnowledgePoints[0];
    assert.ok(weak);
    assert.strictEqual(weak.hasLesson, false);
    const weakHref = selectWeakKnowledgePointHref(weak);
    assert.ok(!weakHref.includes("knowledge-points"));
    assert.ok(weakHref.includes(`/question-bank/${weak.chapterSlug}`));
  });

  it("sends term items without scoring to the chapter question-bank, not a knowledge-point page", () => {
    const qb = registeredCourses.find((c) => c.slug === "physiology-qb");
    assert.ok(qb);
    const term = flattenCourseAssessmentItems(qb).find((item) => item.questionKind === "term");
    assert.ok(term);
    assert.strictEqual(term.scoring, null);

    const data = selectWrongQuestionCenter([qb], {
      [term.id]: [{
        questionId: term.id,
        selectedIndex: 0,
        isCorrect: false,
        attemptedAt: "2026-09-10T10:00:00.000Z",
      }],
    });
    const question = data.wrongQuestions[0];
    assert.ok(question);
    assert.strictEqual(question.canRedo, false);
    assert.strictEqual(question.hasWritingRoom, false);
    const href = selectWrongQuestionRedoHref(question);
    assert.ok(!href.includes("knowledge-points"));
    assert.ok(href.endsWith(`/question-bank/${question.chapterSlug}`));
    assert.strictEqual(selectWrongQuestionRedoLabel(question), "去做题");
  });

  it("keeps writing-room hrefs for authored courses with scoring", () => {
    const course = makeCourse();
    const data = selectWrongQuestionCenter([course], {
      "assessment-1": [{
        questionId: "assessment-1",
        selectedIndex: 0,
        isCorrect: false,
        attemptedAt: "2026-08-10T10:00:00.000Z",
      }],
    });
    const question = data.wrongQuestions[0];
    assert.ok(question);
    assert.strictEqual(question.hasWritingRoom, true);
    assert.strictEqual(
      selectWrongQuestionRedoHref(question),
      "/courses/course-one/knowledge-points/kp-one/subjective-writing",
    );
    assert.strictEqual(selectWrongQuestionRedoLabel(question), "去写作");
  });
});

describe("private objective wrongs in the wrong-question center", () => {
  it("aggregates private wrongs without looking up registered courses", () => {
    const course = makeCourse();
    const data = selectWrongQuestionCenter([course], {}, null, {
      "private-q1": [{
        questionId: "private-q1",
        unitId: "unit-1",
        prompt: "静息心率约为",
        questionKind: "a1-single",
        selectedText: "A. 40 次/分",
        isCorrect: false,
        basis: "qwen-reference",
        attemptedAt: "2026-09-11T02:00:00.000Z",
      }, {
        questionId: "private-q1",
        unitId: "unit-1",
        prompt: "静息心率约为",
        questionKind: "a1-single",
        selectedText: "B. 75 次/分",
        isCorrect: true,
        basis: "qwen-reference",
        attemptedAt: "2026-09-11T02:01:00.000Z",
      }],
    });
    assert.strictEqual(data.totalWrong, 1);
    const question = data.wrongQuestions[0];
    assert.ok(question);
    assert.equal(question.isPrivate, true);
    assert.equal(question.courseTitle, "我的资料");
    assert.equal(question.wrongCount, 1);
    assert.equal(question.totalAttempts, 2);
    assert.equal(selectWrongQuestionRedoHref(question), "/learn/my-materials?unit=unit-1");
    assert.equal(selectWrongQuestionRedoLabel(question), "去私人练习");
  });

  it("omits private questions that were only answered correctly", () => {
    const course = makeCourse();
    const data = selectWrongQuestionCenter([course], {}, null, {
      "private-q2": [{
        questionId: "private-q2",
        unitId: "unit-1",
        prompt: "填空",
        questionKind: "fill",
        selectedText: "75",
        isCorrect: true,
        basis: "source-candidate",
        attemptedAt: "2026-09-11T02:00:00.000Z",
      }],
    });
    assert.strictEqual(data.totalWrong, 0);
  });
});
