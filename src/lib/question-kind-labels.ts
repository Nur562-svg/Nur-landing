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
