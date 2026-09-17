import type { HiDocHighlightColor, HiDocLessonGenerator } from "@/types/hidoc";
import { parseHiDocMarkdown } from "./lesson-markdown";
import { describeHiDocLessonGenerator, HIDOC_LESSON_STYLE_LABELS } from "./lesson-heuristic";

/**
 * Hi doc 学霸笔记规则层（纯函数，客户端可安全引用）：
 * 章级笔记上下文 → 模型输入 / 启发式笔记的确定性拼装、结构校验、下载文件名。
 * 只汇总真实存在的讲义、追问、划重点与批注；缺失即如实略去，不编造「你曾问到…」。
 */

/** 单份讲义进入笔记上下文的字符上限（超出即截断并如实标注）。 */
export const HIDOC_NOTE_LESSON_SOURCE_MAX_CHARS = 2000;

/** 笔记页首声明（未接入模型 / AI 生成）。 */
export const HIDOC_HEURISTIC_NOTE_NOTICE =
  "本笔记未调用模型：内容由讲义要点、划重点、批注与追问记录确定性地汇总，请对照教材与讲义核对。";

export const HIDOC_MODEL_NOTE_NOTICE = "AI 汇总笔记，请对照教材与讲义核对；不是教师讲义或标准答案。";

export type HiDocNoteHighlightEntry = {
  quote: string;
  note: string | null;
  color: HiDocHighlightColor;
};

/** 单个知识点进入笔记的聚合上下文。 */
export type HiDocNotePoint = {
  id: string;
  order: number;
  title: string;
  description: string;
  keyTerms: string[];
  sourcePage: number;
  /** 该知识点的讲义 markdown；未生成则为 null（如实略去对应要点）。 */
  lessonMarkdown: string | null;
  /** 该知识点下学习者的追问（仅 user 消息原文，按时间序）。 */
  questions: string[];
  /** 该知识点的划重点/批注。 */
  highlights: HiDocNoteHighlightEntry[];
};

/** 章级笔记聚合上下文（服务端读取，纯函数消费）。 */
export type HiDocNoteContext = {
  textbookTitle: string;
  chapterOrder: number;
  chapterTotal: number;
  chapterTitle: string;
  pageStart: number;
  pageEnd: number;
  points: HiDocNotePoint[];
};

/** 送入模型的单知识点输入（讲义已压缩为要点/易错点/自测题片段）。 */
export type HiDocNoteModelPoint = {
  order: number;
  title: string;
  description: string;
  keyTerms: string[];
  sourcePage: number;
  lessonSource: string | null;
  lessonTruncated: boolean;
  questions: string[];
  highlights: { quote: string; note: string | null }[];
};

export type HiDocNoteModelInput = {
  textbookTitle: string;
  chapterTitle: string;
  chapterPosition: string;
  pageRange: string;
  points: HiDocNoteModelPoint[];
  hasAnyLesson: boolean;
  hasAnyConversation: boolean;
  hasAnyHighlight: boolean;
};

/* ---------------- 讲义小节提取（确定性，复用讲义 markdown 解析） ---------------- */

type LessonSectionContent = { bullets: string[]; paragraphs: string[] };

