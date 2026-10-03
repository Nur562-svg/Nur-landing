import "server-only";

import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { MembershipTier } from "@/types/auth";
import type {
  ClewChatMessage,
  ClewErrorCode,
  ClewWorkshopCitation,
  ClewWorkshopDetailView,
  ClewWorkshopFileView,
  ClewWorkshopLimitsView,
  ClewWorkshopListView,
  ClewWorkshopView,
} from "@/types/clew";
import { createClewChatProviderFromEnv } from "./chat-provider";
import { ClewProviderConfigError } from "./providers/model-config";
import { CLEW_CHAT_QUESTION_MAX_CHARS } from "./chat";
import {
  CLEW_CHAT_MESSAGE_MAX_CHARS,
  appendClewChatMessage,
  parseClewChatMessages,
} from "./conversation";
import { CLEW_MAX_FILE_BYTES } from "./limits";
import { openClewPdf, readClewPdfPageRange } from "./pdf-document";
import { probeClewPdf } from "./pdf-text-layer";
import { getClewStorage, type ClewStorageDriver } from "./storage";
import { buildClewWorkshopStorageKey } from "./storage-key";
import { pdfTextItemsToLines } from "./toc-heuristic";
import {
  buildClewWorkshopChatModelMessages,
  type ClewWorkshopChatContext,
} from "./workshop-chat-prompt";
import {
  CLEW_WORKSHOP_MAX_PAGE_COUNT,
  buildClewWorkshopFileLimitMessage,
  buildClewWorkshopLimitMessage,
  decodeClewWorkshopText,
  getClewWorkshopLimits,
  clewWorkshopTextPagesFromLines,
  validateClewWorkshopFileName,
  validateClewWorkshopNote,
  validateClewWorkshopTitle,
} from "./workshop-rules";
import {
  buildClewWorkshopNoHitAnswer,
  buildClewWorkshopPdfSegments,
  buildClewWorkshopTextSegments,
  matchClewWorkshopKnowledgePoints,
  searchClewWorkshopSegments,
  type ClewWorkshopSegment,
} from "./workshop-search";

/**
 * Clew M6 课题工作坊服务（server-only）：课题 CRUD、材料上传（≤100 页短材料）、检索答疑编排。
 * 全部数据私有挂 userId；归属校验一律从 userId 出发，不信任客户端传入的 id。
 * 工作坊材料不占教材当月名额；工作坊数量与单课题材料数按档位限制（workshop-rules.ts）。
 * 检索答疑无启发式兜底：检索不到即如实说「材料里没有相关内容」，无 key 明确报错。
 */

export type ClewWorkshopFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewWorkshopResult<T> = { ok: true; data: T } | ClewWorkshopFailure;

type ClewWorkshopRow = {
  id: string;
  title: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ClewWorkshopFileRow = {
  id: string;
  workshopId: string;
  fileName: string;
  storageKey: string;
  sizeBytes: number;
  pageCount: number;
  hasTextLayer: boolean;
  status: string;
  ocrStatus: string;
  failureReason: string | null;
  createdAt: Date;
};

function toClewWorkshopView(row: ClewWorkshopRow & { _count?: { files: number } }, fileCount?: number): ClewWorkshopView {
  return {
    id: row.id,
    title: row.title,
    note: row.note && row.note.length > 0 ? row.note : null,
    fileCount: fileCount ?? row._count?.files ?? 0,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toClewWorkshopFileView(row: ClewWorkshopFileRow): ClewWorkshopFileView {
  return {
    id: row.id,
    fileName: row.fileName,
    sizeBytes: row.sizeBytes,
    pageCount: row.pageCount,
    hasTextLayer: row.hasTextLayer,
    status: row.status === "ready" || row.status === "failed" ? row.status : "uploaded",
    ocrStatus: row.ocrStatus,
    failureReason: row.failureReason && row.failureReason.length > 0 ? row.failureReason : null,
    createdAt: row.createdAt.toISOString(),
  };
}

async function buildLimitsView(userId: string, tier: MembershipTier): Promise<ClewWorkshopLimitsView> {
  const limits = getClewWorkshopLimits(tier);
  const workshopUsed = await prisma.clewWorkshop.count({ where: { userId } });
  return {
    workshopUsed,
    workshopLimit: limits.workshops,
    filesPerWorkshopLimit: limits.filesPerWorkshop,
    maxPagesPerFile: CLEW_WORKSHOP_MAX_PAGE_COUNT,
  };
}

/** 课题列表 + 限额。 */
export async function listClewWorkshops(
  userId: string,
  tier: MembershipTier,
): Promise<ClewWorkshopListView> {
  const rows = await prisma.clewWorkshop.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { files: true } } },
  });
  return {
    workshops: rows.map((row) => toClewWorkshopView(row)),
    limits: await buildLimitsView(userId, tier),
  };
}

