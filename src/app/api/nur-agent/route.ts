import {
  resolveNurAgentContext,
} from "@/lib/nur-agent/context";
import {
  parseNurAgentRequest,
  NurAgentRequestError,
} from "@/lib/nur-agent/request";
import {
  getConfiguredNurAgentProvider,
  runNurAgent,
} from "@/lib/nur-agent/service";
import { getCurrentSession } from "@/lib/auth/session";
import { recordServerUsage, checkAndEnforceQuota } from "@/lib/quotas";
import type { NurAgentErrorResponse } from "@/types/nur-agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 64000;

function errorResponse(
  code: NurAgentErrorResponse["code"],
  message: string,
  status: number,
): Response {
  return Response.json({
    version: 1,
    status: "error",
    code,
    message,
    deterministicFallbackAvailable: true,
  } satisfies NurAgentErrorResponse, { status });
}

export function GET(): Response {
  const provider = getConfiguredNurAgentProvider();
  return Response.json({
    version: 1,
    agentRuntimeAvailable: true,
    configured: provider !== null,
    provider: provider ? { id: provider.id, model: provider.model } : null,
    deterministicFallbackAvailable: true,
  });
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return errorResponse("invalid-request", "Agent 请求体过大。", 413);
  }

  try {
    const requestText = await request.text();
    if (new TextEncoder().encode(requestText).length > maxRequestBytes) {
      return errorResponse("invalid-request", "Agent 请求体过大。", 413);
    }
    const value: unknown = JSON.parse(requestText);
    const agentRequest = parseNurAgentRequest(value);
    const context = resolveNurAgentContext(agentRequest);

    // M3 更多门控: 免费用户超限返回 429，不执行模型调用
    try {
      const { prisma } = await import("@/lib/prisma");
      const session = await getCurrentSession();
      if (session) {
        const dbUser = await prisma.user.findUnique({ where: { email: session.email }, select: { id: true } });
        if (dbUser) {
          const gate = await checkAndEnforceQuota(dbUser.id, "agentCalls");
          if (gate) return Response.json(gate.body, { status: gate.status });
          await recordServerUsage(dbUser.id, "agentCalls");
        }
      }
    } catch {}
    const provider = getConfiguredNurAgentProvider();
    return Response.json(await runNurAgent(context, provider));
  } catch (error) {
    if (error instanceof NurAgentRequestError || error instanceof SyntaxError) {
      return errorResponse("invalid-request", "Agent 请求未通过本地课程边界校验。", 400);
    }
    return errorResponse(
      "runtime-failed",
      "Agent runtime 本次不可用；请继续使用本地确定性自核。",
      502,
    );
  }
}
