import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * ZCODE-M6-D（任务书 §七 D-4）：问 Clew 深度。
 * 锁定：
 * - chat-prompt 缺省（无证据原子）与金样逐字节一致（金样冻结于 M6-D 迭代第 2 轮后，见 GOLDEN_PROMPT）；
 * - 有绑定原子 → system prompt 在原文片段之后出现「本章证据原子」段（带仅作背景约束）；
 * - 证据原子注入 scope=lesson-only 时不生效；与片段重复的原子去重；
 * - 回答引用自检：失配句在 notes 如实标注（不阻断、不改写回答）；
 * - 定向提示：self-check-shaky 到期 → notes 一行提示（消费 M5 数据）。
 * 隔离 SQLite + fetch 桩（SSE 流式响应），不碰 prisma/dev.db，不发真实网络请求。
 */

// —— 必须在 import 服务模块之前：隔离数据库 + provider env 桩 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-clew-chat-depth-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;
process.env.DASHSCOPE_API_KEY = "stub-key";
delete process.env.CLEW_CHAT_PROVIDER;
delete process.env.CLEW_CHAT_MODEL;
delete process.env.CLEW_MODEL_PROVIDER;
execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

const EXCERPT = "【PDF 第 3 页】\n总体（population）是同质个体某指标值的集合，样本是从总体中随机抽取的一部分个体。";

/**
 * 缺省 system prompt 金样（M6-D prompt 迭代第 2 轮后冻结）——缺省路径逐字节锁定的锚：
 * 此后证据原子接线等任何增强，无原子时不得改变这个字节串。
 */
const GOLDEN_CONTEXT = {
  textbookTitle: "卫生统计学",
  chapterTitle: "第二章 基本概念",
  knowledgePoint: {
    title: "总体与样本",
    description: "总体是同质个体某指标值的集合。",
    keyTerms: ["总体", "样本"],
    prerequisites: [] as string[],
    sourcePage: 3,
  },
  chapterKnowledgePointTitles: ["总体与样本", "抽样误差"],
  lessonMarkdown: "## 定义\n总体与样本的定义。" as string | null,
  sourceExcerpt: "【PDF 第 3 页】\n总体（population）是同质个体某指标值的集合。" as string | null,
  style: "zh-primary" as const,
};
const GOLDEN_PROMPT =
  "你是 Ariadne「Clew」里的学习搭档（语气：生动、有人味、像 Grok——直接、机敏、偶尔一点幽默，但不油腻）。\n你正在陪学生啃这份用户私有教材的一个具体知识点：先把话说清楚，再把原文钉死。\n边界规则（硬约束，幽默也不能破）：\n- 你是 AI 学习搭档，不是任课教师：不代替教师评分，不预测考试分数。\n- 不做临床诊断、不给个体化医疗建议；学生问「这个诊断对不对」时按教材原文解释结构，不做临床判断。\n- 中医与现代医学表述分别说明，不要直接等同；不确定就直说不确定。\n- 回答必须回源：优先依据下方教材原文片段与讲义；超出范围时，在回答开头标注「以下为通用医学知识，非本教材内容」。\n- 讲解风格：中文为主 · 术语首次标注原文；引用教材时写清页码（如「第 3 页」）。\n- 回答使用中文：可以说人话、用短比喻帮助学生记住，但禁止空泛鸡汤；可用小标题与短列表，不要 markdown 表格或代码块（对比内容用短列表逐条写）。引用页码时把该页支撑的内容写在同一句里（如「第 3 页指出：……」或「……（第 3 页）」），不要输出只装页码的表格列或裸编号。页码只标注原文片段或讲义里可对照核验的表述；由常识或知识点说明引申、而原文片段里没有对应用词的内容不要挂页码——宁可不引用，不得给无法对照核验的表述标页码。\n- 不得声称教师强调过某内容，也不得编造教材页码。\n\n教材：《卫生统计学》\n章节：第二章 基本概念\n当前知识点：总体与样本（第 3 页）\n知识点说明：总体是同质个体某指标值的集合。\n关键术语：总体、样本\n先修知识点：（未标注）\n本章知识点清单：总体与样本；抽样误差\n\n本知识点教材原文片段（带【PDF 第 X 页】标记，引用时以这里的页码为准）：\n【PDF 第 3 页】\n总体（population）是同质个体某指标值的集合。\n\n本知识点讲义（如已生成）：\n## 定义\n总体与样本的定义。";

