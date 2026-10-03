import "server-only";

import { prisma } from "@/lib/prisma";
import { isLoopProfileId, LOOP_PROFILES, type LoopProfileId } from "@/types/loop-profile";
import type {
  ClewChapterSource,
  ClewChapterStatus,
  ClewChapterView,
  ClewErrorCode,
  ClewKnowledgePointView,
  ClewTextbookDetail,
  ClewTocRecognitionView,
} from "@/types/clew";
import { validateManualChapters, type ClewChapterDraft } from "./toc-heuristic";
import type { ClewKnowledgePointDraft } from "./extraction-heuristic";
import { getClewActiveMonth } from "./limits";
import { toClewTextbookView, tocStrategyWhitelist, type ClewTextbookRow } from "./textbook-view";

/**
 * Clew 章节服务（server-only）：识别结果落库、手动修正、详情读取、知识点落库与读取。
 * 章节页码是 PDF 页序（1 起）；来源与识别元信息都如实保存，不伪造。
 */

export type ClewChapterServiceFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewChapterServiceResult<T> = { ok: true; data: T } | ClewChapterServiceFailure;

type ClewChapterRow = {
  id: string;
  order: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  source: string;
  status: string;
};

type ClewChapterRowWithCount = ClewChapterRow & {
  _count: { knowledgePoints: number };
};

function toChapterView(row: ClewChapterRowWithCount): ClewChapterView {
  return {
    id: row.id,
    order: row.order,
    title: row.title,
    pageStart: row.pageStart,
    pageEnd: row.pageEnd,
    source: row.source as ClewChapterSource,
    status: row.status as ClewChapterStatus,
    knowledgePointCount: row._count.knowledgePoints,
  };
}

/** 知识点数据库行 → 对外视图（M4 讲义/对话模块共用；loopProfileId 非法值回退 full-loop）。 */
export function toKnowledgePointView(row: {
  id: string;
  order: number;
  title: string;
  description: string;
  keyTerms: unknown;
  prerequisites: unknown;
  sourcePage: number;
  loopProfileId?: string | null;
}): ClewKnowledgePointView {
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
    loopProfileId: isLoopProfileId(row.loopProfileId ?? "") ? (row.loopProfileId as LoopProfileId) : "full-loop",
  };
}

async function loadOwnedTextbook(
  userId: string,
  textbookId: string,
): Promise<ClewTextbookRow | null> {
  return prisma.clewTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    include: { _count: { select: { chapters: true } } },
  });
}

async function loadChapters(textbookId: string): Promise<ClewChapterView[]> {
  const rows = await prisma.clewChapter.findMany({
    where: { textbookId },
    orderBy: { order: "asc" },
    include: { _count: { select: { knowledgePoints: true } } },
  });
  return rows.map((row) => toChapterView(row));
}

/** 教材详情：教材（含章节数/识别元信息）+ 章节树。 */
export async function getClewTextbookDetail(
  userId: string,
  textbookId: string,
): Promise<ClewChapterServiceResult<ClewTextbookDetail>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  const chapters = await loadChapters(textbook.id);
  return {
    ok: true,
    data: {
      textbook: toClewTextbookView(textbook, getClewActiveMonth()),
      chapters,
    },
  };
}

/** 用识别结果整体替换章节（事务内），并写入识别元信息与教材状态。 */
export async function saveRecognizedChapters(
  userId: string,
  textbookId: string,
  chapters: readonly ClewChapterDraft[],
  recognition: { strategy: ClewTocRecognitionView["strategy"]; notes: string[]; source: ClewChapterSource },
): Promise<ClewChapterServiceResult<ClewTextbookDetail>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const recognizedAt = new Date();
  const recognitionView: ClewTocRecognitionView = {
    strategy: recognition.strategy,
    chapterCount: chapters.length,
    notes: recognition.notes,
    recognizedAt: recognizedAt.toISOString(),
  };

  await prisma.$transaction(async (tx) => {
    await tx.clewChapter.deleteMany({ where: { textbookId: textbook.id } });
    await tx.clewChapter.createMany({
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
    await tx.clewTextbook.update({
      where: { id: textbook.id },
      data: {
        status: "toc_ready",
        toc: recognitionView,
      },
    });
  });

  const detail = await getClewTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    return detail;
  }
  return { ok: true, data: detail.data };
}

