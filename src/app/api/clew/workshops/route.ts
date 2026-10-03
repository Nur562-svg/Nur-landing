import { NextResponse } from "next/server";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { createClewWorkshop, deleteClewWorkshop, listClewWorkshops } from "@/lib/clew/workshops";

/**
 * Clew 课题工作坊 API（thin adapter）：列表 / 新建 / 删除。
 * 业务逻辑全在 src/lib/clew/workshops.ts；这里只做登录校验、请求解析与错误映射。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 课题列表 + 限额。 */
export async function GET() {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("使用课题工作坊");
  }

  try {
    const list = await listClewWorkshops(user.id, user.tier);
    return NextResponse.json({ ok: true, ...list });
  } catch (error) {
    console.error("[clew] 课题列表读取失败", error);
    return clewFailure(500, "server-error", "课题列表读取失败，请稍后重试。");
  }
}

/** 新建课题（JSON：title 必填，note 可选）。 */
export async function POST(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("新建课题");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return clewFailure(400, "invalid-request", "请求格式不正确。");
  }
  const { title, note } = (payload ?? {}) as { title?: unknown; note?: unknown };

  try {
    const result = await createClewWorkshop({ userId: user.id, tier: user.tier, title, note });
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    return NextResponse.json({ ok: true, ...result.data });
  } catch (error) {
    console.error("[clew] 课题创建失败", error);
    return clewFailure(500, "server-error", "课题创建失败，请稍后重试。");
  }
}

/** 删除课题（材料与对话级联删除，服务器文件一并清理）。 */
export async function DELETE(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("管理课题");
  }

  const workshopId = new URL(request.url).searchParams.get("id")?.trim();
  if (!workshopId) {
    return clewFailure(400, "invalid-request", "缺少课题 id。");
  }

  try {
    const result = await deleteClewWorkshop(user.id, workshopId);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    const list = await listClewWorkshops(user.id, user.tier);
    return NextResponse.json({ ok: true, deletedId: result.data.deletedId, ...list });
  } catch (error) {
    console.error("[clew] 课题删除失败", error);
    return clewFailure(500, "server-error", "课题删除失败，请稍后重试。");
  }
}
