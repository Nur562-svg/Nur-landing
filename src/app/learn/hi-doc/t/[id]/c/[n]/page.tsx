import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiDocStudyRoom } from "@/components/hi-doc-study";
import { getHiDocSessionUser } from "@/lib/hidoc/session-user";
import { getHiDocChapterStudy, getHiDocKnowledgePointStudy } from "@/lib/hidoc/study";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "@/components/hi-doc.module.css";

export const metadata: Metadata = {
  title: "知识点学习 | Hi doc · NUR LEARN",
  description: "按知识点生成讲义，并就讲义与教材原文继续追问。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function HiDocChapterStudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; n: string }>;
  searchParams: Promise<{ kp?: string }>;
}) {
  const user = await getHiDocSessionUser();
  const { id, n } = await params;
  const { kp } = await searchParams;
  const studyPath = `/learn/hi-doc/t/${id}/c/${n}`;

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
          <h1 className={styles.title}>知识点学习</h1>
          <section className={styles.gateCard} aria-labelledby="hidoc-study-gate-title">
            <h2 id="hidoc-study-gate-title">登录后开始学习</h2>
            <p>教材是你的私有资料，讲义与讲解对话需要登录账户才能使用。</p>
            <div className={styles.gateActions}>
              <Link className={styles.gateButton} href={`/login?next=${studyPath}`}>
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

  const chapterOrder = Number.parseInt(n, 10);
  if (!Number.isInteger(chapterOrder) || chapterOrder < 1) {
    notFound();
  }

  const chapterStudy = await getHiDocChapterStudy(user.id, id, chapterOrder);
  if (!chapterStudy.ok) {
    if (chapterStudy.code === "not-found") {
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
          <h1 className={styles.title}>知识点学习</h1>
          <p className={styles.errorBox} role="alert">
            {chapterStudy.message}
          </p>
        </div>
      </main>
    );
  }

  const { knowledgePoints } = chapterStudy.data;
  const requested = kp ? knowledgePoints.find((point) => point.id === kp) : undefined;
  const selectedId = requested?.id
    ?? knowledgePoints.find((point) => point.hasLesson)?.id
    ?? knowledgePoints[0]?.id
    ?? null;
  const pointStudy = selectedId
    ? await getHiDocKnowledgePointStudy(user.id, selectedId)
    : null;

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
          <Link className={styles.headerLink} href={`/learn/hi-doc/t/${id}`}>
            教材详情
          </Link>
          <Link className={styles.headerLink} href="/learn/hi-doc">
            返回书架
          </Link>
        </div>
      </header>

      <div className={styles.studyContent}>
        <p className={styles.kicker}>HI DOC · 知识学习</p>
        <h1 className={styles.title}>{chapterStudy.data.textbook.title}</h1>
        <p className={styles.intro}>
          第 {chapterStudy.data.chapterIndex}/{chapterStudy.data.chapterTotal} 章《
          {chapterStudy.data.chapter.title}》：左侧选知识点，右侧生成讲义（定义 / 要点 / 易错点 / 自测题）
          并就讲义与教材原文继续追问。
        </p>

        {pointStudy?.ok ? (
          <HiDocStudyRoom
            key={pointStudy.data.knowledgePoint.id}
            textbookId={chapterStudy.data.textbook.id}
            chapter={chapterStudy.data}
            selected={pointStudy.data}
          />
        ) : (
          <section className={styles.emptyState}>
            本章还没有可学习的知识点：先回到
            <Link href={`/learn/hi-doc/t/${id}`}> 教材详情 </Link>
            对第 {chapterOrder} 章运行「萃取知识点」。
          </section>
        )}
      </div>
    </main>
  );
}