import "server-only";

import { createHash } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { MembershipTier } from "@/types/auth";
import {
  ClewCompiler,
  type ClewCompileProgress,
  type ClewCompileSummary,
  type ClewCompilerPorts,
} from "./compiler";
import { createClewAgent, type ClewAgent, type ClewToolContext, type ClewToolHandlers } from "./agent-loop";
import {
  ClewProviderConfigError,
  describeClewModel,
  getClewModelForTask,
} from "./providers/dashscope";
import {
  filterCompileChapters,
  resolveCompileScope,
  type CompileScope,
} from "./compile-scope";
import {
  extractEvidenceAtoms,
  linkKnowledgePointToEvidence,
} from "./evidence";
import {
  getClewTextbookDetail,
  markChapterExtractionFailed,
} from "./chapters";
import {
  extractClewChapterKnowledgePoints,
  type ClewExtractProgressEvent,
} from "./extraction";
import type { ClewChapterView, ClewKnowledgePointView } from "@/types/clew";
import { getClewStorage } from "./storage";
import { generateClewKnowledgePointLesson } from "./lesson";
import { sendClewKnowledgePointMessage } from "./chat";
import { generateClewChapterNote } from "./note";

/**
 * Clew Harness 服务端绑定（ZCODE-M2）：
 * 把纯编排层（compiler.ts / agent-loop.ts）接到真实服务（Prisma、存储、模型、配额）。
 * server-only：API key 与数据访问绝不进入客户端 bundle。
 */

export class ClewHarnessError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ClewHarnessError";
  }
}

/** 教材内容指纹（SHA-256）：内容变化时 ClewCompileCache 失效，需要重新编译。 */
export async function computeClewContentFingerprint(
  userId: string,
  textbookId: string,
): Promise<string | null> {
  const row = await prisma.clewTextbook.findFirst({
    where: { id: textbookId, userId, deletedAt: null },
    select: { storageKey: true },
  });
  if (!row) {
    return null;
  }
  try {
    const bytes = await getClewStorage().readObject(row.storageKey);
    return createHash("sha256").update(bytes).digest("hex");
  } catch {
    return null;
  }
}

/** 读取编译缓存（命中且指纹一致才可复用）。 */
export async function loadClewCompileCache(textbookId: string) {
  return prisma.clewCompileCache.findUnique({ where: { textbookId } });
}

async function upsertCompileCache(
  textbookId: string,
  data: {
    state: string;
    progress?: unknown;
    contentFingerprint?: string;
  },
): Promise<void> {
  const progressInput =
    data.progress === undefined
      ? undefined
      : (JSON.parse(JSON.stringify(data.progress)) as Prisma.InputJsonValue);
  const existing = await prisma.clewCompileCache.findUnique({ where: { textbookId } });
  if (existing) {
    await prisma.clewCompileCache.update({
      where: { textbookId },
      data: {
        state: data.state,
        ...(progressInput === undefined ? {} : { progress: progressInput }),
        // 修复：update 分支此前忽略 contentFingerprint，导致首编译建行（空串）后
        // 指纹永远写不进去、「内容变化 → 强制全量」成为死功能（2026-10-02 验收发现）。
        ...(data.contentFingerprint === undefined ? {} : { contentFingerprint: data.contentFingerprint }),
      },
    });
    return;
  }
  await prisma.clewCompileCache.create({
    data: {
      textbookId,
      state: data.state,
      progress: progressInput ?? undefined,
      contentFingerprint: data.contentFingerprint ?? "",
    },
  });
}

/**
 * 证据绑定落库：页级证据原子（按章整体替换）+ KP-证据关联（主证据 + 辅助证据）。
 * DOCX 无页标记时证据为空（如实为空，不伪造）。
 */
async function resolveTextbookIdByChapter(chapterId: string): Promise<string | null> {
  const row = await prisma.clewChapter.findUnique({
    where: { id: chapterId },
    select: { textbookId: true },
  });
  return row?.textbookId ?? null;
}

