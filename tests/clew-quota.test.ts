import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Clew M1：名额（仅当月有效）、页数/大小上限与激活月计算

describe("Clew monthly textbook quota", async () => {
  const {
    CLEW_MAX_FILE_BYTES,
    CLEW_MAX_PAGE_COUNT,
    CLEW_MONTHLY_TEXTBOOK_LIMITS,
    buildClewQuotaExceededMessage,
    computeClewQuota,
    getClewActiveMonth,
    getClewMonthlyTextbookLimit,
    isClewTextbookFrozen,
  } = await import("../src/lib/clew/limits");

  it("每档月额度：trial/free 与 basic 为 1、pro 3、max 10", () => {
    assert.equal(CLEW_MONTHLY_TEXTBOOK_LIMITS.free, 1);
    assert.equal(CLEW_MONTHLY_TEXTBOOK_LIMITS.basic, 1);
    assert.equal(CLEW_MONTHLY_TEXTBOOK_LIMITS.pro, 3);
    assert.equal(CLEW_MONTHLY_TEXTBOOK_LIMITS.max, 10);
    assert.equal(getClewMonthlyTextbookLimit("free"), 1);
    assert.equal(getClewMonthlyTextbookLimit("max"), 10);
  });

  it("单本上限：1500 页", () => {
    assert.equal(CLEW_MAX_PAGE_COUNT, 1500);
  });

  it("单本字节上限为正数（防止整文件读入内存打爆进程）", () => {
    assert.ok(CLEW_MAX_FILE_BYTES > 0);
  });

  it("激活月按 Asia/Shanghai 自然月计算", () => {
    // 2026-09-30T16:30:00Z = 北京时间 2026-10-01 00:30 → 已进入 10 月
    assert.equal(getClewActiveMonth(new Date("2026-09-30T16:30:00.000Z")), "2026-10");
    // 2026-09-30T15:30:00Z = 北京时间 2026-09-30 23:30 → 仍是 9 月
    assert.equal(getClewActiveMonth(new Date("2026-09-30T15:30:00.000Z")), "2026-09");
    // 2026-01-31T17:00:00Z = 北京时间 2026-02-01 01:00 → 2 月
    assert.equal(getClewActiveMonth(new Date("2026-01-31T17:00:00.000Z")), "2026-02");
  });

  it("跨月教材进入冻结态，当月内教材不冻结", () => {
    assert.equal(isClewTextbookFrozen("2026-09", "2026-09"), false);
    assert.equal(isClewTextbookFrozen("2026-08", "2026-09"), true);
  });

  it("computeClewQuota 计算已用/上限/剩余", () => {
    assert.deepEqual(computeClewQuota(0, "free", "2026-09"), {
      month: "2026-09",
      used: 0,
      limit: 1,
      remaining: 1,
    });
    assert.deepEqual(computeClewQuota(1, "free", "2026-09"), {
      month: "2026-09",
      used: 1,
      limit: 1,
      remaining: 0,
    });
    assert.deepEqual(computeClewQuota(2, "pro", "2026-09"), {
      month: "2026-09",
      used: 2,
      limit: 3,
      remaining: 1,
    });
    // 超限时不出现负数剩余
    assert.equal(computeClewQuota(4, "pro", "2026-09").remaining, 0);
  });

  it("超额原因明确写出已用/上限，不静默放行", () => {
    const message = buildClewQuotaExceededMessage(1, 1);
    assert.match(message, /1\/1/);
    assert.match(message, /删除/);
    assert.match(message, /每月 1 日刷新/);
  });
});