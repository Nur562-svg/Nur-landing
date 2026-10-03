import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { abandonSession, completeSession, updateSessionStage } from "@/lib/clew/session";
import { clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { LOOP_STAGES, type StageState } from "@/types/loop-profile";
import type { ClewErrorCode } from "@/types/clew";

/**
 * 更新学习会话（ZCODE-M2 Phase 4）：
 * PATCH { stage, state } 推进环节；POST { action: "complete" | "abandon" } 结束会话。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseStageState(value: unknown): StageState | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const payload = value as { status?: unknown; enteredAt?: unknown; completedAt?: unknown; reason?: unknown };
  if (payload.status === "active" && typeof payload.enteredAt === "string") {
    return { status: "active", enteredAt: payload.enteredAt };
  }
  if (payload.status === "completed") {
    return {
      status: "completed",
      completedAt: typeof payload.completedAt === "string" ? payload.completedAt : new Date().toISOString(),
    };
  }
  if (payload.status === "skipped" && typeof payload.reason === "string") {
    return { status: "skipped", reason: payload.reason };
  }
  return null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("更新学习会话");
  }
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "请求体不是合法 JSON。" });
  }
  const payload = (typeof body === "object" && body !== null ? body : {}) as {
    stage?: unknown;
    state?: unknown;
  };
  if (
    typeof payload.stage !== "string"
    || !LOOP_STAGES.includes(payload.stage as (typeof LOOP_STAGES)[number])
  ) {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "未知的学习环节。" });
  }
  const state = parseStageState(payload.state);
  if (!state) {
    return clewServiceFailure({ status: 400, code: "invalid-request", message: "环节状态不合法。" });
  }

  const result = await updateSessionStage(id, user.id, payload.stage, state);
  if (!result.ok) {
    return clewServiceFailure({ ...result, code: result.code as ClewErrorCode });
  }
  return NextResponse.json({ ok: true, session: result.session });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("结束学习会话");
  }
  const { id } = await params;

  let action = "";
  try {
    const body = (await request.json()) as { action?: unknown };
    action = typeof body?.action === "string" ? body.action : "";
  } catch {
    action = "";
  }

  if (action === "complete") {
    const done = await completeSession(id, user.id);
    if (!done) {
      return clewServiceFailure({ status: 404, code: "not-found", message: "会话不存在或已结束。" });
    }
    return NextResponse.json({ ok: true, status: "completed" });
  }
  if (action === "abandon") {
    const done = await abandonSession(id, user.id);
    if (!done) {
      return clewServiceFailure({ status: 404, code: "not-found", message: "会话不存在或已结束。" });
    }
    return NextResponse.json({ ok: true, status: "abandoned" });
  }
  return clewServiceFailure({
    status: 400,
    code: "invalid-request",
    message: "action 必须是 complete 或 abandon。",
  });
}
