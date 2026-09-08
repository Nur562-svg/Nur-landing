# 医学影像学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《医学影像学学习指导与习题集》第3版（人民卫生出版社，「全国高等学校…供基础、临床、预防、口腔医学类专业用」，含主编名单；文件名「26.医学影像学学习指导与习题集-第3版-全书签.pdf」）。本书为**扫描件**，素材由 macOS Vision OCR + 医学影像学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号散落错位，必须按医学影像学医学语义重建。
> 沿用已验证范例 `src/content/courses/pathology/extracted-pathology-ch15.ts`（term/a1/short 混排）与 `src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch03.ts`（B1 组 Schema）的 Schema、常量与文件头注释风格。
> 科目目录 `src/content/courses/radiology-bank/`，聚合导出 `radiologyBankExtractedItems` / `radiologyBankExtractedGroups`。
> **重要**：本项目题库提取目录独立于课程 truth。不得写入/修改任何课程对象（如 `src/content/courses/tcm-diagnostics.ts` 等）、不得改动 `src/content/demo/`、不得改 course 注册表、不得发布、不得改其它科目章节文件。

## 产出
新文件：`src/content/courses/radiology-bank/extracted-radiology-bank-ch{NN}.ts`，NN 为 01..15。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/radiology-snippets/ch{NN}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；每章结构：学习目标 → 重点难点 → 三、复习思考题〔（一）名词解释 /（二）填空题 /（三）选择题〔A1型/ A2型 / B型〕 /（四）简答题〕→ 四、参考答案）。
- 全书 OCR：`scripts/radiology-ocr.txt`（如需跨章核对）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "radiology-bank-ch{NN}-{slug}";   // 用指派值
const locatorBase =
  "《医学影像学学习指导与习题集》第3版 第{NN}章 {章名} 习题（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（本书事实：15 章均含 名词解释/填空/选择/简答；选择含 A1、A2、B1；无病例分析题）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| （一）名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| （二）填空题 | `fill` | 多空答案 content[0] 按空序号列出（先例：免疫学/药理学 fill），content[1]=解析 |
| （三）选择题【A1型题】 | `a1-single` | 单选，5 选项，正确项对照参考答案键号 |
| （三）选择题【A2型题】（病例） | `a1-single` | 单选，5 选项，病例题干细节保留，正确项对照参考答案键号 |
| （三）选择题【B型题】（共用备选答案） | `b1` 组 | 组级 order+promptSource+sharedChoices（5 项，可重复选）；成员 questionKind:"b1"、含 knowledgePointId + correctChoiceIndex |
| （四）简答题 | `short-answer` | content[0]=要点，content[1]=解析 |
- 本书**无**病例分析（case）与论述题；`caseItems` 不生成。
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自章末「四、参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 参考答案区结构：`四、参考答案 →（一）名词解释 →（二）填空题 →（三）选择题〔【A1型题】【A2型题】【B型题】〕→（四）简答题`。
- **选择题键号全书连续编号**：A1 型题从 1 起 → A2 型题延续 A1 末号继续编号 → B 型题延续 A2 末号继续编号（例：ch01 A1 1–61、A2 62–67、B 型 68–96）。参考答案区【A1型题】【A2型题】【B型题】各段键号即对应题号，直接对照，无需各小节重编号。
- 键号行 OCR 常多题挤一行/散落/截断（如 `56.C57.B`、`64. A 65. D`、`5.B6.6.D`），按题号 + 医学影像学医学语义归位；√/× 仅判断题使用（本书无判断题）。
- 选择题选项可能双栏错序、被截断；按医学影像学医学语义重建完整选项集合（单选通常 5 项）并对照键号定正确项，选项**随机重排**并同步 correctChoiceIndex(0 起)。
- B1 组：每个「（NN~MM 题共用备选答案）」+ 其后 5 项选项 + 若干小题构成一组；组级 sharedChoices 保留 5 项原选项（可重排并同步所有成员的 correctChoiceIndex）；成员 answer.content[0] = 该题正确项选项文本。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点/正确选项文本，content[1]=解析（含「原书第{NN}章…参考答案键号 X」定位）；`scoring:null`。
- promptSource：authority:"nur-editorial", wording:"nur-adapted", locator（用 locatorBase + 题型/题号定位）, note=promptNote, sourceIds:[]。
- OCR 错字按医学影像学医学语义校正（常见：成像技术名词如 高分辨力/分辨率、CT值、T1WI/T2WI、DWI、MRA、DSA、CTA、PACS、RIS、DICOM、SPIO、CDFI、介人→介入、钆（Cd）→钆（Gd）、磁共振成像术语、对比剂、窗宽窗位、影像征象名等；数值与单位如 mSv、kV、mA、ms、cm、mm 保留原值），未捏造。

