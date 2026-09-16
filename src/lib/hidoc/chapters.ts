import "server-only";

import { prisma } from "@/lib/prisma";
import type {
  HiDocChapterSource,
  HiDocChapterStatus,
  HiDocChapterView,
  HiDocErrorCode,
  HiDocTextbookDetail,
  HiDocTocRecognitionView,
} from "@/types/hidoc";
import { validateManualChapters, type HiDocChapterDraft } from "./toc-heuristic";
import { getHiDocActiveMonth } from "./limits";
import { toHiDocTextbookView, type HiDocTextbookRow } from "./textbook-view";

/**
 * Hi doc 章节服务（server-only）：识别结果落库、手动修正、详情读取。
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

function toChapterView(row: HiDocChapterRow): HiDocChapterView {
  return {
    id: row.id,
    order: row.order,
    title: row.title,
    pageStart: row.pageStart,
    pageEnd: row.pageEnd,
    source: row.source as HiDocChapterSource,
    status: row.status as HiDocChapterStatus,
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