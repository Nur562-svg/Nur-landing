import { getClewSessionUser } from "@/lib/clew/session-user";
import {
  ClewHarnessError,
  compileTextbookThroughHarness,
  getClewCompileCacheView,
} from "@/lib/clew/compiler-server";
import type { CompileScope } from "@/lib/clew/compile-scope";
import { clewUnauthorized } from "@/lib/clew/api-response";
import { NextResponse } from "next/server";
import type { ClewCompileEvent, ClewErrorCode } from "@/types/clew";

/**
 * Clew 教材编译（全书走 Harness，ZCODE-M2 Phase 2 建立、ZCODE-M3 Phase 3 接线）。
 * - GET：编译缓存视图（上次编译状态 + 指纹），供详情页跨刷新显示「上次编译」；
 * - POST body { scope?: "pending" | "all" }（默认 pending）：pending = pending|failed 章节；
 *   指纹变化时服务端强制全量并在 SSE 流内提示。SSE 事件契约不变（只增不改）。
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
    return clewUnauthorized("查看编译状态");
  }
  const { id: textbookId } = await params;
  const cache = await getClewCompileCacheView(textbookId);
  return NextResponse.json({ ok: true, cache });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("编译教材");
  }
  const { id: textbookId } = await params;

  let scope: CompileScope = "pending";
  try {
    const body = (await request.json()) as { scope?: unknown };
    if (body?.scope === "all" || body?.scope === "pending") {
      scope = body.scope;
    }
  } catch {
    // 无 body / 非 JSON → 默认 pending
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: ClewCompileEvent) => {
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
        const result = await compileTextbookThroughHarness(
          user.id,
          user.tier,
          textbookId,
          scope,
          (progress) => send({ type: "progress", progress }),
        );

        if (!result.ok) {
          send({ type: "error", code: result.code as ClewErrorCode, error: result.message });
          return;
        }

        for (const outcome of result.summary.chapterResults) {
          send({
            type: "chapter",
            outcome: {
              chapterOrder: outcome.chapter.order,
              chapterTitle: outcome.chapter.title,
              ok: outcome.ok,
              knowledgePointCount: outcome.knowledgePointCount,
              error: outcome.error,
            },
          });
        }

        const notes: string[] = [];
        if (result.forcedNote) {
          notes.push(result.forcedNote);
        }
        if (result.summary.failedChapters.length > 0) {
          notes.push(
            `${result.summary.failedChapters.length} 章萃取失败已隔离（失败章不影响其他章），可到章节列表单独重试。`,
          );
        }
        send({
          type: "done",
          state: result.summary.state,
          succeededChapters: result.summary.succeededChapters.length,
          failedChapters: result.summary.failedChapters.length,
          knowledgePointCount: result.summary.knowledgePointCount,
          notes,
        });
      } catch (error) {
        if (error instanceof ClewHarnessError) {
          send({ type: "error", code: error.code as ClewErrorCode, error: error.message });
          return;
        }
        console.error("[clew] 教材编译失败", error);
        send({ type: "error", code: "server-error", error: "教材编译失败，请稍后重试。" });
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
