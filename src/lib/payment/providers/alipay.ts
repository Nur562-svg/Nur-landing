/**
 * 支付宝网站支付 provider。
 * 自研 RSA2 验签，不引第三方 SDK。
 *
 * 密钥与网关配置（全部只在服务端读取，不渲染、不落日志）：
 * - ALIPAY_APP_ID：应用 ID
 * - ALIPAY_PRIVATE_KEY：应用私钥（RSA2，单行 base64 或完整 PEM 均可）
 * - ALIPAY_PUBLIC_KEY：支付宝公钥（验签用，非应用公钥）
 * - ALIPAY_NOTIFY_URL：异步通知地址
 * - ALIPAY_GATEWAY_URL：网关地址；**默认沙箱** https://openapi-sandbox.dl.alipaydev.com/gateway.do，
 *   生产环境必须显式配置为 https://openapi.alipay.com/gateway.do
 */
import * as crypto from "node:crypto";
import type { PaymentProvider, PaymentParams, NotifyData } from "../types";

/** 网关地址：默认沙箱；生产用 ALIPAY_GATEWAY_URL 显式覆盖为正式网关。 */
function getGatewayUrl(): string {
  return process.env.ALIPAY_GATEWAY_URL?.trim() || "https://openapi-sandbox.dl.alipaydev.com/gateway.do";
}

/** 支付宝要求 yyyy-MM-dd HH:mm:ss（默认按北京时区；Asia/Shanghai 无夏令时，固定 UTC+8）。 */
function nowBeijing(): string {
  return new Date(Date.now() + 8 * 60 * 60 * 1000)
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d+Z$/, "");
}

/** 把单行 base64 密钥按 64 字符折行成标准 PEM 主体。 */
function formatPemBody(pem: string): string {
  return pem.replace(/\s+/g, "").replace(/(.{64})/g, "$1\n");
}

function getPrivateKey() {
  const pem = process.env.ALIPAY_PRIVATE_KEY;
  if (!pem) throw new Error("ALIPAY_PRIVATE_KEY not configured");
  const formatted = pem.includes("-----BEGIN")
    ? pem
    : `-----BEGIN RSA PRIVATE KEY-----\n${formatPemBody(pem)}\n-----END RSA PRIVATE KEY-----`;
  return crypto.createPrivateKey(formatted);
}

function getPublicKey() {
  const pem = process.env.ALIPAY_PUBLIC_KEY;
  if (!pem) throw new Error("ALIPAY_PUBLIC_KEY not configured");
  const formatted = pem.includes("-----BEGIN")
    ? pem
    : `-----BEGIN PUBLIC KEY-----\n${formatPemBody(pem)}\n-----END PUBLIC KEY-----`;
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
    timestamp: nowBeijing(),
    version: "1.0",
    format: "json",
    notify_url: process.env.ALIPAY_NOTIFY_URL ?? "",
  };
}

/**
 * 按字典序拼接参数（用于请求签名）。
 * 实测（2026-09-19，沙箱网关 openapi-sandbox.dl.alipaydev.com）：当前网关的请求验签字符串
 * 【包含 sign_type】、排除 sign 与空值——不带 sign_type 会得到 isv.invalid-signature。
 */
function buildSignString(params: Record<string, string>): string {
  return Object.keys(params)
    .filter((k) => params[k] !== "" && k !== "sign")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
}

/**
 * 异步通知验签字符串有两种历史规范：排除 sign/sign_type（经典 SDK 行为）与仅排除 sign。
 * 两种都由支付宝持有私钥，接受任一均不降低防伪造强度；
 * 本地无法收到支付宝真实 notify，故双规范都接受，公网部署后按真实回调确认并固定。
 */
function verifyNotifySignature(paramMap: Record<string, string>): boolean {
  const sign = paramMap.sign;
  if (!sign) return false;
  const keys = Object.keys(paramMap)
    .filter((k) => paramMap[k] !== "" && k !== "sign")
    .sort();
  const withoutSignType = keys
    .filter((k) => k !== "sign_type")
    .map((k) => `${k}=${paramMap[k]}`)
    .join("&");
  if (verifyRsa2(withoutSignType, sign)) return true;
  const withSignType = keys.map((k) => `${k}=${paramMap[k]}`).join("&");
  return verifyRsa2(withSignType, sign);
}

