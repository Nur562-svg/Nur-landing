"use client";

import { useSyncStatus } from "@/hooks/use-sync-status";

/**
 * Minimal, non-intrusive sync status badge.
 * Reusable across dashboard, question-bank, wrong-questions, mock-exam, etc.
 * Matches the restrained editorial style (small muted text).
 */
export function SyncStatusBadge({ className = "" }: { className?: string }) {
  const status = useSyncStatus();

  if (!status.lastSyncAt && !status.isSyncing && !status.lastError) {
    return null;
  }

  const label = status.isSyncing
    ? "同步中"
    : status.lastSyncAt
      ? new Date(status.lastSyncAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "未同步";

  return (
    <span
      className={`text-[10px] text-slate-500 tabular-nums ${className}`}
      title={status.lastError ? "上次同步失败" : "M2 学习状态同步"}
    >
      {label}
    </span>
  );
}
