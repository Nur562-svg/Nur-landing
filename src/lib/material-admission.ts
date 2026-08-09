import type {
  MaterialAdmissionExport,
  MaterialAdmissionRecord,
  MaterialAdmissionStore,
  MaterialAdmissionValidation,
  MaterialAdmissionValidationIssue,
} from "@/types/material-admission";
import {
  materialAdmissionExportVersion,
  materialAdmissionRecordVersion,
  materialAdmissionStoreVersion,
} from "@/types/material-admission";
import type { MaterialIntakeDimension } from "@/types/material-intake";
import type { ReviewedMaterialOverlayDraft } from "@/types/material-parsing";

export const materialAdmissionStorageKey = "nur-learn:material-admission-records:v1";
const materialAdmissionChangeEvent = "nur-learn:material-admission-change";
const maximumStoredAdmissionRecords = 32;
const maximumAdmissionExcerptCount = 80;
const maximumAdmissionCharacterCount = 40_000;
const sha256Pattern = /^[a-f0-9]{64}$/;

const sourceTypes = [
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
] as const;

const sourceAuthorities = [
  "publisher",
  "school",
  "teacher",
  "student",
  "nur-editorial",
  "clinical-authority",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const actualKeys = Object.keys(value).sort();
  const expectedKeys = [...keys].sort();
  return actualKeys.length === expectedKeys.length
    && actualKeys.every((key, index) => key === expectedKeys[index]);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isDimension(value: unknown): value is MaterialIntakeDimension {
  if (!isRecord(value) || !hasExactKeys(value, ["status", "value"])) {
    return false;
  }
  return value.status === "pending"
    ? value.value === null
    : value.status === "declared" && isNonEmptyString(value.value);
}

function isStringIn<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}

