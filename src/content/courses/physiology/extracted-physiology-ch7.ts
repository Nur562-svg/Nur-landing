import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生理学 学习指导与习题集（第3版）— 第七章 能量代谢和体温 题库提取（等比取样）
 * 来源：《生理学学习指导与习题集》第3版（人民卫生出版社，主编：罗自强、祁金顺）
 *
 * == 统计报告（本文件题量 = 按章节等比缩放预算，独立记分题共 18 道）==
 * - 名词解释：3 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：8 题
 * - 简答题：3 题
 * - 思考题（归入 case）：2 题
 * - B1 共用备选答案配伍题：1 组、共 2 个成员
 * - 独立记分题合计：18 题（含 B1 组成员）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依次含名词解释 8、A1 型 25、A2 型 10、B 型 3 组（6 个成员）、
 *   X 型多选 6、简答 6、思考题 2；本文件按 18 道预算等比取材并改写。
 *   X 型多选按项目规约映射为 a1-single 单选（题干改写成单句式并在 promptSource.note 中标注）。
 *   A2 病例型亦映射为 a1-single。思考题归入 case 型。OCR 错字已按语义恢复
 *   （如“热fi”→热量、“耗氧世”→耗氧量、“能置”→能量、“体液”→体温、“肢息”→呼吸等），
 *   数值与单位保留原值（如 20.20kJ/L、0.82、0.71、1.00、36.0~37.4℃、0.72 等），未捏造。
 *   各选择题可选项行经人工重建为 A–E 逻辑顺序后填入 choices，选项顺序已随机重排。
 *   覆盖 PDF 第177–189页（第七章 能量代谢和体温）。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "physiology-ch7-energy-metabolism-temperature";
