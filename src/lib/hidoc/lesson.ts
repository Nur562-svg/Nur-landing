import "server-only";

import { prisma } from "@/lib/prisma";
import { canUseResource, getQuotaLabel } from "@/lib/quotas";
import { computeUserQuotas, recordServerUsage } from "@/lib/quotas-server";
import type { HiDocErrorCode, HiDocLessonGenerator, HiDocLessonView } from "@/types/hidoc";
import { loadHiDocKnowledgePointContext } from "./knowledge-points";
import {
  HIDOC_MODEL_LESSON_NOTICE,
  buildHeuristicLesson,
  buildLessonHeader,
  normalizeLessonMarkdown,
  parseHiDocLessonGenerator,
  resolveHiDocLessonStyle,
  validateGeneratedLesson,
} from "./lesson-heuristic";
import { createHiDocLessonProviderFromEnv } from "./lesson-provider";
import { readHiDocKnowledgePointExcerpt } from "./source-excerpt";

/**
 * Hi doc 讲义生成编排（server-only，单知识点一次调用）。
 * 模型可用 → 流式生成并按结构校验；未配置密钥 → 启发式兜底并明确标注「未接入模型」。
 * 结构不合格、原文片段读不到、额度不足都如实报错，不伪造讲义、不静默降级。
 */

export type HiDocLessonProgressEvent = {
  stage: "read" | "generating" | "save";
  message: string;
};

export type HiDocLessonSuccess = {
  ok: true;
  lesson: HiDocLessonView;
  notes: string[];
};

export type HiDocLessonFailure = {
  ok: false;
  status: number;
  code: HiDocErrorCode;
  message: string;
};

export type HiDocLessonResult = HiDocLessonSuccess | HiDocLessonFailure;

export type HiDocLessonRequest = {
  userId: string;
  kpId: string;
  onProgress: (event: HiDocLessonProgressEvent) => void;
  onDelta: (text: string) => void;
};

export type HiDocLessonRow = {
  contentMd: string;
  style: string;
  generator: string;
  sourceExcerpt: string;
  generatedAt: Date;
};

/** 讲义数据库行 → 对外视图。 */
export function toHiDocLessonView(row: HiDocLessonRow): HiDocLessonView {
  return {
    contentMd: row.contentMd,
    style: resolveHiDocLessonStyle(row.style),
    generator: parseHiDocLessonGenerator(row.generator),
    generatedAt: row.generatedAt.toISOString(),
  };
}

/** 读取某知识点的讲义（不存在返回 null）。 */
export async function loadHiDocLesson(
  kpId: string,
): Promise<{ view: HiDocLessonView; sourceExcerpt: string } | null> {
  const row = await prisma.hiDocLesson.findUnique({
    where: { kpId },
    select: { contentMd: true, style: true, generator: true, sourceExcerpt: true, generatedAt: true },
  });
  if (!row) {
    return null;
  }
  return { view: toHiDocLessonView(row), sourceExcerpt: row.sourceExcerpt };
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
    select: { hiDocLessonStyle: true },
  });
  return user?.hiDocLessonStyle ?? "zh-primary";
}

/** 账户级讲解风格（M4 只有 zh-primary；未知值回落）。 */
export async function loadHiDocAccountLessonStyle(userId: string): Promise<ReturnType<typeof resolveHiDocLessonStyle>> {
  return resolveHiDocLessonStyle(await loadAccountLessonStyle(userId));
}

export async function generateHiDocKnowledgePointLesson(
  input: HiDocLessonRequest,
): Promise<HiDocLessonResult> {
  const context = await loadHiDocKnowledgePointContext(input.userId, input.kpId);
  if (!context.ok) {
    return { ok: false, status: context.status, code: context.code, message: context.message };
  }
  const { knowledgePoint, chapter, textbook } = context.data;
  const notes: string[] = [];
  const style = resolveHiDocLessonStyle(await loadAccountLessonStyle(input.userId));

  input.onProgress({
    stage: "read",
    message: `聚合《${chapter.title}》第 ${knowledgePoint.sourcePage} 页附近的教材原文…`,
  });
  const excerptResult = await readHiDocKnowledgePointExcerpt({
    storageKey: textbook.storageKey,
    sourcePage: knowledgePoint.sourcePage,
    chapterPageStart: chapter.pageStart,
    chapterPageEnd: chapter.pageEnd,
  });
  const excerpt = excerptResult.ok ? excerptResult.excerpt : null;
  if (excerptResult.ok) {
    notes.push(`原文依据：第 ${excerptResult.pages.join("、")} 页（${excerptResult.excerpt.length} 字）。`);
  } else {
    notes.push(`未能读取教材原文片段：${excerptResult.message}`);
  }

  const previous = await loadHiDocLesson(input.kpId);
  const generatedAt = new Date();
  const generatedAtLabel = formatGeneratedAtLabel(generatedAt);

  let contentMd: string;
  let generator: HiDocLessonGenerator;

  const provider = await createHiDocLessonProviderFromEnv();
  if (!provider) {
    generator = { kind: "heuristic" };
    notes.push(
      "未接入模型（DASHSCOPE_API_KEY / HIDOC_EXTRACT_PROVIDER 未配置）：本次讲义由确定性规则整理，内容仅来自萃取结果与教材原文片段。",
    );
    contentMd = buildHeuristicLesson({
      knowledgePoint,
      textbookTitle: textbook.title,
      chapterTitle: chapter.title,
      sourceExcerpt: excerpt,
      style,
      generatedAtLabel,
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
    const quotaItem = quotas.quotas.hidocLessons;
    if (!canUseResource(quotaItem)) {
      return {
        ok: false,
        status: 503,
        code: "quota-exceeded",
        message: `${getQuotaLabel("hidocLessons")} 已用完（${quotaItem.used}/${quotaItem.limit}），本次讲义生成已停止。可升级会员档位，或等待额度重置后重试。`,
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
          notice: HIDOC_MODEL_LESSON_NOTICE,
        }),
        body,
      ].join("\n");
      notes.push(`来源：模型生成（${provider.id} · ${provider.model}），结构校验通过。`);
    } catch (error) {
      modelOutcome = "failed";
      const message = error instanceof Error ? error.message : "未知错误";
      console.error("[hidoc] 讲义生成模型调用失败", error);
      return {
        ok: false,
        status: 503,
        code: "lesson-failed",
        message: `讲义生成失败：${message}。旧讲义未被覆盖，可稍后重试。`,
      };
    } finally {
      // token 已消耗：无论成败都记账（与目录解析/萃取同一原则）
      try {
        await recordServerUsage(input.userId, "hidocLessons");
        await prisma.eventLog.create({
          data: {
            event: "hidoc_kp_lesson",
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
        console.error("[hidoc] 讲义用量记录失败", error);
        notes.push("提示：本次讲义生成的配额计数写入失败，已记录服务端日志。");
      }
    }
  }

  input.onProgress({ stage: "save", message: "保存讲义…" });
  const row = await prisma.hiDocLesson.upsert({
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
  if (generator.kind === "heuristic") {
    // 未消耗模型 token，不占模型额度；仅记录事件便于排查
    try {
      await prisma.eventLog.create({
        data: {
          event: "hidoc_kp_lesson",
          userId: input.userId,
          props: { kpId: input.kpId, chapterOrder: chapter.order, generator: "heuristic", outcome: "success" },
        },
      });
    } catch (error) {
      console.error("[hidoc] 讲义事件记录失败", error);
    }
  }

  return { ok: true, lesson: toHiDocLessonView(row), notes };
}