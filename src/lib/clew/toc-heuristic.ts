/**
 * Clew 目录启发式（纯函数，可测试）：把书签条目或印刷目录页文字归一化为章节草稿。
 * 只做结构化整理，不补造任何章节、页码或标题；解析不到就如实返回 0 章。
 */

export type ClewChapterDraft = {
  title: string;
  pageStart: number;
  pageEnd: number;
};

export type ClewPrintedTocEntry = {
  title: string;
  pageNumber: number;
};

export const CLEW_MAX_CHAPTERS = 200;

/** 单本目录页扫描上限（封面/版权/前言之后通常就是目录）。 */
export const CLEW_TOC_SCAN_PAGE_LIMIT = 15;

const chapterNumberPattern = "[一二三四五六七八九十百千零〇两0-9０-９\\u2F00-\\u2FD5]{1,8}";
const chapterLinePattern = new RegExp(`^\\s*第\\s*${chapterNumberPattern}\\s*[章篇]`);
const sectionLinePattern = new RegExp(`^\\s*第\\s*${chapterNumberPattern}\\s*节`);
const trailingPagePattern = /(?:[.．·…_]{2,}|\s{1,})([0-9０-９]{1,4})\s*$/;
const tocHeadingPattern = /^(目\s*录|contents|目录)\s*$/i;

