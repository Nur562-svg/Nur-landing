import Link from "next/link";
import type { Metadata } from "next";
import { HiDocBookshelf } from "@/components/hi-doc-bookshelf";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { getHiDocShelf } from "@/lib/hidoc/textbooks";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/hi-doc.module.css";

export const metadata: Metadata = {
  title: "Hi doc 教材书架 | NUR LEARN",
  description: "上传文字版 PDF 教材，建立个人学习书架；教材仅本人可见。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function HiDocBookshelfPage() {
  const user = await getHiDocSessionUser();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn">
          NUR LEARN
        </Link>
        <div className={styles.headerMeta}>
          {user ? <span>{user.displayName} · {getMembershipTierLabel(user.tier)}</span> : null}
          <Link className={styles.headerLink} href="/learn/hi-doc/w">
            课题工作坊
          </Link>
          <Link className={styles.headerLink} href="/learn">
            返回学习首页
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>HI DOC</p>
        <h1 className={styles.title}>教材学习书架</h1>
        <p className={styles.intro}>
          上传你自己的教材（文字版 PDF），NUR LEARN 会按当月名额为你保留书架位。
          已开放：目录识别、知识点萃取、讲义生成与追问、划重点与学霸笔记；
          短材料答疑请前往 <Link href="/learn/hi-doc/w">课题工作坊</Link>。
        </p>

        {user ? (
          <HiDocBookshelf initialShelf={await getHiDocShelf(user.id, user.tier)} tier={user.tier} />
        ) : (
          <section className={styles.gateCard} aria-labelledby="hidoc-gate-title">
            <h2 id="hidoc-gate-title">登录后使用 Hi doc</h2>
            <p>
              教材保存在服务器并仅本人可见，因此需要登录账户。登录后即可上传文字版 PDF、查看本月名额与书架。
            </p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href="/login?next=/learn/hi-doc">
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn">
                返回学习首页
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}