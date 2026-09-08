import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第20章 维生素 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：1 题
 * - A1/A2 型选择题（a1-single）：2 题（均为 A1 型单选）
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：9 题（含 B1 组成员；须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、A1 型选择题 26、A2 型选择题 3、
 *   B1 型配伍 2 组（30–33、34–37）、简答题 2。本文件按 9 道预算依原书顺序取材：
 *   名词解释 1 道、A1 选择题第 1–2 题、B1 配伍（30–33 题共用备选答案）一组共 4 个
 *   成员、简答题 2 道。原书参考答案正确项逐一对齐源答案（名词解释按定义；A1：
 *   1.C 2.A；B1：30.B 31.D 32.C 33.E；简答依「参考答案」要点），选项随机重排后
 *   同步 correctChoiceIndex（0 起）。本书为原生文本层 PDF 但双栏排版错序，题干/
 *   选项被打散（如“维生素B,一TPP一硫激酶”“参与转移 <:02”“1,25-(OH)2-D3”
 *   “5’-脱氧腺苷钴胺素”“问号变？/ 冒号散落”等），已按维生素生化医学语义恢复，
 *   维生素命名（VB1/B2/B6/B12/VC/VD/VA/VE/VK 及别名）与活性形式（TPP、FMN、
 *   FAD、NAD+、NADP+、磷酸吡哆醛、FH4 等）均保留原文，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch20-vitamin";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第20章 维生素 复习思考题 习题（核对原书PDF 第303–309页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch20-vitamin-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：维生素（vitamin）",
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
        "维生素",
        "维生素是维持机体正常功能所必需的，但在体内不能合成，或合成量很少、不能满足机体需要，必须由食物供给以维持正常生命活动的一组低分子量小分子有机化合物（低分子量有机物）。它们既不是构成机体组织的成分，也不是体内的供能物质，主要参与物质代谢的调节和维持生理功能；人体对维生素的日需要量极少，但长期摄入不足或吸收障碍可致维生素缺乏症，长期过量摄取亦可能中毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch20-vitamin-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于维生素、其活性形式及其生物学功能对应关系的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "维生素B1（硫胺素）— TPP — 硫激酶",
      "维生素B2（核黄素）— NAD+ — 黄酶",
      "维生素PP — NADP+ — 脱氢酶",
      "泛酸 — 辅酶A — 转氨酶",
      "维生素B6 — 磷酸吡哆醛 — 酰基转移酶",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "维生素PP — NADP+ — 脱氢酶",
        "原书 A1 型选择题第 1 题答案为 C，即维生素 PP 的活性形式是 NAD+ 和 NADP+，二者是多种脱氢酶的辅酶，叙述正确。维生素B1 的活性形式 TPP 是 α-酮酸氧化脱羧酶与转酮醇酶的辅酶而非硫激酶；维生素B2 活性形式为 FMN、FAD 而非 NAD+；泛酸（CoA）参与酰基转移而非转氨；维生素B6 活性形式磷酸吡哆醛参与转氨基而非酰基转移。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch20-vitamin-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "体内唯一含金属元素的维生素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "维生素B1（硫胺素）",
      "维生素B2（核黄素）",
      "维生素B12（钴胺素）",
      "维生素B6（吡哆醇）",
      "维生素C（抗坏血酸）",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "维生素B12（钴胺素）",
        "原书 A1 型选择题第 2 题答案为 A，即维生素B12。维生素B12 又称钴胺素，其分子中含有金属元素钴，是体内唯一含金属元素的维生素；其活性形式为甲钴胺素和5'-脱氧腺苷钴胺素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch20-vitamin-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "哪两种维生素缺乏可导致巨幼细胞贫血？请简述其分子机制。",
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
        "叶酸与维生素B12缺乏均可导致巨幼细胞贫血",
        "体内叶酸和维生素B12 缺乏均造成巨幼细胞贫血。四氢叶酸（FH4）是体内一碳单位的载体，参与核苷酸的合成，缺乏时 DNA 合成减少、细胞的分裂速度降低、细胞体积增大，造成巨幼细胞贫血。维生素B12 缺乏时，N5-CH3-FH4 的甲基不能转移，导致体内游离 FH4 减少，进而导致 DNA 合成减少、影响红细胞的分裂，从而引起巨幼细胞贫血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch20-vitamin-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "高蛋白膳食时何种维生素的需要量增多？为什么？",
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
        "高蛋白膳食时维生素B6 的需要量增多",
        "维生素B6 的活性形式是磷酸吡哆醛，作为转氨酶、氨基酸脱羧酶等的辅酶参与氨基酸代谢。膳食中的大量蛋白质在体内降解为氨基酸而进入氨基酸代谢池，因此需要更多的维生素B6 以促进氨基酸的代谢，故高蛋白膳食时维生素B6 的需要量相应增多。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组（原书 30–33 题共用备选答案）、共 4 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch20-vitamin-b001",
    order: 4,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "维生素B12（钴胺素）",
      "辅酶A（CoA）",
      "生物素",
      "维生素B1（硫胺素，活性形式 TPP）",
      "磷酸吡哆胺（维生素B6 活性形式）",
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
        id: "ext-biochem-ch20-vitamin-b001m1",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "参与转移酰基的是",
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
            "辅酶A（CoA）",
            "原书 B1 配伍题第 30 题答案为 B，即辅酶A。泛酸在体内转化为 CoA 及酰基载体蛋白（ACP），共同构成酰基转移酶的辅酶，参与酰基的转移。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch20-vitamin-b001m2",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "参与 α-酮酸氧化脱羧作用的辅酶中含有",
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
            "维生素B1（硫胺素）",
            "原书 B1 配伍题第 31 题答案为 D，即维生素B1。维生素B1 的活性形式焦磷酸硫胺素（TPP）是 α-酮酸氧化脱羧酶多酶复合体的辅酶，参与 α-酮酸的氧化脱羧作用。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch20-vitamin-b001m3",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "参与转移 CO2 的是",
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
            "生物素",
            "原书 B1 配伍题第 32 题答案为 C，即生物素。生物素是体内多种羧化酶的辅基，参与 CO2 固定（羧化）过程，即转移 CO2。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch20-vitamin-b001m4",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "参与转移氨基的是",
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
            "磷酸吡哆胺（维生素B6 活性形式）",
            "原书 B1 配伍题第 33 题答案为 E，即磷酸吡哆胺。磷酸吡哆醛和磷酸吡哆胺是维生素B6 的活性形式，作为多种转氨酶（氨基转移酶）的辅酶参与转氨基作用。",
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