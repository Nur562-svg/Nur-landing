import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第47章 抗寄生虫药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释题，termItems 为空数组）
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 1 组共 4 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：6 题（须等于本文件预算 6）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 3、选择题（A1 型 12 + A2 型 3 + B1 型 1 组共
 *   4 小题）与简答题 1（本章无名词解释题）；本文件按 6 道预算取材：填空题全取、
 *   A1 型题取第 1–2 题、简答题全取；A1 型题第 3–12 题、A2 型题（13–15）、
 *   B1 型题（16–19）因预算未纳入。正确项对齐章末参考答案键号（A1 型题 1.E、
 *   2.D；本文件答案键号自 1–19 连续编号），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 至宁→奎宁、
 *   症原虫→疟原虫、抗症药→抗疟药、葯→药、根洽→根治、高铁南红蛋白→高铁
 *   血红蛋白、甲氧苄昤→甲氧苄啶、肉酯→内酯、靜脉→静脉 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch47-antiparasitic";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第47章 抗寄生虫药 习题（核对PDF 第303–307页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）：本章原书无名词解释题，导出空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch47-antiparasitic-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "用于控制疟疾发作的最佳抗疟药是___。",
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
        "氯喹",
        "氯喹对间日疟原虫、三日疟原虫以及敏感的恶性疟原虫的红细胞内期裂殖体有杀灭作用，起效快、疗效高、作用持久，能迅速有效地控制临床发作。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch47-antiparasitic-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "伯氨喹易引起急性溶血性贫血，其原因是红细胞内缺乏___。",
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
        "葡萄糖-6-磷酸脱氢酶（G-6-PD）",
        "红细胞内缺乏葡萄糖-6-磷酸脱氢酶（G-6-PD）的个体服用伯氨喹可发生急性溶血，服药前应询问病史并检测 G-6-PD 活性。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch47-antiparasitic-fill003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "治疗阴道滴虫病的首选药是___。",
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
        "甲硝唑",
        "甲硝唑具有抗滴虫和抗阿米巴原虫作用，是治疗阴道滴虫病的首选药。原书填空题第 3 题答案。",
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
    id: "ext-pharmacology-ch47-antiparasitic-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对抗疟药，叙述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "乙胺嘧啶能引起急性溶血性贫血",
      "氯喹对阿米巴囊肿无效",
      "青蒿素治疗疟疾最大缺点是复发率高",
      "伯氨喹可用作疟疾病因性预防",
      "奎宁根治良性疟",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青蒿素治疗疟疾最大缺点是复发率高",
        "青蒿素有效血药浓度维持时间短，杀灭疟原虫不彻底，复发率高达 30%，与伯氨喹合用可使复发率降至 10%。原书 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch47-antiparasitic-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "氯喹的抗疟作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制疟原虫的二氢叶酸还原酶",
      "损害疟原虫线粒体",
      "干扰疟原虫对宿主血红蛋白的利用",
      "影响疟原虫 DNA 复制和 RNA 转录",
      "以上都不是",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "影响疟原虫 DNA 复制和 RNA 转录",
        "氯喹能插入疟原虫 DNA 双螺旋之间，影响 DNA 复制和 RNA 转录，从而抑制疟原虫增殖。原书 A1 型题第 2 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch47-antiparasitic-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述常用抗疟药防治疟疾的作用环节（举例说明）。",
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
        "常用抗疟药防治疟疾的作用环节如下：（1）杀灭红细胞内期疟原虫，主要控制症状的药物，如氯喹、奎宁、青蒿素；（2）杀灭迟发型红外期疟原虫和配子体，主要用于控制复发和传播的药物，如伯氨喹；（3）抑制原发型红细胞外期疟原虫，用于病因性预防的药物，如乙胺嘧啶等。",
        "抗疟药可作用于疟原虫生活史的不同环节：氯喹、奎宁、青蒿素作用于红细胞内期以控制症状，伯氨喹作用于红外期及配子体以控制复发和传播，乙胺嘧啶作用于原发型红外期以作病因性预防。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 1 组共 4 小题，完整组超出剩余预算，导出空数组 */
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
