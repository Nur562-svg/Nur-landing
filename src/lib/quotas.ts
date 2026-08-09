import { prisma } from "@/lib/prisma";
import type { MembershipTier } from "@/types/auth";

/**
 * M3: 会员配额定义 + 使用记录
 * 免费版合理限制；Pro 显著放宽。Demo 阶段使用 client bump + DB 基础数据。
 * 不涉及真实支付。
 */

export type QuotaResource =
  | "privateMaterials"   // 私人材料准入（已同意的 admission）
  | "courseBuilds"       // Course Builder 使用（含私人分析）
  | "mockExams"          // 模考会话
  | "agentCalls";        // Agent 调用

export type QuotaItem = {
  used: number;
  limit: number | "unlimited";
  isNearLimit: boolean;
  isOverLimit: boolean;
  percent: number; // 0-100 for progress bar
};

export type UserUsageRecord = Record<string, number>;

export type UserQuotas = {
  tier: MembershipTier;
  quotas: Record<QuotaResource, QuotaItem>;
  periodNote: string;
};

const TIER_QUOTAS: Record<MembershipTier, Record<QuotaResource, number | "unlimited">> = {
  free: {
    privateMaterials: 5,
    courseBuilds: 3,
    mockExams: 10,
    agentCalls: 50,
  },
  pro: {
    privateMaterials: "unlimited",
    courseBuilds: "unlimited",
    mockExams: "unlimited",
    agentCalls: "unlimited",
  },
};

const CLIENT_USAGE_KEYS: Record<"courseBuilds" | "agentCalls", string> = {
  courseBuilds: "nur-learn:quota:course-builds",
  agentCalls: "nur-learn:quota:agent-calls",
};

function isUnlimited(v: number | "unlimited"): v is "unlimited" {
  return v === "unlimited";
}

function computeItem(used: number, limit: number | "unlimited"): QuotaItem {
  if (isUnlimited(limit)) {
    return { used, limit, isNearLimit: false, isOverLimit: false, percent: 0 };
  }
  const percent = Math.min(100, Math.round((used / limit) * 100));
  const near = used >= Math.floor(limit * 0.8);
  const over = used > limit;
  return { used, limit, isNearLimit: near && !over, isOverLimit: over, percent };
}

function getClientBump(resource: "courseBuilds" | "agentCalls"): number {
  if (typeof window === "undefined") return 0;
  const key = CLIENT_USAGE_KEYS[resource];
  const raw = window.localStorage.getItem(key);
  return raw ? parseInt(raw, 10) || 0 : 0;
}


/** 记录一次 Course Builder 私人分析/构建使用（M3 demo） */
export function recordCourseBuildUsage(): void {
  if (typeof window === "undefined") return;
  const key = CLIENT_USAGE_KEYS.courseBuilds;
  const current = getClientBump("courseBuilds");
  window.localStorage.setItem(key, String(current + 1));
  window.dispatchEvent(new CustomEvent("nur-quota-update"));
}

/** Server-side record for persistence (M3) */
export async function recordServerUsage(userId: string, resource: "courseBuilds" | "agentCalls"): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { usage: true } });
  const current: UserUsageRecord = ((user?.usage as UserUsageRecord) ?? {}) as UserUsageRecord;
  current[resource] = (current[resource] || 0) + 1;
  await prisma.user.update({
    where: { id: userId },
    data: { usage: current },
  });
}

/** 记录一次 Agent 调用（M3 demo） */
export function recordAgentCallUsage(): void {
  if (typeof window === "undefined") return;
  const key = CLIENT_USAGE_KEYS.agentCalls;
  const current = getClientBump("agentCalls");
  window.localStorage.setItem(key, String(current + 1));
  window.dispatchEvent(new CustomEvent("nur-quota-update"));
}

export async function computeUserQuotas(userId: string): Promise<UserQuotas> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { membershipTier: true, usage: true },
  });

  const tier: MembershipTier = user?.membershipTier === "pro" ? "pro" : "free";
  const limits = TIER_QUOTAS[tier];

  const privateMaterialsUsed = await prisma.materialAdmissionSyncConsent.count({
    where: { userId, consentGiven: true },
  });

  const mockExamsUsed = await prisma.mockExamSession.count({
    where: { userId },
  });

  // Server persisted usage (from JSON on User) + client bumps for immediate
  const serverUsage: UserUsageRecord = ((user?.usage as UserUsageRecord) ?? {}) as UserUsageRecord;
  const serverBuilds = serverUsage.courseBuilds || 0;
  const serverAgent = serverUsage.agentCalls || 0;

  const clientBuilds = getClientBump("courseBuilds");
  const clientAgent = getClientBump("agentCalls");

  const courseBuildsUsed = serverBuilds + clientBuilds;
  const agentCallsUsed = serverAgent + clientAgent;

  const quotas: Record<QuotaResource, QuotaItem> = {
    privateMaterials: computeItem(privateMaterialsUsed, limits.privateMaterials),
    courseBuilds: computeItem(courseBuildsUsed, limits.courseBuilds),
    mockExams: computeItem(mockExamsUsed, limits.mockExams),
    agentCalls: computeItem(agentCallsUsed, limits.agentCalls),
  };

  const periodNote = tier === "pro"
    ? "Pro 会员 · 无限制（当前演示）"
    : "免费版 · 按使用周期重置（演示数据）";

  return { tier, quotas, periodNote };
}

export function canUseResource(quota: QuotaItem): boolean {
  if (quota.limit === "unlimited") return true;
  return quota.used < quota.limit;
}

export function getQuotaLabel(resource: QuotaResource): string {
  switch (resource) {
    case "privateMaterials": return "私人材料准入";
    case "courseBuilds": return "Course Builder 构建 / 私人分析";
    case "mockExams": return "模考会话";
    case "agentCalls": return "NUR Agent 对话";
  }
}


export async function checkAndEnforceQuota(userId: string, resource: "courseBuilds" | "agentCalls"): Promise<null | { status: number; body: Record<string, unknown> }> {
  // Compute full quotas (server + client bumps)
  const quotas = await computeUserQuotas(userId);
  const item = quotas.quotas[resource];
  if (!item) return null;
  if (quotas.tier === "pro" || !item.isOverLimit) {
    return null;
  }
  return {
    status: 429,
    body: {
      error: "quota-exceeded",
      resource,
      used: item.used,
      limit: item.limit,
      message: `${getQuotaLabel(resource)} 已达免费上限，请升级 Pro 或稍后重试（演示周期重置）。`,
      upgradeHint: true,
    },
  };
}

