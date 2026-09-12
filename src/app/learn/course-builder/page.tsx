import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "建课",
  description: "官方闭环课程正在建设中。",
  robots: { index: false, follow: false },
};

export default function CourseBuilderPage() {
  return (
    <main className={styles.page}>
      <p className={styles.kicker}>NUR LEARN</p>
      <h1 className={styles.title}>建课</h1>
      <p className={styles.message}>Nur learn 正努力实现此功能中</p>
      <Link className={styles.back} href="/learn">
        返回学习首页
      </Link>
    </main>
  );
}
