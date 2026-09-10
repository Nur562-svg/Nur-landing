"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  PrivateMaterialAnalysisResult,
  PrivateMaterialLearningQuestion,
} from "@/types/course-builder";
import {
  proposeReviewTaskForAttempt,
  recordConfirmedAttempt,
} from "@/lib/learning-memory";
import {
  privateJudgementLabel,
  privateQuestionChoices,
  scorePrivateChoice,
  scorePrivateFill,
  type PrivateObjectiveScore,
} from "@/lib/private-practice";
import {
  buildPrivateConfirmedAttemptInput,
  privateAttemptText,
  privatePracticeStorageKey,
} from "@/lib/private-practice-memory";
import styles from "./private-practice-room.module.css";

type PrivatePracticeRoomProps = {
  analysisResult: PrivateMaterialAnalysisResult;
};

type QuestionState = {
  selectedIndex: number | null;
  draft: string;
  revealed: boolean;
  score: PrivateObjectiveScore | null;
  favorite: boolean;
  confirmedAt: string | null;
};

const kindLabels: Record<PrivateMaterialLearningQuestion["questionKind"], string> = {
  "a1-single": "单选",
  fill: "填空",
  "short-answer": "简答",
  "term-explanation": "名词解释",
  "other-subjective": "主观题",
};

function emptyState(): QuestionState {
  return {
    selectedIndex: null,
    draft: "",
    revealed: false,
    score: null,
    favorite: false,
    confirmedAt: null,
  };
}

function isStoredState(value: unknown): value is Record<string, QuestionState> {
  return typeof value === "object" && value !== null;
}

