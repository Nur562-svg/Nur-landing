import type { HiDocLessonGenerator, HiDocLessonStyle } from "@/types/hidoc";

/**
 * Hi doc 讲义规则层（纯函数，可测试）：风格/生成方式解析、结构校验、无模型时的启发式讲义。
 * 启发式只重排「萃取结果 + 教材原文片段」，不补充教材外知识，并明确标注「未接入模型」。
 */

export const HIDOC_LESSON_STYLES: readonly HiDocLessonStyle[] = ["zh-primary"];

export const HIDOC_LESSON_STYLE_LABELS: Record<HiDocLessonStyle, string> = {
  "zh-primary": "中文为主 · 术语首次标注原文",
};

/** 未知/缺省风格一律回落 zh-primary（不猜测用户偏好）。 */
export function resolveHiDocLessonStyle(value: unknown): HiDocLessonStyle {
  return typeof value === "string" && (HIDOC_LESSON_STYLES as readonly string[]).includes(value)
    ? (value as HiDocLessonStyle)
    : "zh-primary";
}

/** 生成方式入库格式："model:{provider}:{model}" | "heuristic"。 */
export function formatHiDocLessonGenerator(generator: HiDocLessonGenerator): string {
  return generator.kind === "model"
    ? `model:${generator.provider}:${generator.model}`
    : "heuristic";
}

export function parseHiDocLessonGenerator(value: unknown): HiDocLessonGenerator {
  if (typeof value !== "string") {
    return { kind: "heuristic" };
  }
  const [kind, provider, ...rest] = value.split(":");
  if (kind === "model" && provider && rest.length > 0) {
    return { kind: "model", provider, model: rest.join(":") };
  }
  return { kind: "heuristic" };
}

export function describeHiDocLessonGenerator(generator: HiDocLessonGenerator): string {
  return generator.kind === "model"
    ? `模型生成（${generator.provider} · ${generator.model}）`
    : "启发式整理 · 未接入模型";
}

export const HIDOC_LESSON_SECTIONS = ["定义", "要点", "易错点", "自测题"] as const;

export type HiDocLessonSection = (typeof HIDOC_LESSON_SECTIONS)[number];

/** 讲义自测题数量（验收要求 3 道）。 */
export const HIDOC_LESSON_SELF_TEST_COUNT = 3;

export type HiDocLessonStructure = {
  present: HiDocLessonSection[];
  missing: HiDocLessonSection[];
  selfTestCount: number;
};

function stripHeadingDecoration(line: string): string {
  return line
    .trim()
    .replace(/^#{1,6}\s*/, "")
    .replace(/\*\*/g, "")
    .trim();
}

/** 小节标题判定：标题行或短行（≤24 字）精确等于小节名（容忍 `定义：` 之类的冒号）。 */
function isSectionHeading(line: string, title: HiDocLessonSection): boolean {
  const stripped = stripHeadingDecoration(line).replace(/[:：]\s*$/, "").trim();
  if (stripped === title) {
    return true;
  }
  return stripped.length <= 24 && (
    stripped.startsWith(`${title}（`)
    || stripped.startsWith(`${title}(`)
    || stripped.startsWith(`${title}：`)
    || stripped.startsWith(`${title}:`)
  );
}

function countSelfTestQuestions(body: string): number {
  return body
    .split("\n")
    .filter((line) => /^\s*(\*\*)?\d{1,2}\s*[.、)）]/.test(line))
    .length;
}

/** 解析讲义小节结构与自测题数量（模型输出与启发式讲义共用同一判定）。 */
export function inspectLessonMarkdown(markdown: string): HiDocLessonStructure {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sectionBodies = new Map<HiDocLessonSection, string[]>();
  let current: HiDocLessonSection | null = null;

  for (const line of lines) {
    const matched = HIDOC_LESSON_SECTIONS.find((title) => isSectionHeading(line, title));
    if (matched) {
      current = matched;
      if (!sectionBodies.has(matched)) {
        sectionBodies.set(matched, []);
      }
      continue;
    }
    if (current) {
      sectionBodies.get(current)?.push(line);
    }
  }

  const present = HIDOC_LESSON_SECTIONS.filter((title) => sectionBodies.has(title));
  const missing = HIDOC_LESSON_SECTIONS.filter((title) => !sectionBodies.has(title));
  const selfTestBody = (sectionBodies.get("自测题") ?? []).join("\n");
  return { present: [...present], missing: [...missing], selfTestCount: countSelfTestQuestions(selfTestBody) };
}

