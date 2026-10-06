// 与 payment/service.ts、unified-events.ts、self-check.ts 同一约定：注释标注 server-only
// （只被服务端 API/页面引用），不写 `import "server-only"`，使 node:test 可导入做隔离 SQLite 验证。
import { prisma } from "@/lib/prisma";
import { appendUnifiedLearningEvents } from "@/lib/unified-events";
import { defaultFsrsParameters, fsrsScheduleReview, type FsrsRating } from "@/lib/fsrs";import type { FsrsCriterionState } from "@/types/learning";
import { isLoopProfileId, LOOP_PROFILES, type LoopProfileId } from "@/types/loop-profile";
import type {
  ClewReviewItemStudyView,
  ClewReviewItemView,
  ClewTodayReviewItem,
  ClewErrorCode,
} from "@/types/clew";
import type { UnifiedLearningEventInput } from "@/types/unified-learning";

/**
 * Clew FSRS 复习调度（ZCODE-M5，任务书 docs/ZCODE-M5-review-scheduling.md §3.1/3.2）。
 * 写入点 = 自测「还需看」（self-check.ts 调 upsertClewReviewFromSelfCheck）；
 * 完成点 = 复习回流后的三键打分（rateClewReviewItem，again/hard/good → fsrsScheduleReview 前移）。
 * profile fsrsEnabled=false（exploration）不建条目——fsrsEnabled 的首次真实消费。
 * fsrs.ts（Tier 2）零改动，只消费其纯函数。
 */

/** M5 唯一写入来源：自测「还需看」。 */
export const CLEW_REVIEW_SOURCE_KIND = "self-check-shaky";

/** M6 第二写入来源：练习错答（A1 判错 / fill 自评错）。 */
export const CLEW_REVIEW_SOURCE_PRACTICE = "practice-wrong";

export type ClewReviewRating = FsrsRating;

export type ClewReviewFailure = {
  ok: false;
  status: number;
  code: ClewErrorCode;
  message: string;
};

type ReviewRowBase = {
  difficulty: number;
  stability: number;
  reviewCount: number;
  lapses: number;
  lastReviewedAt: Date;
};

/** 行 → FSRS 状态重建：reviewCount=reps，0 视为 new（fsrsNextState 只在 new/reps=0 分支特殊处理）。 */
function reviewRowToFsrsState(row: ReviewRowBase): FsrsCriterionState {
  return {
    state: row.reviewCount === 0 ? "new" : "review",
    difficulty: row.difficulty,
    stability: row.stability,
    reps: row.reviewCount,
    lapses: row.lapses,
    lastReviewAt: row.lastReviewedAt.toISOString(),
  };
}

const reviewKpInclude = {
  kp: {
    select: {
      id: true,
      title: true,
      loopProfileId: true,
      chapter: {
        select: { order: true, textbook: { select: { id: true, title: true } } },
      },
    },
  },
} as const;

type ReviewRowWithKp = {
  id: string;
  kpId: string;
  textbookId: string;
  sourceKind: string;
  stability: number;
  difficulty: number;
  lastReviewedAt: Date;
  dueAt: Date;
  reviewCount: number;
  lapses: number;
  suspended: boolean;
  kp: {
    id: string;
    title: string;
    loopProfileId: string;
    chapter: { order: number; textbook: { id: string; title: string } };
  };
};

function toReviewItemView(row: ReviewRowWithKp): ClewReviewItemView {
  return {
    id: row.id,
    kpId: row.kpId,
    kpTitle: row.kp.title,
    textbookId: row.textbookId,
    textbookTitle: row.kp.chapter.textbook.title,
    chapterOrder: row.kp.chapter.order,
    href: `/learn/clew/t/${row.textbookId}/c/${row.kp.chapter.order}?kp=${row.kpId}${
      row.sourceKind === "practice-wrong" ? "#practice" : ""
    }`,
    sourceKind: row.sourceKind,
    stability: row.stability,
    difficulty: row.difficulty,
    lastReviewedAt: row.lastReviewedAt.toISOString(),
    dueAt: row.dueAt.toISOString(),
    reviewCount: row.reviewCount,
    lapses: row.lapses,
    suspended: row.suspended,
  };
}

