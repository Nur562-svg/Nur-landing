import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getChapterKnowledgePoints } from "@/lib/clew/chapters";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";

/**
 * Clew 章节知识点读取（thin adapter）：展开章节时按需加载。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; order: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看知识点");
  }

  const { id, order: rawOrder } = await params;
  const chapterOrder = Number.parseInt(rawOrder, 10);
  if (!Number.isInteger(chapterOrder) || chapterOrder < 1) {
    return clewFailure(400, "invalid-request", "章节序号不正确。");
  }

  try {
    const result = await getChapterKnowledgePoints(user.id, id, chapterOrder);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    return NextResponse.json({ ok: true, knowledgePoints: result.data });
  } catch (error) {
    console.error("[clew] 章节知识点读取失败", error);
    return clewFailure(500, "server-error", "知识点读取失败，请稍后重试。");
  }
}
