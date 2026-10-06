/**
 * ZCODE-M6-D 质量对照采样器（任务书 docs/ZCODE-M6-clew-practice.md §七 D-0/D-5）。
 *
 * 直接驱动真实服务编排层（lesson.ts / note.ts / chat.ts）+ 真实模型 + dev.db，
 * monkey-patch globalThis.fetch 捕获每次模型请求的 prompt 全文（零复制漂移），
 * 并尝试从流式响应中捕获 usage（有则记录，无则如实为 null）。
 *
 * 用法：
 *   node --require ./tests/helpers/css-cjs-stub.cjs --import tsx \
 *     scripts/m6d-quality-sample.ts <baseline|post>
 *
 * 产物：docs/design-references/m6-probe/quality-<phase>/
 *   lesson.<kpId>.json   讲义：prompt 全文、输出全文、延迟、notes
 *   chat.<kpId>.json     问答：固定 3 问的 prompt、回答、notes、延迟
 *   note.<textbookId>.c<order>.json  章级学霸笔记
 *   _summary.json        运行元信息 + EventLog 计数
 *
 * 会话隔离：采样前备份样本 KP 的 ClewConversation 行，采样后恢复——dev.db 无对话残留。
 * 样本集（D-0 冻结，任务书 §七 D-0.1）：v4qa-kp-01/02（习题+答案富页）
 *   + m2qa 教材（ZCODE-M2 E2E 验证教材）3 个定义型 KP（四诊合参原则先采样——它是
 *   「望闻问切互相印证」的先修且 D-0 时无讲义，由本脚本按当时代码生成补位，如实记录）。
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const phase = process.argv[2];
if (phase !== "baseline" && phase !== "post") {
  console.error("用法：node --require ./tests/helpers/css-cjs-stub.cjs --import tsx scripts/m6d-quality-sample.ts <baseline|post>");
  process.exit(1);
}

// ---- 先加载 .env.local，再动态 import 应用模块（prisma 在 import 时读 DATABASE_URL）----
const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
for (const line of envText.split("\n")) {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.startsWith("#") || !trimmed.includes("=")) {
    continue;
  }
  const eq = trimmed.indexOf("=");
  const key = trimmed.slice(0, eq).trim();
  const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  if (process.env[key] === undefined) {
    process.env[key] = value;
  }
}

const SAMPLE_OWNER_V4QA = "cmutq4tow00018jpx0tp2oisp";
const SAMPLE_OWNER_M2QA = "cmupqjw380000g8pxqn6wxo6k";
const TEXTBOOK_V4QA = "v4qa-textbook-1";
const TEXTBOOK_M2QA = "f650452b-eadd-4504-8102-a98da36f728b";

/** D-0 冻结的讲义/问答样本 KP（顺序即采样顺序：先修在前）。 */
const LESSON_SAMPLES: { kpId: string; owner: string; label: string }[] = [
  { kpId: "v4qa-kp-01", owner: SAMPLE_OWNER_V4QA, label: "离散型定量变量（习题富页）" },
  { kpId: "v4qa-kp-02", owner: SAMPLE_OWNER_V4QA, label: "个体变异（习题富页）" },
  { kpId: "cmuprmns8000m5epxbr12r1gq", owner: SAMPLE_OWNER_M2QA, label: "四诊合参原则（定义型，先修源）" },
  { kpId: "cmuprmns7000l5epxg7dmdx95", owner: SAMPLE_OWNER_M2QA, label: "中医诊断学的基本任务（定义型）" },
  { kpId: "cmuprmns8000n5epx1br2dnro", owner: SAMPLE_OWNER_M2QA, label: "望闻问切互相印证（定义型，有先修）" },
];

/** D-0 冻结的章级笔记样本。 */
const NOTE_SAMPLES: { userId: string; textbookId: string; chapterOrder: number; label: string }[] = [
  { userId: SAMPLE_OWNER_V4QA, textbookId: TEXTBOOK_V4QA, chapterOrder: 1, label: "v4qa 第一章" },
  { userId: SAMPLE_OWNER_M2QA, textbookId: TEXTBOOK_M2QA, chapterOrder: 1, label: "m2qa 第一章" },
];

/** D-0 冻结的固定问题集（每 KP 3 问，前后两轮同题）。 */
const CHAT_QUESTIONS: Record<string, string[]> = {
  "v4qa-kp-01": [
    "离散型定量变量和连续型定量变量怎么区分？",
    "为什么说家庭中子女数是离散型定量变量？",
    "用这个概念说说「个体变异」是什么意思？",
  ],
  "v4qa-kp-02": [
    "个体变异指的是什么？",
    "个体变异和同质之间是什么关系？",
    "为什么研究个体变异对统计学重要？",
  ],
  "cmuprmns8000m5epxbr12r1gq": [
    "四诊合参为什么不能只靠一种诊法？",
    "四诊合参和望闻问切互相印证是什么关系？",
    "违背四诊合参会带来什么问题？",
  ],
  "cmuprmns7000l5epxg7dmdx95": [
    "中医诊断学的基本任务有哪些？",
    "这些任务之间是什么关系？",
    "为什么说基本任务是学习中医诊断学的起点？",
  ],
  "cmuprmns8000n5epx1br2dnro": [
    "望闻问切为什么要互相印证？",
    "能不能只凭切脉就下诊断？",
    "互相印证和四诊合参是什么关系？",
  ],
};

