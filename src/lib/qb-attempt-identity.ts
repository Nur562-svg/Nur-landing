/**
 * Stable identity helpers for QB practice attempts (M2 residual boundary).
 * Pure domain logic — no window / Prisma. Mirrors learner-attempt-identity style.
 *
 * Content key (questionId | selectedIndex | isCorrect | norm-attemptedAt) is authoritative for dedup.
 * No `id` added to QBAttemptRecord to keep surface minimal and avoid consumer changes.
 */

import type { QBAttemptRecord } from "@/types/question-bank";

/** Seconds-precision ISO for content identity (avoids ms noise across devices). */
export function normalizeAttemptedAtForIdentity(iso: string): string {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return iso.trim();
  return new Date(Math.floor(ms / 1000) * 1000).toISOString();
}

/**
 * Content identity for the same logical QB practice attempt.
 * Same (qid + choice + result + second) = duplicate from retry/upload/sync.
 * Different attemptedAt (sec+) = legitimate re-practice, kept.
 */
export function qbAttemptContentIdentityKey(record: QBAttemptRecord): string {
  const at = normalizeAttemptedAtForIdentity(record.attemptedAt);
  return [
    record.questionId,
    String(record.selectedIndex),
    String(record.isCorrect),
    at,
  ].join("\u0001");
}

/** Fold list by content key; first appearance wins (caller controls order for local-first). */
export function foldQbAttemptsByStableIdentity(
  attempts: readonly QBAttemptRecord[],
): QBAttemptRecord[] {
  const folded = new Map<string, QBAttemptRecord>();
  for (const a of attempts) {
    const key = qbAttemptContentIdentityKey(a);
    if (!folded.has(key)) {
      folded.set(key, a);
    }
  }
  return Array.from(folded.values()).sort((a, b) =>
    a.attemptedAt.localeCompare(b.attemptedAt)
  );
}

/**
 * Merge local + server QB stores with content-key fold.
 * Local list first in concat => local records win on key collision.
 */
export function mergeQbAttemptStores(
  local: Record<string, QBAttemptRecord[]>,
  server: Record<string, QBAttemptRecord[]>,
): Record<string, QBAttemptRecord[]> {
  const result: Record<string, QBAttemptRecord[]> = {};
  const qids = new Set([...Object.keys(local), ...Object.keys(server)]);
  for (const qid of qids) {
    const l = local[qid] || [];
    const s = server[qid] || [];
    const merged = foldQbAttemptsByStableIdentity([...l, ...s]);
    if (merged.length > 0) {
      result[qid] = merged;
    }
  }
  return result;
}
