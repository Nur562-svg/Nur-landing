import type { Metadata } from "next";
import { WrongQuestionCenter } from "@/components/wrong-question-center";
import { publishedCourses } from "@/content/courses";
import { listClewWrongItems } from "@/lib/clew/reviews";
import { getClewSessionUser } from "@/lib/clew/session-user";

export const metadata: Metadata = {
  title: "错题中心｜Ariadne",
  description:
    "汇总题库练习与模考中的错题，按弱项知识点聚合，支持一键重做与知识点回看。",
  robots: { index: false, follow: false },
};

/** ZCODE-M5：Clew 复习调度条目（自测「还需看」）服务端注入；未登录为空数组。 */
export const dynamic = "force-dynamic";

export default async function WrongQuestionsPage() {
  const user = await getClewSessionUser();
  const clewItems = user ? await listClewWrongItems(user.id) : [];
  return <WrongQuestionCenter courses={publishedCourses} clewItems={clewItems} />;
}
