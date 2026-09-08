import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第3章 酶与酶促反应 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - A1/A2 型选择题（a1-single）：6 题
 * - 简答题（short-answer）：8 题
 * - B1 配伍题：1 组、共 3 个成员（(72~74)题共用备选答案，三类可逆性抑制的动力学特点）
 * - 独立记分题合计：23 题（须等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 17、A1 型选择题 50、A2 型选择题 6、B1
 *   配伍题若干组、简答题 11。按原书顺序实取 23 道作为预算：名词解释取前 6 道
 *   （酶/单体酶/缀合酶/寡聚酶/多酶体系/多功能酶）、A1 选择题取 1/3/10/22/34/49
 *   六道（覆盖特异性、酶的本质、同工酶、米氏常数 Km、竞争性抑制、共价修饰）、
 *   B1 组取 (72~74) 共 3 个成员（竞争性/非竞争性/反竞争性抑制动力学特点）、
 *   简答题取 1/2/3/4/6/7/8/9 八道。所有 A1 选择题正确项均已对照源参考答案
 *   （1.B 3.E 10.B 22.B 34.D 49.E，B1：72.E 73.A 74.D），选项已随机重排并同步
 *   correctChoiceIndex（0 起）。原生文本双栏错序已按酶学医学语义恢复（米氏方程、
 *   Km/Vmax、竞争性抑制、辅因子、别构调节等），数值、公式、缩写（Km、Vmax、
 *   [S]、LDH、CoA、FAD、NAD+、PABA 等）均按原文保留，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch3-enzyme";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第3章 酶与酶促反应 复习思考题 习题（核对原书PDF 第43–58页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch3-enzyme-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：酶（enzyme）",
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
        "酶",
        "酶（enzyme）是由活细胞产生的、对其底物具有高度催化效能和高度特异性的一类蛋白质，是生物体内最重要的一类生物催化剂。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：单体酶（monomeric enzyme）",
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
        "单体酶",
        "单体酶（monomeric enzyme）是指由一条多肽链构成的酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：缀合酶（conjugated enzyme）",
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
        "缀合酶",
        "缀合酶（conjugated enzyme）是由蛋白质部分和非蛋白质部分共同组成的酶。其中蛋白质部分称为酶蛋白，决定酶促反应的特异性和催化机制；非蛋白质部分称为辅因子，包括小分子有机化合物和金属离子，决定反应的类型和性质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：寡聚酶（oligomeric enzyme）",
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
        "寡聚酶",
        "寡聚酶（oligomeric enzyme）是指由多个相同或不同的亚基以非共价键连接组成的酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：多酶体系（multienzyme system）",
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
        "多酶体系",
        "多酶体系（multienzyme system）是指几种具有不同催化功能的酶彼此聚合形成的多酶复合物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：多功能酶（multifunctional enzyme）",
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
        "多功能酶",
        "多功能酶（multifunctional enzyme）是指在一条肽链上同时具有多种不同催化功能的酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch3-enzyme-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在酶促反应中，决定反应特异性的是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["辅基", "酶蛋白", "金属离子", "别构效应剂", "竞争性抑制剂"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酶蛋白",
        "原书 A1 型选择题答案第一题为 B，即酶蛋白。酶的催化特异性主要由酶蛋白决定，而辅因子（如金属离子）主要决定反应的类型与性质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列有关酶的论述，正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "体内所有具有催化活性的物质都是酶",
      "酶在体内不能更新",
      "酶不具有高级结构",
      "酶能改变反应的平衡点",
      "酶是由活细胞合成的对其底物具有高度特异性和高度催化效能的蛋白质",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酶是由活细胞合成的对其底物具有高度特异性和高度催化效能的蛋白质",
        "原书 A1 型选择题答案第三题为 E，即酶是由活细胞合成的对其底物具有高度特异性和高度催化效能的蛋白质。酶不能改变反应的平衡点，也不具备体内所有催化活性物质即酶的特征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关同工酶的叙述，正确的选项是？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "催化不同的化学反应，但酶蛋白的分子结构和理化性质相同的一组酶",
      "同工酶在体内各组织器官的分布酶谱相同",
      "催化相同的化学反应，但酶蛋白的分子结构和理化性质不同的一组酶",
      "某些同工酶在临床上可用于疾病的诊断，但意义不大",
      "乳酸脱氢酶（LDH）有五种同工酶，在pH 8.6的条件下电泳时，从负极到正极电泳谱带的次序是LDH1—LDH2—LDH3—LDH4—LDH5",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "催化相同的化学反应，但酶蛋白的分子结构和理化性质不同的一组酶",
        "原书 A1 型选择题答案第十题为 B。同工酶指催化的化学反应相同，但酶蛋白的分子结构、理化性质乃至免疫学性质不同的一组酶。LDH 有 H 型和 M 型两种亚基组成五种同工酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "米氏常数 Km 是指？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "当速率为最大反应速率一半时的底物浓度",
      "当速率为最大反应速率一半时的酶浓度",
      "当速率为最大反应速率一半时的抑制剂浓度",
      "当速率为最大反应速率一半时的pH",
      "当速率为最大反应速率一半时的温度",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "当速率为最大反应速率一半时的底物浓度",
        "原书 A1 型选择题答案第二十二题为 B，即 Km 等于 v 为 1/2 Vmax 时的底物浓度 [S]。Km 是酶的特征性常数，只与酶的结构、底物结构、反应环境（pH、温度和离子强度）有关，而与酶浓度无关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "丙二酸对琥珀酸脱氢酶的抑制作用属于下列哪一种？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "非特异性抑制",
      "非竞争性抑制",
      "反竞争性抑制",
      "不可逆抑制",
      "竞争性抑制",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "竞争性抑制",
        "原书 A1 型选择题答案第三十四题为 D，即丙二酸对琥珀酸脱氢酶的抑制作用是竞争性抑制。丙二酸与琥珀酸结构类似，可与底物竞争结合琥珀酸脱氢酶的活性中心。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "酶的共价修饰调节中最常见的修饰方式是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "腺苷化/脱腺苷化",
      "磷酸化/脱磷酸化",
      "甲基化/脱甲基化",
      "乙酰化/脱乙酰化",
      "-SH/-S-S-",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "磷酸化/脱磷酸化",
        "原书 A1 型选择题答案第四十九题为 E，即磷酸化/脱磷酸化是酶的共价修饰调节中最常见的修饰方式。磷酸化需要消耗 ATP，但远少于重新合成酶蛋白，是酶活性调节经济有效的方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），8 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch3-enzyme-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "影响酶促反应速率的因素有哪些？这些因素分别是如何发挥作用的？",
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
        "影响酶促反应速率的因素及作用机制",
        "影响因素包括：底物浓度、酶浓度、温度、pH、激活剂、抑制剂等。①底物对酶促反应的影响：在酶浓度不变时，不同的底物浓度与反应速率的关系呈矩形双曲线；②酶浓度对酶促反应的影响：当反应系统中底物的浓度足够大时，酶促反应速率与酶浓度成正比；③温度对酶促反应的影响：具有双重性；④pH 对酶促反应的影响：酶催化活性最高时溶液的 pH 称为酶的最适 pH；⑤抑制剂对酶促反应的影响：凡是能降低酶促反应速率、但不引起酶分子变性失活的物质统称为酶的抑制剂；⑥激活剂对酶促反应的影响：能够促使酶促反应速率加快的物质称为酶的激活剂。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是全酶？在酶促反应中，酶蛋白与辅因子分别起什么作用？",
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
        "全酶的定义及酶蛋白与辅因子的作用",
        "全酶是由酶蛋白与相应辅因子结合形成的复合物。酶蛋白主要决定酶促反应的特异性及其催化机制；辅因子决定反应的类型与性质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 Km 及 Vmax 的意义。",
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
        "Km 及 Vmax 的意义",
        "(1) Km：等于酶促反应速率为最大速率一半时的底物浓度。是酶的特征性常数，与酶的结构、底物结构以及反应环境的温度、pH 和离子强度有关，而与酶浓度无关。不同的酶 Km 值不同，同一种酶与不同底物反应 Km 值也不同。Km 值在一定条件下可表示酶对底物的亲和力大小：Km 值越大，亲和力越小；Km 值越小，亲和力越大。(2) Vmax：酶完全被底物饱和时的反应速率。当酶的总浓度和最大速率已知时，Vmax 可用于酶的转换数的计算，即单位时间内每个酶分子催化底物转变为产物的分子数。酶的转换数可用来表示酶的催化效率。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short004",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "酶促反应有哪些特点？",
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
        "酶促反应的特点",
        "①酶促反应具有极高的效率；②酶对底物具有高度的特异性；③酶促反应的可调节性；④酶具有不稳定性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short005",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是酶的竞争性抑制？利用竞争性抑制作用的原理阐明磺胺类药物的抑菌作用机制。",
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
        "酶的竞争性抑制及磺胺类药物的抑菌机制",
        "酶的竞争性抑制是指抑制剂与底物结构相似，竞争结合酶的活性中心而阻碍酶与底物的结合，使酶的活性降低。磺胺类药物的抑菌作用是由于磺胺类药物与对氨基苯甲酸（PABA）具有类似结构。对氨基苯甲酸是某些细菌合成二氢叶酸的原料，后者进一步转变成四氢叶酸，而四氢叶酸是合成核苷酸不可缺少的辅酶。由于磺胺类药物能与对氨基苯甲酸竞争结合二氢蝶酸合酶的活性中心，使二氢叶酸合成受抑制，导致细菌核酸合成障碍而抑制细菌增殖。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short006",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简要比较三种可逆性抑制作用的特点。",
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
        "三种可逆性抑制作用的特点比较",
        "(1) 竞争性抑制作用：抑制剂与底物结构相似，竞争结合酶的活性中心，阻碍酶与底物结合形成中间产物。抑制程度取决于抑制剂与酶的相对亲和力及与底物浓度的相对比例。增大底物浓度可降低甚至消除抑制剂的抑制作用。动力学特点：Km 值增大，Vmax 不变。(2) 非竞争性抑制作用：抑制剂结合在酶活性中心以外的部位，不影响酶与底物的结合。抑制程度只与抑制剂的浓度有关。动力学特点：Km 不变，Vmax 降低。(3) 反竞争性抑制作用：抑制剂与酶-底物复合物（ES）结合，生成 ESI 三元复合物不能解离出产物。动力学特点：Km 和 Vmax 均降低。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short007",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是酶原和酶原激活？说明酶原激活的生理意义。",
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
        "酶原、酶原激活及其生理意义",
        "有些酶在细胞内合成或初分泌时处于无活性状态，称为酶原。在一定条件下，酶原被水解掉一个或几个特定的肽键，使构象发生改变而表现出酶活性。这种由无活性酶原转变为有活性酶的过程称酶原激活。生理意义：消化系统的蛋白酶以酶原的形式分泌，一方面可保护合成酶的细胞本身不受酶的水解破坏，另一方面保证酶在特定部位与环境发挥催化作用。此外，酶原还可视为酶的贮存形式。如凝血和纤溶酶类以酶原的形式在血液循环中运行，一旦需要则转化为有活性的酶，发挥其对机体的保护作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch3-enzyme-short008",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是酶的别构调节？举例说明别构调节的作用机制。",
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
        "酶的别构调节及其作用机制",
        "小分子代谢物（称为别构效应剂）与一些酶的活性中心以外的某一部位可逆结合，引起酶分子构象变化，从而改变酶的活性，这种调节即为酶的别构调节。作用机制：别构效应剂通过非共价键与酶分子的调节部位结合，引起酶的构象改变，从而影响酶与底物的结合，使酶的活性受到抑制或激活。例如，柠檬酸与乙酰 CoA 羧化酶结合后使之构象发生改变，由无活性的单体聚合成有活性的多聚体而促进脂肪酸的合成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题（(72~74)题共用备选答案：三类可逆性抑制的动力学特点），1 组共 3 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch3-enzyme-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "表观Km值增大，Vmax不变",
      "表观Km值降低，Vmax不变",
      "表观Km值不变，Vmax增大",
      "表观Km值不变，Vmax降低",
      "表观Km值和Vmax均降低",
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
        id: "ext-biochem-ch3-enzyme-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "反竞争性抑制剂的作用特点是",
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
            "表观Km值和Vmax均降低",
            "原书 B1 型配伍题第 72 题为 E。反竞争性抑制剂只与酶-底物复合物（ES）结合，动力学特点是 Km 和 Vmax 均降低。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch3-enzyme-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "竞争性抑制剂的作用特点是",
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
            "表观Km值增大，Vmax不变",
            "原书 B1 型配伍题第 73 题为 A。竞争性抑制剂与底物结构相似，与底物竞争结合酶的活性中心，增大底物浓度可解除抑制；动力学特点是表观 Km 增大、Vmax 不变。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch3-enzyme-b001m3",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "非竞争性抑制剂存在时，酶促反应动力学的特点是",
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
            "表观Km值不变，Vmax降低",
            "原书 B1 型配伍题第 74 题为 D。非竞争性抑制剂与酶活性中心外的必需基团结合，不影响酶与底物的结合；动力学特点为 Km 不变、Vmax 降低。",
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
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];