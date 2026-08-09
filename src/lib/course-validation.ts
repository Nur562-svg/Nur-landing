import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
  CaseDefinition,
  CaseReasoningStage,
  CourseDefinition,
  KnowledgeLessonDefinition,
  LearnerCourseState,
  LensRelationship,
  MaterialCatalog,
  StructuralAssistanceRule,
  VersionDimension,
} from "@/types/learning";
import { validateSourceMaterialReferences } from "@/lib/material-validation";

export type CourseValidationIssue = {
  path: string;
  message: string;
};

export type CourseValidationResult = {
  valid: boolean;
  issues: readonly CourseValidationIssue[];
};

const urlSafeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedRelationshipLabels = new Set<LensRelationship>([
  "related",
  "learning-aid",
  "not-equivalent",
]);
const requiredLessonSections = new Set([
  "evidence",
  "compare",
  "output",
  "transfer",
]);
const requiredCaseStages = new Set<CaseReasoningStage>([
  "evidence",
  "mechanism",
  "syndrome",
  "differential",
]);

function addIssue(
  issues: CourseValidationIssue[],
  path: string,
  message: string,
) {
  issues.push({ path, message });
}

function validateNonEmpty(
  value: string,
  issues: CourseValidationIssue[],
  path: string,
) {
  if (value.trim().length === 0) {
    addIssue(issues, path, "must not be empty");
  }
}

function validateSlug(
  value: string,
  issues: CourseValidationIssue[],
  path: string,
) {
  if (!urlSafeSlugPattern.test(value)) {
    addIssue(issues, path, `must be URL-safe: ${value}`);
  }
}

function validateUnique<T extends string | number>(
  values: readonly T[],
  issues: CourseValidationIssue[],
  path: string,
) {
  const seen = new Set<T>();

  values.forEach((value) => {
    if (seen.has(value)) {
      addIssue(issues, path, `contains duplicate value: ${value}`);
    }
    seen.add(value);
  });
}

function validateStructuralAssistanceRules(
  rules: readonly StructuralAssistanceRule[],
  criterionIds: ReadonlySet<string>,
  memoryCriterionIds: ReadonlySet<string>,
  issues: CourseValidationIssue[],
  path: string,
) {
  if (rules.length !== criterionIds.size) {
    addIssue(issues, path, "must contain exactly one rule for every scoring criterion");
  }
  validateUnique(rules.map((rule) => rule.criterionId), issues, `${path}.criterionId`);

  rules.forEach((rule, index) => {
    const rulePath = `${path}[${index}]`;
    if (!criterionIds.has(rule.criterionId)) {
      addIssue(issues, `${rulePath}.criterionId`, "must reference a scoring criterion");
    }
    if (!memoryCriterionIds.has(rule.memoryCriterionId)) {
      addIssue(issues, `${rulePath}.memoryCriterionId`, "must reference the owning knowledge point");
    }
    if (rule.signalGroups.length === 0) {
      addIssue(issues, `${rulePath}.signalGroups`, "must contain at least one signal group");
    }
    rule.signalGroups.forEach((group, groupIndex) => {
      if (group.length === 0) {
        addIssue(issues, `${rulePath}.signalGroups[${groupIndex}]`, "must contain at least one signal");
      }
      group.forEach((signal, signalIndex) => {
        validateNonEmpty(
          signal,
          issues,
          `${rulePath}.signalGroups[${groupIndex}][${signalIndex}]`,
        );
      });
    });
    validateNonEmpty(rule.nextStepPrompt, issues, `${rulePath}.nextStepPrompt`);
    validateNonEmpty(rule.rewriteSuggestion, issues, `${rulePath}.rewriteSuggestion`);
  });
}

function validateOrdered(
  items: readonly { order: number }[],
  issues: CourseValidationIssue[],
  path: string,
) {
  validateUnique(
    items.map((item) => item.order),
    issues,
    `${path}.order`,
  );

  items.forEach((item, index) => {
    if (!Number.isInteger(item.order) || item.order < 1) {
      addIssue(issues, `${path}[${index}].order`, "must be a positive integer");
    }

    if (index > 0 && item.order <= items[index - 1].order) {
      addIssue(issues, `${path}[${index}].order`, "must be in stable ascending order");
    }
  });
}

function validateVersionDimension(
  dimension: VersionDimension,
  issues: CourseValidationIssue[],
  path: string,
) {
  if (dimension.status === "pending") {
    validateNonEmpty(dimension.missingLabel, issues, `${path}.missingLabel`);
    if (dimension.value !== null || dimension.verifiedAt !== null) {
      addIssue(issues, path, "pending version dimensions cannot contain a value or verification date");
    }
    return;
  }

  validateNonEmpty(dimension.value, issues, `${path}.value`);
  if (dimension.missingLabel !== null) {
    addIssue(issues, `${path}.missingLabel`, "resolved version dimensions cannot have a missing label");
  }

  if (dimension.status === "verified") {
    validateNonEmpty(dimension.verifiedAt, issues, `${path}.verifiedAt`);
  } else if (dimension.verifiedAt !== null) {
    addIssue(issues, `${path}.verifiedAt`, "demo version dimensions cannot have a verification date");
  }
}

function validateResolvedSourceUrl(
  value: string,
  issues: CourseValidationIssue[],
  path: string,
) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      addIssue(issues, path, "must use an http or https URL");
    }
  } catch {
    addIssue(issues, path, "must be a valid URL");
  }
}

function validateReferencedSources(
  sourceIds: readonly string[],
  knownSourceIds: ReadonlySet<string>,
  issues: CourseValidationIssue[],
  path: string,
) {
  validateUnique(sourceIds, issues, path);
  sourceIds.forEach((sourceId) => {
    if (!knownSourceIds.has(sourceId)) {
      addIssue(issues, path, `references unknown source: ${sourceId}`);
    }
  });
}

