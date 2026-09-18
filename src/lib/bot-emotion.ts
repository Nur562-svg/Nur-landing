/**
 * NUR Agent 表情状态总线。
 *
 * 产品决策：学习/刷题场景不做情绪施压（答错不表现生气等）。
 * 因此仅保留默认 idle 外观；接口保留，便于调用方无需改动。
 */

export type BotEmotion = "idle";

export const BOT_EMOTION_EVENT = "nur-learn:bot-emotion";
export const BOT_QUIZ_EVENT = "nur-learn:quiz-result";

type BotEmotionDetail = { emotion: BotEmotion };
type BotQuizDetail = { isCorrect: boolean };

let currentEmotion: BotEmotion = "idle";
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

/** 恒为 idle；保留 API 兼容，调用方无需改签名。 */
export function setBotEmotion(_emotion: BotEmotion, _holdMs?: number): void {
  if (typeof window === "undefined") {
    return;
  }
  if (currentEmotion !== "idle") {
    currentEmotion = "idle";
    emitChange();
  }
}

/**
 * 做题结果仅广播事件，不改变 Agent 表情。
 * （原先会对→开心、连错→生气，已按产品要求移除。）
 */
export function notifyQuizResult(isCorrect: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(
    new CustomEvent<BotQuizDetail>(BOT_QUIZ_EVENT, { detail: { isCorrect } }),
  );
}

export function resetBotWrongStreak(): void {
  // 无多态情绪，不再追踪连错
}

export function getBotWrongStreak(): number {
  return 0;
}

export function subscribeBotEmotion(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getBotEmotionSnapshot(): BotEmotion {
  return currentEmotion;
}

export function getBotEmotionServerSnapshot(): BotEmotion {
  return "idle";
}
