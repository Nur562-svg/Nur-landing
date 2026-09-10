import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { checkAndEnforceQuota, recordServerUsage } from "@/lib/quotas-server";

export type LoggedInQuotaOutcome =
  | { status: "pass" }
  | { status: "blocked"; httpStatus: number; body: Record<string, unknown> }
  | { status: "unavailable"; message: string };

export async function enforceLoggedInModelQuota(
  resource: "courseBuilds" | "agentCalls",
): Promise<LoggedInQuotaOutcome> {
  let session;
  try {
    session = await getCurrentSession();
  } catch (error) {
    console.error("[quota-gate] session lookup failed", error);
    return {
      status: "unavailable",
      message: "登录状态无法校验，本次模型调用已中止。",
    };
  }
  if (!session) {
    return { status: "pass" };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });
    if (!dbUser) {
      return { status: "pass" };
    }
    const gate = await checkAndEnforceQuota(dbUser.id, resource);
    if (gate) {
      return { status: "blocked", httpStatus: gate.status, body: gate.body };
    }
    await recordServerUsage(dbUser.id, resource);
    return { status: "pass" };
  } catch (error) {
    console.error(`[quota-gate] ${resource} failed`, error);
    return {
      status: "unavailable",
      message: "配额服务暂时不可用，本次模型调用已中止。",
    };
  }
}
