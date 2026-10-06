import { annotateClewKpSourcePage } from "@/lib/clew/knowledge-points";
import { clewUnauthorized } from "@/lib/clew/api-response";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { NextResponse } from "next/server";

/**
 * 知识点人工页码标注（ZCODE-M6 补遗，thin adapter）：
 * DOCX 教材无文字层页码，学生在学习页标注「本知识点在第 N 页」——
 * 标注页是学生声明的出处（显示「你标注的」，不做文本核验）；page=null 清除标注。
 * 业务逻辑在 annotateClewKpSourcePage（PDF 教材明确拒绝——页码自动溯源，人工标注只会降低可信度）。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getClewSessionUser();
  if (!user) {
    return clewUnauthorized("标注知识点页码");
  }
  const { id: kpId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-request", message: "请求体不是合法 JSON。" }, { status: 400 });
  }
  const page = typeof body === "object" && body !== null ? (body as { page?: unknown }).page : undefined;
  if (page !== null && (typeof page !== "number" || !Number.isInteger(page))) {
    return NextResponse.json({ error: "invalid-request", message: "page 需要是整数或 null（清除标注）。" }, { status: 400 });
  }

  const result = await annotateClewKpSourcePage(user.id, kpId, page ?? null);
  if (!result.ok) {
    return NextResponse.json({ error: "invalid-request", message: result.message }, { status: result.status });
  }
  return NextResponse.json({
    ok: true,
    sourcePage: result.sourcePage,
    sourcePageAnnotated: result.sourcePageAnnotated,
  });
}
