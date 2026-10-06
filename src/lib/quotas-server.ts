import { prisma } from "@/lib/prisma";
import type { MembershipTier } from "@/types/auth";
import type { QuotaItem, QuotaResource, UserQuotas, UserUsageRecord } from "@/lib/quotas";
import { resolveEffectiveMembershipTier } from "@/lib/membership";
import { computeItem, getClientBump, getQuotaLabel, TIER_QUOTAS } from "@/lib/quotas";

/**
 * M3: 会员配额服务端逻辑（依赖 Prisma，仅 API route 使用）
 * 客户端配额逻辑见 quotas.ts。
 */

/** Server-side record for persistence (M3) */
export async function recordServerUsage(
  userId: string,
  resource:
    | "courseBuilds"
    | "agentCalls"
    | "clewParses"
    | "clewExtracts"
    | "clewLessons"
    | "clewChats"
    | "clewNotes"
    | "clewWorkshopChats"
    | "clewPracticeSets",
  count = 1,
): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { usage: true } });
  const current: UserUsageRecord = ((user?.usage as UserUsageRecord) ?? {}) as UserUsageRecord;
  current[resource] = (current[resource] || 0) + count;
  await prisma.user.update({
    where: { id: userId },
    data: { usage: current },
  });
}

export async function computeUserQuotas(userId: string): Promise<UserQuotas> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { membershipTier: true, membershipExpiresAt: true, usage: true },
  });

  // 会员到期自动回退 free 档；旧 lite 兼容为 basic。
  const now = new Date();
  const rawTier = user?.membershipTier ?? "free";
  const tier: MembershipTier = resolveEffectiveMembershipTier({
    membershipTier: rawTier,
    membershipExpiresAt: user?.membershipExpiresAt ?? null,
    now,
  });
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
  const serverClewParses = serverUsage.clewParses || 0;
  const serverClewExtracts = serverUsage.clewExtracts || 0;
  const serverClewLessons = serverUsage.clewLessons || 0;
  const serverClewChats = serverUsage.clewChats || 0;
  const serverClewNotes = serverUsage.clewNotes || 0;
  const serverClewWorkshopChats = serverUsage.clewWorkshopChats || 0;
  const serverClewPracticeSets = serverUsage.clewPracticeSets || 0;

  const clientBuilds = getClientBump("courseBuilds");
  const clientAgent = getClientBump("agentCalls");

  const courseBuildsUsed = serverBuilds + clientBuilds;
  const agentCallsUsed = serverAgent + clientAgent;

  const quotas: Record<QuotaResource, QuotaItem> = {
    privateMaterials: computeItem(privateMaterialsUsed, limits.privateMaterials),
    courseBuilds: computeItem(courseBuildsUsed, limits.courseBuilds),
    mockExams: computeItem(mockExamsUsed, limits.mockExams),
    agentCalls: computeItem(agentCallsUsed, limits.agentCalls),
    clewParses: computeItem(serverClewParses, limits.clewParses),
    clewExtracts: computeItem(serverClewExtracts, limits.clewExtracts),
    clewLessons: computeItem(serverClewLessons, limits.clewLessons),
    clewChats: computeItem(serverClewChats, limits.clewChats),
    clewNotes: computeItem(serverClewNotes, limits.clewNotes),
    clewWorkshopChats: computeItem(serverClewWorkshopChats, limits.clewWorkshopChats),
    clewPracticeSets: computeItem(serverClewPracticeSets, limits.clewPracticeSets),
  };

  const periodNote = tier === "pro"
    ? "Pro 会员 · 无限制"
    : tier === "basic"
    ? "Basic 会员 · 按订阅周期重置"
    : tier === "max"
    ? "Max 会员 · 无限制"
    : "免费版 · 累计总额度（演示）";

  return { tier, quotas, periodNote };
}

export async function checkAndEnforceQuota(userId: string, resource: "courseBuilds" | "agentCalls"): Promise<null | { status: number; body: Record<string, unknown> }> {
  // Compute full quotas (server + client bumps)
  const quotas = await computeUserQuotas(userId);
  const item = quotas.quotas[resource];
  if (!item) return null;
  if (quotas.tier !== "free" || !item.isOverLimit) {
    return null;
  }
  return {
    status: 429,
    body: {
      error: "quota-exceeded",
      resource,
      used: item.used,
      limit: item.limit,
      message: `${getQuotaLabel(resource)} 已达免费上限，请升级 Basic / Pro / Max 或稍后重试（演示周期重置）。`,
      upgradeHint: true,
    },
  };
}
