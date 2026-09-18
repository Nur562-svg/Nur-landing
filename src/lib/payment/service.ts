/**
 * 支付服务（server-only）。
 * - createOrder：通道配置校验（缺密钥 503 明确报错，不静默回落 mock）→ 幂等防重复下单 → 调用 provider → 返回支付参数
 * - handleNotify：验签 → 金额核对 → 事务内条件更新 Order + 设置 membershipTier/membershipExpiresAt（续费叠加、高档覆盖低档）
 * - getSubscription：查询用户当前会员状态
 * - mockPay：mock 模式下手动触发支付成功
 * - reconcileOrder / reconcilePendingOrders：主动查单补偿（notify 丢失兜底）
 */
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import type {
  PaymentChannel,
  PaymentProvider,
  NotifyData,
  OrderView,
  CreateOrderResult,
} from "./types";
import { getCompatiblePlanIds, getPlan, periodToDays } from "./plans";
import { resolveEffectiveMembershipTier } from "@/lib/membership";
import { mockProvider } from "./providers/mock";
import { wechatProvider } from "./providers/wechat";
import { alipayProvider } from "./providers/alipay";

function getProvider(channel: PaymentChannel): PaymentProvider {
  switch (channel) {
    case "wechat":
      return wechatProvider;
    case "alipay":
      return alipayProvider;
    default:
      return mockProvider;
  }
}

/**
 * 解析当前支付通道。
 * - 显式 "mock"（或开发环境未配置）→ mock（开发/演示语义保留）
 * - "alipay" / "wechat" → 对应通道；未配置密钥时由 assertChannelConfigured 明确报错，绝不静默回落 mock
 * - 其它值 → 明确报错
 */
export function getCurrentPaymentChannel(): PaymentChannel {
  const raw = process.env.PAYMENT_PROVIDER?.trim() ?? "";
  if (raw === "" || raw === "mock") return "mock";
  if (raw === "alipay") return "alipay";
  if (raw === "wechat") return "wechat";
  throw new Error(`PAYMENT_PROVIDER 配置不正确：${raw}（可选值 mock | wechat | alipay）`);
}

/** 各通道必需的服务端环境变量（只校验存在性，值不渲染、不进日志）。 */
const CHANNEL_REQUIRED_ENV: Record<PaymentChannel, readonly string[]> = {
  mock: [],
  alipay: ["ALIPAY_APP_ID", "ALIPAY_PRIVATE_KEY", "ALIPAY_PUBLIC_KEY"],
  wechat: ["WECHAT_PAY_MCHID", "WECHAT_PAY_APP_ID", "WECHAT_PAY_PRIVATE_KEY_PATH", "WECHAT_PAY_APIV3_KEY"],
};

/** 校验通道密钥配置；缺失返回缺失变量名列表（完整即返回 null）。 */
export function getMissingChannelEnv(channel: PaymentChannel): string[] | null {
  const missing = CHANNEL_REQUIRED_ENV[channel].filter((key) => !process.env[key]?.trim());
  return missing.length > 0 ? missing : null;
}