/** 服务端编译器工厂：真实 ports（门禁 / 配额 / 萃取 / 失败隔离 / 证据绑定 / 编译缓存）。 */
export async function createServerClewCompiler(
  userId: string,
  tier: MembershipTier,
  textbookId: string,
): Promise<ClewCompiler> {
  const detail = await getClewTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    throw new ClewHarnessError(detail.status, detail.code, detail.message);
  }
  if (!detail.data.textbook.spineConfirmedAt) {
    throw new ClewHarnessError(
      409,
      "spine-not-confirmed",
      "请先确认章节结构，再萃取知识点。",
    );
  }

  const ports: ClewCompilerPorts = {
    async getChapters() {
      const current = await getClewTextbookDetail(userId, textbookId);
      if (!current.ok) {
        return [];
      }
      return current.data.chapters.map((chapter) => ({
        id: chapter.id,
        order: chapter.order,
        title: chapter.title,
      }));
    },

    async extractChapter(chapter, hooks) {
      const result = await extractClewChapterKnowledgePoints({
        userId,
        tier,
        textbookId,
        chapterOrder: chapter.order,
        onProgress: (event) => {
          hooks.onProgress(event);
        },
        onKnowledgePoint: (kp) => hooks.onKnowledgePoint(kp),
      });
      if (!result.ok) {
        throw new ClewHarnessError(result.status, result.code, result.message);
      }
      return {
        chapter,
        knowledgePoints: result.knowledgePoints,
        chapterText: result.chapterText,
        notes: result.notes,
      };
    },

    async markChapterFailed(chapterId, error) {
      await markChapterExtractionFailed(userId, textbookId, chapterId, error);
    },

    async bindEvidence(outcome) {
      const textbookIdForChapter = await resolveTextbookIdByChapter(outcome.chapter.id);
      if (!textbookIdForChapter) {
        return;
      }
      const atoms = extractEvidenceAtoms(outcome.chapterText, {
        textbookId: textbookIdForChapter,
        chapterId: outcome.chapter.id,
      });
      if (atoms.length === 0) {
        return;
      }

      // 页级证据原子：按章整体替换（upsert 页码维度）
      await prisma.$transaction(async (tx) => {
        await tx.clewEvidenceAtom.deleteMany({ where: { chapterId: outcome.chapter.id } });
        await tx.clewEvidenceAtom.createMany({
          data: atoms.map((atom) => ({
            textbookId: atom.textbookId,
            chapterId: atom.chapterId,
            pageNumber: atom.pageNumber,
            text: atom.text,
          })),
        });
      });

      // KP-证据关联（saved KPs 的 id 需从库里取）
      const savedKps = await prisma.clewKnowledgePoint.findMany({
        where: { chapterId: outcome.chapter.id },
        orderBy: { order: "asc" },
        select: { id: true, title: true, description: true, keyTerms: true, sourcePage: true },
      });
      const atomRows = await prisma.clewEvidenceAtom.findMany({
        where: { chapterId: outcome.chapter.id },
      });
      const atomById = new Map(atomRows.map((row) => [`${outcome.chapter.id}:p${row.pageNumber}`, row]));

      await prisma.clewKnowledgePointEvidence.deleteMany({
        where: { kpId: { in: savedKps.map((kp) => kp.id) } },
      });
      for (const kp of savedKps) {
        const binding = linkKnowledgePointToEvidence(
          {
            id: kp.id,
            title: kp.title,
            description: kp.description,
            keyTerms: Array.isArray(kp.keyTerms) ? (kp.keyTerms as string[]) : [],
            sourcePage: kp.sourcePage,
          },
          atoms.map((atom) => ({ ...atom, id: atom.id })),
        );
        if (binding.evidenceIds.length === 0) {
          continue;
        }
        const rows = binding.evidenceIds
          .map((id) => atomById.get(id))
          .filter((row): row is NonNullable<typeof row> => row !== undefined);
        if (rows.length === 0) {
          continue;
        }
        await prisma.clewKnowledgePointEvidence.createMany({
          data: rows.map((row, index) => ({
            kpId: kp.id,
            evidenceId: row.id,
            isPrimary: index === 0,
          })),
        });
      }
    },
  };

  return new ClewCompiler(textbookId, ports);
}

/**
 * 服务端 Clew Agent 工厂：ToolLoopAgent + DashScope 模型 + 服务绑定的工具 handler。
 * 未配置模型密钥时抛 ClewHarnessError（明确报错，不静默兜底）。
 */
