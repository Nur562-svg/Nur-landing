import type {
  LearningAttemptSurface,
  ScoringAuthority,
  SourceAuthority,
} from "@/types/learning";

export type NurAgentConfirmedHistoryInput = {
  attemptId: string;
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
  confirmedText: string;
};

export type FsrsCriterionSummary = {
  memoryCriterionId: string;
  state: "new" | "learning" | "review" | "relearning";
  difficulty: number;
  stability: number;
  reps: number;
  lapses: number;
  lastReviewAt: string | null;
};

export type NurAgentRequest = {
  version: 1;
  previousRunId: string | null;
  courseId: string;
  courseSlug: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
  currentText: string;
  requestRewrite: boolean;
  confirmedHistory: readonly NurAgentConfirmedHistoryInput[];
  // FSRS memory-state summary for each learning-memory criterion.
  // Client builds this from localStorage fsrsState; server trusts the read-only summary
  // (only contains difficulty/stability/lapses etc., no mutable operations).
  fsrsSummary: readonly FsrsCriterionSummary[] | null;
  // For private units from Course Builder private-material-analysis (learner-private + nur-qwen-generated).
  // When set, server uses supplied private task context (if provided) and applies private prompt boundary.
  // Never upgrades private material to official authority.
  privateRef?: "nur-qwen-private-ref" | null;
};

export type NurAgentOmission = {
  criterionId: string;
  memoryCriterionId: string;
  label: string;
  detail: string;
};

export type NurAgentNextStep = {
  criterionId: string;
  prompt: string;
};

export type NurAgentHistoryRelation = {
  criterionId: string;
  memoryCriterionId: string;
  relatedAttemptIds: readonly string[];
  summary: string;
};

export type NurAgentRewriteSuggestion = {
  criterionId: string;
  content: string;
};

// Typed learning tool proposals (model returns only; never auto-applied)
// Qwen (dashscope/qwen3.7-plus) returns structured proposals via narrow Function Call.
// Deterministic TS + explicit learner action own ALL mutations:
//   favorites, confirmed attempts (recordConfirmedAttempt), review tasks (proposeReviewTaskForAttempt),
//   redo, etc. Model never mutates state, never writes to learning-memory, never touches catalog/registry.
export type NurAgentRewriteProposal = {
  criterionId: string;
  rewrittenText: string;
  rationale: string;
  confidence: number;
};

export type NurAgentFavoriteProposal = {
  memoryCriterionId: string;
  label: string;
  rationale: string;
};

export type NurAgentReviewProposal = {
  memoryCriterionId: string;
  label: string;
  rationale: string;
  suggestedDueHours: number;
};

export type NurAgentSourceComparison = {
  sourceId: string;
  note: string;
  relationshipLabel: "可关联" | "帮助理解" | "不可直接等同";
};

export type NurAgentSourceStatement = {
  id: string;
  label: string;
  authority: SourceAuthority;
  status: "available" | "verified";
  locator: string;
};

export type NurAgentCapability =
  | "course-context.read"
  | "answer-structure.inspect"
  | "confirmed-history.compare"
  | "next-action.select";

export type NurAgentRunStep = {
  id: "resolve-context" | "inspect-answer" | "compare-history" | "select-action";
  capability: NurAgentCapability;
  label: string;
  summary: string;
};

export type NurAgentRun = {
  id: string;
  previousRunId: string | null;
  mode: "deterministic" | "model-assisted";
  status: "waiting-for-learner" | "completed";
  stopReason: "learner-input-required" | "structure-covered";
  steps: readonly NurAgentRunStep[];
};

export type NurAgentModelAssist = {
  status: "not-configured" | "used" | "failed";
  provider: {
    id: string;
    model: string;
  } | null;
  notice: string;
};

export type NurAgentResult = {
  version: 1;
  status: "agent-result";
  run: NurAgentRun;
  modelAssist: NurAgentModelAssist;
  scoringAuthority: ScoringAuthority;
  omissions: readonly NurAgentOmission[];
  nextStep: NurAgentNextStep | null;
  historyRelations: readonly NurAgentHistoryRelation[];
  rewriteSuggestion: NurAgentRewriteSuggestion | null;
  // New typed proposals from Qwen-powered provider (explicit human-in-the-loop apply only)
  // Model returns suggestions only. Deterministic TS + explicit learner actions own mutations
  // (favorites, recordConfirmedAttempt with private-${id}, proposeReviewTaskForAttempt, etc.).
  // Reuses existing learning-memory + private unit taskId/criterion mapping. No catalog/registry mutation.
  rewriteProposals?: readonly NurAgentRewriteProposal[];
  favoriteProposals?: readonly NurAgentFavoriteProposal[];
  reviewProposals?: readonly NurAgentReviewProposal[];
  sourceComparisons?: readonly NurAgentSourceComparison[];
  sources: readonly NurAgentSourceStatement[];
  authorityNotice: string;
  dataHandlingNotice: string;
};

export type NurAgentErrorCode =
  | "invalid-request"
  | "runtime-failed";

export type NurAgentErrorResponse = {
  version: 1;
  status: "error";
  code: NurAgentErrorCode;
  message: string;
  deterministicFallbackAvailable: true;
};

export type NurAgentApiResponse = NurAgentResult | NurAgentErrorResponse;

export type NurAgentToolResult = {
  type: "structural-analysis";
  omissions: readonly NurAgentOmission[];
  nextStep: NurAgentNextStep | null;
  rewriteSuggestion: NurAgentRewriteSuggestion | null;
  rewriteProposals: readonly NurAgentRewriteProposal[];
  reviewProposals: readonly NurAgentReviewProposal[];
  sources: readonly NurAgentSourceStatement[];
  error?: string;
};

export type NurChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolResults?: readonly NurAgentToolResult[];
};
