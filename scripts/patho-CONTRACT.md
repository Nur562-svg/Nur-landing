# 病理学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《病理学学习指导与习题集》（人民卫生出版社，国家卫生健康委员会“十三五”规划教材配套教材，主编：李一雷、李连宏；文件名「25.病理学学习指导与习题集-全书签.pdf」）。本书为**扫描件**，素材由 macOS Vision OCR + 病理学医学语义恢复得到，可能含 OCR 错字、双栏错序、答案键号散落错位，必须按病理学医学语义重建。
> 沿用已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts`（term/a1/short 混排）与 `src/content/courses/topographic-anatomy/extracted-topographic-anatomy-ch03.ts` 的 Schema、常量与文件头注释风格。
> 科目目录 `src/content/courses/pathology/`，聚合导出 `pathologyExtractedItems` / `pathologyExtractedGroups`。

## 产出
新文件：`src/content/courses/pathology/extracted-pathology-ch{NN}.ts`，NN 为 01..18。不要改其他文件。

## 输入源（必读）
- 指派章素材：`scripts/patho-snippets/ch{NN}-{章名}.txt`（含 `===== PDF_PAGE_nnn =====` 分页；习题→参考答案）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。

## 共享常量（topic 用指派值）
```ts
const topic = "pathology-ch{NN}-{slug}";   // 用指派值
const locatorBase =
  "《病理学学习指导与习题集》 第{NN}章 {章名} 习题（核对PDF 第{A}–{C}页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = `kp-${topic}`;
```

## 题型映射（病理学事实：本书无填空、无 B1 配伍、无论述题、无病例分析）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 一、名词解释 | `term` | content[0]=定义要点，content[1]=解析 |
| 二、判断题 | `short-answer` | content[0]=判断（对/错）+要点，content[1]=解析（先例：解剖学判断改错题→short-answer） |
| 三、选择题【A1型题】 | `a1-single` | 单选，5 选项，对应参考答案键号 |
| 三、选择题【A2型题】（病例） | `a1-single` | 单选，5 选项，对应参考答案键号 |
| 四、问答题（个别章名「简答题」，如第15章） | `short-answer` | content[0]=要点，content[1]=解析 |
- 本书**无**填空题、无 B1 配伍、无论述题、无病例分析：`fillItems`/`bGroups` 一律为空数组并在文件头注明。
- 若某章源题不足达到预算：按原书顺序采样补齐直到预算；仍不足则如实少取并在文件头注明（不得编造）。

## 正确项（必须取自章末「参考答案」，无法锚定时换同源清晰题，缺失如实记录）
- 参考答案区结构：`参考答案 → 一、名词解释 → 二、判断题 → 三、选择题【A1型题】【A2型题】 → 四、问答题`。注意 A1/A2 各题号**分别从 1 重新编号**（各小节独立编号）。
- 判断题答案形如 `1.× 2.√ 3.× …`（OCR 常把多题键号挤在一行，如 `11.x12.V13.V14.V 15.x`），按题号与病理学语义归位；√/× 分别写作「对/正确」「错/错误」。
- 选择题选项可能双栏错序、答案键号（如 `1.D 2.E 3.A …`）散落错位；按病理学医学语义重建完整选项集合（单选通常 5 项）并对照键号定正确项，选项随机重排并同步 correctChoiceIndex(0 起)。
- answer 用 `authority:"nur-platform", confidence:"unverified"`；content[0]=答案要点，content[1]=解析；`scoring:null`。
- OCR 错字按医学语义校正（病理学常见：病变/病理过程术语、细胞类型、染色方法如 苏丹皿→苏丹Ⅲ、免疫标记物、肿瘤命名、镜下结构名等；数值与单位保留原值），未捏造。

## 取样规则（每章预算 B 见文件头与 scripts/patho-budget.json）
- 独立记分单元 = term + a1（A1+A2）+ short（判断题+问答题），合计**恰等于该章预算 B**。
- 在原书顺序内取材（每类内部保持原书题号顺序）。
- 问答题通常数量少：优先全取；若全取后超出预算，则按原书顺序取前若干道。
- 名词解释优先全取；若超出预算按原书顺序取前若干道。
- 判断题按原书顺序取（判断题答案简单，可多取以补足预算）。
- 选择题（A1+A2）按源题量占比在预算内取材。
- 若源题总量 ≤ B：全取并在文件头注明「源题不足预算，实取 N（预算 B）」。
- 各章预算（B）以 scripts/patho-budget.json 为准（Hamilton 最大余数法，600×章习题区字符占比）。

## ID 与 order
- ID：`ext-pathology-{topic}-{suffix}`，suffix：`term001`/`a1001`/`short001`（判断题与问答题共用 short 序号，按原书顺序先判断题后问答题）。
- 整文件 order 严格连续 1..B。
- 数组定义顺序：termItems → a1Items → shortItems（判断题在前、问答题在后）；bGroups 空数组。

## 文件头注释（含归纳报告）
```ts
/**
 * 病理学学习指导与习题集 — 第{NN}章 {章名} 题库提取（等比取样）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：X 题
 * - 选择题（a1-single）：X 题（含 A1 型、A2 型病例题）
 * - 判断题 + 问答题（short-answer）：X 题（判断题 Y、问答题 Z）
 * - B1 配伍题：0 组（本书无 B1 型）
 * - 独立记分题合计：X 题（须等于本文件预算 {B}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题/跳过数）
 * - 说明：本章原书含名词解释、判断题、选择题（A1/A2）、问答题；本文件按 {B} 道预算在
 *   原书顺序内取材：名词解释取第 1–N 题、A1 型取第 1–P 题、A2 型取第 1–Q 题、判断题取
 *   第 1–R 题、问答题取第 1–S 题；未纳入的题因预算所限。正确项对齐章末参考答案键号
 *   （A1/A2 各小节独立编号），选项已随机重排并同步 correctChoiceIndex。判断题答案按
 *   √/× 键号归位。OCR 错字已按病理学医学语义恢复，未捏造。
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
（bGroups 为空数组并注明本书无 B 型。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过。
- 报告：独立记分题总数=预算？term/a1/short 数量、正确项是否对齐源答案、缺失/换题数、OCR 恢复说明。
