import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-biochemistry-ch1";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-biochemistry-ch2";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-biochemistry-ch3";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-biochemistry-ch4";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-biochemistry-ch5";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-biochemistry-ch6";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-biochemistry-ch7";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-biochemistry-ch8";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-biochemistry-ch9";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-biochemistry-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-biochemistry-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-biochemistry-ch12";
import { extractedItems as ch13Items, extractedGroups as ch13Groups } from "./extracted-biochemistry-ch13";
import { extractedItems as ch14Items, extractedGroups as ch14Groups } from "./extracted-biochemistry-ch14";
import { extractedItems as ch15Items, extractedGroups as ch15Groups } from "./extracted-biochemistry-ch15";
import { extractedItems as ch16Items, extractedGroups as ch16Groups } from "./extracted-biochemistry-ch16";
import { extractedItems as ch17Items, extractedGroups as ch17Groups } from "./extracted-biochemistry-ch17";
import { extractedItems as ch18Items, extractedGroups as ch18Groups } from "./extracted-biochemistry-ch18";
import { extractedItems as ch19Items, extractedGroups as ch19Groups } from "./extracted-biochemistry-ch19";
import { extractedItems as ch20Items, extractedGroups as ch20Groups } from "./extracted-biochemistry-ch20";
import { extractedItems as ch21Items, extractedGroups as ch21Groups } from "./extracted-biochemistry-ch21";
import { extractedItems as ch22Items, extractedGroups as ch22Groups } from "./extracted-biochemistry-ch22";
import { extractedItems as ch23Items, extractedGroups as ch23Groups } from "./extracted-biochemistry-ch23";
import { extractedItems as ch24Items, extractedGroups as ch24Groups } from "./extracted-biochemistry-ch24";
import { extractedItems as ch25Items, extractedGroups as ch25Groups } from "./extracted-biochemistry-ch25";
import { extractedItems as ch26Items, extractedGroups as ch26Groups } from "./extracted-biochemistry-ch26";
import { extractedItems as ch27Items, extractedGroups as ch27Groups } from "./extracted-biochemistry-ch27";

/**
 * 生物化学与分子生物学 学习指导与习题集 题库提取 — 聚合导出
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表、不构建课程 truth 定义。
 * 各分件头部分别含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 题，按各章节原题量等比缩放分配；
 * 全书正文 375–387 页原生文本层，双栏排版错序已按医学语义恢复。
 * 27 个正文章节同比取整后预算合计恰好 600 道独立记分题；
 * 各章实际实取与预算一致，无缺失答案、无法可靠提取记 0。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 第1章 蛋白质 结构与功能：31（名解8、A1单选14、简答6、B1组1×3）
 * - 第2章 核酸 结构与功能：21（名解5、A1单选8、简答4、B1组1×4）
 * - 第3章 酶与酶促反应：23（名解6、A1单选6、简答8、B1组1×3）
 * - 第4章 聚糖 结构与功能：20（名解4、A1单选6、简答6、B1组1×4）
 * - 第5章 糖代谢：35（名解9、A1单选14、简答3、B1组3×9）
 * - 第6章 生物氧化：29（名解8、A1单选6、简答0、B1组4×15）
 * - 第7章 脂质代谢：36（名解6、A1单选14、简答8、B1组2×8）
 * - 第8章 氨基酸代谢：45（名解6、A1/A2单选20、简答7、B1组3×12）
 * - 第9章 核苷酸代谢：11（名解2、A1单选4、简答2、B1组1×3）
 * - 第10章 代谢整合和调节：26（名解4、A1/A2单选9、简答4、B1组3×9）
 * - 第11章 真核基因与基因组：8（名解2、A1单选3、简答1、B1组1×2）
 * - 第12章 DNA合成：22（名解6、A1单选7、简答3、B1组2×6）
 * - 第13章 DNA损伤修复：10（名解2、A1单选3、简答2、B1组1×3）
 * - 第14章 RNA合成：28（名解4、A1/A2单选14、简答3、B1组3×7）
 * - 第15章 蛋白质合成：25（名解5、A1单选10、简答5、B1组1×5）
 * - 第16章 基因表达调控：51（名解12、A1单选22、简答10、B1组3×7）
 * - 第17章 细胞信号转导：23（名解7、A1单选8、简答4、B1组1×4）
 * - 第18章 血液生物化学：8（名解2、A1单选3、简答0、B1组1×3）
 * - 第19章 肝生物化学：11（名解5、A1单选6、简答0、B1组0）
 * - 第20章 维生素：9（名解1、A1单选2、简答2、B1组1×4）
 * - 第21章 钙磷微量元素：5（名解1、A1单选2、简答0、B1组1×2）
 * - 第22章 癌基因与抑癌基因：11（名解5、A1单选1、简答0、B1组1×5）
 * - 第23章 重组DNA技术：20（名解5、A1单选8、简答2、B1组1×5）
 * - 第24章 常用分子生物学技术：25（名解5、A1单选12、简答5、B1组1×3）
 * - 第25章 基因结构功能：26（名解5、A1单选12、简答2、B1组2×7）
 * - 第26章 基因诊断与基因治疗：20（名解9、A1/A2单选8、简答0、B1组1×3）
 * - 第27章 组学与系统生物医学：21（名解7、A1单选7、简答2、B1组1×5）
 * - 合计：600 道；缺失答案 0；无法可靠提取 0。
 * 各分件均按项目选择题映射规约（A1/A2→a1-single，X 型多选→a1-single 单选，
 * 且用 promptSource.note 标注），B 型配伍题使用 Group；正确项严格对照源参考答案、
 * 选项随机重排并同步 correctChoiceIndex(0 起)。
 */
export const biochemistryExtractedItems: readonly AssessmentItemDefinition[] = [
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
];

export const biochemistryExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
];