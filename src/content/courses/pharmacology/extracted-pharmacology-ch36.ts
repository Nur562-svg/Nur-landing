import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第36章 甲状腺激素及抗甲状腺药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 2 组共 4 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 3、选择题（A1 型 5 + A2 型 4 + B1 型 2 组
 *   共 4 小题）与简答题 3、论述题 2；本文件按 9 道预算取材：名词解释全取、填空题全取、
 *   A1 型题取第 1–2 题、简答题取第 1–2 题；A2 型题（6–9）、B1 型题（10–13）与
 *   论述题因预算未纳入。正确项对齐章末参考答案键号（A1 型题 1.E、2.A；本文件答案键号
 *   自 1–13 连续编号），选项已随机重排并同步 correctChoiceIndex。OCR 错字已按药理学
 *   医学语义恢复（如 葯→药、B受体→β受体、阝→β、甲元→甲亢、Ts→T₃、Ta→T₄、
 *   Tq→T₄、密啶→嘧啶、沩→为、堷生→增生、甲硫咪唑/甲巯咪唑统一为甲巯咪唑 等），
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch36-thyroid-hormones-antithyroid";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第36章 甲状腺激素及抗甲状腺药 习题（核对PDF 第240–244页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：甲状腺功能亢进症（甲亢）",
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
        "由甲状腺激素分泌过多引起，是多种原因导致的一种代谢紊乱综合征，重时可致死亡。",
        "甲状腺功能亢进症是甲状腺激素分泌过多所致的代谢紊乱综合征，可累及多系统，严重者可危及生命。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：甲状腺危象",
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
        "感染等诱因导致大量甲状腺激素突然释放入血，使患者发生高热、虚脱等，重时可致死亡。",
        "甲状腺危象是甲亢的严重并发症，多由感染、手术、创伤等诱因诱发，表现为高热、虚脱等，病死率高，需紧急处理。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "甲亢病人甲状腺手术前，为了使甲状腺体积变小、血管减少、手术容易进行，应使用___；为了使甲状腺功能恢复或接近正常，应使用___。",
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
        "大剂量碘剂；硫脲类药物",
        "硫脲类药物通过抑制甲状腺激素合成使甲状腺功能恢复或接近正常；大剂量碘剂在手术前 2 周应用，能抑制 TSH 促进腺体增生的作用，使腺体缩小变韧、血管减少，利于手术进行并减少出血。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "甲状腺功能低下的治疗应采用___；甲状腺功能亢进（甲亢）的内科治疗应采用___；单纯性甲状腺肿的治疗应采用___。",
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
        "甲状腺素；硫脲类药物；小剂量碘剂",
        "甲状腺功能低下用甲状腺素替代疗法；甲亢内科治疗用硫脲类药物抑制甲状腺激素合成；单纯性甲状腺肿用小剂量碘剂补充碘原料。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "β受体阻断药辅助治疗甲亢，主要根据其改善甲亢所致的___症状；某些β受体阻断药（普萘洛尔等）还能减少___的生成。",
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
        "交感神经激活；T₃",
        "β受体阻断药通过阻断β受体改善甲亢所致的交感神经激活症状；普萘洛尔与氧烯洛尔还能抑制外周 T₄ 转化为 T₃，减少生物活性较强的 T₃ 生成。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "甲状腺素的主要适应证是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "甲亢的手术前准备",
      "单纯性甲状腺肿",
      "甲状腺危象",
      "轻、中度甲状腺功能亢进",
      "交感神经活性增强引起的病变",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "单纯性甲状腺肿",
        "甲状腺素主要用于甲状腺功能低下（呆小病或黏液性水肿）的替代疗法，也用于治疗单纯性甲状腺肿、减轻甲亢患者服用抗甲状腺药后的突眼及甲状腺肿大。原书 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "丙硫氧嘧啶的抗甲状腺作用主要在于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制碘泵的摄碘功能",
      "抑制促甲状腺素（TSH）的分泌",
      "抑制甲状腺激素的合成",
      "抑制已合成的甲状腺素的释放",
      "抑制甲状腺中酪氨酸的碘化及耦联",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抑制甲状腺激素的合成",
        "丙硫氧嘧啶等硫脲类药物通过抑制甲状腺过氧化物酶，进而抑制酪氨酸的碘化及偶联，从而抑制甲状腺激素的合成，但对已合成的甲状腺激素无效。原书 A1 型题第 2 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常用的抗甲状腺药物有哪几类？",
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
        "常用的抗甲状腺药物有硫脲类、碘和碘化物、放射性碘和β受体阻断药等四类。",
        "抗甲状腺药按作用机制分四类：硫脲类抑制甲状腺激素合成；碘和碘化物大剂量时抑制甲状腺激素释放；放射性碘破坏甲状腺组织；β受体阻断药改善甲亢交感神经激活症状并减少 T₃ 生成。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch36-thyroid-hormones-antithyroid-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "甲亢病人进行甲状腺切除手术前主要用哪两类药物治疗？简述其机制。",
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
        "①硫脲类药物（如丙硫氧嘧啶）：降低基础代谢率，防止麻醉及手术后甲状腺危象的发生；②大剂量碘剂：在手术前两周给药，使甲状腺组织退化，血管减少，腺体缩小，有利于手术进行及减少出血。",
        "术前用药采用硫脲类＋大剂量碘剂联合方案：先用硫脲类抑制甲状腺激素合成使甲状腺功能恢复或接近正常，术前 2 周加用大剂量碘剂使腺体缩小变韧、血流减少。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 2 组共 4 小题，完整组超出剩余预算，未取样，导出空数组 */
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
