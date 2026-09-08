import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-neurology-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-neurology-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-neurology-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-neurology-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-neurology-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-neurology-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-neurology-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-neurology-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-neurology-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-neurology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-neurology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-neurology-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-neurology-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-neurology-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-neurology-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-neurology-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-neurology-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-neurology-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-neurology-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-neurology-ch20";
import { extractedItems as ch21Items, extractedGroups as ch21Groups } from "./extracted-neurology-ch21";
import { extractedItems as ch22Items, extractedGroups as ch22Groups } from "./extracted-neurology-ch22";
import { extractedItems as ch23Items, extractedGroups as ch23Groups } from "./extracted-neurology-ch23";

/**
 * 神经病学学习指导与习题集（第3版）题库提取 — 聚合导出
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 * 全书 23 章，逐章分件聚合。
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部均含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 道独立记分题，按各章节原题量（习题区字符占比）等比缩放分配；
 * 全书 23 个分区同比取整后预算合计恰好 600 道独立记分题（含 B1 组成员）。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 第1章 绪论：2
 * - 第2章 神经系统的解剖生理及病损的定位诊断：53
 * - 第3章 神经系统疾病的常见症状：31
 * - 第4章 神经系统疾病的病史采集和体格检查：34
 * - 第5章 神经系统疾病的辅助检查：37
 * - 第6章 神经心理学检查：12
 * - 第7章 神经系统疾病的诊断原则：5
 * - 第8章 头痛：19
 * - 第9章 脑血管疾病：78
 * - 第10章 脑血管病的介入诊疗：25
 * - 第11章 神经系统变性疾病：21
 * - 第12章 中枢神经系统感染性疾病：46
 * - 第13章 中枢神经系统脱髓鞘疾病：30
 * - 第14章 运动障碍性疾病：28
 * - 第15章 癫痫：26
 * - 第16章 脊髓疾病：26
 * - 第17章 周围神经疾病：31
 * - 第18章 自主神经系统疾病：8
 * - 第19章 神经肌肉接头和肌肉疾病：27
 * - 第20章 神经系统遗传性疾病：16
 * - 第21章 神经系统发育异常性疾病：13
 * - 第22章 睡眠障碍：13
 * - 第23章 内科系统疾病的神经系统并发症：19
 */

export const neurologyExtractedItems: readonly AssessmentItemDefinition[] = [
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
  ...ch19Items,
  ...ch20Items,
  ...ch21Items,
  ...ch22Items,
  ...ch23Items,
];

export const neurologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
  ...ch19Groups,
  ...ch20Groups,
  ...ch21Groups,
  ...ch22Groups,
  ...ch23Groups,
];
