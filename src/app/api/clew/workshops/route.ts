import { NextResponse } from "next/server";
import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { createHiDocWorkshop, deleteHiDocWorkshop, listHiDocWorkshops } from "@/lib/hidoc/workshops";

/**
 * Hi doc 课题工作坊 API（thin adapter）：列表 / 新建 / 删除。
 * 业务逻辑全在 src/lib/hidoc/workshops.ts；这里只做登录校验、请求解析与错误映射。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 课题列表 + 限额。 */
export async function GET() {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("使用课题工作坊");
  }

  try {
    const list = await listHiDocWorkshops(user.id, user.tier);
    return NextResponse.json({ ok: true, ...list });
  } catch (error) {
    console.error("[hidoc] 课题列表读取失败", error);
    return hiDocFailure(500, "server-error", "课题列表读取失败，请稍后重试。");
  }
}

/** 新建课题（JSON：title 必填，note 可选）。 */
export async function POST(request: Request) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("新建课题");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return hiDocFailure(400, "invalid-request", "请求格式不正确。");
  }
  const { title, note } = (payload ?? {}) as { title?: unknown; note?: unknown };

  try {
    const result = await createHiDocWorkshop({ userId: user.id, tier: user.tier, title, note });
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    return NextResponse.json({ ok: true, ...result.data });
  } catch (error) {
    console.error("[hidoc] 课题创建失败", error);
    return hiDocFailure(500, "server-error", "课题创建失败，请稍后重试。");
  }
}

/** 删除课题（材料与对话级联删除，服务器文件一并清理）。 */
export async function DELETE(request: Request) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("管理课题");
  }

  const workshopId = new URL(request.url).searchParams.get("id")?.trim();
  if (!workshopId) {
    return hiDocFailure(400, "invalid-request", "缺少课题 id。");
  }

  try {
    const result = await deleteHiDocWorkshop(user.id, workshopId);
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    const list = await listHiDocWorkshops(user.id, user.tier);
    return NextResponse.json({ ok: true, deletedId: result.data.deletedId, ...list });
  } catch (error) {
    console.error("[hidoc] 课题删除失败", error);
    return hiDocFailure(500, "server-error", "课题删除失败，请稍后重试。");
  }
}
