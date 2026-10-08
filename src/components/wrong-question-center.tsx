"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import type { CourseDefinition, FsrsCriterionState } from "@/types/learning";
import { useWrongQuestionCenter } from "@/hooks/use-wrong-questions";
import { repeatedOmissionThreshold } from "@/lib/learning-memory";
import { EmptyState, EmptyBoxIllustration } from "@/components/ui/v2/empty-state";
import {
  selectWeakKnowledgePointHref,
  selectWrongQuestionRedoHref,
  selectWrongQuestionRedoLabel,
  type ClewWrongItem,
  type FsrsHighRiskItem,
  type StructuralWeakness,
} from "@/lib/wrong-questions";
import { QUESTION_KIND_OPTIONS } from "@/lib/question-kind-labels";
import { V2Badge } from "@/components/ui/v2/badge";
import styles from "./wrong-question-center.module.css";
import { SyncStatusBadge } from "./sync-status-badge";
import { PLATFORM_DOCK_PROPS, useNurAgentDockProps } from "@/lib/agent-dock-props";

type WrongQuestionCenterProps = {
  courses: readonly CourseDefinition[];
  /** ZCODE-M5：服务端注入的 Clew 复习调度条目（未登录为空数组）。 */
  clewItems?: readonly ClewWrongItem[];
};

type CenterTab = "objective" | "structural" | "fsrs" | "review" | "clew";

const FSRS_STATE_LABELS: Record<FsrsCriterionState["state"], string> = {
  new: "未开始",
  learning: "学习中",
  review: "复习中",
  relearning: "重学中",
};

function getKindLabel(kind: string): string {
  const option = QUESTION_KIND_OPTIONS.find((o) => o.kind === kind);
  return option?.shortLabel ?? option?.label ?? kind;
}

