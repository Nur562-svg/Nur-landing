"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  CircleAlert,
  LoaderCircle,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type {
  LearningAttemptSurface,
  LearningMemoryState,
} from "@/types/learning";
import type {
  NurAgentApiResponse,
  NurAgentErrorResponse,
  NurAgentRequest,
  NurAgentResult,
} from "@/types/nur-agent";
import styles from "./nur-agent-pilot.module.css";
import { recordAgentCallUsage } from "@/lib/quotas";

type NurAgentPilotProps = {
  state: LearningMemoryState;
  courseId: string;
  courseSlug: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
  currentText: string;
  selfCheckStarted: boolean;
  // Marker for private units (Course Builder private analysis result). Enables nur-qwen-private-ref path.
  privateRef?: "nur-qwen-private-ref" | null;
  // Optional callback so rewrite proposals can be directly applied into the room's active revision/draft
  onApplyRewrite?: (rewrittenText: string, criterionId: string) => void;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}


// Client-side precise quoting for omissions: find the best matching sentence from currentText
function findBestQuote(text: string, label: string, detail: string): string {
  const trimmed = (text || "").trim();
  if (!trimmed) return "";
  // Better Chinese-aware sentence split
  const rawSentences = trimmed.split(/([。！？.!?]+\s*)/g).filter(s => s && s.trim().length > 0);
  const sentences: string[] = [];
  for (let i = 0; i < rawSentences.length; i++) {
    const s = rawSentences[i].trim();
    if (s.length > 3) sentences.push(s);
  }
  if (sentences.length === 0) {
    return trimmed.length > 85 ? trimmed.slice(0, 85) + "…" : trimmed;
  }
  const keywords = (label + " " + detail)
    .toLowerCase()
    .split(/[\s，、。！？,!?.()（）]+/)
    .filter(k => k.length > 1);
  let best = sentences[0];
  let bestScore = 0;
  for (const s of sentences) {
    const sLower = s.toLowerCase();
    let score = 0;
    for (const k of keywords) {
      if (sLower.includes(k)) {
        score += k.length > 3 ? 2 : 1; // longer keywords weigh more
      }
    }
    // Bonus if sentence is not too short
    if (s.length > 12) score += 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }
  if (best.length > 95) best = best.slice(0, 95) + "…";
  return best;
}

function isAgentError(value: unknown): value is NurAgentErrorResponse {
  return isRecord(value)
    && value.version === 1
    && value.status === "error"
    && (value.code === "invalid-request" || value.code === "runtime-failed")
    && typeof value.message === "string"
    && value.deterministicFallbackAvailable === true;
}

function isAgentResult(value: unknown): value is NurAgentResult {
  return isRecord(value)
    && value.version === 1
    && value.status === "agent-result"
    && isRecord(value.run)
    && typeof value.run.id === "string"
    && (value.run.mode === "deterministic" || value.run.mode === "model-assisted")
    && (value.run.status === "waiting-for-learner" || value.run.status === "completed")
    && Array.isArray(value.run.steps)
    && isRecord(value.modelAssist)
    && (value.modelAssist.status === "not-configured"
      || value.modelAssist.status === "used"
      || value.modelAssist.status === "failed")
    && Array.isArray(value.omissions)
    && Array.isArray(value.historyRelations)
    && Array.isArray(value.sources)
    && typeof value.authorityNotice === "string"
    && typeof value.dataHandlingNotice === "string";
}

function parseAgentResponse(value: unknown): NurAgentApiResponse | null {
  if (isAgentError(value) || isAgentResult(value)) {
    return value;
  }
  return null;
}

