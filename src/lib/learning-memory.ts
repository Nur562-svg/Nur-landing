import type {
  FsrsCriterionState,
  FsrsLearningState,
  LearnerAttemptCriterionResult,
  LearnerAttemptRecord,
  LearningAssistancePreferences,
  LearningAttemptSurface,
  LearningMemoryState,
  ReviewPlanTask,
  ReviewReturnTarget,
  ScoringAuthority,
  ScoringStandardUpdateNotice,
  StructuralAssistanceRule,
} from "@/types/learning";
import {
  createNewFsrsState,
  defaultFsrsParameters,
  fsrsNextInterval,
  fsrsNextState,
  fsrsRequestedRetention,
} from "@/lib/fsrs";
import { triggerLearnerStateSync } from "@/lib/learner-state-sync";

export const learningMemoryStorageKey = "nur-learn:learning-memory:v1";
export const learningMemoryChangeEvent = "nur-learn:learning-memory-change";
export const repeatedOmissionThreshold = 3;
export const reviewDelayHours = 48;

const maxAttempts = 300;
const maxReviewTasks = 80;
const maxStandardNotices = 40;
const maxConfirmedTextLength = 12000;

export type ConfirmedAttemptInput = {
  courseId: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
  confirmedText: string;
  scoringStandard: {
    id: string;
    version: string;
    authority: ScoringAuthority;
  };
  criterionResults: readonly LearnerAttemptCriterionResult[];
  answerConfidence: import("@/types/learning").AssessmentAnswerConfidence;
};

export type RepeatedOmission = {
  criterionId: string;
  distinctTaskCount: number;
  attemptIds: readonly string[];
};

const defaultPreferences: LearningAssistancePreferences = {
  currentAnswerEnabled: true,
  confirmedHistoryEnabled: false,
  nextStepPromptEnabled: true,
  historySuggestionHandled: false,
};

