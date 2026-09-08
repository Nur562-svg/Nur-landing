import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第一篇常见症状 题库提取（第三批）
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * 本批含 4 个症状节：第八节 胸痛、第九节 心悸、第十节 恶心与呕吐、第十一节 吞咽困难。
 *
 * == 统计报告 ==
 * —— 第八节 胸痛（节号 s8）——
 * - 名词解释：1 题
 * - A1 型题（单句型最佳选择题）：12 题
 * - A2 型题（病例型最佳选择题）：8 题
 * - 问答题（简答）：2 题
 * - B 型配伍题（共用备选答案，b1）：1 组、共 3 个成员小题
 * - 独立题合计：23 题（不含 B 型组成员）
 *
 * —— 第九节 心悸（节号 s9）——
 * - 名词解释：1 题
 * - A1 型题：2 题
 * - A2 型题：3 题
 * - 问答题（简答）：1 题
 * - B 型配伍题（共用备选答案，b1）：1 组、共 3 个成员小题
 * - 共用题干题组（A3/A4，b2）：2 组、共 7 个成员小题
 * - 独立题合计：7 题（不含组内成员）
 *
 * —— 第十节 恶心与呕吐（节号 s10）——
 * - 名词解释：2 题
 * - A1 型题：3 题
 * - A2 型题：2 题
 * - 问答题（简答）：2 题
 * - B 型配伍题（共用备选答案，b1）：2 组、共 7 个成员小题
 * - 共用题干题组（A3/A4，b2）：1 组、共 3 个成员小题
 * - 独立题合计：9 题（不含组内成员）
 *
 * —— 第十一节 吞咽困难（节号 s11）——
 * - 名词解释：1 题
 * - A1 型题：3 题
 * - A2 型题：2 题
 * - 问答题（简答）：2 题
 * - B 型配伍题（共用备选答案，b1）：2 组、共 7 个成员小题
 * - 共用题干题组（A3/A4，b2）：1 组、共 3 个成员小题
 * - 独立题合计：8 题（不含组内成员）
 *
 * —— 本批汇总 ——
 * - 独立题合计：47 题（名词解释＋A1＋A2＋问答题，不含组内成员）
 * - 题组合计：10 组（b1 共 6 组 + b2 共 4 组），组内成员小题共 33 题
 * - 章节实际总题数：80 题（47 独立题 + 33 组成员）
 * - 缺失答案：0 题
 * - 无法可靠提取：仅 1 处选项中 2 个干扰项文字 —— 第八节 胸痛 A2 第 8 题（右侧胸腔积液、叩诊实音、呼吸音消失）
 *   的 B、C 选项在 PDF 版式中被切碎（仅能读到 A 肺炎、D 结核性胸膜炎 及 E 示意），该题按医学语义保留正确答案
 *   D 结核性胸膜炎，两个干扰项按常见胸腔积液鉴别项（肺癌、自发性气胸）整理，不再臆造原词。
 * - 说明：原书含大量排版乱码与两栏混排，已按医学语义恢复，如“带状殖痊/带状癌症”应为“带状疱疹”、
 *   “水痛/水擅”应为“水疱”、“发生甘/发钳”应为“发绀”、“责门/我绚门”应为“贲门”、“堡石餐”应为“钡餐”、
 *   部分“第 4 版 隋癌/惯癌/溃痛/溃殇”应为“癌/溃疡”等；各 B 型“共用备选答案”选项作答顺序按参考答案键位还原。
 *   所有题目均做轻度改写并重排选项，数值与临床细节保留原值。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

/* ============================================================
 * 第八节 胸痛
 * ============================================================ */

const topicChest = "chest-pain";
const kpChest = `kp-diagnosis-${topicChest}`;
const locatorChest =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第八节 胸痛 习题（PDF 第33–36页）";

/** 名词解释（term） */
const chestTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-chest-pain-s8-term001",
    order: 1,
    knowledgePointId: kpChest,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：放射痛",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "放射痛",
        "除患病器官的局部疼痛外，还可见远离该器官某部体表或深部组织疼痛，称放射痛（radiating pain）或牵涉痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题（a1-single），选项已随机重排，correctChoiceIndex 指向新顺序 */
