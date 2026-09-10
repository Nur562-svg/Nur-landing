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
import { enforceLoggedInModelQuota } from "@/lib/quota-gate";
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

    const quota = await enforceLoggedInModelQuota("agentCalls");
    if (quota.status === "blocked") {
      return Response.json(quota.body, { status: quota.httpStatus });
    }
    if (quota.status === "unavailable") {
      return errorResponse("runtime-failed", quota.message, 503);
    }
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
