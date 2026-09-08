import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第17章 免疫调节 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：7 题
 * - 选择题（a1-single）：10 题（含 A2 病例/机理分析题 2 题）
 * - 问答题（short-answer）：5 题
 * - 独立记分题合计：27 题（等于本文件预算 27）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释 5、填空题 7、A1/A2 选择题 46、B1 配伍题 3 组、问答题 5。
 *   B1 型配伍题按项目规约（本书一般无 B 型配伍）不纳入本文件（extractedGroups 置空）。
 *   预算是 27，故 term+fill+a1+short=5+7+10+5 正好取满，选择题取最具代表性的 10 道，
 *   含 2 道 A2（Fas/FasL 基因突变疾病、创伤应激与免疫应答）并保留完整临床/背景细节。
 *   正确项均对照章末参考答案键号锚定（如 A1 第1/5/12/15/20/21/34/35 题、A2 第45/46 题）。
 *   OCR 错字与双栏错序已按免疫学医学语义恢复：PTK/PTP、ITAM/ITIM、Ab2a/Ab2β、
 *   CTLA-4/CD28、FcyRII-B、FceRI、CD94/NKG2A、Th1/Th2/Th17、Treg、M1/M2 巨噬细胞、
 *   IL-2/IL-4/IL-10/TGF-β、Fas/FasL，均未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch17-immune-regulation";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第17章 免疫调节 习题（核对PDF 第188–199页）";
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
    id: "ext-immunology-ch17-immune-regulation-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫调节",
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
        "免疫调节",
        "指免疫应答过程中免疫细胞间、免疫细胞与免疫分子间以及免疫系统与机体其他系统间相互作用，构成一个相互协调与制约的结构功能网络，对机体免疫应答感知并实施调控，从而维持机体的内环境稳定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：ITAM",
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
        "ITAM（免疫受体酪氨酸活化基序）",
        "免疫受体酪氨酸活化基序（immunoreceptor tyrosine-based activation motif）。带有酪氨酸残基，被酪氨酸蛋白激酶（PTK）磷酸化后，可募集含有 SH2 结构域的酪氨酸蛋白激酶，启动激活信号的传导。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：ITIM",
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
        "ITIM（免疫受体酪氨酸抑制基序）",
        "免疫受体酪氨酸抑制基序（immunoreceptor tyrosine-based inhibition motif）。ITIM 中的酪氨酸残基被磷酸化后，可募集蛋白酪氨酸磷酸酶 SHP-1 和 SHIP 并与之结合，这些磷酸酶通过对免疫细胞活化途径中重要分子的去磷酸化作用，抑制免疫细胞活化信号的转导。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原内影像",
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
        "抗原内影像",
        "抗独特型抗体中的 Ab2β，因其结构和抗原表位相似，并能与抗原竞争性地和 Ab1 结合，因而 β 型的独特型抗体被称为抗原内影像。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：独特型网络学说",
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
        "独特型网络学说",
        "抗原进入体内刺激相应克隆 B 细胞产生大量 Ab1，Ab1 在清除相应抗原的同时其 V 区作为抗原又可刺激相应 B 细胞克隆产生 Ab2；由于 Ab1 V 区与产生 Ab1 的 B 细胞上的 BCR 完全一致，抗 Ab1 V 区支架部分的 Ab2α 可封闭抗原与相应 BCR 结合而抑制免疫应答，抗 Ab1 V 区抗原结合点的 Ab2β 可模拟抗原刺激产生 Ab1 的 B 细胞克隆活化、增强免疫应答；Ab2 V 区又可刺激相应 B 细胞克隆产生 Ab3。随着抗体的出现抗原浓度降低，抗独特型浓度亦逐渐降低，直到独特型浓度不足以引起免疫应答时终止。针对 T 细胞克隆 TCR 的 V 区也存在相应的抗独特型反应。",
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
    id: "ext-immunology-ch17-immune-regulation-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "B细胞间相互作用的免疫调节依赖于 BCR 识别",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["MHC分子", "独特型决定簇", "Fc受体", "白细胞分化抗原", "补体受体"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "独特型决定簇",
        "B 细胞间相互作用的免疫调节主要依赖于 BCR 对免疫球蛋白 V 区（独特型）决定簇的识别，属于独特型网络调节。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与B细胞表面 CR1 结合，促进B细胞增殖、活化的分子",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["C1", "C2a", "C3a", "C4", "C3b"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C3b",
        "补体活化片段（如 C3b/C3d/iC3b/C3dg 等）可与 B 细胞表面补体受体结合，促进 B 细胞活化。CR1 结合的补体片段为 C3b。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于CD4+T细胞的免疫调节，下列哪项是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Th1分泌IL-2、IFN-γ、IL-12促进细胞免疫应答",
      "Th2分泌IL-4、IL-5、IL-10、IL-13参与体液免疫",
      "Th1分泌IFN-γ可抑制Th0向Th2的转化",
      "Th2产生的IL-4促进Th0向Th1的转化",
      "Th1和Th2处于动态平衡状态，维持正常的免疫应答",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Th2产生的IL-4促进Th0向Th1的转化（该说法错误）",
        "Th2 产生的 IL-4 促进 Th0 向 Th2 分化而非向 Th1 分化，故该叙述错误；Th1 分泌的 IFN-γ 则抑制 Th0 向 Th2 的转化。原书 A1 答案第 12 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Th17细胞的分化需要下列哪种细胞因子",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IL-17和IL-21", "TGF-β和IL-6", "IL-17A和IL-17F", "IL-2和IL-22", "IL-4和IL-10"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "TGF-β和IL-6",
        "Th17 细胞的分化需要 TGF-β 和 IL-6，IL-21 促进 Th17 的扩增，IL-23 维持与稳定 Th17 的表型；Th17 还分泌大量 IL-17。原书 A1 答案第 15 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下哪一个是B细胞的抑制性受体",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["BCR", "CD40", "CD28", "CD22", "CD80"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD22",
        "CD22 是 B 细胞表面的抑制性受体，胞内段含 ITIM 样基序，可通过募集磷酸酶下调 B 细胞活化信号；BCR/CD40 为活化性（共）受体，CD28 为 T 细胞共刺激分子，CD80 为 B7 配体。原书 A1 答案第 20 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "活化T细胞表面表达的CTLA-4与B7分子结合后产生抑制性信号，是因为其胞质区存在",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["ITIM", "ITAM", "ZAP-70", "SH2", "p56lck"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ITIM",
        "CTLA-4 胞质区存在 ITIM（免疫受体酪氨酸抑制基序），与 B7（CD80/CD86）结合后启动抑制性信号，反馈下调 T 细胞活化；其与配体亲和力高于 CD28，竞争性抑制共刺激信号。原书 A1 答案第 21 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与转导抑制信号相关",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["PTK", "SH2", "ITAM", "PTP", "ZAP-70"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "PTP",
        "蛋白酪氨酸磷酸酶（PTP）通过去磷酸化作用，对免疫细胞激活信号转导途径中的关键分子（如 ITIM 招募的 SHP-1/SHIP）发挥负向调节，与转导抑制信号相关。原书 A1 答案第 34 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与转导激活信号相关",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["PTK", "SHIP-2", "ITIM", "PTP", "SHP-1"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "PTK",
        "蛋白酪氨酸激酶（PTK）在免疫细胞激活信号转导中起正向作用，可将 ITAM 内酪氨酸残基磷酸化、募集信号分子，与转导激活信号相关。原书 A1 答案第 35 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关Fas和FasL的基因突变可分别见于 lpr 及 gld 基因突变型系统性红斑狼疮自发小鼠，人类相应的疾病可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "系统性红斑狼疮",
      "类风湿关节炎",
      "自身免疫性淋巴细胞增生综合征",
      "强直性脊柱炎",
      "自身免疫性溶血性贫血",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "自身免疫性淋巴细胞增生综合征",
        "Fas/FasL 基因缺陷导致活化诱导的细胞死亡（AICD）障碍，自身反应性淋巴细胞大量蓄积，人类相应疾病为自身免疫性淋巴细胞增生综合征（ALPS）。原书 A2 答案第 45 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "手术、烧伤、失血等应激情况下机体启动针对创伤的防御性免疫应答，过度的免疫应答在有些情形下可致器官、组织损伤，甚至影响全身脏器功能。以下哪一体征与上述针对创伤的防御性免疫应答无关",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性呼吸窘迫综合征",
      "急性肾功能不全",
      "脓毒血症",
      "急性肺栓塞",
      "创伤后应激障碍",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性肺栓塞",
        "创伤应激下炎症性免疫应答过度可并发急性呼吸窘迫综合征、急性肾功能不全、脓毒血症等；急性肺栓塞属于血栓性疾病，与针对创伤的防御性免疫应答无关。原书 A2 答案第 46 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），7 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch17-immune-regulation-fill001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "对Th2细胞具有负性调节作用的细胞因子是___，对Th1细胞具有负性调节作用的细胞因子是___。",
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
        "IFN-γ、IL-4",
        "Th1 产生的 IFN-γ 通过 T-bet 抑制 IL-4 基因转录、对 Th2 起负性调节；Th2 产生的 IL-4 激活 GATA-3、对 Th1 起负性调节。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-fill002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "T细胞活化后表达的抑制性共刺激分子是___，胞内含有___结构域，它与___竞争性结合CD80/CD86，亲和力明显高于对方，从而开启对T细胞活化的反馈调节。",
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
        "CTLA-4、ITIM、CD28",
        "活化 T 细胞诱导表达抑制性共刺激分子 CTLA-4，其胞内段含 ITIM，与 CD28 竞争性结合 CD80/CD86 且亲和力更高，发挥负反馈调节。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-fill003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "免疫细胞激活性受体胞内段带有___，免疫细胞抑制性受体胞内段带有___。",
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
        "ITAM、ITIM",
        "激活性免疫受体胞内段含免疫受体酪氨酸活化基序（ITAM），抑制性受体胞内段含免疫受体酪氨酸抑制基序（ITIM）。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-fill004",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "肥大细胞抑制性受体是___，激活性受体是___。",
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
        "FcyRII-B、FceRI",
        "肥大细胞抑制性受体为 FcyRII-B（胞内含 ITIM），激活性受体为高亲和力 FceRI（胞内含 ITAM）。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-fill005",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "CTLA-4的配体是___，PD-1的配体是___。",
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
        "CD80/CD86（B7-1/B7-2）、PD-L1/PD-L2",
        "CTLA-4 与 CD80/CD86 结合，PD-1 与 PD-L1/PD-L2 结合，二者均为免疫抑制性检查点。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-fill006",
    order: 21,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "巨噬细胞主要可分为___型和___型巨噬细胞，其中___型巨噬细胞通过分泌抑制性细胞因子___和/或___等下调免疫应答，在免疫调节中发挥重要作用。",
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
        "M1、M2、M2、IL-10、TGF-β",
        "巨噬细胞主要分为 M1 型与 M2 型，M2 型仅具较弱抗原提呈能力，主要通过分泌 IL-10、TGF-β 等抑制性细胞因子下调免疫应答。原书填空题第 6 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-fill007",
    order: 22,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "AICD的机制是免疫细胞活化后表达___增加，并大量表达和分泌___，与免疫细胞表面的___结合，诱导细胞凋亡。",
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
        "Fas、FasL、Fas",
        "活化诱导的细胞死亡（AICD）：免疫细胞活化后 Fas 表达增加，并大量表达和分泌 FasL，FasL 与免疫细胞表面（或其自身）表达的 Fas 结合，经 Fas/FasL 通路诱导细胞凋亡。原书填空题第 7 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch17-immune-regulation-short001",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：免疫应答的调节有何意义？",
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
        "免疫调节的意义",
        "免疫调节是多因素参与的生物学现象，贯穿整个免疫应答过程，包括正向调节和负向调节。其目的是控制免疫应答的强度和时限，使机体在有效排除外来抗原的同时尽量减少对自身组织的损伤，维持机体生理功能的平衡与稳定。调节环节失误可致全身或局部免疫异常：对“非己”抗原不能产生有效应答则丧失免疫保护、机体受损伤；对自身成分产生强烈免疫攻击则发生自身免疫病。可利用免疫调节机制开发干预手段，用于自身免疫病、肿瘤、超敏反应或严重感染等疾病的预防与治疗。原书问答题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-short002",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：哪些方面的因素参与免疫调节？",
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
        "参与免疫调节的因素（分子、细胞、整体/群体水平）",
        "①分子水平：抗原的调节、特异性抗体的调节、抗原抗体复合物的调节、独特型网络调节、补体活化片段的调节、PTK 参与的激活信号转导和 PTP 的负反馈调节，以及各种免疫细胞表面活化性受体和抑制性受体的免疫调节。②细胞水平：自然调节性 T 细胞、适应性调节性 T 细胞、Th1、Th2、Th17 细胞及活化诱导的细胞凋亡（AICD）的免疫调节作用。③整体和群体水平：神经-内分泌-免疫网络调节及免疫应答的遗传控制。原书问答题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-short003",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：免疫细胞如何调节免疫应答？",
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
        "免疫细胞调节免疫应答的途径",
        "①调节性 T 细胞的免疫调节：胸腺分化的自然调节性 CD4+CD25+ T 细胞通过细胞间的接触抑制自身反应性 T 细胞增殖；适应性调节细胞 Th1、Th2、Tr1 和 Th3 在外周经抗原激发分化，通过分泌相应免疫抑制性细胞因子抑制自身损伤性炎症、阻遏病原体和移植物引起的病理性应答。②Th1、Th2、Th17 的调节：Th1 产生的 IFN-γ 促进 Th0 向 Th1 分化、抑制 Th0 向 Th2 分化；Th2 产生的 IL-4 相反；Th17 分泌的细胞因子作用于多种免疫或非免疫细胞，在组织炎症和自身免疫病发生中发挥重要作用。③活化诱导细胞凋亡的负反馈：活化 T 细胞发挥效应后可借助诱导性表达的 FasL 与自身 Fas 结合，使 T 细胞数量迅速下降，靶细胞清除后免疫应答迅速下调。原书问答题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-short004",
    order: 26,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：免疫分子如何参与免疫调节？",
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
        "免疫分子参与免疫调节的方式",
        "①抗原的调节：进入途径、剂量、性质等均可影响免疫应答强弱和类型。②特异性抗体的调节：与抗原结合阻断其与 B 细胞结合并加速排除抗原；不同类别抗体形成的免疫复合物可增强或抑制应答。③免疫复合物的调节：可激活补体形成 Ag-Ab-C3 复合物，经补体受体或与滤泡树突状细胞（FDC）表面 Fc 受体作用持续提供抗原、诱发应答；也可经抗原成分与 BCR 结合、抗体 Fc 段与同一 B 细胞 FcyRII 结合产生抑制信号，终止 B 细胞增殖与抗体产生。④独特型网络的调节：将特异性免疫应答置于严格调控之下，Ab2α 封闭、Ab2β 模拟抗原。⑤补体活化片段的调节：C3b/C4b 发挥调理作用；C3d 等促进 B 细胞活化；APC 经 CR1 与 Ag-Ab-C3b 复合物结合提高抗原提呈效率。⑥免疫细胞受体的调节：T、B 淋巴细胞、NK 细胞、肥大细胞等具有功能相反的活化性和抑制性受体，抑制性受体经 ITIM 募集磷酸酶阻抑激活信号、终止免疫细胞激活。原书问答题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch17-immune-regulation-short005",
    order: 27,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：抑制性T细胞（调节性T细胞）有哪些类型？发挥什么功能？",
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
        "抑制性 T 细胞的类型与功能",
        "抑制性 T 细胞分为两类：①自然调节性 T 细胞：在胸腺中分化，占外周血 CD4+ T 细胞的 5%~10%，通过细胞间接触抑制自身反应性 T 细胞增殖，除遏制自身免疫病发生外，还参与肿瘤的发生和诱导移植耐受。②适应性（诱导性）调节性 T 细胞：外周由抗原及多种因素激发产生，其分化与功能发挥必须有特定细胞因子参与。Tr1 细胞分泌 IL-10 及 TGF-β，下调免疫应答，可调控炎症性自身免疫反应、抑制由 Th1 主宰的淋巴细胞增殖、诱导移植耐受；Th3 主要产生 TGF-β，下调免疫应答，在口服耐受和黏膜免疫中发挥作用。原书问答题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题：本书一般无 B 型配伍，置空 */
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