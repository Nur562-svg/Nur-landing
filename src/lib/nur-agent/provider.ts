import "server-only";

import type { ResolvedNurAgentContext } from "./context";

export type NurAgentProviderEvaluation = {
  missingCriterionIds: readonly string[];
  nextStepCriterionId: string | null;
  historyRelations: readonly {
    criterionId: string;
    relatedAttemptIds: readonly string[];
  }[];
  rewriteCriterionId: string | null;
  // Optional typed tool proposals returned by model (e.g. DashScope/Qwen).
  // Core contract preserved; runtime + explicit UI actions own writes
  // (recordConfirmedAttempt, proposeReviewTaskForAttempt, favorites, etc.).
  // Model returns suggestions only.
  rewriteSuggestions?: readonly {
    criterionId: string;
    rewrittenText: string;
    rationale: string;
    confidence: number;
  }[];
  favoriteProposals?: readonly {
    memoryCriterionId: string;
    label: string;
    rationale: string;
  }[];
  reviewProposals?: readonly {
    memoryCriterionId: string;
    label: string;
    rationale: string;
  }[];
  sourceComparisons?: readonly {
    sourceId: string;
    note: string;
    relationshipLabel: "可关联" | "帮助理解" | "不可直接等同";
  }[];
};

export type NurAgentProvider = {
  id: string;
  model: string;
  evaluate(context: ResolvedNurAgentContext): Promise<NurAgentProviderEvaluation>;
};

export class NurAgentProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NurAgentProviderError";
  }
}
