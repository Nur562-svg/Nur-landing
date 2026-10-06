// 与 payment/service.ts、unified-events.ts 同一约定：注释标注 server-only（只被服务端
// API 引用），不写 `import "server-only"`，使 node:test 可导入做隔离 SQLite 验证。
import { prisma } from "@/lib/prisma";
import { appendUnifiedLearningEvents } from "@/lib/unified-events";
import { isLoopProfileId } from "@/types/loop-profile";
import type { UnifiedLearningEventInput } from "@/types/unified-learning";
import { upsertClewReviewFromSelfCheck } from "./reviews";

/**
 * Clew 自测（「评」环节的最小实现，2026-10-02 体验补丁；ZCODE-M5 接入复习调度）。
 * 学员在讲义「自测题」上自评「会了 / 还需看」；标记「还需看」的题目以 `wrong-question-added`
 * 事件写入统一学习事件流，并按 profile 进入 FSRS 复习调度（fsrsEnabled=false 的 profile 不建条目）。
 * 幂等：同 KP 同一份讲义（generatedAt）的同一题只记一次（sourceKey 去重）；
 * 同版本重复提交不前移 FSRS 状态（以「本次是否产生新 shaky 事件」判定 advance）。
 */

export type ClewSelfCheckItemInput = {
  /** 讲义内题号（1 起，与 parseClewLessonSelfTest 的 index 对应）。 */
  index: number;
  /** 是否标记「还需看」。 */
  shaky: boolean;
};

export type ClewSelfCheckOutcome =
  | {
      ok: true;
      recorded: number;
      /** ZCODE-M5：复习调度结果（诚实反馈给学习页提示文案；与 ClewReviewUpsertStatus 对齐）。 */
      review:
        | "created" // 首见建条目并安排复习（今日到期）
        | "advanced" // 再见按遗忘曲线前移
        | "unchanged" // 同版本重复提交，复习安排不变（幂等）
        | "skipped-profile" // profile fsrsEnabled=false，不进调度
        | "skipped-no-shaky"; // 本次没有「还需看」
    }
  | { ok: false; status: number; code: "not-found" | "invalid-request"; message: string };

/** 一次最多提交的题数（讲义自测题远小于此，防滥用）。 */
const CLEW_SELF_CHECK_MAX_ITEMS = 20;

export async function recordClewSelfCheck(input: {
  userId: string;
  kpId: string;
  /** 讲义生成时间（区分讲义版本，重新生成后已标记的问题重新计）；缺省 v1。 */
  lessonGeneratedAt?: string;
  items: readonly ClewSelfCheckItemInput[];
}): Promise<ClewSelfCheckOutcome> {
  if (input.items.length > CLEW_SELF_CHECK_MAX_ITEMS) {
    return {
      ok: false,
      status: 400,
      code: "invalid-request",
      message: `一次最多提交 ${CLEW_SELF_CHECK_MAX_ITEMS} 道自测。`,
    };
  }
  for (const item of input.items) {
    if (
      !Number.isInteger(item.index) ||
      item.index < 1 ||
      item.index > 99 ||
      typeof item.shaky !== "boolean"
    ) {
      return { ok: false, status: 400, code: "invalid-request", message: "自测提交格式不正确。" };
    }
  }

  const kp = await prisma.clewKnowledgePoint.findFirst({
    where: { id: input.kpId, chapter: { textbook: { userId: input.userId, deletedAt: null } } },
    select: {
      id: true,
      loopProfileId: true,
      chapter: { select: { textbook: { select: { id: true } } } },
    },
  });
  if (!kp) {
    return { ok: false, status: 404, code: "not-found", message: "知识点不存在或教材已删除。" };
  }

  const profileId = isLoopProfileId(kp.loopProfileId) ? kp.loopProfileId : "full-loop";
  const version = input.lessonGeneratedAt?.trim() || "v1";
  const now = new Date();
  const events: UnifiedLearningEventInput[] = input.items
    .filter((item) => item.shaky)
    .map((item) => ({
      contentType: "clew-kp",
      contentId: kp.id,
      profileId,
      stage: "assess",
      eventType: "wrong-question-added",
      payload: { kind: "wrong-question", questionId: `${kp.id}#selftest-${item.index}`, source: "clew" },
      sourceKey: `clew-selftest:${kp.id}:${version}:${item.index}`,
      timestamp: now.toISOString(),
    }));

  // advance 判定须在事件写入之前：本次提交是否带来新的 shaky 标记（同版本重复提交 → false）
  let advance = false;
  if (events.length > 0) {
    const existing = await prisma.unifiedLearningEvent.findMany({
      where: { userId: input.userId, sourceKey: { in: events.map((event) => event.sourceKey) } },
      select: { sourceKey: true },
    });
    advance = existing.length < events.length;
  }

  // FSRS 复习调度（fsrsEnabled=false 的 profile 在服务内跳过）
  const review = events.length > 0
    ? await upsertClewReviewFromSelfCheck({
        userId: input.userId,
        kpId: kp.id,
        textbookId: kp.chapter.textbook.id,
        profileId,
        advance,
        now,
      })
    : null;

  await appendUnifiedLearningEvents(input.userId, [
    ...events,
    ...(review?.scheduledEvent ? [review.scheduledEvent] : []),
  ]);

  return {
    ok: true,
    recorded: events.length,
    review: review === null ? "skipped-no-shaky" : review.status,
  };
}
