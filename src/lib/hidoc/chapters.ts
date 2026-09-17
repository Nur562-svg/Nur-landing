import "server-only";

import { prisma } from "@/lib/prisma";
import type {
  HiDocChapterSource,
  HiDocChapterStatus,
  HiDocChapterView,
  HiDocErrorCode,
  HiDocKnowledgePointView,
  HiDocTextbookDetail,
  HiDocTocRecognitionView,
} from "@/types/hidoc";
import { validateManualChapters, type HiDocChapterDraft } from "./toc-heuristic";
import type { HiDocKnowledgePointDraft } from "./extraction-heuristic";
import { getHiDocActiveMonth } from "./limits";
import { toHiDocTextbookView, type HiDocTextbookRow } from "./textbook-view";

/**
 * Hi doc 章节服务（server-only）：识别结果落库、手动修正、详情读取、知识点落库与读取。
 * 章节页码是 PDF 页序（1 起）；来源与识别元信息都如实保存，不伪造。
 */

export type HiDocChapterServiceFailure = {
  ok: false;
  status: number;
  code: HiDocErrorCode;
  message: string;
};

export type HiDocChapterServiceResult<T> = { ok: true; data: T } | HiDocChapterServiceFailure;

type HiDocChapterRow = {
  id: string;
  order: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  source: string;
  status: string;
};

type HiDocChapterRowWithCount = HiDocChapterRow & {
  _count: { knowledgePoints: number };
};

function toChapterView(row: HiDocChapterRowWithCount): HiDocChapterView {
  return {
    id: row.id,
    order: row.order,
    title: row.title,
    pageStart: row.pageStart,
    pageEnd: row.pageEnd,
    source: row.source as HiDocChapterSource,
    status: row.status as HiDocChapterStatus,
    knowledgePointCount: row._count.knowledgePoints,
  };
}

/** 知识点数据库行 → 对外视图（M4 讲义/对话模块共用）。 */
export function toKnowledgePointView(row: {
  id: string;
  order: number;
  title: string;
  description: string;
  keyTerms: unknown;
  prerequisites: unknown;
  sourcePage: number;
}): HiDocKnowledgePointView {
  const keyTerms = Array.isArray(row.keyTerms)
    ? row.keyTerms.filter((term): term is string => typeof term === "string")
    : [];
  const prerequisites = Array.isArray(row.prerequisites)
    ? row.prerequisites.filter((item): item is string => typeof item === "string")
    : [];
  return {
    id: row.id,
    order: row.order,
    title: row.title,
    description: row.description,
    keyTerms,
    prerequisites,
    sourcePage: row.sourcePage,
  };
}

async function loadOwnedTextbook(
  userId: string,
  textbookId: string,
): Promise<HiDocTextbookRow | null> {
  return prisma.hiDocTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    include: { _count: { select: { chapters: true } } },
  });
}

async function loadChapters(textbookId: string): Promise<HiDocChapterView[]> {
  const rows = await prisma.hiDocChapter.findMany({
    where: { textbookId },
    orderBy: { order: "asc" },
    include: { _count: { select: { knowledgePoints: true } } },
  });
  return rows.map((row) => toChapterView(row));
}

/** 教材详情：教材（含章节数/识别元信息）+ 章节树。 */
export async function getHiDocTextbookDetail(
  userId: string,
  textbookId: string,
): Promise<HiDocChapterServiceResult<HiDocTextbookDetail>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  const chapters = await loadChapters(textbook.id);
  return {
    ok: true,
    data: {
      textbook: toHiDocTextbookView(textbook, getHiDocActiveMonth()),
      chapters,
    },
  };
}

/** 用识别结果整体替换章节（事务内），并写入识别元信息与教材状态。 */
export async function saveRecognizedChapters(
  userId: string,
  textbookId: string,
  chapters: readonly HiDocChapterDraft[],
  recognition: { strategy: HiDocTocRecognitionView["strategy"]; notes: string[]; source: HiDocChapterSource },
): Promise<HiDocChapterServiceResult<HiDocTextbookDetail>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const recognizedAt = new Date();
  const recognitionView: HiDocTocRecognitionView = {
    strategy: recognition.strategy,
    chapterCount: chapters.length,
    notes: recognition.notes,
    recognizedAt: recognizedAt.toISOString(),
  };

  await prisma.$transaction(async (tx) => {
    await tx.hiDocChapter.deleteMany({ where: { textbookId: textbook.id } });
    await tx.hiDocChapter.createMany({
      data: chapters.map((chapter, index) => ({
        textbookId: textbook.id,
        order: index + 1,
        title: chapter.title,
        pageStart: chapter.pageStart,
        pageEnd: chapter.pageEnd,
        source: recognition.source,
        status: "pending",
      })),
    });
    await tx.hiDocTextbook.update({
      where: { id: textbook.id },
      data: {
        status: "toc_ready",
        toc: recognitionView,
      },
    });
  });

  const detail = await getHiDocTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    return detail;
  }
  return { ok: true, data: detail.data };
}

