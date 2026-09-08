import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-histology-embryology-ch01";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-histology-embryology-ch02";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-histology-embryology-ch03";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-histology-embryology-ch04";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-histology-embryology-ch05";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-histology-embryology-ch06";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-histology-embryology-ch07";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-histology-embryology-ch08";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-histology-embryology-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-histology-embryology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-histology-embryology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-histology-embryology-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-histology-embryology-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-histology-embryology-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-histology-embryology-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-histology-embryology-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-histology-embryology-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-histology-embryology-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-histology-embryology-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-histology-embryology-ch20";
import { extractedItems as ch21Items, extractedGroups as ch21Groups } from "./extracted-histology-embryology-ch21";
import { extractedItems as ch22Items, extractedGroups as ch22Groups } from "./extracted-histology-embryology-ch22";
import { extractedItems as ch23Items, extractedGroups as ch23Groups } from "./extracted-histology-embryology-ch23";
import { extractedItems as ch24Items, extractedGroups as ch24Groups } from "./extracted-histology-embryology-ch24";
import { extractedItems as ch25Items, extractedGroups as ch25Groups } from "./extracted-histology-embryology-ch25";
import { extractedItems as ch26Items, extractedGroups as ch26Groups } from "./extracted-histology-embryology-ch26";
import { extractedItems as ch27Items, extractedGroups as ch27Groups } from "./extracted-histology-embryology-ch27";
import { extractedItems as ch28Items, extractedGroups as ch28Groups } from "./extracted-histology-embryology-ch28";

/**
 * 组织学与胚胎学 学习指导与习题集 题库提取 — 聚合导出
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部分别含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 题，按各章节原题量（习题区字符占比）等比缩放分配；
 * 全书正文 PDF 第 9–222 页原生文本层，双栏排版错序已按组织学/胚胎学医学语义恢复。
 * 28 个正文章节（第1–19章组织学、第20–28章胚胎学）同比取整后预算合计恰好 600 道独立记分题；
 * 各章实际实取与预算一致；选择题正确项严格对照各章末「参考答案」键号
 * （第28章无参考答案，仅取复习纲要可明确锚定者）。
 *
 * == 分章统计（独立记分题，含 B1 组成员；括号依原书题型取材）==
 * - 第1章 绪论：5（A1 3、B1组1×2）
 * - 第2章 上皮组织：23（名解5、A1 10、简答2、B1组2×6）
 * - 第3章 结缔组织：21（名解5、A1 8、简答2、B1组1×6）
 * - 第4章 软骨和骨：30（名解5、A1 12、简答5、B1组3×8）
 * - 第5章 血液：29（名解4、A1 16、简答3、B1组2×6）
 * - 第6章 肌组织：18（名解2、A1 11、简答1、B1组2×4）
 * - 第7章 神经组织：35（名解5、A1 19、简答3、B1组2×8）
 * - 第8章 神经系统：20（名解2、A1 12、简答2、B1组1×4）
 * - 第9章 循环系统：30（名解5、A1 12、简答5、B1组4×8）
 * - 第10章 免疫系统：32（名解5、A1 12、简答5、B1组3×10）
 * - 第11章 皮肤：17（名解3、A1 4、简答4、B1组3×6）
 * - 第12章 眼与耳：24（名解4、A1 12、简答4、B1组2×4）
 * - 第13章 内分泌系统：22（名解4、A1 8、简答4、B1组2×6）
 * - 第14章 消化管：37（名解9、A1 11、简答8、B1组3×9）
 * - 第15章 消化腺：25（名解5、A1 10、简答4、B1组3×6）
 * - 第16章 呼吸系统：17（名解4、A1 6、简答3、B1组2×4）
 * - 第17章 泌尿系统：23（名解4、A1 10、简答3、B1组2×6）
 * - 第18章 男性生殖系统：16（名解3、A1 6、简答3、B1组2×4）
 * - 第19章 女性生殖系统：33（名解7、A1 13、简答7、B1组2×6）
 * - 第20章 胚胎学绪论：5（A1 5）
 * - 第21章 胚胎发生总论：36（名解6、A1 15、简答7、B1组2×8）
 * - 第22章 颜面和四肢的发生：13（名解3、A1 6、简答2、B1组1×2）
 * - 第23章 消化系统和呼吸系统的发生：17（名解4、A1 6、简答3、B1组2×4）
 * - 第24章 泌尿系统和生殖系统的发生：16（名解4、A1 6、简答2、B1组2×4）
 * - 第25章 心血管系统的发生：23（名解4、A1 10、简答5、B1组1×4）
 * - 第26章 神经系统的发生：20（名解4、A1 7、简答4、B1组1×5）
 * - 第27章 眼与耳的发生：10（名解3、A1 3、简答2、B1组1×2）
 * - 第28章 先天性畸形概述：3（A1 3，按复习纲要锚定，缺失如实记录）
 * - 合计：600 道；缺失答案 0；无法可靠提取：ch18 1、ch22 1，均已换用同源更清晰题；
 *   ch28 无参考答案按纲要锚定 3 道。本书无填空题，fill 各项为空。
 * 各分件均按项目选择题映射规约（A1/A2→a1-single，X 型多选→a1-single 单选取一正确项
 * 且用 promptSource.note=xMapNote），B 型配伍题使用 Group b1；正确项严格对照源答案、
 * 选项随机重排并同步 correctChoiceIndex(0 起)。
 */
export const histologyEmbryologyExtractedItems: readonly AssessmentItemDefinition[] = [
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
  ...ch26Items,
  ...ch27Items,
  ...ch28Items,
];

export const histologyEmbryologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
  ...ch26Groups,
  ...ch27Groups,
  ...ch28Groups,
];