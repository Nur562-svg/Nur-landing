import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import { createHiDocHighlight } from "@/lib/hidoc/highlights";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";

/**
 * Hi doc 划重点创建（thin adapter）。
 * 业务逻辑在 src/lib/hidoc/highlights.ts；归属、长度/枚举/上限校验都在服务层，客户端无法绕过。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 8000;

export async function POST(request: Request) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("保存划重点");
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
      return hiDocFailure(413, "invalid-request", "请求内容过长，请精简批注后再保存。");
    }
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed !== "object" || parsed === null) {
      return hiDocFailure(400, "invalid-request", "请求格式无效。");
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return hiDocFailure(400, "invalid-request", "请求格式无效。");
  }

  if (typeof payload.kpId !== "string" || payload.kpId.trim().length === 0) {
    return hiDocFailure(400, "invalid-request", "缺少知识点序号。");
  }

  const result = await createHiDocHighlight({
    userId: user.id,
    kpId: payload.kpId,
    quote: payload.quote,
    prefix: payload.prefix,
    suffix: payload.suffix,
    color: payload.color,
    note: payload.note,
  });
  if (!result.ok) {
    return hiDocServiceFailure(result);
  }
  return Response.json({ ok: true, highlight: result.data }, { status: 201 });
}