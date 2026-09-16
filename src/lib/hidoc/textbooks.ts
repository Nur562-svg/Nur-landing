import "server-only";

import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { MembershipTier } from "@/types/auth";
import type { HiDocErrorCode, HiDocShelf, HiDocTextbookView } from "@/types/hidoc";
import { probeHiDocPdf } from "./pdf-text-layer";
import {
  HIDOC_MAX_FILE_BYTES,
  HIDOC_MAX_PAGE_COUNT,
  buildHiDocQuotaExceededMessage,
  computeHiDocQuota,
  getHiDocActiveMonth,
  getHiDocMonthlyTextbookLimit,
  isHiDocTextbookFrozen,
} from "./limits";
import { getHiDocStorage, type HiDocStorageDriver } from "./storage";
import { buildHiDocStorageKey } from "./storage-key";

/**
 * Hi doc 教材服务（server-only）：上传 / 书架 / 删除 / 重新激活。
 * 名额仅当月有效；教材全部私有挂 userId，不进官方课程目录。
 * API 路由只做 thin adapter：这里返回结构化失败（status + code + 中文原因），路由原样映射。
 */

export type HiDocServiceFailure = {
  ok: false;
  status: number;
  code: HiDocErrorCode;
  message: string;
};

export type HiDocServiceResult<T> = { ok: true; data: T } | HiDocServiceFailure;

type HiDocTextbookRow = {
  id: string;
  title: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: string;
  activeMonth: string;
  createdAt: Date;
};

function toTextbookView(row: HiDocTextbookRow, currentMonth: string): HiDocTextbookView {
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
    createdAt: row.createdAt.toISOString(),
  };
}

async function countMonthlyUsage(userId: string, month: string): Promise<number> {
  return prisma.hiDocTextbook.count({
    where: { userId, activeMonth: month, deletedAt: null },
  });
}

/** 事务内二次校验失败时抛出；与其它失败区分，避免误报 500。 */
class HiDocQuotaExceededError extends Error {}

/** 书架快照：未删除教材（含冻结教材）+ 当月名额。 */
export async function getHiDocShelf(userId: string, tier: MembershipTier): Promise<HiDocShelf> {
  const currentMonth = getHiDocActiveMonth();
  const rows = await prisma.hiDocTextbook.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  const used = rows.filter((row) => row.activeMonth === currentMonth).length;
  return {
    textbooks: rows.map((row) => toTextbookView(row, currentMonth)),
    quota: computeHiDocQuota(used, tier, currentMonth),
  };
}

/** 尽力删除存储对象：失败只记录日志，不改变业务结论（名额由数据库记录决定）。 */
async function removeStoredObjectQuietly(
  storage: HiDocStorageDriver,
  storageKey: string,
): Promise<void> {
  try {
    await storage.removeObject(storageKey);
  } catch (error) {
    console.error(`[hidoc] 存储对象删除失败：${storageKey}`, error);
  }
}

export type HiDocUploadInput = {
  userId: string;
  tier: MembershipTier;
  fileName: string;
  title?: string;
  bytes: Uint8Array;
};

/**
 * 上传教材：校验格式/大小/页数/文字层 → 落盘 → 落库（事务内二次校验名额）。
 * 任何一步失败都清理已写入的文件，绝不静默放行。
 */
