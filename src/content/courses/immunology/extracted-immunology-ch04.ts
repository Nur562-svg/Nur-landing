import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第4章 抗体 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：11 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：25 题（须等于本文件预算 25）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、填空题 10、选择题（A1 型 40 + A2 型 15）、问答题 6 及
 *   B1 配伍题 3 组；本文件按 25 道预算取材，本章一般无多选，故未映射多选。原书选择题答案
 *   键号在章节尾连续编排（A1 与 A2 段标题错位），已按「题号—键号」一一对应恢复（如 A2 型
 *   第 51 题对应键号 A=IgM）。OCR 错字与符号已按免疫学医学语义恢复（VH/VL、CH/CL、CDR、
 *   Fab/Fc、SIgA、mlgA/mlgM 等），抗体类别与数字保留原值。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch04-antibody";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第4章 抗体 习题（核对PDF 第42–53页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch04-antibody-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗体",
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
        "抗体（antibody）",
        "是免疫系统在抗原刺激下，由 B 淋巴细胞或记忆 B 细胞增殖分化成的浆细胞所产生的、可与相应抗原发生特异性结合的免疫球蛋白，主要分布于血清、组织液及外分泌液中，是介导体液免疫的重要效应分子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：互补决定区",
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
        "互补决定区（CDR）",
        "抗体 VH 和 VL 各有 3 个区域的氨基酸组成和排列顺序高度可变，称高变区（HVR）；该区域形成与抗原表位互补的空间构象，又称互补决定区（CDR），分别用 CDR1、CDR2、CDR3 表示，一般 CDR3 变化程度更高。VH 和 VL 共 6 个 CDR 共同组成抗体的抗原结合部位，决定抗体的特异性，负责识别及结合抗原。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：ADCC",
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
        "ADCC（抗体依赖的细胞介导的细胞毒作用）",
        "抗体依赖的细胞介导的细胞毒作用（antibody-dependent cell-mediated cytotoxicity）。抗体的 Fab 段结合病毒感染细胞或肿瘤细胞表面的抗原表位，其 Fc 段与杀伤细胞（NK 细胞、巨噬细胞等）表面的 FcR 结合，介导杀伤细胞直接杀伤靶细胞，NK 细胞是介导 ADCC 的主要细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：多克隆抗体",
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
        "多克隆抗体",
        "天然抗原分子中常含多种特异性的抗原表位。以该抗原物质刺激机体免疫系统，体内多个 B 细胞克隆被激活，产生的抗体实际上是针对多种不同抗原表位的抗体的总和，称多克隆抗体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：调理作用",
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
        "调理作用",
        "指细菌特异性抗体以其 Fab 段与相应细菌的抗原表位结合，以其 Fc 段与巨噬细胞或中性粒细胞表面的 FcR 结合，通过抗体的“桥联”作用，促进吞噬细胞对细菌的吞噬。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），11 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch04-antibody-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗体与抗原特异性结合的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["VH 和 VL", "CH 和 CL", "VH 和 CL", "VH 和 CH", "CH2 和 CH3"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "VH 和 VL",
        "抗体的可变区（V 区，VH 和 VL）尤其是其中的 CDR 共同构成抗原结合部位，负责识别并结合抗原的特异性。CH 区（恒定区）主要参与激活补体、结合 Fc 受体等功能。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗体分子的基本结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一条重链和一条轻链",
      "一条重链和二条轻链",
      "二条重链和二条轻链",
      "二条重链和一条轻链",
      "一条 Fab 链和一条 Fc 链",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "二条重链和二条轻链",
        "免疫球蛋白单体分子由两条完全相同的重链和两条完全相同的轻链通过二硫键连接构成 Y 形四肽链分子。原书 A1 答案第 2 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "激活补体能力最强的免疫球蛋白是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgG", "IgM", "IgE", "IgD", "IgA"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgM",
        "IgM 为五聚体，多个 Fc 段集中使其比 IgG 更能通过经典途径激活补体。原书 A1 答案第 5 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "新生儿通过自然被动免疫可从母体获得的免疫球蛋白为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "IgM 和 IgE",
      "IgG 和 IgD",
      "IgG 和 IgE",
      "IgM 和 IgG",
      "IgG 和 SIgA",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgG 和 SIgA",
        "IgG 是唯一能通过胎盘的免疫球蛋白，是新生儿抗感染自然被动免疫的主要来源；婴儿还可从母乳初乳中获得分泌型 IgA（SIgA）。原书 A1 答案第 9 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分子量最大的免疫球蛋白是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgG", "IgM", "IgE", "IgD", "IgA"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgM",
        "IgM 以五聚体（分泌型）形式存在，为分子量最大的免疫球蛋白，一般不能通过血管壁，主要存在于血液中。原书 A1 答案第 10 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "正常人血清中含量最高的免疫球蛋白是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgA", "IgG", "IgM", "IgD", "IgE"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgG",
        "IgG 是血清和胞外液中含量最高的免疫球蛋白，约占血清总 Ig 的 75%～80%。原书 A1 答案第 14 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "正常人血清中含量最低的免疫球蛋白是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgA", "IgG", "IgM", "IgD", "IgE"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgE",
        "IgE 为正常人血清中含量最少的免疫球蛋白，血清炎性浓度极低，主要由黏膜下淋巴组织浆细胞分泌，为亲细胞抗体。原书 A1 答案第 15 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "初次免疫应答中出现最早的抗体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgA", "IgG", "IgM", "IgD", "IgE"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgM",
        "IgM 是个体发育过程中最早合成和分泌的抗体，也是初次免疫应答中最早出现的抗体，血清中检出错原体特异性 IgM 提示新近感染。原书 A1 答案第 16 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "连接 SIgA 二聚体的结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["二硫键", "共价键", "分泌片", "J 链", "铰链区"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "J 链",
        "分泌型 IgA 为二聚体，由 J 链将两个单体 IgA 分子连接而成，另含分泌片。每个 SIgA 分子含有两个单体 IgA、一条 J 链和一个分泌片。原书 A1 答案第 19 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "介导 1 型超敏反应的免疫球蛋白是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgA", "IgD", "IgE", "IgM", "IgG"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgE",
        "IgE 为亲细胞抗体，通过其 Fc 段与肥大细胞和嗜碱性粒细胞表面高亲和力 IgE Fc 受体（FcεRI）结合使细胞致敏，再遇相同变应原时可引起 1 型超敏反应。原书 A1 答案第 24 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "孕妇，李某，孕 32 周，发热、腋下体温 38.5℃、心率加快、白细胞计数增高。哪种抗体增高可提示宫内感染",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgM", "IgD", "IgE", "IgG", "IgA"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgM",
        "IgM 是个体发育过程中最早合成和分泌的抗体，胚胎发育晚期的胎儿即能产生 IgM，故脐血或新生儿某些病毒特异性 IgM 水平升高提示胎儿有宫内感染（如风疹病毒或巨细胞病毒感染）。IgM 不能通过胎盘，故胎儿侧检出 IgM 有意义。原书 A2 答案第 51 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch04-antibody-fill001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "根据 H 链恒定区抗原性的差异，免疫球蛋白分为___、___、___、___、___五类。",
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
        "IgM；IgG；IgA；IgD；IgE",
        "根据重链恒定区抗原性差异，免疫球蛋白分为五类：IgM、IgG、IgA、IgD 和 IgE，分别对应重链 μ、γ、α、δ 链和 ε 链。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-fill002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "血清和胞外液中含量最高的 Ig 是___。",
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
        "IgG",
        "IgG 约占血清总 Ig 的 75%～80%，是血清和胞外液中含量最高的 Ig，也是再次免疫应答产生的主要抗体。原书填空题第 6 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-fill003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "初次免疫应答中最早出现的抗体是___。",
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
        "IgM",
        "IgM 是个体发育过程中最早合成和分泌的抗体，也是初次免疫应答中最早出现的抗体，提示新近感染，可用于感染早期诊断。原书填空题第 7 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-fill004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "参与黏膜局部免疫的 Ig 主要是___。",
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
        "SIgA",
        "分泌型 IgA（SIgA）是外分泌液中的主要抗体，参与黏膜局部免疫，是机体抗感染的“边防军”。原书填空题第 8 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-fill005",
    order: 21,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "与 1 型超敏反应有关的 Ig 是___。",
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
        "IgE",
        "IgE 为亲细胞抗体，可致敏肥大细胞和嗜碱性粒细胞，与 1 型超敏反应有关，也可能参与机体抗寄生虫免疫。原书填空题第 10 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch04-antibody-short001",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述免疫球蛋白的基本结构和主要生物学功能。",
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
        "免疫球蛋白基本结构与主要功能",
        "（1）基本结构：免疫球蛋白单体由两条相同重链和两条相同轻链通过链间二硫键连接组成四肽链分子。重链近 N 端 1/4 或 1/5 区域及轻链近 N 端 1/2 区域氨基酸多变，称可变区（V 区），近 C 端恒定区域称恒定区（C 区）。根据重链恒定区抗原性差异分五类：IgM、IgG、IgA、IgD 和 IgE；轻链分 κ 型和 λ 型。铰链区位于 CH1 与 CH2 之间，富含脯氨酸、易伸展弯曲，使 Y 形两臂距离可变，有利于两臂同时结合两个相同抗原表位。（2）主要生物学功能：V 区功能为识别并结合抗原，体内表现为抗菌、抗病毒、抗毒素等免疫效应，体外可出现抗原抗体反应；C 区功能为①激活补体（IgG、IgM 经经典途径，IgA 和 IgE 聚合后经旁路途径）；②与 Fc 受体结合，发挥调理吞噬、黏附、介导 ADCC 及超敏反应等；③IgG 可穿过胎盘进入胎儿体内；④免疫调节（正、负两方面）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-short002",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 IgM 的主要功能。",
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
        "IgM 的主要功能",
        "膜型 mIgM 和 mIgD 是初始 B 细胞的表面标志，mIgM 即 BCR，是 B 细胞特异性结合抗原表位的部位。血清五聚体 IgM 在机体早期防御中起重要作用，主要通过激活补体杀死病原微生物；IgM 的 CH3 上有 C1q 结合位点，五聚体 IgM 激活补体能力更强。IgM 是个体发育过程中最早合成和分泌的抗体，胚胎发育晚期的胎儿即能产生 IgM，故脐带血某些病毒特异性 IgM 水平升高提示宫内感染；IgM 也是初次体液免疫应答中最早出现的抗体，是机体特异性抗感染的“先头部队”，血清中检出病原体特异性 IgM 提示新近感染，可用于感染早期诊断。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-short003",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述抗体 Fc 段的主要功能。",
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
        "抗体 Fc 段（恒定区 C 段）的功能",
        "抗体的 Fab 段介导与抗原的特异结合，效应功能依赖恒定区 C 段：①抗体与抗原结合后构型改变，使 CH2 和 CH3 结构域内的补体结合位点暴露，通过经典途径激活补体系统，其中 IgM、IgG1 和 IgG3 激活补体能力强，IgG2 较弱，IgA、IgE 和 IgG4 难激活补体但形成聚合物后可通过旁路途径激活；②结合 Fc 受体：调理吞噬（细菌特异性 IgG 通过 Fab 段结合细菌、Fc 段与吞噬细胞 FcγR 结合，“桥联”促进吞噬）；介导 ADCC（NK 细胞是介导 ADCC 的主要细胞）；IgE 为亲细胞抗体，通过 Fc 段与肥大细胞和嗜碱性粒细胞表面 FcεRI 结合使其致敏，介导 1 型超敏反应；③穿过胎盘和黏膜：IgG 是唯一能通过胎盘的免疫球蛋白，通过胎盘滋养层细胞的 FcRn 主动转运入胎儿血液循环，是重要的自然被动免疫；分泌型 IgA 可被转运到呼吸道和消化道黏膜表面，在黏膜局部免疫中发挥作用；④抗体分子还对免疫应答有调节作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch04-antibody-short004",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 SIgA 的结构和作用。",
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
        "SIgA 的结构和作用",
        "SIgA 为二聚体，每个 SIgA 分子含两个单体 IgA、一条 J 链和一个分泌片。单体 IgA 和 J 链均由呼吸道、胃肠道和泌尿生殖道黏膜固有层的浆细胞产生，分泌片由黏膜上皮细胞产生；结合分泌片后 SIgA 不易被酶解，有助于其在黏膜表面及外分泌液中保持抗体活性。SIgA 合成和分泌的部位在肠道、呼吸道、乳腺、唾液腺和泪腺，故主要存在于胃肠道和支气管分泌液、初乳、唾液和泪液中。SIgA 是外分泌液中的主要抗体，参与黏膜局部免疫，通过与病原微生物结合阻止其黏附到细胞表面，在局部抗感染中发挥重要作用，是机体抗感染的“边防军”，SIgA 在黏膜表面也有中和毒素作用。新生儿易患呼吸道、胃肠道感染可能与 IgA 合成不足有关，婴儿可从母亲初乳中获得 SIgA，是重要的自然被动免疫。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章一般无 —— 置空 */
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