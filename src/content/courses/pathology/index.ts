import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-pathology-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-pathology-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-pathology-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-pathology-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-pathology-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-pathology-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-pathology-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-pathology-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-pathology-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-pathology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-pathology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-pathology-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-pathology-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-pathology-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-pathology-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-pathology-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-pathology-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-pathology-ch18";

/**
 * 病理学学习指导与习题集 — 全书题库提取聚合（每教材 600、章节等比缩放预算）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 全书统计（各章预算见 scripts/patho-budget.json，Hamilton 最大余数法）==
 * - 章节：第1–18章（细胞和组织的适应与损伤 … 疾病的病理学诊断和研究方法）
 * - 独立记分题合计：600（须等于全书预算 600）
 * - 缺失答案：0；无法可靠提取：0
 * - 本书题型：名词解释（term）、选择题 A1/A2（a1-single）、判断题 + 问答题（short-answer）；
 *   无填空、无 B1 配伍、无论述题、无病例分析
 */
export const pathologyExtractedItems: readonly AssessmentItemDefinition[] = [
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
  ...ch13Items,
  ...ch14Items,
  ...ch15Items,
  ...ch16Items,
  ...ch17Items,
  ...ch18Items,
];

export const pathologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
  ...ch13Groups,
  ...ch14Groups,
  ...ch15Groups,
  ...ch16Groups,
  ...ch17Groups,
  ...ch18Groups,
];
