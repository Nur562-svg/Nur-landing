/**
 * 套餐目录（代码常量，不建表）。
 * 9 个 SKU：Basic / Pro / Max × 月/季/年。
 * 价格：2026-09-18 用户确认的正式价（季 ≈ 月×10 折扣、年 ≈ 月×8 折扣）。
 * 旧 lite-* 请求/订单只作兼容识别，统一映射为 Basic。
 */
import type { LegacyPlanId, Plan, PlanId, PlanTier } from "./types";

export const PLAN_CATALOG: Record<PlanId, Plan> = {
  "basic-month": {
    id: "basic-month",
    tier: "basic",
    period: "month",
    priceCents: 1900, // ¥19
    label: "Basic 会员",
    periodLabel: "月",
  },
  "basic-quarter": {
    id: "basic-quarter",
    tier: "basic",
    period: "quarter",
    priceCents: 4900, // ¥49（≈ ¥16.3/月）
    label: "Basic 会员",
    periodLabel: "季",
  },
  "basic-year": {
    id: "basic-year",
    tier: "basic",
    period: "year",
    priceCents: 14900, // ¥149（≈ ¥12.4/月）
    label: "Basic 会员",
    periodLabel: "年",
  },
  "pro-month": {
    id: "pro-month",
    tier: "pro",
    period: "month",
    priceCents: 4900, // ¥49
    label: "Pro 会员",
    periodLabel: "月",
  },
  "pro-quarter": {
    id: "pro-quarter",
    tier: "pro",
    period: "quarter",
    priceCents: 12900, // ¥129（≈ ¥43/月）
    label: "Pro 会员",
    periodLabel: "季",
  },
  "pro-year": {
    id: "pro-year",
    tier: "pro",
    period: "year",
    priceCents: 39900, // ¥399（≈ ¥33.3/月）
    label: "Pro 会员",
    periodLabel: "年",
  },
  "max-month": {
    id: "max-month",
    tier: "max",
    period: "month",
    priceCents: 14900, // ¥149
    label: "Max 会员",
    periodLabel: "月",
  },
  "max-quarter": {
    id: "max-quarter",
    tier: "max",
    period: "quarter",
    priceCents: 39900, // ¥399（≈ ¥133/月）
    label: "Max 会员",
    periodLabel: "季",
  },
  "max-year": {
    id: "max-year",
    tier: "max",
    period: "year",
    priceCents: 129900, // ¥1299（≈ ¥108.3/月）
    label: "Max 会员",
    periodLabel: "年",
  },
};

/** 有序列出的所有套餐。 */
export const ALL_PLANS: Plan[] = Object.values(PLAN_CATALOG);

const LEGACY_PLAN_ALIASES: Record<LegacyPlanId, PlanId> = {
  "lite-month": "basic-month",
  "lite-quarter": "basic-quarter",
  "lite-year": "basic-year",
};

const LEGACY_PLAN_IDS_FOR_PLAN: Partial<Record<PlanId, readonly string[]>> = Object.entries(
  LEGACY_PLAN_ALIASES,
).reduce<Partial<Record<PlanId, readonly string[]>>>((acc, [legacyId, currentId]) => {
  acc[currentId] = [...(acc[currentId] ?? []), legacyId];
  return acc;
}, {});

/** 按 ID 获取套餐；旧 lite-* 返回对应 Basic 套餐。 */
export function getPlan(planId: string): Plan | null {
  const canonicalId = (
    planId in LEGACY_PLAN_ALIASES
      ? LEGACY_PLAN_ALIASES[planId as LegacyPlanId]
      : planId
  ) as PlanId;
  return PLAN_CATALOG[canonicalId] ?? null;
}

/** 返回同语义的新旧 planId，用于复用迁移前的 pending 订单。 */
export function getCompatiblePlanIds(planId: PlanId): readonly string[] {
  return [planId, ...(LEGACY_PLAN_IDS_FOR_PLAN[planId] ?? [])];
}

/** 套餐层级 → 配额档位映射。 */
export function getPlanQuotaTier(planId: PlanId | LegacyPlanId): PlanTier {
  const plan = getPlan(planId);
  if (!plan) {
    throw new Error(`invalid planId: ${planId}`);
  }
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