function validateLesson(
  lesson: KnowledgeLessonDefinition,
  knownSourceIds: ReadonlySet<string>,
  issues: CourseValidationIssue[],
  path: string,
) {
  validateNonEmpty(lesson.id, issues, `${path}.id`);
  validateNonEmpty(lesson.eyebrow, issues, `${path}.eyebrow`);
  validateNonEmpty(lesson.objective, issues, `${path}.objective`);
  if (!Number.isInteger(lesson.durationMinutes) || lesson.durationMinutes < 1) {
    addIssue(issues, `${path}.durationMinutes`, "must be a positive integer");
  }

  validateOrdered(lesson.sections, issues, `${path}.sections`);
  validateUnique(lesson.sections.map((section) => section.id), issues, `${path}.sections.id`);
  requiredLessonSections.forEach((sectionId) => {
    if (!lesson.sections.some((section) => section.id === sectionId)) {
      addIssue(issues, `${path}.sections`, `is missing required section: ${sectionId}`);
    }
  });
  lesson.sections.forEach((section, index) => {
    validateNonEmpty(section.indexLabel, issues, `${path}.sections[${index}].indexLabel`);
    validateNonEmpty(section.title, issues, `${path}.sections[${index}].title`);
    validateNonEmpty(section.detail, issues, `${path}.sections[${index}].detail`);
  });

  validateOrdered(lesson.evidenceGroups, issues, `${path}.evidenceGroups`);
  validateUnique(lesson.evidenceGroups.map((group) => group.id), issues, `${path}.evidenceGroups.id`);
  if (lesson.evidenceGroups.length === 0) {
    addIssue(issues, `${path}.evidenceGroups`, "must contain at least one group");
  }
  const evidencePromptIds = lesson.evidenceGroups.flatMap((group) => (
    group.prompts.map((prompt) => prompt.id)
  ));
  validateUnique(evidencePromptIds, issues, `${path}.evidenceGroups.prompts.id`);
  lesson.evidenceGroups.forEach((group, groupIndex) => {
    validateNonEmpty(group.title, issues, `${path}.evidenceGroups[${groupIndex}].title`);
    validateNonEmpty(group.detail, issues, `${path}.evidenceGroups[${groupIndex}].detail`);
    if (group.prompts.length === 0) {
      addIssue(issues, `${path}.evidenceGroups[${groupIndex}].prompts`, "must contain at least one prompt");
    }
    group.prompts.forEach((prompt, promptIndex) => {
      validateNonEmpty(prompt.label, issues, `${path}.evidenceGroups[${groupIndex}].prompts[${promptIndex}].label`);
      validateNonEmpty(prompt.question, issues, `${path}.evidenceGroups[${groupIndex}].prompts[${promptIndex}].question`);
    });
    validateReferencedSources(
      group.sourceIds,
      knownSourceIds,
      issues,
      `${path}.evidenceGroups[${groupIndex}].sourceIds`,
    );
  });

  validateUnique(lesson.lensBlocks.map((block) => block.id), issues, `${path}.lensBlocks.id`);
  validateUnique(lesson.lensBlocks.map((block) => block.perspective), issues, `${path}.lensBlocks.perspective`);
  if (lesson.lensBlocks.length === 0) {
    addIssue(issues, `${path}.lensBlocks`, "must contain at least one perspective");
  }
  lesson.lensBlocks.forEach((block, blockIndex) => {
    validateNonEmpty(block.eyebrow, issues, `${path}.lensBlocks[${blockIndex}].eyebrow`);
    validateNonEmpty(block.title, issues, `${path}.lensBlocks[${blockIndex}].title`);
    validateNonEmpty(block.summary, issues, `${path}.lensBlocks[${blockIndex}].summary`);
    validateNonEmpty(block.boundaryNote, issues, `${path}.lensBlocks[${blockIndex}].boundaryNote`);
    if (block.reasoningSteps.length === 0) {
      addIssue(issues, `${path}.lensBlocks[${blockIndex}].reasoningSteps`, "must contain at least one step");
    }
    block.reasoningSteps.forEach((step, stepIndex) => {
      validateNonEmpty(step, issues, `${path}.lensBlocks[${blockIndex}].reasoningSteps[${stepIndex}]`);
    });
    validateReferencedSources(
      block.sourceIds,
      knownSourceIds,
      issues,
      `${path}.lensBlocks[${blockIndex}].sourceIds`,
    );
  });

  const scoringPath = `${path}.scoring`;
  validateNonEmpty(lesson.scoring.id, issues, `${scoringPath}.id`);
  validateNonEmpty(lesson.scoring.title, issues, `${scoringPath}.title`);
  validateNonEmpty(lesson.scoring.notice, issues, `${scoringPath}.notice`);
  validateNonEmpty(lesson.scoring.prompt, issues, `${scoringPath}.prompt`);
  if (lesson.scoring.totalPoints <= 0) {
    addIssue(issues, `${scoringPath}.totalPoints`, "must be greater than zero");
  }
  if (lesson.scoring.answerFramework.length === 0) {
    addIssue(issues, `${scoringPath}.answerFramework`, "must contain at least one step");
  }
  if (lesson.scoring.criteria.length === 0) {
    addIssue(issues, `${scoringPath}.criteria`, "must contain at least one criterion");
  }
  validateOrdered(lesson.scoring.criteria, issues, `${scoringPath}.criteria`);
  validateUnique(lesson.scoring.criteria.map((criterion) => criterion.id), issues, `${scoringPath}.criteria.id`);
  validateReferencedSources(
    lesson.scoring.sourceIds,
    knownSourceIds,
    issues,
    `${scoringPath}.sourceIds`,
  );
  lesson.scoring.answerFramework.forEach((item, index) => {
    validateNonEmpty(item, issues, `${scoringPath}.answerFramework[${index}]`);
  });
  let calculatedPracticeTotal = 0;
  lesson.scoring.criteria.forEach((criterion, criterionIndex) => {
    validateNonEmpty(criterion.label, issues, `${scoringPath}.criteria[${criterionIndex}].label`);
    validateNonEmpty(criterion.detail, issues, `${scoringPath}.criteria[${criterionIndex}].detail`);
    if (criterion.points <= 0) {
      addIssue(issues, `${scoringPath}.criteria[${criterionIndex}].points`, "must be greater than zero");
    }
    calculatedPracticeTotal += criterion.points;
  });
  if (calculatedPracticeTotal !== lesson.scoring.totalPoints) {
    addIssue(
      issues,
      `${scoringPath}.totalPoints`,
      `must equal the sum of scoring criteria (${calculatedPracticeTotal})`,
    );
  }

  const transferCount = Number(lesson.transferCaseId !== null)
    + Number(lesson.transferExercise !== null);
  if (transferCount !== 1) {
    addIssue(
      issues,
      path,
      "must define exactly one transferCaseId or transferExercise",
    );
  }
  if (lesson.transferCaseId !== null) {
    validateNonEmpty(lesson.transferCaseId, issues, `${path}.transferCaseId`);
  }
  if (lesson.transferExercise !== null) {
    const transferPath = `${path}.transferExercise`;
    validateNonEmpty(lesson.transferExercise.id, issues, `${transferPath}.id`);
    validateNonEmpty(lesson.transferExercise.title, issues, `${transferPath}.title`);
    validateNonEmpty(lesson.transferExercise.prompt, issues, `${transferPath}.prompt`);
    validateNonEmpty(
      lesson.transferExercise.boundaryNote,
      issues,
      `${transferPath}.boundaryNote`,
    );
    if (lesson.transferExercise.evidenceLabels.length === 0) {
      addIssue(issues, `${transferPath}.evidenceLabels`, "must contain at least one label");
    }
    lesson.transferExercise.evidenceLabels.forEach((label, index) => {
      validateNonEmpty(label, issues, `${transferPath}.evidenceLabels[${index}]`);
    });
    if (lesson.transferExercise.reasoningSteps.length === 0) {
      addIssue(issues, `${transferPath}.reasoningSteps`, "must contain at least one step");
    }
    lesson.transferExercise.reasoningSteps.forEach((step, index) => {
      validateNonEmpty(step, issues, `${transferPath}.reasoningSteps[${index}]`);
    });
    validateReferencedSources(
      lesson.transferExercise.sourceIds,
      knownSourceIds,
      issues,
      `${transferPath}.sourceIds`,
    );
  }
  validateReferencedSources(lesson.sourceIds, knownSourceIds, issues, `${path}.sourceIds`);
}