function isAdmissionRecordShape(value: unknown): value is MaterialAdmissionRecord {
  if (!isRecord(value) || !hasExactKeys(value, [
    "version",
    "id",
    "createdAt",
    "updatedAt",
    "status",
    "sourceTrace",
    "identity",
    "provenance",
    "catalogCandidate",
    "acceptedTranscription",
    "privacyPublication",
    "conflictReview",
    "authorityReview",
    "rights",
    "review",
    "notices",
  ])) {
    return false;
  }
  if (value.version !== materialAdmissionRecordVersion
    || !isNonEmptyString(value.id)
    || !isIsoDate(value.createdAt)
    || !isIsoDate(value.updatedAt)
    || !["pending-review", "approved-as-local-candidate"].includes(String(value.status))
  ) {
    return false;
  }

  const sourceTrace = value.sourceTrace;
  if (!isRecord(sourceTrace) || !hasExactKeys(sourceTrace, [
    "intakeDraftId",
    "intakeBatchId",
    "candidateId",
    "overlayId",
    "courseId",
    "courseTitle",
    "knowledgePointId",
    "knowledgePointTitle",
    "chapterTitle",
  ]) || !Object.values(sourceTrace).every(isNonEmptyString)) {
    return false;
  }

  const identity = value.identity;
  if (!isRecord(identity) || !hasExactKeys(identity, ["asset"]) || !isRecord(identity.asset)) {
    return false;
  }
  const asset = identity.asset;
  if (!hasExactKeys(asset, [
    "id",
    "sha256",
    "byteSize",
    "mediaType",
    "mimeType",
    "academicContentStatus",
    "transcriptionStatus",
    "integrityStatus",
    "privacyRisk",
    "publicationPolicy",
    "originalPathAliases",
  ])
    || !isNonEmptyString(asset.id)
    || typeof asset.sha256 !== "string"
    || !sha256Pattern.test(asset.sha256)
    || !Number.isInteger(asset.byteSize)
    || Number(asset.byteSize) < 1
    || asset.mediaType !== "word"
    || !isNonEmptyString(asset.mimeType)
    || asset.academicContentStatus !== "available"
    || asset.transcriptionStatus !== "native-text"
    || !["pending-review", "tracked-changes"].includes(String(asset.integrityStatus))
    || !["none-observed", "document-metadata", "blank-personal-fields", "identifiable-person"].includes(String(asset.privacyRisk))
    || !["local-only", "structured-excerpts-only"].includes(String(asset.publicationPolicy))
    || !Array.isArray(asset.originalPathAliases)
    || asset.originalPathAliases.length !== 0
  ) {
    return false;
  }

  const provenance = value.provenance;
  if (!isRecord(provenance) || !hasExactKeys(provenance, [
    "sourceType",
    "declaredAuthority",
    "effectiveLayer",
    "school",
    "teacher",
    "academicYear",
    "semester",
  ])
    || !isStringIn(provenance.sourceType, sourceTypes)
    || !isStringIn(provenance.declaredAuthority, sourceAuthorities)
    || provenance.effectiveLayer !== "learner-private"
    || !isDimension(provenance.school)
    || !isDimension(provenance.teacher)
    || !isDimension(provenance.academicYear)
    || !isDimension(provenance.semester)
  ) {
    return false;
  }

  const catalogCandidate = value.catalogCandidate;
  if (!isRecord(catalogCandidate) || !hasExactKeys(catalogCandidate, [
    "sourceFamily",
    "artifact",
    "admissionScope",
    "materialCatalogMutation",
  ])
    || catalogCandidate.admissionScope !== "local-candidate-only"
    || catalogCandidate.materialCatalogMutation !== "not-authorized"
    || !isRecord(catalogCandidate.sourceFamily)
    || !hasExactKeys(catalogCandidate.sourceFamily, ["id", "label", "artifactIds"])
    || !isNonEmptyString(catalogCandidate.sourceFamily.id)
    || !isNonEmptyString(catalogCandidate.sourceFamily.label)
    || !Array.isArray(catalogCandidate.sourceFamily.artifactIds)
    || catalogCandidate.sourceFamily.artifactIds.length !== 1
    || !catalogCandidate.sourceFamily.artifactIds.every(isNonEmptyString)
    || !isRecord(catalogCandidate.artifact)
    || !hasExactKeys(catalogCandidate.artifact, [
      "id",
      "familyId",
      "assetId",
      "label",
      "versionKind",
      "derivationStatus",
      "derivedFromArtifactIds",
    ])
    || !isNonEmptyString(catalogCandidate.artifact.id)
    || !isNonEmptyString(catalogCandidate.artifact.familyId)
    || !isNonEmptyString(catalogCandidate.artifact.assetId)
    || !isNonEmptyString(catalogCandidate.artifact.label)
    || catalogCandidate.artifact.versionKind !== "original"
    || catalogCandidate.artifact.derivationStatus !== "not-applicable"
    || !Array.isArray(catalogCandidate.artifact.derivedFromArtifactIds)
    || catalogCandidate.artifact.derivedFromArtifactIds.length !== 0
  ) {
    return false;
  }

  const acceptedTranscription = value.acceptedTranscription;
  if (!isRecord(acceptedTranscription) || !hasExactKeys(acceptedTranscription, [
    "status",
    "acceptance",
    "acceptedAt",
    "parser",
    "locators",
    "excerpts",
    "pendingBodyStored",
    "excludedBodyStored",
  ])
    || acceptedTranscription.status !== "native-text"
    || acceptedTranscription.acceptance !== "human-accepted-overlay"
    || !isIsoDate(acceptedTranscription.acceptedAt)
    || acceptedTranscription.pendingBodyStored !== false
    || acceptedTranscription.excludedBodyStored !== false
    || !isRecord(acceptedTranscription.parser)
    || !hasExactKeys(acceptedTranscription.parser, ["id", "library", "libraryVersion"])
    || acceptedTranscription.parser.id !== "browser-docx-semantic-v1"
    || acceptedTranscription.parser.library !== "mammoth"
    || acceptedTranscription.parser.libraryVersion !== "1.12.0"
    || !Array.isArray(acceptedTranscription.locators)
    || !Array.isArray(acceptedTranscription.excerpts)
  ) {
    return false;
  }
  const locatorsValid = acceptedTranscription.locators.every((locator) => (
    isRecord(locator)
    && hasExactKeys(locator, ["id", "artifactId", "kind", "value", "label"])
    && isNonEmptyString(locator.id)
    && isNonEmptyString(locator.artifactId)
    && locator.kind === "docx-semantic-block"
    && isNonEmptyString(locator.value)
    && isNonEmptyString(locator.label)
  ));
  const excerptsValid = acceptedTranscription.excerpts.every((excerpt) => (
    isRecord(excerpt)
    && hasExactKeys(excerpt, [
      "id",
      "blockId",
      "sectionId",
      "sectionTitle",
      "kind",
      "text",
      "locatorId",
    ])
    && isNonEmptyString(excerpt.id)
    && isNonEmptyString(excerpt.blockId)
    && isNonEmptyString(excerpt.sectionId)
    && isNonEmptyString(excerpt.sectionTitle)
    && ["heading", "paragraph", "list-item", "table-cell"].includes(String(excerpt.kind))
    && isNonEmptyString(excerpt.text)
    && isNonEmptyString(excerpt.locatorId)
  ));
  if (!locatorsValid || !excerptsValid) {
    return false;
  }

  const privacyPublication = value.privacyPublication;
  if (!isRecord(privacyPublication) || !hasExactKeys(privacyPublication, [
    "declaration",
    "risk",
    "publicationPolicy",
    "rawBinaryPersistence",
    "absolutePathStored",
    "fileHandleStored",
    "originalFileNameStored",
  ])
    || !["none-observed", "contains-private-information", "unknown"].includes(String(privacyPublication.declaration))
    || !["none-observed", "document-metadata", "blank-personal-fields", "identifiable-person"].includes(String(privacyPublication.risk))
    || !["local-only", "structured-excerpts-only"].includes(String(privacyPublication.publicationPolicy))
    || privacyPublication.rawBinaryPersistence !== "session-only-not-stored"
    || privacyPublication.absolutePathStored !== false
    || privacyPublication.fileHandleStored !== false
    || privacyPublication.originalFileNameStored !== false
  ) {
    return false;
  }

  const conflictReview = value.conflictReview;
  if (!isRecord(conflictReview) || !hasExactKeys(conflictReview, ["status", "note"])
    || !["pending-review", "none-observed", "unresolved-conflict-recorded"].includes(String(conflictReview.status))
    || typeof conflictReview.note !== "string"
    || (conflictReview.status === "pending-review" && conflictReview.note !== "")
    || (conflictReview.status === "unresolved-conflict-recorded" && conflictReview.note.trim().length === 0)
  ) {
    return false;
  }

  const authorityReview = value.authorityReview;
  if (!isRecord(authorityReview) || !hasExactKeys(authorityReview, [
    "status",
    "declaredAuthority",
    "effectiveAuthority",
    "authorityElevationGranted",
    "notice",
  ])
    || !["pending-review", "confirmed-learner-private-only"].includes(String(authorityReview.status))
    || !isStringIn(authorityReview.declaredAuthority, sourceAuthorities)
    || authorityReview.effectiveAuthority !== "learner-private"
    || authorityReview.authorityElevationGranted !== false
    || !isNonEmptyString(authorityReview.notice)
  ) {
    return false;
  }

  const rights = value.rights;
  if (!isRecord(rights) || !hasExactKeys(rights, [
    "courseBuilderUse",
    "modelTransfer",
    "publication",
    "courseRegistryWrite",
  ]) || !Object.values(rights).every((right) => right === "not-authorized")) {
    return false;
  }

  const review = value.review;
  if (!isRecord(review) || !hasExactKeys(review, [
    "fileIdentityConfirmed",
    "provenanceConfirmed",
    "acceptedTranscriptionConfirmed",
    "privacyPublicationConfirmed",
    "sourceFamilyArtifactConfirmed",
    "conflictDispositionConfirmed",
    "learnerPrivateAuthorityConfirmed",
    "independentRightsGateConfirmed",
    "status",
    "approvedAt",
  ])
    || !Object.entries(review)
      .filter(([key]) => key.endsWith("Confirmed"))
      .every(([, checked]) => typeof checked === "boolean")
    || !["pending-review", "confirmed"].includes(String(review.status))
    || (review.approvedAt !== null && !isIsoDate(review.approvedAt))
  ) {
    return false;
  }

  const notices = value.notices;
  return isRecord(notices)
    && hasExactKeys(notices, ["candidateNotice", "exportNotice"])
    && isNonEmptyString(notices.candidateNotice)
    && isNonEmptyString(notices.exportNotice);
}

