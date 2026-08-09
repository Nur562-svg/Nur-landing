import "server-only";

import type {
  NurAgentHistoryRelation,
  NurAgentModelAssist,
  NurAgentResult,
} from "@/types/nur-agent";
import type { ResolvedNurAgentContext } from "./context";
import type {
  NurAgentProvider,
  NurAgentProviderEvaluation,
} from "./provider";
import { createXaiNurAgentProvider } from "./providers/xai";
import { createDashScopeNurAgentProvider } from "./providers/dashscope";
import {
  runNurAgentRuntime,
  type NurAgentRuntimeHistoryRelation,
} from "./runtime";
import {
  defaultFsrsParameters,
  fsrsNextInterval,
  fsrsRequestedRetention,
} from "@/lib/fsrs";
import type { FsrsCriterionSummary } from "@/types/nur-agent";
import type { FsrsCriterionState } from "@/types/learning";
import { reviewDelayHours } from "@/lib/learning-memory";

export function getConfiguredNurAgentProvider(): NurAgentProvider | null {
  // Qwen (DashScope) is now primary reasoning engine for the bounded NUR Agent.
  // Reuses the same DASHSCOPE_API_KEY + base as private-analysis in Course Builder.
  // xAI retained for fallback / explicit override only.
  const dashKey = process.env.DASHSCOPE_API_KEY?.trim();
  const preferred = (process.env.NUR_AGENT_PROVIDER?.trim() || "dashscope").toLowerCase();
  if (dashKey && preferred === "dashscope") {
    return createDashScopeNurAgentProvider(
      dashKey,
      process.env.NUR_AGENT_MODEL?.trim() ||
        process.env.NUR_COURSE_BUILDER_MODEL?.trim() ||
        "qwen3.7-plus",
      process.env.DASHSCOPE_BASE_URL?.trim(),
    );
  }

  const apiKey = process.env.XAI_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const providerId = process.env.NUR_AGENT_PROVIDER?.trim() || "xai";
  if (providerId !== "xai") {
    return null;
  }
  return createXaiNurAgentProvider(
    apiKey,
    process.env.NUR_AGENT_MODEL?.trim() || "grok-4.3",
  );
}

function buildHistoryRelations(
  context: ResolvedNurAgentContext,
  runtimeRelations: readonly NurAgentRuntimeHistoryRelation[],
): NurAgentHistoryRelation[] {
  const relationsByCriterionId = new Map(
    runtimeRelations.map((relation) => [
      relation.criterionId,
      relation.relatedAttemptIds,
    ]),
  );
  return context.criteria.flatMap((criterion) => {
    const relatedAttemptIds = relationsByCriterionId.get(criterion.id) ?? [];
    if (relatedAttemptIds.length === 0) {
      return [];
    }
    const memoryCriterion = context.memoryCriteria.find((candidate) => (
      candidate.id === criterion.memoryCriterionId
    ));
    return [{
      criterionId: criterion.id,
      memoryCriterionId: criterion.memoryCriterionId,
      relatedAttemptIds,
      summary: `当前作答与 ${relatedAttemptIds.length} 份确认历史都需要复核同一结构维度“${memoryCriterion?.label ?? criterion.label}”。`,
    }];
  });
}

// Narrow “model suggestion → deterministic application” layer.
// Model only ever returns proposals. Actual state writes (confirmed attempts,
// review tasks, favorites) are performed by explicit learner action calling
// the existing deterministic functions (recordConfirmedAttempt etc).
function buildRewriteSuggestions(
  context: ResolvedNurAgentContext,
  evaluation: NurAgentProviderEvaluation | null,
) {
  if (!evaluation?.rewriteSuggestions || evaluation.rewriteSuggestions.length === 0) {
    return undefined;
  }
  const allowed = new Set(context.criteria.map((c) => c.id));
  const filtered = evaluation.rewriteSuggestions.filter((s) => allowed.has(s.criterionId));
  if (filtered.length === 0) return undefined;
  // Return first high-confidence or the list; UI will present as proposals only.
  return filtered.map((s) => ({
    criterionId: s.criterionId,
    rewrittenText: s.rewrittenText,
    rationale: s.rationale,
    confidence: s.confidence,
  }));
}

