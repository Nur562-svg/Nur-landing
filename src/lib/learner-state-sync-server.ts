/**
 * M2: 学习状态云同步服务（server-only）
 * - 复用现有 contracts（types/* , learning-memory parsers, fsrs）
 * - 首次登录时支持 localStorage → server 上传合并
 * - 私人材料准入记录同步需独立 consent（MaterialAdmissionSyncConsent）
 * - 所有写入必须有明确 userId（来自 M1 JWT session）
 */

import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import type {
  LearnerAttemptRecord,
  FsrsCriterionState,
  LearningMemoryState,
} from "@/types/learning";
import type { QBAttemptRecord, QBFavoriteStore } from "@/types/question-bank";
import type { MockExamSession } from "@/types/mock-exam";
import { parseLearningMemoryJson } from "./learning-memory";
import { getAdmissionSyncConsents } from "./material-admission";

function toJsonValue<T>(v: T): Prisma.InputJsonValue {
  return v as unknown as Prisma.InputJsonValue;
}

// 服务器端记录 confirmed attempt（接受 domain types, 内部转 JSON）
export async function recordConfirmedAttemptServer(
  userId: string,
  input: {
    courseId: string;
    courseVersionId?: string;
    offeringId?: string;
    knowledgePointId: string;
    surface: "subjective-writing" | "case-reasoning";
    taskId: string;
    segmentId?: string | null;
    confirmedText: string;
    criterionResults: readonly import("@/types/learning").LearnerAttemptCriterionResult[];
    answerConfidence: string;
    scoringStandard?: { id: string; version: string; authority: string };
  }
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const attempt = await prisma.learnerAttempt.create({
      data: {
        userId,
        courseId: input.courseId,
        courseVersionId: input.courseVersionId,
        offeringId: input.offeringId,
        knowledgePointId: input.knowledgePointId,
        surface: input.surface,
        taskId: input.taskId,
        segmentId: input.segmentId ?? null,
        confirmedText: input.confirmedText.slice(0, 12000),
        criterionResults: toJsonValue(input.criterionResults),
        answerConfidence: input.answerConfidence,
        scoringStandard: input.scoringStandard ? toJsonValue(input.scoringStandard) : undefined,
      },
    });
    return { ok: true, id: attempt.id };
  } catch {
    return { ok: false, error: "persist-failed" };
  }
}

// FSRS 状态 upsert（按 criterionId）。
// 时间戳守卫：仅当传入的 lastReviewAt 不早于已存值时才覆盖，
// 保留「最近一次复习者胜」而不是「最近上传者胜」。
// 这让另一台设备的更新值能在本设备上传后存活到下一次下载合并，
// 是客户端检测「双方都改过」冲突的必要前提。
export async function upsertFsrsStateServer(
  userId: string,
  criterionId: string,
  state: FsrsCriterionState
): Promise<void> {
  const incomingTime = state.lastReviewAt ? new Date(state.lastReviewAt).getTime() : 0;
  const existing = await prisma.learnerFsrsState.findUnique({
    where: { userId_criterionId: { userId, criterionId } },
    select: { lastReviewAt: true },
  });
  if (existing) {
    const existingTime = existing.lastReviewAt ? existing.lastReviewAt.getTime() : 0;
    if (incomingTime < existingTime) {
      return; // 服务端已有更新的复习记录，保留
    }
  }
  await prisma.learnerFsrsState.upsert({
    where: { userId_criterionId: { userId, criterionId } },
    create: {
      userId,
      criterionId,
      state: state.state,
      difficulty: state.difficulty,
      stability: state.stability,
      reps: state.reps,
      lapses: state.lapses,
      lastReviewAt: state.lastReviewAt ? new Date(state.lastReviewAt) : null,
    },
    update: {
      state: state.state,
      difficulty: state.difficulty,
      stability: state.stability,
      reps: state.reps,
      lapses: state.lapses,
      lastReviewAt: state.lastReviewAt ? new Date(state.lastReviewAt) : null,
      updatedAt: new Date(),
    },
  });
}

// 题库 attempt（追加）
export async function addQbAttemptServer(userId: string, record: QBAttemptRecord): Promise<void> {
  await prisma.qbAttempt.create({
    data: {
      userId,
      questionId: record.questionId,
      selectedIndex: record.selectedIndex,
      isCorrect: record.isCorrect,
      attemptedAt: new Date(record.attemptedAt),
    },
  });
}

// 题库收藏 toggle（幂等）
export async function setQbFavoriteServer(userId: string, questionId: string, isFav: boolean): Promise<void> {
  if (isFav) {
    await prisma.qbFavorite.upsert({
      where: { userId_questionId: { userId, questionId } },
      create: { userId, questionId },
      update: {},
    });
  } else {
    await prisma.qbFavorite.deleteMany({
      where: { userId, questionId },
    });
  }
}

