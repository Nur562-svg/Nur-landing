"use client";

import { useEffect, useState } from "react";

import { consumeClewSse, readClewFailure } from "@/lib/clew/client-api";
import { CLEW_LESSON_STYLE_LABELS, isClewLessonStyle } from "@/lib/clew/lesson-heuristic";
import { isClewLessonVariant, type ClewLessonVariant } from "@/lib/clew/lesson-variants";
import type { ClewLessonEvent, ClewLessonStyle, ClewLessonView } from "@/types/clew";
import {
  LESSON_STYLE_STORAGE_KEY,
  LESSON_VARIANT_STORAGE_KEY,
  readStoredValue,
  writeStoredValue,
} from "@/lib/clew/study-preferences";

/**
 * 讲义生成行为 hook（设计评审 P1-B 第二刀：从 clew-study.tsx 纯搬移，行为不变）。
 * 拥有：讲义状态/流式消费/风格与视图偏好（localStorage）/重生成确认态。
 * 依赖注入：knowledgePointId/Title（路由与进度文案）、initialLesson（挂载初值 + 风格跟随）、
 * onLessonReady（「学」环节完成 → 脊柱与会话；父级负责）、onGenerationStart（生成开始时父级
 * 需要做的清理，如清自测提示；可选）。
 */
export function useStudyLesson(options: {
  knowledgePointId: string;
  knowledgePointTitle: string;
  initialLesson: ClewLessonView | null;
  onLessonReady: () => void;
  onGenerationStart?: () => void;
}) {
  const { knowledgePointId, knowledgePointTitle, initialLesson, onLessonReady, onGenerationStart } = options;

  const [lesson, setLesson] = useState<ClewLessonView | null>(initialLesson);
  const [lessonDraft, setLessonDraft] = useState("");
  const [lessonLog, setLessonLog] = useState<string[]>([]);
  const [lessonNotes, setLessonNotes] = useState<string[]>([]);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [confirmingRegenerate, setConfirmingRegenerate] = useState(false);
  /** 生成讲义时发送的讲解风格（默认跟随本机最近选择；服务端保存为账户默认）。 */
  const [lessonStyle, setLessonStyle] = useState<ClewLessonStyle>("zh-primary");
  // ZCODE-M4 Phase 1：讲义三视图（首渲染默认值避免 hydration mismatch，挂载后读实际值）
  const [lessonVariant, setLessonVariant] = useState<ClewLessonVariant>("full");

  // 讲解风格偏好：本机记住上次选择；没有记录时跟随当前讲义（都没有则 zh-primary）
  useEffect(() => {
    try {
      const stored = readStoredValue(LESSON_STYLE_STORAGE_KEY);
      if (stored && isClewLessonStyle(stored)) {
        setLessonStyle(stored);
      } else if (initialLesson) {
        setLessonStyle(initialLesson.style);
      }
    } catch {
      // localStorage 不可用时保持默认
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialLesson 仅挂载取一次风格
  }, []);

  // 讲义视图偏好：本机记住上次选择（派生零请求；localStorage 不可用时保持初学）
  useEffect(() => {
    try {
      const stored = readStoredValue(LESSON_VARIANT_STORAGE_KEY);
      if (isClewLessonVariant(stored)) {
        setLessonVariant(stored);
      }
    } catch {
      // localStorage 不可用时保持默认 full
    }
  }, []);

  function onSelectLessonStyle(next: string): void {
    if (!isClewLessonStyle(next)) {
      return;
    }
    setLessonStyle(next);
    try {
      writeStoredValue(LESSON_STYLE_STORAGE_KEY, next);
    } catch {
      // 持久化失败不影响本次选择
    }
  }

  function onSwitchLessonVariant(variant: ClewLessonVariant): void {
    setLessonVariant(variant);
    try {
      writeStoredValue(LESSON_VARIANT_STORAGE_KEY, variant);
    } catch {
      // 持久化失败不影响本次切换
    }
  }

  async function onGenerateLesson() {
    if (generating) {
      return;
    }
    setConfirmingRegenerate(false);
    setGenerating(true);
    setLessonError(null);
    setLessonNotes([]);
    setLessonLog([`开始为「${knowledgePointTitle}」生成讲义（风格：${CLEW_LESSON_STYLE_LABELS[lessonStyle]}）…`]);
    setLessonDraft("");
    onGenerationStart?.();

    try {
      const response = await fetch(`/api/clew/kp/${knowledgePointId}/lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style: lessonStyle }),
      });
      if (!response.ok || !response.body) {
        let message = "讲义生成失败：服务暂时不可用，请稍后重试。";
        try {
          message = readClewFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setLessonError(message);
        setLessonDraft("");
        return;
      }
      await consumeClewSse(response, (raw) => {
        const event = raw as ClewLessonEvent;
        if (event.type === "progress") {
          setLessonLog((log) => [...log, event.message]);
        } else if (event.type === "delta") {
          setLessonDraft((draft) => draft + event.text);
        } else if (event.type === "result") {
          setLesson(event.lesson);
          setLessonNotes(event.notes);
          setLessonDraft("");
          onLessonReady();
        } else {
          setLessonError(event.error);
          setLessonDraft("");
        }
      });
    } catch {
      setLessonError("讲义生成失败：网络或服务暂时不可用，请稍后重试。");
      setLessonDraft("");
    } finally {
      setGenerating(false);
    }
  }

  return {
    lesson,
    setLesson,
    lessonDraft,
    lessonLog,
    lessonNotes,
    lessonError,
    generating,
    confirmingRegenerate,
    setConfirmingRegenerate,
    lessonStyle,
    onSelectLessonStyle,
    lessonVariant,
    onSwitchLessonVariant,
    onGenerateLesson,
  };
}
