import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第42章 氨基苷类抗生素 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：5 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 3 组共 10 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 10、选择题（A1 型 12 + A2 型 2 +
 *   B1 型 3 组共 10 小题）与简答题 3；本文件按 11 道预算取材：名词解释全取、
 *   填空题取第 1–4 题、A1 型题取第 1–5 题、简答题取第 1 题；填空题第 5–10 题、
 *   A2 型题（13–14）、B1 型题（15–24）及简答题第 2–3 题因预算未纳入。正确项
 *   对齐章末参考答案键号（A1 型题 1.C、2.A、3.B、4.D、5.C；本文件答案键号自
 *   1–24 连续编号），选项已随机重排并同步 correctChoiceIndex。OCR 错字已按
 *   药理学医学语义恢复（如 氮基/复基/氨基醇环→氨基醇环、G*菌→G⁺菌、
 *   青𩆨素/青莓素→青霉素、葯→药、B-内酰胺→β-内酰胺、需氧G杆菌→需氧革兰
 *   阴性杆菌、肌注/靜脉滴注→肌注/静脉滴注 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch42-aminoglycosides";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第42章 氨基苷类抗生素 习题（核对PDF 第273–278页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch42-aminoglycosides-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：初次接触效应",
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
        "细菌首次接触抗生素时能够被迅速杀死的现象称初次接触效应",
        "氨基糖苷类抗生素对细菌存在初次接触效应，即细菌首次接触抗生素时能够被迅速杀死。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch42-aminoglycosides-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "对氨基糖苷类抗生素产生耐药性主要是由于___、___和___。",
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
        "细菌产生修饰氨基糖苷类的钝化酶；细菌细胞膜通透性的改变；药物作用靶位的修饰",
        "细菌对氨基糖苷类产生耐药性主要通过：①产生修饰氨基糖苷类的钝化酶（乙酰化酶、磷酸化酶、腺苷化酶等）；②细菌细胞膜通透性改变，使药物摄入减少；③药物作用靶位的修饰。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "氨基糖苷类抗生素对各种___菌有高度抗菌活性，对厌氧菌和肠杆菌___。",
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
        "需氧革兰阴性杆；不敏感",
        "氨基糖苷类抗生素抗菌谱相似，对需氧革兰阴性杆菌作用强，对革兰阳性菌作用弱；厌氧菌因缺乏药物主动转运系统而不敏感。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-fill003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "氨基糖苷类抗生素治疗全身性感染必须采用___或___给药，因口服___。",
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
        "肌注；静脉滴注；不易吸收",
        "氨基糖苷类抗生素极性大，口服很难吸收，治疗全身性感染必须采用肌内注射或静脉滴注给药。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-fill004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "氨基糖苷类抗生素的不良反应有___、___、___和___。",
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
        "耳毒性；肾毒性；神经肌肉麻痹；过敏反应",
        "氨基糖苷类抗生素不良反应相似，主要有：①耳毒性，包括前庭神经和耳蜗听神经损伤；②肾毒性，是诱发药源性肾衰的最常见因素；③神经肌肉麻痹，可用新斯的明和钙剂拮抗；④过敏反应，链霉素可引起过敏性休克。原书填空题第 4 题答案。",
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
    id: "ext-pharmacology-ch42-aminoglycosides-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "氨基糖苷类抗生素的共同特点不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "水溶性好、性质稳定",
      "由氨基糖分子和非糖部分的苷元结合而成",
      "对革兰阳性菌具有高度抗菌活性",
      "对革兰阴性需氧菌具有高度抗菌活性",
      "与核蛋白体 30S 亚基结合，是抑制蛋白合成的杀菌剂",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "对革兰阳性菌具有高度抗菌活性",
        "氨基糖苷类抗生素对革兰阴性需氧杆菌具有强大抗菌活性，对革兰阳性菌作用较弱（非高度抗菌活性），故“对革兰阳性菌具有高度抗菌活性”不属于其共同特点。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对氨基糖苷类不敏感的细菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肠杆菌", "金黄色葡萄球菌", "各种厌氧菌", "革兰阴性球菌", "铜绿假单胞菌"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "各种厌氧菌",
        "氨基糖苷类对需氧革兰阴性杆菌作用强，对厌氧菌不敏感（缺乏主动转运系统），故对氨基糖苷类不敏感的细菌是各种厌氧菌。原书 A1 型题第 2 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "庆大霉素无治疗价值的感染是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["大肠埃希菌所致尿路感染", "细菌性心内膜炎", "铜绿假单胞菌感染", "结核性脑膜炎", "革兰阴性杆菌引起的败血症"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结核性脑膜炎",
        "庆大霉素对各种需氧革兰阴性杆菌（包括铜绿假单胞菌）有较强杀菌作用，但对结核分枝杆菌无作用，故对结核性脑膜炎无治疗价值。原书 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "链霉素临床应用较少是由于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["口服不易吸收", "抗菌作用较弱", "对革兰阳性菌无效", "耐药菌株较多且毒性较大", "对肾毒性大"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "耐药菌株较多且毒性较大",
        "链霉素抗菌作用较青霉素弱，易产生耐药性，且耳毒性等不良反应较多，故临床应用较少，主要用于结核病联合治疗及鼠疫等。原书 A1 型题第 4 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch42-aminoglycosides-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "氨基糖苷类药物在体内分布浓度较高的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["脑脊液", "细胞内液", "肾脏皮质", "血液", "结核病灶的空洞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾脏皮质",
        "氨基糖苷类抗生素在体内主要分布于细胞外液，可进入肾皮质并在肾小管上皮细胞内蓄积，肾脏皮质浓度较高，也是其肾毒性的基础。原书 A1 型题第 5 题，参考答案键号 C。",
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
    id: "ext-pharmacology-ch42-aminoglycosides-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述庆大霉素的抗菌特点及临床应用。",
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
        "庆大霉素是广谱氨基糖苷类抗生素，广泛用于治疗敏感菌引起的感染：①对沙雷菌属作用强，为氨基糖苷类中的首选药；②可与青霉素或其他抗生素合用，协同治疗严重的肺炎球菌、铜绿假单胞菌、肠球菌、葡萄球菌或草绿色链球菌感染；③可局部用于皮肤、黏膜表面感染和眼、耳、鼻部感染；④可用于术前预防和术后感染。",
        "庆大霉素抗菌谱比链霉素广，对各种需氧革兰阴性杆菌（包括铜绿假单胞菌）都有较强杀菌作用，对耐药金黄色葡萄球菌也有效，是治疗各种 G⁻ 杆菌感染的主要抗菌药。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 3 组共 10 小题，完整组超出剩余预算，导出空数组 */
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
