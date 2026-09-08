import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第5章 补体系统 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：10 题（本章所选均为 A1 型，未取 A2 病例题；本章 A2 少见）
 * - 问答题（short-answer）：2 题
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 7、填空题 6、选择题（A1 型、少量 B1 配伍）、问答题 4；
 *   按预算等比取材，选用源参考答案可唯一锚定正确项的清晰题。B1 配伍题按契约不提取为
 *   独立记分题（bGroups 为空）。OCR 错字与双栏错序已按免疫学医学语义恢复（补体分子符号
 *   C1q/C1r/C1s/C4b2a/C3bBb/C3bBb3b/C5b6789(MAC)、C1INH、C4bp 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch05-complement";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第5章 补体系统 习题（核对PDF 第54–61页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch05-complement-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：补体系统",
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
        "补体系统",
        "补体系统（complement system）广泛存在于血清、组织液和细胞膜表面，是一个具有精密调控机制的蛋白质反应系统，其活化过程表现为一系列丝氨酸蛋白酶的级联酶解反应，是机体免疫防御的第一道防线。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：调理作用",
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
        "调理作用",
        "补体激活过程中产生的 C3b、C4b 和 iC3b 可与中性粒细胞或巨噬细胞表面相应受体如 CR1（C3b/C4bR）结合，促进吞噬细胞对病原微生物的吞噬及杀伤作用，称为调理作用（opsonization）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch05-complement-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "经典激活途径中，补体成分激活顺序是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "C1→C2→C3→C4→C5~9",
      "C3→C4→C2→C1→C5~9",
      "C2→C4→C3→C1→C5~9",
      "C1→C4→C2→C3→C5~9",
      "C4→C2→C1→C3→C5~9",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C1→C4→C2→C3→C5~9",
        "经典途径按 C1（C1q→C1r→C1s）→C4→C2→C3→C5~9 的顺序连锁激活，依次形成 C4b2a（C3 转化酶）和 C4b2a3b（C5 转化酶）。原书 A1 第 1 题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "补体固有成分中，血清含量最高的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["C3", "C4", "C1q", "C2", "C5"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C3",
        "C3 是补体系统中血清含量最高的成分，也是三条途径的共同成分。原书 A1 第 3 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "三条补体激活途径的共同点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "参与的补体成分相同",
      "所需离子相同",
      "C3 转化酶的成分相同",
      "激活物相同",
      "攻膜复合体的形成及其溶解细胞的作用相同",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "攻膜复合体的形成及其溶解细胞的作用相同",
        "三条途径激活物、参与成分和 C3 转化酶均不同，但都以 C5 转化酶裂解 C5 进入共同末端通路，最终形成攻膜复合体（MAC）溶解靶细胞，这是它们的共同点。原书 A1 第 6 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "补体三条激活途径均参与的成分是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["B 因子", "C1", "C2", "C3", "C4"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C3",
        "C3 是三条激活途径共同的关键成分：经典途径和凝集素途径均形成 C3 转化酶裂解 C3，旁路途径更是以 C3 为核心成分。C1、C2、C4 仅参与经典/凝集素途径，B 因子仅参与旁路途径。原书 A1 第 7 题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于补体，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "是一组具有酶活性的脂类物质",
      "对热稳定",
      "具有溶菌作用，但无炎症介质作用",
      "参与免疫病理作用",
      "C1 在血清中含量最高",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "参与免疫病理作用",
        "补体是血清中的蛋白质（多属 β 球蛋白），对热不稳定（56℃ 30 分钟灭活），既有溶菌作用又有炎症介质作用，血清含量最高的是 C3。补体过度活化可介导免疫病理损伤。原书 A1 第 8 题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可刺激肥大细胞脱颗粒、释放活性介质的成分是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["C1q", "C5a", "C3b", "C4b", "C1s"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C5a",
        "C3a、C4a、C5a 为过敏毒素，可与肥大细胞、嗜碱性粒细胞表面受体结合激发脱颗粒释放组胺等活性介质，其中 C5a 的过敏毒素作用最强。原书 A1 第 9 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "激活补体能力最强的 Ig 是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgG", "IgE", "sIgA", "IgA", "IgM"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgM",
        "IgM 为五聚体，含多个补体结合位点，激活补体（经典途径）的能力最强；IgM、IgG1~IgG3 能激活补体，sIgA、IgE、IgD 不能。原书 A1 第 13 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1008",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能通过经典途径激活补体的 Ig 是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgA、IgG", "IgE、IgM", "sIgA、IgD", "IgA、IgM", "IgM、IgG"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgM、IgG",
        "经典途径主要由 IgG 或 IgM 型抗体与抗原结合形成的免疫复合物所启动，二者均可激活补体经典途径。原书 A1 第 14 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1009",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "参与凝集素途径的成分是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["凝聚的 IgA", "IgG1~IgG3", "IgM", "FCN", "IgG4"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "FCN",
        "凝集素途径由曼（甘）露糖结合凝集素（MBL）或纤维胶原素（FCN）识别病原体表面糖结构启动，因此 FCN 是参与凝集素途径的成分。原书 A1 第 19 题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-a1010",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抑制 C1 酯酶活性的补体调节因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["H 因子", "I 因子", "C1INH", "DAF", "P 因子"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C1INH",
        "C1 抑制物（C1INH）通过与活化的 C1s 结合，抑制 C1 的酯酶/丝氨酸蛋白酶活性，阻止经典途径过度活化；C1INH 缺陷可导致遗传性血管神经性水肿。原书 A1 第 22 题答案 C。",
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
    id: "ext-immunology-ch05-complement-fill001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "补体系统由___、___和___组成。",
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
        "补体固有成分、补体调节蛋白、补体受体",
        "补体系统由补体固有成分（经典途径 C1q、C1r、C1s、C4、C2，旁路途径 B 因子、D 因子，凝集素途径 MBL、FCN、MASP 以及共同末端 C3、C5~C9）、补体调节蛋白（备解素、C1INH、I 因子、H 因子、C4bp、DAF 等）和补体受体（CR1~CR5 等）组成。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-fill002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "补体固有成分对热不稳定，通常加热到___，作用___即可灭活。",
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
        "56℃；30 分钟",
        "补体多为对热不稳定的蛋白质，56℃ 加热 30 分钟即可灭活，这一特性常用于实验中灭活补体。原书填空题第 3 题答案。",
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
    id: "ext-immunology-ch05-complement-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：补体激活有哪三条途径？各自的生物学意义如何？",
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
        "补体激活的三条途径：经典途径、旁路途径、凝集素途径。①经典途径：主要由 IgG 或 IgM 型抗体与抗原结合形成的免疫复合物（IC）启动，在感染后期（恢复期）发挥作用，并参与抵御相同病原体的再次感染；②旁路途径：由自发产生的 C3b 黏附在细菌、真菌或病毒感染细胞表面所启动，无需抗体即可激活补体，故在抗体产生之前的感染早期或初次感染中发挥作用；③凝集素途径：由 MBL 和 FCN 识别多种病原微生物表面的甘露糖、岩藻糖等糖结构所启动，同样不需抗体，在感染早期或初次感染中发挥作用。三条途径均进入共同末端通路，组装 MAC 溶解靶细胞。",
        "解析：三途径区别在于启动方式和参与成分：经典途径依赖抗体（C1、C4、C2、C3），旁路途径不经 C1、C4、C2（由 C3、B、D 因子参与），凝集素途径由 MBL/FCN 和 MASP 启动、其后与经典途径相同。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch05-complement-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：补体有哪些生物学功能？",
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
        "补体活化的共同终末效应是在靶细胞膜上组装攻膜复合体（MAC）介导细胞溶解效应；同时活化过程中生成多种活性片段，通过与细胞膜相应受体结合介导多种生物功能。主要包括：①细胞毒作用，由膜攻击复合体（MAC）介导溶解靶细胞；②吞噬调理作用，由 C3b、C4b、iC3b 等片段直接结合于细菌或其他颗粒物质表面后所为；③炎症反应，由 C5a、C3a 和 C4a 等片段与肥大细胞或嗜碱性粒细胞表面相应受体结合后介导（C5a 还有趋化中性粒细胞作用）；④免疫黏附（黏附清除免疫复合物）作用，由红细胞表面 CR1 结合黏附 IC 的 C3b 所介导，起到清除可溶性免疫复合物的作用。",
        "解析：补体发挥溶菌杀菌、调理吞噬、炎症介质、清除免疫复合物等作用，但也可能溶解自身细胞或过度介导炎症造成组织损伤，参与多种免疫病理过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题：本书以 A1 型为主，本章未提取 B1 独立记分题，bGroups 置空。 */
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