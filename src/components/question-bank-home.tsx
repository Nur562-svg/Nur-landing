"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  selectAssessmentItemsForChapter,
  selectVisibleChapterViews,
} from "@/lib/course-selectors";
import {
  getQBProgress,
  getQBChapterStats,
} from "@/lib/question-bank-store";
import type {
  CourseDefinition,
  LearnerCourseState,
  QuestionKind,
} from "@/types/learning";
import { QUESTION_KIND_OPTIONS } from "@/lib/question-kind-labels";
import styles from "./question-bank-home.module.css";
import { SyncStatusBadge } from "./sync-status-badge";

type QuestionBankHomeProps = {
  course: CourseDefinition;
  learnerState: LearnerCourseState;
};

export function QuestionBankHome({ course, learnerState }: QuestionBankHomeProps) {
  const [search, setSearch] = useState("");
  const [selectedKinds, setSelectedKinds] = useState<Set<QuestionKind>>(new Set());
  const [progressStore] = useState(() => getQBProgress(course.id));

  const chapters = useMemo(
    () => selectVisibleChapterViews(course, learnerState, "all"),
    [course, learnerState],
  );

  function toggleKind(kind: QuestionKind) {
    setSelectedKinds((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) {
        next.delete(kind);
      } else {
        next.add(kind);
      }
      return next;
    });
  }

  const chapterData = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    return chapters.map((chapter) => {
      let items = selectAssessmentItemsForChapter(course, chapter.id);
      if (selectedKinds.size > 0) {
        items = items.filter((item) => selectedKinds.has(item.questionKind));
      }
      if (searchLower) {
        items = items.filter((item) =>
          item.prompt.toLowerCase().includes(searchLower),
        );
      }
      const progress = progressStore[chapter.id] ?? null;
      const stats = getQBChapterStats(
        items.map((i) => i.id),
        progress,
      );
      return { chapter, items, progress, stats };
    });
  }, [course, chapters, selectedKinds, search, progressStore]);

  const totalStats = useMemo(() => {
    let total = 0;
    let done = 0;
    let correct = 0;
    for (const d of chapterData) {
      total += d.stats.total;
      done += d.stats.done;
      correct += d.stats.correct;
    }
    return { total, done, correct };
  }, [chapterData]);

  const answerCoverage = useMemo(() => {
    let withAnswer = 0;
    let total = 0;
    for (const d of chapterData) {
      for (const item of d.items) {
        total++;
        if (item.answer.status !== "missing") {
          withAnswer++;
        }
      }
    }
    return total > 0 ? Math.round((withAnswer / total) * 100) : 0;
  }, [chapterData]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link
          className={styles.backLink}
          href={`/courses/${course.slug}`}
        >
          <ArrowLeft size={16} /> 返回课程工作台
        </Link>
        <h1 className={styles.title}>{course.title} · 题库 <SyncStatusBadge /></h1>
        <p className={styles.subtitle}>按章节浏览与练习；做答进度保存在此浏览器。</p>
      </header>

      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="搜索题干关键词..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <div className={styles.kindTags}>
          {QUESTION_KIND_OPTIONS.map(({ kind, label }) => (
            <button
              key={kind}
              type="button"
              className={`${styles.kindTag} ${
                selectedKinds.has(kind) ? styles.kindTagActive : ""
              }`}
              onClick={() => toggleKind(kind)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.statsBar}>
        <span className={styles.statItem}>
          共 <strong>{totalStats.total}</strong> 题
        </span>
        <span className={styles.statItem}>
          已做 <strong>{totalStats.done}</strong>
        </span>
        <span className={styles.statItem}>
          正确 <strong>{totalStats.correct}</strong>
        </span>
        <span className={styles.statItem}>
          来源答案覆盖率 <strong>{answerCoverage}%</strong>
        </span>
      </div>

      {chapterData.length > 0 ? (
        <div className={styles.chapterList}>
          {chapterData.map(({ chapter, stats }) => {
            const progressPercent =
              stats.total > 0
                ? Math.round((stats.done / stats.total) * 100)
                : 0;
            const hasProgress = stats.done > 0;

            return (
              <Link
                key={chapter.id}
                href={`/courses/${course.slug}/question-bank/${chapter.slug}`}
                className={styles.chapterCard}
              >
                <div className={styles.chapterCardTop}>
                  <span className={styles.chapterIndex}>
                    CHAPTER {chapter.indexLabel}
                  </span>
                  <h2 className={styles.chapterName}>{chapter.title}</h2>
                  <span className={styles.chapterCount}>
                    <strong>{stats.done}</strong> / {stats.total} 题
                  </span>
                </div>
                <progress
                  className={styles.progressTrack}
                  max={100}
                  value={progressPercent}
                  aria-label={`${chapter.title}进度 ${progressPercent}%`}
                />
                <div className={styles.chapterCardBottom}>
                  <span className={styles.chapterCount}>
                    {progressPercent}% 完成
                    {stats.correct > 0 ? ` · 正确 ${stats.correct}` : ""}
                  </span>
                  <span className={styles.chapterAction}>
                    {hasProgress ? "继续做" : "开始"}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>当前筛选范围内暂无题目</strong>
          <small>调整筛选条件或切换到其他章节查看。</small>
        </div>
      )}
    </div>
  );
}
