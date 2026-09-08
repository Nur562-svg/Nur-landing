# 医学细胞生物学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《医学细胞生物学实验指导与习题集》第4版（全书签 PDF）。**题库只取第二部分「习题集」18 章（第一章 绪论 … 第十八章 细胞工程，PDF 第 103–226 页）**，第一部分「实验指导」不是题目区，不取。本书有原生文本层但为**双栏排版**，PyMuPDF 按布局顺序抽出后题干、选项、题号、小节标题**交错散落**，必须按细胞生物学医学语义重建。
> 沿用已验证范例 `src/content/courses/human-anatomy/extracted-human-anatomy-ch1.ts` 的 Schema、常量与文件头注释风格。

## 产出
新文件：`src/content/courses/cell-biology/extracted-cell-bio-ch{N}.ts`，N 为 01..18。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/cellbio-snippets/ch{N}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；习题→参考答案）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "cell-bio-ch{N}-{slug}";   // 用指派值
const locatorBase =
  "《医学细胞生物学实验指导与习题集》第4版 第{N}章 {章名} 习题集（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（本书事实：无配伍/填空/简答，仅三类）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 二、单项选择题（含 A1/A2） | `a1-single` | 选择，带 choices+correctChoiceIndex(0起)，对应源参考答案键号 |
| 三、多项选择题（X 型） | `a1-single` | 改为单选句、取其中一个正确项，`promptSource.note=xMapNote`，prompt 注明源为多选 |
| 一、名词解释 | `term` | 答案 content[0]=定义要点，content[1]=解析 |

- 若某章个别题实为简答/问答题，按其原义映射 `short-answer`；本教程各章一般没有。
- 因为本书无 B 型配伍：`bGroups` 一律置空数组；导出键仍齐全。
- 若某章源题不足达到预算，按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造题目/答案）。

## 正确项（必须取自章末「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 双栏错序时按题干语义恢复完整选项集合（单选题通常 4~5 项），对照参考答案键号（如 `1.E 2.B …`）确定正确项，选项随机重排并同步 correctChoiceIndex(0 起)。
- 答案用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点，content[1]=解析；`scoring:null`。
- 数值、结构、过程、比值保留原值；口语化/错误识别按细胞生物学语义校正。

## ID 与 order
- ID：`ext-cell-bio-{topic}-{suffix}`，suffix：`term001` / `a1001` / `x001`…
- 整文件 order 严格连续 1..budget。
- 总量：term + a1 + x(mapped 计入) = budget。
- 数组定义顺序：termItems → a1Items → bGroups（空）。

## 文件头注释（含归纳报告）
```ts
/**
 * 医学细胞生物学实验指导与习题集（第4版）— 第{N}章 {章名} 题库提取（等比取样）
 * 来源：《医学细胞生物学实验指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：X 题
 * - 单项选择题（a1-single）：X 题（其中多项选择题映射 X 题）
 * - 独立记分题合计：X 题（须等于本文件预算 {budget}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书题型分布（本书无配伍/填空/简答，则据实说明）；双栏错序已按医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（bGroups 为 `[]`，可注释说明本书无 B 型配伍。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过。
- 报告：独立记分题总数=预算？名词/单选/多选映射数量、正确项是否对齐源答案、缺失/换题数、双栏恢复说明。