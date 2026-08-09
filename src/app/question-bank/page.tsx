import type { Metadata } from "next";
import { QuestionBankGlobal } from "@/components/question-bank-global";
import { registeredCourses } from "@/content/courses";

export const metadata: Metadata = {
  title: "题库｜NUR LEARN",
  description: "跨课程题目聚合浏览与训练，支持按年级、题型筛选与刷题统计。",
};

export default function GlobalQuestionBankPage() {
  return <QuestionBankGlobal courses={registeredCourses} />;
}
