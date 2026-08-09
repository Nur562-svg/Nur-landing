import type {
  AssessmentAnswerDefinition,
  ContentStatus,
  CourseDefinition,
  CurriculumMode,
  KnowledgeEmphasis,
  MaterialStatus,
  QuestionKind,
  SourceAuthority,
  SourceLocator,
  SourceScope,
  SourceType,
} from "@/types/learning";

export type CourseBuildMode = "provider-preferred" | "baseline-only";

export type KnownPackCourseBuildRequest = {
  version: 1;
  materialPackId: string;
  mode: CourseBuildMode;
};

export type PrivateOverlayTransferAuthorization = {
  version: 1;
  id: string;
  overlayId: string;
  provider: "dashscope";
  model: string;
  courseId: string;
  knowledgePointId: string;
  excerptCount: number;
  characterCount: number;
  contentDigest: string;
  scope: "one-course-build";
  status: "explicit";
  grant: "authorized-once";
  authorizedAt: string;
};

export type CourseBuildPrivateOverlayExcerpt = {
  id: string;
  sectionId: string;
  sectionTitle: string;
  kind: "heading" | "paragraph" | "list-item" | "table-cell";
  text: string;
  locator: {
    kind: "docx-semantic-block";
    label: string;
    blockIndex: number;
  };
};

export type CourseBuildPrivateOverlayInput = {
  version: 1;
  overlayId: string;
  courseId: string;
  knowledgePointId: string;
  source: {
    sourceType: SourceType;
    declaredAuthority: SourceAuthority;
    layer: "learner-private";
    authorityReviewStatus: "pending-review";
  };
  privacy: {
    declaration: "none-observed";
    risk: "none-observed";
    publicationPolicy: "local-only" | "structured-excerpts-only";
  };
  excerpts: readonly CourseBuildPrivateOverlayExcerpt[];
};

export type PrivateOverlayCourseBuildRequest = {
  version: 2;
  baseMaterialPackId: string;
  mode: "provider-preferred";
  privateOverlay: CourseBuildPrivateOverlayInput;
  authorization: PrivateOverlayTransferAuthorization;
};

export type PrivateMaterialAnalysisAuthorization = {
  version: 1;
  id: string;
  overlayId: string;
  provider: "dashscope";
  model: string;
  courseId: string;
  knowledgePointId: string;
  excerptCount: number;
  characterCount: number;
  contentDigest: string;
  scope: "one-private-analysis";
  status: "explicit";
  grant: "authorized-once";
  authorizedAt: string;
};

export type PrivateMaterialAnalysisRequest = {
  version: 1;
  kind: "private-material-analysis";
  mode: "provider-required";
  privateOverlay: CourseBuildPrivateOverlayInput;
  authorization: PrivateMaterialAnalysisAuthorization;
};

export type CourseBuildRequest =
  | KnownPackCourseBuildRequest
  | PrivateOverlayCourseBuildRequest;

export type CourseBuilderApiRequest =
  | CourseBuildRequest
  | PrivateMaterialAnalysisRequest;

export type CourseBuildProviderIdentity = {
  id: string;
  model: string;
};

export type CourseBuildProviderAssist = {
  status: "not-configured" | "used" | "failed" | "skipped";
  provider: CourseBuildProviderIdentity | null;
  notice: string;
};

export type CourseBuildMaterialPackSummary = {
  id: string;
  label: string;
  courseId: string;
  courseSlug: string;
  sourceCount: number;
  verifiedSourceCount: number;
  availableSourceCount: number;
  pendingSourceCount: number;
  materialArtifactCount: number;
  privacyRestrictedArtifactCount: number;
  description: string;
};

export type OfficialPackUseRights = {
  modelUse: "not-authorized-by-pack";
  publication: "not-authorized";
  materialCatalogMutation: "not-authorized";
  courseRegistryMutation: "not-authorized";
};

export type OfficialPackManifestItem = {
  id: string;
  assetId: string;
  familyId: string;
  artifactId: string;
  sourceId: string | null;
  sourceType: SourceType;
  authority: SourceAuthority;
  scope: SourceScope;
  disposition: "include" | "exclude";
  academicContentStatus: MaterialStatus;
  locatorSummary: string;
  note: string;
};

export type OfficialPackEvidenceTier =
  | "core-loop"
  | "standard-loop"
  | "foundation";

export type OfficialPackEvidenceCoverageStatus =
  | "evidence-ready"
  | "evidence-partial"
  | "pending";

