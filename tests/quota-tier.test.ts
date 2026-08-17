import { describe, it } from "node:test";
import assert from "node:assert/strict";

// 阶段 4: 三档配额测试

describe("Tier quotas (free/lite/pro)", async () => {
  const { TIER_QUOTAS, computeItem, canUseResource } = await import("../src/lib/quotas");

  it("三档均存在", () => {
    assert.ok(TIER_QUOTAS.free);
    assert.ok(TIER_QUOTAS.lite);
    assert.ok(TIER_QUOTAS.pro);
  });

  it("free 档配额最严格", () => {
    assert.equal(TIER_QUOTAS.free.privateMaterials, 5);
    assert.equal(TIER_QUOTAS.free.courseBuilds, 3);
    assert.equal(TIER_QUOTAS.free.mockExams, 10);
    assert.equal(TIER_QUOTAS.free.agentCalls, 50);
  });

  it("lite 档配额介于 free 和 pro 之间", () => {
    assert.equal(TIER_QUOTAS.lite.privateMaterials, 20);
    assert.equal(TIER_QUOTAS.lite.courseBuilds, 10);
    assert.ok((TIER_QUOTAS.lite.privateMaterials as number) > (TIER_QUOTAS.free.privateMaterials as number));
    assert.ok(TIER_QUOTAS.lite.privateMaterials !== ("unlimited" as never));
  });

  it("pro 档全部 unlimited", () => {
    assert.equal(TIER_QUOTAS.pro.privateMaterials, "unlimited");
    assert.equal(TIER_QUOTAS.pro.courseBuilds, "unlimited");
    assert.equal(TIER_QUOTAS.pro.mockExams, "unlimited");
    assert.equal(TIER_QUOTAS.pro.agentCalls, "unlimited");
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
    const item = computeItem(4, 5); // 80%
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

describe("MembershipTier type", async () => {
  it("类型包含 free/lite/pro", async () => {
    const { TIER_QUOTAS } = await import("../src/lib/quotas");
    const tiers = Object.keys(TIER_QUOTAS);
    assert.ok(tiers.includes("free"));
    assert.ok(tiers.includes("lite"));
    assert.ok(tiers.includes("pro"));
  });
});