export function NurAgentPilot({
  state,
  courseId,
  courseSlug,
  courseVersionId,
  offeringId,
  knowledgePointId,
  surface,
  taskId,
  segmentId,
  currentText,
  selfCheckStarted: _selfCheckStarted, // eslint-disable-line @typescript-eslint/no-unused-vars
  privateRef = null,
  onApplyRewrite,
}: NurAgentPilotProps) {
  const [result, setResult] = useState<NurAgentResult | null>(null);
  const [error, setError] = useState<NurAgentErrorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [previousRunId, setPreviousRunId] = useState<string | null>(null);
  const taskSignature = `${surface}:${taskId}:${segmentId ?? "all"}`;
  const answerSignature = `${surface}:${taskId}:${segmentId ?? "all"}:${currentText}`;
  const confirmedHistory = useMemo(() => (
    [...state.attempts]
      .filter((attempt) => (
        attempt.courseId === courseId
        && attempt.knowledgePointId === knowledgePointId
      ))
      .sort((left, right) => Date.parse(right.confirmedAt) - Date.parse(left.confirmedAt))
      .slice(0, 8)
      .map((attempt) => ({
        attemptId: attempt.id,
        surface: attempt.surface,
        taskId: attempt.taskId,
        segmentId: attempt.segmentId,
        confirmedText: attempt.confirmedText.slice(0, 4000),
      }))
  ), [courseId, knowledgePointId, state.attempts]);

  const fsrsSummary = useMemo(() => {
    if (!state.fsrsState) return null;
    return Object.entries(state.fsrsState.criteria).map(([memoryCriterionId, cs]) => ({
      memoryCriterionId,
      state: cs.state,
      difficulty: cs.difficulty,
      stability: cs.stability,
      reps: cs.reps,
      lapses: cs.lapses,
      lastReviewAt: cs.lastReviewAt,
    }));
  }, [state.fsrsState]);

  useEffect(() => {
    setResult(null);
    setError(null);
  }, [answerSignature]);

  useEffect(() => {
    setPreviousRunId(null);
  }, [taskSignature]);

  async function requestReview(requestRewrite: boolean) {
    // Allow analysis on any non-empty current draft (engages what student actually wrote).
    // Deterministic A/B assistance and explicit confirm still own all state writes.
    if (currentText.trim().length === 0) {
      return;
    }
    recordAgentCallUsage();
    setLoading(true);
    setError(null);
    try {
      const payload: NurAgentRequest = {
        version: 1,
        previousRunId,
        courseId,
        courseSlug,
        courseVersionId,
        offeringId,
        knowledgePointId,
        surface,
        taskId,
        segmentId,
        currentText,
        requestRewrite,
        confirmedHistory,
        fsrsSummary,
        privateRef: privateRef || undefined,
      };
      const response = await fetch("/api/nur-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const parsed = parseAgentResponse(await response.json());
      if (!parsed) {
        setError({
          version: 1,
          status: "error",
          code: "runtime-failed",
          message: "Agent runtime 返回了无法验证的结构；当前确定性自核不受影响。",
          deterministicFallbackAvailable: true,
        });
      } else if (parsed.status === "error") {
        setError(parsed);
      } else {
        setResult(parsed);
        setPreviousRunId(parsed.run.id);
      }
    } catch {
      setError({
        version: 1,
        status: "error",
        code: "runtime-failed",
        message: "Agent runtime 本次不可用；当前确定性自核不受影响。",
        deterministicFallbackAvailable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  // Explicit trigger examples (as per step 16). All still go through the same bounded call.
  // Model returns proposals; apply is always explicit deterministic + user.
  function triggerWithFocus() {
    // For v1 we reuse the single call (the prompt + schema already support proposals).
    // Future: could pass requestedCapabilities to narrow prompt.
    void requestReview(false);
  }

  const canApplyRewrite = Boolean(onApplyRewrite) && currentText.trim().length > 0;

  const rewriteSuggestionBlock = (() => {
    const suggestion = result?.rewriteSuggestion ?? null;
    if (!result || !suggestion) return null;
    return (
      <div className={styles.omissions}>
        <small>NUR 改写参考句（本任务注册结构规则的确定性改写，非模型生成）</small>
        <article>
          <p>{suggestion.content}</p>
          {canApplyRewrite && onApplyRewrite ? (
            <button
              type="button"
              onClick={() => onApplyRewrite(suggestion.content, suggestion.criterionId)}
              style={{ marginTop: 6 }}
            >
              应用此改写
            </button>
          ) : null}
        </article>
      </div>
    );
  })();

  return (
    <section className={styles.agentCard} aria-live="polite">
      <div className={styles.heading}>
        <Bot aria-hidden="true" size={20} strokeWidth={1.5} />
        <div><small>NUR AGENT · LOCAL RUNTIME (Qwen-powered)</small><h3>学习任务 Agent</h3></div>
        <span>本地可运行 · 模型仅建议</span>
      </div>
      <p className={styles.boundary}>
        Agent 是这个知识点的精准写作导师。它会直接阅读并引用你当前写的文字（currentText），针对注册的 NUR 结构给出具体诊断和改写提案。所有状态变更仍由你显式确认 + 确定性代码执行。
      </p>

      {currentText.trim().length === 0 ? (
        <div className={styles.waiting}>
          <ShieldCheck aria-hidden="true" size={18} />
          <p>先写下你的答案；写完即可让 Agent 直接引用你的文字分析。</p>
        </div>
      ) : result ? (
        <div className={styles.result}>
          <div className={styles.runLine}>
            <Check aria-hidden="true" size={16} />
            <span>{result.run.mode === "model-assisted" ? "模型辅助运行（Qwen）" : "本地确定性运行"}</span>
            <strong>{result.run.status === "completed" ? "本轮完成" : "等待学生补写"}</strong>
          </div>
          {result.run.previousRunId ? <small className={styles.continuation}>已接续上一轮作答检查</small> : null}

          {/* Radical change: lead with what the student actually wrote + sharp analysis. */}
          {currentText ? (
            <div className={styles.omissions}>
              <small>你当前提交的答案（Agent 已直接分析此内容）</small>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "13px", background: "#f8f5f0", padding: 8, borderRadius: 4 }}>
                {currentText.length > 600 ? currentText.slice(0, 600) + "…" : currentText}
              </pre>
            </div>
          ) : null}

          {result.omissions.length > 0 ? (
            <div className={styles.omissions}>
              <small>针对你当前写的具体问题（已引用原文）</small>
              {result.omissions.map((omission: { criterionId: string; label: string; detail: string }) => {
                const quote = findBestQuote(currentText, omission.label, omission.detail);
                return (
                  <article key={omission.criterionId}>
                    <strong>{omission.label}</strong>
                    <p>
                      你写了：「{quote}」—— {omission.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.clear}><Check aria-hidden="true" size={16} />结构上已基本覆盖本点的要求。</div>
          )}

          {result.nextStep ? (
            <div className={styles.nextStep}>
              <Sparkles aria-hidden="true" size={16} />
              <div><small>最该先处理的点</small><p>{result.nextStep.prompt}</p></div>
            </div>
          ) : null}

          {rewriteSuggestionBlock}

          <details style={{ marginTop: 8 }}>
            <summary style={{cursor:"pointer", fontSize:12, color:"#666"}}>显示内部运行流程（仅调试）</summary>
            <div className={styles.policy} data-status={result.modelAssist.status}>
              <Workflow aria-hidden="true" size={16} />
              <div><small>模型辅助</small><p>{result.modelAssist.notice}</p></div>
            </div>
          </details>

          {/* Typed proposals from Qwen (explicit apply only) */}
          {result.rewriteProposals && result.rewriteProposals.length > 0 ? (
            <div className={styles.omissions}>
              <small>改写提案（优先作为补充插入，保留你写的句子）</small>
              {result.rewriteProposals.map((p, idx) => (
                <article key={idx}>
                  <strong>针对 {p.criterionId}</strong>
                  <p>{p.rationale}（置信 {Math.round(p.confidence * 100)}%）</p>
                  <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>{p.rewrittenText}</pre>
                  {canApplyRewrite && onApplyRewrite ? (
                    <button
                      type="button"
                      onClick={() => onApplyRewrite(p.rewrittenText, p.criterionId)}
                      style={{ marginTop: 6 }}
                    >
                      应用此改写
                    </button>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}

          {result.favoriteProposals && result.favoriteProposals.length > 0 ? (
            <div className={styles.omissions}>
              <small>模型收藏提案（仅建议 · 需您确认后加入记忆）</small>
              {result.favoriteProposals.map((p, idx) => (
                <article key={idx}>
                  <strong>{p.label}</strong>
                  <p>{p.rationale}</p>
                </article>
              ))}
            </div>
          ) : null}

          {result.reviewProposals && result.reviewProposals.length > 0 ? (
            <div className={styles.omissions}>
              <small>模型复习提案（需您确认后加入计划）</small>
              {result.reviewProposals.map((p, idx) => (
                <article key={idx}>
                  <strong>{p.label}</strong>
                  <p>{p.rationale}（建议 {p.suggestedDueHours} 小时后）</p>
                </article>
              ))}
            </div>
          ) : null}

          {result.sourceComparisons && result.sourceComparisons.length > 0 ? (
            <div className={styles.omissions}>
              <small>模型来源对比提示</small>
              {result.sourceComparisons.map((p, idx) => (
                <article key={idx}>
                  <strong>来源 {p.sourceId}</strong>
                  <p>{p.note}（{p.relationshipLabel}）</p>
                </article>
              ))}
            </div>
          ) : null}

          {result.rewriteSuggestion || (result.omissions.length > 0) ? (
            <button
              className={styles.rewriteButton}
              type="button"
              disabled={loading}
              onClick={() => requestReview(true)}
            >
              主动请求一条改写建议 <ArrowRight aria-hidden="true" size={16} />
            </button>
          ) : null}

          {/* Explicit trigger points */}
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" disabled={loading} onClick={() => triggerWithFocus()}>
              让 Agent 再针对当前草稿分析
            </button>
          </div>

          <div className={styles.sources}>
            <small>本次来源声明</small>
            <p>{result.sources.map((source) => `${source.label}（${source.status === "verified" ? "已核验" : "已接入"}）`).join(" · ")}</p>
          </div>
          <p className={styles.notice}>{result.authorityNotice}</p>
          <p className={styles.dataNotice}>{result.dataHandlingNotice}</p>
        </div>
      ) : (
        <div className={styles.requestArea}>
          {error ? (
            <div className={styles.unavailable} role="status">
              <CircleAlert aria-hidden="true" size={17} />
              <div>
                <strong>本次 Agent runtime 未完成</strong>
                <p>{error.message}</p>
              </div>
            </div>
          ) : (
            <p>点击后，Agent 会直接阅读你当前写的答案（currentText），引用你的原文给出针对性诊断和提案。仍需你确认后才写入。</p>
          )}
          <button type="button" disabled={loading} onClick={() => requestReview(false)}>
            {loading ? <LoaderCircle className={styles.spinner} aria-hidden="true" size={17} /> : <Sparkles aria-hidden="true" size={17} />}
            {loading ? "Agent 正在执行四步检查" : error ? "重新运行 NUR Agent" : "让 Agent 直接分析我写的答案（Qwen）"}
          </button>
          <small>Agent 严格基于本知识点注册的 criteria、sources 和你当前写的文字工作。模型只出建议，写入由你确认。</small>
        </div>
      )}
    </section>
  );
}
