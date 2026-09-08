import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第18章 抗精神失常药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：7 题（含 A1 型 6、A2 型病例题 1）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 4、选择题（A1 型 20 + A2 型 4 + B1 型 2 组
 *   共 7 小题）与简答、论述 7；本文件按 16 道预算在原书顺序内取材。名词解释全取 2，
 *   填空题取前 2 道，选择题取 A1 型前 6 道与 A2 型第 21 题（映射为 a1-single），问答题
 *   取前 2 道，B1 型取第 1 组（25～27 题共用备选答案）完整 3 成员。正确项对齐章末
 *   参考答案键号（A1 型题 1.B/2.A/3.E/4.C/5.B/6.D、A2 型题 21.B、B1 型题 25.E/26.A/27.D），
 *   选项与共用备选答案已随机重排并同步 correctChoiceIndex。OCR 错字与符号已按药理学
 *   医学语义恢复（如 氯内嗪→氯丙嗪、丙成酸钠→丙戊酸钠、氯晋曝吨→氯普噻吨、
 *   鸣氯贝胺→吗氯贝胺、帕罗西灯→帕罗西汀、5-HT2A、D2 样受体、锂盐血药浓度单位
 *   mEg/L→mEq/L 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch18-antipsychotics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第18章 抗精神失常药 习题（核对PDF 第109–116页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch18-antipsychotics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：人工冬眠",
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
        "氯丙嗪与其他中枢抑制药（哌替啶、异丙嗪）合用，可使患者深睡，体温、基础代谢及组织耗氧量均降低，增强患者对缺氧的耐受力，并可使植物神经传导阻滞及中枢神经系统反应性降低，称为人工冬眠。",
        "人工冬眠有利于机体度过危险的缺氧缺能阶段，为进行其他有效的对因治疗争取时间，多用于严重创伤、感染性休克、高热惊厥、中枢性高热及甲状腺危象等病症的辅助治疗。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：5-HT-DA受体阻断剂",
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
        "氯氮平抗精神分裂症的治疗机制涉及阻断 5-HT2A 和 DA 受体、协调 5-HT 与 DA 系统的相互作用和平衡，因此氯氮平被称为 5-HT-DA 受体阻断剂。",
        "氯氮平属于二苯二氮䓬类非典型（非经典）抗精神分裂症药，为选择性 D4 亚型受体拮抗药，几乎无锥体外系反应，主要用于其他抗精神分裂症药无效或锥体外系反应过强的病人。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch18-antipsychotics-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "氯丙嗪对中枢的作用有___、___和___。",
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
        "抗精神分裂症作用；镇吐作用；对下丘脑体温调节中枢的抑制作用",
        "氯丙嗪对中枢神经系统的作用包括：抗精神分裂症作用（阻断中脑-边缘系统和中脑-皮层系统的 D2 样受体）、镇吐作用（阻断延脑第四脑室底部催吐化学感受区的 D2 受体，大剂量直接抑制呕吐中枢）以及对下丘脑体温调节中枢的强抑制作用（体温随环境温度变化）。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "抗抑郁药包括___、___、___和___等。",
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
        "三环类抗抑郁药；NA再摄取抑制药；5-HT再摄取抑制药；其他抗抑郁药",
        "抗抑郁药分为：三环类抗抑郁药（丙米嗪、阿米替林、多塞平等）、NA 摄取抑制药（地昔帕明、马普替林、去甲替林等）、选择性 5-HT 再摄取抑制药（氟西汀、帕罗西汀等）以及其他抗抑郁药（曲唑酮、米氮平、米安舍林等）。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），7 道（A1 型 6 道 + A2 型病例题 1 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "氯丙嗪抗精神分裂症作用的主要机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "阻断结节-漏斗系统D2受体",
      "阻断M受体",
      "阻断中脑-边缘系统和中脑-皮层系统的D2样受体",
      "阻断肾上腺素α受体",
      "阻断黑质-纹状体系统D2受体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阻断中脑-边缘系统和中脑-皮层系统的D2样受体",
        "氯丙嗪通过阻断中脑-边缘系统和中脑-皮层系统的 D2 样受体发挥抗精神分裂症作用；阻断黑质-纹状体系统 D2 样受体产生锥体外系反应，阻断结节-漏斗系统 D2 受体影响内分泌。原书 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "长期应用氯丙嗪治疗精神病的最常见不良反应是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["中枢抑制症状", "过敏反应", "锥体外系反应", "体位性低血压", "内分泌紊乱"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "锥体外系反应",
        "氯丙嗪对中脑-边缘、中脑-皮层两个通路和黑质-纹状体通路的 D2 样受体的亲和力几无差异，因此长期应用氯丙嗪的患者锥体外系反应发生率较高，表现为帕金森综合征、静坐不能、急性肌张力障碍和迟发性运动障碍。原书 A1 型题第 2 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "氯丙嗪引起的低血压状态应选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["去甲肾上腺素", "多巴胺", "异丙肾上腺素", "麻黄碱", "肾上腺素"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "去甲肾上腺素",
        "氯丙嗪阻断 α 受体致血管扩张、血压下降（体位性低血压），应选用 α 受体激动药去甲肾上腺素、间羟胺纠正；禁用肾上腺素，因其 β 受体激动作用可致血压进一步下降（肾上腺素升压作用的翻转）。原书 A1 型题第 3 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "锥体外系反应轻微的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["氯丙嗪", "氟哌利多", "五氟利多", "氯氮平", "氟哌啶醇"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "氯氮平",
        "氯氮平为选择性 D4 亚型受体拮抗药，对黑质-纹状体系统的 D2 和 D3 亚型受体几乎无亲和力，几乎无锥体外系反应，常用于其他抗精神分裂症药无效或锥体外系反应过强的病人。原书 A1 型题第 4 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "具有抗焦虑抑郁情绪的抗精神分裂症药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["氟哌啶醇", "氯丙嗪", "氯普噻吨", "氯氮平", "五氟利多"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "氯普噻吨",
        "硫杂蒽类氯普噻吨（泰尔登）抗精神分裂症作用较弱，但镇静作用强，具有抗焦虑抑郁情绪的特点。原书 A1 型题第 5 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "碳酸锂主要用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["焦虑症", "躁狂症", "贪食症", "精神分裂症", "抑郁症"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "躁狂症",
        "碳酸锂是临床最常用的抗躁狂症药，治疗剂量锂盐对正常人的精神行为没有明显影响，但对躁狂症患者有显著疗效；其安全范围较窄，血药浓度升至 1.6mEq/L 时应立即停药，并可增加钠摄入促进锂盐排泄。原书 A1 型题第 6 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患者，女性，50岁，3年前被诊断为“精神分裂症”，服用氟哌啶醇控制症状。近日患者出现肌张力增高、面容呆板、动作迟缓、肌肉震颤、流涎等症状。导致这些症状发生的最可能的原因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性肌张力障碍",
      "精神分裂症（II型）",
      "静坐不能",
      "帕金森综合征",
      "迟发性运动障碍",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "帕金森综合征",
        "氟哌啶醇为经典抗精神分裂症药，长期应用阻断黑质-纹状体通路的 D2 样受体，ACh 功能相对增强，可产生帕金森综合征（肌张力增高、面容呆板、动作迟缓、肌肉震颤、流涎），用中枢抗胆碱药（安坦）可以缓解。原书 A2 型题第 21 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch18-antipsychotics-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述氯丙嗪镇吐作用的特点及机制。",
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
        "①特点：对多种药物和疾病引起的呕吐具有显著的镇吐作用，对顽固性呃逆也有显著疗效，但对晕动症（前庭刺激引起的呕吐）无效；②机制：小剂量氯丙嗪即可对抗 DA 受体激动剂阿扑吗啡引起的呕吐，系阻断延脑第四脑室底部催吐化学感受区的 D2 受体的结果，大剂量时直接抑制呕吐中枢。",
        "氯丙嗪对癌症、放射病、胃肠炎及吗啡等药物所致的呕吐均有效，但晕动症呕吐与刺激前庭有关，氯丙嗪不能对抗。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch18-antipsychotics-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述丙米嗪的药理作用和用药注意。",
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
        "药理作用：①中枢神经系统：抑郁症病人连续服药后出现精神振奋（主要阻断 NA、5-HT 在神经末梢的再摄取，使突触间隙递质浓度增高）；②植物神经系统：阻断 M 受体，出现视物模糊、口干、便秘和尿潴留等；③心血管系统：可降低血压、致心律失常，其中心动过速较常见。用药注意：①避免与单胺氧化酶抑制剂（MAOI）合用，以免血压明显升高、高热和惊厥；②与苯妥英钠、保泰松、阿司匹林等血浆蛋白结合率高的药物合用，注意剂量；③前列腺肥大及青光眼患者禁用；④心血管疾病患者禁用。",
        "丙米嗪的精神振奋作用出现较慢（连续服药 2～3 周后疗效才显著），不作应急治疗用药；三环类抗抑郁药与抗精神分裂症药、抗帕金森病药合用时，其抗胆碱作用可相互增强。原书简答题第 2 题。",
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
    id: "ext-pharmacology-ch18-antipsychotics-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "地昔帕明",
      "阿米替林",
      "吗氯贝胺",
      "帕罗西汀",
      "瑞波西汀",
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
        id: "ext-pharmacology-ch18-antipsychotics-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "单胺氧化酶抑制药抗抑郁症药是",
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
            "吗氯贝胺",
            "吗氯贝胺为可逆性单胺氧化酶抑制药，通过抑制单胺氧化酶减少单胺类递质降解而发挥抗抑郁作用，属其他抗抑郁药。原书 B1 型题第 25 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch18-antipsychotics-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "5-HT再摄取抑制药抗抑郁症药是",
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
            "帕罗西汀",
            "帕罗西汀为强效选择性 5-HT 再摄取抑制药，比抑制 NA 摄取的作用强得多，临床主要用于抑郁症等。原书 B1 型题第 26 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch18-antipsychotics-b001m3",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "NA再摄取抑制抗抑郁症药是",
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
            "地昔帕明",
            "地昔帕明（去甲丙米嗪）是强 NA 摄取抑制药，其抑制 NA 摄取的效率为抑制 5-HT 摄取的 100 倍以上，对 DA 摄取也有一定抑制作用。原书 B1 型题第 27 题，参考答案键号 D。",
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
