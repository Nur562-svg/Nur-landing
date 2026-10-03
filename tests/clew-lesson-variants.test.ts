import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * ZCODE-M4 Phase 1：讲义三视图派生（初学/复习/备考）。
 * 铁律：确定性派生（full 恒等、review 只折叠自测答案、exam 压缩），零模型调用、幂等；
 * 试卷类边界：没有参考答案行的自测题在 review 下是恒等变换（不补答案）。
 */

describe("Clew 讲义三视图派生", async () => {
  const {
    buildHeuristicLesson,
    parseClewLessonSelfTest,
  } = await import("../src/lib/clew/lesson-heuristic");
  const {
    CLEW_LESSON_VARIANTS,
    CLEW_LESSON_VARIANT_LABELS,
    deriveClewLessonVariant,
    isClewLessonVariant,
  } = await import("../src/lib/clew/lesson-variants");

  /** 模型讲义形态：页首引用块 + 定义/要点/易错点/自测题（整行答案与行内联答案各一）。 */
  const modelLesson = [
    "# 营气与卫气",
    "",
    "> 生成方式：模型生成（dashscope · qwen3.7-plus）",
    "> 风格：中文为主 · 生成时间：2026-10-03 10:00",
    "> 教材：《测试教材》· 第一章 · 依据第 3 页",
    "> AI 生成内容，请对照教材原文核对；不是教师讲义或标准答案。",
    "",
    "## 定义",
    "营气是行于脉中、具有营养作用的气。它由水谷精气中的精华部分化生。",
    "营气的判断标准",
    "- 营气由水谷精气化生。它行于脉中。",
    "",
    "## 要点",
    "- 营气行于脉中。卫气行于脉外。",
    "- 营主濡养。",
    "",
    "## 易错点",
    "- 复习时先回忆，再对照参考答案核对。",
    "- 营气与卫气不可直接等同。",
    "",
    "## 自测题",
    "1. 营气行于何处？",
    "   参考答案：营气行于脉中，具有营养作用。",
    "2. 卫气的功能？",
    "   参考答案：温养肌表、防御外邪。",
    "3. 判断：营气与卫气可直接等同。**参考答案：错。二者分属阴阳，不可直接等同**",
  ].join("\n");

  it("枚举与标签注册齐全", () => {
    assert.deepEqual([...CLEW_LESSON_VARIANTS], ["full", "review", "exam"]);
    for (const variant of CLEW_LESSON_VARIANTS) {
      assert.ok(CLEW_LESSON_VARIANT_LABELS[variant].length > 0);
    }
    assert.equal(isClewLessonVariant("full"), true);
    assert.equal(isClewLessonVariant("unknown"), false);
  });

  it("full 恒等（逐字节）", () => {
    assert.equal(deriveClewLessonVariant(modelLesson, "full").contentMd, modelLesson);
    assert.equal(deriveClewLessonVariant(modelLesson, "full").note, "");
  });

  it("review 仅删自测题内参考答案（整行与行内两种形态），其他小节不动", () => {
    const derived = deriveClewLessonVariant(modelLesson, "review");
    const lines = derived.contentMd.split("\n");

    // 整行答案被删除
    assert.ok(!lines.includes("   参考答案：营气行于脉中，具有营养作用。"));
    assert.ok(!lines.includes("   参考答案：温养肌表、防御外邪。"));
    // 行内答案被折叠，题干保留（含去掉内联加粗的「**参考答案」）
    assert.ok(lines.includes("3. 判断：营气与卫气可直接等同。"));
    // 题干保留
    assert.ok(lines.includes("1. 营气行于何处？"));
    assert.ok(lines.includes("2. 卫气的功能？"));
    // 自测题标题保留；其他小节即使含「参考答案」字样也不动
    assert.ok(lines.includes("## 自测题"));
    assert.ok(lines.includes("- 复习时先回忆，再对照参考答案核对。"));
    assert.ok(lines.includes("营气是行于脉中、具有营养作用的气。它由水谷精气中的精华部分化生。"));
    // 页首引用块保留
    assert.ok(lines.includes("> 生成方式：模型生成（dashscope · qwen3.7-plus）"));
    // note 文案
    assert.match(derived.note, /复习视图/);
    assert.match(derived.note, /未重新生成/);

    // 面板解析仍基于原讲义：题干与答案不受视图影响
    const items = parseClewLessonSelfTest(modelLesson);
    assert.equal(items.length, 3);
    assert.match(items[0].answer ?? "", /脉中/);
    assert.match(items[2].answer ?? "", /不可直接等同/);
  });

  it("review 对没有参考答案行的自测题是恒等变换（不补答案）", () => {
    const noAnswerLesson = [
      "## 定义",
      "某概念的定义。",
      "",
      "## 自测题",
      "1. 第一问（讲义未附答案）。",
      "2. 第二问（讲义未附答案）。",
    ].join("\n");
    const derived = deriveClewLessonVariant(noAnswerLesson, "review");
    assert.equal(derived.contentMd, noAnswerLesson);
  });

  it("exam：自测题整节（含标题）消失；定义截首句；要点/易错点逐行不变；引用块保留", () => {
    const derived = deriveClewLessonVariant(modelLesson, "exam");
    const lines = derived.contentMd.split("\n");

    assert.ok(!lines.includes("## 自测题"));
    assert.ok(!lines.some((line) => line.startsWith("1. 营气行于何处")));
    // 定义截首句：多个句号只到第一个；无「。」整行保留
    assert.ok(lines.includes("营气是行于脉中、具有营养作用的气。"));
    assert.ok(!lines.includes("营气是行于脉中、具有营养作用的气。它由水谷精气中的精华部分化生。"));
    assert.ok(lines.includes("营气的判断标准"));
    // 定义内列表行同样截首句
    assert.ok(lines.includes("- 营气由水谷精气化生。"));
    assert.ok(!lines.includes("- 营气由水谷精气化生。它行于脉中。"));
    // 要点/易错点原样保留（列表行不截）
    assert.ok(lines.includes("- 营气行于脉中。卫气行于脉外。"));
    assert.ok(lines.includes("- 营主濡养。"));
    assert.ok(lines.includes("- 营气与卫气不可直接等同。"));
    assert.ok(lines.includes("## 定义"));
    assert.ok(lines.includes("## 要点"));
    assert.ok(lines.includes("## 易错点"));
    // 页首引用块保留
    assert.ok(lines.includes("> 教材：《测试教材》· 第一章 · 依据第 3 页"));
    // note 文案
    assert.match(derived.note, /备考视图/);
  });

  it("启发式讲义形态同样适用（buildHeuristicLesson 产出）", () => {
    const heuristicLesson = buildHeuristicLesson({
      knowledgePoint: {
        title: "营气",
        description: "营气是行于脉中的气。",
        keyTerms: ["营气", "卫气"],
        prerequisites: [],
        sourcePage: 3,
      },
      textbookTitle: "测试教材",
      chapterTitle: "第一章",
      sourceExcerpt: null,
      style: "zh-primary",
      generatedAtLabel: "2026-10-03 10:00",
    });

    assert.equal(deriveClewLessonVariant(heuristicLesson, "full").contentMd, heuristicLesson);

    const review = deriveClewLessonVariant(heuristicLesson, "review");
    const reviewLines = review.contentMd.split("\n");
    assert.ok(!reviewLines.some((line) => line.trim().startsWith("参考答案")));
    assert.ok(reviewLines.includes("1. 用自己的话写出「营气」的定义。"));
    assert.ok(reviewLines.includes("## 自测题"));

    const exam = deriveClewLessonVariant(heuristicLesson, "exam");
    const examLines = exam.contentMd.split("\n");
    assert.ok(!examLines.includes("## 自测题"));
    assert.ok(examLines.includes("营气是行于脉中的气。"));
  });

  it("幂等：同一 (markdown, variant) 多次派生逐字节相同", () => {
    for (const variant of ["review", "exam"] as const) {
      const once = deriveClewLessonVariant(modelLesson, variant);
      const twice = deriveClewLessonVariant(once.contentMd, variant);
      assert.equal(twice.contentMd, once.contentMd);
      assert.equal(twice.note, once.note);
    }
  });

  it("无任何小节的输入保持原样（不抛错）", () => {
    const bare = "# 只有标题\n\n一段没有小节结构的正文。";
    for (const variant of ["review", "exam"] as const) {
      assert.equal(deriveClewLessonVariant(bare, variant).contentMd, bare);
    }
  });
});
