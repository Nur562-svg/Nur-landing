import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { createClewHighlight } from "@/lib/clew/highlights";
import { getClewSessionUser } from "@/lib/clew/session-user";

/**
 * Clew 划重点创建（thin adapter）。
 * 业务逻辑在 src/lib/clew/highlights.ts；归属、长度/枚举/上限校验都在服务层，客户端无法绕过。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 8000;

export async function POST(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("保存划重点");
  }

  let payload: {
    kpId?: unknown;
    quote?: unknown;
    prefix?: unknown;
    suffix?: unknown;
    color?: unknown;
    note?: unknown;
  };
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > maxRequestBytes) {
      return clewFailure(413, "invalid-request", "请求内容过长，请精简批注后再保存。");
    }
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null) {
      return clewFailure(400, "invalid-request", "请求格式无效。");
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return clewFailure(400, "invalid-request", "请求格式无效。");
  }

  if (typeof payload.kpId !== "string" || payload.kpId.trim().length === 0) {
    return clewFailure(400, "invalid-request", "缺少知识点序号。");
  }

  const result = await createClewHighlight({
    userId: user.id,
    kpId: payload.kpId,
    quote: payload.quote,
    prefix: payload.prefix,
    suffix: payload.suffix,
    color: payload.color,
    note: payload.note,
  });
  if (!result.ok) {
    return clewServiceFailure(result);
  }
  return Response.json({ ok: true, highlight: result.data }, { status: 201 });
}