/** 幂等：同用户同 plan 同 channel 的 pending 订单复用。 */
async function findOrCreateOrder(
  userId: string,
  planId: string,
  channel: PaymentChannel,
): Promise<{ id: string; isNew: boolean }> {
  const plan = getPlan(planId);
  if (!plan) throw new Error(`invalid planId: ${planId}`);

  // 查找最近的 pending 订单（同用户同 plan 同 channel）。
  // 旧 lite-* 与迁移后的 basic-* 视为同语义，可继续复用。
  const existing = await prisma.order.findFirst({
    where: {
      userId,
      planId: { in: [...getCompatiblePlanIds(plan.id)] },
      channel,
      status: "pending",
    },
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  if (existing) {
    return { id: existing.id, isNew: false };
  }

  const order = await prisma.order.create({
    data: {
      userId,
      planId,
      tier: plan.tier,
      period: plan.period,
      amountCents: plan.priceCents,
      channel,
      status: "pending",
    },
  });

  return { id: order.id, isNew: true };
}

function getSiteBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://nur-learn.example.com";
}

/** 异步通知地址：ALIPAY_NOTIFY_URL 支持显式覆盖（部署于不同域名/端口时），缺省由站点地址拼装。 */
function getNotifyUrl(channel: PaymentChannel): string {
  if (channel === "alipay") {
    const explicit = process.env.ALIPAY_NOTIFY_URL?.trim();
    if (explicit) return explicit;
  }
  return `${getSiteBaseUrl()}/api/pay/notify/${channel}`;
}

/** 支付完成后的浏览器回跳地址（回跳仅作结果展示，开通只认验签后的 notify 或主动查单）。 */
function getReturnUrl(orderId: string): string {
  return `${getSiteBaseUrl()}/account/billing?orderId=${encodeURIComponent(orderId)}`;
}

/** 创建订单并返回支付参数。 */
export async function createOrder(
  userId: string,
  planId: string,
): Promise<CreateOrderResult> {
  try {
    const plan = getPlan(planId);
    if (!plan) return { ok: false, error: "invalid_plan", code: "invalid_plan" };

    let channel: PaymentChannel;
    try {
      channel = getCurrentPaymentChannel();
    } catch (e) {
      return { ok: false, error: (e as Error).message, code: "unknown_channel" };
    }

    // 通道密钥未配置完整：明确报错（路由映射 503），绝不静默回落 mock
    const missing = getMissingChannelEnv(channel);
    if (missing) {
      return {
        ok: false,
        error: `支付通道未配置完整（${channel} 缺少 ${missing.join("、")}），请联系管理员或检查服务端环境变量。`,
        code: "channel_not_configured",
      };
    }

    const { id: orderId } = await findOrCreateOrder(userId, plan.id, channel);

    const provider = getProvider(channel);
    const payment = await provider.createOrder({
      orderId,
      plan,
      channel,
      notifyUrl: getNotifyUrl(channel),
      returnUrl: getReturnUrl(orderId),
    });

    return { ok: true, orderId, payment };
  } catch (e) {
    return { ok: false, error: (e as Error)?.message ?? "create_order_failed" };
  }
}

/** 处理异步回调通知（验签 → 更新订单 → 事务内开通会员）。 */
export async function handleNotify(
  channel: PaymentChannel,
  rawBody: string,
  headers: Record<string, string>,
): Promise<{ ok: true; orderId: string } | { ok: false; error: string }> {
  try {
    const provider = getProvider(channel);
    const data: NotifyData | null = await provider.verifyNotify(rawBody, headers);
    if (!data) return { ok: false, error: "verify_failed" };

    await applyPaymentSuccess(data.orderId, data.providerTradeNo, data.amountCents);
    return { ok: true, orderId: data.orderId };
  } catch (e) {
    return { ok: false, error: (e as Error)?.message ?? "notify_failed" };
  }
}

/** mock 模式下手动触发支付成功。 */
export async function mockPay(orderId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return { ok: false, error: "order_not_found" };
    if (order.channel !== "mock") return { ok: false, error: "not_mock_order" };
    if (order.status !== "pending") return { ok: false, error: "order_not_pending" };

    await applyPaymentSuccess(orderId, `mock_${randomUUID()}`, order.amountCents);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error)?.message ?? "mock_pay_failed" };
  }
}

/** 档位层级（用于「高档覆盖低档」的生效策略）。 */
const TIER_RANK: Record<string, number> = { free: 0, basic: 1, pro: 2, max: 3 };

/**
 * 续费/升降档后的会员结果（纯函数，供单测直接覆盖）。
 *
 * 生效策略（同一时刻高档覆盖低档）：
 * - 新档 ≥ 当前生效档：立即生效为新档；到期时间在剩余有效期上叠加（未到期时间不吞掉）。
 * - 新档 < 当前生效档（如在 Pro 有效期内购买 Basic）：档位保持高档不变直至其到期，
 *   购买时长追加在剩余有效期之后（追加期间按高档享受；降档只通过到期自然回落生效）。
 * - 当前会员已过期：视为 free，从现在起算新档。
 */
