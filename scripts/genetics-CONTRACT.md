# 医学遗传学 题库提取契约（供各章生成代理统一遵循）

> 目标教材：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，2018，张咸宁、杨玲 主编，ISBN 9787117273381）。
> 本契约沿用已验证范例 `src/content/courses/physiology/extracted-physiology-ch5.ts` 的 Schema、常量与文件头注释风格。
> 每个代理只用理会**它被指派的这1章**。

## 你将产出
一个全新的 TypeScript 文件：`src/content/courses/medical-genetics/extracted-medical-genetics-ch{N}.ts`。
不要改任何其他文件。

## 你的输入源（必读）
- 指派给你的章节素材文件：`scripts/genetics-snippets/ch{N}.txt`
  - 内容 = 该章「二、习题」区 + 「三、参考答案」区（含名词解释、A1/A2/B1/X 型选择题、简答题、病例）。
  - `TITLE:` 行是章名；`PDF_EX_PAGES:` 是习题区 PDF 页范围（用于 locator）。
- Schema 类型：`src/types/learning.ts`（AssessmentItemDefinition / AssessmentItemGroupDefinition）。
- 数值若 OCR 模糊，按医学语义合理推断并在解析中言明；数值/单位/CAG拷贝数等务必保留原值。

## 共享常量（照搬），topic 用指派的值
```ts
import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

const topic = "medical-genetics-ch{N}-{slug}";   // 用指派值
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第{N}章 {章名} 复习思考题 习题（PDF 第{A}–{C}页）";  // A,C 用指派范围
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;
```

## 文件头注释（必须含归纳报告）
```ts
/**
 * 医学遗传学 学习指导与习题集（第4版）— 第{N}章 {章名} 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：X 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：X 题
 * - 简答题 / 病例（映射 short-answer 或 case）：X 题
 * - B1 共用备选答案配伍题：X 组、共 X 个成员
 * - 独立记分题合计：X 题（含 B1 组成员；须等于本文件预算 {budget}）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书题型分布；X型/病例等多按规约映射并说明；OCR 错字已按语义恢复，数值单位保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */
```

## 独立记分单元与预算
- 本文件预算（独立记分题数，含 B1 组成员）= 指派给你的 `budget`。
- 取材范围 = 本素材文件中出现的全部题目中，按原书顺序覆盖取样，务必**取满 budget 道独立记分题**。
- 独立记分单元 = 每条名词解释(term) + 每道选择题(a1-single，B1 体的每个成员各1道) + 每道简答题/病例。
- 若本章有效题数不足 budget，可在素材内切分/复用清晰 B1 成员；若仍不足，如实减少并在**文件头报告中注明实取数**（缺失数>0 如实写，绝不无中生有造题）。
- 选择题（A1/A2/X）按 `choices`（含 correctChoiceIndex）建模。
- 名词解释 → `term`；简答/思考题 → `short-answer`；病例/病案分析（含遗传咨询计算类）→ `case`（非选择型）。
- B1（共用备选答案配伍）→ `AssessmentItemGroupDefinition`（组级无 knowledgePointId，members 各带 correctChoiceIndex 指向 sharedChoices）。

## 选择题的正确项（必须取自源参考答案）
原书答案区写法形如 `1. E 2. C 3. A`（行内多位）。依序对齐到各选择题题号：
- 找到某题的正确答案项，取该项文本作为正确选项内容。
- 然后**把选项顺序随机重排**，`correctChoiceIndex` = 正确项在新顺序中的下标（0 起）。
- 其余选项保留但顺序也随机化；缺失/乱序选项（OCR 丢行）按语义补全或最接近的原文。
- 简答题/名词解释/病例的答案：改写整编自源参考答案，解析放 content[1]，要点放 content[0]。

## 题型映射补充
- A2 病例型选择题仍为 `a1-single`（是选择题，不是 case）。真正的 `case` 仅用于非选择型的病案分析/遗传咨询计算题。
- X 型多选 → `a1-single`（题干改写成单句式，取其中 1 个正确项，`promptSource.note = xMapNote`，并在解析中说明原为多选及所取正确项）。
- 无法确定一个唯一正确项的选择题 → 改选同源清晰题；缺失如实记。

## ID 与 order 规则
- ID：`ext-medical-genetics-{topic}-term001 / a1001 / short001 / case001 / b001 / b001m1 ...`（与 physiology 风格一致）。
- 每题 `order` 从 **1** 连续递增到 budget。
- B1 组：组级 order = 当前量；成员 order 依次递增；后续题型 order 继续递增。整文件 order 必须严格 1..budget 连续。
- 总量控制：term + a1 + short + case + B1成员数 = budget。

## 导出（文件末尾）
```ts
export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
```
（变量命名照此；无某类时对应数组仍定义为空数组或省略——建议定义空数组并注释“本章无”，保持导出键齐全。）

## 小体量处理
预算较小（如 14–22）时：按原书顺序取材，优先覆盖名词解释与代表性选择题与简答/病例，取满 budget。

## 完成后
- 检查文件：`npx tsc --noEmit src/content/courses/medical-genetics/extracted-medical-genetics-ch{N}.ts` 通过。
- 报告：独立记分题总数、题型分布、是否正确对齐源答案、缺失数。