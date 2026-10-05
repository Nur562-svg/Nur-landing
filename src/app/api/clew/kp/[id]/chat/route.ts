import { clewFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { sendClewKnowledgePointMessage } from "@/lib/clew/chat";
import { getClewSessionUser } from "@/lib/clew/session-user";
import type { ClewChatEvent } from "@/types/clew";

/**
 * Clew 知识点讲解对话（thin adapter，SSE：回答增量 + 落库后的完整消息列表）。
 * 业务逻辑在 src/lib/clew/chat.ts；对话历史由服务端从库中读取，客户端只提交本轮提问。
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
    return clewUnauthorized("讲解对话");
  }

  const { id } = await params;
  if (!id) {
    return clewFailure(400, "invalid-request", "知识点序号不正确。");
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return clewFailure(413, "invalid-request", "提问过长，请精简后再发送。");
  }

  let message: string;
  let style: string | undefined;
  let scope: string | undefined;
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
      return clewFailure(400, "invalid-request", "请输入要追问的问题。");
    }
    message = candidate;
    // 批 3 可选字段：style / scope（校验在服务编排层，非法值 400）
    const styleCandidate = (parsed as { style?: unknown }).style;
    if (styleCandidate !== undefined) {
      if (typeof styleCandidate !== "string") {
        return clewFailure(400, "invalid-request", "请求格式无效。");
      }
      style = styleCandidate;
    }
    const scopeCandidate = (parsed as { scope?: unknown }).scope;
    if (scopeCandidate !== undefined) {
      if (typeof scopeCandidate !== "string") {
        return clewFailure(400, "invalid-request", "请求格式无效。");
      }
      scope = scopeCandidate;
    }
  } catch {
    return clewFailure(400, "invalid-request", "请求格式无效。");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewChatEvent) => {
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
        const result = await sendClewKnowledgePointMessage({
          userId: user.id,
          kpId: id,
          message,
          style,
          scope,
          onDelta: (text: string) => send({ type: "delta", text }),
          onStatus: (phase, statusMessage) => send({ type: "status", phase, message: statusMessage }),
        });

        if (!result.ok) {
          send({ type: "error", code: result.code, error: result.message });
          return;
        }
        send({ type: "result", conversation: result.conversation, notes: result.notes });
      } catch (error) {
        console.error("[clew] 讲解对话失败", error);
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