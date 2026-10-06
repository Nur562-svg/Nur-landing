import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { ClewChatMessage } from "../src/types/clew";

// Clew M4：讲义规则（结构校验/启发式兜底/页首声明）、markdown 解析、对话消息规则与提示词、配额

describe("Clew lesson rules", async () => {
  const {
    CLEW_LESSON_SELF_TEST_COUNT,
    buildHeuristicLesson,
    buildLessonHeader,
    describeClewLessonGenerator,
    formatClewLessonGenerator,
    inspectLessonMarkdown,
    normalizeLessonMarkdown,
    parseClewLessonGenerator,
    resolveClewLessonStyle,
    selectExcerptLines,
    validateGeneratedLesson,
  } = await import("../src/lib/clew/lesson-heuristic");

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

  it("风格枚举：四种风格互不回落，未知值回落 zh-primary", () => {
    assert.equal(resolveClewLessonStyle("zh-primary"), "zh-primary");
    assert.equal(resolveClewLessonStyle("exam-cram"), "exam-cram");
    assert.equal(resolveClewLessonStyle("socratic"), "socratic");
    assert.equal(resolveClewLessonStyle("en-primary"), "en-primary");
    assert.equal(resolveClewLessonStyle("unknown-style"), "zh-primary");
    assert.equal(resolveClewLessonStyle(undefined), "zh-primary");
  });

  it("生成方式可往返解析（模型 / 启发式）", () => {
    assert.equal(
      formatClewLessonGenerator({ kind: "model", provider: "dashscope", model: "qwen3.7-plus" }),
      "model:dashscope:qwen3.7-plus",
    );
    assert.deepEqual(parseClewLessonGenerator("model:dashscope:qwen3.7-plus"), {
      kind: "model",
      provider: "dashscope",
      model: "qwen3.7-plus",
    });
    assert.equal(formatClewLessonGenerator({ kind: "heuristic" }), "heuristic");
    assert.deepEqual(parseClewLessonGenerator("heuristic"), { kind: "heuristic" });
    assert.deepEqual(parseClewLessonGenerator(null), { kind: "heuristic" });
    assert.match(describeClewLessonGenerator({ kind: "heuristic" }), /未接入模型/);
    const described = describeClewLessonGenerator({
      kind: "model",
      provider: "dashscope",
      model: "qwen3.7-plus",
    });
    // 批 3：对用户只呈现模型名，provider 不入界面文案
    assert.match(described, /模型生成 · qwen3\.7-plus/);
    assert.equal(described.includes("dashscope"), false);
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
    // 启发式讲义只含四节；机制机理/易混辨析是模型 rubric（M6-D）新增，启发式不校验
    assert.deepEqual(structure.missing, ["机制机理", "易混辨析"]);
    assert.equal(structure.selfTestCount, CLEW_LESSON_SELF_TEST_COUNT);
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
    const structure = inspectLessonMarkdown(markdown);
    assert.deepEqual(structure.missing, ["机制机理", "易混辨析"]);
    assert.match(markdown, /未标注关键术语/);
    assert.match(markdown, /未标注先修关系/);
    assert.match(markdown, /未在该页原文中检索到/);
  });

  it("模型讲义结构校验（M6-D rubric）：六节缺一即不合格，易混辨析可诚实写「本页未涉及」", () => {
    const valid = [
      "## 定义",
      "总体是同质个体某指标值的集合。",
      "## 机制机理",
      "因为个体之间存在差异，才需要用集合与抽样的语言刻画。",
      "## 易混辨析",
      "总体 vs 样本：总体是全体，样本是被抽取的一部分。",
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

    const honestMixup = valid.replace(
      "总体 vs 样本：总体是全体，样本是被抽取的一部分。",
      "本页未涉及",
    );
    assert.equal(validateGeneratedLesson(honestMixup).ok, true);

    const missingDefinition = valid.replace("## 定义", "## 概述");
    const definitionCheck = validateGeneratedLesson(missingDefinition);
    assert.equal(definitionCheck.ok, false);
    assert.match(definitionCheck.reason ?? "", /定义/);

    const missingMechanism = valid.replace("## 机制机理", "## 机制");
    const mechanismCheck = validateGeneratedLesson(missingMechanism);
    assert.equal(mechanismCheck.ok, false);
    assert.match(mechanismCheck.reason ?? "", /机制机理/);

    const missingMixup = valid.replace("## 易混辨析\n总体 vs 样本：总体是全体，样本是被抽取的一部分。\n", "");
    const mixupCheck = validateGeneratedLesson(missingMixup);
    assert.equal(mixupCheck.ok, false);
    assert.match(mixupCheck.reason ?? "", /易混辨析/);

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
    assert.match(header, /模型生成 · qwen3\.7-plus/);
    assert.equal(header.includes("dashscope"), false);
    assert.match(header, /中文为主 · 术语首次标注原文/);
    assert.match(header, /依据第 3 页/);
  });
});

describe("Clew lesson markdown rendering", async () => {
  const { parseClewMarkdown, parseClewInline } = await import("../src/lib/clew/lesson-markdown");

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
    const blocks = parseClewMarkdown(markdown);
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
    assert.deepEqual(parseClewInline("这是**重点**与`code`。"), [
      { kind: "text", text: "这是" },
      { kind: "bold", text: "重点" },
      { kind: "text", text: "与" },
      { kind: "code", text: "code" },
      { kind: "text", text: "。" },
    ]);
    assert.deepEqual(parseClewInline("没有标记"), [{ kind: "text", text: "没有标记" }]);
  });
});