function addIssue(
  issues: MaterialAdmissionValidationIssue[],
  code: MaterialAdmissionValidationIssue["code"],
  path: string,
  message: string,
) {
  issues.push({ code, path, message });
}

function hasUniqueStrings(values: readonly string[]) {
  return new Set(values).size === values.length;
}

export function validateMaterialAdmissionRecord(
  record: MaterialAdmissionRecord,
): MaterialAdmissionValidation {
  const issues: MaterialAdmissionValidationIssue[] = [];
  const asset = record.identity.asset;
  const family = record.catalogCandidate.sourceFamily;
  const artifact = record.catalogCandidate.artifact;
  const locators = record.acceptedTranscription.locators;
  const excerpts = record.acceptedTranscription.excerpts;

  if (record.version !== materialAdmissionRecordVersion) {
    addIssue(issues, "invalid-version", "version", "准入记录版本不受支持。");
  }
  if (!sha256Pattern.test(asset.sha256)
    || !Number.isInteger(asset.byteSize)
    || asset.byteSize < 1
    || !asset.mimeType.trim()
    || asset.originalPathAliases.length !== 0
  ) {
    addIssue(issues, "invalid-identity", "identity.asset", "文件身份必须包含完整 SHA-256、MIME、正整数大小，并保持路径别名为空。");
  }
  if (!record.sourceTrace.courseId.trim()
    || !record.sourceTrace.knowledgePointId.trim()
    || record.provenance.effectiveLayer !== "learner-private"
  ) {
    addIssue(issues, "invalid-provenance", "provenance", "课程、知识点和 learner-private 来源链必须完整。");
  }
  if (family.artifactIds.length !== 1
    || family.artifactIds[0] !== artifact.id
    || artifact.familyId !== family.id
    || artifact.assetId !== asset.id
    || artifact.versionKind !== "original"
    || artifact.derivationStatus !== "not-applicable"
    || artifact.derivedFromArtifactIds.length !== 0
  ) {
    addIssue(issues, "invalid-catalog-candidate", "catalogCandidate", "source family、artifact 与 asset 引用必须互相一致，且本试点不声明派生关系。");
  }
  const characterCount = excerpts.reduce((total, excerpt) => total + excerpt.text.length, 0);
  const locatorIds = new Set(locators.map((locator) => locator.id));
  if (excerpts.length < 1
    || excerpts.length > maximumAdmissionExcerptCount
    || characterCount > maximumAdmissionCharacterCount
    || locators.length !== excerpts.length
    || !hasUniqueStrings(excerpts.map((excerpt) => excerpt.id))
    || !hasUniqueStrings(locators.map((locator) => locator.id))
    || locators.some((locator) => locator.artifactId !== artifact.id || locator.kind !== "docx-semantic-block")
    || excerpts.some((excerpt) => !excerpt.text.trim() || !locatorIds.has(excerpt.locatorId))
    || record.acceptedTranscription.pendingBodyStored
    || record.acceptedTranscription.excludedBodyStored
  ) {
    addIssue(issues, "invalid-transcription", "acceptedTranscription", "只能保存 1–80 条、合计不超过 40,000 字的明确接纳摘录及一一对应 locator。");
  }
  if (asset.privacyRisk !== record.privacyPublication.risk
    || asset.publicationPolicy !== record.privacyPublication.publicationPolicy
    || record.privacyPublication.rawBinaryPersistence !== "session-only-not-stored"
    || record.privacyPublication.absolutePathStored
    || record.privacyPublication.fileHandleStored
    || record.privacyPublication.originalFileNameStored
    || (record.privacyPublication.risk === "identifiable-person"
      && record.privacyPublication.publicationPolicy !== "local-only")
  ) {
    addIssue(issues, "invalid-privacy-publication", "privacyPublication", "隐私、publication policy 与零二进制/零路径边界不一致。");
  }
  if (record.conflictReview.status === "pending-review") {
    addIssue(issues, "conflict-review-required", "conflictReview", "必须记录未观察到冲突，或明确保留未解决冲突。");
  }
  if (record.authorityReview.status !== "confirmed-learner-private-only"
    || record.authorityReview.authorityElevationGranted
  ) {
    addIssue(issues, "authority-review-required", "authorityReview", "必须确认有效权威只停留在 learner-private，且没有权威升级。");
  }
  if (Object.values(record.rights).some((right) => right !== "not-authorized")) {
    addIssue(issues, "rights-boundary-violated", "rights", "准入记录不得授予 Course Builder、模型传输、发布或课程写入权。");
  }
  const humanChecks = [
    record.review.fileIdentityConfirmed,
    record.review.provenanceConfirmed,
    record.review.acceptedTranscriptionConfirmed,
    record.review.privacyPublicationConfirmed,
    record.review.sourceFamilyArtifactConfirmed,
    record.review.conflictDispositionConfirmed,
    record.review.learnerPrivateAuthorityConfirmed,
    record.review.independentRightsGateConfirmed,
  ];
  if (!humanChecks.every(Boolean)) {
    addIssue(issues, "human-review-required", "review", "八项准入人工确认尚未全部完成。");
  }

  const readyForApproval = issues.length === 0;
  if (record.status === "approved-as-local-candidate"
    && (!readyForApproval || record.review.status !== "confirmed" || record.review.approvedAt === null)
  ) {
    addIssue(issues, "human-review-required", "status", "approved-as-local-candidate 必须具备完整审核和批准时间。");
  }

  return {
    valid: issues.length === 0,
    readyForApproval,
    issues,
  };
}

