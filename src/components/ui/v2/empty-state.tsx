import type { ReactNode } from "react";

import styles from "./empty-state.module.css";

/**
 * 空态三层级（设计评审 V-3；统一 7 份各自为政的 emptyState 定义）：
 * - rich：纸墨线稿插画 + 标题 + 提示 + CTA（首次到达的空列表页）；
 * - medium：标题 + 提示（区块级空数据）；
 * - 插画为功能性引导（指出「这里将出现什么/下一步做什么」），非装饰——Quiet 装饰为零
 *   条款的已批准例外（Nur 2026-10-07 批准计划）。
 * 线稿用 currentColor（继承 --muted 系文字色），随明暗主题自动适配。
 */

export type EmptyStateTone = "rich" | "medium";

export type EmptyStateProps = {
  tone?: EmptyStateTone;
  /** 线稿插画（rich 用；EmptyIllustration 系列或任意 32–40px SVG）。 */
  illustration?: ReactNode;
  title: ReactNode;
  hint?: ReactNode;
  /** 行动区（Link/V2Button 由调用方给）。 */
  action?: ReactNode;
};

export function EmptyState({ tone = "medium", illustration, title, hint, action }: EmptyStateProps) {
  return (
    <div className={[styles.box, tone === "rich" ? styles.rich : ""].filter(Boolean).join(" ")}>
      {tone === "rich" && illustration ? <div className={styles.art}>{illustration}</div> : null}
      <p className={styles.title}>{title}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}

/* ---------------- 纸墨线稿（单色 stroke，40px 网格；stroke=currentColor） ---------------- */

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 摊开的书卷（书架/教材空态）。 */
export function EmptyScrollIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...strokeProps} aria-hidden="true">
      <path d="M20 10c-3-2.5-8-3-12-1.5v20c4-1.5 9-1 12 1.5 3-2.5 8-3 12-1.5v-20C28 7 23 7.5 20 10Z" />
      <path d="M20 10v20" />
      <path d="M12 15h5M12 19h5M23 15h5M23 19h5" opacity="0.55" />
    </svg>
  );
}

/** 灯下学习（学习面板/动态空态）。 */
export function EmptyLampIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...strokeProps} aria-hidden="true">
      <path d="M14 24a6 6 0 0 1 12 0l2 6H12l2-6Z" />
      <path d="M20 12v-2" opacity="0.7" />
      <path d="M11 14l-1.4-1.4M29 14l1.4-1.4" opacity="0.55" />
      <path d="M17 33h6" />
    </svg>
  );
}

/** 空匣（错题中心空态——「匣中无错题」）。 */
export function EmptyBoxIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...strokeProps} aria-hidden="true">
      <path d="M8 16l12-6 12 6v14l-12 6-12-6V16Z" />
      <path d="M8 16l12 6 12-6M20 22v14" />
      <path d="M14 13l12 6" opacity="0.55" />
    </svg>
  );
}

/** 对话气泡（工作坊/追问空态）。 */
export function EmptyBubbleIllustration() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...strokeProps} aria-hidden="true">
      <path d="M8 12a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H18l-7 6v-6h1a4 4 0 0 1-4-4V12Z" />
      <path d="M14 15h12M14 20h7" opacity="0.55" />
    </svg>
  );
}
