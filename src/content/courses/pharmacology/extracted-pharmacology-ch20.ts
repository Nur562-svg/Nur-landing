import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第20章 解热镇痛抗炎药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：3 题（含简答、论述）
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：14 题（须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：1（填空题第 3 题：参考答案第四类内容 OCR 残缺，未取）
 * - 说明：本章原书依序含名词解释 2、填空题 6、选择题（A1 型 18 + A2 型 3 + B1 型 1 组共 5 小题）
 *   与简答题 3；本文件按 14 道预算在原书顺序内取材：名词解释全取、填空题取第 1、2、4 题
 *   （第 3 题参考答案残缺，按无法可靠提取记录）、A1 型题取第 1 题、简答题全取、B1 取完整组
 *   （22–26 题）。A1/A2/B1 按项目规约映射为 a1-single/b1，正确项对齐章末参考答案键号
 *   （A1 型题 1.C；B1 型题 22.A、23.C、24.B、25.E、26.D），选项已随机重排并同步
 *   correctChoiceIndex。参考答案中 A2 型题第 21 题键号 21.E 散落于 B1 区，已按题号与药理学
 *   医学语义归位（本文件未取 A2 题）。OCR 错字与符号已按药理学医学语义恢复
 *   （如 葯→药、尊麻疹→荨麻疹、对乙酷氨基酚→对乙酰氨基酚、双氯酚酸→双氯芬酸、
 *   明哚美辛→吲哚美辛、血栓素 Az→血栓素 A2、力转复酶→转氨酶 等），数值
 *   （5g/d、50～100mg、10～40倍 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch20-antipyretic-analgesics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第20章 解热镇痛抗炎药 习题（核对PDF 第125–131页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：水杨酸反应",
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
        "水杨酸反应",
        "阿司匹林剂量过大（5g/d）时，可出现头痛、眩晕、恶心、呕吐、耳鸣、视力和听力减退，总称为水杨酸反应，是水杨酸类中毒的表现。严重者可出现过度呼吸、高热、脱水、酸碱平衡失调，甚至精神错乱；严重中毒者应立即停药，静脉滴注碳酸氢钠溶液以碱化尿液，加速水杨酸盐自尿中排泄。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：瑞夷综合征",
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
        "瑞夷综合征",
        "在儿童感染病毒性疾病（如流感、水痘、麻疹、流行性腮腺炎）使用阿司匹林退热时，偶可引起急性肝脂肪变性-脑病综合征，称为瑞夷综合征，以肝衰竭合并脑病为突出表现，虽少见但预后恶劣。病毒感染患儿不宜用阿司匹林退热，可用对乙酰氨基酚代替。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道（第 3 题答案 OCR 残缺未取） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "解热镇痛抗炎药物有共同的作用是___、___和___。",
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
        "抗炎作用；镇痛作用；解热作用",
        "解热镇痛抗炎药（NSAIDs）的共同作用是抗炎、镇痛、解热，共同作用机制为抑制环氧酶（COX，前列腺素合成酶）、减少前列腺素（PG）的合成。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "常用解热抗炎镇痛药根据其对 COX 作用的选择性，可分为___和___。",
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
        "非选择性COX抑制药；选择性COX-2抑制药",
        "非选择性环氧酶抑制药如阿司匹林、布洛芬等同时抑制 COX-1 与 COX-2；选择性环氧酶-2 抑制药如塞来昔布、尼美舒利，胃肠道不良反应相对较低。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "在常用的解热抗炎镇痛药中，___类几乎无抗炎作用。",
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
        "对乙酰氨基酚",
        "对乙酰氨基酚属苯胺类解热镇痛药，解热镇痛作用与阿司匹林相当，但抗炎作用极弱、几乎无抗炎作用。原书填空题第 4 题答案。",
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
    id: "ext-pharmacology-ch20-antipyretic-analgesics-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "解热镇痛抗炎药物的共同作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制血栓素的合成",
      "抑制前列腺素的合成",
      "抑制细胞间黏附因子的合成",
      "抑制白介素的合成",
      "抑制肿瘤坏死因子的合成",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抑制前列腺素的合成",
        "解热镇痛抗炎药（NSAIDs）的共同作用机制是抑制环氧酶（COX，即前列腺素合成酶），从而抑制前列腺素（PG）的合成，由此产生解热、镇痛、抗炎作用。原书 A1 型题第 1 题，参考答案键号 C。",
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
    id: "ext-pharmacology-ch20-antipyretic-analgesics-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述解热镇痛抗炎药物的药理作用有哪些？",
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
        "抗炎作用、镇痛作用、解热作用及其他作用（抑制血小板聚集、抑制肿瘤等）",
        "解热镇痛抗炎药物的药理作用包括：①抗炎作用：抑制体内环氧酶（COX）的生物合成、抑制 PG 合成；②镇痛作用：对炎症和组织损伤引起的慢性钝痛（关节炎、黏液囊炎、牙痛、痛经、癌症骨转移痛等）效果好，机制为抑制 PGs 合成使局部痛觉感受器对缓激肽等致痛物质的敏感性降低，对尖锐的一过性刺痛无效；部分 NSAIDs 可在中枢神经系统（主要作用于脊髓）产生镇痛作用；③解热作用：促使升高的体温恢复到正常水平，对正常体温无明显影响，主要通过抑制下丘脑 PG 的生成发挥解热作用；④其他：通过抑制环氧化酶对血小板聚集有强大的不可逆抑制作用，对肿瘤的发生、发展及转移可能均有抑制作用，尚有预防和延缓阿尔茨海默病发病、延缓角膜老化等作用。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述阿司匹林的药理作用及临床应用。",
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
        "解热镇痛及抗风湿；小剂量影响血小板功能（抗血栓）；儿科用于川崎病",
        "阿司匹林的药理作用及临床应用：①解热镇痛及抗风湿：有较强的解热、镇痛作用，用于头痛、牙痛、肌肉痛、痛经及感冒发热等，能减轻炎症引起的红、肿、热、痛等症状，迅速缓解风湿性关节炎的症状（抗风湿最好用至最大耐受剂量）；②影响血小板的功能：小剂量（50～100mg）阿司匹林使 PG 合成酶（COX）活性中心的丝氨酸乙酰化失活，不可逆地抑制血小板环氧酶，减少血小板中血栓素 A2（TXA2）的生成，从而抑制血小板聚集、抗血栓形成，临床用于缺血性心脏病、脑缺血病、房颤、人工心脏瓣膜、动静脉瘘或其他手术后的血栓形成；高浓度阿司匹林直接抑制血管壁中 PG 合成酶，减少前列环素（PGI2）合成（PGI2 是 TXA2 的生理对抗剂）；③儿科用于皮肤黏膜淋巴结综合征（川崎病）的治疗。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-short003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述“阿司匹林哮喘”的发病机制及急救用药。",
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
        "发病机制：抑制 PG 生物合成，使白三烯等脂氧酶代谢产物增多，内源性支气管收缩物质占优势致支气管痉挛；急救用药：抗组胺药和糖皮质激素（肾上腺素无效）",
        "某些哮喘患者服用阿司匹林或其他解热镇痛药后可诱发哮喘，称为“阿司匹林哮喘”。它不是以抗原-抗体反应为基础的过敏反应，而是与抑制 PG 生物合成有关：PG 合成受阻后，由花生四烯酸生成的白三烯以及其他脂氧酶代谢产物增多，内源性支气管收缩物质居于优势，导致支气管痉挛，诱发哮喘。肾上腺素治疗“阿司匹林哮喘”无效，可用抗组胺药和糖皮质激素治疗。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员（原书 22～26 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch20-antipyretic-analgesics-b001",
    order: 10,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "布洛芬",
      "保泰松",
      "阿司匹林",
      "对乙酰氨基酚",
      "塞来昔布",
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
        id: "ext-pharmacology-ch20-antipyretic-analgesics-b001m1",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在小剂量时有抑制血栓形成作用的药物是",
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
            "阿司匹林",
            "小剂量阿司匹林不可逆地抑制血小板环氧酶，减少血栓素 A2（TXA2）生成，抑制血小板聚集，防止血栓形成。原书 B1 型题第 22 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch20-antipyretic-analgesics-b001m2",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能选择性抑制 COX-2 的药物是",
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
            "塞来昔布",
            "塞来昔布是选择性 COX-2 抑制药，用于风湿性、类风湿性关节炎和骨关节炎的治疗，胃肠道不良反应较非选择性 NSAIDs 低，但有血栓形成倾向者需慎用。原书 B1 型题第 23 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch20-antipyretic-analgesics-b001m3",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要用于解热镇痛、无抗炎作用的药物是",
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
            "对乙酰氨基酚",
            "对乙酰氨基酚解热镇痛作用与阿司匹林相当，但抗炎作用极弱，几乎无抗炎作用，主要用于解热和镇痛。原书 B1 型题第 24 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch20-antipyretic-analgesics-b001m4",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抗炎抗风湿作用强、解热镇痛作用较弱的药物是",
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
            "保泰松",
            "保泰松属吡唑酮类，抗炎抗风湿作用强，解热镇痛作用较弱。原书 B1 型题第 25 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch20-antipyretic-analgesics-b001m5",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "广泛用于解热镇痛和抗炎抗风湿、无水杨酸反应的药物是",
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
            "布洛芬",
            "布洛芬属芳基丙酸类非选择性 COX 抑制药，有明显的抗炎、解热、镇痛作用，广泛用于解热镇痛和抗炎抗风湿，不引起水杨酸反应；胃肠道反应是最常见的不良反应。原书 B1 型题第 26 题，参考答案键号 D。",
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
