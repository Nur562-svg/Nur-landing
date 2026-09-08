import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第27章 组学 与 系统生物医学 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：7 题
 * - A1/A2 型选择题（a1-single）：7 题
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：21 题（须等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 7、选择题（A1 型题 21、A2 型题 10、B1 型题 5 成员）、
 *   简答题 2。本文件按 21 道预算在原书顺序中取材：全部 7 道名词解释、前 7 道代表性 A1
 *   选择题、全部 B1 配伍组（32~36，5 成员）及全部 2 道简答题，覆盖基因组学/转录物组学/
 *   蛋白质组学/代谢组学/糖组学/脂组学与系统生物医学各主要知识点。全部选择题均为单选，
 *   正确项逐一对齐源参考答案（A1 题 1~7 对应 1.B 2.A 3.E 4.A 5.D 6.D 7.B；B1 组 32~36 对应
 *   A/B/C/D/E）。选项顺序已随机重排并同步 correctChoiceIndex(0 起)。原生文本层双栏错序
 *   已按组学与系统生物医学医学语义恢复，数值、缩写（mRNA、DNA、EST、SAGE、CAGE、MPSS、
 *   ENCODE、2-DE、MS 等）均按原文保留，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch27-omics";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第27章 组学 与 系统生物医学 复习思考题 习题（核对原书PDF 第375–386页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），7 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch27-omics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：代谢组学（metabonomics）",
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
        "代谢组学",
        "代谢组学是研究一个生物/细胞中所有的小分子代谢产物的组成，描绘其动态变化规律，建立系统代谢图谱，并确定这些变化与生物过程的有机联系的科学。代谢组学主要以生物体液为研究对象，主要分析工具有核磁共振（NMR）、色谱及质谱。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：蛋白质组学（proteomics）",
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
        "蛋白质组学",
        "蛋白质组学以细胞、组织或机体在特定时间和空间上表达的所有蛋白质为研究对象，分析细胞内动态变化的蛋白质组成、表达水平与修饰状态，揭示蛋白质之间的相互作用及其调控规律。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因组（genome）",
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
        "基因组",
        "基因组（genome）是指一个生物体内所有遗传信息的总和。对真核生物而言，基因组是指一套完整单倍体 DNA 及线粒体和/或叶绿体 DNA 的全部序列；细菌基因组包含拟核和质粒中的 DNA 序列；病毒基因组有的为 DNA，有的则为 RNA。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因组学（genomics）",
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
        "基因组学",
        "基因组学（genomics）是阐明整个基因组结构、结构与功能关系以及基因之间相互作用的科学。根据研究目的不同分为结构基因组学、功能基因组学和比较基因组学。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：糖组学（glycomics）",
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
        "糖组学",
        "糖组学研究生物体所有聚糖或聚糖复合物的组成、结构及其功能，具体内容包括糖与糖之间、糖与蛋白质之间、糖与核酸之间的联系和相互作用，旨在阐明聚糖的生物学功能以及与细胞、生物个体表型的联系。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：脂组学（lipidomics）",
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
        "脂组学",
        "脂组学研究生物体内所有脂质分子的组成与结构，并以此为依据推测与脂质作用的生物分子的变化，揭示脂质在各种生命活动中的重要作用。脂组学是代谢组学的一个分支。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：转录物组学（transcriptomics）",
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
        "转录物组学",
        "转录物组学是系统研究细胞基因转录情况及转录调控规律的科学，研究对象覆盖细胞所能转录出来的可作为蛋白质合成模板的 mRNA 总和。转录物组的最大特点是受到内外多种因素的调节，因而得以反映大批不同物种、不同个体、不同细胞、不同发育阶段及不同生理病理状态下的差异表达信息。",
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
    id: "ext-biochem-ch27-omics-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对基因组概念描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一种生物体表达的所有编码蛋白转录产物的总和",
      "研究基因的结构、功能及表达产物的学科领域",
      "一种生物体具有的所有遗传信息的总和",
      "以全部转录产物为基础的研究领域",
      "包括转录组学和蛋白质组学等内容的科学领域",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一种生物体具有的所有遗传信息的总和",
        "原书 A1 型选择题答案第一题为 B，即“一种生物体具有的所有遗传信息的总和”是对基因组概念的正确描述。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于基因组描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "动物基因组的复杂性高于植物基因组",
      "基因组的容量与物种进化的程度呈正相关关系",
      "每种生物都有各自的基因组",
      "脊椎动物的基因组是相同的",
      "爬行类的基因组大于灵长类的",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "每种生物都有各自的基因组",
        "原书 A1 型选择题答案第二题为 A，即“每种生物都有各自的基因组”是正确的表述；其余说法（如动物基因组复杂性高于植物、基因组容量与进化程度正相关、脊椎动物基因组相同等）均不正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-a1003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "限制性片段长度多态性（RFLP）是由于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "碱基改变发生在内含子上",
      "碱基改变发生在外显子上",
      "碱基改变发生在酶切位点上",
      "碱基改变发生在增强子上",
      "碱基改变发生在微卫星上",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "碱基改变发生在酶切位点上",
        "原书 A1 型选择题答案第三题为 E，即限制性片段长度多态性是由于碱基改变发生在限制性内切核酸酶的酶切位点上，从而使酶切后产生的 DNA 片段长度出现多态性所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-a1004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列各项中通常不用于蛋白质组学研究的技术是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "双向电泳",
      "串联质谱",
      "组织芯片",
      "DNA芯片",
      "酵母双杂交",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA芯片",
        "原书 A1 型选择题答案第四题为 A，即 DNA 芯片通常不用于蛋白质组学研究（DNA 芯片主要用于基因组/转录物水平表达谱研究）；蛋白质组学常用双向电泳、串联质谱、酵母双杂交等技术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-a1005",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "质谱技术常用于以下哪项研究",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因组学",
      "双向电泳",
      "转录物组学",
      "蛋白质组学",
      "酵母双杂交",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "蛋白质组学",
        "原书 A1 型选择题答案第五题为 D，即质谱技术常用于蛋白质组学研究，用于对 2-DE 分离或液质联用（LC-MS）分离后的蛋白质和多肽片段进行鉴定与定量分析。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-a1006",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下哪项不是目前使用的研究转录物组的主要方法",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "SAGE",
      "CAGE",
      "RNA组学",
      "微阵列",
      "免疫杂交",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫杂交",
        "原书 A1 型选择题答案第六题为 D，即免疫杂交不是研究转录物组的主要方法；研究转录物组常用的整体性分析技术为微阵列（基因芯片）、SAGE、CAGE 以及 MPSS 等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-a1007",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "EST 序列本质上是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因组DNA",
      "蛋白质序列",
      "mRNA序列",
      "多肽序列",
      "cDNA序列",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "cDNA序列",
        "原书 A1 型选择题答案第七题为 B，即 EST（表达序列标签，expressed sequence tag）是经 mRNA 逆转录合成 cDNA、从 cDNA 文库随机挑取克隆测序获得的部分 cDNA 的 5' 或 3' 端序列，本质上是 cDNA 序列。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch27-omics-short001",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "比较转录物组学与蛋白质组学在所用技术和获得信息方面的异同。",
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
        "转录物组学与蛋白质组学的异同",
        "相同点：两者都是通过高通量技术研究基因组的功能与表达，都要通过生物信息学工具处理获得的表达和功能信息。不同点：①所用技术不同——转录物组学以芯片、测序、SAGE、CAGE、染色体作图等获得基因组转录物的信息，以缺失分析、RNAi 分析、组织特异性表达分析、ChIP-on-chip、ChIP-seq 等获得基因组功能的信息；蛋白质组学以 2-DE 分离和 MS 鉴定等获得基因组表达的蛋白质信息，以酵母双杂交、蛋白质芯片、免疫亲和层析-MS 及噬菌体展示等获得蛋白质互作等功能信息。②获得信息不同——蛋白质组学较转录物组学能更准确地反映基因组编码信息的表达，而且能获得表达为蛋白质后的修饰。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch27-omics-short002",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述转录物组研究的重要技术以及这些技术各自的特点。",
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
        "转录物组研究的重要技术及其特点",
        "转录物组研究的重要技术包括微阵列、SAGE、MPSS。①微阵列（基因芯片）：可用于大规模基因组表达谱研究、快速检测基因差异表达、鉴别致病基因或疾病相关基因。②SAGE（基因表达的系列分析）：用来自 cDNA 3' 端特定位置 9~10 bp 长度的序列所含有的足够特定信息鉴定基因组中的所有基因，利用锚定酶和位标酶切割 DNA 分子的特定位置，分离 SAGE 标签并将这些标签串联后测序，可全面提供基因表达谱信息，还可定量比较不同状态下组织或细胞的所有差异表达基因。③MPSS（大规模平行标签测序）：原理是一个标签序列（10~20 bp）含有能够识别转录子的信息，标签序列与长的连续分子连接在一起便于克隆和序列分析，通过定量测定提供相应转录子的表达水平。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员（原书 32~36 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch27-omics-b001",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["基因组学", "转录物组学", "蛋白质组学", "糖组学", "代谢组学"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch27-omics-b001m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要研究 DNA 的是",
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
            "基因组学",
            "原书 B1 型题 32 题答案为 A，即主要研究 DNA 的是基因组学。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch27-omics-b001m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要研究 RNA 的是",
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
            "转录物组学",
            "原书 B1 型题 33 题答案为 B，即主要研究 RNA（转录物）的是转录物组学。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch27-omics-b001m3",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要研究蛋白质的是",
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
            "蛋白质组学",
            "原书 B1 型题 34 题答案为 C，即主要研究蛋白质的是蛋白质组学。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch27-omics-b001m4",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要研究糖链或糖蛋白的是",
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
            "糖组学",
            "原书 B1 型题 35 题答案为 D，即主要研究糖链或糖蛋白（聚糖）的是糖组学。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch27-omics-b001m5",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要研究小分子代谢物的是",
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
            "代谢组学",
            "原书 B1 型题 36 题答案为 E，即主要研究小分子代谢物（所有小分子代谢产物）的是代谢组学。",
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