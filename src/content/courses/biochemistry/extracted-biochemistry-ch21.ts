import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第21章 钙、磷 及 微量元素 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：1 题
 * - A1/A2 型选择题（a1-single）：2 题
 * - 简答题（short-answer）：0 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：5 题（含 B1 组成员；须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、A1 型选择题 5（原书第 1~5 题）、A2 型选择题 1（原书
 *   第 6 题临床病案）、B1 共用备选答案配伍 1 组（7~11 题共用备选答案）、简答题 2。实取 5 道
 *   作为预算：名词解释《微量元素》1 道、代表 A1 选择题 2 道（原书第 1 题含微量元素钴的
 *   维生素、第 2 题不利于铁吸收的物质），以及 B1 配伍组前 2 个代表成员（原书第 7 题缺钙、
 *   第 8 题缺锌）。各选择题正确项逐一对齐源参考答案（A1 型：1.D 2.E；B1 型：7.A 8.C）。
 *   对书中原生文本层但双栏错序造成的题干/选项打散，已按钙磷及微量元素生化医学语义恢复
 *   （钙磷代谢调节、微量元素铁/锌/铜/碘/硒/钴等功能与缺乏症等）；缩写如 GSH、H2O2、
 *   维生素 B12 保留原文，选项随机重排后同步 correctChoiceIndex（0 起），未捏造。同章
 *   其余 A1/A2/简答及 B1 组后 3 个成员因超出本文件预算未提取。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch21-ca-p-trace";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第21章 钙、磷 及 微量元素 复习思考题 习题（核对原书PDF 第310–314页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch21-ca-p-trace-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：微量元素（trace element, microelement）",
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
        "微量元素",
        "微量元素（trace element, microelement）是指人体每日需要量在 100mg 以下的元素，主要包括铁、碘、铜、锌、硒等。微量元素通过参与构成酶活性中心或辅酶、参与激素和维生素的组成等方式，在体内发挥重要的生理功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch21-ca-p-trace-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "含有微量元素钴的维生素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "维生素B1",
      "维生素B12",
      "维生素B2",
      "维生素C",
      "维生素B6",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "维生素B12",
        "原书 A1 型选择题第 1 题，正确答案 D（维生素 B12）。钴是小肠吸收形式的维生素 B12 的组成成分，钴缺乏常表现为维生素 B12 缺乏的一系列症状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch21-ca-p-trace-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不利于铁吸收的物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "柠檬酸",
      "H2O2",
      "氨基酸",
      "苹果酸",
      "GSH",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "H2O2",
        "原书 A1 型选择题第 2 题，正确答案 E（H2O2）。不利于铁吸收的物质是过氧化氢（H2O2），而 GSH、柠檬酸等功能可促进铁吸收。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），本章取命中无 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，1 组 × 共 2 个成员（原书 7~8 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch21-ca-p-trace-b001",
    order: 4,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "贫血",
      "儿童发育不良",
      "地方性甲状腺肿",
      "骨质疏松",
      "脚气病",
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
        id: "ext-biochem-ch21-ca-p-trace-b001m1",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "人体缺乏钙元素会引起",
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
            "骨质疏松",
            "人体缺乏钙元素可导致骨质疏松；原书 B1 型题号 7，正确答案 A（骨质疏松），对应本题 sharedChoices 中的第 4 项。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch21-ca-p-trace-b001m2",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "人体缺乏锌元素会引起",
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
            "儿童发育不良",
            "人体缺乏锌元素可导致儿童发育不良及多种代谢障碍；原书 B1 型题号 8，正确答案 C（儿童发育不良），对应本题 sharedChoices 中的第 2 项。",
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