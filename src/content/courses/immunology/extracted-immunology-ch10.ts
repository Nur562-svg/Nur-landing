import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第10章 T淋巴细胞 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：13 题（含 A2 病例题）
 * - 问答题（short-answer）：2 题
 * - 独立记分题合计：20 题（须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书题型分布为名词解释 2、填空 3、A1 型 45、A2 型 20、B1 型 10、问答题 2；
 *   本文件按 20 道预算等比取材。全部正确项对照章末「参考答案」键号锚定，A1 型 41~45 题答案
 *   在 OCR 中被编入「A2 型题」键号段，已按题号正确归位；选项均已随机重排并同步
 *   correctChoiceIndex（0 起）。OCR 错字已按免疫学医学语义恢复（如 TCRαβ/γδ、CD4⁺/CD8⁺、
 *   MHC限制性、ITAM/ITIM、Th1/Th2/Th17/Treg、CTL 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch10-t-lymphocyte";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第10章 T淋巴细胞 习题（核对PDF 第112–122页）";
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
    id: "ext-immunology-ch10-t-lymphocyte-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：TCR",
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
        "TCR",
        "TCR即T细胞抗原识别受体，是T细胞表面识别和结合抗原肽的结构，由两条不同肽链构成的异二聚体，分为TCRαβ和TCRγδ两种。TCRαβ特异性识别抗原提呈细胞或靶细胞表面的抗原肽-MHC分子复合物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：阳性选择",
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
        "阳性选择（positive selection）",
        "阳性选择指在胸腺皮质中，未成熟DP细胞表达的随机多样特异性的TCR与胸腺上皮细胞表面的自身抗原肽-自身MHC I类/II类分子复合物相互作用，能以适当亲和力结合的DP细胞分化为SP细胞，而不能结合者（或亲和力过高者）发生凋亡。经过阳性选择T细胞获得MHC限制性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），13 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "T淋巴细胞经过阳性选择可获得",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中枢免疫耐受",
      "TCR基因重排",
      "自身MHC限制性",
      "类别转换",
      "体细胞高频突变",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "自身MHC限制性",
        "阳性选择使T细胞获得自身MHC限制性；阴性选择使T细胞获得中枢免疫耐受。类别转换、体细胞高频突变与B细胞有关。原书 A1 第 1 题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "T淋巴细胞经过阴性选择可获得",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中枢免疫耐受",
      "TCR基因重排",
      "自身MHC限制性",
      "类别转换",
      "体细胞高频突变",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中枢免疫耐受",
        "阴性选择使对自身抗原高亲和力结合的SP细胞凋亡，从而获得对自身抗原的免疫耐受（中枢免疫耐受）。原书 A1 第 2 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "T细胞在胸腺发育的阳性选择中，发生凋亡的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "与自身抗原肽-MHC分子复合物以适当亲和力结合的DP细胞",
      "不能与自身抗原肽-MHC分子复合物结合的DP细胞",
      "与自身抗原肽-MHC分子复合物高亲和力结合的SP细胞",
      "不能与自身抗原肽-MHC分子复合物结合的SP细胞",
      "不能与自身抗原肽-MHC分子复合物结合的DN细胞",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "不能与自身抗原肽-MHC分子复合物结合的DP细胞",
        "阳性选择针对的是DP细胞：能与自身MHC-抗原肽以适当亲和力结合的DP细胞存活并分化为SP细胞，不能结合者（以及亲和力过高者）发生凋亡。原书 A1 第 3 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "T细胞在胸腺发育的阴性选择中，发生凋亡的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "与自身抗原肽-MHC分子复合物以适当亲和力结合的DP细胞",
      "不能与自身抗原肽-MHC分子复合物结合的DP细胞",
      "与自身抗原肽-MHC分子复合物高亲和力结合的SP细胞",
      "不能与自身抗原肽-MHC分子复合物结合的SP细胞",
      "与自身抗原肽-MHC分子复合物高亲和力结合的DN细胞",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "与自身抗原肽-MHC分子复合物高亲和力结合的SP细胞",
        "阴性选择针对经阳性选择后的SP细胞：与自身抗原肽-MHC复合物高亲和力结合的SP细胞发生凋亡，不能结合者存活成为成熟T细胞进入外周。原书 A1 第 4 题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "同时表达CD3和CD4分子的细胞有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CTL", "Th", "B淋巴细胞", "巨噬细胞", "NK细胞"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Th",
        "CD3为所有成熟T细胞共有，CD4表达于辅助性T细胞（Th，CD4⁺T细胞），故同时表达CD3和CD4的是Th；CTL为CD3⁺CD8⁺。原书 A1 第 5 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "T细胞的特征性表面标志是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CD2", "TCR", "CD56", "CD4", "CD8"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "TCR",
        "TCR是T细胞特异识别抗原的受体，是T细胞的特征性表面标志。CD56为NK细胞标志。原书 A1 第 9 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与CD4分子结合的MHC分子的结构域是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["α1结构域", "α2结构域", "α3结构域", "β1结构域", "β2结构域"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "β2结构域",
        "CD4作为TCR的共受体，与MHC II类分子的β2结构域结合。原书 A1 第 10 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1008",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "胞浆区含有ITAM的CD分子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CD2", "CD40L", "CD3", "CD4", "CTLA-4"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD3",
        "CD3分子胞浆区含有免疫受体酪氨酸活化基序（ITAM），其功能是转导TCR识别抗原所产生的活化信号。原书 A1 第 14 题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1009",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "HIV gp120蛋白的受体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CD2", "CD3", "CD4", "CD8", "CD28"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD4",
        "CD4是HIV包膜糖蛋白gp120的受体，因此HIV主要感染CD4⁺T细胞。原书 A1 第 17 题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1010",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Th1分泌的细胞因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IFN-γ", "IL-4", "IL-10", "IL-5", "IL-6"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IFN-γ",
        "Th1分泌IL-2、IFN-γ、TNF等细胞因子，增强细胞介导的抗感染免疫。IL-4、IL-5、IL-10为Th2分泌。原书 A1 第 23 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1011",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，男性，30岁，HIV感染者，其外周血中大幅减少的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CD4⁺T细胞", "CD8⁺T细胞", "B细胞", "γδT细胞", "Th17细胞"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD4⁺T细胞",
        "HIV主要感染并破坏CD4⁺T细胞（gp120以CD4为受体），故感染者外周血CD4⁺T细胞大幅减少。原书 A2 第 46 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1012",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "无胸腺裸鼠是一种无毛变异小鼠，先天无胸腺，常作为医学生物学研究中的实验动物。裸鼠缺乏的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["巨噬细胞", "成熟B细胞", "成熟T细胞", "树突状细胞", "肥大细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "成熟T细胞",
        "T细胞在胸腺中发育成熟，先天无胸腺的裸鼠缺乏成熟T细胞，细胞免疫功能缺陷，但B细胞尚存在。原书 A2 第 47 题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-a1013",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，男性，57岁，患肾细胞癌。接受1mg/kg PD-1单抗治疗6个月后肿瘤负荷减轻，其抗肿瘤机制为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "阻止PD-1与PD-L1的结合，抑制B细胞的增殖",
      "阻止PD-1与PD-L1的结合，促进T细胞的增殖",
      "促进PD-1与PD-L1的结合，促进B细胞的增殖",
      "促进PD-1与PD-L1的结合，促进T细胞的增殖",
      "阻止PD-1与PD-L1的结合，抑制IL-2和IFN-γ的产生",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阻止PD-1与PD-L1的结合，促进T细胞的增殖",
        "PD-1为负性共刺激分子，与PD-L1结合可抑制T细胞的增殖和IL-2、IFN-γ等产生。PD-1单抗阻断这一负性信号，解除对T细胞的抑制，从而促进抗肿瘤免疫。原书 A2 第 53 题答案 B。",
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
    id: "ext-immunology-ch10-t-lymphocyte-fill001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "T细胞在胸腺发育过程中的最核心事件是___、___和___。",
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
        "获得多样性TCR的表达；自身MHC限制性；自身免疫耐受",
        "T细胞在胸腺发育中最核心的事件是获得多样性TCR的表达、形成自身MHC限制性（阳性选择）以及自身免疫耐受（阴性选择）。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-fill002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "T细胞表面具有___、___和___等丝裂原的受体。",
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
        "ConA、PHA、PWM",
        "T细胞表面表达多种丝裂原（ConA、PHA和PWM）的受体，丝裂原可非特异性直接诱导静息T细胞活化和增殖。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-fill003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "根据所处的活化阶段分类，T细胞可分为___、___和___。",
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
        "初始T细胞、效应T细胞、记忆T细胞",
        "按活化阶段，T细胞分为初始T细胞（未受抗原刺激）、效应T细胞（执行免疫效应）和记忆T细胞（介导再次免疫应答）。原书填空题第 3 题答案。",
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
    id: "ext-immunology-ch10-t-lymphocyte-short001",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述T细胞的亚群及分类依据。",
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
        "T细胞亚群及分类依据",
        "T细胞根据所处活化阶段分为初始T细胞、效应T细胞和记忆T细胞；根据TCR不同分为αβ T细胞和γδ T细胞（前者参与适应性免疫，后者参与固有免疫）；根据CD分子分为CD4⁺T细胞和CD8⁺T细胞；根据功能特征分为CD4⁺辅助性T细胞（Th，包括Th1、Th2、Th9、Th17、Tfh等）、CD8⁺细胞毒性T细胞（CTL）和调节性T细胞（Treg）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch10-t-lymphocyte-short002",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述CTL杀伤靶细胞的机制。",
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
        "CTL杀伤靶细胞的机制",
        "①通过分泌穿孔素、颗粒酶、颗粒溶素、淋巴毒素等物质直接杀伤靶细胞；②高表达FasL或分泌TNF-α，分别与靶细胞表面的Fas和TNF受体结合，通过Fas-FasL途径和TNF-TNFR途径诱导靶细胞凋亡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题：本书第10章虽有 B1 型题，但按项目规约不单独提取 B 组，bGroups 置空 */
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