const chestA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-chest-pain-s8-a1001",
    order: 1,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "发生于胸骨后或剑突下，疼痛呈绞榨样或重压窒息感的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主动脉夹层",
      "肺栓塞",
      "带状疱疹",
      "心绞痛",
      "自发性气胸",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心绞痛",
        "心绞痛常位于胸骨后或剑突下，呈绞榨样或重压窒息感。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1002",
    order: 2,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列症状中，属于带状疱疹典型表现的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "成簇水疱沿一侧肋间神经分布伴剧痛，疱疹不越过体表中线",
      "胸痛多位于胸骨后，进食或吞咽时加重",
      "位于胸背部，向下放射至下腹、腰部与两侧腹股沟和下肢",
      "胸痛多位于胸骨后，进食或吞咽时加重",
      "诱因多为劳累，休息或含服硝酸甘油可缓解",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "成簇水疱沿一侧肋间神经分布伴剧痛，疱疹不越过体表中线",
        "带状疱疹沿一侧肋间神经分布成簇水疱、剧痛，疱疹一般不越过体表中线。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1003",
    order: 3,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不能引起胸痛的胸壁疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肋间神经炎",
      "非特异性肋软骨炎",
      "肋骨骨折",
      "带状疱疹",
      "胸膜炎",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸膜炎",
        "胸膜炎为呼吸系统（胸膜）疾病，非胸壁疾病；其余各项均属胸壁疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1004",
    order: 4,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人因胸痛入院，询问病史时应重点关注下列各项，除了哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "疼痛的持续时间和趋势",
      "疼痛的诱因",
      "疼痛的放射方向",
      "伴随症状",
      "疼痛的性质",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "疼痛的持续时间和趋势",
        "询问胸痛病史主要关注诱因、性质、持续时间、放射与伴随症状；与选项表述相比，该多项合并表述并不构成病史询问中「除外的」单一角度，参考答案以该项为除外不符（教材表述为「疼痛的趋势」除外）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1005",
    order: 5,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "胸痛多出现于胸骨后，并且于进食或吞咽时加重的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主动脉夹层",
      "食管炎",
      "胸膜炎",
      "肺栓塞",
      "心绞痛",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管炎",
        "食管走行于胸骨后，食管炎所致胸痛常位于胸骨后，进食或吞咽时加重。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1006",
    order: 6,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "胸痛伴面色苍白、大汗、血压下降或休克，常见于下列疾病，除了哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主动脉窦瘤破裂",
      "夹层动脉瘤",
      "心肌炎",
      "面积大的肺栓塞",
      "心肌梗死",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心肌炎",
        "心肌梗死、夹层动脉瘤、大面积肺栓塞及主动脉窦瘤破裂均可伴休克样表现，而心肌炎一般不出现此类急剧的血压下降或休克。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1007",
    order: 7,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "突发性胸部剧烈刺痛、绞痛伴呼吸困难及发绀，常见于下列哪项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "食管炎",
      "心绞痛",
      "肺癌",
      "带状疱疹",
      "肺梗死",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺梗死",
        "肺梗死常突发剧烈胸痛，呈刺痛、绞痛，伴呼吸困难与发绀。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1008",
    order: 8,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列引起胸痛的病因中，不属于胸壁疾病的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "非化脓性肋软骨炎",
      "肋骨骨折",
      "肋间神经炎",
      "纵隔肿瘤",
      "带状疱疹",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "纵隔肿瘤",
        "纵隔肿瘤属纵隔疾病，不属于胸壁疾病；其余均属胸壁疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1009",
    order: 9,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "冠心病心绞痛与心肌梗死所致胸痛的主要鉴别点是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "疼痛的放射部位是否不同",
      "疼痛是否伴发恶心",
      "疼痛的持续时间及对含服硝酸甘油的反应是否不同",
      "疼痛的性质是否不同",
      "疼痛的部位是否不同",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "疼痛的持续时间及对含服硝酸甘油的反应是否不同",
        "心绞痛持续短暂、含服硝酸甘油可缓解；心肌梗死疼痛剧烈且持续、含服硝酸甘油不易缓解，为主要鉴别点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1010",
    order: 10,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "病人含服硝酸甘油后引起心绞痛加重，最可能的原因是下列哪项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "干性胸膜炎",
      "急性心包炎",
      "不稳定型心绞痛",
      "急性心肌梗死",
      "肥厚性梗阻性心肌病",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥厚性梗阻性心肌病",
        "硝酸甘油致静脉扩张、回心血量减少，加重肥厚梗阻性心肌病的流出道梗阻，故可使心绞痛加重。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1011",
    order: 11,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列选项中，属于非特异性肋软骨炎特点的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多侵犯第一、二肋软骨，对称或非对称性，呈单个或多个肿胀隆起，局部皮肤颜色正常，有压痛，咳嗽、深呼吸或患侧上肢大幅度活动时疼痛加重",
      "成簇水疱沿一侧肋间神经分布伴剧痛，疱疹不越过体表中线",
      "胸痛多位于胸骨后，进食或吞咽时加重",
      "位于胸背部，向下放射至下腹、腰部与两侧腹股沟和下肢",
      "多位于胸骨后，进食或吞咽时加重，夜间平卧位易发作",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多侵犯第一、二肋软骨，对称或非对称性，呈单个或多个肿胀隆起，局部皮肤颜色正常，有压痛，咳嗽、深呼吸或患侧上肢大幅度活动时疼痛加重",
        "此为非特异性肋软骨炎的典型特点，皮肤局部颜色正常且可触及肿胀隆起并伴压痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a1012",
    order: 12,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列心血管疾病均可引起胸痛，除了哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性心包炎",
      "心肌炎",
      "甲亢性心肌病",
      "急性冠脉综合征",
      "心绞痛",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "甲亢性心肌病",
        "心绞痛、急性冠脉综合征、急性心包炎、心肌炎等均可引起胸痛；甲亢性心肌病以高动力循环为主，一般不引起胸痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题（病案型最佳选择题，questionKind 亦为 a1-single），选项已随机重排 */
