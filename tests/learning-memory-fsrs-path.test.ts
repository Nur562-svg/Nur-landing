import { describe, it } from "node:test";
import assert from "node:assert";
import type { LearnerAttemptRecord, LearningMemoryState } from "@/types/learning";
import {
  applyConfirmedAttemptToState,
  createDefaultLearningMemoryState,
} from "@/lib/learning-memory";

function makeAttempt(overrides: {
  id: string;
  confirmedAt: string;
  taskId?: string;
  memoryCriterionId?: string;
  status?: "present" | "missing";
}): LearnerAttemptRecord {
  const memoryCriterionId = overrides.memoryCriterionId ?? "memory-evidence-completeness";
  return {
    version: 1,
    id: overrides.id,
    courseId: "course-1",
    courseVersionId: "cv-1",
    offeringId: "off-1",
    knowledgePointId: "kp-1",
    surface: "subjective-writing",
    taskId: overrides.taskId ?? "task-term",
    segmentId: null,
    confirmedText: "学生确认作答",
    confirmedAt: overrides.confirmedAt,
    scoringStandard: { id: "ss-1", version: "1", authority: "nur-platform" },
    criterionResults: [
      {
        criterionId: "sc-1",
        memoryCriterionId,
        status: overrides.status ?? "missing",
      },
    ],
    answerConfidence: "unverified",
  };
}

describe("applyConfirmedAttemptToState FSRS real path", () => {
  it("rates missing as again and reaches relearning + lapses>=2 after two misses", () => {
    const criterionId = "memory-evidence-completeness";
    let state: LearningMemoryState = createDefaultLearningMemoryState();

    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({
        id: "a1",
        confirmedAt: "2026-08-17T10:00:00.000Z",
        status: "missing",
        memoryCriterionId: criterionId,
      }),
    );
    const afterOne = state.fsrsState?.criteria[criterionId];
    assert.ok(afterOne);
    assert.strictEqual(afterOne.state, "learning");
    assert.strictEqual(afterOne.lapses, 1);

    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({
        id: "a2",
        confirmedAt: "2026-08-17T11:00:00.000Z",
        taskId: "task-short",
        status: "missing",
        memoryCriterionId: criterionId,
      }),
    );
    const afterTwo = state.fsrsState?.criteria[criterionId];
    assert.ok(afterTwo);
    assert.strictEqual(afterTwo.state, "relearning");
    assert.strictEqual(afterTwo.lapses, 2);
    // Matches selectFsrsHighRiskItems gate (relearning || lapses >= 2)
    assert.ok(afterTwo.state === "relearning" || afterTwo.lapses >= 2);
  });

  it("rates present as good without increasing lapses", () => {
    const criterionId = "memory-evidence-completeness";
    let state = createDefaultLearningMemoryState();
    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({
        id: "b1",
        confirmedAt: "2026-08-17T10:00:00.000Z",
        status: "present",
        memoryCriterionId: criterionId,
      }),
    );
    const s = state.fsrsState?.criteria[criterionId];
    assert.ok(s);
    assert.strictEqual(s.state, "review");
    assert.strictEqual(s.lapses, 0);
    assert.strictEqual(s.reps, 1);
  });

  it("does not double-rate FSRS when an accepted review task completes on the same confirm", () => {
    const criterionId = "memory-evidence-completeness";
    let state: LearningMemoryState = {
      ...createDefaultLearningMemoryState(),
      reviewTasks: [{
        version: 1,
        id: "review-1",
        courseId: "course-1",
        knowledgePointId: "kp-1",
        criterionIds: [criterionId],
        resolvedCriterionIds: [],
        returnTargets: [{ surface: "subjective-writing", taskId: "task-term", segmentId: null }],
        status: "accepted",
        proposedAt: "2026-08-17T09:00:00.000Z",
        acceptedAt: "2026-08-17T09:05:00.000Z",
        dueAt: "2026-08-19T09:05:00.000Z",
        declinedAt: null,
        completedAt: null,
        lastPromptedAttemptId: "seed",
      }],
    };

    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({
        id: "c1",
        confirmedAt: "2026-08-17T12:00:00.000Z",
        status: "present",
        memoryCriterionId: criterionId,
      }),
    );

    const task = state.reviewTasks.find((t) => t.id === "review-1");
    assert.strictEqual(task?.status, "completed");
    const s = state.fsrsState?.criteria[criterionId];
    assert.ok(s);
    // One rating only: new → review on good (reps=1). Double-rate would yield reps=2.
    assert.strictEqual(s.reps, 1);
    assert.strictEqual(s.lapses, 0);
    assert.strictEqual(s.state, "review");
  });

  it("keeps lapses after recovery good while moving state back to review", () => {
    const criterionId = "memory-evidence-completeness";
    let state = createDefaultLearningMemoryState();
    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({ id: "d1", confirmedAt: "2026-08-17T10:00:00.000Z", status: "missing", memoryCriterionId: criterionId }),
    );
    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({ id: "d2", confirmedAt: "2026-08-17T11:00:00.000Z", status: "missing", memoryCriterionId: criterionId }),
    );
    state = applyConfirmedAttemptToState(
      state,
      makeAttempt({ id: "d3", confirmedAt: "2026-08-17T12:00:00.000Z", status: "present", memoryCriterionId: criterionId }),
    );
    const s = state.fsrsState?.criteria[criterionId];
    assert.ok(s);
    assert.strictEqual(s.state, "review");
    assert.strictEqual(s.lapses, 2);
  });
});
