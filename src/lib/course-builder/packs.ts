import "server-only";

import { tcmDiagnosticsCourse } from "@/content/courses/tcm-diagnostics";
import { materialCatalog } from "@/content/materials";
import { tcmDiagnosticsOfficialMaterialPackV1 } from "@/content/materials/tcm-diagnostics-official-pack-v1";
import type {
  CourseBuildMaterialPackSummary,
  CourseBuildPlan,
  OfficialCourseMaterialPack,
} from "@/types/course-builder";
import type { CourseDefinition } from "@/types/learning";
import { assertValidOfficialCourseMaterialPack } from "./official-pack";

export type ResolvedCourseBuildPack = {
  summary: CourseBuildMaterialPackSummary;
  course: CourseDefinition;
  officialMaterialPack: OfficialCourseMaterialPack;
};

function countSources(
  course: CourseDefinition,
  status: "verified" | "available" | "pending",
) {
  return course.sources.filter((source) => source.status === status).length;
}

function countMaterialArtifacts(course: CourseDefinition) {
  return new Set(course.sources.flatMap((source) => source.materialArtifactIds ?? [])).size;
}

function countPrivacyRestrictedArtifacts(course: CourseDefinition) {
  const referencedArtifactIds = new Set(
    course.sources.flatMap((source) => source.materialArtifactIds ?? []),
  );
  const restrictedAssetIds = new Set(
    materialCatalog.assets
      .filter((asset) => asset.privacyRisk === "identifiable-person")
      .map((asset) => asset.id),
  );

  return materialCatalog.artifacts.filter((artifact) => (
    referencedArtifactIds.has(artifact.id)
    && restrictedAssetIds.has(artifact.assetId)
  )).length;
}

const tcmDiagnosticsPack: ResolvedCourseBuildPack = {
  summary: {
    id: "pack-tcm-diagnostics-approved-2026-07-18",
    label: "《中医诊断学》已核对材料包",
    courseId: tcmDiagnosticsCourse.id,
    courseSlug: tcmDiagnosticsCourse.slug,
    sourceCount: tcmDiagnosticsCourse.sources.length,
    verifiedSourceCount: countSources(tcmDiagnosticsCourse, "verified"),
    availableSourceCount: countSources(tcmDiagnosticsCourse, "available"),
    pendingSourceCount: countSources(tcmDiagnosticsCourse, "pending"),
    materialArtifactCount: countMaterialArtifacts(tcmDiagnosticsCourse),
    privacyRestrictedArtifactCount: countPrivacyRestrictedArtifacts(tcmDiagnosticsCourse),
    description: "用已经人工核对的教材、教师范围、学校题源、历史试卷和 NUR 内容边界，验证从材料到完整 typed course draft 的构建闭环。",
  },
  course: tcmDiagnosticsCourse,
  officialMaterialPack: tcmDiagnosticsOfficialMaterialPackV1,
};

assertValidOfficialCourseMaterialPack(
  tcmDiagnosticsPack.officialMaterialPack,
  tcmDiagnosticsPack.course,
  materialCatalog,
);

const knownPacks = [tcmDiagnosticsPack] as const;

export function listCourseBuildPacks(): readonly CourseBuildMaterialPackSummary[] {
  return knownPacks.map((pack) => pack.summary);
}

export function getCourseBuildPack(
  packId: string,
): ResolvedCourseBuildPack | undefined {
  return knownPacks.find((pack) => pack.summary.id === packId);
}

export function createBaselineCourseBuildPlan(
  pack: ResolvedCourseBuildPack,
): CourseBuildPlan {
  const { course } = pack;
  return {
    courseTitle: course.title,
    catalogLabel: course.catalogLabel,
    description: course.description,
    curriculumMode: course.curriculumMode,
    chapterPlans: course.chapters.map((chapter) => ({
      chapterId: chapter.id,
      focus: chapter.focus,
    })),
    knowledgePointPlans: course.knowledgePoints.map((point) => ({
      knowledgePointId: point.id,
      note: point.note,
      emphasis: point.emphasis,
    })),
    priorityKnowledgePointIds: pack.officialMaterialPack.evidenceMatrix
      .filter((point) => point.tier === "core-loop")
      .map((point) => point.knowledgePointId),
    sourceDecisions: course.sources.map((source) => ({
      sourceId: source.id,
      disposition: source.status === "pending" ? "review" : "use",
      rationale: source.status === "pending"
        ? `${source.displayLabel}尚未提供，保留为待确认，不参与事实生成。`
        : `${source.displayLabel}按${source.authority}权威层和${source.scope}范围使用。`,
    })),
    reviewNotes: [
      "课程骨架可完整生成，但只有已具备来源定位和训练定义的知识点可以生成深层学习闭环。",
      "任课教师最终九页复习稿与主观题评分量表仍待导入，不得由模型补写。",
      "学生题库答案必须逐题复核，不能从题干来源推导答案权威。",
    ],
  };
}
