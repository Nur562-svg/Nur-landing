import type {
  MaterialIntakeBatch,
  MaterialIntakeCourseOption,
  MaterialIntakeDimension,
  MaterialIntakeDraft,
  MaterialIntakeFileCandidate,
  MaterialIntakeKnownAssetIdentity,
  MaterialIntakePrivacyDeclaration,
  MaterialIntakeValidation,
  MaterialIntakeValidationIssue,
} from "@/types/material-intake";
import type {
  MaterialPrivacyRisk,
  SourceAuthority,
  SourceType,
} from "@/types/learning";

export const materialIntakeStorageKey = "nur-learn:material-intake-draft:v1";
const materialIntakeChangeEvent = "nur-learn:material-intake-change";

export const materialIntakeLimits = {
  version: 1,
  maxFileCount: 8,
  maxFileByteSize: 25 * 1024 * 1024,
  maxBatchByteSize: 80 * 1024 * 1024,
  acceptedExtensions: [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ],
} as const;

export const materialIntakeSourceTypes: readonly SourceType[] = [
  "textbook",
  "teacher-slide",
  "review-scope",
  "past-exam",
  "question-bank",
  "answer-key",
  "study-note",
  "experiment-manual",
  "image-set",
  "grading-rubric",
];

export const materialIntakeAuthorities: readonly SourceAuthority[] = [
  "student",
  "teacher",
  "school",
  "publisher",
  "nur-editorial",
];

export const materialIntakePrivacyRisks: readonly MaterialPrivacyRisk[] = [
  "document-metadata",
  "blank-personal-fields",
  "identifiable-person",
  "none-observed",
];

