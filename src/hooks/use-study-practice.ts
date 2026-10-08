"use client";

import { useState } from "react";

import { consumeClewSse, readClewFailure } from "@/lib/clew/client-api";
import type { ClewPracticeEvent, ClewPracticeQuestionView, ClewPracticeSetView } from "@/types/clew";

/**
 * 自教材练习行为 hook（设计评审 P1-B 第三刀：从 clew-study.tsx 纯搬移，行为不变）。
 * 拥有：题组/生成/作答/只练错题过滤/揭示态；深度与标准档的确认流由视图层控制
 * （confirmingRegenerate 留在视图层——它只驱动按钮区渲染）。
 * 依赖注入：knowledgePointId（生成路由）、initialPractice（服务端注入题组）。
 */
export function useStudyPractice(options: {
  knowledgePointId: string;
  knowledgePointTitle: string;
  initialPractice: ClewPracticeSetView;
}) {
  const { knowledgePointId, knowledgePointTitle, initialPractice } = options;

  const [practiceSet, setPracticeSet] = useState<ClewPracticeSetView>(initialPractice);
  const [practiceGenerating, setPracticeGenerating] = useState(false);
  const [practiceLog, setPracticeLog] = useState<string[]>([]);
  const [practiceNotes, setPracticeNotes] = useState<string[]>([]);
  const [practiceError, setPracticeError] = useState<string | null>(null);
  const [practiceWrongOnly, setPracticeWrongOnly] = useState(false);
  const [practiceRevealed, setPracticeRevealed] = useState<Record<string, boolean>>({});
  const [practiceAttemptBusy, setPracticeAttemptBusy] = useState<string | null>(null);
  const [practiceNote, setPracticeNote] = useState<string | null>(null);

  async function onGeneratePractice(intensity: "standard" | "deep"): Promise<void> {
    if (practiceGenerating) {
      return;
    }
    setPracticeGenerating(true);
    setPracticeError(null);
    setPracticeNotes([]);
    setPracticeNote(null);
    setPracticeLog([
      `开始为「${knowledgePointTitle}」生成练习题（${intensity === "deep" ? "深度思考 · 计 2 次额度" : "标准档 · 计 1 次额度"}）…`,
    ]);

    try {
      const response = await fetch(`/api/clew/kp/${knowledgePointId}/practice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intensity }),
      });
      if (!response.ok || !response.body) {
        let message = "练习生成失败：服务暂时不可用，请稍后重试。";
        try {
          message = readClewFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setPracticeError(message);
        return;
      }
      await consumeClewSse(response, (raw) => {
        const event = raw as ClewPracticeEvent;
        if (event.type === "progress") {
          setPracticeLog((log) => [...log, event.message]);
        } else if (event.type === "result") {
          setPracticeSet(event.set);
          setPracticeNotes(event.notes);
          setPracticeLog([]);
          setPracticeWrongOnly(false);
        } else {
          setPracticeError(event.error);
        }
      });
    } catch {
      setPracticeError("练习生成失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setPracticeGenerating(false);
    }
  }

  async function onPracticeAttempt(
    question: ClewPracticeQuestionView,
    payload: { selectedIndex: number } | { selfRating: "correct" | "wrong" },
  ): Promise<void> {
    if (practiceAttemptBusy) {
      return;
    }
    setPracticeAttemptBusy(question.id);
    setPracticeNote(null);
    try {
      const response = await fetch(`/api/clew/practice/${question.id}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const payloadJson = (await response.json()) as {
        ok?: boolean;
        attempt?: {
          isCorrect: boolean;
          correctIndex: number | null;
          answerText: string | null;
          explanation: string;
          review: string;
        };
        error?: string;
      };
      if (!response.ok || !payloadJson.ok || !payloadJson.attempt) {
        setPracticeNote(payloadJson.error ?? "作答暂时未能提交（网络或服务问题），请稍后重试。");
        return;
      }
      const a = payloadJson.attempt;
      const attemptedAt = new Date().toISOString();
      setPracticeSet((current) => {
        const questions = current.questions.map((q) =>
          q.id === question.id
            ? {
                ...q,
                myAttempt: {
                  isCorrect: a.isCorrect,
                  selectedIndex: "selectedIndex" in payload ? payload.selectedIndex : null,
                  selfRating: "selfRating" in payload ? payload.selfRating : null,
                  correctIndex: a.correctIndex,
                  explanation: a.explanation,
                  attemptedAt,
                },
              }
            : q,
        );
        const answered = questions.filter((q) => q.myAttempt !== null);
        return {
          ...current,
          questions,
          summary: {
            total: questions.length,
            answered: answered.length,
            correct: answered.filter((q) => q.myAttempt?.isCorrect).length,
            wrong: answered.filter((q) => q.myAttempt && !q.myAttempt.isCorrect).length,
          },
        };
      });
      setPracticeNote(
        a.review === "created"
          ? "已记入复习调度（今日到期）——可在「我的学习 · 今日复习」回流。"
          : a.review === "advanced"
            ? a.isCorrect
              ? "已按「记住了」巩固，复习安排顺延。"
              : "已按「再来一次」前移遗忘曲线。"
            : null,
      );
    } catch {
      setPracticeNote("作答暂时未能提交（网络问题），请稍后重试。");
    } finally {
      setPracticeAttemptBusy(null);
    }
  }

  return {
    practiceSet,
    setPracticeSet,
    practiceGenerating,
    practiceLog,
    setPracticeLog,
    practiceNotes,
    practiceError,
    practiceWrongOnly,
    setPracticeWrongOnly,
    practiceRevealed,
    setPracticeRevealed,
    practiceAttemptBusy,
    practiceNote,
    onGeneratePractice,
    onPracticeAttempt,
  };
}
