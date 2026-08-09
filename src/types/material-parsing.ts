import type {
  ContentStatus,
  MaterialMediaType,
  MaterialPublicationPolicy,
  SourceAuthority,
  SourceType,
} from "@/types/learning";
import type { MaterialIntakeDimension } from "@/types/material-intake";

export const materialParsingDraftVersion = 1 as const;
export const reviewedMaterialOverlayDraftVersion = 1 as const;

export type MaterialParsingKnowledgePointOption = {
  id: string;
  title: string;
  chapterId: string;
  chapterTitle: string;
  contentStatus: ContentStatus;
  sourceCount: number;
  hasLesson: boolean;
};

export type MaterialParsingCourseOption = {
  id: string;
  title: string;
  knowledgePoints: readonly MaterialParsingKnowledgePointOption[];
};

export type DocxSemanticBlockKind =
  | "heading"
  | "paragraph"
  | "list-item"
  | "table-cell";

export type DocxSemanticBlockDecision =
  | "pending-review"
  | "accepted"
  | "excluded";

export type DocxSemanticBlock = {
  id: string;
  order: number;
  kind: DocxSemanticBlockKind;
  headingLevel: number | null;
  text: string;
  editedText: string;
  locator: {
    kind: "docx-semantic-block";
    label: string;
    blockIndex: number;
  };
  decision: DocxSemanticBlockDecision;
};

export type MaterialParsingIssue = {
  id: string;
  severity: "notice" | "review" | "blocking";
  code:
    | "parser-message"
    | "images-ignored"
    | "empty-document"
    | "block-limit"
    | "revision-state-pending"
    | "unsupported-file"
    | "identity-mismatch";
  message: string;
};

export type MaterialDocxParseResult = {
  parser: {
    id: "browser-docx-semantic-v1";
    library: "mammoth";
    libraryVersion: "1.12.0";
  };
  blockCount: number;
  characterCount: number;
  ignoredImageCount: number;
  blocks: readonly DocxSemanticBlock[];
  issues: readonly MaterialParsingIssue[];
};

export type MaterialCourseDeltaPreview = {
  status: "preview-only";
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgePointTitle: string;
  chapterTitle: string;
  currentContentStatus: ContentStatus;
  currentSourceCount: number;
  currentHasLesson: boolean;
  materialArtifactCandidateCount: 1;
  acceptedExcerptCount: number;
  excludedBlockCount: number;
  pendingBlockCount: number;
  verifiedFactCount: 0;
  registryWriteCount: 0;
  modelRequestCount: 0;
};

export type MaterialDocxParsingDraft = {
  version: typeof materialParsingDraftVersion;
  id: string;
  createdAt: string;
  intakeDraftId: string;
  intakeBatchId: string;
  candidateId: string;
  fileName: string;
  sha256: string;
  authorization: {
    status: "explicit";
    scope: "browser-local-docx-structure-only";
    authorizedAt: string;
    modelTransfer: "not-authorized";
    persistence: "memory-only";
  };
  parseResult: MaterialDocxParseResult;
  deltaPreview: MaterialCourseDeltaPreview | null;
};

export type ReviewedMaterialOverlayExcerpt = {
  id: string;
  blockId: string;
  sectionId: string;
  sectionTitle: string;
  kind: DocxSemanticBlockKind;
  text: string;
  locator: DocxSemanticBlock["locator"];
};

export type ReviewedMaterialOverlayDraft = {
  version: typeof reviewedMaterialOverlayDraftVersion;
  id: string;
  createdAt: string;
  status: "approved-for-current-session";
  label: string;
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgePointTitle: string;
  chapterTitle: string;
  sourceCandidate: {
    intakeDraftId: string;
    intakeBatchId: string;
    candidateId: string;
    fileName: string;
    sha256: string;
    byteSize: number;
    mimeType: string;
    mediaType: Exclude<MaterialMediaType, "archive" | "markdown">;
    sourceType: SourceType;
    declaredAuthority: SourceAuthority;
    authorityReviewStatus: "pending-review";
    layer: "learner-private";
    school: MaterialIntakeDimension;
    teacher: MaterialIntakeDimension;
    academicYear: MaterialIntakeDimension;
    semester: MaterialIntakeDimension;
    sourceFamily: {
      mode: "separate-source-families" | "single-source-family";
      label: string;
      reviewStatus: "pending-review";
    };
  };
  privacy: {
    declaration: "none-observed" | "contains-private-information" | "unknown";
    risk: "none-observed" | "document-metadata" | "blank-personal-fields" | "identifiable-person";
    publicationPolicy: Extract<MaterialPublicationPolicy, "local-only" | "structured-excerpts-only">;
    persistence: "memory-only";
    modelTransfer: "not-authorized";
  };
  review: {
    acceptedExcerptCount: number;
    acceptedSectionCount: number;
    pendingBlockCount: number;
    excludedBlockCount: number;
  };
  excerpts: readonly ReviewedMaterialOverlayExcerpt[];
};
