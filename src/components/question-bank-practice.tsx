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
import { PLATFORM_DOCK_PROPS, useNurAgentDockProps } from "@/lib/agent-dock-props";
import { notifyQuizResult } from "@/lib/bot-emotion";
import {
  matchQuestionBankFill,
  shouldRecordQuestionBankAttempt,
} from "@/lib/question-bank-written";

const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

const KIND_LABEL: Record<string, string> = {
  "a1-single": "单选",
  b1: "B型题",
  b2: "B型题",
  fill: "填空",
  term: "名词解释",
  "short-answer": "简答",
  case: "病例分析",
};

type QuestionBankPracticeProps = {
  course: CourseDefinition;
  chapter: ChapterDefinition;
  items: AssessmentItemDefinition[];
  currentIndex: number;
};

function markChapterProgress(
  courseId: string,
  chapterId: string,
  currentIndex: number,
) {
  const progressStore = getQBProgress(courseId);
  const chapterProgress = progressStore[chapterId];
  const completedIndices = new Set(chapterProgress?.completedIndices ?? []);
  completedIndices.add(currentIndex);
  saveQBProgress(courseId, chapterId, {
    chapterId,
    lastIndex: currentIndex,
    completedIndices: Array.from(completedIndices),
  });
}

export function QuestionBankPractice({
  course,
  chapter,
  items,
  currentIndex,
}: QuestionBankPracticeProps) {
  useNurAgentDockProps(PLATFORM_DOCK_PROPS);
  const item = items[currentIndex];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [writtenSubmitted, setWrittenSubmitted] = useState(false);
  const [fav, setFav] = useState(() => isQBFavorite(item?.id ?? ""));
  const itemGroup = item ? findAssessmentItemWithGroup(course, item.id)?.group : undefined;
  const renderChoices = item && item.choices && item.choices.length > 0
    ? item.choices
    : itemGroup?.sharedChoices ?? null;

  // 换题时重置本地作答态（渲染期派生，避免 effect 级联 setState）
  const [prevItemId, setPrevItemId] = useState(item?.id);
  if (item?.id !== prevItemId) {
    setPrevItemId(item?.id);
    setSelectedIndex(null);
    setDraft("");
    setWrittenSubmitted(false);
    setFav(isQBFavorite(item?.id ?? ""));
  }

  if (!item) {
    return (
      <div className={styles.container}>
        <div className={styles.noChoices}>
          <strong>题目未找到</strong>
          <small>请返回章节列表重新选择。</small>
          <Link href={`/courses/${course.slug}/question-bank/${chapter.slug}`}>
            返回章节
          </Link>
        </div>
      </div>
    );
  }

  const hasChoices = (item.choices && item.choices.length > 0)
    || (itemGroup?.sharedChoices && itemGroup.sharedChoices.length > 0) || false;
  const correctIndex = item.correctChoiceIndex ?? -1;
  const isSubmitted = hasChoices ? selectedIndex !== null : writtenSubmitted;
  const isCorrect = hasChoices && selectedIndex !== null
    ? selectedIndex === correctIndex
    : item.questionKind === "fill" && item.answer.status === "available"
      ? matchQuestionBankFill(item.answer.content, draft)
      : null;
  const total = items.length;
  const attemptStats = getQBAttemptStats(item.id);
  const kp = selectKnowledgePointById(course, item.knowledgePointId);
  const kindLabel = KIND_LABEL[item.questionKind] ?? item.questionKind;
  const referenceLines = item.answer.status === "available" ? item.answer.content : [];

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
    notifyQuizResult(correct);
    markChapterProgress(course.id, chapter.id, currentIndex);
  }

  function handleWrittenSubmit() {
    if (writtenSubmitted || !draft.trim()) {
      return;
    }
    setWrittenSubmitted(true);
    markChapterProgress(course.id, chapter.id, currentIndex);
    const fillAnswerAvailable = item.answer.status === "available";
    if (
      shouldRecordQuestionBankAttempt({
        hasChoices: false,
        questionKind: item.questionKind,
        fillAnswerAvailable,
      })
    ) {
      const correct = item.answer.status === "available"
        ? matchQuestionBankFill(item.answer.content, draft)
        : false;
      addQBAttempt(item.id, {
        questionId: item.id,
        selectedIndex: -1,
        isCorrect: correct,
        attemptedAt: new Date().toISOString(),
      });
      notifyQuizResult(correct);
    }
  }

  function handleToggleFav() {
    const next = toggleQBFavorite(item.id);
    setFav(next);
  }

  function getNavUrl(index: number): string {
    return `/courses/${course.slug}/question-bank/${chapter.slug}/${items[index].id}`;
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
          <span className={styles.kindTag}>{kindLabel}</span>
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

        {hasChoices ? (
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
        ) : (
          <div className={styles.written}>
            <textarea
              className={styles.writtenInput}
              disabled={writtenSubmitted}
              onChange={(event) => setDraft(event.currentTarget.value)}
              placeholder={item.questionKind === "fill" ? "填入答案" : "写下你的作答"}
              rows={item.questionKind === "fill" ? 2 : 6}
              value={draft}
            />
            <button
              className={styles.writtenSubmit}
              disabled={writtenSubmitted || !draft.trim()}
              onClick={handleWrittenSubmit}
              type="button"
            >
              {writtenSubmitted ? "已提交" : "提交后看参考"}
            </button>
          </div>
        )}
      </section>

      {isSubmitted ? (
        <section className={styles.resultSection}>
          <div className={styles.resultRow}>
            {hasChoices ? (
              isCorrect ? (
                <span className={styles.resultCorrect}>✓ 回答正确</span>
              ) : (
                <span className={styles.resultWrong}>
                  ✗ 正确答案：{CHOICE_LABELS[correctIndex]}
                </span>
              )
            ) : item.questionKind === "fill" && isCorrect !== null ? (
              isCorrect ? (
                <span className={styles.resultCorrect}>✓ 与参考一致</span>
              ) : (
                <span className={styles.resultWrong}>与参考不一致</span>
              )
            ) : (
              <span className={styles.resultNote}>对照参考，系统不做对错判定。</span>
            )}
          </div>
          {!hasChoices && referenceLines.length > 0 ? (
            <div className={styles.reference}>
              <strong>参考答案</strong>
              {referenceLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : null}
          {!hasChoices && referenceLines.length === 0 ? (
            <p className={styles.resultNote}>本题尚无收录参考答案。</p>
          ) : null}
          {hasChoices && !isCorrect && correctIndex >= 0 && renderChoices ? (
            <div className={styles.resultRow}>
              <span className={styles.resultNote}>
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
