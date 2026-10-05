import "server-only";

import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { ClewErrorCode, ClewLessonGenerator, ClewLessonStyle, ClewLessonView } from "@/types/clew";
import { loadClewKnowledgePointContext } from "./knowledge-points";
import {
  CLEW_LESSON_STYLE_LABELS,
  CLEW_MODEL_LESSON_NOTICE,
  buildHeuristicLesson,
  buildLessonHeader,
  isClewLessonStyle,
  normalizeLessonMarkdown,
  parseClewLessonGenerator,
  resolveClewLessonStyle,
  validateGeneratedLesson,
} from "./lesson-heuristic";
import { createClewLessonProviderFromEnv } from "./lesson-provider";
import { ClewProviderConfigError } from "./providers/model-config";
import { isClewDocx } from "./source-label";
import { readClewKnowledgePointExcerpt } from "./source-excerpt";

/**
 * Clew 讲义生成编排（server-only，单知识点一次调用）。
 * 模型可用 → 流式生成并按结构校验；未配置密钥 → 启发式兜底并明确标注「未接入模型」。
 * 结构不合格、原文片段读不到、额度不足都如实报错，不伪造讲义、不静默降级。
 */

export type ClewLessonProgressEvent = {
  stage: "read" | "generating" | "save";
  message: string;
};

export type ClewLessonSuccess = {
  ok: true;
  lesson: ClewLessonView;
  notes: string[];
};

export type ClewLessonFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

export type ClewLessonResult = ClewLessonSuccess | ClewLessonFailure;

export type ClewLessonRequest = {
  userId: string;
  kpId: string;
  /** 用户显式选择的讲解风格（可选；未提供时用账户默认风格）。 */
  requestedStyle?: string;
  onProgress: (event: ClewLessonProgressEvent) => void;
  onDelta: (text: string) => void;
};

export type ClewLessonRow = {
  contentMd: string;
  style: string;
  generator: string;
  sourceExcerpt: string;
  generatedAt: Date;
};

/** 讲义数据库行 → 对外视图。 */
export function toClewLessonView(row: ClewLessonRow): ClewLessonView {
  return {
    contentMd: row.contentMd,
    style: resolveClewLessonStyle(row.style),
    generator: parseClewLessonGenerator(row.generator),
    generatedAt: row.generatedAt.toISOString(),
  };
}

/** 读取某知识点的讲义（不存在返回 null）。 */
export async function loadClewLesson(
  kpId: string,
): Promise<{ view: ClewLessonView; sourceExcerpt: string } | null> {
  const row = await prisma.clewLesson.findUnique({
    where: { kpId },
    select: { contentMd: true, style: true, generator: true, sourceExcerpt: true, generatedAt: true },
  });
  if (!row) {
    return null;
  }
  return { view: toClewLessonView(row), sourceExcerpt: row.sourceExcerpt };
}

function formatGeneratedAtLabel(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function loadAccountLessonStyle(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { clewLessonStyle: true },
  });
  return user?.clewLessonStyle ?? "zh-primary";
}

/** 账户级讲解风格（四种风格；未知值回落 zh-primary）。 */
export async function loadClewAccountLessonStyle(userId: string): Promise<ReturnType<typeof resolveClewLessonStyle>> {
  return resolveClewLessonStyle(await loadAccountLessonStyle(userId));
}

