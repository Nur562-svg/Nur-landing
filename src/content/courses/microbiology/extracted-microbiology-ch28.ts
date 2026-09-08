import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第28章 肝炎病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：5 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：2 组、共 7 个成员
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、选择题（A1 型 20 + A2 型 2）、B1 型 11 组（共 38 成员）
 *   与简答题 2，无填空。本文件按 18 道预算取样，名词解释与简答题全取，选择题取 A1 第 1~5 题，
 *   B1 取第 1 组（23~24 题，2 成员）与第 2 组（25~29 题，5 成员）完整组。正确项对齐章末
 *   参考答案键号（A1 1.B 2.D 3.D 4.B 5.A；B1 23.D 24.C 25.E 26.D 27.C 28.A 29.A）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如 HBSAg→HBsAg、HBEAg→HBeAg、
 *   HBCAg→HBcAg、皿型超敏反应→III 型超敏反应、沩→为 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch28-hepatitis-viruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第28章 肝炎病毒 习题（核对PDF 第211–219页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Dane 颗粒",
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
        "Dane 颗粒",
        "Dane 颗粒：存在于 HBV 感染者血液中的结构完整、有感染性的 HBV 颗粒。由 Dane 首先发现，故又称 Dane 颗粒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：HBsAg",
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
        "HBsAg",
        "HBsAg：乙肝病毒的主要表面抗原，可存在于 Dane 颗粒的外衣壳、小球形颗粒、管形颗粒以及肝细胞表面，是 HBV 感染的主要标志，是制备疫苗的主要成分，其相应抗体具有中和作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：HBeAg",
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
        "HBeAg",
        "HBeAg：由 HBV 的 Pre-C 和 C 基因编码产生 Pre-C 蛋白，Pre-C 蛋白经加工切割后形成 HBeAg，并分泌到血循环中，是一种可溶性蛋白，为非结构蛋白。HBeAg 阳性表示 HBV 在体内复制，血液传染性强。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：HDV",
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
        "HDV",
        "HDV：即丁型肝炎病毒，是一种缺陷病毒，需在 HBV 或其他嗜肝 DNA 病毒辅助下才能复制，其包膜蛋白为乙肝病毒编码的 HBsAg，感染后可引起急、慢性肝炎或成为无症状携带者。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于 DNA 病毒的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["HAV", "HBV", "HCV", "HDV", "HEV"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "HBV",
        "乙型肝炎病毒（HBV）基因组为不完全双链环状 DNA，属于 DNA 病毒；HAV、HCV、HDV、HEV 均为 RNA 病毒。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于缺陷病毒的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["HAV", "HBV", "HCV", "HDV", "HEV"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "HDV",
        "丁型肝炎病毒（HDV）是一种缺陷病毒，必须与 HBV 等嗜肝 DNA 病毒共生时才能复制。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肝炎病毒与传播途径组合错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "甲型肝炎病毒—粪-口途径传播",
      "乙型肝炎病毒—血源性传播",
      "丙型肝炎病毒—血源性传播",
      "丁型肝炎病毒—粪-口途径传播",
      "戊型肝炎病毒—粪-口途径传播",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "丁型肝炎病毒—粪-口途径传播",
        "HDV 为缺陷病毒，其传播途径与乙型肝炎病毒相似，主要经血源性传播、母婴传播、性传播和密切接触传播，而非粪-口途径传播，故该组合错误。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Dane 颗粒是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "完整的 HAV 颗粒",
      "完整的 HBV 颗粒",
      "完整的 HCV 颗粒",
      "HBV 小球形颗粒",
      "完整的 HDV 颗粒",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "完整的 HBV 颗粒",
        "Dane 颗粒是存在于 HBV 感染者血液中的结构完整、有感染性的 HBV 颗粒，即大球形颗粒。原书 A1 答案第 4 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "HBV 包膜上的 S 蛋白的成分是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "HBsAg",
      "HBsAg+PreS2Ag",
      "PreS1Ag",
      "PreS2Ag",
      "HBsAg+PreS1Ag+PreS2Ag",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "HBsAg",
        "S 基因编码产生 S 蛋白即 HBsAg，是 HBV 包膜上的主要表面抗原成分。原书 A1 答案第 5 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 HBV 的 Dane 颗粒的形态结构及抗原组成。",
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
        "HBV 的 Dane 颗粒的形态结构及抗原组成",
        "完整的具感染性的 HBV 颗粒呈球形，直径 42nm，又称 Dane 颗粒，包括：①核心内部：含基因组核酸和 DNA 多聚酶，核酸为双链环状 DNA；②内层：相当于病毒核衣壳，核心表面衣壳蛋白为 HBcAg；③外层：相当于包膜，由脂质双层与病毒编码的包膜蛋白组成，含 HBsAg、PreS1 和 PreS2。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述 HBV 血清标志物检测的主要指标及其临床意义。",
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
        "HBV 血清标志物检测的主要指标及其临床意义",
        "HBV 的血清标志物检测，主要包括抗原抗体检测和病毒核酸检测。抗原抗体检测主要是“两对半”，即 HBsAg 和抗-HBs、HBeAg 和抗-HBe 以及抗-HBc。HBsAg 是 HBV 感染的指标，是筛选献血员的必检指标；抗-HBs 是 HBV 的特异性中和抗体，表示对乙肝有免疫力；HBeAg、抗-HBc IgM 阳性表示 HBV 在体内复制，传染性强，抗-HBe 阳性表示 HBV 复制能力减弱，传染性降低。病毒核酸检测主要采用 PCR 或 qPCR 法检测 HBV DNA，感染者血清 HBV DNA 出现早，在慢性感染者中 HBV DNA 可持续阳性，检出 HBV DNA 是病毒复制和传染性的最可靠的指标。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），2 组 × 7 成员（题组23-24 与 25-29；预算内未纳入后续组） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "抗-HBe",
      "抗-HBc IgG",
      "抗-HBc IgM",
      "抗-HBs",
      "抗-PreC",
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
        id: "ext-microbiology-ch28-hepatitis-viruses-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "为中和抗体，能保护机体免受 HBV 感染的是",
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
            "抗-HBs",
            "抗-HBs 是 HBV 的特异性中和抗体，能保护机体免受 HBV 感染。原书 B1 答案第 23 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch28-hepatitis-viruses-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "提示 HBV 在体内处于复制状态（急性乙型肝炎或慢性乙肝急性发作）的抗体是",
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
            "抗-HBc IgM",
            "抗-HBc IgM 阳性提示 HBV 处于复制状态，具有强的传染性。原书 B1 答案第 24 题为 C。",
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
  {
    id: "ext-microbiology-ch28-hepatitis-viruses-b002",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["HAV", "HBV", "HCV", "HDV", "HEV"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-microbiology-ch28-hepatitis-viruses-b002m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "孕妇感染后死亡率高的肝炎病毒是",
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
            "HEV",
            "戊型肝炎病毒（HEV）感染孕妇后病情较重，死亡率高。原书 B1 答案第 25 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch28-hepatitis-viruses-b002m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "复制时需要嗜肝 DNA 病毒辅助的病毒是",
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
            "HDV",
            "HDV 为缺陷病毒，复制时必须与 HBV 等嗜肝 DNA 病毒共生。原书 B1 答案第 26 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch28-hepatitis-viruses-b002m3",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可用直接抗病毒药物治疗的病毒是",
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
            "HCV",
            "丙型肝炎病毒（HCV）感染可用直接抗病毒药物（DAAs）治疗。原书 B1 答案第 27 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch28-hepatitis-viruses-b002m4",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "多感染儿童，以隐性感染为主的病毒是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 0,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "HAV",
            "甲型肝炎病毒（HAV）多感染儿童，以隐性感染多见，感染后获得持久免疫力。原书 B1 答案第 28 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch28-hepatitis-viruses-b002m5",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可用灭活疫苗和减毒活疫苗来预防的是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 0,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "HAV",
            "甲型肝炎（HAV）可用减毒活疫苗和灭活疫苗预防。原书 B1 答案第 29 题为 A。",
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
