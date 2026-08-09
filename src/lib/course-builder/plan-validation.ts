import type {
  CourseBuildPlan,
  CourseBuildPrivateOverlayInput,
  CourseBuildPrivateOverlayPlan,
} from "@/types/course-builder";
import type { ResolvedCourseBuildPack } from "./packs";

export type CourseBuildPlanValidationIssue = {
  path: string;
  message: string;
};

export type CourseBuildPlanValidationResult = {
  valid: boolean;
  issues: readonly CourseBuildPlanValidationIssue[];
};

const maxShortTextLength = 240;
const maxDescriptionLength = 1200;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasOnlyKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const allowed = new Set(keys);
  return Object.keys(value).every((key) => allowed.has(key));
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === "string"
    && value.trim().length > 0
    && value.length <= maxLength;
}

function readStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value) || !value.every((item) => isNonEmptyString(item, maxShortTextLength))) {
    return null;
  }
  return value;
}

export function parseCourseBuildPlan(value: unknown): CourseBuildPlan {
  if (!isRecord(value)
    || !isNonEmptyString(value.courseTitle, maxShortTextLength)
    || !isNonEmptyString(value.catalogLabel, maxShortTextLength)
    || !isNonEmptyString(value.description, maxDescriptionLength)
    || !["tcm-primary", "western-primary", "integrated"].includes(String(value.curriculumMode))
    || !Array.isArray(value.chapterPlans)
    || !Array.isArray(value.knowledgePointPlans)
    || !Array.isArray(value.sourceDecisions)
  ) {
    throw new Error("Course Builder provider returned an invalid plan");
  }

  const priorityKnowledgePointIds = readStringArray(value.priorityKnowledgePointIds);
  const reviewNotes = readStringArray(value.reviewNotes);
  if (!priorityKnowledgePointIds || !reviewNotes) {
    throw new Error("Course Builder provider returned invalid plan lists");
  }

  const chapterPlans = value.chapterPlans.map((item) => {
    if (!isRecord(item)
      || !isNonEmptyString(item.chapterId, maxShortTextLength)
      || !isNonEmptyString(item.focus, maxDescriptionLength)
    ) {
      throw new Error("Course Builder provider returned an invalid chapter plan");
    }
    return { chapterId: item.chapterId, focus: item.focus };
  });

  const knowledgePointPlans = value.knowledgePointPlans.map((item) => {
    if (!isRecord(item)
      || !isNonEmptyString(item.knowledgePointId, maxShortTextLength)
      || !isNonEmptyString(item.note, maxDescriptionLength)
      || !["高频", "重点", "基础"].includes(String(item.emphasis))
    ) {
      throw new Error("Course Builder provider returned an invalid knowledge-point plan");
    }
    return {
      knowledgePointId: item.knowledgePointId,
      note: item.note,
      emphasis: item.emphasis as "高频" | "重点" | "基础",
    };
  });

  const sourceDecisions = value.sourceDecisions.map((item) => {
    if (!isRecord(item)
      || !isNonEmptyString(item.sourceId, maxShortTextLength)
      || !["use", "review", "exclude"].includes(String(item.disposition))
      || !isNonEmptyString(item.rationale, maxDescriptionLength)
    ) {
      throw new Error("Course Builder provider returned an invalid source decision");
    }
    return {
      sourceId: item.sourceId,
      disposition: item.disposition as "use" | "review" | "exclude",
      rationale: item.rationale,
    };
  });

  return {
    courseTitle: value.courseTitle,
    catalogLabel: value.catalogLabel,
    description: value.description,
    curriculumMode: value.curriculumMode as CourseBuildPlan["curriculumMode"],
    chapterPlans,
    knowledgePointPlans,
    priorityKnowledgePointIds,
    sourceDecisions,
    reviewNotes,
  };
}

function unique(values: readonly string[]) {
  return new Set(values).size === values.length;
}

function sameSet(actual: readonly string[], expected: readonly string[]) {
  const actualSet = new Set(actual);
  return actualSet.size === expected.length
    && expected.every((value) => actualSet.has(value));
}