export type HiDocLessonValidation = {
  ok: boolean;
  structure: HiDocLessonStructure;
  reason: string | null;
};

/**
 * 模型讲义结构校验：定义与要点必须存在，自测题不少于 3 道；不合格即如实报错，不静默兜底。
 */
export function validateGeneratedLesson(markdown: string): HiDocLessonValidation {
  const structure = inspectLessonMarkdown(markdown);
  if (structure.missing.includes("定义")) {
    return { ok: false, structure, reason: "缺少「定义」小节" };
  }
  if (structure.missing.includes("要点")) {
    return { ok: false, structure, reason: "缺少「要点」小节" };
  }
  if (structure.selfTestCount < HIDOC_LESSON_SELF_TEST_COUNT) {
    return {
      ok: false,
      structure,
      reason: `自测题只有 ${structure.selfTestCount} 道（要求 ${HIDOC_LESSON_SELF_TEST_COUNT} 道）`,
    };
  }
  return { ok: true, structure, reason: null };
}

/** 去掉模型常见的代码围栏包装并统一换行。 */
export function normalizeLessonMarkdown(raw: string): string {
  let text = raw.replace(/\r\n/g, "\n").trim();
  const fence = text.match(/^```[a-zA-Z]*\n([\s\S]*?)\n?```$/);
  if (fence) {
    text = fence[1].trim();
  }
  return text;
}

export type HiDocLessonHeaderInput = {
  title: string;
  generator: HiDocLessonGenerator;
  style: HiDocLessonStyle;
  generatedAtLabel: string;
  textbookTitle: string;
  chapterTitle: string;
  sourcePage: number;
  /** 生成方式声明（未接入模型 / AI 生成内容）。 */
  notice: string;
};

/** 讲义固定页首（模型与启发式共用，保证生成方式与页码可溯源）。 */
export function buildLessonHeader(input: HiDocLessonHeaderInput): string {
  return [
    `# ${input.title}`,
    "",
    `> 生成方式：${describeHiDocLessonGenerator(input.generator)}`,
    `> 风格：${HIDOC_LESSON_STYLE_LABELS[input.style]} · 生成时间：${input.generatedAtLabel}`,
    `> 教材：《${input.textbookTitle}》· ${input.chapterTitle} · 依据第 ${input.sourcePage} 页`,
    `> ${input.notice}`,
    "",
  ].join("\n");
}

export const HIDOC_HEURISTIC_LESSON_NOTICE =
  "本页未调用模型：内容由萃取结果与教材原文片段确定性地重排，请对照教材原文核对。";

export const HIDOC_MODEL_LESSON_NOTICE =
  "AI 生成内容，请对照教材原文核对；不是教师讲义或标准答案。";

export type HiDocHeuristicLessonInput = {
  knowledgePoint: {
    title: string;
    description: string;
    keyTerms: readonly string[];
    prerequisites: readonly string[];
    sourcePage: number;
  };
  textbookTitle: string;
  chapterTitle: string;
  /** 教材原文片段（带【PDF 第 X 页】标记）；未读到则为 null。 */
  sourceExcerpt: string | null;
  style: HiDocLessonStyle;
  /** 由调用方格式化好的时间标签（纯函数不做时区假设）。 */
  generatedAtLabel: string;
};

const PAGE_MARKER = /^【PDF 第 \d+ 页】$/;
const MAX_EXCERPT_LINES = 3;
const MAX_EXCERPT_LINE_CHARS = 160;

