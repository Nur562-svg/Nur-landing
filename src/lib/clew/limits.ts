import type { MembershipTier } from "@/types/auth";

/**
 * Hi doc 名额与上传限制（纯函数，无服务器依赖，可被测试直接引用）。
 * 名额仅当月有效：按月自然月（Asia/Shanghai）计数，跨月进入冻结态。
 */

/** 每档每月可激活的上传教材数（trial/free 与 basic 同为 1 本）。 */
export const HIDOC_MONTHLY_TEXTBOOK_LIMITS: Record<MembershipTier, number> = {
  free: 1,
  basic: 1,
  pro: 3,
  max: 10,
};

/** 单本页数上限（对齐 Mentrix：超过 1500 页拒绝）。 */
export const HIDOC_MAX_PAGE_COUNT = 1500;

/** 单本字节上限（保守护栏，防止整文件读入内存时打爆服务进程）。 */
export const HIDOC_MAX_FILE_BYTES = 200 * 1024 * 1024;

/** 名额结算时区：产品面向国内用户，按 Asia/Shanghai 自然月。 */
export const HIDOC_MONTH_TIME_ZONE = "Asia/Shanghai";

const monthFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: HIDOC_MONTH_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
});

/** 当前激活月（YYYY-MM）。 */
export function getHiDocActiveMonth(now: Date = new Date()): string {
  return monthFormatter.format(now).slice(0, 7);
}

export function getHiDocMonthlyTextbookLimit(tier: MembershipTier): number {
  return HIDOC_MONTHLY_TEXTBOOK_LIMITS[tier];
}

/** 激活月与当前月不一致即冻结：教材不删除，继续学习需重新激活占用当月名额。 */
export function isHiDocTextbookFrozen(activeMonth: string, currentMonth: string): boolean {
  return activeMonth !== currentMonth;
}

export type HiDocQuota = {
  month: string;
  used: number;
  limit: number;
  remaining: number;
};

export function computeHiDocQuota(used: number, tier: MembershipTier, month: string): HiDocQuota {
  const limit = getHiDocMonthlyTextbookLimit(tier);
  return { month, used, limit, remaining: Math.max(0, limit - used) };
}

/** 名额已满的中文原因（超额 503 明确报错，不静默放行）。 */
export function buildHiDocQuotaExceededMessage(used: number, limit: number): string {
  return `本月教材名额已用完（${used}/${limit}）。删除不再学习的教材可释放当月名额，或升级会员档位；名额每月 1 日刷新。`;
}