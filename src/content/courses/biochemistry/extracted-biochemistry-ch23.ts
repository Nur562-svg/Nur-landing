import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第23章 NA重组 和 重组DNA技术 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - A1/A2 型选择题（a1-single）：8 题
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：20 题（含 B1 组成员；须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 10、A1 型选择题 38、A2 型选择题 2、B1 型配伍题 2 组
 *   （41～45 转化/转导/转染/接合/感染、46～50 常用工具酶）、简答题 8。本文件按 20 道预算
 *   在原书顺序中取材：名词解释前 5 道（同源重组、转座、转化、载体、克隆载体）、A1 型代表
 *   性题 8 道（同源重组本质、双链断裂错误描述、获得完全相同拷贝的方法、免疫球蛋白基因
 *   重排机制、不属于原核表达载体必备元件、限制性核酸内切酶定义、目的基因与载体连接的酶、
 *   转化定义）、简答题 2 道（重组DNA技术基本操作步骤、重组体的筛选与鉴定方法）、B1 型
 *   1 组 5 个成员（46～50 常用工具酶）。所有选择题均映射为 a1-single / b1，正确项逐一对齐
 *   源参考答案（A1:1.C 3.C 4.A 5.C 9.D 16.B 20.D 28.C；B1:46.C 47.B 48.D 49.E 50.A）。
 *   选项顺序已随机重排并同步 correctChoiceIndex（0 起）。本书为原生文本层但双栏排版错序，
 *   题干/选项被打散，已按 DNA 重组技术医学语义恢复补全（限制性核酸内切酶、DNA连接酶、
 *   质粒/载体、拓扑/复制、转化/转染/转导/接合、同源/位点特异性/转座重组等），数值、
 *   结构、缩略语（RE、cDNA、PCR、poly(A)、MCS 等）均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch23-recombinant-dna";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第23章 NA重组 和 重组DNA技术 复习思考题 习题（核对原书PDF 第323–334页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch23-recombinant-dna-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：同源重组（homologous recombination）",
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
        "同源重组",
        "同源重组是在两个相似或相同 DNA 分子之间核苷酸序列互换的一种遗传重组，又称基本重组（general recombination）。在哺乳动物的配子发生的减数分裂过程中，同源重组可产生 DNA 序列的新重组，标志着后代的遗传变异；不同种属的细菌和病毒也在水平基因转移中用同源重组互换遗传物质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：转座（transposition）",
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
        "转座",
        "转座是由插入序列（insertion sequences，IS）和转座子（transposon，Tn）介导的基因移位或重排。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：转化（transformation）",
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
        "转化",
        "转化是受体菌通过细胞膜直接从周围环境中摄取并掺入外源遗传物质、引起自身遗传改变的过程。受体菌必须处于敏化状态，这种敏化状态可以通过自然饥饿、生长密度或实验室诱导而达到。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：载体（vector）",
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
        "载体",
        "载体是能携带目的外源 DNA 片段、实现外源 DNA 在受体细胞中无性繁殖或表达蛋白质所采用的一些 DNA 分子，具备自主复制起始位点、单一酶切位点或整合位点及筛选标志。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：克隆载体（cloning vector）",
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
        "克隆载体",
        "克隆载体是指用于外源 DNA 片段的克隆和在受体细胞中扩增的 DNA 分子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch23-recombinant-dna-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于同源重组的正确描述是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "发生在两个 DNA 分子同源序列间的单链或双链片段的交换",
      "需要一段特定 DNA 序列的参与",
      "由转座酶催化",
      "仅仅发生在两个相同的 DNA 分子的片段之间",
      "需要参与重组的一条双链中两条单链都被切开",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "发生在两个 DNA 分子同源序列间的单链或双链片段的交换",
        "原书 A1 型选择题答案第一题为 C，即同源重组发生在两个 DNA 分子同源序列间的单链或双链片段的交换。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于双链 DNA 的断裂，下列哪一项描述是错误的？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可涉及非同源重组",
      "总是涉及同源重组",
      "与哺乳动物中的异源二聚体（Ku）有关",
      "可以引起突变或者基因表达的异常调节",
      "可导致遗传信息丢失",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "总是涉及同源重组",
        "原书 A1 型选择题答案第三题为 C，即“总是涉及同源重组”的描述是错误的。双链 DNA 断裂既可涉及同源重组（非同源末端连接修复与否、Ku 异源二聚体等），并非总是涉及同源重组。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "获得完全一样的 DNA 拷贝的方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "PCR",
      "克隆扩增",
      "逆转录合成",
      "DNA 转座",
      "DNA 片段的连接",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "克隆扩增",
        "原书 A1 型选择题答案第四题为 A，即获得完全一样的 DNA 拷贝的方法是克隆扩增。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫球蛋白基因重排的分子机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "同源重组",
      "位点特异性重组",
      "接合作用",
      "转座重组",
      "转导作用",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "位点特异性重组",
        "原书 A1 型选择题答案第五题为 C，即免疫球蛋白基因重排的分子机制是位点特异性重组。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一项不属于原核表达载体上的必备元件？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "克隆位点",
      "Poly(A) 加尾信号",
      "启动子",
      "终止子",
      "筛选标志基因",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Poly(A) 加尾信号",
        "原书 A1 型选择题答案第九题为 D，即 Poly(A) 加尾信号不属于原核表达载体上的必备元件（Poly(A) 加尾信号是真核表达调控元件）。原核表达载体的必备条件是筛选标志、强启动子、适当的翻译控制序列及多克隆位点（MCS）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能识别特异 DNA 序列并在识别位点或其周围切割双链的一类酶是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "限制性核酸内切酶",
      "核酸末端转移酶",
      "核酸内切酶",
      "核酸外切酶",
      "限制性核酸外切酶",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "限制性核酸内切酶",
        "原书 A1 型选择题答案第十六题为 B，即能识别特异 DNA 序列并在识别位点或其周围切割双链的酶是限制性核酸内切酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在 DNA 重组技术中，将目的基因与载体连接起来的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "DNA 连接酶",
      "T4 DNA 聚合酶",
      "Klenow 片段",
      "限制性核酸内切酶",
      "逆转录酶",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA 连接酶",
        "原书 A1 型选择题答案第二十题为 D，即在 DNA 重组技术中，将目的基因与载体连接起来的是 DNA 连接酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在分子生物学领域中，转化（transformation）是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "摄取外来 DNA，引起细胞生物学类型的改变",
      "由病毒介导的发生在供体细胞与受体细胞之间的 DNA 转移",
      "基因转位",
      "产生移码突变",
      "质粒 DNA 从一个细胞转移到另一个细胞",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "摄取外来 DNA，引起细胞生物学类型的改变",
        "原书 A1 型选择题答案第二十八题为 C，即在分子生物学领域中，转化是指摄取外来 DNA，引起细胞生物学类型的改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组、共 5 个成员（原书 46～50 常用工具酶） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch23-recombinant-dna-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "限制性核酸内切酶",
      "DNA 连接酶",
      "DNA 聚合酶 I",
      "Klenow 片段",
      "逆转录酶",
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
        id: "ext-biochem-ch23-recombinant-dna-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt:
          "具有 5'→3' 聚合、3'→5' 外切及 5'→3' 外切活性，用于合成双链 cDNA 分子或片段连接的是",
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
            "DNA 聚合酶 I",
            "原书 B1 型题第 46 题答案为 C，即 DNA 聚合酶 I。其具有 5'→3' 聚合活性、3'→5' 外切活性及 5'→3' 外切活性，可用于合成双链 cDNA 分子或片段连接。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch23-recombinant-dna-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt:
          "催化 DNA 中相邻的 5'-磷酸基团和 3'-羟基末端之间形成磷酸二酯键，使 DNA 切口封合或使两个 DNA 分子或片段连接起来的是",
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
            "DNA 连接酶",
            "原书 B1 型题第 47 题答案为 B，即 DNA 连接酶。其催化 DNA 中相邻的 5'-磷酸基团和 3'-羟基末端之间形成磷酸二酯键，使切口封合或使两个 DNA 分子或片段连接。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch23-recombinant-dna-b001m3",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "具有完整聚合及 3'→5' 外切活性，但缺乏 5'→3' 外切活性的是",
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
            "Klenow 片段",
            "原书 B1 型题第 48 题答案为 D，即 Klenow 片段（DNA 聚合酶 I 的大片段）具有完整聚合及 3'→5' 外切活性，但缺乏 5'→3' 外切活性。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch23-recombinant-dna-b001m4",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt:
          "以 RNA 为模板的 DNA 聚合酶，用于合成 cDNA，也可用于替代 DNA 聚合酶 I 进行缺口填补、标记或 DNA 序列分析的是",
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
            "逆转录酶",
            "原书 B1 型题第 49 题答案为 E，即逆转录酶。它以 RNA 为模板合成 cDNA，也可用于替代 DNA 聚合酶 I 进行缺口填补、标记或 DNA 序列分析。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch23-recombinant-dna-b001m5",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能够识别特异序列、切割 DNA 的是",
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
            "限制性核酸内切酶",
            "原书 B1 型题第 50 题答案为 A，即限制性核酸内切酶能够识别特异序列、切割 DNA。",
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

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch23-recombinant-dna-short001",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "重组 DNA 技术的基本操作步骤是什么？",
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
        "重组 DNA 技术的基本操作步骤",
        "重组 DNA 技术（DNA 克隆）的基本操作步骤包括：①目的 DNA 的分离获取（分）；②载体的选择与准备（选）；③目的 DNA 与载体的连接（连）；④重组 DNA 转入受体细胞（转）；⑤重组体的筛选及鉴定（筛）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch23-recombinant-dna-short002",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "重组体的筛选与鉴定包括哪些方法？",
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
        "重组体筛选与鉴定的方法",
        "重组体的筛选与鉴定方法包括：①遗传标志筛选法：利用抗生素抗性标志筛选；利用基因的插入失活/插入表达特性筛选；利用标志补救筛选；利用噬菌体的包装特性进行筛选。②序列特异性筛选法：RE 酶切法、PCR 法、核酸杂交法、DNA 测序法。③亲和筛选法（基于抗原-抗体反应或配体-受体反应）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
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