import { LearningDashboard } from "@/components/learning-dashboard";
import { registeredCourses } from "@/content/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "周学习主页 | NUR LEARN",
  description: "证据优先的周计划、薄弱知识点回流、学习进度与 NUR Agent 辅助学习入口。",
};

export default function LearnPage() {
  return <LearningDashboard courses={registeredCourses} />;
}
