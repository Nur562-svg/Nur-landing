import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第00章 绪论 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：1 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、选择题（A1 型 6 + B1 型 1 组 2 小题）与简答题 2；
 *   本文件按 5 道预算在原书顺序内取材，名词解释与简答题全取，选择题取 A1 第 1 题。
 *   原书 B1 型题组共 2 个成员，若整组纳入将超出预算，故未纳入。OCR 错字与双栏错序
 *   已按微生物学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch00-introduction";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 绪论 习题（核对PDF 第12–15页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch00-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：医学微生物学",
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
        "医学微生物学",
        "医学微生物学是基础医学中的一门重要学科，主要研究与医学有关的病原微生物的生物学特性、致病机制、机体的抗感染免疫、特异性检测方法以及相关感染性疾病的防治措施等，以控制和消灭感染性疾病，达到保障和提高人类健康水平的目的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch00-introduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：机会致病性微生物",
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
        "机会致病性微生物",
        "有些微生物在正常情况下不致病，只是在特定情况下（如寄居部位改变、宿主免疫功能下降、菌群失调等）导致疾病，这类微生物称为机会致病性微生物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch00-introduction-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种微生物不属于原核细胞型微生物",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["细菌", "衣原体", "病毒", "支原体", "立克次体"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病毒",
        "原核细胞型微生物的原始核呈环状裸 DNA 团块结构，无核膜、核仁，细胞器不完善，只有核糖体，DNA 和 RNA 同时存在，包括细菌、支原体、衣原体、立克次体、螺旋体和放线菌等；病毒为非细胞型微生物，无典型细胞结构，只能在活细胞内生长增殖。原书 A1 答案第 1 题为 E。",
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

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch00-introduction-short001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述微生物的分类及其特点。",
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
        "微生物按大小、结构、组成分为三大类",
        "按微生物的大小、结构、组成等可将其分为三大类：①非细胞型微生物：无典型的细胞结构，无产生能量的酶系统，只能在活细胞内生长增殖，核酸类型为 DNA 或 RNA，病毒属于该类微生物。②原核细胞型微生物：原始核呈环状裸 DNA 团块结构，无核膜和核仁，细胞器不完善，只有核糖体，DNA 和 RNA 同时存在，可分为古生菌和细菌两大类，广义的细菌包括细菌、支原体、衣原体、立克次体、螺旋体和放线菌等。③真核细胞型微生物：细胞核分化程度高，有核膜和核仁，细胞器完整，真菌属于该类微生物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch00-introduction-short002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述“郭霍法则”的主要内容。",
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
        "郭霍法则四条内容",
        "“郭霍法则”是德国学者罗伯特·郭霍在研究炭疽芽胞杆菌后于 1884 年提出的关于致病微生物与疾病因果关系的原则，主要包括四条：①特殊的病原菌应在同一种疾病中查见，在健康人中不存在；②该特殊病原菌能被分离培养，得到纯种；③该纯培养物接种至易感动物，能产生同样病症；④自人工感染的实验动物体内能重新分离得到该病原菌纯培养。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章未纳入 —— 置空 */
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
