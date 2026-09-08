import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-diagnostics-ch1";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-diagnostics-ch2";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-diagnostics-ch3";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-diagnostics-ch4";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-diagnostics-ch5";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-diagnostics-ch6";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-diagnostics-ch7";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-diagnostics-ch8";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-diagnostics-ch9";

import { extractedItems as symG1Items, extractedGroups as symG1Groups } from "./extracted-diagnostics-symptoms-g1";
import { extractedItems as symG2Items, extractedGroups as symG2Groups } from "./extracted-diagnostics-symptoms-g2";
import { extractedItems as symG3Items, extractedGroups as symG3Groups } from "./extracted-diagnostics-symptoms-g3";
import { extractedItems as symG4Items, extractedGroups as symG4Groups } from "./extracted-diagnostics-symptoms-g4";
import { extractedItems as symG5Items, extractedGroups as symG5Groups } from "./extracted-diagnostics-symptoms-g5";
import { extractedItems as symG6Items, extractedGroups as symG6Groups } from "./extracted-diagnostics-symptoms-g6";
import { extractedItems as symG7Items, extractedGroups as symG7Groups } from "./extracted-diagnostics-symptoms-g7";
import { extractedItems as inquiryItems, extractedGroups as inquiryGroups } from "./extracted-diagnostics-inquiry";

import { extractedItems as labGeneralItems, extractedGroups as labGeneralGroups } from "./extracted-diagnostics-lab-general";
import { extractedItems as labHematologyItems, extractedGroups as labHematologyGroups } from "./extracted-diagnostics-lab-hematology";
import { extractedItems as labHemostasisItems, extractedGroups as labHemostasisGroups } from "./extracted-diagnostics-lab-hemostasis";
import { extractedItems as labRenalItems, extractedGroups as labRenalGroups } from "./extracted-diagnostics-lab-renal";
import { extractedItems as labHepaticItems, extractedGroups as labHepaticGroups } from "./extracted-diagnostics-lab-hepatic";
import { extractedItems as labBodyfluidsItems, extractedGroups as labBodyfluidsGroups } from "./extracted-diagnostics-lab-bodyfluids";

/**
 * 《诊断学》学习指导与习题集（第4版）题库提取 — 聚合导出
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * 说明：本文件仅聚合已提取的题目数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。各独立文件头部均含统计报告。
 *
 * == 汇总统计 ==
 * 【第一篇 常见症状 + 第二篇 问诊】
 * - 症状 g1（发热/皮肤黏膜出血/水肿）        ：独立 56  题，B 组 13 / 44 成员
 * - 症状 g2（咳嗽咳痰/咯血/发绀/呼吸困难）   ：独立 42  题，B 组 8  / 34 成员
 * - 症状 g3（胸痛/心悸/恶心呕吐/吞咽困难）   ：独立 47  题，B 组 10 / 33 成员
 * - 症状 g4（呕血/便血/腹痛/腹泻/便秘/黄疸） ：独立 61  题，B 组 14 / 50 成员
 * - 症状 g5（腰背痛/关节痛）                 ：独立 54  题，B 组 6  / 26 成员
 * - 症状 g6（血尿/尿频尿急尿痛/少尿无尿多尿/尿失禁/排尿困难）：独立 49 题，B 组 15 / 73 成员
 * - 症状 g7（肥胖/消瘦/头痛/眩晕/晕厥/抽搐惊厥/意识障碍/情感症状）：独立 121 题，B 组 17 / 61 成员
 * - 第二篇 问诊                              ：独立 28  题，B 组 7  / 20 成员
 * - 症状+问诊合计：独立 458 题；B 组 90 组、成员 341。
 *
 * 【第三篇 体格检查（第1–9章）】
 * - 独立 701 题；B 组 96 组、成员 343。
 *
 * 【第四篇 实验诊断】合计独立 443 题、组 23 组、成员 94：
 * - 第一章 绪论            ：独立 4 题，无组
 * - 第二章 临床血液学检测    ：独立 104 题，B1/B2/A3-A4 组 12 / 57 成员
 * - 第三章 血栓与止血检测    ：独立 58 题，B1/A3-A4 组 8 / 26 成员
 * - 第五章 常用肾脏功能检测  ：独立 27 题，B1 组 1 / 3 成员
 * - 第六章 肝脏病常用检测    ：独立 45 题，B1 组 2 / 8 成员
 * - 第四章 排泄物、分泌物及体液检测：当前含独立 205 题、无组；该章完整规模为
 *   252 题 + 24 组（A2 病例题、问答题、B1 配伍组）尚未完成提取，属待补项。
 *
 * 【总计（当前已落地）】独立题 1602 题；B 型/共用题干组 209 组、成员 778。
 * - 缺失答案：0；无法提取：0（范围内已提取题目）。
 * - 待补：第四篇第四章 bodyfluids 剩余的 A2/问答题/B1 配伍组（见上）。
 *
 * 数据性质：全部为 nur-adapted 轻度改写、答案 confidence:"unverified"，
 * 未经权威教材交叉核对后升级。各分件头部含更细统计与 OCR 清洗说明。
 */
export const diagnosticsExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch1Items,
  ...ch2Items,
  ...ch3Items,
  ...ch4Items,
  ...ch5Items,
  ...ch6Items,
  ...ch7Items,
  ...ch8Items,
  ...ch9Items,
  ...symG1Items,
  ...symG2Items,
  ...symG3Items,
  ...symG4Items,
  ...symG5Items,
  ...symG6Items,
  ...symG7Items,
  ...inquiryItems,
  ...labGeneralItems,
  ...labHematologyItems,
  ...labHemostasisItems,
  ...labRenalItems,
  ...labHepaticItems,
  ...labBodyfluidsItems,
];

export const diagnosticsExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch1Groups,
  ...ch2Groups,
  ...ch3Groups,
  ...ch4Groups,
  ...ch5Groups,
  ...ch6Groups,
  ...ch7Groups,
  ...ch8Groups,
  ...ch9Groups,
  ...symG1Groups,
  ...symG2Groups,
  ...symG3Groups,
  ...symG4Groups,
  ...symG5Groups,
  ...symG6Groups,
  ...symG7Groups,
  ...inquiryGroups,
  ...labGeneralGroups,
  ...labHematologyGroups,
  ...labHemostasisGroups,
  ...labRenalGroups,
  ...labHepaticGroups,
  ...labBodyfluidsGroups,
];