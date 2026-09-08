# 生物化学与分子生物学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕，供基础/临床/预防/口腔医学类用，国家卫健委“十三五”规划教材配套）。
> 沿用已验证范例 `src/content/courses/medical-genetics/extracted-medical-genetics-ch1.ts` 与 `src/content/courses/human-anatomy/extracted-human-anatomy-ch5.ts` 的 Schema、常量与文件头注释风格。
> 每个代理只处理被指派的这 1 章。

> 重要：本书为**原生文本层 PDF，但双栏排版导致抽取顺序错乱**（题干/选项被打散，如选项字母 A/B 与文字分离、题干串行残缺、问号变“？”、罗马/斜体 a 变 a- 等）。你必须按生物化学/分子生物学医学语义恢复题干与选项，数值、结构、缩略语（如 mRNA、tRNA、DNA、ATP、NAD+）保留原文，不得捏造。

## 产出
新文件：`src/content/courses/biochemistry/extracted-biochemistry-ch{N}.ts`。不要改其他文件。

## 输入源（必读）
- 指派章节素材：`scripts/biochem-snippets/ch{N}.txt`（含 `TITLE`、`PDF_PAGES`、`CHARS`、`BUDGET` 与该章全文；习题与参考答案都在其中，答案区标题为「参考答案」）。

## 本书题型→Schema 映射（务必遵守）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| 二、选择题 【A1型题】【A2型题】 | `a1-single` | 选择，带 `choices`+`correctChoiceIndex`(0起) |
| 【B1型题】（共用备选答案配伍） | Group `b1` | 组级 `sharedChoices`，成员各带 `correctChoiceIndex` |
| 一、名词解释 | `term` | 答案 content[0]=名词定义要点，content[1]=解析/拓展 |
| 三、简答题 | `short-answer` | 答案 content[0]=要点，content[1]=解析 |

## 共享常量（照搬句式，topic 用指派值）
```ts
const topic = "biochem-ch{N}-{slug}";   // 用指派值
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第{N}章 {章名} 复习思考题 习题（核对原书PDF 第{A}–{C}页）";  // A,C 用指派 PDF 范围
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";
```

## 正确项（必须取自源参考答案）
原书参考答案以「一、名词解释 1…. 二、选择题 【A1型题】1.B 2.D… 【B1型题】(×××题共用备选答案) 1.A… 三、简答题(要点)…」等形式内联在各章后；错位时按题号依序对齐：
- 找到某题正确答案项文本 → 作正确项内容。
- 将选项**随机重排**，`correctChoiceIndex` = 正确项在新顺序的下标(0起)。
- 双栏错序/丢行/错项按选项语义补全为最接近原文；选项数不足5时如实按现有选项。
- 选择题若无法锚定唯一正确项：改选同源更清晰题，缺失如实记录。

## ID 与 order
- ID：`ext-biochem-{topic}-{suffix}`，suffix：名词解释 `term001`；A型选择题 `a1001`；简答题 `short001`；B1 组 `b001` + 成员 `b001m1/b001m2…`。
- B1 组：组级 order = 当前量；成员 order 依次（组级 order 与首成员相同，照抄范例）；之后题型继续递增。
- 整文件 order 必须严格连续 1..budget。
- 总量：term + a1 + short + B1成员数 = budget。

## 文件头注释（含归纳报告）
```ts
/**
 * 生物化学与分子生物学学习指导与习题集 — 第{N}章 {章名} 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：X 题
 * - A1/A2 型选择题（a1-single）：X 题
 * - 简答题（short-answer）：X 题
 * - B1 配伍题：X 组、共 X 个成员
 * - 独立记分题合计：X 题（须等于本文件预算 {budget}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书题型分布；原生文本双栏错序已按医学语义恢复，数值/结构/缩写保留，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 取材与预算
- 本文件预算 = 指派给你的 budget（独立记分题，含 B1 组成员）。
- 在素材内按原书顺序取满 budget 道；若有效题不足，如实实取并在文件头注明缺失数。

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（无某类时定义空数组并注释；导出键齐全。）

## 完成后
- 运行 `cd /Users/nukeab/projects/Nur-landing && npx tsc --noEmit`（项目级）确认通过（单文件命令因 `@/` 别名会误报，以项目级为准）。
- 报告：独立记分题总数是否=budget、题型分布、正确项是否对齐源答案、缺失/换题数、恢复说明。