export async function generateClewKnowledgePointLesson(
  input: ClewLessonRequest,
): Promise<ClewLessonResult> {
  const context = await loadClewKnowledgePointContext(input.userId, input.kpId);
  if (!context.ok) {
    return { ok: false, status: context.status, code: context.code, message: context.message };
  }
  const { knowledgePoint, chapter, textbook } = context.data;
  const notes: string[] = [];
  const accountStyle = resolveClewLessonStyle(await loadAccountLessonStyle(input.userId));
  let explicitStyle: ClewLessonStyle | null = null;
  if (input.requestedStyle !== undefined) {
    const trimmed = input.requestedStyle.trim();
    if (!isClewLessonStyle(trimmed)) {
      return {
        ok: false,
        status: 400,
        code: "invalid-request",
        message: `未知的讲解风格「${trimmed.slice(0, 24)}」，请刷新页面后重试。`,
      };
    }
    explicitStyle = trimmed;
  }
  const style: ClewLessonStyle = explicitStyle ?? accountStyle;

  const docx = isClewDocx(textbook.fileName);
  input.onProgress({
    stage: "read",
    message: docx
      ? `聚合《${chapter.title}》的教材原文（页码待确认）…`
      : `聚合《${chapter.title}》第 ${knowledgePoint.sourcePage} 页附近的教材原文…`,
  });
  const excerptResult = await readClewKnowledgePointExcerpt({
    storageKey: textbook.storageKey,
    fileName: textbook.fileName,
    chapterTitle: chapter.title,
    sourcePage: knowledgePoint.sourcePage,
    chapterPageStart: chapter.pageStart,
    chapterPageEnd: chapter.pageEnd,
  });
  const excerpt = excerptResult.ok ? excerptResult.excerpt : null;
  if (excerptResult.ok) {
    notes.push(`原文依据：${excerptResult.locatorLabel}（${excerptResult.excerpt.length} 字）。`);
  } else {
    notes.push(`未能读取教材原文片段：${excerptResult.message}`);
  }

  const previous = await loadClewLesson(input.kpId);
  const generatedAt = new Date();
  const generatedAtLabel = formatGeneratedAtLabel(generatedAt);

  let contentMd: string;
  let generator: ClewLessonGenerator;

  // ZCODE-M4 多模型：显式配置了未实现 provider / 非法 baseURL → 明确报错，不走启发式兜底
  let provider: Awaited<ReturnType<typeof createClewLessonProviderFromEnv>>;
  try {
    provider = await createClewLessonProviderFromEnv();
  } catch (error) {
    if (error instanceof ClewProviderConfigError) {
      return { ok: false, status: 503, code: "lesson-failed", message: error.message };
    }
    throw error;
  }
  if (!provider) {
    generator = { kind: "heuristic" };
    notes.push(
      "未接入模型（DASHSCOPE_API_KEY / CLEW_EXTRACT_PROVIDER 未配置）：本次讲义由确定性规则整理，内容仅来自萃取结果与教材原文片段。",
    );
    contentMd = buildHeuristicLesson({
      knowledgePoint,
      textbookTitle: textbook.title,
      chapterTitle: chapter.title,
      sourceExcerpt: excerpt,
      style,
      generatedAtLabel,
      fileName: textbook.fileName,
    });
  } else {
    if (!excerpt) {
      return {
        ok: false,
        status: 503,
        code: "lesson-failed",
        message: `无法取得该知识点的教材原文片段（${excerptResult.ok ? "内容过少" : excerptResult.message}），讲义生成已停止，未覆盖旧版本。`,
      };
    }

    const quotas = await computeUserQuotas(input.userId);
    const quotaItem = quotas.quotas.clewLessons;
    if (!canUseResource(quotaItem)) {
      return {
        ok: false,
        status: 503,
        code: "quota-exceeded",
        message: `${getQuotaLabel("clewLessons")} 已用完（${quotaItem.used}/${quotaItem.limit}），本次讲义生成已停止。可升级会员档位，或等待额度重置后重试。`,
      };
    }

    let modelOutcome: "success" | "failed" = "success";
    let answerChars = 0;
    try {
      input.onProgress({
        stage: "generating",
        message: `调用模型撰写讲义（${provider.model}）…`,
      });
      const raw = await provider.generateLesson(
        {
          textbookTitle: textbook.title,
          chapterTitle: chapter.title,
          knowledgePoint,
          sourceExcerpt: excerpt,
          fileName: textbook.fileName,
          style,
        },
        input.onDelta,
      );
      answerChars = raw.length;
      const body = normalizeLessonMarkdown(raw);
      const validation = validateGeneratedLesson(body);
      if (!validation.ok) {
        modelOutcome = "failed";
        return {
          ok: false,
          status: 422,
          code: "lesson-failed",
          message: `模型返回的讲义结构不完整（${validation.reason}），本次生成已停止，旧讲义未被覆盖；可重试。`,
        };
      }
      generator = { kind: "model", provider: provider.id, model: provider.model };
      contentMd = [
        buildLessonHeader({
          title: knowledgePoint.title,
          generator,
          style,
          generatedAtLabel,
          textbookTitle: textbook.title,
          chapterTitle: chapter.title,
          sourcePage: knowledgePoint.sourcePage,
          fileName: textbook.fileName,
          notice: CLEW_MODEL_LESSON_NOTICE,
        }),
        body,
      ].join("\n");
      notes.push(`来源：模型生成 · ${provider.model}，结构校验通过。`);
    } catch (error) {
      modelOutcome = "failed";
      const message = error instanceof Error ? error.message : "未知错误";
      console.error("[clew] 讲义生成模型调用失败", error);
      return {
        ok: false,
        status: 503,
        code: "lesson-failed",
        message: `讲义生成失败：${message}。旧讲义未被覆盖，可稍后重试。`,
      };
    } finally {
      // token 已消耗：无论成败都记账（与目录解析/萃取同一原则）
      try {
        await recordServerUsage(input.userId, "clewLessons");
        await prisma.eventLog.create({
          data: {
            event: "clew_kp_lesson",
            userId: input.userId,
            props: {
              kpId: input.kpId,
              chapterOrder: chapter.order,
              provider: provider.id,
              model: provider.model,
              outcome: modelOutcome,
              answerChars,
            },
          },
        });
      } catch (error) {
        console.error("[clew] 讲义用量记录失败", error);
        notes.push("提示：本次讲义生成的配额计数写入失败，已记录服务端日志。");
      }
    }
  }

  input.onProgress({ stage: "save", message: "保存讲义…" });
  const row = await prisma.clewLesson.upsert({
    where: { kpId: input.kpId },
    create: {
      kpId: input.kpId,
      contentMd,
      style,
      generator: generator.kind === "model" ? `model:${generator.provider}:${generator.model}` : "heuristic",
      sourceExcerpt: excerpt ?? "",
      generatedAt,
    },
    update: {
      contentMd,
      style,
      generator: generator.kind === "model" ? `model:${generator.provider}:${generator.model}` : "heuristic",
      sourceExcerpt: excerpt ?? "",
      generatedAt,
    },
  });

  if (previous) {
    notes.push("本次生成覆盖了此前讲义（重新生成将覆盖旧版本）。");
  }
  if (explicitStyle && explicitStyle !== accountStyle) {
    try {
      await prisma.user.update({
        where: { id: input.userId },
        data: { clewLessonStyle: explicitStyle },
      });
      notes.push(`讲解风格已设为「${CLEW_LESSON_STYLE_LABELS[explicitStyle]}」，之后的生成默认使用该风格。`);
    } catch (error) {
      console.error("[clew] 讲解风格账户默认更新失败", error);
    }
  }
  if (generator.kind === "heuristic") {
    // 未消耗模型 token，不占模型额度；仅记录事件便于排查
    try {
      await prisma.eventLog.create({
        data: {
          event: "clew_kp_lesson",
          userId: input.userId,
          props: { kpId: input.kpId, chapterOrder: chapter.order, generator: "heuristic", outcome: "success" },
        },
      });
    } catch (error) {
      console.error("[clew] 讲义事件记录失败", error);
    }
  }

  return { ok: true, lesson: toClewLessonView(row), notes };
}