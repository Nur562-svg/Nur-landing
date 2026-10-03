# 可配置学习闭环（Loop Profile）契约草案

日期：2026-09-30。状态：讨论稿，待用户确认。

## 背景

用户明确反馈：「学习闭环不能设计的这么死板，因为不是所有的课程都需要『学 → 练 → 评 → 诊 → 复 → 迁移』，但是我们也不能完全移除这个。」

现有系统的问题：
- 官方课六环节（lesson → 写作 → 病例 → 错题 → FSRS → 迁移）是硬编码的流水线
- Hi doc 只有「学」和「迁移」，中间四环节缺失
- 题库只有「练」和「评」，没有「学」和「复」
- 三条线之间没有统一的状态模型

## 核心设计

**Loop Profile = 学习环节的子集 + 顺序 + 入口配置**

不是每个知识点都走完整六步，而是根据内容类型、学习阶段、学生目标动态选择路径。

## 类型定义（TypeScript）

```typescript
// ─── 学习环节（能力全集）─────────────────────────────
export type LoopStage =
  | "learn"      // 学：lesson 讲义 / Hi doc 讲义 / 文本阅读
  | "practice"   // 练：刷题 / 主观写作 / 病例模拟
  | "assess"     // 评：自核清单 / NUR 评分 / 模考判分
  | "diagnose"   // 诊：错题归因 / 弱 KP 识别 / 遗漏分析
  | "review"     // 复：FSRS 间隔重复 / 即将遗忘提醒 / 错题重做
  | "transfer";  // 迁移：病例推理 / 跨场景应用 / 课题工作坊

// ─── 闭环配置（Loop Profile）─────────────────────────
export type LoopProfile = {
  id: string;
  name: string;                    // 显示名，如「概念理解」「考前冲刺」
  description: string;
  stages: readonly LoopStage[];    // 有序子集，如 ["learn", "assess", "review"]
  entryStage: LoopStage;           // 默认入口（学生从哪一步开始）
  exitBehavior: LoopExitBehavior;  // 完成最后一步后做什么
  fsrsEnabled: boolean;            // 是否进 FSRS 调度
  wrongQuestionEnabled: boolean;   // 是否进错题中心
};

export type LoopExitBehavior =
  | { kind: "loop-back"; targetStage: LoopStage }   // 回到某一步循环
  | { kind: "exit-to-shelf" }                       // 完成即结束
  | { kind: "promote-to"; targetProfileId: string }; // 升级到另一个 profile

// ─── 预定义 Profile ─────────────────────────────────
export const LOOP_PROFILES: Record<string, LoopProfile> = {
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
  "exploration": {
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
} as const;

export type LoopProfileId = keyof typeof LOOP_PROFILES;

// ─── 内容声明 ───────────────────────────────────────
// 每个知识点/教材章节声明自己的 loop profile
// AI 萃取时自动建议，用户可修改

export type LoopProfileAssignment = {
  contentType: "official-kp" | "hidoc-kp" | "qb-chapter";
  contentId: string;               // kpId / chapterId
  profileId: LoopProfileId;
  assignedBy: "ai-suggested" | "user-selected" | "default";
  assignedAt: string;
};

// ─── 学习会话（Session）────────────────────────────
// 一次学习会话 = 按 profile 走一遍（或部分）stages

export type LearningSession = {
  id: string;
  userId: string;
  contentType: LoopProfileAssignment["contentType"];
  contentId: string;
  profileId: LoopProfileId;
  currentStageIndex: number;       // 当前在 stages 数组中的位置
  stageStates: Record<LoopStage, StageState>;
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
  | { kind: "transfer"; caseId: string; completedStages: CaseReasoningStage[] };

// ─── 与现有契约的映射 ───────────────────────────────

// 官方课 KnowledgePointDefinition 扩展
export type KnowledgePointDefinitionWithLoop = KnowledgePointDefinition & {
  loopProfileId: LoopProfileId;    // 默认 "full-loop"（保持现有行为）
};

// Hi doc HiDocKnowledgePointView 扩展
export type HiDocKnowledgePointViewWithLoop = HiDocKnowledgePointView & {
  loopProfileId: LoopProfileId;    // AI 萃取时建议，默认 "concept-mastery"
};

// 题库章节扩展
export type QuestionBankChapterWithLoop = {
  chapterId: string;
  loopProfileId: LoopProfileId;    // 默认 "exam-cram"
};

// ─── 统一学习者状态层（跨 profile）──────────────────
// 不管走哪个 profile，所有学习行为都写入同一个状态层

export type UnifiedLearningEvent = {
  version: 1;
  id: string;
  userId: string;
  timestamp: string;
  contentType: LoopProfileAssignment["contentType"];
  contentId: string;
  profileId: LoopProfileId;
  stage: LoopStage;
  eventType: LearningEventType;
  payload: LearningEventPayload;
};

export type LearningEventType =
  | "stage-entered"
  | "stage-completed"
  | "stage-skipped"
  | "session-started"
  | "session-completed"
  | "attempt-confirmed"
  | "fsrs-rated"
  | "wrong-question-added"
  | "review-task-proposed"
  | "review-task-accepted"
  | "review-task-completed";

export type LearningEventPayload =
  | { kind: "attempt"; attempt: LearnerAttemptRecord }
  | { kind: "fsrs"; criterionId: string; rating: "again" | "hard" | "good"; nextDueAt: string }
  | { kind: "wrong-question"; questionId: string; source: "official" | "hidoc" | "qb" }
  | { kind: "review-task"; task: ReviewPlanTask }
  | { kind: "stage-duration"; stage: LoopStage; durationMinutes: number }
  | { kind: "session-summary"; totalStages: number; completedStages: number; skippedStages: number };

// ─── FSRS 扩展：跨内容类型调度 ──────────────────────
// 现有 FSRS 只挂 criterionId，需要扩展为挂 (contentType, contentId, criterionId)

export type UnifiedFsrsCriterionState = FsrsCriterionState & {
  contentType: LoopProfileAssignment["contentType"];
  contentId: string;
  criterionId: string;             // 保持现有 criterion 粒度
};

export type UnifiedFsrsLearningState = {
  version: 3;                      // 从 v2 迁移
  criteria: Record<string, UnifiedFsrsCriterionState>;  // key = `${contentType}:${contentId}:${criterionId}`
};

// ─── 错题中心扩展：跨来源聚合 ───────────────────────

export type UnifiedWrongQuestion = {
  id: string;
  userId: string;
  contentType: LoopProfileAssignment["contentType"];
  contentId: string;
  questionId: string;
  questionKind: QuestionKind;
  sourceLabel: string;             // 「官方课 · 中诊」/「Hi doc · 生理学第3章」/「题库 · 诊断学」
  wrongAt: string;
  lastAttemptId: string;
  resolvedAt: string | null;
  redoHref: string;                // 重做入口（按内容类型分流）
};

// ─── Agent 上下文扩展：全局记忆 ─────────────────────

export type AgentGlobalContext = {
  userId: string;
  currentSession: LearningSession | null;
  recentEvents: readonly UnifiedLearningEvent[];      // 最近 N 条
  dueReviews: readonly UnifiedFsrsCriterionState[];   // 今日到期
  activeWrongQuestions: readonly UnifiedWrongQuestion[]; // 未解决
  weeklyPlan: WeeklyPlanSummary | null;
};

export type WeeklyPlanSummary = {
  weekStart: string;
  totalPlanned: number;
  completed: number;
  weakKnowledgePoints: readonly string[];
  suggestedFocus: readonly string[];
};

// ─── 默认 Profile 分配规则 ──────────────────────────

export function suggestLoopProfile(content: {
  type: LoopProfileAssignment["contentType"];
  hasLesson: boolean;
  hasPractice: boolean;
  hasCase: boolean;
  questionKinds: readonly QuestionKind[];
  estimatedDurationMinutes: number;
}): LoopProfileId {
  // 规则引擎，不是 AI
  if (content.type === "qb-chapter") return "exam-cram";
  if (!content.hasLesson) return "exam-cram";
  if (content.hasCase) return "full-loop";
  if (content.hasPractice && content.questionKinds.includes("case")) return "skill-application";
  if (content.estimatedDurationMinutes <= 10) return "concept-mastery";
  if (content.questionKinds.every(k => k === "term" || k === "fill")) return "long-term-retention";
  return "skill-application";
}

// ─── 与现有 Hi doc 八步的映射 ───────────────────────
// Hi doc 的八步不是 LoopStage，而是「教材处理流水线」
// 处理完成后，每个萃取的 KP 获得一个 LoopProfile，进入学习闭环

export const HIDOC_STEP_TO_LOOP_STAGE: Record<HiDocStepId, LoopStage | null> = {
  upload: null,        // 处理阶段，不是学习环节
  toc: null,
  revise: null,
  extract: null,
  lesson: "learn",     // 讲义生成 = 学
  marks: "learn",      // 划重点 = 学的一部分
  note: "transfer",    // 学霸笔记 = 迁移（汇总输出）
  workshop: "transfer", // 课题工作坊 = 迁移
};
```

