import { NextResponse } from "next/server";
import { reconcilePendingOrders, closeExpiredOrders } from "@/lib/payment/service";

export const dynamic = "force-dynamic";

/**
 * 定时补偿端点（cron 调用）。
 * POST /api/pay/cron/reconcile
 *
 * Header: X-Cron-Secret 必须与 CRON_SECRET 环境变量匹配。
 *
 * 执行：
 * 1. 批量主动查单（回调丢失的 pending 订单）
 * 2. 关闭超时未支付订单（30 分钟）
 */
export async function POST(request: Request): Promise<Response> {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET 未配置" }, { status: 500 });
  }

  const authHeader = request.headers.get("x-cron-secret");
  if (authHeader !== cronSecret) {
    return NextResponse.json({ ok: false, error: "未授权" }, { status: 403 });
  }

  try {
    const [reconcileResult, closeResult] = await Promise.all([
      reconcilePendingOrders(10, 50),
      closeExpiredOrders(100),
    ]);

    return NextResponse.json({
      ok: true,
      reconcile: reconcileResult,
      expired: closeResult,
    });
  } catch (e) {
    console.error("[/api/pay/cron/reconcile] error:", e);
    return NextResponse.json({ ok: false, error: "执行失败" }, { status: 500 });
  }
}