export function createMaterialAdmissionRecord(
  overlay: ReviewedMaterialOverlayDraft,
): MaterialAdmissionRecord {
  if (overlay.excerpts.length < 1) {
    throw new Error("已审核 overlay 没有可进入准入候选的接纳摘录。");
  }
  const now = new Date().toISOString();
  const assetId = `local-asset-${overlay.sourceCandidate.candidateId}`;
  const familyId = `local-family-${overlay.sourceCandidate.candidateId}`;
  const artifactId = `local-artifact-${overlay.sourceCandidate.candidateId}`;
  const familyLabel = overlay.sourceCandidate.sourceFamily.label.trim() || "待确认";
  const locators = overlay.excerpts.map((excerpt) => ({
    id: `admission-locator-${excerpt.id}`,
    artifactId,
    kind: "docx-semantic-block" as const,
    value: String(excerpt.locator.blockIndex),
    label: excerpt.locator.label,
  }));

  return {
    version: materialAdmissionRecordVersion,
    id: `material-admission-${overlay.sourceCandidate.candidateId}-${overlay.knowledgePointId}`,
    createdAt: now,
    updatedAt: now,
    status: "pending-review",
    sourceTrace: {
      intakeDraftId: overlay.sourceCandidate.intakeDraftId,
      intakeBatchId: overlay.sourceCandidate.intakeBatchId,
      candidateId: overlay.sourceCandidate.candidateId,
      overlayId: overlay.id,
      courseId: overlay.courseId,
      courseTitle: overlay.courseTitle,
      knowledgePointId: overlay.knowledgePointId,
      knowledgePointTitle: overlay.knowledgePointTitle,
      chapterTitle: overlay.chapterTitle,
    },
    identity: {
      asset: {
        id: assetId,
        sha256: overlay.sourceCandidate.sha256,
        byteSize: overlay.sourceCandidate.byteSize,
        mediaType: overlay.sourceCandidate.mediaType,
        mimeType: overlay.sourceCandidate.mimeType,
        academicContentStatus: "available",
        transcriptionStatus: "native-text",
        integrityStatus: "pending-review",
        privacyRisk: overlay.privacy.risk,
        publicationPolicy: overlay.privacy.publicationPolicy,
        originalPathAliases: [],
      },
    },
    provenance: {
      sourceType: overlay.sourceCandidate.sourceType,
      declaredAuthority: overlay.sourceCandidate.declaredAuthority,
      effectiveLayer: "learner-private",
      school: overlay.sourceCandidate.school,
      teacher: overlay.sourceCandidate.teacher,
      academicYear: overlay.sourceCandidate.academicYear,
      semester: overlay.sourceCandidate.semester,
    },
    catalogCandidate: {
      sourceFamily: {
        id: familyId,
        label: familyLabel,
        artifactIds: [artifactId],
      },
      artifact: {
        id: artifactId,
        familyId,
        assetId,
        label: `${familyLabel} · DOCX 原始 artifact`,
        versionKind: "original",
        derivationStatus: "not-applicable",
        derivedFromArtifactIds: [],
      },
      admissionScope: "local-candidate-only",
      materialCatalogMutation: "not-authorized",
    },
    acceptedTranscription: {
      status: "native-text",
      acceptance: "human-accepted-overlay",
      acceptedAt: overlay.createdAt,
      parser: {
        id: "browser-docx-semantic-v1",
        library: "mammoth",
        libraryVersion: "1.12.0",
      },
      locators,
      excerpts: overlay.excerpts.map((excerpt, index) => ({
        id: excerpt.id,
        blockId: excerpt.blockId,
        sectionId: excerpt.sectionId,
        sectionTitle: excerpt.sectionTitle,
        kind: excerpt.kind,
        text: excerpt.text,
        locatorId: locators[index].id,
      })),
      pendingBodyStored: false,
      excludedBodyStored: false,
    },
    privacyPublication: {
      declaration: overlay.privacy.declaration,
      risk: overlay.privacy.risk,
      publicationPolicy: overlay.privacy.publicationPolicy,
      rawBinaryPersistence: "session-only-not-stored",
      absolutePathStored: false,
      fileHandleStored: false,
      originalFileNameStored: false,
    },
    conflictReview: {
      status: "pending-review",
      note: "",
    },
    authorityReview: {
      status: "pending-review",
      declaredAuthority: overlay.sourceCandidate.declaredAuthority,
      effectiveAuthority: "learner-private",
      authorityElevationGranted: false,
      notice: "申报 authority 只保留为 provenance；本准入最多确认 learner-private 本地候选，不升级为教师、学校、出版社或 NUR 官方权威。",
    },
    rights: {
      courseBuilderUse: "not-authorized",
      modelTransfer: "not-authorized",
      publication: "not-authorized",
      courseRegistryWrite: "not-authorized",
    },
    review: {
      fileIdentityConfirmed: false,
      provenanceConfirmed: false,
      acceptedTranscriptionConfirmed: false,
      privacyPublicationConfirmed: false,
      sourceFamilyArtifactConfirmed: false,
      conflictDispositionConfirmed: false,
      learnerPrivateAuthorityConfirmed: false,
      independentRightsGateConfirmed: false,
      status: "pending-review",
      approvedAt: null,
    },
    notices: {
      candidateNotice: "approved-as-local-candidate 只表示结构化准入候选已完成人工复核，不表示材料内容成为课程真相。",
      exportNotice: "JSON 导出只用于审计和人工移交；导出不会授予 Course Builder 使用权、模型传输权、课程写入权或发布权。",
    },
  };
}

