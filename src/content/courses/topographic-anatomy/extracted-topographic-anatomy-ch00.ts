import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 局部解剖学学习指导与习题集 — 绪论 题库提取（等比取样）
 * 来源：《局部解剖学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：0 题（简答）
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：2 题（须等于本文件预算 2）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：绪论原书依序含名词解释 1、选择题（A1 型 1 + A2 型 1 + B1 型 1 组共 2 小题）
 *   与简答题 1；本文件按 2 道预算在原书顺序内取材：名词解释全取、A1 型题取第 1 题；
 *   A2 型题（手背静脉网属于人体哪一层）、B1 型组（3～4 题，腕踝部深筋膜增厚形成等）
 *   与简答题因预算未纳入。正确项对齐本页参考答案键号（A1 型题 1.E 皮神经；A2 型题
 *   2.B 浅筋膜；B1 型题 3.D 支持带、4.E 皮神经），选项与共用备选答案已随机重排并
 *   同步 correctChoiceIndex。OCR 错字已按局部解剖学医学语义恢复（本页无显著错字，
 *   选项行序按逻辑重建），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "topographic-anatomy-ch00-introduction";
const locatorBase =
  "《局部解剖学学习指导与习题集》 绪论 习题（核对PDF 第11–12页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-topographic-anatomy-ch00-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血管神经鞘",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "深筋膜包裹血管神经束的外面形成的筋膜鞘称为血管神经鞘，如颈动脉鞘、腋鞘、股鞘等。",
        "血管神经鞘是深筋膜形成的主要结构之一（其余为肌间隔、支持带、骨筋膜鞘、筋膜囊），临床上颈动脉鞘、腋鞘、股鞘均为典型例子。原书绪论名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），1 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-topographic-anatomy-ch00-introduction-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分布于浅筋膜内的结构有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血管神经鞘",
      "骨筋膜鞘",
      "皮神经",
      "支持带",
      "肌间隔",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "皮神经",
        "浅筋膜内含有浅静脉、浅动脉、浅淋巴管与淋巴结和皮神经；肌间隔、血管神经鞘、骨筋膜鞘、支持带均为深筋膜形成的结构。原书绪论 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），0 道（绪论简答题因预算未纳入） */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，0 组（绪论 B1 组因预算未纳入） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