/**
 * 手动章节写入的共用事务：整体替换章节列表，并按 confirmed 决定是否盖章节结构确认章。
 * confirmed=false（手动修正）：结构变了，既有确认作废（新视图不携带 spineConfirmedAt）。
 * confirmed=true（SpineEditor 确认）：保存结构并写入 spineConfirmedAt，允许萃取。
 * 与现有条目完全相同的行保留原来源；被改动或新增的行标为 manual（不覆盖识别来源的诚实标注）。
 */
async function writeManualChapters(
  userId: string,
  textbookId: string,
  rawChapters: unknown,
  confirmed: boolean,
): Promise<ClewChapterServiceResult<ClewTextbookDetail>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const validated = validateManualChapters(rawChapters, textbook.pageCount);
  if (!validated.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: validated.message };
  }

  const existing = await prisma.clewChapter.findMany({
    where: { textbookId: textbook.id },
    orderBy: { order: "asc" },
  });
  const existingKey = new Map<string, string>();
  for (const row of existing) {
    existingKey.set(`${row.pageStart}::${row.pageEnd}::${row.title}`, row.source);
  }

  const previousToc = (textbook.toc ?? null) as ClewTocRecognitionView | null;
  // ZCODE-M3 Phase 0：历史 toc.strategy 可能是白名单外值（不可信 JSON），回落 "none" 不原样透传，
  // 否则非法值会让 recognition 永久解析为 null 且确认流程无法自愈。
  const previousStrategy: ClewTocRecognitionView["strategy"] =
    previousToc && tocStrategyWhitelist.includes(previousToc.strategy)
      ? previousToc.strategy
      : "none";
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.clewChapter.deleteMany({ where: { textbookId: textbook.id } });
    await tx.clewChapter.createMany({
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
    await tx.clewTextbook.update({
      where: { id: textbook.id },
      data: {
        status: "toc_ready",
        toc: {
          strategy: previousStrategy,
          chapterCount: validated.chapters.length,
          notes: [
            ...(previousToc?.notes ?? []),
            confirmed
              ? `人工确认章节结构于 ${now.toISOString()}：共 ${validated.chapters.length} 章。`
              : `人工修正于 ${now.toISOString()}：共 ${validated.chapters.length} 章。`,
          ],
          recognizedAt: previousToc?.recognizedAt ?? now.toISOString(),
          spineConfirmedAt: confirmed ? now.toISOString() : null,
        },
      },
    });
  });

  const detail = await getClewTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    return detail;
  }
  return { ok: true, data: detail.data };
}

/** 手动修正：整体替换章节列表；任何结构改动都会作废既有确认。 */
export function replaceChaptersManually(
  userId: string,
  textbookId: string,
  rawChapters: unknown,
): Promise<ClewChapterServiceResult<ClewTextbookDetail>> {
  return writeManualChapters(userId, textbookId, rawChapters, false);
}

/**
 * SpineEditor 确认：校验并保存用户确认后的章节结构，盖 spineConfirmedAt。
 * 只有确认过的结构才允许进入知识点萃取（extraction.ts 服务端强制）。
 */
