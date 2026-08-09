export type CurriculumMode = "tcm-primary" | "western-primary" | "integrated";

export type MaterialStatus = "pending" | "available" | "verified";

export type VersionStatus = "pending" | "demo" | "verified";

export type ContentStatus = "pending" | "demo" | "available" | "verified";

export type LensPerspective = "tcm" | "modern-medicine";

export type LensRelationship = "related" | "learning-aid" | "not-equivalent";

export type SourceRole =
  | "course-material"
  | "course-evidence"
  | "knowledge-reference";

export type SourceAuthority =
  | "publisher"
  | "school"
  | "teacher"
  | "student"
  | "nur-editorial"
  | "clinical-authority";

export type SourceScope =
  | "current-offering"
  | "historical-offering"
  | "general-reference";

export type SourceType =
  | "textbook"
  | "teacher-slide"
  | "review-scope"
  | "past-exam"
  | "question-bank"
  | "answer-key"
  | "study-note"
  | "experiment-manual"
  | "image-set"
  | "transcription"
  | "grading-rubric"
  | "editorial"
  | "clinical-reference";

export type MaterialMediaType =
  | "pdf"
  | "word"
  | "presentation"
  | "image"
  | "archive"
  | "markdown";

export type MaterialTranscriptionStatus =
  | "not-required"
  | "native-text"
  | "ocr-pending"
  | "ocr-transcribed"
  | "ocr-reviewed";

export type MaterialIntegrityStatus =
  | "intact"
  | "tracked-changes"
  | "derived"
  | "misfiled"
  | "pending-review";

export type MaterialPrivacyRisk =
  | "none-observed"
  | "document-metadata"
  | "blank-personal-fields"
  | "identifiable-person";

export type MaterialPublicationPolicy =
  | "local-only"
  | "structured-excerpts-only"
  | "approved";

export type MaterialPathAlias = {
  intakeId: string;
  relativePath: string;
};

export type MaterialAsset = {
  id: string;
  sha256: string;
  byteSize: number;
  mediaType: MaterialMediaType;
  academicContentStatus: MaterialStatus;
  transcriptionStatus: MaterialTranscriptionStatus;
  integrityStatus: MaterialIntegrityStatus;
  privacyRisk: MaterialPrivacyRisk;
  publicationPolicy: MaterialPublicationPolicy;
  originalPathAliases: readonly MaterialPathAlias[];
};

export type MaterialArtifactVersionKind =
  | "original"
  | "format-variant"
  | "tracked-revision"
  | "derived";

export type MaterialDerivationStatus =
  | "not-applicable"
  | "declared"
  | "inferred"
  | "verified";

export type MaterialArtifact = {
  id: string;
  familyId: string;
  assetId: string;
  label: string;
  versionKind: MaterialArtifactVersionKind;
  derivationStatus: MaterialDerivationStatus;
  derivedFromArtifactIds: readonly string[];
};

export type MaterialSourceFamily = {
  id: string;
  label: string;
  artifactIds: readonly string[];
};

export type SourceLocatorKind =
  | "page"
  | "slide"
  | "image"
  | "table"
  | "question"
  | "docx-semantic-block"
  | "ocr-region";

export type SourceLocator = {
  id: string;
  artifactId: string;
  kind: SourceLocatorKind;
  value: string;
  label: string;
};

export type CoreQuestionKind =
  | "a1-single"
  | "b1"
  | "b2"
  | "fill"
  | "term"
  | "short-answer"
  | "case";

export type QuestionKind = CoreQuestionKind | `custom-${string}`;

export type LearningRouteId = "understand" | "express" | "apply";

export type CourseScope = "stage" | "all" | "weak" | "questions";

export type KnowledgeEmphasis = "高频" | "重点" | "基础";

export type VersionDimension =
  | {
      status: "pending";
      value: null;
      missingLabel: string;
      verifiedAt: null;
    }
  | {
      status: "demo";
      value: string;
      missingLabel: null;
      verifiedAt: null;
    }
  | {
      status: "verified";
      value: string;
      missingLabel: null;
      verifiedAt: string;
    };

export type CourseVersion = {
  id: string;
  status: VersionStatus;
  textbookEdition: VersionDimension;
  school: VersionDimension;
  program: VersionDimension;
  learnerYear: VersionDimension;
  teacher: VersionDimension;
  academicYear: VersionDimension;
  semester: VersionDimension;
};

