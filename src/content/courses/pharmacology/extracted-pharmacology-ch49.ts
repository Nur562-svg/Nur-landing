import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第49章 影响免疫功能的药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 1 组共 5 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 5、选择题（A1 型 14 + A2 型 2 +
 *   B1 型 1 组共 5 小题）与简答题 2；本文件按 11 道预算取材：名词解释全取、
 *   填空题全取、A1 型题取第 1–2 题、简答题全取；A1 型题第 3–14 题、A2 型题
 *   （15–16）、B1 型题（17–21）因预算未纳入。正确项对齐章末参考答案键号（A1
 *   型题 1.D、2.A；本文件答案键号自 1–21 连续编号），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 葯→药、热悉→熟悉、
 *   左旋眯唑→左旋咪唑、瞟呤→嘌呤、硫唑瞟呤→硫唑嘌呤、异唑类→异噁唑类、
 *   HIIV/HV→HIV、INF→IFN、1L-2→IL-2、Ca“/Ca’*→Ca²⁺ 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch49-immunomodulators";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第49章 影响免疫功能的药物 习题（核对PDF 第314–319页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch49-immunomodulators-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫增强剂",
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
        "单独或同时与抗原使用时能增强机体免疫应答的物质",
        "免疫增强剂主要用于免疫缺陷病、慢性感染性疾病，也常作为肿瘤的辅助治疗药物。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫病理反应",
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
        "当机体免疫功能异常时出现的免疫病理反应，包括变态反应（过敏反应）、自身免疫性疾病、免疫缺陷病和免疫增殖病等",
        "免疫病理反应表现为机体的免疫功能低下或免疫功能过度增强，严重时可导致机体死亡。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch49-immunomodulators-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "机体免疫系统在抗原刺激下发生的免疫应答反应分为三期，分别为___、___和___。",
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
        "感应期；增殖分化期；效应期",
        "免疫应答反应是机体免疫系统在抗原刺激下所发生的一系列变化，可分三期：①感应期；②增殖分化期；③效应期。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "机体的免疫反应分为___和___。",
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
        "非特异性免疫；特异性免疫",
        "非特异性免疫为先天具有，由吞噬细胞、补体、干扰素等组成，参与吞噬、清除异物，介导和参与特异性免疫的杀伤反应；特异性免疫包括细胞免疫和体液免疫。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "特异性免疫包括___和___，分别由___和___细胞介导。",
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
        "细胞免疫；体液免疫；T细胞；B细胞",
        "特异性免疫包括细胞免疫和体液免疫，分别由 T 细胞和 B 细胞介导，并有多种与免疫系统功能有关的细胞因子参与。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-fill004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "影响免疫功能的药物按作用效果不同，可分为___和___；免疫抑制剂常用于___和___；免疫增强剂常用于___和___。",
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
        "免疫增强剂；免疫抑制剂；器官移植；自身免疫性疾病；免疫缺陷病；慢性感染性疾病",
        "影响免疫功能的药物按作用效果不同分为免疫增强剂和免疫抑制剂两大类；免疫抑制剂常用于器官移植和自身免疫性疾病，免疫增强剂常用于免疫缺陷病和慢性感染性疾病。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-fill005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "免疫增强剂按其靶细胞不同可分为___、___和___三类。",
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
        "提高巨噬细胞吞噬功能的药物；提高细胞免疫功能的药物；提高体液免疫功能的药物",
        "免疫增强剂按靶细胞不同可分为提高巨噬细胞吞噬功能的药物、提高细胞免疫功能的药物和提高体液免疫功能的药物三类。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch49-immunomodulators-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "环孢素主要作用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["B 细胞", "补体细胞", "T 细胞", "巨噬细胞", "白细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T 细胞",
        "环孢素选择性抑制 T 细胞活化，使 TH 细胞明显减少并降低 TH 与 TS 的比例；对 B 细胞的抑制作用弱，可部分抑制 T 细胞依赖的 B 细胞反应。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "环孢素最常见的不良反应是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肝损害", "多毛", "肾毒性", "继发性感染", "继发肿瘤"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾毒性",
        "环孢素最常见及严重的不良反应为肾毒性，其次为肝毒性（多见于用药早期，一过性肝损害），继发感染也较为常见，多为病毒感染。原书 A1 型题第 2 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch49-immunomodulators-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述免疫抑制剂的分类及主要代表药物。",
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
        "免疫抑制药物可大致分为以下几种：①抑制 IL-2 生成及其活性的药物，如他克莫司、环孢素等；②抑制细胞因子基因表达的药物，如皮质激素；③抑制嘌呤或嘧啶合成的药物，如硫唑嘌呤等；④阻断 T 细胞表面信号分子的药物，如单克隆抗体等。",
        "免疫抑制剂按作用环节分类：抑制 IL-2 生成及活性（环孢素、他克莫司）、抑制细胞因子基因表达（皮质激素）、抑制嘌呤或嘧啶合成（硫唑嘌呤、来氟米特）、阻断 T 细胞表面信号分子（单克隆抗体等）。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch49-immunomodulators-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述环孢素 A 的药理作用、作用机制及临床应用。",
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
        "药理作用与机制：环孢素选择性抑制 T 细胞活化，使 TH 细胞明显减少并降低 TH 与 TS 的比例；抑制效应 T 细胞介导的细胞免疫反应如迟发型超敏反应；对 B 细胞的抑制作用弱，可部分抑制 T 细胞依赖的 B 细胞反应；对巨噬细胞抑制作用不明显，对 NK 细胞活力无明显抑制作用，但可间接通过干扰素（IFN-γ）的产生而影响 NK 细胞活力。机制上，环孢素进入淋巴细胞后与环孢素结合蛋白（cyclophilin）结合，进而与钙调磷酸酶（calcineurin）结合形成复合体，抑制钙调磷酸酶活性，从而抑制 TH 细胞的活化及相关基因（如 IL-2）表达；还可增加 T 细胞内转化生长因子（TGF-β）的表达，TGF-β 对 IL-2 诱导的 T 细胞增殖有强大抑制作用，也能抑制抗原特异性的细胞毒 T 细胞产生。临床应用：①器官移植，已广泛用于肾、肝、胰、心、肺、皮肤、角膜及骨髓移植，防止排异反应；②自身免疫性疾病，适用于治疗其他药物无效的难治性自身免疫性疾病，如类风湿性关节炎、系统性红斑狼疮、银屑病、皮肌炎等。",
        "环孢素通过抑制钙调磷酸酶阻断 T 细胞活化信号通路，为器官移植抗排斥和难治性自身免疫性疾病的重要免疫抑制药；最常见及严重的不良反应为肾毒性。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 1 组共 5 小题，完整组超出剩余预算，导出空数组 */
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
