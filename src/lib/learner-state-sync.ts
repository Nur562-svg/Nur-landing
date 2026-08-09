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

// FSRS 状态 upsert（按 criterionId）
export async function upsertFsrsStateServer(
  userId: string,
  criterionId: string,
  state: FsrsCriterionState
): Promise<void> {
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


// === M2 Phase 4: Sync status (debounce + visibility) ===
const SYNC_STATUS_KEY = "nur-learn:sync-status:v1";
const SYNC_STATUS_EVENT = "nur-learn:sync-status-change";

export type LearnerSyncStatus = {
  isSyncing: boolean;
  lastSyncAt?: string;
  lastError?: string | null;
};

// React 19: getSnapshot 必须返回稳定引用（缓存对象），
// 否则 useSyncExternalStore 每次比较都判定值变化 → 无限循环 (React 185)。
let cachedSyncStatus: LearnerSyncStatus | null = null;
let cachedSyncStatusRaw: string | null = null;

function getSyncStatus(): LearnerSyncStatus {
  if (typeof window === "undefined") return { isSyncing: false };
  try {
    const raw = window.localStorage.getItem(SYNC_STATUS_KEY);
    // 缓存未失效时直接返回同一引用，避免每次渲染生成新对象
    if (raw === cachedSyncStatusRaw && cachedSyncStatus) return cachedSyncStatus;
    let parsed: LearnerSyncStatus;
    if (!raw) {
      parsed = { isSyncing: false };
    } else {
      parsed = JSON.parse(raw) as LearnerSyncStatus;
    }
    cachedSyncStatus = parsed;
    cachedSyncStatusRaw = raw;
    return parsed;
  } catch {
    return { isSyncing: false };
  }
}

function setSyncStatus(partial: Partial<LearnerSyncStatus>): void {
  if (typeof window === "undefined") return;
  const current = getSyncStatus();
  const next = { ...current, ...partial };
  try {
    window.localStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(SYNC_STATUS_EVENT));
  } catch {}
}

export function subscribeToSyncStatus(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(SYNC_STATUS_EVENT, handler);
  window.addEventListener("storage", (e) => {
    if (e.key === SYNC_STATUS_KEY) handler();
  });
  return () => {
    window.removeEventListener(SYNC_STATUS_EVENT, handler);
    window.removeEventListener("storage", handler as EventListener);
  };
}

export { getSyncStatus, setSyncStatus };

// === M2 优化: 共享 payload 构建（消除重复）===
export function buildLearnerSyncPayload(opts: { delta?: boolean } = {}): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  const memory = window.localStorage.getItem("nur-learn:learning-memory:v1");
  const qbAttemptsRaw = window.localStorage.getItem("nur-learn:qb-attempts:v1");
  const qbFavoritesRaw = window.localStorage.getItem("nur-learn:qb-favorites:v1");
  const mockRaw = window.localStorage.getItem("nur-learn:mock-exam-sessions:v1");

  const lastSync = getSyncStatus().lastSyncAt;
  const useDelta = !!opts.delta && !!lastSync;

  const payload: Record<string, unknown> = { memory };

  // Smarter delta for large variable-size stores (QB + Mock)
  if (qbAttemptsRaw) {
    try {
      const all = JSON.parse(qbAttemptsRaw);
      if (useDelta && lastSync) {
        const filtered: Record<string, unknown> = {};
        const since = new Date(lastSync).getTime();
        for (const [qid, arr] of Object.entries(all)) {
          const newer = (arr as unknown[] as Array<{attemptedAt?: string}>).filter((r) => {
            const t = r.attemptedAt ? new Date(r.attemptedAt).getTime() : 0;
            return t > since;
          });
          if (newer.length) filtered[qid] = newer;
        }
        if (Object.keys(filtered).length) payload.qbAttempts = filtered;
      } else {
        payload.qbAttempts = all;
      }
    } catch {}
  }

  if (qbFavoritesRaw) {
    // Favorites are small; always send full for simplicity (or delta by key)
    try { payload.qbFavorites = JSON.parse(qbFavoritesRaw); } catch {}
  }

  if (mockRaw) {
    try {
      const all = JSON.parse(mockRaw);
      if (useDelta && lastSync) {
        const since = new Date(lastSync).getTime();
        const newer = (all as unknown[] as Array<{completedAt?: string, startedAt?: string}>).filter((s: {completedAt?: string, startedAt?: string}) => {
          const t0 = (s.completedAt || s.startedAt) || ""; const t = t0 ? new Date(t0).getTime() : 0;
          return t > since;
        });
        if (newer.length) payload.mockSessions = newer;
      } else {
        payload.mockSessions = all;
      }
    } catch {}
  }

  const consents = getAdmissionSyncConsents();
  payload.admissionConsents = Object.entries(consents)
    .filter(([, c]) => c)
    .map(([recordId]) => ({ recordId, consent: true }));

  return payload;
}


