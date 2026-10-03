import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { replaceChaptersManually } from "@/lib/clew/chapters";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";

/**
 * Clew 章节手动修正（thin adapter）：整体替换章节列表。
 * 校验与来源标注在 src/lib/clew/chapters.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("修正章节");
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
    const result = await replaceChaptersManually(user.id, id, chapters);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[clew] 章节修正失败", error);
    return clewFailure(500, "server-error", "章节保存失败，请稍后重试。");
  }
}