// 模考会话持久化
export async function saveMockExamSessionServer(userId: string, session: MockExamSession): Promise<void> {
  const scoreValue = (session as { score?: unknown }).score;
  await prisma.mockExamSession.upsert({
    where: { sessionId: session.sessionId },
    create: {
      userId,
      sessionId: session.sessionId,
      courseId: session.courseId,
      startedAt: new Date(session.startedAt),
      completedAt: session.completedAt ? new Date(session.completedAt) : null,
      answers: toJsonValue(session.answers),
      score: scoreValue != null ? toJsonValue(scoreValue) : undefined,
    },
    update: {
      completedAt: session.completedAt ? new Date(session.completedAt) : null,
      answers: toJsonValue(session.answers),
      score: scoreValue != null ? toJsonValue(scoreValue) : undefined,
    },
  });
}

// 私人材料准入云同步同意（单独 gate）
export async function setAdmissionSyncConsent(
  userId: string,
  admissionRecordId: string,
  consent: boolean
): Promise<void> {
  await prisma.materialAdmissionSyncConsent.upsert({
    where: { userId_admissionRecordId: { userId, admissionRecordId } },
    create: {
      userId,
      admissionRecordId,
      consentGiven: consent,
      consentedAt: consent ? new Date() : null,
    },
    update: {
      consentGiven: consent,
      consentedAt: consent ? new Date() : null,
      updatedAt: new Date(),
    },
  });
}

// 核心合并入口：首次登录时 local → server
export async function mergeLocalStateOnLogin(
  userId: string,
  localMemoryJson: string | null,
  localQbAttempts: Record<string, QBAttemptRecord[]> | null,
  localQbFavorites: Record<string, boolean> | null,
  localMockSessions: unknown[] | null
): Promise<{ merged: boolean; errors: string[] }> {
  const errors: string[] = [];

  // learning memory + FSRS
  if (localMemoryJson) {
    try {
      const mem = parseLearningMemoryJson(localMemoryJson);
      if (mem) {
        for (const a of mem.attempts) {
          await recordConfirmedAttemptServer(userId, {
            courseId: a.courseId,
            courseVersionId: a.courseVersionId,
            offeringId: a.offeringId,
            knowledgePointId: a.knowledgePointId,
            surface: a.surface,
            taskId: a.taskId,
            segmentId: a.segmentId,
            confirmedText: a.confirmedText,
            criterionResults: a.criterionResults,
            answerConfidence: a.answerConfidence,
            scoringStandard: a.scoringStandard,
          });
        }
        if (mem.fsrsState?.criteria) {
          for (const [critId, fs] of Object.entries(mem.fsrsState.criteria)) {
            await upsertFsrsStateServer(userId, critId, fs);
          }
        }
      }
    } catch {
      errors.push("memory-merge-failed");
    }
  }

  // QB
  if (localQbAttempts) {
    try {
      for (const [, recs] of Object.entries(localQbAttempts)) {
        if (Array.isArray(recs)) {
          for (const r of recs) {
            await addQbAttemptServer(userId, r);
          }
        }
      }
    } catch {
      errors.push("qb-attempt-merge-failed");
    }
  }
  if (localQbFavorites) {
    try {
      for (const [qid, fav] of Object.entries(localQbFavorites)) {
        await setQbFavoriteServer(userId, qid, !!fav);
      }
    } catch {
      errors.push("qb-fav-merge-failed");
    }
  }

  // Mock
  if (Array.isArray(localMockSessions)) {
    try {
      for (const s of localMockSessions as MockExamSession[]) {
        await saveMockExamSessionServer(userId, s);
      }
    } catch {
      errors.push("mock-merge-failed");
    }
  }

  return { merged: errors.length === 0, errors };
}

// === Phase 2: Server fetch for download/merge ===
async function fetchUserAttempts(userId: string): Promise<LearnerAttemptRecord[]> {
  const rows = await prisma.learnerAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  return rows.map((r) => ({
    version: 1,
    id: r.id,
    courseId: r.courseId,
    courseVersionId: r.courseVersionId ?? "",
    offeringId: r.offeringId ?? "",
    knowledgePointId: r.knowledgePointId,
    surface: r.surface as import("@/types/learning").LearningAttemptSurface,
    taskId: r.taskId,
    segmentId: r.segmentId ?? null,
    confirmedText: r.confirmedText,
    confirmedAt: r.createdAt.toISOString(),
    scoringStandard: (r.scoringStandard as unknown) as { id: string; version: string; authority: import("@/types/learning").ScoringAuthority } ?? { id: "", version: "", authority: "nur-platform" as import("@/types/learning").ScoringAuthority },
    criterionResults: (r.criterionResults as unknown) as readonly import("@/types/learning").LearnerAttemptCriterionResult[] ?? [],
    answerConfidence: r.answerConfidence as import("@/types/learning").AssessmentAnswerConfidence,
  }));
}

