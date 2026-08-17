import { CourseBuilderWorkbench } from "@/components/course-builder-workbench";
import { registeredCourses } from "@/content/courses";
import { materialCatalog } from "@/content/materials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "课程构建器 | NUR LEARN",
  description: "私人材料摄入、DOCX 解析、Qwen 私人分析、材料准入与课程草稿编译工作台。",
  robots: { index: false, follow: false },
};

export default function CourseBuilderPage() {
  const intakeCourseOptions = registeredCourses.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
  }));
  const intakeParsingCourseOptions = registeredCourses.map((course) => ({
    id: course.id,
    title: course.title,
    knowledgePoints: course.knowledgePoints.map((point) => {
      const chapter = course.chapters.find((item) => item.knowledgePointIds.includes(point.id));
      if (!chapter) {
        throw new Error(`Knowledge point ${point.id} is not assigned to a chapter.`);
      }
      return {
        id: point.id,
        title: point.title,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        contentStatus: point.contentStatus,
        sourceCount: point.sourceIds.length,
        hasLesson: point.lesson !== null,
      };
    }),
  }));
  const knownMaterialAssets = materialCatalog.assets.map((asset) => ({
    assetId: asset.id,
    sha256: asset.sha256,
    byteSize: asset.byteSize,
  }));

  return (
    <CourseBuilderWorkbench
      intakeCourseOptions={intakeCourseOptions}
      intakeParsingCourseOptions={intakeParsingCourseOptions}
      knownMaterialAssets={knownMaterialAssets}
    />
  );
}