export type SourceCitation = {
  label: string;
  edition: string | null;
  page: string | null;
  slide: string | null;
  academicYear: string | null;
  url: string | null;
};

type SourceReferenceBase = {
  id: string;
  order: number;
  role: SourceRole;
  type: SourceType;
  authority: SourceAuthority;
  scope: SourceScope;
  displayLabel: string;
  materialArtifactIds?: readonly string[];
  locators?: readonly SourceLocator[];
};

export type SourceReference =
  | (SourceReferenceBase & {
      status: "pending";
      missingLabel: string;
      citation: null;
      verifiedAt: null;
    })
  | (SourceReferenceBase & {
      status: "available";
      missingLabel: null;
      citation: SourceCitation;
      verifiedAt: null;
    })
  | (SourceReferenceBase & {
      status: "verified";
      missingLabel: null;
      citation: SourceCitation;
      verifiedAt: string;
    });

type LensContentBase = {
  id: string;
  perspective: LensPerspective;
  title: string;
  sourceIds: readonly string[];
};

export type LensContent =
  | (LensContentBase & {
      status: "pending";
      explanation: null;
      clinicalObservations: readonly [];
      missingLabel: string;
    })
  | (LensContentBase & {
      status: "demo" | "available" | "verified";
      explanation: string;
      clinicalObservations: readonly string[];
      missingLabel: null;
    });

export type LensRelationshipDefinition = {
  id: string;
  fromLensId: string;
  toLensId: string;
  label: LensRelationship;
  status: ContentStatus;
  note: string;
  sourceIds: readonly string[];
};

export type LessonSectionId = "evidence" | "compare" | "output" | "transfer";

export type LessonSectionDefinition = {
  id: LessonSectionId;
  order: number;
  indexLabel: string;
  title: string;
  detail: string;
};

export type EvidencePromptDefinition = {
  id: string;
  label: string;
  question: string;
};

export type EvidenceGroupDefinition = {
  id: string;
  order: number;
  title: string;
  detail: string;
  prompts: readonly EvidencePromptDefinition[];
  sourceIds: readonly string[];
};

export type LensReasoningBlock = {
  id: string;
  perspective: LensPerspective;
  status: "demo" | "available" | "verified";
  eyebrow: string;
  title: string;
  summary: string;
  reasoningSteps: readonly string[];
  boundaryNote: string;
  sourceIds: readonly string[];
};

export type ScoringPerspective = LensPerspective | "boundary";

export type ScoringAuthority =
  | "nur-platform"
  | "course-teacher"
  | "published-answer";

export type PracticeScoringCriterion = {
  id: string;
  order: number;
  perspective: ScoringPerspective;
  label: string;
  detail: string;
  points: number;
};

export type LearningMemoryCriterionDefinition = {
  id: string;
  order: number;
  label: string;
  detail: string;
};

export type StructuralAssistanceRule = {
  criterionId: string;
  memoryCriterionId: string;
  signalGroups: readonly (readonly string[])[];
  nextStepPrompt: string;
  rewriteSuggestion: string;
};

export type PracticeScoringDefinition = {
  id: string;
  status: ContentStatus;
  authority: ScoringAuthority;
  title: string;
  totalPoints: number;
  notice: string;
  prompt: string;
  answerFramework: readonly string[];
  criteria: readonly PracticeScoringCriterion[];
  sourceIds: readonly string[];
};

export type LessonTransferExerciseDefinition = {
  id: string;
  title: string;
  prompt: string;
  evidenceLabels: readonly string[];
  reasoningSteps: readonly string[];
  boundaryNote: string;
  sourceIds: readonly string[];
};

export type AssessmentPromptWording = "source-verbatim" | "nur-adapted";

export type AssessmentAnswerAuthority = ScoringAuthority | "student-compiled";

export type AssessmentAnswerConfidence =
  | "missing"
  | "unverified"
  | "source-cross-checked"
  | "verified";

export type MaterialAnswerVariant = {
  id: string;
  label: string;
  authority: AssessmentAnswerAuthority;
  confidence: Exclude<AssessmentAnswerConfidence, "missing">;
  content: readonly string[];
  sourceArtifactIds: readonly string[];
};

