import "server-only";

import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { resolveEffectiveMembershipTier } from "@/lib/membership";
import type { MembershipTier } from "@/types/auth";

/**
 * Clew 会话用户（server-only）：页面与 API 路由共用，避免两处各写一遍档位解析。
 * 旧 lite 归一化为 basic；会员到期自动回退 free。
 */

export type ClewSessionUser = {
  id: string;
  email: string;
  displayName: string;
  tier: MembershipTier;
};

export async function getClewSessionUser(): Promise<ClewSessionUser | null> {
  let session;
  try {
    session = await getCurrentSession();
  } catch {
    return null;
  }
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, displayName: true, membershipTier: true, membershipExpiresAt: true },
  });
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    tier: resolveEffectiveMembershipTier({
      membershipTier: user.membershipTier,
      membershipExpiresAt: user.membershipExpiresAt,
    }),
  };
}