import type {
  OfficialCourseMaterialPack,
  OfficialPackBatchCompileRequest,
  OfficialPackBatchCompileResult,
} from "@/types/course-builder";
import type { CourseDefinition, MaterialCatalog } from "@/types/learning";

export type OfficialPackValidationIssue = {
  path: string;
  message: string;
};

export type OfficialPackValidationResult = {
  valid: boolean;
  issues: readonly OfficialPackValidationIssue[];
};

function addIssue(
  issues: OfficialPackValidationIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}

function unique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

function sameSet(actual: readonly string[], expected: readonly string[]): boolean {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  return actualSet.size === expectedSet.size
    && Array.from(expectedSet).every((value) => actualSet.has(value));
}

export function validateOfficialCourseMaterialPack(
  pack: OfficialCourseMaterialPack,
  course: CourseDefinition,
  catalog: MaterialCatalog,
): OfficialPackValidationResult {
  const issues: OfficialPackValidationIssue[] = [];
  const knownSourceIds = new Set(course.sources.map((source) => source.id));
  const knownKnowledgePointIds = course.knowledgePoints.map((point) => point.id);
  const assetById = new Map(catalog.assets.map((asset) => [asset.id, asset]));
  const familyById = new Map(catalog.families.map((family) => [family.id, family]));
  const artifactById = new Map(catalog.artifacts.map((artifact) => [artifact.id, artifact]));
  const includedArtifactIds = new Set(
    pack.manifest
      .filter((item) => item.disposition === "include")
      .map((item) => item.artifactId),
  );

  if (pack.courseId !== course.id) {
    addIssue(issues, "courseId", "must match the compiled course");
  }
  if (pack.courseVersionId !== course.version.id) {
    addIssue(issues, "courseVersionId", "must match the compiled course version");
  }
  if (pack.rights.modelUse !== "not-authorized-by-pack"
    || pack.rights.publication !== "not-authorized"
    || pack.rights.materialCatalogMutation !== "not-authorized"
    || pack.rights.courseRegistryMutation !== "not-authorized"
  ) {
    addIssue(issues, "rights", "the pack must not grant model, publication, catalog, or registry rights");
  }
  if (!pack.tierPolicy.historicalQuestionsDoNotImplyCurrentFrequency) {
    addIssue(issues, "tierPolicy", "historical questions must not imply current frequency");
  }

  if (!unique(pack.manifest.map((item) => item.id))) {
    addIssue(issues, "manifest.id", "manifest IDs must be unique");
  }
  if (!unique(pack.manifest.map((item) => item.artifactId))) {
    addIssue(issues, "manifest.artifactId", "each material artifact must appear once");
  }

  pack.manifest.forEach((item, index) => {
    const path = `manifest[${index}]`;
    const asset = assetById.get(item.assetId);
    const family = familyById.get(item.familyId);
    const artifact = artifactById.get(item.artifactId);
    if (!asset) {
      addIssue(issues, `${path}.assetId`, `references unknown asset: ${item.assetId}`);
    }
    if (!family) {
      addIssue(issues, `${path}.familyId`, `references unknown family: ${item.familyId}`);
    }
    if (!artifact) {
      addIssue(issues, `${path}.artifactId`, `references unknown artifact: ${item.artifactId}`);
    } else if (artifact.assetId !== item.assetId || artifact.familyId !== item.familyId) {
      addIssue(issues, path, "asset/family/artifact relationship does not match the material catalog");
    }
    if (family && !family.artifactIds.includes(item.artifactId)) {
      addIssue(issues, `${path}.familyId`, "family does not include the manifest artifact");
    }
    if (asset && asset.academicContentStatus !== item.academicContentStatus) {
      addIssue(issues, `${path}.academicContentStatus`, "must match the material asset status");
    }
    if (item.disposition === "include") {
      if (!item.sourceId || !knownSourceIds.has(item.sourceId)) {
        addIssue(issues, `${path}.sourceId`, "included material must reference a known course source");
      }
    } else {
      if (item.sourceId !== null) {
        addIssue(issues, `${path}.sourceId`, "excluded material cannot enter a course source");
      }
      if (asset?.integrityStatus !== "misfiled" || asset.publicationPolicy !== "local-only") {
        addIssue(issues, path, "excluded misfiled exams must remain misfiled and local-only");
      }
    }
  });

  if (!unique(pack.evidenceMatrix.map((item) => item.knowledgePointId))
    || !sameSet(
      pack.evidenceMatrix.map((item) => item.knowledgePointId),
      knownKnowledgePointIds,
    )
  ) {
    addIssue(issues, "evidenceMatrix", "must cover every course knowledge point exactly once");
  }

  const coreLoopCount = pack.evidenceMatrix.filter((item) => item.tier === "core-loop").length;
  const standardLoopCount = pack.evidenceMatrix.filter((item) => item.tier === "standard-loop").length;
  const foundationCount = pack.evidenceMatrix.filter((item) => item.tier === "foundation").length;
  if (coreLoopCount < pack.tierPolicy.coreLoopRange[0]
    || coreLoopCount > pack.tierPolicy.coreLoopRange[1]
  ) {
    addIssue(issues, "tierPolicy.coreLoopRange", "core-loop count is outside the declared range");
  }
  if (standardLoopCount < pack.tierPolicy.standardLoopRange[0]
    || standardLoopCount > pack.tierPolicy.standardLoopRange[1]
  ) {
    addIssue(issues, "tierPolicy.standardLoopRange", "standard-loop count is outside the declared range");
  }
  if (foundationCount < pack.tierPolicy.foundationMinimum) {
    addIssue(issues, "tierPolicy.foundationMinimum", "foundation coverage is below the declared minimum");
  }

  const courseLessonPointIds = course.knowledgePoints
    .filter((point) => point.lesson !== null)
    .map((point) => point.id);
  if (!unique(pack.protectedAuthoredKnowledgePointIds)
    || !sameSet(pack.protectedAuthoredKnowledgePointIds, courseLessonPointIds)
  ) {
    addIssue(
      issues,
      "protectedAuthoredKnowledgePointIds",
      "must protect every currently authored deep loop exactly once",
    );
  }

  pack.evidenceMatrix.forEach((entry, entryIndex) => {
    const path = `evidenceMatrix[${entryIndex}]`;
    const point = course.knowledgePoints.find((candidate) => (
      candidate.id === entry.knowledgePointId
    ));
    const chapter = course.chapters.find((candidate) => (
      candidate.knowledgePointIds.includes(entry.knowledgePointId)
    ));
    if (!point) {
      addIssue(issues, `${path}.knowledgePointId`, "references unknown knowledge point");
    }
    if (!chapter || chapter.id !== entry.chapterId) {
      addIssue(issues, `${path}.chapterId`, "must match the knowledge point chapter");
    }
    if (entry.evidence.length === 0) {
      addIssue(issues, `${path}.evidence`, "must retain at least one evidence or pending locator");
    }
    if (entry.missingStates.length === 0) {
      addIssue(issues, `${path}.missingStates`, "must expose unresolved source states");
    }
    if (!unique(entry.missingStates.map((state) => state.id))) {
      addIssue(issues, `${path}.missingStates.id`, "missing-state IDs must be unique");
    }

    entry.evidence.forEach((evidence, evidenceIndex) => {
      const evidencePath = `${path}.evidence[${evidenceIndex}]`;
      if (!knownSourceIds.has(evidence.sourceId)) {
        addIssue(issues, `${evidencePath}.sourceId`, `references unknown source: ${evidence.sourceId}`);
      }
      if (!includedArtifactIds.has(evidence.artifactId)) {
        addIssue(issues, `${evidencePath}.artifactId`, "must reference an included manifest artifact");
      }
      if (evidence.locators.length === 0) {
        addIssue(issues, `${evidencePath}.locators`, "must retain a locator or explicit pending locator");
      }
      evidence.locators.forEach((locator, locatorIndex) => {
        if (locator.artifactId !== evidence.artifactId) {
          addIssue(
            issues,
            `${evidencePath}.locators[${locatorIndex}].artifactId`,
            "must match its evidence artifact",
          );
        }
      });
    });

    if (!unique(entry.questions.map((question) => question.id))) {
      addIssue(issues, `${path}.questions.id`, "question evidence IDs must be unique");
    }
    entry.questions.forEach((question, questionIndex) => {
      const questionPath = `${path}.questions[${questionIndex}]`;
      if (!knownSourceIds.has(question.sourceId)) {
        addIssue(issues, `${questionPath}.sourceId`, "references unknown course source");
      }
      if (question.locator && !includedArtifactIds.has(question.locator.artifactId)) {
        addIssue(issues, `${questionPath}.locator.artifactId`, "must reference an included artifact");
      }
      if (question.currentFrequencyClaim !== "not-authorized") {
        addIssue(issues, `${questionPath}.currentFrequencyClaim`, "cannot infer current frequency");
      }
      if (question.normalizationStatus === "source-located"
        && (question.prompt !== null || question.answer.status !== "missing")
      ) {
        addIssue(
          issues,
          questionPath,
          "source-located questions must remain prompt-unexpanded and answer-missing",
        );
      }
      if (question.answer.status === "missing"
        && (question.answer.content !== null || question.answer.confidence !== "missing")
      ) {
        addIssue(issues, `${questionPath}.answer`, "missing answers cannot expose content or confidence");
      }
    });
  });

  return { valid: issues.length === 0, issues };
}

