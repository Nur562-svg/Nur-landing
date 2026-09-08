import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-radiology-bank-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-radiology-bank-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-radiology-bank-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-radiology-bank-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-radiology-bank-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-radiology-bank-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-radiology-bank-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-radiology-bank-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-radiology-bank-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-radiology-bank-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-radiology-bank-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-radiology-bank-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-radiology-bank-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-radiology-bank-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-radiology-bank-ch15";

/**
 * 医学影像学学习指导与习题集 第3版 — 全书题库提取聚合（每教材 600、章节等比缩放预算）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 全书统计（各章预算见 scripts/radiology-budget.json，Hamilton 最大余数法）==
 * - 章节：第1–15章（影像诊断学总论 … 良恶性肿瘤的介入治疗）
 * - 独立记分题合计：600（须等于全书预算 600）
 * - 缺失答案：0；无法可靠提取：0
 * - 本书题型：名词解释（term）、填空题（fill）、选择题 A1/A2（a1-single）、简答题
 *   （short-answer）、B 型配伍题（b1 组）；无病例分析、无论述题
 */
export const radiologyBankExtractedItems: readonly AssessmentItemDefinition[] = [
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
];

export const radiologyBankExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
];