const chestA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-chest-pain-s8-a2001",
    order: 1,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，72 岁，因间断性胸骨后疼痛入院，疼痛常放射至左肩、左臂内侧，达无名指与小指。该病人患有下列疾病的可能性最大的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胸膜炎",
      "主动脉夹层",
      "食管炎",
      "肺栓塞",
      "心绞痛",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心绞痛",
        "疼痛放射至左肩、左上臂内侧达小指、无名指，为典型心绞痛放射部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2002",
    order: 2,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，26 岁，快速爬楼梯后突发右侧胸痛伴呼吸困难。该病人患有下列疾病的可能性比较大的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主动脉夹层",
      "心绞痛",
      "自发性气胸",
      "肺栓塞",
      "带状疱疹",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "自发性气胸",
        "青年男性，剧烈活动后突发一侧胸痛伴呼吸困难，首先考虑自发性气胸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2003",
    order: 3,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女，26 岁，持续性右侧胸痛 1 周，伴活动后呼吸困难，胸部 X 线可见右侧反抛物线状密度增高影。该病人可能患有的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主动脉夹层",
      "食管炎",
      "自发性气胸",
      "胸膜炎",
      "心绞痛",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸膜炎",
        "右侧反抛物线状密度增高影提示右侧胸腔积液，多为胸膜炎所致，伴持续胸痛与活动后气促。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2004",
    order: 4,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人经常出现胸骨后压榨性窒息感，发作时间 3～5 分钟，休息或含服硝酸甘油可缓解。该病人最可能为下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "纵隔炎",
      "胸膜炎",
      "心绞痛",
      "肺栓塞",
      "主动脉夹层",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心绞痛",
        "发作短暂（3～5 分钟）、休息或含服硝酸甘油可缓解，为典型劳力性心绞痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2005",
    order: 5,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人间断咳嗽、咳痰半年，痰中带血，右侧胸痛 1 周入院。该病人最可能为下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心肌炎",
      "肺栓塞",
      "胸膜炎",
      "心绞痛",
      "肺癌",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺癌",
        "中年病人长期咳嗽、咳痰、痰中带血伴胸痛，应首先警惕肺部肿瘤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2006",
    order: 6,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，25 岁，着凉后出现高热、咳嗽、咳黄痰，伴右侧胸痛。该病人最可能为下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胸膜炎",
      "肺栓塞",
      "大叶性肺炎",
      "心绞痛",
      "肺癌",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "大叶性肺炎",
        "着凉后高热、咳黄痰伴一侧胸痛，符合大叶性肺炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2007",
    order: 7,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "青年男性，持续性胸痛伴低热、咳嗽、咳黄痰。该表现最常见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肺梗死",
      "胸膜炎",
      "食管炎",
      "肺炎",
      "肺癌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺炎",
        "青年病人持续胸痛伴低热、咳嗽、咳黄痰，多为肺部感染（肺炎）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-a2008",
    order: 8,
    knowledgePointId: kpChest,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，18 岁，以发热、干咳、右侧胸痛起病，渐感气短且逐日加重。查体：右下肺叩诊呈实音，呼吸音消失；胸片提示右侧胸腔积液。该病人最可能的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肺癌",
      "自发性气胸",
      "食管炎",
      "肺炎",
      "结核性胸膜炎",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结核性胸膜炎",
        "青年病人以发热、干咳起病，出现大量一侧胸腔积液（叩诊实音、呼吸音消失），最可能为结核性胸膜炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const chestShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-chest-pain-s8-sa001",
    order: 1,
    knowledgePointId: kpChest,
    questionKind: "short-answer",
    status: "available",
    prompt: "简要概述胸痛的病因。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "引起胸痛的原因主要为胸部疾病。常见有：①胸壁疾病：急性皮炎、皮下蜂窝织炎、带状疱疹、肋间神经炎、肋软骨炎、流行性肌炎、肋骨骨折，以及累及胸壁的疾病（多发性骨髓瘤、急性白血病）等。②心血管疾病：冠心病（心绞痛、心肌梗死）、心肌病、二尖瓣或主动脉瓣病变、急性心包炎、胸主动脉瘤（夹层动脉瘤）、肺栓塞（梗死）、肺动脉高压等。③呼吸系统疾病：胸膜炎、胸膜肿瘤、自发性气胸、血胸、支气管炎、支气管肺癌等。④纵隔疾病：纵隔炎、纵隔气肿、纵隔肿瘤等。⑤其他：过度通气综合征、痛风、食管炎、食管癌、食管裂孔疝、膈下脓肿、肝脓肿、脾梗死以及神经症等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-sa002",
    order: 2,
    knowledgePointId: kpChest,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述胸痛的临床表现要点。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸痛的临床表现要点有：①发病年龄：青壮年胸痛多考虑结核性胸膜炎、自发性气胸、心肌炎、心肌病、风湿性心瓣膜病；40 岁以上则须注意心绞痛、心肌梗死和支气管肺癌。②胸痛部位：大部分疾病引起的胸痛常有比较固定的部位。③胸痛性质：可多种多样，如带状疱疹呈刀割样或灼热样剧痛，食管炎多呈烧灼痛，肋间神经痛为阵发性灼痛或刺痛，心绞痛呈绞榨样痛并有重压窒息感，心肌梗死则疼痛更为剧烈并有恐惧、濒死感。④疼痛持续时间：如心绞痛发作时间短暂（持续 1～5 分钟），而心肌梗死疼痛持续时间很长（数小时或更长）且不易缓解。⑤影响疼痛的因素：主要为疼痛发生的诱因、加重与缓解的因素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（共用备选答案，members 无 choices，correctChoiceIndex 指向 sharedChoices 下标） */
const chestB001SharedChoices = [
  "肺梗死",
  "肺癌",
  "肺栓塞",
  "心绞痛",
  "食管炎",
];

