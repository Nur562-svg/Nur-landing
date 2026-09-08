import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-immunology-ch01";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-immunology-ch02";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-immunology-ch03";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-immunology-ch04";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-immunology-ch05";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-immunology-ch06";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-immunology-ch07";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-immunology-ch08";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-immunology-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-immunology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-immunology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-immunology-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-immunology-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-immunology-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-immunology-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-immunology-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-immunology-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-immunology-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-immunology-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-immunology-ch20";
import { extractedItems as ch21Items, extractedGroups as ch21Groups } from "./extracted-immunology-ch21";
import { extractedItems as ch22Items, extractedGroups as ch22Groups } from "./extracted-immunology-ch22";
import { extractedItems as ch23Items, extractedGroups as ch23Groups } from "./extracted-immunology-ch23";
import { extractedItems as ch24Items, extractedGroups as ch24Groups } from "./extracted-immunology-ch24";
import { extractedItems as ch25Items, extractedGroups as ch25Groups } from "./extracted-immunology-ch25";

/**
 * 医学免疫学学习指导与习题集（第3版）题库提取 — 聚合导出
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 * 全书 25 章，逐章分件聚合。
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部均含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 道独立记分题，按各章节原题量（PDF 正文页数）等比缩放分配；
 * 全书 25 个正文章节分件同比取整后预算合计 600 道独立记分题。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 第1章 免疫学概论：25
 * - 第2章 免疫器官和组织：21
 * - 第3章 抗原：19
 * - 第4章 抗体：25
 * - 第5章 补体系统：16
 * - 第6章 细胞因子：38
 * - 第7章 白细胞分化抗原和黏附分子：28
 * - 第8章 主要组织相容性复合体：28
 * - 第9章 B淋巴细胞：31
 * - 第10章 T淋巴细胞：20
 * - 第11章 抗原提呈细胞与抗原的加工及提呈：16
 * - 第12章 T淋巴细胞介导的适应性免疫应答：26
 * - 第13章 B淋巴细胞介导的特异性免疫应答：28
 * - 第14章 固有免疫系统及其介导的应答：23
 * - 第15章 黏膜免疫：22
 * - 第16章 免疫耐受：20
 * - 第17章 免疫调节：27
 * - 第18章 超敏反应：23
 * - 第19章 自身免疫病：24
 * - 第20章 免疫缺陷病：27
 * - 第21章 感染免疫：17
 * - 第22章 肿瘤免疫：25
 * - 第23章 移植免疫：27
 * - 第24章 免疫学检测技术：20
 * - 第25章 免疫学防治：24
 * - 合计：600 道。
 * 各分件均按本书映射规约（名词→term、填空→fill、A1/A2→a1-single、问答→short-answer），
 * 本书一般无多项选择与 B 型配伍，故 bGroups 为空白；OCR 错字已按免疫学医学语义恢复，
 * 数值/分子标记（如 CD、HLA、细胞因子名、抗体类别等）保留原文，未捏造。
 */
export const immunologyExtractedItems: readonly AssessmentItemDefinition[] = [
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
  ...ch19Items,
  ...ch20Items,
  ...ch21Items,
  ...ch22Items,
  ...ch23Items,
  ...ch24Items,
  ...ch25Items,
];

export const immunologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
  ...ch19Groups,
  ...ch20Groups,
  ...ch21Groups,
  ...ch22Groups,
  ...ch23Groups,
  ...ch24Groups,
  ...ch25Groups,
];