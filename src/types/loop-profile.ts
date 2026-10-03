/**
 * 可配置学习闭环（Loop Profile）类型契约（ZCODE-M2 Phase 3）。
 * 真相源：docs/loop-profile-contract-draft.md + docs/RESTRUCTURE_PLAN.md（L1–L5 已定案）。
 *
 * Loop Profile = 学习环节的子集 + 顺序 + 入口配置。
 * 不是每个知识点都走完整六步（学练评诊复迁），而是按内容类型动态选择路径；
 * AI（规则引擎）萃取时建议 profile，用户永远可以改。
 */

/** 学习环节（能力全集）。 */
export type LoopStage =
  | "learn" // 学：lesson 讲义 / Clew 讲义 / 文本阅读
  | "practice" // 练：刷题 / 主观写作 / 病例模拟
  | "assess" // 评：自核清单 / NUR 评分 / 模考判分
  | "diagnose" // 诊：错题归因 / 弱 KP 识别 / 遗漏分析
  | "review" // 复：FSRS 间隔重复 / 即将遗忘提醒 / 错题重做
  | "transfer"; // 迁移：病例推理 / 跨场景应用 / 课题工作坊

export const LOOP_STAGES: readonly LoopStage[] = [
  "learn",
  "practice",
  "assess",
  "diagnose",
  "review",
  "transfer",
];

/** 完成最后一步后的行为。 */
export type LoopExitBehavior =
  | { kind: "loop-back"; targetStage: LoopStage } // 回到某一步循环
  | { kind: "exit-to-shelf" } // 完成即结束
  | { kind: "promote-to"; targetProfileId: string }; // 升级到另一个 profile

/** 闭环配置。 */
export type LoopProfile = {
  id: string;
  /** 显示名，如「概念理解」「考前冲刺」。 */
  name: string;
  description: string;
  /** 有序子集，如 ["learn", "assess", "review"]。 */
  stages: readonly LoopStage[];
  /** 默认入口（学生从哪一步开始）。 */
  entryStage: LoopStage;
  exitBehavior: LoopExitBehavior;
  /** 是否进 FSRS 调度。 */
  fsrsEnabled: boolean;
  /** 是否进错题中心。 */
  wrongQuestionEnabled: boolean;
};

/** 六种预定义 Profile（RESTRUCTURE_PLAN 2.2 定案）。 */
export const LOOP_PROFILES = {
  "concept-mastery": {
    id: "concept-mastery",
    name: "概念理解",
    description: "术语、定义、基础概念的快速掌握",
    stages: ["learn", "assess", "review"],
    entryStage: "learn",
    exitBehavior: { kind: "loop-back", targetStage: "review" },
    fsrsEnabled: true,
    wrongQuestionEnabled: false,
  },
  "skill-application": {
    id: "skill-application",
    name: "技能应用",
    description: "需要动手练习的技能型内容（病例分析、辨证、计算）",
    stages: ["learn", "practice", "assess", "diagnose", "review"],
    entryStage: "learn",
    exitBehavior: { kind: "loop-back", targetStage: "review" },
    fsrsEnabled: true,
    wrongQuestionEnabled: true,
  },
  "exam-cram": {
    id: "exam-cram",
    name: "考前冲刺",
    description: "以练带学，快速覆盖考点",
    stages: ["practice", "assess", "diagnose", "review"],
    entryStage: "practice",
    exitBehavior: { kind: "exit-to-shelf" },
    fsrsEnabled: true,
    wrongQuestionEnabled: true,
  },
  "long-term-retention": {
    id: "long-term-retention",
    name: "长期积累",
    description: "经典条文、方歌、需要长期记忆的内容",
    stages: ["learn", "review", "transfer"],
    entryStage: "learn",
    exitBehavior: { kind: "loop-back", targetStage: "review" },
    fsrsEnabled: true,
    wrongQuestionEnabled: false,
  },
  exploration: {
    id: "exploration",
    name: "探索研究",
    description: "课题导向的自主学习",
    stages: ["learn", "transfer", "assess"],
    entryStage: "transfer",
    exitBehavior: { kind: "exit-to-shelf" },
    fsrsEnabled: false,
    wrongQuestionEnabled: false,
  },
  "full-loop": {
    id: "full-loop",
    name: "完整闭环",
    description: "六环节全走，适合核心知识点",
    stages: ["learn", "practice", "assess", "diagnose", "review", "transfer"],
    entryStage: "learn",
    exitBehavior: { kind: "loop-back", targetStage: "review" },
    fsrsEnabled: true,
    wrongQuestionEnabled: true,
  },
} as const satisfies Record<string, LoopProfile>;

export type LoopProfileId = keyof typeof LOOP_PROFILES;

/** Profile 分配（知识点级；AI 建议 / 用户选择 / 默认）。 */
export type LoopProfileAssignment = {
  contentType: "official-kp" | "clew-kp" | "qb-chapter";
  contentId: string;
  profileId: LoopProfileId;
  assignedBy: "ai-suggested" | "user-selected" | "default";
  assignedAt: string;
};

/** 自核清单单条结果（assess 环节 StageResult 引用）。 */
export type CriterionResult = {
  criterionId: string;
  passed: boolean;
  note?: string;
};

/** 学习会话：一次学习会话 = 按 profile 走一遍（或部分）stages。 */
export type LearningSession = {
  id: string;
  userId: string;
  contentType: LoopProfileAssignment["contentType"];
  contentId: string;
  profileId: LoopProfileId;
  /** 当前在 stages 数组中的位置。 */
  currentStageIndex: number;
  stageStates: Partial<Record<LoopStage, StageState>>;
  startedAt: string;
  completedAt: string | null;
};

export type StageState =
  | { status: "pending" }
  | { status: "active"; enteredAt: string }
  | { status: "completed"; completedAt: string; result?: StageResult }
  | { status: "skipped"; reason: string };

export type StageResult =
  | { kind: "lesson-read"; durationMinutes: number }
  | { kind: "practice-attempt"; attemptId: string; score: number | null }
  | { kind: "assessment"; selfCheckResults: CriterionResult[] }
  | { kind: "diagnosis"; weakPoints: string[] }
  | { kind: "review"; fsrsRating: "again" | "hard" | "good"; nextDueAt: string }
  | { kind: "transfer"; caseId: string; completedStages: string[] };

/** 校验任意字符串是否为已注册的 LoopProfileId（DB 读取的不可信值用）。 */
export function isLoopProfileId(value: string): value is LoopProfileId {
  return Object.prototype.hasOwnProperty.call(LOOP_PROFILES, value);
}

/** 读取已注册 profile；未注册值回退 full-loop（不伪造，调用方应另行提示）。 */
export function resolveLoopProfile(value: string): LoopProfile {
  return isLoopProfileId(value) ? LOOP_PROFILES[value] : LOOP_PROFILES["full-loop"];
}
