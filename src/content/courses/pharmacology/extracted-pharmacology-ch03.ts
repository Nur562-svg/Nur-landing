import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第3章 药物效应动力学 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：4 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：4 题（含 A1 型 4、A2 型病例题 0）
 * - 问答题（short-answer）：2 题（含简答 1、论述 1）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 10、填空题 6、选择题（A1 型 16 + A2 型 2 + B1 型 4 组
 *   共 13 小题）与简答、论述 4；本文件按 15 道预算在原书顺序内取材：名词解释取第 1–4 题、
 *   填空题取第 1–3 题、选择题取 A1 型第 1–4 题、问答题取第 1–2 题、B1 型取第 1 组
 *   （19～20 题共用备选答案）完整 2 成员。A1 映射为 a1-single，正确项对齐章末参考答案键号
 *   （如 A1 型题 2.D、3.D），选项已随机重排并同步 correctChoiceIndex。OCR 错字与符号已按
 *   药理学医学语义恢复（葯→药、LD50/ED50、治疗指数等），数值（40、40、60mg/kg 等）保留
 *   原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch03-pharmacodynamics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第3章 药物效应动力学 习题（核对PDF 第29–34页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：治疗指数",
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
        "治疗指数",
        "即半数致死量与半数有效量的比值（LD50/ED50），用以表示药物的安全性，比值越大相对安全性越大，反之则越小。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：受体脱敏",
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
        "受体脱敏",
        "指长期使用一种激动药后，组织或细胞对激动药的敏感性和反应性下降的现象，是受体调节中脱敏方式的表现。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：药物的选择性",
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
        "药物的选择性",
        "指药物只对某些组织器官发生明显作用，而对其他组织作用很小或无作用；药物作用的特异性强不一定选择性高，二者不一定平行。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：副反应",
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
        "副反应",
        "指在治疗剂量下出现的与治疗目的无关的作用，多因药物选择性低、药理效应涉及多个器官，当某一效应用作治疗目的时，其他效应即成为副反应；多数轻微并可预知。原书名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-fill001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "药物的量效曲线可分为___和___两种。从___者中可获得 ED50 及 LD50 的参数。",
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
        "量反应；质反应；后",
        "量效曲线分为量反应曲线与质反应曲线两种；质反应（全或无反应）曲线可求得 ED50 及 LD50 等参数，故从后者中可获得。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-fill002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "药物的不良反应有___、___、___、___、___和___等。",
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
        "副反应；毒性反应；后遗效应；停药反应；变态反应；特异质反应",
        "药物的不良反应包括副反应（副作用）、毒性反应、后遗效应、停药反应、变态反应（过敏反应）和特异质反应等。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-fill003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "受体激动药的最大效应取决于其___的大小，当___相同时药物的效价强度取决于亲和力。",
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
        "内在活性；内在活性",
        "药物的最大效应（效能）取决于内在活性的大小；当内在活性相同时，药物的效价强度取决于药物与受体的亲和力。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "药效学是研究",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "药物的疗效",
      "影响药效的因素",
      "药物对机体的作用及其规律",
      "药物在体内的过程",
      "药物的作用规律",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "药物对机体的作用及其规律",
        "药效学（药物效应动力学）研究药物对机体的作用及其规律，包括药物作用、作用机制及量效关系等；药物在体内的过程属药物代谢动力学。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "量效曲线可以为临床用药提供什么参考",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "药物的体内分布过程",
      "药物的给药方案",
      "药物的疗效大小",
      "药物的安全范围",
      "药物的毒性性质",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "药物的给药方案",
        "量效关系是确定给药方案的重要依据，从量效曲线上可获得最小有效量、效能、半最大效应浓度、效价强度、治疗指数、安全范围等与临床用药有关的资料。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-a1003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "部分激动药的特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "与受体亲和力高而无内在活性",
      "具有一定亲和力，但内在活性弱，增加剂量后内在活性增强",
      "无亲和力也无内在活性",
      "具有一定亲和力，内在活性弱，低剂量单用时产生激动效应，高剂量时可拮抗激动药作用",
      "与受体亲和力高有内在活性",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "具有一定亲和力，内在活性弱，低剂量单用时产生激动效应，高剂量时可拮抗激动药作用",
        "部分激动药与受体有较强的亲和力但内在活性不强；低剂量单用时产生激动效应，高剂量时可拮抗激动药的作用。原书 A1 型题第 3 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-a1004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "药物作用的两重性是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "既有对因治疗作用，又有对症治疗作用",
      "既有治疗作用，又有不良反应",
      "既有局部作用，又有全身作用",
      "既有副作用，又有毒性作用",
      "既有原发作用，又有继发作用",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "既有治疗作用，又有不良反应",
        "药物作用的两重性指药物既有治疗作用（包括对因治疗和对症治疗），又不可避免地产生不良反应。原书 A1 型题第 4 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），2 道（简答 1 + 论述 1） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "从药物量效曲线上可以获得哪些与临床用药有关的资料？",
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
        "最小有效量、效能、半最大效应浓度、效价强度、治疗指数、安全范围等",
        "从药物量效曲线可获得最小有效量（阈剂量或阈浓度）、效能（最大效应）、半最大效应浓度、效价强度、治疗指数及安全范围等与临床用药有关的资料。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述竞争性拮抗药和非竞争性拮抗药的特点。",
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
        "竞争性拮抗药能与激动药竞争相同受体且结合可逆；非竞争性拮抗药能与激动药竞争相同受体但结合不可逆",
        "竞争性拮抗药：能与激动药竞争相同受体，其结合是可逆的。非竞争性拮抗药：能与激动药竞争相同受体，其结合是不可逆的。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书 19～20 题共用备选答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch03-pharmacodynamics-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "由于病人高度敏感所致",
      "一种过敏反应",
      "在治疗范围内所产生的与治疗目的无关、但无多大危害的作用",
      "因用量过大或药物在机体内蓄积所致的反应",
      "一种遗传性生化机制异常所产生的特异反应",
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
        id: "ext-pharmacology-ch03-pharmacodynamics-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "药物的副作用是",
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
            "在治疗范围内所产生的与治疗目的无关、但无多大危害的作用",
            "副作用（副反应）是在治疗剂量（治疗范围）内所产生的与治疗目的无关、但无多大危害的作用。原书 B1 型题第 19 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch03-pharmacodynamics-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "药物的毒性反应是",
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
            "因用量过大或药物在机体内蓄积所致的反应",
            "毒性反应是因用量过大或药物在机体内蓄积所致的危害性反应，一般比较严重，是可以预知和避免的。原书 B1 型题第 20 题，参考答案键号 D。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
