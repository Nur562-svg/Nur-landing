import type { LearnerCourseState } from "@/types/learning";
import { physiologyDemoLearnerState } from "./physiology-learner-state";
import { tcmDiagnosticsDemoLearnerState } from "./tcm-diagnostics-learner-state";

const demoLearnerStates: readonly LearnerCourseState[] = [
  tcmDiagnosticsDemoLearnerState,
  physiologyDemoLearnerState,
];

export function getDemoLearnerStateByCourseId(
  courseId: string,
): LearnerCourseState | undefined {
  return demoLearnerStates.find((state) => state.courseId === courseId);
}

export { demoLearnerStates };
