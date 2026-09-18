/**
 * 支付抽象层类型定义。
 * provider 可切换：mock（演示）→ wechat（APIv3 Native 扫码）→ alipay（网站支付）。
 * 自研签名/验签，不引第三方 SDK。
 */
import type { MembershipTier } from "@/types/auth";

/** 支付渠道标识。 */
export type PaymentChannel = "mock" | "wechat" | "alipay";

/** 套餐周期。 */
export type PlanPeriod = "month" | "quarter" | "year";

/** 收费会员层级；free/trial 不通过支付 SKU 购买。 */
export type PlanTier = Exclude<MembershipTier, "free">;

/** 新版套餐标识。 */
export type PlanId =
  | "basic-month"
  | "basic-quarter"
  | "basic-year"
  | "pro-month"
  | "pro-quarter"
  | "pro-year"
  | "max-month"
  | "max-quarter"
  | "max-year";

/** 旧版 lite SKU。只用于识别/复用存量订单，新订单一律写 basic。 */
export type LegacyPlanId = "lite-month" | "lite-quarter" | "lite-year";

/** 套餐定义。 */
export type Plan = {
  id: PlanId;
  tier: PlanTier;
  period: PlanPeriod;
  /** 价格（分），避免浮点误差。 */
  priceCents: number;
  /** 展示名称。 */
  label: string;
  /** 周期描述。 */
  periodLabel: string;
};

/** 创建订单请求（服务端内部使用）。 */
export type CreateOrderInput = {
  userId: string;
  planId: PlanId | LegacyPlanId;
  channel: PaymentChannel;
};

/** 创建订单失败的结构化错误码（路由据此映射 HTTP 状态）。 */
export type CreateOrderErrorCode =
  | "invalid_plan"
  /** 通道密钥未配置完整（503，不静默回落 mock）。 */
  | "channel_not_configured"
  | "unknown_channel";

/** 创建订单结果。 */
export type CreateOrderResult =
  | { ok: true; orderId: string; payment: PaymentParams }
  | { ok: false; error: string; code?: CreateOrderErrorCode };

/** 渠道返回的支付参数（前端渲染用）。 */
export type PaymentParams =
  // 微信 Native：二维码 URL
  | { type: "qr_code"; qrUrl: string; orderId: string }
  // 支付宝：跳转 URL
  | { type: "redirect"; url: string; orderId: string }
  // mock：直接标记为可模拟支付
  | { type: "mock"; orderId: string };

/** 异步回调通知的原始数据（各 provider 解析后统一为此结构）。 */
export type NotifyData = {
  orderId: string;
  providerTradeNo: string;
  amountCents: number;
  status: "paid" | "failed";
};

/** 回调处理结果。 */
export type NotifyResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

/** 订单视图（返回前端用，敏感字段已过滤）。 */
export type OrderView = {
  id: string;
  planId: PlanId | LegacyPlanId;
  tier: PlanTier;
  period: PlanPeriod;
  amountCents: number;
  channel: PaymentChannel;
  status: "pending" | "paid" | "closed" | "refunded";
  paidAt: string | null;
  createdAt: string;
};

/** 支付 provider 接口（仿 course-builder provider 模式）。 */
export type PaymentProvider = {
  /** 创建渠道订单，返回支付参数。returnUrl 为支付完成后的浏览器回跳地址（渠道支持时使用）。 */
  createOrder(params: {
    orderId: string;
    plan: Plan;
    channel: PaymentChannel;
    notifyUrl: string;
    returnUrl?: string;
  }): Promise<PaymentParams>;

  /** 验证异步回调通知签名，解析为结构化数据。 */
  verifyNotify(rawBody: string, headers: Record<string, string>): Promise<NotifyData | null>;

  /** 查询订单支付状态（可选，主动查单）。queryError 携带网关侧失败原因（如实返回，不吞掉）。 */
  queryOrder?(orderId: string): Promise<{
    paid: boolean;
    providerTradeNo?: string;
    queryError?: string;
  }>;

  /** 退款（可选，后期接入）。 */
  refund?(orderId: string, amountCents: number): Promise<{ ok: boolean; error?: string }>;
};