export async function createServerClewAgent(
  context: ClewToolContext,
): Promise<ClewAgent> {
  // ZCODE-M4 多模型：模型获取改走任务级解析（Agent 用 lesson 任务）；
  // 未实现 provider / 缺 key / baseURL 非法都在此明确报错（503），不静默兜底。
  let model: ReturnType<typeof getClewModelForTask>;
  try {
    model = getClewModelForTask("lesson");
  } catch (error) {
    if (error instanceof ClewProviderConfigError) {
      throw new ClewHarnessError(503, "server-error", error.message);
    }
    throw error;
  }

  const handlers: ClewToolHandlers = {
    async extractKnowledgePoints(input, ctx) {
      const detail = await getClewTextbookDetail(ctx.userId, ctx.textbookId ?? "");
      if (!detail.ok) {
        throw new ClewHarnessError(detail.status, detail.code, detail.message);
      }
      // 工具层萃取：直接调用既有萃取服务（单章、含门禁与配额），事件不外流（由调用方编排）。
      const chapter = detail.data.chapters.find((row) => row.id === input.chapterId);
      if (!chapter) {
        throw new ClewHarnessError(404, "not-found", "章节不存在。");
      }
      const result = await extractClewChapterKnowledgePoints({
        userId: ctx.userId,
        tier: (ctx.tier ?? "free") as MembershipTier,
        textbookId: ctx.textbookId ?? "",
        chapterOrder: chapter.order,
        onProgress: () => undefined,
        onKnowledgePoint: () => undefined,
      });
      if (!result.ok) {
        throw new ClewHarnessError(result.status, result.code, result.message);
      }
      return {
        knowledgePoints: result.knowledgePoints.map((kp) => ({
          title: kp.title,
          description: kp.description,
          keyTerms: kp.keyTerms,
          prerequisites: kp.prerequisites,
          sourcePage: kp.sourcePage,
        })),
        notes: result.notes,
      };
    },

    async generateLesson(input, ctx) {
      const result = await generateClewKnowledgePointLesson({
        userId: ctx.userId,
        kpId: input.kpId,
        onProgress: () => undefined,
        onDelta: () => undefined,
      });
      if (!result.ok) {
        throw new ClewHarnessError(result.status, result.code, result.message);
      }
      return { contentMd: result.lesson.contentMd, generator: describeClewModel() };
    },

    async answerQuestion(input, ctx) {
      let answer = "";
      const result = await sendClewKnowledgePointMessage({
        userId: ctx.userId,
        kpId: input.kpId,
        message: input.question,
        onDelta: (text) => {
          answer += text;
        },
      });
      if (!result.ok) {
        throw new ClewHarnessError(result.status, result.code, result.message);
      }
      return { answerMd: answer };
    },

    async generateNote(input, ctx) {
      const chapterRow = await prisma.clewChapter.findUnique({
        where: { id: input.chapterId },
        select: { order: true, textbookId: true },
      });
      if (!chapterRow) {
        throw new ClewHarnessError(404, "not-found", "章节不存在。");
      }
      let content = "";
      const result = await generateClewChapterNote({
        userId: ctx.userId,
        textbookId: chapterRow.textbookId,
        chapterOrder: chapterRow.order,
        onProgress: () => undefined,
        onDelta: (text) => {
          content += text;
        },
      });
      if (!result.ok) {
        throw new ClewHarnessError(result.status, result.code, result.message);
      }
      return { contentMd: content, generator: describeClewModel() };
    },
  };

  return createClewAgent(context, {
    model,
    handlers,
  });
}

export { upsertCompileCache };

/* ---------------- ZCODE-M3 Phase 3：编译范围 + 指纹接线 ---------------- */

export type ClewCompileCacheView = {
  state: string;
  updatedAt: string;
  contentFingerprint: string;
};

/** 编译缓存视图（教材详情页加载时显示「上次编译」）。 */
export async function getClewCompileCacheView(
  textbookId: string,
): Promise<ClewCompileCacheView | null> {
  const cache = await prisma.clewCompileCache.findUnique({ where: { textbookId } });
  if (!cache) {
    return null;
  }
  return {
    state: cache.state,
    updatedAt: cache.updatedAt.toISOString(),
    contentFingerprint: cache.contentFingerprint ?? "",
  };
}

export type CompileTextbookResult =
  | {
      ok: false;
      status: number;
      code: string;
      message: string;
    }
  | {
      ok: true;
      /** 实际生效的 scope（指纹变化可能强制 all）。 */
      scope: CompileScope;
      /** 指纹强制全量的提示（SSE 首条 progress 文案）。 */
      forcedNote?: string;
      summary: ClewCompileSummary;
      /** 本次跳过的章节数（pending 范围内已萃取）。 */
      skippedChapters: number;
    };

/**
 * 全书编译走 Harness（scope + 指纹接线）：
 * - scope 过滤在调用层完成（pending | failed 计入；compiler.ts 纯编排不动）；
 * - 缓存指纹非空且与当前不同 → 强制全量并返回提示；
 * - 编译开始/结束把最新指纹与 state 写回缓存（跨刷新续存）。
 */
