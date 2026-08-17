"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, ArrowRight } from "lucide-react";
import type { Plan, PlanId, PaymentParams } from "@/lib/payment/types";
import { ALL_PLANS } from "@/lib/payment/plans";

type SubscriptionState = {
  tier: string;
  expiresAt: string | null;
  isActive: boolean;
};

type OrderView = {
  id: string;
  planId: PlanId;
  tier: string;
  period: string;
  amountCents: number;
  channel: string;
  status: "pending" | "paid" | "closed" | "refunded";
  paidAt: string | null;
  createdAt: string;
};

export function BillingPanel() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentParams | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const data = (await res.json()) as { ok?: boolean; error?: string; orderId?: string; payment?: PaymentParams };
      if (!data.ok) {
        setError(data.error ?? "创建订单失败");
        return;
      }
      if (data.payment) {
        setPayment(data.payment);
        if (data.payment.type === "mock") {
          // mock 模式：自动完成支付后刷新
          setTimeout(async () => {
            const payRes = await fetch("/api/pay/status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderId, action: "mock-pay" }),
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
          // 真实支付（qr_code / redirect）：轮询主动查单补偿，防止回调丢失
          const orderId = data.orderId;
          let attempts = 0;
          const maxAttempts = 60; // 最多轮询 5 分钟（每 5 秒）
          const poll = async () => {
            attempts++;
            if (attempts > maxAttempts) return;
            try {
              const res = await fetch(`/api/pay/reconcile?orderId=${orderId}`, {
                credentials: "include",
              });
              const result = (await res.json()) as { ok?: boolean; paid?: boolean };
              if (result.ok && result.paid) {
                setPayment(null);
                router.refresh();
                fetchData();
                return;
              }
            } catch {
              // silent
            }
            setTimeout(poll, 5000);
          };
          setTimeout(poll, 3000);
        }
      }
    } catch {
      setError("网络异常");
    } finally {
      setCreating(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
        <Loader2 style={{ animation: "spin 0.9s linear infinite" }} size={24} />
      </div>
    );
  }

  const currentTier = subscription?.tier ?? "free";
  const isActive = subscription?.isActive ?? false;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>会员中心</h1>
      <p style={{ fontSize: 14, color: "#6c6a66", marginBottom: 32 }}>
        当前状态：
        <strong style={{ color: currentTier === "pro" ? "#17659a" : currentTier === "lite" ? "#c9a36b" : "#10100f" }}>
          {currentTier === "pro" ? "Pro 会员" : currentTier === "lite" ? "Lite 会员" : "免费版"}
        </strong>
        {isActive && subscription?.expiresAt ? ` · 到期 ${new Date(subscription.expiresAt).toLocaleDateString("zh-CN")}` : ""}
      </p>

      {error ? (
        <div style={{ borderLeft: "3px solid #bf2118", padding: "8px 12px", marginBottom: 16, fontSize: 13, color: "#bf2118" }}>
          {error}
        </div>
      ) : null}

      {payment?.type === "qr_code" ? (
        <div style={{ textAlign: "center", padding: 24, border: "1px solid #ddd", marginBottom: 24 }}>
          <p style={{ marginBottom: 16, fontSize: 14 }}>请使用微信扫码支付</p>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(payment.qrUrl)}`} alt="微信支付二维码" width={240} height={240} />
          <p style={{ marginTop: 12, fontSize: 12, color: "#6c6a66" }}>支付完成后页面将自动刷新</p>
        </div>
      ) : null}

      {payment?.type === "redirect" ? (
        <div style={{ textAlign: "center", padding: 24, border: "1px solid #ddd", marginBottom: 24 }}>
          <a href={payment.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#10100f", color: "#f7f4ee", textDecoration: "none" }}>
            前往支付宝支付 <ArrowRight size={16} />
          </a>
        </div>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {ALL_PLANS.map((plan) => {
          const priceYuan = (plan.priceCents / 100).toFixed(2);
          const isCurrent = currentTier === plan.tier && isActive;
          return (
            <div key={plan.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{plan.label}</div>
              <div style={{ fontSize: 12, color: "#6c6a66", marginBottom: 12 }}>{plan.periodLabel}付</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                ¥{priceYuan}<span style={{ fontSize: 12, fontWeight: 400, color: "#6c6a66" }}>/{plan.periodLabel}</span>
              </div>
              {isCurrent ? (
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center", padding: "8px 0", color: "#2d7a2d", fontSize: 13 }}>
                  <Check size={14} /> 当前套餐
                </div>
              ) : (
                <button
                  onClick={() => handleCreateOrder(plan.id)}
                  disabled={!!creating}
                  style={{ width: "100%", padding: "8px 0", border: "1px solid #10100f", background: "#10100f", color: "#f7f4ee", cursor: creating ? "wait" : "pointer", fontSize: 13, opacity: creating ? 0.6 : 1 }}
                >
                  {creating === plan.id ? "创建中..." : "订阅"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {orders.length > 0 ? (
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>订单记录</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                <th style={{ padding: "8px 4px" }}>套餐</th>
                <th style={{ padding: "8px 4px" }}>金额</th>
                <th style={{ padding: "8px 4px" }}>渠道</th>
                <th style={{ padding: "8px 4px" }}>状态</th>
                <th style={{ padding: "8px 4px" }}>时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px 4px" }}>{order.tier} · {order.period === "month" ? "月" : order.period === "quarter" ? "季" : "年"}</td>
                  <td style={{ padding: "8px 4px" }}>¥{(order.amountCents / 100).toFixed(2)}</td>
                  <td style={{ padding: "8px 4px" }}>{order.channel}</td>
                  <td style={{ padding: "8px 4px" }}>
                    <span style={{ color: order.status === "paid" ? "#2d7a2d" : order.status === "pending" ? "#c9a36b" : "#6c6a66" }}>
                      {order.status === "paid" ? "已支付" : order.status === "pending" ? "待支付" : order.status === "refunded" ? "已退款" : "已关闭"}
                    </span>
                  </td>
                  <td style={{ padding: "8px 4px", color: "#6c6a66" }}>{new Date(order.createdAt).toLocaleDateString("zh-CN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
