import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import * as crypto from "node:crypto";

/**
 * M7: 支付服务离线测试（不触网）。
 * - 隔离：临时 SQLite 库（DATABASE_URL 指向 mkdtemp 目录，prisma db push 建表），不碰 prisma/dev.db。
 * - 支付宝 notify：用测试内生成的 RSA2 密钥对构造合法签名报文，走完整验签 → 开通链路。
 * - 幂等 / 续费叠加 / 高档覆盖低档 / 金额篡改 / app_id 不一致 / 错误密钥 / 无密钥报错 / reconcile。
 */

// —— 必须在 import 服务模块之前：隔离数据库 + 测试密钥 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-pay-test-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

const testKeys = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const testPrivateKeyPem = testKeys.privateKey.export({ type: "pkcs1", format: "pem" }).toString();
const testPublicKeyPem = testKeys.publicKey.export({ type: "spki", format: "pem" }).toString();
const wrongKeys = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });

const TEST_APP_ID = "test-app-id-0001";
process.env.PAYMENT_PROVIDER = "alipay";
process.env.ALIPAY_APP_ID = TEST_APP_ID;
process.env.ALIPAY_PRIVATE_KEY = testPrivateKeyPem;
process.env.ALIPAY_PUBLIC_KEY = testPublicKeyPem;
process.env.ALIPAY_GATEWAY_URL = "https://openapi-sandbox.dl.alipaydev.com/gateway.do";

// 建表（显式 env 优先于 .env 中的 DATABASE_URL；stdio pipe 静音输出）
execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

// 进程退出时统一清理临时库（各 describe 共用同一单例连接，不能提前删目录）
process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

/** 与 alipay provider 相同的签名串构造（字典序、排除 sign/sign_type、跳过空值）。 */
function buildSignString(params: Record<string, string>): string {
  return Object.keys(params)
    .filter((k) => params[k] !== "" && k !== "sign" && k !== "sign_type")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
}

function signForm(params: Record<string, string>, privateKey: crypto.KeyObject): string {
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(buildSignString(params), "utf-8");
  const sign = signer.sign(privateKey, "base64");
  return new URLSearchParams({ ...params, sign }).toString();
}

/** 构造一条合法签名的支付宝异步通知表单。 */
function buildNotify(params: {
  orderId: string;
  amount: string;
  appId?: string;
  tradeStatus?: string;
  tradeNo?: string;
}): string {
  return signForm(
    {
      app_id: params.appId ?? TEST_APP_ID,
      out_trade_no: params.orderId,
      trade_no: params.tradeNo ?? `sandbox-trade-${params.orderId}`,
      total_amount: params.amount,
      trade_status: params.tradeStatus ?? "TRADE_SUCCESS",
      seller_id: "sandbox-seller",
      notify_type: "trade_status_sync",
    },
    testKeys.privateKey,
  );
}

async function createTestUser(tier = "free", expiresAt: Date | null = null) {
  const { prisma } = await import("../src/lib/prisma");
  const email = `pay-test-${crypto.randomUUID()}@example.com`;
  return prisma.user.create({
    data: {
      email,
      passwordHash: "test-hash",
      displayName: "支付测试用户",
      membershipTier: tier,
      membershipExpiresAt: expiresAt,
    },
  });
}