export function confirmClewTocStructure(
  userId: string,
  textbookId: string,
  rawChapters: unknown,
): Promise<ClewChapterServiceResult<ClewTextbookDetail>> {
  return writeManualChapters(userId, textbookId, rawChapters, true);
}
/** 读取单章知识点（供详情页展开列表）。 */
export async function getChapterKnowledgePoints(
  userId: string,
  textbookId: string,
  chapterOrder: number,
): Promise<ClewChapterServiceResult<ClewKnowledgePointView[]>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  const chapter = await prisma.clewChapter.findFirst({
    where: { textbookId: textbook.id, order: chapterOrder },
    select: { id: true },
  });
  if (!chapter) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在。" };
  }
  const rows = await prisma.clewKnowledgePoint.findMany({
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
  knowledgePoints: readonly ClewKnowledgePointDraft[],
): Promise<ClewChapterServiceResult<ClewKnowledgePointView[]>> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }
  const chapter = await prisma.clewChapter.findFirst({
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
    await tx.clewKnowledgePoint.deleteMany({ where: { chapterId: chapter.id } });
    await tx.clewKnowledgePoint.createMany({
      data: valid.map((point, index) => ({
        chapterId: chapter.id,
        order: index + 1,
        title: point.title,
        description: point.description,
        keyTerms: point.keyTerms,
        prerequisites: point.prerequisites,
        sourcePage: point.sourcePage,
        loopProfileId: isLoopProfileId(point.loopProfileId ?? "")
          ? (point.loopProfileId as LoopProfileId)
          : "concept-mastery",
        loopProfileAssignedBy: "ai-suggested",
      })),
    });
    await tx.clewChapter.update({
      where: { id: chapter.id },
      data: { status: "extracted" },
    });
  });

  const rows = await prisma.clewKnowledgePoint.findMany({
    where: { chapterId: chapter.id },
    orderBy: { order: "asc" },
  });

  return {
    ok: true,
    data: rows.map((row) => toKnowledgePointView(row)),
  };
}

/**
 * ZCODE-M2 失败隔离：把章节萃取状态标记为 failed（全书编译时单章失败不阻塞其他章）。
 * 单章萃取 API 的既有契约保持不变（失败不改状态可重试），本函数只服务编译管线。
 */
export async function markChapterExtractionFailed(
  userId: string,
  textbookId: string,
  chapterId: string,
  message: string,
): Promise<void> {
  const textbook = await loadOwnedTextbook(userId, textbookId);
  if (!textbook) {
    return;
  }
  await prisma.clewChapter.updateMany({
    where: { id: chapterId, textbookId: textbook.id },
    data: { status: "failed" },
  });
  await prisma.eventLog.create({
    data: {
      event: "clew_chapter_extract_failed",
      userId,
      props: { textbookId, chapterId, message: message.slice(0, 500) },
    },
  });
}

/**
 * ZCODE-M2 Phase 3: 用户切换知识点的 LoopProfile（AI 建议只是默认，用户永远可改）。
 * 校验归属（kp → chapter → textbook → userId）与 profileId 合法性后写入 user-selected。
 */
export async function updateClewKnowledgePointLoopProfile(
  userId: string,
  kpId: string,
  rawProfileId: string,
): Promise<ClewChapterServiceResult<{ kpId: string; loopProfileId: LoopProfileId; assignedBy: "user-selected" }>> {
  if (!isLoopProfileId(rawProfileId) || !LOOP_PROFILES[rawProfileId]) {
    return { ok: false, status: 400, code: "invalid-request", message: "未注册的学习闭环类型。" };
  }
  const profileId = rawProfileId as LoopProfileId;

  const kp = await prisma.clewKnowledgePoint.findFirst({
    where: { id: kpId, chapter: { textbook: { userId, deletedAt: null } } },
    select: { id: true },
  });
  if (!kp) {
    return { ok: false, status: 404, code: "not-found", message: "知识点不存在或已删除。" };
  }

  await prisma.clewKnowledgePoint.update({
    where: { id: kp.id },
    data: { loopProfileId: profileId, loopProfileAssignedBy: "user-selected" },
  });

  return { ok: true, data: { kpId: kp.id, loopProfileId: profileId, assignedBy: "user-selected" } };
}
