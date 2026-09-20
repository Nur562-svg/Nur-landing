import type { QuestionKind } from "@/types/learning";

export type QuestionKindOption = {
  kind: QuestionKind;
  label: string;
  shortLabel: string;
};

/**
 * 题型标签。B1/B2 语义由用户于 2026-08-06 口头确认并记录为来源：
 * - B1 = 共用备选答案配伍题（一组选项供多个小题共用、可重复选择）；
 * - B2 = 共用题干题组（一个病例/题干下多个小题，小题为单选）。
 */
export const QUESTION_KIND_OPTIONS: readonly QuestionKindOption[] = [
  { kind: "a1-single", label: "A1 单选", shortLabel: "A1" },
  { kind: "b1", label: "B1 共用备选答案配伍", shortLabel: "B1" },
  { kind: "b2", label: "B2 共用题干题组", shortLabel: "B2" },
  { kind: "fill", label: "填空", shortLabel: "填空" },
  { kind: "term", label: "名词解释", shortLabel: "名词解释" },
  { kind: "short-answer", label: "简答", shortLabel: "简答" },
  { kind: "case", label: "案例", shortLabel: "案例" },
];

const KIND_RANK = new Map(QUESTION_KIND_OPTIONS.map((option, index) => [option.kind, index]));

export function questionKindShortLabel(kind: QuestionKind): string {
  return QUESTION_KIND_OPTIONS.find((option) => option.kind === kind)?.shortLabel ?? kind;
}

export function parseQuestionBankKindQuery(value: string | null | undefined): QuestionKind[] {
  if (!value) {
    return [];
  }
  const allowed = new Set(QUESTION_KIND_OPTIONS.map((option) => option.kind));
  const seen = new Set<QuestionKind>();
  const parsed: QuestionKind[] = [];
  for (const token of value.split(",")) {
    const kind = token.trim() as QuestionKind;
    if (!allowed.has(kind) || seen.has(kind)) {
      continue;
    }
    seen.add(kind);
    parsed.push(kind);
  }
  return parsed;
}

export function serializeQuestionBankKindQuery(kinds: Iterable<QuestionKind>): string {
  const selected = new Set(kinds);
  return QUESTION_KIND_OPTIONS
    .filter((option) => selected.has(option.kind))
    .map((option) => option.kind)
    .join(",");
}

export function orderQuestionBankItemsByKind<T extends { questionKind: QuestionKind }>(
  items: readonly T[],
): T[] {
  return [...items].sort((left, right) => {
    const leftRank = KIND_RANK.get(left.questionKind) ?? 99;
    const rightRank = KIND_RANK.get(right.questionKind) ?? 99;
    return leftRank - rightRank;
  });
}

export function filterQuestionBankItemsByKinds<T extends { questionKind: QuestionKind }>(
  items: readonly T[],
  kinds: readonly QuestionKind[],
): T[] {
  const ordered = orderQuestionBankItemsByKind(items);
  if (kinds.length === 0) {
    return ordered;
  }
  const selected = new Set(kinds);
  return ordered.filter((item) => selected.has(item.questionKind));
}
