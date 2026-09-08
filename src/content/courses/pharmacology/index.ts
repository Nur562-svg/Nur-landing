import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch01Items, extractedGroups as ch01Groups } from "./extracted-pharmacology-ch01";
import { extractedItems as ch02Items, extractedGroups as ch02Groups } from "./extracted-pharmacology-ch02";
import { extractedItems as ch03Items, extractedGroups as ch03Groups } from "./extracted-pharmacology-ch03";
import { extractedItems as ch04Items, extractedGroups as ch04Groups } from "./extracted-pharmacology-ch04";
import { extractedItems as ch05Items, extractedGroups as ch05Groups } from "./extracted-pharmacology-ch05";
import { extractedItems as ch06Items, extractedGroups as ch06Groups } from "./extracted-pharmacology-ch06";
import { extractedItems as ch07Items, extractedGroups as ch07Groups } from "./extracted-pharmacology-ch07";
import { extractedItems as ch08Items, extractedGroups as ch08Groups } from "./extracted-pharmacology-ch08";
import { extractedItems as ch09Items, extractedGroups as ch09Groups } from "./extracted-pharmacology-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-pharmacology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-pharmacology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-pharmacology-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-pharmacology-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-pharmacology-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-pharmacology-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-pharmacology-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-pharmacology-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-pharmacology-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-pharmacology-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-pharmacology-ch20";
import { extractedItems as ch21Items, extractedGroups as ch21Groups } from "./extracted-pharmacology-ch21";
import { extractedItems as ch22Items, extractedGroups as ch22Groups } from "./extracted-pharmacology-ch22";
import { extractedItems as ch23Items, extractedGroups as ch23Groups } from "./extracted-pharmacology-ch23";
import { extractedItems as ch24Items, extractedGroups as ch24Groups } from "./extracted-pharmacology-ch24";
import { extractedItems as ch25Items, extractedGroups as ch25Groups } from "./extracted-pharmacology-ch25";
import { extractedItems as ch26Items, extractedGroups as ch26Groups } from "./extracted-pharmacology-ch26";
import { extractedItems as ch27Items, extractedGroups as ch27Groups } from "./extracted-pharmacology-ch27";
import { extractedItems as ch28Items, extractedGroups as ch28Groups } from "./extracted-pharmacology-ch28";
import { extractedItems as ch29Items, extractedGroups as ch29Groups } from "./extracted-pharmacology-ch29";
import { extractedItems as ch30Items, extractedGroups as ch30Groups } from "./extracted-pharmacology-ch30";
import { extractedItems as ch31Items, extractedGroups as ch31Groups } from "./extracted-pharmacology-ch31";
import { extractedItems as ch32Items, extractedGroups as ch32Groups } from "./extracted-pharmacology-ch32";
import { extractedItems as ch33Items, extractedGroups as ch33Groups } from "./extracted-pharmacology-ch33";
import { extractedItems as ch34Items, extractedGroups as ch34Groups } from "./extracted-pharmacology-ch34";
import { extractedItems as ch35Items, extractedGroups as ch35Groups } from "./extracted-pharmacology-ch35";
import { extractedItems as ch36Items, extractedGroups as ch36Groups } from "./extracted-pharmacology-ch36";
import { extractedItems as ch37Items, extractedGroups as ch37Groups } from "./extracted-pharmacology-ch37";
import { extractedItems as ch38Items, extractedGroups as ch38Groups } from "./extracted-pharmacology-ch38";
import { extractedItems as ch39Items, extractedGroups as ch39Groups } from "./extracted-pharmacology-ch39";
import { extractedItems as ch40Items, extractedGroups as ch40Groups } from "./extracted-pharmacology-ch40";
import { extractedItems as ch41Items, extractedGroups as ch41Groups } from "./extracted-pharmacology-ch41";
import { extractedItems as ch42Items, extractedGroups as ch42Groups } from "./extracted-pharmacology-ch42";
import { extractedItems as ch43Items, extractedGroups as ch43Groups } from "./extracted-pharmacology-ch43";
import { extractedItems as ch44Items, extractedGroups as ch44Groups } from "./extracted-pharmacology-ch44";
import { extractedItems as ch45Items, extractedGroups as ch45Groups } from "./extracted-pharmacology-ch45";
import { extractedItems as ch46Items, extractedGroups as ch46Groups } from "./extracted-pharmacology-ch46";
import { extractedItems as ch47Items, extractedGroups as ch47Groups } from "./extracted-pharmacology-ch47";
import { extractedItems as ch48Items, extractedGroups as ch48Groups } from "./extracted-pharmacology-ch48";
import { extractedItems as ch49Items, extractedGroups as ch49Groups } from "./extracted-pharmacology-ch49";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）题库提取 — 聚合导出
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 * 全书 49 章，逐章分件聚合。
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部均含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 道独立记分题，按各章节原题量（习题区字符占比）等比缩放分配；
 * 全书 49 个分区同比取整后预算合计恰好 600 道独立记分题（含 B1 组成员）。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 第1章 药理学总论—绪言：8
 * - 第2章 药物代谢动力学：42
 * - 第3章 药物效应动力学：15
 * - 第4章 影响药物效应的因素：8
 * - 第5章 传出神经系统药理概论：6
 * - 第6章 胆碱受体激动药：6
 * - 第7章 抗胆碱酯酶药和胆碱酯酶复活药：13
 * - 第8章 胆碱受体阻断药—M胆碱受体阻断药：9
 * - 第9章 胆碱受体阻断药—N胆碱受体阻断药：5
 * - 第10章 肾上腺素受体激动药：22
 * - 第11章 肾上腺素受体阻断药：15
 * - 第12章 中枢神经系统药理学概论：8
 * - 第13章 全身麻醉药：5
 * - 第14章 局部麻醉药：12
 * - 第15章 镇静催眠药：4
 * - 第16章 抗癫痫药和抗惊厥药：10
 * - 第17章 治疗中枢神经系统退行性疾病药：7
 * - 第18章 抗精神失常药：16
 * - 第19章 镇痛药：10
 * - 第20章 解热镇痛抗炎药：14
 * - 第21章 离子通道概论及钙通道阻滞药：10
 * - 第22章 抗心律失常药：22
 * - 第23章 作用于肾素-血管紧张素系统的药物：9
 * - 第24章 利尿药：16
 * - 第25章 抗高血压药：13
 * - 第26章 治疗心力衰竭的药物：38
 * - 第27章 调血脂药与抗动脉粥样硬化药：17
 * - 第28章 抗心绞痛药：15
 * - 第29章 作用于血液及造血系统的药物：21
 * - 第30章 影响自体活性物质的药物：9
 * - 第31章 作用于呼吸系统的药物：12
 * - 第32章 作用于消化系统的药物：10
 * - 第33章 子宫平滑肌兴奋药和抑制药：8
 * - 第34章 性激素类药及避孕药：9
 * - 第35章 肾上腺皮质激素类药物：12
 * - 第36章 甲状腺激素及抗甲状腺药：9
 * - 第37章 胰岛素及其他降血糖药：11
 * - 第38章 抗骨质疏松药：15
 * - 第39章 抗菌药物概述：8
 * - 第40章 β-内酰胺类抗生素：17
 * - 第41章 大环内酯类、林可霉素类及多肽类抗生素：7
 * - 第42章 氨基苷类抗生素：11
 * - 第43章 四环素类及氯霉素类：9
 * - 第44章 人工合成抗菌药：9
 * - 第45章 抗病毒药和抗真菌药：11
 * - 第46章 抗结核药及抗麻风病药：11
 * - 第47章 抗寄生虫药：6
 * - 第48章 抗恶性肿瘤药：9
 * - 第49章 影响免疫功能的药物：11
 */

export const pharmacologyExtractedItems: readonly AssessmentItemDefinition[] = [
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
  ...ch37Items,
  ...ch38Items,
  ...ch39Items,
  ...ch40Items,
  ...ch41Items,
  ...ch42Items,
  ...ch43Items,
  ...ch44Items,
  ...ch45Items,
  ...ch46Items,
  ...ch47Items,
  ...ch48Items,
  ...ch49Items,
];

export const pharmacologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
  ...ch37Groups,
  ...ch38Groups,
  ...ch39Groups,
  ...ch40Groups,
  ...ch41Groups,
  ...ch42Groups,
  ...ch43Groups,
  ...ch44Groups,
  ...ch45Groups,
  ...ch46Groups,
  ...ch47Groups,
  ...ch48Groups,
  ...ch49Groups,
];
