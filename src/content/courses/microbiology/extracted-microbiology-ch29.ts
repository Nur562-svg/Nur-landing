import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第29章 虫媒病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：4 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：0 组（本章原书含 4 组 B1 配伍题，本文件预算剩余未纳入）
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、选择题（A1 型 10 + A2 型 1）、B1 型 4 组（共 19 成员）
 *   与简答题 2，无填空。本文件按 10 道预算取样，名词解释与简答题全取，选择题取 A1 第 1~4 题，
 *   B1 配伍题未纳入（预算剩余全部用于 A1 选择题）。正确项对齐章末参考答案键号
 *   （A1 1.A 2.C 3.B 4.D）。OCR 错字与双栏错序已按微生物学医学语义恢复
 *   （如 硬蟀→硬蜱、埃及伊蚁→埃及伊蚊、三带隊库蚊→三带喙库蚊、乌类→鸟类、
 *   发热伴血小板減减少综合征→发热伴血小板减少综合征、沩→为 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch29-arboviruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第29章 虫媒病毒 习题（核对PDF 第220–225页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch29-arboviruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：虫媒病毒",
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
        "虫媒病毒",
        "虫媒病毒（arbovirus）：是指通过吸血的节肢动物叮咬易感的脊椎动物而传播疾病的病毒，节肢动物既是病毒的传播媒介，又是储存宿主。多数虫媒病毒病是自然疫源性疾病，也是人畜共患病，具有明显的地方性和季节性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：登革出血热/登革休克综合征（DHF/DSS）",
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
        "登革出血热/登革休克综合征（DHF/DSS）",
        "登革出血热/登革休克综合征（DHF/DSS）：是指登革病毒再次感染所致的一种严重疾病，初期为典型登革热，而后迅速进展为多器官出血和（或）休克，死亡率高。其发病机制被认为与抗体依赖的增强作用（ADE）有关，主要通过免疫病理作用所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗体依赖的增强作用（ADE）",
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
        "抗体依赖的增强作用（ADE）",
        "抗体依赖的增强作用（ADE）：初次感染登革病毒后机体可产生非中和性或亚中和浓度的 IgG 抗体，当再次感染同型或异型登革病毒时，病毒与这些抗体形成免疫复合物，通过单核吞噬细胞表面的 Fc 受体与单核吞噬细胞结合，从而增强了病毒对细胞的吸附和感染作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：发热伴血小板减少综合征病毒（SFTSV）",
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
        "发热伴血小板减少综合征病毒（SFTSV）",
        "发热伴血小板减少综合征病毒（SFTSV）：是我国在 2009 年首次从发热伴血小板减少综合征的病人中分离到的一种新的布尼亚病毒，蜱可能为其传播媒介，临床主要表现发热、白细胞减少、血小板减少和多器官功能损害等，严重者可因多器官衰竭而死亡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch29-arboviruses-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在我国，流行性乙型脑炎病毒的主要传播媒介是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["库蚊", "伊蚊", "硬蜱", "体虱", "白蛉"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "库蚊",
        "乙脑病毒的主要传播媒介是三带喙库蚊，此外致乏库蚊、白纹伊蚊等亦可带毒。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "给流行区的幼猪进行疫苗接种可以降低人群发病率的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["流行性感冒", "肾综合征出血热", "乙型脑炎", "登革热", "脊髓灰质炎"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乙型脑炎",
        "猪是乙脑病毒的主要传染源和中间宿主，在流行区给幼猪接种疫苗可降低人群的发病率。原书 A1 答案第 2 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "主要通过伊蚊传播的病毒是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "汉坦病毒",
      "登革病毒",
      "乙型脑炎病毒",
      "森林脑炎病毒",
      "发热伴血小板减少综合征病毒",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "登革病毒",
        "白纹伊蚊和埃及伊蚊是登革病毒的主要传播媒介，故登革病毒主要通过伊蚊传播。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "感染后可获得牢固免疫力的病毒是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["流感病毒", "戊型肝炎病毒", "丙型肝炎病毒", "乙型脑炎病毒", "登革病毒"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乙型脑炎病毒",
        "乙脑病毒抗原性稳定，病后免疫力稳定而持久，隐性感染也可获得牢固的免疫力，其中体液免疫起主要作用。原书 A1 答案第 4 题为 D。",
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

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch29-arboviruses-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述虫媒病毒的共同特征。",
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
        "虫媒病毒的共同特征",
        "虫媒病毒的共同特征是：①通过吸血的节肢动物叮咬易感的脊椎动物而传播疾病，并维持病毒在自然界的循环；②能在节肢动物体内增殖并可经卵传代，故节肢动物是病毒的传播媒介/储存宿主；③多数虫媒病毒病是自然疫源性疾病，也是人畜共患病；④虫媒病毒病具有明显的地方性和季节性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch29-arboviruses-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述乙脑病毒的传染源、传播媒介与乙型脑炎的预防措施。",
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
        "乙脑病毒的传染源、传播媒介与乙型脑炎的预防措施",
        "①传染源：幼猪是乙脑病毒最重要的传染源，病人并不是主要的传染源；②传播媒介：蚊（库蚊）既是乙脑病毒的传播媒介，又是储存宿主；③预防措施：防蚊灭蚊；易感人群的疫苗接种和动物宿主的管理，在流行区给幼猪接种疫苗，控制乙型脑炎在猪群和人群中传播与流行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章原书含 4 组，本文件未纳入 —— 置空 */
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
