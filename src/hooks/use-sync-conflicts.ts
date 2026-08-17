"use client";

import { useSyncExternalStore } from "react";
import {
  getSyncConflictsSnapshot,
  subscribeToSyncConflicts,
  type SyncConflict,
} from "@/lib/learner-state-sync";

// React 19 要求 getServerSnapshot 返回稳定引用。
const SERVER_CONFLICTS: readonly SyncConflict[] = [];

/**
 * 订阅同步冲突存储（nur-learn:sync-conflicts:v1）。
 * 返回全部冲突；按账户过滤在消费端完成（组件持有 user.email）。
 */
export function useSyncConflicts(): readonly SyncConflict[] {
  return useSyncExternalStore(
    subscribeToSyncConflicts,
    getSyncConflictsSnapshot,
    () => SERVER_CONFLICTS,
  );
}
