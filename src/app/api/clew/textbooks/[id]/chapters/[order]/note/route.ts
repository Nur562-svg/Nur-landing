import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { generateClewChapterNote, type ClewNoteProgressEvent } from "@/lib/clew/note";
import { getClewSessionUser } from "@/lib/clew/session-user";
import type { ClewNoteEvent } from "@/types/clew";

/**
 * Clew 学霸笔记生成（thin adapter，SSE：进度 + markdown 增量 + 结果）。
 * 业务逻辑在 src/lib/clew/note.ts；这里只负责鉴权与事件编码。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string; order: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("生成学霸笔记");
  }

  const { id, order } = await params;
  const chapterOrder = Number.parseInt(order, 10);
  if (!id || !Number.isInteger(chapterOrder) || chapterOrder < 1) {
    return clewFailure(400, "invalid-request", "章节序号不正确。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewNoteEvent) => {
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
        const result = await generateClewChapterNote({
          userId: user.id,
          textbookId: id,
          chapterOrder,
          onProgress: (event: ClewNoteProgressEvent) => send({ type: "progress", ...event }),
          onDelta: (text: string) => send({ type: "delta", text }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({ type: "result", note: result.note, notes: result.notes });
      } catch (error) {
        console.error("[clew] 学霸笔记生成失败", error);
        send({ type: "error", code: "server-error", error: "学霸笔记生成失败，请稍后重试。" });
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