function stripHeadingDecoration(line: string): string {
  return line
    .trim()
    .replace(/^#{1,6}\s*/, "")
    .replace(/\*\*/g, "")
    .trim();
}

function extractLessonSection(markdown: string, sectionTitle: string): LessonSectionContent {
  const blocks = parseHiDocMarkdown(markdown);
  const result: LessonSectionContent = { bullets: [], paragraphs: [] };
  let inSection = false;
  for (const block of blocks) {
    if (block.kind === "heading") {
      if (block.level <= 2) {
        inSection = stripHeadingDecoration(block.text).replace(/[:：]\s*$/, "").startsWith(sectionTitle);
      }
      continue;
    }
    if (!inSection) {
      continue;
    }
    if (block.kind === "list") {
      result.bullets.push(...block.items.map((item) => item.trim()).filter((item) => item.length > 0));
    } else if (block.kind === "paragraph") {
      result.paragraphs.push(block.text.trim());
    }
  }
  return result;
}

/** 讲义自测题条目（题干与参考答案由讲义内联保存，按原样汇总）。 */
export function extractLessonSelfTestItems(markdown: string): string[] {
  return extractLessonSection(markdown, "自测题").bullets;
}

/**
 * 讲义 → 笔记上下文片段：只保留定义/要点/易错点/自测题四节，超出上限截断。
 * 讲义页首引用（生成方式等元信息）不进上下文。
 */
export function extractLessonNoteSource(
  markdown: string,
  maxChars: number = HIDOC_NOTE_LESSON_SOURCE_MAX_CHARS,
): { source: string; truncated: boolean } {
  const sections = ["定义", "要点", "易错点", "自测题"] as const;
  const parts: string[] = [];
  for (const title of sections) {
    const content = extractLessonSection(markdown, title);
    if (content.bullets.length === 0 && content.paragraphs.length === 0) {
      continue;
    }
    parts.push(`## ${title}`);
    parts.push(...content.paragraphs);
    parts.push(...content.bullets.map((item) => `- ${item}`));
  }
  const joined = parts.join("\n").trim();
  if (joined.length <= maxChars) {
    return { source: joined, truncated: false };
  }
  return { source: `${joined.slice(0, maxChars)}…（已截断）`, truncated: true };
}

/* ---------------- 模型输入构建 ---------------- */

export function buildHiDocNoteModelInput(context: HiDocNoteContext): {
  input: HiDocNoteModelInput;
  notes: string[];
} {
  const notes: string[] = [];
  const points: HiDocNoteModelPoint[] = context.points.map((point) => {
    let lessonSource: string | null = null;
    let lessonTruncated = false;
    if (point.lessonMarkdown) {
      const extracted = extractLessonNoteSource(point.lessonMarkdown);
      lessonSource = extracted.source.length > 0 ? extracted.source : null;
      lessonTruncated = extracted.truncated;
    }
    if (point.lessonMarkdown && !lessonSource) {
      notes.push(`知识点「${point.title}」的讲义未包含可汇总小节，已按原样标记为缺省。`);
    }
    if (lessonTruncated) {
      notes.push(`知识点「${point.title}」的讲义过长，送入模型前已截断（保留定义/要点/易错点/自测题）。`);
    }
    return {
      order: point.order,
      title: point.title,
      description: point.description,
      keyTerms: point.keyTerms,
      sourcePage: point.sourcePage,
      lessonSource,
      lessonTruncated,
      questions: point.questions,
      highlights: point.highlights.map((item) => ({ quote: item.quote, note: item.note })),
    };
  });
  const missingLessons = context.points.filter((point) => !point.lessonMarkdown).length;
  if (missingLessons > 0) {
    notes.push(`本章有 ${missingLessons}/${context.points.length} 个知识点尚未生成讲义，笔记中如实略去对应要点。`);
  }
  return {
    input: {
      textbookTitle: context.textbookTitle,
      chapterTitle: context.chapterTitle,
      chapterPosition: `第 ${context.chapterOrder}/${context.chapterTotal} 章`,
      pageRange: `第 ${context.pageStart}–${context.pageEnd} 页`,
      points,
      hasAnyLesson: context.points.some((point) => point.lessonMarkdown !== null),
      hasAnyConversation: context.points.some((point) => point.questions.length > 0),
      hasAnyHighlight: context.points.some((point) => point.highlights.length > 0),
    },
    notes,
  };
}

/* ---------------- 结构校验（模型输出与启发式共用） ---------------- */

export type HiDocNoteStructure = {
  hasOverview: boolean;
  hasSelfTestSummary: boolean;
  pointSectionCount: number;
};

export function inspectHiDocNote(markdown: string): HiDocNoteStructure {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let hasOverview = false;
  let hasSelfTestSummary = false;
  let pointSectionCount = 0;
  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (!heading) {
      continue;
    }
    const level = heading[1].length;
    const text = stripHeadingDecoration(heading[2]);
    if (level <= 2) {
      if (text.startsWith("章首导读")) {
        hasOverview = true;
      }
      if (text.startsWith("自测题汇总")) {
        hasSelfTestSummary = true;
      }
      continue;
    }
    if (level === 3) {
      pointSectionCount += 1;
    }
  }
  return { hasOverview, hasSelfTestSummary, pointSectionCount };
}

export type HiDocNoteValidation = {
  ok: boolean;
  structure: HiDocNoteStructure;
  reason: string | null;
};

/** 模型笔记结构校验：章首导读与自测题汇总必须存在，且至少有一个知识点小节。 */
export function validateGeneratedNote(markdown: string): HiDocNoteValidation {
  const structure = inspectHiDocNote(markdown);
  if (!structure.hasOverview) {
    return { ok: false, structure, reason: "缺少「章首导读」小节" };
  }
  if (!structure.hasSelfTestSummary) {
    return { ok: false, structure, reason: "缺少「自测题汇总」小节" };
  }
  if (structure.pointSectionCount < 1) {
    return { ok: false, structure, reason: "没有按知识点分节（缺少三级小节）" };
  }
  return { ok: true, structure, reason: null };
}

/* ---------------- 启发式笔记（无模型时的确定性拼装） ---------------- */

export type HiDocHeuristicNoteInput = {
  context: HiDocNoteContext;
  /** 由调用方格式化好的时间标签（纯函数不做时区假设）。 */
  generatedAtLabel: string;
};

/** 笔记固定页首（模型与启发式共用，保证生成方式与来源可溯源）。 */
export function buildHiDocNoteHeader(input: {
  title: string;
  generator: HiDocLessonGenerator;
  generatedAtLabel: string;
  context: HiDocNoteContext;
  notice: string;
}): string {
  const { context } = input;
  return [
    `# ${input.title}`,
    "",
    `> 生成方式：${describeHiDocLessonGenerator(input.generator)}`,
    `> 风格：${HIDOC_LESSON_STYLE_LABELS["zh-primary"]} · 生成时间：${input.generatedAtLabel}`,
    `> 教材：《${context.textbookTitle}》· 第 ${context.chapterOrder}/${context.chapterTotal} 章 · 第 ${context.pageStart}–${context.pageEnd} 页`,
    `> ${input.notice}`,
    "",
  ].join("\n");
}

