import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClewTextbookDetailView } from "@/components/clew-textbook";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getClewTextbookDetail } from "@/lib/clew/chapters";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/clew.module.css";

export const metadata: Metadata = {
  title: "教材详情 | Clew · Ariadne",
  description: "查看教材章节树、运行目录识别并手动修正章节。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ClewTextbookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getClewSessionUser();
  const { id } = await params;

  if (!user) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/learn">
            Ariadne
          </Link>
          <div className={styles.headerMeta}>
            <Link className={styles.headerLink} href="/learn/clew">
              返回书架
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>CLEW</p>
          <h1 className={styles.title}>教材详情</h1>
          <section className={styles.gateCard} aria-labelledby="clew-detail-gate-title">
            <h2 id="clew-detail-gate-title">登录后查看教材</h2>
            <p>教材是你的私有资料，需要登录账户才能查看、识别目录与手动修正章节。</p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href={`/login?next=/learn/clew/t/${id}`}>
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn/clew">
                返回书架
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const result = await getClewTextbookDetail(user.id, id);
  if (!result.ok) {
    if (result.code === "not-found") {
      notFound();
    }
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/learn">
            Ariadne
          </Link>
          <div className={styles.headerMeta}>
            <Link className={styles.headerLink} href="/learn/clew">
              返回书架
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>CLEW</p>
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
          Ariadne
        </Link>
        <div className={styles.headerMeta}>
          <span>
            {user.displayName} · {getMembershipTierLabel(user.tier)}
          </span>
          <Link className={styles.headerLink} href="/learn/clew">
            返回书架
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>CLEW · 教材详情</p>
        <h1 className={styles.title}>{textbook.title}</h1>
        <p className={styles.intro}>
          目录识别优先使用 PDF 书签，其次解析印刷目录页，必要时才调用模型；章节与知识点都可人工核对。
          识别出章节后，可按章萃取知识点（含页码溯源）；展开知识点即可进入学习页生成讲义并追问。
        </p>
        <ClewTextbookDetailView initialDetail={result.data} />
      </div>
    </main>
  );
}