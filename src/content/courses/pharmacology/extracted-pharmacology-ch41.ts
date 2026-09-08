import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第41章 大环内酯类、林可霉素类及多肽类抗生素 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：3 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书无 B1 型题）
 * - 独立记分题合计：7 题（须等于本文件预算 7）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 2、选择题（A1 型 10 + A2 型 1）与
 *   简答题 3（含论述）；本文件按 7 道预算取材：名词解释全取、填空题全取、A1 型题
 *   取第 1–3 题、简答题取第 1 题；A1 型题第 4–10 题、A2 型题第 11 题及简答题
 *   第 2–3 题因预算未纳入。正确项对齐章末参考答案键号（A1 型题 1.C、2.B、3.D；
 *   本文件答案键号自 1–11 连续编号），选项已随机重排并同步 correctChoiceIndex。
 *   OCR 错字已按药理学医学语义恢复（如 紅霉素/红毒素→红霉素、葯/耐约性→药/耐药性、
 *   林可莓素/氯林可莓素→林可霉素/氯林可霉素、黄疽→黄疸、G*菌→G⁺菌、
 *   B-内酰胺→β-内酰胺、渗人→渗入、红霉素/红莓素→红霉素 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch41-macrolides-lincosamides-polypeptides";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第41章 大环内酯类、林可霉素类及多肽类抗生素 习题（核对PDF 第269–272页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：MLS 耐药",
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
        "细菌同时对大环内酯类、林可霉素类和链阳菌素耐药，简称 MLS 耐药",
        "MLS 耐药指细菌同时对大环内酯类-林可霉素类-链阳菌素产生耐药（macrolides-lincomycins-streptogramins resistance，MLSR）。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "万古霉素抗菌谱窄，仅对___等有强大杀菌作用且不产生耐药，但由于___和___等严重不良反应，故仅用于严重感染。",
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
        "革兰阳性菌；耳毒性；肾毒性",
        "万古霉素类对革兰阳性菌产生强大杀菌作用，尤其是 MRSA 和 MRSE，其不良反应主要为耳毒性、肾毒性等，故临床仅用于严重革兰阳性菌感染。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "杆菌肽抗菌谱类似于___，抗菌机制是___，不易产生耐药性，与其他抗生素也无交叉耐药性。",
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
        "青霉素G；抑制细胞壁合成",
        "杆菌肽对革兰阳性菌有强大的杀菌作用，作用机制是选择性地抑制细菌细胞壁合成过程中的脱磷酸化，阻碍细胞壁合成，同时损伤胞浆膜，细菌对其耐药性产生缓慢，与其他抗生素无交叉耐药性。原书填空题第 2 题答案。",
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
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大环内酯类对下述哪类细菌无效",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["衣原体和支原体", "革兰阴性球菌", "大肠埃希菌、变形杆菌", "革兰阳性菌", "军团菌"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "大肠埃希菌、变形杆菌",
        "大环内酯类常用于需氧 G⁺菌、G⁺球菌和厌氧球菌等感染，对大肠埃希菌、变形杆菌等革兰阴性杆菌无效。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于大环内酯类的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["林可霉素", "阿奇霉素", "克拉霉素", "红霉素", "罗红霉素"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "林可霉素",
        "大环内酯类抗生素主要包括红霉素、克拉霉素和阿奇霉素等；林可霉素属于林可霉素类抗生素。原书 A1 型题第 2 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "金黄色葡萄球菌引起的急慢性骨髓炎最好选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["头孢曲松", "阿莫西林", "克拉霉素", "克林霉素", "红霉素"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "克林霉素",
        "克林霉素易渗入骨组织中，对金黄色葡萄球菌引起的骨髓炎为首选药。原书 A1 型题第 3 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch41-macrolides-lincosamides-polypeptides-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "红霉素临床首选应用于哪些感染性疾病？",
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
        "红霉素临床常用于耐青霉素的金黄色葡萄球菌感染和对青霉素过敏者，还用于上述敏感菌所致的各种感染，也能用于厌氧菌引起的口腔感染和肺炎支原体、肺炎衣原体、溶脲脲原体等非典型病原体所致的呼吸系统、泌尿生殖系统感染。",
        "红霉素为耐青霉素的金黄色葡萄球菌感染和对青霉素过敏者的替代首选药，对肺炎支原体、肺炎衣原体、溶脲脲原体等非典型病原体所致的呼吸系统、泌尿生殖系统感染有效。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书无 B1 型题，导出空数组 */
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
