import { describe, it } from "node:test";
import assert from "node:assert/strict";

// M0: 四档会员与支付 SKU 测试。纯函数，不依赖数据库。

describe("Payment plans catalog", async () => {
  const { PLAN_CATALOG, getPlan, getPlanQuotaTier, periodToDays, ALL_PLANS } = await import("../src/lib/payment/plans");

  it("应包含 9 个 SKU", () => {
    assert.equal(ALL_PLANS.length, 9);
  });

  it("每个套餐有正确的 tier/period/price", () => {
    for (const plan of ALL_PLANS) {
      assert.ok(plan.id, "plan id should exist");
      assert.ok(plan.tier === "basic" || plan.tier === "pro" || plan.tier === "max");
      assert.ok(plan.period === "month" || plan.period === "quarter" || plan.period === "year");
      assert.ok(plan.priceCents > 0, "price should be positive");
    }
  });

  it("getPlan 返回正确套餐", () => {
    const plan = getPlan("pro-month");
    assert.ok(plan);
    assert.equal(plan!.tier, "pro");
    assert.equal(plan!.period, "month");
  });

  it("旧 lite SKU 兼容映射为 basic，不产生新 lite 订单", () => {
    assert.equal(getPlan("lite-month")?.id, "basic-month");
    assert.equal(getPlan("lite-quarter")?.tier, "basic");
    assert.equal(getPlan("lite-year")?.period, "year");
    assert.equal("lite-month" in PLAN_CATALOG, false);
  });

  it("getPlan 返回 null for invalid id", () => {
    assert.equal(getPlan("invalid"), null);
  });

  it("getPlanQuotaTier 映射正确", () => {
    assert.equal(getPlanQuotaTier("basic-month"), "basic");
    assert.equal(getPlanQuotaTier("pro-year"), "pro");
    assert.equal(getPlanQuotaTier("max-month"), "max");
  });

  it("periodToDays 正确映射", () => {
    assert.equal(periodToDays("month"), 30);
    assert.equal(periodToDays("quarter"), 90);
    assert.equal(periodToDays("year"), 365);
  });
});

describe("Payment types contract", async () => {
  const { PLAN_CATALOG, getCompatiblePlanIds } = await import("../src/lib/payment/plans");

  it("所有套餐 ID 符合 tier-period 格式", () => {
    for (const [id, plan] of Object.entries(PLAN_CATALOG)) {
      assert.equal(id, `${plan.tier}-${plan.period}`);
    }
  });

  it("Basic 套餐价格低于 Pro 与 Max 对应周期", () => {
    assert.ok(PLAN_CATALOG["basic-month"].priceCents < PLAN_CATALOG["pro-month"].priceCents);
    assert.ok(PLAN_CATALOG["basic-year"].priceCents < PLAN_CATALOG["pro-year"].priceCents);
    assert.ok(PLAN_CATALOG["pro-month"].priceCents < PLAN_CATALOG["max-month"].priceCents);
  });

  it("旧 lite pending 订单可与 basic 订单视为同一语义", () => {
    assert.deepEqual(getCompatiblePlanIds("basic-month"), ["basic-month", "lite-month"]);
  });

  it("年付比月付划算（单价更低）", () => {
    const basicMonthlyTotal = PLAN_CATALOG["basic-month"].priceCents * 12;
    assert.ok(PLAN_CATALOG["basic-year"].priceCents < basicMonthlyTotal);
  });
});

describe("Mock payment provider", async () => {
  const { mockProvider } = await import("../src/lib/payment/providers/mock");

  it("createOrder 返回 mock 类型", async () => {
    const result = await mockProvider.createOrder({
      orderId: "test-order-1",
      plan: { id: "pro-month", tier: "pro", period: "month", priceCents: 3900, label: "Pro", periodLabel: "月" },
      channel: "mock",
      notifyUrl: "https://example.com/notify/mock",
    });
    assert.equal(result.type, "mock");
    assert.equal(result.orderId, "test-order-1");
  });

  it("verifyNotify 返回 null（mock 无回调）", async () => {
    const result = await mockProvider.verifyNotify("", {});
    assert.equal(result, null);
  });

  it("queryOrder 返回未支付", async () => {
    const result = await mockProvider.queryOrder!("test-order-1");
    assert.equal(result.paid, false);
  });
});
