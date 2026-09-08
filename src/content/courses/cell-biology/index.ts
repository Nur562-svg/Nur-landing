import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-cell-bio-ch01";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-cell-bio-ch02";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-cell-bio-ch03";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-cell-bio-ch04";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-cell-bio-ch05";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-cell-bio-ch06";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-cell-bio-ch07";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-cell-bio-ch08";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-cell-bio-ch09";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-cell-bio-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-cell-bio-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-cell-bio-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-cell-bio-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-cell-bio-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-cell-bio-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-cell-bio-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-cell-bio-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-cell-bio-ch18";

/**
 * 医学细胞生物学 题库提取 — 聚合导出
 * 来源：《医学细胞生物学实验指导与习题集》第4版（人民卫生出版社）之「第二部分 习题集」
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部分别含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 题，按“第二部分 习题集”18 章各章习题区字符占比等比缩放分配；
 * 全书第 103–226 页原生文本层，双栏排版错序按细胞生物学医学语义恢复。
 * 18 个正文章节同比取整后预算合计恰好 600 道独立记分题；
 * 各章实际实取与预算一致，id 全局唯一、order 逐章 1..N 连续。
 * 本书题型仅三：一、名词解释(term)；二、单项选择题(a1-single)；三、多项选择题
 * （按项目规约映射为 a1-single 单选取一正确项，promptSource.note=xMapNote）。
 * 无 B 型配伍 / 填空 / 简答，故 extractedGroups 为空数组；B1 不涉及。
 *
 * == 分章统计（独立记分题；括号：名词/单选(a1单+多选映射)）==
 * - 第1章 绪论：17（6/9+2）
 * - 第2章 细胞的概念与分子基础：30（10/16+4）
 * - 第3章 细胞生物学的研究方法：54（15/35+4）
 * - 第4章 细胞膜与物质的穿膜运输：40（13/24+3）
 * - 第5章 细胞的内膜系统与囊泡转运：41（6/27+8）
 * - 第6章 线粒体与细胞的能量转换：27（4/19+4）
 * - 第7章 细胞骨架与细胞的运动：34（4/25+5）
 * - 第8章 细胞核：34（4/26+4）
 * - 第9章 细胞内遗传信息的传递及调控：39（9/20+10）
 * - 第10章 细胞连接与细胞黏附：31（8/18+5）
 * - 第11章 细胞微环境及其与细胞的相互作用：29（8/11+10）
 * - 第12章 细胞间信息传递：46（7/24+15）
 * - 第13章 细胞分裂与细胞周期：43（8/30+5）
 * - 第14章 生殖细胞与受精：23（7/12+4）
 * - 第15章 细胞分化：30（8/17+5）
 * - 第16章 细胞衰老与细胞死亡：29（8/16+5）
 * - 第17章 干细胞与组织的维持和再生：35（8/22+5）
 * - 第18章 细胞工程：18（7/9+2）
 * - 合计：600 道；缺失答案 0；无法可靠提取：ch01 2、ch02 1、ch10 1、ch11 若干、
 *   ch14 1、ch15 1、ch17 2（换用同源清晰题并如实注明）；多选题映射均标注 note=xMapNote。
 */
export const cellBioExtractedItems: readonly AssessmentItemDefinition[] = [
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

export const cellBioExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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