const locatorBase =
  "《生理学学习指导与习题集》第3版 第七章 能量代谢和体温 复习思考题 习题（PDF 第177–189页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：氧热价（thermal equivalent of oxygen）",
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
        "氧热价",
        "氧热价是指把某种食物氧化时消耗 1L 氧所产生的热量，它反映了物质氧化时耗氧量与产热量之间的关系。不同物质的氧热价不同，利用氧热价可由耗氧量推算出机体的产热量。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：呼吸商（respiratory quotient, RQ）",
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
        "呼吸商",
        "呼吸商是指一定时间内机体呼出的 CO2 的量与吸入的 O2 的量的比值。葡萄糖、蛋白质和脂肪的呼吸商分别为 1.00、0.80 和 0.71，普通混合膳食的呼吸商约为 0.85。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基础代谢率（basal metabolism rate, BMR）",
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
        "基础代谢率",
        "基础代谢率是指人体处在清醒而又非常安静、不受肌肉活动、环境温度、食物及精神紧张等因素影响的状态下，单位时间内的能量代谢率（通常以单位时间内每平方米体表面积的产热量，即 kJ/(m2·h) 来表示）。它是人体处于清醒状态时最低的能量消耗水平，临床上可作为诊断代谢性疾病的参考。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/X 型选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "机体组织细胞活动时直接利用的能量来自于下列哪种物质",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "磷酸肌酸",
      "糖",
      "蛋白质",
      "脂肪",
      "腺苷三磷酸（ATP）",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腺苷三磷酸（ATP）",
        "组织细胞活动直接利用的能量由腺苷三磷酸（ATP）提供，ATP 既是储能物质又是直接供能物质；磷酸肌酸（CP）只是体内 ATP 的贮存库。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在体内主要依靠糖的无氧氧化供能的组织细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "红细胞",
      "肝细胞",
      "骨骼肌",
      "脑细胞",
      "心肌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "红细胞",
        "绝大多数组织细胞主要依靠糖的有氧氧化获得能量，但红细胞内缺乏有氧氧化的各种酶系，只能依靠糖的无氧氧化供能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种情况可出现基础代谢率（BMR）升高",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病理性饥饿",
      "甲状腺功能亢进",
      "肾病综合征",
      "肾上腺皮质功能低下",
      "脑垂体功能低下",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "甲状腺功能亢进",
        "甲状腺功能亢进时，BMR 可比正常值高达 25%~80%；其余四种情况一般来说 BMR 降低。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "测定某人的呼吸商为 0.72，下列哪项是正确的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "只摄入了碳水化合物",
      "摄入了高蛋白饮食",
      "摄入了高脂肪饮食",
      "长期饥饿状态",
      "12 小时空腹状态",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "摄入了高脂肪饮食",
        "葡萄糖、蛋白质和脂肪的呼吸商分别为 1.00、0.80 和 0.71，呼吸商 0.72 接近脂肪的 0.71，提示机体主要依靠脂肪代谢供能，即摄入了高脂肪饮食。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在 22℃ 的室温下，机体通过哪种方式散热量最大",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "辐射",
      "出汗",
      "不感蒸发",
      "对流",
      "传导",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "辐射",
        "22℃ 低于皮肤温度，辐射散热取决于皮肤与周围环境的温度差和有效散热面积，在温和室温（低于皮肤温度）时辐射是散热量最大的方式，约占散打量的一半以上。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "体温调节的重要中枢部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "下丘脑后部",
      "脊髓灰质侧角",
      "中脑中央灰质",
      "脑干网状结构",
      "视前区-下丘脑前部",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "视前区-下丘脑前部",
        "体温调节中枢整合机构的中心部位是视前区-下丘脑前部（PO/AH），其中的温度敏感神经元既感受局部温度变化，又整合中枢和外周传入的温度信息；破坏 PO/AH 后散热和产热反应均明显减弱或消失。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1007",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "某男，58 岁，患糖尿病 8 年，近日出现明显的烦渴多饮和乏力。实验室检查：尿糖+++，尿酮体++，空腹血糖 18.0mmol/L（参考范围 3.90~6.10）。该患者目前脑组织的主要供能物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "葡萄糖",
      "果糖",
      "脂肪酸",
      "酮体",
      "氨基酸",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酮体",
        "糖尿病患者血糖过高、糖利用严重障碍时，葡萄糖不能被脑组织充分利用；脑组织不能分解脂肪酸，但可利用酮体供能，故其主要供能物质为酮体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-a1008",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列因素中，属于影响皮肤温度的因素的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "血压",
      "环境温度变化",
      "出汗",
      "精神紧张",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "精神紧张",
        "皮肤温度与局部血流等有关，凡能影响皮肤血管舒缩的因素（如精神紧张、出汗、环境温度变化等）都能改变皮肤温度。本项选取精神紧张作单选映射；原书为 X 型多选，答案含精神紧张、出汗、环境温度变化。",
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
    id: "ext-physiology-ch7-energy-metabolism-temperature-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "何谓能量代谢？机体能量的来源及利用有哪些？",
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
        "能量代谢的含义与能量的来源、利用",
        "能量代谢是指在生物体内的物质代谢过程中所伴随发生的能量释放、转移、贮存和利用。机体的能量来源于食物，即蕴藏在食物分子结构中的化学能，糖、脂肪、蛋白质三大营养物质是机体的能源；机体能够直接利用的能量形式是 ATP，它既是直接的供能物质又是储能物质，磷酸肌酸是肌肉等组织中的能源储备，需要时其高能磷酸键可转移给 ADP 生成 ATP 供机体利用。在利用能量的过程中，50% 以上直接转化为热能，其余用于肌肉舒缩活动、合成代谢、生物电的产生与传导、物质的主动转运以及分泌等；除骨骼肌收缩完成的一定量外功外，其他能量最终均转化为热能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述测定基础代谢率（BMR）时对受试者及环境的要求，以及测定 BMR 的意义。",
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
        "BMR 测定的条件要求与临床意义",
        "测定 BMR 时受试者及环境应满足下列条件：禁食 12 小时以上，清醒、静卧，未作肌肉活动，无精神紧张，测试时的室温保持在 20~25℃。临床上测定 BMR 有助于某些代谢性疾病的诊断及疗效观察，特别是甲状腺功能的改变——甲状腺功能低下时 BMR 可低于正常值的 20%~40%，甲状腺功能亢进时 BMR 可比正常值高 25%~80%；另外，测定基础代谢率还可用于指导肥胖者控制摄入的食物热量及活动量，以达到适当降低体重的目的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "应用体温调定点学说，解释机体发热过程中的主要表现。",
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
        "用体温调定点学说解释机体的发热表现",
        "发热（例如细菌感染等）是在致热原作用下引起机体内一系列反应，使热敏神经元活动减弱、冷敏神经元活动加强，体温调定点被重新设置（重调定），即调定点上移（例如上移到 39℃）。此时体温虽然在正常范围，却低于新的调定点水平，机体减少散热、发动产热，表现为皮肤血管收缩、皮肤血流减少、皮肤温度降低，随后出现战栗等产热反应，直到体温升高到新的调定点（如 39℃），产热和散热过程在新调定点水平达到平衡。当体温调定点重新回到正常值时，此刻的体温高于调定点水平，机体促使散热增多、产热减少，表现为大量发汗、增加散热，体温恢复到正常范围。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 思考题（case），2 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-case001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "某男，35 岁，身高 175cm，体重 65kg，正常进食混合膳食（氧热价视为 20.20kJ/L），测定其基础代谢率为 100kcal/h。参考资料：体表面积(m2) = 0.0061 × 身高(cm) + 0.0128 × 体重(kg) − 0.1529；31~40 岁男性的正常基础代谢率平均值为 158.6kJ/(m2·h)。问：(1) 评价该受试者的能量代谢水平是否在正常范围；(2) 若供给该受试者 200L 氧气，推算大约可使用多长时间。",
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
        "体表面积约 1.75m2；BMR 约 239.1kJ/(m2·h)；较正常高约 51%；200L 氧约可用 9.7 小时",
        "(1) 体表面积 = 0.0061×175 + 0.0128×65 − 0.1529 = 1.0675 + 0.832 − 0.1529 = 1.7466 ≈ 1.75m2。基础代谢率 BMR = 100 ÷ 0.239 ÷ 1.75 = 239.1kJ/(m2·h)。与 31~40 岁男性正常平均值 158.6kJ/(m2·h) 比较：(239.1 − 158.6) ÷ 158.6 × 100% ≈ 51%，明显高于正常值，该受试者的基础代谢率值较高，不在正常范围内。(2) 该受试者每小时耗氧量约为 (100 ÷ 0.239) ÷ 20.20 ≈ 20.7L/h，200 ÷ 20.7 ≈ 9.7 小时，故 200L 氧气大约可使用 9.7 小时。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-case002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "动物实验研究中发现，一种中药成分对多种发热模型具有解热作用。为了进一步开发并应用于临床，需要明确其解热作用的机制。问：(1) 试推测其可能作用的外周调控环节；(2) 试推测其可能作用的中枢调控机制。",
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
        "外周调控环节与中枢调控机制两个方向",
        "(1) 外周调控环节：直接作用于效应器，使外周血管舒张，和（或）促进汗腺分泌汗液，从而使散热量增加；和（或）抑制代谢水平及骨骼肌的产热。(2) 中枢调控机制：增强热敏神经元的活动，抑制冷敏神经元的活动，使体温调定点水平下移，促使机体散热增加、产热减少，从而发挥解热作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-physiology-ch7-energy-metabolism-temperature-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["0.71", "0.80", "0.82", "0.85", "1.00"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-physiology-ch7-energy-metabolism-temperature-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "正常人混合膳食时，其呼吸商可视为",
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
            "0.85",
            "正常人普通混合膳食的呼吸商约为 0.85；葡萄糖、蛋白质和脂肪的呼吸商分别约为 1.00、0.80 和 0.71。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-physiology-ch7-energy-metabolism-temperature-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "正常人混合膳食时，若蛋白质的代谢忽略不计，则非蛋白呼吸商可视为",
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
            "0.82",
            "由糖和脂肪氧化时产生的 CO2 量与消耗的 O2 量的比值称为非蛋白呼吸商（NPRQ），国人普通混合膳食时非蛋白呼吸商约为 0.82。",
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
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];