// fetch 桩：捕获最后一次模型请求体，按脚本返回固定 SSE 回答
let lastRequest: { url: string; body: { messages?: { role: string; content: string }[] } } | null = null;
let stubAnswer = "好的，总体是同质个体某指标值的集合（第 3 页）。";
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  if (url.includes("/chat/completions")) {
    lastRequest = {
      url,
      body: JSON.parse(String(init?.body ?? "{}")) as { messages?: { role: string; content: string }[] },
    };
    const payload = `data: ${JSON.stringify({ choices: [{ delta: { content: stubAnswer } }] })}\n\ndata: [DONE]\n\n`;
    return new Response(payload, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  }
  return originalFetch(input, init);
};

describe("Clew M6-D chat depth（问 Clew 深度）", async () => {
  const { buildClewChatSystemPrompt } = await import("@/lib/clew/chat-prompt");
  const { prisma } = await import("@/lib/prisma");
  const { sendClewKnowledgePointMessage } = await import("@/lib/clew/chat");

  it("prompt 缺省路径：无原子时与改造前金样逐字节一致（缺省锁定）", () => {
    const prompt = buildClewChatSystemPrompt(GOLDEN_CONTEXT);
    assert.equal(prompt, GOLDEN_PROMPT);
    const explicitScope = buildClewChatSystemPrompt({ ...GOLDEN_CONTEXT, scope: "lesson+source" });
    assert.equal(explicitScope, GOLDEN_PROMPT);
  });

  it("prompt 增强路径：证据原子段出现在原文片段之后、讲义之前，带仅作背景约束", () => {
    const prompt = buildClewChatSystemPrompt({
      ...GOLDEN_CONTEXT,
      evidenceAtoms: [{ page: 4, text: "样本应具有代表性。" }],
    });
    const atomIndex = prompt.indexOf("本章证据原子");
    const excerptIndex = prompt.indexOf("总体（population）是同质个体");
    const lessonIndex = prompt.indexOf("本知识点讲义（如已生成）：");
    assert.ok(atomIndex > excerptIndex, "原子段应在原文片段之后");
    assert.ok(atomIndex < lessonIndex, "原子段应在讲义之前");
    assert.match(prompt, /【第 4 页】样本应具有代表性。/);
    assert.match(prompt, /仅作背景帮助理解，不得直接引用为出处/);
  });

  it("种子：用户 + 教材树 + 讲义 + 证据原子绑定 + 到期复习条目", async () => {
    await prisma.user.create({
      data: { id: "u-chat", email: "chat-depth@test.dev", passwordHash: "x", displayName: "Chat" },
    });
    await prisma.clewTextbook.create({
      data: {
        id: "tb-chat",
        userId: "u-chat",
        title: " chat 教材",
        fileName: "book.pdf",
        storageKey: "clew/u-chat/tb-chat/book.pdf",
        sizeBytes: 1024,
        pageCount: 10,
        activeMonth: "2026-10",
      },
    });
    await prisma.clewChapter.create({
      data: { id: "ch-chat", textbookId: "tb-chat", order: 1, title: "第一章", pageStart: 1, pageEnd: 10, source: "outline" },
    });
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-chat",
        chapterId: "ch-chat",
        order: 1,
        title: "总体与样本",
        description: "总体是同质个体某指标值的集合。",
        keyTerms: ["总体", "样本"],
        prerequisites: [],
        sourcePage: 3,
      },
    });
    await prisma.clewLesson.create({
      data: {
        kpId: "kp-chat",
        contentMd: "## 定义\n总体是同质个体某指标值的集合。\n\n## 要点\n- 样本需随机。\n\n## 易错点\n- 混淆总体与样本。\n\n## 自测题\n1. 什么是总体？\n   参考答案：同质个体某指标值的集合。\n2. 什么是样本？\n   参考答案：随机抽取的一部分。\n3. 抽样注意什么？\n   参考答案：随机。\n",
        style: "zh-primary",
        generator: "model:dashscope:qwen3.7-plus",
        sourceExcerpt: EXCERPT,
      },
    });
    // 证据原子：page 4 与片段不同页（保留），page 3 与片段重复（去重）
    await prisma.clewEvidenceAtom.create({
      data: { id: "atom-chat-3", textbookId: "tb-chat", chapterId: "ch-chat", pageNumber: 3, text: "总体（population）是同质个体某指标值的集合" },
    });
    await prisma.clewEvidenceAtom.create({
      data: { id: "atom-chat-4", textbookId: "tb-chat", chapterId: "ch-chat", pageNumber: 4, text: "抽样误差是由抽样造成的样本统计量与总体参数之差。" },
    });
    await prisma.clewKnowledgePointEvidence.create({
      data: { kpId: "kp-chat", evidenceId: "atom-chat-3", isPrimary: true },
    });
    await prisma.clewKnowledgePointEvidence.create({
      data: { kpId: "kp-chat", evidenceId: "atom-chat-4", isPrimary: false },
    });
    // 到期复习条目（self-check-shaky，M5 数据）
    await prisma.clewReviewItem.create({
      data: {
        userId: "u-chat",
        kpId: "kp-chat",
        textbookId: "tb-chat",
        sourceKind: "self-check-shaky",
        stability: 0,
        difficulty: 0,
        lastReviewedAt: new Date(Date.now() - 86_400_000),
        dueAt: new Date(Date.now() - 3_600_000),
      },
    });
  });

  it("完整链路：原子注入 prompt（重复者去重）+ 定向提示 + 引用失配标注，回答照常保存", async () => {
    stubAnswer = "总体是集合，样本是子集（第 3 页）。另外，胰腺是内分泌腺（第 4 页）。";
    const result = await sendClewKnowledgePointMessage({
      userId: "u-chat",
      kpId: "kp-chat",
      message: "总体和样本怎么区分？",
      onDelta: () => {},
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;

    // prompt：原子段注入；与片段重复的 page-3 原子被去重（不出现其文本于原子段）
    assert.ok(lastRequest);
    const system = lastRequest.body.messages?.[0]?.content ?? "";
    assert.match(system, /本章证据原子/);
    assert.match(system, /【第 4 页】抽样误差是由抽样造成的/);
    const atomSection = system.slice(system.indexOf("本章证据原子"));
    assert.equal(atomSection.includes("atom-chat-3") || atomSection.split("总体（population）是同质个体").length > 2, false);

    // notes：定向提示 + 上下文加宽 + 引用失配标注（胰腺句与第 4 页文本无关）
    assert.ok(result.notes.some((note) => note.includes("你在自测中标记过本知识点")), "应有定向提示");
    assert.ok(result.notes.some((note) => note.includes("上下文加宽：纳入 1 条证据原子")), "重复原子应去重为 1 条");
    const citationNote = result.notes.find((note) => note.includes("页码引用与原文不完全一致"));
    assert.ok(citationNote, "编造的胰腺引用应被标注");
    assert.match(citationNote ?? "", /第 4 页/);

    // 回答照常落库（不改写、不阻断）
    assert.match(result.conversation.messages.at(-1)?.content ?? "", /胰腺是内分泌腺/);
  });

  it("无绑定 KP：无原子段、无定向提示、干净回答无引用标注（引用自检真实执行且不误报）", async () => {
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-plain",
        chapterId: "ch-chat",
        order: 2,
        title: "抽样误差",
        description: "由抽样造成的差。",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 4,
      },
    });
    // 有讲义（有原文片段）→ 引用自检会真实执行；无原子绑定、无复习条目
    await prisma.clewLesson.create({
      data: {
        kpId: "kp-plain",
        contentMd: "## 定义\n由抽样造成的差。\n\n## 要点\n- 样本需随机。\n\n## 易错点\n- 混淆。\n\n## 自测题\n1. 什么是抽样误差？\n   参考答案：由抽样造成的差。\n2. 如何减小？\n   参考答案：增大样本。\n3. 与什么有关？\n   参考答案：样本量。\n",
        style: "zh-primary",
        generator: "heuristic",
        sourceExcerpt: EXCERPT,
      },
    });
    stubAnswer = "样本（sample）是从总体中随机抽取的一部分个体（第 3 页），抽样误差因此难以避免。";
    const result = await sendClewKnowledgePointMessage({
      userId: "u-chat",
      kpId: "kp-plain",
      message: "什么是抽样误差？",
      onDelta: () => {},
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    const system = lastRequest?.body.messages?.[0]?.content ?? "";
    assert.equal(system.includes("本章证据原子"), false);
    assert.equal(result.notes.some((note) => note.includes("你在自测中标记过")), false);
    // 干净句（关键词可回源第 3 页）不标注——引用自检已运行（片段存在）且 0 失配
    assert.equal(result.notes.some((note) => note.includes("页码引用与原文不完全一致")), false);
    assert.ok(result.notes.some((note) => note.includes("上下文：讲义 +")), "引用自检前提：片段已注入");
  });
});