async function fetchUserFsrs(userId: string): Promise<import("@/types/learning").FsrsLearningState | null> {
  const rows = await prisma.learnerFsrsState.findMany({ where: { userId } });
  if (!rows.length) return null;
  const criteria: Record<string, import("@/types/learning").FsrsCriterionState> = {};
  for (const r of rows) {
    criteria[r.criterionId] = {
      state: r.state as import("@/types/learning").FsrsCriterionState["state"],
      difficulty: r.difficulty,
      stability: r.stability,
      reps: r.reps,
      lapses: r.lapses,
      lastReviewAt: r.lastReviewAt ? r.lastReviewAt.toISOString() : null,
    };
  }
  return { version: 2, criteria };
}

async function fetchUserQbAttempts(userId: string): Promise<Record<string, import("@/types/question-bank").QBAttemptRecord[]>> {
  const rows = await prisma.qbAttempt.findMany({ where: { userId }, orderBy: { attemptedAt: "desc" }, take: 500 });
  const grouped: Record<string, import("@/types/question-bank").QBAttemptRecord[]> = {};
  for (const r of rows) {
    if (!grouped[r.questionId]) grouped[r.questionId] = [];
    grouped[r.questionId].push({
      questionId: r.questionId,
      selectedIndex: r.selectedIndex,
      isCorrect: r.isCorrect,
      attemptedAt: r.attemptedAt.toISOString(),
    });
  }
  return grouped;
}

async function fetchUserMockSessions(userId: string): Promise<import("@/types/mock-exam").MockExamSession[]> {
  const rows = await prisma.mockExamSession.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 50 });
  return rows.map((r) => ({
    sessionId: r.sessionId,
    courseId: r.courseId,
    startedAt: r.startedAt.toISOString(),
    completedAt: r.completedAt ? r.completedAt.toISOString() : null,
    answers: r.answers,
    score: r.score,
  })) as unknown as import("@/types/mock-exam").MockExamSession[];
}

export async function getLearnerStateForUser(userId: string) {
  const [attempts, fsrsState, qbAttempts, qbFavRows, mockSessions] = await Promise.all([
    fetchUserAttempts(userId),
    fetchUserFsrs(userId),
    fetchUserQbAttempts(userId),
    prisma.qbFavorite.findMany({ where: { userId } }),
    fetchUserMockSessions(userId),
  ]);

  const qbFavorites: import("@/types/question-bank").QBFavoriteStore = {};
  for (const f of qbFavRows) {
    qbFavorites[f.questionId] = true;
  }

  // Reconstruct minimal memory (reviewTasks left empty; client derives on next actions)
  const memoryState: Partial<import("@/types/learning").LearningMemoryState> = {
    version: 2,
    preferences: {
      currentAnswerEnabled: true,
      confirmedHistoryEnabled: true,
      nextStepPromptEnabled: true,
      historySuggestionHandled: false,
    },
    attempts,
    reviewTasks: [],
    standardUpdateNotices: [],
    fsrsState,
  };

  return {
    memory: JSON.stringify(memoryState),
    qbAttempts,
    qbFavorites,
    mockSessions,
  };
}

export type LearnerSyncPayload = {
  memory?: string | null;
  qbAttempts?: Record<string, QBAttemptRecord[]>;
  qbFavorites?: QBFavoriteStore;
  mockSessions?: MockExamSession[];
  admissionConsents?: Array<{ recordId: string; consent: boolean }>;
};

export async function syncLearnerState(
  userId: string,
  payload: LearnerSyncPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const errs: string[] = [];
  const res = await mergeLocalStateOnLogin(
    userId,
    payload.memory ?? null,
    payload.qbAttempts ?? null,
    payload.qbFavorites ?? null,
    payload.mockSessions ?? null
  );
  if (!res.merged) errs.push(...res.errors);

  if (payload.admissionConsents) {
    for (const c of payload.admissionConsents) {
      try {
        await setAdmissionSyncConsent(userId, c.recordId, c.consent);
      } catch {
        errs.push("admission-consent-failed");
      }
    }
  }

  return errs.length === 0 ? { ok: true } : { ok: false, error: errs.join(";") };
}
