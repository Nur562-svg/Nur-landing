import { assertValidCourseRegistry } from "@/lib/course-validation";
import type { CourseDefinition } from "@/types/learning";
import { materialCatalog } from "@/content/materials";
import { physiologyCourse } from "./physiology";
import { tcmDiagnosticsCourse } from "./tcm-diagnostics";
// —— 题库课程（extracted 底稿薄包装，AUTO-GENERATED）——
import { biochemistryQbCourse } from "./biochemistry-qb";
import { cellBioQbCourse } from "./cell-biology-qb";
import { diagnosticsQbCourse } from "./diagnostics-qb";
import { histologyEmbryologyQbCourse } from "./histology-embryology-qb";
import { humanAnatomyQbCourse } from "./human-anatomy-qb";
import { immunologyQbCourse } from "./immunology-qb";
import { medicalGeneticsQbCourse } from "./medical-genetics-qb";
import { microbiologyQbCourse } from "./microbiology-qb";
import { neurologyQbCourse } from "./neurology-qb";
import { pathologyQbCourse } from "./pathology-qb";
import { pharmacologyQbCourse } from "./pharmacology-qb";
import { physiologyQbCourse } from "./physiology-qb";
import { radiologyBankQbCourse } from "./radiology-qb";
import { tcmDiagnosticsBankQbCourse } from "./tcm-diagnostics-qb";
import { topographicAnatomyQbCourse } from "./topographic-anatomy-qb";

const registeredCourses: readonly CourseDefinition[] = [
  tcmDiagnosticsCourse,
  physiologyCourse,
  // —— 题库课程（按科目，可独立进入 /courses/{slug}/question-bank）——
  diagnosticsQbCourse,
  physiologyQbCourse,
  medicalGeneticsQbCourse,
  humanAnatomyQbCourse,
  biochemistryQbCourse,
  histologyEmbryologyQbCourse,
  cellBioQbCourse,
  immunologyQbCourse,
  microbiologyQbCourse,
  neurologyQbCourse,
  pharmacologyQbCourse,
  topographicAnatomyQbCourse,
  pathologyQbCourse,
  tcmDiagnosticsBankQbCourse,
  radiologyBankQbCourse,
];

assertValidCourseRegistry(registeredCourses, materialCatalog);

export function getCourseBySlug(slug: string): CourseDefinition | undefined {
  return registeredCourses.find((course) => course.slug === slug);
}

export function getRequiredCourseBySlug(slug: string): CourseDefinition {
  const course = getCourseBySlug(slug);
  if (!course) {
    throw new Error(`Course is not registered: ${slug}`);
  }
  return course;
}

export { registeredCourses };