function validateAssessmentItem(
  item: AssessmentItemDefinition,
  knownSourceIds: ReadonlySet<string>,
  knownMaterialArtifactIds: ReadonlySet<string>,
  memoryCriterionIds: ReadonlySet<string>,
  issues: CourseValidationIssue[],
  path: string,
) {
  validateNonEmpty(item.id, issues, `${path}.id`);
  validateNonEmpty(item.prompt, issues, `${path}.prompt`);
  if (!Number.isInteger(item.order) || item.order < 1) {
    addIssue(issues, `${path}.order`, "must be a positive integer");
  }

  validateNonEmpty(item.promptSource.locator, issues, `${path}.promptSource.locator`);
  validateNonEmpty(item.promptSource.note, issues, `${path}.promptSource.note`);
  validateReferencedSources(
    item.promptSource.sourceIds,
    knownSourceIds,
    issues,
    `${path}.promptSource.sourceIds`,
  );
  if (item.promptSource.sourceIds.length === 0) {
    addIssue(issues, `${path}.promptSource.sourceIds`, "must contain at least one source");
  }
  if (
    item.promptSource.wording === "source-verbatim"
    && item.promptSource.authority === "nur-editorial"
  ) {
    addIssue(
      issues,
      `${path}.promptSource.authority`,
      "source-verbatim prompts cannot use NUR editorial authority",
    );
  }

  validateNonEmpty(item.answer.notice, issues, `${path}.answer.notice`);
  if (item.answer.status === "available") {
    if (item.answer.content.length === 0) {
      addIssue(issues, `${path}.answer.content`, "must contain at least one answer step");
    }
    item.answer.content.forEach((step, index) => {
      validateNonEmpty(step, issues, `${path}.answer.content[${index}]`);
    });
    validateReferencedSources(
      item.answer.sourceIds,
      knownSourceIds,
      issues,
      `${path}.answer.sourceIds`,
    );
    if (item.answer.sourceIds.length === 0) {
      addIssue(issues, `${path}.answer.sourceIds`, "available answers must reference a source");
    }
  } else if (item.answer.status === "conflict") {
    if (item.answer.variants.length < 2) {
      addIssue(issues, `${path}.answer.variants`, "must retain at least two conflicting variants");
    }
    validateUnique(
      item.answer.variants.map((variant) => variant.id),
      issues,
      `${path}.answer.variants.id`,
    );
    const normalizedVariants = new Set<string>();
    item.answer.variants.forEach((variant, variantIndex) => {
      const variantPath = `${path}.answer.variants[${variantIndex}]`;
      validateNonEmpty(variant.label, issues, `${variantPath}.label`);
      if (variant.confidence === "verified") {
        addIssue(issues, `${variantPath}.confidence`, "unresolved variants cannot be verified");
      }
      if (variant.content.length === 0) {
        addIssue(issues, `${variantPath}.content`, "must contain answer content");
      }
      variant.content.forEach((content, contentIndex) => {
        validateNonEmpty(content, issues, `${variantPath}.content[${contentIndex}]`);
      });
      const normalized = variant.content.join("\n").trim();
      if (normalizedVariants.has(normalized)) {
        addIssue(issues, `${path}.answer.variants`, "must contain genuinely different variants");
      }
      normalizedVariants.add(normalized);
      if (variant.sourceArtifactIds.length === 0) {
        addIssue(issues, `${variantPath}.sourceArtifactIds`, "must retain material provenance");
      }
      validateUnique(
        variant.sourceArtifactIds,
        issues,
        `${variantPath}.sourceArtifactIds`,
      );
      variant.sourceArtifactIds.forEach((artifactId) => {
        if (!knownMaterialArtifactIds.has(artifactId)) {
          addIssue(issues, `${variantPath}.sourceArtifactIds`, `references unknown artifact: ${artifactId}`);
        }
      });
    });
    validateReferencedSources(
      item.answer.sourceIds,
      knownSourceIds,
      issues,
      `${path}.answer.sourceIds`,
    );
  }

  if (item.scoring) {
    const scoringPath = `${path}.scoring`;
    validateNonEmpty(item.scoring.id, issues, `${scoringPath}.id`);
    validateNonEmpty(item.scoring.standardVersion, issues, `${scoringPath}.standardVersion`);
    validateNonEmpty(item.scoring.title, issues, `${scoringPath}.title`);
    validateNonEmpty(item.scoring.notice, issues, `${scoringPath}.notice`);
    if (item.scoring.totalPoints <= 0) {
      addIssue(issues, `${scoringPath}.totalPoints`, "must be greater than zero");
    }
    if (!Number.isInteger(item.scoring.suggestedCharacters) || item.scoring.suggestedCharacters < 1) {
      addIssue(issues, `${scoringPath}.suggestedCharacters`, "must be a positive integer");
    }
    if (item.scoring.answerFramework.length === 0) {
      addIssue(issues, `${scoringPath}.answerFramework`, "must contain at least one step");
    }
    item.scoring.answerFramework.forEach((step, index) => {
      validateNonEmpty(step, issues, `${scoringPath}.answerFramework[${index}]`);
    });
    if (item.scoring.criteria.length === 0) {
      addIssue(issues, `${scoringPath}.criteria`, "must contain at least one criterion");
    }
    validateOrdered(item.scoring.criteria, issues, `${scoringPath}.criteria`);
    validateUnique(
      item.scoring.criteria.map((criterion) => criterion.id),
      issues,
      `${scoringPath}.criteria.id`,
    );
    let calculatedTotal = 0;
    item.scoring.criteria.forEach((criterion, index) => {
      validateNonEmpty(criterion.label, issues, `${scoringPath}.criteria[${index}].label`);
      validateNonEmpty(criterion.detail, issues, `${scoringPath}.criteria[${index}].detail`);
      if (criterion.points <= 0) {
        addIssue(issues, `${scoringPath}.criteria[${index}].points`, "must be greater than zero");
      }
      calculatedTotal += criterion.points;
    });
    if (calculatedTotal !== item.scoring.totalPoints) {
      addIssue(
        issues,
        `${scoringPath}.totalPoints`,
        `must equal the sum of scoring criteria (${calculatedTotal})`,
      );
    }
    validateStructuralAssistanceRules(
      item.scoring.assistanceRules,
      new Set(item.scoring.criteria.map((criterion) => criterion.id)),
      memoryCriterionIds,
      issues,
      `${scoringPath}.assistanceRules`,
    );
    validateReferencedSources(
      item.scoring.sourceIds,
      knownSourceIds,
      issues,
      `${scoringPath}.sourceIds`,
    );
  }

  validateReferencedSources(item.sourceIds, knownSourceIds, issues, `${path}.sourceIds`);
}

function validateAssessmentGroup(
  group: AssessmentItemGroupDefinition,
  knownSourceIds: ReadonlySet<string>,
  knownMaterialArtifactIds: ReadonlySet<string>,
  issues: CourseValidationIssue[],
  path: string,
) {
  validateNonEmpty(group.id, issues, `${path}.id`);
  if (!Number.isInteger(group.order) || group.order < 1) {
    addIssue(issues, `${path}.order`, "must be a positive integer");
  }

  const promptPath = `${path}.promptSource`;
  validateNonEmpty(group.promptSource.locator, issues, `${promptPath}.locator`);
  validateNonEmpty(group.promptSource.note, issues, `${promptPath}.note`);
  validateReferencedSources(
    group.promptSource.sourceIds,
    knownSourceIds,
    issues,
    `${promptPath}.sourceIds`,
  );
  if (group.promptSource.sourceIds.length === 0) {
    addIssue(issues, `${promptPath}.sourceIds`, "must contain at least one source");
  }

  if (group.questionKind === "b1") {
    if (group.groupPrompt !== null) {
      addIssue(issues, `${path}.groupPrompt`, "B1 groups must not carry a shared group prompt");
    }
    if (!group.sharedChoices || group.sharedChoices.length < 2) {
      addIssue(issues, `${path}.sharedChoices`, "B1 groups must declare at least two shared choices");
    } else if (new Set(group.sharedChoices).size !== group.sharedChoices.length) {
      addIssue(issues, `${path}.sharedChoices`, "shared choices must be distinct");
    }
  } else if (group.questionKind === "b2") {
    if (!group.groupPrompt || group.groupPrompt.trim().length === 0) {
      addIssue(issues, `${path}.groupPrompt`, "B2 groups must declare a shared group prompt");
    }
    if (group.sharedChoices !== null) {
      addIssue(issues, `${path}.sharedChoices`, "B2 groups must not declare shared choices");
    }
  } else {
    addIssue(issues, `${path}.questionKind`, "group question kind must be b1 or b2");
  }

  if (group.members.length === 0) {
    addIssue(issues, `${path}.members`, "must contain at least one member");
  }
  if (group.members.length > 4) {
    addIssue(issues, `${path}.members`, "must not exceed four members per group");
  }
  validateOrdered(group.members, issues, `${path}.members`);

  group.members.forEach((member, memberIndex) => {
    const memberPath = `${path}.members[${memberIndex}]`;
    validateAssessmentItem(
      member,
      knownSourceIds,
      knownMaterialArtifactIds,
      new Set(),
      issues,
      memberPath,
    );
    if (group.questionKind === "b1") {
      const sharedCount = group.sharedChoices?.length ?? 0;
      if (member.correctChoiceIndex === undefined || member.correctChoiceIndex < 0 || member.correctChoiceIndex >= sharedCount) {
        addIssue(issues, `${member.id}.correctChoiceIndex`, "must be a valid index into shared choices");
      }
    } else if (group.questionKind === "b2") {
      if (!member.choices || member.choices.length < 2) {
        addIssue(issues, `${member.id}.choices`, "B2 members must declare at least two choices");
      }
      if (member.correctChoiceIndex === undefined || member.correctChoiceIndex < 0 || member.correctChoiceIndex >= (member.choices?.length ?? 0)) {
        addIssue(issues, `${member.id}.correctChoiceIndex`, "must be a valid index into member choices");
      }
    }
  });
}