export function validateCourseBuildPlan(
  plan: CourseBuildPlan,
  pack: ResolvedCourseBuildPack,
): CourseBuildPlanValidationResult {
  const issues: CourseBuildPlanValidationIssue[] = [];
  const { course } = pack;
  const chapterIds = course.chapters.map((chapter) => chapter.id);
  const knowledgePointIds = course.knowledgePoints.map((point) => point.id);
  const sourceIds = course.sources.map((source) => source.id);

  if (plan.curriculumMode !== course.curriculumMode) {
    issues.push({ path: "curriculumMode", message: "cannot change the declared curriculum mode" });
  }
  if (!unique(plan.chapterPlans.map((item) => item.chapterId))
    || !sameSet(plan.chapterPlans.map((item) => item.chapterId), chapterIds)
  ) {
    issues.push({ path: "chapterPlans", message: "must contain every known chapter exactly once" });
  }
  if (!unique(plan.knowledgePointPlans.map((item) => item.knowledgePointId))
    || !sameSet(
      plan.knowledgePointPlans.map((item) => item.knowledgePointId),
      knowledgePointIds,
    )
  ) {
    issues.push({ path: "knowledgePointPlans", message: "must contain every known knowledge point exactly once" });
  }
  if (!unique(plan.sourceDecisions.map((item) => item.sourceId))
    || !sameSet(plan.sourceDecisions.map((item) => item.sourceId), sourceIds)
  ) {
    issues.push({ path: "sourceDecisions", message: "must classify every known source exactly once" });
  }
  if (!unique(plan.priorityKnowledgePointIds)
    || plan.priorityKnowledgePointIds.some((id) => !knowledgePointIds.includes(id))
  ) {
    issues.push({ path: "priorityKnowledgePointIds", message: "contains an unknown or duplicate knowledge point" });
  }
  course.sources.filter((source) => source.status === "pending").forEach((source) => {
    const decision = plan.sourceDecisions.find((item) => item.sourceId === source.id);
    if (decision?.disposition === "use") {
      issues.push({
        path: `sourceDecisions.${source.id}`,
        message: "pending sources cannot be used as course truth",
      });
    }
  });
  if (plan.reviewNotes.length > 12) {
    issues.push({ path: "reviewNotes", message: "must contain at most 12 review notes" });
  }

  return { valid: issues.length === 0, issues };
}

export function assertValidCourseBuildPlan(
  plan: CourseBuildPlan,
  pack: ResolvedCourseBuildPack,
) {
  const result = validateCourseBuildPlan(plan, pack);
  if (!result.valid) {
    throw new Error(result.issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n"));
  }
}

export function parsePrivateOverlayCourseBuildPlan(
  value: unknown,
): CourseBuildPrivateOverlayPlan {
  if (!isRecord(value)
    || !hasOnlyKeys(value, [
      "version",
      "overlayId",
      "courseId",
      "knowledgePointId",
      "decisions",
    ])
    || value.version !== 1
    || !isNonEmptyString(value.overlayId, maxShortTextLength)
    || !isNonEmptyString(value.courseId, maxShortTextLength)
    || !isNonEmptyString(value.knowledgePointId, maxShortTextLength)
    || !Array.isArray(value.decisions)
  ) {
    throw new Error("Course Builder provider returned an invalid private overlay plan");
  }

  const decisions = value.decisions.map((item) => {
    if (!isRecord(item)
      || !hasOnlyKeys(item, ["excerptId", "disposition", "learningUse", "reviewNote"])
      || !isNonEmptyString(item.excerptId, maxShortTextLength)
      || !["use", "review", "exclude"].includes(String(item.disposition))
      || !isNonEmptyString(item.learningUse, 480)
      || !isNonEmptyString(item.reviewNote, 480)
    ) {
      throw new Error("Course Builder provider returned an invalid excerpt decision");
    }
    return {
      excerptId: item.excerptId,
      disposition: item.disposition as "use" | "review" | "exclude",
      learningUse: item.learningUse,
      reviewNote: item.reviewNote,
    };
  });

  return {
    version: 1,
    overlayId: value.overlayId,
    courseId: value.courseId,
    knowledgePointId: value.knowledgePointId,
    decisions,
  };
}

export function assertValidPrivateOverlayCourseBuildPlan(
  plan: CourseBuildPrivateOverlayPlan,
  overlay: CourseBuildPrivateOverlayInput,
): void {
  const expectedExcerptIds = overlay.excerpts.map((excerpt) => excerpt.id);
  const actualExcerptIds = plan.decisions.map((decision) => decision.excerptId);
  if (plan.overlayId !== overlay.overlayId
    || plan.courseId !== overlay.courseId
    || plan.knowledgePointId !== overlay.knowledgePointId
    || !unique(actualExcerptIds)
    || !sameSet(actualExcerptIds, expectedExcerptIds)
  ) {
    throw new Error(
      "Private overlay plan changed a protected target or excerpt identity",
    );
  }
}
