import "server-only";

import type {
  CourseBuildPlan,
  CourseBuildPrivateOverlayInput,
  CourseBuildPrivateOverlayPlan,
  PrivateMaterialAnalysisProviderPlan,
} from "@/types/course-builder";
import type { ResolvedCourseBuildPack } from "./packs";

export type CourseBuilderProvider = {
  id: string;
  model: string;
  createPlan(
    pack: ResolvedCourseBuildPack,
    baselinePlan: CourseBuildPlan,
  ): Promise<CourseBuildPlan>;
  createPrivateOverlayPlan(
    pack: ResolvedCourseBuildPack,
    overlay: CourseBuildPrivateOverlayInput,
  ): Promise<CourseBuildPrivateOverlayPlan>;
  analyzePrivateMaterial(
    overlay: CourseBuildPrivateOverlayInput,
    target: {
      courseTitle: string;
      knowledgePointTitle: string;
    },
  ): Promise<PrivateMaterialAnalysisProviderPlan>;
};

export class CourseBuilderProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CourseBuilderProviderError";
  }
}