// Simple debounce for writes
let syncTimeout: ReturnType<typeof setTimeout> | null = null;
const SYNC_DEBOUNCE_MS = 1200;

// === Client-side helper (local-first, non-blocking) ===
// Reusable fire-and-forget uploader. Called after local writes.
// Mirrors the logic currently duplicated in learning-dashboard.tsx.
export function triggerLearnerStateSync(immediate = false): void {
  if (typeof window === "undefined") return;

  if (syncTimeout != null) clearTimeout(syncTimeout);

  const doSync = async () => {
    setSyncStatus({ isSyncing: true, lastError: null });
    let attempt = 0;
    const maxAttempts = 2;
    while (attempt < maxAttempts) {
      try {
        const payload = buildLearnerSyncPayload({ delta: !immediate });
        await fetch("/api/learn/sync", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });

        const now = new Date().toISOString();
        setSyncStatus({ isSyncing: false, lastSyncAt: now, lastError: null });
        return; // success
      } catch (e: unknown) {
        attempt++;
        if (attempt >= maxAttempts) {
          if (process.env.NODE_ENV !== "production") console.warn("[M2 sync] failed after retries:", (e as Error)?.message || String(e));
          setSyncStatus({ isSyncing: false, lastError: (e as Error)?.message || "sync-failed" });
          return;
        }
        await new Promise(r => setTimeout(r, 700));
      }
    }
  };

  if (immediate) {
    void doSync();
  } else {
    syncTimeout = setTimeout(doSync, SYNC_DEBOUNCE_MS);
  }
}

// === Phase 2: Client merge (download + union, prefer latest) ===

