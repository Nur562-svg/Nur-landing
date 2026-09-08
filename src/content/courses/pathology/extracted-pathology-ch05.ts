import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 病理学学习指导与习题集 — 第5章 免疫性疾病 题库提取（等比取样）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：13 题
 * - 选择题（a1-single）：3 题（含 A1 型、A2 型病例题）
 * - 判断题 + 问答题（short-answer）：8 题（判断题 2、问答题 6）
 * - B1 配伍题：0 组（本书无 B1 型）
 * - 独立记分题合计：24 题（须等于本文件预算 24）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、判断题、选择题（A1/A2）、问答题；本文件按 24 道预算在
 *   原书顺序内取材：名词解释取第 1–13 题（全取）、A1 型取第 1–2 题、A2 型取第 1 题
 *   （原书第 31 题）、判断题取第 1–2 题、问答题取第 1–6 题（全取）；未纳入的题因预算
 *   所限。正确项对齐章末参考答案键号（A1/A2 各小节独立编号），选项已随机重排并同步
 *   correctChoiceIndex。判断题答案按 √/× 键号归位（√=对、×=错）。OCR 错字已按
 *   病理学医学语义恢复（如 暴簬→暴露、植人→植入、抗核抗体（=）→抗核抗体（-）、
 *   theumatoid→rheumatoid 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pathology-ch05-immune-diseases";
