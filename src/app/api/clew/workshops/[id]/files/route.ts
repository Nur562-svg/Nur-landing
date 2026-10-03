import { NextResponse } from "next/server";
import { hiDocFailure, hiDocServiceFailure, hiDocUnauthorized } from "@/lib/hidoc/api-response";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import {
  deleteHiDocWorkshopFile,
  getHiDocWorkshopDetail,
  uploadHiDocWorkshopFile,
} from "@/lib/hidoc/workshops";

/**
 * Hi doc 课题材料 API（thin adapter）：上传（multipart，上传即检测）/ 删除。
 * 图片与无文字层 PDF 明确拒绝（OCR 后置），不落库；业务逻辑全在 src/lib/hidoc/workshops.ts。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 上传课题材料（multipart：file 必填）。 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("上传课题材料");
  }

  const { id } = await params;
  if (!id) {
    return hiDocFailure(400, "invalid-request", "缺少课题 id。");
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return hiDocFailure(400, "invalid-request", "上传请求格式不正确，请重新选择文件。");
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return hiDocFailure(400, "invalid-request", "请选择要上传的材料文件。");
  }

  try {
    const result = await uploadHiDocWorkshopFile({
      userId: user.id,
      tier: user.tier,
      workshopId: id,
      fileName: file.name,
      bytes: new Uint8Array(await file.arrayBuffer()),
    });
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    const detail = await getHiDocWorkshopDetail(user.id, user.tier, id);
    if (!detail.ok) {
      return hiDocServiceFailure(detail);
    }
    return NextResponse.json({ ok: true, file: result.data.file, detail: detail.data });
  } catch (error) {
    console.error("[hidoc] 课题材料上传失败", error);
    return hiDocFailure(500, "server-error", "课题材料上传失败，请稍后重试。");
  }
}

/** 删除课题材料（?fileId=）。 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getHiDocSessionUser();
  if (!user) {
    return hiDocUnauthorized("管理课题材料");
  }

  const { id } = await params;
  const fileId = new URL(request.url).searchParams.get("fileId")?.trim();
  if (!id || !fileId) {
    return hiDocFailure(400, "invalid-request", "缺少课题或材料 id。");
  }

  try {
    const result = await deleteHiDocWorkshopFile(user.id, id, fileId);
    if (!result.ok) {
      return hiDocServiceFailure(result);
    }
    const detail = await getHiDocWorkshopDetail(user.id, user.tier, id);
    if (!detail.ok) {
      return hiDocServiceFailure(detail);
    }
    return NextResponse.json({ ok: true, deletedId: result.data.deletedId, detail: detail.data });
  } catch (error) {
    console.error("[hidoc] 课题材料删除失败", error);
    return hiDocFailure(500, "server-error", "课题材料删除失败，请稍后重试。");
  }
}
