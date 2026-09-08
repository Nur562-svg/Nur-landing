import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第1章 药理学总论—绪言 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：1 题
 * - 问答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、填空题 8、选择题（A1 型 5 + A2 型 3 + B1 型 1 组共 2 小题）
 *   与简答题 2；本文件按 8 道预算在原书顺序内取材。A1/A2 按项目规约映射为 a1-single，
 *   正确项对齐章末参考答案键号（A1 型题 3.D）；选项已随机重排并同步 correctChoiceIndex。
 *   OCR 错字与符号已按药理学医学语义恢复（如 葯→药、I期/II期/III期/IV期 临床试验期数），
 *   数值（20～30例、100例、300例、365、844 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch01-introduction";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第1章 药理学总论—绪言 习题（核对PDF 第6–9页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch01-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：药物",
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
        "药物",
        "是指可以改变或查明机体的生理功能及病理状态，可用以预防、诊断和治疗疾病的物质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch01-introduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：药理学",
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
        "药理学",
        "是研究药物与机体（含病原体）相互作用及作用规律的学科，既研究药物对机体的作用及作用机制（药物效应动力学），也研究药物在机体的影响下所发生的变化及其规律（药物代谢动力学）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），2 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch01-introduction-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "药理学是研究药物与___相互作用及___的学科，包括___和___。",
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
        "机体；病原体；作用规律；药物效应动力学；药物代谢动力学",
        "药理学研究药物与机体（含病原体）的相互作用及作用规律，其中研究药物对机体作用及作用机制的学科称药物效应动力学，研究机体影响下药物变化及其规律的学科称药物代谢动力学。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch01-introduction-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "我国最早的药学著作《___》，收载药物___种；我国第一部由政府颁发的“药典”是《___》，收载药物___种。",
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
        "神农本草经；365；新修本草；844",
        "《神农本草经》是我国现存最早的药学著作，收载药物 365 种；唐代《新修本草》（又称《唐本草》）是我国第一部由政府颁发的药典，收载药物 844 种。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch01-introduction-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "我国由政府颁布的最早的药物学著作是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["《本草纲目》", "《新修本草》", "《神农本草经》", "《黄帝内经》", "《千金方》"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "《新修本草》",
        "《新修本草》是唐代由政府组织颁布的药物学著作，是我国第一部由政府颁发的药典；《神农本草经》是最早的本草学著作，《本草纲目》是代表我国古代药物学最高成就的著作。原书 A1 型题第 3 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch01-introduction-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述新药研究过程的三个阶段。",
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
        "临床前研究、临床研究和上市后药物监测三个阶段",
        "新药研究过程主要分为临床前研究、临床研究和上市后药物监测三个阶段。临床前研究主要由药物化学和药理学相关内容组成；临床研究一般分四期（I 期至 IV 期）；上市后药物监测（售后调研）在药品广泛长期使用条件下继续考察其疗效和不良反应。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch01-introduction-b001",
    order: 7,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "临床药理学",
      "实验药理学",
      "药物代谢动力学",
      "药物治疗学",
      "药物效应动力学",
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
        id: "ext-pharmacology-ch01-introduction-b001m1",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "研究药物在机体的影响下发生的变化及规律的科学是",
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
            "药物代谢动力学",
            "药物代谢动力学（药动学）研究药物在机体影响下发生的变化及其规律，即药物在体内的吸收、分布、代谢和排泄过程。原书 B1 型题第 9 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch01-introduction-b001m2",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "以健康志愿者为对象，研究药物的药效学和药动学等并评价药物安全性的学科是",
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
            "临床药理学",
            "临床药理学以健康志愿者或患者为研究对象，研究药物的药效学、药动学及药物安全性，为临床合理用药提供依据。原书 B1 型题第 10 题，参考答案键号 E。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
