import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第16章 呼吸系统 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：6 题
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：3 题
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 13、B1 型 2 组 4 小题、多选题 7）、名词解释 5、
 *   简答题 3、论述题 1，无填空题；本文件按 17 道预算等比取材并在原书顺序内取满。题干/
 *   选项/题号在双栏排版中交错散落（如 II 型肺泡细胞、B1 备选字母分离散落），已按呼吸系统
 *   组织学医学语义重建完整选项集合；正确项全数对照章末「参考答案」键号锚定。数值（I 型
 *   肺泡细胞覆盖约 95% 表面、软骨环 16～20 个、细支气管管径 <5mm）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch16-respiratory-system";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第16章 呼吸系统 复习思考题 习题（核对PDF 第136–141页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch16-respiratory-system-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：嗅细胞",
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
        "嗅细胞",
        "为双极神经元，位于鼻黏膜嗅部的假复层柱状上皮内，呈细长梭形，树突伸向上皮的表面形成嗅泡，从嗅泡发出多根嗅毛。嗅毛是嗅觉感受器，能感受不同化学物质的刺激；嗅细胞的基部伸出轴突形成无髓神经纤维束即为嗅神经。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肺小叶",
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
        "肺小叶",
        "每一细支气管连同它的分支和肺泡，组成一个肺小叶，呈锥体形，尖朝向肺门、底向肺表面，是肺的结构单位。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肺呼吸部",
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
        "肺呼吸部",
        "呼吸性细支气管以下各段均不同程度出现可进行气体交换的肺泡，为肺呼吸部。它包括呼吸性细支气管、肺泡管、肺泡囊和肺泡。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肺表面活性物质",
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
        "肺表面活性物质",
        "II 型肺泡细胞质内含有较多高电子密度分泌颗粒，因颗粒内呈现同心圆或平行排列的板层状结构，故称板层小体，内容物为磷脂（主要是二棕榈酰卵磷脂）、蛋白质和糖的复合物。细胞以胞吐方式将内容物分泌到肺泡上皮表面，铺展形成一薄层液体膜，称表面活性物质。有降低肺泡表面张力、稳定肺泡大小的重要作用。原书名词解释第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/X 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch16-respiratory-system-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "气管和支气管内具有增殖分化能力的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "纤毛细胞",
      "柱状细胞",
      "刷细胞",
      "基细胞",
      "小颗粒细胞",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基细胞",
        "基细胞呈锥形、位于上皮深部，为干细胞，可增殖分化为上皮中其他各类细胞。原书 A1 参考答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与它的各级分支及肺泡构成肺小叶的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "叶支气管",
      "小支气管",
      "细支气管",
      "终末细支气管",
      "呼吸性细支气管",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细支气管",
        "每一细支气管连同它的分支和肺泡组成一个肺小叶。细支气管管径小于 5mm，其环行平滑肌可调节进入肺小叶的气流量。原书 A1 参考答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肺内具有气体交换功能的部分有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细支气管、肺泡管、肺泡囊、肺泡",
      "呼吸性细支气管、肺泡管、肺泡囊、肺泡",
      "细支气管、肺泡管、肺泡囊、肺泡腔",
      "终末细支气管、肺泡管、肺泡囊、肺泡",
      "呼吸性细支气管、肺泡管、肺泡囊、肺泡隔",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呼吸性细支气管、肺泡管、肺泡囊、肺泡",
        "肺呼吸部包括呼吸性细支气管、肺泡管、肺泡囊和肺泡，均不同程度的出现可进行气体交换的肺泡。原书 A1 参考答案第 5 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在支气管树中，肺泡最早出现于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细支气管",
      "终末细支气管",
      "呼吸性细支气管",
      "肺泡管",
      "肺泡囊",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呼吸性细支气管",
        "呼吸性细支气管管壁上出现少量肺泡，是肺泡最早出现之处，故具有换气功能。原书 A1 参考答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于 I 型肺泡细胞，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "覆盖大部分肺泡表面",
      "细胞扁平，含核部分较厚",
      "胞质中细胞器丰富，具有分裂能力",
      "是进行气体交换的部位",
      "胞质内吞饮小泡多",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胞质中细胞器丰富，具有分裂能力（错误项）",
        "I 型肺泡细胞覆盖肺泡约 95% 的表面积、扁平菲薄，胞质内吞饮小泡多，是气体交换的部位；但 I 型细胞胞质细胞器少且无增殖能力，由 II 型肺泡细胞增殖分化补充，故“胞质中细胞器丰富、具有分裂能力”说法错误。原书 A1 参考答案第 7 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "具有稳定肺泡直径作用的物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "5-羟色胺",
      "肝素",
      "表面活性物质",
      "生长抑素",
      "前列腺素",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "表面活性物质",
        "II 型肺泡细胞分泌的表面活性物质有降低肺泡表面张力、稳定肺泡大小的作用。原书 A1 参考答案第 8 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无，置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch16-respiratory-system-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述肺内导气部的组成和结构变化规律。",
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
        "肺内导气部的组成和结构变化规律",
        "答：肺内导气部包括叶支气管、段支气管、小支气管、细支气管和终末细支气管。其结构变化规律如下：上皮细胞——由假复层纤毛柱状上皮渐变为单层柱状；杯状细胞——由多变少直至消失；黏膜下层混合腺——由多变少直至消失；外膜中软骨——由环行渐变为片状直至消失；固有层外平滑肌——由少变多直至成为环行肌束。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述肺进行气体交换的结构基础。",
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
        "肺进行气体交换的结构基础",
        "答：肺泡进行气体交换要通过肺泡表面液体层、I 型肺泡细胞、融合后的肺泡上皮基膜和毛细血管内皮基膜、毛细血管内皮。此结构是肺泡与血液间最薄的部位，此处无结缔组织间隔，有利于气体迅速交换。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch16-respiratory-system-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述肺泡隔的组成及功能。",
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
        "肺泡隔的组成及功能",
        "答：相邻肺泡之间的薄层结缔组织称肺泡隔，内有密集的连续毛细血管和丰富的弹性纤维，还有肺巨噬细胞、成纤维细胞以及淋巴管和神经纤维等。毛细血管参与气体交换，弹性纤维有助于肺泡回缩，肺巨噬细胞在防御功能中起重要作用。原书简答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 共 4 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch16-respiratory-system-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "Ⅱ型肺泡细胞",
      "Ⅰ型肺泡细胞",
      "肺巨噬细胞",
      "肺泡隔中纤维细胞",
      "克拉拉细胞",
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
        id: "ext-histology-embryology-ch16-respiratory-system-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胞质内有大滑面内质网和分泌颗粒的细胞是",
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
            "克拉拉细胞",
            "终末细支气管的克拉拉细胞呈柱状、无纤毛，胞质内有较多分泌颗粒，分泌物含类表面活性物质。原书 B1 第 14 题答案 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch16-respiratory-system-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "来源于单核细胞，有活跃吞噬能力的细胞是",
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
            "肺巨噬细胞",
            "肺巨噬细胞由单核细胞演化而来，可游走进入肺泡腔，吞噬清除进入肺泡和肺间质的尘粒、细菌等异物。原书 B1 第 15 题答案 C。",
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
  {
    id: "ext-histology-embryology-ch16-respiratory-system-b002",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "肺泡",
      "肺泡囊",
      "呼吸性细支气管",
      "肺泡管",
      "肺泡隔",
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
        id: "ext-histology-embryology-ch16-respiratory-system-b002m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "管壁有少量肺泡开口的是",
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
            "呼吸性细支气管",
            "呼吸性细支气管管壁上出现少量肺泡，故具有换气功能。原书 B1 第 16 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch16-respiratory-system-b002m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "管壁上呈现结节状膨大的是",
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
            "肺泡管",
            "肺泡管管壁结构很少，管腔与许多肺泡相通，切片上呈现为一系列相邻肺泡开口之间的结节状膨大，内有平滑肌束。原书 B1 第 17 题答案 D。",
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