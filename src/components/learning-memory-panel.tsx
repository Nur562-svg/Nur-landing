"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  History,
  Lightbulb,
  RotateCcw,
  Settings2,
} from "lucide-react";
import {
  acceptReviewTask,
  computeFsrsInterval,
  declineReviewTask,
  handleHistoryAssistanceSuggestion,
  selectCurrentReviewTask,
  selectLatestConfirmedAttempt,
  selectMissingAssistanceRules,
  selectRepeatedOmissions,
  updateLearningAssistancePreference,
} from "@/lib/learning-memory";
import type {
  LearningAttemptSurface,
  LearningMemoryState,
  KnowledgePointDefinition,
  StructuralAssistanceRule,
} from "@/types/learning";
import styles from "./learning-memory-panel.module.css";

type CriterionLabel = {
  id: string;
  label: string;
  detail: string;
};

type CurrentAnswerAssistanceProps = {
  text: string;
  suggestedCharacters: number;
  selfCheckStarted: boolean;
  rules: readonly StructuralAssistanceRule[];
  criterionLabels: readonly CriterionLabel[];
  state: LearningMemoryState;
};

type LearningMemoryPanelProps = {
  state: LearningMemoryState;
  courseId: string;
  knowledgePoint: KnowledgePointDefinition;
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
  writingHref: string | null;
  caseHref: string | null;
};

const surfaceLabels: Readonly<Record<LearningAttemptSurface, string>> = {
  "subjective-writing": "主观题完整表达",
  "case-reasoning": "案例推理与修复",
};

