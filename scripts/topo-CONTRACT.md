# 局部解剖学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《局部解剖学学习指导与习题集》（人民卫生出版社，与《局部解剖学》教材配套；文件名「23.局部解剖学学习指导与习题集-全书签.pdf」）。本书为**扫描件**，素材由 macOS Vision OCR + 局部解剖学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号散落错位，必须按局部解剖学医学语义重建。
> 沿用已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts`（term/a1/short/b1 混排）的 Schema、常量与文件头注释风格。
> 科目目录 `src/content/courses/topographic-anatomy/`，聚合导出 `topographicAnatomyExtractedItems` / `topographicAnatomyExtractedGroups`。

## 产出
新文件：`src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch{NN}.ts`，NN 为 00..08（00=绪论，01..08=正文章）。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/topo-snippets/ch{NN}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；各节「习题」→「参考答案」；章内各节依序拼接）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "topographic-anatomy-ch{NN}-{slug}";   // 用指派值
const locatorBase =
  "《局部解剖学学习指导与习题集》 第{NN}章 {章名} 习题（核对PDF 第{A}–{C}页）";   // 绪论章名为「绪论」
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（局部解剖学第版事实：本书无填空、无论述、无 X 型多选）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 一、名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| 二、选择题【A1型题】 | `a1-single` | 单选，5 选项，对应参考答案键号 |
| 二、选择题【A2型题】（病例） | `a1-single` | 单选，5 选项，对应参考答案键号 |
| 二、选择题【B1型题】（共用备选答案配伍） | `AssessmentItemGroupDefinition`（questionKind:"b1"） | 组级 order+promptSource（**组级不得写 knowledgePointId**）；成员各含 order+knowledgePointId+promptSource+correctChoiceIndex（指向 sharedChoices） |
| 三、简答题 | `short-answer` | content[0]=要点，content[1]=解析 |
- 若某章无某类题型：该数组导出为空数组并在文件头注明。
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自各节「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 本书「习题」与「参考答案」分散在每节内（如第一节概述、第二节面部…各节均有独立习题与参考答案）。参考答案区结构：`参考答案 → 一、名词解释 → 二、选择题【A1型题】【A2型题】【B1型题】 → 三、简答题`。注意 A1/A2/B1 各题号**分别从 1 重新编号**（各小节独立编号；各节亦独立编号）。
- 选项可能双栏错序、答案键号（如 `1.C 2.B …`）散落错位（OCR 常把多题键号挤在一行，如 `30.A31.E32.C`）；按局部解剖学医学语义重建完整选项集合（单选通常 5 项）并对照键号定正确项，选项随机重排并同步 correctChoiceIndex(0 起)。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点，content[1]=解析；`scoring:null`。
- OCR 错字按医学语义校正（局部解剖学常见：解剖结构名、血管神经名、数字与单位保留原值；如 肋→肋、延髄→延髓 类既往错误亦按语义恢复），未捏造。

## 取样规则（每章预算 B 见文件头与 scripts/topo-budget.json）
- 独立记分单元 = term + a1（A1+A2）+ **B1 组成员** + short（简答），合计**恰等于该章预算 B**。
- 在原书顺序内取材（按各节出现顺序，每类内部保持原书题号顺序；先出现的节优先）。
- 简答题通常数量少：优先全取；若全取后超出预算，则按原书顺序取前若干道。
- 名词解释优先全取；若超出预算按原书顺序取前若干道。
- 选择题（A1+A2）与 B1 组成员按源题量占比在预算内取材；**B1 必须取完整组**（一组 sharedChoices + 全部成员），成员数计入预算。
- 若源题总量 ≤ B：全取并在文件头注明「源题不足预算，实取 N（预算 B）」。
- 各章预算（B）以 scripts/topo-budget.json 为准（Hamilton 最大余数法，600×章习题区字符占比）。

## ID 与 order
- ID：`ext-topographic-anatomy-{topic}-{suffix}`，suffix：`term001`/`a1001`/`short001`；B1 组 `b001`、成员 `b001m1`/`b001m2`…
- 整文件 order 严格连续 1..B（B1 组级 order 与其首个成员相同，成员依次递增）。
- 数组定义顺序：termItems → a1Items → shortItems → bGroups。

## 文件头注释（含归纳报告）
```ts
/**
 * 局部解剖学学习指导与习题集 — 第{NN}章 {章名} 题库提取（等比取样）
 * 来源：《局部解剖学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：X 题
 * - 选择题（a1-single）：X 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：X 题（简答）
 * - B1 配伍题：X 组、共 Y 个成员
 * - 独立记分题合计：X 题（须等于本文件预算 {B}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书各节（……）依序含名词解释、选择题（A1/A2/B1）、简答题；本文件按 {B}
 *   道预算在原书顺序内取材：名词解释全取/取前 X、A1 型取第 1–N 题、A2 型取第 1–M 题、
 *   简答题取第 1–K 题、B1 型取完整组；未纳入的题因预算所限。正确项对齐各节参考答案键号
 *   （A1/A2/B1 各小节与各节独立编号），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按局部解剖学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（无某类时定义空数组并注释；无 B 型时 bGroups 为空数组并注明。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过。
- 报告：独立记分题总数=预算？term/a1/short/B1成员数量、正确项是否对齐源答案、缺失/换题数、OCR 恢复说明。
