import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import {
  selectContinueLearningTarget,
  selectUnifiedLearningFeed,
} from "@/lib/unified-state";
import { clewUnauthorized } from "@/lib/clew/api-response";

/**
 * 统一学习动态（ZCODE-M3 Phase 2，thin adapter）：
 * GET → { ok, feed, continueTarget }。登录校验与既有 Clew 路由同一约定（401）。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看学习动态");
  }

  const [feed, continueTarget] = await Promise.all([
    selectUnifiedLearningFeed(user.id),
    selectContinueLearningTarget(user.id),
  ]);
  return NextResponse.json({ ok: true, feed, continueTarget });
}
