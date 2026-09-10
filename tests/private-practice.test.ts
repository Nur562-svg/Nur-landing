import { describe, it } from "node:test";
import assert from "node:assert";
import type { CourseBuildPrivateOverlayInput, PrivateMaterialLearningQuestion } from "@/types/course-builder";
import {
  parsePrivateMaterialAnalysisProviderPlan,
  assertValidPrivateMaterialAnalysisProviderPlan,
} from "@/lib/course-builder/private-analysis-validation";
import {
  PRIVATE_WORKSPACE_COURSE_ID,
  PRIVATE_WORKSPACE_KP_ID,
  isPrivateWorkspaceTarget,
  resolvePrivateMaterialAnalysisTarget,
} from "@/lib/private-workspace";
import { scorePrivateChoice, scorePrivateFill } from "@/lib/private-practice";
import { registeredCourses } from "@/content/courses";

const overlay: CourseBuildPrivateOverlayInput = {
  version: 1,
  overlayId: "overlay-import-1",
  courseId: PRIVATE_WORKSPACE_COURSE_ID,
  knowledgePointId: PRIVATE_WORKSPACE_KP_ID,
  source: {
    sourceType: "study-note",
    declaredAuthority: "student",
    layer: "learner-private",
    authorityReviewStatus: "pending-review",
  },
  privacy: {
    declaration: "none-observed",
    risk: "none-observed",
    publicationPolicy: "local-only",
  },
  excerpts: [{
    id: "excerpt-001",
    sectionId: "section-1",
    sectionTitle: "练习",
    kind: "paragraph",
    text: "1. 正常成人静息心率约为 A. 40 次 B. 75 次 答案：B",
    locator: { kind: "docx-semantic-block", label: "DOCX 语义块 001", blockIndex: 1, pageNumber: null },
  }],
};

function learningQuestion(partial: Partial<PrivateMaterialLearningQuestion> & Pick<PrivateMaterialLearningQuestion, "questionKind" | "choices" | "correctChoiceIndex">): PrivateMaterialLearningQuestion {
  return {
    id: "q1",
    topicId: "topic-001",
    sourceExcerptIds: ["excerpt-001"],
    sourceLocators: [],
    normalizedPrompt: "正常成人静息心率约为",
    promptAuthority: { layer: "learner-private", status: "pending-review" },
    sourceAnswerStatus: "candidate-present-pending-review",
    generatedReferenceAnswer: {
      label: "NUR / Qwen 生成参考答案 · 尚无来源标准答案",
      authority: "nur-qwen-generated",
      confidence: "generated-pending-review",
      variants: { concise: "75", exam: "75 次/分", expanded: "75 次/分" },
      structurePoints: ["数值"],
      uncertaintyNote: "待复核",
    },
    scoringAuthority: "not-provided",
    ...partial,
  };
}

describe("private workspace import", () => {
  it("resolves the sentinel workspace without a registered course", () => {
    assert.equal(isPrivateWorkspaceTarget(PRIVATE_WORKSPACE_COURSE_ID, PRIVATE_WORKSPACE_KP_ID), true);
    const target = resolvePrivateMaterialAnalysisTarget(overlay, registeredCourses);
    assert.deepEqual(target, { courseTitle: "我的资料", knowledgePointTitle: "导入练习" });
    assert.equal(
      resolvePrivateMaterialAnalysisTarget({ courseId: "course-missing", knowledgePointId: "kp-missing" }, registeredCourses),
      null,
    );
  });

  it("accepts a1-single questions with choices in the analysis plan", () => {
    const plan = parsePrivateMaterialAnalysisProviderPlan({
      version: 1,
      overlayId: overlay.overlayId,
      courseId: overlay.courseId,
      knowledgePointId: overlay.knowledgePointId,
      coverage: {
        status: "partial",
        compilationReadiness: "insufficient-for-full-course",
        summary: "一份私人单选练习，不能当作完整课程。",
      },
      topics: [{
        id: "topic-001",
        label: "心率",
        rationale: "摘录中的选择题",
        excerptIds: ["excerpt-001"],
      }],
      questions: [{
        id: "question-001",
        topicId: "topic-001",
        sourceExcerptIds: ["excerpt-001"],
        normalizedPrompt: "正常成人静息心率约为",
        questionKind: "a1-single",
        sourceAnswerStatus: "candidate-present-pending-review",
        choices: ["40 次/分", "75 次/分"],
        correctChoiceIndex: 1,
        answerDraft: {
          referenceAnswer: "75 次/分",
          structurePoints: ["成人静息心率约 60–100", "本题选项 B 为 75"],
          uncertaintyNote: "来源候选答案待人工复核。",
        },
      }],
      unmapped: [],
      conflicts: [],
      missingFacts: ["教师评分标准待提供"],
    });
    assertValidPrivateMaterialAnalysisProviderPlan(plan, overlay);
    assert.equal(plan.questions[0]?.questionKind, "a1-single");
    assert.equal(plan.questions[0]?.correctChoiceIndex, 1);
  });

  it("rejects choice fields on fill/short questions", () => {
    assert.throws(() => parsePrivateMaterialAnalysisProviderPlan({
      version: 1,
      overlayId: overlay.overlayId,
      courseId: overlay.courseId,
      knowledgePointId: overlay.knowledgePointId,
      coverage: {
        status: "partial",
        compilationReadiness: "insufficient-for-full-course",
        summary: "填空不应带选项。",
      },
      topics: [{
        id: "topic-001",
        label: "心率",
        rationale: "填空",
        excerptIds: ["excerpt-001"],
      }],
      questions: [{
        id: "question-001",
        topicId: "topic-001",
        sourceExcerptIds: ["excerpt-001"],
        normalizedPrompt: "正常成人静息心率约为____次/分",
        questionKind: "fill",
        sourceAnswerStatus: "missing",
        choices: ["75"],
        correctChoiceIndex: null,
        answerDraft: {
          referenceAnswer: "75",
          structurePoints: ["数字"],
          uncertaintyNote: "待复核",
        },
      }],
      unmapped: [],
      conflicts: [],
      missingFacts: ["待提供"],
    }));
  });
});

describe("private practice scoring", () => {
  it("scores a1-single against the candidate index", () => {
    const question = learningQuestion({
      questionKind: "a1-single",
      choices: ["40 次/分", "75 次/分"],
      correctChoiceIndex: 1,
    });
    assert.deepEqual(scorePrivateChoice(question, 1), {
      judged: true,
      correct: true,
      basis: "source-candidate",
    });
    assert.equal(scorePrivateChoice(question, 0).correct, false);
  });

  it("scores fill against the exam reference with aliases", () => {
    const question = learningQuestion({
      questionKind: "fill",
      choices: [],
      correctChoiceIndex: null,
      generatedReferenceAnswer: {
        label: "NUR / Qwen 生成参考答案 · 尚无来源标准答案",
        authority: "nur-qwen-generated",
        confidence: "generated-pending-review",
        variants: { concise: "75", exam: "75／七十五", expanded: "75" },
        structurePoints: ["数字"],
        uncertaintyNote: "待复核",
      },
    });
    assert.equal(scorePrivateFill(question, " 75 ").correct, true);
    assert.equal(scorePrivateFill(question, "七十五").correct, true);
    assert.equal(scorePrivateFill(question, "80").correct, false);
  });
});
