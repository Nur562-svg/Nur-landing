/**
 * 统一学习事件契约（ZCODE-M3 Phase 1）。
 * 真相源：docs/RESTRUCTURE_PLAN.md §三、docs/loop-profile-contract-draft.md §统一学习者状态层。
 * 只声明真正写入的子集；契约草案中 fsrs-rated 等成员留给 M4+，不要声明不写的成员。
 * （wrong-question-added 自 2026-10-02 体验补丁起写入：Clew 自测标记「还需看」的题目。）
 */

import type { LoopStage } from "./loop-profile";

export type UnifiedContentType = "official-kp" | "clew-kp" | "qb-chapter";

/** 本期写入的事件类型（子集）。 */
export type LearningEventType =
  | "session-started"
  | "stage-entered"
  | "stage-completed"
  | "session-completed"
  | "attempt-confirmed"
  | "wrong-question-added";

export type UnifiedEventPayload =
  | { kind: "session" }
  | { kind: "stage"; enteredAt?: string; completedAt?: string }
  | { kind: "session-summary"; totalStages: number; completedStages: number; skippedStages: number }
  | {
      kind: "attempt";
      attemptId: string;
      taskId: string;
      courseId: string;
      surface: string;
      confirmedAt: string;
    }
  | { kind: "qb-attempt"; questionId: string; isCorrect: boolean; attemptedAt: string }
  | {
      /** Clew 自测中标记「不会」的问题（进入后续错题/复习聚合的数据基础）。 */
      kind: "wrong-question";
      questionId: string;
      source: "clew";
    };

/** 写入输入（builder 产出 / 同步服务构造）。 */
export type UnifiedLearningEventInput = {
  contentType: UnifiedContentType;
  contentId: string;
  profileId: string;
  stage: LoopStage;
  eventType: LearningEventType;
  payload: UnifiedEventPayload;
  sourceKey: string;
  /** 业务时间（ISO）；缺省 = now。 */
  timestamp?: string;
};

/** 读取视图（DB 行 → 对外）。 */
export type UnifiedLearningEventView = UnifiedLearningEventInput & {
  id: string;
  userId: string;
  timestamp: string;
};

/* ---------------- ZCODE-M3 Phase 2：统一读取层展示契约 ---------------- */

/** 「学习动态」展示项（服务端解析好后传入客户端组件，字段全部可序列化）。 */
export type UnifiedFeedItem = {
  id: string;
  contentType: UnifiedContentType;
  /** 来源小标签：官方课 / 题库 / Clew。 */
  sourceLabel: "官方课" | "题库" | "Clew";
  /** 内容标题（KP / 章节）；已删除内容为「已删除的内容」。 */
  title: string;
  /** 次级归属（课程名 / 教材名）。 */
  detail: string;
  /** 事件文案（完成了一次练习 / 环节「学」…）。 */
  summary: string;
  /** 事件时间（ISO）。 */
  at: string;
  /** 深链；内容已删除时为 null（整行不渲染为链接）。 */
  href: string | null;
};

/** 「继续上次学习」目标（最近一个 active Clew 会话）。 */
export type UnifiedContinueTarget = {
  href: string;
  kpTitle: string;
  textbookTitle: string;
  /** 当前应处环节显示名（如「学」）。 */
  stageLabel: string;
};
