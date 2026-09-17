import { hiDocFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import {
  generateHiDocKnowledgePointLesson,
  type HiDocLessonProgressEvent,
} from "@/lib/hidoc/lesson";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import type { HiDocLessonEvent } from "@/types/hidoc";

/**
 * Hi doc 知识点讲义生成（thin adapter，SSE：进度 + markdown 增量 + 结果）。
 * 业务逻辑在 src/lib/hidoc/lesson.ts；这里只负责鉴权与事件编码。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("生成讲义");
  }

  const { id } = await params;
  if (!id) {
    return hiDocFailure(400, "invalid-request", "知识点序号不正确。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: HiDocLessonEvent) => {
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
        const result = await generateHiDocKnowledgePointLesson({
          userId: user.id,
          kpId: id,
          onProgress: (event: HiDocLessonProgressEvent) => send({ type: "progress", ...event }),
          onDelta: (text: string) => send({ type: "delta", text }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({ type: "result", lesson: result.lesson, notes: result.notes });
      } catch (error) {
        console.error("[hidoc] 讲义生成失败", error);
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