export function assertValidOfficialCourseMaterialPack(
  pack: OfficialCourseMaterialPack,
  course: CourseDefinition,
  catalog: MaterialCatalog,
): void {
  const result = validateOfficialCourseMaterialPack(pack, course, catalog);
  if (!result.valid) {
    throw new Error(
      result.issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n"),
    );
  }
}

export function createOfficialPackBatchCompileRequest(
  pack: OfficialCourseMaterialPack,
): OfficialPackBatchCompileRequest {
  return {
    version: 1,
    materialPackId: pack.id,
    courseId: pack.courseId,
    mode: "deterministic-evidence-matrix",
    target: "course-definition",
    modelUse: "not-authorized",
    publication: "not-authorized",
  };
}

export function compileOfficialCourseMaterialPack(
  request: OfficialPackBatchCompileRequest,
  pack: OfficialCourseMaterialPack,
  course: CourseDefinition,
  catalog: MaterialCatalog,
): OfficialPackBatchCompileResult {
  const requestIssues: OfficialPackValidationIssue[] = [];
  if (request.materialPackId !== pack.id || request.courseId !== pack.courseId) {
    addIssue(requestIssues, "request", "material pack or course identity does not match");
  }
  if (request.mode !== "deterministic-evidence-matrix"
    || request.target !== "course-definition"
    || request.modelUse !== "not-authorized"
    || request.publication !== "not-authorized"
  ) {
    addIssue(requestIssues, "request", "batch compilation must remain deterministic and non-granting");
  }
  const packValidation = validateOfficialCourseMaterialPack(pack, course, catalog);
  const validationIssues = [...requestIssues, ...packValidation.issues];
  const includedManifest = pack.manifest.filter((item) => item.disposition === "include");
  const excludedManifest = pack.manifest.filter((item) => item.disposition === "exclude");
  const protectedIds = new Set(pack.protectedAuthoredKnowledgePointIds);
  const drafts = pack.evidenceMatrix.map((entry) => {
    const point = course.knowledgePoints.find((candidate) => (
      candidate.id === entry.knowledgePointId
    ));
    const preserved = protectedIds.has(entry.knowledgePointId) && point?.lesson !== null;
    return {
      knowledgePointId: entry.knowledgePointId,
      chapterId: entry.chapterId,
      tier: entry.tier,
      targetContract: preserved
        ? "preserve-authored-loop" as const
        : entry.tier === "foundation"
          ? "knowledge-point-foundation" as const
          : "knowledge-lesson-and-assessments" as const,
      compilationState: preserved
        ? "preserved" as const
        : entry.coverageStatus === "pending"
          ? "pending-evidence" as const
          : "ready-for-human-authoring" as const,
      existingLessonId: point?.lesson?.id ?? null,
      evidenceSourceIds: Array.from(new Set(entry.evidence.map((evidence) => evidence.sourceId))),
      questionEvidenceIds: entry.questions.map((question) => question.id),
      missingStateIds: entry.missingStates.map((state) => state.id),
    };
  });

  return {
    version: 1,
    kind: "official-pack-batch-draft",
    materialPackId: pack.id,
    courseId: pack.courseId,
    target: "course-definition",
    status: validationIssues.length === 0 ? "ready-for-review" : "blocked",
    manifest: {
      includedCount: includedManifest.length,
      excludedCount: excludedManifest.length,
      includedArtifactIds: includedManifest.map((item) => item.artifactId),
      excludedArtifactIds: excludedManifest.map((item) => item.artifactId),
    },
    coverage: {
      knowledgePointCount: pack.evidenceMatrix.length,
      coveredOrPendingCount: pack.evidenceMatrix.filter((entry) => (
        ["evidence-ready", "evidence-partial", "pending"].includes(entry.coverageStatus)
      )).length,
      evidenceReadyCount: pack.evidenceMatrix.filter((entry) => entry.coverageStatus === "evidence-ready").length,
      evidencePartialCount: pack.evidenceMatrix.filter((entry) => entry.coverageStatus === "evidence-partial").length,
      pendingCount: pack.evidenceMatrix.filter((entry) => entry.coverageStatus === "pending").length,
      coreLoopCount: pack.evidenceMatrix.filter((entry) => entry.tier === "core-loop").length,
      standardLoopCount: pack.evidenceMatrix.filter((entry) => entry.tier === "standard-loop").length,
      foundationCount: pack.evidenceMatrix.filter((entry) => entry.tier === "foundation").length,
      preservedAuthoredLoopCount: drafts.filter((draft) => draft.compilationState === "preserved").length,
    },
    drafts,
    validation: {
      valid: validationIssues.length === 0,
      blockingIssueCount: validationIssues.length,
      issues: validationIssues,
    },
    rights: pack.rights,
  };
}