export function approveMaterialAdmissionRecord(
  record: MaterialAdmissionRecord,
): MaterialAdmissionRecord {
  const validation = validateMaterialAdmissionRecord(record);
  if (!validation.readyForApproval) {
    throw new Error(validation.issues[0]?.message ?? "准入审核尚未完成。");
  }
  const now = new Date().toISOString();
  const approved: MaterialAdmissionRecord = {
    ...record,
    updatedAt: now,
    status: "approved-as-local-candidate",
    review: {
      ...record.review,
      status: "confirmed",
      approvedAt: now,
    },
  };
  const approvedValidation = validateMaterialAdmissionRecord(approved);
  if (!approvedValidation.valid) {
    throw new Error(approvedValidation.issues[0]?.message ?? "批准后的准入记录未通过严格校验。");
  }
  return approved;
}

export function createEmptyMaterialAdmissionStore(): MaterialAdmissionStore {
  return { version: materialAdmissionStoreVersion, records: [] };
}

export function parseMaterialAdmissionStoreJson(
  value: string | null,
): MaterialAdmissionStore {
  if (value === null) {
    return createEmptyMaterialAdmissionStore();
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (!isRecord(parsed)
      || !hasExactKeys(parsed, ["version", "records"])
      || parsed.version !== materialAdmissionStoreVersion
      || !Array.isArray(parsed.records)
      || parsed.records.length > maximumStoredAdmissionRecords
      || !parsed.records.every(isAdmissionRecordShape)
      || parsed.records.some((record) => (
        record.status !== "approved-as-local-candidate"
        || !validateMaterialAdmissionRecord(record).valid
      ))
      || !hasUniqueStrings(parsed.records.map((record) => record.id))
      || !hasUniqueStrings(parsed.records.map((record) => record.identity.asset.sha256))
    ) {
      return createEmptyMaterialAdmissionStore();
    }
    return parsed as MaterialAdmissionStore;
  } catch {
    return createEmptyMaterialAdmissionStore();
  }
}

