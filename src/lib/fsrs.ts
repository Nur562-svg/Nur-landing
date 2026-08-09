import type { FsrsCriterionState } from "@/types/learning";

export type FsrsRating = "again" | "hard" | "good";

export type FsrsParameters = readonly number[];

export const fsrsRequestedRetention = 0.9;
export const fsrsMinIntervalDays = 1;
export const fsrsMaxIntervalDays = 365;

const FACTOR = 19 / 3;

const FSRS5_DEFAULTS: FsrsParameters = [
  0.4072, 0.8765, 2.3274, 4.4225,
  0.5, 0.4, 0.2, 0.4167,
  0.5, 0.5, 0.5,
  0.13, 0.7, 0.25,
  0.25, 0.25, 0.25, 0.25, 0.05,
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function ratingValue(rating: FsrsRating): number {
  return rating === "again" ? 1 : rating === "hard" ? 2 : 3;
}

export function defaultFsrsParameters(): FsrsParameters {
  return FSRS5_DEFAULTS;
}

export function createNewFsrsState(): FsrsCriterionState {
  return {
    state: "new",
    difficulty: 0,
    stability: 0,
    reps: 0,
    lapses: 0,
    lastReviewAt: null,
  };
}

export function fsrsRetrievability(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  return Math.pow(1 + (FACTOR * elapsedDays) / stability, -FACTOR);
}

export function fsrsNextInterval(
  state: FsrsCriterionState,
  params: FsrsParameters,
  requestedRetention: number,
): number {
  if (state.stability <= 0) return fsrsMinIntervalDays;
  const interval = state.stability * Math.pow(1 / requestedRetention - 1, 1 / FACTOR);
  return clamp(Math.round(interval), fsrsMinIntervalDays, fsrsMaxIntervalDays);
}

function initialDifficulty(rating: FsrsRating, params: FsrsParameters): number {
  const rv = ratingValue(rating);
  return clamp(params[4] - (rv - 3) * params[5], 1, 10);
}

function initialStability(rating: FsrsRating, params: FsrsParameters): number {
  const idx = ratingValue(rating) - 1;
  return Math.max(params[idx], 0.1);
}

function updateDifficulty(
  current: FsrsCriterionState,
  rating: FsrsRating,
  params: FsrsParameters,
): number {
  const rv = ratingValue(rating);
  const target = params[4] - (rv - 3) * params[5];
  const next = params[7] * current.difficulty + (1 - params[7]) * target;
  return clamp(next, 1, 10);
}

function updateStabilitySuccess(
  state: FsrsCriterionState,
  rating: FsrsRating,
  retrievability: number,
  params: FsrsParameters,
): number {
  const D = state.difficulty;
  const S = state.stability;
  const hardPenalty = rating === "hard" ? params[15] : 1;
  const factor = 1
    + Math.exp(params[8]) * (11 - D) * Math.pow(S, -params[9])
    * (Math.exp((1 - retrievability) * params[10]) - 1)
    * hardPenalty;
  return Math.max(S * factor, 0.1);
}

function updateStabilityForget(
  state: FsrsCriterionState,
  retrievability: number,
  params: FsrsParameters,
): number {
  const D = state.difficulty;
  const S = state.stability;
  const newS = params[11]
    * Math.pow(D, -params[12])
    * (Math.pow(S + 1, params[13]) - 1)
    * Math.exp((1 - retrievability) * params[14]);
  return Math.max(newS, 0.1);
}

export function fsrsNextState(
  current: FsrsCriterionState,
  rating: FsrsRating,
  now: string,
  params: FsrsParameters,
): FsrsCriterionState {
  if (current.state === "new" || current.reps === 0) {
    return {
      state: rating === "again" ? "learning" : "review",
      difficulty: initialDifficulty(rating, params),
      stability: initialStability(rating, params),
      reps: 1,
      lapses: rating === "again" ? 1 : 0,
      lastReviewAt: now,
    };
  }

  const lastReview = current.lastReviewAt ?? now;
  const elapsedDays = Math.max(
    (Date.parse(now) - Date.parse(lastReview)) / (1000 * 60 * 60 * 24),
    0,
  );
  const R = fsrsRetrievability(elapsedDays, current.stability);
  const newDifficulty = updateDifficulty(current, rating, params);

  if (rating === "again") {
    return {
      state: "relearning",
      difficulty: newDifficulty,
      stability: updateStabilityForget(current, R, params),
      reps: current.reps + 1,
      lapses: current.lapses + 1,
      lastReviewAt: now,
    };
  }

  return {
    state: "review",
    difficulty: newDifficulty,
    stability: updateStabilitySuccess(current, rating, R, params),
    reps: current.reps + 1,
    lapses: current.lapses,
    lastReviewAt: now,
  };
}

export function fsrsScheduleReview(
  state: FsrsCriterionState,
  rating: FsrsRating,
  now: string,
  params: FsrsParameters,
): { nextState: FsrsCriterionState; intervalDays: number; dueAt: string } {
  const nextState = fsrsNextState(state, rating, now, params);
  const intervalDays = fsrsNextInterval(nextState, params, fsrsRequestedRetention);
  const dueAt = new Date(
    Date.parse(now) + intervalDays * 24 * 60 * 60 * 1000,
  ).toISOString();
  return { nextState, intervalDays, dueAt };
}
