import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第48章 抗恶性肿瘤药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：3 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：4 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：0 题（简答题 3 题因预算未纳入，shortItems 为空数组）
 * - B1 配伍题：0 组（本章原书 1 组共 2 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、填空题 2、选择题（A1 型 8 + A2 型 8 +
 *   B1 型 1 组共 2 小题）与简答题 3；本文件按 9 道预算取材：名词解释全取、
 *   填空题全取、选择题取第 1–4 题（A1 型）；选择题第 5–16 题（含 A2 型 9–16）、
 *   B1 型题（17–18）及简答题第 1–3 题因预算未纳入。正确项对齐章末参考答案键号
 *   （选择题 1.A、2.C、3.C、4.D；本文件答案键号自 1–18 连续编号），选项已随机
 *   重排并同步 correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 葯→药、
 *   调亡→凋亡、于扰→干扰、阳止→阻止、蔥环类→蒽环类、丝裂莓素→丝裂霉素、
 *   他莫替芬→他莫昔芬、舒→硫 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch48-antitumor";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第48章 抗恶性肿瘤药 习题（核对PDF 第308–313页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch48-antitumor-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞周期特异性药物",
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
        "仅对细胞增殖周期的某些时相敏感，对其他时相和 G0 期细胞不敏感的药物",
        "细胞周期特异性药物如作用于 S 期细胞的抗代谢药物、作用于 M 期细胞的长春碱类药物等，此类药物对肿瘤细胞的作用往往较弱，需要一定时间才能发挥其杀伤作用。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch48-antitumor-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：获得性耐药性",
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
        "肿瘤细胞经化疗药物作用后，尤其是长期小剂量给药后才发生不敏感的现象",
        "化疗过程中肿瘤细胞对抗恶性肿瘤药物产生不敏感现象即耐药性，包括天然耐药性和获得性耐药性，其中表现最突出、最常见者为多药耐药性。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch48-antitumor-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生长比率",
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
        "肿瘤增殖细胞群与全部肿瘤细胞群之比称生长比率",
        "生长比率反映肿瘤中处于增殖状态的细胞比例，与肿瘤对抗肿瘤药物的敏感性相关。原书名词解释第 3 题。",
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
    id: "ext-pharmacology-ch48-antitumor-fill001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "按化学结构分，分子靶向药物可分为___和___。",
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
        "单克隆抗体类；小分子化合物类",
        "非细胞毒类抗肿瘤药主要针对肿瘤分子病理过程的关键调控分子为靶点，如调节体内激素平衡药物和分子靶向药物（单克隆抗体类和小分子化合物类）等。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch48-antitumor-fill002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "作用于有丝分裂期的抗肿瘤药物有___和___。",
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
        "长春碱（类）；紫杉醇（类）",
        "长春碱类和紫杉醇类均属微管蛋白活性抑制剂，作用于有丝分裂期（M 期）。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch48-antitumor-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下属于抗肿瘤分子靶向药物的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["他莫昔芬", "卡铂", "吉非替尼", "巯嘌呤", "博来霉素"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吉非替尼",
        "吉非替尼为 EGFR 酪氨酸蛋白激酶抑制剂，属于分子靶向药物（小分子化合物类）；他莫昔芬为激素类抗肿瘤药，卡铂、博来霉素、巯嘌呤为细胞毒类抗肿瘤药。原书 A1 型题第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch48-antitumor-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "目前临床治疗急性早幼粒细胞白血病（APL）的主要治疗方案为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "培美曲赛联合卡铂",
      "全反式维甲酸联合三氧化二砷",
      "卡铂联合 VP16",
      "吉西他滨联合 VP16",
      "紫杉醇联合卡铂",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "全反式维甲酸联合三氧化二砷",
        "全反式维甲酸联合三氧化二砷治疗急性早幼粒细胞白血病（APL），患者达到 5 年无病生存，且未见长期毒性作用，使 APL 成为第一种基本可被治愈的急性髓细胞性白血病。原书 A1 型题第 2 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch48-antitumor-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "阻碍细胞有丝分裂的抗癌药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["丝裂霉素", "甲氨蝶呤", "氟尿嘧啶", "紫杉醇", "顺铂"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "紫杉醇",
        "紫杉醇能促进微管聚合并抑制微管解聚，使纺锤体失去正常功能，细胞有丝分裂停止，属于阻碍细胞有丝分裂的抗癌药。原书 A1 型题第 3 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch48-antitumor-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "为了减轻甲氨蝶呤的毒性反应所用的救援剂是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["叶酸", "亚叶酸钙", "维生素 C", "磷酸亚铁", "维生素 B"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "亚叶酸钙",
        "甲氨蝶呤抑制二氢叶酸还原酶，为减轻其骨髓毒性，可肌注亚叶酸钙作救援剂，以保护骨髓正常细胞。原书 A1 型题第 4 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer）：本章简答题 3 题因预算未纳入，导出空数组 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题：本章原书 1 组共 2 小题，完整组超出剩余预算，导出空数组 */
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
