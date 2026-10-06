/**
 * ZCODE-M6-0 质量探针（任务书 docs/ZCODE-M6-clew-practice.md §五 M6-0）。
 * 模型 × 思考强度矩阵：同一 KP / 同一 prompt / 同一评分口径，比较出题的事实正确率、
 * 页码引用与题干质量，并记录延迟与 token 成本。产出 JSON 供人工逐题评分。
 *
 * 用法：node scripts/m6-probe-question-quality.mjs <config>
 *   config = qwen-standard | qwen-thinking | ds-standard | ds-thinking
 * 前置：.env.local 提供 DASHSCOPE_API_KEY（qwen 腿）或 DEEPSEEK_API_KEY（ds 腿）。
 * 评分：脚本只做机械检查（JSON 可解析 / 六件套齐 / sourcePage 在原文页集内）；
 *   事实正确率由人工对照原文逐题判定（design-qa 证据节记录）。
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";

const CONFIGS = {
  "qwen-standard": { provider: "dashscope", model: "qwen3.7-plus", thinking: false },
  "qwen-thinking": { provider: "dashscope", model: "qwen3.7-plus", thinking: true, thinkingBudget: 8192 },
  "ds-standard": { provider: "deepseek", model: "deepseek-flash", thinking: false },
  "ds-thinking": { provider: "deepseek", model: "deepseek-flash", thinking: true },
};

const configName = process.argv[2];
const config = CONFIGS[configName];
if (!config) {
  console.error("用法：node scripts/m6-probe-question-quality.mjs <qwen-standard|qwen-thinking|ds-standard|ds-thinking> [kpId]");
  process.exit(1);
}
const KP_ID = process.argv[3] || "v4qa-kp-01";

// ---- 读 .env.local ----
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    }),
);

// ---- 读 KP + 讲义原文片段（dev.db）----
const dbPath = env.DATABASE_URL?.replace(/^file:/, "");
if (!dbPath) {
  console.error("DATABASE_URL 缺失");
  process.exit(1);
}
const db = new DatabaseSync(dbPath);
const kp = db
  .prepare(
    `SELECT kp.id, kp.title, kp.description, kp.keyTerms, kp.sourcePage, ch.[order] AS chapterOrder
     FROM HiDocKnowledgePoint kp JOIN HiDocChapter ch ON kp.chapterId = ch.id WHERE kp.id = ?`,
  )
  .get(KP_ID);
const lesson = db.prepare(`SELECT sourceExcerpt FROM HiDocLesson WHERE kpId = ?`).get(KP_ID);
if (!kp || !lesson) {
  console.error("KP 或讲义不存在");
  process.exit(1);
}
const excerpt = lesson.sourceExcerpt;
const excerptPages = [...excerpt.matchAll(/【PDF 第 (\d+) 页】/g)].map((m) => Number(m[1]));

// ---- Prompt（对齐 M6-A 计划的结构化契约）----
const system = `你是严格的医学教育出题助手。只依据给定的教材原文片段出题，禁止使用片段之外的知识补充事实。
每道题必须标注其依据的页码（sourcePage，取自原文片段中的【PDF 第 N 页】标记）。
输出严格 JSON，不要输出任何其他文字。`;
const user = `知识点：${kp.title}
知识点说明：${kp.description}
关键术语：${JSON.parse(kp.keyTerms).join("、")}

教材原文片段（出题唯一依据）：
${excerpt}

请出一组练习题：4 道 A1 单选（每题 4 个选项，恰好 1 个正确）+ 2 道填空题。
输出 JSON：
{"questions":[{"kind":"a1","stem":"题干","choices":["A","B","C","D"],"answerIndex":0,"explanation":"解析（须引用原文依据）","sourcePage":1},{"kind":"fill","stem":"题干","answerText":"参考答案","explanation":"解析（须引用原文依据）","sourcePage":1}]}
要求：题干清晰无歧义；干扰项合理但明确错误；答案必须能从原文片段直接推出；填空答案必须是原文中的确定表述。`;

// ---- 调用 ----
const key = config.provider === "dashscope" ? env.DASHSCOPE_API_KEY : env.DEEPSEEK_API_KEY;
if (!key) {
  console.error(`${config.provider} 缺少 API key（.env.local）`);
  process.exit(1);
}
const base =
  config.provider === "dashscope"
    ? env.DASHSCOPE_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1"
    : "https://api.deepseek.com/v1";

const body = {
  model: config.model,
  messages: [
    { role: "system", content: system },
    { role: "user", content: user },
  ],
  temperature: 0.3,
  response_format: { type: "json_object" },
};
if (config.provider === "dashscope") {
  // Qwen3 混合思考：enable_thinking 按请求开关（非流式默认关，显式声明）
  body.enable_thinking = config.thinking;
  if (config.thinking) body.thinking_budget = config.thinkingBudget;
} else if (config.thinking) {
  // DeepSeek 思考档：deepseek-flash（V4.1 Flash）的思考控制参数；探针如实记录 API 是否接受
  body.enable_thinking = true;
  body.thinking_budget = 8192;
}

const started = Date.now();
const response = await fetch(`${base}/chat/completions`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
  body: JSON.stringify(body),
});
const elapsedMs = Date.now() - started;
const payload = await response.json().catch(() => null);
if (!response.ok || !payload) {
  console.error(`API 失败 ${response.status}:`, JSON.stringify(payload)?.slice(0, 500));
  process.exit(1);
}

const content = payload.choices?.[0]?.message?.content ?? "";
let questions = null;
let parseError = null;
try {
  const parsed = JSON.parse(content);
  questions = parsed.questions ?? null;
} catch (error) {
  parseError = String(error);
}

// ---- 机械检查 ----
const REQUIRED = ["kind", "stem", "explanation", "sourcePage"];
const mechanical = {
  parseOk: questions !== null,
  parseError,
  questionCount: questions?.length ?? 0,
  a1Count: questions?.filter((q) => q.kind === "a1").length ?? 0,
  fillCount: questions?.filter((q) => q.kind === "fill").length ?? 0,
  missingFields: questions?.flatMap((q, i) => {
    const missing = REQUIRED.filter((f) => q[f] === undefined || q[f] === null || q[f] === "");
    if (q.kind === "a1" && (!Array.isArray(q.choices) || q.choices.length !== 4 || typeof q.answerIndex !== "number")) {
      missing.push("choices/answerIndex");
    }
    if (q.kind === "fill" && typeof q.answerText !== "string") {
      missing.push("answerText");
    }
    return missing.length > 0 ? [`#${i + 1}: ${missing.join(",")}`] : [];
  }) ?? [],
  pageCitationsInRange: questions?.every((q) => excerptPages.includes(Number(q.sourcePage))) ?? false,
  citedPages: [...new Set(questions?.map((q) => Number(q.sourcePage)) ?? [])],
  excerptPages,
};

// ---- 落盘 ----
const outDir = new URL("../docs/design-references/m6-probe/", import.meta.url);
mkdirSync(outDir, { recursive: true });
const result = {
  config: configName,
  provider: config.provider,
  model: config.model,
  thinking: config.thinking,
  elapsedMs,
  usage: payload.usage ?? null,
  kpId: KP_ID,
  kpTitle: kp.title,
  excerptChars: excerpt.length,
  mechanical,
  questions,
  rawContent: content,
};
const outFile = new URL(`${configName}.${KP_ID}.json`, outDir);
writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log(`written: ${outFile.pathname}`);
console.log(
  `elapsed=${(elapsedMs / 1000).toFixed(1)}s tokens=${JSON.stringify(payload.usage)} mechanical=${JSON.stringify({
    count: mechanical.questionCount,
    a1: mechanical.a1Count,
    fill: mechanical.fillCount,
    missing: mechanical.missingFields,
    pagesInRange: mechanical.pageCitationsInRange,
  })}`,
);
