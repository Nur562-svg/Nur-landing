/**
 * M2: 学习状态云同步（浏览器端）
 * 与 server-only 的 learner-state-sync-server.ts 拆分：本文件仅含浏览器端状态管理
 * 与同步触发逻辑，不含任何服务端依赖（避免客户端 bundle 引入 Prisma）。
 * 服务端函数见 learner-state-sync-server.ts（仅 API route 使用）。
 */
import type { QBAttemptRecord, QBFavoriteStore } from "@/types/question-bank";
import type {
  FsrsCriterionState,
  FsrsLearningState,
  LearnerAttemptRecord,
  LearningMemoryState,
} from "@/types/learning";
import { parseLearningMemoryJson } from "./learning-memory";
import { getAdmissionSyncConsents } from "./material-admission";
import { mergeAttemptLists } from "./learner-attempt-identity";
import type { LearnerSyncPayload } from "./learner-state-sync-server";

// === M2 Phase 4: Sync status (debounce + visibility) ===
const SYNC_STATUS_KEY = "nur-learn:sync-status:v1";
const SYNC_STATUS_EVENT = "nur-learn:sync-status-change";

export type LearnerSyncStatus = {
  isSyncing: boolean;
  lastSyncAt?: string;
  lastError?: string | null;
  /**
   * 上次成功「下载 + 合并」的时间（冲突检测基线）。
   * 与 lastSyncAt 不同：纯上传也会推进 lastSyncAt，但不推进本字段。
   */
  lastMergeAt?: string;
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

export function mergeServerStateIntoLocal(
  server: Partial<LearnerSyncPayload> & { memory?: string | null },
  userEmail?: string,
) {
  if (typeof window === "undefined") return;
  try {
    // Merge learning-memory (attempts + fsrs)
    if (server.memory) {
      const serverMem = parseLearningMemoryJson(server.memory);
      const local = parseLearningMemoryJson(window.localStorage.getItem("nur-learn:learning-memory:v1"));

      // 冲突检测：用合并前的本地快照 + 上次合并基线（必须在合并改动本地之前）
      const lastMergeAt = getSyncStatus().lastMergeAt ?? null;
      const detectedAt = new Date().toISOString();
      const fsrsConflicts = detectFsrsConflicts(
        local.fsrsState?.criteria ?? {},
        serverMem.fsrsState?.criteria ?? {},
        lastMergeAt,
        userEmail ?? "",
        detectedAt,
      );
      const attemptConflicts = detectAttemptConflicts(
        local.attempts,
        serverMem.attempts,
        userEmail ?? "",
        detectedAt,
      );
      if (fsrsConflicts.length + attemptConflicts.length > 0) {
        recordSyncConflicts([...fsrsConflicts, ...attemptConflicts]);
      }

      // attempts: client id 权威 union + 内容键折叠（消除历史「服务端换 cuid」重复）
      // local 在前，同内容键优先保留本机 UUID
      const mergedAttempts = mergeAttemptLists(local.attempts, serverMem.attempts || []);
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
      setSyncStatus({ lastSyncAt: detectedAt, lastMergeAt: detectedAt, lastError: null });
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
export async function performReliableLoginMerge(userEmail?: string): Promise<void> {
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
    const data = (await getRes.json().catch(() => ({}))) as { ok?: boolean; state?: Parameters<typeof mergeServerStateIntoLocal>[0]; error?: string };

    // 3. 合并到本地（会 dispatch memory-change + 记录冲突 + 更新 lastMergeAt）
    if (data?.state) {
      mergeServerStateIntoLocal(data.state, userEmail);
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

// === 冲突可见性：SyncConflict 检测、存储与解决（2026-08-17） ===
// 设计要点：
// - 冲突只在「下载 + 合并」时检测（debounced 上传不下载、不检测）。
// - 检测基线是 lastMergeAt（不是 lastSyncAt，后者会被纯上传推进）。
// - FSRS 冲突 = 同一 criterionId 双方都在基线后更新且语义不同；
//   attempt 冲突 = 同一 id 内容不同（上传已改为客户端 id 权威 + 幂等；
//   同内容不同 id 由 mergeAttemptLists 内容键折叠，不进冲突列表）。
// - 检出后临时值仍按现行「更新者胜」落地，不打断学习；用户事后裁决。
// - 解决「以本机为准」= 把该准则 lastReviewAt 置为当前时刻（用户此刻
//   显式重申），借既有上传通道覆盖服务端（服务端 upsert 有时间戳守卫）。

const SYNC_CONFLICTS_KEY = "nur-learn:sync-conflicts:v1";
const SYNC_CONFLICTS_EVENT = "nur-learn:sync-conflicts-change";
const MAX_SYNC_CONFLICTS = 100;

export type SyncConflictResolution = "local" | "server";

export type SyncConflictSnapshot =
  | { kind: "fsrs"; fsrs: FsrsCriterionState }
  | { kind: "attempt"; attempt: LearnerAttemptRecord };

export type SyncConflict = {
  version: 1;
  /** 确定性主键：`fsrs:${refId}` 或 `attempt:${refId}` */
  id: string;
  type: "fsrs" | "attempt";
  refId: string;
  /** 冲突归属的账户邮箱（多账号同浏览器不串） */
  userEmail: string;
  local: SyncConflictSnapshot;
  server: SyncConflictSnapshot;
  reason: "both-updated-since-last-merge" | "same-id-different-content";
  detectedAt: string;
};

export type SyncConflictStore = {
  version: 1;
  items: SyncConflict[];
};

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isIsoDateString(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isFsrsSnapshot(value: unknown): value is FsrsCriterionState {
  if (!isPlainRecord(value)) return false;
  return (value.state === "new"
      || value.state === "learning"
      || value.state === "review"
      || value.state === "relearning")
    && typeof value.difficulty === "number" && Number.isFinite(value.difficulty)
    && typeof value.stability === "number" && Number.isFinite(value.stability)
    && typeof value.reps === "number" && Number.isInteger(value.reps) && value.reps >= 0
    && typeof value.lapses === "number" && Number.isInteger(value.lapses) && value.lapses >= 0
    && (value.lastReviewAt === null || isIsoDateString(value.lastReviewAt));
}

function isAttemptSnapshot(value: unknown): value is LearnerAttemptRecord {
  if (!isPlainRecord(value) || !isPlainRecord(value.scoringStandard)) return false;
  return typeof value.id === "string" && value.id.length > 0
    && typeof value.courseId === "string"
    && typeof value.knowledgePointId === "string"
    && (value.surface === "subjective-writing" || value.surface === "case-reasoning")
    && typeof value.taskId === "string"
    && (value.segmentId === null || typeof value.segmentId === "string")
    && typeof value.confirmedText === "string"
    && isIsoDateString(value.confirmedAt)
    && Array.isArray(value.criterionResults)
    && value.criterionResults.length > 0
    && value.criterionResults.every(isPlainRecord);
}

function isSyncConflictSnapshot(value: unknown, type: "fsrs" | "attempt"): value is SyncConflictSnapshot {
  if (!isPlainRecord(value)) return false;
  if (type === "fsrs") {
    return value.kind === "fsrs" && isFsrsSnapshot(value.fsrs);
  }
  return value.kind === "attempt" && isAttemptSnapshot(value.attempt);
}

/** 严格解析冲突存储；任何畸形输入返回空存储（local-first，静默降级）。 */
export function parseSyncConflictStore(raw: string | null): SyncConflictStore {
  if (!raw) return { version: 1, items: [] };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainRecord(parsed) || parsed.version !== 1 || !Array.isArray(parsed.items)) {
      return { version: 1, items: [] };
    }
    const items: SyncConflict[] = [];
    for (const entry of parsed.items) {
      if (!isPlainRecord(entry)) continue;
      if (entry.version !== 1) continue;
      if (entry.type !== "fsrs" && entry.type !== "attempt") continue;
      if (typeof entry.id !== "string" || entry.id.length === 0) continue;
      if (typeof entry.refId !== "string" || entry.refId.length === 0) continue;
      if (typeof entry.userEmail !== "string") continue;
      if (!isIsoDateString(entry.detectedAt)) continue;
      if (entry.reason !== "both-updated-since-last-merge" && entry.reason !== "same-id-different-content") continue;
      if (!isSyncConflictSnapshot(entry.local, entry.type)) continue;
      if (!isSyncConflictSnapshot(entry.server, entry.type)) continue;
      items.push({
        version: 1,
        id: entry.id,
        type: entry.type,
        refId: entry.refId,
        userEmail: entry.userEmail,
        local: entry.local,
        server: entry.server,
        reason: entry.reason,
        detectedAt: entry.detectedAt,
      });
    }
    return { version: 1, items: items.slice(0, MAX_SYNC_CONFLICTS) };
  } catch {
    return { version: 1, items: [] };
  }
}

function readSyncConflictStore(): SyncConflictStore {
  if (typeof window === "undefined") return { version: 1, items: [] };
  try {
    return parseSyncConflictStore(window.localStorage.getItem(SYNC_CONFLICTS_KEY));
  } catch {
    return { version: 1, items: [] };
  }
}

function writeSyncConflictStore(store: SyncConflictStore): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SYNC_CONFLICTS_KEY, JSON.stringify(store));
    window.dispatchEvent(new Event(SYNC_CONFLICTS_EVENT));
  } catch {
    // storage unavailable，静默
  }
}

/** 读取冲突列表；给定 userEmail 时只返回该账户的冲突。 */
export function getSyncConflicts(userEmail?: string): SyncConflict[] {
  const items = readSyncConflictStore().items;
  return typeof userEmail === "string" && userEmail.length > 0
    ? items.filter((item) => item.userEmail === userEmail)
    : [...items];
}

export function subscribeToSyncConflicts(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  const onStorage = (event: StorageEvent) => {
    if (event.key === SYNC_CONFLICTS_KEY) handler();
  };
  window.addEventListener(SYNC_CONFLICTS_EVENT, handler);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(SYNC_CONFLICTS_EVENT, handler);
    window.removeEventListener("storage", onStorage);
  };
}

function recordSyncConflicts(incoming: readonly SyncConflict[]): void {
  if (incoming.length === 0) return;
  const store = readSyncConflictStore();
  const byId = new Map(store.items.map((item) => [item.id, item]));
  for (const item of incoming) {
    const existing = byId.get(item.id);
    if (!existing || Date.parse(item.detectedAt) >= Date.parse(existing.detectedAt)) {
      byId.set(item.id, item);
    }
  }
  const items = [...byId.values()].slice(-MAX_SYNC_CONFLICTS);
  writeSyncConflictStore({ version: 1, items });
}

function fsrsSemanticallyEqual(a: FsrsCriterionState, b: FsrsCriterionState): boolean {
  return a.state === b.state
    && a.difficulty === b.difficulty
    && a.stability === b.stability
    && a.reps === b.reps
    && a.lapses === b.lapses;
}

/**
 * FSRS 冲突检测（纯函数）：
 * 同一 criterionId 双方都有记录、语义不同、且双方的 lastReviewAt 都晚于
 * 上次合并基线（即两端都在上次同步后各自更新过）→ 冲突。
 * 无基线（首次合并）时按现行时间戳优先静默合并，不记录冲突。
 */
export function detectFsrsConflicts(
  localCriteria: Readonly<Record<string, FsrsCriterionState>>,
  serverCriteria: Readonly<Record<string, FsrsCriterionState>>,
  lastMergeAt: string | null,
  userEmail: string,
  detectedAt: string,
): SyncConflict[] {
  if (!lastMergeAt) return [];
  const baseline = Date.parse(lastMergeAt);
  const conflicts: SyncConflict[] = [];
  for (const [refId, serverValue] of Object.entries(serverCriteria)) {
    const localValue = localCriteria[refId];
    if (!localValue) continue;
    if (fsrsSemanticallyEqual(localValue, serverValue)) continue;
    const localChanged = localValue.lastReviewAt !== null && Date.parse(localValue.lastReviewAt) > baseline;
    const serverChanged = serverValue.lastReviewAt !== null && Date.parse(serverValue.lastReviewAt) > baseline;
    if (!localChanged || !serverChanged) continue;
    conflicts.push({
      version: 1,
      id: `fsrs:${refId}`,
      type: "fsrs",
      refId,
      userEmail,
      local: { kind: "fsrs", fsrs: { ...localValue } },
      server: { kind: "fsrs", fsrs: { ...serverValue } },
      reason: "both-updated-since-last-merge",
      detectedAt,
    });
  }
  return conflicts;
}

/**
 * attempt 冲突检测（纯函数）：
 * 同一 attemptId 两端内容不同 → 冲突。
 * 上传路径已持久化客户端 id 且 attempt 不可变；同内容不同 id 的历史脏数据
 * 由 mergeAttemptLists 折叠，不会进入本检测。
 */
export function detectAttemptConflicts(
  localAttempts: readonly LearnerAttemptRecord[],
  serverAttempts: readonly LearnerAttemptRecord[],
  userEmail: string,
  detectedAt: string,
): SyncConflict[] {
  const byId = new Map(localAttempts.map((attempt) => [attempt.id, attempt]));
  const conflicts: SyncConflict[] = [];
  for (const serverAttempt of serverAttempts) {
    const localAttempt = byId.get(serverAttempt.id);
    if (!localAttempt) continue;
    const sameContent = localAttempt.confirmedText === serverAttempt.confirmedText
      && JSON.stringify(localAttempt.criterionResults) === JSON.stringify(serverAttempt.criterionResults);
    if (sameContent) continue;
    conflicts.push({
      version: 1,
      id: `attempt:${serverAttempt.id}`,
      type: "attempt",
      refId: serverAttempt.id,
      userEmail,
      local: { kind: "attempt", attempt: { ...localAttempt } },
      server: { kind: "attempt", attempt: { ...serverAttempt } },
      reason: "same-id-different-content",
      detectedAt,
    });
  }
  return conflicts;
}

/**
 * 把一次冲突裁决应用到学习记忆（纯函数）。
 * resolution === "local" 时把该准则 lastReviewAt 置为 now：
 * 用户此刻显式重申本机值，借服务端时间戳守卫放行后续上传覆盖。
 */
export function applyConflictResolutionToMemory(
  state: LearningMemoryState,
  conflict: SyncConflict,
  resolution: SyncConflictResolution,
  now: string,
): LearningMemoryState {
  const chosen = resolution === "local" ? conflict.local : conflict.server;
  if (conflict.type === "fsrs" && chosen.kind === "fsrs") {
    const current: FsrsLearningState = state.fsrsState ?? { version: 2, criteria: {} };
    const criteria = { ...current.criteria };
    criteria[conflict.refId] = resolution === "local"
      ? { ...chosen.fsrs, lastReviewAt: now }
      : { ...chosen.fsrs };
    return { ...state, fsrsState: { version: 2, criteria } };
  }
  if (conflict.type === "attempt" && chosen.kind === "attempt") {
    const replacement: LearnerAttemptRecord = { ...chosen.attempt };
    const others = state.attempts.filter((attempt) => attempt.id !== conflict.refId);
    const attempts = [...others, replacement]
      .sort((a, b) => a.confirmedAt.localeCompare(b.confirmedAt))
      .slice(-300);
    return { ...state, attempts };
  }
  return state;
}

/**
 * 解决单个冲突：把所选快照写入本地学习记忆、移除冲突记录、
 * 并触发一次可靠同步。返回是否找到并处理了该冲突。
 */
export function resolveSyncConflict(conflictId: string, resolution: SyncConflictResolution): boolean {
  if (typeof window === "undefined") return false;
  const store = readSyncConflictStore();
  const conflict = store.items.find((item) => item.id === conflictId);
  if (!conflict) return false;

  writeSyncConflictStore({
    version: 1,
    items: store.items.filter((item) => item.id !== conflictId),
  });

  const memoryKey = "nur-learn:learning-memory:v1";
  const current = parseLearningMemoryJson(window.localStorage.getItem(memoryKey));
  const next = applyConflictResolutionToMemory(
    current,
    conflict,
    resolution,
    new Date().toISOString(),
  );
  try {
    window.localStorage.setItem(memoryKey, JSON.stringify(next));
  } catch {
    // storage unavailable，静默
  }
  window.dispatchEvent(new Event("nur-learn:learning-memory-change"));
  triggerLearnerStateSync(true);
  return true;
}

/** 批量解决当前账户（或全部）冲突，应用后统一触发一次同步。返回处理条数。 */
export function resolveAllSyncConflicts(resolution: SyncConflictResolution, userEmail?: string): number {
  if (typeof window === "undefined") return 0;
  const store = readSyncConflictStore();
  const targets = store.items.filter((item) => (
    typeof userEmail !== "string" || userEmail.length === 0 || item.userEmail === userEmail
  ));
  if (targets.length === 0) return 0;

  const resolvedIds = new Set(targets.map((item) => item.id));
  writeSyncConflictStore({
    version: 1,
    items: store.items.filter((item) => !resolvedIds.has(item.id)),
  });

  const memoryKey = "nur-learn:learning-memory:v1";
  let state = parseLearningMemoryJson(window.localStorage.getItem(memoryKey));
  const now = new Date().toISOString();
  for (const conflict of targets) {
    state = applyConflictResolutionToMemory(state, conflict, resolution, now);
  }
  try {
    window.localStorage.setItem(memoryKey, JSON.stringify(state));
  } catch {
    // storage unavailable，静默
  }
  window.dispatchEvent(new Event("nur-learn:learning-memory-change"));
  triggerLearnerStateSync(true);
  return targets.length;
}

/**
 * 清空冲突记录（不应用任何一方的值）。
 * 给定 userEmail 时只清该账户的记录（登出时使用），否则清空全部。
 */
export function clearResolvedConflicts(userEmail?: string): number {
  if (typeof window === "undefined") return 0;
  const store = readSyncConflictStore();
  const remaining = typeof userEmail === "string" && userEmail.length > 0
    ? store.items.filter((item) => item.userEmail !== userEmail)
    : [];
  writeSyncConflictStore({ version: 1, items: remaining });
  return store.items.length - remaining.length;
}

// React 19 useSyncExternalStore 快照缓存：按原始字符串缓存稳定引用。
let cachedConflictsRaw: string | null = null;
let cachedConflictsItems: readonly SyncConflict[] = [];

/** 带引用缓存的冲突快照（供 useSyncExternalStore 直接使用）。 */
export function getSyncConflictsSnapshot(): readonly SyncConflict[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SYNC_CONFLICTS_KEY);
  if (raw === cachedConflictsRaw) return cachedConflictsItems;
  cachedConflictsItems = readSyncConflictStore().items;
  cachedConflictsRaw = raw;
  return cachedConflictsItems;
}
