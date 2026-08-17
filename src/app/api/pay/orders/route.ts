import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { getUserOrders } from "@/lib/payment/service";

export const dynamic = "force-dynamic";

/** GET /api/pay/orders — 查询用户订单历史。 */
export async function GET(): Promise<Response> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });
    if (!dbUser) {
      return NextResponse.json({ ok: false, error: "用户不存在" }, { status: 404 });
    }

    const orders = await getUserOrders(dbUser.id);
    return NextResponse.json({ ok: true, orders });
  } catch (e) {
    console.error("[/api/pay/orders] error:", e);
    return NextResponse.json({ ok: false, error: "查询失败" }, { status: 500 });
  }
}
