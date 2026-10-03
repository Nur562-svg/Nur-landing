import "server-only";

import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { MembershipTier } from "@/types/auth";
import type { ClewErrorCode, ClewShelf, ClewTextbookView } from "@/types/clew";
import { probeClewPdf } from "./pdf-text-layer";
import { readClewSource } from "./source-intake";
import { CLEW_DOCX_PAGE_COUNT_PLACEHOLDER, isClewDocx } from "./source-label";
import {
  CLEW_MAX_FILE_BYTES,
  CLEW_MAX_PAGE_COUNT,
  buildClewQuotaExceededMessage,
  computeClewQuota,
  getClewActiveMonth,
  getClewMonthlyTextbookLimit,
} from "./limits";
import { getClewStorage, type ClewStorageDriver } from "./storage";
import { buildClewStorageKey } from "./storage-key";
import { toClewTextbookView, type ClewTextbookRow } from "./textbook-view";

/**
 * Clew 教材服务（server-only）：上传 / 书架 / 删除 / 重新激活。
 * 名额仅当月有效；教材全部私有挂 userId，不进官方课程目录。
 * API 路由只做 thin adapter：这里返回结构化失败（status + code + 中文原因），路由原样映射。
 */

export type ClewServiceFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewServiceResult<T> = { ok: true; data: T } | ClewServiceFailure;

async function countMonthlyUsage(userId: string, month: string): Promise<number> {
  return prisma.clewTextbook.count({
    where: { userId, activeMonth: month, deletedAt: null },
  });
}

/** 事务内二次校验失败时抛出；与其它失败区分，避免误报 500。 */
class ClewQuotaExceededError extends Error {}

/** 书架快照：未删除教材（含冻结教材）+ 当月名额。 */
export async function getClewShelf(userId: string, tier: MembershipTier): Promise<ClewShelf> {
  const currentMonth = getClewActiveMonth();
  const rows = await prisma.clewTextbook.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { chapters: true } } },
  });
  const used = rows.filter((row) => row.activeMonth === currentMonth).length;
  return {
    textbooks: rows.map((row) => toClewTextbookView(row, currentMonth)),
    quota: computeClewQuota(used, tier, currentMonth),
  };
}

/** 尽力删除存储对象：失败只记录日志，不改变业务结论（名额由数据库记录决定）。 */
async function removeStoredObjectQuietly(
  storage: ClewStorageDriver,
  storageKey: string,
): Promise<void> {
  try {
    await storage.removeObject(storageKey);
  } catch (error) {
    console.error(`[clew] 存储对象删除失败：${storageKey}`, error);
  }
}

