import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiDocWorkshopRoom } from "@/components/hi-doc-workshop-room";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { getHiDocWorkshopDetail } from "@/lib/hidoc/workshops";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/hi-doc.module.css";

export const metadata: Metadata = {
  title: "课题详情 | Hi doc · NUR LEARN",
  description: "管理课题材料，并就材料内容追问答疑。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function HiDocWorkshopPage({
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
            <Link className={styles.headerLink} href="/learn/hi-doc/w">
              返回课题列表
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>HI DOC · 课题工作坊</p>
          <h1 className={styles.title}>课题详情</h1>
          <section className={styles.gateCard} aria-labelledby="hidoc-workshop-detail-gate-title">
            <h2 id="hidoc-workshop-detail-gate-title">登录后查看课题</h2>
            <p>课题是你的私有资料，需要登录账户才能查看材料与答疑记录。</p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href={`/login?next=/learn/hi-doc/w/${id}`}>
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn/hi-doc/w">
                返回课题列表
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const result = await getHiDocWorkshopDetail(user.id, user.tier, id);
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
            <Link className={styles.headerLink} href="/learn/hi-doc/w">
              返回课题列表
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>HI DOC · 课题工作坊</p>
          <h1 className={styles.title}>课题详情</h1>
          <p className={styles.errorBox} role="alert">
            {result.message}
          </p>
        </div>
      </main>
    );
  }

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
          <Link className={styles.headerLink} href="/learn/hi-doc/w">
            返回课题列表
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>HI DOC · 课题工作坊</p>
        <h1 className={styles.title}>{result.data.workshop.title}</h1>
        {result.data.workshop.note ? (
          <p className={styles.intro}>{result.data.workshop.note}</p>
        ) : null}
        <HiDocWorkshopRoom initialDetail={result.data} />
      </div>
    </main>
  );
}
