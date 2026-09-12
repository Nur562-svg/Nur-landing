import { describe, it } from "node:test";
import assert from "node:assert";
import type {
  PrivateMaterialLearningQuestion,
  PrivateMaterialLearningUnitDraft,
} from "@/types/course-builder";
import {
  buildPrivateConfirmedAttemptInput,
  parsePrivateObjectiveAttemptsJson,
  privateAttemptText,
  selectPrivatePracticeHref,
} from "@/lib/private-practice-memory";

const question: PrivateMaterialLearningQuestion = {
  id: "q-a1",
  topicId: "t1",
  sourceExcerptIds: ["e1"],
  sourceLocators: [],
  normalizedPrompt: "静息心率约为",
  questionKind: "a1-single",
  choices: ["40 次/分", "75 次/分"],
  correctChoiceIndex: 1,
  promptAuthority: { layer: "learner-private", status: "pending-review" },
  sourceAnswerStatus: "candidate-present-pending-review",
  generatedReferenceAnswer: {
    label: "NUR / Qwen 生成参考答案 · 尚无来源标准答案",
    authority: "nur-qwen-generated",
    confidence: "generated-pending-review",
    variants: { concise: "75", exam: "75 次/分", expanded: "75 次/分" },
    structurePoints: ["数值", "单位"],
    uncertaintyNote: "待复核",
  },
  scoringAuthority: "not-provided",
};

const unit: PrivateMaterialLearningUnitDraft = {
  version: 1,
  kind: "private-material-learning-unit",
  id: "unit-1",
  title: "导入练习",
  courseId: "course-private-workspace",
  courseTitle: "我的资料",
  knowledgePointId: "kp-imported-materials",
  knowledgePointTitle: "导入练习",
  visibility: "private-current-session",
  coverageStatus: "partial",
  topics: [],
  questions: [question],
  unmapped: [],
  conflicts: [],
  missingFacts: [],
  rights: {
    publication: "not-authorized",
    materialCatalogMutation: "not-authorized",
    courseRegistryMutation: "not-authorized",
    officialCourseCompilation: "not-authorized",
  },
};

describe("private practice memory helpers", () => {
  it("formats a1 answers as lettered choices", () => {
    assert.equal(privateAttemptText({
      question,
      draft: "",
      selectedIndex: 1,
    }), "B. 75 次/分");
  });

  it("marks missing criteria when the objective answer is wrong", () => {
    const input = buildPrivateConfirmedAttemptInput({
      question,
      unit,
      analysisId: "analysis-1",
      confirmedText: "A. 40 次/分",
      objectiveCorrect: false,
    });
    assert.equal(input.taskId, "private-q-a1");
    assert.equal(input.courseId, "course-private-workspace");
    assert.ok(input.criterionResults.every((item) => item.status === "missing"));
  });

  it("parses private objective attempt snapshots and drops corrupt rows", () => {
    const parsed = parsePrivateObjectiveAttemptsJson(JSON.stringify({
      "q-a1": [{
        questionId: "q-a1",
        unitId: "unit-1",
        prompt: "静息心率约为",
        questionKind: "a1-single",
        selectedText: "A. 40 次/分",
        isCorrect: false,
        basis: "qwen-reference",
        attemptedAt: "2026-09-11T02:00:00.000Z",
      }, {
        questionId: "q-a1",
        broken: true,
      }],
      "skip": "nope",
    }));
    assert.equal(parsed["q-a1"]?.length, 1);
    assert.equal(parsed["q-a1"]?.[0]?.isCorrect, false);
    assert.equal(parsed.skip, undefined);
  });

  it("builds a private practice href with the unit query", () => {
    assert.equal(selectPrivatePracticeHref(null), "/learn/my-materials");
    assert.equal(selectPrivatePracticeHref("unit-1"), "/learn/my-materials?unit=unit-1");
  });
});