export function PrivatePracticeRoom({ analysisResult }: PrivatePracticeRoomProps) {
  const questions = analysisResult.learningUnit.questions;
  const storageKey = privatePracticeStorageKey(analysisResult);
  const [states, setStates] = useState<Record<string, QuestionState>>({});
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      if (isStoredState(parsed)) {
        setStates(parsed);
      }
    } catch {
      window.sessionStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    window.sessionStorage.setItem(storageKey, JSON.stringify(states));
  }, [hydrated, states, storageKey]);

  const progress = useMemo(() => {
    const revealed = questions.filter((question) => states[question.id]?.revealed).length;
    const confirmed = questions.filter((question) => states[question.id]?.confirmedAt).length;
    const favorites = questions.filter((question) => states[question.id]?.favorite).length;
    return { revealed, confirmed, favorites, total: questions.length };
  }, [questions, states]);

  const visibleQuestions = useMemo(() => {
    if (!favoritesOnly) {
      return questions;
    }
    return questions.filter((question) => states[question.id]?.favorite);
  }, [favoritesOnly, questions, states]);

  function update(id: string, patch: Partial<QuestionState>) {
    setStates((current) => ({
      ...current,
      [id]: { ...emptyState(), ...current[id], ...patch },
    }));
  }

  function submit(question: PrivateMaterialLearningQuestion) {
    const current = states[question.id] ?? emptyState();
    if (question.questionKind === "a1-single") {
      if (current.selectedIndex === null) {
        return;
      }
      update(question.id, {
        revealed: true,
        score: scorePrivateChoice(question, current.selectedIndex),
        draft: privateAttemptText({
          question,
          draft: current.draft,
          selectedIndex: current.selectedIndex,
        }),
      });
      return;
    }
    if (question.questionKind === "fill") {
      update(question.id, {
        revealed: true,
        score: scorePrivateFill(question, current.draft),
      });
      return;
    }
    update(question.id, { revealed: true, score: null });
  }

  function confirm(question: PrivateMaterialLearningQuestion) {
    const current = states[question.id] ?? emptyState();
    const text = privateAttemptText({
      question,
      draft: current.draft,
      selectedIndex: current.selectedIndex,
    });
    if (!text) {
      setNotice("请先作答再确认保存。");
      return;
    }
    try {
      const input = buildPrivateConfirmedAttemptInput({
        question,
        unit: analysisResult.learningUnit,
        analysisId: analysisResult.analysisId,
        confirmedText: text,
        objectiveCorrect: current.score?.correct ?? null,
      });
      const attempt = recordConfirmedAttempt(input);
      proposeReviewTaskForAttempt(
        attempt,
        input.criterionResults.map((criterion) => criterion.memoryCriterionId),
      );
      update(question.id, { confirmedAt: attempt.confirmedAt, draft: text });
      setNotice("已保存到本浏览器学习记忆，并生成复习提案。");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "确认保存失败");
    }
  }

  function redo(questionId: string) {
    update(questionId, emptyState());
  }

  if (!hydrated) {
    return <p className={styles.meta}>正在恢复本会话练习状态…</p>;
  }

  return (
    <section className={styles.room} aria-labelledby="private-practice-title">
      <header className={styles.header}>
        <p className={styles.kicker}>PRIVATE PRACTICE</p>
        <h2 id="private-practice-title">导入练习</h2>
        <p className={styles.meta}>
          已对照 {progress.revealed} / {progress.total} · 已确认 {progress.confirmed} · 收藏 {progress.favorites}。
          单选和填空可参考判定；简答只对照参考答案。判定不是教师评分。
        </p>
        <div className={styles.filter}>
          <button
            aria-pressed={!favoritesOnly}
            onClick={() => setFavoritesOnly(false)}
            type="button"
          >
            全部
          </button>
          <button
            aria-pressed={favoritesOnly}
            onClick={() => setFavoritesOnly(true)}
            type="button"
          >
            ★ 已收藏
          </button>
        </div>
        {notice ? <p className={styles.notice} aria-live="polite">{notice}</p> : null}
      </header>
      <ol className={styles.list}>
        {visibleQuestions.length === 0 ? (
          <li className={styles.item}>
            <p className={styles.meta}>没有收藏题目。切换到「全部」继续练习。</p>
          </li>
        ) : null}
        {visibleQuestions.map((question) => {
          const index = questions.findIndex((item) => item.id === question.id);
          const state = states[question.id] ?? emptyState();
          const choices = privateQuestionChoices(question);
          return (
            <li className={styles.item} key={question.id}>
              <header className={styles.itemHeader}>
                <span>{String(index + 1).padStart(2, "0")} · {kindLabels[question.questionKind]}</span>
                <small>{question.sourceLocators.map((locator) => locator.label).join(" · ")}</small>
              </header>
              <h3 className={styles.prompt}>{question.normalizedPrompt}</h3>

              {question.questionKind === "a1-single" ? (
                <div className={styles.choices} role="radiogroup" aria-label={`第 ${index + 1} 题选项`}>
                  {choices.map((choice, choiceIndex) => (
                    <label className={styles.choice} key={`${question.id}-${choiceIndex}`}>
                      <input
                        checked={state.selectedIndex === choiceIndex}
                        disabled={state.revealed}
                        name={question.id}
                        onChange={() => update(question.id, { selectedIndex: choiceIndex })}
                        type="radio"
                      />
                      <span>{String.fromCharCode(65 + choiceIndex)}. {choice}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  className={styles.draft}
                  disabled={state.revealed && question.questionKind === "fill"}
                  onChange={(event) => update(question.id, { draft: event.target.value })}
                  placeholder={question.questionKind === "fill" ? "填入答案" : "写下你的作答"}
                  rows={question.questionKind === "fill" ? 2 : 4}
                  value={state.draft}
                />
              )}

              <div className={styles.actions}>
                <button
                  disabled={state.revealed || (question.questionKind === "a1-single" && state.selectedIndex === null)}
                  onClick={() => submit(question)}
                  type="button"
                >
                  {question.questionKind === "short-answer"
                    || question.questionKind === "term-explanation"
                    || question.questionKind === "other-subjective"
                    ? "对照参考答案"
                    : "提交判定"}
                </button>
                <button
                  disabled={!state.revealed || !!state.confirmedAt || !privateAttemptText({
                    question,
                    draft: state.draft,
                    selectedIndex: state.selectedIndex,
                  })}
                  onClick={() => confirm(question)}
                  type="button"
                >
                  {state.confirmedAt ? "已保存" : "确认保存到学习记忆"}
                </button>
                <button
                  onClick={() => update(question.id, { favorite: !state.favorite })}
                  type="button"
                >
                  {state.favorite ? "★ 已收藏" : "☆ 收藏"}
                </button>
                <button onClick={() => redo(question.id)} type="button">
                  重做
                </button>
              </div>

              {state.revealed ? (
                <div className={styles.reveal}>
                  {state.score?.judged ? (
                    <p className={state.score.correct ? styles.pass : styles.fail}>
                      {state.score.correct ? "参考判定：正确" : "参考判定：不正确"}
                      <small> · {privateJudgementLabel(state.score.basis)}</small>
                    </p>
                  ) : (
                    <p className={styles.note}>{question.generatedReferenceAnswer.label}</p>
                  )}
                  <p className={styles.answer}>{question.generatedReferenceAnswer.variants.exam}</p>
                  {question.generatedReferenceAnswer.structurePoints.length > 0 ? (
                    <ul>
                      {question.generatedReferenceAnswer.structurePoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                  <small>{question.generatedReferenceAnswer.uncertaintyNote}</small>
                  {state.confirmedAt ? (
                    <p className={styles.note}>已确认 · {new Date(state.confirmedAt).toLocaleString("zh-CN")}</p>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
