import type {
  MaterialIntegrityStatus,
  MaterialMediaType,
  MaterialPrivacyRisk,
  MaterialPublicationPolicy,
  MaterialTranscriptionStatus,
  SourceAuthority,
  SourceType,
} from "@/types/learning";

export type MaterialIntakeDraftStatus =
  | "draft"
  | "pending-review"
  | "eligible-for-course-builder";

export type MaterialIntakeParsingStatus = "pending";

export type MaterialIntakeReviewStatus = "pending-review" | "confirmed";

export type MaterialIntakeLayer = "learner-private";

export type MaterialIntakePrivacyDeclaration =
  | "unknown"
  | "contains-private-information"
  | "none-observed";

export type MaterialIntakeFamilyMode =
  | "separate-source-families"
  | "single-source-family";

export type MaterialIntakeDimension =
  | { status: "pending"; value: null }
  | { status: "declared"; value: string };

export type MaterialIntakeDuplicateState =
  | { kind: "none"; matchedCandidateId: null; matchedAssetId: null }
  | { kind: "batch"; matchedCandidateId: string; matchedAssetId: null }
  | { kind: "catalog"; matchedCandidateId: null; matchedAssetId: string };

export type MaterialIntakeFileDisposition =
  | "pending-review"
  | "duplicate-in-batch"
  | "duplicate-in-catalog";

export type MaterialIntakeFileCandidate = {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  mediaType: Exclude<MaterialMediaType, "archive" | "markdown">;
  byteSize: number;
  lastModified: number;
  sha256: string;
  disposition: MaterialIntakeFileDisposition;
  duplicate: MaterialIntakeDuplicateState;
  parsingStatus: MaterialIntakeParsingStatus;
  parsingLabel: "待解析";
  transcriptionStatus: Extract<MaterialTranscriptionStatus, "ocr-pending">;
  integrityStatus: Extract<MaterialIntegrityStatus, "pending-review">;
  privacyRisk: MaterialPrivacyRisk;
  publicationPolicy: Exclude<MaterialPublicationPolicy, "approved">;
  academicContentStatus: "pending";
  authorityReviewStatus: Extract<MaterialIntakeReviewStatus, "pending-review">;
  conflictReviewStatus: Extract<MaterialIntakeReviewStatus, "pending-review">;
};

export type MaterialIntakeRejectionReason =
  | "unsupported-type"
  | "file-count-limit"
  | "file-size-limit"
  | "batch-size-limit"
  | "hash-failed";

export type MaterialIntakeRejectedFile = {
  id: string;
  name: string;
  byteSize: number;
  reason: MaterialIntakeRejectionReason;
  notice: string;
};

export type MaterialIntakeBatch = {
  id: string;
  createdAt: string;
  updatedAt: string;
  files: readonly MaterialIntakeFileCandidate[];
  rejectedFiles: readonly MaterialIntakeRejectedFile[];
  totalByteSize: number;
};

export type MaterialIntakeProvenance = {
  courseId: string;
  sourceType: SourceType;
  declaredAuthority: SourceAuthority;
  authorityReviewStatus: Extract<MaterialIntakeReviewStatus, "pending-review">;
  layer: MaterialIntakeLayer;
  school: MaterialIntakeDimension;
  teacher: MaterialIntakeDimension;
  academicYear: MaterialIntakeDimension;
  semester: MaterialIntakeDimension;
  sourceFamily: {
    mode: MaterialIntakeFamilyMode;
    label: string;
    reviewStatus: Extract<MaterialIntakeReviewStatus, "pending-review">;
  };
};

export type MaterialIntakePrivacy = {
  declaration: MaterialIntakePrivacyDeclaration;
  risk: MaterialPrivacyRisk;
  publicationPolicy: Exclude<MaterialPublicationPolicy, "approved">;
  rawFileHandling: "browser-memory-only";
  modelTransferPolicy: "not-authorized";
};

export type MaterialIntakeHumanReview = {
  fileIdentityConfirmed: boolean;
  provenanceConfirmed: boolean;
  privacyPublicationConfirmed: boolean;
  noModelTransferConfirmed: boolean;
  status: MaterialIntakeReviewStatus;
  confirmedAt: string | null;
};

export type MaterialIntakeDraft = {
  version: 1;
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  status: MaterialIntakeDraftStatus;
  batch: MaterialIntakeBatch | null;
  provenance: MaterialIntakeProvenance;
  privacy: MaterialIntakePrivacy;
  review: MaterialIntakeHumanReview;
  dataHandlingNotice: string;
  authorityNotice: string;
};

export type MaterialIntakeCourseOption = {
  id: string;
  slug: string;
  title: string;
};

export type MaterialIntakeKnownAssetIdentity = {
  assetId: string;
  sha256: string;
  byteSize: number;
};

export type MaterialIntakeValidationIssueCode =
  | "missing-files"
  | "rejected-files"
  | "duplicate-file"
  | "invalid-identity"
  | "course-required"
  | "privacy-required"
  | "family-label-required"
  | "review-required";

export type MaterialIntakeValidationIssue = {
  code: MaterialIntakeValidationIssueCode;
  path: string;
  message: string;
};

export type MaterialIntakeValidation = {
  valid: boolean;
  readyForHumanConfirmation: boolean;
  eligibleForCourseBuilder: boolean;
  issues: readonly MaterialIntakeValidationIssue[];
};
