import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学影像学学习指导与习题集 第3版 — 第12章 介入放射学总论 题库提取（等比取样）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：8 题（均为 A1 型，本章无 A2 型题）
 * - 简答题（short-answer）：1 题
 * - B1 配伍题：0 组 / 0 成员
 * - 独立记分题合计：14 题（须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、填空题、选择题（A1/B1）、简答题；本文件按 14 道预算在
 *   原书顺序内取材：名词解释取第 1–2 题、填空题取第 1–3 题、A1 型取第 1–8 题（本章无
 *   A2 型题）、B 型不取（本章 B1 配额为 0）、简答题取第 1–1 题；未纳入的题因预算所限。
 *   正确项对齐章末参考答案键号（A1/A2/B1 全书连续编号），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按医学影像学医学语义恢复（如 介人→介入、1251→¹²⁵I、
 *   黄疽→黄疸 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "radiology-bank-ch12-ir-intro";
const locatorBase =
  "《医学影像学学习指导与习题集》第3版 第12章 介入放射学总论 习题（核对PDF 第170–175页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道（原书第 1–2 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：介入放射学",
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
        "介入放射学：是在 DSA、超声、CT 及 MRI 等影像设备引导下，利用经皮穿刺或体表自然孔道的路径，引入导管、导丝、球囊导管、支架、引流管等相关介入器材对各种疾病进行微创诊断和治疗的新兴学科。",
        "介入放射学以影像设备引导、经皮穿刺或经体表自然孔道引入介入器材进行微创诊疗为核心；OCR「介人」已按医学影像学语义恢复为「介入」。原书第12章名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：栓塞后综合征",
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
        "栓塞后综合征：指肿瘤和器官动脉栓塞后，因组织缺血坏死引起的恶心、呕吐、局部疼痛、发热、反射性肠郁张或麻痹性肠梗阻、食欲下降等症状，这些反应称为栓塞后综合征。",
        "栓塞后综合征是动脉栓塞后组织缺血坏死引起的一组全身性反应。原书第12章名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道（原书第 1–3 题） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "经导管栓塞术临床应用的代表性疾病有___。",
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
        "咯血的栓塞治疗；有症状的子宫肌瘤的栓塞治疗；肝癌的栓塞治疗；脾功能亢进的栓塞治疗",
        "经导管栓塞术代表性临床应用包括咯血、有症状子宫肌瘤、肝癌及脾功能亢进的栓塞治疗。原书第12章填空题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "Seldinger 技术包括两个含义：___、___。",
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
        "①经皮穿刺；②经导丝置入导管",
        "Seldinger 技术的两个含义为经皮穿刺和经导丝置入导管。原书第12章填空题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "列出四种常用的介入诊疗器械：___。",
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
        "导管、导丝、穿刺针、导管鞘",
        "常用介入诊疗器械包括导管、导丝、穿刺针、导管鞘。原书第12章填空题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），8 道（A1 型原书第 1–8 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "栓塞物质的选择，以下哪项不对",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "应根据靶血管直径选择栓塞剂",
      "应根据治疗目的选择栓塞剂",
      "动静脉畸形应选择长期性栓塞剂",
      "肿瘤应选择永久性栓塞剂",
      "出血应选择中短期栓塞剂",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肿瘤应选择永久性栓塞剂",
        "肿瘤栓塞多选择碘化油等中-长期栓塞剂而非永久性栓塞剂，该说法不对；动静脉畸形需长期性栓塞、出血用中短期栓塞剂。原书第12章 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于螺圈（coil），下列叙述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一般使血管闭塞 24~48 小时",
      "一般使血管闭塞 2~4 周，可按需制成不同形态和大小",
      "较长时间阻塞肿瘤实质血供的外围性液态栓塞剂",
      "机械性永久性栓塞物",
      "液态高分子聚合物，可长期闭塞血管",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "机械性永久性栓塞物",
        "螺圈（coil，弹簧圈）为机械性永久性栓塞物，用于永久性栓塞。原书第12章 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于明胶海绵，下列叙述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一般使血管闭塞 24~48 小时",
      "一般使血管闭塞 2~4 周，可按需制成不同形态和大小",
      "较长时间阻塞肿瘤实质血供的外围性液态栓塞剂",
      "机械性永久性栓塞物",
      "液态高分子聚合物，可长期闭塞血管",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一般使血管闭塞 2~4 周，可按需制成不同形态和大小",
        "明胶海绵属中短期栓塞剂，一般使血管闭塞 2~4 周，可按需制成不同形态和大小。原书第12章 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "1964 年首先由 Dotter 使用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血管内支架技术",
      "球囊血管成形术",
      "激光血管成形术",
      "粥样斑块切除术",
      "使用同轴导管行血管成形术",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "使用同轴导管行血管成形术",
        "1964 年 Dotter 首先使用同轴导管行血管成形术，开创介入放射学。原书第12章 A1 型题第 4 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "近年发展最快、应用前景最广阔的技术，尤其适用于 PTA 后出现并发症者",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血管内支架技术",
      "球囊血管成形术",
      "激光血管成形术",
      "粥样斑块切除术",
      "使用同轴导管行血管成形术",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "血管内支架技术",
        "血管内支架技术近年发展最快、应用前景最广阔，尤其适用于 PTA 后出现并发症者。原书第12章 A1 型题第 5 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列术式适合治疗脾功能亢进者为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "PTA",
      "经导管血管栓塞术",
      "经导管动脉内药物灌注术",
      "经皮穿刺体腔减压术",
      "经皮针刺活检术",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "经导管血管栓塞术",
        "脾功能亢进可行部分脾动脉栓塞（经导管血管栓塞术）治疗。原书第12章 A1 型题第 6 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "介入治疗中，血管内给予尿激酶的意义是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["扩血管", "抗肿瘤", "缩血管、止血", "溶栓", "降低血液黏度"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溶栓",
        "尿激酶为纤溶酶原激活剂，血管内给予的意义在于溶栓。原书第12章 A1 型题第 7 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "经导管溶栓术的禁忌证不包括以下哪项",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "已知出血倾向",
      "消化性溃疡活动性出血期",
      "近期颅内出血及发病时间超过 48 小时的脑血栓形成",
      "严重高血压；近期接受过外科手术治疗",
      "轻度的肾功能障碍",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "轻度的肾功能障碍",
        "轻度肾功能障碍不是经导管溶栓术的绝对禁忌证；严重心、肝、肾功能不全方为禁忌。原书第12章 A1 型题第 8 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道（原书第 1 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch12-ir-intro-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述血管内支架的分类及临床应用。",
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
        "血管内支架的分类：自膨式支架、球囊扩张式支架、覆膜血管内支架。作用：用于治疗狭窄性血管病变或起到封堵血管破口、隔绝动脉瘤腔的作用。",
        "血管内支架按释放方式及结构分为自膨式、球囊扩张式及覆膜支架，用于治疗狭窄性血管病变及封堵血管破口、隔绝动脉瘤腔。原书第12章简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题（bGroups），0 组（本章 B1 配额为 0） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...fillItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
