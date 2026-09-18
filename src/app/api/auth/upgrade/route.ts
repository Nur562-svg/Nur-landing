import { NextResponse } from "next/server";
import { getCurrentSession, createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { createOrder, mockPay } from "@/lib/payment/service";
import { toUserView } from "@/lib/auth/service";
import { getMembershipTierLabel } from "@/lib/membership";
import type { AuthUserView } from "@/types/auth";

export const dynamic = "force-dynamic";

/**
 * M4: 替换 demo-upgrade 的升级路由。
 * POST /api/auth/upgrade
 * Body: { planId?: string }
 *
 * - 无 planId 或 mock 模式：走 mock 支付流程（创建订单 → 立即模拟支付成功）
 * - 有 planId 且真实渠道：创建订单并返回支付参数
 *
 * 保留 demo 语义但走支付流程（mock 模式下直接开通并记录 Order）。
 */
export async function POST(request: Request): Promise<Response> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { planId?: unknown };
    const planId = typeof body.planId === "string" ? body.planId : "pro-month";

    const dbUser = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true, email: true, displayName: true, membershipTier: true, membershipExpiresAt: true, emailVerifiedAt: true, createdAt: true },
    });
    if (!dbUser) {
      return NextResponse.json({ ok: false, error: "用户不存在" }, { status: 404 });
    }

    // 创建订单
    const orderResult = await createOrder(dbUser.id, planId);
    if (!orderResult.ok) {
      // 通道密钥未配置完整：503 明确报错（中文原因），不静默回落 mock
      if (orderResult.code === "channel_not_configured") {
        return NextResponse.json(orderResult, { status: 503 });
      }
      return NextResponse.json(orderResult, { status: 400 });
    }

    // mock 模式：直接模拟支付成功
    if (orderResult.payment.type === "mock") {
      const payResult = await mockPay(orderResult.orderId);
      if (!payResult.ok) {
        return NextResponse.json(payResult, { status: 400 });
      }

      // 重新查询用户信息并签发新 session
      const updated = await prisma.user.findUnique({
        where: { id: dbUser.id },
        select: { id: true, email: true, displayName: true, membershipTier: true, membershipExpiresAt: true, emailVerifiedAt: true, createdAt: true },
      });
      if (!updated) {
        return NextResponse.json({ ok: false, error: "用户查询失败" }, { status: 500 });
      }

      const newUserView: AuthUserView = toUserView(updated);

      const token = await createSessionToken(newUserView);
      await setSessionCookie(token);

      return NextResponse.json({
        ok: true,
        message: `已升级为 ${getMembershipTierLabel(newUserView.membershipTier)}`,
        user: newUserView,
        orderId: orderResult.orderId,
      });
    }

    // 真实渠道：返回支付参数
    return NextResponse.json({
      ok: true,
      orderId: orderResult.orderId,
      payment: orderResult.payment,
    });
  } catch (e) {
    console.error("[/api/auth/upgrade] error:", e);
    return NextResponse.json({ ok: false, error: "升级失败" }, { status: 500 });
  }
}
