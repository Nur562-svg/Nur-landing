# 医学微生物学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《医学微生物学学习指导与习题集》第2版（人民卫生出版社，全书签扫描件）。本章素材由扫描件经 macOS Vision OCR + 微生物学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号缺失错位，必须按微生物学医学语义重建。
> 沿用已验证范例 `src/content/courses/immunology/extracted-immunology-ch01.ts` 的 Schema、常量与文件头注释风格。

## 产出
新文件：`src/content/courses/microbiology/extracted-microbiology-ch{NN}.ts`，NN 为 00..36（绪论为 ch00，其余 01..36）。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/microbio-snippets/ch{NN}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；习题→参考答案）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "microbiology-ch{NN}-{slug}";   // 用指派值
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第{NN}章 {章名} 习题（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```
- 绪论章（ch00）章名「绪论」，locatorBase 用「绪论 习题（核对PDF 第12–15页）」。

## 题型映射（医学微生物学第2版事实）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 一、名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| 二、填空题 | `fill` | 多空答案 content[0] 按空序号列出 |
| 三、选择题【A1型题】/【A2型题】（病例） | `a1-single` | 带 choices+correctChoiceIndex(0起)，对应参考答案键号 |
| 三、选择题【B1型题】（共用备选答案配伍） | `AssessmentItemGroupDefinition`（questionKind:"b1"） | 组级 order+promptSource（**组级不得写 knowledgePointId**）；成员各含 order+knowledgePointId+promptSource+correctChoiceIndex（指向 sharedChoices） |
| 四、简答题 / 问答题 | `short-answer` | content[0]=要点，content[1]=解析 |
- 若某章真出现 多项选择题（X 型）：按契约映射 a1-single 单选取一正确项（note=xMapNote）。
- 若某章无某类题型（如 ch28 肝炎病毒无填空/简答）：该数组导出为空数组并在文件头注明。
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自章末「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 两份情况下选项可能双栏错序、答案键号（如 `1.E 2.B …`）散落错位；按微生物学医学语义重建完整选项集合（单选通常 4~5 项）并对照键号定正确项，选项随机重排并同步 correctChoiceIndex(0 起)。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点，content[1]=解析；`scoring:null`。
- OCR 错字按医学语义校正（例：G*菌/G菌→G⁺菌/G⁻菌、沩/力/分力→为、英膜→荚膜、芽胞→芽胞、疱瘆→疱疹、HBSAg→HBsAg、CD4*→CD4⁺ 等），数值/分子标记（如 10°、12×10⁹/L、B-1,4糖苷键、N-乙酰胞壁酸）保留原值。

## 取样规则（每章预算 B 见文件头与 scripts/microbio-budget.json）
- 独立记分单元 = term + fill + a1 + **B1 组成员** + short，合计**恰等于该章预算 B**。
- 在原书顺序内取材（每类内部保持原书题号顺序）。
- 名词解释/填空/简答通常数量少：优先全取；若全取后超出预算，则按原书顺序取前若干道。
- 选择题（A1+A2）与 B1 组成员按源题量占比在预算内取材；**B1 必须取完整组**（一组 sharedChoices + 全部成员），成员数计入预算。
- 若源题总量 ≤ B：全取并在文件头注明「源题不足预算，实取 N（预算 B）」。
- 各章预算（B）：
  ch00=5 ch01=29 ch02=18 ch03=9 ch04=15 ch05=13 ch06=36 ch07=14 ch08=36 ch09=22 ch10=11 ch11=5 ch12=19 ch13=12 ch14=6 ch15=18 ch16=42 ch17=10 ch18=14 ch19=10 ch20=13 ch21=12 ch22=17 ch23=25 ch24=16 ch25=10 ch26=16 ch27=14 ch28=18 ch29=10 ch30=11 ch31=14 ch32=21 ch33=10 ch34=7 ch35=18 ch36=24

## ID 与 order
- ID：`ext-microbiology-{topic}-{suffix}`，suffix：`term001`/`fill001`/`a1001`/`short001`；B1 组 `b001`、成员 `b001m1`/`b001m2`…
- 整文件 order 严格连续 1..B（B1 组级 order 与其首个成员相同，成员依次递增）。
- 数组定义顺序：termItems → a1Items → fillItems → shortItems → bGroups。

## 文件头注释（含归纳报告）
```ts
/**
 * 医学微生物学学习指导与习题集（第2版）— 第{NN}章 {章名} 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：X 题
 * - 填空题（fill）：X 题
 * - 选择题（a1-single）：X 题（含 A2 病例题）
 * - 问答题（short-answer）：X 题
 * - B1 配伍题：X 组、共 Y 个成员
 * - 独立记分题合计：X 题（须等于本文件预算 {B}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书题型分布；OCR 错字与双栏错序已按微生物学医学语义恢复，未捏造。
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
（无某类时定义空数组并注释；无 B 型时 bGroups 为空数组并注明。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过。
- 报告：独立记分题总数=预算？名词/填空/单选/B1成员/问答数量、正确项是否对齐源答案、缺失/换题数、OCR 恢复说明。
