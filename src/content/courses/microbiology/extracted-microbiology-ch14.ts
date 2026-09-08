import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第14章 嗜血杆菌属 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：1 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：0 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：6 题（须等于本文件预算 6）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、选择题（A1 型 8 + A2 型 2）、B1 型 1 组（4 成员）
 *   与简答题 1；本文件按 6 道预算在原书顺序内取材，名词解释与简答题全取，B1 取唯一一组
 *   （11~14 题，4 成员），预算内未纳入选择题。正确项对齐章末参考答案键号（B1 11.D 12.E 13.A 14.E；
 *   本章答案键号按内容对齐，A1 段 1.C 2.C 3.E 4.B 5.C 6.D、A2 段 7.B 8.A 9.D 与源题号对应）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如 啫血杆菌→嗜血杆菌、英膜→荚膜、
 *   17×10°L→17×10⁹/L 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch14-haemophilus";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第14章 嗜血杆菌属 习题（核对PDF 第114–116页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch14-haemophilus-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：卫星现象",
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
        "卫星现象",
        "流感嗜血杆菌生长时需要 X 因子和 V 因子，将其与金黄色葡萄球菌共同培养于血平板时，金黄色葡萄球菌能合成较多的 V 因子，并弥散到培养基里，可促进流感嗜血杆菌生长。因此，在金黄色葡萄球菌菌落周围的流感嗜血杆菌菌落较大，离金黄色葡萄球菌菌落越远的菌落越小，此现象称为“卫星现象”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），本章预算内未纳入 —— 置空 */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch14-haemophilus-short001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述流感嗜血杆菌的感染类型。",
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
        "流感嗜血杆菌的感染类型",
        "流感嗜血杆菌感染有两种感染类型，即原发感染和继发感染。（1）原发感染为外源性感染，多为有荚膜 b 型菌株引起的急性化脓性感染，如化脓性脑膜炎、鼻咽炎、肺炎、咽喉会厌炎、化脓性关节炎、心包炎等，以小儿多见。（2）继发感染为内源性感染，多由呼吸道寄居的无荚膜菌株引起，常继发于流感、麻疹、百日咳、结核病等，临床表现有慢性支气管炎、鼻窦炎、中耳炎等，以成人多见。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 4 成员（题组11-14） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch14-haemophilus-b001",
    order: 3,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "流感嗜血杆菌",
      "结核分枝杆菌",
      "脑膜炎奈瑟菌",
      "布鲁菌",
      "白喉棒状杆菌",
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
        id: "ext-microbiology-ch14-haemophilus-b001m1",
        order: 3,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "常见的继发于流感之后引起鼻窦炎的细菌是",
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
            "流感嗜血杆菌",
            "无荚膜流感嗜血杆菌菌株常继发于流感、麻疹、百日咳等引起鼻窦炎、中耳炎等继发感染。原书 B1 答案第 11 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch14-haemophilus-b001m2",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "引起患儿喉部出现灰白色假膜的细菌是",
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
            "白喉棒状杆菌",
            "白喉棒状杆菌引起白喉，在咽喉部形成灰白色假膜。原书 B1 答案第 12 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch14-haemophilus-b001m3",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抗酸染色阳性的细菌是",
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
            "结核分枝杆菌",
            "结核分枝杆菌细胞壁含大量脂质，抗酸染色阳性。原书 B1 答案第 13 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch14-haemophilus-b001m4",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Neisser 染色后出现异染颗粒的细菌是",
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
            "白喉棒状杆菌",
            "白喉棒状杆菌用 Neisser 或 Albert 染色后可见着色较深的异染颗粒，具有鉴定意义。原书 B1 答案第 14 题为 E。",
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
