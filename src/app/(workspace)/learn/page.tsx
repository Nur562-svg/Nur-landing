import { LearningDashboard } from "@/components/learning-dashboard";
import { publishedCourses } from "@/content/courses";
import { selectClewTodayReviews } from "@/lib/clew/reviews";
import { getClewSessionUser } from "@/lib/clew/session-user";
import {
  selectContinueLearningTarget,
  selectUnifiedLearningFeed,
} from "@/lib/unified-state";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "周学习主页 | Ariadne",
  description: "证据优先的周计划、薄弱知识点回流、学习进度与 Ariadne Agent 辅助学习入口。",
};

/** 学习首页不需要把 15 门题库课的全部题目序列化进客户端（约 15MB，浏览器会一直停在加载）。 */
const dashboardCourses = publishedCourses.filter((course) => (
  course.knowledgePoints.some((kp) => kp.lesson !== null)
));

/** ZCODE-M3 Phase 2：登录时服务端取「学习动态」与「继续上次学习」（避免客户端挂载后 fetch 的瀑布与闪烁）。
 *  ZCODE-M5：登录时一并取「今日复习」（Clew FSRS 到期聚合）；未登录不渲染该区。 */
export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const user = await getClewSessionUser();
  // 未登录 → unifiedFeed/todayReviews 传 undefined（不渲染区块）；登录但无记录 → []（渲染空态一行）
  const [unified, reviews] = user
    ? await Promise.all([
        (async () => ({
          feed: await selectUnifiedLearningFeed(user.id),
          continueTarget: await selectContinueLearningTarget(user.id),
        }))(),
        selectClewTodayReviews(user.id),
      ])
    : [{ feed: undefined, continueTarget: null }, null];

  return (
    <LearningDashboard
      courses={dashboardCourses}
      unifiedFeed={unified.feed}
      continueTarget={unified.continueTarget}
      todayReviews={reviews?.items}
      clewDueCount={reviews?.dueCount ?? 0}
    />
  );
}