describe("Payment service — alipay notify 与会员生效（离线全链路）", async () => {
  const { prisma } = await import("../src/lib/prisma");
  const service = await import("../src/lib/payment/service");

  const createdUserIds: string[] = [];
  const DAY_MS = 24 * 60 * 60 * 1000;

  async function newUser(tier = "free", expiresAt: Date | null = null) {
    const user = await createTestUser(tier, expiresAt);
    createdUserIds.push(user.id);
    return user;
  }

  after(async () => {
    await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
  });

  it("正向：验签通过 → 订单 paid → 会员生效（free → pro 月付）", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok, "createOrder 应成功");

    const result = await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "49.00" }), {});
    assert.ok(result.ok, `notify 应成功：${result.ok ? "" : result.error}`);

    const paid = await prisma.order.findUnique({ where: { id: order.orderId } });
    assert.equal(paid?.status, "paid");
    assert.ok(paid?.paidAt);
    assert.ok(paid?.providerTradeNo?.startsWith("sandbox-trade-"));

    const refreshed = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(refreshed?.membershipTier, "pro");
    const expected = Date.now() + 30 * DAY_MS;
    assert.ok(
      refreshed?.membershipExpiresAt &&
        Math.abs(refreshed.membershipExpiresAt.getTime() - expected) < 5_000,
      "到期时间应约为 now+30d",
    );
  });

  it("幂等：重复 notify 直接成功，不重复延期", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);

    const first = await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "49.00" }), {});
    assert.ok(first.ok);
    const afterFirst = await prisma.user.findUnique({ where: { id: user.id } });

    // 支付宝会重发通知：同一条报文再次到达必须仍返回成功且不重复延期
    const second = await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "49.00" }), {});
    assert.ok(second.ok, "重复 notify 应幂等成功");
    const afterSecond = await prisma.user.findUnique({ where: { id: user.id } });

    assert.equal(afterFirst?.membershipExpiresAt?.getTime(), afterSecond?.membershipExpiresAt?.getTime());
  });

  it("金额篡改：正确签名但金额与订单不一致 → 拒绝，订单保持 pending", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "basic-month");
    assert.ok(order.ok);

    // 攻击者无法重签，此处用合法密钥重签不同金额，验证服务端金额核对的纵深防御
    const result = await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "0.01" }), {});
    assert.ok(!result.ok);
    assert.match(result.error ?? "", /amount_mismatch/);

    const paid = await prisma.order.findUnique({ where: { id: order.orderId } });
    assert.equal(paid?.status, "pending");
    const refreshed = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(refreshed?.membershipTier, "free");
  });

  it("app_id 不一致（签名合法）→ 验签拒绝", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);

    const result = await service.handleNotify(
      "alipay",
      buildNotify({ orderId: order.orderId, amount: "49.00", appId: "another-app-id" }),
      {},
    );
    assert.ok(!result.ok);
    assert.equal(result.error, "verify_failed");
  });

  it("错误密钥签名 → 验签拒绝", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);

    const forged = signForm(
      {
        app_id: TEST_APP_ID,
        out_trade_no: order.orderId,
        trade_no: "forged-trade",
        total_amount: "49.00",
        trade_status: "TRADE_SUCCESS",
      },
      wrongKeys.privateKey,
    );
    const result = await service.handleNotify("alipay", forged, {});
    assert.ok(!result.ok);
    assert.equal(result.error, "verify_failed");
  });

  it("非成功交易状态（WAIT_BUYER_PAY）→ 拒绝；TRADE_FINISHED → 受理", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);

    const waiting = await service.handleNotify(
      "alipay",
      buildNotify({ orderId: order.orderId, amount: "49.00", tradeStatus: "WAIT_BUYER_PAY" }),
      {},
    );
    assert.ok(!waiting.ok);

    const finished = await service.handleNotify(
      "alipay",
      buildNotify({ orderId: order.orderId, amount: "49.00", tradeStatus: "TRADE_FINISHED" }),
      {},
    );
    assert.ok(finished.ok);
    const paid = await prisma.order.findUnique({ where: { id: order.orderId } });
    assert.equal(paid?.status, "paid");
  });

  it("notify 携带 sign_type 字段并按「仅排除 sign」规范签名 → 同样验签通过（双规范兼容）", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);

    const params: Record<string, string> = {
      app_id: TEST_APP_ID,
      out_trade_no: order.orderId,
      trade_no: `sandbox-trade-${order.orderId}`,
      total_amount: "49.00",
      trade_status: "TRADE_SUCCESS",
      sign_type: "RSA2",
    };
    // 新规范：签名串包含 sign_type、仅排除 sign
    const signString = Object.keys(params)
      .filter((k) => params[k] !== "" && k !== "sign")
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&");
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(signString, "utf-8");
    const form = new URLSearchParams({
      ...params,
      sign: signer.sign(testKeys.privateKey, "base64"),
    }).toString();

    const result = await service.handleNotify("alipay", form, {});
    assert.ok(result.ok, `新规范签名应验签通过：${result.ok ? "" : result.error}`);
    const paid = await prisma.order.findUnique({ where: { id: order.orderId } });
    assert.equal(paid?.status, "paid");
  });

  it("续费叠加：同档再购一单 → 到期时间在剩余有效期上延长（不吞掉未到期时间）", async () => {
    const user = await newUser();
    const first = await service.createOrder(user.id, "pro-month");
    assert.ok(first.ok);
    await service.handleNotify("alipay", buildNotify({ orderId: first.orderId, amount: "49.00" }), {});
    const afterFirst = await prisma.user.findUnique({ where: { id: user.id } });
    const expiryOne = afterFirst?.membershipExpiresAt?.getTime();
    assert.ok(expiryOne);

    const second = await service.createOrder(user.id, "pro-month");
    assert.ok(second.ok);
    assert.notEqual(second.orderId, first.orderId, "已支付订单不应被复用，应创建新订单");
    await service.handleNotify("alipay", buildNotify({ orderId: second.orderId, amount: "49.00" }), {});

    const afterSecond = await prisma.user.findUnique({ where: { id: user.id } });
    const expiryTwo = afterSecond?.membershipExpiresAt?.getTime();
    assert.ok(expiryTwo);
    // 第二单应从第一单到期时间起再 +30d（叠加，而不是从 now 起算）
    const expectedBase = expiryOne!;
    assert.ok(
      Math.abs(expiryTwo! - (expectedBase + 30 * DAY_MS)) < 5_000,
      `应叠加 30d：${new Date(expiryTwo!)} vs ${new Date(expectedBase + 30 * DAY_MS)}`,
    );
  });

  it("高档覆盖低档：Pro 有效期内购买 Basic → 档位保持 pro，时长追加在剩余期后", async () => {
    const expiry = new Date(Date.now() + 10 * DAY_MS);
    const user = await newUser("pro", expiry);

    const order = await service.createOrder(user.id, "basic-month");
    assert.ok(order.ok);
    const result = await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "19.00" }), {});
    assert.ok(result.ok);

    const refreshed = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(refreshed?.membershipTier, "pro", "高档有效期内购买低档，档位不应立即降级");
    const expected = expiry.getTime() + 30 * DAY_MS;
    assert.ok(
      refreshed?.membershipExpiresAt &&
        Math.abs(refreshed.membershipExpiresAt.getTime() - expected) < 5_000,
      "购买时长应追加在剩余有效期之后",
    );
  });

  it("到期回退后购买：过期 pro 视为 free，从现在起算新档", async () => {
    const user = await newUser("pro", new Date(Date.now() - DAY_MS));
    // 读取层先验证到期回退
    const sub = await service.getSubscription(user.id);
    assert.equal(sub.tier, "free");

    const order = await service.createOrder(user.id, "basic-month");
    assert.ok(order.ok);
    await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "19.00" }), {});

    const refreshed = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(refreshed?.membershipTier, "basic");
    const expected = Date.now() + 30 * DAY_MS;
    assert.ok(
      refreshed?.membershipExpiresAt &&
        Math.abs(refreshed.membershipExpiresAt.getTime() - expected) < 5_000,
    );
  });

  it("旧 lite 档数据兼容：lite + 未到期 → 续购 basic 正常叠加为 basic", async () => {
    const expiry = new Date(Date.now() + 5 * DAY_MS);
    const user = await newUser("lite", expiry);

    const order = await service.createOrder(user.id, "basic-month");
    assert.ok(order.ok);
    await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "19.00" }), {});

    const refreshed = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(refreshed?.membershipTier, "basic", "lite 应归一化为 basic");
    const expected = expiry.getTime() + 30 * DAY_MS;
    assert.ok(
      refreshed?.membershipExpiresAt &&
        Math.abs(refreshed.membershipExpiresAt.getTime() - expected) < 5_000,
    );
  });

  it("reconcile：已支付订单幂等返回 paid 且不重复延期；pending mock 订单查单返回未支付", async () => {
    const user = await newUser();
    // alipay 单支付
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);
    await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "49.00" }), {});
    const afterPay = await prisma.user.findUnique({ where: { id: user.id } });

    const reconciled = await service.reconcileOrder(order.orderId);
    assert.ok(reconciled.ok && reconciled.paid, "已支付订单 reconcile 应直接返回 paid");
    const afterReconcile = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(
      afterPay?.membershipExpiresAt?.getTime(),
      afterReconcile?.membershipExpiresAt?.getTime(),
      "reconcile 不应重复延期",
    );

    // mock 通道 pending 订单（queryOrder 恒为未支付，不触网）
    process.env.PAYMENT_PROVIDER = "mock";
    try {
      const mockOrder = await service.createOrder(user.id, "basic-month");
      assert.ok(mockOrder.ok);
      const mockResult = await service.reconcileOrder(mockOrder.orderId);
      assert.ok(mockResult.ok && !mockResult.paid, "mock 通道 pending 订单应返回未支付");
    } finally {
      process.env.PAYMENT_PROVIDER = "alipay";
    }
  });

  it("关单后 notify → 如实报错 order_status_closed，不开通", async () => {
    const user = await newUser();
    const order = await service.createOrder(user.id, "pro-month");
    assert.ok(order.ok);

    await prisma.order.update({ where: { id: order.orderId }, data: { status: "closed" } });
    const result = await service.handleNotify("alipay", buildNotify({ orderId: order.orderId, amount: "49.00" }), {});
    assert.ok(!result.ok);
    assert.match(result.error ?? "", /order_status_closed/);
    const refreshed = await prisma.user.findUnique({ where: { id: user.id } });
    assert.equal(refreshed?.membershipTier, "free");
  });
});

