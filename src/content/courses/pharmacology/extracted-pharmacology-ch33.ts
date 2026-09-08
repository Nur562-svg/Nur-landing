import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第33章 子宫平滑肌兴奋药和抑制药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：3 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 1 组共 5 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 3、选择题（A1 型 9 + A2 型 1 + B1 型
 *   1 组共 5 小题）与简答题 4；本文件按 8 道预算取材。名词解释全取 2，填空题取前
 *   2 道，选择题取 A1 型前 3 道（映射为 a1-single），简答题取第 1 道；原书 B1 型题
 *   仅 1 组共 5 小题（11～15 题共用备选答案），整组取用将超出预算容纳，故本章未取
 *   B1 组，A2 型病例题（第 10 题）与填空题第 3 题及简答题第 2～4 题亦因预算未纳入。
 *   正确项对齐章末参考答案键号（A1 型题 1.E/2.D/3.B），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复（如 葯→药、
 *   縮宫素→缩宫素、B肾上腺素受体→β肾上腺素受体、o受体→α受体、强制性收缩→
 *   强直性收缩、mmlig→mmHg 等），剂量单位与数值（2~5U、5~10U、150/95mmHg 等）
 *   保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch33-uterine-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第33章 子宫平滑肌兴奋药和抑制药 习题（核对PDF 第224–228页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch33-uterine-drugs-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：子宫平滑肌兴奋药",
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
        "是指可选择性地兴奋子宫平滑肌的药物，包括缩宫素、麦角生物碱、垂体后叶素和前列腺素类，其药理作用可因子宫的生理状态和用药剂量的不同而有差异，既可致子宫节律性收缩，也可致子宫强直性收缩。",
        "子宫平滑肌兴奋药临床上可用于催产、引产、产后止血及产后子宫复原。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch33-uterine-drugs-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：子宫平滑肌抑制药",
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
        "是指可抑制子宫平滑肌收缩的药物，包括 β 肾上腺素受体激动药、钙通道阻滞药、硫酸镁、环氧酶抑制药和催产素拮抗药等。",
        "子宫平滑肌抑制药可减弱子宫平滑肌收缩力、减慢收缩节律，临床上主要用于痛经和防治早产。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch33-uterine-drugs-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "缩宫素对子宫平滑肌的作用可因子宫的___状态和药物的___不同而有差异。小剂量可使子宫产生节律性收缩，用于___；大剂量可产生强直性收缩，用于___。",
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
        "生理；剂量；催产和引产；产后止血和子宫复原",
        "缩宫素的收缩强度取决于剂量及子宫的生理状态：小剂量（2~5U）产生节律性收缩，用于催产和引产；大剂量（5~10U）产生强直性收缩，用于产后止血和子宫复原。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch33-uterine-drugs-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "垂体后叶素内含___和___，主要用于___和___。",
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
        "缩宫素；血管升压素（抗利尿激素）；肺出血；尿崩症",
        "垂体后叶素内含缩宫素和抗利尿激素（血管升压素）两种成分，两者的化学结构基本相似，临床上可用于治疗尿崩症及肺出血。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），3 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch33-uterine-drugs-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列药物常与麦角胺合用治疗偏头痛的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["前列腺素", "咖啡因", "酚妥拉明", "巴比妥", "苯巴比妥"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咖啡因",
        "咖啡因是中枢兴奋药，具有收缩脑血管的作用，并可提高麦角胺的吸收速率与血药浓度，与麦角胺合用可在收缩脑血管方面产生协同作用，增强治疗偏头痛的疗效。原书 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch33-uterine-drugs-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "麦角胺治疗偏头痛的作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制前列腺素合成",
      "收缩脑血管",
      "阻断血管平滑肌 α 受体",
      "镇痛作用",
      "增加脑血流量",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "收缩脑血管",
        "麦角胺能直接收缩脑血管，减少脑动脉搏动幅度，从而减轻偏头痛，可用于偏头痛的诊断及其发作时的治疗，其本身无镇痛作用。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch33-uterine-drugs-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "麦角新碱不能用于催产和引产的原因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "使血压下降",
      "作用较弱",
      "对子宫有较强的兴奋作用，可发生强直性收缩",
      "妊娠子宫对其敏感性低",
      "起效缓慢",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "对子宫有较强的兴奋作用，可发生强直性收缩",
        "麦角新碱用药剂量稍大即可引起包括子宫体和子宫颈在内的子宫平滑肌强直性收缩，妊娠后期子宫对其敏感性增强，不利于胎儿娩出，故只可用于产后止血和子宫复原，不宜用于催产和引产。原书 A1 型题第 3 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch33-uterine-drugs-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述缩宫素的用药剂量与药效的关系。",
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
        "缩宫素能够直接兴奋子宫平滑肌，加强子宫平滑肌的收缩力和收缩频率。子宫平滑肌的收缩强度取决于缩宫素的剂量及子宫的生理状态。小剂量（2~5U）可加强妊娠末期子宫的节律性收缩，其收缩性质与正常分娩近似，使子宫底部产生节律性收缩，对子宫颈则产生松弛作用，促使胎儿顺利娩出；大剂量（5~10U）则可使子宫平滑肌发生持续性的强直性收缩，不利于胎儿的娩出。",
        "缩宫素小剂量用于催产和引产，大剂量用于产后止血和子宫复原，故临床用药必须根据子宫收缩反应调整剂量。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/**
 * B1 共用备选答案配伍题（本章原书 1 组共 5 小题（11～15 题共用备选答案），
 * 整组取用超出本文件预算，按“B1 必须取完整组”规约未取样，故导出空数组）
 */
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
