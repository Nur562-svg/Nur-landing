import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第19章 自身免疫病 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - 填空题（fill）：8 题
 * - 选择题（a1-single）：6 题
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：24 题（等于本文件预算 24）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释 6、填空题 8、A1 型题 34、B1 配伍题 4 组、问答题 4。
 *   B1 型配伍题按项目规约（本书一般无 B 型配伍）不纳入本文件（extractedGroups 置空）。
 *   预算 24 = term 6 + fill 8 + a1 6 + short 4；选择题取诱发机制、自身抗体/自身抗原、
 *   免疫耐受异常、HLA 关联等代表题，正确项均对照章末参考答案键号锚定
 *   （A1 第3/7/12/13/20/23 题）。
 *   OCR 错字与双栏错序已按免疫学医学语义恢复：自身反应性淋巴细胞、免疫隔离部位/隐蔽抗原、
 *   表位扩展、免疫忽视、分子模拟、类风湿因子（变性 IgG 的 IgM 抗体）、抗 TSHR 抗体、
 *   乙酰胆碱受体、HLA-DR3/DR4、AICD、I/II/III/IV 型超敏反应等，均未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch19-autoimmune-disease";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第19章 自身免疫病 习题（核对PDF 第213–223页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch19-autoimmune-disease-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：自身免疫",
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
        "自身免疫",
        "一定量的自身反应性 T 细胞和自身抗体普遍存在于所有个体，有利于协助清除衰老变性的自身成分，对维持免疫系统的自身免疫稳定具有重要的生理学意义，被称为自身免疫（autoimmunity）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：自身免疫病",
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
        "自身免疫病",
        "在某些内因和外因诱发下，自身免疫耐受状态被打破，持续迁延的自身免疫对自身抗原产生过度的免疫应答，造成了自身细胞破坏、组织损伤或功能异常，从而导致的临床病症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫隔离部位",
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
        "免疫隔离部位",
        "指脑、睾丸、眼睛和子宫等部位。在个体发育过程中，这些器官内含的抗原性物质通常不进入血液和淋巴液而接触免疫系统，因此 T、B 淋巴细胞库内相应的自身反应性淋巴细胞克隆并未被清除；在手术、外伤等情况下，一旦与免疫系统接触，可引起自身免疫性疾病。其内所隐蔽的抗原（如神经髓鞘磷脂碱性蛋白、精子、眼晶状体等）称为隐蔽抗原。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：表位扩展",
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
        "表位扩展",
        "一个抗原分子可能有多种表位，包括优势表位和隐蔽表位。机体在免疫系统对病原体进行持续性免疫应答过程中，针对一个优势表位发生免疫应答后，可能对隐蔽表位相继发生免疫应答，这种现象被称为表位扩展。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫忽视",
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
        "免疫忽视",
        "指机体对低水平自身抗原不发生自身反应性免疫应答的现象。多克隆激活剂、协同刺激因子和细胞因子等可打破免疫忽视，对低水平自身抗原产生免疫应答。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：分子模拟",
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
        "分子模拟",
        "一些微生物和正常宿主细胞或细胞外成分具有相似的抗原表位，感染人体后激发的免疫应答也能攻击人体的细胞或细胞外成分，引起自身免疫性疾病，这种现象称为分子模拟。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch19-autoimmune-disease-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "自身免疫病是由于哪一种免疫功能损害所致",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["抗原呈递", "免疫防御", "免疫监视", "免疫自稳", "免疫调节"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫自稳",
        "免疫自稳功能负责识别和清除自身衰老坏死的成分，维持免疫系统自身稳定，其失调是自身免疫病发生的根本原因。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于与自身免疫病发病相关因素的正确说法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "自身免疫病发病完全由遗传因素决定",
      "自身免疫病发病与遗传因素无关",
      "自身免疫病完全由环境因素决定",
      "自身免疫病与环境因素无关",
      "某些自身免疫病与特定的HLA型别相关联",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "某些自身免疫病与特定的HLA型别相关联",
        "自身免疫病由遗传因素与环境因素相互作用诱发，并非单由遗传或环境决定；已知多种自身免疫病与特定 HLA 型别相关联（如 HLA-DR3/DR4 与 1 型糖尿病）。原书 A1 答案第 7 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "刺激机体产生类风湿因子的抗原是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["变性IgA", "变性IgM", "变性IgG", "变性IgE", "变性IgD"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "变性IgG",
        "类风湿因子是针对抗原性发生变化的自身 IgG 所产生的自身抗体，即变性 IgG 作为抗原刺激机体产生针对它的抗体（多为 IgM 类）。原书 A1 答案第 12 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "类风湿因子是针对",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细菌表面抗原的IgM类抗体",
      "变质IgG的IgM类抗体",
      "变性的IgG的IgM类抗体",
      "dsDNA的IgG类抗体",
      "热休克蛋白的IgG类抗体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "变性的IgG的IgM类抗体",
        "类风湿因子是针对变性的自身 IgG 产生的抗体，常见为 IgM 类。原书 A1 答案第 13 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Graves病患者血清中存在的自身抗体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抗TSHR（促甲状腺激素受体）抗体",
      "抗TSH抗体",
      "抗内因子抗体",
      "抗胰岛素受体抗体",
      "抗乙酰胆碱受体抗体",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗TSHR（促甲状腺激素受体）抗体",
        "毒性弥漫性甲状腺肿（Graves 病）血清中存在抗促甲状腺激素受体（TSHR）自身抗体，可模拟 TSH 与 TSHR 结合，导致甲状腺上皮细胞分泌过量甲状腺素、引起甲状腺功能亢进。原书 A1 答案第 20 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种HLA型别与1型糖尿病（胰岛素依赖型糖尿病）相关",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["HLA-DR3/DR4", "HLA-DR5", "HLA-B7", "HLA-B27", "HLA-DQ"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "HLA-DR3/DR4",
        "1 型（胰岛素依赖型）糖尿病与 HLA-DR3/DR4 相关联；HLA-B27 与强直性脊柱炎相关，携带 DR5 者易患桥本甲状腺炎等。原书 A1 答案第 23 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），8 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "自身免疫病是在___和___诱发下，___状态被打破，持续迁延的自身免疫对___抗原发生异常的免疫应答，造成___，导致的临床病症。",
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
        "内因、外因、自身耐受、自身、自身组织细胞损伤或功能异常",
        "自身免疫病在某些内因（遗传等）和外因（感染、药物、物理因素等）诱发下，自身耐受状态被打破，持续迁延的自身免疫对自身抗原产生异常免疫应答，造成自身细胞破坏、组织损伤或功能异常。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "诱发自身免疫病的抗原（自身抗原改变）因素有___、___、___、___。",
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
        "隐蔽抗原（免疫隔离部位抗原）释放、自身抗原改变、分子模拟、表位扩展",
        "诱发自身免疫涉及的自身体抗原改变因素包括：免疫隔离部位（隐蔽）抗原的释放、自身抗原的改变、分子模拟及表位扩展。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "隐蔽抗原（免疫隔离部位抗原）有___、___、___等。",
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
        "神经髓鞘磷脂碱性蛋白、精子、眼晶状体",
        "脑（神经髓鞘磷脂碱性蛋白）、睾丸（精子）、眼睛（眼晶状体）等免疫隔离部位的抗原属隐蔽抗原，正常情况下不接触免疫系统。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "类风湿因子是抗原性发生变化的自身___，刺激机体产生的针对此抗原的___类抗体。",
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
        "IgG、IgM",
        "类风湿因子是抗原性发生变化的自身 IgG 作为抗原，刺激机体产生的针对其的 IgM 类抗体。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill005",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "诱发自身免疫病的免疫系统异常因素有___、___、___、___、___、___。",
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
        "自身反应性淋巴细胞清除异常、免疫忽视的打破、淋巴细胞的多克隆激活、活化诱导的细胞死亡障碍、调节性T细胞功能异常、MHC II类分子表达异常",
        "免疫系统异常导致自身免疫病的机制包括以上六项，最终使自身反应性淋巴细胞活化并攻击自身组织。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill006",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "自身免疫病的病理损伤机制可分为___介导和___介导两大类。",
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
        "自身抗体、自身反应性T淋巴细胞",
        "自身抗体或自身反应性 T 淋巴细胞介导对自身细胞或自身成分的免疫应答是自身免疫病病理损伤的原因。原书填空题第 6 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill007",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "自身免疫病按临床表现可分为___和___两大类。",
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
        "器官特异性、全身性",
        "自身免疫病分为器官特异性自身免疫病和全身性（系统性）自身免疫病两大类。原书填空题第 7 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-fill008",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "自身免疫病的免疫治疗策略是___、___、___。",
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
        "去除引起免疫耐受异常的因素、抑制自身免疫应答、重建对自身抗原的特异性免疫耐受",
        "自身免疫病防治原则包括：去除引起免疫耐受异常的因素；抑制对自身抗原的免疫应答；重建对自身抗原的特异性免疫耐受。原书填空题第 8 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch19-autoimmune-disease-short001",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：诱发自身免疫病的可能机制有哪些？",
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
        "诱发自身免疫病的机制",
        "（1）自身抗原的改变：①免疫隔离部位抗原的释放（手术、外伤、感染时脑、精子、眼晶状体等部位抗原释放入血或淋巴液，引起自身免疫应答）；②自身抗原的改变（生物、物理、化学及药物等因素使自身抗原改变）；③分子模拟（微生物经模拟、释放隔离抗原和多克隆激活等引起）；④表位扩展（自我反应性克隆相继识别自身抗原隐蔽表位）。其发病与遗传因素密切相关，遗传因素影响机体对自身免疫病易感性。（2）免疫系统异常：①自身反应性淋巴细胞克隆清除异常（胸腺/骨髓基质细胞缺陷致阴性选择障碍）；②免疫忽视的打破（多克隆激活剂、协同刺激因子和细胞因子等）；③淋巴细胞的多克隆激活（病原微生物成分或超抗原，若含自身反应性淋巴细胞则产生自身抗体）；④活化诱导的细胞死亡（AICD）障碍；⑤调节性 T 细胞功能异常（CD4+CD25+ Treg 免疫抑制功能异常）；⑥MHC II 类分子表达异常（非 APC 异常表达 MHC II 提呈自身抗原给自身反应性 Th）。原书问答题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-short002",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：举例分析自身免疫病的病理损伤机制。",
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
        "自身免疫病的病理损伤机制及举例",
        "（1）自身抗体直接介导细胞破坏（II 型超敏反应）：自身抗体识别结合细胞膜抗原后经激活补体形成攻膜复合物、脾内吞噬细胞清除、NK 细胞 ADCC、招募中性粒细胞释放酶和介质等方式破坏细胞，如自身免疫性血细胞减少症。（2）自身抗体介导细胞功能异常：①模拟受体配体作用，如 Graves 病抗 TSHR 抗体模拟 TSH 使甲状腺分泌过量甲状腺素；②阻断受体，如重症肌无力抗乙酰胆碱受体（AchR）抗体阻断神经-肌肉信号并加速 AchR 内化降解，引起进行性肌无力。（3）自身抗体与自身抗原形成免疫复合物介导组织损伤（III 型超敏反应）：如系统性红斑狼疮（SLE）中抗 DNA、抗组蛋白自身抗体形成大量免疫复合物沉积于皮肤、肾小球、关节等小血管壁激活补体造成损伤。（4）自身反应性 T 淋巴细胞介导（IV 型超敏反应）：效应细胞主要为 CD4+Th1 和 CD8+CTL，如胰岛素依赖型糖尿病（IDDM）中自身反应性 CD8+CTL 持续杀伤胰岛 β 细胞致胰岛素分泌严重不足。原书问答题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-short003",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：自身免疫病的基本特征是什么？",
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
        "自身免疫病的基本特征",
        "①患者体内可检测到高效价的自身抗体和（或）自身反应性 T 细胞；②自身抗体/自身反应性 T 淋巴细胞介导对自身细胞或成分的免疫应答造成损伤或功能障碍，病情转归与自身免疫应答强度相关，应用免疫抑制剂治疗有效；③患者或患病动物病变组织中有 Ig 沉积或淋巴细胞浸润；④可通过患者血清或淋巴细胞被动转移疾病，应用自身抗原或自身抗体可复制出具有相似病理变化的动物模型。原书问答题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch19-autoimmune-disease-short004",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：阐述自身免疫病的治疗原则。",
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
        "自身免疫病的治疗原则",
        "（1）去除引起免疫耐受异常的因素：预防和控制微生物感染（疫苗/抗生素）；谨慎使用药物。（2）抑制对自身抗原的免疫应答：①应用免疫抑制剂（如环孢素 A、FK506 抑制 IL-2 等基因活化进而抑制 T 细胞分化增殖，糖皮质激素抑制炎症）；②应用抗细胞因子及其受体的抗体或阻断剂（如 TNF-α 单抗 infliximab、可溶性 TNF 受体-Fc 融合蛋白 etanercept、IL-1Ra 治疗类风湿关节炎）；③应用抗免疫细胞表面分子抗体（抗 MHC II 类分子单抗抑制 APC，抗 CD3、CD4 单抗抑制自身反应性 T 细胞，抗 TCR/BCR 独特型抗体清除相应细胞）。（3）重建对自身抗原的特异性免疫耐受（尚未实现）。（4）其他：脾肾切除治疗包被自身抗体的血细胞减少症；注射维生素 B12 治疗恶性贫血。原书问答题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题：本书一般无 B 型配伍，置空 */
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