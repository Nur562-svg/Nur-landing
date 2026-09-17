import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import { deleteHiDocHighlight, updateHiDocHighlight } from "@/lib/hidoc/highlights";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";

/**
 * Hi doc 划重点修改（PATCH：改色/改批注）与删除（DELETE）（thin adapter）。
 * 归属校验在服务层（仅本人可见），跨账号访问返回 404，不泄漏他人数据是否存在。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 8000;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("修改划重点");
  }

  const { id } = await params;
  if (!id) {
    return hiDocFailure(400, "invalid-request", "划重点序号不正确。");
  }

  let payload: { color?: unknown; note?: unknown };
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

  const result = await updateHiDocHighlight({
    userId: user.id,
    highlightId: id,
    color: payload.color,
    note: payload.note,
  });
  if (!result.ok) {
    return hiDocServiceFailure(result);
  }
  return Response.json({ ok: true, highlight: result.data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("删除划重点");
  }

  const { id } = await params;
  if (!id) {
    return hiDocFailure(400, "invalid-request", "划重点序号不正确。");
  }

  const result = await deleteHiDocHighlight({ userId: user.id, highlightId: id });
  if (!result.ok) {
    return hiDocServiceFailure(result);
  }
  return Response.json({ ok: true, id: result.data.id });
}