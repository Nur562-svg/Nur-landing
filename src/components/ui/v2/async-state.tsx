"use client";

import type { ReactNode } from "react";

import { EmptyState } from "./empty-state";
import { SkeletonList } from "./skeleton";
import styles from "./async-state.module.css";

/**
 * 异步状态三态归一（设计评审 P1-C）：loading（骨架）/ error（明确报错 + 可选重试）/ empty
 * （EmptyState 三层级）——新代码强制用，旧面渐进迁移。
 *
 * **受控语义（调用方必读）**：本组件零内部状态——`status` 完全由调用方驱动，组件不代管
 * 错误态的保持：`onRetry` 触发后若重试仍失败，调用方必须把 status 保持/置回 "error"
 * （否则界面会静默离开错误框——那正是诚实边界禁止的静默降级）。
 */

export type AsyncStateProps = {
  status: "loading" | "error" | "empty" | "ready";
  /** error：明确报错文案（必须可行动——说清发生了什么/下一步做什么，不写「出错了」了事）。 */
  error?: ReactNode;
  /** empty：标题/提示/行动区。 */
  emptyTitle?: ReactNode;
  emptyHint?: ReactNode;
  emptyAction?: ReactNode;
  /** error：重试回调（提供即渲染重试按钮；重试失败保持 error 是调用方责任，见上）。 */
  onRetry?: () => void;
  /** loading 骨架行数。 */
  skeletonRows?: number;
  children?: ReactNode;
};

export function AsyncState({
  status,
  error,
  emptyTitle,
  emptyHint,
  emptyAction,
  onRetry,
  skeletonRows = 3,
  children,
}: AsyncStateProps) {
  if (status === "loading") {
    return <SkeletonList rows={skeletonRows} />;
  }
  if (status === "error") {
    return (
      <div className={styles.errorBox} role="alert">
        <p className={styles.errorText}>{error ?? "加载失败，请稍后重试。"}</p>
        {onRetry ? (
          <button type="button" className={styles.retry} onClick={onRetry}>
            重试
          </button>
        ) : null}
      </div>
    );
  }
  if (status === "empty") {
    return (
      <EmptyState tone="rich" title={emptyTitle ?? "暂无内容"} hint={emptyHint} action={emptyAction} />
    );
  }
  return <>{children}</>;
}
