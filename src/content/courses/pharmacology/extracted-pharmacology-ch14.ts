import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第14章 局部麻醉药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：3 题（含简答、论述；病例综合题未纳入）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：12 题（须等于本文件预算 12）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 4、选择题（A1 型 7 + A2 型 3 +
 *   B1 型 3 组共 9 小题）与简答题 6（含 1 道病例综合题）；本文件按 12 道预算在
 *   原书顺序内取材：term 1、fill 4（全取）、a1 2（A1 型第 1、2 题）、short 3
 *   （简答第 1～3 题）、B1 取第 1 组（11～12 题）完整 2 成员。A1 型正确项对齐
 *   章末参考答案键号（1.A、2.B），B1 成员对齐键号（11.B、12.C）；选项已随机重排
 *   并同步 correctChoiceIndex。A2 型第 8～10 题、B1 第 2、3 组及简答第 4～6 题
 *   因预算未纳入。OCR 错字与符号已按药理学医学语义恢复
 *   （如 葯→药、Na*→Na+、K*→K+、Ca*→Ca2+、传导豚醉→传导麻醉、码啡→吗啡、
 *   渍疡→溃疡、名詞解释→名词解释），数值（50%、0.5%～1%、1～3分钟、2～3小时、
 *   130/85mmHg 等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch14-local-anesthetics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第14章 局部麻醉药 习题（核对PDF 第87–91页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch14-local-anesthetics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：局部麻醉药",
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
        "局部麻醉药",
        "简称局麻药，是一类以适当的浓度局部应用于神经末梢或神经干周围，能暂时、完全和可逆地阻断神经冲动的产生和传导，在意识清醒的条件下使局部痛觉等感觉暂时消失，而对各类组织无损伤性影响的药物。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch14-local-anesthetics-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "根据中间链的结构，可将常用局麻药分为___类和___类。属于前一类的药物有___等，其中易引起过敏反应的局麻药是___。属于后一类的药物有___等。",
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
        "酯类；酰胺类；普鲁卡因、丁卡因；普鲁卡因；利多卡因、布比卡因（或罗哌卡因等）",
        "常用局麻药根据中间链的结构分为酯类和酰胺类：酯类包括普鲁卡因、丁卡因、苯佐卡因等，其中普鲁卡因易引起过敏反应，用药前应做皮肤过敏试验；酰胺类包括利多卡因、布比卡因、罗哌卡因等。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch14-local-anesthetics-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "蛛网膜下腔麻醉神经阻断的顺序是首先阻断___，其次是___，最后是___。",
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
        "交感神经纤维；感觉纤维；运动纤维",
        "蛛网膜下腔麻醉时，神经纤维按直径由细到粗依次被阻断：首先阻断交感神经纤维，其次是感觉纤维，最后是运动纤维。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch14-local-anesthetics-fill003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "局麻药对心肌细胞膜具有膜稳定作用，吸收后可降低心肌兴奋性，使心肌收缩力___，传导___，不应期___。",
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
        "减弱；减慢；延长",
        "局麻药吸收后对心血管系统产生抑制：降低心肌兴奋性，使心肌收缩力减弱、传导减慢、不应期延长，血药浓度过高时可引起血压下降甚至休克。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch14-local-anesthetics-fill004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "麻醉药在脊髓管内的扩散受病人的体位、姿势、___、注射力量和___的影响。",
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
        "药量；溶液比重",
        "局麻药在脊髓管内的扩散受病人体位、姿势、药量、注射力量和溶液比重等因素的影响。原书填空题第 4 题答案。",
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
    id: "ext-pharmacology-ch14-local-anesthetics-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对于混合神经，局麻药首先阻断",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["痛觉", "温觉", "触觉", "压觉", "冷觉"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "痛觉",
        "局麻药对混合神经的作用与神经纤维的直径大小有关，细的无髓鞘痛觉纤维最先被阻断，因此痛觉最先消失。原书 A1 型题第 1 题，参考答案键号 A（选项字母双栏错序，已按医学语义归位）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch14-local-anesthetics-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "局部麻醉药的作用原理是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "局麻药促进Na+内流，产生持久去极化",
      "特异性阻断神经细胞膜内表面的Na+通道，阻碍去极化",
      "局麻药促进K+内流，阻碍去极化",
      "降低膜对Na+、K+、Ca2+的通透性",
      "与细胞外Na+结合，阻止去极化时Na+内流",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "特异性阻断神经细胞膜内表面的Na+通道，阻碍去极化",
        "局麻药阻断电压门控性 Na+ 通道，与通道内口特异结合位点相结合，抑制 Na+ 内流，阻止动作电位的产生和神经冲动的传导，从而产生局麻作用。原书 A1 型题第 2 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch14-local-anesthetics-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述局麻药的作用机制。",
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
        "局麻药的作用机制主要是阻断神经细胞膜上的电压门控性 Na+ 通道，局麻药与 Na+ 通道上的特异结合位点相结合，封闭神经细胞膜 Na+ 通道的内口，抑制 Na+ 内流，阻止动作电位的产生和神经冲动的传导，产生局麻作用。",
        "原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch14-local-anesthetics-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述普鲁卡因的作用特点。",
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
        "普鲁卡因属短效酯类局麻药，是常用的局麻药之一，毒性较小，亲脂性低，对黏膜的穿透力弱，一般不用于表面麻醉，常局部注射用于浸润麻醉、传导麻醉、蛛网膜下腔麻醉和硬膜外麻醉，也可用于损伤部位的局部封闭；过量应用可引起中枢神经系统和心血管反应，有时可引起过敏反应，故用药前应做皮肤过敏试验，但皮试阴性者仍可发生过敏反应。",
        "原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch14-local-anesthetics-short003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述利多卡因的作用特点。",
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
        "利多卡因为酰胺类局麻药，是目前应用最多的局麻药，具有起效快、强而持久、穿透力强及安全范围较大的特点，同时无扩张血管及对组织的刺激性，可用于多种形式的局部麻醉，有全能麻醉药之称，主要用于传导麻醉和硬膜外麻醉；单用此药在反复应用后可产生快速耐受性，利多卡因的毒性大小与所用药液的浓度有关，增加浓度可相应增加毒性反应。",
        "原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书第 11～12 题组） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch14-local-anesthetics-b001",
    order: 11,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "蛛网膜下腔麻醉",
      "浸润麻醉",
      "表面麻醉",
      "传导麻醉",
      "硬膜外麻醉",
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
        id: "ext-pharmacology-ch14-local-anesthetics-b001m1",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "丁卡因不宜用于的局麻是",
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
            "浸润麻醉",
            "丁卡因麻醉强度大、穿透力强，常用于表面麻醉；因毒性大，一般不用于浸润麻醉。原书 B1 型题第 11 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch14-local-anesthetics-b001m2",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "普鲁卡因不宜用于的局麻是",
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
            "表面麻醉",
            "普鲁卡因亲脂性低、对黏膜穿透力弱，不用于表面麻醉，一般注射用于浸润麻醉、传导麻醉、蛛网膜下腔麻醉和硬膜外麻醉。原书 B1 型题第 12 题，参考答案键号 C。",
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
