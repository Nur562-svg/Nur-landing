import { triggerLearnerStateSync } from "@/lib/learner-state-sync";
import {
  foldQbAttemptsByStableIdentity,
  qbAttemptContentIdentityKey,
} from "@/lib/qb-attempt-identity";
import type {
  ChapterQBProgress,
  QBAttemptRecord,
  QBFavoriteStore,
  QBProgressStore,
  QBChapterStats,
} from "@/types/question-bank";

const QB_PROGRESS_KEY = "nur-learn:qb-progress:v1";
const QB_ATTEMPTS_KEY = "nur-learn:qb-attempts:v1";
const QB_FAVORITES_KEY = "nur-learn:qb-favorites:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseStored<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function writeStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable, silently discard
  }
}

function isQBAttemptRecord(value: unknown): value is QBAttemptRecord {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.questionId === "string"
    && typeof value.selectedIndex === "number"
    && typeof value.isCorrect === "boolean"
    && typeof value.attemptedAt === "string";
}

function isChapterQBProgress(value: unknown): value is ChapterQBProgress {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.chapterId === "string"
    && typeof value.lastIndex === "number"
    && Array.isArray(value.completedIndices)
    && value.completedIndices.every((v: unknown) => typeof v === "number");
}

export function getQBProgress(courseId: string): QBProgressStore {
  const all = parseStored<Record<string, unknown>>(QB_PROGRESS_KEY, {});
  const courseStore = all[courseId];
  if (!isRecord(courseStore)) {
    return {};
  }
  const result: QBProgressStore = {};
  for (const [key, value] of Object.entries(courseStore)) {
    if (isChapterQBProgress(value)) {
      result[key] = value;
    }
  }
  return result;
}

export function saveQBProgress(
  courseId: string,
  chapterId: string,
  progress: ChapterQBProgress,
): void {
  const all = parseStored<Record<string, unknown>>(QB_PROGRESS_KEY, {});
  const courseStore = isRecord(all[courseId]) ? { ...all[courseId] } : {};
  courseStore[chapterId] = progress;
  all[courseId] = courseStore;
  writeStored(QB_PROGRESS_KEY, all);
}

/** 返回全量题目作答记录（questionId → attempts[]），用于跨课程错题聚合。 */
export function getAllQBAttempts(): Record<string, QBAttemptRecord[]> {
  const all = parseStored<Record<string, unknown>>(QB_ATTEMPTS_KEY, {});
  const result: Record<string, QBAttemptRecord[]> = {};
  for (const [questionId, records] of Object.entries(all)) {
    if (Array.isArray(records)) {
      const valid = foldQbAttemptsByStableIdentity(
        records.filter(isQBAttemptRecord),
      );
      if (valid.length > 0) {
        result[questionId] = valid;
      }
    }
  }
  return result;
}

export function getQBAttempts(questionId: string): QBAttemptRecord[] {
  const all = parseStored<Record<string, unknown>>(QB_ATTEMPTS_KEY, {});
  const records = all[questionId];
  if (!Array.isArray(records)) {
    return [];
  }
  return foldQbAttemptsByStableIdentity(records.filter(isQBAttemptRecord));
}

export function addQBAttempt(
  questionId: string,
  record: QBAttemptRecord,
): void {
  const all = parseStored<Record<string, unknown>>(QB_ATTEMPTS_KEY, {});
  const existing = Array.isArray(all[questionId])
    ? (all[questionId] as unknown[]).filter(isQBAttemptRecord)
    : [];
  const newKey = qbAttemptContentIdentityKey(record);
  const already = existing.some((e) => qbAttemptContentIdentityKey(e as QBAttemptRecord) === newKey);
  if (already) {
    return; // idempotent: same logical attempt already recorded
  }
  existing.push(record);
  all[questionId] = existing;
  writeStored(QB_ATTEMPTS_KEY, all);
  void triggerLearnerStateSync();
}

export function getQBFavorites(): QBFavoriteStore {
  return parseStored<QBFavoriteStore>(QB_FAVORITES_KEY, {});
}

export function toggleQBFavorite(questionId: string): boolean {
  const favorites = { ...getQBFavorites() };
  if (favorites[questionId]) {
    delete favorites[questionId];
    writeStored(QB_FAVORITES_KEY, favorites);
    void triggerLearnerStateSync();
    return false;
  }
  favorites[questionId] = true;
  writeStored(QB_FAVORITES_KEY, favorites);
  void triggerLearnerStateSync();
  return true;
}

export function isQBFavorite(questionId: string): boolean {
  return getQBFavorites()[questionId] === true;
}

export function getQBAttemptStats(questionId: string): {
  count: number;
  correctCount: number;
} {
  const attempts = getQBAttempts(questionId);
  return {
    count: attempts.length,
    correctCount: attempts.filter((a) => a.isCorrect).length,
  };
}

export function getQBChapterStats(
  questionIds: readonly string[],
  progress: ChapterQBProgress | null,
): QBChapterStats {
  const completedSet = new Set(progress?.completedIndices ?? []);
  let correct = 0;
  for (const qId of questionIds) {
    const stats = getQBAttemptStats(qId);
    if (stats.correctCount > 0) {
      correct++;
    }
  }
  return {
    total: questionIds.length,
    done: completedSet.size,
    correct,
  };
}
