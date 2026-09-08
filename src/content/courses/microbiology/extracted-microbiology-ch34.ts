import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第34章 朊粒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：1 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：0 组（本章原书含 2 组 B1 配伍题，本文件预算剩余未纳入）
 * - 独立记分题合计：7 题（须等于本文件预算 7）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、选择题（A1 型 5 + A2 型 2）、B1 型 2 组（共 4 成员）
 *   与简答题 3；本文件按 7 道预算取样，名词解释与简答题全取，选择题取 A1 1 道，
 *   B1 配伍题未纳入（预算剩余仅 1 道，不足以容纳完整 B1 组）。OCR 错字与符号已按
 *   微生物学医学语义恢复（如 PrPᶜ/PrPˢᶜ、α 螺旋/β 折叠、克-雅病等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch34-prion";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第34章 朊粒 习题（核对PDF 第250–253页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch34-prion-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：朊粒",
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
        "朊粒",
        "是一种由宿主细胞基因编码的、构象异常的蛋白质，不含核酸，具有自我复制能力和传染性，引起人和动物传染性海绵状脑病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch34-prion-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：克-雅病",
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
        "克-雅病",
        "由朊粒引起的人类最常见的传染性海绵状脑病，因由 Creutzfeldt 和 Jakob 两位神经病理学家分别于 1920 年和 1921 年首先报道，故名为克-雅病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch34-prion-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞朊蛋白",
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
        "细胞朊蛋白",
        "为正常人和动物组织细胞中存在的结构正常的朊蛋白，由 PrP 基因编码，对蛋白酶 K 敏感，不具有致病性和传染性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch34-prion-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "仅含有蛋白质成分，不含核酸的感染因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["衣原体", "类病毒", "朊粒", "缺陷病毒", "拟病毒"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "朊粒",
        "朊粒（prion）仅含蛋白质成分，不含核酸，具有自我复制能力和传染性；类病毒、拟病毒均含核酸，衣原体、缺陷病毒亦含核酸。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch34-prion-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 PrPᶜ 和 PrPˢᶜ 的主要区别。",
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
        "PrPᶜ 与 PrPˢᶜ 的主要区别",
        "PrPˢᶜ 是 PrPᶜ 的同源异构体，两者均由同一染色体基因编码，其氨基酸序列相同，但空间结构不同。PrPᶜ 是一种正常的糖基化膜蛋白，在多种组织尤其是中枢神经系统神经元中普遍表达，其分子构象主要以 α 螺旋为主，对蛋白酶 K 敏感，可溶于非变性去污剂，对人和动物没有致病性，也没有传染性。PrPˢᶜ 是羊瘙痒病朊蛋白，即朊粒，仅存在于感染的人和动物组织中，其分子构象以 β 折叠为主，对蛋白酶 K 有抗性，具有致病性与传染性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch34-prion-short002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述朊粒病的临床特征。",
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
        "朊粒病的临床特征",
        "朊粒病的临床特征有：①潜伏期长，可达数年甚至数十年之久；②一旦发病，病程呈亚急性、进行性发展，最终死亡；③临床上出现痴呆、共济失调、震颤等中枢神经系统症状；④病理学特征是脑皮质神经元空泡变性、死亡，星形胶质细胞增生，淀粉样斑块形成，脑皮质疏松呈海绵状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch34-prion-short003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：朊粒导致人类和动物的主要疾病有哪些？",
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
        "朊粒所致人类和动物的主要疾病",
        "（1）主要的人类朊粒病：库鲁病（Kuru）、克-雅病（CJD）、变异型克雅病（vCJD）。（2）主要的动物朊粒病：羊瘙痒病、牛海绵状脑病（BSE）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章原书含 2 组，本文件未纳入 —— 置空 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
