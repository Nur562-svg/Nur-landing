/**
 * Clew 知识点萃取校验（纯函数，可测试）：模型输出的不可信 payload → 结构化草稿。
 * 只接受严格形状；非法条目丢弃并计数；先修引用只保留同批次内能对上的标题，不伪造。
 */

export type ClewKnowledgePointDraft = {
  title: string;
  description: string;
  keyTerms: string[];
  prerequisites: string[];
  sourcePage: number;
  /** ZCODE-M2: 学习闭环 profile（萃取管线用规则引擎补全；模型不直接决定）。 */
  loopProfileId?: string;
};

export const CLEW_MAX_KNOWLEDGE_POINTS_PER_CHAPTER = 30;

/** 单章送入模型的文字上限（页标记后）。 */
export const CLEW_CHAPTER_TEXT_MAX_CHARS = 20_000;

export type ClewExtractionParseResult = {
  knowledgePoints: ClewKnowledgePointDraft[];
  droppedCount: number;
  droppedPrerequisiteCount: number;
};

function isStringArray(value: unknown, maxLength: number, itemMaxLength: number): value is string[] {
  if (!Array.isArray(value) || value.length > maxLength) {
    return false;
  }
  return value.every((item) => typeof item === "string" && item.trim().length > 0 && item.length <= itemMaxLength);
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > 0 && cleaned.length <= maxLength ? cleaned : null;
}

/**
 * 模型 JSON → 知识点草稿。
 * 页码必须是 chapterPageStart..chapterPageEnd 之间的整数（PDF 页序），越界条目丢弃。
 */
export function parseModelKnowledgePointsPayload(
  value: unknown,
  chapterPageStart: number,
  chapterPageEnd: number,
): ClewExtractionParseResult {
  if (typeof value !== "object" || value === null) {
    return { knowledgePoints: [], droppedCount: 0, droppedPrerequisiteCount: 0 };
  }
  const points = (value as { knowledgePoints?: unknown }).knowledgePoints;
  if (!Array.isArray(points)) {
    return { knowledgePoints: [], droppedCount: 0, droppedPrerequisiteCount: 0 };
  }

  const drafts: ClewKnowledgePointDraft[] = [];
  let droppedCount = 0;

  for (const raw of points.slice(0, CLEW_MAX_KNOWLEDGE_POINTS_PER_CHAPTER * 2)) {
    if (typeof raw !== "object" || raw === null) {
      droppedCount += 1;
      continue;
    }
    const candidate = raw as Record<string, unknown>;
    const title = cleanText(candidate.title, 200);
    const description = cleanText(candidate.description, 1000);
    const sourcePage = candidate.sourcePage;
    const keyTerms = candidate.keyTerms;
    const prerequisites = candidate.prerequisites;
    if (
      !title
      || !description
      || typeof sourcePage !== "number"
      || !Number.isInteger(sourcePage)
      || sourcePage < chapterPageStart
      || sourcePage > chapterPageEnd
    ) {
      droppedCount += 1;
      continue;
    }
    const keyTermList = isStringArray(keyTerms, 10, 80)
      ? keyTerms.map((term) => term.trim()).filter((term) => term.length > 0)
      : null;
    const prerequisiteList = isStringArray(prerequisites, 5, 200)
      ? prerequisites.map((item) => item.trim()).filter((item) => item.length > 0)
      : null;
    if (keyTermList === null || prerequisiteList === null) {
      droppedCount += 1;
      continue;
    }
    drafts.push({
      title,
      description,
      keyTerms: keyTermList,
      prerequisites: prerequisiteList,
      sourcePage,
    });
  }

  if (drafts.length > CLEW_MAX_KNOWLEDGE_POINTS_PER_CHAPTER) {
    droppedCount += drafts.length - CLEW_MAX_KNOWLEDGE_POINTS_PER_CHAPTER;
    drafts.length = CLEW_MAX_KNOWLEDGE_POINTS_PER_CHAPTER;
  }

  // 同章去重（标题 + 页码相同视为重复）
  const seen = new Set<string>();
  const deduped: ClewKnowledgePointDraft[] = [];
  for (const draft of drafts) {
    const key = `${draft.sourcePage}::${draft.title.toLowerCase()}`;
    if (seen.has(key)) {
      droppedCount += 1;
      continue;
    }
    seen.add(key);
    deduped.push(draft);
  }

  // 先修引用只保留同批次能对上的标题（模型草稿不得指向不存在的知识点）
  const titles = new Set(deduped.map((draft) => draft.title.toLowerCase()));
  let droppedPrerequisiteCount = 0;
  const normalized = deduped.map((draft) => {
    const kept: string[] = [];
    for (const prerequisite of draft.prerequisites) {
      if (titles.has(prerequisite.toLowerCase()) && prerequisite.toLowerCase() !== draft.title.toLowerCase()) {
        kept.push(prerequisite);
      } else {
        droppedPrerequisiteCount += 1;
      }
    }
    return { ...draft, prerequisites: kept };
  });

  return { knowledgePoints: normalized, droppedCount, droppedPrerequisiteCount };
}

/** 章节文字 + 页标记 → 模型输入文本（【PDF 第 X 页】分隔）。 */
export function buildChapterModelText(
  pages: readonly { pageNumber: number; lines: string[] }[],
  maxChars: number = CLEW_CHAPTER_TEXT_MAX_CHARS,
): { text: string; truncated: boolean } {
  const parts: string[] = [];
  let used = 0;
  let truncated = false;
  for (const page of pages) {
    const pageText = page.lines.join("\n");
    const block = `【PDF 第 ${page.pageNumber} 页】\n${pageText}`;
    if (used + block.length > maxChars) {
      truncated = true;
      const remaining = Math.max(0, maxChars - used);
      if (remaining > 200) {
        parts.push(block.slice(0, remaining));
      }
      break;
    }
    parts.push(block);
    used += block.length;
  }
  return { text: parts.join("\n\n"), truncated };
}
