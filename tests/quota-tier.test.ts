import { describe, it } from "node:test";
import assert from "node:assert/strict";

// M0: 四档会员配额测试

describe("Tier quotas (free/basic/pro/max)", async () => {
  const { TIER_QUOTAS, computeItem, canUseResource } = await import("../src/lib/quotas");

  it("四档均存在", () => {
    assert.ok(TIER_QUOTAS.free);
    assert.ok(TIER_QUOTAS.basic);
    assert.ok(TIER_QUOTAS.pro);
    assert.ok(TIER_QUOTAS.max);
  });

  it("free 档配额最严格", () => {
    assert.equal(TIER_QUOTAS.free.privateMaterials, 5);
    assert.equal(TIER_QUOTAS.free.courseBuilds, 3);
    assert.equal(TIER_QUOTAS.free.mockExams, 10);
    assert.equal(TIER_QUOTAS.free.agentCalls, 50);
  });

  it("basic 档继承原 lite 权益", () => {
    assert.equal(TIER_QUOTAS.basic.privateMaterials, 20);
    assert.equal(TIER_QUOTAS.basic.courseBuilds, 10);
    assert.equal(TIER_QUOTAS.basic.mockExams, 30);
    assert.equal(TIER_QUOTAS.basic.agentCalls, 200);
    assert.ok((TIER_QUOTAS.basic.privateMaterials as number) > (TIER_QUOTAS.free.privateMaterials as number));
  });

  it("pro 与 max 档当前平台资源均 unlimited", () => {
    for (const tier of ["pro", "max"] as const) {
      assert.equal(TIER_QUOTAS[tier].privateMaterials, "unlimited");
      assert.equal(TIER_QUOTAS[tier].courseBuilds, "unlimited");
      assert.equal(TIER_QUOTAS[tier].mockExams, "unlimited");
      assert.equal(TIER_QUOTAS[tier].agentCalls, "unlimited");
    }
  });

  it("computeItem 正确计算 unlimited", () => {
    const item = computeItem(999, "unlimited");
    assert.equal(item.isOverLimit, false);
    assert.equal(item.percent, 0);
  });

  it("computeItem 正确计算有限额度", () => {
    const item = computeItem(3, 5);
    assert.equal(item.used, 3);
    assert.equal(item.limit, 5);
    assert.equal(item.percent, 60);
    assert.equal(item.isNearLimit, false);
    assert.equal(item.isOverLimit, false);
  });

  it("computeItem 接近上限时 isNearLimit 为 true", () => {
    const item = computeItem(4, 5);
    assert.equal(item.isNearLimit, true);
    assert.equal(item.isOverLimit, false);
  });

  it("computeItem 超限时 isOverLimit 为 true", () => {
    const item = computeItem(6, 5);
    assert.equal(item.isOverLimit, true);
  });

  it("canUseResource unlimited 始终可用", () => {
    const item = computeItem(999, "unlimited");
    assert.equal(canUseResource(item), true);
  });

  it("canUseResource 未超限可用", () => {
    const item = computeItem(2, 5);
    assert.equal(canUseResource(item), true);
  });

  it("canUseResource 已超限不可用", () => {
    const item = computeItem(6, 5);
    assert.equal(canUseResource(item), false);
  });
});

describe("Membership tier normalization", async () => {
  it("旧 lite 数据归一化为 basic", async () => {
    const { normalizeMembershipTier, resolveEffectiveMembershipTier } = await import("../src/lib/membership");
    assert.equal(normalizeMembershipTier("lite"), "basic");
    assert.equal(normalizeMembershipTier("basic"), "basic");
    assert.equal(normalizeMembershipTier("max"), "max");
    assert.equal(normalizeMembershipTier("unknown"), null);
    assert.equal(resolveEffectiveMembershipTier({
      membershipTier: "lite",
      membershipExpiresAt: new Date("2999-01-01T00:00:00.000Z"),
      now: new Date("2026-09-17T00:00:00.000Z"),
    }), "basic");
  });

  it("到期会员回退 free", async () => {
    const { resolveEffectiveMembershipTier } = await import("../src/lib/membership");
    assert.equal(resolveEffectiveMembershipTier({
      membershipTier: "max",
      membershipExpiresAt: new Date("2000-01-01T00:00:00.000Z"),
      now: new Date("2026-09-17T00:00:00.000Z"),
    }), "free");
  });
});
