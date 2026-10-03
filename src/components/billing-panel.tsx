"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, ArrowRight } from "lucide-react";
import type { PlanId, PlanPeriod, PaymentParams } from "@/lib/payment/types";
import { PLAN_CATALOG } from "@/lib/payment/plans";
import { getMembershipTierLabel, normalizeMembershipTier } from "@/lib/membership";
import { CLEW_MONTHLY_TEXTBOOK_LIMITS } from "@/lib/clew/limits";
import { CLEW_WORKSHOP_LIMITS } from "@/lib/clew/workshop-rules";
import { getCourseEntitlementLimit } from "@/lib/course-entitlement-policy";
import { TIER_QUOTAS } from "@/lib/quotas";
import { V2Badge } from "@/components/ui/v2/badge";
import { V2Button } from "@/components/ui/v2/button";
import styles from "./billing-panel.module.css";

type SubscriptionState = {
  tier: string;
  expiresAt: string | null;
  isActive: boolean;
};

type OrderStatus = "pending" | "paid" | "closed" | "refunded";

type OrderView = {
  id: string;
  planId: PlanId;
  tier: string;
  period: string;
  amountCents: number;
  channel: string;
  status: OrderStatus;
  paidAt: string | null;
  createdAt: string;
};

/** 轮询中的支付订单（下单后等待 / 支付宝回跳后查询共用）。 */
type PollState = {
  orderId: string;
  order: OrderView | null;
};

const TIER_CARDS: { tier: "basic" | "pro" | "max"; name: string; sub: string }[] = [
  { tier: "basic", name: "Basic", sub: "轻量自学" },
  { tier: "pro", name: "Pro", sub: "主力学习档" },
  { tier: "max", name: "Max", sub: "全量解锁" },
];

const PERIOD_OPTIONS: { value: PlanPeriod; label: string }[] = [
  { value: "month", label: "月" },
  { value: "quarter", label: "季" },
  { value: "year", label: "年" },
];

const PERIOD_MONTHS: Record<PlanPeriod, number> = { month: 1, quarter: 3, year: 12 };

const TIER_RANK: Record<string, number> = { free: 0, basic: 1, pro: 2, max: 3 };

function channelLabel(channel: string): string {
  switch (channel) {
    case "alipay":
      return "支付宝";
    case "wechat":
      return "微信支付";
    default:
      return "模拟支付（演示）";
  }
}

function periodLabel(period: string): string {
  return period === "month" ? "月" : period === "quarter" ? "季" : "年";
}

function statusLabel(status: OrderStatus): string {
  switch (status) {
    case "paid":
      return "已支付";
    case "pending":
      return "待支付";
    case "refunded":
      return "已退款";
    default:
      return "已关闭";
  }
}

/** 权益清单：数字全部来自配额真源头（limits / workshop-rules / entitlement-policy / quotas），不在页面硬编码。 */
function buildBenefits(tier: "basic" | "pro" | "max"): string[] {
  const workshop = CLEW_WORKSHOP_LIMITS[tier];
  const courseLimit = getCourseEntitlementLimit(tier);
  const benefits = [
    `Clew 教材：每月 ${CLEW_MONTHLY_TEXTBOOK_LIMITS[tier]} 本（名额当月有效）`,
    `课题工作坊：${workshop.workshops} 个 · 每课题 ${workshop.filesPerWorkshop} 份材料`,
    `官方课程（非试点）：${courseLimit === "unlimited" ? "全部解锁" : `自选 ${courseLimit} 门`}`,
  ];
  const chatLimit = TIER_QUOTAS[tier].clewChats;
  if (chatLimit === "unlimited") {
    benefits.push("Clew 模型能力（讲义 / 笔记 / 对话）不限量");
  } else {
    benefits.push(
      `Clew 讲解对话：${chatLimit} 轮/月 · 学霸笔记 ${TIER_QUOTAS[tier].clewNotes} 次/月`,
    );
  }
  return benefits;
}

const BENEFITS: Record<"basic" | "pro" | "max", string[]> = {
  basic: buildBenefits("basic"),
  pro: buildBenefits("pro"),
  max: buildBenefits("max"),
};