export async function compileTextbookThroughHarness(
  userId: string,
  tier: MembershipTier,
  textbookId: string,
  requestedScope: CompileScope,
  onProgress: (progress: ClewCompileProgress) => void,
): Promise<CompileTextbookResult> {
  const detail = await getClewTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    return { ok: false, status: detail.status, code: detail.code, message: detail.message };
  }
  if (!detail.data.textbook.spineConfirmedAt) {
    return {
      ok: false,
      status: 409,
      code: "spine-not-confirmed",
      message: "请先确认章节结构，再编译全书。",
    };
  }

  // 指纹决策（读取失败如实按"未知"处理，不伪造一致）
  const [currentFingerprint, cached] = await Promise.all([
    computeClewContentFingerprint(userId, textbookId),
    loadClewCompileCache(textbookId),
  ]);
  const resolved = resolveCompileScope(requestedScope, cached?.contentFingerprint, currentFingerprint);

  const targets = filterCompileChapters(detail.data.chapters, resolved.scope);
  if (targets.length === 0) {
    return {
      ok: false,
      status: 422,
      code: "invalid-request",
      message:
        resolved.scope === "pending"
          ? "没有待编译的章节（全部章节均已萃取）。如需重萃取请用「重新编译全部」。"
          : "没有可编译的章节，请先识别并确认目录。",
    };
  }

  if (resolved.forcedNote) {
    onProgress({ state: "extracting", currentStep: resolved.forcedNote });
  }

  const compiler = await createServerClewCompiler(userId, tier, textbookId);
  await upsertCompileCache(textbookId, {
    state: "extracting",
    ...(currentFingerprint ? { contentFingerprint: currentFingerprint } : {}),
  });

  try {
    const summary = await compiler.extractAllChapters(onProgress, {
      chapters: targets.map((chapter: ClewChapterView) => ({
        id: chapter.id,
        order: chapter.order,
        title: chapter.title,
      })),
    });
    await upsertCompileCache(textbookId, { state: summary.state });
    return {
      ok: true,
      scope: resolved.scope,
      forcedNote: resolved.forcedNote,
      summary,
      skippedChapters: detail.data.chapters.length - targets.length,
    };
  } catch (error) {
    await upsertCompileCache(textbookId, { state: "failed" });
    if (error instanceof ClewHarnessError) {
      return { ok: false, status: error.status, code: error.code, message: error.message };
    }
    console.error("[clew] 教材编译失败", error);
    return {
      ok: false,
      status: 503,
      code: "server-error",
      message: "教材编译失败，请稍后重试。",
    };
  }
}

/**
 * 单章萃取走 Harness（既有 /chapters/[order]/extract 路由的编译器通道）。
 * 返回服务端已落库的知识点视图（SSE kp/result 事件的载荷来源）。
 */
export async function extractChapterThroughHarness(
  userId: string,
  tier: MembershipTier,
  textbookId: string,
  chapterOrder: number,
  hooks: {
    onProgress: (event: ClewExtractProgressEvent) => void;
    onKnowledgePoint: (knowledgePoint: ClewKnowledgePointView) => void;
  },
): Promise<
  | {
      ok: true;
      chapter: { id: string; order: number; title: string; pageStart: number; pageEnd: number; source: string; status: string; knowledgePointCount: number };
      knowledgePoints: ClewKnowledgePointView[];
      notes: string[];
    }
  | { ok: false; status: number; code: string; message: string }
> {
  const detail = await getClewTextbookDetail(userId, textbookId);
  if (!detail.ok) {
    return { ok: false, status: detail.status, code: detail.code, message: detail.message };
  }
  const chapterView = detail.data.chapters.find((row) => row.order === chapterOrder);
  if (!chapterView) {
    return { ok: false, status: 404, code: "not-found", message: "章节不存在，请先识别或修正目录。" };
  }
  if (!detail.data.textbook.spineConfirmedAt) {
    return {
      ok: false,
      status: 409,
      code: "spine-not-confirmed",
      message: "请先确认章节结构，再萃取知识点。",
    };
  }

  const compiler = await createServerClewCompiler(userId, tier, textbookId);
  try {
    const outcome = await compiler.extractChapter(
      { id: chapterView.id, order: chapterView.order, title: chapterView.title },
      {
        onProgress: (event) => hooks.onProgress(event),
        onKnowledgePoint: (kp) => {
          // 服务端 outcome.knowledgePoints 实为已落库视图（见 ports.extractChapter 返回值）
          hooks.onKnowledgePoint(kp as ClewKnowledgePointView);
        },
      },
    );
    const knowledgePoints = outcome.knowledgePoints as ClewKnowledgePointView[];
    return {
      ok: true,
      chapter: {
        id: chapterView.id,
        order: chapterView.order,
        title: chapterView.title,
        pageStart: chapterView.pageStart,
        pageEnd: chapterView.pageEnd,
        source: chapterView.source,
        status: "extracted",
        knowledgePointCount: knowledgePoints.length,
      },
      knowledgePoints,
      notes: outcome.notes,
    };
  } catch (error) {
    if (error instanceof ClewHarnessError) {
      return { ok: false, status: error.status, code: error.code, message: error.message };
    }
    console.error("[clew] Harness 单章萃取失败", error);
    return {
      ok: false,
      status: 503,
      code: "extraction-failed",
      message: `知识点萃取失败：${error instanceof Error ? error.message : "未知错误"}。章节状态未改变，可稍后重试。`,
    };
  }
}
