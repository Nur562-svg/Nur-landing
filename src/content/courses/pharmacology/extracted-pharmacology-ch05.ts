import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第5章 传出神经系统药理概论 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：6 题（须等于本文件预算 6）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 5、选择题（A1 型 8 + B1 型 1 组共 5 小题）
 *   与简答 2、论述 2；本文件按 6 道预算在原书顺序内取材。名词解释、填空题优先全取后
 *   按预算截断（名词解释全取 2、填空取前 2），选择题取前 1 道 A1 型题，简答题取第 1 道；
 *   原书 B1 型题仅 1 组共 5 小题（9～13 题共用备选答案），整组取用将超出预算容纳，故本章
 *   未取 B1 组，其余取材保持原书顺序。正确项对齐章末参考答案键号（A1 型题 1.B），
 *   选项已随机重排并同步 correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复
 *   （如 Nn 受体/Nm 受体亚型、α1/β1/β2 受体、乙酰胆碱酯酶等），数值均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch05-efferent-nervous-system";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第5章 传出神经系统药理概论 习题（核对PDF 第39–42页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch05-efferent-nervous-system-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：激动药",
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
        "激动药",
        "与受体结合后所产生效应与神经末梢释放的递质效应相似的药物，称为激动药；与递质效应相反的药物，称为阻断药。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch05-efferent-nervous-system-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：阻断药",
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
        "阻断药",
        "与受体结合后不产生或较少产生拟似递质的作用，但可妨碍递质与受体结合、阻断递质效应的药物，称为阻断药。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch05-efferent-nervous-system-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "传出神经系统包括___和___，前者又分为___和___。",
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
        "自主神经系统；运动神经系统；交感神经；副交感神经",
        "传出神经系统按解剖与功能分为自主神经系统和运动神经系统；自主神经系统又分为交感神经和副交感神经。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch05-efferent-nervous-system-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "传出神经根据其末梢释放的递质不同，可分为以___为递质的胆碱能神经和主要以___为递质的去甲肾上腺素能神经。",
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
        "乙酰胆碱；去甲肾上腺素",
        "传出神经按末梢释放的递质分为胆碱能神经（释放乙酰胆碱）和去甲肾上腺素能神经（释放去甲肾上腺素）。原书填空题第 2 题答案。",
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
    id: "ext-pharmacology-ch05-efferent-nervous-system-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于胆碱能神经的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "全部副交感神经节前纤维",
      "少部分支配汗腺的交感神经节后纤维",
      "运动神经",
      "绝大部分交感神经节后纤维",
      "全部交感神经节前纤维",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "绝大部分交感神经节后纤维",
        "胆碱能神经包括全部交感神经和副交感神经的节前纤维、运动神经、绝大部分副交感神经节后纤维以及少部分支配汗腺的交感神经节后纤维；绝大部分交感神经节后纤维释放去甲肾上腺素，属去甲肾上腺素能神经，不属胆碱能神经。原书 A1 型题第 1 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch05-efferent-nervous-system-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述传出神经系统的分类及相应功能。",
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
        "①自主神经系统：不受意识支配，独立完成生理调节功能，主要支配心肌、平滑肌和腺体等效应器；②运动神经系统：支配骨骼肌，通常随意活动，如肌肉的运动和呼吸等。",
        "传出神经系统分为自主神经系统与运动神经系统两类。自主神经系统（植物神经系统）不受意识支配，主要支配心肌、平滑肌和腺体等效应器，又分为交感神经与副交感神经；运动神经系统支配骨骼肌，多为随意活动。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书仅 1 组共 5 小题（9～13 题），整组取用超出本文件预算，故不取 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
