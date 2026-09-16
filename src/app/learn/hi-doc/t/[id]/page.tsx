import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiDocTextbookDetailView } from "@/components/hi-doc-textbook";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { getHiDocTextbookDetail } from "@/lib/hidoc/chapters";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/hi-doc.module.css";

export const metadata: Metadata = {
  title: "教材详情 | Hi doc · NUR LEARN",
  description: "查看教材章节树、运行目录识别并手动修正章节。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function HiDocTextbookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getHiDocSessionUser();
  const { id } = await params;

  if (!user) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/learn">
            NUR LEARN
          </Link>
          <div className={styles.headerMeta}>
            <Link className={styles.headerLink} href="/learn/hi-doc">
              返回书架
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>HI DOC</p>
          <h1 className={styles.title}>教材详情</h1>
          <section className={styles.gateCard} aria-labelledby="hidoc-detail-gate-title">
            <h2 id="hidoc-detail-gate-title">登录后查看教材</h2>
            <p>教材是你的私有资料，需要登录账户才能查看、识别目录与手动修正章节。</p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href={`/login?next=/learn/hi-doc/t/${id}`}>
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn/hi-doc">
                返回书架
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const result = await getHiDocTextbookDetail(user.id, id);
  if (!result.ok) {
    if (result.code === "not-found") {
      notFound();
    }
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/learn">
            NUR LEARN
          </Link>
          <div className={styles.headerMeta}>
            <Link className={styles.headerLink} href="/learn/hi-doc">
              返回书架
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>HI DOC</p>
          <h1 className={styles.title}>教材详情</h1>
          <p className={styles.errorBox} role="alert">
            {result.message}
          </p>
        </div>
      </main>
    );
  }

  const { textbook } = result.data;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn">
          NUR LEARN
        </Link>
        <div className={styles.headerMeta}>
          <span>
            {user.displayName} · {getMembershipTierLabel(user.tier)}
          </span>
          <Link className={styles.headerLink} href="/learn/hi-doc">
            返回书架
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>HI DOC · 教材详情</p>
        <h1 className={styles.title}>{textbook.title}</h1>
        <p className={styles.intro}>
          目录识别会优先使用 PDF 书签，其次解析印刷目录页，必要时才调用模型；识别结果可以手动修正。
        </p>
        <HiDocTextbookDetailView initialDetail={result.data} />
      </div>
    </main>
  );
}