describe("Payment channel 配置校验（无密钥明确报错，不静默回落 mock）", async () => {
  const service = await import("../src/lib/payment/service");

  const savedEnv: Record<string, string | undefined> = {};
  const alipayKeys = ["PAYMENT_PROVIDER", "ALIPAY_APP_ID", "ALIPAY_PRIVATE_KEY", "ALIPAY_PUBLIC_KEY"] as const;

  function saveEnv() {
    for (const key of alipayKeys) savedEnv[key] = process.env[key];
  }
  function restoreEnv() {
    for (const key of alipayKeys) {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    }
  }

  it("通道为 alipay 但密钥缺失 → createOrder 返回 channel_not_configured（503 语义）", async () => {
    saveEnv();
    try {
      process.env.PAYMENT_PROVIDER = "alipay";
      delete process.env.ALIPAY_APP_ID;
      delete process.env.ALIPAY_PRIVATE_KEY;
      delete process.env.ALIPAY_PUBLIC_KEY;

      const user = await createTestUser();
      const result = await service.createOrder(user.id, "pro-month");
      assert.ok(!result.ok);
      assert.equal(result.code, "channel_not_configured");
      assert.match(result.error, /支付通道未配置完整/);
      assert.match(result.error, /ALIPAY_APP_ID/);

      // 未配置密钥时不应创建任何订单（不落库）
      const { prisma } = await import("../src/lib/prisma");
      const count = await prisma.order.count({ where: { userId: user.id } });
      assert.equal(count, 0);
      await prisma.user.delete({ where: { id: user.id } });
    } finally {
      restoreEnv();
    }
  });

  it("部分缺失（仅公钥）→ 同样明确报错并列出缺失变量", async () => {
    saveEnv();
    try {
      process.env.PAYMENT_PROVIDER = "alipay";
      delete process.env.ALIPAY_PUBLIC_KEY;

      const user = await createTestUser();
      const result = await service.createOrder(user.id, "pro-month");
      assert.ok(!result.ok);
      assert.equal(result.code, "channel_not_configured");
      assert.match(result.error, /ALIPAY_PUBLIC_KEY/);
      const { prisma } = await import("../src/lib/prisma");
      await prisma.user.delete({ where: { id: user.id } });
    } finally {
      restoreEnv();
    }
  });

  it("getCurrentPaymentChannel：显式 mock / alipay / wechat / 非法值", async () => {
    saveEnv();
    try {
      process.env.PAYMENT_PROVIDER = "mock";
      assert.equal(service.getCurrentPaymentChannel(), "mock");
      process.env.PAYMENT_PROVIDER = "alipay";
      assert.equal(service.getCurrentPaymentChannel(), "alipay");
      process.env.PAYMENT_PROVIDER = "wechat";
      assert.equal(service.getCurrentPaymentChannel(), "wechat");
      process.env.PAYMENT_PROVIDER = "stripe";
      assert.throws(() => service.getCurrentPaymentChannel(), /PAYMENT_PROVIDER 配置不正确/);
      delete process.env.PAYMENT_PROVIDER;
      assert.equal(service.getCurrentPaymentChannel(), "mock", "未配置时默认 mock（开发/演示语义）");
    } finally {
      restoreEnv();
    }
  });
});

