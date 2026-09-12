import type { QuestionKind } from "@/types/learning";

export function matchQuestionBankFill(
  expected: readonly string[],
  draft: string,
): boolean {
  const actual = draft.replace(/\s+/g, "").toLowerCase();
  if (!actual) {
    return false;
  }
  return expected.some((item) => {
    const aliases = item.replace(/\s+/g, "").toLowerCase().split(/[／;；,，|]/).filter(Boolean);
    return aliases.includes(actual);
  });
}

export function shouldRecordQuestionBankAttempt(input: {
  hasChoices: boolean;
  questionKind: QuestionKind;
  fillAnswerAvailable: boolean;
}): boolean {
  if (input.hasChoices) {
    return true;
  }
  return input.questionKind === "fill" && input.fillAnswerAvailable;
}
