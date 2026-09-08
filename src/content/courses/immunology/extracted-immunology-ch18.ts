import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第18章 超敏反应 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - 填空题（fill）：7 题
 * - 选择题（a1-single）：6 题（含 A2 临床病例题 2 题）
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：23 题（等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释 6、填空题 10、A1/A2 选择题 50、B1 配伍题 4 组、问答题 4。
 *   B1 型配伍题按项目规约（本书一般无 B 型配伍）不纳入本文件（extractedGroups 置空）。
 *   预算 23 = term 6 + fill 7 + a1 6 + short 4；选择 A 1 型题取 I/II/III/IV 型机制与疾病代表题，
 *   并保留 2 道 A2 临床病例（季节性过敏性鼻炎、血小板减少性出血性皮疹）的全部临床细节。
 *   正确项均对照章末参考答案键号锚定（A1 第1/3/6/16 题、A2 第49/50 题）。
 *   OCR 错字与双栏错序已按免疫学医学语义恢复：I/II/III/IV 型超敏反应、IgE/FceRI/FceRII、
 *   变应原/半抗原、Arthus 反应、免疫复合物（IC）、补体（C3a/C5a、攻膜复合体）、
 *   组胺/白三烯（LTs）/PAF/PGD2、ADCC、结核菌素试验与 DTH 等，均未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch18-hypersensitivity";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第18章 超敏反应 习题（核对PDF 第200–212页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch18-hypersensitivity-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：超敏反应",
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
        "超敏反应",
        "指机体受到某些抗原刺激时，出现生理功能紊乱或组织细胞损伤的异常适应性免疫应答，又称变态反应或过敏反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：变应原",
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
        "变应原",
        "指能够选择性地诱导机体产生特异性 IgE 抗体、引起速发型（I 型）超敏反应的抗原性物质，多为蛋白质及与蛋白质结合的小分子半抗原。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Arthus反应",
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
        "Arthus反应",
        "一种实验性局部 III 型超敏反应。1903 年 Arthus 发现用马血清经皮下反复免疫家兔数周后，再次注射马血清时，可在注射局部出现红肿、出血、坏死等剧烈炎症反应，此种现象称为 Arthus 反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：接触性皮炎",
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
        "接触性皮炎",
        "典型的接触性迟发型（IV 型）超敏反应，通常由接触小分子半抗原物质（如油漆、染料、农药、化妆品和某些药物等）引起。小分子半抗原与体内蛋白质结合成完全抗原，经朗格汉斯细胞摄取提呈给 T 细胞并刺激效应 T 细胞产生；机体再次接触相同抗原时发生以皮肤损伤（红肿、皮疹、水肿）为主要特征的 IV 型超敏反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫复合物",
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
        "免疫复合物",
        "由抗原与抗体结合形成的复合物。抗体足够量时与抗原交叉连接形成大的复合物，可被表达 Fc 受体的细胞清除；抗原量过剩时形成小的复合物，易沉积于小血管引起组织损伤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：迟发型超敏反应（DTH）",
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
        "迟发型超敏反应（IV 型超敏反应）",
        "以活化的 Th 细胞释放细胞因子和趋化因子为主介导的 IV 型超敏反应，应答通常发生在 Th 细胞接触抗原后 24~72 小时（2~3 天），以单个核细胞浸润和组织损伤为特征，与抗体和补体无关，在宿主抵抗胞内寄生微生物过程中发挥重要作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch18-hypersensitivity-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "释放介导I型超敏反应生物活性物质的主要细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["巨噬细胞", "单核细胞", "肥大细胞", "B细胞", "中性粒细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大细胞",
        "肥大细胞（以及嗜碱性粒细胞、嗜酸性粒细胞）是释放介导 I 型超敏反应生物活性介质的主要细胞。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "表达高亲和力 FceRI 的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "单核细胞、巨噬细胞",
      "中性粒细胞、肥大细胞",
      "中性粒细胞、嗜碱性粒细胞",
      "肥大细胞、嗜碱性粒细胞",
      "嗜酸性粒细胞、嗜碱性粒细胞",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大细胞、嗜碱性粒细胞",
        "高亲和力受体 FceRI 主要表达于肥大细胞和嗜碱性粒细胞表面，IgE 以其 Fc 段与之结合使机体致敏。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "介导I型超敏反应的抗体主要是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgG", "IgD", "IgE", "IgM", "IgA"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgE",
        "I 型超敏反应主要由变应原特异性 IgE 介导，IgE 经 Fc 段结合肥大细胞和嗜碱性粒细胞表面 FceRI。原书 A1 答案第 6 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列疾病属于免疫复合物（III）型超敏反应的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "过敏性休克",
      "特应性皮炎",
      "新生儿溶血症",
      "链球菌感染后肾小球肾炎",
      "肺出血肾炎综合征",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "链球菌感染后肾小球肾炎",
        "链球菌感染后肾小球肾炎属 III 型（免疫复合物型）超敏反应，免疫复合物沉积于肾小球基底膜激活补体引起组织损伤；过敏性休克为 I 型，新生儿溶血症及肺出血肾炎综合征为 II 型，特应性皮炎多与 I 型相关。原书 A1 答案第 16 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "某患者近3年来每年7月份不知原因出现大量流清鼻涕，经常夜里因鼻塞、流涕、呼吸困难以致不能正常睡眠，应首先考虑的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管哮喘", "过敏性鼻炎", "鼻窦炎", "肺内感染", "扁桃体肿大"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "过敏性鼻炎",
        "症状呈季节性（每年 7 月）发作，以大量流清涕、鼻塞、流涕伴夜间呼吸困难为主要表现，符合吸入性变应原（花粉）诱发的 I 型超敏反应性过敏性鼻炎。原书 A2 答案第 49 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "某患者近8个月来周身多处反复出现出血性皮疹，用糖皮质激素类药物治疗皮疹可消失，停药后复发；血常规示血小板明显减少，骨髓穿刺检查正常。初步诊断为超敏反应性疾病，其可能发生机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "III型超敏反应",
      "I型超敏反应",
      "IV型超敏反应",
      "II型超敏反应",
      "I型超敏反应和III型超敏反应",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "II型超敏反应",
        "血小板明显减少伴出血性皮疹、骨髓穿刺正常，符合自身免疫性血小板减少症，由抗血小板（细胞毒型/细胞溶解）抗体介导，属 II 型超敏反应。原书 A2 答案第 50 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），7 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch18-hypersensitivity-fill001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "超敏反应是一种能够引起机体___或/和___的免疫应答。",
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
        "组织损伤、功能紊乱",
        "超敏反应是机体受抗原刺激时出现生理功能紊乱或组织细胞损伤的异常适应性免疫应答。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-fill002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "根据超敏反应的发生机制和临床特点，可将其分成四型。I型超敏反应又称___型超敏反应，II型超敏反应又称___型超敏反应，III型超敏反应又称___型超敏反应，IV型超敏反应又称___型超敏反应。",
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
        "过敏反应（速发型）、细胞毒或溶细胞、免疫复合物或血管炎、迟发型",
        "I 型又称过敏反应（速发型），II 型又称细胞毒型或溶细胞型，III 型又称免疫复合物型或血管炎型，IV 型又称迟发型超敏反应。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-fill003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "FceRI主要存在于___和___膜表面。",
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
        "肥大细胞、嗜碱性粒细胞",
        "高亲和力 FceRI 主要表达于肥大细胞和嗜碱性粒细胞表面。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-fill004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "青霉素的降解产物属于一种___，与人体组织蛋白结合可获得___性。",
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
        "半抗原（半抗原物质）、免疫原",
        "青霉素降解产物本身为小分子半抗原，无免疫原性，与体内组织蛋白共价结合形成完全抗原后方有免疫原性，能诱导 I 型超敏反应。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-fill005",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "II型超敏反应是由___类抗体与靶细胞表面抗原结合，在___、___和___参与下，造成以___为主的病理损伤。",
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
        "IgG或IgM、补体、巨噬细胞、NK细胞、细胞溶解",
        "II 型超敏反应由抗细胞表面/细胞外基质抗原的特异性 IgG 或 IgM 与靶细胞表面抗原结合，在补体、巨噬细胞、NK 细胞参与下导致细胞溶解为主的病理损伤。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-fill006",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "III型超敏反应是血清中可溶性抗原与___结合形成中等大小的免疫复合物，在一定条件下沉积在组织，通过激活___，在___、___和___等细胞的参与下引起的组织损伤。",
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
        "IgG或IgM、补体、嗜碱性粒细胞、血小板、中性粒细胞",
        "III 型超敏反应中可溶性抗原与相应 IgG 或 IgM 结合形成中等大小可溶性免疫复合物，沉积组织激活补体，在嗜碱性粒细胞、血小板、中性粒细胞等参与下引起炎症与组织损伤。原书填空题第 6 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-fill007",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "IV型迟发型超敏反应是由___再次接触___于24~72小时后发生的，形成以___浸润为主的炎症反应。",
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
        "致敏T细胞、相同抗原、单个核细胞",
        "IV 型超敏反应由致敏 T 细胞再次接触相同抗原后 24~72 小时发生，为效应 T 细胞介导的以单个核细胞浸润为主的炎症反应。原书填空题第 7 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch18-hypersensitivity-short001",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：青霉素引起的过敏性休克和吸入花粉引起的支气管哮喘属于哪一型超敏反应？其发病机制如何？简述其防治方法和原理。",
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
        "I 型超敏反应的机制与防治",
        "二者均属 I 型超敏反应。①机制：青霉素具有抗原表位但本身无免疫原性，其降解产物青霉噻唑醛酸（或青霉烯醛酸）与体内组织蛋白共价结合形成青霉噻唑（或青霉烯）蛋白后，刺激机体产生特异性 IgE，使肥大细胞和嗜碱性粒细胞致敏；再次接触该结合蛋白时，变应原交联靶细胞表面特异性 IgE 分子、触发 FceRI 交联、细胞脱颗粒释放生物活性介质，引起过敏反应甚至过敏性休克。吸入花粉后肥大细胞与嗜碱性粒细胞释放活性物质、支气管平滑肌痉挛，发生过敏性哮喘。②防治：查明变应原、避免接触（如青霉素皮试）；异种免疫血清脱敏疗法（小剂量、短间隔多次注射抗毒素血清，介质少、无累积效应，为暂时性脱敏）；特异性变应原脱敏疗法（小剂量、间隔较长时间反复皮下注射变应原，诱导大量特异性 IgG 阻断变应原与 IgE 结合）。原书问答题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-short002",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：在II型和III型超敏反应性疾病的发生过程中，其参与因素有何异同？请举例说明。",
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
        "II 型与 III 型超敏反应参与因素的异同",
        "相同点：两者都有 IgG 或 IgM 抗体参与，IgG 或 IgM 抗体与相应抗原结合后引起一系列免疫反应。不同点：II 型中超敏反应抗体与靶细胞膜表面抗原结合后，通过激活补体引起靶细胞溶解破坏，或 Fc 段与 NK 细胞表面受体结合后经调理吞噬和/或 ADCC 溶解、破坏靶细胞，补体主要作用是破坏靶细胞；III 型中 IgG 或 IgM 抗体与血液循环中可溶性抗原结合形成可溶性免疫复合物沉积于组织引起损伤，补体作用主要是促使肥大细胞或嗜碱性粒细胞释放组胺等炎性介质、使毛细血管通透性增高。例：II 型如肺出血肾炎综合征（抗基底膜自身 IgG 抗体同时作用于肺泡基底膜与肾小球基底膜，经补体或调理导致肺出血和肾炎）；III 型如链球菌感染后肾小球肾炎（抗体与链球菌可溶性抗原形成循环免疫复合物沉积于肾小球基底膜，引起免疫复合物型肾炎）。原书问答题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-short003",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：请以结核杆菌感染为例，试述IV型超敏反应的发生机制与其他三型有何不同。",
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
        "IV 型超敏反应与他型的不同",
        "结核杆菌感染属于 IV 型（迟发型）超敏反应。与其他三型最大的不同是前 I、II、III 型超敏反应都有抗体与补体参与，而 IV 型超敏反应由抗原诱导的效应 T 细胞介导，效应细胞与特异性抗原结合后引起以单个核细胞浸润和组织损伤为主要特征的炎症反应。IV 型发生较慢，通常在接触相同抗原后 24~72 小时出现炎症反应，与抗体和补体无关，而与效应 T 细胞和吞噬细胞及其产生的细胞因子或细胞毒性介质有关。原书问答题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch18-hypersensitivity-short004",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：应用II型超敏反应发生机理，解释新生儿溶血症。",
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
        "新生儿溶血症的 II 型超敏反应机制",
        "Rh 阴性母亲因输血、流产或分娩等原因接受红细胞表面 Rh 抗原刺激后产生抗 Rh 抗体，此类免疫血型抗体为 IgG 类，可通过胎盘。当体内产生抗 Rh 抗体的母亲妊娠或再次妊娠，且胎儿血型为 Rh 阳性时，母体抗 Rh 抗体可经胎盘进入胎儿体内，与其红细胞表面 Rh 抗原结合，激活补体或经调理吞噬使红细胞溶解破坏，引起流产或新生儿溶血症。原书问答题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题：本书一般无 B 型配伍，置空 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];