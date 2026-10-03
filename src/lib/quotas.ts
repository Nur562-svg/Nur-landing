import type { MembershipTier } from "@/types/auth";

/**
 * M3: 会员配额定义 + 使用记录（浏览器端 + 共享类型/纯函数）
 * 服务端函数（依赖 Prisma）见 quotas-server.ts，避免客户端 bundle 引入 Prisma。
 * 免费版合理限制；basic 继承原 lite 权益；max 为最高档。Demo 阶段使用 client bump + DB 基础数据。
 * 不涉及真实支付。
 */

export type QuotaResource =
  | "privateMaterials"   // 私人材料准入（已同意的 admission）
  | "courseBuilds"       // Course Builder 使用（含私人分析）
  | "mockExams"          // 模考会话
  | "agentCalls"         // Agent 调用
  | "clewParses"        // Clew 目录解析（模型辅助识别，M2 起）
  | "clewExtracts"      // Clew 知识点萃取（按章模型调用，M3 起）
  | "clewLessons"       // Clew 知识点讲义生成（按知识点模型调用，M4 起）
  | "clewChats"         // Clew 讲解对话（按轮模型调用，M4 起）
  | "clewNotes"         // Clew 学霸笔记生成（按章模型调用，M5 起）
  | "clewWorkshopChats"; // Clew 课题工作坊答疑（按轮模型调用，M6 起；检索零命中不计）

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
    clewParses: 3,
    clewExtracts: 5,
    clewLessons: 5,
    clewChats: 50,
    clewNotes: 3,
    clewWorkshopChats: 30,
  },
  basic: {
    privateMaterials: 20,
    courseBuilds: 10,
    mockExams: 30,
    agentCalls: 200,
    clewParses: 10,
    clewExtracts: 20,
    clewLessons: 20,
    clewChats: 200,
    clewNotes: 10,
    clewWorkshopChats: 200,
  },
  pro: {
    privateMaterials: "unlimited",
    courseBuilds: "unlimited",
    mockExams: "unlimited",
    agentCalls: "unlimited",
    clewParses: "unlimited",
    clewExtracts: "unlimited",
    clewLessons: "unlimited",
    clewChats: "unlimited",
    clewNotes: "unlimited",
    clewWorkshopChats: "unlimited",
  },
  max: {
    privateMaterials: "unlimited",
    courseBuilds: "unlimited",
    mockExams: "unlimited",
    agentCalls: "unlimited",
    clewParses: "unlimited",
    clewExtracts: "unlimited",
    clewLessons: "unlimited",
    clewChats: "unlimited",
    clewNotes: "unlimited",
    clewWorkshopChats: "unlimited",
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
    case "agentCalls": return "Ariadne Agent 对话";
    case "clewParses": return "Clew 目录解析（模型）";
    case "clewExtracts": return "Clew 知识点萃取（模型）";
    case "clewLessons": return "Clew 讲义生成（模型）";
    case "clewChats": return "Clew 讲解对话（模型）";
    case "clewNotes": return "Clew 学霸笔记（模型）";
    case "clewWorkshopChats": return "Clew 课题工作坊答疑（模型）";
  }
}