describe("computeMembershipRenewal — 续费叠加计算（纯函数）", async () => {
  const { computeMembershipRenewal } = await import("../src/lib/payment/service");
  const now = new Date("2026-09-19T08:00:00.000Z");
  const DAY = 24 * 60 * 60 * 1000;

  it("free 购买 basic-month → 从现在起算 30 天", () => {
    const r = computeMembershipRenewal({
      currentTier: "free",
      currentExpiresAt: null,
      planTier: "basic",
      period: "month",
      now,
    });
    assert.equal(r.tier, "basic");
    assert.equal(r.expiresAt.getTime(), now.getTime() + 30 * DAY);
  });

  it("basic 剩余 10 天续购 basic-quarter → 叠加 90 天", () => {
    const expiry = new Date(now.getTime() + 10 * DAY);
    const r = computeMembershipRenewal({
      currentTier: "basic",
      currentExpiresAt: expiry,
      planTier: "basic",
      period: "quarter",
      now,
    });
    assert.equal(r.tier, "basic");
    assert.equal(r.expiresAt.getTime(), expiry.getTime() + 90 * DAY);
  });

  it("basic 升级 pro → 立即生效 pro，到期在剩余期上叠加", () => {
    const expiry = new Date(now.getTime() + 10 * DAY);
    const r = computeMembershipRenewal({
      currentTier: "basic",
      currentExpiresAt: expiry,
      planTier: "pro",
      period: "month",
      now,
    });
    assert.equal(r.tier, "pro");
    assert.equal(r.expiresAt.getTime(), expiry.getTime() + 30 * DAY);
  });

  it("pro 有效期内购买 basic → 保持 pro，时长追加（高档覆盖低档）", () => {
    const expiry = new Date(now.getTime() + 40 * DAY);
    const r = computeMembershipRenewal({
      currentTier: "pro",
      currentExpiresAt: expiry,
      planTier: "basic",
      period: "month",
      now,
    });
    assert.equal(r.tier, "pro");
    assert.equal(r.expiresAt.getTime(), expiry.getTime() + 30 * DAY);
  });

  it("已过期 max 购买 basic → 视为 free，从现在起算", () => {
    const r = computeMembershipRenewal({
      currentTier: "max",
      currentExpiresAt: new Date(now.getTime() - DAY),
      planTier: "basic",
      period: "year",
      now,
    });
    assert.equal(r.tier, "basic");
    assert.equal(r.expiresAt.getTime(), now.getTime() + 365 * DAY);
  });

  it("年付周期换算 365 天", () => {
    const r = computeMembershipRenewal({
      currentTier: "free",
      currentExpiresAt: null,
      planTier: "max",
      period: "year",
      now,
    });
    assert.equal(r.tier, "max");
    assert.equal(r.expiresAt.getTime(), now.getTime() + 365 * DAY);
  });
});
