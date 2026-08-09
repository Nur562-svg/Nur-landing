/**
 * M2 学习状态云同步 API（thin adapter）
 * POST /api/learn/sync
 * Body: LearnerSyncPayload
 * 要求登录（M1 JWT httpOnly cookie）
 * 返回合并结果
 * 
 * 私人准入记录的云同步由前端 payload 中的 admissionConsents 单独控制（consent gate）
 */

import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { syncLearnerState, type LearnerSyncPayload, getLearnerStateForUser } from "@/lib/learner-state-sync";

const MAX_BODY = 512 * 1024; // 512KB 足够记忆状态

export async function POST(req: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY) {
      return NextResponse.json({ ok: false, error: "payload-too-large" }, { status: 413 });
    }

    const body = (await req.json()) as LearnerSyncPayload;

    const result = await syncLearnerState(session.sub, body);

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}

// 可选：GET 返回服务器端当前状态（简化：先返回 ok，未来可扩展下载合并后的 memory）
export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const state = await getLearnerStateForUser(session.sub);
    return NextResponse.json({ ok: true, state });
  } catch {
    return NextResponse.json({ ok: true, state: null, error: "fetch-failed" });
  }
}
