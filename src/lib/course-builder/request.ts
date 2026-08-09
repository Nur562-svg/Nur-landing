import type {
  CourseBuildPrivateOverlayExcerpt,
  CourseBuildPrivateOverlayInput,
  CourseBuilderApiRequest,
  CourseBuildRequest,
  KnownPackCourseBuildRequest,
  PrivateMaterialAnalysisAuthorization,
  PrivateMaterialAnalysisRequest,
  PrivateOverlayCourseBuildRequest,
  PrivateOverlayTransferAuthorization,
} from "@/types/course-builder";
import type { SourceAuthority, SourceType } from "@/types/learning";
import {
  maximumPrivateOverlayCharacterCount,
  maximumPrivateOverlayExcerptCount,
} from "./private-overlay-contract";

export class CourseBuildRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CourseBuildRequestError";
  }
}

const sourceTypes: readonly SourceType[] = [
  "textbook",
  "teacher-slide",
  "review-scope",
  "past-exam",
  "question-bank",
  "answer-key",
  "study-note",
  "experiment-manual",
  "image-set",
  "transcription",
  "grading-rubric",
  "editorial",
  "clinical-reference",
];

const sourceAuthorities: readonly SourceAuthority[] = [
  "publisher",
  "school",
  "teacher",
  "student",
  "nur-editorial",
  "clinical-authority",
];

const stableIdPattern = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$/;
const sha256Pattern = /^[a-f0-9]{64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasOnlyKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const allowed = new Set(keys);
  return Object.keys(value).every((key) => allowed.has(key));
}

function isBoundedString(value: unknown, maximumLength: number): value is string {
  return typeof value === "string"
    && value.trim().length > 0
    && value.length <= maximumLength;
}

function isStableId(value: unknown): value is string {
  return typeof value === "string" && stableIdPattern.test(value);
}

function parseKnownPackRequest(value: Record<string, unknown>): KnownPackCourseBuildRequest {
  if (!hasOnlyKeys(value, ["version", "materialPackId", "mode"])
    || !isBoundedString(value.materialPackId, 120)
    || (value.mode !== "provider-preferred" && value.mode !== "baseline-only")
  ) {
    throw new CourseBuildRequestError("Invalid known-pack Course Builder request");
  }
  return {
    version: 1,
    materialPackId: value.materialPackId,
    mode: value.mode,
  };
}

function parsePrivateExcerpt(value: unknown): CourseBuildPrivateOverlayExcerpt {
  if (!isRecord(value)
    || !hasOnlyKeys(value, ["id", "sectionId", "sectionTitle", "kind", "text", "locator"])
    || !isStableId(value.id)
    || !isStableId(value.sectionId)
    || !isBoundedString(value.sectionTitle, 240)
    || !["heading", "paragraph", "list-item", "table-cell"].includes(String(value.kind))
    || !isBoundedString(value.text, maximumPrivateOverlayCharacterCount)
    || !isRecord(value.locator)
    || !hasOnlyKeys(value.locator, ["kind", "label", "blockIndex"])
    || value.locator.kind !== "docx-semantic-block"
    || !isBoundedString(value.locator.label, 160)
    || !Number.isInteger(value.locator.blockIndex)
    || Number(value.locator.blockIndex) < 1
  ) {
    throw new CourseBuildRequestError("Invalid private overlay excerpt");
  }
  return {
    id: value.id,
    sectionId: value.sectionId,
    sectionTitle: value.sectionTitle,
    kind: value.kind as CourseBuildPrivateOverlayExcerpt["kind"],
    text: value.text,
    locator: {
      kind: "docx-semantic-block",
      label: value.locator.label,
      blockIndex: Number(value.locator.blockIndex),
    },
  };
}

