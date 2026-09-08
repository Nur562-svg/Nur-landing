# 药理学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬，2019，全国高等学校五年制本科临床医学专业第九轮规划教材《药理学》第9版配套教材；文件名标注「配套第九版」）。本书为**扫描件**，素材由 macOS Vision OCR + 药理学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号散落错位，必须按药理学医学语义重建。
> 沿用已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts`（term/a1/short/b1 混排）与 `src/content/courses/immunology/extracted-immunology-ch01.ts`（含 fill 填空）的 Schema、常量与文件头注释风格。

## 产出
新文件：`src/content/courses/pharmacology/extracted-pharmacology-ch{NN}.ts`，NN 为 01..49。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/pharmaco-snippets/ch{NN}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；习题→参考答案）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "pharmacology-ch{NN}-{slug}";   // 用指派值
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第{NN}章 {章名} 习题（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（药理学第4版事实）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 一、名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| 二、填空题 | `fill` | content[0] 按空序号列出各空答案，content[1]=解析 |
| 三、选择题【A1型题】 | `a1-single` | 单选，5 选项，对应参考答案键号 |
| 三、选择题【A2型题】（病例） | `a1-single` | 单选，5 选项，对应参考答案键号 |
| 三、选择题【B1型题】（共用备选答案配伍） | `AssessmentItemGroupDefinition`（questionKind:"b1"） | 组级 order+promptSource（**组级不得写 knowledgePointId**）；成员各含 order+knowledgePointId+promptSource+correctChoiceIndex（指向 sharedChoices） |
| 四、简答题 | `short-answer` | content[0]=要点，content[1]=解析 |
| 五、论述题 | `short-answer` | 同上 |
- 若某章无某类题型（如某章无 B1 或无论述题）：该数组导出为空数组并在文件头注明。
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自章末「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 参考答案区结构：`参考答案 → 一、名词解释 → 二、填空题 → 三、选择题【A1型题】【A2型题】【B1型题】 → 四、简答题 → 五、论述题`。注意 A1/A2/B1 各题号**分别从 1 重新编号**（各小节独立编号）。
- 选项可能双栏错序、答案键号（如 `1.C 2.B …`）散落错位；按药理学医学语义重建完整选项集合（单选通常 5 项）并对照键号定正确项，选项随机重排并同步 correctChoiceIndex(0 起)。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点，content[1]=解析；`scoring:null`。
- OCR 错字按医学语义校正（药物名如 葯→药、受体/通道亚型如 B-内酰胺→β-内酰胺、M胆碱/N胆碱、H1/H2、α/β受体、CYP450 亚型、剂量单位如 mg/kg、μg、mmol/L 等，数值与单位保留原值；罗马数字 I/II/III/IV 期临床试验错乱处按语义重建）。

## 取样规则（每章预算 B 见文件头与 scripts/pharmaco-budget.json）
- 独立记分单元 = term + fill + a1（A1+A2）+ **B1 组成员** + short（简答+论述），合计**恰等于该章预算 B**。
- 在原书顺序内取材（每类内部保持原书题号顺序）。
- 简答/论述通常数量少：优先全取；若全取后超出预算，则按原书顺序取前若干道。
- 名词解释/填空优先全取；若超出预算按原书顺序取前若干道。
- 选择题（A1+A2）与 B1 组成员按源题量占比在预算内取材；**B1 必须取完整组**（一组 sharedChoices + 全部成员），成员数计入预算。
- 若源题总量 ≤ B：全取并在文件头注明「源题不足预算，实取 N（预算 B）」。
- 各章预算（B）以 scripts/pharmaco-budget.json 为准（Hamilton 最大余数法，600×章习题区字符占比）。

## ID 与 order
- ID：`ext-pharmacology-{topic}-{suffix}`，suffix：`term001`/`fill001`/`a1001`/`short001`；B1 组 `b001`、成员 `b001m1`/`b001m2`…
- 整文件 order 严格连续 1..B（B1 组级 order 与其首个成员相同，成员依次递增）。
- 数组定义顺序：termItems → fillItems → a1Items → shortItems → bGroups。

## 文件头注释（含归纳报告）
```ts
/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第{NN}章 {章名} 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：X 题
 * - 填空题（fill）：X 题
 * - 选择题（a1-single）：X 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：X 题（含简答、论述）
 * - B1 配伍题：X 组、共 Y 个成员
 * - 独立记分题合计：X 题（须等于本文件预算 {B}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书题型分布；OCR 错字与双栏错序已按药理学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...fillItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（无某类时定义空数组并注释；无 B 型时 bGroups 为空数组并注明。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过。
- 报告：独立记分题总数=预算？term/fill/a1/short/B1成员数量、正确项是否对齐源答案、缺失/换题数、OCR 恢复说明。