export type ClewUploadInput = {
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
export async function uploadClewTextbook(
  input: ClewUploadInput,
): Promise<ClewServiceResult<{ textbook: ClewTextbookView }>> {
  const { userId, tier, bytes } = input;
  const fileName = input.fileName.trim();
  // 注意：pdfjs 探测会 transfer/detach 传入的 ArrayBuffer，字节数必须在探测前固定下来。
  const sizeBytes = bytes.byteLength;

  const docx = isClewDocx(fileName);
  const pdf = fileName.toLowerCase().endsWith(".pdf");
  if (!docx && !pdf) {
    const refused = await readClewSource(fileName, bytes.slice());
    return {
      ok: false,
      status: 422,
      code: refused.ok ? "invalid-file" : refused.code,
      message: refused.ok ? "只接受文字版 PDF（.pdf）或 Word（.docx）。" : refused.message,
    };
  }
  if (sizeBytes === 0) {
    return { ok: false, status: 422, code: "invalid-file", message: "上传的文件是空的。" };
  }
  if (sizeBytes > CLEW_MAX_FILE_BYTES) {
    const limitMb = Math.round(CLEW_MAX_FILE_BYTES / (1024 * 1024));
    const actualMb = (sizeBytes / (1024 * 1024)).toFixed(1);
    return {
      ok: false,
      status: 413,
      code: "file-too-large",
      message: `单本教材不能超过 ${limitMb} MB（当前 ${actualMb} MB）。`,
    };
  }

  const currentMonth = getClewActiveMonth();
  const limit = getClewMonthlyTextbookLimit(tier);
  const usedBefore = await countMonthlyUsage(userId, currentMonth);
  if (usedBefore >= limit) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: buildClewQuotaExceededMessage(usedBefore, limit),
    };
  }

  let storage: ClewStorageDriver;
  try {
    storage = getClewStorage();
  } catch (error) {
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: error instanceof Error ? error.message : "教材存储暂时不可用。",
    };
  }

  const textbookId = randomUUID();
  const storageKey = buildClewStorageKey(userId, textbookId, fileName);
  // mammoth/pdfjs may detach the buffer they receive. Keep an independent copy for DOCX.
  const docxBytes = docx ? bytes.slice() : null;
  try {
    await storage.putObject(storageKey, bytes);
  } catch (error) {
    console.error("[clew] 教材写入存储失败", error);
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: "教材存储暂时不可用，请稍后重试；本次未占用名额。",
    };
  }

  let pageCount = CLEW_DOCX_PAGE_COUNT_PLACEHOLDER;
  let hasTextLayer = true;
  if (docx) {
    const read = await readClewSource(fileName, docxBytes ?? bytes.slice());
    if (!read.ok) {
      await removeStoredObjectQuietly(storage, storageKey);
      return { ok: false, status: 422, code: read.code, message: read.message };
    }
  } else {
    const probe = await probeClewPdf(bytes);
    if (!probe.ok) {
      await removeStoredObjectQuietly(storage, storageKey);
      if (probe.code === "probe-unavailable") {
        return { ok: false, status: 500, code: "server-error", message: probe.message };
      }
      return { ok: false, status: 422, code: "pdf-unreadable", message: probe.message };
    }
    if (probe.pageCount > CLEW_MAX_PAGE_COUNT) {
      await removeStoredObjectQuietly(storage, storageKey);
      return {
        ok: false,
        status: 422,
        code: "page-limit",
        message: `PDF 共 ${probe.pageCount} 页，超过单本 ${CLEW_MAX_PAGE_COUNT} 页上限；请拆分后上传。`,
      };
    }
    if (!probe.hasTextLayer) {
      await removeStoredObjectQuietly(storage, storageKey);
      return {
        ok: false,
        status: 422,
        code: "unsupported-scan",
        message: "未检测到文字层：暂不支持扫描版 PDF。请上传带文字层的电子版 PDF 或 DOCX。",
      };
    }
    pageCount = probe.pageCount;
    hasTextLayer = probe.hasTextLayer;
  }

  const title = input.title?.trim() || fileName.replace(/\.(pdf|docx)$/i, "");

  let created: ClewTextbookRow;
  try {
    created = await prisma.$transaction(async (tx) => {
      const usedNow = await tx.clewTextbook.count({
        where: { userId, activeMonth: currentMonth, deletedAt: null },
      });
      if (usedNow >= limit) {
        throw new ClewQuotaExceededError(buildClewQuotaExceededMessage(usedNow, limit));
      }
      return tx.clewTextbook.create({
        data: {
          id: textbookId,
          userId,
          title,
          fileName,
          storageKey,
          sizeBytes,
          pageCount,
          hasTextLayer,
          status: "uploaded",
          activeMonth: currentMonth,
        },
      });
    });
  } catch (error) {
    await removeStoredObjectQuietly(storage, storageKey);
    if (error instanceof ClewQuotaExceededError) {
      return { ok: false, status: 503, code: "quota-exceeded", message: error.message };
    }
    console.error("[clew] 教材落库失败", error);
    return { ok: false, status: 500, code: "server-error", message: "教材保存失败，请稍后重试；本次未占用名额。" };
  }

  return {
    ok: true,
    data: { textbook: toClewTextbookView({ ...created, _count: { chapters: 0 } }, currentMonth) },
  };
}

/**
 * 删除教材（软删除墓碑 + 删除服务器文件）：释放当月名额。
 */
export async function deleteClewTextbook(
  userId: string,
  textbookId: string,
): Promise<ClewServiceResult<{ deletedId: string }>> {
  const row = await prisma.clewTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    select: { id: true, storageKey: true },
  });
  if (!row) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  await prisma.clewTextbook.update({
    where: { id: row.id },
    data: { deletedAt: new Date() },
  });

  // 隐私优先：记录保留为墓碑（名额/审计），服务器文件立即删除。
  try {
    const storage = getClewStorage();
    await removeStoredObjectQuietly(storage, row.storageKey);
  } catch (error) {
    console.error("[clew] 删除教材时存储不可用", error);
  }

  return { ok: true, data: { deletedId: row.id } };
}

/**
 * 冻结教材重新激活：占用当月名额；名额不足返回 503。
 */
export async function activateClewTextbook(
  userId: string,
  tier: MembershipTier,
  textbookId: string,
): Promise<ClewServiceResult<{ textbook: ClewTextbookView }>> {
  const currentMonth = getClewActiveMonth();
  const row = await prisma.clewTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    include: { _count: { select: { chapters: true } } },
  });
  if (!row) {
    return { ok: false, status: 404, code: "not-found", message: "教材不存在或已删除。" };
  }

  const limit = getClewMonthlyTextbookLimit(tier);
  if (row.activeMonth !== currentMonth) {
    const used = await countMonthlyUsage(userId, currentMonth);
    if (used >= limit) {
      return {
        ok: false,
        status: 503,
        code: "quota-exceeded",
        message: buildClewQuotaExceededMessage(used, limit),
      };
    }
    await prisma.clewTextbook.update({
      where: { id: row.id },
      data: { activeMonth: currentMonth },
    });
  }

  return {
    ok: true,
    data: { textbook: toClewTextbookView({ ...row, activeMonth: currentMonth }, currentMonth) },
  };
}