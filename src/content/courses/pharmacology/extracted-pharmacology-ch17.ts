import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第17章 治疗中枢神经系统退行性疾病药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：7 题（须等于本文件预算 7）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 3、选择题（A1 型 8 + A2 型 3 + B1 型 2 组
 *   各 2 小题）与简答题 2、论述题 1；本文件按 7 道预算在原书顺序内取材。名词解释全取 1，
 *   填空题取前 2 道，选择题取 A1 型第 1 道（映射为 a1-single），问答题取简答题第 1 道，
 *   B1 型取第 1 组（12～13 题共用备选答案）完整 2 成员。正确项对齐章末参考答案键号
 *   （A1 型题 1.B、B1 型题 12.B/13.E），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 盼噻嗪类→吩噻嗪类、
 *   澳隐亭→溴隐亭、左旋多已→左旋多巴、利修来得 等），数值（4:1 剂量配比）保留原值，
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch17-cns-degenerative-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第17章 治疗中枢神经系统退行性疾病药 习题（核对PDF 第103–108页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch17-cns-degenerative-drugs-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：开-关反应",
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
        "长期服用左旋多巴而产生的一种不良反应，表现为“开”时患者活动正常或接近正常，而“关”时突然出现严重的帕金森病（PD）症状，如此反复波动。",
        "“开-关反应”是长期服用左旋多巴后出现的症状波动不良反应，是左旋多巴长期治疗中典型的问题之一；司来吉兰与左旋多巴合用能消除长期单独使用左旋多巴出现的“开-关反应”。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch17-cns-degenerative-drugs-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "左旋多巴主要用于___，但对___所引起的帕金森综合征无效。",
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
        "帕金森病；吩噻嗪类抗精神病药",
        "左旋多巴为多巴胺前体药，通过血脑屏障后补充纹状体中多巴胺的不足，可治疗各种类型的帕金森病，但对吩噻嗪类等抗精神病药引起的帕金森综合征无效（该综合征系阻断 DA 受体所致）。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch17-cns-degenerative-drugs-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "溴隐亭服用大剂量时，对___受体有较强的激动作用，故可用于治疗___。",
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
        "黑质-纹状体的DA；帕金森病",
        "溴隐亭为 DA 受体激动药，大剂量时对黑质-纹状体通路的 DA 受体有较强激动作用，与左旋多巴合用治疗帕金森病可减少症状波动和“开-关反应”，不良反应与左旋多巴相似。原书填空题第 2 题答案。",
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
    id: "ext-pharmacology-ch17-cns-degenerative-drugs-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "单用时无抗帕金森病作用的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["溴隐亭", "左旋多巴", "苯海索", "卡比多巴", "苯扎托品"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "卡比多巴",
        "卡比多巴为外周氨基酸脱羧酶（AADC）抑制药，本身无抗帕金森病作用，单用无效；须与左旋多巴按 1:4 合用（复方制剂称心宁美），抑制左旋多巴在外周的脱羧，增加进入中枢的左旋多巴并减少外周不良反应。原书 A1 型题第 1 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch17-cns-degenerative-drugs-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "列举四个治疗阿尔茨海默病的胆碱酯酶抑制药。",
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
        "多奈哌齐、加兰他敏、利凡斯的明、石杉碱甲",
        "治疗阿尔茨海默病的胆碱酯酶抑制药包括第二代可逆性 AChE 抑制药多奈哌齐（对中枢 AChE 选择性高、外周不良反应少）、利凡斯的明、加兰他敏（疗效与他克林相当但无肝毒性）以及强效可逆性胆碱酯酶抑制药石杉碱甲；第一代他克林因严重肝毒性已撤市。原书简答题第 1 题。",
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
    id: "ext-pharmacology-ch17-cns-degenerative-drugs-b001",
    order: 6,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "激动GABA受体",
      "提高脑内DA浓度",
      "使DA降解减少",
      "激动DA受体",
      "中枢抗胆碱作用",
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
        id: "ext-pharmacology-ch17-cns-degenerative-drugs-b001m1",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "溴隐亭能治疗帕金森病是由于",
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
            "激动DA受体",
            "溴隐亭属 DA 受体激动药，通过激动黑质-纹状体通路的 DA 受体发挥抗帕金森病作用。原书 B1 型题第 12 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch17-cns-degenerative-drugs-b001m2",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "司来吉兰能治疗帕金森病是由于",
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
            "使DA降解减少",
            "司来吉兰为 MAO-B 抑制药，低剂量即可选择性、不可逆性抑制中枢神经系统 MAO-B，使黑质-纹状体内 DA 降解减少、浓度增加；该药又是抗氧化剂，抑制超氧阴离子和羟自由基的生成。原书 B1 型题第 13 题，参考答案键号 E。",
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
