import type { Metadata } from "next";
import { CourseWorkspace } from "@/components/course-workspace";
import { getRequiredCourseBySlug } from "@/content/courses";
import { tcmDiagnosticsDemoLearnerState } from "@/content/demo/tcm-diagnostics-learner-state";
import { assertValidLearnerCourseState } from "@/lib/course-validation";

const course = getRequiredCourseBySlug("tcm-diagnostics");

export const metadata: Metadata = {
  title: `${course.title}课程工作台｜NUR LEARN`,
  description: `${course.title}的学期进度、章节路径、考试重点与学习任务总入口。`,
};

export default function TcmDiagnosticsPage() {
  assertValidLearnerCourseState(course, tcmDiagnosticsDemoLearnerState);

  return (
    <CourseWorkspace
      course={course}
      learnerState={tcmDiagnosticsDemoLearnerState}
    />
  );
}