function formatDate(iso: string): string {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  const date = new Date(time);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** 结构薄弱入口：优先最近漏掉发生的训练室，按存在性回退。 */
function weaknessEntry(weakness: StructuralWeakness): { href: string; label: string } {
  const kpBase = `/courses/${weakness.courseSlug}/knowledge-points/${weakness.knowledgePointSlug}`;
  if (weakness.latestSurface === "case-reasoning" && weakness.hasCaseRoom) {
    return { href: `${kpBase}/case-reasoning`, label: "去案例" };
  }
  if (weakness.hasWritingRoom) {
    return { href: `${kpBase}/subjective-writing`, label: "去写作" };
  }
  if (weakness.hasCaseRoom) {
    return { href: `${kpBase}/case-reasoning`, label: "去案例" };
  }
  if (weakness.hasLesson) {
    return { href: kpBase, label: "去学习" };
  }
  return { href: `/courses/${weakness.courseSlug}/question-bank`, label: "去做题" };
}

/** 临遗忘复习入口：优先写作室（主动回忆），按存在性回退。 */
function fsrsEntry(item: FsrsHighRiskItem): { href: string; label: string } {
  const kpBase = `/courses/${item.courseSlug}/knowledge-points/${item.knowledgePointSlug}`;
  if (item.hasWritingRoom) {
    return { href: `${kpBase}/subjective-writing`, label: "去复习" };
  }
  if (item.hasCaseRoom) {
    return { href: `${kpBase}/case-reasoning`, label: "去复习" };
  }
  if (item.hasLesson) {
    return { href: kpBase, label: "去学习" };
  }
  return { href: `/courses/${item.courseSlug}/question-bank`, label: "去做题" };
}

/** Clew 线条目到期信息：已到期 / 即将到期（7 天内）/ 常规排期。 */
function clewDueLabel(item: ClewWrongItem): string {
  const due = Date.parse(item.dueAt);
  if (Number.isNaN(due)) return "排期未知";
  const diffDays = (due - Date.now()) / 86_400_000;
  if (diffDays <= 0) return "已到期待复习";
  if (diffDays <= 7) return `即将到期（${formatDate(item.dueAt)}）`;
  return `下次复习 ${formatDate(item.dueAt)}`;
}

export function WrongQuestionCenter({ courses, clewItems = [] }: WrongQuestionCenterProps) {
  const data = useWrongQuestionCenter(courses, clewItems);
  useNurAgentDockProps(PLATFORM_DOCK_PROPS);
  const [activeTab, setActiveTab] = useState<CenterTab>("objective");

  const tabs: readonly { id: CenterTab; label: string; count: number }[] = [
    { id: "objective", label: "客观错题", count: data.totalWrong },
    { id: "structural", label: "结构薄弱", count: data.structuralWeaknesses.length },
    { id: "fsrs", label: "即将遗忘", count: data.fsrsHighRisk.length },
    { id: "review", label: "复习提案", count: data.reviewProposals.length },
    { id: "clew", label: "Clew 教材", count: data.clewItems.length },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/learn">
          <ArrowLeft size={16} /> 返回学习首页
        </Link>
        <h1 className={styles.title}>错题中心 <SyncStatusBadge /></h1>
        <p className={styles.subtitle}>
          汇总题库与模考的客观错题、写作与案例确认记录中的结构薄弱点、临遗忘的记忆准则、私人练习与确认后产生的复习提案，以及 Clew 教材自测「还需看」的复习排期。
        </p>
      </header>

      <div className={styles.tabBar} role="tablist" aria-label="错题中心分区">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className={styles.tabCount}>{tab.count}</span>
          </button>
        ))}
      </div>

      {activeTab === "objective" ? (
        <div className={styles.tabPanel} role="tabpanel">
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

          {data.totalWrong === 0 ? (
            <EmptyState
              tone="rich"
              illustration={<EmptyBoxIllustration />}
              title="暂无错题记录"
              hint="去题库做题、参加模考，或在「导入」里提交私人单选/填空后，错题会自动汇总到这里。"
              action={
                <Link className={styles.emptyStateLink} href="/question-bank">
                  去做题 <ArrowRight size={16} />
                </Link>
              }
            />
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
                      const kpHref = selectWeakKnowledgePointHref(kp);
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
                    const redoHref = selectWrongQuestionRedoHref(q);
                    const actionLabel = selectWrongQuestionRedoLabel(q);
                    return (
                      <Link
                        key={q.questionId}
                        href={redoHref}
                        className={styles.wrongItem}
                      >
                        <span className={styles.wrongItemIndex}>{idx + 1}</span>
                        <span className={styles.wrongItemMain}>
                          <span className={styles.wrongItemPrompt}>
                            {q.prompt.length > 80
                              ? q.prompt.slice(0, 77) + "..."
                              : q.prompt}
                          </span>
                          <span className={styles.wrongItemCourse}>{q.courseTitle}</span>
                        </span>
                        <V2Badge className={styles.wrongItemKind} variant="outline">
                          {getKindLabel(q.questionKind)}
                        </V2Badge>
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
      ) : null}

      {activeTab === "structural" ? (
        <div className={styles.tabPanel} role="tabpanel">
          <section>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>结构薄弱点</h2>
              <span className={styles.sectionHint}>
                同一准则在 {repeatedOmissionThreshold} 个不同任务中漏掉后进入此列表
              </span>
            </div>
            {data.structuralWeaknesses.length === 0 ? (
              <EmptyState
                tone="rich"
                illustration={<EmptyBoxIllustration />}
                title="暂无结构薄弱记录"
                hint="在写作室或案例推理室完成自核并确认保存后，反复漏掉的结构准则会汇总到这里。"
              />
            ) : (
              <div className={styles.weaknessList}>
                {data.structuralWeaknesses.map((w, idx) => {
                  const entry = weaknessEntry(w);
                  return (
                    <Link
                      key={`${w.courseId}:${w.knowledgePointId}:${w.criterionId}`}
                      href={entry.href}
                      className={styles.weaknessItem}
                    >
                      <span className={styles.wrongItemIndex}>{idx + 1}</span>
                      <span className={styles.weaknessMain}>
                        <span className={styles.weaknessTitle}>
                          {w.knowledgePointTitle}
                          <span className={styles.weaknessCriterion}>
                            {w.criterionLabel}
                          </span>
                        </span>
                        <span className={styles.weaknessMeta}>
                          <span>漏 {w.distinctTaskCount} 个不同任务</span>
                          <span>·</span>
                          <span>最近 {formatDate(w.lastOmittedAt)}</span>
                          <span>·</span>
                          <span>{w.courseTitle}</span>
                        </span>
                      </span>
                      <span className={styles.weaknessAction}>
                        {entry.label}
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      ) : null}

      {activeTab === "fsrs" ? (
        <div className={styles.tabPanel} role="tabpanel">
          <section>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>即将遗忘的记忆准则</h2>
              <span className={styles.sectionHint}>重学中，或遗忘次数已达 2 次</span>
            </div>
            {data.fsrsHighRisk.length === 0 ? (
              data.hasFsrsMemory ? (
                <EmptyState
                  tone="rich"
                  illustration={<EmptyBoxIllustration />}
                  title="暂无高危记忆准则"
                  hint="已有自评确认记录，但当前没有处于重学中或遗忘次数达到 2 次的准则。继续练习并关注复习计划即可。"
                />
              ) : (
                <EmptyState
                  tone="rich"
                  illustration={<EmptyBoxIllustration />}
                  title="尚未产生足够的记忆数据"
                  hint="在写作/案例房间完成自评确认后，系统会按准则更新记忆强度；同一准则连续漏掉两次后，会出现在这里。"
                />
              )
            ) : (
              <div className={styles.weaknessList}>
                {data.fsrsHighRisk.map((item, idx) => {
                  const entry = fsrsEntry(item);
                  return (
                    <Link
                      key={`${item.courseId}:${item.knowledgePointId}:${item.criterionId}`}
                      href={entry.href}
                      className={styles.weaknessItem}
                    >
                      <span className={styles.wrongItemIndex}>{idx + 1}</span>
                      <span className={styles.weaknessMain}>
                        <span className={styles.weaknessTitle}>
                          {item.knowledgePointTitle}
                          <span className={styles.weaknessCriterion}>
                            {item.criterionLabel}
                          </span>
                        </span>
                        <span className={styles.weaknessMeta}>
                          <span>{FSRS_STATE_LABELS[item.fsrs.state]}</span>
                          <span>·</span>
                          <span>遗忘 {item.fsrs.lapses} 次</span>
                          <span>·</span>
                          <span>建议间隔 {item.suggestedIntervalDays} 天</span>
                          {item.fsrs.lastReviewAt ? (
                            <>
                              <span>·</span>
                              <span>上次复习 {formatDate(item.fsrs.lastReviewAt)}</span>
                            </>
                          ) : null}
                          <span>·</span>
                          <span>{item.courseTitle}</span>
                        </span>
                      </span>
                      <span className={styles.weaknessAction}>
                        {entry.label}
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      ) : null}

      {activeTab === "review" ? (
        <div className={styles.tabPanel} role="tabpanel">
          <section>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>复习提案</h2>
              <span className={styles.sectionHint}>确认后显式提出的回流任务（私人练习会立即产生）</span>
            </div>
            {data.reviewProposals.length === 0 ? (
              <EmptyState
                tone="rich"
                illustration={<EmptyBoxIllustration />}
                title="暂无复习提案"
                hint="在写作室、案例室或私人练习确认作答后，系统会按需生成复习提案。这里会列出待处理的。"
              />
            ) : (
              <div className={styles.weaknessList}>
                {data.reviewProposals.map((proposal, idx) => {
                  const href = proposal.isPrivate
                    ? "/learn/my-materials"
                    : `/courses/${proposal.courseId.split(":")[0] ?? "tcm-diagnostics"}/knowledge-points`; // 简化回退，实际可扩展
                  const label = proposal.isPrivate ? "去私人练习（会话恢复或重开单元）" : "查看相关练习";
                  return (
                    <Link
                      key={proposal.id}
                      href={href}
                      className={styles.weaknessItem}
                    >
                      <span className={styles.wrongItemIndex}>{idx + 1}</span>
                      <span className={styles.weaknessMain}>
                        <span className={styles.weaknessTitle}>
                          {proposal.label}
                          {proposal.isPrivate ? <span className={styles.weaknessCriterion}>（私人）</span> : null}
                        </span>
                        <span className={styles.weaknessMeta}>
                          <span>提案于 {formatDate(proposal.proposedAt)}</span>
                          <span>·</span>
                          <span>{proposal.knowledgePointId}</span>
                        </span>
                      </span>
                      <span className={styles.weaknessAction}>
                        {label}
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      ) : null}
      {activeTab === "clew" ? (
        <div className={styles.tabPanel} role="tabpanel">
          <section>
            <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>Clew 教材 · 待复习知识点</h2>
              <span className={styles.sectionHint}>自测标记「还需看」后按遗忘曲线排期；重学后在学习页打分回流</span>
            </div>
            {data.clewItems.length === 0 ? (
              <EmptyState
                tone="rich"
                illustration={<EmptyBoxIllustration />}
                title="暂无 Clew 复习条目"
                hint="在 Clew 学习页对讲义自测标记「还需看」，该知识点会进入复习调度并汇总到这里。"
                action={
                  <Link className={styles.emptyStateLink} href="/learn/clew">
                    去 Clew 学习 <ArrowRight size={16} />
                  </Link>
                }
              />
            ) : (
              <div className={styles.weaknessList}>
                {data.clewItems.map((item, idx) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={styles.weaknessItem}
                  >
                    <span className={styles.wrongItemIndex}>{idx + 1}</span>
                    <span className={styles.weaknessMain}>
                      <span className={styles.weaknessTitle}>
                        {item.kpTitle}
                        <span className={styles.weaknessCriterion}>
                          {item.sourceKind === "practice-wrong" ? "练习错题 · " : "自测标记 · "}
                          {clewDueLabel(item)}
                        </span>
                      </span>
                      <span className={styles.weaknessMeta}>
                        <span>{item.textbookTitle}</span>
                        <span>·</span>
                        <span>复习 {item.reviewCount} 次</span>
                        <span>·</span>
                        <span>遗忘 {item.lapses} 次</span>
                        <span>·</span>
                        <span>最近自测 {formatDate(item.lastReviewedAt)}</span>
                      </span>
                    </span>
                    <span className={styles.weaknessAction}>
                      重学
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
