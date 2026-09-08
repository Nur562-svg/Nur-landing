# 组织学与胚胎学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社，以源 PDF 页为权威，主编信息请各章代理从素材正文核对，不臆造）。
> 沿用已验证范例 `src/content/courses/human-anatomy/extracted-human-anatomy-ch1.ts` 与 `src/content/courses/physiology/extracted-physiology-ch5.ts` 的 Schema、常量与文件头注释风格。
> 每个代理只处理被指派的章节分件（可多章，逐章生成独立文件）。

> 重要：本书为**原生文本层但双栏排版**，PyMuPDF 按布局顺序抽出后**选项、题干、题号常常错序交错**（例如某题选项 A 出现后隔几行才是本属它的 D/E，B1 组备选答案字母与文字分离、散在正文中）。必须按组织学/胚胎学**医学语义重建题干与选项的对应关系**，数值、结构、发育周龄/分期、部位、缩写均保留原值。错字罕见但可能有个别 OCR 遗留（如 已→己、B形→畸形、基→基），按医学语义恢复。

## 产出
新文件：`src/content/courses/histology-embryology/extracted-histology-embryology-ch{N}.ts`。不要改其他文件。

## 输入源（必读）
- 指派章节素材：`scripts/histo-snippets/ch{N}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页，正文含 学习要求→复习纲要→习题→参考答案）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（照搬句式，topic 用指派值）
```ts
import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

const topic = "histology-embryology-ch{N}-{slug}";   // 用指派值
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第{N}章 {章名} 复习思考题 习题（核对PDF 第{A}–{C}页）";  // A,C 用指派 PDF 范围
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;
```

## 题型映射（本书特有，务必遵守）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| （一）A1型题、（二）A2型题（病案） | `a1-single` | 选择，带 `choices`+`correctChoiceIndex`(0起)，对应源参考答案键号 |
| （X型题/X1型）多选 | `a1-single` | 改为单选句，取其中一个正确项，`promptSource.note=xMapNote` |
| B型题（共用备选答案配伍） | Group `b1` | 组级 `sharedChoices`+order，成员各带 `order`+`knowledgePointId`+`correctChoiceIndex` |
| 填空题 | `fill` | 答案 content[0]=所填内容（多空按空序号列出），content[1]=解析 |
| 名词解释 | `term` | 答案 content[0]=名词定义要点，content[1]=解析/拓展 |
| 简答题/问答题/论述题 | `short-answer` | 答案 content[0]=要点，content[1]=解析；简答/论述的「答:」常内联在题后 |

## 正确项（必须取自源参考答案，无法锚定时换同源清晰题）
- 选择题正确项文本 → 作正确项内容；`correctChoiceIndex` = 正确项在**重排后**选项数组的下标(0起)。
- 选项需生成 4~5 个；双栏错序时按题干语义从散落文本恢复完整选项集合，不改原数值/结构。
- B1 组 sharedChoices 从「共用备选答案」区恢复；成员 correctChoiceIndex 对齐组级备选；组级**不得写 knowledgePointId**，成员必须写。
- 某章**缺少「参考答案」**（如第28章）：仅取正确项能从「复习纲要」正文**明确锚定**的题；无法锚定者跳过，缺失如实记录。
- 选择题若无法锚定唯一正确项：改选同源更清晰题，缺失如实记录。

## ID 与 order
- ID：`ext-histology-embryology-{topic}-{suffix}`，suffix：`term001`/`a1001`/`fill001`/`short001`/`b001`/`b001m1`…
- 整文件 order 必须严格连续 1..budget。
- 总量：term + a1 + fill + short + B1成员数 = budget（每个 B1 组只按成员数计入，组壳不计入）。
- 各数组定义顺序：termItems → a1Items → fillItems → shortItems → bGroups。

## 文件头注释（含归纳报告）
```ts
/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第{N}章 {章名} 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：X 题
 * - 选择题（a1-single）：X 题（含 A2/X 型映射）
 * - 填空题（fill）：X 题
 * - 简答/问/论述题（short-answer）：X 题
 * - B1 配伍题：X 组、共 X 个成员
 * - 独立记分题合计：X 题（须等于本文件预算 {budget}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书题型分布；双栏错序已按医学语义恢复，数值/结构保留，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 取材与预算
- 预算 = 指派给你的 budget（独立记分题，含 B1 组成员），按原书题目顺序取满。
- 素材注释第一行已给出 `TITLE / PDF_PAGES / CHARS / BUDGET`，以指派 budget 为准。

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...fillItems, ...shortItems, ...caseItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（无某类时定义空数组并注释；导出键齐全。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过（单文件命令因 `@/` 别名会误报，以项目级为准）。
- 报告：每分件独立记分题总数是否=预算、题型分布、正确项是否对齐源答案、缺失/换题数、双栏恢复说明。