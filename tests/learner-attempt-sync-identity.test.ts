import { describe, it } from "node:test";
import assert from "node:assert";
import type { LearnerAttemptRecord } from "@/types/learning";
import {
  attemptContentIdentityKey,
  attemptContentIdentityKeyFromRecord,
  foldAttemptsByStableIdentity,
  mergeAttemptLists,
  normalizeConfirmedAtForIdentity,
} from "@/lib/learner-attempt-identity";
import { detectAttemptConflicts } from "@/lib/learner-state-sync";

let attemptCounter = 0;

function attempt(overrides: Partial<LearnerAttemptRecord> & {
  id?: string;
  confirmedText?: string;
  confirmedAt?: string;
  taskId?: string;
} = {}): LearnerAttemptRecord {
  attemptCounter += 1;
  return {
    version: 1,
    id: overrides.id ?? `attempt-${attemptCounter}`,
    courseId: overrides.courseId ?? "course-1",
    courseVersionId: overrides.courseVersionId ?? "cv-1",
    offeringId: overrides.offeringId ?? "offering-1",
    knowledgePointId: overrides.knowledgePointId ?? "kp-1",
    surface: overrides.surface ?? "subjective-writing",
    taskId: overrides.taskId ?? `task-${attemptCounter}`,
    segmentId: overrides.segmentId ?? null,
    confirmedText: overrides.confirmedText ?? "合成确认作答",
    confirmedAt: overrides.confirmedAt ?? "2026-08-16T10:00:00.000Z",
    scoringStandard: overrides.scoringStandard ?? { id: "scoring-1", version: "1", authority: "nur-platform" },
    criterionResults: overrides.criterionResults ?? [
      { criterionId: "sc-1", memoryCriterionId: "memory-evidence-completeness", status: "missing" },
    ],
    answerConfidence: overrides.answerConfidence ?? "unverified",
  };
}

describe("attempt content identity", () => {
  it("normalizes confirmedAt to second precision", () => {
    assert.strictEqual(
      normalizeConfirmedAtForIdentity("2026-08-16T10:00:00.450Z"),
      "2026-08-16T10:00:00.000Z",
    );
  });

  it("builds the same key for same logical content with ms drift", () => {
    const a = attempt({
      id: "local-uuid",
      taskId: "task-same",
      confirmedText: " 口淡乏味 ",
      confirmedAt: "2026-08-16T10:00:00.120Z",
    });
    const b = attempt({
      id: "server-cuid",
      taskId: "task-same",
      confirmedText: "口淡乏味",
      confirmedAt: "2026-08-16T10:00:00.999Z",
    });
    assert.strictEqual(
      attemptContentIdentityKeyFromRecord(a),
      attemptContentIdentityKeyFromRecord(b),
    );
  });

  it("treats different confirmedAt seconds as distinct re-confirms", () => {
    const a = attemptContentIdentityKey({
      courseId: "c",
      knowledgePointId: "k",
      surface: "subjective-writing",
      taskId: "t",
      segmentId: null,
      confirmedText: "same",
      confirmedAt: "2026-08-16T10:00:00.000Z",
    });
    const b = attemptContentIdentityKey({
      courseId: "c",
      knowledgePointId: "k",
      surface: "subjective-writing",
      taskId: "t",
      segmentId: null,
      confirmedText: "same",
      confirmedAt: "2026-08-16T10:00:01.000Z",
    });
    assert.notStrictEqual(a, b);
  });
});

describe("foldAttemptsByStableIdentity / mergeAttemptLists", () => {
  it("keeps a single row when local UUID and server cuid share content identity", () => {
    const local = attempt({
      id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      taskId: "task-x",
      confirmedText: "消谷善饥要点",
      confirmedAt: "2026-08-16T12:00:00.000Z",
    });
    const serverClone = attempt({
      id: "clxxxxxxxxlegacycuid001",
      taskId: "task-x",
      confirmedText: "消谷善饥要点",
      confirmedAt: "2026-08-16T12:00:00.200Z",
    });
    const merged = mergeAttemptLists([local], [serverClone]);
    assert.strictEqual(merged.length, 1);
    assert.strictEqual(merged[0]?.id, local.id);
  });

  it("does not drop distinct re-confirms with different confirmedAt", () => {
    const first = attempt({
      id: "id-1",
      taskId: "task-y",
      confirmedText: "同一答文再确认",
      confirmedAt: "2026-08-16T12:00:00.000Z",
    });
    const second = attempt({
      id: "id-2",
      taskId: "task-y",
      confirmedText: "同一答文再确认",
      confirmedAt: "2026-08-16T13:00:00.000Z",
    });
    const merged = foldAttemptsByStableIdentity([first, second]);
    assert.strictEqual(merged.length, 2);
  });

  it("unions different ids with different content", () => {
    const a = attempt({ id: "a", taskId: "t1", confirmedText: "A" });
    const b = attempt({ id: "b", taskId: "t2", confirmedText: "B" });
    const merged = mergeAttemptLists([a], [b]);
    assert.strictEqual(merged.length, 2);
  });

  it("prefers newer confirmedAt when the same id appears twice", () => {
    const older = attempt({
      id: "same-id",
      taskId: "t",
      confirmedText: "v1",
      confirmedAt: "2026-08-16T10:00:00.000Z",
    });
    const newer = attempt({
      id: "same-id",
      taskId: "t",
      confirmedText: "v2",
      confirmedAt: "2026-08-16T11:00:00.000Z",
    });
    // Same id cannot have two content keys in fold after id-union prefers newer
    const merged = foldAttemptsByStableIdentity([older, newer]);
    assert.strictEqual(merged.length, 1);
    assert.strictEqual(merged[0]?.confirmedText, "v2");
  });

  it("caps at 300 after fold", () => {
    const many = Array.from({ length: 320 }, (_, i) =>
      attempt({
        id: `id-${i}`,
        taskId: `task-${i}`,
        confirmedText: `text-${i}`,
        confirmedAt: new Date(Date.UTC(2026, 7, 1, 0, 0, i)).toISOString(),
      }),
    );
    assert.strictEqual(foldAttemptsByStableIdentity(many).length, 300);
  });
});

describe("detectAttemptConflicts vs content fold", () => {
  it("does not treat different-id same-content as a conflict (fold owns that case)", () => {
    const local = [attempt({ id: "uuid-1", taskId: "t", confirmedText: "x", confirmedAt: "2026-08-16T10:00:00.000Z" })];
    const server = [attempt({ id: "cuid-1", taskId: "t", confirmedText: "x", confirmedAt: "2026-08-16T10:00:00.000Z" })];
    assert.deepStrictEqual(
      detectAttemptConflicts(local, server, "qa@nur.test", "2026-08-17T10:00:00.000Z"),
      [],
    );
    assert.strictEqual(mergeAttemptLists(local, server).length, 1);
  });

  it("still records same-id different-content conflicts", () => {
    const local = [attempt({ id: "att-x", confirmedText: "本机" })];
    const server = [attempt({ id: "att-x", confirmedText: "云端" })];
    const conflicts = detectAttemptConflicts(local, server, "qa@nur.test", "2026-08-17T10:00:00.000Z");
    assert.strictEqual(conflicts.length, 1);
    assert.strictEqual(conflicts[0]?.reason, "same-id-different-content");
  });
});