function buildFavoriteProposals(
  context: ResolvedNurAgentContext,
  evaluation: NurAgentProviderEvaluation | null,
) {
  if (!evaluation?.favoriteProposals || evaluation.favoriteProposals.length === 0) {
    return undefined;
  }
  const allowed = new Set(context.memoryCriteria.map((m) => m.id));
  const filtered = evaluation.favoriteProposals.filter((f) => allowed.has(f.memoryCriterionId));
  if (filtered.length === 0) return undefined;
  return filtered.map((f) => ({
    memoryCriterionId: f.memoryCriterionId,
    label: f.label,
    rationale: f.rationale,
  }));
}

function fsrsIntervalHoursFromSummary(summary: FsrsCriterionSummary | undefined): number {
  if (!summary) {
    return Math.round(reviewDelayHours / 24) * 24;
  }
  const state: FsrsCriterionState = {
    state: summary.state,
    difficulty: summary.difficulty,
    stability: summary.stability,
    reps: summary.reps,
    lapses: summary.lapses,
    lastReviewAt: summary.lastReviewAt,
  };
  return fsrsNextInterval(state, defaultFsrsParameters(), fsrsRequestedRetention) * 24;
}

function buildReviewProposals(
  context: ResolvedNurAgentContext,
  evaluation: NurAgentProviderEvaluation | null,
) {
  const allowed = new Set(context.memoryCriteria.map((m) => m.id));
  const fsrsByMemoryId = new Map(
    (context.fsrsSummary ?? []).map((s) => [s.memoryCriterionId, s]),
  );

  const modelProposals = (evaluation?.reviewProposals ?? [])
    .filter((r) => allowed.has(r.memoryCriterionId))
    .map((r) => ({
      memoryCriterionId: r.memoryCriterionId,
      label: r.label,
      rationale: r.rationale,
      suggestedDueHours: fsrsIntervalHoursFromSummary(fsrsByMemoryId.get(r.memoryCriterionId)),
    }));
  const proposedMemoryIds = new Set(modelProposals.map((r) => r.memoryCriterionId));

  // FSRS proactive: criteria in relearning or with lapses >= 2 need review
  // even without 3 repeated omissions or model suggestions.
  const proactive = (context.fsrsSummary ?? [])
    .filter((s) => allowed.has(s.memoryCriterionId) && !proposedMemoryIds.has(s.memoryCriterionId))
    .filter((s) => s.state === "relearning" || s.lapses >= 2)
    .map((s) => {
      const mc = context.memoryCriteria.find((m) => m.id === s.memoryCriterionId);
      return {
        memoryCriterionId: s.memoryCriterionId,
        label: mc?.label ?? s.memoryCriterionId,
        rationale: `FSRS 记忆状态提示：该维度已遗忘 ${s.lapses} 次，当前稳定性 ${s.stability.toFixed(1)}，建议及时复习巩固。`,
        suggestedDueHours: fsrsIntervalHoursFromSummary(s),
      };
    });

  const all = [...modelProposals, ...proactive];
  return all.length > 0 ? all : undefined;
}

function buildSourceComparisons(
  context: ResolvedNurAgentContext,
  evaluation: NurAgentProviderEvaluation | null,
) {
  if (!evaluation?.sourceComparisons || evaluation.sourceComparisons.length === 0) {
    return undefined;
  }
  const allowed = new Set(context.sources.map((s) => s.id));
  const filtered = evaluation.sourceComparisons.filter((s) => allowed.has(s.sourceId));
  if (filtered.length === 0) return undefined;
  return filtered.map((s) => ({
    sourceId: s.sourceId,
    note: s.note,
    relationshipLabel: s.relationshipLabel,
  }));
}

