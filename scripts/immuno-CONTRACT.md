# 医学免疫学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《医学免疫学学习指导与习题集》第3版（人民卫生出版社，全书签扫描件）。本章素材由扫描件经 macOS Vision OCR + 免疫学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号缺失错位，必须按免疫学医学语义重建。
> 沿用已验证范例 `src/content/courses/human-anatomy/extracted-human-anatomy-ch1.ts` 的 Schema、常量与文件头注释风格。

## 产出
新文件：`src/content/courses/immunology/extracted-immunology-ch{N}.ts`，N 为 1..25。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/immuno-snippets/ch{N}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；习题→参考答案）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "immunology-ch{N}-{slug}";   // 用指派值
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第{N}章 {章名} 习题（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（免疫学第3版事实：名词+填空+选择题(A1/A2)+问答题；一般无多选/B型/判断）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 一、名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| 二、填空题 | `fill` | 多空答案 content[0] 按空序号列出 |
| 三、选择题 A1 型 / A2 型（病例） | `a1-single` | 带 choices+correctChoiceIndex(0起)，对应参考答案键号 |
| 四、问答题 / 简答题 | `short-answer` | content[0]=要点，content[1]=解析 |
- 若某章真出现 多项选择题：按契约映射 a1-single 单选取一正确项（note=xMapNote）。
- 本书一般无 B 型配伍：`bGroups` 置空数组；导出键仍齐全（extractedGroups 空数组即导出 `[]`）。
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自章末「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 两份情况下选项可能双栏错序、答案键号（如 `1.E 2.B …`）散落错位；按免疫学医学语义重建完整选项集合（单选通常 4~5 项）并对照键号定正确项，选项随机重排并同步 correctChoiceIndex(0 起)。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点，content[1]=解析；`scoring:null`。
- OCR 错字按医学语义校正（例：CD4⁻/CD4⁺、HLA-I 类/II 类、T 细胞亚群、细胞因子名、抗体类别等），数值/分子符号保留原值。

## ID 与 order
- ID：`ext-immunology-{topic}-{suffix}`，suffix：`term001`/`fill001`/`a1001`/`short001`…
- 整文件 order 严格连续 1..budget。
- 总量：term + fill + a1 + short = budget。
- 数组定义顺序：termItems → a1Items → fillItems → shortItems → bGroups（空）。

## 文件头注释（含归纳报告）
```ts
/**
 * 医学免疫学学习指导与习题集（第3版）— 第{N}章 {章名} 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：X 题
 * - 填空题（fill）：X 题
 * - 选择题（a1-single）：X 题（含 A2 病例题）
 * - 问答题（short-answer）：X 题
 * - 独立记分题合计：X 题（须等于本文件预算 {budget}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书题型分布；OCR 错字与双栏错序已按免疫学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...fillItems, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（无某类时定义空数组并注释；bGroups 为空并注明本书一般无 B 型配伍。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过。
- 报告：独立记分题总数=预算？名词/填空/单选/问答数量、正确项是否对齐源答案、缺失/换题数、OCR 恢复说明。