/** 读取课题归属（全部操作的第一道校验；越权一律 404，不泄漏存在性）。 */
async function loadOwnedWorkshop(
  userId: string,
  workshopId: string,
): Promise<ClewWorkshopRow | null> {
  return prisma.clewWorkshop.findFirst({ where: { id: workshopId, userId } });
}

export async function createClewWorkshop(input: {
  userId: string;
  tier: MembershipTier;
  title: unknown;
  note: unknown;
}): Promise<ClewWorkshopResult<ClewWorkshopListView>> {
  const title = validateClewWorkshopTitle(input.title);
  if (!title.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: title.reason };
  }
  const note = validateClewWorkshopNote(input.note);
  if (!note.ok) {
    return { ok: false, status: 400, code: "invalid-request", message: note.reason };
  }

  const limits = getClewWorkshopLimits(input.tier);
  const used = await prisma.clewWorkshop.count({ where: { userId: input.userId } });
  if (used >= limits.workshops) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: buildClewWorkshopLimitMessage(used, limits.workshops),
    };
  }

  await prisma.clewWorkshop.create({
    data: { userId: input.userId, title: title.value, note: note.value },
  });
  return { ok: true, data: await listClewWorkshops(input.userId, input.tier) };
}

export async function deleteClewWorkshop(
  userId: string,
  workshopId: string,
): Promise<ClewWorkshopResult<{ deletedId: string }>> {
  const workshop = await prisma.clewWorkshop.findFirst({
    where: { id: workshopId, userId },
    include: { files: { select: { storageKey: true } } },
  });
  if (!workshop) {
    return { ok: false, status: 404, code: "not-found", message: "课题不存在或不属于当前账户。" };
  }

  // 行删除（级联删除材料与对话行）；服务器文件随后尽力清理
  await prisma.clewWorkshop.delete({ where: { id: workshop.id } });

  try {
    const storage = getClewStorage();
    for (const file of workshop.files) {
      try {
        await storage.removeObject(file.storageKey);
      } catch (error) {
        console.error(`[clew] 课题材料删除失败：${file.storageKey}`, error);
      }
    }
  } catch (error) {
    console.error("[clew] 删除课题时存储不可用", error);
  }

  return { ok: true, data: { deletedId: workshop.id } };
}

/** 课题详情：材料清单 + 答疑对话历史 + 限额。 */
export async function getClewWorkshopDetail(
  userId: string,
  tier: MembershipTier,
  workshopId: string,
): Promise<ClewWorkshopResult<ClewWorkshopDetailView>> {
  const workshop = await prisma.clewWorkshop.findFirst({
    where: { id: workshopId, userId },
    include: {
      files: { orderBy: { createdAt: "asc" } },
      _count: { select: { files: true } },
    },
  });
  if (!workshop) {
    return { ok: false, status: 404, code: "not-found", message: "课题不存在或不属于当前账户。" };
  }

  const conversation = await prisma.clewConversation.findFirst({
    where: { userId, workshopId },
    select: { messages: true },
  });

  return {
    ok: true,
    data: {
      workshop: toClewWorkshopView(workshop),
      files: workshop.files.map((file) => toClewWorkshopFileView(file)),
      messages: parseClewChatMessages(conversation?.messages),
      limits: await buildLimitsView(userId, tier),
    },
  };
}

class ClewWorkshopQuotaExceededError extends Error {}

export type ClewWorkshopUploadInput = {
  userId: string;
  tier: MembershipTier;
  workshopId: string;
  fileName: string;
  bytes: Uint8Array;
};

/**
 * 上传课题材料：格式/大小/页数/文字层校验 → 落盘 → 落库（事务内二次校验材料数）。
 * 上传即检测：图片与无文字层 PDF 明确拒绝并给中文原因（OCR 后置），不落库、不留文件。
 */
