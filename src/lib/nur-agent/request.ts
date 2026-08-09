import type {
  FsrsCriterionSummary,
  NurAgentConfirmedHistoryInput,
  NurAgentRequest,
} from "@/types/nur-agent";

const maxIdentifierLength = 160;
const maxCurrentTextLength = 12000;
const maxHistoryTextLength = 4000;
const maxHistoryItems = 8;
const maxFsrsSummaryItems = 200;

export class NurAgentRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NurAgentRequestError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readIdentifier(value: unknown, field: string): string {
  if (typeof value !== "string"
    || value.trim().length === 0
    || value.length > maxIdentifierLength
  ) {
    throw new NurAgentRequestError(`${field} is invalid`);
  }
  return value;
}

function readNullableIdentifier(value: unknown, field: string): string | null {
  return value === null ? null : readIdentifier(value, field);
}

function readSurface(value: unknown): NurAgentRequest["surface"] {
  if (value !== "subjective-writing" && value !== "case-reasoning") {
    throw new NurAgentRequestError("surface is invalid");
  }
  return value;
}

function readText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string"
    || value.trim().length === 0
    || value.length > maxLength
  ) {
    throw new NurAgentRequestError(`${field} is invalid`);
  }
  return value.trim();
}

function parseHistoryItem(value: unknown): NurAgentConfirmedHistoryInput {
  if (!isRecord(value)) {
    throw new NurAgentRequestError("confirmedHistory item is invalid");
  }
  return {
    attemptId: readIdentifier(value.attemptId, "confirmedHistory.attemptId"),
    surface: readSurface(value.surface),
    taskId: readIdentifier(value.taskId, "confirmedHistory.taskId"),
    segmentId: readNullableIdentifier(value.segmentId, "confirmedHistory.segmentId"),
    confirmedText: readText(
      value.confirmedText,
      "confirmedHistory.confirmedText",
      maxHistoryTextLength,
    ),
  };
}

function parseFsrsSummary(value: unknown): readonly FsrsCriterionSummary[] | null {
  if (value === null || value === undefined) return null;
  if (!Array.isArray(value) || value.length > maxFsrsSummaryItems) {
    throw new NurAgentRequestError("fsrsSummary is invalid");
  }
  if (value.length === 0) return null;
  return value.map((item, idx) => {
    if (!isRecord(item)) {
      throw new NurAgentRequestError(`fsrsSummary[${idx}] is invalid`);
    }
    const memoryCriterionId = readIdentifier(
      item.memoryCriterionId,
      `fsrsSummary[${idx}].memoryCriterionId`,
    );
    if (item.state !== "new" && item.state !== "learning"
      && item.state !== "review" && item.state !== "relearning") {
      throw new NurAgentRequestError(`fsrsSummary[${idx}].state is invalid`);
    }
    for (const field of ["difficulty", "stability", "reps", "lapses"] as const) {
      if (typeof item[field] !== "number" || !Number.isFinite(item[field] as number)) {
        throw new NurAgentRequestError(`fsrsSummary[${idx}].${field} is invalid`);
      }
    }
    if (item.lastReviewAt !== null && typeof item.lastReviewAt !== "string") {
      throw new NurAgentRequestError(`fsrsSummary[${idx}].lastReviewAt is invalid`);
    }
    return {
      memoryCriterionId,
      state: item.state,
      difficulty: item.difficulty as number,
      stability: item.stability as number,
      reps: item.reps as number,
      lapses: item.lapses as number,
      lastReviewAt: item.lastReviewAt as string | null,
    };
  });
}

export function parseNurAgentRequest(value: unknown): NurAgentRequest {
  if (!isRecord(value) || value.version !== 1) {
    throw new NurAgentRequestError("request version is invalid");
  }
  if (!Array.isArray(value.confirmedHistory)
    || value.confirmedHistory.length > maxHistoryItems
  ) {
    throw new NurAgentRequestError("confirmedHistory is invalid");
  }
  if (typeof value.requestRewrite !== "boolean") {
    throw new NurAgentRequestError("requestRewrite is invalid");
  }

  const confirmedHistory = value.confirmedHistory.map(parseHistoryItem);
  if (new Set(confirmedHistory.map((item) => item.attemptId)).size !== confirmedHistory.length) {
    throw new NurAgentRequestError("confirmedHistory attempt ids must be unique");
  }

  // privateRef is optional marker for learner-private units (from Course Builder).
  // When present, context resolution and prompt use distinct authority boundary.
  let privateRef: "nur-qwen-private-ref" | null = null;
  if (value.privateRef !== undefined) {
    if (value.privateRef === "nur-qwen-private-ref" || value.privateRef === null) {
      privateRef = value.privateRef === "nur-qwen-private-ref" ? "nur-qwen-private-ref" : null;
    } else {
      throw new NurAgentRequestError("privateRef is invalid");
    }
  }

  return {
    version: 1,
    previousRunId: value.previousRunId === undefined
      ? null
      : readNullableIdentifier(value.previousRunId, "previousRunId"),
    courseId: readIdentifier(value.courseId, "courseId"),
    courseSlug: readIdentifier(value.courseSlug, "courseSlug"),
    courseVersionId: readIdentifier(value.courseVersionId, "courseVersionId"),
    offeringId: readIdentifier(value.offeringId, "offeringId"),
    knowledgePointId: readIdentifier(value.knowledgePointId, "knowledgePointId"),
    surface: readSurface(value.surface),
    taskId: readIdentifier(value.taskId, "taskId"),
    segmentId: readNullableIdentifier(value.segmentId, "segmentId"),
    currentText: readText(value.currentText, "currentText", maxCurrentTextLength),
    requestRewrite: value.requestRewrite,
    confirmedHistory,
    fsrsSummary: parseFsrsSummary(value.fsrsSummary),
    privateRef,
  };
}