const chestB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-chest-pain-s8-b001m1",
    order: 1,
    knowledgePointId: kpChest,
    questionKind: "b1",
    status: "available",
    prompt: "胸骨后烧灼痛见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管炎",
        "食管炎所致的胸痛多为胸骨后烧灼痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-b001m2",
    order: 2,
    knowledgePointId: kpChest,
    questionKind: "b1",
    status: "available",
    prompt: "胸部闷痛见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心绞痛",
        "心绞痛常表现为胸骨后闷痛或压榨样不适。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-chest-pain-s8-b001m3",
    order: 3,
    knowledgePointId: kpChest,
    questionKind: "b1",
    status: "available",
    prompt: "突然胸部剧烈刺痛、绞痛伴呼吸困难与发绀见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺梗死",
        "肺梗死表现为突发剧烈胸痛伴呼吸困难和发绀。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const chestB1Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-chest-pain-s8-b001",
    order: 1,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: chestB001SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorChest,
      note: promptNote,
      sourceIds: [],
    },
    members: chestB001Members,
    sourceIds: [],
  },
];

/* ============================================================
 * 第九节 心悸
 * ============================================================ */

const topicPalpitation = "palpitation";
const kpPalpitation = `kp-diagnosis-${topicPalpitation}`;
const locatorPalpitation =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第九节 心悸 习题（PDF 第36–39页）";

/** 名词解释（term） */
const palpitationTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-term001",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：心悸",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心悸",
        "心悸是一种自觉心脏跳动的不适感或心慌感。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题 */
const palpitationA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-a1001",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于心悸，下列叙述正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心悸与心脏病联系紧密，两者等同",
      "心悸与心律失常发生的严重程度成正比",
      "心悸可见于窦性心动过缓",
      "心脏神经官能症时出现心悸，但不伴有心前区疼痛",
      "心悸即心动过速",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心悸可见于窦性心动过缓",
        "心悸可见于心动过速、心动过缓等多种心律状态，窦性心动过缓亦可能引起心悸；其余说法（心悸即心动过速、与心律失常成正比、两者等同等）均不准确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-a1002",
    order: 2,
    knowledgePointId: kpPalpitation,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起心悸最常见的病因是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "高血压",
      "心肌病",
      "心律失常",
      "神经官能症",
      "冠心病",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心律失常",
        "心律失常（包括心动过速、过快、过缓及其他节律异常）是引起心悸最常见的病因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题 */
const palpitationA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-a2001",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，31 岁，活动后心悸、心跳停搏感 1 个月。查体：心律不规则、有间歇。心电图示 QRS 波提前出现、宽大畸形，其前无 P 波，T 波与主波方向相反。可判断为下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "窦性心动过缓",
      "室性期前收缩",
      "正常心律",
      "房颤",
      "阵发性室上速",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "室性期前收缩",
        "QRS 波提前出现、宽大畸形，其前无 P 波，T 波与主波方向相反，为室性期前收缩的典型心电图表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-a2002",
    order: 2,
    knowledgePointId: kpPalpitation,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，24 岁，军人，突发心悸 1 小时。查体：心率 196 次/分，血压正常，心音有力，律齐无杂音。心电图示直立 P 波，PR 间期＞0.12 秒。下列诊断正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "神经官能症",
      "室性心动过速",
      "室上性心动过速",
      "室颤",
      "快速房颤",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "室上性心动过速",
        "青年突发心悸、心率可达 196 次/分、律齐，心电图上 P 波直立、PR 间期＞0.12 秒，为室上性心动过速表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-a2003",
    order: 3,
    knowledgePointId: kpPalpitation,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女，50 岁，心悸、气促、下肢水肿 4 年。查体：心音低弱，血压 90/70mmHg。X 线检查示心影大小正常、左右心缘变直、心包钙化。下列诊断正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "冠心病",
      "低血压",
      "心肌病",
      "风湿性心瓣膜病",
      "缩窄性心包炎",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "缩窄性心包炎",
        "心音低弱、血压偏低、左右心缘变直及心包钙化，是缩窄性心包炎的典型 X 线与体征表现，伴心悸、气促、下肢水肿。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const palpitationShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-sa001",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述心悸的病因。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心悸的病因如下：(1) 心脏搏动增强：①生理性，见于剧烈运动或精神过度紧张时，饮酒、浓茶、咖啡后，应用阿托品、甲状腺片等药物后；②病理性，见于高血压、心脏病、风湿性心脏病导致的心室肥大，以及甲状腺功能亢进、贫血、低血糖、发热等引起心脏搏动增强的疾病。(2) 心律失常：包括心动过速、心动过缓及其他心律失常如心房颤动等。(3) 心力衰竭。(4) 心脏神经官能症、β受体亢进综合征和更年期综合征等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（共用备选答案） */
const palpitationB001SharedChoices = [
  "心悸伴关节疼痛",
  "心悸伴晕厥",
  "心悸伴贫血",
  "心悸伴心前区疼痛",
  "心悸伴消瘦",
];