export type MaterialAnswerConflict = {
  id: string;
  prompt: string;
  questionKind: QuestionKind;
  status: "unresolved";
  locators: readonly SourceLocator[];
  variants: readonly MaterialAnswerVariant[];
  notice: string;
};

export type MaterialTranscriptionRecord = {
  id: string;
  artifactId: string;
  status: "ocr-transcribed" | "ocr-reviewed";
  academicContentStatus: MaterialStatus;
  locators: readonly SourceLocator[];
  notice: string;
};

export type MaterialCatalog = {
  id: string;
  assets: readonly MaterialAsset[];
  families: readonly MaterialSourceFamily[];
  artifacts: readonly MaterialArtifact[];
  transcriptions: readonly MaterialTranscriptionRecord[];
  answerConflicts: readonly MaterialAnswerConflict[];
};

export type AssessmentPromptSource = {
  authority: SourceAuthority;
  wording: AssessmentPromptWording;
  locator: string;
  note: string;
  sourceIds: readonly string[];
};

export type AssessmentAnswerDefinition =
  | {
      status: "missing";
      authority: null;
      confidence: "missing";
      content: null;
      notice: string;
      sourceIds: readonly [];
    }
  | {
      status: "available";
      authority: AssessmentAnswerAuthority;
      confidence: Exclude<AssessmentAnswerConfidence, "missing">;
      content: readonly string[];
      notice: string;
      sourceIds: readonly string[];
    }
  | {
      status: "conflict";
      authority: null;
      confidence: "unverified";
      content: null;
      notice: string;
      sourceIds: readonly string[];
      variants: readonly MaterialAnswerVariant[];
    };

export type AssessmentScoringDefinition = {
  id: string;
  standardVersion: string;
  status: "demo" | "available" | "verified";
  authority: ScoringAuthority;
  title: string;
  totalPoints: number;
  suggestedCharacters: number;
  notice: string;
  answerFramework: readonly string[];
  criteria: readonly PracticeScoringCriterion[];
  assistanceRules: readonly StructuralAssistanceRule[];
  sourceIds: readonly string[];
};

export type KnowledgeLessonDefinition = {
  id: string;
  status: "demo" | "available" | "verified";
  eyebrow: string;
  objective: string;
  durationMinutes: number;
  sections: readonly LessonSectionDefinition[];
  evidenceGroups: readonly EvidenceGroupDefinition[];
  lensBlocks: readonly LensReasoningBlock[];
  scoring: PracticeScoringDefinition;
  transferCaseId: string | null;
  transferExercise: LessonTransferExerciseDefinition | null;
  sourceIds: readonly string[];
};

export type KnowledgePointDefinition = {
  id: string;
  slug: string;
  order: number;
  title: string;
  note: string;
  emphasis: KnowledgeEmphasis;
  contentStatus: ContentStatus;
  evidenceFramework: readonly string[];
  lenses: readonly LensContent[];
  relationships: readonly LensRelationshipDefinition[];
  learningMemoryCriteria: readonly LearningMemoryCriterionDefinition[];
  sourceIds: readonly string[];
  learningTaskIds: readonly string[];
  assessmentItemIds: readonly string[];
  caseIds: readonly string[];
  lesson: KnowledgeLessonDefinition | null;
};

export type ChapterDefinition = {
  id: string;
  slug: string;
  order: number;
  indexLabel: string;
  title: string;
  focus: string;
  knowledgePointIds: readonly string[];
};

export type LearningRouteDefinition = {
  id: LearningRouteId;
  order: number;
  indexLabel: string;
  title: string;
  detail: string;
  guidance: string;
};

export type LearningTaskDefinition = {
  id: string;
  knowledgePointId: string;
  routeId: LearningRouteId;
  status: ContentStatus;
  prompt: string;
  sourceIds: readonly string[];
};

export type AssessmentItemDefinition = {
  id: string;
  order: number;
  knowledgePointId: string;
  questionKind: QuestionKind;
  status: ContentStatus;
  prompt: string;
  promptSource: AssessmentPromptSource;
  choices?: readonly string[];
  correctChoiceIndex?: number;
  answer: AssessmentAnswerDefinition;
  scoring: AssessmentScoringDefinition | null;
  sourceIds: readonly string[];
};