// ---- fetch 捕获层（在动态 import 应用模块之前装好）----
type CapturedCall = {
  url: string;
  model: string | null;
  messages: unknown;
  latencyMs: number;
  usage: unknown;
};
const captured: CapturedCall[] = [];
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  const started = Date.now();
  const response = await originalFetch(input, init);
  if (!url.includes("/chat/completions")) {
    return response;
  }
  let model: string | null = null;
  let messages: unknown = null;
  try {
    const body = JSON.parse(String(init?.body ?? "{}")) as { model?: unknown; messages?: unknown };
    model = typeof body.model === "string" ? body.model : null;
    messages = body.messages ?? null;
  } catch {
    // 请求体解析失败如实留空
  }
  const call: CapturedCall = { url, model, messages, latencyMs: Date.now() - started, usage: null };
  captured.push(call);
  // 克隆一份在后台读完，抽 final chunk 的 usage（不影响业务流式消费）
  void response
    .clone()
    .text()
    .then((text) => {
      for (const line of text.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) {
          continue;
        }
        try {
          const payload = JSON.parse(trimmed.slice(5).trim()) as { usage?: unknown };
          if (payload.usage) {
            call.usage = payload.usage;
          }
        } catch {
          // 非 JSON 行忽略
        }
      }
    })
    .catch(() => {
      // usage 捕获失败不影响主流程
    });
  return response;
};

