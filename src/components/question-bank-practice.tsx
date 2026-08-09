"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { selectKnowledgePointById, findAssessmentItemWithGroup } from "@/lib/course-selectors";
import {
  addQBAttempt,
  getQBAttemptStats,
  isQBFavorite,
  toggleQBFavorite,
  saveQBProgress,
  getQBProgress,
} from "@/lib/question-bank-store";
import type {
  AssessmentItemDefinition,
  ChapterDefinition,
  CourseDefinition,
} from "@/types/learning";
import styles from "./question-bank-practice.module.css";

const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

type QuestionBankPracticeProps = {
  course: CourseDefinition;
  chapter: ChapterDefinition;
  items: AssessmentItemDefinition[];
  currentIndex: number;
};

export function QuestionBankPractice({
  course,
  chapter,
  items,
  currentIndex,
}: QuestionBankPracticeProps) {
  const item = items[currentIndex];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [fav, setFav] = useState(() => isQBFavorite(item?.id ?? ""));
  // B1/B2 组成员通过组上下文渲染（共享题干 / 共享备选答案）。
  const itemGroup = item ? findAssessmentItemWithGroup(course, item.id)?.group : undefined;
  const renderChoices = item && item.choices && item.choices.length > 0
    ? item.choices
    : itemGroup?.sharedChoices ?? null;

  if (!item) {
    return (
      <div className={styles.noChoices}>
        <strong>题目未找到</strong>
        <small>请返回章节列表重新选择。</small>
        <Link href={`/courses/${course.slug}/question-bank/${chapter.slug}`}>
          返回章节
        </Link>
      </div>
    );
  }

  const hasChoices = (item.choices && item.choices.length > 0)
    || (itemGroup?.sharedChoices && itemGroup.sharedChoices.length > 0) || false;
  const correctIndex = item.correctChoiceIndex ?? -1;
  const isSubmitted = selectedIndex !== null;
  const isCorrect = isSubmitted ? selectedIndex === correctIndex : false;
  const total = items.length;
  const attemptStats = getQBAttemptStats(item.id);
  const kp = selectKnowledgePointById(course, item.knowledgePointId);

  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem = currentIndex < total - 1 ? items[currentIndex + 1] : null;

  function handleSelect(index: number) {
    if (isSubmitted) return;
    setSelectedIndex(index);
    const correct = index === correctIndex;
    addQBAttempt(item.id, {
      questionId: item.id,
      selectedIndex: index,
      isCorrect: correct,
      attemptedAt: new Date().toISOString(),
    });

    const progressStore = getQBProgress(course.id);
    const chapterProgress = progressStore[chapter.id];
    const completedIndices = new Set(chapterProgress?.completedIndices ?? []);
    completedIndices.add(currentIndex);
    saveQBProgress(course.id, chapter.id, {
      chapterId: chapter.id,
      lastIndex: currentIndex,
      completedIndices: Array.from(completedIndices),
    });
  }

  function handleToggleFav() {
    const next = toggleQBFavorite(item.id);
    setFav(next);
  }

  function getNavUrl(index: number): string {
    return `/courses/${course.slug}/question-bank/${chapter.slug}/${items[index].id}`;
  }

  if (!hasChoices) {
    return (
      <div className={styles.noChoices}>
        <strong>此题目暂不支持交互作答</strong>
        <small>
          {item.questionKind === "term" || item.questionKind === "short-answer"
            ? "主观题请前往写作训练室练习。"
            : "该题型交互功能将在后续版本提供。"}
        </small>
        <Link
          href={`/courses/${course.slug}/question-bank/${chapter.slug}`}
          style={{ display: "inline-block", marginTop: 16, color: "var(--ink)", textDecoration: "underline" }}
        >
          返回章节列表
        </Link>
      </div>
    );
  }

  const answerSourceLabel =
    item.answer.status === "available"
      ? `来源：${item.answer.authority} · ${item.answer.confidence}`
      : "答案待确认";

  function getChoiceClass(index: number): string {
    const classes = [styles.choice];
    if (isSubmitted) {
      classes.push(styles.choiceDisabled);
      if (index === correctIndex) {
        classes.push(styles.choiceCorrect);
      }
      if (index === selectedIndex) {
        classes.push(
          index === correctIndex
            ? styles.choiceSelectedCorrect
            : styles.choiceSelectedWrong,
        );
      }
    }
    return classes.join(" ");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.backRow}>
          <Link
            className={styles.backLink}
            href={`/courses/${course.slug}/question-bank/${chapter.slug}`}
          >
            <ArrowLeft size={16} /> {chapter.title}
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.kindTag}>{item.questionKind}</span>
          <span className={styles.progressLabel}>
            {currentIndex + 1} / {total}
          </span>
        </div>
        {kp ? (
          <div className={styles.knowledgePointTag}>关联知识点：{kp.title}</div>
        ) : null}
      </header>

      <section className={styles.promptSection}>
        {itemGroup?.groupPrompt ? (
          <div className={styles.sharedStem}>
            <strong>共享题干</strong>
            <p>{itemGroup.groupPrompt}</p>
          </div>
        ) : null}
        <p className={styles.prompt}>{item.prompt}</p>

        {itemGroup?.sharedChoices ? (
          <p className={styles.sharedChoicesHint}>
            共用备选答案：每小问选择一个最合适的选项，同一选项可被重复选择。
          </p>
        ) : null}

        <div className={styles.choices}>
          {renderChoices!.map((choice, index) => (
            <button
              key={index}
              type="button"
              className={getChoiceClass(index)}
              onClick={() => handleSelect(index)}
              disabled={isSubmitted}
            >
              <span className={styles.choiceLabel}>
                {CHOICE_LABELS[index] ?? index}
              </span>
              <span className={styles.choiceText}>{choice}</span>
            </button>
          ))}
        </div>
      </section>

      {isSubmitted ? (
        <section className={styles.resultSection}>
          <div className={styles.resultRow}>
            {isCorrect ? (
              <span className={styles.resultCorrect}>✓ 回答正确</span>
            ) : (
              <span className={styles.resultWrong}>
                ✗ 正确答案：{CHOICE_LABELS[correctIndex]}
              </span>
            )}
          </div>
          {!isCorrect && correctIndex >= 0 && renderChoices ? (
            <div className={styles.resultRow}>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>
                你的选择：{CHOICE_LABELS[selectedIndex!]} · {renderChoices[selectedIndex!]}
              </span>
            </div>
          ) : null}
          <div className={styles.statsRow}>
            <span>
              做答次数：<strong>{attemptStats.count}</strong>
            </span>
            <span>
              正确率：<strong>
                {attemptStats.count > 0
                  ? Math.round((attemptStats.correctCount / attemptStats.count) * 100)
                  : 0}%
              </strong>
            </span>
          </div>
          <div className={styles.answerSource}>{answerSourceLabel}</div>
        </section>
      ) : null}

      <div className={styles.bottomBar}>
        <button
          type="button"
          className={`${styles.favButton} ${fav ? styles.favButtonActive : ""}`}
          onClick={handleToggleFav}
          aria-label={fav ? "取消收藏" : "收藏"}
        >
          <Star size={16} fill={fav ? "currentColor" : "none"} />
          {fav ? "已收藏" : "收藏"}
        </button>

        <div className={styles.navButtons}>
          {prevItem ? (
            <Link className={styles.navButton} href={getNavUrl(currentIndex - 1)}>
              <ChevronLeft size={16} />
              上一题
            </Link>
          ) : (
            <Link
              className={`${styles.navButton} ${styles.navBoundary}`}
              href={`/courses/${course.slug}/question-bank/${chapter.slug}`}
              title="已是第一题，返回章节列表"
            >
              <ChevronLeft size={16} />
              已是第一题
            </Link>
          )}
          {nextItem ? (
            <Link className={styles.navButton} href={getNavUrl(currentIndex + 1)}>
              下一题
              <ChevronRight size={16} />
            </Link>
          ) : (
            <Link
              className={`${styles.navButton} ${styles.navBoundary}`}
              href={`/courses/${course.slug}/question-bank/${chapter.slug}`}
              title="已是最后一题，返回章节列表"
            >
              已完成
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

        <div className={styles.progressBar}>
          <progress
            className={styles.progressTrack}
            max={total}
            value={currentIndex + 1}
          />
          <span className={styles.progressText}>
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
