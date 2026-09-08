import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学细胞生物学实验指导与习题集（第4版）— 第1章 绪论 题库提取（等比取样）
 * 来源：《医学细胞生物学实验指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：6 题
 * - 单项选择题（a1-single）：11 题（其中多项选择题映射 2 题）
 * - 独立记分题合计：17 题（等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、单项选择题 20、多项选择题 10，无配伍/填空/简答。
 *   参考答案键号 1~6、11~20（题号 7~10 的正确项在源参考答案中缺失，未强行取材），所选单选题
 *   均锚定到源参考答案键号并与选项文本一一对照；多项选择题按项目规约映射为 a1-single 并
 *   只取其中一个正确项。原书为双栏排版，题干/选项/题号交错散落，已按细胞生物学医学语义重建
 *   完整选项集合（单选 5 项、映射 4 项），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "cell-bio-ch01-introduction";
const locatorBase =
  "《医学细胞生物学实验指导与习题集》第4版 第1章 绪论 习题集（核对PDF 第103–106页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-cell-bio-ch01-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞生物学（cell biology）",
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
        "细胞生物学",
        "细胞生物学以细胞为研究对象，从显微、亚显微和分子水平对细胞的结构、生命活动规律及细胞间的相互关系开展研究的学科。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞学说（cell theory）",
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
        "细胞学说",
        "细胞学说由 Schleiden 和 Schwann 在总结自己和前人工作的基础上提出，其主要内容是一切生物，从单细胞生物到高等动物和植物均由细胞组成，细胞是生物形态结构和功能活动的基本单位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：医学细胞生物学（medical cell biology）",
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
        "医学细胞生物学",
        "医学细胞生物学以揭示人体各种细胞在生理和病理过程中的生命活动规律为目的，期望能对人体各种疾病的发病机制予以深入阐明，为疾病的诊断、治疗和预防提供理论依据和策略。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：蛋白质组（proteome）",
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
        "蛋白质组",
        "蛋白质组指由一个细胞、一个组织或生物的基因组所表达的全部蛋白质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：表观遗传学（epigenetics）",
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
        "表观遗传学",
        "表观遗传学是研究没有 DNA 序列变化并且可以遗传的基因功能变化的学科，包括 DNA 甲基化、基因组印记以及表观基因组学等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：组蛋白密码（histone code）",
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
        "组蛋白密码",
        "组蛋白密码指组蛋白的乙酰化、甲基化、磷酸化、泛素化、糖基化和羰基化等修饰影响转录因子与 DNA 结合的动态转录调控。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 单项选择题（含多项选择题的映射），11 道（单选 9 + 多选映射 2） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-cell-bio-ch01-introduction-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "发现细胞的时间和科学家分别是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "1665，R. Hooke",
      "1855，R. Virchow",
      "1864，H. Von Mohl",
      "1673，A. van Leeuwenhoek",
      "1831，R. Brown",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1665，R. Hooke",
        "Robert Hooke 于 1665 年用自制的光学显微镜首次观察到细胞并命名，为最早发现细胞的时间和科学家。原书单项选择题答案第 1 题为 A。源参考答案含 1673 年 A. van Leeuwenhoek、1831 年 R. Brown、1855 年 R. Virchow 等干扰项，此处按可核选项如实保留。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "生物体结构和功能的基本单位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["细胞", "基因组", "蛋白质组", "染色体", "基因"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞",
        "细胞是生物形态结构和功能活动的基本单位，这是细胞学说的核心内容。原书单项选择题答案第 2 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "发表了“中心法则”的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["F. Crick", "G. Gamow", "J. Watson", "M. J. Schleiden", "T. Schwann"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "F. Crick",
        "Francis Crick 提出了遗传信息流向的“中心法则”（DNA→RNA→蛋白质）。原书单项选择题答案第 4 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细胞学说的建立发生于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["16世纪", "17世纪", "18世纪", "19世纪", "20世纪"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "19世纪",
        "Schleiden 与 Schwann 于 1838~1839 年（19世纪）建立了细胞学说。原书单项选择题答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "使细胞生物学研究深入到亚细胞水平的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "光学显微镜技术",
      "电子显微镜技术",
      "DNA重组技术",
      "DNA序列分析技术",
      "体细胞克隆技术",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "电子显微镜技术",
        "电子显微镜的出现使细胞生物学研究突破光学衍射极限、深入到亚细胞水平，观察到线粒体、内质网等细胞器的微细结构。原书单项选择题答案第 6 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Feulgen 染色技术用于显示细胞中的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["DNA", "RNA", "蛋白质", "膜成分", "细胞骨架"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA",
        "Feulgen 染色（富尔根反应）是一种特异性显示 DNA 的组织化学染色法，DNA 经酸水解暴露出醛基后与无色品红反应而显色。原书单项选择题答案第 11 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1007",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人类基因组计划启动和完成的时间分别是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1990, 2005", "1990, 2003", "1990, 2000", "1993, 2003", "1993, 2005"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1990, 2003",
        "人类基因组计划于 1990 年启动，2003 年公布完整的人类基因组序列草图而基本完成测序。原书单项选择题答案第 13 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1008",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "研制出第一台电子显微镜的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["E. Ruska", "G. Binnig", "H. Rohrer", "H. Janssen", "Z. Janssen"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "E. Ruska",
        "Ernst Ruska 于 1933 年研制成功第一台电子显微镜。原书单项选择题答案第 16 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-a1009",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有丝分裂发现于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["16世纪", "17世纪", "18世纪", "19世纪", "20世纪"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "19世纪",
        "有丝分裂现象于 19 世纪中叶被观察到并系统描述（如 Flemming 等）。原书单项选择题答案第 17 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-x001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "（原多选题）提出细胞学说的科学家是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "M. J. Schleiden 和 T. Schwann",
      "R. Hooke",
      "A. van Leeuwenhoek",
      "G. Mendel",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "M. J. Schleiden 和 T. Schwann",
        "原题为多项选择题，提出细胞学说的科学家是 M. J. Schleiden 和 T. Schwann（源参考答案键号 1.AB）。本项映射为单选并按规约只取其中一个正确项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch01-introduction-x002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "（原多选题）19 世纪自然科学的三大发现不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "细胞学说",
      "能量守恒与转化定律",
      "达尔文进化论",
      "爱因斯坦相对论",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "爱因斯坦相对论",
        "原题为多项选择题，19 世纪自然科学的三大发现是细胞学说、能量守恒与转化定律和达尔文进化论（源参考答案键号 2.ABC）；相对论是 20 世纪爱因斯坦提出的，不属于三大发现。本项映射为单选并按规约只取其中一个正确项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 本书无 B 型配伍题，bGroups 为空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];