export async function uploadClewWorkshopFile(
  input: ClewWorkshopUploadInput,
): Promise<ClewWorkshopResult<{ file: ClewWorkshopFileView }>> {
  const { userId, tier, bytes } = input;
  const fileName = input.fileName.trim();
  const sizeBytes = bytes.byteLength;

  const workshop = await loadOwnedWorkshop(userId, input.workshopId);
  if (!workshop) {
    return { ok: false, status: 404, code: "not-found", message: "课题不存在或不属于当前账户。" };
  }

  const kindResult = validateClewWorkshopFileName(fileName);
  if (!kindResult.ok) {
    return { ok: false, status: 422, code: "invalid-file", message: kindResult.reason };
  }
  if (sizeBytes === 0) {
    return { ok: false, status: 422, code: "invalid-file", message: "上传的是空文件。" };
  }
  if (sizeBytes > CLEW_MAX_FILE_BYTES) {
    const limitMb = Math.round(CLEW_MAX_FILE_BYTES / (1024 * 1024));
    const actualMb = (sizeBytes / (1024 * 1024)).toFixed(1);
    return {
      ok: false,
      status: 413,
      code: "file-too-large",
      message: `单份材料不能超过 ${limitMb} MB（当前 ${actualMb} MB）。`,
    };
  }

  const limits = getClewWorkshopLimits(tier);
  const usedBefore = await prisma.clewWorkshopFile.count({ where: { workshopId: workshop.id } });
  if (usedBefore >= limits.filesPerWorkshop) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: buildClewWorkshopFileLimitMessage(usedBefore, limits.filesPerWorkshop),
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
      message: error instanceof Error ? error.message : "材料存储暂时不可用。",
    };
  }

  const fileId = randomUUID();
  const storageKey = buildClewWorkshopStorageKey(userId, workshop.id, fileId, fileName);
  try {
    await storage.putObject(storageKey, bytes);
  } catch (error) {
    console.error("[clew] 课题材料写入存储失败", error);
    return {
      ok: false,
      status: 503,
      code: "storage-unavailable",
      message: "材料存储暂时不可用，请稍后重试；本次未占用材料名额。",
    };
  }

  const removeQuietly = async () => {
    try {
      await storage.removeObject(storageKey);
    } catch (error) {
      console.error(`[clew] 存储对象删除失败：${storageKey}`, error);
    }
  };

  // 上传即检测：页数与文字层（PDF）/ 行数折算（文本）
  let pageCount: number;
  let hasTextLayer: boolean;
  if (kindResult.kind === "pdf") {
    const probe = await probeClewPdf(bytes);
    if (!probe.ok) {
      await removeQuietly();
      if (probe.code === "probe-unavailable") {
        return { ok: false, status: 500, code: "server-error", message: probe.message };
      }
      return { ok: false, status: 422, code: "pdf-unreadable", message: probe.message };
    }
    if (probe.pageCount > CLEW_WORKSHOP_MAX_PAGE_COUNT) {
      await removeQuietly();
      return {
        ok: false,
        status: 422,
        code: "page-limit",
        message: `这份 PDF 共 ${probe.pageCount} 页，超过课题材料单份 ${CLEW_WORKSHOP_MAX_PAGE_COUNT} 页上限；课题工作坊定位是短材料，请拆分后上传，或作为教材上传到书架。`,
      };
    }
    if (!probe.hasTextLayer) {
      await removeQuietly();
      return {
        ok: false,
        status: 422,
        code: "unsupported-scan",
        message: "未检测到文字层：暂不支持扫描版 PDF。请上传带文字层的电子版 PDF（扫描件 OCR 后续开放）。",
      };
    }
    pageCount = probe.pageCount;
    hasTextLayer = true;
  } else {
    const decoded = decodeClewWorkshopText(bytes);
    if (!decoded.ok) {
      await removeQuietly();
      return { ok: false, status: 422, code: "invalid-file", message: decoded.reason };
    }
    pageCount = clewWorkshopTextPagesFromLines(decoded.lineCount);
    hasTextLayer = true;
  }

  try {
    const created = await prisma.$transaction(async (tx) => {
      const usedNow = await tx.clewWorkshopFile.count({ where: { workshopId: workshop.id } });
      if (usedNow >= limits.filesPerWorkshop) {
        throw new ClewWorkshopQuotaExceededError(
          buildClewWorkshopFileLimitMessage(usedNow, limits.filesPerWorkshop),
        );
      }
      const row = await tx.clewWorkshopFile.create({
        data: {
          id: fileId,
          workshopId: workshop.id,
          fileName,
          storageKey,
          sizeBytes,
          pageCount,
          hasTextLayer,
          status: "ready",
          ocrStatus: "not-attempted",
        },
      });
      await tx.clewWorkshop.update({
        where: { id: workshop.id },
        data: { updatedAt: new Date() },
      });
      return row;
    });
    return { ok: true, data: { file: toClewWorkshopFileView(created) } };
  } catch (error) {
    await removeQuietly();
    if (error instanceof ClewWorkshopQuotaExceededError) {
      return { ok: false, status: 503, code: "quota-exceeded", message: error.message };
    }
    console.error("[clew] 课题材料落库失败", error);
    return { ok: false, status: 500, code: "server-error", message: "材料保存失败，请稍后重试；本次未占用材料名额。" };
  }
}

