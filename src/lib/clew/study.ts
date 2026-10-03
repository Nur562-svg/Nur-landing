import "server-only";

import { prisma } from "@/lib/prisma";
import type {
  ClewChapterStudyView,
  ClewChapterView,
  ClewKnowledgePointStudySummary,
  ClewKnowledgePointStudyView,
} from "@/types/clew";
import { toKnowledgePointView, type ClewChapterServiceResult } from "./chapters";
import { listClewHighlights } from "./highlights";
import {
  loadClewConversationMessages,
  loadClewKnowledgePointContext,
} from "./knowledge-points";
import { loadClewLesson } from "./lesson";
import { getClewActiveMonth } from "./limits";
import { loadClewChapterNote } from "./note";
import { toClewTextbookView } from "./textbook-view";

/**
 * Clew 学习页读取（server-only）：章节 + 知识点清单（含讲义状态）、单个知识点（讲义 + 对话历史 + 划重点）与章级学霸笔记。
 * 只读查询，全部从 userId 出发校验私有归属。
 */

export async function getClewChapterStudy(
  userId: string,
  textbookId: string,
  chapterOrder: number,
): Promise<ClewChapterServiceResult<ClewChapterStudyView>> {
  const textbook = await prisma.clewTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    include: { _count: { select: { chapters: true } } },
  });
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const chapters = await prisma.clewChapter.findMany({
    where: { textbookId: textbook.id },
    orderBy: { order: "asc" },
    include: { _count: { select: { knowledgePoints: true } } },
  });
  const chapterRow = chapters.find((row) => row.order === chapterOrder);
  if (!chapterRow) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在，请先识别或修正目录。" };
  }

  const knowledgePointRows = await prisma.clewKnowledgePoint.findMany({
    where: { chapterId: chapterRow.id },
    orderBy: { order: "asc" },
    include: { lesson: { select: { id: true } } },
  });
  const knowledgePoints: ClewKnowledgePointStudySummary[] = knowledgePointRows.map((row) => ({
    ...toKnowledgePointView(row),
    hasLesson: row.lesson !== null,
  }));

  const chapter: ClewChapterView = {
    id: chapterRow.id,
    order: chapterRow.order,
    title: chapterRow.title,
    pageStart: chapterRow.pageStart,
    pageEnd: chapterRow.pageEnd,
    source: chapterRow.source as ClewChapterView["source"],
    status: chapterRow.status as ClewChapterView["status"],
    knowledgePointCount: chapterRow._count.knowledgePoints,
  };

  const textbookView = toClewTextbookView(textbook, getClewActiveMonth());
  const note = await loadClewChapterNote(userId, chapterRow.id);

  return {
    ok: true,
    data: {
      textbook: {
        id: textbookView.id,
        title: textbookView.title,
        pageCount: textbookView.pageCount,
        fileName: textbookView.fileName,
      },
      chapter,
      chapterIndex: chapters.findIndex((row) => row.order === chapterOrder) + 1,
      chapterTotal: chapters.length,
      knowledgePoints,
      lessonCount: knowledgePoints.filter((point) => point.hasLesson).length,
      note,
    },
  };
}

export async function getClewKnowledgePointStudy(
  userId: string,
  kpId: string,
): Promise<ClewChapterServiceResult<ClewKnowledgePointStudyView>> {
  const context = await loadClewKnowledgePointContext(userId, kpId);
  if (!context.ok) {
    return context;
  }
  const lesson = await loadClewLesson(kpId);
  const messages = await loadClewConversationMessages(userId, kpId);
  const highlights = await listClewHighlights(userId, kpId);
  return {
    ok: true,
    data: {
      knowledgePoint: context.data.knowledgePoint,
      chapterTitle: context.data.chapter.title,
      lesson: lesson?.view ?? null,
      messages,
      highlights,
    },
  };
}