export function computeMembershipRenewal(input: {
  currentTier: string;
  currentExpiresAt: Date | string | null;
  planTier: "basic" | "pro" | "max";
  period: string;
  now?: Date;
}): { tier: "basic" | "pro" | "max"; expiresAt: Date } {
  const now = input.now ?? new Date();
  const effectiveCurrent = resolveEffectiveMembershipTier({
    membershipTier: input.currentTier,
    membershipExpiresAt: input.currentExpiresAt,
    now,
  });
  const currentRank = TIER_RANK[effectiveCurrent] ?? 0;
  const newRank = TIER_RANK[input.planTier] ?? 0;

  const expiryTime =
    typeof input.currentExpiresAt === "string"
      ? Date.parse(input.currentExpiresAt)
      : input.currentExpiresAt?.getTime() ?? null;
  // 剩余有效期上叠加：未到期时间不吞掉；已过期（或无到期时间）则从现在起算
  const base =
    expiryTime !== null && Number.isFinite(expiryTime) && expiryTime > now.getTime()
      ? expiryTime
      : now.getTime();

  const tier = currentRank > newRank ? effectiveCurrent : input.planTier;
  return {
    tier: tier as "basic" | "pro" | "max",
    expiresAt: new Date(base + periodToDays(input.period) * 24 * 60 * 60 * 1000),
  };
}

/**
 * 支付成功核心逻辑：金额校验 + 事务内（条件更新抢占 Order → 更新会员）。
 * 幂等与并发安全：Order 仅在 status=pending 时被条件更新为 paid（updateMany），
 * 重复/并发 notify 只有一次能抢占成功，其余直接返回成功，不重复延期。
 */
async function applyPaymentSuccess(
  orderId: string,
  providerTradeNo: string,
  expectedAmountCents: number,
): Promise<void> {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("order_not_found");

  // 金额校验先行：无论订单状态，金额不一致一律拒绝（防篡改，先于幂等判断）
  if (expectedAmountCents !== order.amountCents) {
    throw new Error(
      `amount_mismatch: expected=${order.amountCents} got=${expectedAmountCents}`,
    );
  }

  if (order.status === "paid") return; // 幂等：重复 notify 直接成功，不重复延期
  if (order.status !== "pending") throw new Error(`order_status_${order.status}`);

  const plan = getPlan(order.planId);
  if (!plan) throw new Error("plan_not_found");

  await prisma.$transaction(async (tx) => {
    // 条件更新抢占：仅 pending → paid 成功一次（并发回调安全）
    const claimed = await tx.order.updateMany({
      where: { id: orderId, status: "pending" },
      data: { status: "paid", providerTradeNo, paidAt: new Date() },
    });
    if (claimed.count === 0) {
      // 已被并发处理：paid 视为幂等成功，其余状态如实报错
      const latest = await tx.order.findUnique({ where: { id: orderId }, select: { status: true } });
      if (latest?.status === "paid") return;
      throw new Error(`order_status_${latest?.status ?? "unknown"}`);
    }

    const user = await tx.user.findUnique({
      where: { id: order.userId },
      select: { membershipTier: true, membershipExpiresAt: true },
    });

    const renewal = computeMembershipRenewal({
      currentTier: user?.membershipTier ?? "free",
      currentExpiresAt: user?.membershipExpiresAt ?? null,
      planTier: plan.tier,
      period: plan.period,
    });

    await tx.user.update({
      where: { id: order.userId },
      data: {
        membershipTier: renewal.tier,
        membershipExpiresAt: renewal.expiresAt,
      },
    });
  });
}

/** 查询用户当前订阅状态。 */
export async function getSubscription(userId: string): Promise<{
  tier: string;
  expiresAt: string | null;
  isActive: boolean;
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { membershipTier: true, membershipExpiresAt: true },
  });

  if (!user) return { tier: "free", expiresAt: null, isActive: false };

  const now = new Date();
  const isActive = !!user.membershipExpiresAt && user.membershipExpiresAt > now;

  // 如果会员已过期，tier 降级为 free（但不立即写 DB，由下次配额计算处理）；
  // 旧 lite 在读取层兼容为 basic。
  const effectiveTier = resolveEffectiveMembershipTier({
    membershipTier: user.membershipTier,
    membershipExpiresAt: user.membershipExpiresAt,
    now,
  });

  return {
    tier: effectiveTier,
    expiresAt: user.membershipExpiresAt?.toISOString() ?? null,
    isActive,
  };
}

/** 查询订单状态。 */
export async function getOrderStatus(orderId: string): Promise<OrderView | null> {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return null;
  return {
    id: order.id,
    planId: order.planId as OrderView["planId"],
    tier: order.tier as OrderView["tier"],
    period: order.period as OrderView["period"],
    amountCents: order.amountCents,
    channel: order.channel as OrderView["channel"],
    status: order.status as OrderView["status"],
    paidAt: order.paidAt?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(),
  };
}