/**
 * B1/B2 组题契约（2026-08-06 用户口头确认语义，记录为来源）：
 * - B1 共用备选答案配伍题：一组选项（sharedChoices）供组内多个小题共用、可重复选择；
 * - B2 共用题干题组：一个病例/题干（groupPrompt）下多个小题，小题为单选。
 * UI 展示层按成员平铺，但每个成员渲染时携带组上下文。
 */
export type AssessmentItemGroupDefinition = {
  id: string;
  order: number;
  questionKind: "b1" | "b2";
  status: ContentStatus;
  groupPrompt: string | null;
  sharedChoices: readonly string[] | null;
  promptSource: AssessmentPromptSource;
  members: readonly AssessmentItemDefinition[];
  sourceIds: readonly string[];
};

export type CaseReasoningStage =
  | "evidence"
  | "mechanism"
  | "syndrome"
  | "differential";

export type CaseEvidenceRole = "key" | "supporting" | "missing";

export type CaseEvidenceDefinition = {
  id: string;
  order: number;
  label: string;
  detail: string;
  role: CaseEvidenceRole;
  requiredForReasoning: boolean;
};

export type CaseReasoningStepDefinition = {
  id: string;
  order: number;
  stage: CaseReasoningStage;
  label: string;
  prompt: string;
  placeholder: string;
  minimumCharacters: number;
  answerFramework: readonly string[];
  sourceIds: readonly string[];
};

export type CaseScoringPerspective = ScoringPerspective | "shared-evidence";

export type CaseScoringCriterion = {
  id: string;
  order: number;
  stage: CaseReasoningStage;
  perspective: CaseScoringPerspective;
  label: string;
  detail: string;
  points: number;
};

export type CaseScoringDefinition = {
  id: string;
  standardVersion: string;
  status: "demo" | "available" | "verified";
  authority: ScoringAuthority;
  title: string;
  totalPoints: number;
  notice: string;
  criteria: readonly CaseScoringCriterion[];
  assistanceRules: readonly StructuralAssistanceRule[];
  sourceIds: readonly string[];
};

export type CaseReasoningAnswerDefinition = {
  authority: AssessmentAnswerAuthority;
  confidence: Exclude<AssessmentAnswerConfidence, "missing">;
  notice: string;
  sourceIds: readonly string[];
};

export type CaseDefinition = {
  id: string;
  order: number;
  knowledgePointIds: readonly string[];
  status: ContentStatus;
  eyebrow: string;
  title: string;
  stem: string;
  promptSource: AssessmentPromptSource;
  evidence: readonly CaseEvidenceDefinition[];
  reasoningSteps: readonly CaseReasoningStepDefinition[];
  answer: CaseReasoningAnswerDefinition;
  scoring: CaseScoringDefinition;
  boundaryNote: string;
  sourceIds: readonly string[];
};

export type ExamBlueprintRow = {
  id: string;
  order: number;
  kind: QuestionKind;
  label: string;
  count: number;
  pointsEach: number;
  totalPoints: number;
};

export type ExamBlueprintSummaryGroup = {
  id: string;
  order: number;
  label: string;
  questionKinds: readonly QuestionKind[];
};

export type ExamPriorityNotice = {
  lead: string;
  questionKinds: readonly QuestionKind[];
  guidance: string;
};

export type ExamBlueprintIntegrityRule = {
  kind: QuestionKind;
  totalPoints: number;
};

export type ExamBlueprintIntegrity = {
  expectedTotalPoints: number;
  expectedKindTotals: readonly ExamBlueprintIntegrityRule[];
};

export type ExamBlueprint = {
  id: string;
  title: string;
  status: "pending" | "available" | "verified";
  missingLabel: string | null;
  provenance: "user-provided" | "verified-source";
  scope: {
    school: string;
    program: string;
    learnerYear: string;
    academicYear: string;
    semester: string;
    teacher: string | null;
  };
  sourceIds: readonly string[];
  totalPoints: number;
  rows: readonly ExamBlueprintRow[];
  summaryGroups: readonly ExamBlueprintSummaryGroup[];
  priorityNotice: ExamPriorityNotice | null;
  integrity: ExamBlueprintIntegrity | null;
};

export type UserExamStructureRow = {
  id: string;
  label: string;
  count: number;
  pointsEach: number;
};

export type UserExamStructure = {
  version: 1;
  courseId: string;
  label: string;
  rows: readonly UserExamStructureRow[];
  updatedAt: string;
};

