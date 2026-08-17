import { describe, it } from "node:test";
import assert from "node:assert";
import type { LearningMemoryState } from "@/types/learning";
import type { MockExamSession } from "@/types/mock-exam";
import type { QBAttemptRecord } from "@/types/question-bank";
import {
  buildLearnerDataExport,
  buildLearnerExportFilename,
  learnerDataExportKind,
  learnerDataExportVersion,
} from "@/lib/export-learner-data";

function memoryFixture(): LearningMemoryState {
  return {
    version: 2,
    preferences: {
      currentAnswerEnabled: true,
      confirmedHistoryEnabled: false,
      nextStepPromptEnabled: true,
      historySuggestionHandled: false,
    },
    attempts: [
      {
        version: 1,
        id: "att-1",
        courseId: "course-tcm",
        courseVersionId: "cv-1",
        offeringId: "off-1",
        knowledgePointId: "kp-1",
        surface: "subjective-writing",
        taskId: "task-1",
        segmentId: null,
        confirmedText: "脉浮紧",
        confirmedAt: "2026-08-17T10:00:00.000Z",
        scoringStandard: {
          id: "score-1",
          version: "1",
          authority: "nur-platform",
        },
        criterionResults: [
          {
            criterionId: "c1",
            memoryCriterionId: "mc1",
            status: "present",
          },
        ],
        answerConfidence: "unverified",
      },
    ],
    reviewTasks: [
      {
        version: 1,
        id: "rt-1",
        courseId: "course-tcm",
        knowledgePointId: "kp-1",
        criterionIds: ["mc1"],
        resolvedCriterionIds: [],
        returnTargets: [
          {
            surface: "subjective-writing",
            taskId: "task-1",
            segmentId: null,
          },
        ],
        status: "proposed",
        proposedAt: "2026-08-17T10:00:00.000Z",
        acceptedAt: null,
        dueAt: "2026-08-19T10:00:00.000Z",
        declinedAt: null,
        completedAt: null,
        lastPromptedAttemptId: "att-1",
      },
    ],
    standardUpdateNotices: [],
    fsrsState: {
      version: 2,
      criteria: {
        mc1: {
          state: "review",
          difficulty: 5,
          stability: 1,
          reps: 1,
          lapses: 0,
          lastReviewAt: "2026-08-17T10:00:00.000Z",
        },
      },
    },
  };
}

function qb(overrides: Partial<QBAttemptRecord> = {}): QBAttemptRecord {
  return {
    questionId: overrides.questionId ?? "q-1",
    selectedIndex: overrides.selectedIndex ?? 0,
    isCorrect: overrides.isCorrect ?? false,
    attemptedAt: overrides.attemptedAt ?? "2026-08-17T11:00:00.000Z",
  };
}

function mockSession(): MockExamSession {
  return {
    version: 1,
    sessionId: "mock-1",
    courseId: "course-tcm",
    courseTitle: "中医诊断学",
    blueprintId: "bp-1",
    startedAt: "2026-08-17T09:00:00.000Z",
    completedAt: null,
    durationMinutes: 90,
    answers: [],
    objectiveEarnedPoints: 0,
    objectiveTotalPoints: 0,
    pendingReviewItemIds: [],
    abandoned: false,
  };
}

describe("buildLearnerDataExport", () => {
  it("builds a parseable snapshot with attempts, review tasks, and fsrs", () => {
    const mem = memoryFixture();
    const payload = buildLearnerDataExport({
      learningMemoryRaw: JSON.stringify(mem),
      qbAttempts: { "q-1": [qb()] },
      qbFavorites: { "q-1": true },
      mockExamSessions: { "course-tcm": [mockSession()] },
      materialAdmissionRaw: null,
      userExamStructures: {},
      account: { signedIn: true, email: "student@example.edu.cn" },
      exportedAt: "2026-08-17T12:00:00.000Z",
    });

    const roundTrip = JSON.parse(JSON.stringify(payload)) as typeof payload;
    assert.strictEqual(roundTrip.version, learnerDataExportVersion);
    assert.strictEqual(roundTrip.kind, learnerDataExportKind);
    assert.strictEqual(roundTrip.source, "browser-local-snapshot");
    assert.strictEqual(roundTrip.exportedAt, "2026-08-17T12:00:00.000Z");
    assert.strictEqual(roundTrip.account.email, "student@example.edu.cn");
    assert.strictEqual(roundTrip.counts.confirmedAttempts, 1);
    assert.strictEqual(roundTrip.counts.reviewTasks, 1);
    assert.strictEqual(roundTrip.counts.fsrsCriteria, 1);
    assert.strictEqual(roundTrip.counts.qbAttemptRows, 1);
    assert.strictEqual(roundTrip.counts.qbFavorites, 1);
    assert.strictEqual(roundTrip.counts.mockSessions, 1);
    assert.strictEqual(roundTrip.data.learningMemory.attempts[0]?.confirmedText, "脉浮紧");
    assert.ok(roundTrip.disclaimer.includes("本机"));
    assert.ok(roundTrip.notes.includes("不含 API"));
  });

  it("marks export boundary as non-granting and non-transcript", () => {
    const payload = buildLearnerDataExport({
      learningMemoryRaw: null,
      qbAttempts: {},
      qbFavorites: {},
      mockExamSessions: {},
      materialAdmissionRaw: null,
      userExamStructures: {},
      account: { signedIn: false, email: "ignored@x.com" },
    });
    assert.strictEqual(payload.account.email, null);
    assert.strictEqual(payload.exportBoundary.containsApiKeys, false);
    assert.strictEqual(payload.exportBoundary.containsCourseTruth, false);
    assert.strictEqual(payload.exportBoundary.containsRawPrivateFiles, false);
    assert.strictEqual(payload.exportBoundary.containsServerOnlyState, false);
    assert.strictEqual(payload.exportBoundary.importSupported, false);
    assert.strictEqual(payload.exportBoundary.isOfficialTranscript, false);
  });

  it("does not include wrong-question summary without courses", () => {
    const payload = buildLearnerDataExport({
      learningMemoryRaw: null,
      qbAttempts: {},
      qbFavorites: {},
      mockExamSessions: {},
      materialAdmissionRaw: null,
      userExamStructures: {},
      account: { signedIn: false, email: null },
    });
    assert.strictEqual(payload.data.wrongQuestionSummary, null);
  });
});

describe("buildLearnerExportFilename", () => {
  it("uses nur-learn-data-YYYY-MM-DD.json", () => {
    const name = buildLearnerExportFilename(new Date(2026, 7, 17, 12, 0, 0));
    assert.strictEqual(name, "nur-learn-data-2026-08-17.json");
  });
});
