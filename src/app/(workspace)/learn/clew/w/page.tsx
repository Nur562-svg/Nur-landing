import Link from "next/link";
import type { Metadata } from "next";
import { ClewWorkshopList } from "@/components/clew-workshops";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { listClewWorkshops } from "@/lib/clew/workshops";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/clew.module.css";

export const metadata: Metadata = {
  title: "课题工作坊 | Clew · Ariadne",
  description: "围绕一个课题上传短材料，就材料内容追问答疑；材料仅本人可见。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ClewWorkshopsPage() {
  const user = await getClewSessionUser();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn">
          Ariadne
        </Link>
        <div className={styles.headerMeta}>
          {user ? (
            <span>
              {user.displayName} · {getMembershipTierLabel(user.tier)}
            </span>
          ) : null}
          <Link className={styles.headerLink} href="/learn/clew">
            返回书架
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>CLEW · 课题工作坊</p>
        <h1 className={styles.title}>课题工作坊</h1>
        <p className={styles.intro}>
          围绕一个课题上传短材料（带文字层 PDF / Markdown / 纯文本，单份不超过 100 页），然后就材料内容追问。
          回答只依据命中片段并标注来源；材料存服务器且仅本人可见，不占教材当月名额。
        </p>

        {user ? (
          <ClewWorkshopList
            initialList={await listClewWorkshops(user.id, user.tier)}
            tier={user.tier}
          />
        ) : (
          <section className={styles.gateCard} aria-labelledby="clew-workshop-gate-title">
            <h2 id="clew-workshop-gate-title">登录后使用课题工作坊</h2>
            <p>
              课题材料保存在服务器并仅本人可见，因此需要登录账户。登录后即可新建课题、上传材料并追问。
            </p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href="/login?next=/learn/clew/w">
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn/clew">
                返回书架
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