export function mergeServerStateIntoLocal(server: Partial<LearnerSyncPayload> & { memory?: string | null }) {
  if (typeof window === "undefined") return;
  try {
    // Merge learning-memory (attempts + fsrs)
    if (server.memory) {
      const serverMem = parseLearningMemoryJson(server.memory);
      const local = parseLearningMemoryJson(window.localStorage.getItem("nur-learn:learning-memory:v1"));
      // attempts: union by id, prefer latest confirmedAt
      const byId = new Map(local.attempts.map((a) => [a.id, a]));
      for (const sa of serverMem.attempts || []) {
        const la = byId.get(sa.id);
        if (!la || new Date(sa.confirmedAt) > new Date(la.confirmedAt)) {
          byId.set(sa.id, sa);
        }
      }
      const mergedAttempts = Array.from(byId.values())
        .sort((a, b) => b.confirmedAt.localeCompare(a.confirmedAt))
        .slice(0, 300);
      // fsrs: prefer latest lastReviewAt
      let mergedFsrs = local.fsrsState;
      if (serverMem.fsrsState) {
        const c = { ...(local.fsrsState?.criteria || {}) };
        for (const [id, sv] of Object.entries(serverMem.fsrsState.criteria || {})) {
          const lv = c[id];
          if (!lv || !lv.lastReviewAt || (sv.lastReviewAt && new Date(sv.lastReviewAt) > new Date(lv.lastReviewAt))) {
            c[id] = sv;
          }
        }
        mergedFsrs = { version: 2, criteria: c };
      }
      // M2 全面优化：reviewTasks 合并后清理
      let reviewTasks = local.reviewTasks || [];
      if (serverMem.attempts && reviewTasks.length > 0) {
        const latestAttemptTime = new Map();
        for (const att of serverMem.attempts) {
          for (const cr of (att.criterionResults || [])) {
            const cid = cr.criterionId;
            const t = new Date(att.confirmedAt).getTime();
            if (!latestAttemptTime.has(cid) || t > latestAttemptTime.get(cid)) {
              latestAttemptTime.set(cid, t);
            }
          }
        }
        reviewTasks = reviewTasks.filter((task) => {
          if (task.status !== "proposed") return true;
          const last = latestAttemptTime.get(task.criterionIds && task.criterionIds[0]);
          if (!last) return true;
          const taskTime = task.proposedAt ? new Date(task.proposedAt).getTime() : 0;
          return taskTime > last; // 只有 server 没有更新 attempt 的才保留 proposed
        });
      }

      const merged = {
        ...local,
        attempts: mergedAttempts,
        fsrsState: mergedFsrs,
        reviewTasks,
      };
      window.localStorage.setItem("nur-learn:learning-memory:v1", JSON.stringify(merged));
      window.dispatchEvent(new Event("nur-learn:learning-memory-change"));
      setSyncStatus({ lastSyncAt: new Date().toISOString(), lastError: null });
    }

    // QB attempts: append missing
    if (server.qbAttempts) {
      const raw = window.localStorage.getItem("nur-learn:qb-attempts:v1");
      const localQ: Record<string, import("@/types/question-bank").QBAttemptRecord[]> = raw ? JSON.parse(raw) : {};
      for (const [qid, arr] of Object.entries(server.qbAttempts)) {
        if (!localQ[qid]) localQ[qid] = [];
        const seen = new Set(localQ[qid].map((x) => x.attemptedAt || JSON.stringify(x)));
        for (const rec of arr) {
          const key = rec.attemptedAt || JSON.stringify(rec);
          if (!seen.has(key)) {
            localQ[qid].push(rec);
            seen.add(key);
          }
        }
      }
      window.localStorage.setItem("nur-learn:qb-attempts:v1", JSON.stringify(localQ));
    }

    // QB favorites: union
    if (server.qbFavorites) {
      const raw = window.localStorage.getItem("nur-learn:qb-favorites:v1");
      const localF: import("@/types/question-bank").QBFavoriteStore = raw ? JSON.parse(raw) : {};
      Object.assign(localF, server.qbFavorites);
      window.localStorage.setItem("nur-learn:qb-favorites:v1", JSON.stringify(localF));
    }

    // Mock sessions: append by sessionId
    if (Array.isArray(server.mockSessions)) {
      const raw = window.localStorage.getItem("nur-learn:mock-exam-sessions:v1");
      const localM: unknown[] = raw ? JSON.parse(raw) : [];
      const seen = new Set((localM as Array<{sessionId?: string}>).map((s) => s.sessionId));
      const add = (server.mockSessions || []).filter((s: {sessionId?: string}) => !seen.has(s.sessionId || ""));
      if (add.length) {
        window.localStorage.setItem("nur-learn:mock-exam-sessions:v1", JSON.stringify([...localM, ...add]));
      }
    }
  } catch {
    // silent, local wins
  }
}

// === Reliable login merge skeleton (双向同步骨架 · 可靠登录合并) ===
// 登录时可靠流程：
// 1. 立即全量上传当前本地状态（delta=false，避免漏同步新设备）
// 2. 下载服务器最新（含此前设备 + 刚上传）
// 3. 客户端 mergeServerStateIntoLocal（timestamp 优先 union + 清理）
// 4. 更新 sync status，触发 memory 事件让 useLearningMemory 等消费者刷新
// 所有错误静默（local-first），状态通过 useSyncStatus 暴露。
export async function performReliableLoginMerge(): Promise<void> {
  if (typeof window === "undefined") return;

  setSyncStatus({ isSyncing: true, lastError: null });

  try {
    // 1. 全量立即上传（登录场景不使用 delta）
    const payload = buildLearnerSyncPayload({ delta: false });
    const postRes = await fetch("/api/learn/sync", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!postRes.ok) {
      // 仍尝试下载以便恢复已有 server 状态
    }

    // 2. 下载 server 状态
    const getRes = await fetch("/api/learn/sync", {
      credentials: "include",
    });
    const data: { ok?: boolean; state?: Parameters<typeof mergeServerStateIntoLocal>[0]; error?: string } = await getRes.json().catch(() => ({}));

    // 3. 合并到本地（会 dispatch memory-change + 更新 lastSyncAt）
    if (data?.state) {
      mergeServerStateIntoLocal(data.state);
    } else if (data?.ok && !data.state) {
      // server 可能尚无数据，upload 已完成即可
    }

    setSyncStatus({
      isSyncing: false,
      lastSyncAt: new Date().toISOString(),
      lastError: null,
    });
  } catch (e: unknown) {
    const msg = (e as Error)?.message || "login-sync-failed";
    if (process.env.NODE_ENV !== "production") {
      console.warn("[M2 login sync] reliable merge failed:", msg);
    }
    setSyncStatus({ isSyncing: false, lastError: msg });
    // local 永远优先，不抛
  }
}
