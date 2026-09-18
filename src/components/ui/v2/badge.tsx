import type { ComponentPropsWithoutRef } from "react";

import styles from "./badge.module.css";

export type V2BadgeVariant = "filled" | "muted" | "outline";

export type V2BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: V2BadgeVariant;
  disabled?: boolean;
};

/** v2 标签（filled / muted / outline）。展示层组件，无业务逻辑。 */
export function V2Badge({ variant = "filled", disabled = false, className, children, ...rest }: V2BadgeProps) {
  const disabledClass = disabled
    ? variant === "filled"
      ? ` ${styles.filledIsDisabled}`
      : variant === "muted"
        ? ` ${styles.mutedIsDisabled}`
        : ` ${styles.outlineIsDisabled}`
    : "";
  return (
    <span
      aria-disabled={disabled || undefined}
      className={[styles.badge, styles[variant], disabledClass, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
