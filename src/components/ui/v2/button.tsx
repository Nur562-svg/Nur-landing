import type { ComponentPropsWithoutRef } from "react";

import styles from "./button.module.css";

export type V2ButtonVariant = "primary" | "secondary" | "ghost";

export type V2ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: V2ButtonVariant;
};

/** v2 按钮（primary / secondary / ghost）。展示层组件，无业务逻辑。 */
export function V2Button({ variant = "primary", className, type = "button", ...rest }: V2ButtonProps) {
  return <button type={type} className={[styles.btn, styles[variant], className].filter(Boolean).join(" ")} {...rest} />;
}
