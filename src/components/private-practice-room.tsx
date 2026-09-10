"use client";

import { useMemo, useState } from "react";
import type { PrivateMaterialLearningQuestion } from "@/types/course-builder";
import {
  privateJudgementLabel,
  privateQuestionChoices,
  scorePrivateChoice,
  scorePrivateFill,
  type PrivateObjectiveScore,
} from "@/lib/private-practice";
import styles from "./private-practice-room.module.css";

type PrivatePracticeRoomProps = {
  questions: readonly PrivateMaterialLearningQuestion[];
};

type QuestionState = {
  selectedIndex: number | null;
  draft: string;
  revealed: boolean;
  score: PrivateObjectiveScore | null;
};

const kindLabels: Record<PrivateMaterialLearningQuestion["questionKind"], string> = {
  "a1-single": "单选",
  fill: "填空",
  "short-answer": "简答",
  "term-explanation": "名词解释",
  "other-subjective": "主观题",
};

function emptyState(): QuestionState {
  return { selectedIndex: null, draft: "", revealed: false, score: null };
}

export function PrivatePracticeRoom({ questions }: PrivatePracticeRoomProps) {
  const [states, setStates] = useState<Record<string, QuestionState>>({});

  const progress = useMemo(() => {
    const revealed = questions.filter((question) => states[question.id]?.revealed).length;
    return { revealed, total: questions.length };
  }, [questions, states]);

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

  return (
    <section className={styles.room} aria-labelledby="private-practice-title">
      <header className={styles.header}>
        <p className={styles.kicker}>PRIVATE PRACTICE</p>
        <h2 id="private-practice-title">导入练习</h2>
        <p className={styles.meta}>
          已对照 {progress.revealed} / {progress.total}。单选和填空可参考判定；简答只对照参考答案。判定不是教师评分。
        </p>
      </header>
      <ol className={styles.list}>
        {questions.map((question, index) => {
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
                  disabled={state.revealed}
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
                  {question.questionKind === "short-answer" || question.questionKind === "term-explanation" || question.questionKind === "other-subjective"
                    ? "对照参考答案"
                    : "提交判定"}
                </button>
                <button
                  onClick={() => update(question.id, emptyState())}
                  type="button"
                >
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
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
