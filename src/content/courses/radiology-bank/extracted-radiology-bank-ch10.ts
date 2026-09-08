import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学影像学学习指导与习题集 第3版 — 第10章 儿科影像诊断学 题库提取（等比取样）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：9 题（A1 型 8、A2 型病例题 1）
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：0 组 / 0 成员
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、填空题、选择题（A1/A2/B1）、简答题；本文件按 15 道预算在
 *   原书顺序内取材：名词解释取第 1–2 题、填空题取第 1–2 题、A1 型取第 1–8 题、A2 型取第
 *   22 题（即 A2 第 1 题）、简答题取第 1–2 题；本章原书 B 型题 1 组（第 24–29 题）因配额为
 *   0 未纳入；未纳入的题因预算所限。正确项对齐章末参考答案键号（A1/A2/B1 全书连续编号），
 *   选项已随机重排并同步 correctChoiceIndex。OCR 错字已按医学影像学医学语义恢复（如
 *   T,WI→T1WI、T2WI、病麥→病眼、嵌乏→缺乏、套萱→套叠、吸人→吸入、腸→肠 等），数值
 *   与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "radiology-bank-ch10-pediatrics";
const locatorBase =
  "《医学影像学学习指导与习题集》第3版 第10章 儿科影像诊断学 习题（核对PDF 第161–166页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道（原书第 1–2 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：新生儿缺氧缺血性脑病",
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
        "新生儿缺氧缺血性脑病：由于新生儿窒息，引起脑供血和能量代谢异常所致的一种全脑性损伤。",
        "新生儿缺氧缺血性脑病由窒息致脑供血和能量代谢异常引起，为全脑性损伤，早产儿与足月儿病理改变不同。原书第10章名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：胚胎脑病",
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
        "胚胎脑病：病原体通过胎盘感染胎儿造成的神经系统损害。",
        "胚胎脑病为病原体经胎盘感染胎儿引起的神经系统损害，CT 可见室管膜下及皮层下白质多发斑点样钙化。原书第10章名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），2 道（原书第 1–2 题） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "填空题：早产儿缺氧缺血性脑病，主要病理改变包括____、____、____和____。",
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
        "第1空：生发基质出血；第2空：脑室旁出血性脑梗死；第3空：脑室周围白质软化；第4空：脑梗死。",
        "早产儿缺氧缺血性脑病主要病理改变包括生发基质出血、脑室旁出血性脑梗死、脑室周围白质软化和脑梗死。原书第10章填空题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "填空题：足月儿缺氧缺血性脑病，主要病理改变包括____、____、____和____。",
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
        "第1空：矢状旁区脑损伤；第2空：基底节和丘脑损伤；第3空：颅内出血；第4空：脑梗死。",
        "足月儿缺氧缺血性脑病主要病理改变包括矢状旁区脑损伤、基底节和丘脑损伤、颅内出血及脑梗死。原书第10章填空题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），9 道（A1 型原书第 1–8 题、A2 型原书第 22 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "小儿胸部、骨骼的首选检查方法为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CT", "MRI", "X线片", "DSA", "超声"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "X线片",
        "小儿胸部、骨骼检查首选 X 线片，简便、快速、辐射剂量相对较低。原书第10章 A1 型题第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下哪种病理性改变主要见于足月儿缺氧缺血性脑病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑室旁出血性脑梗死",
      "脑室周围胶质瘢痕形成",
      "生发基质出血",
      "基底节/丘脑损伤",
      "脑室周围白质软化",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基底节/丘脑损伤",
        "基底节/丘脑损伤主要见于足月儿缺氧缺血性脑病，而生发基质出血、脑室周围白质软化等多见于早产儿。原书第10章 A1 型题第 2 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于早产儿视网膜病，以下描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "双眼对称性发病",
      "眼球增大",
      "钙化多见",
      "视网膜脱离",
      "仅单眼发病",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "视网膜脱离",
        "早产儿视网膜病可发生视网膜脱离，多为双眼发病、钙化少见，区别于视网膜母细胞瘤。原书第10章 A1 型题第 3 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于视网膜母细胞瘤，以下描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "白瞳症",
      "眼球内肿块伴钙化",
      "3 岁以下儿童多见",
      "增强后软组织成分强化较显著",
      "病眼眼球变小",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病眼眼球变小",
        "视网膜母细胞瘤眼球多增大（青光眼期），而非变小，该项描述错误。原书第10章 A1 型题第 4 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于新生儿呼吸窘迫综合征，以下描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肺表面活性物质缺乏",
      "进行性呼吸困难",
      "足月儿多见",
      "肺透明膜病",
      "呼气性肺泡萎陷",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "足月儿多见",
        "新生儿呼吸窘迫综合征以早产儿多见，因肺表面活性物质缺乏所致，故“足月儿多见”描述错误。原书第10章 A1 型题第 5 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于支气管异物，以下描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "合并肺气肿",
      "左主支气管多见",
      "继发肺感染",
      "纵隔移位",
      "单侧多见",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "左主支气管多见",
        "支气管异物多坠入较陡直粗短的右主支气管，故“左主支气管多见”描述错误。原书第10章 A1 型题第 6 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "新生儿期最常见的发绀性先天性心脏病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "室间隔缺损",
      "完全性大动脉转位",
      "动脉导管未闭",
      "完全性肺静脉畸形引流",
      "房间隔缺损",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "完全性大动脉转位",
        "完全性大动脉转位是新生儿期最常见的发绀型先天性心脏病。原书第10章 A1 型题第 7 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "完全性肺静脉畸形引流，首选检查方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["CTA", "超声心动图", "DSA", "MRA", "X线片"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "超声心动图",
        "完全性肺静脉畸形引流首选超声心动图检查，可无创显示肺静脉引流情况。原书第10章 A1 型题第 8 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "孕 32 周早产，窒息复苏后气促 1 小时，生后 Apgar 评分 6-8-9 分。床旁 X 线表现为两肺透过度明显减低，呈“白肺”改变，支气管充气征显著，纵隔、心缘模糊不清。考虑为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "新生儿肺炎",
      "新生儿湿肺",
      "新生儿肺出血",
      "新生儿呼吸窘迫综合征",
      "新生儿吸入综合征",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "新生儿呼吸窘迫综合征",
        "早产儿生后进行性气促，X 线示两肺“白肺”样透过度减低伴支气管充气征，符合新生儿呼吸窘迫综合征。原书第10章 A2 型题第 22 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道（原书第 1–2 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "请叙述早产儿生发基质出血的影像学分级。",
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
        "早产儿生发基质出血的影像学分级分为四级：Ⅰ级为室管膜下血肿；Ⅱ级为血肿破入脑室内，不伴有脑室扩张；Ⅲ级为血肿破入脑室内，伴有脑室扩张；Ⅳ级为脑室旁出血性脑梗死。",
        "生发基质出血按血肿部位与脑室受累程度分四级，Ⅳ级伴脑室旁出血性脑梗死，预后最差。原书第10章简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch10-pediatrics-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "请叙述胚胎脑病的 CT 表现。",
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
        "胚胎脑病的 CT 表现：①室管膜下和皮层下白质内多发斑点样钙化为本病特征性表现。②中早期感染可见小头畸形，白质体积减少，脑室扩张，局部脑回粗大、皮质增厚，小脑发育不良。③后期感染可见局部白质密度减低。",
        "胚胎脑病 CT 特征为室管膜下及皮层下白质多发斑点样钙化，并随感染时期不同出现脑发育畸形或白质密度改变。原书第10章简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，0 组（本章原书 1 组第 24–29 题，因配额为 0 未纳入） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