function parsePrivateOverlay(value: unknown): CourseBuildPrivateOverlayInput {
  if (!isRecord(value)
    || !hasOnlyKeys(value, [
      "version",
      "overlayId",
      "courseId",
      "knowledgePointId",
      "source",
      "privacy",
      "excerpts",
    ])
    || value.version !== 1
    || !isStableId(value.overlayId)
    || !isStableId(value.courseId)
    || !isStableId(value.knowledgePointId)
    || !isRecord(value.source)
    || !hasOnlyKeys(value.source, [
      "sourceType",
      "declaredAuthority",
      "layer",
      "authorityReviewStatus",
    ])
    || !sourceTypes.includes(value.source.sourceType as SourceType)
    || !sourceAuthorities.includes(value.source.declaredAuthority as SourceAuthority)
    || value.source.layer !== "learner-private"
    || value.source.authorityReviewStatus !== "pending-review"
    || !isRecord(value.privacy)
    || !hasOnlyKeys(value.privacy, ["declaration", "risk", "publicationPolicy"])
    || value.privacy.declaration !== "none-observed"
    || value.privacy.risk !== "none-observed"
    || (value.privacy.publicationPolicy !== "local-only"
      && value.privacy.publicationPolicy !== "structured-excerpts-only")
    || !Array.isArray(value.excerpts)
    || value.excerpts.length < 1
    || value.excerpts.length > maximumPrivateOverlayExcerptCount
  ) {
    throw new CourseBuildRequestError("Invalid private overlay request boundary");
  }

  const excerpts = value.excerpts.map(parsePrivateExcerpt);
  const excerptIds = excerpts.map((excerpt) => excerpt.id);
  const locatorIndexes = excerpts.map((excerpt) => excerpt.locator.blockIndex);
  const characterCount = excerpts.reduce((total, excerpt) => total + excerpt.text.length, 0);
  if (new Set(excerptIds).size !== excerptIds.length
    || new Set(locatorIndexes).size !== locatorIndexes.length
    || characterCount > maximumPrivateOverlayCharacterCount
  ) {
    throw new CourseBuildRequestError("Private overlay excerpt IDs or limits are invalid");
  }

  return {
    version: 1,
    overlayId: value.overlayId,
    courseId: value.courseId,
    knowledgePointId: value.knowledgePointId,
    source: {
      sourceType: value.source.sourceType as SourceType,
      declaredAuthority: value.source.declaredAuthority as SourceAuthority,
      layer: "learner-private",
      authorityReviewStatus: "pending-review",
    },
    privacy: {
      declaration: "none-observed",
      risk: "none-observed",
      publicationPolicy: value.privacy.publicationPolicy,
    },
    excerpts,
  };
}

function parseTransferAuthorization(
  value: unknown,
): PrivateOverlayTransferAuthorization {
  if (!isRecord(value)
    || !hasOnlyKeys(value, [
      "version",
      "id",
      "overlayId",
      "provider",
      "model",
      "courseId",
      "knowledgePointId",
      "excerptCount",
      "characterCount",
      "contentDigest",
      "scope",
      "status",
      "grant",
      "authorizedAt",
    ])
    || value.version !== 1
    || !isStableId(value.id)
    || !isStableId(value.overlayId)
    || value.provider !== "dashscope"
    || !isBoundedString(value.model, 120)
    || !isStableId(value.courseId)
    || !isStableId(value.knowledgePointId)
    || !Number.isInteger(value.excerptCount)
    || Number(value.excerptCount) < 1
    || Number(value.excerptCount) > maximumPrivateOverlayExcerptCount
    || !Number.isInteger(value.characterCount)
    || Number(value.characterCount) < 1
    || Number(value.characterCount) > maximumPrivateOverlayCharacterCount
    || typeof value.contentDigest !== "string"
    || !sha256Pattern.test(value.contentDigest)
    || value.scope !== "one-course-build"
    || value.status !== "explicit"
    || value.grant !== "authorized-once"
    || typeof value.authorizedAt !== "string"
    || !Number.isFinite(Date.parse(value.authorizedAt))
  ) {
    throw new CourseBuildRequestError("Invalid private overlay authorization");
  }
  return {
    version: 1,
    id: value.id,
    overlayId: value.overlayId,
    provider: "dashscope",
    model: value.model,
    courseId: value.courseId,
    knowledgePointId: value.knowledgePointId,
    excerptCount: Number(value.excerptCount),
    characterCount: Number(value.characterCount),
    contentDigest: value.contentDigest,
    scope: "one-course-build",
    status: "explicit",
    grant: "authorized-once",
    authorizedAt: value.authorizedAt,
  };
}

