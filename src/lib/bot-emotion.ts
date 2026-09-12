/**
 * NUR Agent 表情状态总线（珍珠球助手）。
 *
 * Dock 通过 useBotEmotion 订阅；做题页调用 notifyQuizResult。
 * 模块级单例，避免 portal 树外再包一层 Context。
 */

export type BotEmotion =
  | "idle"
  | "thinking"
  | "happy"
  | "sad"
  | "angry"
  | "surprised"
  | "encourage"
  | "sleepy";

export const BOT_EMOTION_EVENT = "nur-learn:bot-emotion";
export const BOT_QUIZ_EVENT = "nur-learn:quiz-result";

type BotEmotionDetail = { emotion: BotEmotion };
type BotQuizDetail = { isCorrect: boolean };

let currentEmotion: BotEmotion = "idle";
let wrongStreak = 0;
let holdTimer: number | null = null;
const listeners = new Set<() => void>();

function emitChange(): void {
  for (const listener of listeners) {
    listener();
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<BotEmotionDetail>(BOT_EMOTION_EVENT, {
        detail: { emotion: currentEmotion },
      }),
    );
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): BotEmotion {
  return currentEmotion;
}

function getServerSnapshot(): BotEmotion {
  return "idle";
}

/** 直接设置表情；holdMs > 0 时到点自动回 idle。 */
export function setBotEmotion(emotion: BotEmotion, holdMs = 0): void {
  if (typeof window === "undefined") {
    return;
  }
  if (holdTimer !== null) {
    window.clearTimeout(holdTimer);
    holdTimer = null;
  }
  currentEmotion = emotion;
  emitChange();
  if (holdMs > 0 && emotion !== "idle" && emotion !== "thinking" && emotion !== "sleepy") {
    holdTimer = window.setTimeout(() => {
      holdTimer = null;
      currentEmotion = "idle";
      emitChange();
    }, holdMs);
  }
}

/**
 * 做题反馈：
 *  - 对 → 开心
 *  - 错 1–2 次 → 失望
 *  - 连续错 ≥3 次 → 生气
 */
export function notifyQuizResult(isCorrect: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(
    new CustomEvent<BotQuizDetail>(BOT_QUIZ_EVENT, { detail: { isCorrect } }),
  );
  if (isCorrect) {
    wrongStreak = 0;
    // 连续答对几次后切「鼓励」
    setBotEmotion("happy", 2000);
    return;
  }
  wrongStreak += 1;
  if (wrongStreak >= 3) {
    setBotEmotion("angry", 3200);
  } else {
    setBotEmotion("sad", 2400);
  }
}

export function resetBotWrongStreak(): void {
  wrongStreak = 0;
}

export function getBotWrongStreak(): number {
  return wrongStreak;
}

export function subscribeBotEmotion(listener: () => void): () => void {
  return subscribe(listener);
}

export function getBotEmotionSnapshot(): BotEmotion {
  return getSnapshot();
}

export function getBotEmotionServerSnapshot(): BotEmotion {
  return getServerSnapshot();
}
