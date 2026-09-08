import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第12章 DNA合成 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - A1/A2 型选择题（a1-single）：7 题
 * - 简答题（short-answer）：3 题
 * - B1 配伍题：2 组、共 6 个成员
 * - 独立记分题合计：22 题（含 B1 组成员；须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 13、A1 型选择题 37、A2 型选择题 4、B1 型配伍题 4 组
 *   （42～53 共 12 小题）、简答题 6。本文件按 22 道预算在原书顺序中取材：名词解释前 6 道
 *   （冈崎片段、前导链、后随链、复制子、引物酶、引发体）、A1 型代表性题 7 道（复制保真性、
 *   合成原料、原核 DNA-pol、维持单链状态的蛋白、半保留复制 7:1、不参与复制的酶、模板互补
 *   结构）、简答题 3 道（半保留复制及实验设计、原核复制所需物质及作用、逆转录过程及其意
 *   义）、B1 型 2 组 6 个成员（48～51 信息流向、52～53 原核 DNA-pol 酶）。所有选择题均映射
 *   为 a1-single / b1，正确项逐一对齐源参考答案（A1:1.C 2.C 3.C 4.E 5.C 7.A 28.A；
 *   B1:48.A 49.C 50.B 51.D 52.A 53.C）。选项顺序已随机重排并同步 correctChoiceIndex（0 起）。
 *   本书为原生文本层但双栏排版错序，题干/选项被打散（如 A1 第 3 题的 B/D 选项混入邻题区
 *   域），已按 DNA 复制医学语义恢复补全（半保留/半不连续复制、DNA 聚合酶、引物、冈崎片段、
 *   端粒、拓扑异构酶等），数值、结构、缩略语（dNTP、PCNA、SSB 等）均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch12-dna-replication";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第12章 DNA合成 复习思考题 习题（核对原书PDF 第196–208页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch12-dna-replication-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：冈崎片段（Okazaki fragment）",
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
        "冈崎片段",
        "冈崎片段（Okazaki fragment）是 DNA 复制中后随链合成的不连续 DNA 片段。在 DNA 复制过程中，后随链因为复制方向与解链方向相反，不能连续合成，只能随着模板链的解开，逐段地从 5'→3' 生成引物并复制子链，这些不连续合成的 DNA 片段即称为冈崎片段。真核生物的冈崎片段长度为 100～200 个核苷酸残基，原核生物的冈崎片段较长（1000～2000 个核苷酸）。复制完成后经去除引物、填补空隙并连接成完整的 DNA 长链。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：前导链（leading strand）",
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
        "前导链",
        "在 DNA 复制过程中，子链中沿解链方向生成、其合成（5'→3'）是连续进行的这股链，称为前导链（leading strand）。前导链与解链方向一致，只需一次引物即可连续延伸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：后随链（lagging strand）",
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
        "后随链",
        "在 DNA 复制过程中，另一股子链因为复制方向与解链方向相反，不能连续延长，只能随着模板链的解开，逐段地从 5'→3' 方向生成引物并复制子链，这一不连续复制的链称为后随链（lagging strand）。后随链由多个冈崎片段拼接而成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：复制子（replicon）",
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
        "复制子",
        "复制子（replicon）是独立完成复制的功能单位。每个起始点产生两个移动方向相反的复制叉，习惯上把两个相邻起始点之间的距离定为一个复制子。原核生物基因组通常只有一个复制起始点（单复制子），真核生物每条染色体有多个复制子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：引物酶（primase）",
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
        "引物酶",
        "引物酶（primase）是一种 RNA 聚合酶。它在模板的复制起始部位催化互补碱基的聚合，形成短片段 RNA（即引物），为 DNA 聚合酶提供游离的 3'-OH。引物酶不同于催化转录的 RNA 聚合酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：引发体（primosome）",
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
        "引发体",
        "引发体（primosome）是包括 DnaA、DnaB（解旋酶）、DnaC、引物酶以及 DNA 的复制起始区域共同形成的一个复合结构。其中 DnaA 蛋白辨认复制起始点，DnaB 蛋白有解螺旋作用，DnaC 蛋白使 DnaB 蛋白组装到复制起始点上，引物酶催化合成引物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），7 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch12-dna-replication-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "参与维持 DNA 复制保真性的因素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "DNA 的双向复制",
      "DNA 的 SOS 修复",
      "DNA 聚合酶的核酸外切酶活性",
      "密码的简并性",
      "氨酰 tRNA 合成酶对氨基酸的高度特异性",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA 聚合酶的核酸外切酶活性",
        "原书 A1 型选择题答案第 1 题为 C，即 DNA 聚合酶的核酸外切酶活性。DNA 复制的高保真性由多种机制共同维持：严格遵守碱基配对规律、聚合酶对碱基的选择功能，以及 DNA 聚合酶 3'→5' 核酸外切酶活性在复制出错时的即时校对功能；而密码的简并性、DNA 的 SOS 修复、DNA 的双向复制与复制保真性无直接关系。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "合成 DNA 的原料是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "dADP、dGDP、dCDP、dTDP",
      "ATP、GTP、CTP、TTP",
      "AMP、GMP、CMP、TMP",
      "dAMP、dGMP、dCMP、dTMP",
      "dATP、dGTP、dCTP、dTTP",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "dATP、dGTP、dCTP、dTTP",
        "原书 A1 型选择题答案第 2 题为 C，即合成 DNA 的原料是四种脱氧核苷三磷酸 dATP、dGTP、dCTP、dTTP（dNTP）。DNA 聚合酶催化 dNTP 的 α 磷酸基团与引物或延长中链 3'-OH 反应，逐个掺入脱氧核苷酸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于原核生物 DNA 聚合酶（DNA-pol）的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "DNA-pol I 的比活性最高",
      "DNA-pol II 是三种聚合酶中比活性最大的酶",
      "DNA-pol III 是催化复制延长的酶",
      "DNA-pol III 无 3'→5' 核酸外切酶活性",
      "DNA-pol I 酶分子是二聚体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA-pol III 是催化复制延长的酶",
        "原书 A1 型选择题答案第 3 题为 C，即 DNA-pol III 是原核生物复制延长中真正起催化作用的酶，其分子个数少但比活性最大（每分钟可催化多达 10 的 5 次方次聚合反应）。因本书双栏错序，此题原 B/D 选项的字面内容混入邻题区域，已按原核 DNA-pol 语义补全为最接近原文的干扰项：DNA-pol I 并非二聚体（由 1 条多肽链组成），DNA-pol III 具有 3'→5' 核酸外切酶（校对）活性，DNA-pol I 的比活性并非最高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "复制中维持 DNA 单链状态的蛋白质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["DnaB", "SSB", "DnaC", "DnaA", "DnaG"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "SSB",
        "原书 A1 型选择题答案第 4 题为 E，即单链 DNA 结合蛋白 SSB（single strand DNA binding protein）。SSB 结合到 DNA 单链上，稳定已解开的单链，防止单链回复并保护其完整，有利于核苷酸依模板掺入。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "现有 15N 标记 DNA 双链，当以 NH4Cl 作氮源复制 DNA 时，产生子代 DNA 分子 14N : 15N 为 7 : 1 的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["第一代", "第四代", "第三代", "第二代", "第五代"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第三代",
        "原书 A1 型选择题答案第 5 题为 C，即第三代。依半保留复制原理，第一代子代 DNA 全部为 15N/14N 混合条带（14N : 15N = 1 : 1，无纯 15N）；到第三代，含 15N 的 DNA（纯 15N/15N 与 15N/14N）与纯 14N/14N 相对比例满足 14N 与 15N 分子比为 7 : 1（每代以 2 的幂次增长，3 代共 8 个分子中 1 个含 15N 链，故 7 : 1）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不参与 DNA 复制的酶是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["核酶", "解旋酶", "DNA 连接酶", "拓扑酶", "引物酶"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "核酶",
        "原书 A1 型选择题答案第 7 题为 A，即核酶（具有催化活性的 RNA）不参与 DNA 复制。解旋酶解开 DNA 双链，拓扑酶（拓扑异构酶）松弛超螺旋，引物酶合成 RNA 引物，DNA 连接酶连接冈崎片段，均参与 DNA 复制。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-a1007",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "DNA 复制时，以 5'-TAGA-3' 为模板，合成产物的互补结构为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "5'-TCTA-3'",
      "5'-UCUA-3'",
      "5'-ATCT-3'",
      "5'-AUCU-3'",
      "5'-GCGA-3'",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "5'-TCTA-3'",
        "原书 A1 型选择题答案第 28 题为 A，即 5'-TCTA-3'。DNA 复制合成的新链与模板反向互补：以 5'-TAGA-3' 为模板，其互补序列为 3'-ATCT-5'，即 5'-TCTA-3'，且新链为 DNA 故含 T 而非 U。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch12-dna-replication-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "什么是 DNA 的半保留复制？请设计实验证明 DNA 的复制方式属于半保留复制，而不是全保留和混合复制方式。",
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
        "DNA 半保留复制及其证明实验",
        "DNA 半保留复制：DNA 生物合成时，母链 DNA 解开为两条单链，各自作为模板，按碱基配对原则合成与模板互补的子链。新形成的子代 DNA 分子中，一条链从亲代完全接受过来，另一条单链则完全重新合成，DNA 的这种复制方式称为半保留复制。证明实验（Meselson-Stahl 密度梯度离心实验思路）：①由于细菌可利用 NH4Cl 作为氮源合成 DNA，可将同样的细菌分别培养在普通 NH4Cl(14N) 与核素标记的 NH4Cl(15N) 中若干代（大于 10 代以上），然后分别分离这两种细菌的基因组 DNA 进行密度梯度离心。因含核素的基因组 15N-DNA 密度比普通基因组 14N-DNA 高，离心后位于普通基因组 DNA 下方，同时标记这两组基因组 DNA 在离心管壁的位置。②细菌营养充足时约 20 分钟繁殖一代，将在含核素 NH4Cl(15N) 培养若干代的细菌转移到普通 NH4Cl（14N）培养基中培养一代，约 20 分钟，提取其基因组 DNA 同样进行密度梯度离心。结果判断：若新生基因组 DNA 位于普通和核素标记 DNA 条带之间，说明是半保留复制；若新生 DNA 经离心分为核素标记和普通两个条带，则表明是全保留复制；若新生 DNA 分布于普通和核素标记条带之间的各个位置，则说明是混合复制方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述参与原核生物 DNA 复制过程所需的物质及其作用。",
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
        "参与原核生物 DNA 复制的物质及其作用",
        "参与原核生物 DNA 复制所需的物质及作用：①双链 DNA：解开成单链的两条链都作为模板指导 DNA 的合成；②dNTP：作为复制的原料；③DNA 聚合酶（依赖 DNA 的 DNA 聚合酶）：合成子链，其中 DNA-pol III 是原核生物真正的复制酶，DNA-pol I 的作用是切除引物、填补空隙和修复；④引物：一小段 RNA，为 DNA 聚合酶提供游离的 3'-OH；⑤其他酶及蛋白质因子：解链酶（解旋酶）解开 DNA 双链；DNA 拓扑异构酶 I、II 松弛 DNA 超螺旋、理顺打结的 DNA 链；引物酶合成 RNA 引物；单链 DNA 结合蛋白（SSB）结合并稳定解开的单链；DNA 连接酶连接随从链中两个相邻的 DNA 片段。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch12-dna-replication-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述逆转录的基本过程，逆转录现象的发现在生命科学研究中有何重大研究价值？",
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
        "逆转录的基本过程及其研究意义",
        "逆转录的基本过程：①以 RNA 为模板，在逆转录酶（RDDP）催化下合成 RNA-DNA 杂化双链；②由 RNase H 水解 RNA-DNA 杂化双链中的 RNA 链，合成的 DNA 称为 cDNA；③以新合成的 cDNA 链为模板，由逆转录酶（RDDP）催化合成 cDNA 双链。逆转录现象发现的重大研究价值：①补充并完善了中心法则；②逆转录病毒中有致癌病毒、人类免疫缺陷病毒（HIV）等，其研究关系到严重危害人类健康的某些疾病的发病机制、诊断与治疗；③逆转录病毒是分子生物学研究中的重要工具，广泛应用于真核基因表达、基因转染等重要研究方法以及基因治疗，是一种重要的基因载体；④为遗传物质的起源（DNA 还是 RNA）和进化提供新的证据。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组、共 6 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch12-dna-replication-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["复制", "转录", "逆转录", "翻译", "RNA 复制"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch12-dna-replication-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "从 DNA → DNA 称为",
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
            "复制",
            "原书 B1 型题第 48 题答案为 A，即从 DNA → DNA 称为复制。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch12-dna-replication-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "从 mRNA → DNA 称为",
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
            "逆转录",
            "原书 B1 型题第 49 题答案为 C，即从 mRNA → DNA 称为逆转录（逆向转录，由逆转录酶催化）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch12-dna-replication-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "从 DNA → mRNA 称为",
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
            "转录",
            "原书 B1 型题第 50 题答案为 B，即从 DNA → mRNA 称为转录，由 RNA 聚合酶催化。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch12-dna-replication-b001m4",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "从 mRNA → 蛋白质称为",
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
            "翻译",
            "原书 B1 型题第 51 题答案为 D，即从 mRNA → 蛋白质称为翻译。",
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
  {
    id: "ext-biochem-ch12-dna-replication-b002",
    order: 21,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "DNA-pol I",
      "DNA-pol II",
      "DNA-pol III",
      "DNA-pol IV",
      "DNA-pol V",
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
        id: "ext-biochem-ch12-dna-replication-b002m1",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "具有聚合酶、3'→5' 外切酶、5'→3' 外切酶活性的酶是",
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
            "DNA-pol I",
            "原书 B1 型题第 52 题答案为 A，即 DNA-pol I。DNA-pol I 兼有 5'→3' 聚合酶、3'→5' 外切酶（校对）和 5'→3' 外切酶活性，主要参与切除引物、填补空隙与修复。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch12-dna-replication-b002m2",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在 DNA 复制中，延长核苷酸链上起重要作用的是",
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
            "DNA-pol III",
            "原书 B1 型题第 53 题答案为 C，即 DNA-pol III。DNA-pol III 是原核生物复制延长中真正起催化作用（延长核苷酸链）的酶。",
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