/**
 * Clew 学习页本机偏好（设计评审 P1-B 第一刀：localStorage 6 键收敛到单一模块）。
 * 键名（`nur-learn:clew-*` 前缀规则）与取值语义全部不变——纯收口，不改任何持久化行为。
 * 视图层（clew-study.tsx）只经本模块读写，不再直接触碰 window.localStorage。
 * 解析失败一律返回 null（调用方回落缺省，不猜测）。
 */

export const STUDY_MODE_STORAGE_KEY = "nur-learn:clew-study-mode";
export const LESSON_STYLE_STORAGE_KEY = "nur-learn:clew-lesson-style";
export const CHAT_SCOPE_STORAGE_KEY = "nur-learn:clew-chat-scope";
export const LESSON_VARIANT_STORAGE_KEY = "nur-learn:clew-lesson-view";
export const SELF_CHECK_STORAGE_PREFIX = "nur-learn:clew-selfcheck:";
export const CHAT_INTENSITY_STORAGE_KEY = "nur-learn:clew-chat-intensity";

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // localStorage 不可用：偏好仅本次会话内生效（调用方已有缺省回落）
  }
}

export function readStoredValue(key: string): string | null {
  const raw = readRaw(key);
  return raw !== null && raw.length > 0 ? raw : null;
}

export function writeStoredValue(key: string, value: string): void {
  writeRaw(key, value);
}

/** 自测标记（per-KP JSON：{ [题号]: "shaky" } 等；视图层负责结构校验）。 */
export function readSelfCheckRecord(kpId: string): unknown {
  const raw = readRaw(`${SELF_CHECK_STORAGE_PREFIX}${kpId}`);
  if (raw === null) {
    return null;
  }
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function writeSelfCheckRecord(kpId: string, value: unknown): void {
  writeRaw(`${SELF_CHECK_STORAGE_PREFIX}${kpId}`, JSON.stringify(value));
}
