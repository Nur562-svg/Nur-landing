import "server-only";

import { getCourseBySlug } from "@/content/courses";
import {
  selectKnowledgePointById,
  selectSourcesByIds,
} from "@/lib/course-selectors";
import { selectMissingAssistanceRules } from "@/lib/learning-memory";
import type {
  AssessmentItemDefinition,
  CaseDefinition,
  PracticeScoringCriterion,
  CaseScoringCriterion,
  ScoringAuthority,
  StructuralAssistanceRule,
} from "@/types/learning";
import type {
  FsrsCriterionSummary,
  NurAgentConfirmedHistoryInput,
  NurAgentRequest,
  NurAgentSourceStatement,
} from "@/types/nur-agent";
import { NurAgentRequestError } from "./request";

export type ResolvedNurAgentCriterion = {
  id: string;
  memoryCriterionId: string;
  label: string;
  detail: string;
  signalGroups: readonly (readonly string[])[];
  nextStepPrompt: string;
  rewriteSuggestion: string;
};

export type ResolvedNurAgentHistory = {
  attemptId: string;
  surface: NurAgentRequest["surface"];
  taskId: string;
  segmentId: string | null;
  confirmedText: string;
  deterministicMissingCriterionIds: readonly string[];
  deterministicMissingMemoryCriterionIds: readonly string[];
};

export type ResolvedNurAgentContext = {
  request: NurAgentRequest;
  taskTitle: string;
  taskPrompt: string;
  answerFramework: readonly string[];
  scoringAuthority: ScoringAuthority;
  criteria: readonly ResolvedNurAgentCriterion[];
  memoryCriteria: readonly {
    id: string;
    label: string;
    detail: string;
  }[];
  deterministicMissingCriterionIds: readonly string[];
  confirmedHistory: readonly ResolvedNurAgentHistory[];
  sources: readonly NurAgentSourceStatement[];
  // private boundary marker (propagated to prompts and notices)
  isPrivateUnit: boolean;
  // Read-only FSRS memory-state summary passed from client localStorage.
  // Used by runtime next-step weighting and provider prompt to prioritize weak dimensions.
  fsrsSummary: readonly FsrsCriterionSummary[] | null;
};

type ResolvedTask = {
  title: string;
  prompt: string;
  answerFramework: readonly string[];
  scoringAuthority: ScoringAuthority;
  criteria: readonly ResolvedNurAgentCriterion[];
  sourceIds: readonly string[];
};

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function resolveCriteria(
  criteria: readonly (PracticeScoringCriterion | CaseScoringCriterion)[],
  rules: readonly StructuralAssistanceRule[],
): ResolvedNurAgentCriterion[] {
  const rulesByCriterionId = new Map(rules.map((rule) => [rule.criterionId, rule]));
  return criteria.map((criterion) => {
    const rule = rulesByCriterionId.get(criterion.id);
    if (!rule) {
      throw new NurAgentRequestError(`task criterion is not Agent-ready: ${criterion.id}`);
    }
    return {
      id: criterion.id,
      memoryCriterionId: rule.memoryCriterionId,
      label: criterion.label,
      detail: criterion.detail,
      signalGroups: rule.signalGroups,
      nextStepPrompt: rule.nextStepPrompt,
      rewriteSuggestion: rule.rewriteSuggestion,
    };
  });
}

function resolveWritingTask(
  item: AssessmentItemDefinition,
  segmentId: string | null,
): ResolvedTask {
  if (segmentId !== null || !item.scoring) {
    throw new NurAgentRequestError("subjective-writing task or segment is invalid");
  }
  return {
    title: item.scoring.title,
    prompt: item.prompt,
    answerFramework: item.scoring.answerFramework,
    scoringAuthority: item.scoring.authority,
    criteria: resolveCriteria(item.scoring.criteria, item.scoring.assistanceRules),
    sourceIds: unique([
      ...item.sourceIds,
      ...item.promptSource.sourceIds,
      ...item.scoring.sourceIds,
    ]),
  };
}

function resolveCaseTask(
  caseDefinition: CaseDefinition,
  segmentId: string | null,
): ResolvedTask {
  const step = caseDefinition.reasoningSteps.find((item) => item.id === segmentId);
  if (!step) {
    throw new NurAgentRequestError("case-reasoning segment is invalid");
  }
  const criteria = caseDefinition.scoring.criteria.filter((criterion) => (
    criterion.stage === step.stage
  ));
  const criterionIds = new Set(criteria.map((criterion) => criterion.id));
  return {
    title: `${caseDefinition.title} · ${step.label}`,
    prompt: `${caseDefinition.stem}\n\n${step.prompt}`,
    answerFramework: step.answerFramework,
    scoringAuthority: caseDefinition.scoring.authority,
    criteria: resolveCriteria(
      criteria,
      caseDefinition.scoring.assistanceRules.filter((rule) => criterionIds.has(rule.criterionId)),
    ),
    sourceIds: unique([
      ...caseDefinition.sourceIds,
      ...caseDefinition.promptSource.sourceIds,
      ...caseDefinition.scoring.sourceIds,
      ...step.sourceIds,
    ]),
  };
}