function validateCaseDefinition(
  caseDefinition: CaseDefinition,
  knownSourceIds: ReadonlySet<string>,
  memoryCriterionIds: ReadonlySet<string>,
  issues: CourseValidationIssue[],
  path: string,
) {
  validateNonEmpty(caseDefinition.id, issues, `${path}.id`);
  validateNonEmpty(caseDefinition.eyebrow, issues, `${path}.eyebrow`);
  validateNonEmpty(caseDefinition.title, issues, `${path}.title`);
  validateNonEmpty(caseDefinition.stem, issues, `${path}.stem`);
  validateNonEmpty(caseDefinition.boundaryNote, issues, `${path}.boundaryNote`);
  if (!Number.isInteger(caseDefinition.order) || caseDefinition.order < 1) {
    addIssue(issues, `${path}.order`, "must be a positive integer");
  }
  if (caseDefinition.knowledgePointIds.length === 0) {
    addIssue(issues, `${path}.knowledgePointIds`, "must reference at least one knowledge point");
  }

  const promptPath = `${path}.promptSource`;
  validateNonEmpty(caseDefinition.promptSource.locator, issues, `${promptPath}.locator`);
  validateNonEmpty(caseDefinition.promptSource.note, issues, `${promptPath}.note`);
  validateReferencedSources(
    caseDefinition.promptSource.sourceIds,
    knownSourceIds,
    issues,
    `${promptPath}.sourceIds`,
  );
  if (caseDefinition.promptSource.sourceIds.length === 0) {
    addIssue(issues, `${promptPath}.sourceIds`, "must contain at least one source");
  }
  if (
    caseDefinition.promptSource.wording === "source-verbatim"
    && caseDefinition.promptSource.authority === "nur-editorial"
  ) {
    addIssue(
      issues,
      `${promptPath}.authority`,
      "source-verbatim prompts cannot use NUR editorial authority",
    );
  }

  if (caseDefinition.evidence.length === 0) {
    addIssue(issues, `${path}.evidence`, "must contain at least one evidence item");
  }
  validateOrdered(caseDefinition.evidence, issues, `${path}.evidence`);
  validateUnique(
    caseDefinition.evidence.map((item) => item.id),
    issues,
    `${path}.evidence.id`,
  );
  caseDefinition.evidence.forEach((item, index) => {
    validateNonEmpty(item.label, issues, `${path}.evidence[${index}].label`);
    validateNonEmpty(item.detail, issues, `${path}.evidence[${index}].detail`);
  });
  if (!caseDefinition.evidence.some((item) => item.requiredForReasoning)) {
    addIssue(issues, `${path}.evidence`, "must contain at least one required evidence item");
  }

  if (caseDefinition.reasoningSteps.length === 0) {
    addIssue(issues, `${path}.reasoningSteps`, "must contain at least one reasoning step");
  }
  validateOrdered(caseDefinition.reasoningSteps, issues, `${path}.reasoningSteps`);
  validateUnique(
    caseDefinition.reasoningSteps.map((step) => step.id),
    issues,
    `${path}.reasoningSteps.id`,
  );
  validateUnique(
    caseDefinition.reasoningSteps.map((step) => step.stage),
    issues,
    `${path}.reasoningSteps.stage`,
  );
  const presentStages = new Set(caseDefinition.reasoningSteps.map((step) => step.stage));
  requiredCaseStages.forEach((stage) => {
    if (!presentStages.has(stage)) {
      addIssue(issues, `${path}.reasoningSteps`, `missing required stage: ${stage}`);
    }
  });
  caseDefinition.reasoningSteps.forEach((step, index) => {
    const stepPath = `${path}.reasoningSteps[${index}]`;
    validateNonEmpty(step.label, issues, `${stepPath}.label`);
    validateNonEmpty(step.prompt, issues, `${stepPath}.prompt`);
    validateNonEmpty(step.placeholder, issues, `${stepPath}.placeholder`);
    if (!Number.isInteger(step.minimumCharacters) || step.minimumCharacters < 1) {
      addIssue(issues, `${stepPath}.minimumCharacters`, "must be a positive integer");
    }
    if (step.answerFramework.length === 0) {
      addIssue(issues, `${stepPath}.answerFramework`, "must contain at least one step");
    }
    step.answerFramework.forEach((item, frameworkIndex) => {
      validateNonEmpty(item, issues, `${stepPath}.answerFramework[${frameworkIndex}]`);
    });
    validateReferencedSources(step.sourceIds, knownSourceIds, issues, `${stepPath}.sourceIds`);
  });

  validateNonEmpty(caseDefinition.answer.notice, issues, `${path}.answer.notice`);
  validateReferencedSources(
    caseDefinition.answer.sourceIds,
    knownSourceIds,
    issues,
    `${path}.answer.sourceIds`,
  );
  if (caseDefinition.answer.sourceIds.length === 0) {
    addIssue(issues, `${path}.answer.sourceIds`, "must contain at least one source");
  }

  const scoringPath = `${path}.scoring`;
  validateNonEmpty(caseDefinition.scoring.id, issues, `${scoringPath}.id`);
  validateNonEmpty(caseDefinition.scoring.standardVersion, issues, `${scoringPath}.standardVersion`);
  validateNonEmpty(caseDefinition.scoring.title, issues, `${scoringPath}.title`);
  validateNonEmpty(caseDefinition.scoring.notice, issues, `${scoringPath}.notice`);
  if (caseDefinition.scoring.totalPoints <= 0) {
    addIssue(issues, `${scoringPath}.totalPoints`, "must be greater than zero");
  }
  if (caseDefinition.scoring.criteria.length === 0) {
    addIssue(issues, `${scoringPath}.criteria`, "must contain at least one criterion");
  }
  validateOrdered(caseDefinition.scoring.criteria, issues, `${scoringPath}.criteria`);
  validateUnique(
    caseDefinition.scoring.criteria.map((criterion) => criterion.id),
    issues,
    `${scoringPath}.criteria.id`,
  );
  let calculatedTotal = 0;
  caseDefinition.scoring.criteria.forEach((criterion, index) => {
    const criterionPath = `${scoringPath}.criteria[${index}]`;
    validateNonEmpty(criterion.label, issues, `${criterionPath}.label`);
    validateNonEmpty(criterion.detail, issues, `${criterionPath}.detail`);
    if (!presentStages.has(criterion.stage)) {
      addIssue(issues, `${criterionPath}.stage`, "must reference a reasoning stage");
    }
    if (criterion.points <= 0) {
      addIssue(issues, `${criterionPath}.points`, "must be greater than zero");
    }
    calculatedTotal += criterion.points;
  });
  if (calculatedTotal !== caseDefinition.scoring.totalPoints) {
    addIssue(
      issues,
      `${scoringPath}.totalPoints`,
      `must equal the sum of scoring criteria (${calculatedTotal})`,
    );
  }
  validateStructuralAssistanceRules(
    caseDefinition.scoring.assistanceRules,
    new Set(caseDefinition.scoring.criteria.map((criterion) => criterion.id)),
    memoryCriterionIds,
    issues,
    `${scoringPath}.assistanceRules`,
  );
  validateReferencedSources(
    caseDefinition.scoring.sourceIds,
    knownSourceIds,
    issues,
    `${scoringPath}.sourceIds`,
  );
  validateReferencedSources(caseDefinition.sourceIds, knownSourceIds, issues, `${path}.sourceIds`);
}

