import type { Metadata } from "next";
import { CourseCatalog } from "@/components/course-catalog";
import { publishedCourses } from "@/content/courses";

export const metadata: Metadata = {
  title: "课程目录｜Ariadne",
  description: "选择学习闭环或题库课程：中医诊断学、生理学，以及各科章节练习。",
};

export default function CoursesIndexPage() {
  return <CourseCatalog courses={publishedCourses} />;
}
