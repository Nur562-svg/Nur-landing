import { describe, it } from "node:test";
import assert from "node:assert";
import type {
  LearnerAttemptRecord,
  StructuralAssistanceRule,
} from "@/types/learning";
import {
  createDefaultLearningMemoryState,
  matchesStructuralAssistanceRule,
  selectMissingAssistanceRules,
  selectRepeatedOmissions,
  selectLatestConfirmedAttempt,
  parseLearningMemoryJson,
  repeatedOmissionThreshold,
} from "@/lib/learning-memory";

describe("createDefaultLearningMemoryState", () => {
  it("returns version 2 with empty collections", () => {
    const state = createDefaultLearningMemoryState();
    assert.strictEqual(state.version, 2);
    assert.strictEqual(state.attempts.length, 0);
    assert.strictEqual(state.reviewTasks.length, 0);
    assert.strictEqual(state.standardUpdateNotices.length, 0);
    assert.strictEqual(state.fsrsState, null);
  });

  it("has default preferences enabled correctly", () => {
    const state = createDefaultLearningMemoryState();
    assert.strictEqual(state.preferences.currentAnswerEnabled, true);
    assert.strictEqual(state.preferences.confirmedHistoryEnabled, false);
    assert.strictEqual(state.preferences.nextStepPromptEnabled, true);
    assert.strictEqual(state.preferences.historySuggestionHandled, false);
  });
});

describe("matchesStructuralAssistanceRule", () => {
  const rule: StructuralAssistanceRule = {
    criterionId: "c1",
    memoryCriterionId: "mc1",
    signalGroups: [["辨证", "分析"]],
    nextStepPrompt: "prompt",
    rewriteSuggestion: "rewrite",
  };

  it("returns true when text contains at least one signal from each group", () => {
    assert.strictEqual(matchesStructuralAssistanceRule("请辨证论治", rule), true);
  });

  it("returns true with case-insensitive match", () => {
    assert.strictEqual(matchesStructuralAssistanceRule("请分析病情", rule), true);
  });

  it("returns false when no signal matches", () => {
    assert.strictEqual(matchesStructuralAssistanceRule("无关内容", rule), false);
  });

  it("requires all signal groups to match", () => {
    const multiGroupRule: StructuralAssistanceRule = {
      criterionId: "c2",
      memoryCriterionId: "mc2",
      signalGroups: [["辨证"], ["方剂", "处方"]],
      nextStepPrompt: "prompt",
      rewriteSuggestion: "rewrite",
    };
    // Only first group matches
    assert.strictEqual(matchesStructuralAssistanceRule("辨证论治", multiGroupRule), false);
    // Both groups match
    assert.strictEqual(matchesStructuralAssistanceRule("辨证用方剂", multiGroupRule), true);
  });
});

describe("selectMissingAssistanceRules", () => {
  const rules: StructuralAssistanceRule[] = [
    {
      criterionId: "c1",
      memoryCriterionId: "mc1",
      signalGroups: [["病因"]],
      nextStepPrompt: "p1",
      rewriteSuggestion: "r1",
    },
    {
      criterionId: "c2",
      memoryCriterionId: "mc2",
      signalGroups: [["病机"]],
      nextStepPrompt: "p2",
      rewriteSuggestion: "r2",
    },
  ];

  it("returns all rules when text matches none", () => {
    const missing = selectMissingAssistanceRules("无关内容", rules);
    assert.strictEqual(missing.length, 2);
  });

  it("returns only unmatched rules", () => {
    const missing = selectMissingAssistanceRules("病因分析", rules);
    assert.strictEqual(missing.length, 1);
    assert.strictEqual(missing[0].criterionId, "c2");
  });

  it("returns empty when all rules match", () => {
    const missing = selectMissingAssistanceRules("病因和病机", rules);
    assert.strictEqual(missing.length, 0);
  });
});