async function evaluateWithProvider(
  context: ResolvedNurAgentContext,
  provider: NurAgentProvider | null,
): Promise<{
  evaluation: NurAgentProviderEvaluation | null;
  modelAssist: NurAgentModelAssist;
}> {
  if (!provider) {
    return {
      evaluation: null,
      modelAssist: {
        status: "not-configured",
        provider: null,
        notice: "本次由本地确定性 policy 完成；未来模型可接入同一选择接口，但不是 Agent 运行的前提。",
      },
    };
  }

  const providerIdentity = { id: provider.id, model: provider.model };
  try {
    return {
      evaluation: await provider.evaluate(context),
      modelAssist: {
        status: "used",
        provider: providerIdentity,
        notice: "模型只辅助结构建议（Qwen/DashScope Function Calling 返回 proposals）；课程内容、来源、最终写入仍由本地注册表 + 确定性代码 + 显式用户确认负责。",
      },
    };
  } catch {
    return {
      evaluation: null,
      modelAssist: {
        status: "failed",
        provider: providerIdentity,
        notice: "模型辅助本次失败，Agent 已自动回退到本地确定性 policy；A/B、自核和回流不受影响。保留 deterministicFallbackAvailable。",
      },
    };
  }
}

function dataHandlingNotice(modelAssist: NurAgentModelAssist): string {
  if (modelAssist.status === "not-configured") {
    return "本次运行只在本机服务端读取当前作答与确认历史，没有发送给外部模型，也没有写入服务器持久化。";
  }
  const providerLabel = modelAssist.provider
    ? `${modelAssist.provider.id} · ${modelAssist.provider.model}`
    : "已配置模型";
  return `本次曾向 ${providerLabel} 发送当前作答与最多 8 份确认历史（private 单元标记 nur-qwen-private-ref 时边界声明不同）；请求设置为不保存会话，供应商的数据政策仍然适用。`;
}

export async function runNurAgent(
  context: ResolvedNurAgentContext,
  provider: NurAgentProvider | null,
): Promise<NurAgentResult> {
  const { evaluation, modelAssist } = await evaluateWithProvider(context, provider);
  const runtime = runNurAgentRuntime(context, evaluation);
  const criteriaById = new Map(context.criteria.map((criterion) => [criterion.id, criterion]));
  const nextStepCriterion = runtime.nextStepCriterionId
    ? criteriaById.get(runtime.nextStepCriterionId) ?? null
    : null;
  const rewriteCriterion = runtime.rewriteCriterionId
    ? criteriaById.get(runtime.rewriteCriterionId) ?? null
    : null;

  const rewriteSuggestions = buildRewriteSuggestions(context, evaluation);
  const favoriteProposals = buildFavoriteProposals(context, evaluation);
  const reviewProposals = buildReviewProposals(context, evaluation);
  const sourceComparisons = buildSourceComparisons(context, evaluation);

  return {
    version: 1,
    status: "agent-result",
    run: runtime.run,
    modelAssist,
    scoringAuthority: context.scoringAuthority,
    omissions: runtime.missingCriterionIds.flatMap((criterionId) => {
      const criterion = criteriaById.get(criterionId);
      return criterion ? [{
        criterionId: criterion.id,
        memoryCriterionId: criterion.memoryCriterionId,
        label: criterion.label,
        detail: criterion.detail,
      }] : [];
    }),
    nextStep: nextStepCriterion ? {
      criterionId: nextStepCriterion.id,
      prompt: nextStepCriterion.nextStepPrompt,
    } : null,
    historyRelations: buildHistoryRelations(context, runtime.historyRelations),
    rewriteSuggestion: rewriteCriterion ? {
      criterionId: rewriteCriterion.id,
      content: rewriteCriterion.rewriteSuggestion,
    } : null,
    // New typed proposals (model only; human + deterministic apply)
    rewriteProposals: rewriteSuggestions,
    favoriteProposals,
    reviewProposals,
    sourceComparisons,
    sources: context.sources,
    authorityNotice: context.request.privateRef === "nur-qwen-private-ref"
      ? "这是 NUR Agent 对 learner-private 单元的结构辅助（参考答案为 nur-qwen-generated / pending-review）。不是任课教师评分、标准答案或临床诊断；私人材料边界与官方 authored 单元声明完全不同。"
      : "这是 NUR Agent 的结构辅助，不是任课教师评分、标准答案或临床诊断；中医、现代医学与关系边界仍需分别论证。",
    dataHandlingNotice: dataHandlingNotice(modelAssist),
  };
}
