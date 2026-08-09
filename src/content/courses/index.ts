import { assertValidCourseRegistry } from "@/lib/course-validation";
import type { CourseDefinition } from "@/types/learning";
import { materialCatalog } from "@/content/materials";
import { physiologyCourse } from "./physiology";
import { tcmDiagnosticsCourse } from "./tcm-diagnostics";

const registeredCourses: readonly CourseDefinition[] = [
  tcmDiagnosticsCourse,
  physiologyCourse,
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
