import type { PrivateMaterialLearningQuestion } from "@/types/course-builder";

export type PrivateJudgementBasis = "source-candidate" | "qwen-reference" | "unavailable";

export type PrivateObjectiveScore = {
  judged: boolean;
  correct: boolean | null;
  basis: PrivateJudgementBasis;
};

function judgementBasis(question: PrivateMaterialLearningQuestion): PrivateJudgementBasis {
  if (question.sourceAnswerStatus === "candidate-present-pending-review") {
    return "source-candidate";
  }
  return "qwen-reference";
}

export function privateQuestionChoices(question: PrivateMaterialLearningQuestion): readonly string[] {
  return question.choices ?? [];
}

export function scorePrivateChoice(
  question: PrivateMaterialLearningQuestion,
  selectedIndex: number,
): PrivateObjectiveScore {
  const choices = privateQuestionChoices(question);
  const answerIndex = question.correctChoiceIndex ?? null;
  if (question.questionKind !== "a1-single" || choices.length < 2 || answerIndex === null) {
    return { judged: false, correct: null, basis: "unavailable" };
  }
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= choices.length) {
    return { judged: false, correct: null, basis: "unavailable" };
  }
  return {
    judged: true,
    correct: selectedIndex === answerIndex,
    basis: judgementBasis(question),
  };
}

export function normalizePrivateFill(value: string): string {
  return value.replace(/\s+/g, "").toLowerCase();
}

export function scorePrivateFill(
  question: PrivateMaterialLearningQuestion,
  draft: string,
): PrivateObjectiveScore {
  if (question.questionKind !== "fill") {
    return { judged: false, correct: null, basis: "unavailable" };
  }
  const expected = normalizePrivateFill(question.generatedReferenceAnswer.variants.exam);
  const actual = normalizePrivateFill(draft);
  if (!expected || !actual) {
    return { judged: false, correct: null, basis: "unavailable" };
  }
  const aliases = expected.split(/[/／;；,，|]/).map((part) => part.trim()).filter(Boolean);
  const matched = aliases.some((alias) => alias === actual);
  return {
    judged: true,
    correct: matched,
    basis: judgementBasis(question),
  };
}

export function privateJudgementLabel(basis: PrivateJudgementBasis): string {
  if (basis === "source-candidate") {
    return "来源候选判定 · 待复核";
  }
  if (basis === "qwen-reference") {
    return "NUR / Qwen 参考判定 · 不是标准答案";
  }
  return "本题暂不能自动判定";
}
