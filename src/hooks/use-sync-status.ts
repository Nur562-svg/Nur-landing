"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getSyncStatus,
  subscribeToSyncStatus,
  type LearnerSyncStatus,
} from "@/lib/learner-state-sync";

// React 19 要求 getServerSnapshot 返回稳定引用（缓存对象），
// 否则每次渲染都产生新对象 → useSyncExternalStore 判定快照变化 → 无限循环 (React 185)。
const SERVER_SYNC_STATUS: LearnerSyncStatus = { isSyncing: false };

export function useSyncStatus(): LearnerSyncStatus {
  const snapshot = useSyncExternalStore(
    subscribeToSyncStatus,
    getSyncStatus,
    () => SERVER_SYNC_STATUS,
  );

  return useMemo(() => snapshot, [snapshot]);
}
