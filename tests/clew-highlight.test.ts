import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Clew M5：划重点校验（长度/枚举/上限）、讲义定位匹配与失配判定、学霸笔记启发式拼装、结构校验与配额

describe("Clew highlight rules", async () => {
  const {
    CLEW_HIGHLIGHT_COLORS,
    CLEW_HIGHLIGHT_COLOR_LABELS,
    CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS,
    CLEW_HIGHLIGHT_MAX_PER_KP,
    CLEW_HIGHLIGHT_NOTE_MAX_CHARS,
    CLEW_HIGHLIGHT_NOT_FOUND_MESSAGE,
    CLEW_HIGHLIGHT_QUOTE_MAX_CHARS,
    buildClewHighlightLimitMessage,
    findClewQuoteMatch,
    isClewHighlightStale,
    parseClewHighlightAnchor,
    parseClewHighlightColor,
    toClewHighlightPaintItems,
    validateClewHighlightInput,
    validateClewHighlightPatch,
  } = await import("../src/lib/clew/highlight-rules");

  const baseInput = {
    quote: "  总体与样本  ",
    prefix: "  上文  ",
    suffix: " 下文 ",
    color: "amber",
    note: "  重点  ",
  };

  it("四色枚举固定且标签完整，未知颜色返回 null", () => {
    assert.deepEqual([...CLEW_HIGHLIGHT_COLORS], ["amber", "cinnabar", "slate", "jade"]);
    for (const color of CLEW_HIGHLIGHT_COLORS) {
      assert.ok(CLEW_HIGHLIGHT_COLOR_LABELS[color].length > 0);
    }
    assert.equal(parseClewHighlightColor("amber"), "amber");
    assert.equal(parseClewHighlightColor("red"), null);
    assert.equal(parseClewHighlightColor(undefined), null);
  });

  it("创建校验：quote 去首尾空白、批注可空、颜色必须在枚举内", () => {
    const ok = validateClewHighlightInput(baseInput);
    assert.equal(ok.ok, true);
    if (ok.ok) {
      assert.equal(ok.value.quote, "总体与样本");
      assert.equal(ok.value.color, "amber");
      assert.equal(ok.value.note, "重点");
      assert.equal(ok.value.prefix, "上文");
      assert.equal(ok.value.suffix, "下文");
    }

    const empty = validateClewHighlightInput({ ...baseInput, quote: "   " });
    assert.equal(empty.ok, false);
    if (!empty.ok) {
      assert.match(empty.reason, /选中/);
    }

    const noNote = validateClewHighlightInput({ ...baseInput, note: "  " });
    assert.equal(noNote.ok, true);
    if (noNote.ok) {
      assert.equal(noNote.value.note, null);
    }

    const badColor = validateClewHighlightInput({ ...baseInput, color: "neon" });
    assert.equal(badColor.ok, false);
    if (!badColor.ok) {
      assert.match(badColor.reason, /四色/);
    }
  });

  it("创建校验：quote ≤500 / note ≤1000，超限明确报错", () => {
    assert.equal(CLEW_HIGHLIGHT_QUOTE_MAX_CHARS, 500);
    assert.equal(CLEW_HIGHLIGHT_NOTE_MAX_CHARS, 1000);

    const quoteOk = validateClewHighlightInput({ ...baseInput, quote: "字".repeat(500) });
    assert.equal(quoteOk.ok, true);
    const quoteTooLong = validateClewHighlightInput({ ...baseInput, quote: "字".repeat(501) });
    assert.equal(quoteTooLong.ok, false);
    if (!quoteTooLong.ok) {
      assert.match(quoteTooLong.reason, /500/);
    }

    const noteOk = validateClewHighlightInput({ ...baseInput, note: "字".repeat(1000) });
    assert.equal(noteOk.ok, true);
    const noteTooLong = validateClewHighlightInput({ ...baseInput, note: "字".repeat(1001) });
    assert.equal(noteTooLong.ok, false);
    if (!noteTooLong.ok) {
      assert.match(noteTooLong.reason, /1000/);
    }
  });

  it("定位上下文各自限长：前缀保留靠近选区的尾部、后缀保留头部", () => {
    const long = "甲".repeat(CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS + 20);
    const result = validateClewHighlightInput({ ...baseInput, prefix: long, suffix: long });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.prefix.length, CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS);
      assert.equal(result.value.suffix.length, CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS);
    }
  });

  it("修改校验：至少改颜色或批注之一，空批注按清除处理", () => {
    assert.equal(validateClewHighlightPatch({ color: undefined, note: undefined }).ok, false);
    const colorOnly = validateClewHighlightPatch({ color: "jade", note: undefined });
    assert.equal(colorOnly.ok, true);
    if (colorOnly.ok) {
      assert.deepEqual(colorOnly.value, { color: "jade" });
    }
    const clearNote = validateClewHighlightPatch({ color: undefined, note: "   " });
    assert.equal(clearNote.ok, true);
    if (clearNote.ok) {
      assert.equal(clearNote.value.note, null);
    }
    assert.equal(validateClewHighlightPatch({ color: "neon", note: undefined }).ok, false);
    assert.equal(validateClewHighlightPatch({ color: undefined, note: 5 }).ok, false);
  });

  it("每 kp 上限 100：超出时 503 语义的中文原因含上限与删除指引", () => {
    assert.equal(CLEW_HIGHLIGHT_MAX_PER_KP, 100);
    const message = buildClewHighlightLimitMessage();
    assert.match(message, /100/);
    assert.match(message, /删除/);
    assert.match(CLEW_HIGHLIGHT_NOT_FOUND_MESSAGE, /不属于当前账户/);
  });

  it("锚点解析与失配判定：讲义版本不一致即未定位，绝不猜测", () => {
    assert.deepEqual(parseClewHighlightAnchor({ lessonUpdatedAt: "2026-09-17T12:00:00.000Z" }), {
      lessonUpdatedAt: "2026-09-17T12:00:00.000Z",
    });
    assert.deepEqual(parseClewHighlightAnchor(null), { lessonUpdatedAt: null });
    assert.deepEqual(parseClewHighlightAnchor({ lessonUpdatedAt: 7 }), { lessonUpdatedAt: null });

    assert.equal(
      isClewHighlightStale({ anchorLessonUpdatedAt: "t1" }, "t1"),
      false,
    );
    assert.equal(isClewHighlightStale({ anchorLessonUpdatedAt: "t1" }, "t2"), true);
    assert.equal(isClewHighlightStale({ anchorLessonUpdatedAt: null }, "t2"), true);
    assert.equal(isClewHighlightStale({ anchorLessonUpdatedAt: "t1" }, null), true);
  });

  it("定位匹配：精确命中、上下文消歧、去空白兜底、匹配不到返回 null", () => {
    const text = "总体是同质个体的集合。样本是从总体中随机抽取的一部分个体。";

    const single = findClewQuoteMatch(text, "样本");
    assert.ok(single);
    assert.equal(text.slice(single.start, single.end), "样本");

    const duplicated = "重复句甲。中间。重复句甲。结尾。";
    const first = findClewQuoteMatch(duplicated, "重复句甲。");
    assert.equal(first?.start, 0);
    const second = findClewQuoteMatch(duplicated, "重复句甲。", "中间。", "结尾。");
    assert.equal(second?.start, 8);
    assert.equal(duplicated.slice(second!.start, second!.end), "重复句甲。");

    // 跨块选区常带换行；正文纯文本没有分隔符，去空白后仍能定位
    const crossBlock = "总体是同质个体的集合样本是从总体中随机抽取的一部分个体";
    const withNewline = findClewQuoteMatch(crossBlock, "的集合\n样本是");
    assert.ok(withNewline);
    assert.equal(
      crossBlock.slice(withNewline.start, withNewline.end),
      "的集合样本是",
    );

    assert.equal(findClewQuoteMatch(text, "不存在的句子"), null);
    assert.equal(findClewQuoteMatch("", "样本"), null);
    assert.equal(findClewQuoteMatch(text, "   "), null);
  });

  it("渲染项只保留定位所需字段", () => {
    const items = toClewHighlightPaintItems([
      {
        id: "h1",
        kpId: "kp1",
        quote: "定义",
        prefix: "前",
        suffix: "后",
        color: "slate",
        note: "批注",
        anchorLessonUpdatedAt: "t1",
        createdAt: "c",
        updatedAt: "u",
      },
    ]);
    assert.deepEqual(items, [
      { id: "h1", color: "slate", quote: "定义", prefix: "前", suffix: "后" },
    ]);
  });
});

