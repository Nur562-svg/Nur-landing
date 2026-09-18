import type { ComponentPropsWithoutRef } from "react";

import styles from "./card.module.css";

export type V2CardVariant = "floating" | "sunken" | "emphasis" | "disabled";

export type V2CardProps = Omit<ComponentPropsWithoutRef<"article">, "title"> & {
  variant?: V2CardVariant;
  eyebrow?: string;
  title?: string;
  body?: string;
};

/** v2 卡片（floating / sunken / emphasis / disabled）。展示层组件，无业务逻辑。 */
export function V2Card({ variant = "floating", eyebrow, title, body, className, children, ...rest }: V2CardProps) {
  const variantClass =
    variant === "floating" ? "" : ` ${styles[variant]}`;
  return (
    <article className={`${styles.card}${variantClass}${className ? ` ${className}` : ""}`} {...rest}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {body ? <p className={styles.body}>{body}</p> : null}
      {children}
    </article>
  );
}
