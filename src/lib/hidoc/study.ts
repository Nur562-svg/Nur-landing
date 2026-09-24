import "server-only";

import { prisma } from "@/lib/prisma";
import type {
  HiDocChapterStudyView,
  HiDocChapterView,
  HiDocKnowledgePointStudySummary,
  HiDocKnowledgePointStudyView,
} from "@/types/hidoc";
import { toKnowledgePointView, type HiDocChapterServiceResult } from "./chapters";
import { listHiDocHighlights } from "./highlights";
import {
  loadHiDocConversationMessages,
  loadHiDocKnowledgePointContext,
} from "./knowledge-points";
import { loadHiDocLesson } from "./lesson";
import { getHiDocActiveMonth } from "./limits";
import { loadHiDocChapterNote } from "./note";
import { toHiDocTextbookView } from "./textbook-view";

/**
 * Hi doc 学习页读取（server-only）：章节 + 知识点清单（含讲义状态）、单个知识点（讲义 + 对话历史 + 划重点）与章级学霸笔记。
 * 只读查询，全部从 userId 出发校验私有归属。
 */

export async function getHiDocChapterStudy(
  userId: string,
  textbookId: string,
  chapterOrder: number,
): Promise<HiDocChapterServiceResult<HiDocChapterStudyView>> {
  const textbook = await prisma.hiDocTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    include: { _count: { select: { chapters: true } } },
  });
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const chapters = await prisma.hiDocChapter.findMany({
    where: { textbookId: textbook.id },
    orderBy: { order: "asc" },
    include: { _count: { select: { knowledgePoints: true } } },
  });
  const chapterRow = chapters.find((row) => row.order === chapterOrder);
  if (!chapterRow) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在，请先识别或修正目录。" };
  }

  const knowledgePointRows = await prisma.hiDocKnowledgePoint.findMany({
    where: { chapterId: chapterRow.id },
    orderBy: { order: "asc" },
    include: { lesson: { select: { id: true } } },
  });
  const knowledgePoints: HiDocKnowledgePointStudySummary[] = knowledgePointRows.map((row) => ({
    ...toKnowledgePointView(row),
    hasLesson: row.lesson !== null,
  }));

  const chapter: HiDocChapterView = {
    id: chapterRow.id,
    order: chapterRow.order,
    title: chapterRow.title,
    pageStart: chapterRow.pageStart,
    pageEnd: chapterRow.pageEnd,
    source: chapterRow.source as HiDocChapterView["source"],
    status: chapterRow.status as HiDocChapterView["status"],
    knowledgePointCount: chapterRow._count.knowledgePoints,
  };

  const textbookView = toHiDocTextbookView(textbook, getHiDocActiveMonth());
  const note = await loadHiDocChapterNote(userId, chapterRow.id);

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

export async function getHiDocKnowledgePointStudy(
  userId: string,
  kpId: string,
): Promise<HiDocChapterServiceResult<HiDocKnowledgePointStudyView>> {
  const context = await loadHiDocKnowledgePointContext(userId, kpId);
  if (!context.ok) {
    return context;
  }
  const lesson = await loadHiDocLesson(kpId);
  const messages = await loadHiDocConversationMessages(userId, kpId);
  const highlights = await listHiDocHighlights(userId, kpId);
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