export function validateCourseDefinition(
  course: CourseDefinition,
  materialCatalog?: MaterialCatalog,
): CourseValidationResult {
  const issues: CourseValidationIssue[] = [];

  validateNonEmpty(course.id, issues, "id");
  validateSlug(course.slug, issues, "slug");
  validateNonEmpty(course.title, issues, "title");
  validateNonEmpty(course.description, issues, "description");
  validateNonEmpty(course.examBlueprint.id, issues, "examBlueprint.id");
  validateNonEmpty(course.examBlueprint.title, issues, "examBlueprint.title");
  if (course.examBlueprint.status === "pending") {
    if (course.examBlueprint.missingLabel === null) {
      addIssue(issues, "examBlueprint.missingLabel", "pending blueprints require a missing label");
    } else {
      validateNonEmpty(course.examBlueprint.missingLabel, issues, "examBlueprint.missingLabel");
    }
    if (
      course.examBlueprint.totalPoints !== 0
      || course.examBlueprint.rows.length > 0
      || course.examBlueprint.summaryGroups.length > 0
      || course.examBlueprint.priorityNotice !== null
      || course.examBlueprint.integrity !== null
    ) {
      addIssue(
        issues,
        "examBlueprint",
        "pending blueprints cannot declare totals, rows, groups, priority, or integrity",
      );
    }
  } else {
    if (course.examBlueprint.missingLabel !== null) {
      addIssue(issues, "examBlueprint.missingLabel", "resolved blueprints cannot have a missing label");
    }
    if (course.examBlueprint.totalPoints <= 0) {
      addIssue(issues, "examBlueprint.totalPoints", "must be greater than zero");
    }
    if (course.examBlueprint.rows.length === 0) {
      addIssue(issues, "examBlueprint.rows", "must contain at least one row");
    }
    if (course.examBlueprint.summaryGroups.length === 0) {
      addIssue(issues, "examBlueprint.summaryGroups", "must contain at least one group");
    }
  }

  const versionDimensions = {
    textbookEdition: course.version.textbookEdition,
    school: course.version.school,
    program: course.version.program,
    learnerYear: course.version.learnerYear,
    teacher: course.version.teacher,
    academicYear: course.version.academicYear,
    semester: course.version.semester,
  };

  Object.entries(versionDimensions).forEach(([key, dimension]) => {
    validateVersionDimension(dimension, issues, `version.${key}`);
  });

  validateOrdered(course.sources, issues, "sources");
  validateOrdered(course.chapters, issues, "chapters");
  validateOrdered(course.learningRoutes, issues, "learningRoutes");
  validateOrdered(course.examBlueprint.rows, issues, "examBlueprint.rows");
  validateOrdered(
    course.examBlueprint.summaryGroups,
    issues,
    "examBlueprint.summaryGroups",
  );

  validateUnique(course.chapters.map((chapter) => chapter.id), issues, "chapters.id");
  validateUnique(course.chapters.map((chapter) => chapter.slug), issues, "chapters.slug");
  validateUnique(course.knowledgePoints.map((point) => point.id), issues, "knowledgePoints.id");
  validateUnique(course.knowledgePoints.map((point) => point.slug), issues, "knowledgePoints.slug");
  validateUnique(
    course.knowledgePoints.flatMap((point) => point.lesson ? [point.lesson.id] : []),
    issues,
    "knowledgePoints.lesson.id",
  );
  validateUnique(course.sources.map((source) => source.id), issues, "sources.id");
  validateUnique(course.learningRoutes.map((route) => route.id), issues, "learningRoutes.id");
  validateUnique(course.learningTasks.map((task) => task.id), issues, "learningTasks.id");
  validateUnique(course.assessmentItems.map((item) => item.id), issues, "assessmentItems.id");
  validateUnique(course.assessmentGroups.map((group) => group.id), issues, "assessmentGroups.id");
  const groupMemberIds = course.assessmentGroups.flatMap((group) =>
    group.members.map((member) => member.id),
  );
  validateUnique(groupMemberIds, issues, "assessmentGroups.members.id");
  const itemIdSet = new Set(course.assessmentItems.map((item) => item.id));
  groupMemberIds.forEach((memberId) => {
    if (itemIdSet.has(memberId)) {
      addIssue(issues, `assessmentGroups.members[${memberId}].id`, "must not collide with assessmentItems.id");
    }
  });
  validateUnique(
    course.assessmentItems.flatMap((item) => item.scoring ? [item.scoring.id] : []),
    issues,
    "assessmentItems.scoring.id",
  );
  validateUnique(course.cases.map((item) => item.id), issues, "cases.id");
  validateUnique(course.cases.map((item) => item.scoring.id), issues, "cases.scoring.id");
  validateOrdered(course.cases, issues, "cases");
  validateUnique(course.examBlueprint.rows.map((row) => row.id), issues, "examBlueprint.rows.id");
  validateUnique(course.examBlueprint.rows.map((row) => row.kind), issues, "examBlueprint.rows.kind");
  validateUnique(
    course.examBlueprint.summaryGroups.map((group) => group.id),
    issues,
    "examBlueprint.summaryGroups.id",
  );

  course.chapters.forEach((chapter, chapterIndex) => {
    validateSlug(chapter.slug, issues, `chapters[${chapterIndex}].slug`);
    validateNonEmpty(chapter.focus, issues, `chapters[${chapterIndex}].focus`);
    validateUnique(
      chapter.knowledgePointIds,
      issues,
      `chapters[${chapterIndex}].knowledgePointIds`,
    );

    const chapterPoints = chapter.knowledgePointIds
      .map((pointId) => course.knowledgePoints.find((point) => point.id === pointId))
      .filter((point) => point !== undefined);
    validateOrdered(chapterPoints, issues, `chapters[${chapterIndex}].knowledgePoints`);
  });

  course.knowledgePoints.forEach((point, pointIndex) => {
    validateSlug(point.slug, issues, `knowledgePoints[${pointIndex}].slug`);
    validateNonEmpty(point.title, issues, `knowledgePoints[${pointIndex}].title`);
    validateNonEmpty(point.note, issues, `knowledgePoints[${pointIndex}].note`);
    validateUnique(point.lenses.map((lens) => lens.id), issues, `knowledgePoints[${pointIndex}].lenses.id`);
    validateUnique(
      point.relationships.map((relationship) => relationship.id),
      issues,
      `knowledgePoints[${pointIndex}].relationships.id`,
    );
    validateOrdered(
      point.learningMemoryCriteria,
      issues,
      `knowledgePoints[${pointIndex}].learningMemoryCriteria`,
    );
    validateUnique(
      point.learningMemoryCriteria.map((criterion) => criterion.id),
      issues,
      `knowledgePoints[${pointIndex}].learningMemoryCriteria.id`,
    );
    point.learningMemoryCriteria.forEach((criterion, criterionIndex) => {
      validateNonEmpty(
        criterion.label,
        issues,
        `knowledgePoints[${pointIndex}].learningMemoryCriteria[${criterionIndex}].label`,
      );
      validateNonEmpty(
        criterion.detail,
        issues,
        `knowledgePoints[${pointIndex}].learningMemoryCriteria[${criterionIndex}].detail`,
      );
    });

    const lensIds = new Set(point.lenses.map((lens) => lens.id));
    point.lenses.forEach((lens, lensIndex) => {
      if (lens.status === "pending") {
        validateNonEmpty(
          lens.missingLabel,
          issues,
          `knowledgePoints[${pointIndex}].lenses[${lensIndex}].missingLabel`,
        );
        if (lens.explanation !== null || lens.clinicalObservations.length > 0) {
          addIssue(
            issues,
            `knowledgePoints[${pointIndex}].lenses[${lensIndex}]`,
            "pending lens content cannot contain an explanation or observations",
          );
        }
      } else {
        validateNonEmpty(
          lens.explanation,
          issues,
          `knowledgePoints[${pointIndex}].lenses[${lensIndex}].explanation`,
        );
      }
    });

    point.relationships.forEach((relationship, relationshipIndex) => {
      const path = `knowledgePoints[${pointIndex}].relationships[${relationshipIndex}]`;
      if (!allowedRelationshipLabels.has(relationship.label)) {
        addIssue(issues, `${path}.label`, `uses an unsupported relationship label: ${relationship.label}`);
      }
      if (!lensIds.has(relationship.fromLensId) || !lensIds.has(relationship.toLensId)) {
        addIssue(issues, path, "must reference two lenses from the same knowledge point");
      }
      if (relationship.fromLensId === relationship.toLensId) {
        addIssue(issues, path, "cannot relate a lens to itself");
      }
      validateNonEmpty(relationship.note, issues, `${path}.note`);
    });
  });

  const globallyReferencedKnowledgePointIds = course.chapters.flatMap(
    (chapter) => chapter.knowledgePointIds,
  );
  validateUnique(
    globallyReferencedKnowledgePointIds,
    issues,
    "chapters.knowledgePointIds",
  );

  const knownKnowledgePointIds = new Set(course.knowledgePoints.map((point) => point.id));
  const knownSourceIds = new Set(course.sources.map((source) => source.id));
  const knownLearningTaskIds = new Set(course.learningTasks.map((task) => task.id));
  const knownAssessmentItemIds = new Set(course.assessmentItems.map((item) => item.id));
  const knownCaseIds = new Set(course.cases.map((item) => item.id));
  const knownRouteIds = new Set(course.learningRoutes.map((route) => route.id));
  const knownMaterialArtifactIds = new Set(
    materialCatalog?.artifacts.map((artifact) => artifact.id) ?? [],
  );

  validateReferencedSources(
    course.examBlueprint.sourceIds,
    knownSourceIds,
    issues,
    "examBlueprint.sourceIds",
  );
  if (
    course.examBlueprint.provenance === "verified-source"
    && course.examBlueprint.sourceIds.length === 0
  ) {
    addIssue(
      issues,
      "examBlueprint.sourceIds",
      "verified-source blueprints must reference at least one source",
    );
  }
  const examScope = course.examBlueprint.scope;
  validateNonEmpty(examScope.school, issues, "examBlueprint.scope.school");
  validateNonEmpty(examScope.program, issues, "examBlueprint.scope.program");
  validateNonEmpty(examScope.learnerYear, issues, "examBlueprint.scope.learnerYear");
  validateNonEmpty(examScope.academicYear, issues, "examBlueprint.scope.academicYear");
  validateNonEmpty(examScope.semester, issues, "examBlueprint.scope.semester");
  if (examScope.teacher !== null) {
    validateNonEmpty(examScope.teacher, issues, "examBlueprint.scope.teacher");
  }

  globallyReferencedKnowledgePointIds.forEach((pointId) => {
    if (!knownKnowledgePointIds.has(pointId)) {
      addIssue(issues, "chapters.knowledgePointIds", `references unknown knowledge point: ${pointId}`);
    }
  });

  course.knowledgePoints.forEach((point) => {
    validateReferencedSources(point.sourceIds, knownSourceIds, issues, `${point.id}.sourceIds`);
    point.learningTaskIds.forEach((taskId) => {
      if (!knownLearningTaskIds.has(taskId)) {
        addIssue(issues, `${point.id}.learningTaskIds`, `references unknown task: ${taskId}`);
      }
    });
    point.assessmentItemIds.forEach((itemId) => {
      if (!knownAssessmentItemIds.has(itemId)) {
        addIssue(issues, `${point.id}.assessmentItemIds`, `references unknown assessment item: ${itemId}`);
      }
    });
    const pointAssessmentItems = point.assessmentItemIds
      .map((itemId) => course.assessmentItems.find((item) => item.id === itemId))
      .filter((item) => item !== undefined);
    validateOrdered(pointAssessmentItems, issues, `${point.id}.assessmentItems`);
    point.caseIds.forEach((caseId) => {
      if (!knownCaseIds.has(caseId)) {
        addIssue(issues, `${point.id}.caseIds`, `references unknown case: ${caseId}`);
      }
    });
    const pointCases = point.caseIds
      .map((caseId) => course.cases.find((item) => item.id === caseId))
      .filter((item) => item !== undefined);
    validateOrdered(pointCases, issues, `${point.id}.cases`);
    point.lenses.forEach((lens) => {
      lens.sourceIds.forEach((sourceId) => {
        if (!knownSourceIds.has(sourceId)) {
          addIssue(issues, `${lens.id}.sourceIds`, `references unknown source: ${sourceId}`);
        }
      });
    });
    point.relationships.forEach((relationship) => {
      relationship.sourceIds.forEach((sourceId) => {
        if (!knownSourceIds.has(sourceId)) {
          addIssue(issues, `${relationship.id}.sourceIds`, `references unknown source: ${sourceId}`);
        }
      });
    });
    if (point.lesson) {
      validateLesson(point.lesson, knownSourceIds, issues, `${point.id}.lesson`);
      if (
        point.lesson.transferCaseId !== null
        && !knownCaseIds.has(point.lesson.transferCaseId)
      ) {
        addIssue(
          issues,
          `${point.id}.lesson.transferCaseId`,
          `references unknown case: ${point.lesson.transferCaseId}`,
        );
      } else if (
        point.lesson.transferCaseId !== null
        && !point.caseIds.includes(point.lesson.transferCaseId)
      ) {
        addIssue(
          issues,
          `${point.id}.lesson.transferCaseId`,
          "must also be referenced by the knowledge point",
        );
      }
    }
  });

  course.learningTasks.forEach((task) => {
    if (!knownKnowledgePointIds.has(task.knowledgePointId)) {
      addIssue(issues, `${task.id}.knowledgePointId`, `references unknown knowledge point: ${task.knowledgePointId}`);
    }
    if (!knownRouteIds.has(task.routeId)) {
      addIssue(issues, `${task.id}.routeId`, `references unknown learning route: ${task.routeId}`);
    }
    task.sourceIds.forEach((sourceId) => {
      if (!knownSourceIds.has(sourceId)) {
        addIssue(issues, `${task.id}.sourceIds`, `references unknown source: ${sourceId}`);
      }
    });
  });

  course.assessmentItems.forEach((item, itemIndex) => {
    const owner = course.knowledgePoints.find((point) => point.id === item.knowledgePointId);
    validateAssessmentItem(
      item,
      knownSourceIds,
      knownMaterialArtifactIds,
      new Set(owner?.learningMemoryCriteria.map((criterion) => criterion.id) ?? []),
      issues,
      `assessmentItems[${itemIndex}]`,
    );
    if (!knownKnowledgePointIds.has(item.knowledgePointId)) {
      addIssue(issues, `${item.id}.knowledgePointId`, `references unknown knowledge point: ${item.knowledgePointId}`);
    }
    if (owner && !owner.assessmentItemIds.includes(item.id)) {
      addIssue(issues, `${item.id}.knowledgePointId`, "must be referenced by its knowledge point");
    }
  });

  course.assessmentGroups.forEach((group, groupIndex) => {
    validateAssessmentGroup(
      group,
      knownSourceIds,
      knownMaterialArtifactIds,
      issues,
      `assessmentGroups[${groupIndex}]`,
    );
    group.members.forEach((member) => {
      if (!knownKnowledgePointIds.has(member.knowledgePointId)) {
        addIssue(issues, `${member.id}.knowledgePointId`, `references unknown knowledge point: ${member.knowledgePointId}`);
      }
    });
  });

  course.cases.forEach((caseDefinition, caseIndex) => {
    const caseMemoryCriterionIds = new Set(
      course.knowledgePoints
        .filter((point) => caseDefinition.knowledgePointIds.includes(point.id))
        .flatMap((point) => point.learningMemoryCriteria.map((criterion) => criterion.id)),
    );
    validateCaseDefinition(
      caseDefinition,
      knownSourceIds,
      caseMemoryCriterionIds,
      issues,
      `cases[${caseIndex}]`,
    );
    caseDefinition.knowledgePointIds.forEach((pointId) => {
      if (!knownKnowledgePointIds.has(pointId)) {
        addIssue(issues, `${caseDefinition.id}.knowledgePointIds`, `references unknown knowledge point: ${pointId}`);
        return;
      }
      const owner = course.knowledgePoints.find((point) => point.id === pointId);
      if (owner && !owner.caseIds.includes(caseDefinition.id)) {
        addIssue(
          issues,
          `${caseDefinition.id}.knowledgePointIds`,
          `must be referenced by knowledge point: ${pointId}`,
        );
      }
    });
  });

  course.sources.forEach((source, sourceIndex) => {
    if (materialCatalog) {
      const materialResult = validateSourceMaterialReferences(source, materialCatalog);
      materialResult.issues.forEach((issue) => {
        addIssue(issues, `sources[${sourceIndex}].${issue.path}`, issue.message);
      });
    }
    validateNonEmpty(source.displayLabel, issues, `sources[${sourceIndex}].displayLabel`);
    if (source.status === "pending") {
      validateNonEmpty(source.missingLabel, issues, `sources[${sourceIndex}].missingLabel`);
      if (source.citation !== null || source.verifiedAt !== null) {
        addIssue(issues, `sources[${sourceIndex}]`, "pending sources cannot contain citation or verification data");
      }
      return;
    }

    validateNonEmpty(source.citation.label, issues, `sources[${sourceIndex}].citation.label`);
    if (source.citation.url !== null) {
      validateResolvedSourceUrl(
        source.citation.url,
        issues,
        `sources[${sourceIndex}].citation.url`,
      );
    }
    if (source.type === "clinical-reference" && source.citation.url === null) {
      addIssue(
        issues,
        `sources[${sourceIndex}].citation.url`,
        "clinical references must include a traceable URL",
      );
    }
    if (source.status === "verified") {
      validateNonEmpty(source.verifiedAt, issues, `sources[${sourceIndex}].verifiedAt`);
    }
  });

  let calculatedExamTotal = 0;
  course.examBlueprint.rows.forEach((row, rowIndex) => {
    if (!Number.isInteger(row.count) || row.count < 1) {
      addIssue(issues, `examBlueprint.rows[${rowIndex}].count`, "must be a positive integer");
    }
    if (row.pointsEach <= 0) {
      addIssue(issues, `examBlueprint.rows[${rowIndex}].pointsEach`, "must be greater than zero");
    }
    const calculatedRowTotal = row.count * row.pointsEach;
    if (calculatedRowTotal !== row.totalPoints) {
      addIssue(
        issues,
        `examBlueprint.rows[${rowIndex}].totalPoints`,
        `must equal count × pointsEach (${calculatedRowTotal})`,
      );
    }
    calculatedExamTotal += row.totalPoints;
  });

  if (calculatedExamTotal !== course.examBlueprint.totalPoints) {
    addIssue(
      issues,
      "examBlueprint.totalPoints",
      `must equal the sum of blueprint rows (${calculatedExamTotal})`,
    );
  }

  const rowKinds = new Set(course.examBlueprint.rows.map((row) => row.kind));
  const groupedKinds = course.examBlueprint.summaryGroups.flatMap(
    (group) => group.questionKinds,
  );
  validateUnique(groupedKinds, issues, "examBlueprint.summaryGroups.questionKinds");
  course.examBlueprint.summaryGroups.forEach((group, groupIndex) => {
    validateNonEmpty(group.label, issues, `examBlueprint.summaryGroups[${groupIndex}].label`);
    if (group.questionKinds.length === 0) {
      addIssue(
        issues,
        `examBlueprint.summaryGroups[${groupIndex}].questionKinds`,
        "must contain at least one question kind",
      );
    }
    group.questionKinds.forEach((kind) => {
      if (!rowKinds.has(kind)) {
        addIssue(
          issues,
          `examBlueprint.summaryGroups[${groupIndex}].questionKinds`,
          `references a question kind without a blueprint row: ${kind}`,
        );
      }
    });
  });
  rowKinds.forEach((kind) => {
    if (!groupedKinds.includes(kind)) {
      addIssue(
        issues,
        "examBlueprint.summaryGroups.questionKinds",
        `does not cover blueprint row kind: ${kind}`,
      );
    }
  });

  const priorityNotice = course.examBlueprint.priorityNotice;
  if (priorityNotice) {
    validateNonEmpty(priorityNotice.lead, issues, "examBlueprint.priorityNotice.lead");
    validateNonEmpty(priorityNotice.guidance, issues, "examBlueprint.priorityNotice.guidance");
    validateUnique(
      priorityNotice.questionKinds,
      issues,
      "examBlueprint.priorityNotice.questionKinds",
    );
    priorityNotice.questionKinds.forEach((kind) => {
      if (!rowKinds.has(kind)) {
        addIssue(
          issues,
          "examBlueprint.priorityNotice.questionKinds",
          `references a question kind without a blueprint row: ${kind}`,
        );
      }
    });
  }

  const integrity = course.examBlueprint.integrity;
  if (integrity) {
    if (integrity.expectedTotalPoints !== course.examBlueprint.totalPoints) {
      addIssue(
        issues,
        "examBlueprint.integrity.expectedTotalPoints",
        `must match the declared blueprint total (${course.examBlueprint.totalPoints})`,
      );
    }
    validateUnique(
      integrity.expectedKindTotals.map((rule) => rule.kind),
      issues,
      "examBlueprint.integrity.expectedKindTotals.kind",
    );
    const totalsByKind = new Map(
      course.examBlueprint.rows.map((row) => [row.kind, row.totalPoints]),
    );
    integrity.expectedKindTotals.forEach((rule, index) => {
      if (rule.totalPoints <= 0) {
        addIssue(
          issues,
          `examBlueprint.integrity.expectedKindTotals[${index}].totalPoints`,
          "must be greater than zero",
        );
      }
      const actualTotal = totalsByKind.get(rule.kind);
      if (actualTotal !== rule.totalPoints) {
        addIssue(
          issues,
          `examBlueprint.integrity.expectedKindTotals[${index}]`,
          `must preserve the declared ${rule.totalPoints}-point total for ${rule.kind}`,
        );
      }
    });
  }

  return { valid: issues.length === 0, issues };
}

