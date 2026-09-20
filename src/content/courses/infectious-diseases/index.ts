import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-infectious-diseases-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-infectious-diseases-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-infectious-diseases-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-infectious-diseases-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-infectious-diseases-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-infectious-diseases-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-infectious-diseases-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-infectious-diseases-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-infectious-diseases-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-infectious-diseases-ch10";

/**
 * 传染病学学习指导与习题集 第3版 — 全书题库提取聚合（每教材 600、章节等比缩放预算）
 * 来源：《传染病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 全书统计（各章预算见 scripts/infectious-budget.json，Hamilton 最大余数法）==
 * - 章节：第1–10章（总论、病毒性传染病、立克次体病、细菌性传染病、深部真菌病、
 *   螺旋体病、原虫病、蠕虫病、朊粒病、其他）
 * - 独立记分题合计：600（须等于全书预算 600）
 * - 缺失答案：0；无法可靠提取：0
 * - 本书题型：名词解释（term）、选择题 A1/A2/A3/A4（a1-single）、简答题
 *   （short-answer）、病案分析（case）、B1 配伍题（b1 组/成员）
 * - 分章预算：ch01=31, ch02=195, ch03=28, ch04=113, ch05=33, ch06=34,
 *   ch07=34, ch08=74, ch09=4, ch10=54
 * - 全书 OCR：scripts/ocr/infectious-ocr.txt（430 页 Vision OCR 恢复）
 * - OCR 错字按传染病学医学语义校正（如 病原体→病原体、品性感染→显性感染、
 *   潜伏→潜伏、菜姆病→莱姆病、雀乱→霍乱 等），数值与单位保留原值，未捏造。
 * - 会话身份：新 Trae 账号（接替上一账号题库提取工作）
 * 解析内容位于 answer.content 的第二个元素。
 */

export const infectiousDiseasesExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch01Items, ...ch02Items, ...ch03Items, ...ch04Items, ...ch05Items,
  ...ch06Items, ...ch07Items, ...ch08Items, ...ch09Items, ...ch10Items,
];

export const infectiousDiseasesExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch01Groups, ...ch02Groups, ...ch03Groups, ...ch04Groups, ...ch05Groups,
  ...ch06Groups, ...ch07Groups, ...ch08Groups, ...ch09Groups, ...ch10Groups,
];
