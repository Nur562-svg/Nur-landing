/**
 * 支付宝网站支付 provider。
 * 自研 RSA2 验签，不引第三方 SDK。
 *
 * 密钥配置：
 * - ALIPAY_APP_ID：应用 ID
 * - ALIPAY_PRIVATE_KEY：应用私钥（RSA2）
 * - ALIPAY_PUBLIC_KEY：支付宝公钥（验签用）
 * - ALIPAY_NOTIFY_URL：异步通知地址
 */
import * as crypto from "node:crypto";
import type { PaymentProvider, PaymentParams, NotifyData } from "../types";

function getPrivateKey() {
  const pem = process.env.ALIPAY_PRIVATE_KEY;
  if (!pem) throw new Error("ALIPAY_PRIVATE_KEY not configured");
  const formatted = pem.includes("-----BEGIN") ? pem : `-----BEGIN RSA PRIVATE KEY-----\n${pem}\n-----END RSA PRIVATE KEY-----`;
  return crypto.createPrivateKey(formatted);
}

function getPublicKey() {
  const pem = process.env.ALIPAY_PUBLIC_KEY;
  if (!pem) throw new Error("ALIPAY_PUBLIC_KEY not configured");
  const formatted = pem.includes("-----BEGIN") ? pem : `-----BEGIN PUBLIC KEY-----\n${pem}\n-----END PUBLIC KEY-----`;
  return crypto.createPublicKey(formatted);
}

function signRsa2(data: string): string {
  const key = getPrivateKey();
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data, "utf-8");
  return signer.sign(key, "base64");
}

function verifyRsa2(data: string, signature: string): boolean {
  const key = getPublicKey();
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(data, "utf-8");
  return verifier.verify(key, signature, "base64");
}

/** 支付宝公共参数。 */
function buildCommonParams(): Record<string, string> {
  return {
    app_id: process.env.ALIPAY_APP_ID ?? "",
    method: "alipay.trade.page.pay",
    charset: "utf-8",
    sign_type: "RSA2",
    timestamp: new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, ""),
    version: "1.0",
    format: "json",
    notify_url: process.env.ALIPAY_NOTIFY_URL ?? "",
  };
}

/** 按字典序拼接参数（用于签名）。 */
function buildSignString(params: Record<string, string>): string {
  return Object.keys(params)
    .filter((k) => params[k] !== "" && k !== "sign" && k !== "sign_type")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
}

export const alipayProvider: PaymentProvider = {
  async createOrder(params): Promise<PaymentParams> {
    const { orderId, plan, notifyUrl } = params;
    const bizContent = JSON.stringify({
      out_trade_no: orderId,
      product_code: "FAST_INSTANT_TRADE_PAY",
      total_amount: (plan.priceCents / 100).toFixed(2),
      subject: `${plan.label} - ${plan.periodLabel}`,
    });

    const common = buildCommonParams();
    if (notifyUrl) common.notify_url = notifyUrl;
    const allParams: Record<string, string> = { ...common, biz_content: bizContent };

    const signString = buildSignString(allParams);
    const sign = signRsa2(signString);
    allParams.sign = sign;

    // 电脑网站支付：返回跳转 URL
    const url = `https://openapi.alipay.com/gateway.do?${new URLSearchParams(allParams).toString()}`;
    return { type: "redirect", url, orderId };
  },

  async verifyNotify(rawBody, _headers): Promise<NotifyData | null> {
    try {
      // 支付宝异步通知为 form-urlencoded，解析为 params
      const params = new URLSearchParams(rawBody);
      const paramMap: Record<string, string> = {};
      for (const [k, v] of params.entries()) {
        paramMap[k] = v;
      }

      const sign = paramMap.sign;
      if (!sign) return null;

      // 验签：用除 sign/sign_type 外的参数
      const signString = buildSignString(paramMap);
      if (!verifyRsa2(signString, sign)) return null;

      const tradeStatus = paramMap.trade_status;
      if (tradeStatus !== "TRADE_SUCCESS" && tradeStatus !== "TRADE_FINISHED") {
        return null;
      }

      return {
        orderId: paramMap.out_trade_no,
        providerTradeNo: paramMap.trade_no,
        amountCents: Math.round(parseFloat(paramMap.total_amount) * 100),
        status: "paid",
      };
    } catch {
      return null;
    }
  },

  async queryOrder(orderId) {
    // 主动查单（可选）
    const bizContent = JSON.stringify({ out_trade_no: orderId });
    const common = buildCommonParams();
    common.method = "alipay.trade.query";
    const allParams: Record<string, string> = { ...common, biz_content: bizContent };
    const signString = buildSignString(allParams);
    allParams.sign = signRsa2(signString);

    const url = `https://openapi.alipay.com/gateway.do?${new URLSearchParams(allParams).toString()}`;
    const res = await fetch(url);
    const data = (await res.json()) as {
      alipay_trade_query_response?: { trade_status?: string; trade_no?: string };
    };
    const resp = data.alipay_trade_query_response;
    return { paid: resp?.trade_status === "TRADE_SUCCESS", providerTradeNo: resp?.trade_no };
  },
};
