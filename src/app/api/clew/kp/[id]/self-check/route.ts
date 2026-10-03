import { NextResponse } from "next/server";
import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { recordClewSelfCheck, type ClewSelfCheckItemInput } from "@/lib/clew/self-check";
import { getClewSessionUser } from "@/lib/clew/session-user";

/**
 * Clew 自测提交（「评」环节，thin adapter）：POST { lessonGeneratedAt?, items: [{index, shaky}] }。
 * 标记「还需看」的题目以 wrong-question-added 事件写入统一学习事件流（幂等）。
 * 业务逻辑在 src/lib/clew/self-check.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("提交自测");
  }

  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "知识点序号不正确。");
  }

  let body: { lessonGeneratedAt?: unknown; items?: unknown } | null = null;
  try {
    body = (await request.json()) as { lessonGeneratedAt?: unknown; items?: unknown } | null;
  } catch {
    body = null;
  }
  if (!body || !Array.isArray(body.items)) {
    return clewFailure(400, "invalid-request", "自测提交格式不正确。");
  }

  const items: ClewSelfCheckItemInput[] = [];
  for (const raw of body.items) {
    if (
      typeof raw === "object" &&
      raw !== null &&
      typeof (raw as { index?: unknown }).index === "number" &&
      typeof (raw as { shaky?: unknown }).shaky === "boolean"
    ) {
      items.push({
        index: (raw as { index: number }).index,
        shaky: (raw as { shaky: boolean }).shaky,
      });
    } else {
      return clewFailure(400, "invalid-request", "自测提交格式不正确。");
    }
  }

  const result = await recordClewSelfCheck({
    userId: user.id,
    kpId: id,
    lessonGeneratedAt: typeof body.lessonGeneratedAt === "string" ? body.lessonGeneratedAt : undefined,
    items,
  });

  if (!result.ok) {
    return clewFailure(result.status, result.code, result.message);
  }
  return NextResponse.json({ ok: true, recorded: result.recorded });
}