describe("selectRepeatedOmissions", () => {
  function makeAttempt(
    id: string,
    taskId: string,
    criterionResults: { criterionId: string; memoryCriterionId: string; status: "present" | "missing" }[],
    confirmedAt: string,
  ): LearnerAttemptRecord {
    return {
      version: 1,
      id,
      courseId: "course-1",
      courseVersionId: "v1",
      offeringId: "o1",
      knowledgePointId: "kp-1",
      surface: "subjective-writing",
      taskId,
      segmentId: null,
      confirmedText: "test",
      confirmedAt,
      scoringStandard: { id: "s1", version: "1", authority: "nur-platform" },
      criterionResults,
      answerConfidence: "unverified",
    };
  }

  it("returns empty for no attempts", () => {
    const result = selectRepeatedOmissions([], "course-1", "kp-1");
    assert.strictEqual(result.length, 0);
  });

  it("returns empty when omissions are below threshold", () => {
    const attempts = [
      makeAttempt("a1", "task-1", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T00:00:00Z"),
      makeAttempt("a2", "task-2", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T01:00:00Z"),
    ];
    const result = selectRepeatedOmissions(attempts, "course-1", "kp-1");
    assert.strictEqual(result.length, 0);
  });

  it("detects repeated omission at threshold", () => {
    const attempts = [
      makeAttempt("a1", "task-1", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T00:00:00Z"),
      makeAttempt("a2", "task-2", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T01:00:00Z"),
      makeAttempt("a3", "task-3", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T02:00:00Z"),
    ];
    const result = selectRepeatedOmissions(attempts, "course-1", "kp-1");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].criterionId, "mc1");
    assert.strictEqual(result[0].distinctTaskCount, repeatedOmissionThreshold);
  });

  it("uses latest attempt per task key", () => {
    const attempts = [
      makeAttempt("a1", "task-1", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T00:00:00Z"),
      makeAttempt("a2", "task-1", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "present" }], "2026-08-01T01:00:00Z"),
      makeAttempt("a3", "task-2", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T02:00:00Z"),
      makeAttempt("a4", "task-3", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T03:00:00Z"),
    ];
    // task-1 latest is "present", so only task-2 and task-3 have missing → below threshold
    const result = selectRepeatedOmissions(attempts, "course-1", "kp-1");
    assert.strictEqual(result.length, 0);
  });

  it("filters by courseId and knowledgePointId", () => {
    const attempts = [
      makeAttempt("a1", "task-1", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T00:00:00Z"),
      makeAttempt("a2", "task-2", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T01:00:00Z"),
      makeAttempt("a3", "task-3", [{ criterionId: "c1", memoryCriterionId: "mc1", status: "missing" }], "2026-08-01T02:00:00Z"),
    ];
    // Different course
    const result = selectRepeatedOmissions(attempts, "course-2", "kp-1");
    assert.strictEqual(result.length, 0);
  });
});

describe("selectLatestConfirmedAttempt", () => {
  const state = createDefaultLearningMemoryState();
  const baseAttempt: LearnerAttemptRecord = {
    version: 1,
    id: "a1",
    courseId: "course-1",
    courseVersionId: "v1",
    offeringId: "o1",
    knowledgePointId: "kp-1",
    surface: "subjective-writing",
    taskId: "task-1",
    segmentId: null,
    confirmedText: "test",
    confirmedAt: "2026-08-01T00:00:00Z",
    scoringStandard: { id: "s1", version: "1", authority: "nur-platform" },
    criterionResults: [{ criterionId: "c1", memoryCriterionId: "mc1", status: "present" }],
    answerConfidence: "unverified",
  };

  it("returns null when no attempts exist", () => {
    const result = selectLatestConfirmedAttempt(state, {
      courseId: "course-1",
      knowledgePointId: "kp-1",
      surface: "subjective-writing",
      taskId: "task-1",
      segmentId: null,
    });
    assert.strictEqual(result, null);
  });

  it("returns the latest matching attempt", () => {
    const laterAttempt: LearnerAttemptRecord = {
      ...baseAttempt,
      id: "a2",
      confirmedAt: "2026-08-02T00:00:00Z",
    };
    const stateWithAttempts = {
      ...state,
      attempts: [baseAttempt, laterAttempt],
    };
    const result = selectLatestConfirmedAttempt(stateWithAttempts, {
      courseId: "course-1",
      knowledgePointId: "kp-1",
      surface: "subjective-writing",
      taskId: "task-1",
      segmentId: null,
    });
    assert.ok(result !== null);
    assert.strictEqual(result.id, "a2");
  });

  it("does not match different surface", () => {
    const stateWithAttempt = { ...state, attempts: [baseAttempt] };
    const result = selectLatestConfirmedAttempt(stateWithAttempt, {
      courseId: "course-1",
      knowledgePointId: "kp-1",
      surface: "case-reasoning",
      taskId: "task-1",
      segmentId: null,
    });
    assert.strictEqual(result, null);
  });
});

describe("parseLearningMemoryJson", () => {
  it("returns default state for null", () => {
    const state = parseLearningMemoryJson(null);
    assert.strictEqual(state.version, 2);
    assert.strictEqual(state.attempts.length, 0);
  });

  it("returns default state for empty string", () => {
    const state = parseLearningMemoryJson("");
    assert.strictEqual(state.version, 2);
  });

  it("returns default state for invalid JSON", () => {
    const state = parseLearningMemoryJson("{invalid}");
    assert.strictEqual(state.version, 2);
  });

  it("returns default state for wrong version", () => {
    const state = parseLearningMemoryJson(JSON.stringify({ version: 99 }));
    assert.strictEqual(state.version, 2);
  });

  it("parses valid v1 state", () => {
    const valid = {
      version: 1,
      preferences: {
        currentAnswerEnabled: true,
        confirmedHistoryEnabled: false,
        nextStepPromptEnabled: true,
        historySuggestionHandled: false,
      },
      attempts: [],
      reviewTasks: [],
      standardUpdateNotices: [],
    };
    const state = parseLearningMemoryJson(JSON.stringify(valid));
    assert.strictEqual(state.version, 2);
    assert.strictEqual(state.attempts.length, 0);
  });
});
