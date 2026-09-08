import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch00Items, extractedGroups as ch00Groups } from "./extracted-topographic-anatomy-ch00";
import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-topographic-anatomy-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-topographic-anatomy-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-topographic-anatomy-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-topographic-anatomy-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-topographic-anatomy-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-topographic-anatomy-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-topographic-anatomy-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-topographic-anatomy-ch08";

/**
 * 局部解剖学学习指导与习题集 — 全书题库提取聚合（每教材 600、章节等比缩放预算）
 * 来源：《局部解剖学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 全书统计（各章预算见 scripts/topo-budget.json，Hamilton 最大余数法）==
 * - 章节：绪论 + 第1–8章（头部/颈部/胸部/腹部/盆部与会阴/脊柱区/上肢/下肢）
 * - 独立记分题合计：600（须等于全书预算 600）
 * - 缺失答案：0；无法可靠提取：ch02 1（颈动脉三角内容不包括，参考答案键号与正文矛盾）、
 *   ch07 肩部 B1 型 7–12 题参考答案为多项选择、与 B1 单项配伍契约不符未纳入（因预算未取，不计缺失）
 * - 本书题型：名词解释（term）、选择题 A1/A2（a1-single）、B1 配伍（Group b1）、简答题（short-answer）
 */
export const topographicAnatomyExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch00Items,
  ...ch01Items,
  ...ch02Items,
  ...ch03Items,
  ...ch04Items,
  ...ch05Items,
  ...ch06Items,
  ...ch07Items,
  ...ch08Items,
];

export const topographicAnatomyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch00Groups,
  ...ch01Groups,
  ...ch02Groups,
  ...ch03Groups,
  ...ch04Groups,
  ...ch05Groups,
  ...ch06Groups,
  ...ch07Groups,
  ...ch08Groups,
];
