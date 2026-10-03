import { NextResponse } from "next/server";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getClewWorkshopDetail } from "@/lib/clew/workshops";

/**
 * Clew 课题详情 API（thin adapter）：材料清单 + 答疑对话历史 + 限额。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看课题");
  }

  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "缺少课题 id。");
  }

  try {
    const result = await getClewWorkshopDetail(user.id, user.tier, id);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[clew] 课题详情读取失败", error);
    return clewFailure(500, "server-error", "课题详情读取失败，请稍后重试。");
  }
}
