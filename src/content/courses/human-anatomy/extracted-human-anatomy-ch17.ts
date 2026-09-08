import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第十七章 脑和脊髓的被膜、血管及脑脊液循环 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2/A3 型选择题（a1-single）：4 题
 * - 填空题（fill）：2 题
 * - 判断改错题 + 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：14 题（含 B1 组成员；须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型题 20、A2 型题 12、A3 型题 4（含共用题干组）、
 *   B1 共用备选答案配伍题 15 个小题（若干组）、填空题 14、名词解释 15、判断改错题 20、
 *   问答题 15。本文按 14 道预算在原书顺序中取材并改写，覆盖脑/脊髓被膜、脑脊液循环、
 *   脑动脉来源与分布、硬脑膜窦、海绵窦等本要点。
 *   A1/A2/A3 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题」→A1/A2 型题、「力/沩」→为、
 *   「大脑动脉环·G」→C（直窦）、「横膈」→膈等），结构名、血管名与数值均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch17-meninges-vessels-csf";
const locatorBase =
  "《系统解剖学习题集》第2版 第十七章 脑和脊髓的被膜、血管及脑脊液循环 复习思考题 习题（扫描版原书核对PDF 第287–295页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：硬膜外隙",
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
        "硬膜外隙",
        "硬膜外隙是硬脊膜与椎管内面的骨膜之间的间隙，内含脂肪、疏松结缔组织和静脉丛，有脊神经根通过，临床上硬膜外麻醉即在此间隙内注药。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：大脑动脉环",
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
        "大脑动脉环",
        "大脑动脉环（Willis 环）由两侧大脑前动脉起始段、两侧颈内动脉末段、两侧大脑后动脉借前、后交通动脉共同组成，位于脑底环绕视交叉、灰结节和乳头体周围，使颈内动脉系与椎-基底动脉系相互吻合交通。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题（统一映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于颈内动脉分支的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑膜中动脉",
      "大脑后动脉",
      "后交通动脉",
      "小脑上动脉",
      "前交通动脉",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "后交通动脉",
        "颈内动脉的主要分支包括大脑前动脉、大脑中动脉、脉络丛前动脉和后交通动脉；后交通动脉参与组成大脑动脉环。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于椎动脉分支的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "小脑上动脉",
      "迷路动脉",
      "小脑下前动脉",
      "小脑下后动脉",
      "脉络丛前动脉",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "小脑下后动脉",
        "椎动脉的主要分支有脊髓前动脉、脊髓后动脉和小脑下后动脉；小脑下后动脉走行于延髓和小脑之间。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大脑后动脉直接发自",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "椎动脉",
      "颈内动脉",
      "基底动脉",
      "大脑动脉环",
      "颈外动脉",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基底动脉",
        "大脑后动脉是基底动脉的终末分支，大脑中动脉的分支，而大脑前动脉、大脑中动脉为颈内动脉的终末分支。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于硬膜外隙内结构的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "淋巴管",
      "脂肪组织",
      "椎内静脉丛",
      "脑脊液",
      "疏松结缔组织",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑脊液",
        "硬膜外隙内含疏松结缔组织、脂肪组织、淋巴管和椎内静脉丛；脑脊液位于蛛网膜下隙，不属于硬膜外隙结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），2 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-fill001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "脑和脊髓的被膜由外向内依次为____、____、____。",
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
        "①硬膜（硬脑膜/硬脊膜） ②蛛网膜 ③软膜（软脑膜/软脊膜）",
        "脑和脊髓均由外向内包有三层被膜，即硬膜、蛛网膜和软膜，具有支持和保护作用，其间形成硬膜外隙、硬膜下隙和蛛网膜下隙。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-fill002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "脑的动脉来源于____和____。",
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
        "①颈内动脉 ②椎动脉",
        "脑的动脉来源于颈内动脉系和椎-基底动脉系，两侧颈内动脉系与椎-基底动脉系通过大脑动脉环相互交通。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题 + 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：脊髓蛛网膜与硬脊膜之间的间隙称硬膜外隙。",
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
        "错误；应将“硬膜外隙”改为“硬膜下隙”",
        "脊髓蛛网膜与硬脊膜之间的间隙称硬膜下隙；硬膜外隙位于硬脊膜与椎管内面的骨膜之间，两者位置不同。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题（叙述正确者打“对”，错误者改正）：蛛网膜粒突入窦汇内。",
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
        "错误；应将“窦汇”改为“上矢状窦”",
        "蛛网膜粒在上矢状窦处突入上矢状窦内，脑脊液经蛛网膜粒渗入硬脑膜窦回流静脉，而非突入窦汇。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-short003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述脑脊液的产生及循环。",
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
        "脑脊液的产生及循环",
        "脑脊液主要由脑室的脉络丛产生。循环途径：侧脑室→经室间孔→第三脑室→经中脑水管→第四脑室→经正中孔和外侧孔→蛛网膜下隙→蛛网膜粒→上矢状窦（最终回流静脉）。",
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
    id: "ext-human-anatomy-ch17-meninges-vessels-csf-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["上矢状窦", "下矢状窦", "横窦", "直窦", "乙状窦"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-human-anatomy-ch17-meninges-vessels-csf-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "位于大脑镰上缘的硬脑膜窦是",
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
            "上矢状窦",
            "上矢状窦位于大脑镰上缘、上矢状窦沟内，为不成对的重要硬脑膜窦。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch17-meninges-vessels-csf-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "位于小脑幕后缘附着处的硬脑膜窦是",
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
            "横窦",
            "横窦位于枕骨横窦沟内，小脑幕后缘附着于横窦沟处，故横窦沿小脑幕后缘走行。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch17-meninges-vessels-csf-b001m3",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "位于大脑镰与小脑幕连接处的硬脑膜窦是",
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
            "直窦",
            "直窦位于大脑镰与小脑幕连接处的直窦内，上矢状窦与直窦在枕内隆凸处汇合成窦汇。",
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