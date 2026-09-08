import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第46章 抗结核药及抗麻风病药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释题，termItems 为空数组）
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：5 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 3 组共 18 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 10、选择题（A1 型 10 + A2 型 3 + B1 型 3 组共
 *   18 小题）与简答题 6（本章无名词解释题）；本文件按 11 道预算取材：填空题取第
 *   1–5 题、A1 型题取第 1–5 题、简答题取第 1 题；填空题第 6–10 题、A2 型题
 *   （11–13）、B1 型题（14–31）及简答题第 2–6 题因预算未纳入。正确项对齐章末
 *   参考答案键号（A1 型题 1.B、2.C、3.A、4.E、5.E；本文件答案键号自 1–31
 *   连续编号），选项已随机重排并同步 correctChoiceIndex。OCR 错字已按药理学医学
 *   语义恢复（如 青莓素→青霉素、葯→药、桔红色→橘红色、肝肉→肝内、
 *   吡嗪酰胶/毗嗪酰胺→吡嗪酰胺、乙股丁醇→乙胺丁醇、链霉索→链霉素、
 *   Y-氨基丁酸→γ-氨基丁酸、造量→适量 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch46-antituberculosis-antileprosy";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第46章 抗结核药及抗麻风病药 习题（核对PDF 第297–302页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）：本章原书无名词解释题，导出空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "氨苯砜的常见不良反应是___和___。",
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
        "溶血性贫血；发绀",
        "氨苯砜为对麻风杆菌有较强抑制作用的抗麻风病药，常见不良反应为溶血性贫血和发绀。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "异烟肼在肝内乙酰化速度有明显的___和___差异，因此可分为___和___两种。",
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
        "人种；个体；快代谢型；慢代谢型",
        "异烟肼主要在肝内代谢成无活性的乙酰异烟肼和异烟酸等，其乙酰化率存在明显的人种和个体差异，分为快代谢型和慢代谢型，与其临床疗效和不良反应有关。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-fill003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "PAS 与利福平合用可___，两者不宜同时口服。",
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
        "抑制后者的吸收",
        "对氨水杨酸（PAS）与利福平合用可抑制利福平的吸收，两者不宜同时口服。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-fill004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "乙胺丁醇对___结核杆菌有较强的抑制作用。",
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
        "繁殖期",
        "乙胺丁醇具有高度抗菌选择性、抗菌活性强、穿透力强、不易产生耐药性等特点，对繁殖期结核杆菌有较强的抑制作用。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-fill005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "乙硫异烟胺的抗菌机制是___。",
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
        "阻碍细菌细胞壁的合成",
        "乙硫异烟胺为二线抗结核病药，其抗菌机制是阻碍细菌细胞壁的合成。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），5 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "各种类型结核病的首选药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["利福平", "链霉素", "乙胺丁醇", "异烟肼", "吡嗪酰胺"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "异烟肼",
        "异烟肼具有高度抗菌选择性、抗菌力强、穿透力强，为治疗各型结核病的首选药物。原书 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关异烟肼抗结核作用叙述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "穿透力强，易进入细胞内",
      "对结核菌有高度选择性",
      "结核菌不易产生耐药性",
      "抗结核作用强大",
      "有杀菌作用",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结核菌不易产生耐药性",
        "异烟肼抗结核作用强大、有杀菌作用、穿透力强、对结核菌有高度选择性，但结核菌易对异烟肼产生耐药性，故“结核菌不易产生耐药性”的叙述错误。原书 A1 型题第 2 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "主要毒性为球后视神经炎的抗结核病药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["利福平", "乙胺丁醇", "异烟肼", "链霉素", "吡嗪酰胺"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乙胺丁醇",
        "乙胺丁醇最主要的毒性是视神经炎（球后视神经炎），早发现并及时停药可消失。原书 A1 型题第 3 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "兼有抗结核病和抗麻风病的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["异烟肼", "罗红霉素", "乙胺丁醇", "氨苯砜", "利福平"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "利福平",
        "利福平主要用于各种类型结核病的初治及复治，对麻风杆菌也有较强抑制作用，故兼有抗结核病和抗麻风病作用。原书 A1 型题第 4 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于利福定的叙述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抗菌机制与利福平相同",
      "可用于治疗沙眼、急性结膜炎",
      "其严重不良反应为外周神经炎",
      "对麻风杆菌的作用比利福平稍强",
      "与利福平有交叉耐药性",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "其严重不良反应为外周神经炎",
        "利福定与利福平有交叉耐药性，抗菌机制与利福平相同，对麻风杆菌的作用比利福平稍强，可用于治疗沙眼、急性结膜炎；其严重不良反应并非外周神经炎（外周神经炎是异烟肼的典型不良反应）。原书 A1 型题第 5 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch46-antituberculosis-antileprosy-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述抗结核病药的用药原则。",
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
        "用药原则：早期用药、联合用药、全程用药、适量用药、坚持规律用药。",
        "由于抗结核病药不良反应较多，为取得较好的疗效，临床用药需遵循五项原则：早期、适量、联合、规律及全程用药。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 3 组共 18 小题，完整组超出剩余预算，导出空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
