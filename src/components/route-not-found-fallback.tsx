import Link from "next/link";
import styles from "./system-fallback.module.css";

export function RouteNotFoundFallback() {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>NUR LEARN</p>
        <h1 className={styles.title}>未找到该页面</h1>
        <p className={styles.body}>
          链接可能已失效，或该内容尚未开放。你可以返回学习首页，从课程工作台继续。
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/learn">
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