function sectionBullets(content: LessonSectionContent): string[] {
  return [...content.paragraphs, ...content.bullets];
}

function formatQuoteExcerpt(quote: string): string {
  return quote.length > 24 ? `${quote.slice(0, 24)}…` : quote;
}

/**
 * 未接入模型时的启发式学霸笔记：只重排讲义要点、划重点、批注与追问记录，
 * 缺失的小节（无划重点/无批注/无追问/未生成讲义）如实略去或说明，不编造。
 */
export function buildHeuristicHiDocNote(input: HiDocHeuristicNoteInput): string {
  const { context, generatedAtLabel } = input;
  const points = [...context.points].sort((a, b) => a.order - b.order);
  const lessonCount = points.filter((point) => point.lessonMarkdown !== null).length;

  const overviewLines = [
    `本章覆盖教材第 ${context.pageStart}–${context.pageEnd} 页，共 ${points.length} 个知识点，其中 ${lessonCount} 个已生成讲义。`,
    ...points.map(
      (point) =>
        `- ${String(point.order).padStart(2, "0")} ${point.title}（第 ${point.sourcePage} 页${
          point.lessonMarkdown ? "" : " · 未生成讲义"
        }）`,
    ),
  ];

  const parts: string[] = [
    buildHiDocNoteHeader({
      title: `${context.chapterTitle} · 学霸笔记`,
      generator: { kind: "heuristic" },
      generatedAtLabel,
      context,
      notice: HIDOC_HEURISTIC_NOTE_NOTICE,
    }),
    "## 章首导读",
    ...overviewLines,
    "",
    "## 知识点笔记",
  ];

  for (const point of points) {
    parts.push(`### ${String(point.order).padStart(2, "0")}. ${point.title}`);
    parts.push(`**核心定义**：${point.description}`);
    if (point.keyTerms.length > 0) {
      parts.push(`**术语**：${point.keyTerms.join("、")}`);
    }
    if (point.lessonMarkdown) {
      const keyPoints = sectionBullets(extractLessonSection(point.lessonMarkdown, "要点"));
      const pitfalls = sectionBullets(extractLessonSection(point.lessonMarkdown, "易错点"));
      parts.push("**要点**（来自讲义）：");
      parts.push(
        ...(keyPoints.length > 0 ? keyPoints.map((line) => `- ${line}`) : ["- 讲义未包含可汇总的要点小节。"]),
      );
      parts.push("**易错点**（来自讲义）：");
      parts.push(
        ...(pitfalls.length > 0 ? pitfalls.map((line) => `- ${line}`) : ["- 讲义未包含可汇总的易错点小节。"]),
      );
    } else {
      parts.push("**要点/易错点**：该知识点尚未生成讲义，回到学习页生成讲义后可汇总。");
    }

    if (point.highlights.length > 0) {
      parts.push("**我的划重点**：");
      parts.push(
        ...point.highlights.map(
          (highlight) => `- 「${highlight.quote}」（${highlight.note ? "已批注" : "无批注"}）`,
        ),
      );
      const noted = point.highlights.filter((highlight) => highlight.note !== null);
      if (noted.length > 0) {
        parts.push("**我的批注**：");
        parts.push(
          ...noted.map((highlight) => `- ${highlight.note}（对应划线：「${formatQuoteExcerpt(highlight.quote)}」）`),
        );
      }
    }

    if (point.questions.length > 0) {
      parts.push("**追问中暴露的问题**：");
      parts.push(...point.questions.map((question) => `- ${question}`));
    }
    parts.push("");
  }

  const selfTests: string[] = [];
  for (const point of points) {
    if (!point.lessonMarkdown) {
      continue;
    }
    for (const item of extractLessonSelfTestItems(point.lessonMarkdown)) {
      selfTests.push(`- 【${String(point.order).padStart(2, "0")} ${point.title}】${item}`);
    }
  }
  parts.push("## 自测题汇总");
  parts.push(
    ...(selfTests.length > 0
      ? ["以下题目来自各知识点讲义的自测题（参考答案随题附上），请对照教材核对。", ...selfTests]
      : ["本章暂无讲义自测题：先生成讲义后重新生成笔记即可汇总。"]),
  );
  parts.push("");
  parts.push("> 下载提示：在「学霸笔记」面板点「下载 .md」可保存为文件；重新生成笔记后需重新下载。");

  return parts.join("\n");
}

/* ---------------- 下载文件名 ---------------- */

function sanitizeFileNamePart(value: string): string {
  return value
    .replace(/[\\/:*?"<>|\n\r\t]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

/** 下载文件名：{教材名}-{章节名}-学霸笔记.md（不落服务器文件存储）。 */
export function buildHiDocNoteFileName(textbookTitle: string, chapterTitle: string): string {
  const textbook = sanitizeFileNamePart(textbookTitle) || "教材";
  const chapter = sanitizeFileNamePart(chapterTitle) || "章节";
  return `${textbook}-${chapter}-学霸笔记.md`;
}