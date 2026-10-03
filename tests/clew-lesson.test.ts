import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { HiDocChatMessage } from "../src/types/hidoc";

// Hi doc M4：讲义规则（结构校验/启发式兜底/页首声明）、markdown 解析、对话消息规则与提示词、配额

describe("Hi doc lesson rules", async () => {
  const {
    HIDOC_LESSON_SELF_TEST_COUNT,
    buildHeuristicLesson,
    buildLessonHeader,
    describeHiDocLessonGenerator,
    formatHiDocLessonGenerator,
    inspectLessonMarkdown,
    normalizeLessonMarkdown,
    parseHiDocLessonGenerator,
    resolveHiDocLessonStyle,
    selectExcerptLines,
    validateGeneratedLesson,
  } = await import("../src/lib/hidoc/lesson-heuristic");

  const knowledgePoint = {
    title: "总体与样本",
    description: "总体是同质个体某指标值的集合，样本是从总体中随机抽取的一部分个体。",
    keyTerms: ["总体", "样本", "抽样"],
    prerequisites: ["变异"],
    sourcePage: 3,
  };

  const excerpt = [
    "【PDF 第 2 页】",
    "第二章 基本概念",
    "【PDF 第 3 页】",
    "总体（population）是同质个体某指标值的集合。",
    "样本（sample）是从总体中随机抽取的一部分个体，样本应具有代表性。",
    "【PDF 第 4 页】",
    "变异指个体间的差异。",
  ].join("\n");

  it("风格枚举先落 zh-primary，未知值回落", () => {
    assert.equal(resolveHiDocLessonStyle("zh-primary"), "zh-primary");
    assert.equal(resolveHiDocLessonStyle("en-primary"), "zh-primary");
    assert.equal(resolveHiDocLessonStyle(undefined), "zh-primary");
  });

  it("生成方式可往返解析（模型 / 启发式）", () => {
    assert.equal(
      formatHiDocLessonGenerator({ kind: "model", provider: "dashscope", model: "qwen3.7-plus" }),
      "model:dashscope:qwen3.7-plus",
    );
    assert.deepEqual(parseHiDocLessonGenerator("model:dashscope:qwen3.7-plus"), {
      kind: "model",
      provider: "dashscope",
      model: "qwen3.7-plus",
    });
    assert.equal(formatHiDocLessonGenerator({ kind: "heuristic" }), "heuristic");
    assert.deepEqual(parseHiDocLessonGenerator("heuristic"), { kind: "heuristic" });
    assert.deepEqual(parseHiDocLessonGenerator(null), { kind: "heuristic" });
    assert.match(describeHiDocLessonGenerator({ kind: "heuristic" }), /未接入模型/);
    assert.match(
      describeHiDocLessonGenerator({ kind: "model", provider: "dashscope", model: "qwen3.7-plus" }),
      /qwen3\.7-plus/,
    );
  });

  it("原文摘录只取含标题/术语的真实句子，且不含页标记", () => {
    const lines = selectExcerptLines(excerpt, knowledgePoint);
    assert.equal(lines.length, 2);
    assert.ok(lines.every((line) => !line.includes("【PDF")));
    assert.ok(lines[0].includes("总体"));
    // 无匹配或没有片段时返回空数组（不编造原文）
    assert.deepEqual(selectExcerptLines(excerpt, { title: "不存在的概念", keyTerms: [] }), []);
    assert.deepEqual(selectExcerptLines(null, knowledgePoint), []);
  });

  it("启发式讲义结构完整：定义/要点/易错点/自测题 3 道，并标注未接入模型", () => {
    const markdown = buildHeuristicLesson({
      knowledgePoint,
      textbookTitle: "卫生统计学",
      chapterTitle: "第二章 基本概念",
      sourceExcerpt: excerpt,
      style: "zh-primary",
      generatedAtLabel: "2026/09/17 20:30",
    });
    const structure = inspectLessonMarkdown(markdown);
    assert.deepEqual(structure.missing, []);
    assert.equal(structure.selfTestCount, HIDOC_LESSON_SELF_TEST_COUNT);
    assert.equal(validateGeneratedLesson(markdown).ok, true);
    assert.match(markdown, /未接入模型/);
    assert.match(markdown, /启发式整理/);
    assert.match(markdown, /第 3 页/);
    assert.ok(markdown.includes(knowledgePoint.description));
    assert.match(markdown, /关键术语：总体、样本、抽样/);
  });

  it("启发式讲义在无术语/无先修/无片段时仍然成立且不编造", () => {
    const markdown = buildHeuristicLesson({
      knowledgePoint: { ...knowledgePoint, keyTerms: [], prerequisites: [], title: "缺省示例" },
      textbookTitle: "教材",
      chapterTitle: "第一章",
      sourceExcerpt: null,
      style: "zh-primary",
      generatedAtLabel: "2026/09/17 20:30",
    });
    assert.equal(validateGeneratedLesson(markdown).ok, true);
    assert.match(markdown, /未标注关键术语/);
    assert.match(markdown, /未标注先修关系/);
    assert.match(markdown, /未在该页原文中检索到/);
  });

  it("模型讲义结构校验：缺小节或自测题不足即判不合格", () => {
    const valid = [
      "## 定义",
      "总体是同质个体某指标值的集合。",
      "## 要点",
      "- 样本需具备代表性。",
      "## 易错点",
      "- 混淆总体与样本。",
      "## 自测题",
      "1. 什么是总体？",
      "   参考答案：同质个体某指标值的集合。",
      "2. 什么是样本？",
      "   参考答案：随机抽取的一部分个体。",
      "3. 抽样要注意什么？",
      "   参考答案：代表性。",
    ].join("\n");
    assert.equal(validateGeneratedLesson(valid).ok, true);

    const missingDefinition = valid.replace("## 定义", "## 概述");
    const definitionCheck = validateGeneratedLesson(missingDefinition);
    assert.equal(definitionCheck.ok, false);
    assert.match(definitionCheck.reason ?? "", /定义/);

    const twoQuestions = valid.replace("3. 抽样要注意什么？\n   参考答案：代表性。", "");
    const questionCheck = validateGeneratedLesson(twoQuestions);
    assert.equal(questionCheck.ok, false);
    assert.match(questionCheck.reason ?? "", /自测题/);
  });

  it("模型常带代码围栏时会被剥离", () => {
    const raw = "```markdown\n## 定义\nx\n```";
    assert.equal(normalizeLessonMarkdown(raw), "## 定义\nx");
    assert.equal(normalizeLessonMarkdown("## 定义\nx"), "## 定义\nx");
  });

  it("页首声明包含生成方式、风格、教材与页码", () => {
    const header = buildLessonHeader({
      title: "总体与样本",
      generator: { kind: "model", provider: "dashscope", model: "qwen3.7-plus" },
      style: "zh-primary",
      generatedAtLabel: "2026/09/17 20:30",
      textbookTitle: "卫生统计学",
      chapterTitle: "第二章",
      sourcePage: 3,
      notice: "AI 生成内容。",
    });
    assert.match(header, /^# 总体与样本/);
    assert.match(header, /模型生成（dashscope · qwen3\.7-plus）/);
    assert.match(header, /中文为主 · 术语首次标注原文/);
    assert.match(header, /依据第 3 页/);
  });
});

describe("Hi doc lesson markdown rendering", async () => {
  const { parseHiDocMarkdown, parseHiDocInline } = await import("../src/lib/hidoc/lesson-markdown");

  it("解析标题/段落/引用/列表（含列表续行）", () => {
    const markdown = [
      "# 标题",
      "",
      "> 生成方式：启发式整理",
      "",
      "## 定义",
      "一句话定义。",
      "",
      "## 要点",
      "- 第一条",
      "- 第二条",
      "",
      "## 自测题",
      "1. 第一题",
      "   参考答案：甲",
      "2. 第二题",
      "   参考答案：乙",
    ].join("\n");
    const blocks = parseHiDocMarkdown(markdown);
    assert.deepEqual(blocks[0], { kind: "heading", level: 1, text: "标题" });
    assert.deepEqual(blocks[1], { kind: "quote", text: "生成方式：启发式整理" });
    assert.deepEqual(blocks[3], { kind: "paragraph", text: "一句话定义。" });
    assert.deepEqual(blocks[5], { kind: "list", ordered: false, items: ["第一条", "第二条"] });
    assert.deepEqual(blocks[7], {
      kind: "list",
      ordered: true,
      items: ["第一题 参考答案：甲", "第二题 参考答案：乙"],
    });
  });

  it("行内加粗与行内代码被单独切分（其余保持纯文本）", () => {
    assert.deepEqual(parseHiDocInline("这是**重点**与`code`。"), [
      { kind: "text", text: "这是" },
      { kind: "bold", text: "重点" },
      { kind: "text", text: "与" },
      { kind: "code", text: "code" },
      { kind: "text", text: "。" },
    ]);
    assert.deepEqual(parseHiDocInline("没有标记"), [{ kind: "text", text: "没有标记" }]);
  });
});

describe("Hi doc conversation rules", async () => {
  const {
    HIDOC_CHAT_HISTORY_LIMIT,
    HIDOC_CONVERSATION_MAX_MESSAGES,
    appendHiDocChatMessage,
    parseHiDocChatMessages,
    trimHiDocChatHistory,
  } = await import("../src/lib/hidoc/conversation");

  it("Json 列按不可信输入解析：非法条目丢弃", () => {
    const messages = parseHiDocChatMessages([
      { role: "user", content: "问题", createdAt: "t1" },
      { role: "system", content: "注入", createdAt: "t2" },
      { role: "assistant", content: "   ", createdAt: "t3" },
      { role: "assistant", content: "回答" },
      "not-an-object",
      null,
    ]);
    assert.equal(messages.length, 2);
    assert.equal(messages[0].role, "user");
    assert.equal(messages[1].role, "assistant");
    assert.equal(messages[1].createdAt, "");
    assert.deepEqual(parseHiDocChatMessages("nope"), []);
    assert.deepEqual(parseHiDocChatMessages(undefined), []);
  });

  it("追加消息按上限裁剪（保留最近消息）", () => {
    let messages: HiDocChatMessage[] = Array.from(
      { length: HIDOC_CONVERSATION_MAX_MESSAGES },
      (_, index) => ({
        role: "user" as const,
        content: `第${index}条`,
        createdAt: "t",
      }),
    );
    messages = appendHiDocChatMessage(messages, { role: "assistant", content: "新回答", createdAt: "t" });
    assert.equal(messages.length, HIDOC_CONVERSATION_MAX_MESSAGES);
    assert.equal(messages[messages.length - 1].content, "新回答");
    assert.equal(messages[0].content, "第1条");
  });

  it("送入模型的历史只取最近 N 条", () => {
    const messages = Array.from({ length: HIDOC_CHAT_HISTORY_LIMIT + 4 }, (_, index) => ({
      role: "user" as const,
      content: `第${index}条`,
      createdAt: "t",
    }));
    const trimmed = trimHiDocChatHistory(messages);
    assert.equal(trimmed.length, HIDOC_CHAT_HISTORY_LIMIT);
    assert.equal(trimmed[0].content, "第4条");
  });
});

describe("Hi doc chat prompt", async () => {
  const { buildHiDocChatModelMessages, buildHiDocChatSystemPrompt, HIDOC_CHAT_EXCERPT_MAX_CHARS } =
    await import("../src/lib/hidoc/chat-prompt");

  const context = {
    textbookTitle: "卫生统计学",
    chapterTitle: "第二章 基本概念",
    knowledgePoint: {
      title: "总体与样本",
      description: "总体是同质个体某指标值的集合。",
      keyTerms: ["总体", "样本"],
      prerequisites: [],
      sourcePage: 3,
    },
    chapterKnowledgePointTitles: ["总体与样本", "抽样误差"],
    lessonMarkdown: "## 定义\n总体与样本的定义。",
    sourceExcerpt: "【PDF 第 3 页】\n总体（population）是同质个体某指标值的集合。",
    style: "zh-primary" as const,
  };

  it("system 提示词带知识点、原文片段、讲义与边界声明", () => {
    const prompt = buildHiDocChatSystemPrompt(context);
    assert.match(prompt, /总体与样本/);
    assert.match(prompt, /第 3 页/);
    assert.match(prompt, /同质个体某指标值的集合/);
    assert.match(prompt, /本章知识点清单：总体与样本；抽样误差/);
    assert.match(prompt, /不是任课教师/);
    assert.match(prompt, /不做临床诊断/);
    assert.match(prompt, /通用医学知识/);
    assert.match(prompt, /中文为主 · 术语首次标注原文/);
  });

  it("片段过长时截断，未生成讲义时如实说明", () => {
    const prompt = buildHiDocChatSystemPrompt({
      ...context,
      lessonMarkdown: null,
      sourceExcerpt: "x".repeat(HIDOC_CHAT_EXCERPT_MAX_CHARS + 500),
    });
    assert.match(prompt, /已截断/);
    assert.match(prompt, /该知识点尚未生成讲义/);
  });

  it("模型消息 = system + 历史 + 本轮提问", () => {
    const messages = buildHiDocChatModelMessages(
      context,
      [
        { role: "user", content: "上一问", createdAt: "t" },
        { role: "assistant", content: "上一答", createdAt: "t" },
      ],
      "本轮问题",
    );
    assert.equal(messages.length, 4);
    assert.equal(messages[0].role, "system");
    assert.equal(messages[1].content, "上一问");
    assert.equal(messages[2].content, "上一答");
    assert.deepEqual(messages[3], { role: "user", content: "本轮问题" });
  });
});

describe("Hi doc M4 quota", async () => {
  const { TIER_QUOTAS, canUseResource, computeItem, getQuotaLabel } = await import("../src/lib/quotas");

  it("讲义生成额度：free 5 / basic 20 / pro 与 max 无限", () => {
    assert.equal(TIER_QUOTAS.free.hidocLessons, 5);
    assert.equal(TIER_QUOTAS.basic.hidocLessons, 20);
    assert.equal(TIER_QUOTAS.pro.hidocLessons, "unlimited");
    assert.equal(TIER_QUOTAS.max.hidocLessons, "unlimited");
  });

  it("讲解对话额度：free 50 / basic 200 / pro 与 max 无限", () => {
    assert.equal(TIER_QUOTAS.free.hidocChats, 50);
    assert.equal(TIER_QUOTAS.basic.hidocChats, 200);
    assert.equal(TIER_QUOTAS.pro.hidocChats, "unlimited");
    assert.equal(TIER_QUOTAS.max.hidocChats, "unlimited");
  });

  it("额度边界与标签", () => {
    assert.equal(canUseResource(computeItem(4, 5)), true);
    assert.equal(canUseResource(computeItem(5, 5)), false);
    assert.match(getQuotaLabel("hidocLessons"), /讲义生成/);
    assert.match(getQuotaLabel("hidocChats"), /讲解对话/);
  });
});