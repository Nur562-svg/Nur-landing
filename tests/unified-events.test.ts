import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import * as crypto from "node:crypto";

/**
 * ZCODE-M3 Phase 1：统一学习事件 builder 与幂等写入。
 * 隔离 SQLite（payment-service.test.ts 模式：mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-unified-events-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

const baseSession = {
  id: "sess-1",
  userId: "u1",
  contentType: "clew-kp" as const,
  contentId: "kp-1",
  profileId: "concept-mastery" as const,
  currentStageIndex: 0,
  stageStates: {
    learn: { status: "completed" as const, completedAt: "2026-10-02T01:00:00.000Z" },
    assess: { status: "active" as const, enteredAt: "2026-10-02T02:00:00.000Z" },
  },
  startedAt: "2026-10-02T00:00:00.000Z",
  completedAt: null,
};

describe("UnifiedLearningEvent builders + 幂等写入", async () => {
  const {
    buildClewSessionStartedEvent,
    buildClewStageEnteredEvent,
    buildClewStageCompletedEvent,
    buildClewSessionCompletedEvent,
    buildOfficialAttemptEvent,
    buildQbAttemptEvent,
    officialSurfaceToStage,
    appendUnifiedLearningEvents,
  } = await import("../src/lib/unified-events");
  const { prisma } = await import("../src/lib/prisma");

  const userId = `ue-${crypto.randomUUID()}`;
  const users: string[] = [userId];

  before(async () => {
    await prisma.user.create({
      data: { id: userId, email: `${userId}@example.com`, passwordHash: "x", displayName: "事件测试" },
    });
  });

  after(async () => {
    await prisma.user.deleteMany({ where: { id: { in: users } } });
    await prisma.$disconnect();
  });

  it("会话事件 builder：字段映射与 sourceKey 格式（任务书 1.3 表）", () => {
    const started = buildClewSessionStartedEvent(baseSession);
    assert.deepEqual(
      { ...started, timestamp: undefined },
      {
        contentType: "clew-kp",
        contentId: "kp-1",
        profileId: "concept-mastery",
        stage: "learn", // concept-mastery.entryStage
        eventType: "session-started",
        payload: { kind: "session" },
        sourceKey: "clew-session:sess-1:started",
        timestamp: undefined,
      },
    );

    const entered = buildClewStageEnteredEvent(baseSession, "review", "2026-10-02T03:00:00.000Z");
    assert.equal(entered.stage, "review");
    assert.equal(entered.eventType, "stage-entered");
    assert.equal(entered.sourceKey, "clew-session:sess-1:stage:review:active");
    assert.deepEqual(entered.payload, { kind: "stage", enteredAt: "2026-10-02T03:00:00.000Z" });

    const completedStage = buildClewStageCompletedEvent(baseSession, "learn", "completed", "2026-10-02T01:00:00.000Z");
    assert.equal(completedStage.eventType, "stage-completed");
    assert.equal(completedStage.sourceKey, "clew-session:sess-1:stage:learn:completed");

    const skippedStage = buildClewStageCompletedEvent(baseSession, "review", "skipped", "2026-10-02T04:00:00.000Z");
    assert.equal(skippedStage.sourceKey, "clew-session:sess-1:stage:review:skipped");
  });

  it("会话完成事件：stage 取最后激活环节，payload 为 stageStates 摘要", () => {
    const done = buildClewSessionCompletedEvent(baseSession, "2026-10-02T05:00:00.000Z");
    assert.equal(done.eventType, "session-completed");
    assert.equal(done.sourceKey, "clew-session:sess-1:completed");
    assert.equal(done.stage, "assess"); // assess(active) 晚于 learn(completed)
    assert.deepEqual(done.payload, {
      kind: "session-summary",
      totalStages: 3, // concept-mastery: learn/assess/review
      completedStages: 1,
      skippedStages: 0,
    });
  });

  it("官方课作答事件：surface 映射（writing→assess、case-reasoning→transfer）与 profileId=full-loop", () => {
    assert.equal(officialSurfaceToStage("subjective-writing"), "assess");
    assert.equal(officialSurfaceToStage("case-reasoning"), "transfer");
    assert.equal(officialSurfaceToStage("anything-else"), "assess");

    const event = buildOfficialAttemptEvent({
      knowledgePointId: "kp-official",
      attemptId: "at-1",
      taskId: "task-1",
      courseId: "course-1",
      surface: "case-reasoning",
      confirmedAt: "2026-10-02T06:00:00.000Z",
    });
    assert.equal(event.contentType, "official-kp");
    assert.equal(event.profileId, "full-loop");
    assert.equal(event.stage, "transfer");
    assert.equal(event.sourceKey, "attempt:at-1");
  });

  it("题库作答事件：contentId={courseSlug}/{chapterSlug}、stage=practice、profileId 默认 exam-cram", () => {
    const event = buildQbAttemptEvent({
      courseSlug: "tcm-diagnostics",
      chapterSlug: "wang-zhen",
      questionId: "q-1",
      isCorrect: false,
      attemptedAt: "2026-10-02T07:00:00.000Z",
      qbContentIdentityKey: "qbkey-1",
    });
    assert.equal(event.contentType, "qb-chapter");
    assert.equal(event.contentId, "tcm-diagnostics/wang-zhen");
    assert.equal(event.stage, "practice");
    assert.equal(event.profileId, "exam-cram");
    assert.equal(event.sourceKey, "qb-attempt:qbkey-1");
  });

  it("appendUnifiedLearningEvents：同 sourceKey 调两次 → 一行（幂等）", async () => {
    const event = buildClewSessionStartedEvent(baseSession);
    await appendUnifiedLearningEvents(userId, [event]);
    await appendUnifiedLearningEvents(userId, [event]);
    const rows = await prisma.unifiedLearningEvent.findMany({
      where: { userId, sourceKey: event.sourceKey },
    });
    assert.equal(rows.length, 1);
    assert.equal(rows[0]?.eventType, "session-started");
  });

  it("appendUnifiedLearningEvents：不同事件两行；批内重复去重后一行", async () => {
    const a = buildClewStageEnteredEvent(baseSession, "learn", "2026-10-02T08:00:00.000Z");
    const b = buildClewStageEnteredEvent(baseSession, "assess", "2026-10-02T08:30:00.000Z");
    await appendUnifiedLearningEvents(userId, [a, b]);
    await appendUnifiedLearningEvents(userId, [a, a, b]); // 重跑（幂等）+ 批内重复

    const all = await prisma.unifiedLearningEvent.findMany({ where: { userId } });
    assert.equal(all.length, 3); // started + learn:active + assess:active
    const keys = all.map((row) => row.sourceKey).sort();
    assert.deepEqual(keys, [
      "clew-session:sess-1:stage:assess:active",
      "clew-session:sess-1:stage:learn:active",
      "clew-session:sess-1:started",
    ]);
  });

  it("appendUnifiedLearningEvents：写入失败不抛错（旁路契约）", async () => {
    // 传入非法 timestamp 让 Prisma 抛错，验证整体 try/catch 吞掉
    await appendUnifiedLearningEvents(userId, [
      {
        contentType: "clew-kp",
        contentId: "kp-x",
        profileId: "full-loop",
        stage: "learn",
        eventType: "session-started",
        payload: { kind: "session" },
        sourceKey: "bad-timestamp",
        timestamp: "not-a-date",
      },
    ]);
    // 到这里没有抛错即通过
    assert.ok(true);
  });
});
