import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第27章 眼和耳的发生 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社，本章页脚注作者 周国民）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 选择题（a1-single）：3 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：2 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书习题区依序为 A1 型选择题 8 题、B1 型 2 组（第 9~10、11~12 题）、
 *   多选题 4 题、名词解释 4 题、简答题 2 题，无填空题。本文件按 10 道预算在原文顺序内取材：
 *   A1 型 3 题（第 1、2、6 题，正确项对齐章末参考答案键号）、B1 第 9~10 题整组 2 个成员
 *   （视网膜与角膜发生来源配伍）、名词解释 3（视杯、晶状体泡、听泡）、简答 2 道。另一组 B1
 *   （11~12）与多选 4 道未选取（预算所限）。双栏错序已按医学语义重建题干/选项（如视泡发生
 *   于前脑、角膜来源），发育来源与结构均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch27-eye-ear";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第27章 眼和耳的发生 复习思考题 习题（核对PDF 第216–219页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch27-eye-ear-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：视杯",
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
        "视杯",
        "胚胎第 4 周，前脑两侧向外膨出一对泡状结构，称视泡。视泡远端膨大、贴近表面外胚层，进而内陷形成双层杯状结构，称视杯。视杯演变为视网膜。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch27-eye-ear-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：晶状体泡",
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
        "晶状体泡",
        "在视泡的诱导下，贴近视泡的表面外胚层增厚形成晶状体板，随后晶状体板内陷入视杯内，且渐与表面外胚层脱离，形成晶状体泡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch27-eye-ear-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：听泡",
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
        "听泡",
        "菱脑两侧的表面外胚层在菱脑的诱导下增厚形成听板，继之向下方间充质内陷形成听窝，最后听窝闭合、并与表面外胚层分离，形成囊状的听泡。听泡是内耳膜迷路上皮的原基。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch27-eye-ear-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "视泡发生于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["端脑", "前脑", "中脑", "间脑", "末脑"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "前脑",
        "复习纲要：眼的发生起源于第 4 周，前脑向外膨出左右一对视泡，视泡远端膨大并内陷形成视杯。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch27-eye-ear-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "视网膜色素上皮来源于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "表面外胚层",
      "间充质",
      "视杯内层",
      "视杯外层",
      "视杯口边缘部",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "视杯外层",
        "复习纲要：视杯外层分化为视网膜色素上皮层，内层增厚分化成视网膜视部和盲部。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch27-eye-ear-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "诱导内耳发生的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["前脑泡", "中脑泡", "菱脑泡", "第1咽囊", "第1鳃沟"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "菱脑泡",
        "复习纲要：菱脑两侧的表面外胚层在菱脑的诱导下增厚形成听板，再经听窝演变为听泡（内耳膜迷路上皮的原基）。故诱导内耳发生的是菱脑。原书 A1 答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/问/论述题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch27-eye-ear-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述眼的发生原基。",
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
        "眼的发生原基",
        "眼的发生开始于胚胎第 4 周，其原基为神经管前端形成的视泡和视柄，分别形成视网膜和视神经。围绕视泡周围的间充质和表面外胚层则形成眼球的其他结构及眼的附属器。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch27-eye-ear-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述内耳的发生。",
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
        "内耳的发生",
        "第 4 周初，菱脑两侧的表面外胚层在菱脑的诱导下增厚形成听板，继之听板向下方间充质内陷形成听窝，最后听窝闭合并与表面外胚层分离，形成囊状的听泡。听泡初为梨形，以后向背、腹方向延伸增大，形成背侧的前庭囊和腹侧的耳蜗囊，并在背端内侧长出一小管为内淋巴管。前庭囊演化为三个膜半规管和椭圆囊的上皮；耳蜗囊演化为球囊和膜蜗管的上皮。第 3 个月时，膜迷路周围的间充质分化成一个软骨性囊包绕膜迷路；约在第 5 个月时，软骨性囊骨化成为骨迷路。于是膜迷路被套在骨迷路内，两者间隔狭窄的外淋巴间隙。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch27-eye-ear-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "神经外胚层",
      "表面外胚层",
      "间充质",
      "神经外胚层和间充质",
      "表面外胚层和间充质",
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
        id: "ext-histology-embryology-ch27-eye-ear-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "视网膜的发生来源于",
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
            "神经外胚层",
            "复习纲要：眼的发生原基为视泡，来源于神经外胚层；视杯演变为视网膜，故视网膜来源于神经外胚层。原书 B1 第 9 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch27-eye-ear-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "角膜的发生来源于",
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
            "表面外胚层和间充质",
            "复习纲要：晶状体泡前方的表面外胚层分化为角膜上皮；角膜上皮后面的间充质分化为角膜其余各层。故角膜来源于表面外胚层和间充质。原书 B1 第 10 题答案 E。",
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
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];