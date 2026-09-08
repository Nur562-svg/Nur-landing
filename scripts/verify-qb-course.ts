// 注册表 + 题库课程完整性验证（生成器配套）
import { registeredCourses } from "../src/content/courses/index";
import { selectAssessmentItemsForChapter } from "../src/lib/course-selectors";

const qb = registeredCourses.find((c) => c.slug === "physiology-qb");
if (!qb) {
  console.error("❌ physiology-qb 未注册");
  process.exit(1);
}
console.log("已注册课程:", registeredCourses.map((c) => c.slug).join(", "));
console.log(
  `physiology-qb · 章节 ${qb.chapters.length} · 顶层题 ${qb.assessmentItems.length} · 组 ${qb.assessmentGroups.length}`,
);

let total = 0;
let emptyChapters = 0;
for (const ch of qb.chapters) {
  const n = selectAssessmentItemsForChapter(qb, ch.id).length;
  total += n;
  if (n === 0) {
    emptyChapters++;
    console.log("⚠️ 空章节:", ch.title);
  }
}
console.log(`章节可答题合计（含 B1 成员）: ${total}`);
console.log(`空章节数: ${emptyChapters} ${emptyChapters === 0 ? "✅" : "❌"}`);
console.log(total > 0 ? "✅ 题库课程可被现有题库 UI 消费" : "❌ 无题可用");
