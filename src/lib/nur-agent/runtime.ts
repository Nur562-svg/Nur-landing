import "server-only";

import { randomUUID } from "node:crypto";
import type {
  NurAgentRun,
  NurAgentRunStep,
} from "@/types/nur-agent";
import type { ResolvedNurAgentContext } from "./context";
import type { NurAgentProviderEvaluation } from "./provider";

export type NurAgentRuntimeHistoryRelation = {
  criterionId: string;
  relatedAttemptIds: readonly string[];
};

export type NurAgentRuntimeResult = {
  run: NurAgentRun;
  missingCriterionIds: readonly string[];
  nextStepCriterionId: string | null;
  historyRelations: readonly NurAgentRuntimeHistoryRelation[];
  rewriteCriterionId: string | null;
};

function uniqueAllowed(
  values: readonly string[],
  allowed: ReadonlySet<string>,
): string[] {
  return [...new Set(values.filter((value) => allowed.has(value)))];
}

function compareConfirmedHistory(
  context: ResolvedNurAgentContext,
  evaluation: NurAgentProviderEvaluation | null,
  missingIds: ReadonlySet<string>,
): NurAgentRuntimeHistoryRelation[] {
  const allowedAttemptIds = new Set(
    context.confirmedHistory.map((attempt) => attempt.attemptId),
  );
  const modelRelations = new Map(
    (evaluation?.historyRelations ?? []).map((relation) => [
      relation.criterionId,
      relation.relatedAttemptIds,
    ]),
  );

  return context.criteria.flatMap((criterion) => {
    if (!missingIds.has(criterion.id)) {
      return [];
    }
    const deterministicIds = context.confirmedHistory
      .filter((attempt) => (
        attempt.deterministicMissingMemoryCriterionIds.includes(
          criterion.memoryCriterionId,
        )
      ))
      .map((attempt) => attempt.attemptId);
    const relatedAttemptIds = uniqueAllowed(
      [...deterministicIds, ...(modelRelations.get(criterion.id) ?? [])],
      allowedAttemptIds,
    );
    return relatedAttemptIds.length > 0 ? [{
      criterionId: criterion.id,
      relatedAttemptIds,
    }] : [];
  });
}

function createRunSteps(
  context: ResolvedNurAgentContext,
  mode: NurAgentRun["mode"],
  missingCriterionIds: readonly string[],
  historyRelations: readonly NurAgentRuntimeHistoryRelation[],
  nextStepCriterionId: string | null,
): NurAgentRunStep[] {
  const nextCriterion = context.criteria.find((criterion) => (
    criterion.id === nextStepCriterionId
  ));
  return [
    {
      id: "resolve-context",
      capability: "course-context.read",
      label: "上下文",
      summary: `知识点：“${context.taskTitle}”。`,
    },
    {
      id: "inspect-answer",
      capability: "answer-structure.inspect",
      label: "检查当前作答",
      summary: missingCriterionIds.length > 0
        ? `识别到 ${missingCriterionIds.length} 项结构仍需补全；这是结构检查，不判断医学事实真伪。`
        : "当前作答已覆盖本任务声明的结构要求；这不代表教师评分或医学事实判定。",
    },
    {
      id: "compare-history",
      capability: "confirmed-history.compare",
      label: "参考历史",
      summary: context.confirmedHistory.length === 0
        ? "无先前确认记录。"
        : `参考了 ${context.confirmedHistory.length} 份确认作答。`,
    },
    {
      id: "select-action",
      capability: "next-action.select",
      label: "选择一个下一步",
      summary: nextCriterion
        ? `${mode === "model-assisted" ? "模型辅助 policy" : "本地确定性 policy"}选择先补“${nextCriterion.label}”，随后等待学生修改。`
        : "没有新的结构补写动作，当前运行在结构覆盖处停止。",
    },
  ];
}

export function runNurAgentRuntime(
  context: ResolvedNurAgentContext,
  evaluation: NurAgentProviderEvaluation | null,
): NurAgentRuntimeResult {
  const mode: NurAgentRun["mode"] = evaluation
    ? "model-assisted"
    : "deterministic";
  const allowedCriterionIds = new Set(
    context.criteria.map((criterion) => criterion.id),
  );
  const missingCriterionIds = uniqueAllowed([
    ...context.deterministicMissingCriterionIds,
    ...(evaluation?.missingCriterionIds ?? []),
  ], allowedCriterionIds);
  const missingIds = new Set(missingCriterionIds);
  const historyRelations = compareConfirmedHistory(
    context,
    evaluation,
    missingIds,
  );
  const relatedAttemptCounts = new Map(
    historyRelations.map((relation) => [
      relation.criterionId,
      relation.relatedAttemptIds.length,
    ]),
  );
  // FSRS-aware next-step: weight missing criteria by memory weakness.
  // fsrsWeaknessScore = (10 - stability) + lapses * 2
  // Criteria with no FSRS state (new/unknown) get a moderate default of 5.
  const fsrsByMemoryId = new Map(
    (context.fsrsSummary ?? []).map((s) => [s.memoryCriterionId, s]),
  );
  const fsrsWeaknessScore = new Map<string, number>();
  for (const criterion of context.criteria) {
    const fsrs = fsrsByMemoryId.get(criterion.memoryCriterionId);
    fsrsWeaknessScore.set(
      criterion.id,
      fsrs ? (10 - fsrs.stability) + fsrs.lapses * 2 : 5,
    );
  }
  const deterministicNextStepId = [...missingCriterionIds]
    .sort((left, right) => (
      ((relatedAttemptCounts.get(right) ?? 0) + (fsrsWeaknessScore.get(right) ?? 0))
      - ((relatedAttemptCounts.get(left) ?? 0) + (fsrsWeaknessScore.get(left) ?? 0))
    ))[0] ?? null;
  const requestedNextStepId = evaluation?.nextStepCriterionId ?? null;
  const nextStepCriterionId = requestedNextStepId
    && missingIds.has(requestedNextStepId)
    ? requestedNextStepId
    : deterministicNextStepId;
  const requestedRewriteId = context.request.requestRewrite
    ? evaluation?.rewriteCriterionId ?? null
    : null;
  const rewriteCriterionId = requestedRewriteId
    && missingIds.has(requestedRewriteId)
    ? requestedRewriteId
    : context.request.requestRewrite
      ? nextStepCriterionId
      : null;
  const status: NurAgentRun["status"] = missingCriterionIds.length > 0
    ? "waiting-for-learner"
    : "completed";

  return {
    run: {
      id: randomUUID(),
      previousRunId: context.request.previousRunId,
      mode,
      status,
      stopReason: status === "waiting-for-learner"
        ? "learner-input-required"
        : "structure-covered",
      steps: createRunSteps(
        context,
        mode,
        missingCriterionIds,
        historyRelations,
        nextStepCriterionId,
      ),
    },
    missingCriterionIds,
    nextStepCriterionId,
    historyRelations,
    rewriteCriterionId,
  };
}
