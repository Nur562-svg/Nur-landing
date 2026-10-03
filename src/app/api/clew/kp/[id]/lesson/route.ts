import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import {
  generateClewKnowledgePointLesson,
  type ClewLessonProgressEvent,
} from "@/lib/clew/lesson";
import { getClewSessionUser } from "@/lib/clew/session-user";
import type { ClewLessonEvent } from "@/types/clew";

/**
 * Clew 知识点讲义生成（thin adapter，SSE：进度 + markdown 增量 + 结果）。
 * 业务逻辑在 src/lib/clew/lesson.ts；这里只负责鉴权与事件编码。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("生成讲义");
  }

  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "知识点序号不正确。");
  }

  // 可选的讲解风格（生成时显式选择；未提供时用账户默认风格）
  let requestedStyle: string | undefined;
  try {
    const body = (await request.json()) as { style?: unknown } | null;
    if (typeof body?.style === "string") {
      requestedStyle = body.style;
    }
  } catch {
    // 无 body / 非 JSON：按未指定处理
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewLessonEvent) => {
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
        const result = await generateClewKnowledgePointLesson({
          userId: user.id,
          kpId: id,
          requestedStyle,
          onProgress: (event: ClewLessonProgressEvent) => send({ type: "progress", ...event }),
          onDelta: (text: string) => send({ type: "delta", text }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({ type: "result", lesson: result.lesson, notes: result.notes });
      } catch (error) {
        console.error("[clew] 讲义生成失败", error);
        send({ type: "error", code: "server-error", error: "讲义生成失败，请稍后重试。" });
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