import { NextResponse } from "next/server";
import type { HiDocApiFailure, HiDocErrorCode } from "@/types/hidoc";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import {
  activateHiDocTextbook,
  deleteHiDocTextbook,
  getHiDocShelf,
  uploadHiDocTextbook,
  type HiDocServiceFailure,
} from "@/lib/hidoc/textbooks";

/**
 * Hi doc 教材 API（thin adapter）：上传 / 书架 / 删除 / 重新激活。
 * 业务逻辑全在 src/lib/hidoc/；这里只做登录校验、请求解析与错误映射。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function failureResponse(status: number, code: HiDocErrorCode, message: string) {
  const body: HiDocApiFailure = { ok: false, code, error: message };
  return NextResponse.json(body, { status });
}

function serviceFailureResponse(failure: HiDocServiceFailure) {
  return failureResponse(failure.status, failure.code, failure.message);
}

/** 书架 + 当月名额。 */
export async function GET() {
  const user = await getHiDocSessionUser();
  if (!user) {
    return failureResponse(401, "unauthorized", "请先登录后再使用 Hi doc 书架。");
  }

  try {
    const shelf = await getHiDocShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, shelf });
  } catch (error) {
    console.error("[hidoc] 书架读取失败", error);
    return failureResponse(500, "server-error", "书架读取失败，请稍后重试。");
  }
}

/** 上传教材（multipart：file 必填，title 可选）。 */
export async function POST(request: Request) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return failureResponse(401, "unauthorized", "请先登录后再上传教材。");
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return failureResponse(400, "invalid-request", "上传请求格式不正确，请重新选择文件。");
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return failureResponse(400, "invalid-request", "请选择要上传的 PDF 文件。");
  }
  const titleValue = formData.get("title");

  try {
    const result = await uploadHiDocTextbook({
      userId: user.id,
      tier: user.tier,
      fileName: file.name,
      title: typeof titleValue === "string" ? titleValue : undefined,
      bytes: new Uint8Array(await file.arrayBuffer()),
    });
    if (!result.ok) {
      return serviceFailureResponse(result);
    }
    const shelf = await getHiDocShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, textbook: result.data.textbook, shelf });
  } catch (error) {
    console.error("[hidoc] 教材上传失败", error);
    return failureResponse(500, "server-error", "教材上传失败，请稍后重试。");
  }
}

/** 删除教材（软删除并释放当月名额）。 */
export async function DELETE(request: Request) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return failureResponse(401, "unauthorized", "请先登录后再管理教材。");
  }

  const textbookId = new URL(request.url).searchParams.get("id")?.trim();
  if (!textbookId) {
    return failureResponse(400, "invalid-request", "缺少教材 id。");
  }

  try {
    const result = await deleteHiDocTextbook(user.id, textbookId);
    if (!result.ok) {
      return serviceFailureResponse(result);
    }
    const shelf = await getHiDocShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, deletedId: result.data.deletedId, shelf });
  } catch (error) {
    console.error("[hidoc] 教材删除失败", error);
    return failureResponse(500, "server-error", "教材删除失败，请稍后重试。");
  }
}

/** 重新激活冻结教材（占用当月名额）。 */
export async function PATCH(request: Request) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return failureResponse(401, "unauthorized", "请先登录后再管理教材。");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return failureResponse(400, "invalid-request", "请求格式不正确。");
  }

  const { id, action } = (payload ?? {}) as { id?: unknown; action?: unknown };
  if (typeof id !== "string" || id.trim().length === 0) {
    return failureResponse(400, "invalid-request", "缺少教材 id。");
  }
  if (action !== "activate") {
    return failureResponse(400, "invalid-request", "目前只支持 action=activate。");
  }

  try {
    const result = await activateHiDocTextbook(user.id, user.tier, id.trim());
    if (!result.ok) {
      return serviceFailureResponse(result);
    }
    const shelf = await getHiDocShelf(user.id, user.tier);
    return NextResponse.json({ ok: true, textbook: result.data.textbook, shelf });
  } catch (error) {
    console.error("[hidoc] 教材重新激活失败", error);
    return failureResponse(500, "server-error", "教材重新激活失败，请稍后重试。");
  }
}