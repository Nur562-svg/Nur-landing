import type {
  PrivateMaterialAnalysisResult,
  PrivateMaterialLearningQuestion,
  PrivateMaterialLearningUnitDraft,
} from "@/types/course-builder";
import type { ConfirmedAttemptInput } from "@/lib/learning-memory";
import { learningMemoryChangeEvent } from "@/lib/learning-memory";
import { privateQuestionChoices } from "@/lib/private-practice";
import type { PrivateJudgementBasis } from "@/lib/private-practice";

export type { PrivateMaterialAnalysisResult };

export type PrivateObjectiveAttemptRecord = {
  questionId: string;
  unitId: string;
  prompt: string;
  questionKind: "a1-single" | "fill";
  selectedText: string;
  isCorrect: boolean;
  basis: PrivateJudgementBasis;
  attemptedAt: string;
};

export const PRIVATE_OBJECTIVE_ATTEMPTS_KEY = "nur-learn:private-objective-attempts:v1";
const maxPrivateObjectiveAttemptsPerQuestion = 30;

export function selectPrivatePracticeHref(unitId?: string | null): string {
  if (!unitId) {
    return "/learn/my-materials";
  }
  return `/learn/my-materials?unit=${encodeURIComponent(unitId)}`;
}

export function privateAttemptText(options: {
  question: PrivateMaterialLearningQuestion;
  draft: string;
  selectedIndex: number | null;
}): string {
  const { question, draft, selectedIndex } = options;
  if (question.questionKind === "a1-single") {
    const choices = privateQuestionChoices(question);
    if (selectedIndex === null || selectedIndex < 0 || selectedIndex >= choices.length) {
      return draft.trim();
    }
    return `${String.fromCharCode(65 + selectedIndex)}. ${choices[selectedIndex]}`;
  }
  return draft.trim();
}

export function buildPrivateConfirmedAttemptInput(options: {
  question: PrivateMaterialLearningQuestion;
  unit: PrivateMaterialLearningUnitDraft;
  analysisId: string;
  confirmedText: string;
  objectiveCorrect: boolean | null;
}): ConfirmedAttemptInput {
  const { question, unit, analysisId, confirmedText, objectiveCorrect } = options;
  const structurePoints = question.generatedReferenceAnswer.structurePoints;
  const defaultStatus = objectiveCorrect === false ? "missing" as const : "present" as const;
  const criterionResults = structurePoints.length > 0
    ? structurePoints.map((_point, index) => ({
      criterionId: `${question.id}-point-${index}`,
      memoryCriterionId: `${question.id}-point-${index}`,
      status: defaultStatus,
    }))
    : [{
      criterionId: `${question.id}-default`,
      memoryCriterionId: `${question.id}-default`,
      status: defaultStatus,
    }];

  return {
    courseId: unit.courseId,
    courseVersionId: "private-current-session",
    offeringId: "private",
    knowledgePointId: unit.knowledgePointId,
    surface: "subjective-writing",
    taskId: `private-${question.id}`,
    segmentId: null,
    confirmedText,
    scoringStandard: {
      id: "nur-qwen-private-ref",
      version: analysisId || "1",
      authority: "nur-platform",
    },
    criterionResults,
    answerConfidence: "unverified",
  };
}

export function privatePracticeStorageKey(analysis: PrivateMaterialAnalysisResult): string {
  return `nur-learn:private-practice-state:${analysis.learningUnit.id}`;
}

export const PRIVATE_CURRENT_ANALYSIS_KEY = "nur-learn:private-practice-analysis:v1";
export const PRIVATE_ANALYSIS_HISTORY_KEY = "nur-learn:private-practice-history:v1";

export type PrivatePracticeHistoryEntry = {
  unitId: string;
  savedAt: string;
  questionCount: number;
  coverageSummary: string;
  titleHint?: string;
};