export function validateCourseRegistry(
  courses: readonly CourseDefinition[],
  materialCatalog?: MaterialCatalog,
): CourseValidationResult {
  const issues: CourseValidationIssue[] = [];
  validateUnique(courses.map((course) => course.id), issues, "registry.id");
  validateUnique(courses.map((course) => course.slug), issues, "registry.slug");

  courses.forEach((course) => {
    const result = validateCourseDefinition(course, materialCatalog);
    result.issues.forEach((issue) => {
      addIssue(issues, `${course.slug}.${issue.path}`, issue.message);
    });
  });

  return { valid: issues.length === 0, issues };
}

export function validateLearnerCourseState(
  course: CourseDefinition,
  state: LearnerCourseState,
): CourseValidationResult {
  const issues: CourseValidationIssue[] = [];
  const chapterIds = new Set(course.chapters.map((chapter) => chapter.id));
  const knowledgePointIds = new Set(course.knowledgePoints.map((point) => point.id));
  const routeIds = new Set(course.learningRoutes.map((route) => route.id));

  if (state.courseId !== course.id) {
    addIssue(issues, "courseId", `must match course ${course.id}`);
  }
  if (state.dataMode !== "demo") {
    addIssue(issues, "dataMode", "prototype learner state must be explicitly marked as demo");
  }
  validateNonEmpty(state.demoLabel, issues, "demoLabel");
  validateNonEmpty(state.profile.displayName, issues, "profile.displayName");
  validateNonEmpty(state.profile.major, issues, "profile.major");

  if (state.overallProgress < 0 || state.overallProgress > 100) {
    addIssue(issues, "overallProgress", "must be between 0 and 100");
  }
  if (state.learnedUnits < 0 || state.totalUnits < 1 || state.learnedUnits > state.totalUnits) {
    addIssue(issues, "learnedUnits", "must be between 0 and totalUnits");
  }
  const expectedOverallProgress = Math.round((state.learnedUnits / state.totalUnits) * 100);
  if (state.overallProgress !== expectedOverallProgress) {
    addIssue(issues, "overallProgress", `must match learnedUnits / totalUnits (${expectedOverallProgress})`);
  }

  validateUnique(state.currentStage.chapterIds, issues, "currentStage.chapterIds");
  state.currentStage.chapterIds.forEach((chapterId) => {
    if (!chapterIds.has(chapterId)) {
      addIssue(issues, "currentStage.chapterIds", `references unknown chapter: ${chapterId}`);
    }
  });

  if (!chapterIds.has(state.currentChapterId)) {
    addIssue(issues, "currentChapterId", `references unknown chapter: ${state.currentChapterId}`);
  }
  if (!knowledgePointIds.has(state.currentKnowledgePointId)) {
    addIssue(issues, "currentKnowledgePointId", `references unknown knowledge point: ${state.currentKnowledgePointId}`);
  }
  if (!routeIds.has(state.defaultRouteId)) {
    addIssue(issues, "defaultRouteId", `references unknown learning route: ${state.defaultRouteId}`);
  }

  const currentChapter = course.chapters.find((chapter) => chapter.id === state.currentChapterId);
  if (currentChapter && !currentChapter.knowledgePointIds.includes(state.currentKnowledgePointId)) {
    addIssue(issues, "currentKnowledgePointId", "must belong to currentChapterId");
  }

  validateUnique(state.chapterProgress.map((item) => item.chapterId), issues, "chapterProgress.chapterId");
  course.chapters.forEach((chapter) => {
    if (!state.chapterProgress.some((item) => item.chapterId === chapter.id)) {
      addIssue(issues, "chapterProgress", `is missing chapter progress for: ${chapter.id}`);
    }
  });

  state.chapterProgress.forEach((chapterState, index) => {
    const path = `chapterProgress[${index}]`;
    const chapter = course.chapters.find((item) => item.id === chapterState.chapterId);
    if (!chapter) {
      addIssue(issues, `${path}.chapterId`, `references unknown chapter: ${chapterState.chapterId}`);
      return;
    }
    if (chapterState.progress < 0 || chapterState.progress > 100) {
      addIssue(issues, `${path}.progress`, "must be between 0 and 100");
    }
    if (
      chapterState.learnedUnits < 0
      || chapterState.totalUnits < 1
      || chapterState.learnedUnits > chapterState.totalUnits
    ) {
      addIssue(issues, `${path}.learnedUnits`, "must be between 0 and totalUnits");
    } else {
      const expectedProgress = Math.round(
        (chapterState.learnedUnits / chapterState.totalUnits) * 100,
      );
      if (chapterState.progress !== expectedProgress) {
        addIssue(issues, `${path}.progress`, `must match learnedUnits / totalUnits (${expectedProgress})`);
      }
    }
    validateUnique(
      chapterState.completedKnowledgePointIds,
      issues,
      `${path}.completedKnowledgePointIds`,
    );
    if (chapterState.completedKnowledgePointIds.length > chapterState.learnedUnits) {
      addIssue(issues, `${path}.completedKnowledgePointIds`, "cannot exceed learnedUnits");
    }
    chapterState.completedKnowledgePointIds.forEach((pointId) => {
      if (!chapter.knowledgePointIds.includes(pointId)) {
        addIssue(issues, `${path}.completedKnowledgePointIds`, `references a point outside the chapter: ${pointId}`);
      }
    });
  });

  validateOrdered(state.sessionSteps, issues, "sessionSteps");
  validateUnique(state.sessionSteps.map((step) => step.id), issues, "sessionSteps.id");
  state.sessionSteps.forEach((step, index) => {
    if (!routeIds.has(step.routeId)) {
      addIssue(issues, `sessionSteps[${index}].routeId`, `references unknown route: ${step.routeId}`);
    }
    if (!Number.isInteger(step.minutes) || step.minutes < 1) {
      addIssue(issues, `sessionSteps[${index}].minutes`, "must be a positive integer");
    }
  });

  const sessionMinutes = state.sessionSteps.reduce((total, step) => total + step.minutes, 0);
  if (sessionMinutes !== state.sessionDurationMinutes) {
    addIssue(
      issues,
      "sessionDurationMinutes",
      `must equal the sum of session steps (${sessionMinutes})`,
    );
  }

  return { valid: issues.length === 0, issues };
}

function assertValidationResult(
  label: string,
  result: CourseValidationResult,
) {
  if (result.valid) {
    return;
  }

  const details = result.issues
    .map((issue) => `- ${issue.path}: ${issue.message}`)
    .join("\n");
  throw new Error(`${label} validation failed:\n${details}`);
}

export function assertValidCourseDefinition(
  course: CourseDefinition,
  materialCatalog?: MaterialCatalog,
) {
  assertValidationResult(course.slug, validateCourseDefinition(course, materialCatalog));
}

export function assertValidCourseRegistry(
  courses: readonly CourseDefinition[],
  materialCatalog?: MaterialCatalog,
) {
  assertValidationResult("course registry", validateCourseRegistry(courses, materialCatalog));
}

export function assertValidLearnerCourseState(
  course: CourseDefinition,
  state: LearnerCourseState,
) {
  assertValidationResult(
    `${course.slug} learner state`,
    validateLearnerCourseState(course, state),
  );
}
