// 题库课程全量验证：注册表 + 每科章节可答题数
import { registeredCourses } from "../src/content/courses/index";
import { selectAssessmentItemsForChapter } from "../src/lib/course-selectors";

const qbCourses = registeredCourses.filter((c) => c.slug.endsWith("-qb"));
console.log(`已注册课程 ${registeredCourses.length} 门（其中题库课程 ${qbCourses.length} 门）:`);
console.log(registeredCourses.map((c) => c.slug).join(", "));
console.log("");

let totalAll = 0;
let bad = 0;
for (const course of qbCourses) {
  let total = 0;
  let empty = 0;
  for (const ch of course.chapters) {
    const n = selectAssessmentItemsForChapter(course, ch.id).length;
    total += n;
    if (n === 0) {
      empty++;
      console.log(`  ⚠️ ${course.slug}/${ch.title}: 空章节`);
    }
  }
  totalAll += total;
  const flag = empty === 0 && total > 0 ? "✅" : "❌";
  if (empty !== 0 || total === 0) bad++;
  console.log(
    `${flag} ${course.slug.padEnd(26)} 章节 ${String(course.chapters.length).padStart(2)} · 可答题 ${String(total).padStart(5)}（顶层 ${course.assessmentItems.length} + 组 ${course.assessmentGroups.length}）`,
  );
}
console.log("");
console.log(`题库课程合计可答题（含 B1 成员）: ${totalAll}`);
console.log(bad === 0 ? "✅ 全部题库课程可被现有题库 UI 消费" : `❌ ${bad} 门有问题`);
process.exit(bad === 0 ? 0 : 1);
