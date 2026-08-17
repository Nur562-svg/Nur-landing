"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { CourseDefinition } from "@/types/learning";
import type { QBAttemptRecord } from "@/types/question-bank";
import {
  selectWrongQuestionCenter,
  type WrongQuestionCenterData,
} from "@/lib/wrong-questions";
import { parseLearningMemoryJson } from "@/lib/learning-memory";

const QB_ATTEMPTS_KEY = "nur-learn:qb-attempts:v1";
const MEMORY_KEY = "nur-learn:learning-memory:v1";
const QB_CHANGE_EVENT = "nur-learn:learning-memory-change"; // reuse existing event
const MOCK_EXAM_CHANGE_EVENT = "nur-learn:mock-exam-sessions-changed";

/** 稳定的空数据，用于 SSR 和 hydration 初始渲染，避免 hydration mismatch。 */
const EMPTY_DATA: WrongQuestionCenterData = {
  wrongQuestions: [],
  weakKnowledgePoints: [],
  totalWrong: 0,
  totalAttempts: 0,
  weakKpCount: 0,
  structuralWeaknesses: [],
  fsrsHighRisk: [],
  hasFsrsMemory: false,
};

/** 订阅 localStorage 变化（qb-attempts + learning-memory + mock-exam + storage 事件） */
function subscribeChanges(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onChange);
  window.addEventListener(QB_CHANGE_EVENT, onChange);
  window.addEventListener(MOCK_EXAM_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(QB_CHANGE_EVENT, onChange);
    window.removeEventListener(MOCK_EXAM_CHANGE_EVENT, onChange);
  };
}

/** 获取 qb-attempts 快照字符串（SSR 返回 null） */
function getAttemptsSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(QB_ATTEMPTS_KEY);
}

/** 获取 learning-memory 快照字符串（SSR 返回 null） */
function getMemorySnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(MEMORY_KEY);
}

function parseAttemptsSnapshot(snapshot: string | null): Record<string, QBAttemptRecord[]> {
  if (!snapshot) return {};
  try {
    const parsed = JSON.parse(snapshot) as Record<string, unknown>;
    const result: Record<string, QBAttemptRecord[]> = {};
    for (const [questionId, records] of Object.entries(parsed)) {
      if (Array.isArray(records)) {
        const valid = records.filter(
          (r): r is QBAttemptRecord =>
            typeof r === "object" && r !== null
            && typeof (r as Record<string, unknown>).questionId === "string"
            && typeof (r as Record<string, unknown>).selectedIndex === "number"
            && typeof (r as Record<string, unknown>).isCorrect === "boolean"
            && typeof (r as Record<string, unknown>).attemptedAt === "string",
        );
        if (valid.length > 0) {
          result[questionId] = valid;
        }
      }
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * 错题中心 hook：订阅 localStorage 变化并返回聚合数据。
 * 每次 localStorage 变化时重新计算客观错题、结构薄弱点与 FSRS 高危准则。
 */
export function useWrongQuestionCenter(
  courses: readonly CourseDefinition[],
): WrongQuestionCenterData {
  // mounted 检查：确保 SSR 和客户端 hydration 初始渲染返回相同空数据，
  // 避免 localStorage 差异导致的 hydration mismatch。
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- 标准 mounted 模式，避免 useSyncExternalStore 在 React 19 hydration 时使用客户端快照导致的 mismatch
  useEffect(() => setMounted(true), []);

  const snapshot = useSyncExternalStore(
    subscribeChanges,
    getAttemptsSnapshot,
    () => null,
  );

  // learning-memory 的写入会派发 QB_CHANGE_EVENT（learning-memory-change），
  // 同一订阅下增加 learning-memory key 的快照，使结构薄弱 / FSRS 高危实时重算。
  const memorySnapshot = useSyncExternalStore(
    subscribeChanges,
    getMemorySnapshot,
    () => null,
  );

  return useMemo(() => {
    if (!mounted) return EMPTY_DATA;
    const attempts = parseAttemptsSnapshot(snapshot);
    const memoryState = parseLearningMemoryJson(memorySnapshot);
    return selectWrongQuestionCenter(courses, attempts, memoryState);
  }, [mounted, courses, snapshot, memorySnapshot]);
}
