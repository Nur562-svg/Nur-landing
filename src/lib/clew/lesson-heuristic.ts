import type { ClewLessonGenerator, ClewLessonStyle } from "@/types/clew";
import { formatClewSourcePage, isClewDocx } from "./source-label";

/**
 * Clew 讲义规则层（纯函数，可测试）：风格/生成方式解析、结构校验、无模型时的启发式讲义。
 * 启发式只重排「萃取结果 + 教材原文片段」，不补充教材外知识，并明确标注「未接入模型」。
 */

export const CLEW_LESSON_STYLES: readonly ClewLessonStyle[] = [
  "zh-primary",
  "exam-cram",
  "socratic",
  "en-primary",
];

export const CLEW_LESSON_STYLE_LABELS: Record<ClewLessonStyle, string> = {
  "zh-primary": "中文为主 · 术语首次标注原文",
  "exam-cram": "考点速记 · 冲刺记忆",
  socratic: "引导追问 · 问题链",
  "en-primary": "英文为主 · 术语中英对照",
};

/** composer chip 排用的风格短标签（完整标签见 CLEW_LESSON_STYLE_LABELS）。 */
export const CLEW_LESSON_STYLE_SHORT_LABELS: Record<ClewLessonStyle, string> = {
  "zh-primary": "中文为主",
  "exam-cram": "考点速记",
  socratic: "引导追问",
  "en-primary": "英文为主",
};

/** 校验任意输入是否为已注册的讲解风格（生成请求的参数校验用）。 */
export function isClewLessonStyle(value: unknown): value is ClewLessonStyle {
  return typeof value === "string" && (CLEW_LESSON_STYLES as readonly string[]).includes(value);
}

/** 未知/缺省风格一律回落 zh-primary（不猜测用户偏好）。 */
export function resolveClewLessonStyle(value: unknown): ClewLessonStyle {
  return isClewLessonStyle(value) ? value : "zh-primary";
}

/** 生成方式入库格式："model:{provider}:{model}" | "heuristic"。 */
export function formatClewLessonGenerator(generator: ClewLessonGenerator): string {
  return generator.kind === "model"
    ? `model:${generator.provider}:${generator.model}`
    : "heuristic";
}

export function parseClewLessonGenerator(value: unknown): ClewLessonGenerator {
  if (typeof value !== "string") {
    return { kind: "heuristic" };
  }
  const [kind, provider, ...rest] = value.split(":");
  if (kind === "model" && provider && rest.length > 0) {
    return { kind: "model", provider, model: rest.join(":") };
  }
  return { kind: "heuristic" };
}

export function describeClewLessonGenerator(generator: ClewLessonGenerator): string {
  // 对用户只呈现模型名；provider（dashscope 等）属基础设施细节，不入界面文案。
  return generator.kind === "model"
    ? `模型生成 · ${generator.model}`
    : "启发式整理 · 未接入模型";
}

export const CLEW_LESSON_SECTIONS = ["定义", "要点", "易错点", "自测题"] as const;

export type ClewLessonSection = (typeof CLEW_LESSON_SECTIONS)[number];

/** 讲义自测题数量（验收要求 3 道）。 */
export const CLEW_LESSON_SELF_TEST_COUNT = 3;