const palpitationB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-b001m1",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "b1",
    status: "available",
    prompt: "心肌炎",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心悸伴心前区疼痛",
        "心肌炎除心悸外常伴心前区疼痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b001m2",
    order: 2,
    knowledgePointId: kpPalpitation,
    questionKind: "b1",
    status: "available",
    prompt: "甲亢",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心悸伴消瘦",
        "甲状腺功能亢进高代谢使心悸同时常伴消瘦。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b001m3",
    order: 3,
    knowledgePointId: kpPalpitation,
    questionKind: "b1",
    status: "available",
    prompt: "心室颤动",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心悸伴晕厥",
        "心室颤动致心排血量骤减，常心悸发作并突然晕厥。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const palpitationB1Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-b001",
    order: 1,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: palpitationB001SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    members: palpitationB001Members,
    sourceIds: [],
  },
];

/** B2 型题（A3/A4 共用题干，groupPrompt 非空、sharedChoices:null） */

// 第 1 组：1–3 题共用题干
const palpitationB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-b002m1",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "风湿性心瓣膜病",
      "溶血性贫血",
      "海洋性贫血",
      "继发性贫血",
      "心肌炎",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "继发性贫血",
        "黑便史伴乏力、活动后心慌，皮肤黏膜及口唇苍白，Hb 60g/L，为继发性（失血性）贫血，继发于消化道出血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b002m2",
    order: 2,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "贫血的原因最可能为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "营养不良",
      "消化道出血",
      "溶血",
      "继发于心脏病",
      "骨髓造血功能障碍",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消化道出血",
        "病人有间断黑便史，提示上消化道出血为贫血最可能的原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b002m3",
    order: 3,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "心率增快的原因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心肌炎",
      "风湿热",
      "贫血",
      "感染因素",
      "心瓣膜病",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "贫血",
        "重度贫血时心率代偿性增快以增加组织供氧，是本例心率达 120 次/分的原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

// 第 2 组：4–7 题共用题干
const palpitationB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-b003m1",
    order: 1,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最有可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心肌梗死",
      "心肌病",
      "气胸",
      "心包积液",
      "心房颤动",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心肌梗死",
        "持续剧烈胸痛、伴呼吸困难、服用多种药物不能缓解，心音低，结合 56 岁年体检，首先考虑急性心肌梗死。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b003m2",
    order: 2,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "首选的检查为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心电图",
      "心脏 X 线拍片",
      "心肌酶谱",
      "胸片",
      "超声心动图",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心电图",
        "怀疑急性心肌梗死时首选心电图检查，可快速提示缺血或梗死改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b003m3",
    order: 3,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "主要应该鉴别的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "支气管哮喘",
      "病毒性心肌炎",
      "气胸",
      "心包炎",
      "心力衰竭",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "气胸",
        "急性胸痛伴呼吸困难时需与自发性气胸等胸膜疾病鉴别。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b003m4",
    order: 4,
    knowledgePointId: kpPalpitation,
    questionKind: "b2",
    status: "available",
    prompt: "应紧急施行的治疗是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "使用扩血管药物",
      "紧急心包穿刺",
      "紧急胸穿",
      "β受体阻滞药",
      "强心剂",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "使用扩血管药物",
        "急性心肌梗死应尽快给予硝酸酯类等扩张血管药物改善缺血、缓解症状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const palpitationB2Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-palpitation-s9-b002",
    order: 2,
    questionKind: "b2",
    status: "available",
    groupPrompt:
      "女，30 岁，间断黑便 1 个月，乏力、活动后心慌半个月。查体：皮肤黏膜、口唇苍白，心率 120 次/分，心尖区可闻及 II 级收缩期杂音。化验检查示 Hb 60g/L。",
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    members: palpitationB002Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-palpitation-s9-b003",
    order: 3,
    questionKind: "b2",
    status: "available",
    groupPrompt:
      "男，56 岁，心悸、胸闷 2 个月，突发胸痛 2 小时，呈持续性疼痛，伴呼吸困难，服用各种药物不能缓解。查体：心率 85 次/分，心音低，心律不齐，未闻及期前收缩。",
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorPalpitation,
      note: promptNote,
      sourceIds: [],
    },
    members: palpitationB003Members,
    sourceIds: [],
  },
];

/* ============================================================
 * 第十节 恶心与呕吐
 * ============================================================ */

const topicNausea = "nausea-vomiting";
const kpNausea = `kp-diagnosis-${topicNausea}`;
const locatorNausea =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十节 恶心与呕吐 习题（PDF 第39–41页）";

/** 名词解释（term） */
const nauseaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-term001",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：恶心",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "恶心",
        "恶心为上腹部不适和紧迫欲吐的感觉，可伴有迷走神经兴奋的症状，如皮肤苍白、出汗、流涎、血压降低及心动过缓等，常为呕吐的前奏。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-term002",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：呕吐",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕吐",
        "呕吐是通过胃的强烈收缩迫使胃或部分小肠内容物经食管、口腔而排出体外的现象。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题 */
const nauseaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-a1001",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "直接作用于延髓第四脑室底侧的化学感受器触发带（CTZ），引起呕吐的是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性胃肠炎",
      "洋地黄中毒",
      "急性阑尾炎",
      "迷路炎",
      "急性腹膜炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "洋地黄中毒",
        "洋地黄等药物可经化学感受器触发带直接兴奋呕吐中枢引起呕吐。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-a1002",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于恶心与呕吐，下列叙述正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "延髓第四脑室底面的化学感受器触发带可以直接支配呕吐动作",
      "呕吐中枢位于延髓第四脑室底面",
      "呕吐时胃窦部持续收缩，贲门开放，腹肌收缩，腹压增加",
      "干呕时胃窦部和腹壁肌肉收缩，腹压增加，食管及咽部关闭",
      "反食是有意识地用力将胃和（或）小肠内容物经食管、口腔逼出体外",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕吐时胃窦部持续收缩，贲门开放，腹肌收缩，腹压增加",
        "呕吐时胃窦部持续收缩、贲门开放、腹肌收缩、腹压增加，共同将内容物排出；化学感受器触发带仅起触发作用而不能直接支配呕吐动作。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-a1003",
    order: 3,
    knowledgePointId: kpNausea,
    questionKind: "a1-single",
    status: "available",
    prompt: "呕吐大量隔夜宿食，最常见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "幽门梗阻",
      "急性胃炎",
      "急性肝炎",
      "慢性胃炎",
      "消化性溃疡",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "幽门梗阻",
        "幽门梗阻使胃排空受阻，呕吐大量隔夜（宿食）为典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题 */
const nauseaA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-a2001",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男，46 岁，中上腹阵发性绞痛 2 个月，伴呕吐大量胆汁。此表现提示梗阻平面位于下列哪处？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "贲门以上",
      "幽门以下",
      "十二指肠乳头以下",
      "十二指肠乳头以上",
      "幽门以上",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "十二指肠乳头以下",
        "呕吐物含大量胆汁提示梗阻在十二指肠乳头以下平面，使胆汁可返流入胃。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-a2002",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女，40 岁，呕吐伴眩晕、眼球震颤，最可能见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑震荡",
      "脑出血",
      "前庭器官疾病",
      "脑梗死",
      "眼病",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "前庭器官疾病",
        "呕吐伴眩晕、眼球震颤是前庭（迷路）疾病（前庭器官疾病）的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const nauseaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-sa001",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述恶心与呕吐的病因。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "恶心与呕吐的病因有：(1) 反射性呕吐：①咽部受到刺激；②胃、十二指肠疾病；③肠道疾病；④肝胆胰疾病；⑤腹膜及肠系膜疾病；⑥其他疾病。(2) 中枢性呕吐：①神经系统疾病；②全身性疾病；③药物；④中毒；⑤精神因素。(3) 前庭障碍性呕吐：凡呕吐伴有听力障碍、眩晕等症状者，需考虑前庭障碍性呕吐。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-sa002",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述恶心与呕吐的临床表现。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "恶心与呕吐的临床表现要点包括：①呕吐的时间；②呕吐与进食的关系；③呕吐的特点；④呕吐物的性质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（共用备选答案） */

// 第 1 组：1–4 题共用备选答案
const nauseaB001SharedChoices = [
  "急性胃肠炎",
  "颅内高压",
  "早孕",
  "迷路炎",
  "幽门梗阻",
];

const nauseaB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b001m1",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐伴腹泻，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性胃肠炎",
        "急性胃肠炎常有呕吐伴腹泻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b001m2",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "停经 2 个月，血 HCG 阳性，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "早孕",
        "停经伴血 HCG 阳性考虑早孕，可致妊娠期恶心呕吐。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b001m3",
    order: 3,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐伴眩晕、眼球震颤，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "迷路炎",
        "迷路炎属前庭障碍，呕吐伴眩晕及眼球震颤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b001m4",
    order: 4,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐伴头痛及瞳孔改变，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "颅内高压",
        "颅内高压可引起中枢性呕吐，伴头痛及瞳孔改变等颅神经受压表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

// 第 2 组：5–7 题共用备选答案
const nauseaB002SharedChoices = [
  "呕吐物带发酵、腐败气味",
  "呕吐物带粪臭味",
  "呕吐物不含胆汁",
  "呕吐物有大量胆汁",
  "呕吐物含有大量酸性液体",
];

const nauseaB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b002m1",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "幽门梗阻，可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕吐物带发酵、腐败气味",
        "幽门梗阻胃内容物滞留发酵，呕吐物带发酵、腐败气味。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b002m2",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "低位小肠梗阻，可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕吐物带粪臭味",
        "低位小肠梗阻肠内容物积存粪化，呕吐物带粪臭味。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b002m3",
    order: 3,
    knowledgePointId: kpNausea,
    questionKind: "b1",
    status: "available",
    prompt: "胃泌素瘤或十二指肠溃疡，可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕吐物含有大量酸性液体",
        "胃泌素瘤或十二指肠溃疡胃酸分泌增多，呕吐物含大量酸性液体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const nauseaB1Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b001",
    order: 1,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: nauseaB001SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    members: nauseaB001Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: nauseaB002SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    members: nauseaB002Members,
    sourceIds: [],
  },
];

