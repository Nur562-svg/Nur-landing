import "server-only";

import { prisma } from "@/lib/prisma";
import type { HiDocHighlightView } from "@/types/hidoc";
import type { HiDocChapterServiceResult } from "./chapters";
import {
  HIDOC_HIGHLIGHT_MAX_PER_KP,
  HIDOC_HIGHLIGHT_NOT_FOUND_MESSAGE,
  buildHiDocHighlightLimitMessage,
  parseHiDocHighlightAnchor,
  parseHiDocHighlightColor,
  validateHiDocHighlightInput,
  validateHiDocHighlightPatch,
} from "./highlight-rules";
import { loadHiDocKnowledgePointContext } from "./knowledge-points";

/**
 * Hi doc 划重点/批注服务（server-only）。
 * 归属链一律从 userId 出发（教材 → 章节 → 知识点）校验，不信任客户端传入的 id；
 * anchor 存服务端读取的当前讲义版本（不信任客户端），讲义重新生成后旧划线如实进入「未定位」。
 */

type HiDocHighlightRow = {
  id: string;
  kpId: string;
  quote: string;
  prefix: string;
  suffix: string;
  color: string;
  note: string | null;
  anchor: unknown;
  createdAt: Date;
  updatedAt: Date;
};

/** 划重点数据库行 → 对外视图（颜色/锚点按不可信输入解析）。 */
export function toHiDocHighlightView(row: HiDocHighlightRow): HiDocHighlightView {
  return {
    id: row.id,
    kpId: row.kpId,
    quote: row.quote,
    prefix: row.prefix,
    suffix: row.suffix,
    color: parseHiDocHighlightColor(row.color) ?? "amber",
    note: row.note && row.note.length > 0 ? row.note : null,
    anchorLessonUpdatedAt: parseHiDocHighlightAnchor(row.anchor).lessonUpdatedAt,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** 某知识点下当前用户的划重点（按创建时间升序）。 */
export async function listHiDocHighlights(
  userId: string,
  kpId: string,
): Promise<HiDocHighlightView[]> {
  const rows = await prisma.hiDocHighlight.findMany({
    where: { userId, kpId },
    orderBy: { createdAt: "asc" },
  });
  return rows.map((row) => toHiDocHighlightView(row));
}

/** 多个知识点 → 各知识点划重点（学霸笔记聚合用）。 */
export async function loadHiDocHighlightsByKnowledgePoint(
  userId: string,
  kpIds: readonly string[],
): Promise<Map<string, HiDocHighlightView[]>> {
  if (kpIds.length === 0) {
    return new Map();
  }
  const rows = await prisma.hiDocHighlight.findMany({
    where: { userId, kpId: { in: [...kpIds] } },
    orderBy: { createdAt: "asc" },
  });
  const grouped = new Map<string, HiDocHighlightView[]>();
  for (const row of rows) {
    const view = toHiDocHighlightView(row);
    const list = grouped.get(view.kpId);
    if (list) {
      list.push(view);
    } else {
      grouped.set(view.kpId, [view]);
    }
  }
  return grouped;
}

export type HiDocHighlightCreateInput = {
  userId: string;
  kpId: string;
  quote: unknown;
  prefix: unknown;
  suffix: unknown;
  color: unknown;
  note: unknown;
};

export async function createHiDocHighlight(
  input: HiDocHighlightCreateInput,
): Promise<HiDocChapterServiceResult<HiDocHighlightView>> {
  const context = await loadHiDocKnowledgePointContext(input.userId, input.kpId);
  if (!context.ok) {
    return context;
  }

  const validated = validateHiDocHighlightInput({
    quote: input.quote,
    prefix: input.prefix,
    suffix: input.suffix,
    color: input.color,
    note: input.note,
  });
  if (!validated.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: validated.reason };
  }

  const used = await prisma.hiDocHighlight.count({
    where: { userId: input.userId, kpId: input.kpId },
  });
  if (used >= HIDOC_HIGHLIGHT_MAX_PER_KP) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: buildHiDocHighlightLimitMessage(),
    };
  }

  // 锚点由服务端读取当前讲义版本，客户端无法伪造
  const lesson = await prisma.hiDocLesson.findUnique({
    where: { kpId: input.kpId },
    select: { generatedAt: true },
  });

  const row = await prisma.hiDocHighlight.create({
    data: {
      userId: input.userId,
      kpId: input.kpId,
      quote: validated.value.quote,
      prefix: validated.value.prefix,
      suffix: validated.value.suffix,
      color: validated.value.color,
      note: validated.value.note,
      anchor: { lessonUpdatedAt: lesson ? lesson.generatedAt.toISOString() : null },
    },
  });
  return { ok: true, data: toHiDocHighlightView(row) };
}

export type HiDocHighlightUpdateInput = {
  userId: string;
  highlightId: string;
  color: unknown;
  note: unknown;
};

export async function updateHiDocHighlight(
  input: HiDocHighlightUpdateInput,
): Promise<HiDocChapterServiceResult<HiDocHighlightView>> {
  const existing = await prisma.hiDocHighlight.findFirst({
    where: { id: input.highlightId, userId: input.userId },
  });
  if (!existing) {
    return { ok: false, status: 404, code: "not-found", message: HIDOC_HIGHLIGHT_NOT_FOUND_MESSAGE };
  }

  const validated = validateHiDocHighlightPatch({ color: input.color, note: input.note });
  if (!validated.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: validated.reason };
  }

  const row = await prisma.hiDocHighlight.update({
    where: { id: existing.id },
    data: {
      ...(validated.value.color !== undefined ? { color: validated.value.color } : {}),
      ...(validated.value.note !== undefined ? { note: validated.value.note } : {}),
    },
  });
  return { ok: true, data: toHiDocHighlightView(row) };
}

export async function deleteHiDocHighlight(input: {
  userId: string;
  highlightId: string;
}): Promise<HiDocChapterServiceResult<{ id: string }>> {
  const existing = await prisma.hiDocHighlight.findFirst({
    where: { id: input.highlightId, userId: input.userId },
    select: { id: true },
  });
  if (!existing) {
    return { ok: false, status: 404, code: "not-found", message: HIDOC_HIGHLIGHT_NOT_FOUND_MESSAGE };
  }
  await prisma.hiDocHighlight.delete({ where: { id: existing.id } });
  return { ok: true, data: { id: existing.id } };
}