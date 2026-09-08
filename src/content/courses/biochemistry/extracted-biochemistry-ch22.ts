import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第22章 癌基因和抑癌基因 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - A1/A2 型选择题（a1-single）：1 题
 * - 简答题（short-answer）：0 题
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、A1 型选择题 16、A2 型选择题 2、
 *   B1 共用备选答案配伍题 3 组（各 5/4/4 题）、简答题 3 题。本文件按 11 道预算在原书顺序中
 *   取材并改写：全部 5 道名词解释、1 道代表性 A1 选择题（原原书第 1 题「原癌基因的作用」，答案 B），
 *   以及第 1 组 B1 配伍题「常见原癌基因编码产物的功能」（原原书第 19–23 题，备选答案
 *   RAS/RAF/EGFR/MYC/SIS，成员各 1 个独立记分题）。B1 按项目规约组织为 Group b1。全部选择题
 *   正确项逐一对齐源参考答案，选项顺序已随机重排并同步 correctChoiceIndex（0 起）。原生文本
 *   双栏错序已按癌基因/抑癌基因医学语义恢复，基因名/蛋白名（RAS、RAF、MYC、EGFR、SIS、
 *   TP53、Rb、PTEN 等）与数值均保留，未捏造；题干中的全角字符（“？”）已按中文恢复。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch22-oncogene";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第22章 癌基因和抑癌基因 复习思考题 习题（核对原书PDF 第315–322页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch22-oncogene-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：原癌基因（proto-oncogene）",
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
        "原癌基因",
        "原癌基因是人类基因组中具有正常功能的基因。原癌基因及其表达产物是细胞正常生理功能的重要组成部分，原癌基因所编码的蛋白质在正常条件下并不具致癌活性，原癌基因只有经过突变等被活化后才有致癌活性，转变为癌基因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch22-oncogene-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：癌基因（oncogene）",
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
        "癌基因",
        "癌基因是能导致细胞发生恶性转化和诱发癌症的基因。绝大多数癌基因是细胞内正常的原癌基因突变或表达水平异常升高转变而来，某些病毒也携带癌基因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch22-oncogene-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生长因子（growth factor）",
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
        "生长因子",
        "生长因子是一类由细胞分泌的、类似于激素的信号分子，多数为肽类（含蛋白质类）物质，具有调节细胞生长与分化的作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch22-oncogene-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抑癌基因（tumor suppressor gene）",
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
        "抑癌基因",
        "抑癌基因也称肿瘤抑制基因，是防止或阻止癌症发生的基因。抑癌基因的部分或全部失活可显著增加癌症发生风险。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch22-oncogene-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：杂合性丢失（loss of heterozygosity）",
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
        "杂合性丢失",
        "杂合性丢失是指一对杂合的等位基因变成纯合状态的现象。杂合性丢失是肿瘤细胞中常见的异常遗传学现象，发生杂合性丢失的区域也往往就是抑癌基因所在的区域。",
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
    id: "ext-biochem-ch22-oncogene-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原癌基因的作用是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制细胞的生长和增殖，促进细胞分化，诱发凋亡",
      "促进细胞的生长和增殖，促进细胞分化，抵抗凋亡",
      "抑制细胞的生长和增殖，阻止细胞分化，抵抗凋亡",
      "促进细胞的生长和增殖，阻止细胞分化，抵抗凋亡",
      "促进细胞的生长和增殖，促进细胞分化，诱发凋亡",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "促进细胞的生长和增殖，阻止细胞分化，抵抗凋亡",
        "原书 A1 型选择题第一题答案为 B。原癌基因的作用通常是促进细胞的生长和增殖、阻止细胞分化、抵抗凋亡，这与抑癌基因（抑制增殖、促进分化、诱发凋亡）的作用相反。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），本章取样内无（0 道） */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，1 组 × 5 成员（原书第 19–23 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch22-oncogene-b001",
    order: 7,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["EGFR", "RAF", "RAS", "MYC", "SIS"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch22-oncogene-b001m1",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "编码产物为跨膜生长因子受体的癌基因",
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
            "EGFR",
            "原书 B1 型题库第 19 题答案为 C，即 EGFR（表皮生长因子受体）。跨膜生长因子受体类原癌基因编码蛋白包括 EGFR、HER2 等。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch22-oncogene-b001m2",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "编码产物为生长因子的癌基因",
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
            "SIS",
            "原书 B1 型题库第 20 题答案为 E，即 SIS。SIS 编码产物即生长因子（外源信号分子类），属细胞外生长因子。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch22-oncogene-b001m3",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "编码产物为丝/苏氨酸蛋白激酶的癌基因",
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
            "RAF",
            "原书 B1 型题库第 21 题答案为 B，即 RAF。RAF 编码产物为丝/苏氨酸蛋白激酶，是细胞内信号转导分子。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch22-oncogene-b001m4",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "编码产物为膜结合的 GTP 结合蛋白的癌基因",
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
            "RAS",
            "原书 B1 型题库第 22 题答案为 A，即 RAS。RAS 编码产物为膜结合的 GTP 结合蛋白（小 G 蛋白），具有 GTP 酶活性。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch22-oncogene-b001m5",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "编码产物为 DNA 结合蛋白的癌基因",
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
            "MYC",
            "原书 B1 型题库第 23 题答案为 D，即 MYC。MYC 编码产物核内转录因子，可结合 DNA（DNA 结合蛋白）。",
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