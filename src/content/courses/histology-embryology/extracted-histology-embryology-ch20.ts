import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第20章 胚胎学绪论 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：0 题
 * - 选择题（a1-single）：5 题（A1 型 5 题）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：0 题
 * - B1 配伍题：0 组
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书仅含选择题（A1 型 8），无名词解释、填空题、简答/论述与 B1 配伍题；
 *   本文件按 5 道预算在原书顺序内等比取材取满。题干/选项在双栏排版中交错散落，已按胚胎
 *   学医学语义重建完整选项集合并对照章末「参考答案」键号锚定正确项。数值（胚胎发育 38 周、
 *   胚前期/胚期/胎期分期、排卵前 36～48 小时等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch20-embryology-introduction";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第20章 胚胎学绪论 复习思考题 习题（核对PDF 第168–170页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），本章无，置空 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** A1 型选择题（映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch20-embryology-introduction-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人体胚胎发生需要的时间是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["40 周", "38 周", "36 周", "34 周", "32 周"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "38 周",
        "人胚胎发育经历 38 周。原书 A1 参考答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch20-embryology-introduction-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人体胚胎发生的时间顺序为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胚前期、胚期和胎儿期",
      "胚期、胎儿期、分娩前期",
      "胚前期、胚期和胚后期",
      "胚期、胎儿期和胎儿后期",
      "胎儿前期、胎儿期和胎儿后期",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胚前期、胚期和胎儿期",
        "人胚胎发育经历 38 周，分为三个时期：胚前期（受精到第 2 周末二胚层胚盘出现）、胚期（第 3 周至第 8 周末）、胎期（第 9 周至出生）。原书 A1 参考答案第 2 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch20-embryology-introduction-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "体细胞核移植是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "将卵母细胞核移植入去核的体细胞中",
      "将精母细胞核移植入去核的体细胞中",
      "将体细胞核移植入去核的卵母细胞中",
      "将体细胞核移植入去核的精母细胞中",
      "将精母细胞和卵母细胞同时移入去核的体细胞中",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "将体细胞核移植入去核的卵母细胞中",
        "体细胞核移植（克隆技术）是将体细胞的细胞核移植入去核的卵母细胞中，以复制、克隆生物个体。原书 A1 参考答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch20-embryology-introduction-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于胚前期说法正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "从受精到第 3 周末为胚前期",
      "从受精后第 3 周至第 8 周末为胚前期",
      "胚前期末二胚层胚盘出现",
      "从受精到胎期之前的发育阶段为胚前期",
      "胚前期阶段胚的各器官、系统与外形发育初具雏形",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胚前期末二胚层胚盘出现",
        "胚前期从受精到第 2 周末二胚层胚盘出现为止；胚期从第 3 周至第 8 周末，此期末胚的各器官、系统与外形发育初具雏形。原书 A1 参考答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch20-embryology-introduction-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于胚胎学的发展所述，不正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "古希腊学者 Hippocrates 首次观察并描述了鸡蛋在孵化成鸡的全过程中的形态变化",
      "1651 年英国学者 Harvey 提出“一切生命皆来自卵”的假设",
      "DNA 结构的阐明和中心法则的确立推动了胚胎学的发展",
      "我国的“试管婴儿”研究始于 21 世纪",
      "1855 年德国学者 Remark 提出胚胎发育的三胚层学说",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "我国的“试管婴儿”研究始于 21 世纪（错误项）",
        "我国首例“试管婴儿”诞生于 1988 年，并非始于 21 世纪，故该说法不正确。其余关于 Hippocrates、Harvey、DNA/中心法则、Remark 三胚层学说的表述均符合胚胎学发展史。原书 A1 参考答案第 8 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无，置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答题/论述题（short-answer），本章无，置空 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，本章无，置空 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];