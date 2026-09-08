import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第16章 免疫耐受 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：9 题
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：20 题（须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、填空题 6、选择题 A1 型 50、B1 配伍题 3 组 15 小题、
 *   问答题 5；按预算等比取材（B1 型按项目规约不纳入 a1-single，故未取）。OCR 错字与
 *   双栏错序已按免疫学医学语义恢复（中枢/外周耐受、低带/高带耐受、CTLA4/PD-1、
 *   nTreg/iTreg、AIRE、AICD 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch16-immune-tolerance";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第16章 免疫耐受 习题（核对PDF 第177–187页）";
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
    id: "ext-immunology-ch16-immune-tolerance-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫耐受",
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
        "免疫耐受",
        "在针对各种不同外来抗原产生有效应答的同时，机体免疫系统需要维持对自身抗原的无反应性，这种无反应性状态称为免疫耐受。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：克隆清除",
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
        "克隆清除",
        "发育中的淋巴细胞经历阴性选择，清除与自身抗原具有高亲和力的克隆，从而实现对该自身抗原的耐受。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：中枢耐受",
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
        "中枢耐受",
        "在胚胎期及出生后T、B细胞发育的过程中，遇自身抗原所形成的耐受，主要机制为阴性选择导致克隆清除、受体编辑等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：耐受分离",
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
        "耐受分离",
        "口服抗原可以诱导胃肠道局部免疫应答，却导致全身的免疫耐受，这种局部免疫与全身耐受并存的现象称为耐受分离。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（a1-single），9 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch16-immune-tolerance-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "最容易诱导免疫耐受的时期是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胚胎期", "新生儿期", "青少年期", "成年期", "老年期"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胚胎期",
        "免疫耐受的诱导在胚胎期最易、新生期次之，成年动物产生免疫耐受比较困难，主要与免疫系统发育成熟程度有关。原书 A1 答案第 4 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于免疫隔离部位的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["甲状腺", "胰腺", "小肠", "肺", "脑"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑",
        "脑、眼、睾丸、胎盘等为免疫豁免（免疫隔离）部位，其自身抗原因生理屏障和局部微环境因素通常不引起免疫应答。原书 A1 答案第 8 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "天然免疫耐受是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "机体对任何抗原都不发生反应的状态",
      "机体对改变的自身组织成分不发生反应的状态",
      "机体对非己抗原不发生反应的状态",
      "机体对同种异体抗原不发生反应的状态",
      "机体对自身组织成分不发生反应的状态",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "机体对自身组织成分不发生反应的状态",
        "天然免疫耐受指机体对自身组织成分不产生应答的无反应性状态，是维持自身耐受的基础。原书 A1 答案第 10 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "耐受原表位是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "能诱导 Treg 细胞活化的抗原表位",
      "能诱导 Th1细胞活化的抗原表位",
      "能诱导Th2细胞活化的抗原表位",
      "能诱导 Th17 活化的表位",
      "能诱导B 细胞活化的表位",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "能诱导 Treg 细胞活化的抗原表位",
        "有些抗原表位易于诱导Treg产生、促进免疫耐受，这类表位又称耐受原表位。原书 A1 答案第 14 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "容易引起免疫耐受的抗原注射途径为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "静脉>皮下、肌肉>腹腔",
      "腹腔>皮下、肌肉>静脉",
      "腹腔>静脉>皮下、肌肉",
      "静脉>腹腔>皮下、肌肉",
      "皮下、肌肉>腹腔>静脉",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "静脉>腹腔>皮下、肌肉",
        "口服最易诱导全身耐受，其次依次为静脉注射、腹腔注射，肌肉及皮下注射最难诱导免疫耐受；故注射途径易诱导耐受次序为静脉>腹腔>皮下、肌肉（口服另计）。原书 A1 答案第 19 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于免疫隔离部位的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["脑", "眼的前房", "胎盘", "睾丸", "骨髓"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "骨髓",
        "脑、眼前房、胎盘、睾丸等属免疫豁免（隔离）部位；骨髓是造血和B细胞发育器官，不属于免疫隔离部位。原书 A1 答案第 25 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "自身反应性T淋巴细胞克隆清除主要发生在",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胸腺", "骨髓", "淋巴结", "脾脏", "黏膜相关淋巴组织"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸腺",
        "T细胞的中枢耐受在胸腺中建立：胸腺髓质区上皮细胞异位表达外周组织限制性抗原，能与自身抗原肽-MHC复合物高亲和力结合的T细胞经阴性选择被克隆清除。原书 A1 答案第 34 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能促进免疫耐受建立的生物大分子药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "CD19抗体",
      "PD-1 抗体",
      "可溶性 TNF-α 受体",
      "CTLA-4-Ig 融合蛋白",
      "GM-CSF",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CTLA-4-Ig 融合蛋白",
        "CTLA-4-Ig融合蛋白可阻断CD28-B7共刺激信号，抑制T细胞活化、诱导免疫耐受，用于自身免疫病和移植；PD-1抗体则用于打破耐受、抗肿瘤。原书 A1 答案第 41 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于受体编辑正确的描述是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "激活T细胞应答",
      "激活B细胞应答",
      "诱导耐受分离",
      "建立 MHC限制性",
      "改变BCR特异性",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "改变BCR特异性",
        "部分自身反应性B细胞在受到自身抗原刺激后可重新启动免疫球蛋白基因重排，通过受体编辑产生新的、不再识别自身抗原的B细胞，即改变BCR特异性。原书 A1 答案第 50 题为 E。",
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
    id: "ext-immunology-ch16-immune-tolerance-fill001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "根据形成时期的不同，免疫耐受可分为___和___。",
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
        "中枢耐受；外周耐受",
        "按形成时期，免疫耐受分为中枢耐受（胚胎期及出生后T、B细胞发育中遇自身抗原形成）和外周耐受（成熟T、B细胞遇内源或外源抗原不产生应答形成）。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-fill002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "B细胞中枢耐受形成的两个主要机制是___和___。",
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
        "克隆清除；受体编辑",
        "未成熟B细胞遭遇自身抗原时被诱导凋亡、克隆清除；部分自身反应性B细胞经受体编辑重新启动Ig基因重排，改变BCR特异性而不识别自身抗原。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-fill003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "调节性T细胞的主要类型包括___和___。",
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
        "nTreg；iTreg",
        "调节性T细胞分为自然产生的nTreg和诱导产生的iTreg；前者主要通过细胞-细胞间直接接触发挥免疫抑制，后者主要通过分泌IL-10及TGF-β等细胞因子发挥免疫抑制。原书填空题第 3 题答案。",
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
    id: "ext-immunology-ch16-immune-tolerance-short001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述在外周免疫耐受过程中，自身反应性T细胞进入克隆失能状态的具体机制。",
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
        "共刺激信号缺失时，单纯TCR刺激诱导T细胞克隆失能",
        "除TCR介导的信号外，T细胞有效活化还有赖于共刺激分子提供的第二信号。在共刺激信号缺失时，TCR刺激不能诱导细胞向效应细胞分化；而且后来即使是同时给予TCR和共刺激信号，这类细胞仍呈现无反应状态，该现象称克隆失能。鉴于大多数体细胞不表达共刺激分子，且静息状态下未成熟DC仅表达低水平共刺激分子，逃逸到外周的自身反应性T细胞即使遭遇对应抗原也可能不被充分活化，甚至被诱导进入失能状态。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-short002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试比较T细胞和B细胞免疫耐受的特点。",
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
        "T细胞耐受所需抗原量小、发生快、维持长；B细胞耐受需抗原量大、诱导慢、维持短",
        "不同剂量抗原诱导的耐受所靶向的淋巴细胞不同：低剂量抗原主要诱导T细胞耐受，即低带耐受；高剂量TD抗原则同时诱导T细胞和B细胞耐受，为高带耐受。T细胞耐受所需抗原量小，发生快（24小时内达高峰），持续时间长（数月~数年）；B细胞形成耐受不但需要抗原量大（较T细胞大100~10000倍），且诱导时间长（1~2周）而持续时间短（数周）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-short003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述在哪些情况下，需要打破免疫耐受；哪些情况下，需要建立免疫耐受。",
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
        "自身免疫病需重建自身耐受；慢性感染和肿瘤需打破病理性耐受",
        "丧失对自身抗原的生理性耐受是自身免疫病发生的根本原因；对病原体抗原或肿瘤抗原的病理性耐受则可能阻碍病原体或肿瘤细胞的清除，导致慢性持续性感染和肿瘤的发生发展。对于自身免疫性疾患，期望能够重建对自身抗原的生理性耐受；而对于慢性感染和肿瘤，则希望打破病理性耐受。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch16-immune-tolerance-short004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：免疫耐受与免疫抑制有何异同？",
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
        "两者均表现为免疫不应答，但免疫耐受有特异性，免疫抑制是非特异性普遍的",
        "免疫耐受与免疫抑制均表现为「免疫不应答」，但二者有本质区别。免疫耐受具有特异性，只对特定抗原不应答，对其他抗原正常应答；而免疫抑制是对免疫系统的普遍抑制作用，不具有特异性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题（本书第16章存在，但按契约不提取为独立记分题），置空 */
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