// ---- 主流程（async fn：脚本走 CJS 轨道，不支持顶层 await）----
async function main(): Promise<void> {
  // 动态 import 应用模块（env 已就位）
  const { prisma } = await import("@/lib/prisma");
  const { generateClewKnowledgePointLesson, loadClewLesson } = await import("@/lib/clew/lesson");
  const { generateClewChapterNote } = await import("@/lib/clew/note");
  const { sendClewKnowledgePointMessage } = await import("@/lib/clew/chat");

  const outDir = new URL(`../docs/design-references/m6-probe/quality-${phase}/`, import.meta.url);
  mkdirSync(outDir, { recursive: true });
  const outPath = (name: string): string =>
    path.join(new URL(`../docs/design-references/m6-probe/quality-${phase}/`, import.meta.url).pathname, name);

  const noop = (): void => {};

  const drainCapturedCalls = (): CapturedCall[] => captured.splice(0, captured.length);

  /** EventLog 计数（SQLite 不支持 JSON path 过滤，按事件名计数；差值即本次采样产生量）。 */
  const countEvents = async (): Promise<{ lesson: number; chat: number; note: number }> => {
    const [lesson, chat, note] = await Promise.all([
      prisma.eventLog.count({ where: { event: "clew_kp_lesson" } }),
      prisma.eventLog.count({ where: { event: "clew_kp_chat" } }),
      prisma.eventLog.count({ where: { event: "clew_chapter_note" } }),
    ]);
    return { lesson, chat, note };
  };

  const summary: Record<string, unknown> = {
    phase,
    startedAt: new Date().toISOString(),
    samples: LESSON_SAMPLES.map((sample) => sample.kpId),
    eventsBefore: await countEvents(),
    lessonRuns: [] as unknown[],
    chatRuns: [] as unknown[],
    noteRuns: [] as unknown[],
  };

  // ---- 会话隔离：备份样本 KP 的既有对话，采样后恢复 ----
  const sampleKpIds = LESSON_SAMPLES.map((sample) => sample.kpId);
  const existingConversations = await prisma.clewConversation.findMany({ where: { kpId: { in: sampleKpIds } } });
  await prisma.clewConversation.deleteMany({ where: { kpId: { in: sampleKpIds } } });
  console.log(`会话隔离：备份并清空 ${existingConversations.length} 条样本 KP 对话（采样后恢复）。`);

  try {
    for (const sample of LESSON_SAMPLES) {
      console.log(`\n===== 讲义采样 ${sample.kpId}（${sample.label}）=====`);
      const lessonStarted = Date.now();
      const lessonResult = await generateClewKnowledgePointLesson({
        userId: sample.owner,
        kpId: sample.kpId,
        onProgress: noop,
        onDelta: noop,
      });
      const lessonLatency = Date.now() - lessonStarted;
      if (!lessonResult.ok) {
        console.error(`讲义生成失败：${lessonResult.message}`);
        (summary.lessonRuns as unknown[]).push({ kpId: sample.kpId, ok: false, error: lessonResult.message });
        writeFileSync(
          outPath(`lesson.${sample.kpId}.json`),
          JSON.stringify({ phase, kpId: sample.kpId, ok: false, error: lessonResult.message }, null, 2),
        );
      } else {
        const stored = await loadClewLesson(sample.kpId);
        const calls = drainCapturedCalls();
        writeFileSync(
          outPath(`lesson.${sample.kpId}.json`),
          JSON.stringify(
            {
              phase,
              kpId: sample.kpId,
              kpTitle: sample.label,
              ok: true,
              latencyMs: lessonLatency,
              modelCalls: calls,
              notes: lessonResult.notes,
              contentMd: stored?.view.contentMd ?? null,
            },
            null,
            2,
          ),
        );
        console.log(`讲义完成：${lessonLatency}ms，模型调用 ${calls.length} 次，notes=${lessonResult.notes.length}`);
        (summary.lessonRuns as unknown[]).push({ kpId: sample.kpId, ok: true, latencyMs: lessonLatency, calls: calls.length });
      }

      console.log(`----- 问答采样 ${sample.kpId}（固定 3 问）-----`);
      const rounds: unknown[] = [];
      for (const question of CHAT_QUESTIONS[sample.kpId] ?? []) {
        const chatStarted = Date.now();
        const chatResult = await sendClewKnowledgePointMessage({
          userId: sample.owner,
          kpId: sample.kpId,
          message: question,
          onDelta: noop,
        });
        const chatLatency = Date.now() - chatStarted;
        if (!chatResult.ok) {
          console.error(`问答失败：「${question}」 ${chatResult.message}`);
          rounds.push({ question, ok: false, error: chatResult.message });
          continue;
        }
        const answer = [...chatResult.conversation.messages].reverse().find((m) => m.role === "assistant");
        const calls = drainCapturedCalls();
        rounds.push({
          question,
          ok: true,
          latencyMs: chatLatency,
          modelCalls: calls,
          notes: chatResult.notes,
          answer: answer?.content ?? null,
        });
        console.log(`问答完成：${chatLatency}ms，回答 ${answer?.content.length ?? 0} 字`);
      }
      writeFileSync(outPath(`chat.${sample.kpId}.json`), JSON.stringify({ phase, kpId: sample.kpId, rounds }, null, 2));
      (summary.chatRuns as unknown[]).push({ kpId: sample.kpId, rounds: rounds.length });
    }

    for (const sample of NOTE_SAMPLES) {
      console.log(`\n===== 笔记采样 ${sample.label} =====`);
      const noteStarted = Date.now();
      const noteResult = await generateClewChapterNote({
        userId: sample.userId,
        textbookId: sample.textbookId,
        chapterOrder: sample.chapterOrder,
        onProgress: noop,
        onDelta: noop,
      });
      const noteLatency = Date.now() - noteStarted;
      if (!noteResult.ok) {
        console.error(`笔记生成失败：${noteResult.message}`);
        (summary.noteRuns as unknown[]).push({ label: sample.label, ok: false, error: noteResult.message });
        continue;
      }
      const calls = drainCapturedCalls();
      writeFileSync(
        outPath(`note.${sample.textbookId}.c${sample.chapterOrder}.json`),
        JSON.stringify(
          {
            phase,
            label: sample.label,
            ok: true,
            latencyMs: noteLatency,
            modelCalls: calls,
            notes: noteResult.notes,
            contentMd: noteResult.note.contentMd,
          },
          null,
          2,
        ),
      );
      console.log(`笔记完成：${noteLatency}ms，模型调用 ${calls.length} 次`);
      (summary.noteRuns as unknown[]).push({ label: sample.label, ok: true, latencyMs: noteLatency, calls: calls.length });
    }
  } finally {
    // 恢复采样前的对话（删掉本次产生的，重建原有行）
    await prisma.clewConversation.deleteMany({ where: { kpId: { in: sampleKpIds } } });
    if (existingConversations.length > 0) {
      await prisma.clewConversation.createMany({
        data: existingConversations.map((row) => ({
          id: row.id,
          userId: row.userId,
          kpId: row.kpId,
          workshopId: row.workshopId,
          messages: row.messages === null ? {} : row.messages,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })),
      });
    }
    console.log(`\n会话恢复：还原 ${existingConversations.length} 条既有对话，本次采样对话已清除。`);
  }

  summary.finishedAt = new Date().toISOString();
  summary.eventsAfter = await countEvents();
  writeFileSync(outPath("_summary.json"), JSON.stringify(summary, null, 2));
  console.log(`\n采样完成：${outDir.pathname}`);
}

void main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
