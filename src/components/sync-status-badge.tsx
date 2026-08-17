"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getSyncStatus,
  subscribeToSyncStatus,
  type LearnerSyncStatus,
} from "@/lib/learner-state-sync";

const SERVER_SYNC_STATUS: LearnerSyncStatus = { isSyncing: false };

/**
 * 时钟节流：仅在「整分钟」切换时触发重渲染，
 * 避免每秒 tick 引发整棵组件树不必要的重渲。
 */
function useMinuteTick(): number {
  return useSyncExternalStore(
    (notify) => {
      let last = Math.floor(Date.now() / 60_000);
      const id = window.setInterval(() => {
        const now = Math.floor(Date.now() / 60_000);
        if (now !== last) {
          last = now;
          notify();
        }
      }, 1000);
      return () => window.clearInterval(id);
    },
    () => Math.floor(Date.now() / 60_000),
    () => 0,
  );
}

/**
 * 把 lastSyncAt 转成「相对时间」短文本，仅当分钟变化时刷新。
 * 设计目标：让顶部状态栏稳定、不抖动，同时仍能直观体现「多久前同步过」。
 */
function formatRelative(lastSyncAt: string | undefined): string {
  if (!lastSyncAt) return "";
  const ms = Date.now() - new Date(lastSyncAt).getTime();
  if (Number.isNaN(ms) || ms < 0) return "";
  const min = Math.floor(ms / 60_000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min} 分钟前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} 小时前`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} 天前`;
  return new Date(lastSyncAt).toLocaleDateString([], { month: "numeric", day: "numeric" });
}

/**
 * Minimal, non-intrusive sync status badge.
 * Reusable across dashboard, question-bank, wrong-questions, mock-exam, etc.
 * Matches the restrained editorial style (small muted text).
 */
export function SyncStatusBadge({ className = "" }: { className?: string }) {
  const status = useSyncStatus();
  // 仅订阅「分钟」变化，避免每次 lastSyncAt 写入都重渲。
  useMinuteTick();
  // 显式标记被订阅，保证 hook 顺序稳定。
  void status;

  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    function compute() {
      if (status.isSyncing) {
        setLabel("同步中");
        return;
      }
      if (status.lastError) {
        setLabel("同步失败");
        return;
      }
      if (status.lastSyncAt) {
        setLabel(`已同步 · ${formatRelative(status.lastSyncAt)}`);
        return;
      }
      setLabel("");
    }
    compute();
    // 每分钟重新计算相对时间（分钟级足够）
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, [status.isSyncing, status.lastError, status.lastSyncAt]);

  if (!label) return null;

  return (
    <span
      className={`text-[10px] text-slate-500 tabular-nums ${className}`}
      title={status.lastError ? "上次同步失败" : `M2 学习状态同步 · ${status.lastSyncAt ? new Date(status.lastSyncAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}`}
    >
      {label}
    </span>
  );
}

// 内部封装 useSyncStatus 引用，保留稳定快照语义（同 use-sync-status.ts 修复）
function useSyncStatus(): LearnerSyncStatus {
  return useSyncExternalStore(
    subscribeToSyncStatus,
    getSyncStatus,
    () => SERVER_SYNC_STATUS,
  );
}
