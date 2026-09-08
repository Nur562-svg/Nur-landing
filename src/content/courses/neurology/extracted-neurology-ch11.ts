import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第11章 神经系统变性疾病 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：10 题（含 A2 病例题 1 题、A3/A4 病例串题 3 题）
 * - 问答题（short-answer）：6 题（含简答、论述）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：21 题（须等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 18、A2 型 1、A3/A4 型 6（2 组病例串）、B1 型 3 组 11 成员、
 *   简答题 15、论述题 6、病例分析题 1。本文件按 21 道预算在原书顺序内取材：A1 取第
 *   1~6 题、A2 取第 1 题、A3/A4 取第 1 组病例串（1~3 题）、简答取第 1~4 题、论述取
 *   第 1~2 题、病例分析全取，B1 取第 1 组（1~4）完整组。正确项逐一对齐章末参考答案
 *   键号。OCR 错字与双栏错序已按神经病学医学语义恢复（如 力→为、祝空间→视空间、
 *   洽疗→治疗、认力→认为、行异常→行为异常、培言→构音、颗叶→颞叶、肌菱缩→肌萎缩、
 *   肌束震颇→肌束震颤 等），数值与分子标记（MMSE、CDR、HAMD、Hachinski、NINCDS-
 *   ADRDA、NIA-AA、APP、PS1、PS2、APOE、TDP-43、MRI、PET、SPECT）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch11-neurodegenerative-disease";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第11章 神经系统变性疾病 习题（核对PDF 第206–220页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "运动神经元病中最常见的类型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "进行性肌萎缩",
      "肌萎缩侧索硬化",
      "进行性延髓麻痹",
      "原发性侧索硬化",
      "脊肌萎缩症",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肌萎缩侧索硬化",
        "肌萎缩侧索硬化（ALS）是运动神经元病中最常见的类型，上、下运动神经元均受累。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不符合运动神经元病表现的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肌萎缩",
      "锥体束征",
      "感觉障碍",
      "延髓麻痹",
      "肌束颤动",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "感觉障碍",
        "运动神经元病通常感觉系统不受累，表现为肌无力、肌萎缩、肌束颤动、延髓麻痹及锥体束征的不同组合。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于运动神经元病的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肌萎缩侧索硬化",
      "进行性肌萎缩",
      "脊肌萎缩症",
      "原发性侧索硬化",
      "进行性延髓麻痹",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脊肌萎缩症",
        "运动神经元病包括肌萎缩侧索硬化、进行性肌萎缩、进行性延髓麻痹和原发性侧索硬化四型；脊肌萎缩症属于脊髓前角运动神经元变性病，不属于上述运动神经元病范畴。原书 A1 答案第 3 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "运动神经元病中，脑干的运动神经核一般不受累及的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "舌下神经核",
      "迷走神经背核",
      "动眼神经核",
      "面神经核",
      "疑核",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "动眼神经核",
        "运动神经元病以舌下神经核受累最为突出，疑核、三叉神经运动核、迷走神经背核和面神经核也受累及，动眼神经核则很少被累及。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下不属于神经系统变性病的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "阿尔茨海默病",
      "多系统萎缩",
      "肝豆状核变性",
      "帕金森病",
      "进行性核上性麻痹",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝豆状核变性",
        "阿尔茨海默病、帕金森病、多系统萎缩、进行性核上性麻痹均属于神经系统变性病；肝豆状核变性属于遗传性铜代谢障碍性疾病。原书 A1 答案第 5 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对于诊断运动神经元病价值最大的检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "磁共振检查",
      "脑脊液检查",
      "肌电图",
      "肌肉活检",
      "血液检查",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肌电图",
        "肌电图对运动神经元病具有很高的诊断价值，呈典型的神经源性损害。原书 A1 答案第 6 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "女性，78 岁，5 年前逐渐出现记忆力减退，逐渐加重，出门经常找不到家，近 2 年来生活渐渐不能自理，神经系统检查未见局灶性神经系统体征，MMSE 评分 8 分，头 MRI 显示脑萎缩，实验室检查未见异常。根据 NINCDS-ADRDA 的国际标准，该患者的诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "确定的 Alzheimer 病",
      "血管性痴呆",
      "可能性大的 Alzheimer 病",
      "可能的 Alzheimer 病",
      "路易体痴呆",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "可能性大的 Alzheimer 病",
        "老年女性隐袭起病、进行性加重的记忆力减退与全面智能衰退，无局灶性神经系统体征，MMSE 评分 8 分，MRI 示脑萎缩，实验室检查未见异常，符合 NINCDS-ADRDA 很可能（可能性大的）AD 的标准。原书 A2 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "（共用题干）男性，45 岁，双手骨间肌及大小鱼际肌肌肉萎缩 1 年，双手指活动不灵 3 个月，查体双手远端肌力 4 级，双手骨间肌及大小鱼际肌肌肉萎缩，以右侧为重，无感觉障碍，四肢腱反射活跃，双病理征阳性。此患者的首选检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "头 CT",
      "脑电图",
      "肌电图",
      "肌肉活检",
      "颈髓 MRI",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肌电图",
        "双手肌肉萎缩、无力伴腱反射活跃及病理征阳性，无感觉障碍，考虑运动神经元病可能，首选肌电图检查。原书 A3/A4 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "（共用题干）男性，45 岁，双手骨间肌及大小鱼际肌肌肉萎缩 1 年，双手指活动不灵 3 个月，查体双手远端肌力 4 级，双手骨间肌及大小鱼际肌肌肉萎缩，以右侧为重，无感觉障碍，四肢腱反射活跃，双病理征阳性。若肌电图显示神经源性改变，可见纤颤电位和正锐波，神经传导速度正常，考虑可能性大的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "周围神经病",
      "多灶性运动神经病",
      "运动神经元病",
      "脊髓型颈椎病",
      "脊肌萎缩症",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "运动神经元病",
        "肌电图呈神经源性改变、可见纤颤电位和正锐波，神经传导速度正常，结合上、下运动神经元损害并存而无感觉障碍，考虑运动神经元病可能性大。原书 A3/A4 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-a1010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "（共用题干）男性，45 岁，双手骨间肌及大小鱼际肌肌肉萎缩 1 年，双手指活动不灵 3 个月，查体双手远端肌力 4 级，双手骨间肌及大小鱼际肌肌肉萎缩，以右侧为重，无感觉障碍，四肢腱反射活跃，双病理征阳性。首选的药物治疗是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "B 族维生素",
      "利鲁唑",
      "丙种球蛋白",
      "皮质激素",
      "新型钙通道阻滞剂",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "利鲁唑",
        "利鲁唑（riluzole）可延缓病程、延长延髓麻痹患者的生存期，是运动神经元病（肌萎缩侧索硬化）的首选治疗药物之一。原书 A3/A4 答案第 3 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer，含简答、论述），6 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是神经系统变性疾病？",
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
        "神经系统变性疾病的定义",
        "神经系统变性疾病是一组原因不明的慢性进行性的损害中枢神经系统的疾病，有时可累及周围神经系统。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "神经系统变性病的共同特点是什么？",
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
        "神经系统变性病的共同特点",
        "①多选择性损害特定的解剖结构和特定的神经元；②起病相对隐袭，缓慢进行性加重；③多具有家族聚集性，可分为家族性和散发性；④治疗相对困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是运动神经元病？",
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
        "运动神经元病的定义",
        "运动神经元病是一系列以上、下运动神经元损害为突出表现的慢性进行性神经系统变性疾病。临床表现为上、下运动神经元损害的不同组合，特征表现为肌无力和萎缩、延髓麻痹及锥体束征；通常感觉系统和括约肌功能不受累。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-short004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "运动神经元病分为几型？",
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
        "运动神经元病的分型",
        "运动神经元病共分四种类型：损害仅限于脊髓前角细胞，表现为无力和肌萎缩而无锥体束征者，为进行性肌萎缩；单独损害延髓运动神经核而表现为咽喉肌和舌肌无力、萎缩者，为进行性延髓麻痹；仅累及锥体束而表现为无力和锥体束征者为原发性侧索硬化；如上、下运动神经元均有损害，表现为肌无力、肌萎缩和锥体束征者，则为肌萎缩侧索硬化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-short005",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "肌萎缩侧索硬化的主要临床表现是什么？",
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
        "肌萎缩侧索硬化的主要临床表现",
        "肌萎缩侧索硬化上、下运动神经元均有损害，表现为肌无力、肌萎缩和锥体束征：①发病年龄多在 30~60 岁之间，男性多于女性；②首发症状为一侧或双侧手指活动笨拙、无力，随后出现手部小肌肉萎缩，逐渐延及前臂、上臂和肩胛带肌群，双下肢痉挛性瘫痪，受累部位常有明显肌束颤动；③延髓麻痹通常晚期出现，表现为真假延髓麻痹共存；④一般无客观的感觉障碍，但常有主观的感觉症状，如麻木等。一般不累及括约肌和眼外肌；⑤预后不良，多在 3~5 年内因呼吸肌受累死于呼吸肌麻痹或肺部感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-short006",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "阿尔茨海默病的临床表现是什么？",
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
        "阿尔茨海默病的临床表现",
        "阿尔茨海默病隐匿起病，持续进展，包括认知功能减退及其伴随的生活能力减退症状和非认知性神经精神症状。按照最新分期，AD 包括两个阶段：痴呆前阶段和痴呆阶段。(1)痴呆前阶段：分为轻度认知功能障碍发生前期（pre-MCI）和轻度认知功能障碍期（MCI）。AD 的 pre-MCI 期没有任何认知障碍的临床表现或仅有极轻微的记忆力减退。AD 的 MCI 期，即 AD 源性 MCI，主要表现为记忆力轻度受损，主要是学习和保存新知识的能力下降，其他认知域，如注意力、执行能力、语言能力和视空间能力也可出现轻度受损，但不影响基本日常生活能力，达不到痴呆的程度。(2)痴呆阶段：即传统意义上的 AD，此阶段患者认知功能损害导致了日常生活能力下降，根据认知损害的程度大致可以分为轻、中、重三期。①轻度：主要表现为记忆障碍，以近事记忆减退为主，随后出现远期记忆减退，可出现视空间障碍，面对生疏和复杂的事物容易出现疲乏、焦虑和消极情绪，还会表现出人格方面的障碍，如不爱清洁、不修边幅、暴躁、易怒、自私多疑。②中度：记忆障碍继续加重，还可出现思维和判断力障碍、性格改变和情感障碍，掌握新知识和社会接触能力减退，逻辑思维、综合分析能力减退，定向力障碍，言语重复、计算力下降，出现明显的视空间障碍，有失语、失用、失认或肢体活动不灵等局灶性脑部症状。③重度：上述各项症状逐渐加重，情感淡漠、哭笑无常、言语能力丧失、生活不能自理而卧床，与外界丧失接触能力。四肢出现强直或屈曲瘫痪，括约肌功能障碍。常可合并如肺部及尿路感染、压疮，以及全身性衰竭症状等并发症而死亡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），1 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-case001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt: "女性，72 岁，主因“性格行为改变伴记忆力减退 3 年半，定向力障碍 1 年”入院。3 年半前家人发现其脾气变化，急躁，不讲礼仪，不讲卫生，固执己见，自私多疑，与以前判若两人，上述症状进行性加重，并出现行为异常，整夜看电视，表情呆板，并且记忆力明显减退；1 年前外出散步时走失，派出所送回，后逐渐不能出门，在家中也经常走错房间，原来的熟人见面不认识；近 3 个月上述病情进行性加重，随处乱放物品，遂来诊。既往 2 年前发现高血压、糖尿病，偶尔服用降压片，坚持服用“格华止”降糖。入院查体：神清语利，表情呆板，记忆力、计算力、定向力、理解判断力均下降。四肢肌力 V 级，肌张力正常，共济运动正常，感觉检查正常，病理征未引出。辅助检查：MMSE 检查 11 分。头颅 MRI：脑萎缩，尤以颞叶萎缩明显。院内查血生化、血常规、抗体三项、肿瘤四项、心电图、甲状腺功能等均正常。问题：（1）请写出诊断及诊断依据。（2）需与哪些疾病鉴别（写出至少 3 种疾病名）？（3）还应做哪些辅助检查？（4）治疗原则是什么？",
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
        "可能性大的 Alzheimer 病的诊断、鉴别、检查与治疗",
        "(1)诊断及诊断依据：可能性大的 Alzheimer 病。依据：老年女性，隐袭起病，缓慢进展，病程 3 年半；首发症状为性格改变、记忆力减退，发展全面智能衰退；体格检查无局灶性神经系统体征；MMSE 评分 11 分，符合痴呆标准；MRI 示颞叶萎缩明显；实验室检查排除系统性疾病引起的痴呆。因此符合 NINCDS-ADRDA 很可能 AD 的标准。(2)需要鉴别的疾病有额颞叶痴呆、路易体痴呆、血管性痴呆、进行性核上性麻痹、正常颅压脑积水等。(3)进一步检测维生素 B12、叶酸、烟酸水平；腰穿检查；汉密尔顿抑郁量表（HAMD）、神经精神问卷（NPI）排除抑郁及精神疾病。确诊需做脑活检病理学检查。(4)包括非药物治疗、药物治疗和支持治疗。①非药物治疗包括：生活护理、职业训练、音乐治疗和群体治疗等。②药物治疗可应用胆碱能制剂改善认知功能，如多奈哌齐、利斯的明、石杉碱甲等。也可使用 NMDA 受体拮抗剂美金刚。其它如脑代谢赋活剂、微循环改善药物和钙离子拮抗剂等可试用。控制精神症状可用选择性 5-HT 再摄取抑制剂如氟西汀、帕罗西汀等，和不典型抗精神病药如利培酮、奥氮平、思瑞康等。从低剂量起始，缓慢增量，尽量使用最小有效剂量。③支持治疗，预防并发症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组、共 4 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch11-neurodegenerative-disease-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "简易精神状况检查量表（MMSE）",
      "临床痴呆评定量表（CDR）",
      "汉密尔顿抑郁量表（HAMD）",
      "Hachinski 缺血量表",
      "Glasgow 昏迷评分",
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
        id: "ext-neurology-ch11-neurodegenerative-disease-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于 AD 诊断的分级量表为",
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
            "临床痴呆评定量表（CDR）",
            "临床痴呆评定量表（CDR）用于 AD 诊断的分级。原书 B1 答案第 1 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch11-neurodegenerative-disease-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于 AD 诊断的大体评定量表为",
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
            "简易精神状况检查量表（MMSE）",
            "简易精神状况检查量表（MMSE）用于 AD 诊断的大体评定。原书 B1 答案第 2 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch11-neurodegenerative-disease-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于与血管性痴呆相鉴别的量表为",
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
            "Hachinski 缺血量表",
            "Hachinski 缺血评分量表用于与血管性痴呆相鉴别，≥7 分提示 VD，≤4 分提示 AD。原书 B1 答案第 3 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch11-neurodegenerative-disease-b001m4",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于 AD 诊断的精神行为评定量表为",
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
            "汉密尔顿抑郁量表（HAMD）",
            "汉密尔顿抑郁量表（HAMD）用于 AD 诊断的精神行为评定。原书 B1 答案第 4 题为 C。",
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
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
