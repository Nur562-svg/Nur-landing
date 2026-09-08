import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第6章 胆碱受体激动药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：1 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：6 题（须等于本文件预算 6）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 4、选择题（A1 型 5 + A2 型 1 + B1 型 4 组各
 *   2 小题）与简答题 1；本文件按 6 道预算在原书顺序内取材。名词解释与简答题全取各 1，
 *   填空题取前 1 道，选择题取前 1 道 A1 型题，B1 型取第 1 组（7～8 题）完整 2 成员。
 *   正确项对齐章末参考答案键号（A1 型题 1.C、B1 型题 7.B/8.C），选项与共用备选答案已
 *   随机重排并同步 correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复
 *   （如 调节痉挛/调节麻痹、Nm 受体、眼内压等），数值（25mmHg、14mmHg 等）均保留原值，
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch06-cholinergic-agonists";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第6章 胆碱受体激动药 习题（核对PDF 第43–46页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch06-cholinergic-agonists-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：调节痉挛",
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
        "调节痉挛",
        "睫状肌中以动眼神经支配的环状肌为主。动眼神经兴奋时或毛果芸香碱作用后，睫状肌中环状肌向瞳孔中心方向收缩，造成悬韧带放松，晶状体由于本身弹性变凸，屈光度增加，此时只适合于视近物而难以看清远物，这种作用称为调节痉挛。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch06-cholinergic-agonists-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "乙酰胆碱可使内脏平滑肌___，血管平滑肌___，瞳孔___。",
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
        "收缩；舒张；缩小",
        "乙酰胆碱可激动 M 胆碱受体，使内脏平滑肌收缩、血管平滑肌舒张、瞳孔括约肌收缩而瞳孔缩小。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch06-cholinergic-agonists-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于毛果芸香碱的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "对骨骼肌作用弱",
      "可用于治疗青光眼",
      "能直接激动M受体",
      "可使腺体分泌增加",
      "可引起眼调节麻痹",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "可引起眼调节麻痹",
        "毛果芸香碱能直接激动 M 胆碱受体，使腺体分泌增加、瞳孔括约肌与睫状肌收缩，引起缩瞳、降低眼内压和调节痉挛，可用于治疗青光眼；其对骨骼肌作用弱，且不引起调节麻痹（调节麻痹为阿托品等 M 受体阻断药的作用）。原书 A1 型题第 1 题，参考答案键号 C。",
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
    id: "ext-pharmacology-ch06-cholinergic-agonists-short001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述毛果芸香碱的药理作用与临床应用。",
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
        "毛果芸香碱能选择性地激动 M 胆碱受体，对眼和腺体的作用较明显：①激动瞳孔括约肌和睫状肌的 M 胆碱受体，使瞳孔括约肌和睫状肌收缩，产生缩瞳、降低眼内压和调节痉挛等作用；②激动腺体的 M 胆碱受体，使汗腺、唾液腺分泌增加。临床主要用于青光眼（主要是闭角型青光眼）的治疗；与扩瞳药交替使用用于虹膜睫状体炎的治疗；还可用于治疗口腔干燥症和抗胆碱药阿托品中毒的解救。",
        "药理作用方面突出眼与腺体两处 M 样效应；临床应用围绕青光眼、虹膜睫状体炎、口腔干燥症与阿托品中毒解救。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书 7～8 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch06-cholinergic-agonists-b001",
    order: 5,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "促进胆碱能神经末梢释放乙酰胆碱",
      "激动M受体",
      "激动Nm受体",
      "抑制胆碱酯酶",
      "激动M、N受体",
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
        id: "ext-pharmacology-ch06-cholinergic-agonists-b001m1",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "毛果芸香碱的作用机制是",
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
            "激动M受体",
            "毛果芸香碱为 M 胆碱受体激动药，直接激动 M 受体而发挥缩瞳、降低眼内压等作用。原书 B1 型题第 7 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch06-cholinergic-agonists-b001m2",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "乙酰胆碱的作用机制是",
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
            "激动M、N受体",
            "乙酰胆碱可直接激动 M 胆碱受体和 N 胆碱受体（含自主神经节 Nn 受体与骨骼肌神经肌肉接头 Nm 受体），产生相应拟胆碱作用。原书 B1 型题第 8 题，参考答案键号 C。",
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