## 取样规则（每章预算 B 见文件头与 scripts/radiology-budget.json）
- 独立记分单元 = term + fill + a1（A1+A2）+ short + **B1 组成员**，合计**恰等于该章预算 B**。
- **章内题型等比混合取样**（保证选择题合理占比，与源书构成一致）：
  1. 先统计本章源题量：名词解释 N、填空题 M、选择题（A1+A2）C、B 型组成员 Q、简答题 S；源题总量 T = N+M+C+Q+S。
  2. 各类目标配额 ≈ B × 该类源题量 / T（四舍五入），并用 Hamilton 最大余数法微调使五类合计恰为 B。
  3. B1 组**整组取**：按源书顺序取组，直到成员数最接近其配额（可略超/略欠），组内全部成员计入 Q；取组后实际 B1 成员数与配额的差额，由 a1 类补足或削减（保持选择题合计合理）。
  4. 各类内部按原书题号顺序取材（term→fill→a1→short 各自取前若干题；选择题按 A1→A2 顺序）。
  5. 若某类源题量不足其配额（如 short 只有 3 题但配额 5）：该类的差额由 a1（选择题）类补足。
- 若整章源题总量 ≤ B：全取并在文件头注明「源题不足预算，实取 N（预算 B）」。
- 各章预算（B）以 scripts/radiology-budget.json 为准（Hamilton 最大余数法，600×章习题区字符占比）。

## ID 与 order
- ID：`ext-radiology-{topic}-{suffix}`，suffix：`term001`/`fill001`/`a1001`/`short001`/`b001`（组）/`b001m1`（成员）。
- 整文件 order 严格连续 1..B（B1 组级 order 与首成员相同，成员 order 与组级及彼此连续）。
- 数组定义顺序：termItems → fillItems → a1Items → shortItems → bGroups。

## 文件头注释（含归纳报告）
```ts
/**
 * 医学影像学学习指导与习题集 第3版 — 第{NN}章 {章名} 题库提取（等比取样）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：X 题
 * - 填空题（fill）：X 题
 * - 选择题（a1-single）：X 题（含 A1 型、A2 型病例题）
 * - 简答题（short-answer）：X 题
 * - B1 配伍题：X 组 / Y 成员
 * - 独立记分题合计：X 题（须等于本文件预算 {B}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书含名词解释、填空题、选择题（A1/A2/B1）、简答题；本文件按 {B} 道预算在
 *   原书顺序内取材：名词解释取第 1–N 题、填空题取第 1–P 题、A1 型取第 1–Q 题、A2 型取第
 *   R–S 题、B 型取第 T–U 题（组）、简答题取第 1–V 题；未纳入的题因预算所限。正确项对齐章末
 *   参考答案键号（A1/A2/B1 全书连续编号），选项已随机重排并同步 correctChoiceIndex。OCR 错字
 *   已按医学影像学医学语义恢复（如 介人→介入、钆（Cd）→钆（Gd） 等），数值与单位保留原值，
 *   未捏造。
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
- 自检（独立解析）：order 严格连续 1..B、ID 全局唯一、a1 与 B1 成员的 correctChoiceIndex 与 answer.content[0] 一致、authority/confidence 正确、组级无 knowledgePointId、成员有 knowledgePointId、组级 order 与首成员一致。
- tsc：**不要独立运行 `npx tsc --noEmit`**（index.ts 未聚合前会因缺其它章节 import 而误报失败）；在全部 15 章 + index.ts 聚合后再统一跑。
- 报告：本代理负责的每章 独立记分题总数、term/fill/a1/short/B1 数量、正确项是否对齐源答案、缺失/换题/冲突复位数、OCR 恢复说明。
