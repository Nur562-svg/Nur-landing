import {
  CourseBuildExecutionError,
  getConfiguredCourseBuilderProvider,
  runCourseBuild,
  runPrivateMaterialAnalysis,
} from "@/lib/course-builder/service";
import { listCourseBuildPacks } from "@/lib/course-builder/packs";
import { getCurrentSession } from "@/lib/auth/session";
import { recordServerUsage, checkAndEnforceQuota } from "@/lib/quotas-server";
import { prisma } from "@/lib/prisma";
import {
  CourseBuildRequestError,
  parseCourseBuilderApiRequest,
} from "@/lib/course-builder/request";
import type {
  CourseBuilderApiRequest,
  CourseBuildErrorCode,
  CourseBuildErrorResponse,
  PrivateMaterialAnalysisRequest,
} from "@/types/course-builder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 96 * 1024;

function isPrivateMaterialAnalysisRequest(
  request: CourseBuilderApiRequest,
): request is PrivateMaterialAnalysisRequest {
  return "kind" in request && request.kind === "private-material-analysis";
}

function errorResponse(
  code: CourseBuildErrorCode,
  message: string,
  status: number,
  baselineAvailable = true,
): Response {
  return Response.json({
    version: 1,
    status: "error",
    code,
    message,
    baselineAvailable,
  } satisfies CourseBuildErrorResponse, { status });
}

export function GET(): Response {
  const provider = getConfiguredCourseBuilderProvider();
  return Response.json({
    version: 1,
    runtimeAvailable: true,
    configured: provider !== null,
    provider: provider ? { id: provider.id, model: provider.model } : null,
    defaultModel: "qwen3.7-plus",
    materialPacks: listCourseBuildPacks(),
    baselineAvailable: true,
  });
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return errorResponse("invalid-request", "Course Builder 请求体过大。", 413);
  }

  try {
    const requestText = await request.text();
    if (new TextEncoder().encode(requestText).length > maxRequestBytes) {
      return errorResponse("invalid-request", "Course Builder 请求体过大。", 413);
    }
    const value: unknown = JSON.parse(requestText);
    const buildRequest = parseCourseBuilderApiRequest(value);
    const provider = getConfiguredCourseBuilderProvider();

    if (isPrivateMaterialAnalysisRequest(buildRequest)) {
      const session = await getCurrentSession();
      if (session) {
        try {
          const dbUser = await prisma.user.findUnique({ where: { email: session.email }, select: { id: true } });
          if (dbUser) {
            const gate = await checkAndEnforceQuota(dbUser.id, "courseBuilds");
            if (gate) return Response.json(gate.body, { status: gate.status });
            await recordServerUsage(dbUser.id, "courseBuilds");
          }
        } catch {}
      }
      const result = await runPrivateMaterialAnalysis(buildRequest, provider);
      return Response.json(result);
    }

    // normal/official pack build
    const sessionNormal = await getCurrentSession();
    if (sessionNormal) {
      try {
        const dbUser = await prisma.user.findUnique({ where: { email: sessionNormal.email }, select: { id: true } });
        if (dbUser) {
          const gate = await checkAndEnforceQuota(dbUser.id, "courseBuilds");
          if (gate) return Response.json(gate.body, { status: gate.status });
          await recordServerUsage(dbUser.id, "courseBuilds");
        }
      } catch {}
    }
    const result = await runCourseBuild(buildRequest, provider);
    if (!result) {
      return errorResponse("unknown-material-pack", "材料包不存在或未获准进入构建器。", 404);
    }
    return Response.json(result);
  } catch (error) {
    if (error instanceof CourseBuildRequestError || error instanceof SyntaxError) {
      return errorResponse("invalid-request", "Course Builder 请求未通过边界校验。", 400);
    }
    if (error instanceof CourseBuildExecutionError) {
      return errorResponse(error.code, error.message, error.status, false);
    }
    return errorResponse(
      "runtime-failed",
      "Course Builder 本次运行失败；课程真相没有被修改。",
      502,
    );
  }
}
