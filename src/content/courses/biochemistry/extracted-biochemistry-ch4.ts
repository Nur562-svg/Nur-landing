import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第4章 聚糖 结构与功能 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - A1/A2 型选择题（a1-single）：6 题
 * - 简答题（short-answer）：6 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：20 题（含 B1 组成员；须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含名词解释 9、选择题（A1 型 35、A2 型 2、B1 三组 8 成员）及简答题 10。
 *   本文件按 20 道预算在原书顺序中取代表题：前 4 道名词解释、A1 型前 6 道、B1 型(38~41 题共用备选
 *   答案)配伍组及其 4 个成员、前 6 道简答题。所有选择/配伍均为单选，正确项逐一对齐源参考答案
 *   （A1 型 1.C 2.C 3.D 4.D 5.A 6.A；B1 型 38.B 39.D 40.C 41.E），选项顺序已随机重排并同步
 *   correctChoiceIndex（0 起）。原书为原生文本层但双栏错序，题干/选项被拆散，已按糖蛋白、蛋白聚糖、
 *   糖胺聚糖、糖脂/鞘糖脂与凝集素等聚糖、糖复合物医学语义恢复；OCR 错字（如“N-連接/从连接”→N-连接、
 *   “M”/a→O）一并恢复，数值、结构与多糖链缩写（GlcNAc、Man、GalNAc、Gal、NAc）均保留，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch4-glycan";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第4章 聚糖 结构与功能 复习思考题 习题（核对原书PDF 第59–70页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch4-glycan-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：糖蛋白（glycoprotein）",
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
        "糖蛋白",
        "糖蛋白是由蛋白质和聚糖（寡糖链）组成的生物大分子，分为 N-连接型和 O-连接型二型。N-连接型糖蛋白是指聚糖与蛋白质分子中天冬酰胺（Asn）残基的酰胺氮相连；O-连接型糖蛋白是指聚糖与蛋白质分子中丝氨酸（Ser）或苏氨酸（Thr）羟基共价结合。体内蛋白质约 1/3 为糖蛋白，糖蛋白聚糖结构的复杂性与多样性决定了其丰富多样的功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：N-连接聚糖（N-linked glycan）",
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
        "N-连接聚糖",
        "N-连接聚糖是指与蛋白质分子中潜在糖基化位点 Asn-X-Ser/Thr（X 为脯氨酸以外的任何氨基酸）中的天冬酰胺残基的酰胺氮相连的糖链。根据结构可将 N-连接聚糖分为高甘露糖型、复杂型和杂合型三型。N-连接聚糖合成以长萜醇作为聚糖载体，与蛋白质肽链的合成同时进行，在内质网和高尔基体中加工成熟。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：O-连接聚糖（O-linked glycan）",
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
        "O-连接聚糖",
        "O-连接聚糖是指与蛋白质分子中丝氨酸（Ser）或苏氨酸（Thr）羟基相连的糖链。O-连接聚糖常由 N-乙酰半乳糖胺（GalNAc）与半乳糖构成核心二糖，核心二糖可重复延长及分支，再连接岩藻糖、N-乙酰葡糖胺等单糖。O-连接聚糖合成是在多肽链合成后进行，不需要聚糖载体，整个过程在内质网开始，到高尔基体内完成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：糖形（glycoform）",
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
        "糖形",
        "糖形（glycoform）是指糖蛋白聚糖结构不均一性所导致的不同糖蛋白分子形式。不同种属、组织的同一种糖蛋白的 N-连接型聚糖的结合位置、糖基数目、糖基序列不同，可以产生不同的糖蛋白分子形式；即使是同一组织中的某种糖蛋白，不同分子的同一糖基化位点的 N-连接型聚糖结构也可以不同，这种糖蛋白聚糖结构的不均一性称为糖形。",
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
    id: "ext-biochem-ch4-glycan-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一种单糖不是组成糖蛋白分子中聚糖的单糖？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["岩藻糖", "果糖", "葡萄糖", "甘露糖", "半乳糖"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "果糖",
        "原书 A1 型选择题第一题为 C，即果糖。组成糖蛋白分子中聚糖的单糖有 7 种，分别为葡萄糖、半乳糖、甘露糖、N-乙酰半乳糖胺、N-乙酰葡糖胺、岩藻糖和 N-乙酰神经氨酸，其中不含果糖。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "糖蛋白的 N-连接聚糖合成场所为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["细胞核", "线粒体", "内质网与高尔基体", "溶酶体", "细胞膜"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内质网与高尔基体",
        "原书 A1 型选择题第二题为 C，即内质网与高尔基体。N-连接聚糖的合成起始于内质网（以长萜醇为聚糖载体），在内质网和高尔基体中加工成熟。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "N-连接型糖蛋白的糖基化位点不可能是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Asn-Ala-Ser/Thr",
      "Asn-Pro-Ser/Thr",
      "Asn-Lys-Ser/Thr",
      "Asn-Gln-Ser/Thr",
      "Asn-Val-Ser/Thr",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Asn-Pro-Ser/Thr",
        "原书 A1 型选择题第三题为 D，即 Asn-Pro-Ser/Thr。N-连接糖基化位点的序列段为 Asn-X-Ser/Thr，其中 X 为脯氨酸以外的任何氨基酸，因此天冬酰胺后接脯氨酸（Pro）的序列段不可能作为 N-连接型糖蛋白的糖基化位点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于糖蛋白的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "组成糖蛋白分子中聚糖的单糖有 7 种",
      "N-连接糖蛋白与 O-连接糖蛋白合成的场所均是内质网和高尔基体",
      "O-连接型糖蛋白中聚糖所占分子的质量百分比可高达 90%",
      "3 型 N-连接聚糖都有一个有分支的五糖核心",
      "N-连接聚糖合成是以长萜醇作为聚糖载体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "O-连接型糖蛋白中聚糖所占分子的质量百分比可高达 90%",
        "原书 A1 型选择题第四题为 D。O-连接型糖蛋白的寡糖链一般较短，其聚糖所占分子的质量百分比远低于 90%，“可高达 90%”这一说法错误；其余叙述均正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "N-连接聚糖合成时所需糖基供体为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "糖的 ADP 或 GDP 衍生物",
      "糖的 UDP 或 CDP 衍生物",
      "糖的 UDP 或 GDP 衍生物",
      "糖的 TDP 或 GDP 衍生物",
      "糖的 ADP 或 TDP 衍生物",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "糖的 UDP 或 GDP 衍生物",
        "原书 A1 型选择题第五题为 A。N-连接聚糖合成时以 UDP-糖基或 GDP-糖基作为糖基供体，在特异性的糖基转移酶催化下完成糖基的转移。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于糖缀合物的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "糖蛋白分子中蛋白质质量百分比大于聚糖",
      "糖缀合物包括糖蛋白和蛋白聚糖两种",
      "糖蛋白和蛋白聚糖均由共价连接的蛋白质和聚糖两部分组成",
      "可分布于细胞表面、细胞内分泌颗粒、细胞核内及细胞外",
      "大多数真核细胞都能合成一定数量和类型的糖蛋白和蛋白聚糖",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "糖缀合物包括糖蛋白和蛋白聚糖两种",
        "原书 A1 型选择题第六题为 A。糖缀合物（糖复合物）不仅包括糖蛋白和蛋白聚糖，还包括糖脂等其他种类，因此“糖缀合物包括糖蛋白和蛋白聚糖两种”这一说法错误；其余叙述均正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），6 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch4-glycan-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述糖蛋白聚糖结构的不均一性。",
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
        "糖蛋白聚糖结构的不均一性",
        "具有相同肽顺序的糖蛋白常含有不同结构的糖链，可表现在糖基组成、顺序和连接方式的差异。不同种属、组织的同一种糖蛋白的 N-连接型聚糖的结合位置、糖基数目、糖基序列不同，可以产生不同的糖蛋白分子形式；即使是同一组织中的某种糖蛋白，不同分子的同一糖基化位点的 N-连接型聚糖结构也可以不同，这种聚糖结构的不均一性即称为糖形。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述糖缀合物中聚糖的功能。",
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
        "糖缀合物中聚糖的功能",
        "糖缀合物是糖与蛋白质、脂质等分子以共价键相互连接而形成的化合物。糖缀合物的聚糖参与细胞的许多生理和病理过程：①聚糖参与糖蛋白新生肽链的折叠或聚合；②聚糖可影响糖蛋白在细胞内的靶向运输；③聚糖可稳固多肽链的结构及延长半衰期；④聚糖参与分子间的相互识别；⑤细胞表面复合糖的聚糖介导细胞-细胞的结合；⑥聚糖是可能携带生物信息的物质，聚糖由于其复杂性和多样性，具有比核酸和蛋白质更大的潜在信息编码容量。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-short003",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述糖组和糖组学。",
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
        "糖组和糖组学",
        "糖组（glycome）定义：一个生物体或细胞中全部糖类的总和，包括简单的糖类和缀合的糖类。在糖缀合物（糖蛋白和糖脂等）中的糖链部分有庞大的信息量。糖组学（glycomics）是研究糖链组成及其功能的学科，是基因组学的后续和延伸。糖组学研究方法通常包括聚糖组的分离纯化、富集糖链的结构解析和定量，以及糖链的性质和功能研究。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-short004",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述糖基化过程及其生物学意义。",
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
        "糖基化过程及其生物学意义",
        "蛋白质的糖基化是指在糖基转移酶作用下将单糖转移至蛋白质，与蛋白质上的氨基酸残基形成糖苷键的过程。具体过程：①N-连接的糖链合成起始于内质网、完成于高尔基体：在内质网，N-连接型聚糖的寡糖前体在脂质多萜醇（长萜醇）上组装，连接多萜醇的寡糖前体转移到多肽的天冬酰胺残基上；接上肽链的含 14 个糖基的寡糖前体依次在内质网和高尔基体加工，先由糖苷水解酶除去葡萄糖和部分甘露糖，再经糖基转移酶催化加上不同的单糖，成熟为各型 N-连接聚糖。②O-连接的糖基化在高尔基体中进行，通常最先连接上去的糖单元是 N-乙酰半乳糖（GalNAc），连接部位为 Ser、Thr 和羟脯氨酸（Hyp）的羟基，再逐次转移糖基形成寡糖链。蛋白质糖基化的生物学意义：糖基化是生物体最常见且最主要的蛋白质翻译后修饰方式，不仅改变多肽的分子量及构象，对蛋白质功能也有重要调节作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-short005",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述糖蛋白的功能。",
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
        "糖蛋白的功能",
        "糖蛋白是含糖的蛋白质，由糖链与肽链中的一定氨基酸残基以糖苷键共价连接而成。①位于细胞膜的糖蛋白生物学功能：膜结合糖蛋白包括酶、受体、凝集素及运载蛋白等，此类糖蛋白常参与细胞识别，并可作为特定细胞或细胞在特定阶段的表面标志或表面抗原。②细胞外基质中糖蛋白的生物学功能：为细胞外基质中的不溶性大分子糖蛋白，如胶原及各种非胶原糖蛋白（纤粘连蛋白、层粘连蛋白等）；血浆中还有一些具生物学活性的糖蛋白，如纤维蛋白原、抗血友病球蛋白、纤维蛋白溶解酶原、纤维蛋白溶解酶及 α₁-酸性糖蛋白。其功能不仅是作为细胞外基质的结构成分起支持、连接及缓冲作用，更重要的是参与细胞的识别、黏着及迁移，并调控细胞的增殖及分化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch4-glycan-short006",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常见的糖胺聚糖有哪几种？有何结构特征？",
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
        "常见的糖胺聚糖及其结构特征",
        "体内重要的糖胺聚糖有 6 种：硫酸软骨素、硫酸皮肤素、硫酸角质素、透明质酸、肝素和硫酸类肝素。它们的基本结构特征为二糖单位（己糖醛酸和己糖胺）重复连接，不分支；除透明质酸外，其余糖胺聚糖均带有硫酸基。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：1 组 × 4 成员（原书第 38~41 题共用备选答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch4-glycan-b001",
    order: 11,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["三股螺旋", "长萜醇", "甘露糖", "核心蛋白", "葡萄糖"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch4-glycan-b001m1",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "动物糖原含有",
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
            "葡萄糖",
            "原书 B1 型选择题为 38.B。动物糖原是由大量葡萄糖（以 α-1,4 及 α-1,6 糖苷键）聚合而成的多糖，因此“动物糖原含有葡萄糖”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch4-glycan-b001m2",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "蛋白聚糖含有",
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
            "核心蛋白",
            "原书 B1 型选择题为 39.D。蛋白聚糖是由糖胺聚糖共价连接于核心蛋白所组成的大分子复合物，故“蛋白聚糖含有核心蛋白”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch4-glycan-b001m3",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胶原蛋白含有",
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
            "三股螺旋",
            "原书 B1 型选择题为 40.C。胶原蛋白由三条 α 多肽链构成三股螺旋（超螺旋）结构，因此“胶原蛋白含有三股螺旋”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch4-glycan-b001m4",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "高甘露糖型 N-连接型聚糖中的单糖有",
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
            "甘露糖",
            "原书 B1 型选择题为 41.E。高甘露糖型 N-连接型聚糖中含有较多甘露糖（Man）残基，故所含单糖为甘露糖。",
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