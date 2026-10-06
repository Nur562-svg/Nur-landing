/**
 * Clew 练习题结构校验（ZCODE-M6-A，纯函数可测试）。
 * 模型产出的练习题组必须六件套齐备（题干/选项/答案/解析/页码/题型），
 * 缺一即整组拒收——宁可不生成，不生成残题（无启发式兜底，任务书 §〇.1）。
 * 页码引用确定性核验：sourcePage 必须落在原文片段实际包含的页集内。
 * ZCODE-M6 补遗（无页码降级）：excerptPages = null 表示本教材无文字层页码（DOCX）——
 * 页码校验整体跳过、sourcePage 记 0（无页码哨兵；人工标注页由服务层另行盖章）。
 */

import type { ClewPracticeKind } from "@/types/clew";

export type RawPracticeQuestion = {
  kind?: unknown;
  stem?: unknown;
  choices?: unknown;
  answerIndex?: unknown;
  answerText?: unknown;
  explanation?: unknown;
  sourcePage?: unknown;
};

export type ValidatedPracticeQuestion = {
  kind: ClewPracticeKind;
  stem: string;
  choices: string[] | null;
  /** a1 = 正确项 index；fill = 参考答案文本。 */
  answer: number | string;
  explanation: string;
  sourcePage: number;
};

export type PracticeValidationResult =
  | { ok: true; questions: ValidatedPracticeQuestion[] }
  | { ok: false; reason: string };

const MAX_STEM_CHARS = 600;
const MAX_EXPLANATION_CHARS = 1200;
const MAX_ANSWER_TEXT_CHARS = 300;
const EXPECTED_TOTAL = 6;
const EXPECTED_A1 = 4;
const EXPECTED_FILL = 2;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** 校验模型产出的练习题组（raw 为已 JSON.parse 的内容；excerptPages 为原文片段实际页集，null = 无页码模式）。 */
export function validateClewPracticeQuestions(
  raw: unknown,
  excerptPages: readonly number[] | null,
): PracticeValidationResult {
  if (typeof raw !== "object" || raw === null || !Array.isArray((raw as { questions?: unknown }).questions)) {
    return { ok: false, reason: "响应不是 {questions:[…]} 结构" };
  }
  const list = (raw as { questions: unknown[] }).questions;
  if (list.length !== EXPECTED_TOTAL) {
    return { ok: false, reason: `题数 ${list.length} ≠ ${EXPECTED_TOTAL}（A1×4 + 填空×2）` };
  }

  const validated: ValidatedPracticeQuestion[] = [];
  let a1Count = 0;
  let fillCount = 0;
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i] as RawPracticeQuestion;
    const label = `第 ${i + 1} 题`;
    if (item.kind !== "a1" && item.kind !== "fill") {
      return { ok: false, reason: `${label}题型不是 a1/fill` };
    }
    if (!isNonEmptyString(item.stem) || item.stem.length > MAX_STEM_CHARS) {
      return { ok: false, reason: `${label}题干缺失或超长` };
    }
    if (!isNonEmptyString(item.explanation) || item.explanation.length > MAX_EXPLANATION_CHARS) {
      return { ok: false, reason: `${label}解析缺失或超长` };
    }
    if (excerptPages !== null) {
      if (
        typeof item.sourcePage !== "number"
        || !Number.isInteger(item.sourcePage)
        || !excerptPages.includes(item.sourcePage)
      ) {
        return { ok: false, reason: `${label}页码引用不在原文片段页集（${excerptPages.join("/")}）内` };
      }
    }
    if (item.kind === "a1") {
      if (
        !Array.isArray(item.choices)
        || item.choices.length !== 4
        || !item.choices.every((choice) => isNonEmptyString(choice))
      ) {
        return { ok: false, reason: `${label}选项不是 4 个非空文本` };
      }
      if (
        typeof item.answerIndex !== "number"
        || !Number.isInteger(item.answerIndex)
        || item.answerIndex < 0
        || item.answerIndex > 3
      ) {
        return { ok: false, reason: `${label}正确项 index 非法` };
      }
      a1Count += 1;
      validated.push({
        kind: "a1",
        stem: item.stem.trim(),
        choices: (item.choices as string[]).map((choice) => choice.trim()),
        answer: item.answerIndex,
        explanation: item.explanation.trim(),
        sourcePage: excerptPages !== null && typeof item.sourcePage === "number" ? item.sourcePage : 0,
      });
    } else {
      if (!isNonEmptyString(item.answerText) || item.answerText.length > MAX_ANSWER_TEXT_CHARS) {
        return { ok: false, reason: `${label}填空参考答案缺失或超长` };
      }
      fillCount += 1;
      validated.push({
        kind: "fill",
        stem: item.stem.trim(),
        choices: null,
        answer: item.answerText.trim(),
        explanation: item.explanation.trim(),
        sourcePage: excerptPages !== null && typeof item.sourcePage === "number" ? item.sourcePage : 0,
      });
    }
  }
  if (a1Count !== EXPECTED_A1 || fillCount !== EXPECTED_FILL) {
    return { ok: false, reason: `题型分布不符（A1 ${a1Count}/4，填空 ${fillCount}/2）` };
  }
  return { ok: true, questions: validated };
}
