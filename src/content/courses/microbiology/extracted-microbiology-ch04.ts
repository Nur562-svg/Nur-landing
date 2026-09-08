import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第04章 细菌的遗传与变异 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：5 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、填空题 5、选择题（A1 型 22 + B1 型 7 组 24 小题）与
 *   简答题 3。本文件按 15 道预算在原书顺序内取材：名词解释、填空各取前 3 道，简答取前
 *   2 道；选择题取 A1 第 1~5 题；B1 取第 6 组（42~43，2 成员）完整组以凑足预算。正确项
 *   对齐章末参考答案键号。OCR 错字与双栏错序已按微生物学医学语义恢复（如“力”→“为”、
 *   “转換”→“转换”等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch04-bacterial-genetics";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第04章 细菌的遗传与变异 习题（核对PDF 第39–44页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch04-bacterial-genetics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：质粒",
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
        "质粒",
        "质粒是细菌染色体外的遗传物质，具有自我复制的能力，一个质粒即为一个复制子（replicon）。质粒不是细菌生命活动不可缺少的遗传物质，质粒携带的遗传信息可赋予宿主菌某些特定生物学性状，如致育性、耐药性、致病性等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：插入序列",
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
        "插入序列",
        "插入序列是细菌中最简单的一类转座元件，其长度为数百个到两千核苷酸对，不携带任何与转位功能无关的已知基因，可双向插入，通过正、反向整合到基因组上。其共同特征：两侧末端有反向重复序列，编码一种参与转位作用的转位酶，识别反向重复序列，催化转座元件自基因组中解离。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：转化",
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
        "转化",
        "转化是指受体菌直接摄取供体菌的 DNA 片段而获得遗传性状的过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch04-bacterial-genetics-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细菌的成分中，染色体外的遗传物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["异染颗粒", "质粒", "tRNA", "菌毛", "mRNA"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "质粒",
        "质粒是细菌染色体外的遗传物质，为环状闭合双链 DNA，具有自我复制能力；tRNA、mRNA 为转录产物，异染颗粒为胞质颗粒，菌毛为表面结构，均非染色体外遗传物质。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细菌耐药基因可通过多种方式发生水平转移，其中 R 质粒转移的方式为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["转导", "接合", "转化", "溶原性转换", "转染"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "接合",
        "R 质粒由耐药传递因子（RTF）和耐药决定子组成，RTF 编码性菌毛、决定质粒的复制、接合及转移，R 质粒主要通过接合方式在细菌间转移，是耐药性传播的主要原因。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "棒状杆菌噬菌体基因组携带白喉毒素基因，当其感染白喉棒状杆菌无毒株后其基因组整合于染色体，细菌成为溶原性细菌，可产生白喉毒素，这种基因转移的方式称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["转导", "转化", "接合", "溶原性转换", "转染"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溶原性转换",
        "前噬菌体（整合于染色体的噬菌体基因组）携带的基因使细菌获得新的遗传性状（如产生白喉毒素），这种因溶原化导致细菌基因型和性状改变的方式称为溶原性转换。原书 A1 答案第 3 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "F 因子整合于细菌染色体后，可使其染色体发生水平转移，导致细菌的某些特性发生改变，染色体中整合有 F 因子的细菌称",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["耐药菌", "F⁺细菌", "Hfr 菌（高频重组菌）", "F⁻细菌", "溶原性细菌"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Hfr 菌（高频重组菌）",
        "F 因子（致育因子）整合于宿主菌染色体上时，该菌称为 Hfr 菌（高频重组菌），可通过接合使染色体基因发生高频转移。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "活 IIR 型链球菌（不产荚膜）与灭活 IIS 型链球菌（产荚膜）混合培养后，出现了可产生荚膜的活 IIS 型链球菌，这种基因转移方式称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["转导", "基因转位", "接合", "转化", "转染"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "转化",
        "这是经典的肺炎链球菌转化实验：受体菌直接摄取供体菌释放的游离 DNA 片段（含荚膜合成基因）而获得产生荚膜的新性状，称为转化。原书 A1 答案第 5 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch04-bacterial-genetics-fill001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "细菌的变异可分为___和___。",
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
        "表型变异；基因型变异",
        "细菌变异可分为表型变异（与环境因素变化有关，不涉及遗传物质改变）和基因型变异（与细菌遗传物质改变有关）。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-fill002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "医学上具有重要意义的质粒有___、___和___等。",
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
        "F质粒；R质粒；Vi质粒",
        "医学上具有重要意义的质粒包括致育质粒（F 质粒）、耐药质粒（R 质粒）和毒力质粒（Vi 质粒）等。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-fill003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "细菌基因组组成包括___、___和___等。",
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
        "染色体；质粒；移动元件（转座子、插入序列、整合子）",
        "细菌基因组包括染色体和（或）外源性 DNA（质粒、噬菌体的部分或全部基因组）以及可移动元件（插入序列、转座子、整合子）。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch04-bacterial-genetics-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述质粒的特点。",
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
        "质粒的特点",
        "①细菌染色体外的遗传物质，为环状闭合双链 DNA；②质粒具有自我复制的能力；③质粒所编码的产物赋予细菌某些性状特征；④质粒并非细菌生命所必需，可自行丢失、消除或转移。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch04-bacterial-genetics-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：导致细菌产生耐药的方式可能有哪些？",
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
        "细菌产生耐药的方式",
        "导致细菌产生耐药的方式有：转导、接合、基因突变、转化、溶原性转换等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（题组 42~43） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch04-bacterial-genetics-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["鞭毛", "普通菌毛", "性菌毛", "轴丝", "芽胞"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-microbiology-ch04-bacterial-genetics-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与接合作用有关的结构是",
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
            "性菌毛",
            "细菌通过性菌毛相互连接沟通，将遗传物质从供体菌转给受体菌，性菌毛是接合作用的结构基础。原书 B1 答案第 42 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch04-bacterial-genetics-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与细菌黏附有关的结构是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 1,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "普通菌毛",
            "普通菌毛数量多，与细菌黏附宿主细胞有关，是细菌侵袭力的重要因素。原书 B1 答案第 43 题为 B。",
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
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
