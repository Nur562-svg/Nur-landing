"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, ScanText, X } from "lucide-react";
import type { LearningAttemptSurface, LearningMemoryState } from "@/types/learning";
import type { FsrsCriterionSummary } from "@/types/nur-agent";
import {
  getBotEmotionServerSnapshot,
  getBotEmotionSnapshot,
  getBotWrongStreak,
  subscribeBotEmotion,
} from "@/lib/bot-emotion";
import { NurAgentFace } from "./nur-agent-face";
import { useNearPointer } from "./use-near-pointer";
import { NurAgentPilot } from "./nur-agent-pilot";
import { NurAgentChat } from "./nur-agent-chat";
import styles from "./nur-agent-dock.module.css";

type TaskContext = {
  version: 1;
  previousRunId: string | null;
  courseId: string;
  courseSlug: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: "subjective-writing" | "case-reasoning";
  taskId: string;
  segmentId: string | null;
  requestRewrite: boolean;
  confirmedHistory: readonly {
    attemptId: string;
    surface: "subjective-writing" | "case-reasoning";
    taskId: string;
    segmentId: string | null;
    confirmedText: string;
  }[];
  privateRef?: "nur-qwen-private-ref" | null;
} | null;

type NurAgentDockProps = {
  surface: LearningAttemptSurface | "knowledge-point" | "platform";
  state?: LearningMemoryState;
  courseId?: string;
  courseSlug?: string;
  courseVersionId?: string;
  offeringId?: string;
  knowledgePointId?: string;
  taskId?: string;
  segmentId?: string | null;
  currentText?: string;
  selfCheckStarted?: boolean;
  privateRef?: "nur-qwen-private-ref" | null;
  onApplyRewrite?: (rewrittenText: string, criterionId: string) => void;
};

type TabId = "chat" | "analysis";

export function askNurAgent(text: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent("nur-learn:ask-agent", { detail: { text } }));
}

export {
  notifyQuizResult,
  setBotEmotion,
  resetBotWrongStreak,
  getBotWrongStreak,
  type BotEmotion,
} from "@/lib/bot-emotion";

