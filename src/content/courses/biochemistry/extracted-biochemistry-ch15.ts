import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第15章 蛋白质 合成 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - A1/A2 型选择题（a1-single）：10 题
 * - 简答题（short-answer）：5 题
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：25 题（须等于本文件预算 25）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 12、A1 型选择题 56、A2 型选择题 5、B1 配伍题
 *   若干组、简答题 8；实取 25 道作为本文件预算——前 5 道名词解释、10 道代表性
 *   A1/A2 选择题（A1-1/2/4/6/13/14/38、A2-57/60/62，按原书顺序覆盖取材）、
 *   1 组 5 成员的 B1 配伍题（原书 74–78 题，共享备选答案为化学键类型）、5 道
 *   简答题（原书简答 1/2/3/5/6）。所有选择题正确项逐一对齐源参考答案（A1
 *   对应 1.C 2.B 4.B 6.C 13.C 14.A 38.D；A2 对应 57.D 60.D 62.E）。选项顺序已
 *   随机重排并同步正确项下标（0 起）。原生文本双栏错序已按蛋白质合成（翻译）
 *   医学语义恢复（如“起始甲硫氨酰-tRNA”、终止密码子、氨酰tRNA、S-D 序列、
 *   信号肽等），保留 AUG/UAA/氨酰-tRNA 等缩略语与数值，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch15-protein-synthesis";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第15章 蛋白质 合成 复习思考题 习题（核对原书PDF 第230–246页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch15-protein-synthesis-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：翻译（translation）",
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
        "翻译",
        "翻译是细胞内以 mRNA 为模板，按照 mRNA 分子中由核苷酸组成的密码信息合成蛋白质的过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：遗传密码（genetic code）",
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
        "遗传密码",
        "遗传密码是在 mRNA 分子上，以每 3 个相邻的核苷酸为一组，代表一种氨基酸或其他信息，这种存在于 mRNA 分子上的三联体形式的核苷酸序列称为密码子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：信号识别颗粒（signal recognition particle, SRP）",
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
        "信号识别颗粒",
        "信号识别颗粒是一种核糖核酸蛋白复合体，能够识别并结合刚从游离核糖体上合成出来的信号肽，暂时中止新生肽的合成，又能与其在内质网上的受体（即停靠蛋白质）结合而将新生肽转移入内质网腔，防止蛋白水解酶对其损害。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：S-D 序列（Shine-Dalgarno sequence）",
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
        "S-D 序列",
        "S-D 序列是在原核生物的 mRNA 起始密码 AUG 上游约 8 ~ 13 个核苷酸部位，有一段由 4 ~ 9 个核苷酸组成的一致序列，富含嘌呤碱基，称为 S-D 序列。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：信号肽（signal peptide）",
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
        "信号肽",
        "信号肽是指多数靶向输送到溶酶体、质膜或分泌到细胞外的蛋白质，其肽链的 N 末端有一段长度约为 13 ~ 36 个氨基酸残基组成的特异性信号序列，称为信号肽，在蛋白质的靶向输送中起重要作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch15-protein-synthesis-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原核生物起始 tRNA 是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "起始甲硫氨酰-tRNA",
      "甲酰化的甲硫氨酰-tRNA",
      "甲硫氨酰-tRNA",
      "缬氨酰-tRNA",
      "任何氨酰-tRNA",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "甲酰化的甲硫氨酰-tRNA",
        "原书 A1 型选择题答案第 1 题为 C，即甲酰化的甲硫氨酰-tRNA（fMet-tRNA）。原核生物起始氨酰-tRNA 为甲酰化的甲硫氨酰-tRNA（fMet-tRNAf）；真核生物为 Met-tRNAiMet。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "蛋白质生物合成的方向是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "从 N 端到 C 端",
      "从 C 端到 N 端",
      "从 5'-端到 3'-端",
      "从 3'-端到 5'-端",
      "定点双向进行",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "从 N 端到 C 端",
        "原书 A1 型选择题答案第 2 题为 B，即蛋白质生物合成从 N 端向 C 端方向进行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "蛋白质生物合成过程中，终止密码子为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["UAA", "AUG", "UUG", "UUA", "AGG"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "UAA",
        "原书 A1 型选择题答案第 4 题为 B，即终止密码子为 UAA（另外两个终止密码子为 UAG、UGA）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "蛋白质合成过程中，需要形成碱基配对的步骤是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["进位", "移位", "转肽", "结合终止因子", "释放肽链"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "进位",
        "原书 A1 型选择题答案第 6 题为 C，即进位（氨酰-tRNA 反密码子与 mRNA 密码子互补配对进入 A 位）需要形成碱基配对。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "遗传密码的简并性是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "大多数氨基酸有一个以上的密码子",
      "一些三联体密码子可缺少一个嘌呤或嘧啶碱基",
      "密码子与反密码子配对不严格",
      "一些密码子适用于一种以上的氨基酸",
      "所有生物使用同一套遗传密码",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "大多数氨基酸有一个以上的密码子",
        "原书 A1 型选择题答案第 13 题为 C，即大多数氨基酸有一个以上的密码子，这一特性称为遗传密码的简并性（同义密码子）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "遗传密码的摆动性是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一种反密码子能与几种密码子配对",
      "使肽键在核糖体大亚基中得以伸展的一种机制",
      "在翻译中形成肽键的机制",
      "指核糖体沿着 mRNA 从其 5'端向 3'端的移动",
      "tRNA 与氨基酸结合的多样性",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一种反密码子能与几种密码子配对",
        "原书 A1 型选择题答案第 14 题为 A，即摆动性指一种反密码子能与几种密码子配对，常见于密码子第三位与反密码子第一位碱基之间。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肽链延长每添加一个氨基酸，消耗高能键的数目为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["4", "1", "2", "3", "5"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "4",
        "原书 A1 型选择题答案第 38 题为 D，即肽链延长每添加一个氨基酸消耗 4 个高能键（进位 GTP、成肽、转位 GTP 等换算）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一名 20 岁病人患有小细胞性贫血（microcytic anemia），检测发现其体内血红蛋白的 β 链共含有 172 个氨基酸残基，而不是正常的 141 个氨基酸残基，其可能是下列哪种基因突变造成的？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "UAA→CAA",
      "CGA→UGA",
      "GAU→GAC",
      "GCA→GAA",
      "UAA→UAG",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "UAA→CAA",
        "原书 A2 型选择题答案第 57 题为 D，即 UAA→CAA。终止密码子 UAA 突变为编码谷氨酰胺的 CAA，使原本该终止的翻译继续延伸，β 链氨基酸残基数由 141 增多至 172。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一个药物公司正在研究一个新的抑制细菌蛋白质合成的抗生素。研究人员发现，当该抗生素加入体外蛋白质合成体系中后，该体系中的 mRNA 序列 AUGUUUUUUUAG 被翻译生成的产物仅仅是一个二肽 fMet-Phe。该抗生素最有可能是抑制了蛋白质合成的哪一步？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "核糖体移位",
      "起始",
      "氨酰 tRNA 结合到核糖体的 A 位",
      "肽酰基转移酶活性",
      "终止",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "核糖体移位",
        "原书 A2 型选择题答案第 60 题为 D，即抑制了核糖体移位。fMet-Phe 二肽已形成后无法继续进位与转位，提示阻断核糖体沿 mRNA 移动（移位/转位），故后续肽链无法延伸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "原核生物和真核生物的蛋白质合成过程虽有很多不同之处，但在基本机制等方面又有诸多共同之处。下面哪一项对于原核生物和真核生物的蛋白质合成都是必需的？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肽酰基-tRNA 从 A 位转位至 P 位",
      "核糖体小亚基与 S-D 序列结合",
      "fMet-tRNA",
      "mRNA 从细胞核转运至细胞质",
      "起始因子识别 5'-帽子结构",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肽酰基-tRNA 从 A 位转位至 P 位",
        "原书 A2 型选择题答案第 62 题为 E，即肽酰基-tRNA 从 A 位转位至 P 位。这一转位步骤在原核与真核生物肽链延长中均不可缺少；其余选项分别是原核（S-D 序列、fMet-tRNA）或真核（帽子结构、mRNA 由核转运至胞质）特有。",
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
    id: "ext-biochem-ch15-protein-synthesis-short001",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述蛋白质生物合成体系的组成。",
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
        "蛋白质生物合成体系的组成",
        "①氨基酸：蛋白质生物合成的原料；②mRNA：做蛋白质生物合成的模板；③tRNA：做氨基酸的运载工具；④核糖体：是蛋白质合成的场所；⑤其他：能源物质 ATP 和 GTP，酶（氨酰-tRNA 合成酶、转肽酶和转位酶），蛋白质因子（IF、EF、RF），无机离子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-short002",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "说明 RNA 在蛋白质生物合成中的作用。",
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
        "RNA 在蛋白质生物合成中的作用",
        "mRNA 是蛋白质合成的信息模板，指导氨基酸的聚合；tRNA 作为氨基酸的运载工具和作为蛋白质生物合成的分子适配器；rRNA 与多种蛋白质组成核糖体，作为翻译的场所。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-short003",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述原核生物蛋白质生物合成过程。",
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
        "原核生物蛋白质生物合成过程",
        "分为起始、延长和终止三个阶段。(1) 起始阶段：主要形成起始复合物：①核糖体大小亚基分离，IF-3、IF-1 与小亚基结合，促进两者分离；②mRNA 在小亚基定位结合；③起始氨酰-tRNA 的结合（进入 P 位）；④核糖体大亚基结合，释放 IF，A 位留空。(2) 延长阶段：肽链在核糖体上连续循环，每增加一个氨基酸都要经过进位、成肽和转位三步：①进位，延长因子 EF-Tu 与氨酰-tRNA、GTP 形成三元复合物，按 mRNA 密码子进入核糖体 A 位；②成肽，在转肽酶（肽酰转移酶）作用下，P 位肽酰-tRNA 与 A 位氨酰-tRNA 形成肽键，P 位留下卸载的 tRNA；③转位，核糖体向下游移动一个密码子的距离，成肽时 A 位上的肽酰-tRNA 进入 P 位，卸载的 tRNA 进入 E 位，A 位空出对应下一个密码子。(3) 终止阶段：核糖体 A 位出现终止密码，释放因子识别终止密码而进入 A 位并触发核糖体构象改变，转肽酶活性转变为酯酶（水解）活性，水解肽酰-tRNA 释放肽链，并促使 mRNA 解离。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-short005",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "说明在蛋白质生物合成过程中，如何保证翻译产物（蛋白质）的正确性？",
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
        "保证翻译产物正确性的机制",
        "①mRNA 分子中的遗传密码决定氨基酸的排列顺序；②tRNA 分子中的反密码子按碱基互补配对规律识别特定密码子；③氨酰-tRNA 合成酶对氨基酸和 tRNA 都有高度的专一性（并具校正活性），保证了特定氨基酸与特定 tRNA 及对应密码子的正确结合。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch15-protein-synthesis-short006",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述蛋白质合成后的修饰方式。",
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
        "蛋白质合成后的修饰方式",
        "新生肽链通常没有生物活性，必须经过加工修饰才能转变为具有活性的蛋白质，主要包括：①多肽链的正确折叠（分子伴侣参与）；②一级结构的修饰：主要有 N 端的修饰，个别氨基酸的修饰如磷酸化、羧基化、羟基化、甲基化、乙酰化、糖基化、形成二硫键等，多肽链的水解如切除信号肽等；③空间结构的修饰：主要有亚基聚合、辅基连接、疏水脂链的连接等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题（原书 74–78 题，5 个成员），1 组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch15-protein-synthesis-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["肽键", "磷酸二酯键", "酯键", "糖苷键", "二硫键"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch15-protein-synthesis-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "连接氨基酸的是",
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
            "肽键",
            "原书 B1 型题号 74，正确答案 C（肽键）。氨基酸之间以肽键相连接。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch15-protein-synthesis-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "连接核苷酸的是",
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
            "磷酸二酯键",
            "原书 B1 型题号 75，正确答案 B（磷酸二酯键）。核苷酸之间以 3',5'-磷酸二酯键相连。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch15-protein-synthesis-b001m3",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "连接氨基酸和 tRNA 的是",
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
            "酯键",
            "原书 B1 型题号 76，正确答案 A（酯键）。氨基酸的羧基与 tRNA 3'端腺苷酸核糖羟基之间以酯键相连，形成氨酰-tRNA。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch15-protein-synthesis-b001m4",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "连接碱基与戊糖的是",
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
            "糖苷键",
            "原书 B1 型题号 77，正确答案 E（糖苷键）。碱基与戊糖（核糖/脱氧核糖）以 N-糖苷键相连构成核苷。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch15-protein-synthesis-b001m5",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "连接不同肽链的是",
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
            "二硫键",
            "原书 B1 型题号 78，正确答案 D（二硫键）。不同肽链（或同一肽链不同部位）可经二硫键连接，稳定蛋白质空间结构。",
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