function resolveTask(
  request: Pick<NurAgentRequest, "surface" | "taskId" | "segmentId" | "privateRef">,
  assessmentItems: readonly AssessmentItemDefinition[],
  cases: readonly CaseDefinition[],
): ResolvedTask {
  const isPrivate = request.privateRef === "nur-qwen-private-ref";
  if (request.surface === "subjective-writing") {
    const item = assessmentItems.find((candidate) => candidate.id === request.taskId);
    if (item) {
      return resolveWritingTask(item, request.segmentId);
    }
    if (isPrivate) {
      // Private unit: synthesize a minimal task context so Agent can still run.
      // Uses knowledgePoint memoryCriteria for structure; model proposals are primary.
      // Authority will be marked private in prompts/notices.
      return {
        title: `私人学习单元 · ${request.taskId}`,
        prompt: "(private learner unit prompt; see privateRef=nur-qwen-private-ref)",
        answerFramework: [],
        scoringAuthority: "nur-platform" as ScoringAuthority, // treated as platform reference only
        criteria: [], // no authored NUR criteria; rely on model + memory for proposals
        sourceIds: [],
      };
    }
    throw new NurAgentRequestError("subjective-writing task is invalid");
  }
  const caseDefinition = cases.find((candidate) => candidate.id === request.taskId);
  if (caseDefinition) {
    return resolveCaseTask(caseDefinition, request.segmentId);
  }
  if (isPrivate) {
    return {
      title: `私人案例单元 · ${request.taskId}`,
      prompt: "(private case; nur-qwen-private-ref)",
      answerFramework: [],
      scoringAuthority: "nur-platform" as ScoringAuthority,
      criteria: [],
      sourceIds: [],
    };
  }
  throw new NurAgentRequestError("case-reasoning task is invalid");
}

function resolveHistory(
  input: NurAgentConfirmedHistoryInput,
  assessmentItems: readonly AssessmentItemDefinition[],
  cases: readonly CaseDefinition[],
): ResolvedNurAgentHistory {
  const task = resolveTask(input, assessmentItems, cases);
  const missingRuleIds = new Set(selectMissingAssistanceRules(
    input.confirmedText,
    task.criteria.map((criterion) => ({
      criterionId: criterion.id,
      memoryCriterionId: criterion.memoryCriterionId,
      signalGroups: criterion.signalGroups,
      nextStepPrompt: criterion.nextStepPrompt,
      rewriteSuggestion: criterion.rewriteSuggestion,
    })),
  ).map((rule) => rule.criterionId));
  const missingCriteria = task.criteria.filter((criterion) => (
    missingRuleIds.has(criterion.id)
  ));
  return {
    ...input,
    deterministicMissingCriterionIds: missingCriteria.map((criterion) => criterion.id),
    deterministicMissingMemoryCriterionIds: [
      ...new Set(missingCriteria.map((criterion) => criterion.memoryCriterionId)),
    ],
  };
}

function sourceLocator(source: ReturnType<typeof selectSourcesByIds>[number]): string {
  if (source.status === "pending") {
    return source.missingLabel;
  }
  const details = [
    source.citation.edition,
    source.citation.page,
    source.citation.slide,
    source.citation.academicYear,
  ].filter((item): item is string => Boolean(item));
  return details.length > 0 ? details.join(" · ") : source.citation.label;
}

export function resolveNurAgentContext(request: NurAgentRequest): ResolvedNurAgentContext {
  const course = getCourseBySlug(request.courseSlug);
  if (!course
    || course.id !== request.courseId
    || course.version.id !== request.courseVersionId
    || course.examBlueprint.id !== request.offeringId
  ) {
    throw new NurAgentRequestError("course version or offering is invalid");
  }
  const knowledgePoint = selectKnowledgePointById(course, request.knowledgePointId);
  if (!knowledgePoint) {
    throw new NurAgentRequestError("knowledge point is invalid");
  }

  const assessmentIds = new Set(knowledgePoint.assessmentItemIds);
  const caseIds = new Set(knowledgePoint.caseIds);
  const assessmentItems = course.assessmentItems.filter((item) => assessmentIds.has(item.id));
  const cases = course.cases.filter((item) => caseIds.has(item.id));
  const task = resolveTask(request, assessmentItems, cases);
  const isPrivate = request.privateRef === "nur-qwen-private-ref";

  // For private units we may have empty authored criteria; still compute deterministic where possible
  const deterministicMissingCriterionIds = selectMissingAssistanceRules(
    request.currentText,
    task.criteria.map((criterion) => ({
      criterionId: criterion.id,
      memoryCriterionId: criterion.memoryCriterionId,
      signalGroups: criterion.signalGroups,
      nextStepPrompt: criterion.nextStepPrompt,
      rewriteSuggestion: criterion.rewriteSuggestion,
    })),
  ).map((rule) => rule.criterionId);

  // For private, fall back to memory criteria as "structure" for UI display if no authored criteria
  const effectiveCriteria = task.criteria.length > 0 ? task.criteria : knowledgePoint.learningMemoryCriteria.map((mc, idx) => ({
    id: mc.id || `private-mem-${idx}`,
    memoryCriterionId: mc.id,
    label: mc.label,
    detail: mc.detail,
    signalGroups: [[]] as readonly (readonly string[])[],
    nextStepPrompt: "补全这一记忆维度相关的结构要点。",
    rewriteSuggestion: "根据当前文本和记忆点重写以覆盖缺失部分。",
  }));

  return {
    request,
    taskTitle: task.title,
    taskPrompt: task.prompt,
    answerFramework: task.answerFramework,
    scoringAuthority: task.scoringAuthority,
    criteria: effectiveCriteria,
    memoryCriteria: knowledgePoint.learningMemoryCriteria.map((criterion) => ({
      id: criterion.id,
      label: criterion.label,
      detail: criterion.detail,
    })),
    deterministicMissingCriterionIds,
    confirmedHistory: request.confirmedHistory.map((attempt) => (
      resolveHistory(attempt, assessmentItems, cases)
    )),
    sources: selectSourcesByIds(course, task.sourceIds)
      .filter((source) => source.status !== "pending")
      .map((source) => ({
        id: source.id,
        label: source.displayLabel,
        authority: source.authority,
        status: source.status,
        locator: sourceLocator(source),
      })),
    isPrivateUnit: isPrivate,
    fsrsSummary: request.fsrsSummary,
  };
}
