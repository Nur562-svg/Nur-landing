import { NextResponse } from "next/server";
import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { submitClewPracticeAttempt } from "@/lib/clew/practice";
import { getClewSessionUser } from "@/lib/clew/session-user";

/**
 * Clew 练习作答（ZCODE-M6-A，thin adapter）：
 * POST { selectedIndex }（A1 服务端确定性判分）｜ { selfRating: "correct"|"wrong" }（fill 自评）。
 * 错答经 practice-wrong 进 FSRS 调度；作答与回流事件入统一学习事件流。
 * 业务逻辑在 src/lib/clew/practice.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ qid: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("提交练习作答");
  }

  const { qid } = await params;
  if (!qid) {
    return clewFailure(400, "invalid-request", "练习题序号不正确。");
  }

  let body: { selectedIndex?: unknown; selfRating?: unknown } | null = null;
  try {
    body = (await request.json()) as { selectedIndex?: unknown; selfRating?: unknown } | null;
  } catch {
    body = null;
  }
  if (!body) {
    return clewFailure(400, "invalid-request", "作答提交格式不正确。");
  }

  const result = await submitClewPracticeAttempt({
    userId: user.id,
    questionId: qid,
    selectedIndex: body.selectedIndex,
    selfRating: body.selfRating,
  });
  if (!result.ok) {
    return clewFailure(result.status, result.code, result.message);
  }
  return NextResponse.json({ ok: true, attempt: result.data });
}
