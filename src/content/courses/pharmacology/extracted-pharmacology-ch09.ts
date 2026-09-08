import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第9章 胆碱受体阻断药（II）—N胆碱受体阻断药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：1 题
 * - 选择题（a1-single）：1 题（A1 型）
 * - 问答题（short-answer）：1 题
 * - B1 配伍题：0 组、共 0 个成员（因预算限制未取）
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 4、选择题（A1 型 5 + A2 型 1 + B1 型 1 组
 *   共 2 小题）与简答（论述）3；本文件按 5 道预算在原书顺序内取材。名词解释全取 2，
 *   填空题取第 1 道，选择题取 A1 型第 1 道（映射为 a1-single），问答题取第 1 道；
 *   预算用尽后 B1 型题（7～8 题 1 组共 2 成员）未取。正确项对齐章末参考答案键号
 *   （A1 型题 1.D），选项已随机重排并同步 correctChoiceIndex。OCR 错字与符号已按
 *   药理学医学语义恢复（如 Nw→Nm 胆碱受体、葯→药、Y→γ 运动神经元、減少→减少等），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch09-nicotinic-antagonists";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第9章 胆碱受体阻断药（II）—N胆碱受体阻断药 习题（核对PDF 第57–60页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch09-nicotinic-antagonists-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：除极化型肌松药",
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
        "除极化型肌松药",
        "指能与神经肌肉接头后膜的胆碱受体结合，产生较持久的除极化作用，使神经肌肉接头后膜的 Nm 胆碱受体不能对 ACh 起反应，从而使骨骼肌松弛的药物。代表药为琥珀胆碱。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch09-nicotinic-antagonists-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：非除极化型肌松药",
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
        "非除极化型肌松药",
        "又称竞争性肌松药，能与 ACh 竞争神经肌肉接头的 Nm 胆碱受体，阻断 ACh 的除极化作用，使骨骼肌松弛；其本身不引起突触后膜的去极化。代表药为筒箭毒碱。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），1 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch09-nicotinic-antagonists-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "琥珀胆碱主要用于___和___。",
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
        "气管插管等短时操作；辅助麻醉",
        "琥珀胆碱为除极化型肌松药，肌松作用快、维持时间短，常用于气管内插管、气管镜、食管镜检查等短时操作；静脉滴注可维持较长时间的肌松作用，作为辅助麻醉用于外科手术，以减少麻醉药用量、保证手术安全。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch09-nicotinic-antagonists-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "琥珀胆碱松弛骨骼肌的主要机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制中枢多突触反射",
      "减少运动神经末梢ACh的释放",
      "使运动终板膜产生持久的去极化",
      "与ACh竞争运动终板膜上的Nm受体",
      "抑制脊髓γ运动神经元",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "使运动终板膜产生持久的去极化",
        "琥珀胆碱为除极化型肌松药，分子结构与 ACh 相似，能与运动终板膜上的 Nm 胆碱受体结合，产生与 ACh 相似但较持久的除极化作用，使运动终板膜不能对 ACh 起反应，骨骼肌因而松弛。原书 A1 型题第 1 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch09-nicotinic-antagonists-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述除极化型肌松药的作用机制。",
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
        "除极化型肌松药为非竞争性肌松药，其分子结构与 ACh 相似，能与神经肌肉接头后膜的胆碱受体结合，产生与 ACh 相似但较持久的除极化作用，使神经肌肉接头后膜的 Nm 胆碱受体不能对 ACh 起反应，从而使骨骼肌松弛。",
        "此类药物本身产生类似 ACh 的持久除极化，使运动终板持续处于除极化状态，神经肌肉接头传递被阻断，骨骼肌松弛；抗胆碱酯酶药不能拮抗其肌松作用，故过量中毒时不能用新斯的明解救。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/* 无 B1 配伍题（原书 7～8 题 1 组共 2 成员，因预算限制未取） */
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
