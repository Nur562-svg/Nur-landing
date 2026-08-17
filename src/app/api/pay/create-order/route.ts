import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { createOrder } from "@/lib/payment/service";

export const dynamic = "force-dynamic";

/**
 * M4: 创建支付订单。
 * POST /api/pay/create-order
 * Body: { planId: string }
 * 返回: { ok: true, orderId, payment } | { ok: false, error }
 */
export async function POST(request: Request): Promise<Response> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { planId?: unknown };
    if (typeof body.planId !== "string") {
      return NextResponse.json({ ok: false, error: "参数不正确" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });
    if (!dbUser) {
      return NextResponse.json({ ok: false, error: "用户不存在" }, { status: 404 });
    }

    const result = await createOrder(dbUser.id, body.planId);
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("[/api/pay/create-order] error:", e);
    return NextResponse.json({ ok: false, error: "创建订单失败" }, { status: 500 });
  }
}
