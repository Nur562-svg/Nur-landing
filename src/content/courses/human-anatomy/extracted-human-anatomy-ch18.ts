import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第十八章 内分泌系统 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：1 题
 * - A1/A2/A3 型选择题（a1-single）：2 题
 * - 填空题（fill）：1 题
 * - 判断改错题 + 问答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：7 题（含 B1 组成员；须等于本文件预算 7）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含最佳选择题（A1 型 10、A2 型 4、A3 型 4、B1 共用备选答案
 *   配伍题两组：1~3 题杂乱型/尿崩症组、4~5 题内分泌腺组）、填空题 8、名词解释 4、
 *   判断改错题 5、问答题 4。本文件按 7 道预算在原书顺序中取材并改写，覆盖内分泌腺
 *   （甲状腺、肾上腺、垂体、甲状旁腺、胰岛等）与内分泌组织的主要结构、分布与功能定位。
 *   A1/A2/A3 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题」→A1/A2 型题、「Ag型题」→A3型题、
 *   「力/沩」→为、「次」→此、填空题下划线断行拼接、「次全切除」→次全切除、「搦」误作「搐」等），
 *   结构名、激素名、数值（表号/空序号）均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch18-endocrine";
const locatorBase =
  "《系统解剖学习题集》第2版 第十八章 内分泌系统 复习思考题 习题（扫描版原书核对PDF 第296–300页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch18-endocrine-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：内分泌腺",
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
        "内分泌腺",
        "内分泌腺由具有内分泌功能的腺上皮细胞构成的器官，结构上独立存在、无排泄管，分泌物（激素）直接进入血液。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch18-endocrine-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "甲状腺峡部横越哪些气管软骨环的前方",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["第1~3", "第3~5", "第2~4", "第1~2", "第4~5"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第2~4",
        "甲状腺峡部多横越第2~4气管软骨环的前方，临床上行气管切开时应注意避开甲状腺峡部。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch18-endocrine-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "调节机体的基础代谢的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["垂体", "松果体", "甲状腺", "甲状旁腺", "胸腺"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "甲状腺",
        "甲状腺分泌的甲状腺素能调节机体的基础代谢，并影响机体的生长发育。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），1 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch18-endocrine-fill001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "甲状腺分为____和____，后者多位于____气管软骨环前方。甲状腺分泌的激素称为____，可调节机体的____，并影响机体的____等。",
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
        "①侧叶 ②峡部 ③第2~4 ④甲状腺素 ⑤基础代谢 ⑥生长发育",
        "甲状腺由两侧叶和峡部构成，峡部横越第2~4气管软骨环前方；侧叶借甲状腺囊连于喉和气管，随吞咽上下移动。甲状腺分泌的甲状腺素调节基础代谢，并影响生长发育。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch18-endocrine-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：垂体前叶主要是神经垂体，垂体后叶主要是腺垂体。",
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
        "错误；应将“前叶”改为“后叶”、“后叶”改为“前叶”",
        "腺垂体（垂体前叶）分泌多种激素，神经垂体（垂体后叶）为储存激素的部位，故前叶主要是腺垂体、后叶主要是神经垂体，原题前后颠倒。",
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
    id: "ext-human-anatomy-ch18-endocrine-b001",
    order: 6,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["松果体", "胸腺", "胰岛", "甲状旁腺", "甲状腺"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-human-anatomy-ch18-endocrine-b001m1",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与糖的代谢有关的是",
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
            "胰岛",
            "胰岛作为分布于胰内的内分泌组织，分泌胰岛素和胰高血糖素，调节糖的代谢；胰岛素分泌不足可导致糖尿病。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch18-endocrine-b001m2",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "成年后完全钙化的是",
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
            "松果体",
            "松果体位于背侧丘脑（上丘脑）的后上方，儿童期较发达，一般16岁后逐渐萎缩并钙化，成年后完全钙化。",
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