/** 全角数字 → ASCII（用于页码解析）。 */
function normalizeDigits(text: string): string {
  return text.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

type PdfTextItem = {
  str?: string;
  hasEOL?: boolean;
  transform?: readonly number[];
};

/** 行内基线聚类容差（PDF 单位）：处理下标/字号差异导致的轻微基线偏移。 */
const lineClusterTolerance = 3;

/**
 * pdfjs 文本项 → 行。
 * 优先用 transform 的 Y 坐标聚类（真实教材常见没有 hasEOL，例如印刷厂/CUPS 生成的 PDF），
 * 拿不到 transform 时退回 hasEOL 换行。同一条文本行按 X 排序拼接。
 */
export function pdfTextItemsToLines(items: readonly PdfTextItem[]): string[] {
  const usable = items.filter(
    (item): item is PdfTextItem & { str: string } => typeof item.str === "string" && item.str.length > 0,
  );
  const withTransform = usable.filter(
    (item) => Array.isArray(item.transform) && item.transform.length >= 6,
  );

  if (withTransform.length > 0 && withTransform.length >= usable.length / 2) {
    const sorted = [...withTransform].sort(
      (a, b) => (b.transform?.[5] ?? 0) - (a.transform?.[5] ?? 0),
    );
    const rows: { y: number; cells: { x: number; text: string }[] }[] = [];
    for (const item of sorted) {
      const y = item.transform?.[5] ?? 0;
      const x = item.transform?.[4] ?? 0;
      const row = rows.find((candidate) => Math.abs(candidate.y - y) <= lineClusterTolerance);
      if (row) {
        row.cells.push({ x, text: item.str });
      } else {
        rows.push({ y, cells: [{ x, text: item.str }] });
      }
    }
    return rows
      .map((row) =>
        row.cells
          .sort((a, b) => a.x - b.x)
          .map((cell) => cell.text)
          .join("")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .filter((line) => line.length > 0);
  }

  const lines: string[] = [];
  let current = "";
  for (const item of usable) {
    current += item.str;
    if (item.hasEOL) {
      lines.push(current.replace(/\s+/g, " ").trim());
      current = "";
    }
  }
  if (current.trim()) {
    lines.push(current.replace(/\s+/g, " ").trim());
  }
  return lines.filter((line) => line.length > 0);
}

export function isTocHeadingLine(line: string): boolean {
  return tocHeadingPattern.test(line.trim());
}

export function isChapterHeadingLine(line: string): boolean {
  return chapterLinePattern.test(line);
}

function cleanTitle(rawTitle: string): string {
  return rawTitle
    .replace(/[.．·…_]{2,}\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 解析印刷目录页：行内「第X章/篇 标题 …… 页码」。
 * 只有真正产出有效条目的页才算目录页；正文页整页跳过（不把正文标题算成「被忽略的条目」）。
 * 第X节 等次级条目与无页码的行在目录页内计入 ignoredCount。
 */
export function parsePrintedTocPages(
  pages: readonly { pageNumber: number; lines: string[] }[],
  pageCount: number,
): {
  entries: ClewPrintedTocEntry[];
  ignoredCount: number;
  tocPageNumbers: number[];
} {
  const entries: ClewPrintedTocEntry[] = [];
  const tocPageNumbers: number[] = [];
  let ignoredCount = 0;

  for (const page of pages) {
    const pageEntries: ClewPrintedTocEntry[] = [];
    let ignoredOnPage = 0;

    for (const rawLine of page.lines) {
      const line = rawLine.trim();
      if (!line || isTocHeadingLine(line)) {
        continue;
      }
      if (sectionLinePattern.test(line)) {
        // 第X节 等次级条目一律不生成章节，只计数
        ignoredOnPage += 1;
        continue;
      }
      if (chapterLinePattern.test(line)) {
        const pageMatch = trailingPagePattern.exec(line);
        const printedPage = pageMatch ? Number.parseInt(normalizeDigits(pageMatch[1]), 10) : Number.NaN;
        const title = cleanTitle(line.replace(trailingPagePattern, ""));
        if (!title || !Number.isFinite(printedPage) || printedPage < 1 || printedPage > pageCount) {
          ignoredOnPage += 1;
          continue;
        }
        pageEntries.push({ title, pageNumber: printedPage });
      }
    }

    if (pageEntries.length === 0) {
      continue;
    }
    entries.push(...pageEntries);
    ignoredCount += ignoredOnPage;
    tocPageNumbers.push(page.pageNumber);
  }

  return { entries, ignoredCount, tocPageNumbers };
}

/**
 * 找出「看起来像目录页」的页号：页内存在带尾随页码的章节行。
 * 供页码偏移探针排除目录页自身（目录页也会出现章节标题，否则会污染偏移投票）。
 */
export function collectTocLikePageNumbers(
  pages: readonly { pageNumber: number; lines: string[] }[],
  pageCount: number,
): Set<number> {
  const result = new Set<number>();
  for (const page of pages) {
    const isTocLike = page.lines.some((rawLine) => {
      const line = rawLine.trim();
      if (!isChapterHeadingLine(line) || sectionLinePattern.test(line)) {
        return false;
      }
      const pageMatch = trailingPagePattern.exec(line);
      if (!pageMatch) {
        return false;
      }
      const printedPage = Number.parseInt(normalizeDigits(pageMatch[1]), 10);
      return Number.isFinite(printedPage) && printedPage >= 1 && printedPage <= pageCount;
    });
    if (isTocLike) {
      result.add(page.pageNumber);
    }
  }
  return result;
}

/**
 * 归一化章节草稿：按起始页排序、去重、补 pageEnd（下一页起始 - 1，末章到书末）。
 * 越界条目直接丢弃并计数，不静默修正。
 */
export function normalizeChapterEntries(
  entries: readonly ClewPrintedTocEntry[],
  pageCount: number,
  maxChapters: number = CLEW_MAX_CHAPTERS,
): { chapters: ClewChapterDraft[]; droppedCount: number } {
  const seen = new Set<string>();
  const usable: ClewPrintedTocEntry[] = [];
  let droppedCount = 0;

  for (const entry of entries) {
    const title = entry.title.trim();
    const pageNumber = entry.pageNumber;
    if (!title || !Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > pageCount) {
      droppedCount += 1;
      continue;
    }
    const key = `${pageNumber}::${title}`;
    if (seen.has(key)) {
      droppedCount += 1;
      continue;
    }
    seen.add(key);
    usable.push({ title, pageNumber });
  }

  usable.sort((a, b) => a.pageNumber - b.pageNumber);

  if (usable.length > maxChapters) {
    droppedCount += usable.length - maxChapters;
    usable.length = maxChapters;
  }

  const chapters: ClewChapterDraft[] = usable.map((entry, index) => {
    const nextStart = usable[index + 1]?.pageNumber;
    const pageEnd = nextStart === undefined ? pageCount : Math.max(entry.pageNumber, nextStart - 1);
    return { title: entry.title, pageStart: entry.pageNumber, pageEnd };
  });

  return { chapters, droppedCount };
}

/**
 * 用「章节标题能在哪一页找到」的探针结果投票出印刷页码 → PDF 页序的偏移。
 * 每个探针返回候选偏移（null = 未找到）；要求至少 2 票一致才采信，否则返回 null（如实降级为不校正）。
 */
export function resolveConsensusOffset(candidates: readonly (number | null)[]): number | null {
  const counts = new Map<number, number>();
  for (const candidate of candidates) {
    if (candidate === null || !Number.isInteger(candidate)) {
      continue;
    }
    counts.set(candidate, (counts.get(candidate) ?? 0) + 1);
  }
  let best: number | null = null;
  let bestCount = 0;
  for (const [offset, count] of counts) {
    if (count > bestCount || (count === bestCount && count >= 2 && best !== null && offset < best)) {
      best = offset;
      bestCount = count;
    }
  }
  return bestCount >= 2 ? best : null;
}

/**
 * 模型返回的目录 JSON → 章节条目（不可信输入，必须严格校验）。
 * 只接受 {chapters:[{title, pageStart}]}；页码为目录页上印刷的页码（偏移由后续探针统一修正）。
 * 非法条目直接丢弃并计数，不做任何猜测或补齐。
 */
export function parseModelChaptersPayload(
  value: unknown,
  pageCount: number,
): { entries: ClewPrintedTocEntry[]; droppedCount: number } {
  if (typeof value !== "object" || value === null) {
    return { entries: [], droppedCount: 0 };
  }
  const chapters = (value as { chapters?: unknown }).chapters;
  if (!Array.isArray(chapters)) {
    return { entries: [], droppedCount: 0 };
  }

  const entries: ClewPrintedTocEntry[] = [];
  let droppedCount = 0;
  for (const raw of chapters.slice(0, CLEW_MAX_CHAPTERS * 2)) {
    if (typeof raw !== "object" || raw === null) {
      droppedCount += 1;
      continue;
    }
    const candidate = raw as Record<string, unknown>;
    const title = typeof candidate.title === "string" ? cleanTitle(candidate.title) : "";
    const pageStart = candidate.pageStart;
    if (
      !title
      || typeof pageStart !== "number"
      || !Number.isInteger(pageStart)
      || pageStart < 1
      || pageStart > pageCount
    ) {
      droppedCount += 1;
      continue;
    }
    entries.push({ title, pageNumber: pageStart });
  }

  return { entries, droppedCount };
}

const chapterOnlyPattern = new RegExp(`^\\s*第\\s*${chapterNumberPattern}\\s*章`);
const partOnlyPattern = new RegExp(`^\\s*第\\s*${chapterNumberPattern}\\s*篇`);

export type ClewOutlineChapterSelection = {
  entries: ClewPrintedTocEntry[];
  /** 采用的书签层级；按标题模式选中时为 null。 */
  level: number | null;
  /** 选择依据：章标题 / 篇标题 / 层级兜底。 */
  basis: "chapter-title" | "part-title" | "level" | "none";
  ignoredCount: number;
};

/**
 * 从 PDF 书签里挑出章节条目（确定性规则，不猜测）：
 * 1) 优先所有层级里标题形如「第X章」的条目；
 * 2) 其次「第X篇」；
 * 3) 再退到最浅的、可用条目 ≥2 的层级（不按标题匹配，如实标注）。
 * 目标页无法解析（pageNumber 为 null）的条目一律忽略并计数。
 */
export function selectOutlineChapters(
  entries: readonly { title: string; level: number; pageNumber: number | null }[],
): ClewOutlineChapterSelection {
  const resolved = entries
    .filter((entry): entry is { title: string; level: number; pageNumber: number } => entry.pageNumber !== null)
    .map((entry) => ({ title: entry.title, level: entry.level, pageNumber: entry.pageNumber }));

  const toEntries = (list: typeof resolved) =>
    list.map((entry) => ({ title: entry.title, pageNumber: entry.pageNumber }));

  const chapterTitles = resolved.filter((entry) => chapterOnlyPattern.test(entry.title));
  if (chapterTitles.length >= 2) {
    return {
      entries: toEntries(chapterTitles),
      level: null,
      basis: "chapter-title",
      ignoredCount: entries.length - chapterTitles.length,
    };
  }

  const partTitles = resolved.filter((entry) => partOnlyPattern.test(entry.title));
  if (partTitles.length >= 2) {
    return {
      entries: toEntries(partTitles),
      level: null,
      basis: "part-title",
      ignoredCount: entries.length - partTitles.length,
    };
  }

  const levels = [...new Set(resolved.map((entry) => entry.level))].sort((a, b) => a - b);
  for (const level of levels) {
    const atLevel = resolved.filter((entry) => entry.level === level);
    if (atLevel.length >= 2) {
      return {
        entries: toEntries(atLevel),
        level,
        basis: "level",
        ignoredCount: entries.length - atLevel.length,
      };
    }
  }

  return { entries: [], level: null, basis: "none", ignoredCount: entries.length };
}

/** 页内是否出现标题探针（取标题前 N 个字符做包含匹配，空白折叠后比较）。 */
export function pageTextMatchesTitle(pageLines: readonly string[], title: string): boolean {
  const probe = title.replace(/\s+/g, "").slice(0, 8);
  if (probe.length < 2) {
    return false;
  }
  return pageLines.some((line) => line.replace(/\s+/g, "").includes(probe));
}

export type ManualChapterInput = {
  title: string;
  pageStart: number;
  pageEnd: number;
};

/** 手动修正校验：标题非空、页码在书内、起止有序；失败给出中文原因。 */
export function validateManualChapters(
  input: unknown,
  pageCount: number,
): { ok: true; chapters: ManualChapterInput[] } | { ok: false; message: string } {
  if (!Array.isArray(input)) {
    return { ok: false, message: "章节列表格式不正确。" };
  }
  if (input.length === 0) {
    return { ok: false, message: "章节列表不能为空；如无需章节，请保留识别结果或重新识别。" };
  }
  if (input.length > CLEW_MAX_CHAPTERS) {
    return { ok: false, message: `章节数超过上限 ${CLEW_MAX_CHAPTERS}。` };
  }

  const chapters: ManualChapterInput[] = [];
  for (const [index, raw] of input.entries()) {
    if (typeof raw !== "object" || raw === null) {
      return { ok: false, message: `第 ${index + 1} 个章节格式不正确。` };
    }
    const candidate = raw as Record<string, unknown>;
    const title = typeof candidate.title === "string" ? candidate.title.trim() : "";
    const pageStart = candidate.pageStart;
    const pageEnd = candidate.pageEnd;
    if (!title) {
      return { ok: false, message: `第 ${index + 1} 个章节缺少标题。` };
    }
    if (!Number.isInteger(pageStart) || !Number.isInteger(pageEnd)) {
      return { ok: false, message: `《${title}》的起止页必须是整数。` };
    }
    const start = pageStart as number;
    const end = pageEnd as number;
    if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
      return { ok: false, message: `《${title}》的页码超出 1–${pageCount}。` };
    }
    if (end < start) {
      return { ok: false, message: `《${title}》的结束页早于起始页。` };
    }
    chapters.push({ title, pageStart: start, pageEnd: end });
  }

  chapters.sort((a, b) => a.pageStart - b.pageStart);
  return { ok: true, chapters };
}