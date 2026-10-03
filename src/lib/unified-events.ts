/**
 * 统一学习事件写入库（ZCODE-M3 Phase 1）。
 * - 纯构造函数（builder）无 Prisma 依赖，可被 node:test 直接测试；
 * - appendUnifiedLearningEvents 手写幂等（SQLite 不支持 skipDuplicates），
 *   整体 try/catch：事件写入是旁路，任何失败不得影响主流程。
 *
 * 字段映射规则（任务书 1.3 表）：
 * | 事件        | contentType | contentId        | stage                | eventType        | sourceKey                                       |
 * | 会话创建    | clew-kp     | kpId             | profile.entryStage   | session-started  | clew-session:{id}:started                       |
 * | 环节进入    | clew-kp     | kpId             | 该环节               | stage-entered    | clew-session:{id}:stage:{stage}:active          |
 * | 环节完成    | clew-kp     | kpId             | 该环节               | stage-completed  | clew-session:{id}:stage:{stage}:{status}        |
 * | 会话完成    | clew-kp     | kpId             | 最后环节             | session-completed| clew-session:{id}:completed                     |
 * | 官方课作答  | official-kp | knowledgePointId | surface 映射         | attempt-confirmed| attempt:{attemptId}                             |
 * | 题库作答    | qb-chapter  | {slug}/{chapter} | practice             | attempt-confirmed| qb-attempt:{qbContentIdentityKey}               |
 */

// 与 payment/service.ts 同一约定：注释标注 server-only（只被服务端 lib 引用），
// 不写 `import "server-only"`，使 node:test 可直接导入做隔离 SQLite 验证。
import { prisma } from "@/lib/prisma";
import { LOOP_PROFILES, type LearningSession, type LoopStage } from "@/types/loop-profile";
import type {
  UnifiedLearningEventInput,
  UnifiedEventPayload,
} from "@/types/unified-learning";

/** 官方课作答面 → LoopStage 映射（writing→assess、case→transfer，其余 → assess）。 */
export function officialSurfaceToStage(surface: string): LoopStage {
  if (surface === "case-reasoning" || surface === "case") return "transfer";
  return "assess";
}

/** 会话事件构造：session-started（stage = profile.entryStage）。 */
export function buildClewSessionStartedEvent(session: LearningSession): UnifiedLearningEventInput {
  const profile = LOOP_PROFILES[session.profileId] ?? LOOP_PROFILES["full-loop"];
  return {
    contentType: "clew-kp",
    contentId: session.contentId,
    profileId: session.profileId,
    stage: profile.entryStage,
    eventType: "session-started",
    payload: { kind: "session" },
    sourceKey: `clew-session:${session.id}:started`,
    timestamp: session.startedAt,
  };
}

/** 会话事件构造：stage-entered（active）。 */
export function buildClewStageEnteredEvent(
  session: LearningSession,
  stage: LoopStage,
  enteredAt: string,
): UnifiedLearningEventInput {
  return {
    contentType: "clew-kp",
    contentId: session.contentId,
    profileId: session.profileId,
    stage,
    eventType: "stage-entered",
    payload: { kind: "stage", enteredAt },
    sourceKey: `clew-session:${session.id}:stage:${stage}:active`,
    timestamp: enteredAt,
  };
}

/** 会话事件构造：stage-completed（status 进 sourceKey，completed/skipped 各自幂等）。 */
export function buildClewStageCompletedEvent(
  session: LearningSession,
  stage: LoopStage,
  status: "completed" | "skipped",
  completedAt: string,
): UnifiedLearningEventInput {
  return {
    contentType: "clew-kp",
    contentId: session.contentId,
    profileId: session.profileId,
    stage,
    eventType: "stage-completed",
    payload: { kind: "stage", completedAt },
    sourceKey: `clew-session:${session.id}:stage:${stage}:${status}`,
    timestamp: completedAt,
  };
}

