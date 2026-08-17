import type { Metadata } from "next";
import { WrongQuestionCenter } from "@/components/wrong-question-center";
import { registeredCourses } from "@/content/courses";

export const metadata: Metadata = {
  title: "错题中心｜NUR LEARN",
  description:
    "汇总题库练习与模考中的错题，按弱项知识点聚合，支持一键重做与知识点回看。",
  robots: { index: false, follow: false },
};

export default function WrongQuestionsPage() {
  return <WrongQuestionCenter courses={registeredCourses} />;
}
