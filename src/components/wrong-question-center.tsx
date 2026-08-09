"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CircleX, BookOpen } from "lucide-react";
import type { CourseDefinition } from "@/types/learning";
import { useWrongQuestionCenter } from "@/hooks/use-wrong-questions";
import { QUESTION_KIND_OPTIONS } from "@/lib/question-kind-labels";
import styles from "./wrong-question-center.module.css";
import { SyncStatusBadge } from "./sync-status-badge";

type WrongQuestionCenterProps = {
  courses: readonly CourseDefinition[];
};

function getKindLabel(kind: string): string {
  const option = QUESTION_KIND_OPTIONS.find((o) => o.kind === kind);
  return option?.shortLabel ?? option?.label ?? kind;
}

export function WrongQuestionCenter({ courses }: WrongQuestionCenterProps) {
  const data = useWrongQuestionCenter(courses);

  const hasData = data.totalWrong > 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/learn">
          <ArrowLeft size={16} /> 返回学习首页
        </Link>
        <h1 className={styles.title}>错题中心 <SyncStatusBadge /></h1>
        <p className={styles.subtitle}>
          汇总题库练习与模考中的错题，按弱项知识点聚合，支持一键重做与知识点回看。
        </p>
      </header>

      <div className={styles.statsBar}>
        <span className={styles.statItem}>
          错题
          <strong className={styles.statAccent}>{data.totalWrong}</strong>
        </span>
        <span className={styles.statItem}>
          总做答
          <strong>{data.totalAttempts}</strong>
        </span>
        <span className={styles.statItem}>
          弱项知识点
          <strong className={styles.statAccent}>{data.weakKpCount}</strong>
        </span>
      </div>

      {!hasData ? (
        <div className={styles.emptyState}>
          <CircleX size={32} strokeWidth={1.3} />
          <strong>暂无错题记录</strong>
          <small>
            去题库做题或参加模考后，错题会自动汇总到这里。
          </small>
          <Link className={styles.emptyStateLink} href="/question-bank">
            去做题 <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          {/* ── Weak Knowledge Points ── */}
          {data.weakKnowledgePoints.length > 0 ? (
            <section className={styles.weakKpSection}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>弱项知识点</h2>
                <span className={styles.sectionHint}>按错题数量排序</span>
              </div>
              <div className={styles.weakKpGrid}>
                {data.weakKnowledgePoints.map((kp) => {
                  const ratioPercent = Math.round(kp.wrongRatio * 100);
                  const kpHref = kp.hasLesson
                    ? `/courses/${kp.courseSlug}/knowledge-points/${kp.knowledgePointSlug}`
                    : `/courses/${kp.courseSlug}/question-bank`;
                  return (
                    <Link
                      key={`${kp.courseId}:${kp.knowledgePointId}`}
                      href={kpHref}
                      className={styles.weakKpCard}
                    >
                      <div className={styles.weakKpCardTop}>
                        <h3 className={styles.weakKpTitle}>
                          {kp.knowledgePointTitle}
                        </h3>
                        <span className={styles.weakKpBadge}>
                          {kp.wrongCount} 错
                        </span>
                      </div>
                      <div className={styles.weakKpMeta}>
                        <span>{kp.courseTitle}</span>
                        <span>·</span>
                        <span>
                          {kp.wrongCount} / {kp.totalAttempts} 题
                        </span>
                        <span className={styles.weakKpRatio}>
                          <span>错误率</span>
                          <span
                            className={styles.ratioBar}
                            role="presentation"
                          >
                            <span
                              className={styles.ratioFill}
                              style={{ width: `${ratioPercent}%` }}
                            />
                          </span>
                          <span>{ratioPercent}%</span>
                        </span>
                      </div>
                      <span className={styles.weakKpAction}>
                        {kp.hasLesson ? (
                          <>
                            <BookOpen size={14} strokeWidth={1.5} />
                            去学习
                          </>
                        ) : (
                          <>
                            <ArrowRight size={14} strokeWidth={1.5} />
                            去做题
                          </>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* ── Wrong Question List ── */}
          <section>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>错题列表</h2>
              <span className={styles.sectionHint}>按最近错答时间排序</span>
            </div>
            <div className={styles.wrongList}>
              {data.wrongQuestions.map((q, idx) => {
                const redoHref = q.canRedo
                  ? `/courses/${q.courseSlug}/question-bank/${q.chapterSlug}/${q.questionId}`
                  : q.hasWritingRoom
                    ? `/courses/${q.courseSlug}/knowledge-points/${q.knowledgePointSlug}/subjective-writing`
                    : `/courses/${q.courseSlug}/knowledge-points/${q.knowledgePointSlug}`;
                const actionLabel = q.canRedo
                  ? "重做"
                  : q.hasWritingRoom
                    ? "去写作"
                    : "查看";
                return (
                  <Link
                    key={q.questionId}
                    href={redoHref}
                    className={styles.wrongItem}
                  >
                    <span className={styles.wrongItemIndex}>{idx + 1}</span>
                    <span className={styles.wrongItemPrompt}>
                      {q.prompt.length > 80
                        ? q.prompt.slice(0, 77) + "..."
                        : q.prompt}
                    </span>
                    <span className={styles.wrongItemKind}>
                      {getKindLabel(q.questionKind)}
                    </span>
                    <span className={styles.wrongItemStats}>
                      {q.wrongCount} 错 / {q.totalAttempts} 次
                    </span>
                    <span className={styles.wrongItemAction}>
                      {actionLabel}
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
