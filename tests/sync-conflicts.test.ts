import { describe, it } from "node:test";
import assert from "node:assert";
import type {
  FsrsCriterionState,
  LearnerAttemptRecord,
  LearningMemoryState,
} from "@/types/learning";
import {
  applyConflictResolutionToMemory,
  detectAttemptConflicts,
  detectFsrsConflicts,
  parseSyncConflictStore,
  type SyncConflict,
  type SyncConflictStore,
} from "@/lib/learner-state-sync";
import { createDefaultLearningMemoryState } from "@/lib/learning-memory";

const BASELINE = "2026-08-15T10:00:00.000Z";
const DETECTED_AT = "2026-08-17T10:00:00.000Z";

function fsrs(overrides: Partial<FsrsCriterionState> = {}): FsrsCriterionState {
  return {
    state: "review",
    difficulty: 5,
    stability: 4,
    reps: 2,
    lapses: 1,
    lastReviewAt: "2026-08-16T10:00:00.000Z",
    ...overrides,
  };
}

let attemptCounter = 0;

function attempt(overrides: {
  id?: string;
  confirmedText?: string;
  confirmedAt?: string;
} = {}): LearnerAttemptRecord {
  attemptCounter += 1;
  return {
    version: 1,
    id: overrides.id ?? `attempt-${attemptCounter}`,
    courseId: "course-1",
    courseVersionId: "cv-1",
    offeringId: "offering-1",
    knowledgePointId: "kp-1",
    surface: "subjective-writing",
    taskId: `task-${attemptCounter}`,
    segmentId: null,
    confirmedText: overrides.confirmedText ?? "合成确认作答",
    confirmedAt: overrides.confirmedAt ?? "2026-08-16T10:00:00.000Z",
    scoringStandard: { id: "scoring-1", version: "1", authority: "nur-platform" },
    criterionResults: [
      { criterionId: "sc-1", memoryCriterionId: "memory-evidence-completeness", status: "missing" },
    ],
    answerConfidence: "unverified",
  };
}

describe("detectFsrsConflicts", () => {
  it("records a conflict when both sides updated after the baseline with different semantics", () => {
    const local = { "memory-a": fsrs({ stability: 3, lastReviewAt: "2026-08-16T08:00:00.000Z" }) };
    const server = { "memory-a": fsrs({ stability: 8, lastReviewAt: "2026-08-16T09:00:00.000Z" }) };
    const conflicts = detectFsrsConflicts(local, server, BASELINE, "qa@nur.test", DETECTED_AT);

    assert.strictEqual(conflicts.length, 1);
    const conflict = conflicts[0];
    assert.strictEqual(conflict?.id, "fsrs:memory-a");
    assert.strictEqual(conflict?.type, "fsrs");
    assert.strictEqual(conflict?.reason, "both-updated-since-last-merge");
    assert.strictEqual(conflict?.userEmail, "qa@nur.test");
    assert.strictEqual(conflict?.local.kind, "fsrs");
    assert.strictEqual(conflict?.local.kind === "fsrs" ? conflict.local.fsrs.stability : null, 3);
    assert.strictEqual(conflict?.server.kind === "fsrs" ? conflict.server.fsrs.stability : null, 8);
  });

  it("stays silent when only one side changed after the baseline", () => {
    const local = { "memory-a": fsrs({ stability: 3, lastReviewAt: "2026-08-16T08:00:00.000Z" }) };
    const serverOld = { "memory-a": fsrs({ stability: 8, lastReviewAt: "2026-08-14T09:00:00.000Z" }) };
    assert.deepStrictEqual(
      detectFsrsConflicts(local, serverOld, BASELINE, "qa@nur.test", DETECTED_AT),
      [],
    );

    const localOld = { "memory-a": fsrs({ stability: 3, lastReviewAt: "2026-08-14T08:00:00.000Z" }) };
    const server = { "memory-a": fsrs({ stability: 8, lastReviewAt: "2026-08-16T09:00:00.000Z" }) };
    assert.deepStrictEqual(
      detectFsrsConflicts(localOld, server, BASELINE, "qa@nur.test", DETECTED_AT),
      [],
    );
  });

  it("stays silent when snapshots are semantically equal regardless of timestamps", () => {
    const local = { "memory-a": fsrs({ lastReviewAt: "2026-08-16T08:00:00.000Z" }) };
    const server = { "memory-a": fsrs({ lastReviewAt: "2026-08-16T09:00:00.000Z" }) };
    assert.deepStrictEqual(
      detectFsrsConflicts(local, server, BASELINE, "qa@nur.test", DETECTED_AT),
      [],
    );
  });

  it("uses timestamp priority without conflicts when no baseline exists (first merge)", () => {
    const local = { "memory-a": fsrs({ stability: 3 }) };
    const server = { "memory-a": fsrs({ stability: 8 }) };
    assert.deepStrictEqual(
      detectFsrsConflicts(local, server, null, "qa@nur.test", DETECTED_AT),
      [],
    );
  });

  it("ignores criteria only one side has", () => {
    const local = { "memory-a": fsrs() };
    const server = { "memory-b": fsrs({ stability: 9 }) };
    assert.deepStrictEqual(
      detectFsrsConflicts(local, server, BASELINE, "qa@nur.test", DETECTED_AT),
      [],
    );
  });
});

