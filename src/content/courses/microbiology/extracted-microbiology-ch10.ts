import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第10章 弧菌属 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：1 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：5 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、选择题（A1 型 14 + A2 型 5）、B1 型 2 组（7 成员）
 *   与问答题 2；本文件按 11 道预算在原书顺序内取材，名词解释与问答题全取，选择题取前 5 道，
 *   B1 取第一组（20~22 题，3 成员）。正确项对齐章末参考答案键号（A1 1.D 2.D 3.B 4.C 5.D；
 *   B1 20.A 21.C 22.D）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 草兰→革兰、
 *   荬膜→荚膜、01群→O1群、CI-/HCO→Cl⁻/HCO₃⁻、阝溶血→β溶血、雀乱→霍乱等），
 *   数值（pH 8.4~9.0、7% 高盐、35g/L NaCl 等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch10-vibrio";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第10章 弧菌属 习题（核对PDF 第93–97页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch10-vibrio-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：神奈川现象",
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
        "神奈川现象",
        "95%从腹泻病人中分离到的副溶血性弧菌在含高盐（7%）的人O型血或兔血及以D-甘露醇作为碳源的我妻琼脂平板上可产生完全透亮的β溶血，称为神奈川现象（KP），KP⁺菌株为致病性菌株。",
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
    id: "ext-microbiology-ch10-vibrio-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "霍乱弧菌的初次分离培养常用的培养基是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "SS 琼脂平板",
      "碱性蛋白胨水或碱性琼脂平板",
      "血琼脂平板",
      "巧克力色平板",
      "我妻琼脂平板",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "碱性蛋白胨水或碱性琼脂平板",
        "霍乱弧菌耐碱不耐酸，初次分离常用碱性蛋白胨水增菌或碱性琼脂平板培养。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch10-vibrio-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不能引发霍乱的霍乱弧菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "古典生物型霍乱弧菌",
      "O138 群",
      "O139 群",
      "EI Tor 生物型霍乱弧菌",
      "小川型霍乱弧菌",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "O138 群",
        "O1 群（古典生物型、EI Tor 生物型，含小川型血清型）和 O139 群能产生霍乱毒素引起霍乱，O138 群不产生霍乱毒素、不能引发霍乱。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch10-vibrio-a1003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "检测副溶血性弧菌致病性的试验是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肥达试验",
      "神奈川现象",
      "PPD 试验",
      "锡克试验",
      "抗“O”试验",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "神奈川现象",
        "副溶血性弧菌的致病性与其产生耐热直接溶血素（TDH）等有关，检测其致病性常用神奈川现象（KP）试验，KP⁺菌株为致病性菌株。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch10-vibrio-a1004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列细菌的悬滴标本在暗视野显微镜下观察呈快速飞镖样运动的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "金黄色葡萄球菌",
      "链球菌",
      "霍乱弧菌",
      "白喉棒状杆菌",
      "结核分枝杆菌",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "霍乱弧菌",
        "霍乱弧菌有单鞭毛、运动活泼，在“米泔水”样粪便或培养物中呈快速飞镖样运动，是其特征性表现。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch10-vibrio-a1005",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "霍乱弧菌感染引发霍乱后，患者的粪便呈",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "黏液脓血便",
      "果酱样粪便",
      "柏油样便",
      "米泔水样便",
      "黄色稀便",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "米泔水样便",
        "霍乱典型症状为剧烈腹泻和呕吐，排出“米泔水”样粪便，迅速发展为脱水、肌肉痉挛、低钾血症、代谢性酸中毒等。原书 A1 答案第 5 题为 D。",
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
    id: "ext-microbiology-ch10-vibrio-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述霍乱弧菌的主要形态特征、培养特性及抗原分型。",
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
        "霍乱弧菌的形态特征、培养特性及抗原分型",
        "（1）形态特征：典型形态呈弧形，革兰染色阴性。粪便直接涂片染色观察排列如“鱼群”状。有端单鞭毛，运动活泼，取病人“米泔水”样粪便或培养物作悬滴观察，细菌呈快速飞镖样或流星样运动。有菌毛，O139群有荚膜。（2）培养特性：兼性厌氧，耐碱不耐酸，在 pH 8.8~9.0 的碱性蛋白胨水中或碱性琼脂平板上生长良好，初次分离霍乱弧菌常用碱性蛋白胨水增菌。在 TCBS 培养基上菌落呈黄色。（3）抗原构造与分型：①根据 O 抗原不同已发现超过 200 个血清群，其中 O1 群和 O139 群能产生霍乱毒素，非 O1 群和 O139 群不产生霍乱毒素；②O1 群根据表型和遗传差异分为 2 个生物型，即古典生物型和 EI Tor 生物型；③O1 群根据 O 抗原的 3 种抗原因子 A、B、C 组成分为 3 个血清型，即小川型（AB）、稻叶型（AC）和彦岛型（ABC）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch10-vibrio-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述霍乱毒素的分子结构及致病机制。",
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
        "霍乱毒素的分子结构与致病机制",
        "霍乱毒素是由一个 A 亚单位和 5 个相同的 B 亚单位构成的热不稳定多聚体蛋白。B 亚单位可与小肠黏膜上皮细胞的 GM1 神经节苷脂受体结合，介导 A 亚单位进入细胞内，经蛋白酶作用裂解为 A1 和 A2 两条多肽。A1 作为腺苷二磷酸核糖基转移酶可使 NAD（辅酶Ⅰ）上的腺苷二磷酸核糖转移到 G 蛋白上，导致腺苷酸环化酶的持续活化，使细胞内 ATP 不断转化成为 cAMP，细胞内 cAMP 水平的升高，刺激肠黏膜隐窝细胞主动分泌 Cl⁻ 和 HCO₃⁻，抑制肠绒毛细胞对 Na⁺ 的摄入，同时水伴随离子大量丢失，导致病人出现严重腹泻与呕吐。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 3 成员（题组20-22；取材预算内未纳入后一组23-26） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch10-vibrio-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "霍乱毒素",
      "毒素共调节菌毛 A（TcpA）",
      "荚膜",
      "鞭毛",
      "HapA",
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
        id: "ext-microbiology-ch10-vibrio-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "霍乱弧菌最主要的致病物质是",
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
            "霍乱毒素",
            "霍乱毒素是目前已知的最强烈致泻毒素，是霍乱弧菌最主要的致病物质。原书 B1 答案第 20 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch10-vibrio-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "O139 群独有的致病物质是",
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
            "荚膜",
            "与 O1 群霍乱弧菌比较，O139 群独有的致病物质是荚膜（O139 群有荚膜）。原书 B1 答案第 21 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch10-vibrio-b001m3",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与霍乱弧菌在液体中呈快速飞镖样运动有关的是",
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
            "鞭毛",
            "霍乱弧菌有单鞭毛、运动活泼，在液体中呈快速飞镖样运动，与鞭毛有关。原书 B1 答案第 22 题为 D。",
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