/** upsert 结果四态（调用方据此给用户诚实反馈）。 */
export type ClewReviewUpsertStatus =
  | "created" // 首见建条目（附带 review-scheduled 事件）
  | "advanced" // 再见按 again 前移
  | "unchanged" // 同版本重复提交，FSRS 状态不动（幂等）
  | "skipped-profile"; // profile fsrsEnabled=false，不进调度

/** 自测「还需看」→ 复习条目 upsert（首见建 new 态、即期到期；再见按 again 前移）。
 *  advance=false（同讲义版本重复提交）不动 FSRS 状态——幂等由调用方以「是否有新 shaky 事件」判定。
 *  返回 scheduledEvent 供调用方与自己的事件合并一次写入（review-scheduled 只在建条目时发一次）。 */
export async function upsertClewReviewFromSelfCheck(input: {
  userId: string;
  kpId: string;
  textbookId: string;
  profileId: string;
  advance: boolean;
  now: Date;
}): Promise<{ status: ClewReviewUpsertStatus; scheduledEvent: UnifiedLearningEventInput | null }> {
  const profileId: LoopProfileId = isLoopProfileId(input.profileId) ? input.profileId : "full-loop";
  // fsrsEnabled 首次真实消费：exploration 等不进调度的 profile 不建条目
  if (!LOOP_PROFILES[profileId].fsrsEnabled) {
    return { status: "skipped-profile", scheduledEvent: null };
  }

  const existing = await prisma.clewReviewItem.findUnique({
    where: {
      userId_kpId_sourceKind: {
        userId: input.userId,
        kpId: input.kpId,
        sourceKind: CLEW_REVIEW_SOURCE_KIND,
      },
    },
  });

  if (!existing) {
    const created = await prisma.clewReviewItem.create({
      data: {
        userId: input.userId,
        kpId: input.kpId,
        textbookId: input.textbookId,
        sourceKind: CLEW_REVIEW_SOURCE_KIND,
        // createNewFsrsState() 的行内等价：S=0/D=0/reps=0；dueAt=now 即「今日到期」
        stability: 0,
        difficulty: 0,
        lastReviewedAt: input.now,
        dueAt: input.now,
      },
    });
    return {
      status: "created",
      scheduledEvent: {
        contentType: "clew-kp",
        contentId: input.kpId,
        profileId,
        stage: "review",
        eventType: "review-scheduled",
        payload: { kind: "review", reviewItemId: created.id, kpId: input.kpId },
        sourceKey: `clew-review:${input.kpId}:${CLEW_REVIEW_SOURCE_KIND}:scheduled`,
        timestamp: input.now.toISOString(),
      },
    };
  }

  if (!input.advance) {
    return { status: "unchanged", scheduledEvent: null };
  }
  // 再见（新讲义版本/新增 shaky 题）：仍标记「还需看」= again，按 FSRS 前移
  const { nextState, dueAt } = fsrsScheduleReview(
    reviewRowToFsrsState(existing),
    "again",
    input.now.toISOString(),
    defaultFsrsParameters(),
  );
  await prisma.clewReviewItem.update({
    where: { id: existing.id },
    data: {
      stability: nextState.stability,
      difficulty: nextState.difficulty,
      lastReviewedAt: input.now,
      dueAt: new Date(dueAt),
      reviewCount: nextState.reps,
      lapses: nextState.lapses,
    },
  });
  return { status: "advanced", scheduledEvent: null };
}

/** GET /api/clew/reviews：?due=1 今日到期（dueAt <= now 且未暂停）；?kp=ID 单点状态（含暂停条目）。 */
export async function listClewReviews(
  userId: string,
  options: { due?: boolean; kpId?: string; limit?: number } = {},
): Promise<{ items: ClewReviewItemView[]; dueCount: number }> {
  const now = new Date();
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
  const kpId = options.kpId?.trim() || undefined;

  const rows = await prisma.clewReviewItem.findMany({
    where: {
      userId,
      ...(kpId ? { kpId } : { suspended: false }),
      ...(options.due && !kpId ? { dueAt: { lte: now } } : {}),
      kp: { chapter: { textbook: { deletedAt: null } } },
    },
    orderBy: { dueAt: "asc" },
    take: limit,
    include: reviewKpInclude,
  });

  const dueCount = kpId
    ? rows.filter((row) => !row.suspended && row.dueAt.getTime() <= now.getTime()).length
    : await prisma.clewReviewItem.count({
        where: {
          userId,
          suspended: false,
          dueAt: { lte: now },
          kp: { chapter: { textbook: { deletedAt: null } } },
        },
      });

  return { items: rows.map(toReviewItemView), dueCount };
}

