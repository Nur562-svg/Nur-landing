/**
 * 支付服务（server-only）。
 * - createOrder：幂等防重复下单 → 调用 provider → 返回支付参数
 * - handleNotify：验签 → 更新 Order → 事务内设置 membershipTier + membershipExpiresAt 续期累加
 * - getSubscription：查询用户当前会员状态
 * - mockPay：mock 模式下手动触发支付成功
 */
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import type { PaymentChannel, PaymentProvider, PaymentParams, NotifyData, OrderView } from "./types";
import { getPlan, periodToDays } from "./plans";
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

function getCurrentPaymentChannel(): PaymentChannel {
  const p = process.env.PAYMENT_PROVIDER ?? "mock";
  return p === "wechat" ? "wechat" : p === "alipay" ? "alipay" : "mock";
}

/** 幂等：同用户同 plan 同 channel 的 pending 订单复用。 */
async function findOrCreateOrder(
  userId: string,
  planId: string,
  channel: PaymentChannel,
): Promise<{ id: string; isNew: boolean }> {
  const plan = getPlan(planId);
  if (!plan) throw new Error(`invalid planId: ${planId}`);

  // 查找最近的 pending 订单（同用户同 plan 同 channel）
  const existing = await prisma.order.findFirst({
    where: { userId, planId, channel, status: "pending" },
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

function getNotifyUrl(channel: PaymentChannel): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nur-learn.example.com";
  return `${baseUrl}/api/pay/notify/${channel}`;
}

/** 创建订单并返回支付参数。 */
export async function createOrder(
  userId: string,
  planId: string,
): Promise<{ ok: true; orderId: string; payment: PaymentParams } | { ok: false; error: string }> {
  try {
    const plan = getPlan(planId);
    if (!plan) return { ok: false, error: "invalid_plan" };

    const channel = getCurrentPaymentChannel();
    const { id: orderId, isNew } = await findOrCreateOrder(userId, planId, channel);

    const provider = getProvider(channel);
    const payment = await provider.createOrder({
      orderId,
      plan,
      channel,
      notifyUrl: getNotifyUrl(channel),
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

/** 支付成功核心逻辑：金额校验 + 事务内更新订单 + 设置会员（续期累加）。 */
async function applyPaymentSuccess(
  orderId: string,
  providerTradeNo: string,
  expectedAmountCents: number,
): Promise<void> {
  // 幂等检查：订单已支付则跳过
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("order_not_found");
  if (order.status === "paid") return; // 幂等
  if (order.status === "closed" || order.status === "refunded") {
    throw new Error(`order_status_${order.status}`);
  }

  // 金额校验：回调金额必须与订单金额一致，防止篡改
  if (expectedAmountCents !== order.amountCents) {
    throw new Error(
      `amount_mismatch: expected=${order.amountCents} got=${expectedAmountCents}`,
    );
  }

  const plan = getPlan(order.planId);
  if (!plan) throw new Error("plan_not_found");

  // 事务：更新订单 + 设置会员
  await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        providerTradeNo,
        paidAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: order.userId },
      data: {
        membershipTier: plan.tier,
        // 续期累加：如果当前会员未过期，从到期时间往后加；否则从现在加
        membershipExpiresAt: await computeExpiry(order.userId, plan.tier, plan.period),
      },
    }),
  ]);
}

/** 计算会员到期时间（续期累加）。 */
async function computeExpiry(
  userId: string,
  _tier: string,
  period: string,
): Promise<Date> {
  const now = new Date();
  const days = periodToDays(period);

  // 查当前到期时间
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { membershipExpiresAt: true },
  });

  const currentExpiry = user?.membershipExpiresAt;
  // 如果当前会员未过期，从到期时间往后加
  const base = currentExpiry && currentExpiry > now ? currentExpiry : now;
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
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

  // 如果会员已过期，tier 降级为 free（但不立即写 DB，由下次配额计算处理）
  const effectiveTier = isActive ? user.membershipTier : "free";

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
 * 用于回调丢失场景（如网络抖动、服务重启）。
 */
export async function reconcileOrder(orderId: string): Promise<{
  ok: true;
  paid: boolean;
} | { ok: false; error: string }> {
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

    return { ok: true, paid: false };
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