export type ClewLessonStructure = {
  present: ClewLessonSection[];
  missing: ClewLessonSection[];
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
export function isSectionHeading(line: string, title: ClewLessonSection): boolean {
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

/** 收集各小节的原始行（模型输出与启发式讲义共用同一判定；三视图派生也复用该解析定位小节）。 */
export function collectLessonSectionBodies(lines: readonly string[]): Map<ClewLessonSection, string[]> {
  const sectionBodies = new Map<ClewLessonSection, string[]>();
  let current: ClewLessonSection | null = null;

  for (const line of lines) {
    const matched = CLEW_LESSON_SECTIONS.find((title) => isSectionHeading(line, title));
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
  return sectionBodies;
}

/** 解析讲义小节结构与自测题数量（模型输出与启发式讲义共用同一判定）。 */
export function inspectLessonMarkdown(markdown: string): ClewLessonStructure {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sectionBodies = collectLessonSectionBodies(lines);
  const present = CLEW_LESSON_SECTIONS.filter((title) => sectionBodies.has(title));
  const missing = CLEW_LESSON_SECTIONS.filter((title) => !sectionBodies.has(title));
  const selfTestBody = (sectionBodies.get("自测题") ?? []).join("\n");
  return { present: [...present], missing: [...missing], selfTestCount: countSelfTestQuestions(selfTestBody) };
}

export type ClewLessonSelfTestItem = {
  /** 题号（保留讲义中的编号；编号异常时按出现顺序补）。 */
  index: number;
  question: string;
  /** 参考答案（讲义未附则为 null，不猜测、不补写）。 */
  answer: string | null;
};

/**
 * 解析讲义「自测题」小节为 题干/参考答案 对。模型与启发式讲义共用同一内联格式：
 * `1. 题干`（可加粗）+ 下一行缩进 `   参考答案：…`；也兼容题干行内联「参考答案：」。
 */
export function parseClewLessonSelfTest(markdown: string): ClewLessonSelfTestItem[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const body = collectLessonSectionBodies(lines).get("自测题") ?? [];
  const items: ClewLessonSelfTestItem[] = [];
  let current: ClewLessonSelfTestItem | null = null;
  let fallbackIndex = 0;

  const stripBoldEdges = (value: string): string =>
    value.replace(/^\*\*\s*/, "").replace(/\*\*\s*$/, "").trim();

  for (const rawLine of body) {
    const line = rawLine.trimEnd();
    if (line.trim().length === 0) {
      continue;
    }

    const numbered = line.match(/^\s*(?:\*\*)?(\d{1,2})\s*[.、)）]\s*(.*)$/);
    if (numbered) {
      fallbackIndex += 1;
      let text = stripBoldEdges(numbered[2]);
      let answer: string | null = null;
      const inline = text.match(/^(.*?)(?:\*\*)?参考答案\s*[:：]\s*([\s\S]*)$/);
      if (inline && inline[1].trim().length > 0) {
        text = stripBoldEdges(inline[1]);
        answer = stripBoldEdges(inline[2]);
      }
      current = {
        index: Number.parseInt(numbered[1], 10) || fallbackIndex,
        question: text,
        answer,
      };
      items.push(current);
      continue;
    }

    if (!current) {
      continue;
    }
    const answerLine = line.match(/^\s*(?:\*\*)?参考答案\s*[:：]\s*(.*)$/);
    if (answerLine) {
      const extra = stripBoldEdges(answerLine[1]);
      if (extra) {
        current.answer = current.answer ? `${current.answer} ${extra}`.trim() : extra;
      }
      continue;
    }
    const text = stripBoldEdges(line);
    if (!text) {
      continue;
    }
    if (current.answer === null) {
      current.question = `${current.question} ${text}`.trim();
    } else {
      current.answer = `${current.answer} ${text}`.trim();
    }
  }

  return items;
}

export type ClewLessonValidation = {
  ok: boolean;
  structure: ClewLessonStructure;
  reason: string | null;
};

/**
 * 模型讲义结构校验：定义与要点必须存在，自测题不少于 3 道；不合格即如实报错，不静默兜底。
 */
export function validateGeneratedLesson(markdown: string): ClewLessonValidation {
  const structure = inspectLessonMarkdown(markdown);
  if (structure.missing.includes("定义")) {
    return { ok: false, structure, reason: "缺少「定义」小节" };
  }
  if (structure.missing.includes("要点")) {
    return { ok: false, structure, reason: "缺少「要点」小节" };
  }
  if (structure.selfTestCount < CLEW_LESSON_SELF_TEST_COUNT) {
    return {
      ok: false,
      structure,
      reason: `自测题只有 ${structure.selfTestCount} 道（要求 ${CLEW_LESSON_SELF_TEST_COUNT} 道）`,
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

export type ClewLessonHeaderInput = {
  title: string;
  generator: ClewLessonGenerator;
  style: ClewLessonStyle;
  generatedAtLabel: string;
  textbookTitle: string;
  chapterTitle: string;
  sourcePage: number;
  /** DOCX 时页首写「页码待确认」，不把占位页码写成印刷页。 */
  fileName?: string;
  /** 生成方式声明（未接入模型 / AI 生成内容）。 */
  notice: string;
};

/** 讲义固定页首（模型与启发式共用，保证生成方式与页码可溯源）。 */
export function buildLessonHeader(input: ClewLessonHeaderInput): string {
  return [
    `# ${input.title}`,
    "",
    `> 生成方式：${describeClewLessonGenerator(input.generator)}`,
    `> 风格：${CLEW_LESSON_STYLE_LABELS[input.style]} · 生成时间：${input.generatedAtLabel}`,
    `> 教材：《${input.textbookTitle}》· ${input.chapterTitle} · 依据${formatClewSourcePage(input.fileName ?? "", input.sourcePage)}`,
    `> ${input.notice}`,
    "",
  ].join("\n");
}

export const CLEW_HEURISTIC_LESSON_NOTICE =
  "本页未调用模型：内容由萃取结果与教材原文片段确定性地重排，请对照教材原文核对。";

export const CLEW_MODEL_LESSON_NOTICE =
  "AI 生成内容，请对照教材原文核对；不是教师讲义或标准答案。";

export type ClewHeuristicLessonInput = {
  knowledgePoint: {
    title: string;
    description: string;
    keyTerms: readonly string[];
    prerequisites: readonly string[];
    sourcePage: number;
  };
  textbookTitle: string;
  fileName?: string;
  chapterTitle: string;
  /** 教材原文片段（带【PDF 第 X 页】标记）；未读到则为 null。 */
  sourceExcerpt: string | null;
  style: ClewLessonStyle;
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
export function buildHeuristicLesson(input: ClewHeuristicLessonInput): string {
  const { knowledgePoint, textbookTitle, chapterTitle, sourceExcerpt, style, generatedAtLabel, fileName } = input;
  const docx = isClewDocx(fileName ?? "");
  const locator = formatClewSourcePage(fileName ?? "", knowledgePoint.sourcePage);
  const excerptLines = selectExcerptLines(sourceExcerpt, knowledgePoint);
  const keyTerms = knowledgePoint.keyTerms.filter((term) => term.trim().length > 0);
  const prerequisites = knowledgePoint.prerequisites.filter((item) => item.trim().length > 0);

  const excerptSection = excerptLines.length > 0
    ? excerptLines.map((line) => `  - ${line}`).join("\n")
    : docx
      ? "  - 未在原文中检索到与标题直接匹配的句子，请对照教材（页码待确认）。"
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
      fileName,
      notice: CLEW_HEURISTIC_LESSON_NOTICE,
    }),
    "## 定义",
    knowledgePoint.description,
    "",
    "## 要点",
    keyTerms.length > 0 ? `- 关键术语：${keyTerms.join("、")}` : "- 关键术语：教材萃取结果未标注关键术语。",
    docx ? "- 原文摘录（页码待确认）：" : `- 原文摘录（第 ${knowledgePoint.sourcePage} 页附近）：`,
    excerptSection,
    prerequisites.length > 0
      ? `- 先修知识点：${prerequisites.join("、")}`
      : "- 先修知识点：同章萃取结果未标注先修关系。",
    "",
    "## 易错点",
    "未接入模型，无法生成易错点分析；以下为需人工核对的检查项：",
    `- 定义表述、适用条件与边界请以教材原文为准（${locator}）。`,
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
          `2. 从教材原文中找出 1 个与本题相关的要点并复述（${locator}）。`,
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