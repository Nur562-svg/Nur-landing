import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getClewTextbookDetail } from "@/lib/clew/chapters";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";

/**
 * Clew 教材详情（thin adapter）：教材 + 章节树。
 * 删除教材仍走集合路由 DELETE /api/clew/textbooks?id=…，不在此重复一套。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看教材");
  }

  const { id } = await params;
  try {
    const result = await getClewTextbookDetail(user.id, id);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[clew] 教材详情读取失败", error);
    return clewFailure(500, "server-error", "教材详情读取失败，请稍后重试。");
  }
}