export const alipayProvider: PaymentProvider = {
  async createOrder(params): Promise<PaymentParams> {
    const { orderId, plan, notifyUrl, returnUrl } = params;
    const bizContent = JSON.stringify({
      out_trade_no: orderId,
      product_code: "FAST_INSTANT_TRADE_PAY",
      total_amount: (plan.priceCents / 100).toFixed(2),
      subject: `${plan.label} - ${plan.periodLabel}`,
    });

    const common = buildCommonParams();
    if (notifyUrl) common.notify_url = notifyUrl;
    // 支付完成后的浏览器回跳地址（回跳只作结果展示，开通只认验签后的 notify 或主动查单）
    if (returnUrl) common.return_url = returnUrl;
    const allParams: Record<string, string> = { ...common, biz_content: bizContent };

    const signString = buildSignString(allParams);
    const sign = signRsa2(signString);
    allParams.sign = sign;

    // 电脑网站支付：返回跳转 URL（网关由 env 决定：沙箱/生产）
    const url = `${getGatewayUrl()}?${new URLSearchParams(allParams).toString()}`;
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

      // 验签：双规范兼容（见 verifyNotifySignature 注释）
      if (!verifyNotifySignature(paramMap)) return null;

      // 防张冠李戴：app_id 必须存在且与本应用一致（缺失即拒绝，不猜测）
      const expectedAppId = process.env.ALIPAY_APP_ID?.trim();
      if (!expectedAppId || paramMap.app_id !== expectedAppId) {
        return null;
      }

      // 必要字段缺失即拒绝（订单号/渠道交易号/金额）
      if (!paramMap.out_trade_no || !paramMap.trade_no || !paramMap.total_amount) {
        return null;
      }

      const tradeStatus = paramMap.trade_status;
      if (tradeStatus !== "TRADE_SUCCESS" && tradeStatus !== "TRADE_FINISHED") {
        return null;
      }

      const amount = Number.parseFloat(paramMap.total_amount);
      if (!Number.isFinite(amount) || amount < 0) return null;

      return {
        orderId: paramMap.out_trade_no,
        providerTradeNo: paramMap.trade_no,
        amountCents: Math.round(amount * 100),
        status: "paid",
      };
    } catch {
      return null;
    }
  },

  async queryOrder(orderId) {
    // 主动查单（可选）。注意：未对网关响应体做签名校验（响应验签需按支付宝原始 JSON 序列化逐字节还原，
    // 收益有限）；调用走服务端 HTTPS 直连网关，作为 notify 丢失时的补偿手段。
    const bizContent = JSON.stringify({ out_trade_no: orderId });
    const common = buildCommonParams();
    common.method = "alipay.trade.query";
    const allParams: Record<string, string> = { ...common, biz_content: bizContent };
    const signString = buildSignString(allParams);
    allParams.sign = signRsa2(signString);

    const url = `${getGatewayUrl()}?${new URLSearchParams(allParams).toString()}`;
    const res = await fetch(url);
    const data = (await res.json()) as {
      alipay_trade_query_response?: {
        code?: string;
        msg?: string;
        trade_status?: string;
        trade_no?: string;
      };
    };
    const resp = data.alipay_trade_query_response;
    // 网关业务码不为 10000（如订单不存在 ACQ.TRADE_NOT_EXIST）一律视为未支付，
    // 错误信息不吞掉：带上 code/msg 便于排查。
    if (resp?.code && resp.code !== "10000") {
      return { paid: false, queryError: `alipay query code=${resp.code} msg=${resp.msg ?? ""}` };
    }
    const paid = resp?.trade_status === "TRADE_SUCCESS" || resp?.trade_status === "TRADE_FINISHED";
    return { paid, providerTradeNo: resp?.trade_no };
  },
};