/** 查询用户订单历史。 */
export async function getUserOrders(userId: string, limit = 20): Promise<OrderView[]> {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return orders.map((o): OrderView => ({
    id: o.id,
    planId: o.planId as OrderView["planId"],
    tier: o.tier as OrderView["tier"],
    period: o.period as OrderView["period"],
    amountCents: o.amountCents,
    channel: o.channel as OrderView["channel"],
    status: o.status as OrderView["status"],
    paidAt: o.paidAt?.toISOString() ?? null,
    createdAt: o.createdAt.toISOString(),
  }));
}

// ============================================================
// 主动查单补偿（回调丢失时避免漏单）
// ============================================================

/**
 * 对单个 pending 订单主动查单。
 * 调用 provider.queryOrder 检查是否已支付；若已支付则走 applyPaymentSuccess。
 * 用于回调丢失场景（如网络抖动、服务重启）。查单失败如实返回原因（queryError）。
 */
export async function reconcileOrder(orderId: string): Promise<
  | { ok: true; paid: boolean; queryError?: string }
  | { ok: false; error: string }
> {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return { ok: false, error: "order_not_found" };
    if (order.status === "paid") return { ok: true, paid: true };
    if (order.status !== "pending") return { ok: false, error: `order_status_${order.status}` };

    const provider = getProvider(order.channel as PaymentChannel);
    if (!provider.queryOrder) return { ok: false, error: "provider_no_query" };

    const result = await provider.queryOrder(orderId);
    if (result.paid) {
      await applyPaymentSuccess(
        orderId,
        result.providerTradeNo ?? `reconcile_${randomUUID()}`,
        order.amountCents,
      );
      return { ok: true, paid: true };
    }

    return { ok: true, paid: false, queryError: result.queryError };
  } catch (e) {
    return { ok: false, error: (e as Error)?.message ?? "reconcile_failed" };
  }
}

/**
 * 批量补偿：扫描所有超过一定时间仍为 pending 的订单，主动查单。
 * 可由定时任务（cron）或管理接口调用。
 * @param olderThanMinutes 只补偿创建超过此分钟数的 pending 订单
 * @param limit 单次扫描上限
 */
export async function reconcilePendingOrders(
  olderThanMinutes = 10,
  limit = 50,
): Promise<{ scanned: number; paid: number; stillPending: number; errors: number }> {
  const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);

  const pendingOrders = await prisma.order.findMany({
    where: {
      status: "pending",
      createdAt: { lt: cutoff },
    },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  let paid = 0;
  let stillPending = 0;
  let errors = 0;

  for (const order of pendingOrders) {
    const result = await reconcileOrder(order.id);
    if (result.ok) {
      if (result.paid) paid++;
      else stillPending++;
    } else {
      errors++;
    }
  }

  return { scanned: pendingOrders.length, paid, stillPending, errors };
}

// ============================================================
// 订单超时关闭
// ============================================================

/** 订单超时阈值（分钟）：超过此时间仍为 pending 则自动关闭。 */
const ORDER_TIMEOUT_MINUTES = 30;

/**
 * 关闭超时未支付的 pending 订单。
 * 防止订单无限占用、用户重复创建。
 *
 * 注意（如实声明）：本地关单，未调用支付宝 alipay.trade.close —— 沙箱/生产网关侧订单
 * 由其自身超时机制处理；调用方（cron）必须先 reconcile 再 close，保证「已支付但 notify
 * 丢失」的订单先被补偿开通，不被误关。
 */
export async function closeExpiredOrders(limit = 100): Promise<{ closed: number }> {
  const cutoff = new Date(Date.now() - ORDER_TIMEOUT_MINUTES * 60 * 1000);

  const expired = await prisma.order.findMany({
    where: {
      status: "pending",
      createdAt: { lt: cutoff },
    },
    select: { id: true },
    take: limit,
  });

  if (expired.length === 0) return { closed: 0 };

  const result = await prisma.order.updateMany({
    where: {
      id: { in: expired.map((o) => o.id) },
      status: "pending",
    },
    data: { status: "closed" },
  });

  return { closed: result.count };
}
