import { describe, it } from "node:test";
import assert from "node:assert";
import type { QBAttemptRecord } from "@/types/question-bank";
import {
  qbAttemptContentIdentityKey,
  foldQbAttemptsByStableIdentity,
  mergeQbAttemptStores,
  normalizeAttemptedAtForIdentity,
} from "@/lib/qb-attempt-identity";

function qb(overrides: Partial<QBAttemptRecord> = {}): QBAttemptRecord {
  return {
    questionId: overrides.questionId ?? "q-1",
    selectedIndex: overrides.selectedIndex ?? 0,
    isCorrect: overrides.isCorrect ?? true,
    attemptedAt: overrides.attemptedAt ?? "2026-08-17T10:00:00.000Z",
  };
}

describe("qb attempt content identity", () => {
  it("normalizes attemptedAt to second precision", () => {
    assert.strictEqual(
      normalizeAttemptedAtForIdentity("2026-08-17T10:00:00.450Z"),
      "2026-08-17T10:00:00.000Z",
    );
  });

  it("builds the same key for same logical attempt with ms drift", () => {
    const a = qb({ attemptedAt: "2026-08-17T10:00:00.120Z", selectedIndex: 2, isCorrect: false });
    const b = qb({ attemptedAt: "2026-08-17T10:00:00.999Z", selectedIndex: 2, isCorrect: false });
    assert.strictEqual(
      qbAttemptContentIdentityKey(a),
      qbAttemptContentIdentityKey(b),
    );
  });

  it("treats different attemptedAt seconds as distinct practices", () => {
    const a = qbAttemptContentIdentityKey(qb({ attemptedAt: "2026-08-17T10:00:00.000Z" }));
    const b = qbAttemptContentIdentityKey(qb({ attemptedAt: "2026-08-17T10:00:01.000Z" }));
    assert.notStrictEqual(a, b);
  });
});

describe("foldQbAttemptsByStableIdentity / mergeQbAttemptStores", () => {
  it("keeps a single row when records share content key", () => {
    const first = qb({ questionId: "q-x", selectedIndex: 1, isCorrect: true, attemptedAt: "2026-08-17T12:00:00.000Z" });
    const dup = qb({ questionId: "q-x", selectedIndex: 1, isCorrect: true, attemptedAt: "2026-08-17T12:00:00.300Z" });
    const folded = foldQbAttemptsByStableIdentity([first, dup]);
    assert.strictEqual(folded.length, 1);
  });

  it("does not drop distinct practices with different attemptedAt", () => {
    const first = qb({ questionId: "q-y", attemptedAt: "2026-08-17T12:00:00.000Z" });
    const later = qb({ questionId: "q-y", attemptedAt: "2026-08-17T13:00:00.000Z" });
    const folded = foldQbAttemptsByStableIdentity([first, later]);
    assert.strictEqual(folded.length, 2);
  });

  it("merges local + server and folds duplicates (local first wins key collision)", () => {
    const local = { "q1": [qb({ questionId: "q1", attemptedAt: "2026-08-17T10:00:00.000Z" })] };
    const server = { "q1": [qb({ questionId: "q1", attemptedAt: "2026-08-17T10:00:00.500Z" })] };
    const merged = mergeQbAttemptStores(local, server);
    assert.strictEqual(merged["q1"]?.length, 1);
  });

  it("unions different attempts across questions", () => {
    const local = { "q1": [qb({ questionId: "q1" })] };
    const server = { "q2": [qb({ questionId: "q2" })] };
    const merged = mergeQbAttemptStores(local, server);
    assert.strictEqual(Object.keys(merged).length, 2);
  });
});
