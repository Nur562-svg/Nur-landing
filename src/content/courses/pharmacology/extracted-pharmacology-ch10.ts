import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第10章 肾上腺素受体激动药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：10 题（含 A1 型 8 题、A2 型病例题 2 题）
 * - 问答题（short-answer）：4 题（含简答、论述）
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：22 题（须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 13、选择题（A1 型 26 + A2 型 7 + B1 型 3 组
 *   共 13 小题）与简答（论述）12；本文件按 22 道预算在原书顺序内取材。名词解释全取 1，
 *   填空题取前 4 道，选择题按源题量占比取 A1 型前 8 道与 A2 型前 2 道（映射为 a1-single），
 *   问答题取前 4 道，B1 型取第 1 组（34～36 题）完整 3 成员。正确项对齐章末参考答案键号
 *   （A1 型题 1.C/2.A/3.D/4.B/5.B/6.E/7.C/8.A、A2 型题 27.B/28.E、B1 型题 34.A/35.B/36.E），
 *   选项与共用备选答案已随机重排并同步 correctChoiceIndex。参考答案区 A1 键号 21～26 被
 *   OCR 误排入 A2 区、A2 键号 29～33 被误排入 B1 区，已按题号与药理语义复位。OCR 错字与
 *   符号已按药理学医学语义恢复（如 α1/β1/β2/DA 受体亚型、25ml 尿量、酚苄明、利血平、
 *   肾排泄、异丙肾上腺素等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch10-adrenoceptor-agonists";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第10章 肾上腺素受体激动药 习题（核对PDF 第61–69页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：快速耐受性",
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
        "快速耐受性",
        "短期内连续给药后作用逐渐减弱的现象，称快速耐受性（tachyphylaxis），也称脱敏。如麻黄碱短期内反复应用，其升压作用逐渐减弱，即由受体逐渐饱和与递质逐渐耗损所致。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "去甲肾上腺素激动血管的α1受体，主要使小动脉和小静脉收缩，其中___收缩最明显，其次是___。",
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
        "皮肤黏膜血管；肾脏血管",
        "去甲肾上腺素主要激动血管的 α1 受体，使小动脉和小静脉收缩，其中皮肤黏膜血管收缩最明显，其次为肾脏血管，冠状血管则舒张。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "在整体情况下，去甲肾上腺素可因血压升高而使心率___，心排出量___。",
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
        "反射性减慢；不变或减少",
        "去甲肾上腺素虽可激动心脏 β1 受体，但在整体情况下，血压急剧升高可通过压力感受器反射性减慢心率，故心排出量不变或反而下降。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-fill003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "氯丙嗪中毒时引起的低血压，应选用___，而不宜选用___。",
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
        "去甲肾上腺素；肾上腺素",
        "氯丙嗪可阻断 α 受体，若此时用肾上腺素，其缩血管的 α 效应被阻断而 β 效应占优，可使血压进一步下降（升压效应翻转），故不宜选用；应选用主要激动 α 受体升压的去甲肾上腺素。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-fill004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "应用去甲肾上腺素期间，尿量应保持在每小时___以上。",
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
        "25ml",
        "去甲肾上腺素可使肾血管显著收缩、肾血流减少，为防止急性肾衰竭，用药期间应监测尿量，保持每小时 25ml 以上。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），10 道（A1 型 8 道 + A2 型病例题 2 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "青霉素引起过敏性休克时，首选的抢救药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "去甲肾上腺素",
      "多巴胺",
      "间羟胺",
      "肾上腺素",
      "葡萄糖酸钙",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾上腺素",
        "过敏性休克表现为小血管扩张、毛细血管通透性增高、血压下降及支气管平滑肌痉挛等，肾上腺素能收缩血管、兴奋心脏、舒张支气管并抑制过敏介质释放，是抢救过敏性休克的首选药。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "急性肾衰竭时，可与利尿剂配伍以增加尿量的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "去甲肾上腺素",
      "异丙肾上腺素",
      "多巴胺",
      "肾上腺素",
      "麻黄碱",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多巴胺",
        "低浓度多巴胺激动肾血管的 DA 受体，使肾血管舒张、肾血流和肾小球滤过率增加，与利尿药配伍可用于治疗急性肾衰竭。原书 A1 型题第 2 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能增强心肌收缩力并明显舒张肾血管的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "甲氧明",
      "多巴胺",
      "去甲肾上腺素",
      "肾上腺素",
      "麻黄碱",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多巴胺",
        "多巴胺激动心脏 β1 受体使心肌收缩力增强、心排出量增加；低浓度时激动肾血管 DA 受体使肾血管扩张、肾血流增加，故兼具正性肌力与舒张肾血管作用。原书 A1 型题第 3 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "氯丙嗪过量引起血压下降时，应选用的升压药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "阿托品",
      "异丙肾上腺素",
      "去甲肾上腺素",
      "肾上腺素",
      "多巴胺",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "去甲肾上腺素",
        "氯丙嗪阻断 α 受体，此时若用肾上腺素，其 α 缩血管效应被阻断、β 效应占优，会出现升压效应翻转使血压进一步下降；去甲肾上腺素主要激动 α 受体，升压作用可靠，故应选用。原书 A1 型题第 4 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能引起肾上腺素升压效应翻转的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "利血平",
      "甲氧明",
      "阿托品",
      "酚苄明",
      "美卡拉明",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酚苄明",
        "酚苄明为长效（非竞争性）α 受体阻断药，可阻断肾上腺素的缩血管 α 效应，使其升压作用翻转为降压（β2 舒血管效应占优势）。原书 A1 型题第 5 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "反复使用麻黄碱时药理作用逐渐减弱的原因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肾排泄增加",
      "受体逐渐饱和与递质逐渐耗损",
      "肝药酶诱导作用",
      "机体产生依赖性",
      "受体敏感性降低",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "受体逐渐饱和与递质逐渐耗损",
        "麻黄碱除直接激动受体外，还可促进去甲肾上腺素能神经末梢释放递质；短期内反复应用时，受体逐渐饱和、囊泡内递质逐渐耗损，故作用逐渐减弱，产生快速耐受性。原书 A1 型题第 6 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与肾上腺素相比，异丙肾上腺素不具备的作用是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "松弛支气管平滑肌",
      "激动β1受体",
      "收缩支气管黏膜血管",
      "激动β受体",
      "抑制肥大细胞释放过敏性物质",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "收缩支气管黏膜血管",
        "异丙肾上腺素主要激动 β1、β2 受体，对 α 受体几乎无作用，故不能收缩支气管黏膜血管；肾上腺素兼具 α、β 受体激动作用，可收缩支气管黏膜血管、减轻黏膜水肿。原书 A1 型题第 7 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "为延长局麻药的作用时间并减少不良反应，可配伍应用的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "异丙肾上腺素",
      "麻黄碱",
      "去甲肾上腺素",
      "肾上腺素",
      "多巴胺",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾上腺素",
        "局麻药中加入少量肾上腺素可收缩局部血管、延缓局麻药吸收，从而延长麻醉时间并减少吸收中毒等不良反应。原书 A1 型题第 8 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "病人，男，45岁，因扁桃体脓肿给予青霉素静滴，15min后突然呼吸困难、口唇发绀，血压66mmHg/40mmHg，诊断为过敏性休克，首选的抢救药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "麻黄碱",
      "多巴胺",
      "间羟胺",
      "肾上腺素",
      "去甲肾上腺素",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾上腺素",
        "青霉素过敏性休克病情凶险，可迅速死于呼吸和循环衰竭。肾上腺素能收缩小动脉和毛细血管前括约肌、降低毛细血管通透性、兴奋心脏、舒张支气管并减少过敏介质释放，是首选的抢救药物。原书 A2 型题第 27 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "病人，女，25岁，误服过量抗精神病药氯丙嗪后面色苍白、昏迷，血压60mmHg/40mmHg，用于升压的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多巴胺",
      "肾上腺素",
      "麻黄碱",
      "去甲肾上腺素",
      "间羟胺",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "去甲肾上腺素",
        "氯丙嗪中毒时 α 受体被阻断，肾上腺素升压效应翻转，不能选用；去甲肾上腺素主要激动 α 受体升压，可用于氯丙嗪中毒所致的低血压。原书 A2 型题第 28 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "为什么治疗过敏性休克首选肾上腺素？",
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
        "①收缩小动脉和毛细血管前括约肌，降低毛细血管通透性，升高血压；②兴奋心脏，改善心功能；③激动β2受体舒张支气管平滑肌并减轻黏膜水肿；④抑制过敏介质释放，从而迅速缓解过敏性休克的临床症状。",
        "过敏性休克主要表现为大量小血管床扩张和毛细血管通透性增高，引起全身血容量降低、血压下降，心肌收缩力减弱；支气管平滑肌痉挛和黏膜水肿引起呼吸困难。病情发展迅猛，若不及时抢救可死于呼吸和循环衰竭。肾上腺素能明显收缩小动脉和毛细血管前括约肌、降低毛细血管通透性、改善心脏功能、升高血压，解除支气管痉挛和黏膜水肿，减少过敏介质释放，故为治疗过敏性休克的首选药。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "多巴胺对哪种类型的休克疗效好？为什么？",
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
        "对伴有心收缩性减弱及尿量减少的休克疗效好。因为多巴胺激动心脏β1受体使心肌收缩力加强、心排出量增加，同时舒张肾和肠系膜血管、增加肾血流，并有排钠利尿作用，有利于改善休克时的心功能和肾功能。",
        "多巴胺可激动心脏 β1 受体，使心肌收缩力加强、心排出量增加，增加收缩压和脉压，对舒张压无明显影响或仅轻微增加；由于心排出量增加而肾、肠系膜血管阻力下降，肾血流增加，并有排钠利尿作用，故对心收缩功能低下、尿少或尿闭的休克（如心源性休克、感染中毒性休克）疗效较好。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-short003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "支气管哮喘急性发作为什么可选用肾上腺素或异丙肾上腺素？",
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
        "两药均可激动β受体舒张支气管平滑肌并抑制过敏介质释放，迅速缓解呼吸困难；肾上腺素还可激动α受体收缩支气管黏膜血管，减轻黏膜充血水肿。",
        "支气管哮喘急性发作时支气管平滑肌痉挛、黏膜充血水肿、分泌物增多。肾上腺素和异丙肾上腺素均能激动 β 受体（主要为 β2）舒张支气管平滑肌，并抑制肥大细胞释放组胺等过敏介质；肾上腺素还可通过激动 α 受体收缩支气管黏膜血管，减轻黏膜充血水肿，故两药均可用于哮喘急性发作。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-short004",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "在酚妥拉明的作用下，肾上腺素的升压作用可翻转为降压，为什么？",
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
        "肾上腺素激动α及β受体，引起的血压变化是以升压为主的双向曲线，升压作用主要由激动α受体产生；酚妥拉明阻断α受体后，升压作用被取消，β受体（舒血管）兴奋作用占优势，故血压下降，出现升压作用的翻转。",
        "肾上腺素既激动 α 受体使血管收缩，又激动 β2 受体使血管舒张，整体表现为以升压为主的双向性血压变化。预先给予酚妥拉明（α 受体阻断药）后，缩血管的 α 效应被阻断，舒血管的 β2 效应相对占优势，此时再给予肾上腺素，血压不但不升反而下降，即肾上腺素升压作用的翻转。原书简答题第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员（原书 34～36 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch10-adrenoceptor-agonists-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "α受体激动药",
      "α1受体激动药",
      "α受体阻断药",
      "α1受体阻断药",
      "α2受体激动药",
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
        id: "ext-pharmacology-ch10-adrenoceptor-agonists-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "去甲肾上腺素属于",
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
            "α受体激动药",
            "去甲肾上腺素主要激动 α 受体（对 α1、α2 均有作用），对 β1 受体作用较弱，对 β2 受体几乎无作用，属 α 受体激动药。原书 B1 型题第 34 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch10-adrenoceptor-agonists-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "去氧肾上腺素属于",
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
            "α1受体激动药",
            "去氧肾上腺素为人工合成品，主要选择性激动 α1 受体，收缩血管升高血压，并可散瞳，属 α1 受体激动药。原书 B1 型题第 35 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch10-adrenoceptor-agonists-b001m3",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "羟甲唑啉属于",
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
            "α2受体激动药",
            "羟甲唑啉为咪唑啉类衍生物，主要激动 α2 受体，常用于鼻黏膜充血等，属 α2 受体激动药。原书 B1 型题第 36 题，参考答案键号 E。",
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