export async function sha256MaterialIntakeFile(file: File) {
  const buffer = await file.arrayBuffer();
  const digest = await globalThis.crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const sha256Pattern = /^[a-f0-9]{64}$/;

const defaultDataHandlingNotice = "原始文件只在当前浏览器内存中用于计算 SHA-256；本增量不持久化二进制、不上传、不进入 public，也不触发 DashScope。";
const defaultAuthorityNotice = "所选 authority 只是用户申报，继续保持 pending-review；learner-private 记录不会自动升级为学校、教师或官方课程真相。";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isDimension(value: unknown): value is MaterialIntakeDimension {
  if (!isRecord(value) || (value.status !== "pending" && value.status !== "declared")) {
    return false;
  }
  return value.status === "pending"
    ? value.value === null
    : typeof value.value === "string" && value.value.trim().length > 0;
}

function isPrivacyDeclaration(value: unknown): value is MaterialIntakePrivacyDeclaration {
  return value === "unknown"
    || value === "contains-private-information"
    || value === "none-observed";
}

function isCandidate(value: unknown): value is MaterialIntakeFileCandidate {
  if (!isRecord(value)
    || typeof value.id !== "string"
    || typeof value.name !== "string"
    || typeof value.extension !== "string"
    || !materialIntakeLimits.acceptedExtensions.includes(value.extension as never)
    || typeof value.mimeType !== "string"
    || !["pdf", "word", "presentation", "image"].includes(String(value.mediaType))
    || !Number.isInteger(value.byteSize)
    || Number(value.byteSize) < 1
    || Number(value.byteSize) > materialIntakeLimits.maxFileByteSize
    || !Number.isInteger(value.lastModified)
    || !sha256Pattern.test(String(value.sha256))
    || !["pending-review", "duplicate-in-batch", "duplicate-in-catalog"].includes(String(value.disposition))
    || value.parsingStatus !== "pending"
    || value.parsingLabel !== "待解析"
    || value.transcriptionStatus !== "ocr-pending"
    || value.integrityStatus !== "pending-review"
    || !materialIntakePrivacyRisks.includes(value.privacyRisk as MaterialPrivacyRisk)
    || !["local-only", "structured-excerpts-only"].includes(String(value.publicationPolicy))
    || value.academicContentStatus !== "pending"
    || value.authorityReviewStatus !== "pending-review"
    || value.conflictReviewStatus !== "pending-review"
    || !isRecord(value.duplicate)
    || !["none", "batch", "catalog"].includes(String(value.duplicate.kind))
  ) {
    return false;
  }

  if (value.duplicate.kind === "none") {
    return value.duplicate.matchedCandidateId === null
      && value.duplicate.matchedAssetId === null
      && value.disposition === "pending-review";
  }
  if (value.duplicate.kind === "batch") {
    return typeof value.duplicate.matchedCandidateId === "string"
      && value.duplicate.matchedAssetId === null
      && value.disposition === "duplicate-in-batch";
  }
  return value.duplicate.matchedCandidateId === null
    && typeof value.duplicate.matchedAssetId === "string"
    && value.disposition === "duplicate-in-catalog";
}

function isBatch(value: unknown): value is MaterialIntakeBatch {
  if (!isRecord(value)
    || typeof value.id !== "string"
    || !isIsoDate(value.createdAt)
    || !isIsoDate(value.updatedAt)
    || !Array.isArray(value.files)
    || value.files.length > materialIntakeLimits.maxFileCount
    || !value.files.every(isCandidate)
    || !Array.isArray(value.rejectedFiles)
    || !value.rejectedFiles.every((file) => (
      isRecord(file)
      && typeof file.id === "string"
      && typeof file.name === "string"
      && Number.isInteger(file.byteSize)
      && Number(file.byteSize) >= 0
      && ["unsupported-type", "file-count-limit", "file-size-limit", "batch-size-limit", "hash-failed"].includes(String(file.reason))
      && typeof file.notice === "string"
    ))
    || !Number.isInteger(value.totalByteSize)
  ) {
    return false;
  }
  const total = value.files.reduce((sum, file) => sum + file.byteSize, 0);
  return total === value.totalByteSize && total <= materialIntakeLimits.maxBatchByteSize;
}

function isDraft(value: unknown): value is MaterialIntakeDraft {
  if (!isRecord(value)
    || value.version !== 1
    || (value.id !== null && typeof value.id !== "string")
    || (value.createdAt !== null && !isIsoDate(value.createdAt))
    || (value.updatedAt !== null && !isIsoDate(value.updatedAt))
    || !["draft", "pending-review", "eligible-for-course-builder"].includes(String(value.status))
    || (value.batch !== null && !isBatch(value.batch))
    || !isRecord(value.provenance)
    || typeof value.provenance.courseId !== "string"
    || !materialIntakeSourceTypes.includes(value.provenance.sourceType as SourceType)
    || !materialIntakeAuthorities.includes(value.provenance.declaredAuthority as SourceAuthority)
    || value.provenance.authorityReviewStatus !== "pending-review"
    || value.provenance.layer !== "learner-private"
    || !isDimension(value.provenance.school)
    || !isDimension(value.provenance.teacher)
    || !isDimension(value.provenance.academicYear)
    || !isDimension(value.provenance.semester)
    || !isRecord(value.provenance.sourceFamily)
    || !["separate-source-families", "single-source-family"].includes(String(value.provenance.sourceFamily.mode))
    || typeof value.provenance.sourceFamily.label !== "string"
    || value.provenance.sourceFamily.reviewStatus !== "pending-review"
    || !isRecord(value.privacy)
    || !isPrivacyDeclaration(value.privacy.declaration)
    || !materialIntakePrivacyRisks.includes(value.privacy.risk as MaterialPrivacyRisk)
    || !["local-only", "structured-excerpts-only"].includes(String(value.privacy.publicationPolicy))
    || value.privacy.rawFileHandling !== "browser-memory-only"
    || value.privacy.modelTransferPolicy !== "not-authorized"
    || !isRecord(value.review)
    || typeof value.review.fileIdentityConfirmed !== "boolean"
    || typeof value.review.provenanceConfirmed !== "boolean"
    || typeof value.review.privacyPublicationConfirmed !== "boolean"
    || typeof value.review.noModelTransferConfirmed !== "boolean"
    || !["pending-review", "confirmed"].includes(String(value.review.status))
    || (value.review.confirmedAt !== null && !isIsoDate(value.review.confirmedAt))
    || typeof value.dataHandlingNotice !== "string"
    || typeof value.authorityNotice !== "string"
  ) {
    return false;
  }
  return (
    value.id === null
    && value.createdAt === null
    && value.updatedAt === null
  ) || (
    typeof value.id === "string"
    && value.createdAt !== null
    && value.updatedAt !== null
  );
}

export function pendingMaterialIntakeDimension(): MaterialIntakeDimension {
  return { status: "pending", value: null };
}

export function materialIntakeDimensionFromInput(value: string): MaterialIntakeDimension {
  const normalized = value.trim();
  return normalized.length === 0 || normalized === "待确认"
    ? pendingMaterialIntakeDimension()
    : { status: "declared", value: normalized };
}

export function materialIntakeDimensionInputValue(value: MaterialIntakeDimension): string {
  return value.status === "pending" ? "待确认" : value.value;
}

export function createEmptyMaterialIntakeDraft(
  defaultCourseId: string,
): MaterialIntakeDraft {
  return {
    version: 1,
    id: null,
    createdAt: null,
    updatedAt: null,
    status: "draft",
    batch: null,
    provenance: {
      courseId: defaultCourseId,
      sourceType: "study-note",
      declaredAuthority: "student",
      authorityReviewStatus: "pending-review",
      layer: "learner-private",
      school: pendingMaterialIntakeDimension(),
      teacher: pendingMaterialIntakeDimension(),
      academicYear: pendingMaterialIntakeDimension(),
      semester: pendingMaterialIntakeDimension(),
      sourceFamily: {
        mode: "separate-source-families",
        label: "待确认",
        reviewStatus: "pending-review",
      },
    },
    privacy: {
      declaration: "unknown",
      risk: "document-metadata",
      publicationPolicy: "local-only",
      rawFileHandling: "browser-memory-only",
      modelTransferPolicy: "not-authorized",
    },
    review: {
      fileIdentityConfirmed: false,
      provenanceConfirmed: false,
      privacyPublicationConfirmed: false,
      noModelTransferConfirmed: false,
      status: "pending-review",
      confirmedAt: null,
    },
    dataHandlingNotice: defaultDataHandlingNotice,
    authorityNotice: defaultAuthorityNotice,
  };
}

export function createMaterialIntakeBatch(
  files: readonly MaterialIntakeFileCandidate[],
  rejectedFiles: MaterialIntakeBatch["rejectedFiles"],
): MaterialIntakeBatch {
  const now = new Date().toISOString();
  return {
    id: window.crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    files,
    rejectedFiles,
    totalByteSize: files.reduce((sum, file) => sum + file.byteSize, 0),
  };
}

export function setMaterialIntakeBatch(
  draft: MaterialIntakeDraft,
  batch: MaterialIntakeBatch | null,
): MaterialIntakeDraft {
  const now = new Date().toISOString();
  return {
    ...draft,
    id: draft.id ?? window.crypto.randomUUID(),
    createdAt: draft.createdAt ?? now,
    updatedAt: now,
    status: "draft",
    batch,
    review: {
      fileIdentityConfirmed: false,
      provenanceConfirmed: false,
      privacyPublicationConfirmed: false,
      noModelTransferConfirmed: false,
      status: "pending-review",
      confirmedAt: null,
    },
  };
}

export function reviseMaterialIntakeBatch(
  batch: MaterialIntakeBatch,
  files: readonly MaterialIntakeFileCandidate[],
  rejectedFiles: MaterialIntakeBatch["rejectedFiles"],
): MaterialIntakeBatch {
  return {
    ...batch,
    updatedAt: new Date().toISOString(),
    files,
    rejectedFiles,
    totalByteSize: files.reduce((sum, file) => sum + file.byteSize, 0),
  };
}

export function touchMaterialIntakeDraft(
  draft: MaterialIntakeDraft,
  changes: Partial<Pick<MaterialIntakeDraft, "provenance" | "privacy" | "review">>,
): MaterialIntakeDraft {
  const now = new Date().toISOString();
  return {
    ...draft,
    ...changes,
    id: draft.id ?? window.crypto.randomUUID(),
    createdAt: draft.createdAt ?? now,
    updatedAt: now,
    status: "draft",
    review: changes.review ?? {
      ...draft.review,
      fileIdentityConfirmed: false,
      provenanceConfirmed: false,
      privacyPublicationConfirmed: false,
      noModelTransferConfirmed: false,
      status: "pending-review",
      confirmedAt: null,
    },
  };
}

function addIssue(
  issues: MaterialIntakeValidationIssue[],
  code: MaterialIntakeValidationIssue["code"],
  path: string,
  message: string,
) {
  issues.push({ code, path, message });
}

export function validateMaterialIntakeDraft(
  draft: MaterialIntakeDraft,
  courseOptions: readonly MaterialIntakeCourseOption[],
  knownAssets: readonly MaterialIntakeKnownAssetIdentity[],
): MaterialIntakeValidation {
  const issues: MaterialIntakeValidationIssue[] = [];
  const knownCourseIds = new Set(courseOptions.map((course) => course.id));
  const knownHashes = new Map(knownAssets.map((asset) => [asset.sha256, asset.assetId]));
  const files = draft.batch?.files ?? [];

  if (files.length === 0) {
    addIssue(issues, "missing-files", "batch.files", "请先选择至少一份符合边界的文件。" );
  }
  if ((draft.batch?.rejectedFiles.length ?? 0) > 0) {
    addIssue(issues, "rejected-files", "batch.rejectedFiles", "本批仍有超限或不支持的文件，请重新选择合规批次。" );
  }
  const seenHashes = new Map<string, string>();
  files.forEach((file, index) => {
    if (!sha256Pattern.test(file.sha256)) {
      addIssue(issues, "invalid-identity", `batch.files[${index}].sha256`, "SHA-256 身份无效。" );
    }
    const batchMatch = seenHashes.get(file.sha256);
    const catalogMatch = knownHashes.get(file.sha256);
    if (batchMatch || catalogMatch || file.duplicate.kind !== "none") {
      addIssue(issues, "duplicate-file", `batch.files[${index}].duplicate`, "重复文件不能作为新的 intake 候选进入后续建课。" );
    }
    seenHashes.set(file.sha256, file.id);
  });
  if (!knownCourseIds.has(draft.provenance.courseId)) {
    addIssue(issues, "course-required", "provenance.courseId", "必须确认一个已注册课程。" );
  }
  if (draft.provenance.sourceFamily.label.trim().length === 0) {
    addIssue(issues, "family-label-required", "provenance.sourceFamily.label", "必须填写来源家庭标签或明确待确认。" );
  }
  if (draft.privacy.declaration === "unknown") {
    addIssue(issues, "privacy-required", "privacy.declaration", "必须确认文件是否包含隐私信息。" );
  }
  if (
    draft.privacy.declaration === "contains-private-information"
    && draft.privacy.risk === "none-observed"
  ) {
    addIssue(issues, "privacy-required", "privacy.risk", "已声明包含隐私时，风险不能标为未观察到。" );
  }
  if (
    draft.privacy.declaration === "none-observed"
    && draft.privacy.risk !== "none-observed"
  ) {
    addIssue(issues, "privacy-required", "privacy.risk", "隐私声明与风险状态不一致，请重新确认。" );
  }
  if (
    draft.privacy.risk === "identifiable-person"
    && draft.privacy.publicationPolicy !== "local-only"
  ) {
    addIssue(issues, "privacy-required", "privacy.publicationPolicy", "含可识别人物的材料必须保持 local-only。" );
  }

  const hardIssueCount = issues.length;
  const reviewChecks = [
    draft.review.fileIdentityConfirmed,
    draft.review.provenanceConfirmed,
    draft.review.privacyPublicationConfirmed,
    draft.review.noModelTransferConfirmed,
  ];
  if (!reviewChecks.every(Boolean)) {
    addIssue(issues, "review-required", "review", "四项人工确认尚未全部完成。" );
  }

  const readyForHumanConfirmation = hardIssueCount === 0;
  const eligibleForCourseBuilder = readyForHumanConfirmation
    && reviewChecks.every(Boolean)
    && draft.review.status === "confirmed"
    && draft.review.confirmedAt !== null;

  return {
    valid: issues.length === 0,
    readyForHumanConfirmation,
    eligibleForCourseBuilder,
    issues,
  };
}

export function parseMaterialIntakeDraftJson(
  value: string | null,
  fallback: MaterialIntakeDraft,
  courseOptions: readonly MaterialIntakeCourseOption[],
  knownAssets: readonly MaterialIntakeKnownAssetIdentity[],
): MaterialIntakeDraft {
  if (value === null) {
    return fallback;
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (!isDraft(parsed)) {
      return fallback;
    }
    const courseIds = new Set(courseOptions.map((course) => course.id));
    if (!courseIds.has(parsed.provenance.courseId)) {
      return fallback;
    }
    const validation = validateMaterialIntakeDraft(parsed, courseOptions, knownAssets);
    if (parsed.status === "eligible-for-course-builder" && !validation.eligibleForCourseBuilder) {
      return { ...parsed, status: "draft", review: { ...parsed.review, status: "pending-review", confirmedAt: null } };
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export function saveMaterialIntakeDraft(draft: MaterialIntakeDraft): void {
  window.localStorage.setItem(materialIntakeStorageKey, JSON.stringify(draft));
  window.dispatchEvent(new Event(materialIntakeChangeEvent));
}

export function getMaterialIntakeStorageSnapshot(): string | null {
  return window.localStorage.getItem(materialIntakeStorageKey);
}

export function subscribeToMaterialIntake(onStoreChange: () => void): () => void {
  const handleStoreChange = () => onStoreChange();
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(materialIntakeChangeEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(materialIntakeChangeEvent, handleStoreChange);
  };
}

export function confirmMaterialIntakeDraft(draft: MaterialIntakeDraft): MaterialIntakeDraft {
  const now = new Date().toISOString();
  return {
    ...draft,
    updatedAt: now,
    status: "eligible-for-course-builder",
    review: {
      ...draft.review,
      status: "confirmed",
      confirmedAt: now,
    },
  };
}
