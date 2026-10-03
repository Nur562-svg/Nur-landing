import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { getClewSessionUser } from "@/lib/clew/session-user";
import {
  sendClewWorkshopMessage,
  type ClewWorkshopChatProgressEvent,
} from "@/lib/clew/workshops";
import type { ClewWorkshopChatEvent } from "@/types/clew";

/**
 * Clew 课题工作坊答疑（thin adapter，SSE：检索进度 + 回答增量 + 落库后的完整消息与命中片段）。
 * 业务逻辑在 src/lib/clew/workshops.ts；对话历史由服务端从库中读取，客户端只提交本轮提问。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const maxRequestBytes = 8000;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("使用课题答疑");
  }

  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "缺少课题 id。");
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return clewFailure(413, "invalid-request", "提问过长，请精简后再发送。");
  }

  let message: string;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > maxRequestBytes) {
      return clewFailure(413, "invalid-request", "提问过长，请精简后再发送。");
    }
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null) {
      return clewFailure(400, "invalid-request", "请求格式无效。");
    }
    const candidate = (parsed as { message?: unknown }).message;
    if (typeof candidate !== "string" || candidate.trim().length === 0) {
      return clewFailure(400, "invalid-request", "请输入要提问的问题。");
    }
    message = candidate;
  } catch {
    return clewFailure(400, "invalid-request", "请求格式无效。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewWorkshopChatEvent) => {
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
        const result = await sendClewWorkshopMessage({
          userId: user.id,
          workshopId: id,
          message,
          onProgress: (event: ClewWorkshopChatProgressEvent) => send({ type: "progress", ...event }),
          onDelta: (text: string) => send({ type: "delta", text }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({
          type: "result",
          conversation: result.conversation,
          citations: result.citations,
          notes: result.notes,
        });
      } catch (error) {
        console.error("[clew] 课题答疑失败", error);
        send({ type: "error", code: "server-error", error: "课题答疑失败，请稍后重试。" });
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
