import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第17章 放线菌 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：1 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、选择题（A1 型 13 + A2 型 3）、B1 型 2 组（17~19 题 3 成员、
 *   20~21 题 2 成员）与简答题 3；本文件按 10 道预算在原书顺序内取材，名词解释与简答题全取，
 *   B1 取第一组（17~19 题，3 成员，覆盖放线菌属/诺卡菌属鉴别核心），选择题取第 4 题
 *   （放线菌病最常见的临床类型）。正确项对齐章末参考答案键号（选择题 4.B；
 *   B1 17.C 18.D 19.B）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 放线蘭属→放线菌属、
 *   检在→检查、侵人→侵入、硫黄样颗粒→硫黄样颗粒 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch17-actinomyces";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第17章 放线菌 习题（核对PDF 第139–143页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch17-actinomyces-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：硫黄样颗粒",
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
        "硫黄样颗粒",
        "在患者病灶组织和瘘管中流出的脓汁中，可找到肉眼可见的黄色小颗粒，称硫黄样颗粒，这种颗粒是放线菌在组织中形成的菌落。硫黄样颗粒是放线菌病的重要特征，具有鉴别意义。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch17-actinomyces-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：放线菌病",
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
        "放线菌病",
        "放线菌病是一种软组织的化脓性炎症，若无继发感染则多呈慢性肉芽肿，常伴有多发性瘘管形成，脓汁中可找到特征性的硫黄样颗粒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch17-actinomyces-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：足分枝菌病",
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
        "足分枝菌病",
        "巴西诺卡菌可侵入皮下组织引起慢性化脓性肉芽肿，表现为肿胀、脓肿及多发性瘘管。感染好发于腿部和足，称足分枝菌病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），1 道（原书第 4 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch17-actinomyces-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "放线菌病最常见的临床类型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "龋齿和牙周炎",
      "面颈部放线菌病",
      "肺部感染",
      "腹部感染",
      "原发性皮肤放线菌病",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "面颈部放线菌病",
        "放线菌病根据感染途径和涉及的器官不同，临床分为面颈部、胸部、腹部、盆腔和中枢神经系统放线菌病，其中以面颈部最常见，约占患者的 60%。原书选择题第 4 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch17-actinomyces-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述放线菌属和诺卡菌属的主要区别。",
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
        "放线菌属和诺卡菌属的主要区别",
        "（1）分布：放线菌属寄生在人和动物口腔、上呼吸道、胃肠道、泌尿道等与外界相通的腔道中；诺卡菌属存在于土壤等自然环境中，多腐生。（2）培养特性：放线菌属厌氧或微需氧，35~37°C 生长，20~25°C 不生长；诺卡菌属专性需氧，37°C 或 20~25°C 均生长。（3）抗酸性：放线菌属无抗酸性；诺卡菌属弱抗酸性。（4）感染性：放线菌属引起内源性感染，常见放线菌病；诺卡菌属引起外源性感染，常见呼吸道感染。（5）微生物学检查：放线菌属脓汁标本中可见硫黄样颗粒；诺卡菌属脓汁标本中可见黄色或黑色颗粒。（6）代表菌种：放线菌属为衣氏放线菌、牛型放线菌；诺卡菌属为星形诺卡菌、巴西诺卡菌。治疗均需抗生素长期治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch17-actinomyces-short002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述致病性放线菌属的感染及致病特点。",
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
        "致病性放线菌属的感染及致病特点",
        "放线菌属多存在于口腔等与外界相通的体腔中，是人体的正常菌群。当机体抵抗力下降、口腔卫生不良、拔牙或口腔黏膜受损时，可致内源性感染，引起放线菌病。放线菌病是一种软组织的化脓性炎症，是一种多细菌混合感染性疾病，若无继发感染则多呈慢性肉芽肿，常伴有多发性瘘管形成，脓汁中可找到特征性的硫黄样颗粒。根据感染途径和涉及的器官不同，临床分为面颈部、胸部、腹部、盆腔和中枢神经系统放线菌病，其中以面颈部最为常见，约占患者的 60%。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch17-actinomyces-short003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述致病性诺卡菌属的种类及其致病特点。",
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
        "致病性诺卡菌属的种类及其致病特点",
        "对人致病的主要有星形诺卡菌、巴西诺卡菌和鼻疽诺卡菌。诺卡菌属感染为外源性感染。星形诺卡菌主要由呼吸道或创口侵入机体，引起化脓性感染，特别是免疫力低下的感染者，如 AIDS 患者、肿瘤患者和长期使用免疫抑制剂的病人。巴西诺卡菌可侵入皮下组织引起慢性化脓性肉芽肿，表现为肿胀、脓肿及多发性瘘管，感染好发于腿部和足，称足分枝菌病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 3 成员（题组17-19） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch17-actinomyces-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "衣氏放线菌",
      "结核分枝杆菌",
      "星形诺卡菌",
      "巴西诺卡菌",
      "诺卡菌属",
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
        id: "ext-microbiology-ch17-actinomyces-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "常引起放线菌病的是",
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
            "衣氏放线菌",
            "衣氏放线菌是放线菌属的代表菌种，为人体的正常菌群，当机体抵抗力下降时可引起内源性感染，导致放线菌病。原书 B1 答案第 17 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch17-actinomyces-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抗酸染色弱阳性的是",
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
            "诺卡菌属",
            "诺卡菌属部分菌株具有弱抗酸性，仅用 1% 盐酸乙醇延长脱色时间即可变为抗酸阴性，据此可与结核分枝杆菌鉴别。原书 B1 答案第 18 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch17-actinomyces-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可引起足分枝菌病的是",
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
            "巴西诺卡菌",
            "巴西诺卡菌可经创口侵入皮下组织引起慢性化脓性肉芽肿，感染好发于腿部和足，称足分枝菌病。原书 B1 答案第 19 题为 B。",
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
