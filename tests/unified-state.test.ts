import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import * as crypto from "node:crypto";

/**
 * ZCODE-M3 Phase 2：统一读取层（feed 标签/href/顺序、已删除回落、continueTarget）。
 * 隔离 SQLite；seed 三种 contentType 事件 + 用户自有 Clew 数据（教材/章/KP）。
 */

const testDir = mkdtempSync(path.join(tmpdir(), "nur-unified-state-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

describe("Unified state — 学习动态与继续学习", async () => {
  const { prisma } = await import("../src/lib/prisma");
  const { selectUnifiedLearningFeed, selectContinueLearningTarget } = await import("../src/lib/unified-state");
  const { publishedCourses } = await import("../src/content/courses");

  // 取一个真实注册 KP（保证 official-kp 标签解析成功路径可测）
  const registeredCourse = publishedCourses.find((course) => course.knowledgePoints.length > 0);
  const registeredKp = registeredCourse?.knowledgePoints[0];
  assert.ok(registeredCourse && registeredKp, "注册课程应至少有一个知识点");

  // 取一个真实的 课程slug/章slug 组合（保证 qb-chapter 标签解析成功路径可测）
  const qbCourse = publishedCourses.find((course) => course.chapters.length > 0);
  const qbChapter = qbCourse?.chapters[0];
  assert.ok(qbCourse && qbChapter, "注册课程应至少有一章");
  const qbContentId = `${qbCourse.slug}/${qbChapter.slug}`;

  const userId = `us-${crypto.randomUUID()}`;

  before(async () => {
    await prisma.user.create({
      data: { id: userId, email: `${userId}@example.com`, passwordHash: "x", displayName: "读取层测试" },
    });

    // 用户自有 Clew 数据：教材 → 章 → KP
    const textbook = await prisma.clewTextbook.create({
      data: {
        userId,
        title: "测试教材",
        fileName: "book.pdf",
        storageKey: `clew/${userId}/book.pdf`,
        sizeBytes: 1024,
        pageCount: 50,
        status: "ready",
        activeMonth: "2026-10",
      },
    });
    const chapter = await prisma.clewChapter.create({
      data: { textbookId: textbook.id, order: 2, title: "第二章 望诊", pageStart: 10, pageEnd: 30, source: "manual", status: "extracted" },
    });
    const kp = await prisma.clewKnowledgePoint.create({
      data: {
        chapterId: chapter.id,
        order: 1,
        title: "望舌色",
        description: "舌色变化的临床意义。",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 12,
        loopProfileId: "concept-mastery",
      },
    });

    // 三种 contentType 的事件（时间递增，验证 desc 排序）
    await prisma.unifiedLearningEvent.createMany({
      data: [
        {
          userId,
          contentType: "official-kp",
          contentId: registeredKp.id,
          profileId: "full-loop",
          stage: "assess",
          eventType: "attempt-confirmed",
          payload: { kind: "attempt", attemptId: "a1", taskId: "t1", courseId: registeredCourse.id, surface: "subjective-writing", confirmedAt: "2026-10-02T01:00:00.000Z" },
          sourceKey: "attempt:a1",
          timestamp: new Date("2026-10-02T01:00:00.000Z"),
        },
        {
          userId,
          contentType: "qb-chapter",
          contentId: qbContentId,
          profileId: "exam-cram",
          stage: "practice",
          eventType: "attempt-confirmed",
          payload: { kind: "qb-attempt", questionId: "q1", isCorrect: false, attemptedAt: "2026-10-02T02:00:00.000Z" },
          sourceKey: "qb-attempt:k1",
          timestamp: new Date("2026-10-02T02:00:00.000Z"),
        },
        {
          userId,
          contentType: "clew-kp",
          contentId: kp.id,
          profileId: "concept-mastery",
          stage: "learn",
          eventType: "stage-entered",
          payload: { kind: "stage", enteredAt: "2026-10-02T03:00:00.000Z" },
          sourceKey: `clew-session:s1:stage:learn:active`,
          timestamp: new Date("2026-10-02T03:00:00.000Z"),
        },
        {
          userId,
          contentType: "clew-kp",
          contentId: "deleted-kp-id",
          profileId: "full-loop",
          stage: "learn",
          eventType: "session-started",
          payload: { kind: "session" },
          sourceKey: "clew-session:s2:started",
          timestamp: new Date("2026-10-02T04:00:00.000Z"),
        },
      ],
    });

    // continueTarget 数据：最近 active 会话（learn completed，assess 未进）
    await prisma.clewStudySession.create({
      data: {
        userId,
        textbookId: textbook.id,
        chapterId: chapter.id,
        kpId: kp.id,
        profileId: "concept-mastery",
        stageStates: { learn: { status: "completed", completedAt: "2026-10-02T05:00:00.000Z" } },
        status: "active",
      },
    });
  });

  after(async () => {
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  it("feed：timestamp desc 排序 + 三种 contentType 的标签与 href 规则", async () => {
    const feed = await selectUnifiedLearningFeed(userId, 10);
    assert.equal(feed.length, 4);

    // 最新在前：已删除 KP 的 session-started
    const [deletedItem, clewItem, qbItem, officialItem] = feed;
    assert.equal(deletedItem.sourceLabel, "Clew");
    assert.equal(deletedItem.title, "已删除的内容");
    assert.equal(deletedItem.href, null);

    // Clew KP：标题/教材/href 深链
    assert.equal(clewItem.title, "望舌色");
    assert.equal(clewItem.detail, "测试教材");
    assert.equal(clewItem.summary, "进入环节「学」");
    assert.ok(clewItem.href?.includes("/c/2?kp="), `深链应含章节与 KP：${clewItem.href}`);

    // 题库：课程/章标题 + 章节练习页 href（与错题中心回跳同规则）
    assert.equal(qbItem.sourceLabel, "题库");
    assert.equal(qbItem.title, qbChapter.title);
    assert.equal(qbItem.detail, qbCourse.title);
    assert.equal(qbItem.summary, "完成了一次练习");
    assert.equal(qbItem.href, `/courses/${qbCourse.slug}/question-bank/${qbChapter.slug}`);

    // 官方课：注册 KP 解析成功 → 课程名 + KP 标题 + 知识点页 href
    assert.equal(officialItem.sourceLabel, "官方课");
    assert.equal(officialItem.title, registeredKp.title);
    assert.equal(officialItem.detail, registeredCourse.title);
    assert.equal(
      officialItem.href,
      `/courses/${registeredCourse.slug}/knowledge-points/${registeredKp.slug}`,
    );
  });

  it("feed：limit 生效；空数据返回空数组", async () => {
    const limited = await selectUnifiedLearningFeed(userId, 2);
    assert.equal(limited.length, 2);

    const empty = await selectUnifiedLearningFeed(`nobody-${crypto.randomUUID()}`);
    assert.deepEqual(empty, []);
  });

  it("continueTarget：最近 active 会话 → 深链 + 下一环节（learn 完成后应为「评」）", async () => {
    const target = await selectContinueLearningTarget(userId);
    assert.ok(target);
    assert.equal(target.kpTitle, "望舌色");
    assert.equal(target.textbookTitle, "测试教材");
    assert.equal(target.stageLabel, "评"); // concept-mastery: 学→评→复；learn completed → 下一步 assess(评)
    assert.ok(target.href.includes("/c/2?kp="));
  });

  it("continueTarget：无 active 会话返回 null", async () => {
    const target = await selectContinueLearningTarget(`nobody-${crypto.randomUUID()}`);
    assert.equal(target, null);
  });
});
