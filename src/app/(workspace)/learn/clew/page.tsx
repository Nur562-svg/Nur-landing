import Link from "next/link";
import type { Metadata } from "next";
import { ClewBookshelf } from "@/components/clew-bookshelf";
import { ClewPathGuide } from "@/components/clew-path-guide";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getClewShelf } from "@/lib/clew/textbooks";
import { resolveClewGuide } from "@/lib/clew/step-guide";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/clew.module.css";

export const metadata: Metadata = {
  title: "Clew 教材书架 | Ariadne",
  description: "上传文字版 PDF 教材，建立个人学习书架；教材仅本人可见。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ClewBookshelfPage() {
  const user = await getClewSessionUser();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn">
          Ariadne
        </Link>
        <div className={styles.headerMeta}>
          {user ? <span>{user.displayName} · {getMembershipTierLabel(user.tier)}</span> : null}
          <Link className={styles.headerLink} href="/learn/clew/w">
            课题工作坊
          </Link>
          <Link className={styles.headerLink} href="/learn">
            返回学习首页
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>CLEW</p>
        <h1 className={styles.title}>教材学习书架</h1>
        <p className={styles.intro}>
          上传你自己的教材（文字版 PDF 或 DOCX），Ariadne 会按当月名额为你保留书架位。
          已开放：目录识别、知识点萃取、讲义生成与追问、划重点与学霸笔记；
          短材料答疑请前往 <Link href="/learn/clew/w">课题工作坊</Link>。
        </p>

        {user ? (
          <ClewBookshelf initialShelf={await getClewShelf(user.id, user.tier)} tier={user.tier} />
        ) : (
          <>
          <ClewPathGuide guide={resolveClewGuide({ surface: "shelf", signedIn: false })} />
          <section className={styles.gateCard} aria-labelledby="clew-gate-title">
            <h2 id="clew-gate-title">登录后使用 Clew</h2>
            <p>
              教材保存在服务器并仅本人可见，因此需要登录账户。登录后即可上传文字版 PDF、查看本月名额与书架。
            </p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href="/login?next=/learn/clew">
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn">
                返回学习首页
              </Link>
            </div>
          </section>
          </>
        )}
      </div>
    </main>
  );
}