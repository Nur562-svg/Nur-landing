import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch00Items, extractedGroups as ch00Groups } from "./extracted-microbiology-ch00";
import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-microbiology-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-microbiology-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-microbiology-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-microbiology-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-microbiology-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-microbiology-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-microbiology-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-microbiology-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-microbiology-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-microbiology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-microbiology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-microbiology-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-microbiology-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-microbiology-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-microbiology-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-microbiology-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-microbiology-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-microbiology-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-microbiology-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-microbiology-ch20";
import { extractedItems as ch21Items, extractedGroups as ch21Groups } from "./extracted-microbiology-ch21";
import { extractedItems as ch22Items, extractedGroups as ch22Groups } from "./extracted-microbiology-ch22";
import { extractedItems as ch23Items, extractedGroups as ch23Groups } from "./extracted-microbiology-ch23";
import { extractedItems as ch24Items, extractedGroups as ch24Groups } from "./extracted-microbiology-ch24";
import { extractedItems as ch25Items, extractedGroups as ch25Groups } from "./extracted-microbiology-ch25";
import { extractedItems as ch26Items, extractedGroups as ch26Groups } from "./extracted-microbiology-ch26";
import { extractedItems as ch27Items, extractedGroups as ch27Groups } from "./extracted-microbiology-ch27";
import { extractedItems as ch28Items, extractedGroups as ch28Groups } from "./extracted-microbiology-ch28";
import { extractedItems as ch29Items, extractedGroups as ch29Groups } from "./extracted-microbiology-ch29";
import { extractedItems as ch30Items, extractedGroups as ch30Groups } from "./extracted-microbiology-ch30";
import { extractedItems as ch31Items, extractedGroups as ch31Groups } from "./extracted-microbiology-ch31";
import { extractedItems as ch32Items, extractedGroups as ch32Groups } from "./extracted-microbiology-ch32";
import { extractedItems as ch33Items, extractedGroups as ch33Groups } from "./extracted-microbiology-ch33";
import { extractedItems as ch34Items, extractedGroups as ch34Groups } from "./extracted-microbiology-ch34";
import { extractedItems as ch35Items, extractedGroups as ch35Groups } from "./extracted-microbiology-ch35";
import { extractedItems as ch36Items, extractedGroups as ch36Groups } from "./extracted-microbiology-ch36";

/**
 * 医学微生物学学习指导与习题集（第2版）题库提取 — 聚合导出
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 * 全书 37 区（绪论 + 36 章），逐区分件聚合。
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部均含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 道独立记分题，按各章节原题量（习题区字符占比）等比缩放分配；
 * 全书 37 个分区同比取整后预算合计恰好 600 道独立记分题（含 B1 组成员）。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 绪论：5
 * - 第1章 细菌的形态与结构：29
 * - 第2章 细菌的生理：18
 * - 第3章 噬菌体：9
 * - 第4章 细菌的遗传与变异：15
 * - 第5章 细菌耐药性：13
 * - 第6章 细菌的感染与免疫：36
 * - 第7章 细菌感染的检测方法与防治原则：14
 * - 第8章 球菌：36
 * - 第9章 肠杆菌科：22
 * - 第10章 弧菌属：11
 * - 第11章 螺杆菌属：5
 * - 第12章 厌氧性细菌：19
 * - 第13章 分枝杆菌属：12
 * - 第14章 嗜血杆菌属：6
 * - 第15章 动物源性细菌：18
 * - 第16章 其他细菌：42
 * - 第17章 放线菌：10
 * - 第18章 支原体：14
 * - 第19章 立克次体：10
 * - 第20章 衣原体：13
 * - 第21章 螺旋体：12
 * - 第22章 病毒的基本性状：17
 * - 第23章 病毒的感染与免疫：25
 * - 第24章 病毒感染的检查方法与防治原则：16
 * - 第25章 呼吸道病毒：10
 * - 第26章 肠道病毒：16
 * - 第27章 急性胃肠炎病毒：14
 * - 第28章 肝炎病毒：18
 * - 第29章 虫媒病毒：10
 * - 第30章 出血热病毒：11
 * - 第31章 疱疹病毒：14
 * - 第32章 逆转录病毒：21
 * - 第33章 其他病毒：10
 * - 第34章 朊粒：7
 * - 第35章 真菌学总论：18
 * - 第36章 主要病原性真菌：24
 */

export const microbiologyExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch00Items,
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
  ...ch24Items,
  ...ch25Items,
  ...ch26Items,
  ...ch27Items,
  ...ch28Items,
  ...ch29Items,
  ...ch30Items,
  ...ch31Items,
  ...ch32Items,
  ...ch33Items,
  ...ch34Items,
  ...ch35Items,
  ...ch36Items,
];

export const microbiologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch00Groups,
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
  ...ch24Groups,
  ...ch25Groups,
  ...ch26Groups,
  ...ch27Groups,
  ...ch28Groups,
  ...ch29Groups,
  ...ch30Groups,
  ...ch31Groups,
  ...ch32Groups,
  ...ch33Groups,
  ...ch34Groups,
  ...ch35Groups,
  ...ch36Groups,
];