export function saveMaterialAdmissionRecord(record: MaterialAdmissionRecord): void {
  if (record.status !== "approved-as-local-candidate"
    || !validateMaterialAdmissionRecord(record).valid
  ) {
    throw new Error("只有通过严格校验的 approved-as-local-candidate 才能写入浏览器记录。");
  }
  const current = parseMaterialAdmissionStoreJson(
    window.localStorage.getItem(materialAdmissionStorageKey),
  );
  const records = [
    ...current.records.filter((item) => (
      item.id !== record.id
      && item.identity.asset.sha256 !== record.identity.asset.sha256
    )),
    record,
  ].slice(-maximumStoredAdmissionRecords);
  const next: MaterialAdmissionStore = {
    version: materialAdmissionStoreVersion,
    records,
  };
  window.localStorage.setItem(materialAdmissionStorageKey, JSON.stringify(next));
  window.dispatchEvent(new Event(materialAdmissionChangeEvent));
}

export function getMaterialAdmissionStorageSnapshot(): string | null {
  return window.localStorage.getItem(materialAdmissionStorageKey);
}

export function subscribeToMaterialAdmission(onStoreChange: () => void): () => void {
  const handleStoreChange = () => onStoreChange();
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(materialAdmissionChangeEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(materialAdmissionChangeEvent, handleStoreChange);
  };
}

