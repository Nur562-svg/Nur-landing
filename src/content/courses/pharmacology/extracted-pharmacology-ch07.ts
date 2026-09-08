import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第7章 抗胆碱酯酶药和胆碱酯酶复活药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：2 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：2 组、共 6 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 6、选择题（A1 型 17 + A2 型 2 + B1 型 4 组
 *   共 12 小题）与简答（论述）2；本文件按 13 道预算在原书顺序内取材。名词解释与两道
 *   问答题全取，填空题取前 2 道，选择题取前 2 道 A1 型题，B1 型取前 2 组完整组
 *   （20～23 题 4 成员、24～25 题 2 成员）。正确项对齐章末参考答案键号（A1 型题 1.C/2.B、
 *   B1 型题 20.B/21.D/22.B/23.C/24.A/25.D），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复（如 Nn 受体/Nm 受体、
 *   乙酰胆碱酯酶、机械性肠梗阻、毒扁豆碱、美曲膦酯等），数值均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch07-anticholinesterases";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第7章 抗胆碱酯酶药和胆碱酯酶复活药 习题（核对PDF 第47–52页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch07-anticholinesterases-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗胆碱酯酶药",
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
        "抗胆碱酯酶药",
        "能与乙酰胆碱酯酶结合，但结合较牢固、水解较慢，使乙酰胆碱酯酶活性受抑，从而导致胆碱能神经末梢释放的乙酰胆碱堆积、产生拟胆碱作用的药物。可分为易逆性抗胆碱酯酶药（如新斯的明）和难逆性抗胆碱酯酶药（如有机磷酸酯类）。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch07-anticholinesterases-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "对于乙酰胆碱酯酶，新斯的明属于___药，美曲膦酯属于___药。",
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
        "易逆性抗胆碱酯酶药；难逆性抗胆碱酯酶药",
        "新斯的明为易逆性抗胆碱酯酶药，有机磷酸酯类（美曲膦酯为其代表之一）为难逆性抗胆碱酯酶药。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch07-anticholinesterases-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "新斯的明对骨骼肌的兴奋作用是通过___和___实现的。",
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
        "抑制神经肌肉接头乙酰胆碱酯酶；直接兴奋骨骼肌运动终板上的Nm受体",
        "新斯的明一方面抑制神经肌肉接头处的乙酰胆碱酯酶使乙酰胆碱积聚，另一方面可直接激动骨骼肌运动终板上的 Nm 受体，两者共同产生较强的兴奋骨骼肌作用。原书填空题第 2 题答案。",
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
    id: "ext-pharmacology-ch07-anticholinesterases-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于易逆性抗胆碱酯酶药作用的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "促进腺体分泌",
      "兴奋骨骼肌",
      "缩瞳",
      "兴奋心脏",
      "兴奋胃肠道平滑肌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "兴奋心脏",
        "易逆性抗胆碱酯酶药使乙酰胆碱积聚而产生拟胆碱作用，表现为兴奋骨骼肌、兴奋胃肠道平滑肌、缩瞳和促进腺体分泌等；其对心脏表现为抑制性 M 样作用（心率减慢）而非兴奋心脏。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch07-anticholinesterases-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于新斯的明的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "禁用于机械性肠梗阻",
      "口服吸收差，可皮下注射给药",
      "易进入中枢神经系统",
      "可促进胃肠道的运动",
      "常用于治疗重症肌无力",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "易进入中枢神经系统",
        "新斯的明为季铵类化合物，脂溶性低，不易进入中枢神经系统，口服吸收少而不规则，可皮下或肌内注射给药；可促进胃肠道运动，常用于治疗重症肌无力，禁用于机械性肠梗阻。原书 A1 型题第 2 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch07-anticholinesterases-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述新斯的明的药理作用与临床应用。",
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
        "新斯的明可逆性地抑制乙酰胆碱酯酶活性而发挥拟胆碱作用，即通过乙酰胆碱兴奋 M、N 胆碱受体；还能直接激动骨骼肌运动终板上的 Nm 受体，对骨骼肌的兴奋作用较强。兴奋胃肠平滑肌的作用次之，对腺体、眼、心血管及支气管平滑肌作用弱。临床主要用于治疗重症肌无力，还可用于减轻由手术或其他原因引起的腹气胀及尿潴留，尚可用于阵发性室上性心动过速和对抗竞争性神经肌肉阻滞药过量时的毒性反应。",
        "围绕作用机制（可逆性抑制胆碱酯酶并直接激动 Nm 受体）与主要临床应用（重症肌无力、腹气胀及尿潴留、阵发性室上性心动过速、对抗竞争性神经肌肉阻滞药过量）作答。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch07-anticholinesterases-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述有机磷酸酯类的中毒机制、中毒表现及其治疗药物的作用机制。",
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
        "中毒机制：有机磷酸酯类与乙酰胆碱酯酶（AChE）牢固结合，形成难以水解的磷酰化 AChE，使 AChE 失去水解乙酰胆碱的能力，造成体内乙酰胆碱大量积聚而引起一系列中毒症状。中毒表现：①胆碱能神经突触症状：瞳孔缩小、视力模糊，泪腺、汗腺等腺体分泌增加，恶心、呕吐、腹痛、腹泻，严重者出现呼吸困难、大小便失禁、心率减慢、血压下降等；②胆碱能神经肌肉接头症状：肌无力、不自主肌束抽搐、震颤，并可导致明显肌麻痹，严重时可引起呼吸肌麻痹；③中枢神经系统症状：先兴奋、不安，继而出现惊厥，后转为抑制，出现意识模糊、共济失调、谵语、反射消失、昏迷等，严重中毒晚期可因呼吸中枢麻痹致呼吸抑制甚至呼吸停止，血管运动中枢抑制致血压下降甚至循环衰竭。治疗药物的作用机制：①阿托品：阻断 M 胆碱受体，迅速对抗体内乙酰胆碱的 M 样作用和部分中枢神经系统症状，用药应早期、足量、反复；②乙酰胆碱酯酶复活药（常用碘解磷定、氯解磷定）：能使被有机磷酸酯类抑制的 AChE 恢复活性，可迅速控制肌束颤动，对中枢神经系统的中毒症状也有一定改善作用。一般须两药合用。",
        "要点层次：机制（磷酰化 AChE 使乙酰胆碱积聚）→ 表现（突触、肌肉接头、中枢三类症状）→ 治疗（阿托品阻断 M 受体对抗 M 样症状，AChE 复活药恢复酶活性，两药合用、早期足量反复给药）。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组共 6 成员（原书 20～23 题、24～25 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch07-anticholinesterases-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "毛果芸香碱",
      "美曲膦酯",
      "新斯的明",
      "氯解磷定",
      "乙酰胆碱",
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
        id: "ext-pharmacology-ch07-anticholinesterases-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于易逆性抗胆碱酯酶药的药物是",
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
            "新斯的明",
            "新斯的明与乙酰胆碱酯酶结合形成易水解的复合物，属易逆性抗胆碱酯酶药。原书 B1 型题第 20 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch07-anticholinesterases-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可恢复胆碱酯酶活性的药物是",
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
            "氯解磷定",
            "氯解磷定为胆碱酯酶复活药，能使被有机磷酸酯类抑制的乙酰胆碱酯酶恢复活性。原书 B1 型题第 21 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch07-anticholinesterases-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于治疗重症肌无力的药物是",
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
            "新斯的明",
            "新斯的明对骨骼肌兴奋作用较强，是治疗重症肌无力的常用药物。原书 B1 型题第 22 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch07-anticholinesterases-b001m4",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于治疗青光眼的药物是",
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
            "毛果芸香碱",
            "毛果芸香碱为 M 胆碱受体激动药，能缩瞳、降低眼内压，临床用于治疗青光眼。原书 B1 型题第 23 题，参考答案键号 C。",
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
  {
    id: "ext-pharmacology-ch07-anticholinesterases-b002",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "机械性肠梗阻",
      "重症肌无力",
      "青光眼",
      "竞争性神经肌肉阻滞药过量时的解救",
      "手术后腹气胀和尿潴留",
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
        id: "ext-pharmacology-ch07-anticholinesterases-b002m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "毒扁豆碱常用于治疗",
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
            "青光眼",
            "毒扁豆碱作用较毛果芸香碱强而持久，可滴眼用于治疗急性青光眼，也可进入中枢抑制乙酰胆碱酯酶活性。原书 B1 型题第 24 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch07-anticholinesterases-b002m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "吡斯的明的禁忌证是",
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
            "机械性肠梗阻",
            "抗胆碱酯酶药可增强胃肠平滑肌收缩，机械性肠梗阻时禁用，以免加重梗阻。原书 B1 型题第 25 题，参考答案键号 D。",
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
