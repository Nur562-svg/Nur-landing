/**
 * Stable identity helpers for confirmed learner attempts (M2 sync).
 * Pure domain logic — no window / Prisma. Used by client merge and server upsert.
 *
 * Authority: client-generated attempt.id (UUID).
 * Content key: folds legacy duplicates where server re-issued cuid on upload.
 */

import type { LearnerAttemptRecord } from "@/types/learning";

export const MAX_LEARNER_ATTEMPTS = 300;

/** Seconds-precision ISO for content identity (avoids ms noise across devices). */
export function normalizeConfirmedAtForIdentity(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return iso.trim();
  return new Date(Math.floor(ms / 1000) * 1000).toISOString();
}

/**
 * Content identity for the same confirmed record across devices / legacy server cuids.
 * Different confirmedAt (second+) = distinct legitimate re-confirms → different keys.
 */
export function attemptContentIdentityKey(input: {
  courseId: string;
  knowledgePointId: string;
  surface: string;
  taskId: string;
  segmentId: string | null | undefined;
  confirmedText: string;
  confirmedAt: string;
}): string {
  const segment = input.segmentId ?? "";
  const text = input.confirmedText.trim();
  const at = normalizeConfirmedAtForIdentity(input.confirmedAt);
  return [
    input.courseId,
    input.knowledgePointId,
    input.surface,
    input.taskId,
    segment,
    text,
    at,
  ].join("\u0001");
}

export function attemptContentIdentityKeyFromRecord(attempt: LearnerAttemptRecord): string {
  return attemptContentIdentityKey({
    courseId: attempt.courseId,
    knowledgePointId: attempt.knowledgePointId,
    surface: attempt.surface,
    taskId: attempt.taskId,
    segmentId: attempt.segmentId,
    confirmedText: attempt.confirmedText,
    confirmedAt: attempt.confirmedAt,
  });
}

/**
 * Union by id (prefer newer confirmedAt per id), then fold same content key under one id
 * (first appearance wins — pass local before server so client UUID beats legacy cuid),
 * then sort + cap.
 */
export function foldAttemptsByStableIdentity(
  attempts: readonly LearnerAttemptRecord[],
): LearnerAttemptRecord[] {
  const byId = new Map<string, LearnerAttemptRecord>();
  for (const attempt of attempts) {
    if (!attempt.id) continue;
    const existing = byId.get(attempt.id);
    if (!existing || attempt.confirmedAt.localeCompare(existing.confirmedAt) > 0) {
      byId.set(attempt.id, attempt);
    }
  }

  // Appearance order from input (local-first when caller concatenates local then server).
  const appearanceOrder: LearnerAttemptRecord[] = [];
  const seenId = new Set<string>();
  for (const attempt of attempts) {
    if (!attempt.id || seenId.has(attempt.id)) continue;
    const chosen = byId.get(attempt.id);
    if (!chosen) continue;
    seenId.add(attempt.id);
    appearanceOrder.push(chosen);
  }

  const folded = new Map<string, LearnerAttemptRecord>();
  for (const attempt of appearanceOrder) {
    const key = attemptContentIdentityKeyFromRecord(attempt);
    if (!folded.has(key)) {
      folded.set(key, attempt);
    }
  }

  return Array.from(folded.values())
    .sort((a, b) => b.confirmedAt.localeCompare(a.confirmedAt))
    .slice(0, MAX_LEARNER_ATTEMPTS);
}

/**
 * Merge two attempt lists (e.g. local + server) with id union + content fold.
 * Local list is preferred for content-key collisions (stable client UUID).
 */
export function mergeAttemptLists(
  local: readonly LearnerAttemptRecord[],
  server: readonly LearnerAttemptRecord[],
): LearnerAttemptRecord[] {
  return foldAttemptsByStableIdentity([...local, ...server]);
}
