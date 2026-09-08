import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第28章 先天性畸形概述 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社，本章素材页脚注无作者署名）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：0 题
 * - 选择题（a1-single）：3 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：0 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：3 题（须等于本文件预算 3）
 * - 缺失答案：0；无法可靠提取：其余选项因无章末「参考答案」且非全部能在复习纲要明确锚定，
 *   （本章原书 A1 型共有 9 题，本文件仅取 3 道最清晰、可依复习纲要确定唯一正确项的题）
 * - 说明：本章素材无「参考答案」区，仅含复习纲要与 A1 型选择题题干（选项被双栏错序打散、
 *   无键号）。故仅选取正确项能从复习纲要正文明确锚定的题：第 4 题（先天性 Patau 综合征＝13
 *   号染色体三体，属常染色体三体型）、第 5 题（引起肾上腺肥大的遗传因素＝基因突变，复习纲要
 *   将肾上腺肥大列于基因突变所致疾病）、第 7 题（抗生素药物链霉素可引起先天性耳聋，复习纲要
 *   原文明确）。其余题（如「属于染色体畸变的是」存在多个正确项、宫内诊断方法等无法唯一锚定）
 *   按规约跳过并如实记录于文件头。选项均依据复习纲要正文与医学校准重建，数值（21/18/13 号
 *   染色体、致畸敏感期等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch28-congenital-malformation";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第28章 先天性畸形概述 复习思考题 习题（核对PDF 第220–222页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）— 本章原书无此类题，空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** A1 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch28-congenital-malformation-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "先天性 Patau 综合征属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "性染色体单体型",
      "常染色体单体型",
      "常染色体三体型",
      "性染色体三体型",
      "四倍体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "常染色体三体型",
        "复习纲要（染色体数目异常）：Patau 综合征为 13 号染色体三体，属常染色体数目的三体异常，即常染色体三体型。与之并列的 Down 综合征为 21 号染色体三体、Edward 综合征为 18 号染色体三体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch28-congenital-malformation-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起肾上腺肥大的遗传因素在于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因突变",
      "染色体结构异常",
      "染色体数目异常",
      "染色体畸变",
      "发育信号通路异常",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因突变",
        "复习纲要（基因突变）：指 DNA 分子碱基组成或排列顺序的改变，但染色体外形无异常，如镰状细胞贫血、苯丙酮酸尿症、肾上腺肥大、小头畸形、多发性结肠息肉等。故引起肾上腺肥大的遗传因素在于基因突变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch28-congenital-malformation-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗生素药物如链霉素可引起",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无脑畸形",
      "先天性耳聋",
      "软骨发育不良",
      "胎儿生殖系统畸形",
      "胎儿智力低下",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "先天性耳聋",
        "复习纲要（致畸性药物）：抗生素药物如链霉素可引起先天性耳聋；如甲氨蝶呤可引起无脑、小头及四肢畸形，华法林可引起胎儿软骨发育不良，长期应用性激素可致胎儿生殖系统畸形等。故链霉素可引起先天性耳聋。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/问/论述题（short-answer）— 本章原书无此类题，空数组 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题 — 本章原书无此类题，空数组 */
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