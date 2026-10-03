import Link from "next/link";
import type { Metadata } from "next";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { normalizeMembershipTier } from "@/lib/membership";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "建课",
  description: "Max 专属建课入口。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CourseBuilderPage() {
  const user = await getClewSessionUser();
  const tier = user ? normalizeMembershipTier(user.tier) : null;

  if (tier !== "max") {
    return (
      <main className={styles.page}>
        <p className={styles.kicker}>Ariadne</p>
        <h1 className={styles.title}>建课 · Max 专属</h1>
        <p className={styles.message}>
          材料建课仅对 Max 会员开放。升级后可从学习主环进入。
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link className={styles.back} href="/account/billing">
            查看会员
          </Link>
          <Link className={styles.back} href="/learn">
            返回学习主环
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <p className={styles.kicker}>Ariadne</p>
      <h1 className={styles.title}>建课</h1>
      <p className={styles.message}>Ariadne 正努力实现此功能中</p>
      <Link className={styles.back} href="/learn">
        返回学习首页
      </Link>
    </main>
  );
}
