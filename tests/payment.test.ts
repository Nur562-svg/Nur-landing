import { describe, it } from "node:test";
import assert from "node:assert/strict";

// 阶段 4: 支付体系测试
// 由于测试环境无 Postgres，这些测试验证纯函数逻辑和类型契约

describe("Payment plans catalog", async () => {
  const { PLAN_CATALOG, getPlan, getPlanQuotaTier, periodToDays, ALL_PLANS } = await import("../src/lib/payment/plans");

  it("应包含 6 个 SKU", () => {
    assert.equal(ALL_PLANS.length, 6);
  });

  it("每个套餐有正确的 tier/period/price", () => {
    for (const plan of ALL_PLANS) {
      assert.ok(plan.id, "plan id should exist");
      assert.ok(plan.tier === "lite" || plan.tier === "pro");
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

  it("getPlan 返回 null for invalid id", () => {
    const plan = getPlan("invalid");
    assert.equal(plan, null);
  });

  it("getPlanQuotaTier 映射正确", () => {
    assert.equal(getPlanQuotaTier("lite-month"), "lite");
    assert.equal(getPlanQuotaTier("pro-year"), "pro");
  });

  it("periodToDays 正确映射", () => {
    assert.equal(periodToDays("month"), 30);
    assert.equal(periodToDays("quarter"), 90);
    assert.equal(periodToDays("year"), 365);
  });
});

describe("Payment types contract", async () => {
  const { PLAN_CATALOG } = await import("../src/lib/payment/plans");

  it("所有套餐 ID 符合 tier-period 格式", () => {
    for (const [id, plan] of Object.entries(PLAN_CATALOG)) {
      assert.equal(id, `${plan.tier}-${plan.period}`);
    }
  });

  it("Lite 套餐价格低于 Pro 对应周期", () => {
    assert.ok(PLAN_CATALOG["lite-month"].priceCents < PLAN_CATALOG["pro-month"].priceCents);
    assert.ok(PLAN_CATALOG["lite-year"].priceCents < PLAN_CATALOG["pro-year"].priceCents);
  });

  it("年付比月付划算（单价更低）", () => {
    const liteMonthlyTotal = PLAN_CATALOG["lite-month"].priceCents * 12;
    assert.ok(PLAN_CATALOG["lite-year"].priceCents < liteMonthlyTotal);
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
