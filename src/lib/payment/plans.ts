/**
 * 套餐目录（代码常量，不建表）。
 * 6 个 SKU：Lite/Pro × 月/季/年。
 * 价格为占位常量，待定价确认后修改。
 */
import type { Plan, PlanId, PlanTier } from "./types";

export const PLAN_CATALOG: Record<PlanId, Plan> = {
  "lite-month": {
    id: "lite-month",
    tier: "lite",
    period: "month",
    priceCents: 1900, // ¥19
    label: "Lite 会员",
    periodLabel: "月",
  },
  "lite-quarter": {
    id: "lite-quarter",
    tier: "lite",
    period: "quarter",
    priceCents: 4900, // ¥49
    label: "Lite 会员",
    periodLabel: "季",
  },
  "lite-year": {
    id: "lite-year",
    tier: "lite",
    period: "year",
    priceCents: 14900, // ¥149
    label: "Lite 会员",
    periodLabel: "年",
  },
  "pro-month": {
    id: "pro-month",
    tier: "pro",
    period: "month",
    priceCents: 3900, // ¥39
    label: "Pro 会员",
    periodLabel: "月",
  },
  "pro-quarter": {
    id: "pro-quarter",
    tier: "pro",
    period: "quarter",
    priceCents: 9900, // ¥99
    label: "Pro 会员",
    periodLabel: "季",
  },
  "pro-year": {
    id: "pro-year",
    tier: "pro",
    period: "year",
    priceCents: 29900, // ¥299
    label: "Pro 会员",
    periodLabel: "年",
  },
};

/** 有序列出的所有套餐。 */
export const ALL_PLANS: Plan[] = Object.values(PLAN_CATALOG);

/** 按 ID 获取套餐。 */
export function getPlan(planId: string): Plan | null {
  return PLAN_CATALOG[planId as PlanId] ?? null;
}

/** 套餐层级 → 配额档位映射。 */
export function getPlanQuotaTier(planId: PlanId): PlanTier {
  const plan = PLAN_CATALOG[planId];
  return plan.tier;
}

/** 周期 → 天数（用于会员到期时间计算）。 */
export function periodToDays(period: string): number {
  switch (period) {
    case "month":
      return 30;
    case "quarter":
      return 90;
    case "year":
      return 365;
    default:
      return 30;
  }
}
