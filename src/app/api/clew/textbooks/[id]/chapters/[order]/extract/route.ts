import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import {
  extractHiDocChapterKnowledgePoints,
  type HiDocExtractProgressEvent,
} from "@/lib/hidoc/extraction";
import { hiDocFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import type { HiDocExtractEvent, HiDocKnowledgePointView } from "@/types/hidoc";

/**
 * Hi doc 知识点萃取（thin adapter，SSE 流式进度 + 逐知识点事件）。
 * 业务逻辑在 src/lib/hidoc/extraction.ts；这里只负责鉴权、事件编码。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string; order: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("萃取知识点");
  }

  const { id, order: rawOrder } = await params;
  const chapterOrder = Number.parseInt(rawOrder, 10);
  if (!Number.isInteger(chapterOrder) || chapterOrder < 1) {
    return hiDocFailure(400, "invalid-request", "章节序号不正确。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: HiDocExtractEvent) => {
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
        const result = await extractHiDocChapterKnowledgePoints({
          userId: user.id,
          tier: user.tier,
          textbookId: id,
          chapterOrder,
          onProgress: (event: HiDocExtractProgressEvent) =>
            send({ type: "progress", ...event }),
          onKnowledgePoint: (knowledgePoint: HiDocKnowledgePointView) =>
            send({ type: "kp", chapterIndex: chapterOrder, knowledgePoint }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({
          type: "result",
          result: {
            chapter: result.chapter,
            knowledgePoints: result.knowledgePoints,
            notes: result.notes,
          },
        });
      } catch (error) {
        console.error("[hidoc] 知识点萃取失败", error);
        send({ type: "error", code: "server-error", error: "知识点萃取失败，请稍后重试。" });
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