/** B2 型题（共用题干）—— 1–3 题共用题干 */
const nauseaB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b003m1",
    order: 1,
    knowledgePointId: kpNausea,
    questionKind: "b2",
    status: "available",
    prompt: "首先考虑的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胃溃疡恶变",
      "十二指肠溃疡并发幽门梗阻",
      "胆囊结石并急性胆管炎",
      "急性胆囊炎",
      "慢性胰腺炎",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆囊结石并急性胆管炎",
        "脂餐后上腹痛、发热 38℃ 伴巩膜轻度黄染，符合胆总管结石并急性胆管炎（Charcot 三联征）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b003m2",
    order: 2,
    knowledgePointId: kpNausea,
    questionKind: "b2",
    status: "available",
    prompt: "为了明确诊断，首先安排的检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "X 线胃肠钡餐造影",
      "胃镜检查",
      "腹部彩超",
      "癌胚抗原测定",
      "腹部 X 线透视",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腹部彩超",
        "怀疑胆道疾病时首选腹部彩超，可显示胆囊结石及胆管扩张、增厚等改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b003m3",
    order: 3,
    knowledgePointId: kpNausea,
    questionKind: "b2",
    status: "available",
    prompt: "如在腹部检查时有明显压痛，最可能出现的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脐中部＋中下腹",
      "中下腹＋右下腹",
      "中上腹＋右上腹",
      "右下腹＋右中腹",
      "左下腹＋中下腹",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中上腹＋右上腹",
        "胆管炎时压痛点主要位于中上腹及右上腹（剑突下、右上腹）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const nauseaB2Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-nausea-vomiting-s10-b003",
    order: 3,
    questionKind: "b2",
    status: "available",
    groupPrompt:
      "男，45 岁，反复上腹痛 5 年，常发生在脂餐后半小时，1 天前腹痛加重伴恶心、呕吐胃内容物，发热 38℃，巩膜轻度黄染。",
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorNausea,
      note: promptNote,
      sourceIds: [],
    },
    members: nauseaB003Members,
    sourceIds: [],
  },
];

/* ============================================================
 * 第十一节 吞咽困难
 * ============================================================ */

const topicDysphagia = "dysphagia";
const kpDysphagia = `kp-diagnosis-${topicDysphagia}`;
const locatorDysphagia =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十一节 吞咽困难 习题（PDF 第41–44页）";

/** 名词解释（term） */
const dysphagiaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-term001",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：吞咽困难",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽困难",
        "吞咽困难是指食物从口腔至胃、贲门运送过程中受阻，而产生咽部、胸骨后或剑突部位的梗阻停滞感觉，可伴有胸骨后疼痛。吞咽困难可由中枢神经系统疾病、食管、口咽部疾病引起，亦可由吞咽肌肉的运动障碍所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题 */
const dysphagiaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-a1001",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "a1-single",
    status: "available",
    prompt: "短期进行性加重的吞咽困难，首先考虑下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "食管良性狭窄",
      "食管溃疡",
      "贲门失弛缓症",
      "食管癌",
      "胃食管反流病",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管癌",
        "短期内进行性加重的吞咽困难为食管癌的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-a1002",
    order: 2,
    knowledgePointId: kpDysphagia,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "吞咽困难伴饮水呛咳、鼻孔反流及气紧等症状，首先考虑下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "贲门失弛缓症",
      "食管溃疡",
      "食管癌",
      "延髓麻痹",
      "食管裂孔疝",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "延髓麻痹",
        "吞咽困难伴饮水呛咳、鼻孔反流及气紧，提示口咽部神经肌肉功能障碍（延髓麻痹/假性延髓麻痹）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-a1003",
    order: 3,
    knowledgePointId: kpDysphagia,
    questionKind: "a1-single",
    status: "available",
    prompt: "发作性吞咽液体及固体食物均困难，首先考虑下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "弥漫性食管痉挛",
      "贲门失弛缓症",
      "食管溃疡",
      "反流性食管炎",
      "食管癌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "弥漫性食管痉挛",
        "弥漫性食管痉挛表现为发作性吞咽液体及固体食物的吞咽困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题 */
const dysphagiaA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-a2001",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女，26 岁，喜素食，月经量多，体检发现小细胞低色素性贫血，近期出现吞咽困难。首先考虑下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "食管机械性吞咽困难",
      "吞咽反射性运动障碍",
      "口咽性吞咽困难",
      "延髓麻痹性吞咽困难",
      "食管动力性吞咽困难",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管机械性吞咽困难",
        "小细胞低色素性贫血伴吞咽困难为 Plummer-Vinson 综合征，由食管蹼等机械性因素所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-a2002",
    order: 2,
    knowledgePointId: kpDysphagia,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "6 岁男童，2 个月前曾有误服「洁厕灵」历史，近日出现咽下困难，无明显胸骨后疼痛。首先考虑下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "弥漫性食管痉挛",
      "食管瘢痕狭窄",
      "贲门失弛缓症",
      "食管癌",
      "食管溃疡",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管瘢痕狭窄",
        "误服腐蚀性液体（洁厕灵）后形成的食管瘢痕狭窄，可致咽下困难，故首先考虑食管瘢痕狭窄。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const dysphagiaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-sa001",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述吞咽困难的病因与分类。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽困难的病因与分类：(1) 机械性吞咽困难：①腔内因素；②管腔狭窄，包括口咽部炎症、食管良性狭窄、恶性肿瘤、食管蹼、黏膜环（食管下端黏膜环，Schatzki ring）等；③外压性狭窄。(2) 动力性吞咽困难：①吞咽启动困难；②咽、食管横纹肌功能障碍；③食管平滑肌功能障碍；④其他。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-sa002",
    order: 2,
    knowledgePointId: kpDysphagia,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述吞咽困难的发生机制。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽困难的发生机制主要有两类：①机械性吞咽困难；②运动性（动力性）吞咽困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（共用备选答案） */

// 第 1 组：1–4 题共用备选答案
const dysphagiaB001SharedChoices = [
  "贲门失弛缓症",
  "食管平滑肌瘤",
  "食管癌",
  "反流性食管炎",
  "吞咽反射性运动障碍",
];