export async function deleteClewWorkshopFile(
  userId: string,
  workshopId: string,
  fileId: string,
): Promise<ClewWorkshopResult<{ deletedId: string }>> {
  const file = await prisma.clewWorkshopFile.findFirst({
    where: { id: fileId, workshopId, workshop: { userId } },
    select: { id: true, storageKey: true },
  });
  if (!file) {
    return { ok: false, status: 404, code: "not-found", message: "材料不存在或不属于当前账户。" };
  }

  await prisma.clewWorkshopFile.delete({ where: { id: file.id } });

  try {
    const storage = getClewStorage();
    try {
      await storage.removeObject(file.storageKey);
    } catch (error) {
      console.error(`[clew] 存储对象删除失败：${file.storageKey}`, error);
    }
  } catch (error) {
    console.error("[clew] 删除课题材料时存储不可用", error);
  }

  return { ok: true, data: { deletedId: file.id } };
}

/** 读取一份材料的检索片段（PDF 按页；文本按行块）。文字层按需读取，不改写原文件。 */
async function readWorkshopFileSegments(file: ClewWorkshopFileRow): Promise<ClewWorkshopSegment[]> {
  const storage = getClewStorage();
  const bytes = await storage.readObject(file.storageKey);
  if (file.fileName.toLowerCase().endsWith(".pdf")) {
    const runtime = await openClewPdf(bytes);
    if (!runtime.ok) {
      throw new Error(`材料《${file.fileName}》暂时无法读取（${runtime.message}）。`);
    }
    try {
      const pages = await readClewPdfPageRange(runtime.document, {
        fromPage: 1,
        toPage: runtime.document.numPages,
        itemsToLines: pdfTextItemsToLines,
      });
      return buildClewWorkshopPdfSegments(
        file.id,
        file.fileName,
        pages.map((page) => ({ pageNumber: page.pageNumber, text: page.lines.join("\n") })),
      );
    } finally {
      await runtime.release();
    }
  }
  const decoded = decodeClewWorkshopText(bytes);
  if (!decoded.ok) {
    throw new Error(`材料《${file.fileName}》暂时无法读取（${decoded.reason}）。`);
  }
  return buildClewWorkshopTextSegments(file.id, file.fileName, decoded.text);
}

/** 只读关联该用户自己的教材知识点标题（仅本人数据、不写课程真相）。 */
async function listOwnKnowledgePointTitles(
  userId: string,
): Promise<{ id: string; title: string; textbookTitle: string }[]> {
  const rows = await prisma.clewKnowledgePoint.findMany({
    where: { chapter: { textbook: { userId, deletedAt: null } } },
    orderBy: { createdAt: "asc" },
    take: 500,
    select: { id: true, title: true, chapter: { select: { textbook: { select: { title: true } } } } },
  });
  return rows.map((row) => ({ id: row.id, title: row.title, textbookTitle: row.chapter.textbook.title }));
}

export type ClewWorkshopChatProgressEvent = {
  stage: "search" | "answer" | "save";
  message: string;
};

export type ClewWorkshopChatSuccess = {
  ok: true;
  conversation: { workshopId: string; messages: ClewChatMessage[] };
  citations: ClewWorkshopCitation[];
  notes: string[];
};

export type ClewWorkshopChatResult = ClewWorkshopChatSuccess | ClewWorkshopFailure;

export type ClewWorkshopChatRequest = {
  userId: string;
  workshopId: string;
  message: string;
  onProgress: (event: ClewWorkshopChatProgressEvent) => void;
  onDelta: (text: string) => void;
};

/**
 * 检索材料答疑（每轮至多一次模型调用）。
 * 提问先落库（不会丢失），回答成功后再落库；失败如实报错且不保存半截回答。
 * 检索零命中：不调用模型、不占模型额度，返回确定性「材料里没有相关内容」。
 */
