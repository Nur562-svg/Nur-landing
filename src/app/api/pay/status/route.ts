import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { getOrderStatus, mockPay } from "@/lib/payment/service";

export const dynamic = "force-dynamic";

/**
 * GET /api/pay/status?orderId=xxx
 * 查询订单支付状态（前端轮询用）。
 *
 * POST /api/pay/status
 * Body: { orderId: string, action: "mock-pay" }
 * mock 模式下手动触发支付成功。
 */
export async function GET(request: Request): Promise<Response> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ ok: false, error: "缺少 orderId" }, { status: 400 });
  }

  const order = await getOrderStatus(orderId);
  if (!order) {
    return NextResponse.json({ ok: false, error: "订单不存在" }, { status: 404 });
  }

  // 校验订单归属
  const dbOrder = await prisma.order.findUnique({
    where: { id: orderId },
    select: { userId: true },
  });
  if (!dbOrder || dbOrder.userId !== session.sub) {
    return NextResponse.json({ ok: false, error: "无权访问" }, { status: 403 });
  }

  return NextResponse.json({ ok: true, order });
}

export async function POST(request: Request): Promise<Response> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { orderId?: unknown; action?: unknown };
    if (typeof body.orderId !== "string" || body.action !== "mock-pay") {
      return NextResponse.json({ ok: false, error: "参数不正确" }, { status: 400 });
    }

    // 校验订单归属
    const order = await prisma.order.findUnique({
      where: { id: body.orderId },
      select: { userId: true },
    });
    if (!order || order.userId !== session.sub) {
      return NextResponse.json({ ok: false, error: "无权操作" }, { status: 403 });
    }

    const result = await mockPay(body.orderId);
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("[/api/pay/status POST] error:", e);
    return NextResponse.json({ ok: false, error: "操作失败" }, { status: 500 });
  }
}
