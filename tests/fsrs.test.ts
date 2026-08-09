import { describe, it } from "node:test";
import assert from "node:assert";
import {
  createNewFsrsState,
  defaultFsrsParameters,
  fsrsMaxIntervalDays,
  fsrsMinIntervalDays,
  fsrsNextInterval,
  fsrsNextState,
  fsrsRequestedRetention,
  fsrsRetrievability,
  fsrsScheduleReview,
} from "@/lib/fsrs";
import type { FsrsCriterionState } from "@/types/learning";

describe("fsrsRetrievability", () => {
  it("returns 0 when stability is zero", () => {
    assert.strictEqual(fsrsRetrievability(1, 0), 0);
  });

  it("returns 0 when stability is negative", () => {
    assert.strictEqual(fsrsRetrievability(5, -1), 0);
  });

  it("returns 1.0 at elapsed=0 with positive stability", () => {
    assert.strictEqual(fsrsRetrievability(0, 10), 1);
  });

  it("decreases as elapsed days increase", () => {
    const r1 = fsrsRetrievability(1, 10);
    const r2 = fsrsRetrievability(5, 10);
    const r3 = fsrsRetrievability(20, 10);
    assert.ok(r1 > r2);
    assert.ok(r2 > r3);
    assert.ok(r3 >= 0 && r3 < 1);
  });

  it("higher stability yields higher retrievability at same elapsed time", () => {
    const rLow = fsrsRetrievability(5, 3);
    const rHigh = fsrsRetrievability(5, 30);
    assert.ok(rHigh > rLow);
  });
});

describe("fsrsNextInterval", () => {
  const params = defaultFsrsParameters();

  it("returns minimum interval when stability is zero", () => {
    const state: FsrsCriterionState = {
      state: "new",
      difficulty: 0,
      stability: 0,
      reps: 0,
      lapses: 0,
      lastReviewAt: null,
    };
    assert.strictEqual(fsrsNextInterval(state, params, fsrsRequestedRetention), fsrsMinIntervalDays);
  });

  it("returns minimum interval when stability is negative", () => {
    const state: FsrsCriterionState = {
      state: "learning",
      difficulty: 5,
      stability: -1,
      reps: 1,
      lapses: 0,
      lastReviewAt: new Date().toISOString(),
    };
    assert.strictEqual(fsrsNextInterval(state, params, fsrsRequestedRetention), fsrsMinIntervalDays);
  });

  it("returns clamped interval within [min, max]", () => {
    const state: FsrsCriterionState = {
      state: "review",
      difficulty: 5,
      stability: 1000,
      reps: 10,
      lapses: 0,
      lastReviewAt: new Date().toISOString(),
    };
    const interval = fsrsNextInterval(state, params, fsrsRequestedRetention);
    assert.ok(interval >= fsrsMinIntervalDays);
    assert.ok(interval <= fsrsMaxIntervalDays);
  });

  it("increases with higher stability", () => {
    const lowStability: FsrsCriterionState = {
      state: "review",
      difficulty: 5,
      stability: 2,
      reps: 3,
      lapses: 0,
      lastReviewAt: new Date().toISOString(),
    };
    const highStability: FsrsCriterionState = {
      ...lowStability,
      stability: 20,
    };
    const lowInterval = fsrsNextInterval(lowStability, params, fsrsRequestedRetention);
    const highInterval = fsrsNextInterval(highStability, params, fsrsRequestedRetention);
    assert.ok(highInterval >= lowInterval);
  });
});

describe("fsrsNextState — new state transitions", () => {
  const params = defaultFsrsParameters();
  const now = "2026-08-02T10:00:00.000Z";

  it("transitions new → learning on 'again' rating", () => {
    const state = createNewFsrsState();
    const next = fsrsNextState(state, "again", now, params);
    assert.strictEqual(next.state, "learning");
    assert.strictEqual(next.reps, 1);
    assert.strictEqual(next.lapses, 1);
    assert.strictEqual(next.lastReviewAt, now);
    assert.ok(next.difficulty >= 1 && next.difficulty <= 10);
    assert.ok(next.stability >= 0.1);
  });

  it("transitions new → review on 'good' rating", () => {
    const state = createNewFsrsState();
    const next = fsrsNextState(state, "good", now, params);
    assert.strictEqual(next.state, "review");
    assert.strictEqual(next.reps, 1);
    assert.strictEqual(next.lapses, 0);
    assert.ok(next.stability > 0);
  });

  it("transitions new → review on 'hard' rating", () => {
    const state = createNewFsrsState();
    const next = fsrsNextState(state, "hard", now, params);
    assert.strictEqual(next.state, "review");
    assert.strictEqual(next.reps, 1);
    assert.strictEqual(next.lapses, 0);
  });
});

