import { NextResponse } from "next/server";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { getHiDocTextbookDetail } from "@/lib/hidoc/chapters";
import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";

/**
 * Hi doc 教材详情（thin adapter）：教材 + 章节树。
 * 删除教材仍走集合路由 DELETE /api/hidoc/textbooks?id=…，不在此重复一套。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("查看教材");
  }

  const { id } = await params;
  try {
    const result = await getHiDocTextbookDetail(user.id, id);
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[hidoc] 教材详情读取失败", error);
    return hiDocFailure(500, "server-error", "教材详情读取失败，请稍后重试。");
  }
}