/** 持久化当前分析结果 + 推入有限历史（最多保留 5 个，同一单元去重） */
export function savePrivateAnalysisResult(result: PrivateMaterialAnalysisResult): void {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify(result);
    window.localStorage.setItem(PRIVATE_CURRENT_ANALYSIS_KEY, serialized);

    // 历史
    const rawHistory = window.localStorage.getItem(PRIVATE_ANALYSIS_HISTORY_KEY);
    let history: PrivateMaterialAnalysisResult[] = [];
    if (rawHistory) {
      try {
        const parsed = JSON.parse(rawHistory);
        if (Array.isArray(parsed)) history = parsed.filter(isAnalysisResult);
      } catch {
        // ignore corrupt
      }
    }

    // 去重 + 最新在前
    history = history.filter((h) => h.learningUnit.id !== result.learningUnit.id);
    history.unshift(result);
    if (history.length > 5) history = history.slice(0, 5);

    window.localStorage.setItem(PRIVATE_ANALYSIS_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // storage quota or other; silently skip
  }
}

export function loadCurrentPrivateAnalysis(): PrivateMaterialAnalysisResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PRIVATE_CURRENT_ANALYSIS_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isAnalysisResult(parsed) ? parsed : null;
  } catch {
    window.localStorage.removeItem(PRIVATE_CURRENT_ANALYSIS_KEY);
    return null;
  }
}

export function loadPrivateAnalysisHistory(): PrivateMaterialAnalysisResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PRIVATE_ANALYSIS_HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isAnalysisResult);
  } catch {
    window.localStorage.removeItem(PRIVATE_ANALYSIS_HISTORY_KEY);
    return [];
  }
}

export function clearPrivateAnalysisHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PRIVATE_CURRENT_ANALYSIS_KEY);
    window.localStorage.removeItem(PRIVATE_ANALYSIS_HISTORY_KEY);
  } catch {}
}

/** 内部类型守卫，复用 studio 逻辑但在此处暴露 */
function isAnalysisResult(value: unknown): value is PrivateMaterialAnalysisResult {
  if (typeof value !== "object" || value === null || !("status" in value) || !("learningUnit" in value)) {
    return false;
  }
  const v = value as Record<string, unknown>;
  return v.status === "private-material-analysis";
}

function isPrivateObjectiveAttempt(value: unknown): value is PrivateObjectiveAttemptRecord {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return typeof record.questionId === "string"
    && typeof record.unitId === "string"
    && typeof record.prompt === "string"
    && (record.questionKind === "a1-single" || record.questionKind === "fill")
    && typeof record.selectedText === "string"
    && typeof record.isCorrect === "boolean"
    && (record.basis === "source-candidate" || record.basis === "qwen-reference" || record.basis === "unavailable")
    && typeof record.attemptedAt === "string";
}

export function parsePrivateObjectiveAttemptsJson(
  raw: string | null,
): Record<string, PrivateObjectiveAttemptRecord[]> {
  if (!raw) {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return {};
    }
    const result: Record<string, PrivateObjectiveAttemptRecord[]> = {};
    for (const [questionId, records] of Object.entries(parsed as Record<string, unknown>)) {
      if (!Array.isArray(records)) {
        continue;
      }
      const valid = records.filter(isPrivateObjectiveAttempt);
      if (valid.length > 0) {
        result[questionId] = valid;
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function getAllPrivateObjectiveAttempts(): Record<string, PrivateObjectiveAttemptRecord[]> {
  if (typeof window === "undefined") {
    return {};
  }
  return parsePrivateObjectiveAttemptsJson(window.localStorage.getItem(PRIVATE_OBJECTIVE_ATTEMPTS_KEY));
}

export function addPrivateObjectiveAttempt(record: PrivateObjectiveAttemptRecord): void {
  if (typeof window === "undefined") {
    return;
  }
  const all = getAllPrivateObjectiveAttempts();
  const existing = all[record.questionId] ?? [];
  all[record.questionId] = [...existing, record].slice(-maxPrivateObjectiveAttemptsPerQuestion);
  try {
    window.localStorage.setItem(PRIVATE_OBJECTIVE_ATTEMPTS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event(learningMemoryChangeEvent));
  } catch {
    // storage unavailable
  }
}
