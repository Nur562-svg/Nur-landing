import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { reconcileOrder } from "@/lib/payment/service";

export const dynamic = "force-dynamic";

/**
 * 主动查单补偿（前端轮询用）。
 * GET /api/pay/reconcile?orderId=xxx
 *
 * 当回调可能丢失时，前端可轮询此接口主动向支付渠道查单。
 * 如果渠道返回已支付，服务端自动走 applyPaymentSuccess 开通会员。
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

  // 校验订单归属
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { userId: true },
  });
  if (!order || order.userId !== session.sub) {
    return NextResponse.json({ ok: false, error: "无权访问" }, { status: 403 });
  }

  const result = await reconcileOrder(orderId);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