/** 学习页内嵌轻量状态（study.ts 组装 ClewKnowledgePointStudyView 用）。 */
export async function getClewKpReviewStudyItem(
  userId: string,
  kpId: string,
): Promise<ClewReviewItemStudyView | null> {
  const row = await prisma.clewReviewItem.findUnique({
    where: {
      userId_kpId_sourceKind: { userId, kpId, sourceKind: CLEW_REVIEW_SOURCE_KIND },
    },
    select: { id: true, dueAt: true, reviewCount: true, lapses: true },
  });
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    dueAt: row.dueAt.toISOString(),
    due: row.dueAt.getTime() <= Date.now(),
    reviewCount: row.reviewCount,
    lapses: row.lapses,
  };
}

/** PATCH /api/clew/reviews/[id]：三键打分（again/hard/good）→ FSRS 前移 + review-completed 事件。 */
export async function rateClewReviewItem(input: {
  userId: string;
  itemId: string;
  rating: ClewReviewRating;
}): Promise<{ ok: true; item: ClewReviewItemView } | ClewReviewFailure> {
  const row = await prisma.clewReviewItem.findFirst({
    where: {
      id: input.itemId,
      userId: input.userId,
      kp: { chapter: { textbook: { deletedAt: null } } },
    },
    include: reviewKpInclude,
  });
  if (!row) {
    return { ok: false, status: 404, code: "not-found", message: "复习条目不存在或已随教材删除。" };
  }

  const now = new Date();
  const { nextState, dueAt } = fsrsScheduleReview(
    reviewRowToFsrsState(row),
    input.rating,
    now.toISOString(),
    defaultFsrsParameters(),
  );
  const updated = await prisma.clewReviewItem.update({
    where: { id: row.id },
    data: {
      stability: nextState.stability,
      difficulty: nextState.difficulty,
      lastReviewedAt: now,
      dueAt: new Date(dueAt),
      reviewCount: nextState.reps,
      lapses: nextState.lapses,
    },
    include: reviewKpInclude,
  });

  const profileId: LoopProfileId = isLoopProfileId(row.kp.loopProfileId)
    ? row.kp.loopProfileId
    : "full-loop";
  await appendUnifiedLearningEvents(input.userId, [
    {
      contentType: "clew-kp",
      contentId: row.kpId,
      profileId,
      stage: "review",
      eventType: "review-completed",
      payload: {
        kind: "review",
        reviewItemId: row.id,
        kpId: row.kpId,
        rating: input.rating,
        dueAt,
      },
      // reviewCount（打分后）即第几轮复习，天然区分多次打分；同轮重放幂等
      sourceKey: `clew-review:${row.id}:rated:${nextState.reps}`,
      timestamp: now.toISOString(),
    },
  ]);

  return { ok: true, item: toReviewItemView(updated) };
}

/**
 * ZCODE-M6：练习作答的 FSRS 回流（sourceKind="practice-wrong"，per-KP 条目）。
 * 语义与自测回流同构：条目缺失且答错 → 建条目（dueAt=now，即「今日到期」）+ review-scheduled；
 * 条目已存在：答错 → 按 again 前移（遗忘路径），答对 → 按 good 前移（巩固路径，从今日到期消失）；
 * fsrsEnabled=false 的 profile 不建条目不前移。答对且无条目 → 无动作（不凭空建调度）。
 */
