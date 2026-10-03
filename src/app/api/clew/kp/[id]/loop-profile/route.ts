import { getClewSessionUser } from "@/lib/clew/session-user";
import { updateClewKnowledgePointLoopProfile } from "@/lib/clew/chapters";
import { clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { NextResponse } from "next/server";

/**
 * 切换知识点的学习闭环 Profile（ZCODE-M2 Phase 3）。
 * AI（规则引擎）建议只是默认值，用户永远可以改；写入 user-selected 如实标注来源。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("调整学习闭环");
  }
  const { id: kpId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "请求体不是合法 JSON。" });
  }
  const profileId =
    typeof body === "object" && body !== null
      ? (body as { profileId?: unknown }).profileId
      : undefined;
  if (typeof profileId !== "string" || profileId.length === 0) {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "缺少 profileId。" });
  }

  const result = await updateClewKnowledgePointLoopProfile(user.id, kpId, profileId);
  if (!result.ok) {
    return clewServiceFailure(result);
  }
  return NextResponse.json({ ok: true, ...result.data });
}
