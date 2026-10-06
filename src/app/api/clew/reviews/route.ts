import { NextResponse } from "next/server";
import { clewUnauthorized } from "@/lib/clew/api-response";
import { listClewReviews } from "@/lib/clew/reviews";
import { getClewSessionUser } from "@/lib/clew/session-user";

/**
 * Clew FSRS 复习调度查询（ZCODE-M5，thin adapter）：
 * GET /api/clew/reviews            → 全部未暂停条目（dueAt 升序）+ 今日到期数；
 * GET /api/clew/reviews?due=1      → 今日到期（dueAt <= now 且未暂停）；
 * GET /api/clew/reviews?kp=KP_ID   → 单点状态（含暂停条目）。
 * 业务逻辑在 src/lib/clew/reviews.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看复习安排");
  }

  const url = new URL(request.url);
  const due = url.searchParams.get("due") === "1";
  const kpId = url.searchParams.get("kp") ?? undefined;
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined;

  const { items, dueCount } = await listClewReviews(user.id, {
    due,
    kpId,
    ...(Number.isInteger(limit) && limit !== undefined ? { limit } : {}),
  });
  return NextResponse.json({ ok: true, items, dueCount });
}