export type OfficialPackEvidenceReference = {
  sourceId: string;
  artifactId: string;
  authority: SourceAuthority;
  scope: SourceScope;
  academicContentStatus: MaterialStatus;
  locatorStatus: "verified" | "source-declared" | "pending-review";
  evidenceUse:
    | "content-foundation"
    | "current-review-scope"
    | "historical-question"
    | "school-question-bank"
    | "teacher-slide-candidate";
  locators: readonly SourceLocator[];
  note: string;
};

export type OfficialPackQuestionEvidence = {
  id: string;
  assessmentItemId: string | null;
  sourceId: string;
  questionKind: QuestionKind | null;
  prompt: string | null;
  normalizationStatus:
    | "normalized"
    | "source-located"
    | "pending-transcription";
  locator: SourceLocator | null;
  promptAuthority: SourceAuthority;
  answer: AssessmentAnswerDefinition;
  currentFrequencyClaim: "not-authorized";
  note: string;
};

export type OfficialPackMissingState = {
  id: string;
  kind:
    | "textbook-locator"
    | "question-normalization"
    | "source-answer"
    | "teacher-final-review"
    | "teacher-rubric"
    | "ocr-review";
  status: "pending";
  label: string;
};

export type OfficialPackKnowledgePointEvidence = {
  knowledgePointId: string;
  chapterId: string;
  tier: OfficialPackEvidenceTier;
  tierRationale: string;
  coverageStatus: OfficialPackEvidenceCoverageStatus;
  evidence: readonly OfficialPackEvidenceReference[];
  questions: readonly OfficialPackQuestionEvidence[];
  conflictReview: {
    status: "none-observed" | "pending-review" | "unresolved";
    note: string;
  };
  missingStates: readonly OfficialPackMissingState[];
};

export type OfficialCourseMaterialPack = {
  version: 1;
  kind: "official-course-material-pack";
  id: string;
  label: string;
  courseId: string;
  courseVersionId: string;
  manifest: readonly OfficialPackManifestItem[];
  evidenceMatrix: readonly OfficialPackKnowledgePointEvidence[];
  tierPolicy: {
    coreLoopRange: readonly [number, number];
    standardLoopRange: readonly [number, number];
    foundationMinimum: number;
    historicalQuestionsDoNotImplyCurrentFrequency: true;
  };
  protectedAuthoredKnowledgePointIds: readonly string[];
  rights: OfficialPackUseRights;
};

export type OfficialPackBatchCompileRequest = {
  version: 1;
  materialPackId: string;
  courseId: string;
  mode: "deterministic-evidence-matrix";
  target: "course-definition";
  modelUse: "not-authorized";
  publication: "not-authorized";
};

export type OfficialPackKnowledgePointDraft = {
  knowledgePointId: string;
  chapterId: string;
  tier: OfficialPackEvidenceTier;
  targetContract:
    | "preserve-authored-loop"
    | "knowledge-lesson-and-assessments"
    | "knowledge-point-foundation";
  compilationState:
    | "preserved"
    | "ready-for-human-authoring"
    | "pending-evidence";
  existingLessonId: string | null;
  evidenceSourceIds: readonly string[];
  questionEvidenceIds: readonly string[];
  missingStateIds: readonly string[];
};

export type OfficialPackBatchCompileResult = {
  version: 1;
  kind: "official-pack-batch-draft";
  materialPackId: string;
  courseId: string;
  target: "course-definition";
  status: "ready-for-review" | "blocked";
  manifest: {
    includedCount: number;
    excludedCount: number;
    includedArtifactIds: readonly string[];
    excludedArtifactIds: readonly string[];
  };
  coverage: {
    knowledgePointCount: number;
    coveredOrPendingCount: number;
    evidenceReadyCount: number;
    evidencePartialCount: number;
    pendingCount: number;
    coreLoopCount: number;
    standardLoopCount: number;
    foundationCount: number;
    preservedAuthoredLoopCount: number;
  };
  drafts: readonly OfficialPackKnowledgePointDraft[];
  validation: {
    valid: boolean;
    blockingIssueCount: number;
    issues: readonly {
      path: string;
      message: string;
    }[];
  };
  rights: OfficialPackUseRights;
};

export type CourseBuildSourceDecision = {
  sourceId: string;
  disposition: "use" | "review" | "exclude";
  rationale: string;
};

export type CourseBuildPrivateExcerptDecision = {
  excerptId: string;
  disposition: "use" | "review" | "exclude";
  learningUse: string;
  reviewNote: string;
};