describe("Clew conversation rules", async () => {
  const {
    CLEW_CHAT_HISTORY_LIMIT,
    CLEW_CONVERSATION_MAX_MESSAGES,
    appendClewChatMessage,
    parseClewChatMessages,
    trimClewChatHistory,
  } = await import("../src/lib/clew/conversation");

  it("Json 列按不可信输入解析：非法条目丢弃", () => {
    const messages = parseClewChatMessages([
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
    assert.deepEqual(parseClewChatMessages("nope"), []);
    assert.deepEqual(parseClewChatMessages(undefined), []);
  });

  it("追加消息按上限裁剪（保留最近消息）", () => {
    let messages: ClewChatMessage[] = Array.from(
      { length: CLEW_CONVERSATION_MAX_MESSAGES },
      (_, index) => ({
        role: "user" as const,
        content: `第${index}条`,
        createdAt: "t",
      }),
    );
    messages = appendClewChatMessage(messages, { role: "assistant", content: "新回答", createdAt: "t" });
    assert.equal(messages.length, CLEW_CONVERSATION_MAX_MESSAGES);
    assert.equal(messages[messages.length - 1].content, "新回答");
    assert.equal(messages[0].content, "第1条");
  });

  it("送入模型的历史只取最近 N 条", () => {
    const messages = Array.from({ length: CLEW_CHAT_HISTORY_LIMIT + 4 }, (_, index) => ({
      role: "user" as const,
      content: `第${index}条`,
      createdAt: "t",
    }));
    const trimmed = trimClewChatHistory(messages);
    assert.equal(trimmed.length, CLEW_CHAT_HISTORY_LIMIT);
    assert.equal(trimmed[0].content, "第4条");
  });
});

describe("Clew chat prompt", async () => {
  const { buildClewChatModelMessages, buildClewChatSystemPrompt, CLEW_CHAT_EXCERPT_MAX_CHARS } =
    await import("../src/lib/clew/chat-prompt");

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
    const prompt = buildClewChatSystemPrompt(context);
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
    const prompt = buildClewChatSystemPrompt({
      ...context,
      lessonMarkdown: null,
      sourceExcerpt: "x".repeat(CLEW_CHAT_EXCERPT_MAX_CHARS + 500),
    });
    assert.match(prompt, /已截断/);
    assert.match(prompt, /该知识点尚未生成讲义/);
  });

  it("模型消息 = system + 历史 + 本轮提问", () => {
    const messages = buildClewChatModelMessages(
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

  it("依据范围缺省与 lesson+source 逐字一致（批 3 向后兼容锁定）", () => {
    const implicit = buildClewChatSystemPrompt(context);
    const explicit = buildClewChatSystemPrompt({ ...context, scope: "lesson+source" });
    assert.equal(implicit, explicit);
    assert.match(implicit, /回答必须回源：优先依据下方教材原文片段与讲义/);
    assert.match(implicit, /【PDF 第 3 页】/);
  });

  it("lesson-only：不给原文片段，回源规则改为仅讲义", () => {
    const prompt = buildClewChatSystemPrompt({ ...context, scope: "lesson-only" });
    assert.match(prompt, /仅依据讲义/);
    assert.match(prompt, /本轮不提供教材原文片段/);
    assert.equal(prompt.includes("【PDF 第 3 页】"), false);
    assert.match(prompt, /讲义未覆盖这一点/);
  });

  it("extended：保留原文，允许拓展但要求标注", () => {
    const prompt = buildClewChatSystemPrompt({ ...context, scope: "extended" });
    assert.match(prompt, /【PDF 第 3 页】/);
    assert.match(prompt, /允许结合背景拓展/);
    assert.match(prompt, /非本教材内容/);
  });

  it("chat-scope 常量与校验（client-safe）", async () => {
    const { CLEW_CHAT_SCOPES, CLEW_CHAT_SCOPE_LABELS, isClewChatScope, resolveClewChatScope } =
      await import("../src/lib/clew/chat-scope");
    assert.deepEqual([...CLEW_CHAT_SCOPES], ["lesson-only", "lesson+source", "extended"]);
    assert.equal(isClewChatScope("lesson-only"), true);
    assert.equal(isClewChatScope("yolo"), false);
    assert.equal(resolveClewChatScope(undefined), "lesson+source");
    assert.equal(resolveClewChatScope("bogus"), "lesson+source");
    assert.equal(resolveClewChatScope("extended"), "extended");
    for (const scope of CLEW_CHAT_SCOPES) {
      assert.ok(CLEW_CHAT_SCOPE_LABELS[scope].length > 0);
    }
  });

  it("用户可见「来源：」notes 文案不出现 provider（补遗 2 锁定）", async () => {
    // 四处服务端 notes 模板（lesson/note/extraction/toc-recognition）已按
    // describeClewLessonGenerator 同口径清理；此测试防回退——源码级扫描（无 provider 时模型输出不可桩）。
    const { readFileSync } = await import("node:fs");
    const files = [
      "src/lib/clew/lesson.ts",
      "src/lib/clew/note.ts",
      "src/lib/clew/extraction.ts",
      "src/lib/clew/toc-recognition.ts",
    ];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      const offending = source
        .split("\n")
        .filter((line) => line.includes("来源：") && line.includes("${provider.id}"));
      assert.deepEqual(offending, [], `${file} 的「来源：」notes 不应再引用 provider.id`);
    }
  });
});

describe("Clew M4 quota", async () => {
  const { TIER_QUOTAS, canUseResource, computeItem, getQuotaLabel } = await import("../src/lib/quotas");

  it("讲义生成额度：free 3 / basic 13 / pro 与 max 无限（M6-D 下调后）", () => {
    assert.equal(TIER_QUOTAS.free.clewLessons, 3); // M6-D：D6 全套成本对价下调（原 5）
    assert.equal(TIER_QUOTAS.basic.clewLessons, 13); // M6-D 下调（原 20）
    assert.equal(TIER_QUOTAS.pro.clewLessons, "unlimited");
    assert.equal(TIER_QUOTAS.max.clewLessons, "unlimited");
  });

  it("讲解对话额度：free 50 / basic 200 / pro 与 max 无限", () => {
    assert.equal(TIER_QUOTAS.free.clewChats, 50);
    assert.equal(TIER_QUOTAS.basic.clewChats, 200);
    assert.equal(TIER_QUOTAS.pro.clewChats, "unlimited");
    assert.equal(TIER_QUOTAS.max.clewChats, "unlimited");
  });

  it("额度边界与标签", () => {
    assert.equal(canUseResource(computeItem(4, 5)), true);
    assert.equal(canUseResource(computeItem(5, 5)), false);
    assert.match(getQuotaLabel("clewLessons"), /讲义生成/);
    assert.match(getQuotaLabel("clewChats"), /讲解对话/);
  });
});
describe("Clew M6-D lesson depth（讲义深度改造）", async () => {
  const { extractLessonEssence } = await import("../src/lib/clew/lesson-heuristic");
  const { deriveClewLessonVariant } = await import("../src/lib/clew/lesson-variants");
  const { buildClewLessonPrompt } = await import("../src/lib/clew/providers/dashscope-lesson");

  const lessonMd = [
    "## 定义",
    "总体是同质个体某指标值的集合。",
    "",
    "## 要点",
    "- 样本需具备代表性。",
    "- 抽样误差不可避免。",
    "## 易错点",
    "- 混淆总体与样本。",
  ].join("\n");

  it("extractLessonEssence：提取定义与要点；超限裁剪；缺节为空", () => {
    const essence = extractLessonEssence(lessonMd, 800);
    assert.equal(essence.definition, "总体是同质个体某指标值的集合。");
    assert.deepEqual(essence.keyPoints, ["样本需具备代表性。", "抽样误差不可避免。"]);

    const clipped = extractLessonEssence(lessonMd, 20);
    assert.ok(clipped.definition.length + clipped.keyPoints.join("").length <= 20 + 2);

    const empty = extractLessonEssence("无小节文本", 800);
    assert.deepEqual(empty, { definition: "", keyPoints: [] });
  });

  it("prompt 缺省形态：六节骨架 + 自测可答性约束，无增强块", () => {
    const prompt = buildClewLessonPrompt({
      textbookTitle: "卫生统计学",
      chapterTitle: "第二章",
      knowledgePoint: {
        title: "总体与样本",
        description: "总体是同质个体某指标值的集合。",
        keyTerms: ["总体"],
        prerequisites: [],
        sourcePage: 3,
      },
      sourceExcerpt: "【PDF 第 3 页】\n总体是同质个体某指标值的集合。",
      style: "zh-primary",
    });
    for (const section of ["## 定义", "## 机制机理", "## 易混辨析", "## 要点", "## 易错点", "## 自测题"]) {
      assert.ok(prompt.includes(section), `缺 ${section}`);
    }
    assert.match(prompt, /答案必须能从本讲义正文推出/);
    assert.match(prompt, /本页未涉及/);
    assert.equal(prompt.includes("先修知识点讲义摘要"), false);
    assert.equal(prompt.includes("本章证据原子"), false);
    assert.equal(prompt.includes("上一次输出未通过校验"), false);
  });

  it("prompt 增强形态：先修摘要在知识点信息前，证据原子在原文片段后，均带「仅作背景」", () => {
    const prompt = buildClewLessonPrompt({
      textbookTitle: "卫生统计学",
      chapterTitle: "第二章",
      knowledgePoint: {
        title: "望闻问切互相印证",
        description: "四诊互相支持补充。",
        keyTerms: ["互相印证"],
        prerequisites: ["四诊合参原则"],
        sourcePage: 4,
      },
      sourceExcerpt: "【PDF 第 4 页】\n望闻问切互相印证。",
      style: "zh-primary",
      prerequisiteSummaries: [
        { title: "四诊合参原则", definition: "四诊合参是核心原则。", keyPoints: ["不得孤立使用单一诊法。"] },
      ],
      evidenceAtoms: [{ page: 5, text: "望诊的组成包括神色形态。" }],
    });
    const prereqIndex = prompt.indexOf("先修知识点讲义摘要");
    const kpIndex = prompt.indexOf("知识点信息：");
    const excerptIndex = prompt.indexOf("教材原文片段（引用页码以此为准）：");
    const atomIndex = prompt.indexOf("本章证据原子");
    assert.ok(prereqIndex >= 0 && kpIndex >= 0 && excerptIndex >= 0 && atomIndex >= 0);
    assert.ok(prereqIndex < kpIndex, "先修摘要应在知识点信息之前");
    assert.ok(excerptIndex < atomIndex, "证据原子应在原文片段之后");
    assert.match(prompt, /仅作背景帮助理解，不得直接引用为出处/);
    assert.match(prompt, /四诊合参原则/);
    assert.match(prompt, /【第 5 页】望诊的组成包括神色形态。/);
  });

  it("prompt 重试形态：回灌校验失败清单", () => {
    const prompt = buildClewLessonPrompt({
      textbookTitle: "卫生统计学",
      chapterTitle: "第二章",
      knowledgePoint: {
        title: "总体与样本",
        description: "d",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 3,
      },
      sourceExcerpt: "【PDF 第 3 页】\n总体。",
      style: "zh-primary",
      retryFeedback: "缺少「机制机理」小节",
    });
    assert.match(prompt, /注意：上一次输出未通过校验（缺少「机制机理」小节）/);
    assert.match(prompt, /六个小节缺一不可/);
  });

  it("三视图派生：新小节原样保留（备考视图仅删自测题）", () => {
    const markdown = [
      "## 定义",
      "总体是集合。",
      "## 机制机理",
      "个体差异导致抽样误差。",
      "## 易混辨析",
      "总体 vs 样本。",
      "## 要点",
      "- 代表性。",
      "## 易错点",
      "- 混淆。",
      "## 自测题",
      "1. 什么是总体？",
      "   参考答案：集合。",
      "2. 什么是样本？",
      "   参考答案：一部分。",
      "3. 抽样注意？",
      "   参考答案：代表性。",
    ].join("\n");
    const exam = deriveClewLessonVariant(markdown, "exam");
    assert.match(exam.contentMd, /## 机制机理/);
    assert.match(exam.contentMd, /## 易混辨析/);
    assert.equal(exam.contentMd.includes("## 自测题"), false);
    const review = deriveClewLessonVariant(markdown, "review");
    assert.match(review.contentMd, /## 机制机理/);
    assert.equal(review.contentMd.includes("参考答案"), false);
  });
});

describe("Clew M6 补遗：讲义页首 KP 页码标签", async () => {
  const { buildLessonHeader } = await import("../src/lib/clew/lesson-heuristic");

  const base = {
    title: "胸骨角",
    generator: { kind: "model" as const, provider: "dashscope", model: "qwen3.7-plus" },
    style: "zh-primary" as const,
    generatedAtLabel: "2026/10/06 12:00",
    textbookTitle: "解剖名词解释",
    chapterTitle: "第一章",
    notice: "AI 生成内容。",
  };

  it("DOCX 未标注：页首保持「页码待确认」（行为不变）", () => {
    const header = buildLessonHeader({ ...base, sourcePage: 1, fileName: "解剖.docx" });
    assert.match(header, /依据页码待确认/);
    assert.equal(header.includes("你标注的"), false);
  });

  it("DOCX 人工标注：页首「第 N 页 · 你标注的」（限定词锁定）", () => {
    const header = buildLessonHeader({ ...base, sourcePage: 12, sourcePageAnnotated: true, fileName: "解剖.docx" });
    assert.match(header, /依据第 12 页 · 你标注的/);
  });

  it("PDF：不受旗标影响，保持文字层页码", () => {
    const header = buildLessonHeader({ ...base, sourcePage: 3, sourcePageAnnotated: true, fileName: "book.pdf" });
    assert.match(header, /依据第 3 页$/m);
    assert.equal(header.includes("你标注的"), false);
  });
});
