import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch0Items, extractedGroups as ch0Groups } from "./extracted-medical-genetics-ch0";
import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-medical-genetics-ch1";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-medical-genetics-ch2";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-medical-genetics-ch3";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-medical-genetics-ch4";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-medical-genetics-ch5";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-medical-genetics-ch6";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-medical-genetics-ch7";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-medical-genetics-ch8";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-medical-genetics-ch9";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-medical-genetics-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-medical-genetics-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-medical-genetics-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-medical-genetics-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-medical-genetics-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-medical-genetics-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-medical-genetics-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-medical-genetics-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-medical-genetics-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-medical-genetics-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-medical-genetics-ch20";

/**
 * 医学遗传学 学习指导与习题集（第4版）题库提取 — 聚合导出
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部分别含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 题，按各章节原题量等比缩放分配；
 * 全书 21 区（绪论 + 20 章）同比取整后预算 601 道独立记分题；
 * 第11章《多基因病》源题量及可提取清晰题所限如实实取 37（预算 39），
 * 故整本合计 599 道独立记分题（最接近 600 预算的诚实整数分布）。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 绪论：19（名解5、单选8、简答2、B1组2×4）
 * - 第1章 基于疾病的遗传学数据分析：16（名解5、单选6、简答4、case1）
 * - 第2章 基因突变与遗传多态性：21（名解4、单选6、简答3、B1组2×8）
 * - 第3章 基因突变的细胞分子生物学效应：34（名解8、单选19、简答3、B1组2×4）
 * - 第4章 单基因病的遗传：40（名解10、单选18、简答3、B1组2×9）
 * - 第5章 多基因病的遗传：19（名解8、单选5、简答2、B1组2×4）
 * - 第6章 群体遗传：31（名解5、单选13、简答2、case1、B1组3×10）
 * - 第7章 线粒体病的遗传：34（名解5、单选18、简答3、B1组2×8）
 * - 第8章 人类染色体：22（名解6、单选13、简答1、B1组1×2）
 * - 第9章 染色体畸变：39（名解10、单选17、简答2、B1组3×10）
 * - 第10章 单基因病：55（名解6、单选37、简答5、B1组3×7）
 * - 第11章 多基因病：37（名解5、单选19、简答3、B1组2×10）
 * - 第12章 线粒体病：38（名解5、单选21、B1组4×12）
 * - 第13章 染色体病：31（名解6、单选17、简答2、B1组2×6）
 * - 第14章 遗传性免疫缺陷：28（名解5、单选14、简答3、B1组3×6）
 * - 第15章 出生缺陷：25（名解8、单选5、简答3、B1组2×9）
 * - 第16章 肿瘤与遗传：16（名解6、单选3、简答2、B1组1×5）
 * - 第17章 表观遗传病：23（名解5、单选14、简答1、B1组1×3）
 * - 第18章 遗传病的诊断：14（名解6、单选4、简答2、B1组1×2）
 * - 第19章 遗传病的治疗：27（名解5、单选14、简答3、B1组1×5）
 * - 第20章 遗传咨询：30（名解5、单选20、B1组3×5）
 * - 合计：599 道；缺失答案 0；无法可靠提取 0。
 * 各分件均按项目选择题映射规约（A1/A2→a1-single，X 型多选→a1-single 单选，
 * 且用 unique promptSource.note 标注），B 型配伍题使用 Group。
 */
export const medicalGeneticsExtractedItems: readonly AssessmentItemDefinition[] = [
  ...ch0Items,
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
];

export const medicalGeneticsExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...ch0Groups,
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
];