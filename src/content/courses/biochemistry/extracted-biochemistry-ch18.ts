import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第18章 血液 生物化学 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2 型选择题（a1-single）：3 题（均为 A1 型单选）
 * - 简答题（short-answer）：0 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：8 题（含 B1 组成员；须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、A1 型选择题 21、B1 型配伍 3 组（22–31，共 10 个
 *   成员）、简答题 4。本文件按 8 道预算在原书顺序内如实取材：名词解释 2（急性期蛋白、
 *   2,3-BPG 支路）、A1 型 3 道（第 3 题血浆含量最多蛋白、第 6 题血红素合成关键酶、第 12 题
 *   成熟红细胞特有代谢途径）、B1 型第 1 组（22–24 题，维生素相关 3 个成员）。正确项逐一对齐
 *   源参考答案（名词解释见定义、A1 依 3.A/6.A/12.D、B1 依 22.B/23.C/24.E），选项已随机
 *   重排并同步 correctChoiceIndex（0 起）。
 * - 恢复说明：本章为原生文本层 PDF 但双栏排版错序，题干/选项被打散（如“非蛋白质M”→
 *   非蛋白质氮、“口卜琳症”→卟啉症、“%球蛋白”→球蛋白、“血楽蛋白”→血浆蛋白、“暑酸歧化”、
 *   “Fe;”→Fe2+ 等），已按血液生物化学医学语义恢复；血浆蛋白分类（清蛋白、α/β/γ球蛋白）、
 *   血红素合成原料（甘氨酸、琥珀酰CoA、Fe2+）、限速酶 ALA 合酶及其辅酶磷酸吡哆醛（维生素B6）、
 *   2,3-BPG 支路、急性期蛋白（APP）、维生素 K 与凝血等缩写/数值均保留原文，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch18-blood-biochem";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第18章 血液 生物化学 复习思考题 习题（核对原书PDF 第289–294页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch18-blood-biochem-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：急性期蛋白（acute phase protein, APP）",
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
        "急性期蛋白",
        "急性期蛋白是在急性炎症或某种类型组织损伤等情况下，血浆中水平增高的一些蛋白质。包括 C-反应蛋白（CRP）、α1-抗胰蛋白酶、结合珠蛋白、α1-酸性蛋白和纤维蛋白原等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch18-blood-biochem-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：2,3-BPG 支路（2,3-BPG alternative pathway）",
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
        "2,3-BPG 支路",
        "2,3-BPG 支路是红细胞内糖酵解途径的一条重要支路。在糖酵解代谢途径中，中间产物 1,3-二磷酸甘油酸经变位酶催化生成 2,3-二磷酸甘油酸，形成代谢的分支；然后再由磷酸酶催化生成 3-磷酸甘油酸，回到糖酵解途径中。其主要作用是调节红细胞的运氧功能，2,3-BPG 可降低血红蛋白（Hb）与氧的亲和力。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch18-blood-biochem-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "血浆中含量最多的蛋白质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["α1球蛋白", "γ球蛋白", "清蛋白", "β球蛋白", "α2球蛋白"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "清蛋白",
        "原书 A1 型选择题答案第三题为 A，即清蛋白。血浆蛋白质中以清蛋白（白蛋白）含量最多，其由肝合成，是维持血浆胶体渗透压的主要蛋白质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch18-blood-biochem-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "血红素生物合成的关键酶是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["ALA脱水酶", "ALA合酶", "ALA氧化酶", "ALA还原酶", "ALA脱氢酶"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ALA合酶",
        "原书 A1 型选择题答案第六题为 A，即 ALA 合酶。ALA 合酶是血红素合成的限速酶，辅酶为磷酸吡哆醛，受血红素反馈抑制，高铁血红素可强烈抑制其活性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch18-blood-biochem-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "成熟红细胞特有的代谢途径是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["磷酸戊糖途径", "三羧酸循环", "2,3-BPG支路", "糖异生", "糖酵解"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "2,3-BPG支路",
        "原书 A1 型选择题答案第十二题为 D，即 2,3-BPG 支路。成熟红细胞缺乏全部细胞器，只能进行糖酵解和磷酸戊糖途径；其中 2,3-BPG 支路是红细胞内特有的代谢途径，2,3-BPG 可降低 Hb 与氧的亲和力，调节红细胞运氧功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer）：本章无取材 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，1 组 × 3 成员（原书 22–24 题共用备选答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch18-blood-biochem-b001",
    order: 6,
    questionKind: "b1",
    status: "available",
    groupPrompt: "下列维生素分别参与血液相关的哪一生化过程？（22–24 题共用备选答案）",
    sharedChoices: ["维生素A", "维生素B6", "维生素C", "维生素D", "维生素K"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch18-blood-biochem-b001m1",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "血红素合成需要",
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
            "维生素B6",
            "原书 B1 型题第 22 题答案为 B，即维生素 B6。血红素合成限速酶 ALA 合酶的辅酶为磷酸吡哆醛，其含有维生素 B6。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch18-blood-biochem-b001m2",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "防止血红蛋白被氧化需要",
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
            "维生素C",
            "原书 B1 型题第 23 题答案为 C，即维生素 C。维生素 C 具有抗氧化还原性，可防止血红蛋白（Hb）被氧化，维持其在还原状态行使运氧功能。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch18-blood-biochem-b001m3",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "血液凝固需要",
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
            "维生素K",
            "原书 B1 型题第 24 题答案为 E，即维生素 K。维生素 K 参与凝血因子（Ⅱ、Ⅶ、Ⅸ、Ⅹ）的活化，是血液凝固所必需。",
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