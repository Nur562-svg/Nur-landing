/**
 * Loop Profile 领域逻辑（ZCODE-M2 Phase 3，纯函数可测试）。
 * 建议规则是确定性规则引擎（不是 AI 模型调用）：萃取时自动建议，用户永远可以改。
 * 契约：docs/loop-profile-contract-draft.md（L1 知识点级 / L2 萃取时建议 / L3 官方课保持 full-loop）。
 */

import {
  LOOP_PROFILES,
  isLoopProfileId,
  type LoopProfile,
  type LoopProfileAssignment,
  type LoopProfileId,
  type LoopStage,
  type LearningSession,
} from "@/types/loop-profile";

/** 建议 Profile 的内容特征。 */
export type LoopProfileSuggestionInput = {
  type: LoopProfileAssignment["contentType"];
  title: string;
  description: string;
  hasLesson: boolean;
  hasPractice: boolean;
  hasCase: boolean;
  questionKinds: readonly string[];
  estimatedDurationMinutes: number;
};

/**
 * 规则引擎：按内容特征建议 profile（RESTRUCTURE_PLAN 2.5 定案顺序）。
 * 规则顺序即优先级；输出永远落在六种预定义 profile 之一。
 */
export function suggestLoopProfile(content: LoopProfileSuggestionInput): LoopProfileId {
  if (content.type === "qb-chapter") return "exam-cram";
  if (!content.hasLesson) return "exam-cram";
  if (content.hasCase) return "full-loop";
  if (content.hasPractice && content.questionKinds.includes("case")) return "skill-application";
  if (content.estimatedDurationMinutes <= 10) return "concept-mastery";
  // 「纯术语/填空」指确有题型且全部为 term/fill；空题型不落入此分支（避免 every 空真）
  if (content.questionKinds.length > 0 && content.questionKinds.every((kind) => kind === "term" || kind === "fill")) {
    return "long-term-retention";
  }
  return "skill-application";
}

/** 获取 Profile 显示信息（名称 / 描述 / 阶段名列表）。 */
export function getLoopProfileDisplay(profileId: LoopProfileId): {
  name: string;
  description: string;
  stageNames: string[];
} {
  const profile = LOOP_PROFILES[profileId];
  return {
    name: profile.name,
    description: profile.description,
    stageNames: profile.stages.map((stage) => LOOP_STAGE_DISPLAY[stage].name),
  };
}

/** 环节显示映射（Lucide 细线图标在组件层引用；这里保持纯文本）。 */
export const LOOP_STAGE_DISPLAY: Record<LoopStage, { name: string; hint: string }> = {
  learn: { name: "学", hint: "讲义阅读与理解" },
  practice: { name: "练", hint: "刷题 / 写作 / 病例模拟" },
  assess: { name: "评", hint: "自核清单与评分" },
  diagnose: { name: "诊", hint: "错题归因与弱项识别" },
  review: { name: "复", hint: "FSRS 间隔重复" },
  transfer: { name: "迁移", hint: "跨场景应用与课题工作坊" },
};

/** 全部可选 profile（切换下拉用），保持注册顺序。 */
export function listLoopProfiles(): LoopProfile[] {
  return Object.values(LOOP_PROFILES);
}

export type CanSwitchProfileResult = { allowed: boolean; reason?: string };

/**
 * 验证 Profile 切换。
 * 规则：进行中的会话若已有「已完成/进行中」的环节不在新 profile 的 stages 里，
 * 切换会孤立这部分进度 → 拒绝并说明；其余情况允许（AI 建议只是默认，用户永远可改）。
 */
export function canSwitchProfile(
  _currentProfileId: LoopProfileId,
  newProfileId: LoopProfileId,
  sessionState?: LearningSession,
): CanSwitchProfileResult {
  const target = LOOP_PROFILES[newProfileId];
  const targetStages = new Set<LoopStage>(target.stages);
  if (sessionState) {
    const orphanStages = (Object.keys(sessionState.stageStates) as LoopStage[]).filter((stage) => {
      const state = sessionState.stageStates[stage];
      return (
        targetStages.has(stage) === false
        && (state?.status === "completed" || state?.status === "active")
      );
    });
    if (orphanStages.length > 0) {
      const names = orphanStages.map((stage) => LOOP_STAGE_DISPLAY[stage].name).join("、");
      return {
        allowed: false,
        reason: `当前会话在「${names}」环节已有进度，切换到「${target.name}」会丢失这部分记录。请先完成或结束当前会话。`,
      };
    }
  }
  return { allowed: true };
}

/** 任意字符串 → 合法 profileId（非法值回退 full-loop 并标注 fallback）。 */
export function coerceLoopProfileId(value: string): { profileId: LoopProfileId; fallback: boolean } {
  return isLoopProfileId(value)
    ? { profileId: value, fallback: false }
    : { profileId: "full-loop", fallback: true };
}
