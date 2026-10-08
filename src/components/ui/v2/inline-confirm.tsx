"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./inline-confirm.module.css";

export type InlineConfirmProps = {
  /** 初始动作内容（文案/图标，如「🗑 删除」）。 */
  label: ReactNode;
  /** 确认问句（行内展示，如「删除后不可恢复，确定？」）。 */
  confirmTitle: string;
  /** 确认按钮文案（默认「确认」）。 */
  confirmLabel?: string;
  cancelLabel?: string;
  /** 外部忙碌时禁用全部按钮（如父级删除请求在途）。 */
  busy?: boolean;
  /** 初始按钮禁用。 */
  disabled?: boolean;
  /** 附加到初始按钮的类（继承调用方按钮形态；组件自身类总在）。 */
  className?: string;
  onConfirm: () => void | Promise<void>;
};

/**
 * 行内二段确认（ZCODE-M6 补遗 / 设计评审 P0-A）：替代 window.confirm——
 * 点击动作 → 原位变为「确认问句 + 确认 / 取消」，Esc 或点取消收起并把焦点还给触发键。
 * busy 契约（审查修正）：确认后本组件进入 pending（「处理中…」+ 全按钮禁用），Promise settle
 * 才收起——自身发起的破坏性操作在途不可重复触发；调用方的 busy 仍叠加生效。
 * 触发键样式完全由 className 提供（组件不重置按钮外观，避免 CSS 打包顺序竞争）。
 */
export function InlineConfirm({
  label,
  confirmTitle,
  confirmLabel = "确认",
  cancelLabel = "取消",
  busy = false,
  disabled = false,
  className,
  onConfirm,
}: InlineConfirmProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const restoreFocusOnClose = useRef(false);

  useEffect(() => {
    if (open) {
      confirmRef.current?.focus();
      return;
    }
    if (restoreFocusOnClose.current) {
      restoreFocusOnClose.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        restoreFocusOnClose.current = true;
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = (): void => {
    restoreFocusOnClose.current = true;
    setOpen(false);
  };

  const handleConfirm = async (): Promise<void> => {
    setPending(true);
    try {
      await onConfirm();
    } finally {
      setPending(false);
      close();
    }
  };

  const allDisabled = disabled || busy || pending;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        hidden={open}
        className={[styles.trigger, className].filter(Boolean).join(" ")}
        disabled={allDisabled}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      {open ? (
        <span className={styles.group} role="group" aria-label={confirmTitle}>
          <span className={styles.title}>{confirmTitle}</span>
          <button
            ref={confirmRef}
            type="button"
            className={styles.confirm}
            disabled={allDisabled}
            onClick={() => void handleConfirm()}
          >
            {pending ? "处理中…" : confirmLabel}
          </button>
          <button
            type="button"
            className={styles.cancel}
            disabled={allDisabled}
            onClick={() => close()}
          >
            {cancelLabel}
          </button>
        </span>
      ) : null}
    </>
  );
}
