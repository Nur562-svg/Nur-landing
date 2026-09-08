import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第24章 常用分子生物学 原理及其应用 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - A1/A2 型选择题（a1-single）：12 题
 * - 简答题（short-answer）：5 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：25 题（含 B1 组成员；须等于本文件预算 25）
 * - 缺失答案：0；无法可靠提取：0
 * - 取材说明：原书本章依序含名词解释 11、A1 型选择题 34、A2 型选择题 3、
 *   B1 型配伍 3 组（题组38–40/41–43/44–46）、简答题 5。本文件按 25 道预算取材：
 *   取 5 道名词解释、12 道选择题、5 道简答、以及 1 组 B1（题组38–40，每组 3 个成员）。
 *   选择题按原书顺序跳过因双栏错序导致选项无法可靠复原的题目（如原书 A1 第 5 题
 *   “一般用作探针的物质”源参考答案为 B.氨基酸，与探针为核酸片段的分子生物学事实冲突，
 *   无法锚定唯一正确项、故换题；第 7/10/16 题选项残缺或题干被截断），实取 12 道可清洗
 *   还原的题，正确项逐一对齐源参考答案（1.A 2.E 3.A 4.D 6.E 8.B 9.B 11.C 12.A 13.B
 *   14.D 15.E）。选项顺序已随机重排并同步 correctChoiceIndex（0 起）。
 * - 恢复说明：本书为原生文本层 PDF 但双栏排版错序，题干/选项被拆散（选项字母与文字
 *   分离、同位题号相邻行的选项交错、交换箭头字符如“→”/“⇒”变形），已按常用分子生物
 *   学技术（PCR、分子杂交/Southern/Northern/Western blotting、原位杂交、DNA 测序、
 *   逆转录 PCR、实时定量 PCR、基因芯片、凝胶过滤层析等）的生化/医学语义恢复题干与
 *   选项；数值、缩略语（DNA、RNA、cDNA、mRNA、Taq DNA 聚合酶、ddNTP、SDS-PAGE、
 *   RT-PCR、EMSA、ChIP 等）均保留原文，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch24-molecular-tech";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第24章 常用分子生物学 原理及其应用 复习思考题 习题（核对原书PDF 第335–348页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch24-molecular-tech-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：探针（probe）",
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
        "探针",
        "探针是用核素、生物素或荧光染料标记的 DNA 分子末端或全链的一段序列已知的多聚核苷酸，可用于检测已固定在膜上的 DNA 或 RNA 片段的同源序列；蛋白质的检测常用抗体作为探针。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因文库（gene library）",
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
        "基因文库",
        "基因文库是指一个包含了某一生命体全部 DNA 序列的克隆群体。基因文库一般包括基因组文库和 cDNA 文库。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：PCR（polymerase chain reaction）",
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
        "PCR",
        "PCR 即聚合酶链式反应（polymerase chain reaction），是一种体外特异性扩增已知基因的方法，应用这一技术可以将微量目的 DNA 片段进行指数级扩增，主要包括变性、退火、延伸三个步骤循环进行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因芯片（gene chip）",
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
        "基因芯片",
        "基因芯片又称 DNA 微阵列（DNA microarray）。该技术在固相支持物上原位合成寡核苷酸，或将许多特定的 DNA 探针以显微打印的方式有序固化于支持物表面，然后与待测的荧光标记样品进行杂交，杂交后对芯片进行扫描并对每一探针位点的荧光信号做出检测、比较和分析，从而定性并定量地得出样品的遗传信息（基因序列及表达）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：盐析（salting precipitation）",
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
        "盐析",
        "盐析是指在蛋白质水溶液中加入中性盐，随着盐浓度增大而使蛋白质沉淀出来的现象。中性盐是强电解质、溶解度大，在溶液中与蛋白质争夺水分子，破坏其表面的水化膜，同时又大量中和蛋白质表面电荷，从而使蛋白质颗粒积聚而沉淀析出。常用的中性盐有硫酸铵、氯化钠、硫酸钠等。盐析沉淀的蛋白质在一定条件下又可重新溶解，故这种方法在蛋白质的分离、浓缩、贮存和纯化中应用广泛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），12 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch24-molecular-tech-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Southern blotting 的基本过程是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "将DNA转移到膜上，用DNA探针杂交",
      "将RNA转移到膜上，用RNA探针杂交",
      "将RNA转移到膜上，用DNA探针杂交",
      "将蛋白质转移到膜上，用抗体做探针杂交",
      "将DNA转移到膜上，用RNA探针杂交",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "将DNA转移到膜上，用DNA探针杂交",
        "原书 A1 型选择题第 1 题答案为 A。Southern blotting（DNA 印迹）将经限制性内切酶消化并电泳变性的基因组 DNA 单链分子转移到硝酸纤维素膜等固相介质上，再用探针进行 DNA-DNA 分子杂交，用于基因组 DNA 的定性定量分析。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Western blotting 的基本过程包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "将DNA转移到膜上，用DNA探针杂交",
      "将蛋白质转移到膜上，用抗体做探针杂交",
      "将RNA转移到膜上，用DNA探针杂交",
      "将DNA转移到膜上，用RNA探针杂交",
      "将RNA转移到膜上，用RNA探针杂交",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "将蛋白质转移到膜上，用抗体做探针杂交",
        "原书 A1 型选择题第 2 题答案为 E。Western blotting（蛋白质印迹/免疫印迹）是基于抗原抗体特异性免疫反应，将蛋白质从聚丙烯酰胺凝胶转移到膜上，再用特异性抗体检测蛋白质区带信号。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "印迹技术的基本操作流程是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "电泳→杂交→转移→显色",
      "电泳→显色→转移→杂交",
      "电泳→转移→杂交→显色",
      "转移→杂交→电泳→显色",
      "显色→电泳→转移→杂交",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "电泳→转移→杂交→显色",
        "原书 A1 型选择题第 3 题答案为 A。印迹技术先经琼脂糖（或聚丙烯酰胺）凝胶电泳分离 DNA/RNA/蛋白质，再将凝胶中的分子转移到硝酸纤维素膜等固相介质上（转移），最后与探针杂交并显色检测，故正确流程为“电泳→转移→杂交→显色”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "印迹技术中最常用的固相介质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "琼脂糖凝胶",
      "醋酸纤维素薄膜",
      "聚丙烯酰胺凝胶",
      "硝酸纤维素膜",
      "琼脂胶",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "硝酸纤维素膜",
        "原书 A1 型选择题第 4 题答案为 D。印迹技术中最常用的固相介质是硝酸纤维素膜（NC 膜），此外尼龙膜、PVDF 膜等也可作为固相介质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于探针的描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "用于核酸分子杂交",
      "实时定量PCR技术总是需要使用探针",
      "标记探针是为了方便后续的检测",
      "用于Southern blotting或Northern blotting",
      "已知探针序列，就可通过对探针的检测来判断核酸样品的相关信息",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "实时定量PCR技术总是需要使用探针",
        "原书 A1 型选择题第 6 题答案为 E。实时定量 PCR（RT-qPCR）既可用探针标记法（如 TaqMan 探针），也可用非探针标记法（如 SYBR Green 荧光染料），并非“总是”需要探针，故该项描述错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分子杂交实验不能用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "氨基酸",
      "单链RNA分子之间的杂交",
      "双链DNA与RNA分子之间的杂交",
      "单链DNA与RNA分子之间的杂交",
      "抗原与抗体分子之间的杂交",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "氨基酸",
        "原书 A1 型选择题第 8 题答案为 B。核酸分子杂交是依据碱基互补配对原理对核酸分子（单链/双链 DNA 或 RNA）进行的定性定量分析，氨基酸是蛋白质的基本组成单位、不属于核酸，故分子杂交不能用于氨基酸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原位杂交是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "在NC膜上进行杂交操作",
      "在凝胶电泳中进行的杂交",
      "将核酸点在NC膜上的杂交",
      "在PVDF膜上进行的杂交",
      "在组织切片或细胞涂片上进行杂交操作",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "在组织切片或细胞涂片上进行杂交操作",
        "原书 A1 型选择题第 9 题答案为 B。原位杂交（in situ hybridization, ISH）是在组织切片、细胞涂片或染色体标本上进行杂交，用于基因及其表达产物定位分析；常用的荧光原位杂交（FISH）以荧光素标记探针。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "PCR 实验的特异性主要取决于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "DNA聚合酶的种类",
      "反应体系中模板DNA的纯度",
      "引物序列、结构和长度",
      "dNTP的浓度",
      "反应的循环数",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "引物序列、结构和长度",
        "原书 A1 型选择题第 11 题答案为 C。PCR 的特异性取决于引物与模板 DNA 的互补结合，即引物序列、结构及长度的特异性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "PCR 扩增 DNA 时不需要加入的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "RNA聚合酶",
      "dNTP",
      "模板DNA",
      "Taq DNA聚合酶",
      "引物",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "RNA聚合酶",
        "原书 A1 型选择题第 12 题答案为 A。PCR 需要模板 DNA、一对引物、4 种 dNTP 及耐热 DNA 聚合酶（如 Taq DNA 聚合酶）等，RNA 聚合酶转录合成 RNA，不属于 PCR 扩增 DNA 所需的组分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关逆转录 PCR 叙述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "需要先进行PCR，再进行逆转录",
      "合成的终产物是基因组DNA",
      "在进行PCR时，模板不是cDNA",
      "该反应的最初起始模板不是DNA",
      "逆转录合成的产物是RNA",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "该反应的最初起始模板不是DNA",
        "原书 A1 型选择题第 13 题答案为 B。逆转录 PCR（RT-PCR）将 RNA 的逆转录与 PCR 结合，最初以 RNA 为模板在逆转录酶作用下合成 cDNA，再以 cDNA 为模板进行 PCR，故反应的最初起始模板不是 DNA。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "RT-PCR 可以用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "DNA序列测定",
      "基因表达分析",
      "蛋白质含量测定",
      "RNA结构分析",
      "蛋白质氨基酸序列分析",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因表达分析",
        "原书 A1 型选择题第 14 题答案为 D。RT-PCR 以 RNA 为起始模板经逆转录后扩增，常用于 RNA 的半定量分析及基因表达分析。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-a1012",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "基因组 DNA 文库是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一个转化子细胞包含所有染色体片段",
      "一个转化子细胞包含所有cDNA片段",
      "一个转化子细胞包含所有基因组DNA",
      "携带各种cDNA片段的所有转化子细胞的集合",
      "携带各种基因组DNA片段的所有转化子细胞的集合",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "携带各种基因组DNA片段的所有转化子细胞的集合",
        "原书 A1 型选择题第 15 题答案为 E。基因组 DNA 文库是将基因组 DNA 经限制性内切酶消化生成的 DNA 片段与载体连接并转入受体细胞，由携带各种基因组 DNA 片段的所有转化子细胞的集合构成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch24-molecular-tech-short001",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述印迹技术的种类及应用。",
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
        "印迹技术的种类及应用",
        "印迹技术主要分为以下几类：①DNA 印迹（Southern blotting）用于基因组 DNA 的定性定量分析；②RNA 印迹（Northern blotting）用于 mRNA 的定性定量分析；③蛋白质印迹（Western blotting）用于蛋白质的定性定量分析；④原位杂交（in situ hybridization, ISH）检测染色体、细胞和组织原位的 DNA 或 RNA。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-short002",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是基因组文库和 cDNA 文库？两者有何区别？",
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
        "基因组文库与 cDNA 文库及其区别",
        "基因文库包括基因组文库和 cDNA 文库。（1）基因组文库：从供体生物制备基因组 DNA，并用限制性内切酶切割生成适于克隆的 DNA 片段，然后在体外将这些 DNA 片段与适当的载体连接成重组分子，并转入大肠埃希菌受体细胞中。cDNA 文库是指以 mRNA 为模板，在逆转录酶及其他一系列酶的催化作用下获得的双链 cDNA，经与适当载体连接并转化到宿主细胞内进行扩增，由此构成包含着相应基因编码序列的一群克隆。（2）与基因组 DNA 克隆不同，用作 cDNA 克隆的真核 mRNA，其间隔序列早已在拼接过程中被删除，由这种成熟 mRNA 为模板转变而来的 DNA 基因自然也不含非编码序列；cDNA 克隆除以 mRNA 为起始材料外，其构建较为简易，且因每一个 cDNA 克隆都只含一种 mRNA 序列，选择中假阳性的概率也较低。基因组文库克隆的是全部遗传信息、不受调控影响；cDNA 文库编码的是不完全的编码 DNA 序列，因此受发育和调节因子的影响。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-short003",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是双向电泳？相比其他电泳，双向电泳有何优势？又有什么用途？",
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
        "双向电泳及其优势与用途",
        "双向电泳（two-dimensional electrophoresis, 2-DE）是等电聚焦电泳和 SDS-PAGE 的组合，即先进行等电聚焦电泳（按照等电点分离），再进行 SDS-PAGE（按照分子大小分离），经染色得到的电泳图是一个二维分布的蛋白质图。优势：2-DE 使分离分辨率大大提高、获得的信息明显增多，是目前电泳技术中分辨率最高、信息获得最多的技术，常用于分析复杂样品及绘制蛋白质组图谱，是蛋白质组学研究的核心技术。用途：利用 2-DE 技术不仅能够了解样品中各蛋白的等电点、分子量、丰度等信息，更重要的是还可以利用比较双向电泳的方法了解样品中各蛋白的动态变化情况；还可以利用质谱技术结合数据库检索对感兴趣的蛋白点进行种类鉴定，因此 2-DE 是目前蛋白质组学研究中的核心技术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-short004",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常用于研究 DNA 与蛋白质相互作用的方法有哪些？其原理分别是什么？",
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
        "DNA 与蛋白质相互作用研究方法及其原理",
        "检测 DNA 与蛋白质相互作用主要有三种方法：①yeast one-hybrid（酵母单杂交）：类似于酵母双杂交系统，但将酵母转录因子 GAL4 的 DNA 结合结构域置换为其他蛋白，只要这种蛋白能与目的基因相互作用，就可以通过 GAL4 的转录激活结构域激活 RNA 聚合酶，并启动对下游报告基因的转录；②EMSA（电泳迁移率变动测定）：蛋白质与特定寡核苷酸探针结合，将增大其分子量，使其在凝胶中的电泳速度慢于游离探针，即表现为条带相对滞后，可检测蛋白质和 DNA 序列体外相互结合；③ChIP（染色质免疫沉淀）：在活细胞状态下固定蛋白质-DNA 复合物，并将其随机切断为一定长度范围内的染色质小片段，然后通过针对蛋白特异的抗体沉淀此复合体，继而利用 PCR 技术特异性地富集与目的蛋白结合的 DNA 片段，从而获得蛋白质与 DNA 相互作用的信息，ChIP 法主要用于研究体内 DNA 与蛋白质相互作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch24-molecular-tech-short005",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常用于研究蛋白质与蛋白质相互作用的方法有哪些？其原理分别是什么？",
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
        "蛋白质与蛋白质相互作用研究方法及其原理",
        "常用检测蛋白质之间相互作用的方法主要有：①标签融合蛋白结合实验（pull-down）：利用一种带有特定标签的纯化融合蛋白作为钓饵，在体外与另一种待检测的纯化蛋白或含有此待测蛋白的细胞裂解液温育，然后用可结合蛋白标签的琼脂糖珠将融合蛋白沉淀回收，洗脱液经电泳分离并染色，与融合蛋白有直接相互作用的待检测蛋白在电泳胶中可检测到相应条带；目前最常用的特定标签是 GST 和 His 标签，可用于分析蛋白质分子间的直接相互作用；②酵母双杂交：利用转录因子激活报告基因的表达来检测蛋白质-蛋白质相互作用。真核基因转录因子通常含有两个功能相对独立的结构域，即 DNA 结合域（DBD）和转录激活域（TAD），其转录激活作用需要这两个结构域共同完成；当 DBD 和 TAD 分别融合蛋白质分子后，就可依靠所融合分子间的相互作用而恢复对报告基因的表达激活；③免疫共沉淀：实验室还常用免疫共沉淀法检测细胞内蛋白质之间的相互作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：1 组 × 3 成员（原书题组38–40） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch24-molecular-tech-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "将DNA转移到膜上，用DNA探针杂交",
      "将RNA转移到膜上，用DNA探针杂交",
      "将蛋白质转移到膜上，用抗体做探针杂交",
      "将RNA转移到膜上，用抗体做探针杂交",
      "将DNA转移到膜上，用RNA探针杂交",
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
        id: "ext-biochem-ch24-molecular-tech-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Southern blotting 的基本过程包括",
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
            "将DNA转移到膜上，用DNA探针杂交",
            "原书 B1 型题组（38–40）第 38 题答案为 A。Southern blotting 将 DNA 转移到膜上，用 DNA 探针杂交。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch24-molecular-tech-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Northern blotting 的基本过程包括",
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
            "将RNA转移到膜上，用DNA探针杂交",
            "原书 B1 型题组（38–40）第 39 题答案为 B。Northern blotting 将 RNA 转移到膜上，用 DNA 探针杂交。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch24-molecular-tech-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Western blotting 的基本过程包括",
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
            "将蛋白质转移到膜上，用抗体做探针杂交",
            "原书 B1 型题组（38–40）第 40 题答案为 C。Western blotting 将蛋白质转移到膜上，用抗体做探针杂交。",
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