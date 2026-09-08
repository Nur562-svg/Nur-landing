import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第2章 核酸 结构与功能 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - A1 型选择题（a1-single）：8 题
 * - 简答题（short-answer）：4 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：21 题（须等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：0（有效题按原书顺序取满预算，未换题）
 * - 说明：本章原书依序含名词解释 11、A1 型选择题 40、A2 型选择 4、B1 配伍
 *   5 组共 20 成员、简答题 6。本文件取满 21 道独立记分题：全部 5 道名词解释
 *   中的前 5 道（DNA 一级结构、双螺旋结构、DNA 变性、熔解温度、DNA 复性）、
 *   前 8 道代表性 A1 选择题、4 道简答题，以及 B1 配伍的第 4 组（51–54 题共用
 *   备选答案，倒L形/三叶草/双螺旋/超螺旋/核小体）全部 4 个成员。所有选择/配伍
 *   正确项均逐一对齐源参考答案（A1：1.C 2.E 3.A 4.C 5.D 6.D 7.C 8.A；
 *   B1：51.D 52.E 53.B 54.A），选项顺序已随机重排并同步 correctChoiceIndex（0 起）；
 *   第 61 题源答案“G”系双栏错序的 OCR 错字，按其义恢复为 C（DNA 变性）。
 *   原生文本双栏错序已按医学语义恢复，数值/结构/缩写保留，未捏造。
 *
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch2-nucleic-acid";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第2章 核酸 结构与功能 复习思考题 习题（核对原书PDF 第31–42页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch2-nucleic-acid-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA 的一级结构（primary structure of DNA）",
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
        "DNA 的一级结构",
        "DNA 的一级结构指从 DNA 5'-端到 3'-端的核苷酸排列顺序，即核苷酸序列。通常以碱基序列表示，储存遗传信息。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：双螺旋结构（the double helix structure）",
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
        "双螺旋结构",
        "双螺旋结构通常指美国科学家 Watson 和英国科学家 Crick 于 1953 年提出的 DNA 结构。DNA 由两条反向平行的多聚核苷酸链以右手螺旋方式围绕同一轴心缠绕成为双螺旋结构。其中脱氧核糖和磷酸组成的骨架位于双螺旋的外侧，嘌呤和嘧啶则位于双螺旋的内侧，两条多聚核苷酸链的碱基之间形成了特定的碱基互补配对关系。RNA 中也存在局部的双螺旋结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA 变性（DNA denaturation）",
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
        "DNA 变性",
        "在某些物理因素（温度、pH、离子强度等）或化学因素（尿素）的影响下，DNA 分子失去生物活性。此时，DNA 分子不再具有致密的、双链的螺旋结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：熔解温度（melting temperature, Tm）",
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
        "熔解温度",
        "DNA 热变性过程中，溶液的紫外吸光度 A260 的增加达到最大增色一半时的温度被定义为熔解温度（melting temperature，Tm），亦称解链温度。此时 50% 的 DNA 双链解开形成单链。Tm 值与 DNA 长度、GC 含量和离子强度呈正相关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA 复性（DNA renaturation）",
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
        "DNA 复性",
        "除去变性因素，DNA 解离的两条单链重新互补配对，恢复原来的双螺旋结构，这一现象称为 DNA 复性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch2-nucleic-acid-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "组成核酸分子的碱基主要有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "A、U、C、G、Ψ",
      "A、T、C、G",
      "A、U、C、G",
      "A、T、C、G、U",
      "A、U、C、G、I",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "A、T、C、G、U",
        "原书 A1 型选择题答案第 1 题为 C。DNA 含碱基 A、T、C、G，RNA 含 A、U、C、G，故组成核酸分子的碱基主要包括 A、T、C、G、U 五种。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "核酸中核苷酸之间的连接键是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "5'、3'-磷酸二酯键",
      "氢键",
      "N-糖苷键",
      "肽键",
      "3'、5'-磷酸二酯键",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "3'、5'-磷酸二酯键",
        "原书 A1 型选择题答案第 2 题为 E。核苷酸之间通过 3'、5'-磷酸二酯键共价连接形成核酸链，链的方向均为 5'-端至 3'-端。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "核苷酸的碱基通过糖苷键连接到戊糖的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "C-1'",
      "C-5'",
      "C-3'",
      "C-2'",
      "C-4'",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C-1'",
        "原书 A1 型选择题答案第 3 题为 A。戊糖的 C-1' 与嘌呤的 N-9 或嘧啶的 N-1 通过 β-N-糖苷键连接形成核苷。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于 DNA 二级结构的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "水性环境和生理条件下的溶液中 B 型双螺旋结构最稳定",
      "DNA 三链结构在不破坏 Watson-Crick 氢键的前提下形成 Hoogsteen 氢键",
      "A 型 DNA 在比 B 型 DNA 更低相对湿度的环境中形成，仍保持右手螺旋结构",
      "DNA 的端粒可形成 G-四链结构",
      "天然 DNA 分子中不存在左手螺旋结构",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "天然 DNA 分子中不存在左手螺旋结构",
        "原书 A1 型选择题答案第 4 题为 C。天然 DNA 分子中可存在左手螺旋 Z 型 DNA，故该项说法错误。其余选项分别符合 B 型双螺旋最稳定、三链结构经 Hoogsteen 氢键、A 型 DNA 在更低相对湿度下保持右手螺旋、端粒可形成 G-四链结构等正确描述。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "核苷酸中参与糖苷键形成的嘌呤原子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "N-1",
      "N-7",
      "N-9",
      "N-3",
      "N-1 和 N-9",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "N-9",
        "原书 A1 型选择题答案第 5 题为 D。戊糖的 C-1' 与嘌呤的 N-9 通过 β-N-糖苷键连接形成核苷（嘧啶则为 N-1）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "构成核酸链亲水性骨架的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "碱基与戊糖",
      "碱基与磷酸",
      "戊糖与磷酸",
      "嘌呤与嘧啶",
      "核糖与脱氧核糖",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "戊糖与磷酸",
        "原书 A1 型选择题答案第 6 题为 D。脱氧核糖和磷酸组成的亲水性骨架位于双螺旋的外侧，将互补碱基对包埋在 DNA 双螺旋结构内部。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "结构中不含核苷酸的辅酶是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "NAD+",
      "FMN",
      "TPP",
      "FAD",
      "NADP+",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "TPP",
        "原书 A1 型选择题答案第 7 题为 C。硫胺素焦磷酸（TPP）由噻唑环和嘧啶环经亚甲基桥相连，结构中不含核苷酸（腺苷酸）；而 NAD+、FAD、FMN、NADP+ 均含核苷酸组分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "符合 DNA 碱基组成规律的浓度关系是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "[A]+[T]=[C]+[G]",
      "[A]=[G];[T]=[C]",
      "([A]+[T])/([C]+[G]) = 1",
      "[A]=[T];[C]=[G]",
      "[A]+[C]=[T]+[G]",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "[A]=[T];[C]=[G]",
        "原书 A1 型选择题答案第 8 题为 A。Chargaff 规则指出腺嘌呤 A 与胸腺嘧啶 T 的摩尔数相等，鸟嘌呤 G 与胞嘧啶 C 的摩尔数相等，即 [A]=[T]、[C]=[G]。",
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
    id: "ext-biochem-ch2-nucleic-acid-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述核苷酸的化学组成。",
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
        "核苷酸的化学组成",
        "核苷酸包括脱氧核糖核苷酸和核糖核苷酸，均由碱基、戊糖和磷酸三部分组成。碱基是含氮杂环化合物，分为嘌呤和嘧啶两类。戊糖可以是 β-D-2'-脱氧核糖或 β-D-核糖。戊糖的 C-1' 与嘌呤的 N-9 或嘧啶的 N-1 通过 β-N-糖苷键连接形成核苷。核苷的 C-5' 通过酯键连接磷酸基团，构成核苷酸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是 Chargaff 规则？",
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
        "Chargaff 规则",
        "①不同生物个体的 DNA，其碱基组成不同；②同一个体不同器官或不同组织的 DNA 具有相同的碱基组成；③对于一个特定组织的 DNA，其碱基组成不随其年龄、营养状态和环境而变化；④腺嘌呤 A 与胸腺嘧啶 T 的摩尔数相等，鸟嘌呤 G 与胞嘧啶 C 的摩尔数相等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 DNA 的多链结构。",
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
        "DNA 的多链结构",
        "①酸性溶液中，胞嘧啶 N-3 原子可以被质子化，这使得它可以在 DNA 双链的大沟一侧与已有的 GC 碱基对中的鸟嘌呤 N-7 原子形成新的氢键，同时胞嘧啶的 C-4 位氨基的氢原子也可以与鸟嘌呤的 C-6 位氧形成新的氢键，称之为 Hoogsteen 氢键，即 DNA 的三链结构（triplex）。②真核生物染色体 3'-端是一段高度重复的富含 GT 的单链，被称为端粒（telomere），其重复度可达数百乃至上千。作为单链结构的端粒，具有较大的柔韧度，可以自身回折形成一个称为 G-四链（G-quadruplex）的特殊结构。这个 G-四链结构的核心是由 4 个鸟嘌呤通过 8 对 Hoogsteen 氢键形成的 G-平面（tetrad 或 quartet）。若干个 G-平面的堆积使富含鸟嘌呤的重复序列形成了 G-四链结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch2-nucleic-acid-short004",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 tRNA 的结构特点。",
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
        "tRNA 的结构特点",
        "①含有多种稀有碱基，如 DHU、m7G、m7A 等；②TΨC 环、DHU 环和反密码环使 tRNA 的二级结构形似三叶草，三级结构呈现相似的倒 L 形；③tRNA 的 5'-端的 7 个核苷酸与 3'-端共同形成氨基酸接纳茎，3'-端的 CCA 是氨基酸连接位点；④tRNA 的反密码子与 mRNA 密码子互补。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：1 组 × 4 个成员（原书第 51–54 题，共用一组备选答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch2-nucleic-acid-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: "51–54 题共用备选答案：下列核酸结构类型，选择一种最恰当的对应。",
    sharedChoices: [
      "三叶草结构",
      "核小体结构",
      "超螺旋结构",
      "倒 L 形结构",
      "双螺旋结构",
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
        id: "ext-biochem-ch2-nucleic-acid-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "原核生物闭合环状 DNA 在双螺旋结构的基础上形成",
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
            "超螺旋结构",
            "原书 B1 答案第 51 题为 D，即超螺旋。闭合环状 DNA 双螺旋进一步旋转可形成超螺旋结构。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch2-nucleic-acid-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "真核生物染色体的基本单位是",
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
            "核小体结构",
            "原书 B1 答案第 52 题为 E，即核小体。核小体是染色质的基本组成单位。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch2-nucleic-acid-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "tRNA 的二级结构是",
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
            "三叶草结构",
            "原书 B1 答案第 53 题为 B，即三叶草。TΨC 环、DHU 环和反密码环使 tRNA 二级结构形似三叶草。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch2-nucleic-acid-b001m4",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "tRNA 的三级结构是",
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
            "倒 L 形结构",
            "原书 B1 答案第 54 题为 A，即倒 L 形。tRNA 的三级结构呈现倒 L 形。",
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

/** 病例 / 病案分析（case，非选择型）：本章无此类题 */
const caseItems: readonly AssessmentItemDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];