import { prisma } from "@/lib/prisma";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { recognizeHiDocToc, type HiDocTocProgressEvent } from "@/lib/hidoc/toc-recognition";
import { saveRecognizedChapters } from "@/lib/hidoc/chapters";
import { hiDocFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import type { HiDocTocEvent } from "@/types/hidoc";

/**
 * Hi doc 目录识别（thin adapter，SSE 流式进度）。
 * 业务逻辑在 src/lib/hidoc/toc-recognition.ts；这里只负责鉴权、事件编码与落库调用。
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
    return hiDocUnauthorized("识别目录");
  }

  const { id } = await params;
  const textbook = await prisma.hiDocTextbook.findFirst({
    where: { id, userId: user.id, deletedAt: null },
    select: { id: true, title: true, storageKey: true, pageCount: true, fileName: true },
  });
  if (!textbook) {
    return hiDocFailure(404, "not-found", "教材不存在或已删除。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: HiDocTocEvent) => {
        if (closed) {
          return;
        }
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          // 客户端已断开：停止写入，业务结果仍会尽力落库
          closed = true;
        }
      };

      try {
        const result = await recognizeHiDocToc({
          userId: user.id,
          tier: user.tier,
          textbook: {
            id: textbook.id,
            title: textbook.title,
            storageKey: textbook.storageKey,
            pageCount: textbook.pageCount,
            fileName: textbook.fileName,
          },
          onProgress: (event: HiDocTocProgressEvent) => send({ type: "progress", ...event }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }

        send({
          type: "progress",
          stage: "save",
          message: `写入 ${result.chapters.length} 个章节…`,
        });
        const saved = await saveRecognizedChapters(user.id, textbook.id, result.chapters, {
          strategy: result.strategy,
          notes: result.notes,
          source: result.source,
        });
        if (!saved.ok) {
          send({ type: "error", code: saved.code, error: saved.message });
          return;
        }
        send({ type: "result", detail: saved.data });
      } catch (error) {
        console.error("[hidoc] 目录识别失败", error);
        send({ type: "error", code: "server-error", error: "目录识别失败，请稍后重试。" });
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