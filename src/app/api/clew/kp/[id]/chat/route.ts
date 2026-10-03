import { hiDocFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import { sendHiDocKnowledgePointMessage } from "@/lib/hidoc/chat";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import type { HiDocChatEvent } from "@/types/hidoc";

/**
 * Hi doc 知识点讲解对话（thin adapter，SSE：回答增量 + 落库后的完整消息列表）。
 * 业务逻辑在 src/lib/hidoc/chat.ts；对话历史由服务端从库中读取，客户端只提交本轮提问。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const maxRequestBytes = 8000;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("讲解对话");
  }

  const { id } = await params;
  if (!id) {
    return hiDocFailure(400, "invalid-request", "知识点序号不正确。");
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return hiDocFailure(413, "invalid-request", "提问过长，请精简后再发送。");
  }

  let message: string;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > maxRequestBytes) {
      return hiDocFailure(413, "invalid-request", "提问过长，请精简后再发送。");
    }
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null) {
      return hiDocFailure(400, "invalid-request", "请求格式无效。");
    }
    const candidate = (parsed as { message?: unknown }).message;
    if (typeof candidate !== "string" || candidate.trim().length === 0) {
      return hiDocFailure(400, "invalid-request", "请输入要追问的问题。");
    }
    message = candidate;
  } catch {
    return hiDocFailure(400, "invalid-request", "请求格式无效。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: HiDocChatEvent) => {
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
        const result = await sendHiDocKnowledgePointMessage({
          userId: user.id,
          kpId: id,
          message,
          onDelta: (text: string) => send({ type: "delta", text }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({ type: "result", conversation: result.conversation, notes: result.notes });
      } catch (error) {
        console.error("[hidoc] 讲解对话失败", error);
        send({ type: "error", code: "server-error", error: "讲解对话失败，请稍后重试。" });
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