/**
 * 手动修正：整体替换章节列表。
 * 与现有条目完全相同的行保留原来源；被改动或新增的行标为 manual（不覆盖识别来源的诚实标注）。
 */
export async function replaceChaptersManually(
  userId: string,
  textbookId: string,
  rawChapters: unknown,
): Promise<HiDocChapterServiceResult<HiDocTextbookDetail>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const validated = validateManualChapters(rawChapters, textbook.pageCount);
  if (!validated.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: validated.message };
  }

  const existing = await prisma.hiDocChapter.findMany({
    where: { textbookId: textbook.id },
    orderBy: { order: "asc" },
  });
  const existingKey = new Map<string, string>();
  for (const row of existing) {
    existingKey.set(`${row.pageStart}::${row.pageEnd}::${row.title}`, row.source);
  }

  const previousToc = (textbook.toc ?? null) as HiDocTocRecognitionView | null;
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.hiDocChapter.deleteMany({ where: { textbookId: textbook.id } });
    await tx.hiDocChapter.createMany({
      data: validated.chapters.map((chapter, index) => {
        const key = `${chapter.pageStart}::${chapter.pageEnd}::${chapter.title}`;
        return {
          textbookId: textbook.id,
          order: index + 1,
          title: chapter.title,
          pageStart: chapter.pageStart,
          pageEnd: chapter.pageEnd,
          source: existingKey.get(key) ?? "manual",
          status: "pending",
        };
      }),
    });
    await tx.hiDocTextbook.update({
      where: { id: textbook.id },
      data: {
        status: "toc_ready",
        toc: {
          strategy: previousToc?.strategy ?? "none",
          chapterCount: validated.chapters.length,
          notes: [...(previousToc?.notes ?? []), `人工修正于 ${now.toISOString()}：共 ${validated.chapters.length} 章。`],
          recognizedAt: previousToc?.recognizedAt ?? now.toISOString(),
        },
      },
    });
  });

  const detail = await getHiDocTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    return detail;
  }
  return { ok: true, data: detail.data };
}
/** 读取单章知识点（供详情页展开列表）。 */
export async function getChapterKnowledgePoints(
  userId: string,
  textbookId: string,
  chapterOrder: number,
): Promise<HiDocChapterServiceResult<HiDocKnowledgePointView[]>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  const chapter = await prisma.hiDocChapter.findFirst({
    where: { textbookId: textbook.id, order: chapterOrder },
    select: { id: true },
  });
  if (!chapter) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在。" };
  }
  const rows = await prisma.hiDocKnowledgePoint.findMany({
    where: { chapterId: chapter.id },
    orderBy: { order: "asc" },
  });
  return { ok: true, data: rows.map((row) => toKnowledgePointView(row)) };
}

/**
 * 萃取结果落库：整体替换该章知识点并把章节状态置为 extracted（事务内）。
 * 输入必须已通过 parseModelKnowledgePointsPayload 校验（页码在章节范围内）。
 */
export async function replaceChapterKnowledgePoints(
  userId: string,
  textbookId: string,
  chapterOrder: number,
  knowledgePoints: readonly HiDocKnowledgePointDraft[],
): Promise<HiDocChapterServiceResult<HiDocKnowledgePointView[]>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  const chapter = await prisma.hiDocChapter.findFirst({
    where: { textbookId: textbook.id, order: chapterOrder },
    select: { id: true, pageStart: true, pageEnd: true },
  });
  if (!chapter) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在。" };
  }

  // 双重校验：页码必须仍在章节范围内（调用方已校验，落库前再挡一次）
  const valid = knowledgePoints.filter(
    (point) =>
      Number.isInteger(point.sourcePage)
      && point.sourcePage >= chapter.pageStart
      && point.sourcePage <= chapter.pageEnd
      && point.title.trim().length > 0,
  );
  if (valid.length === 0) {
    return { ok: false, status: 422, code: "extraction-failed", message: "没有可写入的知识点（全部未通过校验）。" };
  }

  await prisma.$transaction(async (tx) => {
    await tx.hiDocKnowledgePoint.deleteMany({ where: { chapterId: chapter.id } });
    await tx.hiDocKnowledgePoint.createMany({
      data: valid.map((point, index) => ({
        chapterId: chapter.id,
        order: index + 1,
        title: point.title,
        description: point.description,
        keyTerms: point.keyTerms,
        prerequisites: point.prerequisites,
        sourcePage: point.sourcePage,
      })),
    });
    await tx.hiDocChapter.update({
      where: { id: chapter.id },
      data: { status: "extracted" },
    });
  });

  const rows = await prisma.hiDocKnowledgePoint.findMany({
    where: { chapterId: chapter.id },
    orderBy: { order: "asc" },
  });

  return {
    ok: true,
    data: rows.map((row) => toKnowledgePointView(row)),
  };
}
