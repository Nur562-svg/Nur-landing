import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生理学 学习指导与习题集（第3版）— 第一章 绪论 题库提取（等比取样）
 * 来源：《生理学学习指导与习题集》第3版（人民卫生出版社，主编：罗自强、祁金顺）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算：11 道）==
 * - 名词解释：3 题
 * - A1/A2 型选择题（统一映射为 a1-single 单选）：4 题
 * - 简答题：1 题
 * - B1 共用备选答案配伍题：1 组、共 3 个成员
 * - 独立记分题合计：11 题（含 B1 组成员）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依次含名词解释 8、A1 型 12、A2 型 2、B 型 1 组（4 题）、
 *   X 型 3、简答 3、思考题 1；本文件按 11 道预算等比取材并改写。
 *   A2 病例型亦映射为 a1-single。数值与单位保留原值，未捏造。OCR 错字已恢复。
 * 注意：本文件覆盖 PDF 第14–23页（第一章 绪论）。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "physiology-ch1-introduction";
const locatorBase =
  "《生理学学习指导与习题集》第3版 第一章 绪论 复习思考题 习题（PDF 第14–23页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch1-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：内环境（internal environment）",
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
        "内环境",
        "指体内各种组织细胞直接接触并赖以生存的环境。体内细胞直接接触的环境即为细胞外液，因此生理学中通常把细胞外液称为内环境。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch1-introduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：稳态（homeostasis）",
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
        "稳态",
        "也称自稳态，指内环境的各种理化性质（如温度、pH、渗透压和各种体液成分等）保持相对恒定的状态；生理学中已扩大到泛指体内从细胞、分子水平到系统、整体水平各种生理功能活动在神经和体液等调节下保持相对稳定的状态。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch1-introduction-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：负反馈（negative feedback）",
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
        "负反馈",
        "指体内控制系统中，受控部分发出的反馈信息调整控制部分的活动，最终使受控部分的活动朝着与它原先活动相反的方向发生改变的调节方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch1-introduction-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "内环境稳态是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞外液的化学成分相对恒定",
      "细胞内、外液的理化性质相对恒定",
      "细胞外液的理化性质相对恒定",
      "细胞内液的化学成分相对恒定",
      "细胞内液的理化性质相对恒定",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞内、外液的理化性质相对恒定",
        "内环境稳态即细胞内、外液（尤其是细胞外液）的理化性质保持相对恒定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch1-introduction-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "神经调节的基本方式是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["适应", "刺激", "反应", "反射", "反馈"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "反射",
        "神经调节的基本形式是反射，反射活动的结构基础为反射弧。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch1-introduction-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列生理功能活动的调节中，属于自身调节的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "体温维持稳定的调节",
      "肾血流量维持稳定的调节",
      "血糖维持稳定的调节",
      "血液pH维持稳定的调节",
      "血压维持稳定的调节",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾血流量维持稳定的调节",
        "自身调节指组织细胞凭借本身内在特性对内环境变化产生适应性反应的过程，如动脉血压在一定范围内波动时肾血流量保持相对稳定即为自身调节。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch1-introduction-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，21岁，近三个月饮食增多、体重下降、怕热多汗，心率120次/分，血液T3、T4及TBG水平轻度增高。甲状腺激素增快心率这一作用是通过",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "神经调节",
      "自身调节",
      "神经-体液调节",
      "体液调节",
      "激素的直接作用",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "激素的直接作用",
        "甲状腺激素可直接作用于心脏等靶组织并增强其对儿茶酚胺的敏感性，使心率加快，属于激素对靶器官的直接作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch1-introduction-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "内环境稳态具有什么生理意义？机体如何保持内环境相对稳定？",
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
        "内环境稳态的生理意义与维持方式",
        "在人和高等动物，内环境的稳态是细胞维持正常生理功能乃至机体维持正常生命活动的必要条件，因为细胞的各种代谢活动都是酶促反应，需要细胞外液保持相对恒定适宜的温度、离子浓度、酸碱度和渗透压，并提供充分的营养物质、氧气和水分；若内环境理化条件发生重大或急骤变化、超过调节能力，机体正常功能将受严重影响。为维持稳态，机体通过神经-体液调节等各种调节机制，协调呼吸系统、消化系统、泌尿系统、循环系统以及运动、神经、内分泌等系统的活动共同完成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-physiology-ch1-introduction-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["神经调节", "体液调节", "神经-体液调节", "自身调节"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-physiology-ch1-introduction-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "颈动脉窦压力感受器反射属于",
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
            "神经调节",
            "颈动脉窦压力感受器反射为典型的降压反射，以神经反射形式调节血压，属于神经调节。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-physiology-ch1-introduction-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "血钙浓度维持稳定依赖于",
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
            "体液调节",
            "血钙的调节主要依靠甲状旁腺激素等体液因素经血液运输作用于靶组织发挥作用，属于体液调节。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-physiology-ch1-introduction-b001m3",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "机体在寒冷环境下维持自身体温相对恒定依赖于",
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
            "神经-体液调节",
            "寒冷环境下机体通过神经调节启动战栗、血管收缩等反应，并伴有甲状腺素等激素分泌的体液调节，共同维持体温相对恒定，属于神经-体液调节。",
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