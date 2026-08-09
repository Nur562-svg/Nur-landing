"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getLearningMemoryStorageSnapshot,
  parseLearningMemoryJson,
  subscribeToLearningMemory,
} from "@/lib/learning-memory";
import type { LearningMemoryState } from "@/types/learning";

export function useLearningMemory(): LearningMemoryState {
  const snapshot = useSyncExternalStore(
    subscribeToLearningMemory,
    getLearningMemoryStorageSnapshot,
    () => null,
  );

  return useMemo(() => parseLearningMemoryJson(snapshot), [snapshot]);
}
