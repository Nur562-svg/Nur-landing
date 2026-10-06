import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Clew 自测（「评」环节体验补丁）：「还需看」→ wrong-question-added 事件写入。
 * 锁定：逐条写入并可在库中查到 / 重复提交幂等 / 新讲义版本重新计 / 属主校验 / 格式校验。
 * 隔离 SQLite（payment-service.test.ts 模式：mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-clew-selfcheck-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

describe("Clew 自测提交（体验补丁）", async () => {
  const { prisma } = await import("@/lib/prisma");
  const { recordClewSelfCheck } = await import("@/lib/clew/self-check");

  it("「还需看」逐条写入，事件可在库中查到", async () => {
    await prisma.user.create({
      data: { id: "u-self", email: "self-check@test.dev", passwordHash: "x", displayName: "SelfCheck" },
    });
    await prisma.clewTextbook.create({
      data: {
        id: "tb-1",
        userId: "u-self",
        title: "测试教材",
        fileName: "book.pdf",
        storageKey: "clew/u-self/tb-1/book.pdf",
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
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-1",
        chapterId: "ch-1",
        order: 1,
        title: "测试知识点",
        description: "用于自测提交测试",
        keyTerms: ["测试"],
        prerequisites: [],
        sourcePage: 3,
        loopProfileId: "skill-application",
      },
    });

    const result = await recordClewSelfCheck({
      userId: "u-self",
      kpId: "kp-1",
      lessonGeneratedAt: "2026-10-02T01:00:00.000Z",
      items: [
        { index: 1, shaky: true },
        { index: 2, shaky: false },
        { index: 3, shaky: true },
      ],
    });
    // ZCODE-M5：skill-application（fsrsEnabled=true）首见同时建复习条目
    assert.deepEqual(result, { ok: true, recorded: 2, review: "created" });

    const rows = await prisma.unifiedLearningEvent.findMany({
      where: { eventType: "wrong-question-added" },
      orderBy: { sourceKey: "asc" },
    });
    assert.equal(rows.length, 2);
    assert.equal(rows[0].eventType, "wrong-question-added");
    assert.equal(rows[0].contentType, "clew-kp");
    assert.equal(rows[0].contentId, "kp-1");
    assert.equal(rows[0].stage, "assess");
    assert.equal(rows[0].profileId, "skill-application");
    assert.equal(rows[0].sourceKey, "clew-selftest:kp-1:2026-10-02T01:00:00.000Z:1");
    assert.deepEqual(rows[0].payload, {
      kind: "wrong-question",
      questionId: "kp-1#selftest-1",
      source: "clew",
    });
  });

  it("重复提交幂等（sourceKey 去重）", async () => {
    await recordClewSelfCheck({
      userId: "u-self",
      kpId: "kp-1",
      lessonGeneratedAt: "2026-10-02T01:00:00.000Z",
      items: [
        { index: 1, shaky: true },
        { index: 3, shaky: true },
      ],
    });
    assert.equal(await prisma.unifiedLearningEvent.count(), 3);
  });

  it("重新生成讲义（新版本）后重新计", async () => {
    const result = await recordClewSelfCheck({
      userId: "u-self",
      kpId: "kp-1",
      lessonGeneratedAt: "2026-10-02T09:00:00.000Z",
      items: [{ index: 1, shaky: true }],
    });
    assert.equal(result.ok, true);
    assert.equal(await prisma.unifiedLearningEvent.count(), 4);
  });

  it("属主校验：他人提交返回 not-found，且不写事件", async () => {
    const countBefore = await prisma.unifiedLearningEvent.count();
    const result = await recordClewSelfCheck({
      userId: "u-other",
      kpId: "kp-1",
      items: [{ index: 1, shaky: true }],
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 404);
      assert.equal(result.code, "not-found");
    }
    assert.equal(await prisma.unifiedLearningEvent.count(), countBefore);
  });

  it("格式校验：非法题号返回 invalid-request，不写事件", async () => {
    const countBefore = await prisma.unifiedLearningEvent.count();
    const result = await recordClewSelfCheck({
      userId: "u-self",
      kpId: "kp-1",
      items: [{ index: 0, shaky: true }],
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 400);
      assert.equal(result.code, "invalid-request");
    }
    assert.equal(await prisma.unifiedLearningEvent.count(), countBefore);
  });
});