describe("fsrsNextState — review state transitions", () => {
  const params = defaultFsrsParameters();
  const now = "2026-08-02T10:00:00.000Z";
  const reviewState: FsrsCriterionState = {
    state: "review",
    difficulty: 5,
    stability: 10,
    reps: 3,
    lapses: 0,
    lastReviewAt: "2026-07-30T10:00:00.000Z",
  };

  it("transitions review → relearning on 'again'", () => {
    const next = fsrsNextState(reviewState, "again", now, params);
    assert.strictEqual(next.state, "relearning");
    assert.strictEqual(next.reps, 4);
    assert.strictEqual(next.lapses, 1);
    assert.ok(next.stability >= 0.1);
  });

  it("stays in review on 'good' and increases stability", () => {
    const next = fsrsNextState(reviewState, "good", now, params);
    assert.strictEqual(next.state, "review");
    assert.strictEqual(next.reps, 4);
    assert.strictEqual(next.lapses, 0);
    assert.ok(next.stability > reviewState.stability * 0.5);
  });

  it("keeps difficulty within [1, 10]", () => {
    for (const rating of ["again", "hard", "good"] as const) {
      const next = fsrsNextState(reviewState, rating, now, params);
      assert.ok(next.difficulty >= 1 && next.difficulty <= 10, `difficulty ${next.difficulty} out of range for ${rating}`);
    }
  });
});

describe("fsrsScheduleReview", () => {
  const params = defaultFsrsParameters();
  const now = "2026-08-02T10:00:00.000Z";

  it("returns nextState, intervalDays, and dueAt for new state", () => {
    const state = createNewFsrsState();
    const result = fsrsScheduleReview(state, "good", now, params);
    assert.strictEqual(result.nextState.state, "review");
    assert.ok(result.intervalDays >= fsrsMinIntervalDays);
    assert.ok(result.intervalDays <= fsrsMaxIntervalDays);
    const dueMs = Date.parse(result.dueAt);
    const nowMs = Date.parse(now);
    assert.ok(dueMs > nowMs);
    const expectedDueMs = nowMs + result.intervalDays * 24 * 60 * 60 * 1000;
    assert.strictEqual(dueMs, expectedDueMs);
  });

  it("produces a dueAt that is intervalDays after now", () => {
    const reviewState: FsrsCriterionState = {
      state: "review",
      difficulty: 5,
      stability: 15,
      reps: 5,
      lapses: 0,
      lastReviewAt: "2026-07-25T10:00:00.000Z",
    };
    const result = fsrsScheduleReview(reviewState, "good", now, params);
    const elapsed = (Date.parse(result.dueAt) - Date.parse(now)) / (24 * 60 * 60 * 1000);
    assert.strictEqual(Math.round(elapsed), result.intervalDays);
  });
});

describe("createNewFsrsState", () => {
  it("returns a clean new state", () => {
    const state = createNewFsrsState();
    assert.strictEqual(state.state, "new");
    assert.strictEqual(state.difficulty, 0);
    assert.strictEqual(state.stability, 0);
    assert.strictEqual(state.reps, 0);
    assert.strictEqual(state.lapses, 0);
    assert.strictEqual(state.lastReviewAt, null);
  });
});

describe("defaultFsrsParameters", () => {
  it("returns 19 parameters", () => {
    assert.strictEqual(defaultFsrsParameters().length, 19);
  });

  it("all parameters are positive numbers", () => {
    for (const p of defaultFsrsParameters()) {
      assert.ok(typeof p === "number" && p > 0);
    }
  });
});