export async function recordClewPracticeReviewOutcome(input: {
  userId: string;
  kpId: string;
  textbookId: string;
  profileId: string;
  isCorrect: boolean;
  now: Date;
}): Promise<{
  status: "created" | "advanced" | "none" | "skipped-profile";
  scheduledEvent: UnifiedLearningEventInput | null;
  completedEvent: UnifiedLearningEventInput | null;
}> {
  const profileId: LoopProfileId = isLoopProfileId(input.profileId) ? input.profileId : "full-loop";
  if (!LOOP_PROFILES[profileId].fsrsEnabled) {
    return { status: "skipped-profile", scheduledEvent: null, completedEvent: null };
  }

  const existing = await prisma.clewReviewItem.findUnique({
    where: {
      userId_kpId_sourceKind: {
        userId: input.userId,
        kpId: input.kpId,
        sourceKind: CLEW_REVIEW_SOURCE_PRACTICE,
      },
    },
  });

  if (!existing) {
    if (!input.isCorrect) {
      const created = await prisma.clewReviewItem.create({
        data: {
          userId: input.userId,
          kpId: input.kpId,
          textbookId: input.textbookId,
          sourceKind: CLEW_REVIEW_SOURCE_PRACTICE,
          stability: 0,
          difficulty: 0,
          lastReviewedAt: input.now,
          dueAt: input.now,
        },
      });
      return {
        status: "created",
        scheduledEvent: {
          contentType: "clew-kp",
          contentId: input.kpId,
          profileId,
          stage: "review",
          eventType: "review-scheduled",
          payload: { kind: "review", reviewItemId: created.id, kpId: input.kpId },
          sourceKey: `clew-review:${input.kpId}:${CLEW_REVIEW_SOURCE_PRACTICE}:scheduled`,
          timestamp: input.now.toISOString(),
        },
        completedEvent: null,
      };
    }
    return { status: "none", scheduledEvent: null, completedEvent: null };
  }

  // 条目已存在：错 = again（遗忘），对 = good（巩固）
  const rating: FsrsRating = input.isCorrect ? "good" : "again";
  const { nextState, dueAt } = fsrsScheduleReview(
    reviewRowToFsrsState(existing),
    rating,
    input.now.toISOString(),
    defaultFsrsParameters(),
  );
  await prisma.clewReviewItem.update({
    where: { id: existing.id },
    data: {
      stability: nextState.stability,
      difficulty: nextState.difficulty,
      lastReviewedAt: input.now,
      dueAt: new Date(dueAt),
      reviewCount: nextState.reps,
      lapses: nextState.lapses,
    },
  });
  return {
    status: "advanced",
    scheduledEvent: null,
    completedEvent: {
      contentType: "clew-kp",
      contentId: input.kpId,
      profileId,
      stage: "review",
      eventType: "review-completed",
      payload: {
        kind: "review",
        reviewItemId: existing.id,
        kpId: input.kpId,
        rating,
        dueAt,
      },
      // 练习驱动的打分轮次：以练习前缀区分于三键打分的 rated 键
      sourceKey: `clew-review:${existing.id}:practice-rated:${nextState.reps}`,
      timestamp: input.now.toISOString(),
    },
  };
}

/** 错题中心 Clew 线（服务端聚合）：全部未暂停条目，最近活动在前。 */export async function listClewWrongItems(userId: string): Promise<ClewReviewItemView[]> {
  const rows = await prisma.clewReviewItem.findMany({
    where: {
      userId,
      suspended: false,
      kp: { chapter: { textbook: { deletedAt: null } } },
    },
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: reviewKpInclude,
  });
  return rows.map(toReviewItemView);
}

const UPCOMING_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * 「我的学习 · 今日复习」选择器（ZCODE-M5 §3.3）：已到期 + 7 天内即将到期（dueAt 升序，到期在前），
 * status 由服务端定死（避免客户端时钟/水合漂移）；dueCount 为全部已到期数（右栏计数用，不受行数截断影响）。
 */
export async function selectClewTodayReviews(
  userId: string,
  maxRows = 8,
): Promise<{ items: ClewTodayReviewItem[]; dueCount: number }> {
  const now = new Date();
  const rows = await prisma.clewReviewItem.findMany({
    where: {
      userId,
      suspended: false,
      dueAt: { lte: new Date(now.getTime() + UPCOMING_WINDOW_MS) },
      kp: { chapter: { textbook: { deletedAt: null } } },
    },
    orderBy: { dueAt: "asc" },
    take: Math.min(Math.max(maxRows, 1), 20),
    include: reviewKpInclude,
  });
  const items = rows.map((row) => ({
    ...toReviewItemView(row),
    status: row.dueAt.getTime() <= now.getTime() ? ("due" as const) : ("upcoming" as const),
  }));
  const dueCount = await prisma.clewReviewItem.count({
    where: {
      userId,
      suspended: false,
      dueAt: { lte: now },
      kp: { chapter: { textbook: { deletedAt: null } } },
    },
  });
  return { items, dueCount };
}
