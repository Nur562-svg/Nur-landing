import { NextResponse } from "next/server";
import { handleNotify } from "@/lib/payment/service";
import type { PaymentChannel } from "@/lib/payment/types";

export const dynamic = "force-dynamic";

/**
 * M4: 支付异步回调通知。
 * POST /api/pay/notify/[channel]
 * channel: wechat | alipay
 *
 * 验签 → 更新 Order → 事务内设置 membershipTier + membershipExpiresAt。
 * 幂等：已支付订单重复回调直接返回成功。
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ channel: string }> },
): Promise<Response> {
  const { channel: rawChannel } = await params;
  const channel: PaymentChannel =
    rawChannel === "wechat" ? "wechat" : rawChannel === "alipay" ? "alipay" : "mock";

  // mock 渠道无异步回调
  if (channel === "mock") {
    return NextResponse.json({ ok: false, error: "mock 无回调" }, { status: 400 });
  }

  try {
    const rawBody = await request.text();
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    const result = await handleNotify(channel, rawBody, headers);
    if (!result.ok) {
      console.error(`[pay/notify/${channel}] failed:`, result.error);
      // 微信/支付宝要求失败时返回特定格式；这里简化为 400
      return NextResponse.json(result, { status: 400 });
    }

    // 微信要求返回 200 +特定 JSON；支付宝要求返回 "success"
    if (channel === "wechat") {
      return NextResponse.json({ code: "SUCCESS", message: "成功" });
    }
    // alipay
    return new NextResponse("success", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (e) {
    console.error(`[pay/notify/${channel}] error:`, e);
    return NextResponse.json({ ok: false, error: "notify_error" }, { status: 500 });
  }
}
