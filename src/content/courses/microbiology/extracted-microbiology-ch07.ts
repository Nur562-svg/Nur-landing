import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第07章 细菌感染的检测方法与防治原则 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：6 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：14 题（须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 8、选择题（A1 型 17 + A2 型 3 + B1 型 3 组 6 小题）与
 *   简答题 2，无填空题。本文件按 14 道预算在原书顺序内取材：名词解释取前 4 道、简答全
 *   取；选择题取 A1 第 1~6 题；B1 取第 1 组（21~22，2 成员）完整组。正确项对齐章末
 *   参考答案键号。OCR 错字与双栏错序已按微生物学医学语义恢复（如 16S *RNA→16S rRNA、
 *   減毒→减毒、1gA1→IgA1 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch07-detection-prevention";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第07章 细菌感染的检测方法与防治原则 习题（核对PDF 第65–70页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch07-detection-prevention-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：人工免疫",
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
        "人工免疫",
        "人工免疫是指用人工的方法给机体注射或服用某种病原微生物抗原或注射特异性抗体，从而达到防治感染性疾病的目的。人工免疫可分为人工主动免疫和人工被动免疫。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：人工主动免疫",
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
        "人工主动免疫",
        "人工主动免疫是将抗原性物质接种于人体，刺激机体免疫系统产生特异性免疫应答，从而特异性预防相应病原体感染的措施。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：灭活疫苗",
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
        "灭活疫苗",
        "灭活疫苗亦称死疫苗，是用物理和（或）化学方法处理后，感染性被破坏而仍保持其免疫原性的病原微生物制备而成的一种生物制剂。常用的有预防伤寒、霍乱、百日咳、钩端螺旋体病等灭活疫苗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：减毒活疫苗",
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
        "减毒活疫苗",
        "减毒活疫苗亦称活疫苗，是通过自然筛选或人工方法获得的病原微生物的弱毒或无毒株经培养后制备而成。接种后在体内有生长繁殖能力，接近于自然感染，可激发机体对相应病原体比较持久的免疫力。如卡介苗、鼠疫耶尔森菌、炭疽芽胞杆菌等减毒活疫苗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch07-detection-prevention-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与革兰染色性状密切相关的细菌结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["核质", "细胞质", "微荚膜", "细胞膜", "细胞壁"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞壁",
        "革兰染色的结果主要取决于细菌细胞壁的结构差异：革兰阳性菌细胞壁肽聚糖层厚、脂质少，不易被乙醇脱色而呈紫色；革兰阴性菌细胞壁脂质多，易被乙醇脱色而呈红色。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "目前可用疫苗预防的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["炭疽", "梅毒", "AIDS", "登革热", "丙型肝炎"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "炭疽",
        "炭疽已有减毒活疫苗可用于预防；梅毒、AIDS、登革热、丙型肝炎目前尚无有效疫苗。原书 A1 答案第 2 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "紧急预防破伤风，应选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["破伤风类毒素", "破伤风抗毒素", "白百破三联疫苗", "破伤风菌苗", "大剂量抗生素"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "破伤风抗毒素",
        "破伤风抗毒素属于人工被动免疫制剂，用于外毒素所致疾病的紧急预防和治疗；类毒素用于主动免疫预防。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可鉴定细菌型别的试验方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["形态染色观察", "细菌的分离培养", "菌落观察", "药敏试验", "血清学鉴定"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "血清学鉴定",
        "血清学鉴定用已知的特异性抗体（诊断血清）与待检细菌反应，可鉴定细菌的种、型别，是细菌鉴定的重要方法。原书 A1 答案第 4 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在咽喉假膜中检出含异染颗粒的棒状杆菌，可初步认定的病原体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["A群链球菌", "百日咳鲍特菌", "嗜肺军团菌", "白喉棒状杆菌", "产气荚膜梭菌"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "白喉棒状杆菌",
        "白喉棒状杆菌菌体一端或两端膨大呈棒状，排列不规则，常呈 V、L 形，用奈瑟或阿培特染色可见异染颗粒，是鉴定的重要依据；白喉患者咽喉部可形成假膜。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于细菌生化反应的试验是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["糖发酵试验", "抗O试验", "V-P试验", "吲哚试验", "甲基红试验"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗O试验",
        "糖发酵试验、V-P 试验、吲哚试验、甲基红试验均属于检测细菌分解代谢产物的生化反应；抗O试验是检测血清中抗链球菌溶血素 O 抗体的血清学试验，不属于细菌生化反应。原书 A1 答案第 6 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），0 道（本章无填空题） */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch07-detection-prevention-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述进行细菌学检查的标本采集和送检过程中应遵守的原则。",
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
        "细菌学检查标本采集和送检的原则",
        "（1）早期采集：尽可能在疾病早期、急性期或症状典型时以及使用抗菌药物之前采集标本。（2）无菌采集：严格进行无菌操作，将采集的标本置于无菌容器中，避免标本被杂菌污染。（3）采集适当标本：根据不同疾病以及疾病的不同时期采集目的菌标本。（4）采集双份血清：检查病原体的特异性 IgG 抗体时，应采集急性期和恢复期双份血清，血清标本应保存在 -20°C 冰箱。（5）尽快送检：大多数细菌标本可以冷藏送检，但对某些不耐寒冷的细菌，如淋病奈瑟菌、脑膜炎奈瑟菌送检中要注意保温，最好床旁接种。（6）标本作好标记，在相应化验单上详细填写标本种类、检验目的和临床诊断，以保证各环节准确无误；标本应放在密闭不易碎的容器内送检。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch07-detection-prevention-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：病毒检测和细菌检测的方法有何区别？",
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
        "病毒检测与细菌检测的区别",
        "病毒是非细胞型微生物，必须在活细胞内才能增殖，因此与细菌检测主要在分离培养和形态观察上有较大区别：（1）病毒的观察需电子显微镜，光学显微镜只能观察细胞在某些病毒感染后形成的包涵体；细菌则常用光学显微镜观察其染色、形态和排列。（2）病毒的分离培养需用动物接种、鸡胚培养和组织细胞培养，而绝大多数细菌可用人工培养基培养。（3）培养物的鉴定：病毒多通过观察动物发病或细胞病变效应等方法；细菌则主要观察菌落特征、生化反应和血清学鉴定结果。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（题组 21~22） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch07-detection-prevention-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["外斐试验", "肥达试验", "冷凝集试验", "酶联免疫吸附试验", "抗链球菌溶素O试验"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-microbiology-ch07-detection-prevention-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "辅助诊断肠热症的试验是",
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
            "肥达试验",
            "肥达试验用已知伤寒沙门菌 O、H 抗原及副伤寒沙门菌 H 抗原的诊断菌液与受检血清作定量凝集试验，可作为肠热症的辅助诊断。原书 B1 答案第 21 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch07-detection-prevention-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "辅助诊断风湿热的试验是",
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
            "抗链球菌溶素O试验",
            "抗链球菌溶素 O 试验（ASO 试验）检测血清中抗链球菌溶血素 O 抗体，常用于风湿热的辅助诊断。原书 B1 答案第 22 题为 E。",
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
