import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第25章 呼吸道病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：1 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：4 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、选择题（A1 型 11 + A2 型 4）、B1 型 3 组（共 10 成员）
 *   与简答题 4；本文件按 10 道预算取样，名词解释与简答题全取，选择题取 A1 第 1 题，
 *   预算内未纳入 B1（B1 组最小为 2 成员，无法在剩余 1 道预算内取完整组）。正确项对齐
 *   章末参考答案键号（A1 1.A）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 沩→为、
 *   吸道合胞病毒→呼吸道合胞病毒、疱瘆→疱疹 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch25-respiratory-viruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第25章 呼吸道病毒 习题（核对PDF 第193–197页）";
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
    id: "ext-microbiology-ch25-respiratory-viruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原性转变",
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
        "抗原性转变",
        "抗原性转变：流感病毒株表面抗原结构一种或两种发生变异，变异幅度大，形成新亚型，属于质变。由于与前一次流行株抗原结构相异，人们缺少对变异病毒株的免疫力，从而引起大流行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血凝素",
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
        "血凝素",
        "血凝素（HA）：成分是糖蛋白，易变异，和 NA 一起作为甲型流感病毒划分亚型的依据。主要功能有：①凝集红细胞，能使多种动物或人的红细胞发生凝集，这种血凝现象可以被特异性抗体所抑制；②吸附宿主细胞，使病毒进入机体细胞；③具有抗原性，刺激机体可产生保护性抗体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原性漂移",
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
        "抗原性漂移",
        "抗原性漂移：流感病毒毒株表面抗原结构发生了点突变，变异幅度小或连续变异，部分人群对新毒株没有免疫力，引起小规模流行。一般认为是属于量变，即亚型内变异。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：神经氨酸酶",
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
        "神经氨酸酶",
        "神经氨酸酶（NA）：成分是糖蛋白，易变异，和 HA 一起作为甲型流感病毒划分亚型的依据。主要功能有：①参与病毒释放；②促进病毒扩散；③具有抗原性，刺激机体可产生抗体，但该抗体不能中和病毒的感染性，能抑制酶的水解。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：先天性风疹综合征",
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
        "先天性风疹综合征",
        "先天性风疹综合征：是指孕妇感染风疹病毒后，病毒可通过胎盘感染胎儿，引起胎儿畸形、死亡、流产或产后死亡。胎儿畸形的主要表现是先天性心脏病、白内障和耳聋三大主症。在女性怀孕的前三个月感染风疹病毒风险最高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch25-respiratory-viruses-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "甲型流感病毒亚型划分的依据是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "包膜上的 HA 和 NA",
      "核酸",
      "核糖核蛋白",
      "M 蛋白",
      "核蛋白",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "包膜上的 HA 和 NA",
        "HA 和 NA 的抗原结构不稳定、易发生变异，是划分甲型流感病毒亚型的主要依据。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch25-respiratory-viruses-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：SARS 的病原、传播途径和致病特点是什么。",
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
        "SARS 的病原、传播途径和致病特点",
        "SARS 的病原体是 SARS 冠状病毒。传播途径：近距离空气飞沫和密切接触传播。致病特点：是急性呼吸道传播病，引发病人发热、头痛、咳嗽、呼吸困难，部分病人为呼吸道综合征，又称传染性非典型肺炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述流感病毒的结构。",
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
        "流感病毒的结构",
        "流感病毒有 3 层结构，即：刺突，包括有 HA 和 NA；包膜，包括有基质蛋白和脂质双层；核衣壳，由分节段核酸及其周围螺旋对称壳粒组成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-short003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：流感病毒包括哪些型别？分型和分亚型的依据是什么？",
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
        "流感病毒的型别及分型分亚型依据",
        "流感病毒根据核蛋白（NP）和膜蛋白（MP）抗原性不同分为甲、乙、丙三型。根据血凝素（HA）和神经氨酸酶（NA）的抗原性不同，甲型流感病毒可分为若干亚型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch25-respiratory-viruses-short004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：甲型流感病毒为何易引起世界性大流行。",
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
        "甲型流感病毒易引起世界性大流行的原因",
        "甲型流感病毒最易发生变异，主要是 HA 和 NA 的变异。有时变异幅度小，称为抗原性漂移，引起小流行；有时变异幅度大，形成新亚型，称为抗原性转变，人们对新亚型病毒缺乏免疫力，易造成大的流行或世界性大流行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章无 —— 置空 */
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
