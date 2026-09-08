# 系统解剖学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《系统解剖学习题集》第2版（人民卫生出版社，可在 PDF 版权页/封面核实主编与版次；以源 PDF 为权威）。
> 版本依据：以柏树令主编《系统解剖学》第8版为蓝本。
> 沿用已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts` 与 `src/content/courses/medical-genetics/extracted-medical-genetics-ch1.ts` 的 Schema、常量与文件头注释风格。
> 每个代理只处理被指派的这 1 章。

> 重要：本书为**扫描版经 OCR** 生成，字 **沩/力→为、搁→胸、笄→?、型题 用「A，型题/Az型题」替代 A1/A2** 等错字频现。必须按解剖学医学语义恢复题干与选项。

## 产出
新文件：`src/content/courses/human-anatomy/extracted-human-anatomy-ch{N}.ts`。不要改其他文件。

## 输入源（必读）
- 指派章节素材：`scripts/anatomy-snippets/ch{N}.txt`（含 `TITLE`、`PDF_PAGES`、`CHARS` 与该章正文；习题与参考答案都在其中）。
- Schema：`src/types/learning.ts` 的 AssessmentItemDefinition / AssessmentItemGroupDefinition。
- 出版/题库信息在 `scripts/ocr/anatomy-ocr.txt` 前言（PDF 第5页）：每题型同时含习题与参考答案，题型含 选择题A/B型、填空题、名词解释、判断改错题、问答题、填图。

## 共享常量（照搬句式，topic 用指派值）
```ts
import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

const topic = "human-anatomy-ch{N}-{slug}";   // 用指派值
const locatorBase =
  "《系统解剖学习题集》第2版 第{N}章 {章名} 复习思考题 习题（扫描版原书核对PDF 第{A}–{C}页）";  // A,C 用指派 PDF 范围
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;
```

## 题型映射（本书特有，务必遵守）
| 原书题型 | Schema questionKind | 说明 |
|---|---|---|
| （一）A1型题、（二）A2型题、（三）A3型题 | `a1-single` | 选择，带 `choices`+`correctChoiceIndex`(0起) |
| B型题（共用备选答案配伍） | Group `b1` | 组级 `sharedChoices`，成员各带 `correctChoiceIndex` |
| 填空题 | `fill` | 答案 content[0]=所填内容，content[1]=解析 |
| 名词解释 | `term` | 答案 content[0]=名词定义要点，content[1]=解析/拓展 |
| 判断改错题 | `short-answer` | 答案 content[0]=判断(对/错)+改正要点，content[1]=解析 |
| 问答题/思考题 | `short-answer` | 答案 content[0]=要点，content[1]=解析 |
| 填图 | （不提取） | 无可记分文本，跳过并记录「填图 N 道不计分」 |

## 正确项（必须取自源参考答案）
原书答案以「参考答案：1.E 2.B 3.D…」或逐题键的形式内联在各题型后；错位时按题号依序对齐：
- 找到某题正确答案项文本 → 作正确项内容。
- 将选项**随机重排**，`correctChoiceIndex` = 正确项在新顺序的下标(0起)。
- OCR 丢行/错项按选项语义补全为最接近原文；选项数不足5时如实按现有选项。
- 选择题若无法锚定唯一正确项：改选同源更清晰题，缺失如实记录。
- 填空题/名词解释/判断改错/问答题：答案改写整理自源参考答案，解析放 content[1]。

## ID 与 order
- ID：`ext-human-anatomy-{topic}-{suffix}`，suffix 用于 term001/a1001/fill001/judg?(不，用 short)/short001/case001/b001/b001m1…
  - 填空题 ID 后缀用 `fill001`；判断改错与问答题均用 `short001` 顺序；名词解释 `term001`；A-type `a1001`。
- B1 组：组级 order = 当前量；成员 order 依次；之后题型继续递增。
- 整文件 order 必须严格连续 1..budget。
- 总量：term + a1 + fill + short(含判断改错/问答) + B1成员数 = budget；case 若有也计入。

## 文件头注释（含归纳报告）
```ts
/**
 * 系统解剖学习题集（第2版）— 第{N}章 {章名} 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：X 题
 * - A1/A2/A3 型选择题（a1-single）：X 题
 * - 填空题（fill）：X 题
 * - 判断改错题 + 问答题（short-answer）：X 题
 * - B1 配伍题：X 组、共 X 个成员
 * - 独立记分题合计：X 题（须等于本文件预算 {budget}）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书题型分布；OCR 错字已按医学语义恢复，数值/结构保留，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */
```

## 取材与预算
- 本文件预算 = 指派给你的 budget（独立记分题，含 B1 组成员）。
- 在素材内按原书顺序取满 budget 道；若有效题不足，如实实取并在文件头注明缺失数。
- 填空题按「每题 1 个空~多个空」：多个空作为 1 道 fill 独立记分题（答案 content[0] 按空序号列出）。

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
- 报告：独立记分题总数是否=budget、题型分布、正确项是否对齐源答案、缺失/换题数、OCR 恢复说明。