export function createMaterialAdmissionExport(
  record: MaterialAdmissionRecord,
): MaterialAdmissionExport {
  if (record.status !== "approved-as-local-candidate"
    || !validateMaterialAdmissionRecord(record).valid
  ) {
    throw new Error("只有已批准且通过严格校验的准入记录可以导出。");
  }
  return {
    version: materialAdmissionExportVersion,
    kind: "nur-material-admission-record",
    exportedAt: new Date().toISOString(),
    record,
    exportBoundary: {
      grantsCourseBuilderUse: false,
      grantsModelTransfer: false,
      grantsPublication: false,
      containsRawBinary: false,
      containsFileHandle: false,
      containsAbsolutePath: false,
      containsOriginalFileName: false,
      containsPendingOrExcludedBody: false,
    },
  };
}


const ADMISSION_CONSENTS_KEY = "nur-learn:admission-sync-consents:v1";

function parseConsentStored(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ADMISSION_CONSENTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Record<string, boolean>;
    return {};
  } catch {
    return {};
  }
}

function writeConsentStored(value: Record<string, boolean>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ADMISSION_CONSENTS_KEY, JSON.stringify(value));
  } catch {}
}

/** 显式设置私人材料准入记录的云同步同意（M2 Phase 3） */
export function setAdmissionSyncConsent(recordId: string, consent: boolean): void {
  const current = parseConsentStored();
  if (consent) {
    current[recordId] = true;
  } else {
    delete current[recordId];
  }
  writeConsentStored(current);
}

export function getAdmissionSyncConsents(): Record<string, boolean> {
  return parseConsentStored();
}
