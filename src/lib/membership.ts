import type { MembershipTier } from "@/types/auth";

/** 旧版会员值；只允许出现在存量数据库/订单/JWT 中，统一归一化为 basic。 */
export type LegacyMembershipTier = "lite";

export function normalizeMembershipTier(value: unknown): MembershipTier | null {
  if (value === "free" || value === "basic" || value === "pro" || value === "max") {
    return value;
  }
  if (value === "lite") {
    return "basic";
  }
  return null;
}

export function resolveEffectiveMembershipTier(user: {
  membershipTier: string;
  membershipExpiresAt?: Date | string | null;
  now?: Date;
}): MembershipTier {
  const tier = normalizeMembershipTier(user.membershipTier) ?? "free";
  if (tier === "free") {
    return "free";
  }

  const expiresAt = user.membershipExpiresAt;
  if (!expiresAt) {
    return tier;
  }

  const expiryTime = typeof expiresAt === "string" ? Date.parse(expiresAt) : expiresAt.getTime();
  const now = user.now ?? new Date();
  return Number.isFinite(expiryTime) && expiryTime <= now.getTime() ? "free" : tier;
}

export function getMembershipTierLabel(tier: MembershipTier): string {
  switch (tier) {
    case "free":
      return "Trial / 免费试用";
    case "basic":
      return "Basic 会员";
    case "pro":
      return "Pro 会员";
    case "max":
      return "Max 会员";
  }
}
