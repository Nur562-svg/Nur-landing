import "server-only";

import { prisma } from "@/lib/prisma";
import type { ClewChatMessage, ClewKnowledgePointView } from "@/types/clew";
import { parseClewChatMessages } from "./conversation";
import { toKnowledgePointView, type ClewChapterServiceResult } from "./chapters";
import { isClewDocx } from "./source-label";

/**
 * Clew 知识点上下文（server-only）：归属校验 + 章节/教材信息 + 同章知识点清单 + 对话读取。
 * 全部查询都从 userId 出发（教材 → 章节 → 知识点链路上校验私有归属），不信任客户端传入的 id。
 */

export type ClewKnowledgePointContext = {
  knowledgePoint: ClewKnowledgePointView;
  chapter: {
    id: string;
    order: number;
    title: string;
    pageStart: number;
    pageEnd: number;
  };
  textbook: {
    id: string;
    title: string;
    pageCount: number;
    storageKey: string;
    fileName: string;
  };
};

export async function loadClewKnowledgePointContext(
  userId: string,
  kpId: string,
): Promise<ClewChapterServiceResult<ClewKnowledgePointContext>> {
  const row = await prisma.clewKnowledgePoint.findFirst({
    where: {
      id: kpId,
      chapter: { textbook: { userId, deletedAt: null } },
    },
    include: { chapter: { include: { textbook: true } } },
  });
  if (!row) {
    return { ok: false, status: 404, code: "not-found", message: "知识点不存在或不属于当前账户。" };
  }
  return {
    ok: true,
    data: {
      knowledgePoint: toKnowledgePointView(row),
      chapter: {
        id: row.chapter.id,
        order: row.chapter.order,
        title: row.chapter.title,
        pageStart: row.chapter.pageStart,
        pageEnd: row.chapter.pageEnd,
      },
      textbook: {
        id: row.chapter.textbook.id,
        title: row.chapter.textbook.title,
        pageCount: row.chapter.textbook.pageCount,
        storageKey: row.chapter.textbook.storageKey,
        fileName: row.chapter.textbook.fileName,
      },
    },
  };
}

/** 同章已萃取知识点标题（按序），供对话上下文列出本章结构。 */
export async function listChapterKnowledgePointTitles(chapterId: string): Promise<string[]> {
  const rows = await prisma.clewKnowledgePoint.findMany({
    where: { chapterId },
    orderBy: { order: "asc" },
    select: { title: true },
  });
  return rows.map((row) => row.title);
}

/**
 * ZCODE-M6 补遗：DOCX 知识点的人工页码标注（KP 级，「有页码用页码、没有的人工标」）。
 * - 仅 DOCX 教材可标注（PDF 已有文字层页码，人工猜测页只会降低溯源可信度——明确拒绝）；
 * - page = null 清除标注（保留现有 sourcePage 数值，仅回落「页码待确认」显示）；
 * - 标注页是「学生声明的出处」：练习题盖章引用、界面显示「你标注的」，不做文本级核验。
 */
export async function annotateClewKpSourcePage(
  userId: string,
  kpId: string,
  page: number | null,
): Promise<{ ok: true; sourcePage: number; sourcePageAnnotated: boolean } | { ok: false; status: number; message: string }> {
  const kp = await prisma.clewKnowledgePoint.findFirst({
    where: { id: kpId, chapter: { textbook: { userId, deletedAt: null } } },
    select: { id: true, sourcePage: true, chapter: { select: { textbook: { select: { fileName: true } } } } },
  });
  if (!kp) {
    return { ok: false, status: 404, message: "知识点不存在或教材已删除。" };
  }
  if (!isClewDocx(kp.chapter.textbook.fileName)) {
    return {
      ok: false,
      status: 400,
      message: "该教材有文字层页码（PDF），页码自动溯源，无需也无法人工标注。",
    };
  }
  if (page === null) {
    const updated = await prisma.clewKnowledgePoint.update({
      where: { id: kp.id },
      data: { sourcePageAnnotated: false },
      select: { sourcePage: true, sourcePageAnnotated: true },
    });
    return { ok: true, sourcePage: updated.sourcePage, sourcePageAnnotated: updated.sourcePageAnnotated };
  }
  if (!Number.isInteger(page) || page < 1 || page > 5000) {
    return { ok: false, status: 400, message: "页码需要是 1–5000 的整数。" };
  }
  const updated = await prisma.clewKnowledgePoint.update({
    where: { id: kp.id },
    data: { sourcePage: page, sourcePageAnnotated: true },
    select: { sourcePage: true, sourcePageAnnotated: true },
  });
  return { ok: true, sourcePage: updated.sourcePage, sourcePageAnnotated: updated.sourcePageAnnotated };
}

/** 读取该用户在某知识点下的对话历史（Json 列按不可信输入解析）。 */
export async function loadClewConversationMessages(
  userId: string,
  kpId: string,
): Promise<ClewChatMessage[]> {
  const row = await prisma.clewConversation.findFirst({
    where: { userId, kpId },
    select: { messages: true },
  });
  return parseClewChatMessages(row?.messages);
}

/** 覆盖写入对话消息（每个用户每个知识点一行）。 */
export async function saveClewConversationMessages(
  userId: string,
  kpId: string,
  messages: readonly ClewChatMessage[],
): Promise<void> {
  await prisma.clewConversation.upsert({
    where: { userId_kpId: { userId, kpId } },
    create: { userId, kpId, messages: [...messages] },
    update: { messages: [...messages] },
  });
}