function formatReviewTime(value: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function preferenceLabel(enabled: boolean): string {
  return enabled ? "已开启" : "已关闭";
}

export function CurrentAnswerAssistance({
  text,
  suggestedCharacters,
  selfCheckStarted,
  rules,
  criterionLabels,
  state,
}: CurrentAnswerAssistanceProps) {
  const [expandedRuleIds, setExpandedRuleIds] = useState<readonly string[]>([]);
  const preferences = state.preferences;
  const visible = preferences.currentAnswerEnabled
    && (text.trim().length >= suggestedCharacters || selfCheckStarted);
  const missingRules = useMemo(
    () => selectMissingAssistanceRules(text, rules),
    [rules, text],
  );

  if (!visible) {
    return null;
  }

  function toggleCorrection(ruleId: string) {
    setExpandedRuleIds((current) => current.includes(ruleId)
      ? current.filter((item) => item !== ruleId)
      : [...current, ruleId]);
  }

  return (
    <section className={styles.currentAssistance} aria-live="polite">
      <div className={styles.memoryHeading}>
        <Brain aria-hidden="true" size={18} strokeWidth={1.5} />
        <div><small>A · CURRENT ANSWER</small><h3>当前作答辅助</h3></div>
        <span>{selfCheckStarted ? "完整核对" : "实时更新"}</span>
      </div>
      <p className={styles.assistanceBoundary}>只按已声明的结构词提示遗漏，不判断医学内容正误，也不代表教师评分。</p>
      {missingRules.length > 0 ? (
        <div className={styles.missingRuleList}>
          {missingRules.map((rule) => {
            const criterion = criterionLabels.find((item) => item.id === rule.criterionId);
            const expanded = expandedRuleIds.includes(rule.criterionId);
            return (
              <article key={rule.criterionId}>
                <div>
                  <span>待补结构</span>
                  <strong>{criterion?.label ?? rule.criterionId}</strong>
                  <p>{criterion?.detail ?? rule.nextStepPrompt}</p>
                  {preferences.nextStepPromptEnabled ? <small>{rule.nextStepPrompt}</small> : null}
                </div>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => toggleCorrection(rule.criterionId)}
                >
                  改正 <ChevronDown aria-hidden="true" size={14} />
                </button>
                {expanded ? (
                  <blockquote>
                    <b>NUR 可替换句</b>
                    <p>{rule.rewriteSuggestion}</p>
                  </blockquote>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.structureClear}>
          <Check aria-hidden="true" size={17} />
          <p>结构词检测暂未发现遗漏；仍请逐项核对事实、论证和实际文字。</p>
        </div>
      )}
    </section>
  );
}

export function LearningMemoryPanel({
  state,
  courseId,
  knowledgePoint,
  surface,
  taskId,
  segmentId,
  writingHref,
  caseHref,
}: LearningMemoryPanelProps) {
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const preferences = state.preferences;
  const latestAttempt = selectLatestConfirmedAttempt(state, {
    courseId,
    knowledgePointId: knowledgePoint.id,
    surface,
    taskId,
    segmentId,
  });
  const reviewTask = selectCurrentReviewTask(state, courseId, knowledgePoint.id);
  const repeatedOmissions = selectRepeatedOmissions(
    state.attempts,
    courseId,
    knowledgePoint.id,
  );
  const memoryCriteriaById = new Map(
    knowledgePoint.learningMemoryCriteria.map((criterion) => [criterion.id, criterion]),
  );
  const completedTask = [...state.reviewTasks]
    .filter((task) => (
      task.courseId === courseId
      && task.knowledgePointId === knowledgePoint.id
      && task.status === "completed"
    ))
    .sort((left, right) => Date.parse(right.completedAt ?? "") - Date.parse(left.completedAt ?? ""))[0] ?? null;
  const knowledgePointAttempts = state.attempts.filter((attempt) => (
    attempt.courseId === courseId && attempt.knowledgePointId === knowledgePoint.id
  ));
  const showHistorySuggestion = knowledgePointAttempts.length > 0
    && !preferences.confirmedHistoryEnabled
    && !preferences.historySuggestionHandled;

  const latestMissingIds = latestAttempt
    ? [...new Set(latestAttempt.criterionResults
      .filter((result) => result.status === "missing")
      .map((result) => result.memoryCriterionId))]
    : [];
  const targetSurfaces = reviewTask
    ? [...new Set(reviewTask.returnTargets.map((target) => target.surface))]
    : [];
  const proposedIntervalDays = reviewTask?.status === "proposed" && reviewTask.criterionIds.length > 0
    ? Math.min(...reviewTask.criterionIds.map((id) => computeFsrsInterval(id, state.fsrsState)))
    : 2;
  const acceptedIntervalDays = reviewTask?.status === "accepted"
    && reviewTask.acceptedAt
    && reviewTask.dueAt
    ? Math.max(1, Math.round(
        (Date.parse(reviewTask.dueAt) - Date.parse(reviewTask.acceptedAt))
        / (24 * 60 * 60 * 1000),
      ))
    : null;

  return (
    <div className={styles.panelStack}>
      {showHistorySuggestion ? (
        <section className={styles.historySuggestion} aria-label="开启确认历史辅助建议">
          <div><History aria-hidden="true" size={18} /><strong>已保存第一份确认作答</strong></div>
          <p>要开启 B，让以后作答时回看这份学生原文与缺失关联吗？</p>
          <div>
            <button type="button" onClick={() => handleHistoryAssistanceSuggestion(true)}>开启 B</button>
            <button type="button" onClick={() => handleHistoryAssistanceSuggestion(false)}>暂不开启</button>
          </div>
        </section>
      ) : null}

      <section className={styles.settingsCard}>
        <div className={styles.memoryHeading}>
          <Settings2 aria-hidden="true" size={18} strokeWidth={1.5} />
          <div><small>GLOBAL PREFERENCES</small><h3>学习辅助</h3></div>
        </div>
        <div className={styles.preferenceList}>
          <button
            type="button"
            role="switch"
            aria-checked={preferences.currentAnswerEnabled}
            onClick={() => updateLearningAssistancePreference(
              "currentAnswerEnabled",
              !preferences.currentAnswerEnabled,
            )}
          >
            <span><b>A</b><strong>当前作答</strong><small>达到建议字数后提示结构遗漏</small></span>
            <em>{preferenceLabel(preferences.currentAnswerEnabled)}</em>
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={preferences.confirmedHistoryEnabled}
            onClick={() => updateLearningAssistancePreference(
              "confirmedHistoryEnabled",
              !preferences.confirmedHistoryEnabled,
            )}
          >
            <span><b>B</b><strong>确认历史</strong><small>只回看自核后主动保存的版本</small></span>
            <em>{preferenceLabel(preferences.confirmedHistoryEnabled)}</em>
          </button>
          <button
            className={styles.subPreference}
            type="button"
            role="switch"
            aria-checked={preferences.nextStepPromptEnabled}
            disabled={!preferences.currentAnswerEnabled}
            onClick={() => updateLearningAssistancePreference(
              "nextStepPromptEnabled",
              !preferences.nextStepPromptEnabled,
            )}
          >
            <span><Lightbulb aria-hidden="true" size={15} /><strong>A 的下一步提示</strong></span>
            <em>{preferenceLabel(preferences.nextStepPromptEnabled)}</em>
          </button>
        </div>
        <p>A、B 可独立或同时开启；当前本地验证版没有付费墙。</p>
      </section>

      <section className={styles.historyCard}>
        <div className={styles.memoryHeading}>
          <History aria-hidden="true" size={18} strokeWidth={1.5} />
          <div><small>B · CONFIRMED HISTORY</small><h3>确认作答回看</h3></div>
          <span>{surfaceLabels[surface]}</span>
        </div>
        {!preferences.confirmedHistoryEnabled ? (
          <p>开启 B 后，仅使用完成自核并主动确认保存的版本；草稿和自动提示不会进入历史。</p>
        ) : latestAttempt ? (
          <div className={styles.historyExcerpt}>
            <small>{formatReviewTime(latestAttempt.confirmedAt)} 保存</small>
            <p>{historyExpanded
              ? latestAttempt.confirmedText
              : `${latestAttempt.confirmedText.slice(0, 80)}${latestAttempt.confirmedText.length > 80 ? "…" : ""}`}</p>
            {latestAttempt.confirmedText.length > 80 ? (
              <button type="button" onClick={() => setHistoryExpanded((current) => !current)}>
                {historyExpanded ? "收起" : "展开完整作答"}
              </button>
            ) : null}
            {latestMissingIds.length > 0 ? (
              <ul>
                {latestMissingIds.map((criterionId) => (
                  <li key={criterionId}>{memoryCriteriaById.get(criterionId)?.label ?? criterionId}</li>
                ))}
              </ul>
            ) : <strong>这份确认作答未标记结构缺失</strong>}
          </div>
        ) : (
          <p>完成一次自核后，这里会帮你回看关联。</p>
        )}
      </section>

      <section className={styles.reviewCard}>
        <div className={styles.memoryHeading}>
          <Clock3 aria-hidden="true" size={18} strokeWidth={1.5} />
          <div><small>ADAPTIVE RETURN</small><h3>薄弱点回流</h3></div>
          <span>{repeatedOmissions.length > 0 ? `${repeatedOmissions.length} 项重复` : "本地计划"}</span>
        </div>
        {reviewTask?.status === "proposed" ? (
          <div className={styles.reviewProposal}>
            <strong>三份不同题目的确认作答出现同类缺失</strong>
            <ul>
              {reviewTask.criterionIds.map((criterionId) => (
                <li key={criterionId}>{memoryCriteriaById.get(criterionId)?.label ?? criterionId}</li>
              ))}
            </ul>
            <p>可合并为一条 {proposedIntervalDays} 天后的复习任务；只有你确认后才加入计划。</p>
            <div>
              <button type="button" onClick={() => acceptReviewTask(reviewTask.id)}>加入计划</button>
              <button type="button" onClick={() => declineReviewTask(reviewTask.id)}>暂不加入</button>
            </div>
          </div>
        ) : reviewTask?.status === "accepted" && reviewTask.dueAt ? (
          <div className={styles.acceptedReview}>
            <div><Clock3 aria-hidden="true" size={17} /><span>计划回流</span><strong>{formatReviewTime(reviewTask.dueAt)}</strong>{acceptedIntervalDays ? <small>· {acceptedIntervalDays} 天后</small> : null}</div>
            <ul>
              {reviewTask.criterionIds.map((criterionId) => (
                <li key={criterionId} data-resolved={reviewTask.resolvedCriterionIds.includes(criterionId)}>
                  {reviewTask.resolvedCriterionIds.includes(criterionId) ? <Check aria-hidden="true" size={14} /> : <RotateCcw aria-hidden="true" size={14} />}
                  {memoryCriteriaById.get(criterionId)?.label ?? criterionId}
                </li>
              ))}
            </ul>
            <div className={styles.returnLinks}>
              {targetSurfaces.includes("subjective-writing") && writingHref ? (
                <Link href={writingHref}>回到主观题 <ArrowRight aria-hidden="true" size={15} /></Link>
              ) : null}
              {targetSurfaces.includes("case-reasoning") && caseHref ? (
                <Link href={caseHref}>回到案例步骤 <ArrowRight aria-hidden="true" size={15} /></Link>
              ) : null}
            </div>
            <p>重新补写并完成自核确认后自动完成对应目标；不要求打开“改正”。</p>
          </div>
        ) : reviewTask?.status === "declined" ? (
          <p>本次未加入计划。只有以后又确认一份仍缺同一项的作答时，才会再次提醒。</p>
        ) : completedTask ? (
          <div className={styles.completedReview}>
            <Check aria-hidden="true" size={18} />
            <p>最近一条复习任务已通过重新补写与确认自核完成。</p>
          </div>
        ) : (
          <p>同一知识点下至少三份不同题目的确认作答缺失同一结构项后，才会邀请加入计划。</p>
        )}
      </section>
    </div>
  );
}
