import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第14章 固有免疫系统及其介导的应答 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：12 题
 * - 问答题（short-answer）：3 题
 * - 独立记分题合计：23 题（须等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、填空题 10、选择题 A1 型 45、B1 配伍题 5 组 40 小题、
 *   问答题 3；按预算等比取材（B1 型按项目规约不纳入 a1-single，故未取）。OCR 错字与
 *   双栏错序已按免疫学医学语义恢复（模式识别受体 PRR/TLR 亚型、NK 受体 KIR/NKG2D、
 *   细胞因子 IL/IFN/TGF 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch14-innate-immunity";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第14章 固有免疫系统及其介导的应答 习题（核对PDF 第156–166页）";
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
    id: "ext-immunology-ch14-innate-immunity-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：固有免疫应答",
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
        "固有免疫应答",
        "指机体固有免疫细胞和分子在识别病原体及其产物或体内凋亡/畸变细胞等「非己」抗原性异物后，迅速活化，有效吞噬、杀伤、清除病原体或体内「非己」物质，产生非特异性免疫防御、监视、自稳等保护作用的生理过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：模式识别受体",
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
        "模式识别受体（PRR）",
        "指广泛存在于固有免疫细胞表面、胞内器室膜上、胞浆和血液中的一类能直接识别外来病原体及其产物或宿主畸变/凋亡细胞某些共有特定模式分子结构的受体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病原相关模式分子",
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
        "病原相关模式分子（PAMP）",
        "指某些病原体或其产物所共有的高度保守、且对病原体生存和致病性不可或缺的特定分子结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：巨胞饮",
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
        "巨胞饮",
        "指巨噬细胞和树突状细胞在某些因素刺激下，从胞膜皱褶部位向外伸展将大量细胞外液包裹形成较大巨胞饮体的过程。上述抗原提呈细胞通过巨胞饮作用，可将其周围细胞外液中营养物质、病原体、可溶性抗原和液相大分子物质摄入胞内。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（a1-single），12 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch14-innate-immunity-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "来源于骨髓共同淋巴样前体的固有淋巴样细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["树突状细胞", "巨噬细胞", "NK细胞", "NKT细胞", "YδT 细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "NK细胞",
        "NK细胞属于固有淋巴样细胞（ILC），来源于骨髓共同淋巴样前体；经典DC和巨噬细胞来源于骨髓共同髓样前体，NKT、γδT细胞属固有淋巴细胞。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "TLR4 同源二聚体识别的病原相关模式分子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细菌甘露糖残基",
      "细菌脂多糖",
      "细菌胞壁酰二肽",
      "病毒双链 RNA",
      "病毒单链 RNA",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细菌脂多糖",
        "TLR4同源二聚体识别细菌脂多糖（LPS，G⁻菌）；甘露糖由甘露糖受体识别，胞壁酰二肽由NOD样受体识别，dsRNA、ssRNA分别由TLR3、TLR7识别。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "甘露糖受体识别的病原相关模式分子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["细菌脂多糖", "细菌脂磷壁酸", "细菌脂蛋白", "细菌肽聚糖", "细菌岩藻糖残基"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细菌岩藻糖残基",
        "甘露糖受体是胞膜型PRR，可识别病原体表面甘露糖、岩藻糖残基或酵母多糖等。原书 A1 答案第 6 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "M2型巨噬细胞合成分泌的细胞因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IL-4", "IL-6", "IFN-γ", "TNF-α", "TGF-β"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "TGF-β",
        "M2型巨噬细胞合成分泌TGF-β等抑炎性细胞因子，与组织修复、抑制炎症有关；IFN-γ由Th1等分泌。原书 A1 答案第 8 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对巨噬细胞具有激活作用的细胞因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IL-4", "IL-6", "IFN-γ", "IL-8", "IL-10"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IFN-γ",
        "IFN-γ是激活巨噬细胞（使其向M1型分化、增强杀菌能力）的重要细胞因子；IL-4/IL-13促进M2型分化。原书 A1 答案第 12 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "通过释放细胞毒性介质毒杀寄生虫的免疫细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["中性粒细胞", "单核细胞", "肥大细胞", "嗜酸性粒细胞", "嗜碱性粒细胞"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "嗜酸性粒细胞",
        "嗜酸性粒细胞通过脱颗粒释放主要碱性蛋白、阳离子蛋白等细胞毒性介质毒杀寄生虫，参与抗寄生虫免疫。原书 A1 答案第 22 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不表达特异性/泛特异性抗原受体的免疫细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["αβT细胞", "γδT细胞", "NKT细胞", "NK细胞", "B1 细胞"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "NK细胞",
        "NK细胞不表达TCR/BCR等特异性或泛特异性抗原识别受体，依靠表面杀伤活化/抑制受体识别靶细胞；αβT、γδT、NKT、B1细胞均表达TCR或BCR。原书 A1 答案第 25 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "NK细胞表面具有鉴别意义的标志是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "CD3⁻CD19⁻CD56⁺CD16⁺",
      "CD3⁺CD19⁻CD4⁺CD25⁺",
      "CD3⁺CD19⁻CD8⁺CD25⁺",
      "CD3⁻CD19⁻mIgM⁺CD5⁺",
      "CD3⁻CD19⁻CD14⁺CD16⁺",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD3⁻CD19⁻CD56⁺CD16⁺",
        "NK细胞为CD3⁻CD19⁻CD56⁺CD16⁺（人不表达、识别通过NK受体）；CD3⁺者为T/NKT，mIgM⁺CD5⁺为B1细胞，CD14⁺为单核细胞。原书 A1 答案第 30 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "具有自我更新能力的免疫细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["B1 细胞", "γδT细胞", "NK细胞", "B2细胞", "NKT 细胞"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "B1细胞",
        "B1细胞具有自我更新能力，主要分布于腹腔、胸腔等处，参与固有免疫；B2细胞为常规适应性B细胞。原书 A1 答案第 35 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1010",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "固有免疫细胞所不具备的特征是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "通过趋化募集迅速发挥免疫效应",
      "通过克隆选择迅速发挥免疫效应",
      "通常没有免疫记忆功能",
      "不表达特异性抗原识别受体",
      "表面模式识别受体或泛特异性抗原受体较少多样性",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "通过克隆选择迅速发挥免疫效应",
        "克隆选择是适应性免疫应答的特征；固有免疫细胞不表达特异性抗原受体、缺乏克隆选择过程、通常无免疫记忆，靠趋化募集和模式识别受体迅速发挥作用。原书 A1 答案第 40 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1011",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "具有ADCC效应的免疫细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["γδT细胞", "NKT细胞", "NK细胞", "肥大细胞", "单核细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "NK细胞",
        "NK细胞表达FcγRIII（CD16），可介导抗体依赖性细胞介导的细胞毒作用（ADCC），杀伤被抗体包被的靶细胞。原书 A1 答案第 42 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-a1012",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在过敏性炎症反应中发挥重要作用的免疫细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["中性粒细胞", "肥大细胞", "NK细胞", "巨噬细胞", "γδT细胞"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大细胞",
        "肥大细胞表达高亲和力FcεRI，结合IgE后脱颗粒释放组胺等介质，在过敏性炎症（I型超敏）反应中发挥重要作用。原书 A1 答案第 44 题为 B。",
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
    id: "ext-immunology-ch14-innate-immunity-fill001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "内体膜型Toll样受体除 TLR3同源二聚体外，还有___、___和___。",
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
        "TLR7；TLR8；TLR9",
        "内体膜型Toll样受体包括TLR3（识别dsRNA）、TLR7、TLR8（识别ssRNA）和TLR9（识别非甲基化CpG DNA）。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-fill002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "树突状细胞包括来源于骨髓共同髓样前体的___、来源于骨髓共同淋巴样前体的___和来源于间充质祖细胞的___。",
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
        "经典DC/髓样DC（cDC/mDC）；浆细胞样DC（pDC）；滤泡DC（fDC）",
        "经典DC来源于髓样前体，浆细胞样DC来源于淋巴样前体，滤泡DC（fDC）来源于间充质祖细胞。原书填空题第 6 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-fill003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "病毒感染和肿瘤靶细胞表面___分子表达缺失或低下，而非此类分子表达或___。",
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
        "MHC I类；异常【/上调】",
        "病毒感染和肿瘤靶细胞表面MHC I类分子表达缺失或低下（「迷失自己」），而异常表达或上调某些非MHC I类的配体分子（「诱导自己」），从而被NK细胞杀伤活化受体识别。原书填空题第 9 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-fill004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "固有免疫应答作用时相包括___、___和___。",
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
        "即刻固有免疫应答阶段；早期诱导固有免疫应答阶段；适应性免疫应答启动阶段",
        "固有免疫应答作用时相包括即刻阶段（0~4小时）、早期诱导阶段（4~96小时）和适应性免疫应答启动阶段（感染96小时后）。原书填空题第 10 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch14-innate-immunity-short001",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述NK细胞对肿瘤靶细胞的识别杀伤机制。",
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
        "经「迷失自己」与「诱导自己」识别模式被激活，再脱颗粒杀伤肿瘤靶细胞",
        "在自身组织细胞表面MHC I类分子正常表达时，NK细胞表面杀伤抑制受体作用占主导而不能杀伤自身细胞。细胞癌变时表面MHC I类分子缺失或表达低下（「迷失自己」），使NK杀伤抑制受体功能丧失；同时靶细胞异常表达或上调某些非MHC I类配体分子（「诱导自己」），为NK表面NKG2D/NCR等杀伤活化受体提供新或数量充足的靶标。NK细胞经「迷失自己」和「诱导自己」识别模式被激活，通过脱颗粒释放穿孔素、颗粒酶、TNF-α及表达FasL等作用方式杀伤肿瘤靶细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-short002",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述B1细胞及其识别的抗原和应答特点。",
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
        "B1细胞为CD5⁺mIgM⁺、有自我更新能力的B细胞，识别细菌多糖类及变性自身抗原，应答产生低亲和力IgM、无类别转换和免疫记忆",
        "B1细胞是具有自我更新能力的CD5⁺mIgM⁺B细胞，其表面BCR缺乏多样性，可直接识别结合某些病原体或变性自身成分所共有的抗原表位分子。B1细胞识别的抗原主要包括：①细菌表面共有多糖类TI抗原，如细菌脂多糖、细菌荚膜多糖和葡聚糖等；②变性自身抗原，如变性Ig和变性单链DNA等。B1细胞介导的体液免疫应答特点：①接受细菌多糖或变性自身抗原刺激后，48小时内即可产生以IgM为主的低亲和力抗体；②增殖分化过程中一般不发生Ig类别转换；③无免疫记忆，再次接受相同抗原刺激后抗体效价与初次应答无明显差别。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch14-innate-immunity-short003",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：列表比较固有免疫应答和适应性免疫应答的主要特征。",
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
        "固有免疫应答由固有免疫细胞/分子参与、识别胚系编码受体、无免疫记忆；适应性免疫应答由特异性淋巴细胞参与、经克隆选择、具免疫记忆",
        "①参与细胞：固有免疫为皮肤黏膜上皮细胞、巨噬细胞、中性粒细胞、肥大细胞、树突状细胞、NK细胞、ILC2、NKT、γδT、B1细胞等；适应性免疫为CD4⁺Th1、Th2、Th17、Tfh、Treg、CD8⁺CTL、B2细胞。②效应分子：固有免疫为补体、细胞因子、抗菌蛋白、穿孔素、颗粒酶、FasL等；适应性免疫为特异性抗体、细胞因子、穿孔素、颗粒酶、FasL。③作用时相：固有免疫为即刻~96小时；适应性免疫在96小时后。④识别受体：固有免疫用模式识别受体/有限多样性抗原识别受体（胚系基因直接编码，较少多样性）；适应性免疫用特异性抗原识别受体（胚系基因重排后产生，高度多样性）。⑤识别特点：固有免疫直接识别PAMP/DAMP及表面特定表位或CD1提呈的脂类/糖脂抗原（泛特异性）；适应性免疫识别APC表面MHC分子提呈的抗原肽或FDC表面捕获的抗原分子（高度特异性）。⑥作用特点：固有免疫募集活化后迅速产生效应、无免疫记忆、不发生再次应答；适应性免疫经克隆选择、扩增分化为效应细胞后发挥免疫作用，有免疫记忆，可发生再次应答。⑦维持时间：固有免疫较短、适应性免疫较长。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题（本书第14章存在，但按契约不提取为独立记分题），置空 */
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