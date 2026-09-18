import type { ComponentPropsWithoutRef } from "react";

import styles from "./input.module.css";

export type V2InputVariant = "field" | "bar";

export type V2InputProps = Omit<ComponentPropsWithoutRef<"input">, "size"> & {
  variant?: V2InputVariant;
};

/** v2 输入框（field 独立框 / bar 内嵌条）。展示层组件，无业务逻辑。 */
export function V2Input({ variant = "field", className, disabled, ...rest }: V2InputProps) {
  if (variant === "bar") {
    return (
      <label className={[styles.bar, disabled ? styles.disabled : "", className].filter(Boolean).join(" ")}>
        <input disabled={disabled} {...rest} />
        <span className={styles.dot} aria-hidden="true" />
      </label>
    );
  }
  return <input className={[styles.field, className].filter(Boolean).join(" ")} disabled={disabled} {...rest} />;
}
