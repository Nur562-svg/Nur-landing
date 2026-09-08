import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第13章 DNA 损伤和损伤修复 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2 型选择题（a1-single）：3 题
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：10 题（含 B1 组成员；须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含名词解释 10、A1 型选择题 20、A2 型题 2、B1 共用备选答案配伍题
 *   2 组（23~25 与 26~28）、简答题 3。按 10 道预算取材并在原书顺序内覆盖：取名词解释
 *   2、A1 型选择题 3（原书第 1/12/15 题）、简答题 2、B1 第 1 组 3 成员。所有正确项均对齐
 *   源参考答案（原书 B1 23.D 24.C 25.A；A1 1.D 12.E 15.D）。原生文本双栏错序（选项字母
 *   与文字分离、题干串行残缺、简体/OCR 错字如“除切除修复包括有重组修复及 kJs 修复”
 *   “二士途径”等）已按 DNA 损伤修复医学语义恢复，数值/结构/缩略语（如 XPA/XPB/XPC、
 *   MLH1、RecA、UvrA/UvrB/UvrC、MutS/MutL/MutH、AP 位点）保留原文，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch13-dna-repair";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第13章 DNA 损伤和损伤修复 复习思考题 习题（核对原书PDF 第209–215页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-biochem-ch13-dna-repair-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA 损伤（DNA damage）",
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
        "DNA 损伤",
        "DNA 损伤是各种内、外因素所导致的生物体 DNA 组成与结构的变化。常见类型包括碱基结构与糖基破坏、碱基之间的错配、DNA 链断裂以及 DNA 链共价交联（DNA 链间交联、DNA 链内交联和 DNA-蛋白质交联等）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch13-dna-repair-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：光修复（photoreactivation）",
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
        "光修复",
        "光修复是生物体内的光裂合酶（光复活酶）直接识别并和结合于 DNA 链上的嘧啶二聚体部位，并将之解聚为原来的单体核苷酸形式，从而完成损伤直接修复的过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-biochem-ch13-dna-repair-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "紫外线照射引起 DNA 分子的碱基之间形成二聚体，其中最常见的形式是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["C-C", "T-U", "U-C", "T-T", "C-T"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T-T",
        "原书 A1 型选择题第 1 题答案 D，即胸腺嘧啶二聚体（T-T）。紫外线照射使 DNA 分子中间一链相邻的两个胸腺嘧啶以环丁基环结合形成胸腺嘧啶二聚体，是最常见的嘧啶二聚体形式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch13-dna-repair-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "着色性干皮病是人类的一种遗传性皮肤病，病人皮肤经阳光照射后易发展为皮肤癌，该病的分子机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞不能合成类胡萝卜素型化合物",
      "DNA 修复系统有缺陷",
      "细胞膜通透性缺陷引起迅速失水",
      "在阳光下使温度敏感性转移酶类失活",
      "因紫外线照射诱导了有毒力的前病毒",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA 修复系统有缺陷",
        "原书 A1 型选择题第 12 题答案 E，即 DNA 修复系统有缺陷。着色性干皮病是第一个与 DNA 损伤修复缺陷有关的人类疾病，病人的皮肤部位缺乏核酸内切酶，不能修复被紫外线损伤的皮肤 DNA，因而在日光照射后皮肤易被紫外线损伤并易发展为皮肤癌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch13-dna-repair-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "DNA 损伤修复系统中，属于易错修复的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "光修复",
      "切除修复",
      "重组跨越损伤修复",
      "核苷酸切除修复",
      "碱基切除修复",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "重组跨越损伤修复",
        "原书 A1 型选择题第 15 题答案 D，即重组跨越损伤修复。DNA 的跨越损伤修复（包括重组跨越损伤修复与合成跨越损伤修复/SOS 修复）是一种差错倾向性（易错）的 DNA 损伤修复方式，其中合成跨越复制过程会带给细胞很高的突变率。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-biochem-ch13-dna-repair-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "以人为例，简述碱基切除修复机制。",
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
        "碱基切除修复机制",
        "碱基切除修复依赖于生物体内存在的一类特异的 DNA 糖基化酶。整个修复过程包括：①识别水解——DNA 糖基化酶特异性识别 DNA 链中已受损的碱基并将其水解去除，产生一无碱基位点（AP 位点）；②切除——在此位点的 5'-端，用无碱基位点核酸内切酶将 DNA 链的磷酸二酯键切开，去除磷酸核糖部分，形成缺口；③合成——DNA 聚合酶在缺口处以另一条链为模板修补合成互补序列；④连接——由 DNA 连接酶将切口重新连接，DNA 恢复正常结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch13-dna-repair-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 DNA 损伤常见的修复机制及其修复对象。",
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
        "DNA 损伤常见的修复机制及其修复对象",
        "DNA 损伤常见的修复途径与其修复对象如下：①光复活修复，修复对象为嘧啶二聚体，由光复活酶参与；②碱基切除修复，修复对象为受损的碱基，由 DNA 糖基化酶、无嘌呤/无嘧啶核酸内切酶参与；③核苷酸切除修复，修复对象为嘧啶二聚体、DNA 螺旋结构改变，由 E. coli 中的 UvrA、UvrB、UvrC、UvrD 以及人的 XP 系列蛋白（XPA、XPB、XPC 等）参与；④错配修复，修复对象为复制或重组中碱基配对错误，由 E. coli 中 MutH、MutL、MutS 以及人的 MLH1、MSH2、MSH3、MSH6 等参与；⑤重组修复，修复对象为双链断裂，由 RecA 蛋白、Ku 蛋白、DNA-PKcs、XRCC4 参与；⑥损伤跨越修复，修复对象为大范围的损伤或复制中来不及修复的损伤，由 RecA 蛋白、LexA 蛋白、其他类型的 DNA 聚合酶参与。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-biochem-ch13-dna-repair-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: "（23～25 题共用备选答案）：",
    sharedChoices: [
      "光裂合酶",
      "DNA 糖基化酶",
      "RecA 蛋白",
      "MLH1",
      "XPE 蛋白",
    ],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-biochem-ch13-dna-repair-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "人的核苷酸切除修复中，识别 DNA 嘧啶二聚体的是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 4,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "XPE 蛋白",
            "原书 B1 型第 23 题答案 D，即 XPE 蛋白。在人的核苷酸切除修复中，XPE（DDB2）作为损伤识别因子参与识别螺旋扭曲和嘧啶二聚体等 DNA 损伤。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-biochem-ch13-dna-repair-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "参与 DNA 损伤错配修复的是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 3,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "MLH1",
            "原书 B1 型第 24 题答案 C，即 MLH1。在人的错配修复中，MLH1 与 PMS2 成异二聚体，是参与 DNA 错配修复的重要成员。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-biochem-ch13-dna-repair-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "同时参与重组修复与损伤跨越修复的是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 2,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "RecA 蛋白",
            "原书 B1 型第 25 题答案 A，即 RecA 蛋白。RecA 蛋白既参与重组修复（同源重组中的关键蛋白），也参与重组跨越损伤修复；同时 LexA 等也参与 SOS 损伤跨越修复。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
    ],
    sourceIds: [],
  },
];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];