export function createDefaultLearningMemoryState(): LearningMemoryState {
  return {
    version: 2,
    preferences: { ...defaultPreferences },
    attempts: [],
    reviewTasks: [],
    standardUpdateNotices: [],
    fsrsState: null,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isNullableIsoDate(value: unknown): value is string | null {
  return value === null || isIsoDate(value);
}

function isScoringAuthority(value: unknown): value is ScoringAuthority {
  return value === "nur-platform"
    || value === "course-teacher"
    || value === "published-answer";
}

function isAttemptSurface(value: unknown): value is LearningAttemptSurface {
  return value === "subjective-writing" || value === "case-reasoning";
}

function isCriterionResult(value: unknown): value is LearnerAttemptCriterionResult {
  return isRecord(value)
    && typeof value.criterionId === "string"
    && value.criterionId.trim().length > 0
    && typeof value.memoryCriterionId === "string"
    && value.memoryCriterionId.trim().length > 0
    && (value.status === "present" || value.status === "missing");
}

function isAttempt(value: unknown): value is LearnerAttemptRecord {
  if (!isRecord(value) || !isRecord(value.scoringStandard)) {
    return false;
  }

  return value.version === 1
    && typeof value.id === "string"
    && value.id.trim().length > 0
    && typeof value.courseId === "string"
    && typeof value.courseVersionId === "string"
    && typeof value.offeringId === "string"
    && typeof value.knowledgePointId === "string"
    && isAttemptSurface(value.surface)
    && typeof value.taskId === "string"
    && (value.segmentId === null || typeof value.segmentId === "string")
    && typeof value.confirmedText === "string"
    && value.confirmedText.trim().length > 0
    && value.confirmedText.length <= maxConfirmedTextLength
    && isIsoDate(value.confirmedAt)
    && typeof value.scoringStandard.id === "string"
    && typeof value.scoringStandard.version === "string"
    && isScoringAuthority(value.scoringStandard.authority)
    && Array.isArray(value.criterionResults)
    && value.criterionResults.length > 0
    && value.criterionResults.every(isCriterionResult)
    && typeof value.answerConfidence === "string"
    && ["missing", "unverified", "source-cross-checked", "verified"].includes(value.answerConfidence);
}

function isReturnTarget(value: unknown): value is ReviewReturnTarget {
  return isRecord(value)
    && isAttemptSurface(value.surface)
    && typeof value.taskId === "string"
    && (value.segmentId === null || typeof value.segmentId === "string");
}

function isReviewTask(value: unknown): value is ReviewPlanTask {
  return isRecord(value)
    && value.version === 1
    && typeof value.id === "string"
    && typeof value.courseId === "string"
    && typeof value.knowledgePointId === "string"
    && Array.isArray(value.criterionIds)
    && value.criterionIds.length > 0
    && value.criterionIds.every((item) => typeof item === "string" && item.length > 0)
    && Array.isArray(value.resolvedCriterionIds)
    && value.resolvedCriterionIds.every((item) => typeof item === "string" && item.length > 0)
    && Array.isArray(value.returnTargets)
    && value.returnTargets.length > 0
    && value.returnTargets.every(isReturnTarget)
    && (value.status === "proposed"
      || value.status === "accepted"
      || value.status === "declined"
      || value.status === "completed")
    && isIsoDate(value.proposedAt)
    && isNullableIsoDate(value.acceptedAt)
    && isNullableIsoDate(value.dueAt)
    && isNullableIsoDate(value.declinedAt)
    && isNullableIsoDate(value.completedAt)
    && typeof value.lastPromptedAttemptId === "string";
}

function isStandardNotice(value: unknown): value is ScoringStandardUpdateNotice {
  return isRecord(value)
    && value.version === 1
    && typeof value.id === "string"
    && typeof value.courseId === "string"
    && typeof value.knowledgePointId === "string"
    && typeof value.scoringStandardId === "string"
    && typeof value.fromVersion === "string"
    && typeof value.toVersion === "string"
    && isIsoDate(value.createdAt)
    && isNullableIsoDate(value.dismissedAt);
}

function isPreferences(value: unknown): value is LearningAssistancePreferences {
  return isRecord(value)
    && typeof value.currentAnswerEnabled === "boolean"
    && typeof value.confirmedHistoryEnabled === "boolean"
    && typeof value.nextStepPromptEnabled === "boolean"
    && typeof value.historySuggestionHandled === "boolean";
}

function isFsrsCriterionState(value: unknown): value is FsrsCriterionState {
  if (!isRecord(value)) return false;
  return (value.state === "new"
    || value.state === "learning"
    || value.state === "review"
    || value.state === "relearning")
    && typeof value.difficulty === "number"
    && typeof value.stability === "number"
    && typeof value.reps === "number"
    && typeof value.lapses === "number"
    && isNullableIsoDate(value.lastReviewAt);
}

function parseFsrsLearningState(value: unknown): FsrsLearningState | null {
  if (!isRecord(value) || value.version !== 2 || !isRecord(value.criteria)) {
    return null;
  }
  const criteria: Record<string, FsrsCriterionState> = {};
  for (const [key, val] of Object.entries(value.criteria)) {
    if (!isFsrsCriterionState(val)) return null;
    criteria[key] = { ...val };
  }
  return { version: 2, criteria };
}

function hasUniqueIds(items: readonly { id: string }[]): boolean {
  return new Set(items.map((item) => item.id)).size === items.length;
}

export function parseLearningMemoryState(value: unknown): LearningMemoryState | null {
  if (!isRecord(value)
    || (value.version !== 1 && value.version !== 2)
    || !isPreferences(value.preferences)
    || !Array.isArray(value.attempts)
    || value.attempts.length > maxAttempts
    || !value.attempts.every(isAttempt)
    || !Array.isArray(value.reviewTasks)
    || value.reviewTasks.length > maxReviewTasks
    || !value.reviewTasks.every(isReviewTask)
    || !Array.isArray(value.standardUpdateNotices)
    || value.standardUpdateNotices.length > maxStandardNotices
    || !value.standardUpdateNotices.every(isStandardNotice)
  ) {
    return null;
  }

  const attempts = value.attempts.map((attempt) => ({
    ...attempt,
    scoringStandard: { ...attempt.scoringStandard },
    criterionResults: attempt.criterionResults.map((result) => ({ ...result })),
    answerConfidence: attempt.answerConfidence ?? "unverified",
  }));
  const reviewTasks = value.reviewTasks.map((task) => ({
    ...task,
    criterionIds: [...task.criterionIds],
    resolvedCriterionIds: [...task.resolvedCriterionIds],
    returnTargets: task.returnTargets.map((target) => ({ ...target })),
  }));
  const standardUpdateNotices = value.standardUpdateNotices.map((notice) => ({ ...notice }));

  if (!hasUniqueIds(attempts)
    || !hasUniqueIds(reviewTasks)
    || !hasUniqueIds(standardUpdateNotices)
  ) {
    return null;
  }

  let fsrsState: FsrsLearningState | null = null;
  if (value.version === 2 && value.fsrsState != null) {
    const parsed = parseFsrsLearningState(value.fsrsState);
    if (parsed === null) {
      return null;
    }
    fsrsState = parsed;
  }

  return {
    version: 2,
    preferences: { ...value.preferences },
    attempts,
    reviewTasks,
    standardUpdateNotices,
    fsrsState,
  };
}

export function parseLearningMemoryJson(value: string | null): LearningMemoryState {
  if (!value) {
    return createDefaultLearningMemoryState();
  }
  try {
    return parseLearningMemoryState(JSON.parse(value)) ?? createDefaultLearningMemoryState();
  } catch {
    return createDefaultLearningMemoryState();
  }
}

export function matchesStructuralAssistanceRule(
  text: string,
  rule: StructuralAssistanceRule,
): boolean {
  const normalizedText = text.toLocaleLowerCase();
  return rule.signalGroups.every((group) => (
    group.some((signal) => normalizedText.includes(signal.toLocaleLowerCase()))
  ));
}

export function selectMissingAssistanceRules(
  text: string,
  rules: readonly StructuralAssistanceRule[],
): StructuralAssistanceRule[] {
  return rules.filter((rule) => !matchesStructuralAssistanceRule(text, rule));
}

function attemptTaskKey(attempt: Pick<
  LearnerAttemptRecord,
  "surface" | "taskId" | "segmentId"
>): string {
  return `${attempt.surface}:${attempt.taskId}:${attempt.segmentId ?? "all"}`;
}

function returnTargetKey(target: ReviewReturnTarget): string {
  return `${target.surface}:${target.taskId}:${target.segmentId ?? "all"}`;
}

function canonicalCriterionStatuses(
  results: readonly LearnerAttemptCriterionResult[],
): ReadonlyMap<string, "present" | "missing"> {
  const statuses = new Map<string, "present" | "missing">();
  results.forEach((result) => {
    const current = statuses.get(result.memoryCriterionId);
    if (result.status === "missing" || current === undefined) {
      statuses.set(result.memoryCriterionId, result.status);
    }
  });
  return statuses;
}

export function selectRepeatedOmissions(
  attempts: readonly LearnerAttemptRecord[],
  courseId: string,
  knowledgePointId: string,
): RepeatedOmission[] {
  const latestByTask = new Map<string, LearnerAttemptRecord>();
  attempts
    .filter((attempt) => (
      attempt.courseId === courseId && attempt.knowledgePointId === knowledgePointId
    ))
    .forEach((attempt) => {
      const key = attemptTaskKey(attempt);
      const current = latestByTask.get(key);
      if (!current || Date.parse(attempt.confirmedAt) > Date.parse(current.confirmedAt)) {
        latestByTask.set(key, attempt);
      }
    });

  const omissions = new Map<string, { taskKeys: Set<string>; attemptIds: string[] }>();
  latestByTask.forEach((attempt, taskKey) => {
    canonicalCriterionStatuses(attempt.criterionResults).forEach((status, criterionId) => {
      if (status !== "missing") {
        return;
      }
      const current = omissions.get(criterionId) ?? { taskKeys: new Set<string>(), attemptIds: [] };
      current.taskKeys.add(taskKey);
      current.attemptIds.push(attempt.id);
      omissions.set(criterionId, current);
    });
  });

  return [...omissions.entries()]
    .filter(([, value]) => value.taskKeys.size >= repeatedOmissionThreshold)
    .map(([criterionId, value]) => ({
      criterionId,
      distinctTaskCount: value.taskKeys.size,
      attemptIds: value.attemptIds,
    }))
    .sort((left, right) => left.criterionId.localeCompare(right.criterionId));
}

export function selectLatestConfirmedAttempt(
  state: LearningMemoryState,
  target: {
    courseId: string;
    knowledgePointId: string;
    surface: LearningAttemptSurface;
    taskId: string;
    segmentId: string | null;
  },
): LearnerAttemptRecord | null {
  return [...state.attempts]
    .filter((attempt) => (
      attempt.courseId === target.courseId
      && attempt.knowledgePointId === target.knowledgePointId
      && attempt.surface === target.surface
      && attempt.taskId === target.taskId
      && attempt.segmentId === target.segmentId
    ))
    .sort((left, right) => Date.parse(right.confirmedAt) - Date.parse(left.confirmedAt))[0] ?? null;
}

export function selectCurrentReviewTask(
  state: LearningMemoryState,
  courseId: string,
  knowledgePointId: string,
): ReviewPlanTask | null {
  return [...state.reviewTasks]
    .filter((task) => (
      task.courseId === courseId
      && task.knowledgePointId === knowledgePointId
      && task.status !== "completed"
    ))
    .sort((left, right) => Date.parse(right.proposedAt) - Date.parse(left.proposedAt))[0] ?? null;
}

function mergeReturnTargets(
  current: readonly ReviewReturnTarget[],
  additions: readonly ReviewReturnTarget[],
): ReviewReturnTarget[] {
  const targets = new Map(current.map((target) => [returnTargetKey(target), target]));
  additions.forEach((target) => targets.set(returnTargetKey(target), target));
  return [...targets.values()];
}

function applyConfirmedAttempt(
  state: LearningMemoryState,
  attempt: LearnerAttemptRecord,
): LearningMemoryState {
  const attempts = [...state.attempts, attempt].slice(-maxAttempts);
  const currentStatuses = canonicalCriterionStatuses(attempt.criterionResults);
  const presentCriterionIds = new Set(
    [...currentStatuses.entries()]
      .filter(([, status]) => status === "present")
      .map(([criterionId]) => criterionId),
  );
  const missingCriterionIds = new Set(
    [...currentStatuses.entries()]
      .filter(([, status]) => status === "missing")
      .map(([criterionId]) => criterionId),
  );

  let reviewTasks = state.reviewTasks.map((task) => {
    if (task.courseId !== attempt.courseId
      || task.knowledgePointId !== attempt.knowledgePointId
      || task.status !== "accepted"
    ) {
      return task;
    }

    const resolvedCriterionIds = [...new Set([
      ...task.resolvedCriterionIds,
      ...task.criterionIds.filter((criterionId) => presentCriterionIds.has(criterionId)),
    ])];
    const completed = task.criterionIds.every((criterionId) => (
      resolvedCriterionIds.includes(criterionId)
    ));
    return {
      ...task,
      resolvedCriterionIds,
      status: completed ? "completed" as const : task.status,
      completedAt: completed ? attempt.confirmedAt : task.completedAt,
    };
  });

  const repeatedIds = new Set(
    selectRepeatedOmissions(attempts, attempt.courseId, attempt.knowledgePointId)
      .map((omission) => omission.criterionId),
  );
  const repeatedMissingIds = [...missingCriterionIds].filter((criterionId) => (
    repeatedIds.has(criterionId)
  ));

  if (repeatedMissingIds.length > 0) {
    const target: ReviewReturnTarget = {
      surface: attempt.surface,
      taskId: attempt.taskId,
      segmentId: attempt.segmentId,
    };
    const currentTaskIndex = reviewTasks.findIndex((task) => (
      task.courseId === attempt.courseId
      && task.knowledgePointId === attempt.knowledgePointId
      && task.status !== "completed"
    ));

    if (currentTaskIndex >= 0) {
      const currentTask = reviewTasks[currentTaskIndex];
      if (currentTask) {
        const shouldReopen = currentTask.status === "declined"
          && currentTask.lastPromptedAttemptId !== attempt.id;
        reviewTasks = reviewTasks.map((task, index) => index === currentTaskIndex ? {
          ...task,
          criterionIds: [...new Set([...task.criterionIds, ...repeatedMissingIds])],
          returnTargets: mergeReturnTargets(task.returnTargets, [target]),
          status: shouldReopen ? "proposed" as const : task.status,
          proposedAt: shouldReopen ? attempt.confirmedAt : task.proposedAt,
          declinedAt: shouldReopen ? null : task.declinedAt,
          lastPromptedAttemptId: shouldReopen ? attempt.id : task.lastPromptedAttemptId,
        } : task);
      }
    } else {
      reviewTasks = [...reviewTasks, {
        version: 1,
        id: `review-${attempt.id}`,
        courseId: attempt.courseId,
        knowledgePointId: attempt.knowledgePointId,
        criterionIds: repeatedMissingIds,
        resolvedCriterionIds: [],
        returnTargets: [target],
        status: "proposed",
        proposedAt: attempt.confirmedAt,
        acceptedAt: null,
        dueAt: null,
        declinedAt: null,
        completedAt: null,
        lastPromptedAttemptId: attempt.id,
      }];
    }
  }

  // FSRS: every confirmed attempt rates the criteria in this self-check.
  // present → good, missing → again. Review-task completion no longer owns
  // ratings (that path made "again" unreachable for single-criterion tasks).
  let fsrsState = state.fsrsState;
  if (currentStatuses.size > 0) {
    const params = defaultFsrsParameters();
    const currentFsrs: FsrsLearningState = state.fsrsState ?? { version: 2, criteria: {} };
    const criteria = { ...currentFsrs.criteria };
    for (const [criterionId, status] of currentStatuses) {
      const current = criteria[criterionId] ?? createNewFsrsState();
      const rating = status === "present" ? "good" : "again";
      criteria[criterionId] = fsrsNextState(current, rating, attempt.confirmedAt, params);
    }
    fsrsState = { version: 2, criteria };
  }

  return {
    ...state,
    attempts,
    reviewTasks: reviewTasks.slice(-maxReviewTasks),
    fsrsState,
  };
}

/** Pure apply for unit tests and non-window callers (no localStorage side effects). */
export function applyConfirmedAttemptToState(
  state: LearningMemoryState,
  attempt: LearnerAttemptRecord,
): LearningMemoryState {
  return applyConfirmedAttempt(state, attempt);
}

function readLearningMemoryState(): LearningMemoryState {
  if (typeof window === "undefined") {
    return createDefaultLearningMemoryState();
  }
  return parseLearningMemoryJson(window.localStorage.getItem(learningMemoryStorageKey));
}

function writeLearningMemoryState(state: LearningMemoryState): void {
  window.localStorage.setItem(learningMemoryStorageKey, JSON.stringify(state));
  window.dispatchEvent(new Event(learningMemoryChangeEvent));
}

export function getLearningMemoryStorageSnapshot(): string | null {
  return window.localStorage.getItem(learningMemoryStorageKey);
}

export function subscribeToLearningMemory(onStoreChange: () => void): () => void {
  const handleStoreChange = () => onStoreChange();
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(learningMemoryChangeEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(learningMemoryChangeEvent, handleStoreChange);
  };
}

export function updateLearningAssistancePreference(
  preference: keyof Pick<
    LearningAssistancePreferences,
    "currentAnswerEnabled" | "confirmedHistoryEnabled" | "nextStepPromptEnabled"
  >,
  enabled: boolean,
): void {
  const state = readLearningMemoryState();
  writeLearningMemoryState({
    ...state,
    preferences: {
      ...state.preferences,
      [preference]: enabled,
      historySuggestionHandled: preference === "confirmedHistoryEnabled"
        ? true
        : state.preferences.historySuggestionHandled,
    },
  });
}

export function handleHistoryAssistanceSuggestion(enable: boolean): void {
  const state = readLearningMemoryState();
  writeLearningMemoryState({
    ...state,
    preferences: {
      ...state.preferences,
      confirmedHistoryEnabled: enable || state.preferences.confirmedHistoryEnabled,
      historySuggestionHandled: true,
    },
  });
}

export function recordConfirmedAttempt(input: ConfirmedAttemptInput): LearnerAttemptRecord {
  const confirmedText = input.confirmedText.trim();
  if (confirmedText.length === 0 || confirmedText.length > maxConfirmedTextLength) {
    throw new Error("Confirmed attempt text is empty or too long");
  }
  if (input.criterionResults.length === 0) {
    throw new Error("Confirmed attempt requires criterion results");
  }

  const confirmedAt = new Date().toISOString();
  const attempt: LearnerAttemptRecord = {
    version: 1,
    id: window.crypto.randomUUID(),
    ...input,
    confirmedText,
    confirmedAt,
    scoringStandard: { ...input.scoringStandard },
    criterionResults: input.criterionResults.map((result) => ({ ...result })),
    answerConfidence: input.answerConfidence,
  };
  const state = applyConfirmedAttempt(readLearningMemoryState(), attempt);
  writeLearningMemoryState(state);

  // M2 Phase 1: background sync after local write (non-blocking, local-first)
  void triggerLearnerStateSync();

  return attempt;
}

export function acceptReviewTask(taskId: string): void {
  const state = readLearningMemoryState();
  const acceptedAt = new Date();
  const acceptedAtIso = acceptedAt.toISOString();
  const task = state.reviewTasks.find((t) => t.id === taskId && t.status === "proposed");

  let dueAt: Date;
  let fsrsState = state.fsrsState;

  if (task) {
    const currentFsrs: FsrsLearningState = state.fsrsState ?? { version: 2, criteria: {} };
    const params = defaultFsrsParameters();
    const intervals = task.criterionIds.map((criterionId) => {
      const cs = currentFsrs.criteria[criterionId] ?? createNewFsrsState();
      return fsrsNextInterval(cs, params, fsrsRequestedRetention);
    });
    const intervalDays = intervals.length > 0
      ? Math.min(...intervals)
      : reviewDelayHours / 24;
    dueAt = new Date(acceptedAt.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    const criteria = { ...currentFsrs.criteria };
    for (const criterionId of task.criterionIds) {
      const cs = criteria[criterionId] ?? createNewFsrsState();
      criteria[criterionId] = { ...cs, lastReviewAt: acceptedAtIso };
    }
    fsrsState = { version: 2, criteria };
  } else {
    dueAt = new Date(acceptedAt.getTime() + reviewDelayHours * 60 * 60 * 1000);
  }

  writeLearningMemoryState({
    ...state,
    fsrsState,
    reviewTasks: state.reviewTasks.map((t) => (
      t.id === taskId && t.status === "proposed" ? {
        ...t,
        status: "accepted",
        acceptedAt: acceptedAtIso,
        dueAt: dueAt.toISOString(),
        declinedAt: null,
      } : t
    )),
  });

  // M2 Phase 1: sync FSRS / review state update
  void triggerLearnerStateSync();
}

export function declineReviewTask(taskId: string): void {
  const state = readLearningMemoryState();
  const declinedAt = new Date().toISOString();
  writeLearningMemoryState({
    ...state,
    reviewTasks: state.reviewTasks.map((task) => (
      task.id === taskId && task.status === "proposed" ? {
        ...task,
        status: "declined",
        declinedAt,
      } : task
    )),
  });
}

export function dismissScoringStandardUpdateNotice(noticeId: string): void {
  const state = readLearningMemoryState();
  const dismissedAt = new Date().toISOString();
  writeLearningMemoryState({
    ...state,
    standardUpdateNotices: state.standardUpdateNotices.map((notice) => (
      notice.id === noticeId ? { ...notice, dismissedAt } : notice
    )),
  });
}

/**
 * Explicitly propose a review task for a (typically private) confirmed attempt.
 * Used by private learning units to surface 复习计划提案 without requiring 3 repeats.
 * Reuses the same ReviewPlanTask contract, persistence, and panel.
 */
export function proposeReviewTaskForAttempt(
  attempt: LearnerAttemptRecord,
  explicitCriterionIds?: readonly string[],
): void {
  const state = readLearningMemoryState();
  const { courseId, knowledgePointId } = attempt;
  // Avoid creating duplicate active proposals for same kp
  const hasActive = state.reviewTasks.some(
    (t) => t.courseId === courseId && t.knowledgePointId === knowledgePointId && t.status !== "completed",
  );
  if (hasActive) {
    return;
  }
  const critIds = explicitCriterionIds && explicitCriterionIds.length > 0
    ? [...explicitCriterionIds]
    : attempt.criterionResults.map((r) => r.memoryCriterionId);
  const target: ReviewReturnTarget = {
    surface: attempt.surface,
    taskId: attempt.taskId,
    segmentId: attempt.segmentId,
  };
  const now = attempt.confirmedAt;
  const task: ReviewPlanTask = {
    version: 1,
    id: `review-${attempt.id}`,
    courseId,
    knowledgePointId,
    criterionIds: critIds,
    resolvedCriterionIds: [],
    returnTargets: [target],
    status: "proposed",
    proposedAt: now,
    acceptedAt: null,
    dueAt: null,
    declinedAt: null,
    completedAt: null,
    lastPromptedAttemptId: attempt.id,
  };
  writeLearningMemoryState({
    ...state,
    reviewTasks: [...state.reviewTasks, task],
  });

  // M2 Phase 1: sync proposed review task (used heavily by private units)
  void triggerLearnerStateSync();
}

export function computeFsrsInterval(
  memoryCriterionId: string,
  fsrsState: FsrsLearningState | null,
): number {
  if (!fsrsState) {
    return Math.round(reviewDelayHours / 24);
  }
  const criterionState = fsrsState.criteria[memoryCriterionId] ?? createNewFsrsState();
  const params = defaultFsrsParameters();
  return fsrsNextInterval(criterionState, params, fsrsRequestedRetention);
}