export function NurAgentDock(props: NurAgentDockProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("chat");
  const [seedText, setSeedText] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const emotion = useSyncExternalStore(
    subscribeBotEmotion,
    getBotEmotionSnapshot,
    getBotEmotionServerSnapshot,
  );
  const [fabRef, pointer] = useNearPointer<HTMLButtonElement>({
    radius: 320,
    fullAt: 100,
  });
  const { surface } = props;
  const isKnowledgePoint = surface === "knowledge-point";
  const isPlatform = surface === "platform";

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ text?: string }>).detail;
      if (typeof detail?.text === "string" && detail.text.trim()) {
        setSeedText(detail.text);
      }
      setOpen(true);
      setTab("chat");
    };
    window.addEventListener("nur-learn:ask-agent", handler);
    return () => window.removeEventListener("nur-learn:ask-agent", handler);
  }, []);

  const fsrsState = props.state?.fsrsState ?? null;
  const fsrsSummary = useMemo<readonly FsrsCriterionSummary[] | null>(() => {
    if (!fsrsState) return null;
    return Object.entries(fsrsState.criteria).map(([memoryCriterionId, cs]) => ({
      memoryCriterionId,
      state: cs.state,
      difficulty: cs.difficulty,
      stability: cs.stability,
      reps: cs.reps,
      lapses: cs.lapses,
      lastReviewAt: cs.lastReviewAt,
    }));
  }, [fsrsState]);

  const taskContext = useMemo<TaskContext>(() => {
    if (isKnowledgePoint || !props.state || !props.courseId || !props.courseSlug ||
        !props.courseVersionId || !props.offeringId || !props.knowledgePointId ||
        !props.taskId) {
      return null;
    }
    const confirmedHistory = [...props.state.attempts]
      .filter((attempt) => (
        attempt.courseId === props.courseId &&
        attempt.knowledgePointId === props.knowledgePointId
      ))
      .sort((left, right) => Date.parse(right.confirmedAt) - Date.parse(left.confirmedAt))
      .slice(0, 8)
      .map((attempt) => ({
        attemptId: attempt.id,
        surface: attempt.surface,
        taskId: attempt.taskId,
        segmentId: attempt.segmentId,
        confirmedText: attempt.confirmedText.slice(0, 4000),
      }));
    return {
      version: 1,
      previousRunId: null,
      courseId: props.courseId,
      courseSlug: props.courseSlug,
      courseVersionId: props.courseVersionId,
      offeringId: props.offeringId,
      knowledgePointId: props.knowledgePointId,
      surface: props.surface as LearningAttemptSurface,
      taskId: props.taskId,
      segmentId: props.segmentId ?? null,
      requestRewrite: true,
      confirmedHistory,
      privateRef: props.privateRef ?? null,
    };
  }, [isKnowledgePoint, props.state, props.courseId, props.courseSlug,
      props.courseVersionId, props.offeringId, props.knowledgePointId,
      props.taskId, props.segmentId, props.privateRef, props.surface]);

  const surfaceLabel = isPlatform
    ? "平台"
    : isKnowledgePoint
      ? "知识点"
      : surface === "subjective-writing"
        ? "写作室"
        : "推理室";

  const hasDraft = Boolean((seedText ?? props.currentText)?.trim());

  if (!mounted) {
    return null;
  }

  const lookX = pointer.near ? pointer.x : 0;
  const lookY = pointer.near ? pointer.y : 0;

  return createPortal(
    <>
      <button
        ref={fabRef}
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label={`打开 NUR Agent（当前表情：${emotion}）`}
        type="button"
        data-open={open}
        data-emotion={emotion}
        data-over={pointer.over ? "true" : undefined}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
      >
        <NurAgentFace
          emotion={emotion}
          wrongStreak={getBotWrongStreak()}
          lookX={lookX}
          lookY={lookY}
          pressed={pressed}
        />
      </button>
      {open ? (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <aside
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="NUR Agent"
          >
            <header className={styles.header}>
              <div className={styles.headerLeft}>
                <span className={styles.headerOrb} aria-hidden="true">
                  <NurAgentFace emotion={emotion} size={28} />
                </span>
                <h3>NUR Agent</h3>
                <span className={styles.surfaceLabel}>{surfaceLabel}</span>
                {emotion === "thinking" ? (
                  <span className={styles.thinkingLabel}>思考中</span>
                ) : null}
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setOpen(false)}
                aria-label="关闭"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </header>
            {!isKnowledgePoint && !isPlatform ? (
              <div className={styles.tabBar}>
                <button
                  type="button"
                  className={tab === "chat" ? styles.tabActive : styles.tab}
                  onClick={() => setTab("chat")}
                >
                  <MessageSquare size={15} strokeWidth={1.5} />
                  对话
                </button>
                <button
                  type="button"
                  className={tab === "analysis" ? styles.tabActive : styles.tab}
                  onClick={() => setTab("analysis")}
                >
                  <ScanText size={15} strokeWidth={1.5} />
                  结构分析
                  {hasDraft ? <span className={styles.tabBadge} aria-label="有草稿可分析" /> : null}
                </button>
              </div>
            ) : null}
            <div className={styles.content}>
              {isKnowledgePoint || isPlatform ? (
                <NurAgentChat
                  courseSlug={isPlatform ? null : (props.courseSlug ?? null)}
                  knowledgePointId={isPlatform ? null : (props.knowledgePointId ?? null)}
                  fsrsSummary={isPlatform ? null : fsrsSummary}
                  currentText={seedText ?? props.currentText ?? null}
                  taskContext={null}
                />
              ) : tab === "chat" ? (
                <NurAgentChat
                  courseSlug={props.courseSlug ?? ""}
                  knowledgePointId={props.knowledgePointId ?? ""}
                  fsrsSummary={fsrsSummary}
                  currentText={seedText ?? props.currentText ?? null}
                  taskContext={taskContext}
                />
              ) : (
                <NurAgentPilot
                  state={props.state!}
                  courseId={props.courseId!}
                  courseSlug={props.courseSlug!}
                  courseVersionId={props.courseVersionId!}
                  offeringId={props.offeringId!}
                  knowledgePointId={props.knowledgePointId!}
                  surface={props.surface as LearningAttemptSurface}
                  taskId={props.taskId!}
                  segmentId={props.segmentId!}
                  currentText={props.currentText!}
                  selfCheckStarted={props.selfCheckStarted!}
                  privateRef={props.privateRef}
                  onApplyRewrite={props.onApplyRewrite}
                />
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>,
    document.body,
  );
}