## 关键决策点（待确认）

1. **Profile 粒度**：是挂在知识点级（每个 KP 一个 profile）还是章节级（一章一个 profile）？
   - 建议：知识点级，更灵活。章节级太粗。

2. **AI 建议 profile 的时机**：Hi doc 萃取时自动建议，还是用户首次学习时选择？
   - 建议：萃取时 AI 建议 + 用户可改。降低决策负担。

3. **现有官方课六 loop 的 profile**：全部默认 `full-loop`，还是按内容类型分配？
   - 建议：保持 `full-loop` 作为默认，不改现有行为。新内容按规则分配。

4. **Session 持久化**：学习会话状态存 localStorage 还是服务器？
   - 建议：服务器（Prisma `LearningSession` 表），跨设备同步。localStorage 只存当前进行中的 session ID。

5. **与现有 `LearningRouteId` 的关系**：`understand | express | apply` 是否保留？
   - 建议：保留作为「学习路线」的粗粒度分类，LoopProfile 是细粒度执行配置。`LearningRouteId` 可以映射到一组 LoopProfile。

## 实施路径（如果确认）

```
Phase 1: 类型契约 + 默认 Profile 注册表
  - 新增 src/types/loop-profile.ts
  - 新增 src/lib/loop-profile.ts（suggestLoopProfile + 默认分配）
  - 不改现有行为，只加类型

Phase 2: Hi doc 集成
  - HiDocKnowledgePointView 增加 loopProfileId 字段
  - 萃取完成后 AI 建议 profile，用户可改
  - 学习页按 profile 渲染对应环节

Phase 3: 统一状态层
  - UnifiedLearningEvent 表（Prisma）
  - 现有 recordConfirmedAttempt 同时写 UnifiedLearningEvent
  - 错题中心聚合三个来源

Phase 4: 官方课 + 题库接入
  - KnowledgePointDefinition 增加 loopProfileId
  - 题库章节默认 exam-cram
  - FSRS 扩展为跨内容类型

Phase 5: Agent 全局上下文
  - Agent 请求携带 AgentGlobalContext
  - 跨页面上下文保持（dock 全局化）
```

## 风险与边界

- **不破坏现有行为**：所有现有内容默认 `full-loop`，六环节照旧。新 profile 是增量，不是替代。
- **AI 建议可覆盖**：用户永远可以手动改 profile，AI 建议只是默认值。
- **FSRS 不强制**：`fsrsEnabled: false` 的 profile（如 exploration）不进复习调度。
- **错题中心不膨胀**：只有 `wrongQuestionEnabled: true` 的 profile 产生的错题才进中心。
