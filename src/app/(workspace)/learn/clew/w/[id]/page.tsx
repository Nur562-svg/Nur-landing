import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClewWorkshopRoom } from "@/components/clew-workshop-room";
import { getClewSessionUser } from "@/lib/clew/session-user";
import { getClewWorkshopDetail } from "@/lib/clew/workshops";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/clew.module.css";

export const metadata: Metadata = {
  title: "课题详情 | Clew · Ariadne",
  description: "管理课题材料，并就材料内容追问答疑。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ClewWorkshopPage({
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
            <Link className={styles.headerLink} href="/learn/clew/w">
              返回课题列表
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>CLEW · 课题工作坊</p>
          <h1 className={styles.title}>课题详情</h1>
          <section className={styles.gateCard} aria-labelledby="clew-workshop-detail-gate-title">
            <h2 id="clew-workshop-detail-gate-title">登录后查看课题</h2>
            <p>课题是你的私有资料，需要登录账户才能查看材料与答疑记录。</p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href={`/login?next=/learn/clew/w/${id}`}>
                去登录
              </Link>
              <Link className={styles.gateSecondary} href="/learn/clew/w">
                返回课题列表
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const result = await getClewWorkshopDetail(user.id, user.tier, id);
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
            <Link className={styles.headerLink} href="/learn/clew/w">
              返回课题列表
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.kicker}>CLEW · 课题工作坊</p>
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
          Ariadne
        </Link>
        <div className={styles.headerMeta}>
          <span>
            {user.displayName} · {getMembershipTierLabel(user.tier)}
          </span>
          <Link className={styles.headerLink} href="/learn/clew/w">
            返回课题列表
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.kicker}>CLEW · 课题工作坊</p>
        <h1 className={styles.title}>{result.data.workshop.title}</h1>
        {result.data.workshop.note ? (
          <p className={styles.intro}>{result.data.workshop.note}</p>
        ) : null}
        <ClewWorkshopRoom initialDetail={result.data} />
      </div>
    </main>
  );
}
