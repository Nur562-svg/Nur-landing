import type { HiDocTextbookView, HiDocTocRecognitionView, HiDocTocStrategy } from "@/types/hidoc";
import { getHiDocActiveMonth, isHiDocTextbookFrozen } from "./limits";

/**
 * Hi doc 教材视图映射（纯函数）：把数据库行转成对外视图。
 * `toc` 是 Json 列，按不可信输入严格解析；解析不出就返回 null，不猜测。
 */

export type HiDocTextbookRow = {
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

const tocStrategies: readonly HiDocTocStrategy[] = ["outline", "toc-page", "model", "none", "docx-heading"];

export function parseHiDocRecognition(value: unknown): HiDocTocRecognitionView | null {
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
    || !tocStrategies.includes(strategy as HiDocTocStrategy)
    || typeof chapterCount !== "number"
    || !Number.isFinite(chapterCount)
    || typeof recognizedAt !== "string"
  ) {
    return null;
  }
  return {
    strategy: strategy as HiDocTocStrategy,
    chapterCount,
    notes: Array.isArray(notes)
      ? notes.filter((note): note is string => typeof note === "string")
      : [],
    recognizedAt,
  };
}

export function toHiDocTextbookView(
  row: HiDocTextbookRow,
  currentMonth: string = getHiDocActiveMonth(),
): HiDocTextbookView {
  return {
    id: row.id,
    title: row.title,
    fileName: row.fileName,
    sizeBytes: row.sizeBytes,
    pageCount: row.pageCount,
    hasTextLayer: row.hasTextLayer,
    status: row.status as HiDocTextbookView["status"],
    activeMonth: row.activeMonth,
    isFrozen: isHiDocTextbookFrozen(row.activeMonth, currentMonth),
    chapterCount: row._count?.chapters ?? 0,
    recognition: parseHiDocRecognition(row.toc),
    createdAt: row.createdAt.toISOString(),
  };
}