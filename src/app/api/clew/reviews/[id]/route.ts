import { NextResponse } from "next/server";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { rateClewReviewItem, type ClewReviewRating } from "@/lib/clew/reviews";
import { getClewSessionUser } from "@/lib/clew/session-user";

/**
 * Clew 复习打分（ZCODE-M5，thin adapter）：PATCH { rating: "again" | "hard" | "good" }。
 * 三键（再来一次/有点难/记住了）→ FSRS 前移 + dueAt 重排 + review-completed 事件；
 * 成功后条目从「今日到期」消失（dueAt 移到未来）。业务逻辑在 src/lib/clew/reviews.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("给复习打分");
  }

  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "复习条目序号不正确。");
  }

  let rating: unknown;
  try {
    const body = (await request.json()) as { rating?: unknown } | null;
    rating = body?.rating;
  } catch {
    rating = null;
  }
  if (rating !== "again" && rating !== "hard" && rating !== "good") {
    return clewFailure(400, "invalid-request", "打分只能是 again / hard / good。");
  }

  const result = await rateClewReviewItem({
    userId: user.id,
    itemId: id,
    rating: rating as ClewReviewRating,
  });
  if (!result.ok) {
    return clewServiceFailure(result);
  }
  return NextResponse.json({ ok: true, item: result.item });
}
