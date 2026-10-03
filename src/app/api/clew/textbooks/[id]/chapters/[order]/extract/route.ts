import { getClewSessionUser } from "@/lib/clew/session-user";
import { extractChapterThroughHarness } from "@/lib/clew/compiler-server";
import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import type {
  ClewChapterSource,
  ClewErrorCode,
  ClewExtractEvent,
  ClewKnowledgePointView,
} from "@/types/clew";
import type { ClewExtractProgressEvent } from "@/lib/clew/extraction";

/**
 * Clew 知识点萃取（thin adapter，SSE 流式进度 + 逐知识点事件）。
 * ZCODE-M2 起走 Harness：本路由只负责鉴权与事件编码，
 * 业务编排（门禁 / 配额 / 萃取 / 证据绑定）在 src/lib/clew/compiler-server.ts。
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
    return clewUnauthorized("萃取知识点");
  }

  const { id, order: rawOrder } = await params;
  const chapterOrder = Number.parseInt(rawOrder, 10);
  if (!Number.isInteger(chapterOrder) || chapterOrder < 1) {
    return clewFailure(400, "invalid-request", "章节序号不正确。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewExtractEvent) => {
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
        const result = await extractChapterThroughHarness(
          user.id,
          user.tier,
          id,
          chapterOrder,
          {
            onProgress: (event: ClewExtractProgressEvent) =>
              send({ type: "progress", ...event }),
            onKnowledgePoint: (knowledgePoint: ClewKnowledgePointView) =>
              send({ type: "kp", chapterIndex: chapterOrder, knowledgePoint }),
          },
        );

        if (!result.ok) {
          send({ type: "error", code: result.code as ClewErrorCode, error: result.message });
          return;
        }
        send({
          type: "result",
          result: {
            chapter: {
              id: result.chapter.id,
              order: result.chapter.order,
              title: result.chapter.title,
              pageStart: result.chapter.pageStart,
              pageEnd: result.chapter.pageEnd,
              source: result.chapter.source as ClewChapterSource,
              status: "extracted" as const,
              knowledgePointCount: result.chapter.knowledgePointCount,
            },
            knowledgePoints: result.knowledgePoints,
            notes: result.notes,
          },
        });
      } catch (error) {
        console.error("[clew] 知识点萃取失败", error);
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
