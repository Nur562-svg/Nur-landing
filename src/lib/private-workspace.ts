import type { CourseDefinition } from "@/types/learning";
import type { MaterialIntakeCourseOption } from "@/types/material-intake";
import type { MaterialParsingCourseOption } from "@/types/material-parsing";

export const PRIVATE_WORKSPACE_COURSE_ID = "course-private-workspace";
export const PRIVATE_WORKSPACE_COURSE_SLUG = "private-workspace";
export const PRIVATE_WORKSPACE_KP_ID = "kp-imported-materials";
export const PRIVATE_WORKSPACE_COURSE_TITLE = "我的资料";
export const PRIVATE_WORKSPACE_KP_TITLE = "导入练习";
export const PRIVATE_WORKSPACE_CHAPTER_ID = "ch-imported-materials";
export const PRIVATE_WORKSPACE_CHAPTER_TITLE = "本次导入";

export function isPrivateWorkspaceTarget(courseId: string, knowledgePointId: string): boolean {
  return courseId === PRIVATE_WORKSPACE_COURSE_ID && knowledgePointId === PRIVATE_WORKSPACE_KP_ID;
}

export function privateWorkspaceIntakeCourseOption(): MaterialIntakeCourseOption {
  return {
    id: PRIVATE_WORKSPACE_COURSE_ID,
    slug: PRIVATE_WORKSPACE_COURSE_SLUG,
    title: PRIVATE_WORKSPACE_COURSE_TITLE,
  };
}

export function privateWorkspaceParsingCourseOption(): MaterialParsingCourseOption {
  return {
    id: PRIVATE_WORKSPACE_COURSE_ID,
    title: PRIVATE_WORKSPACE_COURSE_TITLE,
    knowledgePoints: [{
      id: PRIVATE_WORKSPACE_KP_ID,
      title: PRIVATE_WORKSPACE_KP_TITLE,
      chapterId: PRIVATE_WORKSPACE_CHAPTER_ID,
      chapterTitle: PRIVATE_WORKSPACE_CHAPTER_TITLE,
      contentStatus: "demo",
      sourceCount: 0,
      hasLesson: false,
    }],
  };
}

export function resolvePrivateMaterialAnalysisTarget(
  overlay: { courseId: string; knowledgePointId: string },
  courses: readonly CourseDefinition[],
): { courseTitle: string; knowledgePointTitle: string } | null {
  if (isPrivateWorkspaceTarget(overlay.courseId, overlay.knowledgePointId)) {
    return {
      courseTitle: PRIVATE_WORKSPACE_COURSE_TITLE,
      knowledgePointTitle: PRIVATE_WORKSPACE_KP_TITLE,
    };
  }
  const course = courses.find((candidate) => candidate.id === overlay.courseId);
  const knowledgePoint = course?.knowledgePoints.find((candidate) => (
    candidate.id === overlay.knowledgePointId
  ));
  if (!course || !knowledgePoint) {
    return null;
  }
  return {
    courseTitle: course.title,
    knowledgePointTitle: knowledgePoint.title,
  };
}