export async function uploadHiDocTextbook(
  input: HiDocUploadInput,
): Promise<HiDocServiceResult<{ textbook: HiDocTextbookView }>> {
  const { userId, tier, bytes } = input;
  const fileName = input.fileName.trim();
  // 注意：pdfjs 探测会 transfer/detach 传入的 ArrayBuffer，字节数必须在探测前固定下来。
  const sizeBytes = bytes.byteLength;

  if (!fileName.toLowerCase().endsWith(".pdf")) {
    return {
      ok: false,
      status: 422,
      code: "invalid-file",
      message: "目前只支持文字版 PDF（.pdf）；Word 与图片教材在课题工作坊（M6）开放。",
    };
  }
  if (sizeBytes === 0) {
    return { ok: false, status: 422, code: "invalid-file", message: "上传的 PDF 是空文件。" };
  }
  if (sizeBytes > HIDOC_MAX_FILE_BYTES) {
    const limitMb = Math.round(HIDOC_MAX_FILE_BYTES / (1024 * 1024));
    const actualMb = (sizeBytes / (1024 * 1024)).toFixed(1);
    return {
      ok: false,
      status: 413,
      code: "file-too-large",
      message: `单本教材不能超过 ${limitMb} MB（当前 ${actualMb} MB）。`,
    };
  }

  const currentMonth = getHiDocActiveMonth();
  const limit = getHiDocMonthlyTextbookLimit(tier);
  const usedBefore = await countMonthlyUsage(userId, currentMonth);
  if (usedBefore >= limit) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: buildHiDocQuotaExceededMessage(usedBefore, limit),
    };
  }

  let storage: HiDocStorageDriver;
  try {
    storage = getHiDocStorage();
  } catch (error) {
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: error instanceof Error ? error.message : "教材存储暂时不可用。",
    };
  }

  const textbookId = randomUUID();
  const storageKey = buildHiDocStorageKey(userId, textbookId, fileName);
  try {
    await storage.putObject(storageKey, bytes);
  } catch (error) {
    console.error("[hidoc] 教材写入存储失败", error);
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: "教材存储暂时不可用，请稍后重试；本次未占用名额。",
    };
  }

  const probe = await probeHiDocPdf(bytes);
  if (!probe.ok) {
    await removeStoredObjectQuietly(storage, storageKey);
    if (probe.code === "probe-unavailable") {
      // 基础设施问题，不误报成用户文件问题
      return { ok: false, status: 500, code: "server-error", message: probe.message };
    }
    return { ok: false, status: 422, code: "pdf-unreadable", message: probe.message };
  }
  if (probe.pageCount > HIDOC_MAX_PAGE_COUNT) {
    await removeStoredObjectQuietly(storage, storageKey);
    return {
      ok: false,
      status: 422,
      code: "page-limit",
      message: `PDF 共 ${probe.pageCount} 页，超过单本 ${HIDOC_MAX_PAGE_COUNT} 页上限；请拆分后上传。`,
    };
  }
  if (!probe.hasTextLayer) {
    await removeStoredObjectQuietly(storage, storageKey);
    return {
      ok: false,
      status: 422,
      code: "unsupported-scan",
      message: "未检测到文字层：暂不支持扫描版 PDF。请上传带文字层的电子版 PDF（扫描件 OCR 后续开放）。",
    };
  }

  const title = input.title?.trim() || fileName.replace(/\.pdf$/i, "");

  let created: HiDocTextbookRow;
  try {
    created = await prisma.$transaction(async (tx) => {
      const usedNow = await tx.hiDocTextbook.count({
        where: { userId, activeMonth: currentMonth, deletedAt: null },
      });
      if (usedNow >= limit) {
        throw new HiDocQuotaExceededError(buildHiDocQuotaExceededMessage(usedNow, limit));
      }
      return tx.hiDocTextbook.create({
        data: {
          id: textbookId,
          userId,
          title,
          fileName,
          storageKey,
          sizeBytes,
          pageCount: probe.pageCount,
          hasTextLayer: probe.hasTextLayer,
          status: "uploaded",
          activeMonth: currentMonth,
        },
      });
    });
  } catch (error) {
    await removeStoredObjectQuietly(storage, storageKey);
    if (error instanceof HiDocQuotaExceededError) {
      return { ok: false, status: 503, code: "quota-exceeded", message: error.message };
    }
    console.error("[hidoc] 教材落库失败", error);
    return { ok: false, status: 500, code: "server-error", message: "教材保存失败，请稍后重试；本次未占用名额。" };
  }

  return {
    ok: true,
    data: { textbook: toTextbookView(created, currentMonth) },
  };
}

/**
 * 删除教材（软删除墓碑 + 删除服务器文件）：释放当月名额。
 */
export async function deleteHiDocTextbook(
  userId: string,
  textbookId: string,
): Promise<HiDocServiceResult<{ deletedId: string }>> {
  const row = await prisma.hiDocTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    select: { id: true, storageKey: true },
  });
  if (!row) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  await prisma.hiDocTextbook.update({
    where: { id: row.id },
    data: { deletedAt: new Date() },
  });

  // 隐私优先：记录保留为墓碑（名额/审计），服务器文件立即删除。
  try {
    const storage = getHiDocStorage();
    await removeStoredObjectQuietly(storage, row.storageKey);
  } catch (error) {
    console.error("[hidoc] 删除教材时存储不可用", error);
  }

  return { ok: true, data: { deletedId: row.id } };
}

/**
 * 冻结教材重新激活：占用当月名额；名额不足返回 503。
 */
export async function activateHiDocTextbook(
  userId: string,
  tier: MembershipTier,
  textbookId: string,
): Promise<HiDocServiceResult<{ textbook: HiDocTextbookView }>> {
  const currentMonth = getHiDocActiveMonth();
  const row = await prisma.hiDocTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
  });
  if (!row) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const limit = getHiDocMonthlyTextbookLimit(tier);
  if (row.activeMonth !== currentMonth) {
    const used = await countMonthlyUsage(userId, currentMonth);
    if (used >= limit) {
      return {
        ok: false,
        status: 503,
        code: "quota-exceeded",
        message: buildHiDocQuotaExceededMessage(used, limit),
      };
    }
    await prisma.hiDocTextbook.update({
      where: { id: row.id },
      data: { activeMonth: currentMonth },
    });
  }

  return {
    ok: true,
    data: { textbook: toTextbookView({ ...row, activeMonth: currentMonth }, currentMonth) },
  };
}