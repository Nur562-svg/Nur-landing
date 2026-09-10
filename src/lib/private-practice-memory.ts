import type {
  PrivateMaterialAnalysisResult,
  PrivateMaterialLearningQuestion,
  PrivateMaterialLearningUnitDraft,
} from "@/types/course-builder";
import type { ConfirmedAttemptInput } from "@/lib/learning-memory";
import { privateQuestionChoices } from "@/lib/private-practice";

export function privateAttemptText(options: {
  question: PrivateMaterialLearningQuestion;
  draft: string;
  selectedIndex: number | null;
}): string {
  const { question, draft, selectedIndex } = options;
  if (question.questionKind === "a1-single") {
    const choices = privateQuestionChoices(question);
    if (selectedIndex === null || selectedIndex < 0 || selectedIndex >= choices.length) {
      return draft.trim();
    }
    return `${String.fromCharCode(65 + selectedIndex)}. ${choices[selectedIndex]}`;
  }
  return draft.trim();
}

export function buildPrivateConfirmedAttemptInput(options: {
  question: PrivateMaterialLearningQuestion;
  unit: PrivateMaterialLearningUnitDraft;
  analysisId: string;
  confirmedText: string;
  objectiveCorrect: boolean | null;
}): ConfirmedAttemptInput {
  const { question, unit, analysisId, confirmedText, objectiveCorrect } = options;
  const structurePoints = question.generatedReferenceAnswer.structurePoints;
  const defaultStatus = objectiveCorrect === false ? "missing" as const : "present" as const;
  const criterionResults = structurePoints.length > 0
    ? structurePoints.map((_point, index) => ({
      criterionId: `${question.id}-point-${index}`,
      memoryCriterionId: `${question.id}-point-${index}`,
      status: defaultStatus,
    }))
    : [{
      criterionId: `${question.id}-default`,
      memoryCriterionId: `${question.id}-default`,
      status: defaultStatus,
    }];

  return {
    courseId: unit.courseId,
    courseVersionId: "private-current-session",
    offeringId: "private",
    knowledgePointId: unit.knowledgePointId,
    surface: "subjective-writing",
    taskId: `private-${question.id}`,
    segmentId: null,
    confirmedText,
    scoringStandard: {
      id: "nur-qwen-private-ref",
      version: analysisId || "1",
      authority: "nur-platform",
    },
    criterionResults,
    answerConfidence: "unverified",
  };
}

export function privatePracticeStorageKey(analysis: PrivateMaterialAnalysisResult): string {
  return `nur-learn:private-practice-state:${analysis.learningUnit.id}`;
}
