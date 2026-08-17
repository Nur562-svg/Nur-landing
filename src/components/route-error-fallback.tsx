"use client";

import Link from "next/link";
import styles from "./system-fallback.module.css";

export type RouteErrorFallbackProps = {
  title?: string;
  description?: string;
  reset?: () => void;
};

const DEFAULT_TITLE = "页面暂时无法显示";
const DEFAULT_DESCRIPTION =
  "刚才出了一点问题。本地学习记录仍保留在本机；你可以重试，或返回学习首页继续。";

export function RouteErrorFallback({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  reset,
}: RouteErrorFallbackProps) {
  return (
    <div className={styles.root} role="alert">
      <div className={styles.card}>
        <p className={styles.eyebrow}>NUR LEARN</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{description}</p>
        <div className={styles.actions}>
          {reset ? (
            <button type="button" className={styles.primary} onClick={() => reset()}>
              重试
            </button>
          ) : null}
          <Link className={styles.secondary} href="/learn">
            返回学习首页
          </Link>
          <Link className={styles.secondary} href="/">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
