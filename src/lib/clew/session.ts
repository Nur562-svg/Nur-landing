import "server-only";

import { prisma } from "@/lib/prisma";
import { isLoopProfileId, type LearningSession, type LoopProfileId, type LoopStage, type StageState } from "@/types/loop-profile";
import {
  appendUnifiedLearningEvents,
  buildClewSessionCompletedEvent,
  buildClewSessionStartedEvent,
  buildClewStageCompletedEvent,
  buildClewStageEnteredEvent,
} from "@/lib/unified-events";

/**
 * Clew 学习会话服务（ZCODE-M2 Phase 4，Grok Build 会话持久化借鉴）。
 * 服务器持久化（L4 定案）：跨页面、跨设备状态连续；localStorage 只存进行中 session ID。
 * 一个用户在一个知识点上至多一个 active 会话（恢复优先于新建）。
 */

type ClewStudySessionRow = {
  id: string;
  userId: string;
  textbookId: string;
  chapterId: string | null;
  kpId: string | null;
  profileId: string;
  currentStageIndex: number;
  stageStates: unknown;
  status: string;
  startedAt: Date;
  lastActiveAt: Date;
  completedAt: Date | null;
};

function toLearningSession(row: ClewStudySessionRow): LearningSession {
  const stageStates =
    typeof row.stageStates === "object" && row.stageStates !== null
      ? (row.stageStates as LearningSession["stageStates"])
      : {};
  return {
    id: row.id,
    userId: row.userId,
    contentType: "clew-kp",
    contentId: row.kpId ?? row.textbookId,
    profileId: (isLoopProfileId(row.profileId) ? row.profileId : "full-loop") as LoopProfileId,
    currentStageIndex: row.currentStageIndex,
    stageStates,
    startedAt: row.startedAt.toISOString(),
    completedAt: row.completedAt?.toISOString() ?? null,
  };
}

export type ClewSessionServiceResult =
  | { ok: true; session: LearningSession }
  | { ok: false; status: number; code: string; message: string };

/** 创建或恢复会话：同 kpId 已有 active 会话直接恢复（profile 跟随当前分配）。 */
export async function getOrCreateSession(
  userId: string,
  textbookId: string,
  kpId: string,
  profileId: LoopProfileId,
  options?: { chapterId?: string },
): Promise<ClewSessionServiceResult> {
  const existing = await prisma.clewStudySession.findFirst({
    where: { userId, kpId, status: "active" },
    orderBy: { lastActiveAt: "desc" },
  });
  if (existing) {
    // 用户切换过 profile 时，恢复的会话同步到最新分配
    if (existing.profileId !== profileId) {
      const updated = await prisma.clewStudySession.update({
        where: { id: existing.id },
        data: { profileId, lastActiveAt: new Date() },
      });
      return { ok: true, session: toLearningSession(updated) };
    }
    await prisma.clewStudySession.update({
      where: { id: existing.id },
      data: { lastActiveAt: new Date() },
    });
    return { ok: true, session: toLearningSession(existing) };
  }

  const created = await prisma.clewStudySession.create({
    data: {
      userId,
      textbookId,
      chapterId: options?.chapterId ?? null,
      kpId,
      profileId,
      currentStageIndex: 0,
      stageStates: {},
      status: "active",
    },
  });
  const session = toLearningSession(created);
  // 旁路：会话创建事件（恢复路径不追加——started 事件已存在，sourceKey 幂等兜底）
  await appendUnifiedLearningEvents(userId, [buildClewSessionStartedEvent(session)]);
  return { ok: true, session };
}

/** 更新会话环节状态（进入/完成/跳过），并推进 currentStageIndex 指针到最后激活环节。 */
export async function updateSessionStage(
  sessionId: string,
  userId: string,
  stage: string,
  state: StageState,
): Promise<ClewSessionUpdateResult> {
  const session = await prisma.clewStudySession.findFirst({
    where: { id: sessionId, userId, status: "active" },
  });
  if (!session) {
    return { ok: false, status: 404, code: "not-found", message: "会话不存在或已结束。" };
  }

  const stageStates = {
    ...(typeof session.stageStates === "object" && session.stageStates !== null
      ? (session.stageStates as Record<string, StageState>)
      : {}),
    [stage]: state,
  };
  const updated = await prisma.clewStudySession.update({
    where: { id: session.id },
    data: {
      stageStates,
      lastActiveAt: new Date(),
    },
  });
  const view = toLearningSession(updated);
  // 旁路：环节事件（active → stage-entered；completed → stage-completed；
  // skipped 本期 eventType 子集不含 stage-skipped，暂不写——UI 未产出 skipped 状态）
  const events = [];
  if (state.status === "active") {
    events.push(buildClewStageEnteredEvent(view, stage as LoopStage, state.enteredAt));
  } else if (state.status === "completed") {
    events.push(buildClewStageCompletedEvent(view, stage as LoopStage, "completed", state.completedAt));
  }
  if (events.length > 0) {
    await appendUnifiedLearningEvents(userId, events);
  }
  return { ok: true, session: view };
}

export type ClewSessionUpdateResult =
  | { ok: true; session: LearningSession }
  | { ok: false; status: number; code: string; message: string };

/** 完成会话（走完最后一步或用户主动结束）。 */
export async function completeSession(sessionId: string, userId: string): Promise<boolean> {
  // 先读行（updateMany 拿不到行内容，session-completed 事件需要 stageStates 摘要）
  const session = await prisma.clewStudySession.findFirst({
    where: { id: sessionId, userId, status: "active" },
  });
  if (!session) {
    return false;
  }
  const completedAt = new Date();
  await prisma.clewStudySession.update({
    where: { id: session.id },
    data: { status: "completed", completedAt, lastActiveAt: completedAt },
  });
  // 旁路：会话完成事件（payload 为 stageStates 统计摘要）
  await appendUnifiedLearningEvents(
    userId,
    [buildClewSessionCompletedEvent(toLearningSession({ ...session, status: "completed", completedAt }), completedAt.toISOString())],
  );
  return true;
}

/** 放弃会话（用户切换知识点/长时间离开由调用方决定）。 */
export async function abandonSession(sessionId: string, userId: string): Promise<boolean> {
  const result = await prisma.clewStudySession.updateMany({
    where: { id: sessionId, userId, status: "active" },
    data: { status: "abandoned", lastActiveAt: new Date() },
  });
  return result.count > 0;
}

/** 获取用户的学习历史（跨设备连续的回放入口）。 */
export async function getUserSessions(
  userId: string,
  options?: {
    textbookId?: string;
    status?: string;
    limit?: number;
  },
): Promise<LearningSession[]> {
  const sessions = await prisma.clewStudySession.findMany({
    where: {
      userId,
      textbookId: options?.textbookId,
      status: options?.status,
    },
    orderBy: { lastActiveAt: "desc" },
    take: options?.limit ?? 20,
  });
  return sessions.map((row) => toLearningSession(row));
}