export type CourseBuildPrivateOverlayPlan = {
  version: 1;
  overlayId: string;
  courseId: string;
  knowledgePointId: string;
  decisions: readonly CourseBuildPrivateExcerptDecision[];
};

export type CourseBuildPrivateOverlayResult = {
  overlayId: string;
  courseId: string;
  knowledgePointId: string;
  sourceType: SourceType;
  declaredAuthority: SourceAuthority;
  layer: "learner-private";
  authorityReviewStatus: "pending-review";
  excerptCount: number;
  characterCount: number;
  authorizationId: string;
  decisions: readonly CourseBuildPrivateExcerptDecision[];
};

export type PrivateMaterialAnalysisCoverageStatus =
  | "partial"
  | "ready-for-compilation"
  | "unmapped";

export type PrivateMaterialAnalysisCompilationReadiness =
  | "insufficient-for-full-course"
  | "candidate-ready-for-optional-compilation";

export type PrivateMaterialQuestionKind =
  | "short-answer"
  | "term-explanation"
  | "other-subjective";

export type PrivateMaterialSourceAnswerStatus =
  | "missing"
  | "candidate-present-pending-review";

export type PrivateMaterialAnalysisTopicPlan = {
  id: string;
  label: string;
  rationale: string;
  excerptIds: readonly string[];
};

export type PrivateMaterialAnalysisQuestionPlan = {
  id: string;
  topicId: string;
  sourceExcerptIds: readonly string[];
  normalizedPrompt: string;
  questionKind: PrivateMaterialQuestionKind;
  sourceAnswerStatus: PrivateMaterialSourceAnswerStatus;
  answerDraft: {
    referenceAnswer: string;
    structurePoints: readonly string[];
    uncertaintyNote: string;
  };
};

export type PrivateMaterialAnalysisProviderPlan = {
  version: 1;
  overlayId: string;
  courseId: string;
  knowledgePointId: string;
  coverage: {
    status: PrivateMaterialAnalysisCoverageStatus;
    compilationReadiness: PrivateMaterialAnalysisCompilationReadiness;
    summary: string;
  };
  topics: readonly PrivateMaterialAnalysisTopicPlan[];
  questions: readonly PrivateMaterialAnalysisQuestionPlan[];
  unmapped: readonly {
    excerptId: string;
    reason: string;
  }[];
  conflicts: readonly {
    excerptIds: readonly string[];
    description: string;
  }[];
  missingFacts: readonly string[];
};

export type PrivateMaterialLearningQuestion = {
  id: string;
  topicId: string;
  sourceExcerptIds: readonly string[];
  sourceLocators: readonly {
    excerptId: string;
    sectionTitle: string;
    label: string;
    blockIndex: number;
  }[];
  normalizedPrompt: string;
  questionKind: PrivateMaterialQuestionKind;
  promptAuthority: {
    layer: "learner-private";
    status: "pending-review";
  };
  sourceAnswerStatus: PrivateMaterialSourceAnswerStatus;
  generatedReferenceAnswer: {
    label: "NUR / Qwen 生成参考答案 · 尚无来源标准答案";
    authority: "nur-qwen-generated";
    confidence: "generated-pending-review";
    variants: {
      concise: string;
      exam: string;
      expanded: string;
    };
    structurePoints: readonly string[];
    uncertaintyNote: string;
  };
  scoringAuthority: "not-provided";
};

export type PrivateMaterialLearningUnitDraft = {
  version: 1;
  kind: "private-material-learning-unit";
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgePointTitle: string;
  visibility: "private-current-session";
  coverageStatus: PrivateMaterialAnalysisCoverageStatus;
  topics: readonly PrivateMaterialAnalysisTopicPlan[];
  questions: readonly PrivateMaterialLearningQuestion[];
  unmapped: PrivateMaterialAnalysisProviderPlan["unmapped"];
  conflicts: readonly {
    excerptIds: readonly string[];
    description: string;
    status: "pending-review";
  }[];
  missingFacts: readonly string[];
  rights: {
    publication: "not-authorized";
    materialCatalogMutation: "not-authorized";
    courseRegistryMutation: "not-authorized";
    officialCourseCompilation: "not-authorized";
  };
};