const dysphagiaB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-b001m1",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "进行性吞咽梗阻，先固体食物困难，后期液体食物困难，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管癌",
        "食管癌进行性吞咽梗阻，先固体后液体食物困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b001m2",
    order: 2,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "吞咽液体比固体食物更困难，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽反射性运动障碍",
        "吞咽反射性或口咽部运动障碍时，液体（易逆流）常比固体食物更难吞咽。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b001m3",
    order: 3,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "反酸、胃灼热、胸痛伴轻微吞咽困难，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "反流性食管炎",
        "反酸、胃灼热、胸痛伴轻微吞咽困难是反流性食管炎的常见表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b001m4",
    order: 4,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "长期吞咽有阻挡感，症状无明显加重，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管平滑肌瘤",
        "食管平滑肌瘤为良性肿瘤，长期吞咽阻挡感但症状无明显进行性加重。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

// 第 2 组：5–7 题共用备选答案
const dysphagiaB002SharedChoices = [
  "吞咽困难伴恶心、呕吐，呕吐物无酸味",
  "吞咽困难伴咳嗽，偶有脓痰",
  "吞咽困难伴呼吸困难、咳喘、哮鸣音",
  "吞咽困难伴胃灼热、反酸、胸痛",
  "吞咽困难伴构音不良、发音含糊、声嘶、呛咳",
];

const dysphagiaB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-b002m1",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "延髓肿瘤可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽困难伴构音不良、发音含糊、声嘶、呛咳",
        "延髓肿瘤累及延髓神经核，引起构音不良、发音含糊、声嘶及呛咳。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b002m2",
    order: 2,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "贲门癌可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽困难伴恶心、呕吐，呕吐物无酸味",
        "贲门癌致贲门梗阻，吞咽困难伴恶心、呕吐且呕吐物无酸味。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b002m3",
    order: 3,
    knowledgePointId: kpDysphagia,
    questionKind: "b1",
    status: "available",
    prompt: "纵隔肿瘤可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞咽困难伴呼吸困难、咳喘、哮鸣音",
        "纵隔肿瘤压迫食管及气管，引起吞咽困难并伴呼吸困难、咳喘、哮鸣音。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const dysphagiaB1Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-b001",
    order: 1,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: dysphagiaB001SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    members: dysphagiaB001Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: dysphagiaB002SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    members: dysphagiaB002Members,
    sourceIds: [],
  },
];

/** B2 型题（共用题干）—— 1–3 题共用题干 */
const dysphagiaB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-b003m1",
    order: 1,
    knowledgePointId: kpDysphagia,
    questionKind: "b2",
    status: "available",
    prompt: "首先考虑的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "贲门失弛缓症",
      "食管癌",
      "延髓麻痹",
      "食管裂孔疝",
      "重症肌无力",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "贲门失弛缓症",
        "青年女性反复间断吞咽困难 5 年，情绪激动后加重、症状时好时坏，符合贲门失弛缓症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b003m2",
    order: 2,
    knowledgePointId: kpDysphagia,
    questionKind: "b2",
    status: "available",
    prompt: "为了明确诊断，首先安排的辅助检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "X 线胃肠钡餐造影",
      "上腹部 CT 检查",
      "腹部彩超",
      "癌胚抗原测定",
      "腹部 X 线透视",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "X 线胃肠钡餐造影",
        "X 线钡餐造影可见贲门失弛缓症的典型鸟嘴样改变，为首先安排的确诊检查。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dysphagia-s11-b003m3",
    order: 3,
    knowledgePointId: kpDysphagia,
    questionKind: "b2",
    status: "available",
    prompt: "如病人进一步行胃镜检查，最可能发现的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "食管溃疡",
      "通过贲门时有阻力",
      "食管下段充血、肿胀、糜烂",
      "食管全程管腔变窄",
      "食管入口进入困难",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "通过贲门时有阻力",
        "贲门失弛缓症胃镜下食管下括约肌痉挛，镜身通过贲门时有阻力。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const dysphagiaB2Groups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-dysphagia-s11-b003",
    order: 3,
    questionKind: "b2",
    status: "available",
    groupPrompt:
      "女，25 岁，反复间断吞咽困难 5 年，多在情绪激动后症状加重，症状时好时坏。",
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorDysphagia,
      note: promptNote,
      sourceIds: [],
    },
    members: dysphagiaB003Members,
    sourceIds: [],
  },
];

/* ============================================================
 * 汇总导出
 * ============================================================ */

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...chestTermItems,
  ...chestA1Items,
  ...chestA2Items,
  ...chestShortAnswerItems,
  ...palpitationTermItems,
  ...palpitationA1Items,
  ...palpitationA2Items,
  ...palpitationShortAnswerItems,
  ...nauseaTermItems,
  ...nauseaA1Items,
  ...nauseaA2Items,
  ...nauseaShortAnswerItems,
  ...dysphagiaTermItems,
  ...dysphagiaA1Items,
  ...dysphagiaA2Items,
  ...dysphagiaShortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...chestB1Groups,
  ...palpitationB1Groups,
  ...palpitationB2Groups,
  ...nauseaB1Groups,
  ...nauseaB2Groups,
  ...dysphagiaB1Groups,
  ...dysphagiaB2Groups,
];