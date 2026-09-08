import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-tcm-diagnostics-bank-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-tcm-diagnostics-bank-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-tcm-diagnostics-bank-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-tcm-diagnostics-bank-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-tcm-diagnostics-bank-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-tcm-diagnostics-bank-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-tcm-diagnostics-bank-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-tcm-diagnostics-bank-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-tcm-diagnostics-bank-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-tcm-diagnostics-bank-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-tcm-diagnostics-bank-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-tcm-diagnostics-bank-ch12";

/**
 * 中医诊断学 — 全书题库提取聚合（题库底稿：同学整理带答案材料，全取并如实注明缺口）
 * 来源：中医诊断学选择.pdf（18页扫描 OCR，260 道单选，同学整理参考版）
 *      + 6天背诵内容及答案（名词/简答/病案，项目整理标准答案）
 *
 * == 全书统计（各章预算见 scripts/tcmdx-budget.json；源题不足预算则全取并注明）==
 * - 章节：第01–12知识单元（绪论 … 病历书写与诊断）
 * - 独立记分题合计：410（全书实际可提取数；缺口 190 与目标 600 的差额如实登记，不编造）
 * - 本书题型：名词解释（term）、单选题（a1-single）、简答/问答（short-answer）、病案分析（case）；
 *   无填空（fillItems）、无是非题答案源、无 B1/B2 配伍（bGroups 全空）
 */
export const tcmDiagnosticsBankExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch01Items,
  ...ch02Items,
  ...ch03Items,
  ...ch04Items,
  ...ch05Items,
  ...ch06Items,
  ...ch07Items,
  ...ch08Items,
  ...ch09Items,
  ...ch10Items,
  ...ch11Items,
  ...ch12Items,
];

export const tcmDiagnosticsBankExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch01Groups,
  ...ch02Groups,
  ...ch03Groups,
  ...ch04Groups,
  ...ch05Groups,
  ...ch06Groups,
  ...ch07Groups,
  ...ch08Groups,
  ...ch09Groups,
  ...ch10Groups,
  ...ch11Groups,
  ...ch12Groups,
];