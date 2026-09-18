import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./chat-bubble.module.css";

export type V2ChatBubbleRole = "user" | "assistant";

export type V2ChatBubbleProps = ComponentPropsWithoutRef<"div"> & {
  role: V2ChatBubbleRole;
  meta?: ReactNode;
  disabled?: boolean;
};

/** v2 对话气泡（user=主色实底 / assistant=纸卡+边框）。展示层组件，无业务逻辑。 */
export function V2ChatBubble({ role, meta, disabled = false, className, children, ...rest }: V2ChatBubbleProps) {
  const disabledClass = disabled ? (role === "user" ? styles.userDisabled : styles.assistantDisabled) : "";
  return (
    <div
      aria-disabled={disabled || undefined}
      className={[styles.bubble, styles[role], disabledClass, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {meta ? <span className={styles.meta}>{meta}</span> : null}
      <p className={styles.copy}>{children}</p>
    </div>
  );
}

export type V2ChatThreadProps = ComponentPropsWithoutRef<"div">;

/** v2 会话线程容器：纵向排列一串气泡。展示层组件，无业务逻辑。 */
export function V2ChatThread({ className, children, ...rest }: V2ChatThreadProps) {
  return (
    <div className={[styles.thread, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