export function BillingPanel() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentParams | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<PlanPeriod>("month");
  const [poll, setPoll] = useState<PollState | null>(null);

  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollContextRef = useRef<{ orderId: string; attempts: number } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [subRes, ordersRes] = await Promise.all([
        fetch("/api/pay/subscription", { credentials: "include" }),
        fetch("/api/pay/orders", { credentials: "include" }),
      ]);
      if (subRes.ok) {
        const subData = (await subRes.json()) as { subscription?: SubscriptionState };
        if (subData.subscription) setSubscription(subData.subscription);
      }
      if (ordersRes.ok) {
        const ordersData = (await ordersRes.json()) as { orders?: OrderView[] };
        if (ordersData.orders) setOrders(ordersData.orders);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    pollContextRef.current = null;
  }, []);

  const startPolling = useCallback(
    (orderId: string) => {
      stopPolling();
      pollContextRef.current = { orderId, attempts: 0 };
      setPoll({ orderId, order: null });

      const tick = async () => {
        const ctx = pollContextRef.current;
        if (!ctx || ctx.orderId !== orderId) return;
        ctx.attempts++;
        if (ctx.attempts > 150) return; // 约 10 分钟后停止轮询
        try {
          // 每 3 次轮询触发一次主动查单补偿（notify 丢失时的兜底）
          if (ctx.attempts % 3 === 1) {
            await fetch(`/api/pay/reconcile?orderId=${encodeURIComponent(orderId)}`, {
              credentials: "include",
            }).catch(() => null);
          }
          const res = await fetch(`/api/pay/status?orderId=${encodeURIComponent(orderId)}`, {
            credentials: "include",
          });
          if (res.ok) {
            const data = (await res.json()) as { ok?: boolean; order?: OrderView };
            if (data.ok && data.order) {
              const order = data.order;
              setPoll((prev) => (prev && prev.orderId === orderId ? { ...prev, order } : prev));
              if (order.status === "paid") {
                stopPolling();
                setPayment(null);
                router.refresh();
                fetchData();
                return;
              }
              if (order.status === "closed" || order.status === "refunded") {
                stopPolling();
                fetchData();
                return;
              }
            }
          }
        } catch {
          // silent
        }
        pollTimerRef.current = setTimeout(tick, 4000);
      };

      pollTimerRef.current = setTimeout(tick, 1200);
    },
    [stopPolling, router, fetchData],
  );

  // 支付宝 return_url 回跳：从地址栏读取 orderId 并轮询订单状态。
  // 回跳只作结果展示，开通只认服务端验签后的 notify 或主动查单。
  useEffect(() => {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    if (orderId) {
      startPolling(orderId);
    }
  }, [startPolling]);

  // 卸载清理轮询定时器
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, []);

  const handleCreateOrder = async (planId: PlanId) => {
    if (creating) return;
    setCreating(planId);
    setError(null);
    setPayment(null);
    try {
      const res = await fetch("/api/pay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
        credentials: "include",
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        orderId?: string;
        payment?: PaymentParams;
      };
      if (!data.ok) {
        setError(data.error ?? "创建订单失败");
        return;
      }
      if (data.payment) {
        setPayment(data.payment);
        if (data.payment.type === "mock") {
          // mock 模式：自动完成模拟支付后刷新（开发/演示语义）
          const orderId = data.orderId;
          setTimeout(async () => {
            const payRes = await fetch("/api/pay/status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId, action: "mock-pay" }),
              credentials: "include",
            });
            const payData = (await payRes.json()) as { ok?: boolean };
            if (payData.ok) {
              setPayment(null);
              router.refresh();
              fetchData();
            }
          }, 600);
        } else if (data.orderId) {
          // 真实支付（redirect / qr_code）：轮询订单状态 + 定期主动查单补偿
          startPolling(data.orderId);
        }
      }
    } catch {
      setError("网络异常，请稍后重试");
    } finally {
      setCreating(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.loadingSpinner} size={24} />
      </div>
    );
  }

  const currentTier = normalizeMembershipTier(subscription?.tier) ?? "free";
  const isActive = subscription?.isActive ?? false;

  const statusTierClass =
    currentTier === "pro"
      ? styles.statusTierPro
      : currentTier === "max"
        ? styles.statusTierMax
        : currentTier === "basic"
          ? styles.statusTierBasic
          : "";

  const pollStatus: OrderStatus | null = poll?.order?.status ?? (poll ? "pending" : null);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.kicker}>Ariadne 会员</p>
        <h1 className={styles.title}>会员中心</h1>
        <p className={styles.statusLine}>
          当前状态：
          <strong className={`${styles.statusTier} ${statusTierClass}`}>
            {getMembershipTierLabel(currentTier)}
          </strong>
          {isActive && subscription?.expiresAt
            ? ` · 到期 ${new Date(subscription.expiresAt).toLocaleDateString("zh-CN")}`
            : ""}
        </p>

        {error ? (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        ) : null}

        {poll ? (
          <div className={styles.payPanel}>
            <p className={styles.payPanelTitle}>
              {poll.order
                ? `${getMembershipTierLabel(normalizeMembershipTier(poll.order.tier) ?? "free")} · ${periodLabel(poll.order.period)}付 · ¥${(poll.order.amountCents / 100).toFixed(2)}`
                : "支付订单已创建"}
            </p>
            <p className={styles.payPanelMeta}>
              订单号 {poll.orderId.slice(0, 12)}…
              {poll.order ? ` · 支付渠道 ${channelLabel(poll.order.channel)}` : ""}
            </p>

            {payment?.type === "redirect" && pollStatus === "pending" ? (
              <div className={styles.payPanelActions}>
                <a
                  href={payment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.alipayLink}
                >
                  前往支付宝支付 <ArrowRight size={16} />
                </a>
                <span className={styles.payPanelNote}>在新窗口完成支付，本页会自动更新</span>
              </div>
            ) : null}

            {payment?.type === "qr_code" && pollStatus === "pending" ? (
              <div className={styles.payPanelActions}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payment.qrUrl)}`}
                  alt="微信支付二维码"
                  width={200}
                  height={200}
                />
              </div>
            ) : null}

            <p className={styles.payPanelStatus}>
              {pollStatus === "pending" ? <span className={styles.payPanelStatusDot} /> : null}
              {pollStatus === "paid" ? (
                <span className={styles.statusPaid}>已支付 · 会员已生效</span>
              ) : pollStatus === "pending" ? (
                <span className={styles.statusPending}>等待支付结果…</span>
              ) : (
                <span className={styles.statusClosed}>{statusLabel(pollStatus ?? "closed")}</span>
              )}
            </p>
            <p className={styles.payPanelNote}>
              开通以服务端验签后的支付宝异步通知或主动查单为准，页面回跳仅作结果展示。
            </p>
          </div>
        ) : null}

        <section className={styles.pricing}>
          <div className={styles.pricingHead}>
            <div>
              <h2 className={styles.pricingTitle}>选择档位</h2>
              <p className={styles.pricingHint}>周期越长单价越低；续费在剩余有效期上叠加，不吞掉未到期时间。</p>
            </div>
            <div className={styles.segment} role="radiogroup" aria-label="计费周期">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={period === option.value}
                  className={
                    period === option.value
                      ? `${styles.segmentButton} ${styles.segmentButtonActive}`
                      : styles.segmentButton
                  }
                  onClick={() => setPeriod(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.cards}>
            {TIER_CARDS.map(({ tier, name, sub }) => {
              const plan = PLAN_CATALOG[`${tier}-${period}` as PlanId];
              const priceYuan = plan.priceCents / 100;
              const isCurrent = currentTier === tier && isActive;
              const currentRank = TIER_RANK[currentTier] ?? 0;
              const ctaText = isCurrent
                ? "续订当前档位"
                : TIER_RANK[tier] > currentRank && currentRank > 0
                  ? `升级到 ${name}`
                  : `订阅 ${name}`;
              return (
                <article
                  key={tier}
                  className={isCurrent ? `${styles.card} ${styles.cardCurrent}` : styles.card}
                >
                  {isCurrent ? (
                    <V2Badge className={styles.currentBadge} variant="muted">当前套餐</V2Badge>
                  ) : null}
                  <div className={styles.cardHead}>
                    <h3 className={styles.cardName}>{name}</h3>
                    <span className={styles.cardSub}>{sub}</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span className={styles.priceNum}>¥{priceYuan}</span>
                    <span className={styles.priceUnit}>/{plan.periodLabel}</span>
                  </div>
                  <p className={styles.priceHint}>
                    {period === "month"
                      ? "按月计费，可随时续订"
                      : `折合约 ¥${(priceYuan / PERIOD_MONTHS[period]).toFixed(1)}/月`}
                  </p>
                  <V2Button
                    className={styles.cta}
                    disabled={!!creating}
                    onClick={() => handleCreateOrder(plan.id)}
                    variant={isCurrent ? "secondary" : "primary"}
                  >
                    {creating === plan.id ? "创建中…" : ctaText}
                  </V2Button>
                  <ul className={styles.benefits}>
                    {BENEFITS[tier].map((line) => (
                      <li key={line} className={styles.benefit}>
                        <Check size={14} className={styles.benefitIcon} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className={styles.pricingNote}>
            试点课（中医诊断学、生理学）对所有人免费，不占官方课程名额；教材名额仅当月有效，跨月继续学习需重新激活；
            同一时刻高档覆盖低档——在高档有效期内购买低档，时长追加在剩余有效期之后。
          </p>
        </section>

        <section className={styles.orders}>
          <h2 className={styles.ordersTitle}>订单记录</h2>
          {orders.length > 0 ? (
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>套餐</th>
                  <th>金额</th>
                  <th className={styles.colChannel}>渠道</th>
                  <th>状态</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      {getMembershipTierLabel(normalizeMembershipTier(order.tier) ?? "free")} ·{" "}
                      {periodLabel(order.period)}付
                    </td>
                    <td>¥{(order.amountCents / 100).toFixed(2)}</td>
                    <td className={styles.colChannel}>{channelLabel(order.channel)}</td>
                    <td>
                      {order.status === "paid" ? (
                        <span className={styles.statusPaid}>已支付</span>
                      ) : order.status === "pending" ? (
                        <span className={styles.statusPending}>待支付</span>
                      ) : (
                        <span className={styles.statusClosed}>{statusLabel(order.status)}</span>
                      )}
                    </td>
                    <td className={styles.ordersTime}>
                      {new Date(order.createdAt).toLocaleDateString("zh-CN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.ordersEmpty}>暂无订单记录。</p>
          )}
        </section>
      </div>
    </div>
  );
}