export type PrivateMaterialAnalysisResult = {
  version: 1;
  status: "private-material-analysis";
  analysisId: string;
  createdAt: string;
  providerAssist: CourseBuildProviderAssist & {
    status: "used";
    provider: CourseBuildProviderIdentity;
  };
  authorizationId: string;
  overlayId: string;
  contentDigest: string;
  excerptCount: number;
  characterCount: number;
  coverage: PrivateMaterialAnalysisProviderPlan["coverage"] & {
    mappedExcerptCount: number;
    unmappedExcerptCount: number;
  };
  learningUnit: PrivateMaterialLearningUnitDraft;
  authorityNotice: string;
  dataHandlingNotice: string;
};

export type CourseBuildChapterPlan = {
  chapterId: string;
  focus: string;
};

export type CourseBuildKnowledgePointPlan = {
  knowledgePointId: string;
  note: string;
  emphasis: KnowledgeEmphasis;
};

export type CourseBuildPlan = {
  courseTitle: string;
  catalogLabel: string;
  description: string;
  curriculumMode: CurriculumMode;
  chapterPlans: readonly CourseBuildChapterPlan[];
  knowledgePointPlans: readonly CourseBuildKnowledgePointPlan[];
  priorityKnowledgePointIds: readonly string[];
  sourceDecisions: readonly CourseBuildSourceDecision[];
  reviewNotes: readonly string[];
};

export type CourseBuildStepId =
  | "resolve-materials"
  | "separate-authority"
  | "plan-course"
  | "compile-draft"
  | "validate-draft";

export type CourseBuildStep = {
  id: CourseBuildStepId;
  order: number;
  label: string;
  status: "completed" | "attention" | "failed";
  summary: string;
};

export type CourseBuildIssueSeverity = "blocking" | "review" | "notice";

export type CourseBuildIssueCode =
  | "course-validation"
  | "official-pack-validation"
  | "pending-source"
  | "unverified-source"
  | "lesson-coverage"
  | "answer-gap"
  | "teacher-authority-gap"
  | "provider-fallback"
  | "private-overlay-review";

export type CourseBuildIssue = {
  id: string;
  severity: CourseBuildIssueSeverity;
  code: CourseBuildIssueCode;
  path: string;
  title: string;
  detail: string;
  sourceIds: readonly string[];
};

export type CourseBuildCoverage = {
  chapterCount: number;
  knowledgePointCount: number;
  detailedLessonCount: number;
  assessmentCount: number;
  caseCount: number;
  pendingAnswerCount: number;
  contentStatusCounts: Readonly<Record<ContentStatus, number>>;
  assessmentKindCounts: readonly {
    kind: QuestionKind;
    count: number;
  }[];
};

export type CourseBuildSourceCoverage = {
  total: number;
  verified: number;
  available: number;
  pending: number;
  byAuthority: readonly {
    authority: SourceAuthority;
    count: number;
  }[];
};

export type CourseBuildValidation = {
  valid: boolean;
  blockingIssueCount: number;
  reviewIssueCount: number;
  noticeIssueCount: number;
};

export type CourseDraft = {
  version: 1;
  id: string;
  createdAt: string;
  materialPack: CourseBuildMaterialPackSummary;
  providerAssist: CourseBuildProviderAssist;
  draftKind: "official-base" | "private-course-draft";
  privateOverlay: CourseBuildPrivateOverlayResult | null;
  officialPackCompilation: OfficialPackBatchCompileResult;
  status: "ready-for-review" | "blocked";
  publicationReadiness: "preview-ready" | "source-gaps" | "invalid";
  plan: CourseBuildPlan;
  course: CourseDefinition;
  steps: readonly CourseBuildStep[];
  coverage: CourseBuildCoverage;
  sourceCoverage: CourseBuildSourceCoverage;
  issues: readonly CourseBuildIssue[];
  validation: CourseBuildValidation;
  authorityNotice: string;
  dataHandlingNotice: string;
};

export type CourseBuildErrorCode =
  | "invalid-request"
  | "unknown-material-pack"
  | "authorization-invalid"
  | "authorization-consumed"
  | "private-overlay-rejected"
  | "provider-unavailable"
  | "provider-failed"
  | "runtime-failed";

export type CourseBuildErrorResponse = {
  version: 1;
  status: "error";
  code: CourseBuildErrorCode;
  message: string;
  baselineAvailable: boolean;
};

export type CourseBuildResult = {
  version: 1;
  status: "course-draft";
  draft: CourseDraft;
};

export type CourseBuildApiResponse = CourseBuildResult | CourseBuildErrorResponse;

export type CourseBuilderApiResponse =
  | CourseBuildApiResponse
  | PrivateMaterialAnalysisResult;
