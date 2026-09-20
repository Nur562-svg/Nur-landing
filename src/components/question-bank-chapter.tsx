"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import {
  getQBProgress,
  getQBAttemptStats,
  isQBFavorite,
  toggleQBFavorite,
  getQBChapterStats,
} from "@/lib/question-bank-store";
import type {
  AssessmentItemDefinition,
  ChapterDefinition,
  CourseDefinition,
  QuestionKind,
} from "@/types/learning";
import type { ChapterQBProgress } from "@/types/question-bank";
import { QUESTION_KIND_OPTIONS, questionKindShortLabel, serializeQuestionBankKindQuery, filterQuestionBankItemsByKinds } from "@/lib/question-kind-labels";
import styles from "./question-bank-chapter.module.css";

function getAnswerStatusLabel(
  item: AssessmentItemDefinition,
): string {
  if (item.answer.status === "available") {
    if (item.answer.authority === "nur-platform") {
      return "NUR 参考";
    }
    return item.answer.authority;
  }
  if (item.answer.status === "missing") {
    return "待确认";
  }
  return item.answer.status;
}

type QuestionBankChapterProps = {
  course: CourseDefinition;
  chapter: ChapterDefinition;
  items: AssessmentItemDefinition[];
};

export function QuestionBankChapter({
  course,
  chapter,
  items,
}: QuestionBankChapterProps) {
  const [selectedKinds, setSelectedKinds] = useState<Set<QuestionKind>>(new Set());
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [progressStore] = useState(() => getQBProgress(course.id));

  const progress: ChapterQBProgress | null = progressStore[chapter.id] ?? null;

  const stats = useMemo(
    () => getQBChapterStats(items.map((i) => i.id), progress),
    [items, progress],
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

  const filteredItems = useMemo(() => {
    return filterQuestionBankItemsByKinds(items, [...selectedKinds]);
  }, [items, selectedKinds]);

  const completedSet = useMemo(
    () => new Set(progress?.completedIndices ?? []),
    [progress],
  );

  function originalIndex(questionId: string): number {
    return items.findIndex((item) => item.id === questionId);
  }

  function firstUnstarted(queue: AssessmentItemDefinition[]): AssessmentItemDefinition | null {
    if (queue.length === 0) {
      return null;
    }
    return queue.find((item) => !completedSet.has(originalIndex(item.id))) ?? queue[0];
  }

  const startAllItem = firstUnstarted(filterQuestionBankItemsByKinds(items, []));
  const startFilteredItem = selectedKinds.size > 0 ? firstUnstarted(filteredItems) : null;
  const kindsQuery = serializeQuestionBankKindQuery(selectedKinds);

  function practiceHref(questionId: string, withKinds: boolean): string {
    const path = `/courses/${course.slug}/question-bank/${chapter.slug}/${questionId}`;
    if (!withKinds || !kindsQuery) {
      return path;
    }
    return `${path}?kinds=${kindsQuery}`;
  }

  function handleToggleFavorite(questionId: string) {
    const isNow = toggleQBFavorite(questionId);
    setFavorites((prev) => ({ ...prev, [questionId]: isNow }));
  }

  const progressPercent =
    stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.backRow}>
          <Link
            className={styles.backLink}
            href={`/courses/${course.slug}/question-bank`}
          >
            <ArrowLeft size={16} /> 题库
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.chapterLabel}>CHAPTER {chapter.indexLabel}</span>
        </div>
        <h1 className={styles.title}>{chapter.title}</h1>
        <p className={styles.subtitle}>{chapter.focus}</p>
        <div className={styles.progressBar}>
          <progress
            className={styles.progressTrack}
            max={100}
            value={progressPercent}
            aria-label={`章节进度 ${progressPercent}%`}
          />
          <span className={styles.progressLabel}>
            {stats.done} / {stats.total} · {progressPercent}%
          </span>
        </div>
      </header>

      <div className={styles.filterRow}>
        {QUESTION_KIND_OPTIONS.map(({ kind, shortLabel }) => (
          <button
            key={kind}
            type="button"
            className={`${styles.kindTag} ${
              selectedKinds.has(kind) ? styles.kindTagActive : ""
            }`}
            onClick={() => toggleKind(kind)}
          >
            {shortLabel}
          </button>
        ))}
        <div className={styles.startActions}>
          {startFilteredItem ? (
            <Link
              className={styles.startFilteredButton}
              href={practiceHref(startFilteredItem.id, true)}
            >
              可开始
              <ArrowRight size={16} />
            </Link>
          ) : null}
          {startAllItem ? (
            <Link
              className={styles.startButton}
              href={practiceHref(startAllItem.id, false)}
            >
              {stats.done >= stats.total && stats.total > 0 ? "重新开始" : "开始刷题"}
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className={styles.itemList}>
          {filteredItems.map((item, index) => {
            const answerStatus = getAnswerStatusLabel(item);
            const attemptStats = getQBAttemptStats(item.id);
            const fav = favorites[item.id] ?? isQBFavorite(item.id);
            const href = practiceHref(item.id, selectedKinds.size > 0);

            return (
              <div
                key={item.id}
                className={`${styles.itemRow} ${styles.itemRowClickable}`}
                role="link"
                tabIndex={0}
                onClick={() => {
                  window.location.href = href;
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    window.location.href = href;
                  }
                }}
              >
                <span className={styles.itemIndex}>{index + 1}</span>
                <span className={styles.itemPrompt}>
                  {item.prompt.length > 72
                    ? item.prompt.slice(0, 69) + "..."
                    : item.prompt}
                </span>
                <span className={styles.itemKind}>{questionKindShortLabel(item.questionKind)}</span>
                <span className={styles.itemAnswerStatus}>{answerStatus}</span>
                <div className={styles.itemActions}>
                  {attemptStats.count > 0 ? (
                    <span
                      className={`${styles.itemStatusIcon} ${
                        attemptStats.correctCount > 0
                          ? styles.itemStatusCorrect
                          : styles.itemStatusDone
                      }`}
                      title={`做答 ${attemptStats.count} 次，正确 ${attemptStats.correctCount}`}
                    >
                      {attemptStats.correctCount > 0 ? "✓" : "✗"}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className={`${styles.favoriteStar} ${
                      fav ? styles.favoriteStarActive : ""
                    }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggleFavorite(item.id);
                    }}
                    aria-label={fav ? "取消收藏" : "收藏"}
                  >
                    <Star
                      size={15}
                      fill={fav ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>此选题型暂无题目</strong>
          <small>切换上方题型筛选查看其他题目。</small>
        </div>
      )}
    </div>
  );
}
