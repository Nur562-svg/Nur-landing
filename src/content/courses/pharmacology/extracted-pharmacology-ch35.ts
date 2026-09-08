import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第35章 肾上腺皮质激素类药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：4 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：3 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：12 题（须等于本文件预算 12）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、填空题 5、选择题（A1 型 7 + A2 型 10 + B1 型
 *   3 组共 10 小题）与简答题 2；本文件按 12 道预算取材。名词解释全取 4，填空题取
 *   前 2 道，选择题取 A1 型前 3 道（映射为 a1-single），简答题取第 1 道，B1 型取
 *   第 2 组（21～22 题共用备选答案，中效/长效糖皮质激素）完整 2 成员；A2 型病例题
 *   （8～17）与 B1 第 1 组（18～20，3 成员）、第 3 组（23～27，5 成员）及填空题
 *   第 3～5 题因预算未纳入。正确项对齐章末参考答案键号（A1 型题 1.D/2.A/3.B、
 *   B1 型题 21.E/22.B），选项与共用备选答案已随机重排并同步 correctChoiceIndex。
 *   OCR 错字与符号已按药理学医学语义恢复（如 葯→药、留体→甾体、没尼松→泼尼松、
 *   地寨米松→地塞米松、非体抗炎药→非甾体抗炎药、GCs 等），剂量单位与数值
 *   （60mg、10×10⁹ 等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch35-adrenocortical-hormones";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第35章 肾上腺皮质激素类药物 习题（核对PDF 第235–239页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：医源性肾上腺皮质功能不全",
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
        "长期应用糖皮质激素（尤其是连日给药）的病人，减量过快或突然停药，特别是在遇到感染、创伤、手术等严重应激情况时，引起的肾上腺皮质功能不全或危象，表现为恶心、呕吐、乏力、低血压和休克等，需及时抢救。",
        "医源性肾上腺皮质功能不全系长期大剂量使用糖皮质激素反馈性抑制垂体-肾上腺皮质轴、致肾上腺皮质萎缩所致，故停药时应缓慢减量。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：反跳现象",
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
        "长期用药，因减药剂量过快或突然停药，所引起的原发病复发或症状加重的现象。",
        "反跳现象是长期应用糖皮质激素后突然停药或减量过快导致的病情反复，应缓慢减量、逐步停药予以避免。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：允许作用",
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
        "糖皮质激素对有些组织细胞无直接效应，但可对其他激素发挥作用创造有利条件，称允许作用。",
        "允许作用是小剂量（生理水平）糖皮质激素的特征之一，糖皮质激素可借此增强儿茶酚胺等其他激素的作用。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：糖皮质激素抵抗",
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
        "大剂量糖皮质激素治疗疗效很差或无效称为糖皮质激素抵抗。",
        "糖皮质激素抵抗时对患者盲目加大剂量和延长疗程不但无效，而且会引起严重后果。原书名词解释第 4 题。",
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
    id: "ext-pharmacology-ch35-adrenocortical-hormones-fill001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "肾上腺皮质激素是肾上腺皮质所分泌的激素的总称，主要包括___、___和___。",
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
        "盐皮质激素；糖皮质激素；性激素类",
        "肾上腺皮质激素属甾体类化合物，主要包括盐皮质激素、糖皮质激素和性激素类，其分泌受促肾上腺皮质激素（ACTH）调节，呈昼夜节律性；临床常用的是糖皮质激素。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-fill002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "超生理剂量（药理剂量）时，除影响物质代谢，糖皮质激素还具有___、___和___等多种药理作用。",
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
        "抗炎；抗过敏；退热",
        "超生理剂量（药理剂量）时糖皮质激素产生快速、强大而非特异性的抗炎作用，能缓解过敏性疾病症状，并有良好退热作用，还可发挥抗休克作用。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），3 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "水钠潴留作用最弱的糖皮质激素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "氢化可的松",
      "地塞米松",
      "泼尼松",
      "甲泼尼松龙",
      "泼尼松龙",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "地塞米松",
        "地塞米松为长效糖皮质激素，抗炎作用强而水钠潴留等盐皮质激素样作用最弱；氢化可的松、可的松等短效制剂水钠潴留作用较强。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "糖皮质激素对血液系统的影响是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血小板的数量减少",
      "红细胞数和 Hb 均减少",
      "中性粒细胞的数量增加",
      "红细胞的数量减少",
      "中性粒细胞的数量减少",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中性粒细胞的数量增加",
        "糖皮质激素能刺激骨髓造血机能，使红细胞、血红蛋白和血小板数量增加，并促使中性粒细胞从骨髓释放增多、外周血中性粒细胞数量增加，同时使淋巴细胞和嗜酸性粒细胞减少。原书 A1 型题第 2 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "糖皮质激素隔日疗法的给药时间最好在",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中午 12 点",
      "晚上 8 点",
      "下午 5 点",
      "上午 8 点",
      "早上 5 点",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上午 8 点",
        "糖皮质激素分泌呈昼夜节律性，清晨 8 点左右为分泌高峰。隔日疗法在隔日清晨（上午 8 点左右）一次给药，可减轻对垂体-肾上腺皮质轴的反馈性抑制，减少肾上腺皮质功能不全等不良反应。原书 A1 型题第 3 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch35-adrenocortical-hormones-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述肾上腺糖皮质激素的药理作用。",
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
        "超生理剂量（药理剂量）时，糖皮质激素与靶细胞胞浆内糖皮质激素受体结合，影响参与炎症的某些基因的转录，产生快速、强大而非特异性的抗炎作用，对各种炎症均有效；小剂量糖皮质激素主要抑制细胞免疫，加大剂量抑制体液免疫功能；能减少过敏介质的产生，缓解过敏性疾病的症状；能提高机体对内毒素的耐受力、扩张血管、稳定溶酶体膜等而发挥抗休克作用；可直接抑制体温调节中枢、减少内热原的释放，而有良好退热作用。此外，糖皮质激素能刺激骨髓造血机能、兴奋中枢神经系统，对骨骼、心血管系统等均产生影响。",
        "糖皮质激素在生理剂量主要影响物质代谢（通过允许作用增强其他激素作用），超生理剂量则产生抗炎、抗免疫、抗过敏、抗休克及退热等广泛药理效应，是本章掌握要点。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书第 2 组，21～22 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch35-adrenocortical-hormones-b001",
    order: 11,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "氢化可的松",
      "地塞米松",
      "氟氢可的松",
      "甲泼尼松龙",
      "可的松",
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
        id: "ext-pharmacology-ch35-adrenocortical-hormones-b001m1",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "中效糖皮质激素是",
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
            "甲泼尼松龙",
            "糖皮质激素按作用维持时间分类：短效为可的松、氢化可的松；中效为泼尼松、泼尼松龙、甲泼尼松龙、曲安西龙等；长效为地塞米松、倍他米松等。原书 B1 型题第 21 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch35-adrenocortical-hormones-b001m2",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "长效糖皮质激素是",
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
            "地塞米松",
            "地塞米松为长效糖皮质激素，抗炎作用强、作用维持时间长，且水钠潴留等盐皮质激素样作用弱；氟氢可的松主要作外用，盐皮质激素样作用强。原书 B1 型题第 22 题，参考答案键号 B。",
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
