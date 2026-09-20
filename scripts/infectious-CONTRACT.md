# 传染病学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《传染病学学习指导与习题集》第3版（人民卫生出版社，「全国高等学校…供临床、预防、口腔医学类专业用」；文件名「11.传染病学学习指导与习题集-第3版-全书签.pdf」）。本书为**扫描件**，素材由 macOS Vision OCR + 传染病学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号散落错位，必须按传染病学医学语义重建。
> 沿用已验证范例 `src/content/courses/radiology-bank/extracted-radiology-bank-ch01.ts`（term/fill/a1/short/B1 混排）与 `src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch03.ts`（B1 组 Schema）的 Schema、常量与文件头注释风格。
> 科目目录 `src/content/courses/infectious-diseases/`，聚合导出 `infectiousDiseasesExtractedItems` / `infectiousDiseasesExtractedGroups`。
> **重要**：本项目题库提取目录独立于课程 truth。不得写入/修改任何课程对象（如 `src/content/courses/tcm-diagnostics.ts` 等）、不得改动 `src/content/demo/`、不得改 course 注册表、不得发布、不得改其它科目章节文件。

## 产出
新文件：`src/content/courses/infectious-diseases/extracted-infectious-diseases-ch{NN}.ts`，NN 为 01..10。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/infectious-snippets/ch{NN}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页）。
- 全书 OCR：`scripts/ocr/infectious-ocr.txt`（如需跨章核对）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 本书章节结构（10 章含多节）
| 章 | 章名 | PDF 起–止页 | 节数 |
|---|---|---|---|
| ch01 | 总论 | 8–30 | 0（无节） |
| ch02 | 病毒性传染病 | 31–159 | 15 节 |
| ch03 | 立克次体病 | 160–181 | 3 节 |
| ch04 | 细菌性传染病 | 182–260 | 14 节 |
| ch05 | 深部真菌病 | 261–285 | 4 节 |
| ch06 | 螺旋体病 | 286–309 | 4 节 |
| ch07 | 原虫病 | 310–336 | 4 节 |
| ch08 | 蠕虫病 | 337–392 | 7 节 |
| ch09 | 朊粒病 | 393–396 | 0（无节） |
| ch10 | 其他 | 397–430 | 6 节 |

## 共享常量（topic 用指派值）
```ts
const topic = "infectious-diseases-ch{NN}-{slug}";   // 用指派值
const locatorBase =
  "《传染病学学习指导与习题集》第3版 第{NN}章 {章名} 习题（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（待 OCR 后确认各章实际题型）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| 填空题 | `fill` | 多空答案 content[0] 按空序号列出，content[1]=解析 |
| 选择题【A1型题】 | `a1-single` | 单选，5 选项，正确项对照参考答案键号 |
| 选择题【A2型题】（病例） | `a1-single` | 单选，5 选项，病例题干细节保留，正确项对照参考答案键号 |
| 选择题【B型题】（共用备选答案） | `b1` 组 | 组级 order+promptSource+sharedChoices；成员 questionKind:"b1"、含 knowledgePointId + correctChoiceIndex |
| 简答题 | `short-answer` | content[0]=要点，content[1]=解析 |
| 病例分析/思考题 | `case` 或 `short-answer` | 视具体内容定 |
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自章末/节末「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 键号行 OCR 常多题挤一行/散落/截断（如 `5.B6.6.D`、`27.B28.`），按题号 + 传染病学医学语义归位。
- 选择题选项可能双栏错序、被截断；按传染病学医学语义重建完整选项集合（单选通常 5 项）并对照键号定正确项，选项**随机重排**并同步 correctChoiceIndex(0 起)。
- B1 组：每个「（NN~MM 题共用备选答案）」+ 其后 5 项选项 + 若干小题构成一组；组级 sharedChoices 保留 5 项原选项（可重排并同步所有成员的 correctChoiceIndex）；成员 answer.content[0] = 该题正确项选项文本。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点/正确选项文本，content[1]=解析；`scoring:null`。
- promptSource：authority:"nur-editorial", wording:"nur-adapted", locator（用 locatorBase + 题型/题号定位）, note=promptNote, sourceIds:[]。
- OCR 错字按传染病学医学语义校正（常见：传染病学专有名词如 霍乱弧菌、伤寒杆菌、HIV/AIDS、HBsAg、HBeAg、抗-HBs、CD4+T、EBV、CMV、HFV、HFRS、Widal、外斐反应、肥达反应、暗视野显微镜、革兰染色/抗酸染色、RPR/TPPA/FTA-ABS、PCR/ELISA、SCOPE/mSv 等；数值与单位如 mg/kg、ml、℃、mmol/L、×10^9/L 保留原值），未捏造。

## 取样规则（每章预算 B 见文件头与 scripts/infectious-budget.json）
- 独立记分单元 = term + fill + a1（A1+A2）+ short + case + **B1 组成员**，合计**恰等于该章预算 B**。
- **章内题型等比混合取样**（保证选择题合理占比，与源书构成一致）：
  1. 先统计本章源题量：名词解释 N、填空题 M、选择题（A1+A2）C、B 型组成员 Q、简答/病例 S；源题总量 T = N+M+C+Q+S。
  2. 各类目标配额 ≈ B × 该类源题量 / T（四舍五入），并用 Hamilton 最大余数法微调使各类合计恰为 B。
  3. B1 组**整组取**：按源书顺序取组，直到成员数最接近其配额（可略超/略欠），组内全部成员计入 Q；取组后实际 B1 成员数与配额的差额，由 a1 类补足或削减。
  4. 各类内部按原书题号顺序取材。
  5. 若某类源题量不足其配额：该类的差额由 a1 类补足。
- 若整章源题总量 ≤ B：全取并在文件头注明。
- 各章预算（B）以 scripts/infectious-budget.json 为准（Hamilton 最大余数法，600×章习题区字符占比）。

## ID 与 order
- ID：`ext-infectious-diseases-{topic}-{suffix}`，suffix：`term001`/`fill001`/`a1001`/`short001`/`case001`/`b001`（组）/`b001m1`（成员）。
- 整文件 order 严格连续 1..B（B1 组级 order 与首成员相同，成员 order 与组级及彼此连续）。
- 数组定义顺序：termItems → fillItems → a1Items → shortItems → [caseItems] → bGroups。

## 文件头注释（含归纳报告）
```ts
/**
 * 传染病学学习指导与习题集 第3版 — 第{NN}章 {章名} 题库提取（等比取样）
 * 来源：《传染病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：X 题
 * - 填空题（fill）：X 题
 * - 选择题（a1-single）：X 题（含 A1 型、A2 型病例题）
 * - 简答题（short-answer）：X 题
 * - B1 配伍题：X 组 / Y 成员
 * - 独立记分题合计：X 题（须等于本文件预算 {B}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书含…；本文件按 {B} 道预算在原书顺序内取材。
 *   正确项对齐章末参考答案键号，选项已随机重排并同步 correctChoiceIndex。
 *   OCR 错字已按传染病学医学语义恢复，数值与单位保留原值，未捏造。
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

## 完成后
- 自检：order 严格连续 1..B、ID 全局唯一、a1 与 B1 成员的 correctChoiceIndex 与 answer.content[0] 一致、authority/confidence 正确、组级无 knowledgePointId、成员有 knowledgePointId、组级 order 与首成员一致。
- tsc：在全部 10 章 + index.ts 聚合后再统一跑 `npx tsc --noEmit`。
- 报告：每章 独立记分题总数、term/fill/a1/short/B1 数量、正确项是否对齐源答案、缺失/换题/冲突数、OCR 恢复说明。
