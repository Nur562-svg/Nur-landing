import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第17章 细胞信号转导 分子机制 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：7 题
 * - A1/A2 型选择题（a1-single）：8 题
 * - 简答题（short-answer）：4 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：23 题（含 B1 组成员；须等于本文件预算 23）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 7、A1 型选择题 58、A2 型选择题 2（第 59、60 题）、
 *   B1 共用备选答案配伍 7 组、简答题 8。实取 23 道作为预算：全部 7 道名词解释、
 *   前序代表性的 A1 选择题 8 道（原书第 1、4、10、12、15、17、19、57 题，按原书顺序
 *   覆盖各受体/第二信使/激酶考点）、简答题 4 道（原书简答 1、2、4、6），以及第 61~64
 *   题共用备选答案的 B1 配伍题 1 组（4 个成员）。所有选择题正确项逐一对齐源参考答案
 *   （A1 型：I.D 4.C 10.C 12.E 15.B 17.D 19.B 57.E 对应本题；B1 型：61.C 62.D 63.B 64.A）。
 *   对书中原生文本但双栏错序造成的题干/选项打散，已按细胞信号转导医学语义恢复
 *   （受体、G蛋白、第二信使 cAMP/IP3/DAG/Ca2+、酪氨酸激酶受体、Ras-MAPK、
 *   NO/cGMP、核受体等）；“一氧化氮 NIC）/GTP”等值与原缩写保留，选项随机重排后同步
 *   correctChoiceIndex（0 起），未捏造。原书 A1 型中“不属于/属于”类题干均已还原。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch17-signal-transduction";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第17章 细胞信号转导 分子机制 复习思考题 习题（核对原书PDF 第275–288页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），7 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：受体（receptor）",
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
        "受体",
        "受体是位于细胞膜上或细胞内能特异识别配体并与之结合，进而引起生物学效应的特殊蛋白质，个别是糖脂。能够与受体特异性结合的分子称为配体（ligand）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：G 蛋白偶联受体（G protein coupled receptor）",
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
        "G蛋白偶联受体",
        "G蛋白偶联受体在结构上均为单体，氨基端位于细胞膜外表面，羧基端在胞膜内侧，完整的肽链反复跨膜 7 次，故又名七跨膜受体。此类受体通过 G 蛋白向下游传递信号，因此又称 G 蛋白偶联受体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：G 蛋白（G protein）",
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
        "G蛋白",
        "G 蛋白是鸟苷酸结合蛋白的简称，可结合 GTP 或 GDP。G 蛋白结合 GDP 时处于无活性状态；当 GDP 被 GTP 取代时，G 蛋白成为活化形式，能结合下游分子并通过别构效应激活下游分子，使相应信号通路开放。G 蛋白既可结合 GTP，本身又具有 GTP 酶活性，可将 GTP 水解为 GDP，使分子回到非活化状态，关闭下游信号通路。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：第二信使（secondary messenger）",
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
        "第二信使",
        "第二信使是细胞内负责转导跨膜信号的一类分子，主要指 cAMP、cGMP、Ca2+、IP3 等小分子化合物。这些化合物作为激素等细胞外信号分子的细胞内第二信使，作用于蛋白激酶等下游信号分子，实现细胞外信号对细胞的功能调节，并在信息传递过程中产生放大作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：单次跨膜受体（single transmembrane receptor）",
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
        "单跨膜受体",
        "单跨膜受体是指本质属于糖蛋白，只有 1 个跨膜区段，与细胞增殖、分化、分裂及癌变相关的一类受体，主要有蛋白质酪氨酸激酶型受体、蛋白质丝/苏氨酸激酶型受体、非酶类受体等。这类受体与配体结合后，有的表现为相应酶活性变化，催化受体自身和底物蛋白质的特异性氨基酸残基磷酸化；非酶类受体自身不具酶活性，但可与其结合的其他酶偶联发挥作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：衔接蛋白（adaptor protein）",
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
        "衔接蛋白",
        "衔接蛋白是介导蛋白质信号转导分子之间或蛋白质信号转导分子与脂类分子间相互作用的一类蛋白质，主要由蛋白质相互作用结构域构成，通过识别和结合将不同的信号转导蛋白质分子结合在一起，形成信号转导通路和网络。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：钙调蛋白（calmodulin）",
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
        "钙调蛋白",
        "钙调蛋白是一种钙结合蛋白，其分子中含有 4 个结构域，每个结构域可结合 1 个 Ca2+。细胞质中 Ca2+ 浓度低时，钙调蛋白不易结合 Ca2+；随着细胞质中 Ca2+ 浓度升高，钙调蛋白可结合不同数量的 Ca2+，形成不同构象的 Ca2+/钙调蛋白复合物，调节下游激酶或效应分子的活性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于目前已知细胞间信息分子（信号分子）的物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脱氧核糖核酸（DNA）",
      "类固醇激素",
      "蛋白质/肽类",
      "氨基酸及其衍生物",
      "脂类衍生物",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脱氧核糖核酸（DNA）",
        "原书 A1 型选择题第 1 题，正确答案 D（脱氧核糖核酸）。细胞间信息分子可为激素、蛋白质/肽类、氨基酸及其衍生物、脂类衍生物等，DNA 不属于细胞间信息分子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于受体与配体结合特点的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可饱和性",
      "高度专一性",
      "不可逆性",
      "特定的作用模式",
      "高亲和性",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "不可逆性",
        "原书 A1 型选择题第 4 题，正确答案 C（不可逆性）。受体与配体结合特点是高亲和性、高度专一性、可饱和性和可逆性，不可逆性不属于其结合特点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与 G 蛋白活化密切相关的核苷酸是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "GTP",
      "ATP",
      "CTP",
      "TTP",
      "UTP",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "GTP",
        "原书 A1 型选择题第 10 题，正确答案 C（GTP）。G 蛋白是鸟苷酸结合蛋白，结合 GDP 时无活性，GDP 被 GTP 取代后激活。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "PKA 所磷酸化的氨基酸主要是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "丝氨酸/苏氨酸",
      "酪氨酸/半胱氨酸",
      "甘氨酸/苏氨酸",
      "甘氨酸/丝氨酸",
      "酪氨酸/甘氨酸",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "丝氨酸/苏氨酸",
        "原书 A1 型选择题第 12 题，正确答案 E（丝氨酸/苏氨酸）。PKA 属于丝氨酸/苏氨酸蛋白激酶，主要使蛋白质的丝氨酸或苏氨酸残基磷酸化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1005",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "蛋白激酶所催化的蛋白质修饰反应是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "乙酰化",
      "磷酸化",
      "糖基化",
      "泛素化",
      "甲基化",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "磷酸化",
        "原书 A1 型选择题第 15 题，正确答案 B（磷酸化）。蛋白激酶催化蛋白质磷酸化修饰反应，将 ATP 的磷酸基转移至蛋白质底物的特定氨基酸残基上。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1006",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "鸟苷酸环化酶的底物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "cAMP",
      "ADP",
      "GTP",
      "cGMP",
      "ATP",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "GTP",
        "原书 A1 型选择题第 17 题，正确答案 D（GTP）。鸟苷酸环化酶催化 GTP 生成第二信使 cGMP。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1007",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可溶性鸟苷酸环化酶位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞质",
      "细胞核",
      "细胞膜",
      "线粒体",
      "内质网",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞质",
        "原书 A1 型选择题第 19 题，正确答案 B（细胞质）。可溶性鸟苷酸环化酶位于细胞质中（胞质可溶型），与细胞膜结合型鸟苷酸环化酶相对。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-a1008",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "霍乱毒素在体内的毒性作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "使 G 蛋白的 α 亚基发生 ADP 核糖基化",
      "使磷酸二酯酶活性丧失",
      "使腺苷酸环化酶活性丧失",
      "使 G 蛋白不能作用于下游效应分子",
      "使 G 蛋白的 α 亚基发生磷酸化",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "使 G 蛋白的 α 亚基发生 ADP 核糖基化",
        "原书 A1 型选择题第 57 题，正确答案 E（使 G 蛋白的 α 亚基发生 ADP 核糖基化）。霍乱毒素使 Gs 的 α 亚基发生 ADP 核糖基化，使其丧失 GTPase 活性并维持在活性状态，导致腺苷酸环化酶持续激活。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "受体的作用是什么？其与配体相互作用的特点有哪些？",
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
        "受体的作用及其与配体相互作用的特点",
        "受体的作用有两个方面：一是识别外源信号分子并与之结合；二是转换配体信号，使之成为细胞内分子可识别的信号，并传递至其他分子引起细胞应答。受体与配体相互作用的特点：高度专一性、高亲和力、可饱和性和可逆性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "细胞信号转导的共同规律和特征是什么？",
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
        "细胞信号转导的共同规律和特征",
        "①对于外源信息反应，信号的发生和终止十分迅速；②信号转导过程是多级酶反应，因而具有级联放大效应，以保证细胞反应的敏感性；③细胞信号转导系统具有一定的通用性，亦称为信号的会聚；④不同信号转导通路之间存在广泛的信号交联互动。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-short003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "列举 G 蛋白偶联受体介导的细胞信号转导通路。",
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
        "G蛋白偶联受体介导的信号转导通路",
        "G 蛋白偶联受体介导的细胞信号转导通路主要有：①cAMP-PKA 通路；②IP3/DAG-PKC 通路；③Ca2+/钙调蛋白依赖性蛋白激酶通路。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-short004",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "列举第二信使分子的种类及其主要特点。",
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
        "第二信使分子的种类及其主要特点",
        "第二信使分子的种类主要包括环腺苷酸（cAMP）、环鸟苷酸（cGMP）、甘油二酯（DAG）、三磷酸肌醇（IP3）、磷脂酰肌醇-3,4,5-三磷酸（PIP3）、Ca2+、NO 等。主要特点：①为细胞内具有信号转导功能的小分子化合物；②在完整细胞中，该分子的浓度或分布在外源信号的作用下发生迅速改变；③该分子类似物可模拟外源信号的作用；④阻断该分子的变化可阻断细胞对外源信号的反应；⑤该分子在细胞内有确定的靶分子；⑥可作为别构效应剂作用于靶分子；⑦其不应位于能量代谢途径的中心；⑧其在信号转导过程中的主要变化是浓度的变化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 共 4 个成员（原书 61~64 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-biochem-ch17-signal-transduction-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "蛋白酪氨酸激酶",
      "cGMP 依赖的蛋白激酶",
      "cAMP 依赖的蛋白激酶",
      "Ca2+-甘油二酯依赖的蛋白激酶",
      "Ca2+-钙调蛋白依赖的蛋白激酶",
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
        id: "ext-biochem-biochem-ch17-signal-transduction-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "蛋白激酶 A 是",
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
            "cAMP 依赖的蛋白激酶",
            "蛋白激酶 A（PKA）是 cAMP 依赖性蛋白激酶，由 cAMP 别构激活；原书 B1 型题号 61，正确答案 C（cAMP 依赖的蛋白激酶）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-biochem-ch17-signal-transduction-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "蛋白激酶 C 是",
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
            "Ca2+-甘油二酯依赖的蛋白激酶",
            "蛋白激酶 C（PKC）由 Ca2+ 与甘油二酯（DAG）依赖激活；原书 B1 型题号 62，正确答案 D（Ca2+-甘油二酯依赖的蛋白激酶）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-biochem-ch17-signal-transduction-b001m3",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "蛋白激酶 G 是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 1,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "cGMP 依赖的蛋白激酶",
            "蛋白激酶 G（PKG）是 cGMP 依赖性蛋白激酶，由第二信使 cGMP 激活；原书 B1 型题号 63，正确答案 B（cGMP 依赖的蛋白激酶）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-biochem-ch17-signal-transduction-b001m4",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可作为受体的蛋白激酶是",
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
            "蛋白酪氨酸激酶",
            "受体型蛋白激酶中具有受体作用的为蛋白酪氨酸激酶（如 EGF 受体），受体结合配体后自身酪氨酸残基磷酸化；原书 B1 型题号 64，正确答案 A（蛋白酪氨酸激酶）。",
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