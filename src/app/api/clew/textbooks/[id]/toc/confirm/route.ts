import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { confirmClewTocStructure } from "@/lib/clew/chapters";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";

/**
 * Clew 章节结构确认（SpineEditor，thin adapter）：校验并保存用户确认后的章节结构。
 * 校验、落库与确认章盖戳在 src/lib/clew/chapters.ts；确认之前萃取入口被服务端拒绝。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("确认章节结构");
  }

  const { id } = await params;
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return clewFailure(400, "invalid-request", "请求格式不正确。");
  }

  const chapters = (payload as { chapters?: unknown } | null)?.chapters;

  try {
    const result = await confirmClewTocStructure(user.id, id, chapters);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[clew] 章节结构确认失败", error);
    return clewFailure(500, "server-error", "章节结构确认失败，请稍后重试。");
  }
}
