import "server-only";

import { prisma } from "@/lib/prisma";
import type { ClewHighlightView } from "@/types/clew";
import type { ClewChapterServiceResult } from "./chapters";
import {
  CLEW_HIGHLIGHT_MAX_PER_KP,
  CLEW_HIGHLIGHT_NOT_FOUND_MESSAGE,
  buildClewHighlightLimitMessage,
  parseClewHighlightAnchor,
  parseClewHighlightColor,
  validateClewHighlightInput,
  validateClewHighlightPatch,
} from "./highlight-rules";
import { loadClewKnowledgePointContext } from "./knowledge-points";

/**
 * Clew 划重点/批注服务（server-only）。
 * 归属链一律从 userId 出发（教材 → 章节 → 知识点）校验，不信任客户端传入的 id；
 * anchor 存服务端读取的当前讲义版本（不信任客户端），讲义重新生成后旧划线如实进入「未定位」。
 */

type ClewHighlightRow = {
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
export function toClewHighlightView(row: ClewHighlightRow): ClewHighlightView {
  return {
    id: row.id,
    kpId: row.kpId,
    quote: row.quote,
    prefix: row.prefix,
    suffix: row.suffix,
    color: parseClewHighlightColor(row.color) ?? "amber",
    note: row.note && row.note.length > 0 ? row.note : null,
    anchorLessonUpdatedAt: parseClewHighlightAnchor(row.anchor).lessonUpdatedAt,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** 某知识点下当前用户的划重点（按创建时间升序）。 */
export async function listClewHighlights(
  userId: string,
  kpId: string,
): Promise<ClewHighlightView[]> {
  const rows = await prisma.clewHighlight.findMany({
    where: { userId, kpId },
    orderBy: { createdAt: "asc" },
  });
  return rows.map((row) => toClewHighlightView(row));
}

/** 多个知识点 → 各知识点划重点（学霸笔记聚合用）。 */
export async function loadClewHighlightsByKnowledgePoint(
  userId: string,
  kpIds: readonly string[],
): Promise<Map<string, ClewHighlightView[]>> {
  if (kpIds.length === 0) {
    return new Map();
  }
  const rows = await prisma.clewHighlight.findMany({
    where: { userId, kpId: { in: [...kpIds] } },
    orderBy: { createdAt: "asc" },
  });
  const grouped = new Map<string, ClewHighlightView[]>();
  for (const row of rows) {
    const view = toClewHighlightView(row);
    const list = grouped.get(view.kpId);
    if (list) {
      list.push(view);
    } else {
      grouped.set(view.kpId, [view]);
    }
  }
  return grouped;
}

export type ClewHighlightCreateInput = {
  userId: string;
  kpId: string;
  quote: unknown;
  prefix: unknown;
  suffix: unknown;
  color: unknown;
  note: unknown;
};

export async function createClewHighlight(
  input: ClewHighlightCreateInput,
): Promise<ClewChapterServiceResult<ClewHighlightView>> {
  const context = await loadClewKnowledgePointContext(input.userId, input.kpId);
  if (!context.ok) {
    return context;
  }

  const validated = validateClewHighlightInput({
    quote: input.quote,
    prefix: input.prefix,
    suffix: input.suffix,
    color: input.color,
    note: input.note,
  });
  if (!validated.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: validated.reason };
  }

  const used = await prisma.clewHighlight.count({
    where: { userId: input.userId, kpId: input.kpId },
  });
  if (used >= CLEW_HIGHLIGHT_MAX_PER_KP) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: buildClewHighlightLimitMessage(),
    };
  }

  // 锚点由服务端读取当前讲义版本，客户端无法伪造
  const lesson = await prisma.clewLesson.findUnique({
    where: { kpId: input.kpId },
    select: { generatedAt: true },
  });

  const row = await prisma.clewHighlight.create({
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
  return { ok: true, data: toClewHighlightView(row) };
}

export type ClewHighlightUpdateInput = {
  userId: string;
  highlightId: string;
  color: unknown;
  note: unknown;
};

export async function updateClewHighlight(
  input: ClewHighlightUpdateInput,
): Promise<ClewChapterServiceResult<ClewHighlightView>> {
  const existing = await prisma.clewHighlight.findFirst({
    where: { id: input.highlightId, userId: input.userId },
  });
  if (!existing) {
    return { ok: false, status: 404, code: "not-found", message: CLEW_HIGHLIGHT_NOT_FOUND_MESSAGE };
  }

  const validated = validateClewHighlightPatch({ color: input.color, note: input.note });
  if (!validated.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: validated.reason };
  }

  const row = await prisma.clewHighlight.update({
    where: { id: existing.id },
    data: {
      ...(validated.value.color !== undefined ? { color: validated.value.color } : {}),
      ...(validated.value.note !== undefined ? { note: validated.value.note } : {}),
    },
  });
  return { ok: true, data: toClewHighlightView(row) };
}

export async function deleteClewHighlight(input: {
  userId: string;
  highlightId: string;
}): Promise<ClewChapterServiceResult<{ id: string }>> {
  const existing = await prisma.clewHighlight.findFirst({
    where: { id: input.highlightId, userId: input.userId },
    select: { id: true },
  });
  if (!existing) {
    return { ok: false, status: 404, code: "not-found", message: CLEW_HIGHLIGHT_NOT_FOUND_MESSAGE };
  }
  await prisma.clewHighlight.delete({ where: { id: existing.id } });
  return { ok: true, data: { id: existing.id } };
}