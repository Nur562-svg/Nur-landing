import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * ZCODE-M5：Clew FSRS 复习调度。
 * 锁定：
 * - 自测「还需看」→ ClewReviewItem upsert（首见建条目 dueAt=now；再见按 again 前移）；
 * - 同讲义版本重复提交不动 FSRS 状态（幂等）；
 * - exploration（fsrsEnabled=false）不建条目；
 * - review-scheduled 只在建条目时发一次；review-completed 每轮打分一次（sourceKey 幂等）；
 * - 打分（again/hard/good）与 fsrs.ts 纯函数直算结果一致（Tier 2 零改动的对照证据）；
 * - 属主校验与到期查询过滤。
 * 隔离 SQLite（payment-service.test.ts 模式：mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-clew-reviews-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

const DAY_MS = 24 * 60 * 60 * 1000;

describe("Clew FSRS 复习调度（ZCODE-M5）", async () => {
  const { prisma } = await import("@/lib/prisma");
  const { recordClewSelfCheck } = await import("@/lib/clew/self-check");
  const {
    rateClewReviewItem,
    listClewReviews,
    CLEW_REVIEW_SOURCE_KIND,
  } = await import("@/lib/clew/reviews");
  const { createNewFsrsState, fsrsScheduleReview, defaultFsrsParameters } = await import("@/lib/fsrs");

  async function seedKp(kpId: string, loopProfileId: string): Promise<void> {
    await prisma.clewKnowledgePoint.create({
      data: {
        id: kpId,
        chapterId: "ch-1",
        order: 1,
        title: `知识点 ${kpId}`,
        description: "复习调度测试",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 3,
        loopProfileId,
      },
    });
  }

  it("自测「还需看」→ 建复习条目（dueAt=now 即今日到期）+ review-scheduled 事件一次", async () => {
    await prisma.user.create({
      data: { id: "u-rev", email: "reviews@test.dev", passwordHash: "x", displayName: "Reviews" },
    });
    await prisma.clewTextbook.create({
      data: {
        id: "tb-1",
        userId: "u-rev",
        title: "测试教材",
        fileName: "book.pdf",
        storageKey: "clew/u-rev/tb-1/book.pdf",
        sizeBytes: 1024,
        pageCount: 10,
        activeMonth: "2026-10",
      },
    });
    await prisma.clewChapter.create({
      data: {
        id: "ch-1",
        textbookId: "tb-1",
        order: 1,
        title: "第一章",
        pageStart: 1,
        pageEnd: 10,
        source: "outline",
      },
    });
    await seedKp("kp-fsrs", "skill-application");

    const before = Date.now();
    const result = await recordClewSelfCheck({
      userId: "u-rev",
      kpId: "kp-fsrs",
      lessonGeneratedAt: "2026-10-05T01:00:00.000Z",
      items: [{ index: 1, shaky: true }],
    });
    assert.deepEqual(result, { ok: true, recorded: 1, review: "created" });

    const item = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-rev", kpId: "kp-fsrs", sourceKind: CLEW_REVIEW_SOURCE_KIND } },
    });
    assert.ok(item);
    assert.equal(item.textbookId, "tb-1");
    assert.equal(item.reviewCount, 0);
    assert.equal(item.lapses, 0);
    assert.equal(item.stability, 0);
    assert.equal(item.suspended, false);
    assert.ok(Math.abs(item.dueAt.getTime() - before) < 5000, "dueAt=now（今日到期）");

    const scheduled = await prisma.unifiedLearningEvent.findMany({
      where: { eventType: "review-scheduled" },
    });
    assert.equal(scheduled.length, 1);
    assert.equal(scheduled[0].contentType, "clew-kp");
    assert.equal(scheduled[0].contentId, "kp-fsrs");
    assert.equal(scheduled[0].stage, "review");
    assert.equal(scheduled[0].profileId, "skill-application");
    assert.equal(scheduled[0].sourceKey, "clew-review:kp-fsrs:self-check-shaky:scheduled");

    // 「我的学习」到期查询可见
    const due = await listClewReviews("u-rev", { due: true });
    assert.equal(due.dueCount, 1);
    assert.equal(due.items.length, 1);
    assert.equal(due.items[0].kpTitle, "知识点 kp-fsrs");
    assert.equal(due.items[0].textbookTitle, "测试教材");
    assert.ok(due.items[0].href.includes("/learn/clew/t/tb-1/c/1?kp=kp-fsrs"));
  });

  it("同讲义版本重复提交幂等：FSRS 状态不动、不重复发事件", async () => {
    const result = await recordClewSelfCheck({
      userId: "u-rev",
      kpId: "kp-fsrs",
      lessonGeneratedAt: "2026-10-05T01:00:00.000Z",
      items: [{ index: 1, shaky: true }],
    });
    assert.deepEqual(result, { ok: true, recorded: 1, review: "unchanged" });

    const item = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-rev", kpId: "kp-fsrs", sourceKind: CLEW_REVIEW_SOURCE_KIND } },
    });
    assert.equal(item?.reviewCount, 0);
    assert.equal(await prisma.unifiedLearningEvent.count({ where: { eventType: "review-scheduled" } }), 1);
  });

  it("新讲义版本再标「还需看」→ 按 again 前移（与 fsrs.ts 纯函数直算一致）", async () => {
    const before = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-rev", kpId: "kp-fsrs", sourceKind: CLEW_REVIEW_SOURCE_KIND } },
    });
    assert.ok(before);

    const result = await recordClewSelfCheck({
      userId: "u-rev",
      kpId: "kp-fsrs",
      lessonGeneratedAt: "2026-10-05T09:00:00.000Z",
      items: [{ index: 1, shaky: true }],
    });
    assert.deepEqual(result, { ok: true, recorded: 1, review: "advanced" });

    const after = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-rev", kpId: "kp-fsrs", sourceKind: CLEW_REVIEW_SOURCE_KIND } },
    });
    assert.ok(after);
    // 对照：fsrsScheduleReview(新建态, "again") 的直算结果
    const expected = fsrsScheduleReview(
      { ...createNewFsrsState(), lastReviewAt: before.lastReviewedAt.toISOString() },
      "again",
      after.lastReviewedAt.toISOString(),
      defaultFsrsParameters(),
    );
    assert.equal(after.reviewCount, expected.nextState.reps);
    assert.equal(after.lapses, expected.nextState.lapses);
    assert.ok(Math.abs(after.stability - expected.nextState.stability) < 1e-9);
    assert.ok(Math.abs(after.difficulty - expected.nextState.difficulty) < 1e-9);
    assert.ok(Math.abs(after.dueAt.getTime() - Date.parse(expected.dueAt)) < 1000);
    assert.equal(expected.nextState.reps, 1);
    assert.equal(expected.nextState.lapses, 1);
  });

  it("fsrsEnabled=false（exploration）不建条目、不发 scheduled 事件", async () => {
    await seedKp("kp-explore", "exploration");
    const result = await recordClewSelfCheck({
      userId: "u-rev",
      kpId: "kp-explore",
      lessonGeneratedAt: "2026-10-05T01:00:00.000Z",
      items: [{ index: 1, shaky: true }],
    });
    assert.deepEqual(result, { ok: true, recorded: 1, review: "skipped-profile" });

    // wrong-question-added 事件仍写入（自测提交语义不变）
    assert.equal(
      await prisma.unifiedLearningEvent.count({ where: { contentId: "kp-explore", eventType: "wrong-question-added" } }),
      1,
    );
    assert.equal(await prisma.clewReviewItem.count({ where: { kpId: "kp-explore" } }), 0);
    assert.equal(
      await prisma.unifiedLearningEvent.count({ where: { contentId: "kp-explore", eventType: "review-scheduled" } }),
      0,
    );
  });

  it("三键打分：good → FSRS 前移 + review-completed 事件 + 到期顺延（从「今日到期」消失）", async () => {
    const itemBefore = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-rev", kpId: "kp-fsrs", sourceKind: CLEW_REVIEW_SOURCE_KIND } },
    });
    assert.ok(itemBefore);
    assert.equal(itemBefore.reviewCount, 1);

    const beforeMs = Date.now();
    const result = await rateClewReviewItem({ userId: "u-rev", itemId: itemBefore.id, rating: "good" });
    assert.equal(result.ok, true);

    const after = await prisma.clewReviewItem.findUnique({ where: { id: itemBefore.id } });
    assert.ok(after);
    assert.equal(after.reviewCount, 2);

    // 对照：good 打分与 fsrs.ts 直算一致
    const expected = fsrsScheduleReview(
      {
        state: "review", // reviewCount>0 的重建态（fsrsNextState 只在 new/reps=0 特判）
        difficulty: itemBefore.difficulty,
        stability: itemBefore.stability,
        reps: itemBefore.reviewCount,
        lapses: itemBefore.lapses,
        lastReviewAt: itemBefore.lastReviewedAt.toISOString(),
      },
      "good",
      after.lastReviewedAt.toISOString(),
      defaultFsrsParameters(),
    );
    assert.ok(Math.abs(after.stability - expected.nextState.stability) < 1e-9);
    assert.ok(Math.abs(after.dueAt.getTime() - Date.parse(expected.dueAt)) < 1000);
    assert.ok(after.dueAt.getTime() > beforeMs, "打分后到期时间顺延");

    // 事件：review-completed 一次，sourceKey 带轮次
    const completed = await prisma.unifiedLearningEvent.findMany({ where: { eventType: "review-completed" } });
    assert.equal(completed.length, 1);
    assert.equal(completed[0].sourceKey, `clew-review:${itemBefore.id}:rated:2`);
    assert.equal(completed[0].stage, "review");

    // 今日到期消失（dueCount=0；默认列表仍在，供错题中心消费）
    const due = await listClewReviews("u-rev", { due: true });
    assert.equal(due.dueCount, 0);
    assert.equal(due.items.length, 0);
    const all = await listClewReviews("u-rev", {});
    assert.equal(all.items.length, 1);
    assert.equal(all.items[0].reviewCount, 2);
    assert.equal(all.items[0].lapses, 1);
  });

  it("打分属主校验：他人条目返回 not-found；单点查询 ?kp 返回当前状态", async () => {
    const mine = await prisma.clewReviewItem.findFirst({ where: { userId: "u-rev" } });
    assert.ok(mine);
    const other = await rateClewReviewItem({ userId: "u-other", itemId: mine.id, rating: "good" });
    assert.equal(other.ok, false);
    if (!other.ok) {
      assert.equal(other.status, 404);
      assert.equal(other.code, "not-found");
    }

    const kpView = await listClewReviews("u-rev", { kpId: "kp-fsrs" });
    assert.equal(kpView.items.length, 1);
    assert.equal(kpView.items[0].id, mine.id);
  });
});
