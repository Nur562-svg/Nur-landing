import "server-only";

import { prisma } from "@/lib/prisma";
import type { HiDocChatMessage, HiDocKnowledgePointView } from "@/types/hidoc";
import { parseHiDocChatMessages } from "./conversation";
import { toKnowledgePointView, type HiDocChapterServiceResult } from "./chapters";

/**
 * Hi doc 知识点上下文（server-only）：归属校验 + 章节/教材信息 + 同章知识点清单 + 对话读取。
 * 全部查询都从 userId 出发（教材 → 章节 → 知识点链路上校验私有归属），不信任客户端传入的 id。
 */

export type HiDocKnowledgePointContext = {
  knowledgePoint: HiDocKnowledgePointView;
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

export async function loadHiDocKnowledgePointContext(
  userId: string,
  kpId: string,
): Promise<HiDocChapterServiceResult<HiDocKnowledgePointContext>> {
  const row = await prisma.hiDocKnowledgePoint.findFirst({
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
  const rows = await prisma.hiDocKnowledgePoint.findMany({
    where: { chapterId },
    orderBy: { order: "asc" },
    select: { title: true },
  });
  return rows.map((row) => row.title);
}

/** 读取该用户在某知识点下的对话历史（Json 列按不可信输入解析）。 */
export async function loadHiDocConversationMessages(
  userId: string,
  kpId: string,
): Promise<HiDocChatMessage[]> {
  const row = await prisma.hiDocConversation.findFirst({
    where: { userId, kpId },
    select: { messages: true },
  });
  return parseHiDocChatMessages(row?.messages);
}

/** 覆盖写入对话消息（每个用户每个知识点一行）。 */
export async function saveHiDocConversationMessages(
  userId: string,
  kpId: string,
  messages: readonly HiDocChatMessage[],
): Promise<void> {
  await prisma.hiDocConversation.upsert({
    where: { userId_kpId: { userId, kpId } },
    create: { userId, kpId, messages: [...messages] },
    update: { messages: [...messages] },
  });
}