const locatorBase =
  "《病理学学习指导与习题集》 第5章 免疫性疾病 习题（核对PDF 第71–82页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），13 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：自身免疫病（autoimmune disease）",
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
        "自身免疫病是指由机体自身产生的自身抗体或致敏淋巴细胞，破坏自身组织和细胞，导致组织和器官功能障碍的原发性免疫性疾病。",
        "自身免疫耐受性的丧失是自身免疫病发生的根本机制。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：狼疮小体（LE body）",
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
        "在系统性红斑狼疮时，抗核抗体与变性或胞膜受损的细胞核接触，导致细胞核肿胀呈均质一片，并被挤出胞体，形成狼疮小体（又称苏木素小体），为诊断 SLE 的特征性依据。",
        "狼疮小体对中性粒细胞和巨噬细胞有趋化作用，在补体存在时可促进细胞的吞噬作用。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：狼疮细胞（LE cell）",
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
        "狼疮细胞是指吞噬了狼疮小体的中性粒细胞或巨噬细胞。",
        "狼疮细胞的出现是系统性红斑狼疮的重要特征。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：类风湿关节炎（rheumatoid arthritis）",
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
        "类风湿关节炎是以多发性和对称性关节非化脓性增生性滑膜炎为主要表现的慢性全身性自身免疫病。",
        "手足小关节为最常见受累部位，晚期可致关节强直畸形。原书名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血管翳（pannus）",
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
        "高度血管化、炎细胞浸润、增生的滑膜覆盖于关节软骨表面形成血管翳。",
        "血管翳可破坏关节软骨，最终导致关节纤维化和钙化，引起永久性关节强直。原书名词解释第 5 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：类风湿小结（rheumatoid nodule）",
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
        "类风湿小结由小结中央大片纤维素样坏死，周围呈栅栏状或放射状排列的上皮样细胞以及外围的肉芽组织共同构成。",
        "类风湿小结是类风湿关节炎的特征性病变之一。原书名词解释第 6 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：口眼干燥综合征（Sjogren syndrome）",
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
        "口眼干燥综合征是指由于唾液腺、泪腺受免疫损伤，从而引起临床以眼干、口干表现为特征的自身免疫病。",
        "患者血清中可检出抗 SS-A 和抗 SS-B 抗体，对诊断有参考价值。原书名词解释第 7 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：系统性硬化（systemic sclerosis）",
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
        "系统性硬化是以全身多个器官间质纤维化和炎症性改变为特征，主要累及皮肤，以往称为硬皮病。",
        "系统性硬化皮肤病变自四肢末端向心性发展，可累及消化道、肾等器官。原书名词解释第 8 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：CREST 综合征（CREST syndrome）",
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
        "在系统性硬化的皮肤病变中，出现钙化、雷诺现象、食管蠕动障碍、手指硬化和毛细血管扩张的表现。",
        "CREST 为钙化、雷诺现象、食管蠕动障碍、手指硬化、毛细血管扩张英文首字母的缩写。原书名词解释第 9 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：皮肌炎（dermatomyositis）",
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
        "皮肌炎是一种主要累及皮肤和肌肉，以临床上皮肤出现典型红疹及对称性缓慢进行性肌无力为特征的自身免疫病。",
        "肌束周边肌萎缩为皮肌炎的典型表现。原书名词解释第 10 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term011",
    order: 11,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫缺陷病（immune deficiency diseases）",
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
        "免疫缺陷病是一组因免疫系统发育不全或因其他疾病而遭受损害引起免疫功能缺陷而导致的疾病。",
        "免疫缺陷病分为原发性（先天性）和继发性（获得性）两大类。原书名词解释第 11 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term012",
    order: 12,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：获得性免疫缺陷综合征（acquired immunodeficiency syndrome）",
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
        "获得性免疫缺陷综合征是由一种逆转录病毒即人类免疫缺陷病毒（HIV）感染引起，其特征为免疫功能缺陷伴机会性感染和（或）继发性肿瘤。",
        "HIV 主要感染 CD4+T 细胞和单核巨噬细胞，导致严重免疫抑制。原书名词解释第 12 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-term013",
    order: 13,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：移植（transplantation）",
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
        "移植是指机体的某种细胞、组织或器官因某些病变或疾病的损伤而导致不可复性结构及功能损害时，采用相应健康细胞、组织或器官植入机体的过程，统称移植。",
        "根据供体来源可分为自体移植、同种异体移植和异种移植三类。原书名词解释第 13 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），3 道（A1 型 2、A2 型病例题 1） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-a1001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "导致自身免疫病发生的因素有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "外来抗原与自身组织不存在共同抗原",
      "体内隐蔽抗原的隔离",
      "T淋巴细胞“免疫不应答”功能丧失",
      "Tr 细胞功能过强或Th 细胞功能过低",
      "微生物不引起机体自身抗原表位改变",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T淋巴细胞“免疫不应答”功能丧失",
        "导致自身免疫耐受丧失的因素包括 T 淋巴细胞“免疫不应答”功能丧失、活化诱导的细胞死亡功能丧失、Tr 细胞与 Th 细胞功能失衡、共同抗原诱发交叉反应、隐蔽抗原释放等。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-a1002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "自身免疫性病的特点包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "有自身抗体存在，就是自身免疫性疾病",
      "协同刺激分子不表达",
      "无家族聚集倾向",
      "活化诱导的细胞死亡功能丧失",
      "T细胞外周抑制",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "活化诱导的细胞死亡功能丧失",
        "活化诱导的细胞死亡功能丧失时，T 细胞激活不能诱导细胞凋亡，自身反应性 T 细胞在外周淋巴组织中持续增殖，是自身免疫病的特点之一。原书 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-a1003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者女性，45岁，反复低热，伴双腕、双手近端指间关节、掌指关节肿痛2年。查体：双腕、双手2~4掌指关节及3~4指间关节肿胀、压痛（+），抗核抗体（-），RF（+）。最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "链球菌感染引起的关节炎",
      "结核菌感染引起的关节炎",
      "系统性红斑狼疮",
      "类风湿关节炎",
      "风湿性关节炎",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "类风湿关节炎",
        "患者为中年女性，对称性手足小关节肿痛 2 年，RF（+），抗核抗体（-），符合类风湿关节炎的临床特点。原书 A2 型题第 1 题（原书第 31 题），参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断题 + 问答题（short-answer），8 道（判断题 2、问答题 6） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：Tr 细胞功能过强或Th细胞功能过低时，可致自身免疫病的发生。",
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
        "错。应为 Tr 细胞功能过低或 Th 细胞功能过强时，可产生大量自身抗体，导致自身免疫病的发生。",
        "Tr 细胞与 Th 细胞功能失衡时，当 Tr 细胞功能过低或 Th 细胞功能过强，则可产生大量自身抗体。原书判断题第 1 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：免疫耐受的丧失和隐蔽抗原的暴露可致自身免疫病的发生。",
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
        "对。免疫耐受的丧失和隐蔽抗原的暴露均可导致自身免疫病的发生。",
        "自身免疫耐受性的丧失是自身免疫病发生的根本机制，隐蔽抗原释放可引起自身免疫反应。原书判断题第 2 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述自身免疫病的发病机制。",
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
        "自身免疫耐受性的丧失是自身免疫病发生的根本机制，其确切原因尚未完全阐明，可能与遗传因素和组织改变有关，通常由于感染或组织损伤而改变或暴露自身抗原，引发免疫应答。①免疫耐受的丧失和隐蔽抗原的暴露：包括 T 淋巴细胞“免疫不应答”功能丧失、活化诱导的细胞死亡功能丧失、Tr 细胞与 Th 细胞功能失衡、共同抗原诱发交叉反应、隐蔽抗原释放；②遗传因素：与自身免疫病的易感性密切相关；③感染、组织损伤和其他因素：各种微生物感染，以及紫外线、吸烟、局部组织损伤可致自身抗原的改变和释放诱发自身免疫反应；自身免疫病多见于女性，提示女性激素可能对某些自身免疫病有促进发生的作用。",
        "原书问答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：自身免疫病可分为哪几个类型？常见的多器官、组织受累的自身免疫病包括哪些？",
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
        "①自身免疫病的类型：可分为器官或细胞特异性和系统性自身免疫病两种类型；②常见的多器官、组织受累的自身免疫病：包括系统性红斑狼疮、类风湿性关节炎、口眼干燥综合征、炎性肌病、系统性硬化、结节性多动脉炎、IgG4 相关性疾病。",
        "原书问答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short005",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述系统性红斑狼疮的组织损伤机制、基本病变及皮肤损害。",
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
        "①损伤机制：SLE 的组织损伤与自身抗体的存在有关，多数内脏病变为免疫复合物所介导（Ⅲ型超敏反应），其中主要为 DNA-抗 DNA 复合物沉积所致的血管和肾小球病变；其次为特异性抗红细胞、粒细胞、血小板自身抗体，经Ⅱ型超敏反应导致相应血细胞的损伤和溶解，引起全血细胞减少。抗核抗体能攻击变性或胞膜受损的细胞，与细胞核接触后导致细胞核肿胀呈均质一片并被挤出胞体，形成狼疮小体（苏木素小体），为诊断 SLE 的特征性依据；②基本病变：病变多样，急性坏死性小动脉炎、细动脉炎是基本病变，活动期病变以纤维素样坏死为主，慢性期血管壁纤维化伴管腔狭窄，血管周围淋巴细胞浸润伴水肿及基质增加；③皮肤损害：约 80% 的 SLE 患者有不同程度的皮肤损害，50% 可表现为面部蝶形红斑。免疫荧光显示真皮与表皮交界处有 IgG、IgM 及补体 C3 的沉积，形成“狼疮带”，对本病有诊断意义。",
        "原书问答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short006",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述类风湿性关节炎关节的病理变化。",
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
        "手足小关节为最常见部位，肘、腕、膝、踝、髋及脊椎等也可被累及，多为多发性及对称性。受累关节组织学表现为慢性滑膜炎：①滑膜细胞肥大增生，呈多层，有时可形成绒毛状突起；②滑膜下结缔组织多量淋巴细胞、巨噬细胞和浆细胞浸润，可见淋巴滤泡形成；③大量新生血管形成；④滑膜及关节面覆盖大量的纤维素和中性粒细胞，纤维素可被机化；⑤破骨细胞功能活跃，骨破坏，滑膜组织向骨内长入；⑥高度血管化、炎细胞浸润、增生的滑膜覆盖于关节软骨表面形成血管翳。最终血管翳充满关节腔，发生纤维化和钙化，引起永久性关节强直。",
        "原书问答题第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short007",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 AIDS 的传播途径和病理变化。",
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
        "①传播途径：性接触传播（目前全球 HIV 感染者中 3/4 是通过异性性接触感染）、血道传播、母-婴传播、医务人员职业性传播；②病理变化：淋巴组织的变化——早期淋巴结肿大，淋巴滤泡增生，生发中心活跃，髓质内浆细胞增多；随后滤泡外层淋巴细胞减少或消失，小血管增生，生发中心被分割，副皮质区浆细胞浸润；晚期淋巴结内淋巴细胞几乎消失殆尽，仅见一些巨噬细胞和浆细胞残留；继发性感染——多发机会性感染是本病的特点，以中枢神经系统、肺、消化道受累最为常见，常见感染有肺孢子虫、弓形虫、新型隐球菌等；恶性肿瘤——常见的有 Kaposi 肉瘤、淋巴瘤等。",
        "原书问答题第 5 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch05-immune-diseases-short008",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：以肾脏为例简述超急性排斥反应、急性排斥反应和慢性排斥反应的病理变化。",
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
        "①超急性排斥反应：以广泛分布的急性小动脉炎、血栓形成和由此而引起的组织缺血性坏死为特征。移植肾肉眼观色泽由粉红色迅速转变为暗红色，伴出血或梗死，出现花斑状外观；镜下表现为广泛的急性小动脉炎伴血栓形成及缺血性坏死。②急性排斥反应：以细胞免疫为主者主要表现为间质内单个核细胞浸润，以体液免疫为主者以血管炎为特征，有时两种病变可同时存在。细胞型排斥反应可见肾间质明显水肿，CD4+ 和 CD8+T 细胞为主的单个核细胞浸润，并侵袭肾小管壁，导致肾小管炎，引起局部肾小管坏死，也可出现血管炎及血管壁坏死；血管型排斥反应为抗体及补体的沉积引起血管损伤，随后出现血栓形成及相应部位的梗死，更常出现亚急性血管炎，表现为成纤维细胞、平滑肌细胞和泡沫状巨噬细胞增生引起血管内膜增厚，常导致管腔狭窄或闭塞。③慢性排斥反应：突出病变是血管内膜纤维化，引起管腔严重狭窄，从而导致肾缺血，形态表现为肾小球萎缩、纤维化、玻璃样变，肾小管萎缩，肾间质除纤维化表现外，同时有单核细胞、淋巴细胞及浆细胞浸润。",
        "原书问答题第 6 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1/B2 组题（bGroups）：本书无 B1/B2 型，为空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