describe("detectAttemptConflicts", () => {
  it("records a conflict for the same id with different content", () => {
    const local = [attempt({ id: "att-x", confirmedText: "本机版本" })];
    const server = [attempt({ id: "att-x", confirmedText: "云端版本" })];
    const conflicts = detectAttemptConflicts(local, server, "qa@nur.test", DETECTED_AT);

    assert.strictEqual(conflicts.length, 1);
    assert.strictEqual(conflicts[0]?.id, "attempt:att-x");
    assert.strictEqual(conflicts[0]?.reason, "same-id-different-content");
  });

  it("stays silent for same content or different ids", () => {
    const same = [attempt({ id: "att-x", confirmedText: "相同" })];
    assert.deepStrictEqual(
      detectAttemptConflicts(same, [attempt({ id: "att-x", confirmedText: "相同" })], "qa@nur.test", DETECTED_AT),
      [],
    );
    assert.deepStrictEqual(
      detectAttemptConflicts([attempt({ id: "att-1" })], [attempt({ id: "att-2" })], "qa@nur.test", DETECTED_AT),
      [],
    );
  });
});

describe("applyConflictResolutionToMemory", () => {
  function fsrsConflict(): SyncConflict {
    return {
      version: 1,
      id: "fsrs:memory-a",
      type: "fsrs",
      refId: "memory-a",
      userEmail: "qa@nur.test",
      local: { kind: "fsrs", fsrs: fsrs({ stability: 3, lastReviewAt: "2026-08-16T08:00:00.000Z" }) },
      server: { kind: "fsrs", fsrs: fsrs({ stability: 8, lastReviewAt: "2026-08-16T09:00:00.000Z" }) },
      reason: "both-updated-since-last-merge",
      detectedAt: DETECTED_AT,
    };
  }

  it("applies the server snapshot as-is on server resolution", () => {
    const state: LearningMemoryState = {
      ...createDefaultLearningMemoryState(),
      fsrsState: { version: 2, criteria: { "memory-a": fsrs({ stability: 3 }) } },
    };
    const next = applyConflictResolutionToMemory(state, fsrsConflict(), "server", "2026-08-17T12:00:00.000Z");
    assert.strictEqual(next.fsrsState?.criteria["memory-a"]?.stability, 8);
    assert.strictEqual(next.fsrsState?.criteria["memory-a"]?.lastReviewAt, "2026-08-16T09:00:00.000Z");
  });

  it("reasserts the local snapshot with a fresh timestamp on local resolution", () => {
    const state: LearningMemoryState = {
      ...createDefaultLearningMemoryState(),
      // 模拟临时合并已把云端较新值落地
      fsrsState: { version: 2, criteria: { "memory-a": fsrs({ stability: 8 }) } },
    };
    const now = "2026-08-17T12:00:00.000Z";
    const next = applyConflictResolutionToMemory(state, fsrsConflict(), "local", now);
    assert.strictEqual(next.fsrsState?.criteria["memory-a"]?.stability, 3);
    assert.strictEqual(next.fsrsState?.criteria["memory-a"]?.lastReviewAt, now);
  });

  it("replaces the attempt by id on attempt resolution", () => {
    const conflict: SyncConflict = {
      version: 1,
      id: "attempt:att-x",
      type: "attempt",
      refId: "att-x",
      userEmail: "qa@nur.test",
      local: { kind: "attempt", attempt: attempt({ id: "att-x", confirmedText: "本机版本" }) },
      server: { kind: "attempt", attempt: attempt({ id: "att-x", confirmedText: "云端版本" }) },
      reason: "same-id-different-content",
      detectedAt: DETECTED_AT,
    };
    const state: LearningMemoryState = {
      ...createDefaultLearningMemoryState(),
      attempts: [attempt({ id: "att-x", confirmedText: "临时合并版" }), attempt({ id: "att-keep" })],
    };
    const next = applyConflictResolutionToMemory(state, conflict, "server", "2026-08-17T12:00:00.000Z");
    assert.strictEqual(next.attempts.length, 2);
    assert.strictEqual(next.attempts.find((a) => a.id === "att-x")?.confirmedText, "云端版本");
    assert.strictEqual(next.attempts.find((a) => a.id === "att-keep")?.id, "att-keep");
  });
});

describe("parseSyncConflictStore", () => {
  it("round-trips a valid store", () => {
    const store: SyncConflictStore = {
      version: 1,
      items: [
        {
          version: 1,
          id: "fsrs:memory-a",
          type: "fsrs",
          refId: "memory-a",
          userEmail: "qa@nur.test",
          local: { kind: "fsrs", fsrs: fsrs() },
          server: { kind: "fsrs", fsrs: fsrs({ stability: 9 }) },
          reason: "both-updated-since-last-merge",
          detectedAt: DETECTED_AT,
        },
      ],
    };
    const parsed = parseSyncConflictStore(JSON.stringify(store));
    assert.strictEqual(parsed.items.length, 1);
    assert.strictEqual(parsed.items[0]?.id, "fsrs:memory-a");
    assert.strictEqual(parsed.items[0]?.server.kind === "fsrs" ? parsed.items[0].server.fsrs.stability : null, 9);
  });

  it("returns an empty store for null, malformed JSON, or invalid items", () => {
    assert.deepStrictEqual(parseSyncConflictStore(null), { version: 1, items: [] });
    assert.deepStrictEqual(parseSyncConflictStore("{not json"), { version: 1, items: [] });
    assert.deepStrictEqual(parseSyncConflictStore('{"version":2,"items":[]}'), { version: 1, items: [] });

    const invalidItem = JSON.stringify({
      version: 1,
      items: [
        { version: 1, id: "fsrs:bad", type: "fsrs", refId: "bad", userEmail: "x", reason: "both-updated-since-last-merge", detectedAt: DETECTED_AT,
          local: { kind: "fsrs", fsrs: { state: "bogus", difficulty: 1, stability: 1, reps: 0, lapses: 0, lastReviewAt: null } },
          server: { kind: "fsrs", fsrs: fsrs() } },
      ],
    });
    assert.deepStrictEqual(parseSyncConflictStore(invalidItem), { version: 1, items: [] });
  });
});
