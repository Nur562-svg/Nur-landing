import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第34章 性激素类药及避孕药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：3 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 4、选择题（A1 型 9 + A2 型 1 + B1 型
 *   1 组共 2 小题）与简答题 5；本文件按 9 道预算在原书顺序内取材。名词解释全取 1，
 *   填空题取前 2 道，选择题取 A1 型前 3 道（映射为 a1-single），简答题取第 1 道，
 *   B1 型取第 1 组（11～12 题共用备选答案）完整 2 成员；A2 型病例题（第 10 题）与
 *   填空题第 3、4 题及简答题第 2～5 题因预算未纳入。正确项对齐章末参考答案键号
 *   （A1 型题 1.A/2.D/3.A、B1 型题 11.A/12.C），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复（如 葯→药、
 *   雷洛昔酚→雷洛昔芬、氯米酚→氯米芬、双快失碳酯片→双炔失碳酯片、睾丸菱缩→
 *   睾丸萎缩、GnRH/ICSH 等），剂量单位与数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch34-sex-hormone-contraceptives";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第34章 性激素类药及避孕药 习题（核对PDF 第229–234页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：围绝经期综合征",
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
        "又称更年期综合征，是指由于卵巢功能降低、雌激素分泌不足、垂体促性腺激素分泌增多，导致内分泌平衡失调而引起的一系列症状，如面颈红热、失眠、情绪不安等。",
        "围绝经期综合征应用雌激素进行替代治疗，可抑制垂体促性腺激素的分泌，从而减轻症状。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "卵巢成熟滤泡分泌的雌激素是___，它们的代谢产物是___和___。",
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
        "雌二醇；雌酮；雌三醇",
        "雌二醇是卵巢分泌的主要雌激素，雌酮、雌三醇多为代谢产物；天然雌激素口服效价很低，需注射给药。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "雌激素用于前列腺癌的理论依据是___。",
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
        "抑制垂体促性腺激素的分泌，使睾丸萎缩和雄激素分泌减少，同时又能拮抗雄激素的作用，故可用于治疗前列腺癌",
        "大剂量雌激素可明显抑制垂体促性腺激素分泌，使睾丸萎缩、雄激素分泌减少，同时拮抗雄激素作用，从而抑制前列腺癌生长。原书填空题第 2 题答案。",
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
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "雌激素禁用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "绝经后乳腺癌",
      "功能性子宫出血",
      "有出血倾向的子宫肿瘤",
      "青春期痤疮",
      "前列腺癌",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "有出血倾向的子宫肿瘤",
        "雌激素可促进子宫内膜增生，故禁用于有出血倾向的子宫肿瘤；而绝经后晚期乳腺癌、前列腺癌、功能性子宫出血、青春期痤疮均可用雌激素治疗。原书 A1 型题第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "卵巢功能不全和闭经宜选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "甲基睾酮",
      "氯米芬",
      "双醋炔诺酮",
      "黄体酮",
      "己烯雌酚",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "己烯雌酚",
        "己烯雌酚为人工合成雌激素，对卵巢功能不全和闭经患者进行替代治疗，可促进子宫、外生殖器及第二性征的发育；黄体酮为孕激素，甲基睾酮为雄激素，双醋炔诺酮为孕激素类，氯米芬为抗雌激素类促排卵药。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "黄体酮可用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肾上腺皮质功能减退",
      "先兆流产",
      "卵巢功能不全和闭经",
      "绝经期前乳腺癌",
      "骨髓造血功能低下",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "先兆流产",
        "黄体酮为天然孕激素，可抑制子宫收缩、降低子宫肌对缩宫素的敏感性而产生保胎作用，用于先兆流产和习惯性流产。原书 A1 型题第 3 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述雌激素的药理作用及临床应用。",
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
        "（1）药理作用：促进未成年女性第二性征和性器官的发育成熟；维持成年女性性征，参与月经周期的形成；提高子宫平滑肌对缩宫素的敏感性；大剂量时抑制下丘脑 GnRH 的分泌，抗排卵，抑制乳汁分泌及有抗雄激素作用；促进肾小管对钠的再吸收和对抗利尿激素的敏感性，有水钠潴留、增加骨钙沉积等作用。（2）临床应用：围绝经期综合征，抗骨质疏松，乳房胀痛及退乳，卵巢功能不全和闭经，功能性子宫出血，绝经后晚期乳腺癌，前列腺癌，痤疮，避孕，神经保护作用。",
        "雌激素小剂量促进性发育与维持性征，大剂量通过反馈抑制垂体促性腺激素分泌产生抗排卵、退乳及抗雄激素等作用，并有水钠潴留与骨保护效应，临床适应证广泛。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（11～12 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch34-sex-hormone-contraceptives-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "围绝经期综合征",
      "功能性子宫出血",
      "绝经后乳腺癌",
      "前列腺癌",
      "绝经前乳腺癌",
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
        id: "ext-pharmacology-ch34-sex-hormone-contraceptives-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "雌激素禁用于",
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
            "绝经前乳腺癌",
            "雌激素可促进肿瘤生长，故绝经期前乳腺癌患者禁用；绝经后晚期乳腺癌不宜手术者可用大剂量雌激素缓解症状。原书 B1 型题第 11 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch34-sex-hormone-contraceptives-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "雄激素禁用于",
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
            "前列腺癌",
            "雄激素可促进前列腺癌细胞生长，故禁用于前列腺癌；雌激素反而可通过抑制促性腺激素分泌及拮抗雄激素作用用于治疗前列腺癌。原书 B1 型题第 12 题，参考答案键号 C。",
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