describe("Clew note rules", async () => {
  const {
    CLEW_NOTE_LESSON_SOURCE_MAX_CHARS,
    buildHeuristicClewNote,
    buildClewNoteFileName,
    buildClewNoteModelInput,
    extractLessonNoteSource,
    extractLessonSelfTestItems,
    inspectClewNote,
    validateGeneratedNote,
  } = await import("../src/lib/clew/note-heuristic");

  const lessonMarkdown = [
    "# 总体与样本",
    "",
    "> 生成方式：模型生成（dashscope · qwen3.7-plus）",
    "> 风格：中文为主 · 术语首次标注原文 · 生成时间：2026/09/17 20:30",
    "",
    "## 定义",
    "总体是同质个体某指标值的集合。",
    "",
    "## 要点",
    "- 样本需具备代表性。",
    "- 抽样必须随机。",
    "",
    "## 易错点",
    "- 混淆总体与样本。",
    "",
    "## 自测题",
    "1. 什么是总体？",
    "   参考答案：同质个体某指标值的集合。",
    "2. 什么是样本？",
    "   参考答案：随机抽取的一部分个体。",
    "3. 抽样要注意什么？",
    "   参考答案：代表性。",
  ].join("\n");

  const context = {
    textbookTitle: "卫生统计学",
    chapterOrder: 2,
    chapterTotal: 9,
    chapterTitle: "第二章 基本概念",
    pageStart: 3,
    pageEnd: 5,
    points: [
      {
        id: "kp1",
        order: 1,
        title: "总体与样本",
        description: "总体是同质个体某指标值的集合。",
        keyTerms: ["总体", "样本"],
        sourcePage: 3,
        lessonMarkdown,
        questions: ["总体和样本到底怎么区分？"],
        highlights: [
          { quote: "样本是从总体中随机抽取的", note: "抽样必须随机", color: "amber" as const },
          { quote: "代表性", note: null, color: "jade" as const },
        ],
      },
      {
        id: "kp2",
        order: 2,
        title: "抽样误差",
        description: "由抽样造成的样本统计量与总体参数之差。",
        keyTerms: [],
        sourcePage: 4,
        lessonMarkdown: null,
        questions: [],
        highlights: [],
      },
    ],
  };

  it("讲义片段只保留定义/要点/易错点/自测题，页首引用不进上下文", () => {
    const { source } = extractLessonNoteSource(lessonMarkdown);
    assert.match(source, /## 要点/);
    assert.match(source, /## 自测题/);
    assert.ok(!source.includes("生成方式"));
    assert.ok(!source.includes("# 总体与样本"));
    assert.equal(extractLessonSelfTestItems(lessonMarkdown).length, 3);

    const capped = extractLessonNoteSource(lessonMarkdown, 30);
    assert.equal(capped.truncated, true);
    assert.match(capped.source, /已截断/);
    assert.equal(extractLessonNoteSource(lessonMarkdown, CLEW_NOTE_LESSON_SOURCE_MAX_CHARS).truncated, false);
  });

  it("启发式笔记：有讲义/划重点/批注/追问的小节齐全，缺失的小节如实略去", () => {
    const markdown = buildHeuristicClewNote({ context, generatedAtLabel: "2026/09/17 22:00" });
    assert.match(markdown, /学霸笔记/);
    assert.match(markdown, /未接入模型/);
    assert.match(markdown, /## 章首导读/);
    assert.match(markdown, /## 知识点笔记/);
    assert.match(markdown, /### 01\. 总体与样本/);
    assert.match(markdown, /### 02\. 抽样误差/);
    assert.match(markdown, /我的划重点/);
    assert.match(markdown, /我的批注/);
    assert.match(markdown, /追问中暴露的问题/);
    assert.match(markdown, /总体和样本到底怎么区分？/);
    assert.match(markdown, /## 自测题汇总/);
    assert.match(markdown, /【01 总体与样本】/);
    assert.match(markdown, /该知识点尚未生成讲义/);
    assert.match(markdown, /第 3–5 页/);
    // 缺失的小节只出现一次（第二个知识点没有划重点/批注/追问），且不编造学习者行为
    assert.equal(markdown.split("我的划重点").length - 1, 1);
    assert.equal(markdown.split("我的批注").length - 1, 1);
    assert.ok(!markdown.includes("你曾问到"));
    assert.equal(validateGeneratedNote(markdown).ok, true);
  });

  it("无讲义/无划重点/无追问时仍成立：不出现对应小节，自测题汇总如实说明", () => {
    const empty = buildHeuristicClewNote({
      context: {
        ...context,
        points: context.points.map((point) => ({
          ...point,
          lessonMarkdown: null,
          questions: [],
          highlights: [],
        })),
      },
      generatedAtLabel: "2026/09/17 22:00",
    });
    assert.ok(!empty.includes("我的划重点"));
    assert.ok(!empty.includes("我的批注"));
    assert.ok(!empty.includes("追问中暴露的问题"));
    assert.match(empty, /本章暂无讲义自测题/);
    assert.equal(validateGeneratedNote(empty).ok, true);
  });

  it("结构校验：缺章首导读/自测题汇总/知识点小节即不合格", () => {
    const structure = inspectClewNote([
      "## 章首导读",
      "导读。",
      "## 知识点笔记",
      "### 01. 甲",
      "内容。",
      "## 自测题汇总",
      "- 题目。",
    ].join("\n"));
    assert.deepEqual(structure, { hasOverview: true, hasSelfTestSummary: true, pointSectionCount: 1 });

    const noOverview = validateGeneratedNote("## 知识点笔记\n### 01. 甲\n## 自测题汇总\n- 题目。");
    assert.equal(noOverview.ok, false);
    assert.match(noOverview.reason ?? "", /章首导读/);

    const noSummary = validateGeneratedNote("## 章首导读\n导读。\n### 01. 甲");
    assert.equal(noSummary.ok, false);
    assert.match(noSummary.reason ?? "", /自测题汇总/);

    const noPointSection = validateGeneratedNote("## 章首导读\n导读。\n## 自测题汇总\n- 题目。");
    assert.equal(noPointSection.ok, false);
    assert.match(noPointSection.reason ?? "", /知识点/);
  });

  it("模型输入：只带真实存在的学习痕迹，缺失讲义时有如实说明", () => {
    const { input, notes } = buildClewNoteModelInput(context);
    assert.equal(input.hasAnyLesson, true);
    assert.equal(input.hasAnyConversation, true);
    assert.equal(input.hasAnyHighlight, true);
    assert.equal(input.points[0].lessonSource !== null, true);
    assert.equal(input.points[0].lessonTruncated, false);
    assert.deepEqual(input.points[0].questions, ["总体和样本到底怎么区分？"]);
    assert.equal(input.points[1].lessonSource, null);
    assert.equal(notes.some((note) => note.includes("尚未生成讲义")), true);
  });

  it("下载文件名：{教材名}-{章节名}-学霸笔记.md，非法字符替换", () => {
    assert.equal(
      buildClewNoteFileName("卫生统计学", "第二章 基本概念"),
      "卫生统计学-第二章 基本概念-学霸笔记.md",
    );
    assert.equal(
      buildClewNoteFileName("卫/生:统计*学?", "第\n二章"),
      "卫_生_统计_学_-第_二章-学霸笔记.md",
    );
    assert.equal(buildClewNoteFileName("", ""), "教材-章节-学霸笔记.md");
  });
});

describe("Clew M5 quota", async () => {
  const { TIER_QUOTAS, canUseResource, computeItem, getQuotaLabel } = await import("../src/lib/quotas");

  it("学霸笔记额度：free 3 / basic 10 / pro 与 max 无限", () => {
    assert.equal(TIER_QUOTAS.free.clewNotes, 3);
    assert.equal(TIER_QUOTAS.basic.clewNotes, 10);
    assert.equal(TIER_QUOTAS.pro.clewNotes, "unlimited");
    assert.equal(TIER_QUOTAS.max.clewNotes, "unlimited");
  });

  it("额度边界与标签（503 语义）", () => {
    assert.equal(canUseResource(computeItem(2, 3)), true);
    assert.equal(canUseResource(computeItem(3, 3)), false);
    assert.equal(canUseResource(computeItem(999, "unlimited")), true);
    assert.match(getQuotaLabel("clewNotes"), /学霸笔记/);
  });
});