/** 会话事件构造：session-completed（payload 为 stageStates 统计摘要）。 */
export function buildClewSessionCompletedEvent(
  session: LearningSession,
  completedAt: string,
): UnifiedLearningEventInput {
  const stages = Object.entries(session.stageStates);
  const lastStage = [...stages]
    .filter(([, state]) => state?.status === "active" || state?.status === "completed")
    .sort((a, b) => Date.parse(timestampOf(b[1])) - Date.parse(timestampOf(a[1])))[0]?.[0] as
    | LoopStage
    | undefined;
  const profile = LOOP_PROFILES[session.profileId] ?? LOOP_PROFILES["full-loop"];
  return {
    contentType: "clew-kp",
    contentId: session.contentId,
    profileId: session.profileId,
    stage: lastStage ?? profile.entryStage,
    eventType: "session-completed",
    payload: {
      kind: "session-summary",
      totalStages: profile.stages.length,
      completedStages: stages.filter(([, state]) => state?.status === "completed").length,
      skippedStages: stages.filter(([, state]) => state?.status === "skipped").length,
    },
    sourceKey: `clew-session:${session.id}:completed`,
    timestamp: completedAt,
  };
}

function timestampOf(state: { status: string } | undefined): string {
  if (!state) return "";
  if (state.status === "active" && "enteredAt" in state) return (state as { enteredAt: string }).enteredAt;
  if (state.status === "completed" && "completedAt" in state) return (state as { completedAt: string }).completedAt;
  return "";
}

/** 官方课作答事件构造。 */
export function buildOfficialAttemptEvent(input: {
  knowledgePointId: string;
  attemptId: string;
  taskId: string;
  courseId: string;
  surface: string;
  confirmedAt: string;
}): UnifiedLearningEventInput {
  return {
    contentType: "official-kp",
    contentId: input.knowledgePointId,
    profileId: "full-loop",
    stage: officialSurfaceToStage(input.surface),
    eventType: "attempt-confirmed",
    payload: {
      kind: "attempt",
      attemptId: input.attemptId,
      taskId: input.taskId,
      courseId: input.courseId,
      surface: input.surface,
      confirmedAt: input.confirmedAt,
    },
    sourceKey: `attempt:${input.attemptId}`,
    timestamp: input.confirmedAt,
  };
}

/** 题库作答事件构造。 */
export function buildQbAttemptEvent(input: {
  courseSlug: string;
  chapterSlug: string;
  profileId?: string;
  questionId: string;
  isCorrect: boolean;
  attemptedAt: string;
  qbContentIdentityKey: string;
}): UnifiedLearningEventInput {
  return {
    contentType: "qb-chapter",
    contentId: `${input.courseSlug}/${input.chapterSlug}`,
    profileId: input.profileId ?? "exam-cram",
    stage: "practice",
    eventType: "attempt-confirmed",
    payload: {
      kind: "qb-attempt",
      questionId: input.questionId,
      isCorrect: input.isCorrect,
      attemptedAt: input.attemptedAt,
    },
    sourceKey: `qb-attempt:${input.qbContentIdentityKey}`,
    timestamp: input.attemptedAt,
  };
}

function payloadToJson(payload: UnifiedEventPayload): object {
  return payload as unknown as object;
}

/**
 * 幂等批量写入（手写：SQLite 不支持 skipDuplicates）。
 * 先查已存在的 sourceKey，再只补写缺失项；批内按 sourceKey 去重。
 * 整体 try/catch：失败只记日志，绝不向调用方抛错（旁路契约）。
 */
export async function appendUnifiedLearningEvents(
  userId: string,
  events: readonly UnifiedLearningEventInput[],
): Promise<void> {
  try {
    if (events.length === 0) {
      return;
    }
    // 批内去重（后写胜出无意义，保持首个）
    const bySourceKey = new Map<string, UnifiedLearningEventInput>();
    for (const event of events) {
      if (!bySourceKey.has(event.sourceKey)) {
        bySourceKey.set(event.sourceKey, event);
      }
    }
    const unique = [...bySourceKey.values()];

    const existing = await prisma.unifiedLearningEvent.findMany({
      where: { userId, sourceKey: { in: unique.map((event) => event.sourceKey) } },
      select: { sourceKey: true },
    });
    const existingKeys = new Set(existing.map((row) => row.sourceKey));

    const missing = unique.filter((event) => !existingKeys.has(event.sourceKey));
    if (missing.length === 0) {
      return;
    }

    await prisma.unifiedLearningEvent.createMany({
      data: missing.map((event) => ({
        userId,
        contentType: event.contentType,
        contentId: event.contentId,
        profileId: event.profileId,
        stage: event.stage,
        eventType: event.eventType,
        payload: payloadToJson(event.payload),
        sourceKey: event.sourceKey,
        timestamp: event.timestamp ? new Date(event.timestamp) : new Date(),
      })),
    });
  } catch (error) {
    console.error("[unified-events] 写入失败", error);
  }
}