export async function sendClewWorkshopMessage(
  input: ClewWorkshopChatRequest,
): Promise<ClewWorkshopChatResult> {
  const question = input.message.trim();
  if (question.length === 0) {
    return { ok: false, status: 400, code: "invalid-request", message: "请输入要提问的问题。" };
  }
  if (question.length > CLEW_CHAT_QUESTION_MAX_CHARS) {
    return {
      ok: false,
      status: 400,
      code: "invalid-request",
      message: `提问过长（${question.length} 字），请控制在 ${CLEW_CHAT_QUESTION_MAX_CHARS} 字以内。`,
    };
  }

  const workshop = await prisma.clewWorkshop.findFirst({
    where: { id: input.workshopId, userId: input.userId },
    include: { files: { orderBy: { createdAt: "asc" } } },
  });
  if (!workshop) {
    return { ok: false, status: 404, code: "not-found", message: "课题不存在或不属于当前账户。" };
  }

  const readyFiles = workshop.files.filter((file) => file.status === "ready");
  if (readyFiles.length === 0) {
    return {
      ok: false,
      status: 422,
      code: "invalid-request",
      message: "这个课题还没有可检索的材料：请先上传带文字层的 PDF 或 Markdown/纯文本材料。",
    };
  }

  // 工作坊答疑没有启发式兜底：模型不可用即明确报错（与讲义/笔记的兜底策略不同）
  // ZCODE-M4 多模型：显式配置了未实现 provider / 非法 baseURL 同样明确报错
  let provider: Awaited<ReturnType<typeof createClewChatProviderFromEnv>>;
  try {
    provider = await createClewChatProviderFromEnv();
  } catch (error) {
    if (error instanceof ClewProviderConfigError) {
      return { ok: false, status: 503, code: "chat-failed", message: error.message };
    }
    throw error;
  }
  if (!provider) {
    return {
      ok: false,
      status: 503,
      code: "chat-failed",
      message: "未配置答疑模型（DASHSCOPE_API_KEY / CLEW_EXTRACT_PROVIDER），课题工作坊答疑暂不可用。",
    };
  }

  const quotas = await computeUserQuotas(input.userId);
  const quotaItem = quotas.quotas.clewWorkshopChats;
  if (!canUseResource(quotaItem)) {
    return {
      ok: false,
      status: 503,
      code: "quota-exceeded",
      message: `${getQuotaLabel("clewWorkshopChats")} 已用完（${quotaItem.used}/${quotaItem.limit}），本轮提问已停止。可升级会员档位，或等待额度重置后重试。`,
    };
  }

  const notes: string[] = [];

  // 1) 读取材料文字层并做确定性关键词检索
  input.onProgress({ stage: "search", message: `读取 ${readyFiles.length} 份材料并检索相关片段…` });
  const segments: ClewWorkshopSegment[] = [];
  for (const file of readyFiles) {
    try {
      segments.push(...await readWorkshopFileSegments(file));
    } catch (error) {
      console.error("[clew] 课题材料读取失败", error);
      notes.push(error instanceof Error ? error.message : `材料《${file.fileName}》暂时无法读取。`);
    }
  }
  if (segments.length === 0) {
    return {
      ok: false,
      status: 422,
      code: "invalid-request",
      message: "课题材料暂时都无法读取文字内容，本次提问已停止；请重新上传材料后再试。",
    };
  }

  const hits = searchClewWorkshopSegments(segments, question);
  const citations: ClewWorkshopCitation[] = hits.map((hit) => ({
    fileId: hit.fileId,
    fileName: hit.fileName,
    locator: hit.locator,
    excerpt: hit.excerpt,
  }));

  // 2) 只读关联本人教材知识点（关联不到就如实不关联）
  const relatedKnowledgePoints = matchClewWorkshopKnowledgePoints(
    await listOwnKnowledgePointTitles(input.userId),
    question,
  );
  if (relatedKnowledgePoints.length > 0) {
    notes.push(
      `关联到你的教材知识点：${relatedKnowledgePoints.map((kp) => `《${kp.textbookTitle}》「${kp.title}」`).join("；")}（只读参考）。`,
    );
  }

  // 3) 提问先落库：即使后续失败，问题也不会丢
  const conversationRow = await prisma.clewConversation.findFirst({
    where: { userId: input.userId, workshopId: input.workshopId },
    select: { messages: true },
  });
  const history = parseClewChatMessages(conversationRow?.messages);
  const withQuestion = appendClewChatMessage(history, {
    role: "user",
    content: question,
    createdAt: new Date().toISOString(),
  });
  await prisma.clewConversation.upsert({
    where: { userId_workshopId: { userId: input.userId, workshopId: input.workshopId } },
    create: { userId: input.userId, workshopId: input.workshopId, messages: [...withQuestion] },
    update: { messages: [...withQuestion] },
  });

  const saveMessages = async (messages: readonly ClewChatMessage[]) => {
    await prisma.clewConversation.upsert({
      where: { userId_workshopId: { userId: input.userId, workshopId: input.workshopId } },
      create: { userId: input.userId, workshopId: input.workshopId, messages: [...messages] },
      update: { messages: [...messages] },
    });
  };

  // 4) 检索零命中：不调用模型、不占模型额度，确定性如实回答
  if (hits.length === 0) {
    input.onProgress({ stage: "answer", message: "材料里没有检索到相关内容。" });
    const answer = buildClewWorkshopNoHitAnswer(workshop.title);
    input.onDelta(answer);
    const finalMessages = appendClewChatMessage(withQuestion, {
      role: "assistant",
      content: answer,
      createdAt: new Date().toISOString(),
    });
    input.onProgress({ stage: "save", message: "保存对话…" });
    await saveMessages(finalMessages);
    notes.push("本次检索零命中：未调用模型，未占用答疑额度。");
    try {
      await prisma.eventLog.create({
        data: {
          event: "clew_workshop_chat",
          userId: input.userId,
          props: {
            workshopId: input.workshopId,
            provider: provider.id,
            model: provider.model,
            outcome: "no-match",
            questionChars: question.length,
            answerChars: answer.length,
            hitCount: 0,
            relatedKnowledgePointCount: relatedKnowledgePoints.length,
          },
        },
      });
    } catch (error) {
      console.error("[clew] 课题答疑事件记录失败", error);
    }
    return {
      ok: true,
      conversation: { workshopId: input.workshopId, messages: finalMessages },
      citations,
      notes,
    };
  }

  notes.push(`检索命中 ${hits.length} 个材料片段（${citations[0]?.fileName ?? ""} 等），回答只依据这些片段。`);

  // 5) 命中：调用模型流式回答（token 已消耗即记账，无论成败）
  input.onProgress({ stage: "answer", message: `依据 ${hits.length} 个命中片段生成回答（${provider.model}）…` });
  const chatContext: ClewWorkshopChatContext = {
    workshopTitle: workshop.title,
    citations,
    relatedKnowledgePoints,
    materialFileNames: readyFiles.map((file) => file.fileName),
  };

  let modelOutcome: "success" | "failed" = "success";
  let answer = "";
  try {
    answer = await provider.streamReply(
      { messages: buildClewWorkshopChatModelMessages(chatContext, history, question), question },
      input.onDelta,
    );
  } catch (error) {
    modelOutcome = "failed";
    const message = error instanceof Error ? error.message : "未知错误";
    console.error("[clew] 课题答疑模型调用失败", error);
    return {
      ok: false,
      status: 503,
      code: "chat-failed",
      message: `本次答疑失败：${message}。本轮回答未保存（提问已保留），可稍后重试。`,
    };
  } finally {
    try {
      await recordServerUsage(input.userId, "clewWorkshopChats");
      await prisma.eventLog.create({
        data: {
          event: "clew_workshop_chat",
          userId: input.userId,
          props: {
            workshopId: input.workshopId,
            provider: provider.id,
            model: provider.model,
            outcome: modelOutcome,
            questionChars: question.length,
            answerChars: answer.length,
            hitCount: hits.length,
            relatedKnowledgePointCount: relatedKnowledgePoints.length,
          },
        },
      });
    } catch (error) {
      console.error("[clew] 课题答疑用量记录失败", error);
      notes.push("提示：本轮对话的配额计数写入失败，已记录服务端日志。");
    }
  }

  const finalMessages = appendClewChatMessage(withQuestion, {
    role: "assistant",
    content: answer.slice(0, CLEW_CHAT_MESSAGE_MAX_CHARS),
    createdAt: new Date().toISOString(),
  });
  input.onProgress({ stage: "save", message: "保存对话…" });
  await saveMessages(finalMessages);

  return {
    ok: true,
    conversation: { workshopId: input.workshopId, messages: finalMessages },
    citations,
    notes,
  };
}
