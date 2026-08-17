/**
 * Mock 支付 provider（演示/联调用）。
 * 创建订单后直接返回可"模拟支付成功"的参数。
 * 用于执照到位前完整跑通会员流程与 UI。
 */
import type { PaymentProvider, PaymentParams } from "../types";

export const mockProvider: PaymentProvider = {
  async createOrder(params): Promise<PaymentParams> {
    return { type: "mock", orderId: params.orderId };
  },

  // mock 模式下没有真实回调，由前端手动触发"模拟支付成功"
  async verifyNotify(): Promise<null> {
    return null;
  },

  async queryOrder() {
    return { paid: false };
  },
};
