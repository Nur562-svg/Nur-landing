import { triggerLearnerStateSync } from "@/lib/learner-state-sync";
import type {
  MockExamPaper,
  MockExamSession,
} from "@/types/mock-exam";

/**
 * 模考会话浏览器本地持久化。
 * 沿用 question-bank-store 的 localStorage 模式；仅存本次会话记录，不进入课程真相。
 */

const MOCK_EXAM_SESSIONS_KEY = "nur-learn:mock-exam-sessions:v1";
const MOCK_EXAM_ACTIVE_KEY = "nur-learn:mock-exam-active:v1";
const MOCK_EXAM_SESSIONS_EVENT = "nur-learn:mock-exam-sessions-changed";
const MOCK_EXAM_ACTIVE_EVENT = "nur-learn:mock-exam-active-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMockExamSession(value: unknown): value is MockExamSession {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.sessionId === "string"
    && typeof value.courseId === "string"
    && typeof value.startedAt === "string"
    && Array.isArray(value.answers);
}

function parseStored<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function writeStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable, silently discard
  }
}

function isValidPaper(value: unknown): value is MockExamPaper {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.sessionId === "string"
    && typeof value.courseId === "string"
    && typeof value.blueprintId === "string"
    && Array.isArray(value.items)
    && Array.isArray(value.rows);
}

export function getMockExamSessions(courseId: string): MockExamSession[] {
  const all = parseStored<Record<string, unknown>>(MOCK_EXAM_SESSIONS_KEY, {});
  const records = all[courseId];
  if (!Array.isArray(records)) {
    return [];
  }
  return records.filter(isMockExamSession);
}

/** 从快照 JSON 解析指定课程的会话列表（组件侧使用）。 */
export function parseMockExamSessionsSnapshot(
  snapshot: string,
  courseId: string,
): MockExamSession[] {
  try {
    const all = JSON.parse(snapshot) as Record<string, unknown>;
    const records = all[courseId];
    if (!Array.isArray(records)) {
      return [];
    }
    return records.filter(isMockExamSession);
  } catch {
    return [];
  }
}

/** 供 useSyncExternalStore 使用的稳定快照（JSON 字符串按值比较）。 */
export function getMockExamSessionsSnapshot(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(MOCK_EXAM_SESSIONS_KEY);
}

/** 订阅模考会话变化（同标签页自定义事件 + 跨标签页 storage 事件）。 */
export function subscribeToMockExamSessions(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(MOCK_EXAM_SESSIONS_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(MOCK_EXAM_SESSIONS_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function notifyMockExamSessionsChanged(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(MOCK_EXAM_SESSIONS_EVENT));
}

export function saveMockExamSession(session: MockExamSession): void {
  const all = parseStored<Record<string, unknown>>(MOCK_EXAM_SESSIONS_KEY, {});
  const courseRecords = Array.isArray(all[session.courseId])
    ? (all[session.courseId] as unknown[]).filter(isMockExamSession)
    : [];
  const existingIndex = courseRecords.findIndex(
    (record) => record.sessionId === session.sessionId,
  );
  if (existingIndex >= 0) {
    courseRecords[existingIndex] = session;
  } else {
    courseRecords.push(session);
  }
  all[session.courseId] = courseRecords;
  writeStored(MOCK_EXAM_SESSIONS_KEY, all);
  notifyMockExamSessionsChanged();
  void triggerLearnerStateSync();
}

export function getActiveMockExamPaper(): MockExamPaper | null {
  const paper = parseStored<unknown>(MOCK_EXAM_ACTIVE_KEY, null);
  return isValidPaper(paper) ? paper : null;
}

/** 供 useSyncExternalStore 使用的 active paper 稳定快照（SSR 返回 null）。 */
export function getActiveMockExamPaperSnapshot(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(MOCK_EXAM_ACTIVE_KEY);
}

/** 订阅 active paper 变化（同标签页自定义事件 + 跨标签页 storage 事件）。 */
export function subscribeToActiveMockExamPaper(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(MOCK_EXAM_ACTIVE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(MOCK_EXAM_ACTIVE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function notifyActiveMockExamPaperChanged(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(MOCK_EXAM_ACTIVE_EVENT));
}

export function saveActiveMockExamPaper(paper: MockExamPaper | null): void {
  if (paper === null) {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(MOCK_EXAM_ACTIVE_KEY);
      } catch {
        // storage unavailable, silently discard
      }
    }
    notifyActiveMockExamPaperChanged();
    return;
  }
  writeStored(MOCK_EXAM_ACTIVE_KEY, paper);
  notifyActiveMockExamPaperChanged();
}
