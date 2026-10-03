import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getOrCreateSession, getUserSessions } from "@/lib/clew/session";
import { clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { coerceLoopProfileId } from "@/lib/loop-profile";
import type { LoopProfileId } from "@/types/loop-profile";
import type { ClewErrorCode } from "@/types/clew";

/**
 * Clew 学习会话（ZCODE-M2 Phase 4）：
 * POST 创建或恢复（同 kpId 的 active 会话直接恢复，跨设备状态连续）；
 * GET 列出当前用户的学习历史。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看学习会话");
  }
  const url = new URL(request.url);
  const textbookId = url.searchParams.get("textbookId") ?? undefined;
  const status = url.searchParams.get("status") ?? undefined;
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(Number.parseInt(limitParam, 10) || 20, 1), 100) : 20;

  const sessions = await getUserSessions(user.id, { textbookId, status, limit });
  return NextResponse.json({ ok: true, sessions });
}

export async function POST(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("开始学习会话");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "请求体不是合法 JSON。" });
  }
  const payload = (typeof body === "object" && body !== null ? body : {}) as {
    textbookId?: unknown;
    kpId?: unknown;
    chapterId?: unknown;
    profileId?: unknown;
  };
  if (typeof payload.textbookId !== "string" || typeof payload.kpId !== "string") {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "缺少 textbookId 或 kpId。" });
  }
  const coerced = coerceLoopProfileId(
    typeof payload.profileId === "string" ? payload.profileId : "full-loop",
  );

  const result = await getOrCreateSession(
    user.id,
    payload.textbookId,
    payload.kpId,
    coerced.profileId as LoopProfileId,
    {
      chapterId: typeof payload.chapterId === "string" ? payload.chapterId : undefined,
    },
  );
  if (!result.ok) {
    return clewServiceFailure({ ...result, code: result.code as ClewErrorCode });
  }
  return NextResponse.json({ ok: true, session: result.session, profileFallback: coerced.fallback });
}
