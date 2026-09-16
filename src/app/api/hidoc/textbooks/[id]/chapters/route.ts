import { NextResponse } from "next/server";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { replaceChaptersManually } from "@/lib/hidoc/chapters";
import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";

/**
 * Hi doc 章节手动修正（thin adapter）：整体替换章节列表。
 * 校验与来源标注在 src/lib/hidoc/chapters.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("修正章节");
  }

  const { id } = await params;
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return hiDocFailure(400, "invalid-request", "请求格式不正确。");
  }

  const chapters = (payload as { chapters?: unknown } | null)?.chapters;

  try {
    const result = await replaceChaptersManually(user.id, id, chapters);
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    return NextResponse.json({ ok: true, detail: result.data });
  } catch (error) {
    console.error("[hidoc] 章节修正失败", error);
    return hiDocFailure(500, "server-error", "章节保存失败，请稍后重试。");
  }
}