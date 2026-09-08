import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

import { extractedItems as ch1Items, extractedGroups as ch1Groups } from "./extracted-physiology-ch1";
import { extractedItems as ch2Items, extractedGroups as ch2Groups } from "./extracted-physiology-ch2";
import { extractedItems as ch3Items, extractedGroups as ch3Groups } from "./extracted-physiology-ch3";
import { extractedItems as ch4Items, extractedGroups as ch4Groups } from "./extracted-physiology-ch4";
import { extractedItems as ch5Items, extractedGroups as ch5Groups } from "./extracted-physiology-ch5";
import { extractedItems as ch6Items, extractedGroups as ch6Groups } from "./extracted-physiology-ch6";
import { extractedItems as ch7Items, extractedGroups as ch7Groups } from "./extracted-physiology-ch7";
import { extractedItems as ch8Items, extractedGroups as ch8Groups } from "./extracted-physiology-ch8";
import { extractedItems as ch9Items, extractedGroups as ch9Groups } from "./extracted-physiology-ch9";
import { extractedItems as ch10Items, extractedGroups as ch10Groups } from "./extracted-physiology-ch10";
import { extractedItems as ch11Items, extractedGroups as ch11Groups } from "./extracted-physiology-ch11";
import { extractedItems as ch12Items, extractedGroups as ch12Groups } from "./extracted-physiology-ch12";

/**
 * 生理学 学习指导与习题集（第3版）题库提取 — 聚合导出
 * 来源：《生理学学习指导与习题集》第3版（人民卫生出版社，主编：罗自强、祁金顺）
 *
 * 说明：本模块仅聚合已提取的题库数据（extractedItems / extractedGroups），
 * 不注册课程、不修改 course 注册表（physiology.ts）、不构建课程 truth 定义。
 * 各分件头部均含统计报告。
 *
 * == 提取预算规则 ==
 * 未商业化期每本教材限定 600 题，按各章节原题量等比缩放分配；
 * 12 章同比取整后合计 599 道独立记分题（600 预算的最接近整数分布）。
 *
 * == 分章统计（独立记分题，含 B1 组成员）==
 * - 第一章 绪论：11    （名解3、单选4、简答1、B1组1×3）
 * - 第二章 细胞的基本功能：66（名解8、单选41、简答7、case2、B1组3×8）
 * - 第三章 血液：31    （名解3、单选21、简答2、case1、B1组2×4）
 * - 第四章 血液循环：108（名解10、单选70、简答12、case3、B1组5×13）
 * - 第五章 呼吸：33    （名解6、单选16、简答5、B1组2×6）
 * - 第六章 消化和吸收：34（名解4、单选22、简答4、case1、B1组1×3）
 * - 第七章 能量代谢和体温：18（名解3、单选8、简答3、case2、B1组1×2）
 * - 第八章 尿的生成和排出：41（名解4、单选25、简答4、case2、B1组2×6）
 * - 第九章 感觉器官：41（名解6、单选26、简答5、B1组2×4）
 * - 第十章 神经系统的功能：101（名解11、单选62、简答9、B1组6×19）
 * - 第十一章 内分泌：91（名解10、单选61、简答7、case3、B1组3×10）
 * - 第十二章 生殖：24（名解2、单选16、简答2、case1、B1组1×3）
 * - 合计：599 题；缺失答案 0；无法可靠提取 0。
 * 各分件均按项目选择题映射规约（A1/A2→a1-single，X 型多选→a1-single 单选，
 * 且用 unique promptSource.note 标注），B 型配伍题使用 Group。
 */
export const physiologyExtractedItems: readonly AssessmentItemDefinition[] = [
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
];

export const physiologyExtractedGroups: readonly AssessmentItemGroupDefinition[] = [
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
];