function parsePrivateMaterialAnalysisAuthorization(
  value: unknown,
): PrivateMaterialAnalysisAuthorization {
  if (!isRecord(value)
    || !hasOnlyKeys(value, [
      "version",
      "id",
      "overlayId",
      "provider",
      "model",
      "courseId",
      "knowledgePointId",
      "excerptCount",
      "characterCount",
      "contentDigest",
      "scope",
      "status",
      "grant",
      "authorizedAt",
    ])
    || value.version !== 1
    || !isStableId(value.id)
    || !isStableId(value.overlayId)
    || value.provider !== "dashscope"
    || !isBoundedString(value.model, 120)
    || !isStableId(value.courseId)
    || !isStableId(value.knowledgePointId)
    || !Number.isInteger(value.excerptCount)
    || Number(value.excerptCount) < 1
    || Number(value.excerptCount) > maximumPrivateOverlayExcerptCount
    || !Number.isInteger(value.characterCount)
    || Number(value.characterCount) < 1
    || Number(value.characterCount) > maximumPrivateOverlayCharacterCount
    || typeof value.contentDigest !== "string"
    || !sha256Pattern.test(value.contentDigest)
    || value.scope !== "one-private-analysis"
    || value.status !== "explicit"
    || value.grant !== "authorized-once"
    || typeof value.authorizedAt !== "string"
    || !Number.isFinite(Date.parse(value.authorizedAt))
  ) {
    throw new CourseBuildRequestError("Invalid private material analysis authorization");
  }
  return {
    version: 1,
    id: value.id,
    overlayId: value.overlayId,
    provider: "dashscope",
    model: value.model,
    courseId: value.courseId,
    knowledgePointId: value.knowledgePointId,
    excerptCount: Number(value.excerptCount),
    characterCount: Number(value.characterCount),
    contentDigest: value.contentDigest,
    scope: "one-private-analysis",
    status: "explicit",
    grant: "authorized-once",
    authorizedAt: value.authorizedAt,
  };
}

function parsePrivateMaterialAnalysisRequest(
  value: Record<string, unknown>,
): PrivateMaterialAnalysisRequest {
  if (!hasOnlyKeys(value, [
    "version",
    "kind",
    "mode",
    "privateOverlay",
    "authorization",
  ])
    || value.version !== 1
    || value.kind !== "private-material-analysis"
    || value.mode !== "provider-required"
  ) {
    throw new CourseBuildRequestError("Invalid private material analysis request");
  }
  return {
    version: 1,
    kind: "private-material-analysis",
    mode: "provider-required",
    privateOverlay: parsePrivateOverlay(value.privateOverlay),
    authorization: parsePrivateMaterialAnalysisAuthorization(value.authorization),
  };
}

function parsePrivateOverlayRequest(
  value: Record<string, unknown>,
): PrivateOverlayCourseBuildRequest {
  if (!hasOnlyKeys(value, [
    "version",
    "baseMaterialPackId",
    "mode",
    "privateOverlay",
    "authorization",
  ])
    || !isBoundedString(value.baseMaterialPackId, 120)
    || value.mode !== "provider-preferred"
  ) {
    throw new CourseBuildRequestError("Invalid private Course Builder request");
  }
  return {
    version: 2,
    baseMaterialPackId: value.baseMaterialPackId,
    mode: "provider-preferred",
    privateOverlay: parsePrivateOverlay(value.privateOverlay),
    authorization: parseTransferAuthorization(value.authorization),
  };
}

export function parseCourseBuildRequest(value: unknown): CourseBuildRequest {
  if (!isRecord(value)) {
    throw new CourseBuildRequestError("Invalid Course Builder request");
  }
  if (value.version === 1) {
    return parseKnownPackRequest(value);
  }
  if (value.version === 2) {
    return parsePrivateOverlayRequest(value);
  }
  throw new CourseBuildRequestError("Unsupported Course Builder request version");
}

export function parseCourseBuilderApiRequest(value: unknown): CourseBuilderApiRequest {
  if (!isRecord(value)) {
    throw new CourseBuildRequestError("Invalid Course Builder request");
  }
  if (value.kind === "private-material-analysis") {
    return parsePrivateMaterialAnalysisRequest(value);
  }
  return parseCourseBuildRequest(value);
}
