import { NextResponse } from "next/server";
import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import {
  coercePracticeIntensityOrDefault,
  generateClewPractice,
  loadClewPracticeSet,
} from "@/lib/clew/practice";
import { getClewSessionUser } from "@/lib/clew/session-user";
import type { ClewPracticeEvent } from "@/types/clew";

/**
 * Clew 练习题组（ZCODE-M6-A，thin adapter）：
 * GET  当前题组 + 本人作答状态（无题组 → questions 空数组）；
 * POST 生成（SSE：progress → result/error；body {intensity?: "standard"|"deep"}，缺省 deep）。
 * 业务逻辑在 src/lib/clew/practice.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("查看练习题");
  }
  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "知识点序号不正确。");
  }
  const result = await loadClewPracticeSet(user.id, id);
  if (!result.ok) {
    return clewFailure(result.status, result.code, result.message);
  }
  return NextResponse.json({ ok: true, set: result.data });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("生成练习题");
  }
  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "知识点序号不正确。");
  }

  let intensity: unknown;
  try {
    const body = (await request.json()) as { intensity?: unknown } | null;
    intensity = body?.intensity;
  } catch {
    intensity = undefined;
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewPracticeEvent) => {
        if (closed) {
          return;
        }
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          closed = true;
        }
      };

      try {
        const result = await generateClewPractice({
          userId: user.id,
          kpId: id,
          intensity: coercePracticeIntensityOrDefault(intensity),
          onProgress: (event) => send({ type: "progress", ...event }),
        });
        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({ type: "result", set: result.data, notes: result.notes });
      } catch (error) {
        console.error("[clew] 练习生成失败", error);
        send({ type: "error", code: "server-error", error: "练习题生成失败，请稍后重试。" });
      } finally {
        closed = true;
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
