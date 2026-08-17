import type { MembershipTier } from "@/types/auth";

/**
 * M3: 会员配额定义 + 使用记录（浏览器端 + 共享类型/纯函数）
 * 服务端函数（依赖 Prisma）见 quotas-server.ts，避免客户端 bundle 引入 Prisma。
 * 免费版合理限制；Pro 显著放宽。Demo 阶段使用 client bump + DB 基础数据。
 * 不涉及真实支付。
 */

export type QuotaResource =
  | "privateMaterials"   // 私人材料准入（已同意的 admission）
  | "courseBuilds"       // Course Builder 使用（含私人分析）
  | "mockExams"          // 模考会话
  | "agentCalls";        // Agent 调用

export type QuotaItem = {
  used: number;
  limit: number | "unlimited";
  isNearLimit: boolean;
  isOverLimit: boolean;
  percent: number; // 0-100 for progress bar
};

export type UserUsageRecord = Record<string, number>;

export type UserQuotas = {
  tier: MembershipTier;
  quotas: Record<QuotaResource, QuotaItem>;
  periodNote: string;
};

export const TIER_QUOTAS: Record<MembershipTier, Record<QuotaResource, number | "unlimited">> = {
  free: {
    privateMaterials: 5,
    courseBuilds: 3,
    mockExams: 10,
    agentCalls: 50,
  },
  lite: {
    privateMaterials: 20,
    courseBuilds: 10,
    mockExams: 30,
    agentCalls: 200,
  },
  pro: {
    privateMaterials: "unlimited",
    courseBuilds: "unlimited",
    mockExams: "unlimited",
    agentCalls: "unlimited",
  },
};

const CLIENT_USAGE_KEYS: Record<"courseBuilds" | "agentCalls", string> = {
  courseBuilds: "nur-learn:quota:course-builds",
  agentCalls: "nur-learn:quota:agent-calls",
};

function isUnlimited(v: number | "unlimited"): v is "unlimited" {
  return v === "unlimited";
}

export function computeItem(used: number, limit: number | "unlimited"): QuotaItem {
  if (isUnlimited(limit)) {
    return { used, limit, isNearLimit: false, isOverLimit: false, percent: 0 };
  }
  const percent = Math.min(100, Math.round((used / limit) * 100));
  const near = used >= Math.floor(limit * 0.8);
  const over = used > limit;
  return { used, limit, isNearLimit: near && !over, isOverLimit: over, percent };
}

export function getClientBump(resource: "courseBuilds" | "agentCalls"): number {
  if (typeof window === "undefined") return 0;
  const key = CLIENT_USAGE_KEYS[resource];
  const raw = window.localStorage.getItem(key);
  return raw ? parseInt(raw, 10) || 0 : 0;
}


/** 记录一次 Course Builder 私人分析/构建使用（M3 demo） */
export function recordCourseBuildUsage(): void {
  if (typeof window === "undefined") return;
  const key = CLIENT_USAGE_KEYS.courseBuilds;
  const current = getClientBump("courseBuilds");
  window.localStorage.setItem(key, String(current + 1));
  window.dispatchEvent(new CustomEvent("nur-quota-update"));
}

/** 记录一次 Agent 调用（M3 demo） */
export function recordAgentCallUsage(): void {
  if (typeof window === "undefined") return;
  const key = CLIENT_USAGE_KEYS.agentCalls;
  const current = getClientBump("agentCalls");
  window.localStorage.setItem(key, String(current + 1));
  window.dispatchEvent(new CustomEvent("nur-quota-update"));
}

export function canUseResource(quota: QuotaItem): boolean {
  if (quota.limit === "unlimited") return true;
  return quota.used < quota.limit;
}

export function getQuotaLabel(resource: QuotaResource): string {
  switch (resource) {
    case "privateMaterials": return "私人材料准入";
    case "courseBuilds": return "Course Builder 构建 / 私人分析";
    case "mockExams": return "模考会话";
    case "agentCalls": return "NUR Agent 对话";
  }
}

