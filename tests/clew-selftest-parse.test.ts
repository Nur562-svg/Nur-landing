import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Clew 体验补丁：「评」环节——讲义自测题解析（题干/参考答案对）与风格枚举。
 * 讲义格式真相源：src/lib/clew/lesson-heuristic.ts（模型与启发式共用内联格式）。
 */

describe("Clew 讲义自测题解析", async () => {
  const {
    CLEW_LESSON_SELF_TEST_COUNT,
    CLEW_LESSON_STYLES,
    CLEW_LESSON_STYLE_LABELS,
    buildHeuristicLesson,
    isClewLessonStyle,
    parseClewLessonSelfTest,
    resolveClewLessonStyle,
  } = await import("../src/lib/clew/lesson-heuristic");

  it("四种风格全注册、标签齐全、未知值回落", () => {
    assert.deepEqual(
      [...CLEW_LESSON_STYLES],
      ["zh-primary", "exam-cram", "socratic", "en-primary"],
    );
    for (const style of CLEW_LESSON_STYLES) {
      assert.ok(CLEW_LESSON_STYLE_LABELS[style].length > 0);
      assert.equal(resolveClewLessonStyle(style), style);
      assert.equal(isClewLessonStyle(style), true);
    }
    assert.equal(isClewLessonStyle("unknown"), false);
    assert.equal(resolveClewLessonStyle("unknown"), "zh-primary");
  });

  const modelLesson = [
    "## 定义",
    "总体是同质个体某指标值的集合。",
    "## 要点",
    "- 抽样要有代表性。",
    "## 易错点",
    "- 样本不是随意挑的。",
    "## 自测题",
    "1. 用自己的话说明总体与样本的区别。",
    "   参考答案：总体是全部同质个体；样本是从总体中抽取的一部分，须有代表性。",
    "2. 为什么样本必须有代表性？",
    "   参考答案：否则样本无法代表总体，推论失去依据。",
    "3. 判断：随意挑选的个体也能构成合格样本。",
    "   参考答案：错。随意挑选通常缺乏代表性。",
  ].join("\n");

  it("解析模型讲义：3 道题全带答案", () => {
    const items = parseClewLessonSelfTest(modelLesson);
    assert.equal(items.length, 3);
    assert.deepEqual(
      items.map((item) => item.index),
      [1, 2, 3],
    );
    assert.match(items[0].question, /总体与样本/);
    assert.match(items[0].answer ?? "", /代表性/);
    assert.ok(items.every((item) => (item.answer ?? "").length > 0));
  });

  it("兼容加粗编号与题干行内联参考答案", () => {
    const items = parseClewLessonSelfTest(
      [
        "## 自测题",
        "**1.** 什么是变异？ **参考答案：个体间的差异。**",
        "**2.** 说明样本代表性的意义。",
        "   **参考答案：使推论有效。**",
      ].join("\n"),
    );
    assert.equal(items.length, 2);
    assert.equal(items[0].question, "什么是变异？");
    assert.equal(items[0].answer, "个体间的差异。");
    assert.equal(items[1].question, "说明样本代表性的意义。");
    assert.equal(items[1].answer, "使推论有效。");
  });

  it("无答案 / 无自测题时诚实返回（不编造）", () => {
    const noAnswer = parseClewLessonSelfTest(["## 自测题", "1. 仅题干，无答案。"].join("\n"));
    assert.equal(noAnswer.length, 1);
    assert.equal(noAnswer[0].answer, null);

    assert.deepEqual(parseClewLessonSelfTest("## 定义\n只有定义。"), []);
  });

  it("启发式讲义产出可解析的自测题（题干+参考答案）", () => {
    const lesson = buildHeuristicLesson({
      knowledgePoint: {
        title: "总体与样本",
        description: "总体是同质个体某指标值的集合，样本是从总体中随机抽取的一部分个体。",
        keyTerms: ["总体", "样本"],
        prerequisites: [],
        sourcePage: 3,
      },
      textbookTitle: "医学统计学",
      chapterTitle: "第二章 基本概念",
      sourceExcerpt: [
        "【PDF 第 3 页】",
        "总体（population）是同质个体某指标值的集合。",
        "样本（sample）是从总体中随机抽取的一部分个体，样本应具有代表性。",
      ].join("\n"),
      style: "zh-primary",
      generatedAtLabel: "2026-10-02 09:00",
      fileName: "book.pdf",
    });
    const items = parseClewLessonSelfTest(lesson);
    assert.equal(items.length, CLEW_LESSON_SELF_TEST_COUNT);
    assert.ok(items.every((item) => item.question.length > 0));
    assert.ok(items.every((item) => (item.answer ?? "").length > 0));
  });
});
