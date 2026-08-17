/**
 * 支付抽象层类型定义。
 * provider 可切换：mock（演示）→ wechat（APIv3 Native 扫码）→ alipay（网站支付）。
 * 自研签名/验签，不引第三方 SDK。
 */

/** 支付渠道标识。 */
export type PaymentChannel = "mock" | "wechat" | "alipay";

/** 套餐周期。 */
export type PlanPeriod = "month" | "quarter" | "year";

/** 套餐层级。 */
export type PlanTier = "lite" | "pro";

/** 套餐标识。 */
export type PlanId =
  | "lite-month"
  | "lite-quarter"
  | "lite-year"
  | "pro-month"
  | "pro-quarter"
  | "pro-year";

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
  planId: PlanId;
  channel: PaymentChannel;
};

/** 创建订单结果。 */
export type CreateOrderResult =
  | { ok: true; orderId: string; payment: PaymentParams }
  | { ok: false; error: string };

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
  planId: PlanId;
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
  /** 创建渠道订单，返回支付参数。 */
  createOrder(params: {
    orderId: string;
    plan: Plan;
    channel: PaymentChannel;
    notifyUrl: string;
  }): Promise<PaymentParams>;

  /** 验证异步回调通知签名，解析为结构化数据。 */
  verifyNotify(rawBody: string, headers: Record<string, string>): Promise<NotifyData | null>;

  /** 查询订单支付状态（可选，主动查单）。 */
  queryOrder?(orderId: string): Promise<{ paid: boolean; providerTradeNo?: string }>;

  /** 退款（可选，后期接入）。 */
  refund?(orderId: string, amountCents: number): Promise<{ ok: boolean; error?: string }>;
};
