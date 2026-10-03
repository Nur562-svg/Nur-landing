import { NextResponse } from "next/server";
import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { getHiDocWorkshopDetail } from "@/lib/hidoc/workshops";

/**
 * Hi doc 课题详情 API（thin adapter）：材料清单 + 答疑对话历史 + 限额。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("查看课题");
  }

  const { id } = await params;
  if (!id) {
    return hiDocFailure(400, "invalid-request", "缺少课题 id。");
  }

  try {
    const result = await getHiDocWorkshopDetail(user.id, user.tier, id);
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[hidoc] 课题详情读取失败", error);
    return hiDocFailure(500, "server-error", "课题详情读取失败，请稍后重试。");
  }
}
