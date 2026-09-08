import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第38章 抗骨质疏松药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释题，termItems 为空数组）
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：5 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：3 题（含简答、论述）
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 3、选择题（A1 型 11 + A2 型 4 + B1 型 2 组共 8 小题）
 *   与问答题 7；本文件按 15 道预算取材：填空题全取、A1 型题取第 1–5 题、问答题取
 *   第 1–3 题、B1 型取第 1 组（16～19 题）完整 4 成员；A2 型题（12–15）、B1 第 2 组
 *   （20–23）及问答题第 4–7 题因预算未纳入。正确项对齐章末参考答案键号（A1 型题
 *   1.A/2.E/3.B/4.D/5.C；B1 型题 16.A/17.E/18.D/19.B；本文件答案键号自 1–23
 *   连续编号），选项与共用备选答案已随机重排并同步 correctChoiceIndex。OCR 错字已按
 *   药理学医学语义恢复（如 阿仑勝酸钠→阿仑膦酸钠、葯/约→药、骨矿化物→骨矿化促进药、
 *   Ca*→Ca²⁺、250HD→25(OH)D 等），剂量单位与数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch38-antiosteoporosis-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第38章 抗骨质疏松药 习题（核对PDF 第250–255页）";
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
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "抑制骨吸收药物包括___及___等。",
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
        "双膦酸盐；降钙素",
        "骨吸收抑制药包括双膦酸盐类、雌激素及其受体调节剂（SERM）、降钙素等。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "促进骨形成药物包括___等。",
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
        "甲状旁腺激素；氟化物",
        "骨形成促进药如甲状旁腺激素、前列腺素 E₂、他汀类降脂药以及氟化物等，能促进骨形成、增加骨量。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-fill003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "具有抑制骨吸收和促进骨形成的双重作用的药物是___。",
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
        "雷尼酸锶",
        "雷尼酸锶（雷奈酸锶）可同时作用于成骨细胞和破骨细胞，具有抑制骨吸收和促进骨形成的双重作用。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），5 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于骨吸收抑制药的代表药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "甲状旁腺激素",
      "维生素D",
      "氟化物",
      "阿仑膦酸钠",
      "前列腺素E₂",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阿仑膦酸钠",
        "阿仑膦酸钠为双膦酸盐类骨吸收抑制药，能显著增加骨密度、降低骨折发生率，是目前临床应用最广泛的抗骨质疏松药之一。原书 A1 型题第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列药物属于第三代双膦酸盐类可注射应用的新型抗骨质疏松药的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "帕米膦酸二钠",
      "阿仑膦酸钠",
      "利塞膦酸钠",
      "依替膦酸二钠",
      "伊班膦酸",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "伊班膦酸",
        "伊班膦酸属于第三代双膦酸盐类，可注射应用，是新型抗骨质疏松药；阿仑膦酸钠、利塞膦酸钠为口服制剂，依替膦酸二钠属第一代。原书 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "并不是每一个患者都适合使用甲状旁腺激素，临床上经常使用的情况是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "有骨骼放射治疗史",
      "高钙血症的患者",
      "合并变性骨病",
      "具有发生骨折的多重危险因素的骨质疏松患者",
      "肿瘤骨转移的患者",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "具有发生骨折的多重危险因素的骨质疏松患者",
        "甲状旁腺激素（特立帕肽）为骨形成促进药，适用于具有发生骨折的多重危险因素的骨质疏松患者；高钙血症、肿瘤骨转移、合并变性骨病及有骨骼放射治疗史者不宜使用。原书 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗骨质疏松药物中，属于我国研制的新型合成雌激素的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "双膦酸盐类",
      "尼尔雌醇",
      "降钙素",
      "阿仑膦酸钠",
      "雷洛昔芬",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尼尔雌醇",
        "尼尔雌醇是我国研制的新型长效合成雌激素，主要缓解妇女绝经后骨丢失、减少骨折发生率；雷洛昔芬为选择性雌激素受体调节剂（SERM）。原书 A1 型题第 4 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于抗骨质疏松药物降钙素特点的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可用于高钙血症或高血钙危象",
      "对骨痛有止痛效果",
      "对骨痛无效",
      "用于骨质疏松症",
      "能够有效地降低椎体骨折的危险，但对非椎体的骨折没有确切的疗效",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "对骨痛无效",
        "降钙素能抑制破骨细胞活性、降低血钙，对骨质疏松性骨痛有良好止痛效果，并可用于高钙血症或高血钙危象，故“对骨痛无效”不属于其特点。原书 A1 型题第 5 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "抗骨质疏松的药物主要有哪几类？",
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
        "目前常用于骨质疏松症的药物主要有以下三类：①骨吸收抑制药，如双膦酸盐类、雌激素、降钙素等；②骨形成促进药，如甲状旁腺素、氟化物等；③骨矿化促进药，如钙剂、维生素D等。",
        "抗骨质疏松药按作用机制分骨吸收抑制药、骨形成促进药和骨矿化促进药三类，临床上常以钙剂和维生素D作为基础治疗。原书问答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "降钙素的临床应用是什么？",
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
        "降钙素的临床应用是：①用于其他药物治疗无效的早期和晚期绝经后骨质疏松症以及老年性骨质疏松症；②用于继发于乳腺癌、肺癌、肾癌、骨髓瘤或其他恶性肿瘤骨转移性疼痛；③用于变形性骨炎（Paget骨病）。",
        "降钙素通过抑制破骨细胞活性、抑制肾脏对钙磷重吸收而降低血钙，兼有止痛作用，是骨吸收抑制药之一。原书问答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-short003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "抗骨质疏松药物治疗应持续多久？",
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
        "抗骨质疏松药物所有治疗应至少坚持1年，在最初3～5年治疗期后，应该全面评估患者发生骨质疏松性骨折的风险。",
        "抗骨质疏松治疗强调长期、个体化：疗程应至少 1 年，双膦酸盐治疗 3～5 年后需考虑药物假期，特立帕肽疗程不应超过两年。原书问答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（原书第 1 组，16～19 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch38-antiosteoporosis-drugs-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "利塞膦酸钠",
      "骨化三醇",
      "降钙素",
      "雷洛昔芬",
      "阿法骨化醇",
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
        id: "ext-pharmacology-ch38-antiosteoporosis-drugs-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "双膦酸盐类骨吸收抑制剂的药物是",
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
            "利塞膦酸钠",
            "利塞膦酸钠与阿仑膦酸钠同属双膦酸盐类骨吸收抑制剂，能抑制破骨细胞活性、降低骨吸收。原书 B1 型题第 16 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch38-antiosteoporosis-drugs-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "肝功能低下的患者宜选用的维生素D是",
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
            "骨化三醇",
            "骨化三醇为活性维生素D，不需经肝脏羟化即可直接发挥作用，肝功能低下的患者宜选用；阿法骨化醇仍需在肝内羟化。原书 B1 型题第 17 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch38-antiosteoporosis-drugs-b001m3",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能明显缓解骨痛，对肿瘤骨转移、骨质疏松所致的骨痛作用明显的是",
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
            "降钙素",
            "降钙素对骨痛有良好的止痛效果，对肿瘤骨转移、骨质疏松所致的骨痛作用明显，一般用药时间不宜超过3个月。原书 B1 型题第 18 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch38-antiosteoporosis-drugs-b001m4",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "是选择性雌激素受体调节剂",
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
            "雷洛昔芬",
            "雷洛昔芬为选择性雌激素受体调节剂（SERM），在骨组织发挥雌激素样作用、抑制骨吸收，而对乳腺和子宫内膜的雌激素样作用弱。原书 B1 型题第 19 题，参考答案键号 B。",
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
