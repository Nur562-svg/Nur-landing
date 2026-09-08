import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第16章 抗癫痫药和抗惊厥药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：2 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 6、选择题（A1 型 15 + A2 型 2 + B1 型 1 组共
 *   3 小题）与简答题 5；本文件按 10 道预算在原书顺序内取材。名词解释全取 2，填空题取前
 *   2 道，选择题取 A1 型前 2 道（映射为 a1-single），简答题取第 1 道，B1 型取第 1 组
 *   （18～20 题共用备选答案）完整 3 成员。正确项对齐章末参考答案键号（A1 型题 1.B/2.A、
 *   B1 型题 18.B/19.C/20.A），选项与共用备选答案已随机重排并同步 correctChoiceIndex。
 *   OCR 错字与符号已按药理学医学语义恢复（如 丙皮酸→丙戊酸、拉英酸钠→拉莫三嗪、
 *   苯二氮草类→苯二氮䓬类、茶巴比妥→苯巴比妥、氯硝西拌→氯硝西泮、Mg²⁺/Ca²⁺ 离子
 *   符号、惊厥定义“星强直性”→“呈强直性”等），剂量单位与数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch16-antiepileptics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第16章 抗癫痫药和抗惊厥药 习题（核对PDF 第95–102页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch16-antiepileptics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：癫痫",
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
        "由脑组织局部病灶的神经元异常高频放电，并向周围组织扩散，导致大脑功能短暂失调的综合征。",
        "癫痫（epilepsy）的发病基础是脑局部病灶神经元兴奋性过高，产生阵发性的异常高频放电并向周围正常脑组织扩散，引起大脑功能短暂失调。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch16-antiepileptics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：惊厥",
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
        "中枢神经系统过度兴奋的一种症状，表现为全身骨骼肌不由自主的强烈收缩，呈强直性或阵挛性抽搐，多伴有意识障碍。",
        "惊厥（convulsion）是中枢神经系统过度兴奋的表现，如救治不及时可危及生命；常用抗惊厥药物包括巴比妥类、苯二氮䓬类中的部分药物、水合氯醛以及硫酸镁。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），2 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch16-antiepileptics-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "治疗癫痫大发作的主要药物有___、___和___。",
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
        "苯妥英钠；苯巴比妥；卡马西平",
        "治疗癫痫大发作（强直-阵挛性发作）的主要药物包括苯妥英钠、苯巴比妥、卡马西平等，其中苯妥英钠是治疗大发作和局限性发作的首选药物。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch16-antiepileptics-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "治疗癫痫持续状态的主要药物有___、___和___。",
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
        "地西泮；苯妥英钠；苯巴比妥",
        "地西泮静脉注射是治疗癫痫持续状态的首选药物，苯妥英钠、苯巴比妥亦用于癫痫持续状态的治疗。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch16-antiepileptics-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对治疗各类癫痫均有效的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["卡马西平", "苯妥英钠", "扑米酮", "丙戊酸钠", "乙琥胺"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "丙戊酸钠",
        "丙戊酸钠为广谱抗癫痫药，对各类型癫痫都有一定疗效，是大发作合并小发作时的首选药物。原书 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch16-antiepileptics-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "治疗癫痫小发作的首选药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["扑米酮", "卡马西平", "苯妥英钠", "乙琥胺", "丙戊酸钠"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乙琥胺",
        "乙琥胺在治疗浓度时可抑制丘脑神经元异常放电，是治疗小发作（失神性发作）的首选药物，毒性较低。原书 A1 型题第 2 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch16-antiepileptics-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述苯妥英钠抗癫痫的作用机制。",
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
        "①稳定细胞膜、降低其兴奋性：抑制 Na+ 通道，阻滞 Na+ 内流；②抑制神经元快灭活型 Ca2+ 通道，抑制 Ca2+ 内流；③较大浓度时抑制 K+ 外流，延长动作电位时程和不应期；④高浓度时抑制神经末梢对 GABA 的摄取，增加抑制性递质 GABA 含量；⑤抑制异常高频放电的发生和扩散，从而抑制癫痫发作。",
        "苯妥英钠不能抑制癫痫病灶的异常放电，但可阻止其向正常脑组织扩散。其膜稳定作用（抑制细胞膜 Na+ 通道）降低细胞膜兴奋性，使动作电位不易产生；对 Ca2+ 通道、K+ 外流的调节及对 GABA 摄取的影响共同参与其抗癫痫作用。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch16-antiepileptics-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "苯巴比妥",
      "卡马西平",
      "地西泮",
      "乙琥胺",
      "苯妥英钠",
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
        id: "ext-pharmacology-ch16-antiepileptics-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "既可以治疗癫痫，又可以治疗心律失常的药物是",
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
            "苯妥英钠",
            "苯妥英钠是治疗癫痫大发作和局限性发作的首选药，此外还可用于治疗三叉神经痛等中枢疼痛综合征及抗心律失常。原书 B1 型题第 18 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch16-antiepileptics-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "既可以治疗癫痫，又可以治疗尿崩症的药物是",
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
            "卡马西平",
            "卡马西平为广谱抗癫痫药，是治疗单纯性局限性发作和大发作的首选药物之一，治疗神经痛效果优于苯妥英钠，临床上还可用于治疗尿崩症。原书 B1 型题第 19 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch16-antiepileptics-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "静脉注射速度过快可引起呼吸抑制的药物是",
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
            "地西泮",
            "地西泮静脉注射是治疗癫痫持续状态的首选方法，但静脉注射速度过快可引起呼吸抑制，故应缓慢注射。原书 B1 型题第 20 题，参考答案键号 A。",
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
