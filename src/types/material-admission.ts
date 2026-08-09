import type {
  MaterialArtifact,
  MaterialAsset,
  MaterialSourceFamily,
  SourceAuthority,
  SourceLocator,
  SourceType,
} from "@/types/learning";
import type { MaterialIntakeDimension } from "@/types/material-intake";
import type {
  DocxSemanticBlockKind,
  ReviewedMaterialOverlayDraft,
} from "@/types/material-parsing";

export const materialAdmissionRecordVersion = 1 as const;
export const materialAdmissionStoreVersion = 1 as const;
export const materialAdmissionExportVersion = 1 as const;

export type MaterialAdmissionStatus =
  | "pending-review"
  | "approved-as-local-candidate";

export type MaterialAdmissionConflictReview =
  | {
      status: "pending-review";
      note: "";
    }
  | {
      status: "none-observed";
      note: string;
    }
  | {
      status: "unresolved-conflict-recorded";
      note: string;
    };

export type MaterialAdmissionAssetCandidate = Omit<
  MaterialAsset,
  "originalPathAliases"
> & {
  mimeType: string;
  originalPathAliases: readonly [];
};

export type MaterialAdmissionAcceptedExcerpt = {
  id: string;
  blockId: string;
  sectionId: string;
  sectionTitle: string;
  kind: DocxSemanticBlockKind;
  text: string;
  locatorId: string;
};

export type MaterialAdmissionHumanReview = {
  fileIdentityConfirmed: boolean;
  provenanceConfirmed: boolean;
  acceptedTranscriptionConfirmed: boolean;
  privacyPublicationConfirmed: boolean;
  sourceFamilyArtifactConfirmed: boolean;
  conflictDispositionConfirmed: boolean;
  learnerPrivateAuthorityConfirmed: boolean;
  independentRightsGateConfirmed: boolean;
  status: "pending-review" | "confirmed";
  approvedAt: string | null;
};

export type MaterialAdmissionRecord = {
  version: typeof materialAdmissionRecordVersion;
  id: string;
  createdAt: string;
  updatedAt: string;
  status: MaterialAdmissionStatus;
  sourceTrace: {
    intakeDraftId: string;
    intakeBatchId: string;
    candidateId: string;
    overlayId: string;
    courseId: string;
    courseTitle: string;
    knowledgePointId: string;
    knowledgePointTitle: string;
    chapterTitle: string;
  };
  identity: {
    asset: MaterialAdmissionAssetCandidate;
  };
  provenance: {
    sourceType: SourceType;
    declaredAuthority: SourceAuthority;
    effectiveLayer: "learner-private";
    school: MaterialIntakeDimension;
    teacher: MaterialIntakeDimension;
    academicYear: MaterialIntakeDimension;
    semester: MaterialIntakeDimension;
  };
  catalogCandidate: {
    sourceFamily: MaterialSourceFamily;
    artifact: MaterialArtifact;
    admissionScope: "local-candidate-only";
    materialCatalogMutation: "not-authorized";
  };
  acceptedTranscription: {
    status: "native-text";
    acceptance: "human-accepted-overlay";
    acceptedAt: string;
    parser: {
      id: "browser-docx-semantic-v1";
      library: "mammoth";
      libraryVersion: "1.12.0";
    };
    locators: readonly SourceLocator[];
    excerpts: readonly MaterialAdmissionAcceptedExcerpt[];
    pendingBodyStored: false;
    excludedBodyStored: false;
  };
  privacyPublication: {
    declaration: ReviewedMaterialOverlayDraft["privacy"]["declaration"];
    risk: ReviewedMaterialOverlayDraft["privacy"]["risk"];
    publicationPolicy: ReviewedMaterialOverlayDraft["privacy"]["publicationPolicy"];
    rawBinaryPersistence: "session-only-not-stored";
    absolutePathStored: false;
    fileHandleStored: false;
    originalFileNameStored: false;
  };
  conflictReview: MaterialAdmissionConflictReview;
  authorityReview: {
    status: "pending-review" | "confirmed-learner-private-only";
    declaredAuthority: SourceAuthority;
    effectiveAuthority: "learner-private";
    authorityElevationGranted: false;
    notice: string;
  };
  rights: {
    courseBuilderUse: "not-authorized";
    modelTransfer: "not-authorized";
    publication: "not-authorized";
    courseRegistryWrite: "not-authorized";
  };
  review: MaterialAdmissionHumanReview;
  notices: {
    candidateNotice: string;
    exportNotice: string;
  };
};

export type MaterialAdmissionStore = {
  version: typeof materialAdmissionStoreVersion;
  records: readonly MaterialAdmissionRecord[];
};

export type MaterialAdmissionExport = {
  version: typeof materialAdmissionExportVersion;
  kind: "nur-material-admission-record";
  exportedAt: string;
  record: MaterialAdmissionRecord;
  exportBoundary: {
    grantsCourseBuilderUse: false;
    grantsModelTransfer: false;
    grantsPublication: false;
    containsRawBinary: false;
    containsFileHandle: false;
    containsAbsolutePath: false;
    containsOriginalFileName: false;
    containsPendingOrExcludedBody: false;
  };
};

export type MaterialAdmissionValidationIssueCode =
  | "invalid-version"
  | "invalid-identity"
  | "invalid-provenance"
  | "invalid-catalog-candidate"
  | "invalid-transcription"
  | "invalid-privacy-publication"
  | "conflict-review-required"
  | "authority-review-required"
  | "human-review-required"
  | "rights-boundary-violated";

export type MaterialAdmissionValidationIssue = {
  code: MaterialAdmissionValidationIssueCode;
  path: string;
  message: string;
};

export type MaterialAdmissionValidation = {
  valid: boolean;
  readyForApproval: boolean;
  issues: readonly MaterialAdmissionValidationIssue[];
};
