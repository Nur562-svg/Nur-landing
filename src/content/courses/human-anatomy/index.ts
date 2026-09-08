import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-human-anatomy-ch1";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-human-anatomy-ch2";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-human-anatomy-ch3";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-human-anatomy-ch4";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-human-anatomy-ch5";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-human-anatomy-ch6";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-human-anatomy-ch7";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-human-anatomy-ch8";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-human-anatomy-ch9";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-human-anatomy-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-human-anatomy-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-human-anatomy-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-human-anatomy-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-human-anatomy-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-human-anatomy-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-human-anatomy-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-human-anatomy-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-human-anatomy-ch18";

/**
 * 系统解剖学习题集（第2版）题库提取 — 聚合导出
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 * 全书 19 章，第19章（内分泌绪论后的综合）不设独立分件，故实际聚合 18 章分件。
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部均含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 道独立记分题，按各章节原题量（PDF 正文页数）等比缩放分配；
 * 全书 18 个正文章节分件同比取整后预算合计 600 道独立记分题。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 第1章 骨学：33
 * - 第2章 关节学：35
 * - 第3章 肌学：43
 * - 第4章 内脏学总论 消化系统：41
 * - 第5章 呼吸系统：20
 * - 第6章 泌尿系统：17
 * - 第7章 男性生殖系统：13
 * - 第8章 女性生殖系统：24
 * - 第9章 腹膜：7
 * - 第10章 心血管系统：63
 * - 第11章 淋巴系统：18
 * - 第12章 感觉器总论 视器：28
 * - 第13章 前庭蜗器：19
 * - 第14章 神经系统总论 中枢神经系统：118
 * - 第15章 周围神经系统：77
 * - 第16章 神经系统的传导通路：23
 * - 第17章 脑和脊髓的被膜、血管及脑脊液循环：14
 * - 第18章 内分泌系统：7
 * - 合计：600 道。
 * 各分件均按本书映射规约（A1/A2/A3→a1-single，B 型配伍题用 Group），
 * OCR 错字已按医学语义恢复，数值/结构名保留原文，未捏造。
 */
export const humanAnatomyExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch1Items,
  ...ch2Items,
  ...ch3Items,
  ...ch4Items,
  ...ch5Items,
  ...ch6Items,
  ...ch7Items,
  ...ch8Items,
  ...ch9Items,
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

export const humanAnatomyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch1Groups,
  ...ch2Groups,
  ...ch3Groups,
  ...ch4Groups,
  ...ch5Groups,
  ...ch6Groups,
  ...ch7Groups,
  ...ch8Groups,
  ...ch9Groups,
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