import { NextResponse } from "next/server";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { clewFailure, clewServiceFailure, clewUnauthorized } from "@/lib/clew/api-response";
import {
  activateClewTextbook,
  deleteClewTextbook,
  getClewShelf,
  uploadClewTextbook,
} from "@/lib/clew/textbooks";

/**
 * Clew 教材 API（thin adapter）：上传 / 书架 / 删除 / 重新激活。
 * 业务逻辑全在 src/lib/clew/；这里只做登录校验、请求解析与错误映射。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 书架 + 当月名额。 */
export async function GET() {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("使用 Clew 书架");
  }

  try {
    const shelf = await getClewShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, shelf });
  } catch (error) {
    console.error("[clew] 书架读取失败", error);
    return clewFailure(500, "server-error", "书架读取失败，请稍后重试。");
  }
}

/** 上传教材（multipart：file 必填，title 可选）。 */
export async function POST(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("上传教材");
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return clewFailure(400, "invalid-request", "上传请求格式不正确，请重新选择文件。");
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return clewFailure(400, "invalid-request", "请选择要上传的 PDF 或 DOCX 文件。");
  }
  const titleValue = formData.get("title");

  try {
    const result = await uploadClewTextbook({
      userId: user.id,
      tier: user.tier,
      fileName: file.name,
      title: typeof titleValue === "string" ? titleValue : undefined,
      bytes: new Uint8Array(await file.arrayBuffer()),
    });
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    const shelf = await getClewShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, textbook: result.data.textbook, shelf });
  } catch (error) {
    console.error("[clew] 教材上传失败", error);
    return clewFailure(500, "server-error", "教材上传失败，请稍后重试。");
  }
}

/** 删除教材（软删除并释放当月名额）。 */
export async function DELETE(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("管理教材");
  }

  const textbookId = new URL(request.url).searchParams.get("id")?.trim();
  if (!textbookId) {
    return clewFailure(400, "invalid-request", "缺少教材 id。");
  }

  try {
    const result = await deleteClewTextbook(user.id, textbookId);
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    const shelf = await getClewShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, deletedId: result.data.deletedId, shelf });
  } catch (error) {
    console.error("[clew] 教材删除失败", error);
    return clewFailure(500, "server-error", "教材删除失败，请稍后重试。");
  }
}

/** 重新激活冻结教材（占用当月名额）。 */
export async function PATCH(request: Request) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("管理教材");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return clewFailure(400, "invalid-request", "请求格式不正确。");
  }

  const { id, action } = (payload ?? {}) as { id?: unknown; action?: unknown };
  if (typeof id !== "string" || id.trim().length === 0) {
    return clewFailure(400, "invalid-request", "缺少教材 id。");
  }
  if (action !== "activate") {
    return clewFailure(400, "invalid-request", "目前只支持 action=activate。");
  }

  try {
    const result = await activateClewTextbook(user.id, user.tier, id.trim());
    if (!result.ok) {
      return clewServiceFailure(result);
    }
    const shelf = await getClewShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, textbook: result.data.textbook, shelf });
  } catch (error) {
    console.error("[clew] 教材重新激活失败", error);
    return clewFailure(500, "server-error", "教材重新激活失败，请稍后重试。");
  }
}