/** 从原文片段中挑出与知识点直接相关的真实句子（不相关就如实说明，不编造）。 */
export function selectExcerptLines(
  sourceExcerpt: string | null,
  knowledgePoint: { title: string; keyTerms: readonly string[] },
): string[] {
  if (!sourceExcerpt) {
    return [];
  }
  const keywords = [knowledgePoint.title, ...knowledgePoint.keyTerms]
    .map((item) => item.trim())
    .filter((item) => item.length >= 2);
  if (keywords.length === 0) {
    return [];
  }
  const lines: string[] = [];
  for (const rawLine of sourceExcerpt.split("\n")) {
    const line = rawLine.trim();
    if (!line || PAGE_MARKER.test(line)) {
      continue;
    }
    if (!keywords.some((keyword) => line.includes(keyword))) {
      continue;
    }
    lines.push(line.length > MAX_EXCERPT_LINE_CHARS ? `${line.slice(0, MAX_EXCERPT_LINE_CHARS)}…` : line);
    if (lines.length >= MAX_EXCERPT_LINES) {
      break;
    }
  }
  return lines;
}

/**
 * 未接入模型时的启发式讲义：结构满足定义/要点/易错点/自测题 3 道，
 * 内容只来自萃取结果与教材原文片段，并在页首明示「未接入模型」。
 */
export function buildHeuristicLesson(input: HiDocHeuristicLessonInput): string {
  const { knowledgePoint, textbookTitle, chapterTitle, sourceExcerpt, style, generatedAtLabel } = input;
  const excerptLines = selectExcerptLines(sourceExcerpt, knowledgePoint);
  const keyTerms = knowledgePoint.keyTerms.filter((term) => term.trim().length > 0);
  const prerequisites = knowledgePoint.prerequisites.filter((item) => item.trim().length > 0);

  const excerptSection = excerptLines.length > 0
    ? excerptLines.map((line) => `  - ${line}`).join("\n")
    : `  - 未在该页原文中检索到与标题直接匹配的句子，请自行对照教材第 ${knowledgePoint.sourcePage} 页。`;

  const parts: string[] = [
    buildLessonHeader({
      title: knowledgePoint.title,
      generator: { kind: "heuristic" },
      style,
      generatedAtLabel,
      textbookTitle,
      chapterTitle,
      sourcePage: knowledgePoint.sourcePage,
      notice: HIDOC_HEURISTIC_LESSON_NOTICE,
    }),
    "## 定义",
    knowledgePoint.description,
    "",
    "## 要点",
    keyTerms.length > 0 ? `- 关键术语：${keyTerms.join("、")}` : "- 关键术语：教材萃取结果未标注关键术语。",
    `- 原文摘录（第 ${knowledgePoint.sourcePage} 页附近）：`,
    excerptSection,
    prerequisites.length > 0
      ? `- 先修知识点：${prerequisites.join("、")}`
      : "- 先修知识点：同章萃取结果未标注先修关系。",
    "",
    "## 易错点",
    "未接入模型，无法生成易错点分析；以下为需人工核对的检查项：",
    `- 定义表述、适用条件与边界请以教材第 ${knowledgePoint.sourcePage} 页原文为准。`,
    keyTerms.length > 1
      ? `- 关键术语（${keyTerms.join("、")}）易混淆，请核对各自在原文中的用法。`
      : "- 术语用法请核对原文，不要仅凭记忆使用。",
    "",
    "## 自测题",
    `1. 用自己的话写出「${knowledgePoint.title}」的定义。`,
    `   参考答案：${knowledgePoint.description}`,
    ...(keyTerms.length > 0
      ? [
          "2. 列出本知识点的关键术语，并说明它们的含义。",
          `   参考答案：${keyTerms.join("、")}`,
        ]
      : [
          "2. 从教材第 " + knowledgePoint.sourcePage + " 页原文中找出 1 个与本题相关的要点并复述。",
          `   参考答案（原文摘录，需自行核对）：${excerptLines[0] ?? "该页原文未检索到匹配句子。"}`,
        ]),
    ...(prerequisites.length > 0
      ? [
          "3. 本知识点与哪些先修知识点相关？先说明它们的联系。",
          `   参考答案：需先掌握 ${prerequisites.join("、")}。`,
        ]
      : [
          "3. 说明本知识点在本章中的位置（它承接什么、又为哪些内容做准备）。",
          "   参考答案：同章萃取结果未标注先修关系，请对照目录与教材原文自行梳理。",
        ]),
  ];

  return parts.join("\n");
}