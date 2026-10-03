import type { ClewTextbookView, ClewTocRecognitionView, ClewTocStrategy } from "@/types/clew";
import { getClewActiveMonth, isClewTextbookFrozen } from "./limits";

/**
 * Clew 教材视图映射（纯函数）：把数据库行转成对外视图。
 * `toc` 是 Json 列，按不可信输入严格解析；解析不出就返回 null，不猜测。
 */

export type ClewTextbookRow = {
  id: string;
  title: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: string;
  activeMonth: string;
  toc: unknown;
  createdAt: Date;
  _count?: { chapters: number };
};

const tocStrategies: readonly ClewTocStrategy[] = ["outline", "toc-page", "model", "none", "docx-heading"];

/** 白名单导出：写入路径（writeManualChapters）回填 strategy 前校验用。 */
export const tocStrategyWhitelist: readonly string[] = tocStrategies;

export function parseClewRecognition(value: unknown): ClewTocRecognitionView | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const candidate = value as Record<string, unknown>;
  const strategy = candidate.strategy;
  const chapterCount = candidate.chapterCount;
  const notes = candidate.notes;
  const recognizedAt = candidate.recognizedAt;
  if (
    typeof strategy !== "string"
    || !tocStrategies.includes(strategy as ClewTocStrategy)
    || typeof chapterCount !== "number"
    || !Number.isFinite(chapterCount)
    || typeof recognizedAt !== "string"
  ) {
    return null;
  }
  return {
    strategy: strategy as ClewTocStrategy,
    chapterCount,
    notes: Array.isArray(notes)
      ? notes.filter((note): note is string => typeof note === "string")
      : [],
    recognizedAt,
    spineConfirmedAt: parseClewSpineConfirmedAt(value),
  };
}

/**
 * ZCODE-M3 Phase 0：spine 确认章独立读取，与 recognition 严格解析解耦。
 * toc.strategy 为白名单外值（如历史/种子数据的 "manual"）时 recognition 会整包判 null，
 * 但用户已确认的章节结构不应被连坐丢失（否则萃取永久 409 且无法自愈）。
 * 只要求值本身是字符串（ISO 时间），不猜测、不补默认。
 */
export function parseClewSpineConfirmedAt(value: unknown): string | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const confirmedAt = (value as Record<string, unknown>).spineConfirmedAt;
  return typeof confirmedAt === "string" && confirmedAt.length > 0 ? confirmedAt : null;
}

export function toClewTextbookView(
  row: ClewTextbookRow,
  currentMonth: string = getClewActiveMonth(),
): ClewTextbookView {
  const recognition = parseClewRecognition(row.toc);
  return {
    id: row.id,
    title: row.title,
    fileName: row.fileName,
    sizeBytes: row.sizeBytes,
    pageCount: row.pageCount,
    hasTextLayer: row.hasTextLayer,
    status: row.status as ClewTextbookView["status"],
    activeMonth: row.activeMonth,
    isFrozen: isClewTextbookFrozen(row.activeMonth, currentMonth),
    chapterCount: row._count?.chapters ?? 0,
    recognition,
    spineConfirmedAt: parseClewSpineConfirmedAt(row.toc),
    createdAt: row.createdAt.toISOString(),
  };
}