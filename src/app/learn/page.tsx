import { LearningDashboard } from "@/components/learning-dashboard";
import { publishedCourses } from "@/content/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "周学习主页 | NUR LEARN",
  description: "证据优先的周计划、薄弱知识点回流、学习进度与 NUR Agent 辅助学习入口。",
};

/** 学习首页不需要把 15 门题库课的全部题目序列化进客户端（约 15MB，浏览器会一直停在加载）。 */
const dashboardCourses = publishedCourses.filter((course) => (
  course.knowledgePoints.some((kp) => kp.lesson !== null)
));

export default function LearnPage() {
  return <LearningDashboard courses={dashboardCourses} />;
}