export type CourseDefinition = {
  id: string;
  slug: string;
  title: string;
  catalogLabel: string;
  classification: string;
  description: string;
  ghostWordmark: string;
  curriculumMode: CurriculumMode;
  contentStatus: ContentStatus;
  version: CourseVersion;
  sources: readonly SourceReference[];
  examBlueprint: ExamBlueprint;
  learningRoutes: readonly LearningRouteDefinition[];
  chapters: readonly ChapterDefinition[];
  knowledgePoints: readonly KnowledgePointDefinition[];
  learningTasks: readonly LearningTaskDefinition[];
  assessmentItems: readonly AssessmentItemDefinition[];
  assessmentGroups: readonly AssessmentItemGroupDefinition[];
  cases: readonly CaseDefinition[];
};

export type ChapterLearnerProgress = {
  chapterId: string;
  progress: number;
  learnedUnits: number;
  totalUnits: number;
  completedKnowledgePointIds: readonly string[];
};

export type LearnerProfile = {
  displayName: string;
  major: string;
  avatarLabel: string;
};

export type LearnerStage = {
  id: string;
  label: string;
  chapterIds: readonly string[];
  assessmentLabel: string;
};

export type StudySessionStep = {
  id: string;
  order: number;
  routeId: LearningRouteId;
  minutes: number;
  title: string;
  detail: string;
  drawerTitle: string;
};

export type LearnerCourseState = {
  id: string;
  courseId: string;
  dataMode: "demo";
  demoLabel: string;
  profile: LearnerProfile;
  overallProgress: number;
  learnedUnits: number;
  totalUnits: number;
  currentStage: LearnerStage;
  currentChapterId: string;
  currentKnowledgePointId: string;
  defaultRouteId: LearningRouteId;
  chapterProgress: readonly ChapterLearnerProgress[];
  sessionDurationMinutes: number;
  sessionSteps: readonly StudySessionStep[];
};

export type LearningAttemptSurface = "subjective-writing" | "case-reasoning";

export type LearningAssistancePreferences = {
  currentAnswerEnabled: boolean;
  confirmedHistoryEnabled: boolean;
  nextStepPromptEnabled: boolean;
  historySuggestionHandled: boolean;
};

export type LearnerAttemptCriterionResult = {
  criterionId: string;
  memoryCriterionId: string;
  status: "present" | "missing";
};

export type LearnerAttemptRecord = {
  version: 1;
  id: string;
  courseId: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
  confirmedText: string;
  confirmedAt: string;
  scoringStandard: {
    id: string;
    version: string;
    authority: ScoringAuthority;
  };
  criterionResults: readonly LearnerAttemptCriterionResult[];
  answerConfidence: AssessmentAnswerConfidence;
};

export type ReviewReturnTarget = {
  surface: LearningAttemptSurface;
  taskId: string;
  segmentId: string | null;
};

export type ReviewPlanTaskStatus =
  | "proposed"
  | "accepted"
  | "declined"
  | "completed";

export type ReviewPlanTask = {
  version: 1;
  id: string;
  courseId: string;
  knowledgePointId: string;
  criterionIds: readonly string[];
  resolvedCriterionIds: readonly string[];
  returnTargets: readonly ReviewReturnTarget[];
  status: ReviewPlanTaskStatus;
  proposedAt: string;
  acceptedAt: string | null;
  dueAt: string | null;
  declinedAt: string | null;
  completedAt: string | null;
  lastPromptedAttemptId: string;
};

export type ScoringStandardUpdateNotice = {
  version: 1;
  id: string;
  courseId: string;
  knowledgePointId: string;
  scoringStandardId: string;
  fromVersion: string;
  toVersion: string;
  createdAt: string;
  dismissedAt: string | null;
};

export type FsrsCriterionState = {
  state: "new" | "learning" | "review" | "relearning";
  difficulty: number;
  stability: number;
  reps: number;
  lapses: number;
  lastReviewAt: string | null;
};

export type FsrsLearningState = {
  version: 2;
  criteria: Record<string, FsrsCriterionState>;
};

export type LearningMemoryState = {
  version: 2;
  preferences: LearningAssistancePreferences;
  attempts: readonly LearnerAttemptRecord[];
  reviewTasks: readonly ReviewPlanTask[];
  standardUpdateNotices: readonly ScoringStandardUpdateNotice[];
  fsrsState: FsrsLearningState | null;
};
