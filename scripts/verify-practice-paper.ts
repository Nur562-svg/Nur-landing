// 练习卷回退验证：pending 蓝图的课程走 createPracticePaper
import { getRequiredCourseBySlug } from "../src/content/courses";
import { createMockExamPaper } from "../src/lib/mock-exam";

const course = getRequiredCourseBySlug("physiology-qb");
const paper = createMockExamPaper(course, 120);

console.log("blueprint rows:", course.examBlueprint.rows.length, "(pending)");
console.log("blueprintTitle:", paper.blueprintTitle);
console.log("题数:", paper.items.length, "· 总分:", paper.totalPoints, "· complete:", paper.complete);
console.log("题型行:");
for (const row of paper.rows) {
  console.log(`  ${row.label} ${row.includedCount} 题`);
}
console.log("notice:", paper.notice.slice(0, 60) + "...");
// 校验：题均为课程内题目、分值合法、组上下文保留
const allIds = new Set([
  ...course.assessmentItems.map((i) => i.id),
  ...course.assessmentGroups.flatMap((g) => g.members.map((m) => m.id)),
]);
const unknown = paper.items.filter((i) => !allIds.has(i.itemId));
console.log("未知题目引用:", unknown.length);
const auto = paper.items.filter((i) => i.automaticallyScored).length;
console.log("可自动判定:", auto, "/", paper.items.length);
const withGroup = paper.items.filter((i) => i.groupId).length;
console.log("带组上下文:", withGroup);
