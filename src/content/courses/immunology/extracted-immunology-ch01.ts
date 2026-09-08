import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第1章 免疫学概论 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：11 题（含 A2 病例题 4 题）
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：25 题（须等于本文件预算 25）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 5、选择题（A1 型 45 + A2 型 15）与问答题 6；
 *   本文件按 25 道预算在原书顺序内取材，选择题围绕免疫系统的组成/功能、固有与适应性免疫、
 *   免疫学发展史取样。A2 型按项目规约与 A1 型一起映射为 a1-single，正确项对齐章末参考答案
 *   键号。OCR 错字与符号已按免疫学医学语义恢复（如 CD4⁻/CD4⁺、αβT 细胞、α/β 链等），
 *   数字（百分比、页数、天等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch01-introduction";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第1章 免疫学概论 习题（核对PDF 第8–19页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch01-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：医学免疫学",
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
        "医学免疫学",
        "是研究人体免疫系统的结构和功能的科学，该学科重点阐明免疫系统识别抗原和危险信号后发生免疫应答及其清除抗原的规律，探讨免疫功能异常所致疾病及其发生机制，为这些疾病的诊断、预防和治疗提供理论基础和技术方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫防御",
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
        "免疫防御",
        "防止外界病原体的入侵及清除已入侵病原体（如细菌、病毒、真菌、支原体、衣原体、寄生虫等）及其他有害物质。免疫防御功能过低或缺如，可发生免疫缺陷病；若应答过强或持续时间过长，则清除病原体的同时也可导致组织损伤或功能异常，如发生超敏反应等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫监视",
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
        "免疫监视",
        "随时发现和清除体内出现的“非己”成分，如由基因突变而产生的肿瘤细胞以及衰老、死亡细胞等。免疫监视功能低下可能导致肿瘤的发生。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫自稳",
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
        "免疫自稳",
        "通过自身免疫耐受和免疫调节两种主要的机制来达到机体内环境的稳定。免疫系统对自身组织细胞不产生免疫应答即免疫耐受，赋予免疫系统区别“自身”和“非己”的能力；一旦免疫耐受被打破、免疫调节功能紊乱，会导致自身免疫病和过敏性疾病的发生。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：免疫应答",
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
        "免疫应答",
        "指免疫系统识别和清除“非己”物质的整个过程，可分为固有免疫（innate immunity）和适应性免疫（adaptive immunity）两大类。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），11 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch01-introduction-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫系统包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "免疫细胞、黏膜免疫系统、中枢免疫器官",
      "免疫器官、免疫细胞、免疫分子",
      "中枢免疫器官、免疫细胞、皮肤免疫系统",
      "免疫分子、黏膜免疫系统、皮肤免疫系统",
      "中枢免疫器官、外周免疫器官",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫器官、免疫细胞、免疫分子",
        "免疫系统由免疫器官（中枢如胸腺、骨髓，外周如脾脏、淋巴结等）、免疫细胞（T、B 淋巴细胞、吞噬细胞、NK 细胞、树突状细胞等）、免疫分子（TCR、BCR、CD 分子、补体、细胞因子等）组成。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "现代免疫的概念是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "机体抗感染的防御功能",
      "机体清除损伤和衰老细胞的功能",
      "机体排除病原微生物的功能",
      "机体识别、杀灭与清除自身突变细胞的功能",
      "机体识别和排除抗原性异物的功能",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "机体识别和排除抗原性异物的功能",
        "现代免疫的概念指机体识别“自己”和“非己”，并对抗原性异物识别、排除以维持生理平衡稳定。原书 A1 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "具有特异性免疫功能的免疫分子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["抗体", "抗菌肽", "细胞因子", "溶菌酶", "补体"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗体",
        "抗体是由 B 细胞等分泌、可与相应抗原特异性结合的免疫球蛋白，具有特异性免疫功能；抗菌肽、溶菌酶属固有免疫效应分子，细胞因子、补体多是非特异性相关的免疫分子。原书 A1 答案第 4 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫细胞不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["粒细胞", "抗原提呈细胞", "巨噬细胞", "成纤维细胞", "淋巴细胞"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "成纤维细胞",
        "成纤维细胞属结缔组织细胞，不属于免疫细胞；粒细胞、巨噬细胞、淋巴细胞及抗原提呈细胞（如树突状细胞）均属免疫细胞。原书 A1 答案第 16 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "适应性免疫的特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可产生免疫记忆",
      "无针对病原体的特异性",
      "经遗传获得",
      "包括物理屏障和化学屏障作用",
      "感染早期迅速发挥作用",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "可产生免疫记忆",
        "适应性免疫由 T、B 淋巴细胞介导，具有特异性、耐受性和记忆性等特点，可产生免疫记忆；固有免疫经遗传获得、无特异性、感染早期即发挥作用。原书 A1 答案第 17 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于专职抗原提呈细胞的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["中性粒细胞", "树突状细胞", "内皮细胞", "NK 细胞", "肥大细胞"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "树突状细胞",
        "专职抗原提呈细胞包括树突状细胞（DC）、巨噬细胞和 B 细胞；中性粒细胞、NK 细胞、内皮细胞不属于专职抗原提呈细胞。原书 A1 答案第 24 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "最早创造用人痘苗接种预防天花的国家是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["日本", "英国", "俄国", "朝鲜", "中国"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中国",
        "我国约 16 世纪开始接种人痘预防天花，是经验免疫学时期的重要开端；英国 Jenner 后来发明牛痘苗。原书 A1 答案第 31 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫防御功能低下的机体易发生",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肿瘤",
      "超敏反应",
      "自身免疫病",
      "反复感染",
      "免疫增生性疾病",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "反复感染",
        "免疫防御功能低下或缺如时，机体对病原体的入侵和清除能力下降，易发生反复感染；免疫监视下降易发生肿瘤，免疫自稳紊乱易致自身免疫病，防御过强易致超敏反应。原书 A2 答案第 46 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "机体免疫自稳功能失调，可引发",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "免疫缺陷病",
      "病毒持续感染",
      "肿瘤",
      "免疫增生性疾病",
      "自身免疫病",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "自身免疫病",
        "免疫自稳功能失调（免疫耐受被打破、免疫调节功能紊乱）时，免疫系统可对自身组织产生应答，引起自身免疫病和过敏性疾病。原书 A2 答案第 47 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫功能正常的人不易得恶性肿瘤，艾滋病等免疫功能低下或缺陷的人患恶性肿瘤的概率则大幅度上升，这是因为免疫系统具有哪种功能",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["免疫防御", "免疫耐受", "免疫监视", "免疫调节", "免疫自稳"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫监视",
        "免疫监视功能随时发现和清除体内因基因突变而产生的肿瘤细胞及衰老、死亡细胞；该功能低下时易发生肿瘤。原书 A2 答案第 51 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "冬季流感高发，医生建议提前注射流感疫苗，尤其是儿童和老年人等免疫力较低者。注射流感疫苗属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "自然主动免疫",
      "自然被动免疫",
      "人工主动免疫",
      "人工被动免疫",
      "细胞过继被动免疫",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "人工主动免疫",
        "接种疫苗后由机体自身产生免疫力属人工主动免疫；注射抗毒素/血清属人工被动免疫，母-婴经胎盘/初乳获得属自然被动免疫。原书 A2 答案第 58 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch01-introduction-fill001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "人体的免疫系统由___、___、___组成。",
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
        "免疫器官；免疫细胞；免疫分子",
        "免疫系统由免疫器官（中枢与外周免疫器官）、免疫细胞和免疫分子三部分组成。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-fill002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "机体的免疫功能可概括为___、___、___。",
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
        "免疫防御；免疫监视；免疫自稳",
        "免疫系统的基本功能概括为免疫防御（抗感染）、免疫监视（清除突变细胞）和免疫自稳（维持内环境稳定）三大功能。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-fill003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "免疫应答可分为___和___两大类。",
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
        "固有免疫；适应性免疫",
        "免疫应答按是否先天获得可分为固有免疫（天然免疫、非特异性）和适应性免疫（特异性、有记忆性）两大类。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-fill004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "适应性免疫包括___和___两大类。",
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
        "细胞介导的免疫；体液免疫",
        "适应性免疫包括体液免疫（由 B 细胞产生的抗体介导，主要针对胞外病原体和毒素）和细胞介导的免疫（细胞免疫，由 T 细胞介导，主要针对胞内病原体）两类。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-fill005",
    order: 21,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "免疫学的发展可人为地划分为___时期、___时期和___时期三个时期。",
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
        "经验免疫学；实验免疫学；科学免疫学",
        "免疫学发展经历了经验免疫学时期（种人痘、牛痘苗）、实验免疫学时期（疫苗研制、细胞与体液免疫学派、克隆选择学说）和科学免疫学时期（分子免疫学、细胞免疫学等分支学科形成）。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch01-introduction-short001",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述免疫系统的功能。",
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
        "免疫系统三大基本功能",
        "免疫功能是机体识别和清除外来入侵抗原及体内突变或衰老细胞并维持机体内环境稳定的功能的总称，可概括为：①免疫防御：防止外界病原体入侵及清除已入侵病原体及其他有害物质，功能过低或缺如可致免疫缺陷病，应答过强或持续时间过长可致组织损伤或超敏反应等。②免疫监视：随时发现和清除体内出现的“非己”成分（如肿瘤细胞及衰老、死亡细胞），功能低下可致肿瘤发生。③免疫自稳：通过自身免疫耐受和免疫调节两种机制维持机体内环境稳定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-short002",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述机体免疫系统具有双重功能（有益或有害）的理论基础。",
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
        "免疫功能的双重性理论基础",
        "免疫指机体对“自己”或“非己”的识别并排除非己抗原性异物的功能，免疫系统借以维持机体生理平衡稳定，担负免疫防御、免疫监视、免疫自稳和免疫调节等功能。在免疫功能正常时，免疫系统对非己抗原产生排异效应，发挥免疫保护作用（如抗感染免疫和抗肿瘤免疫），对自身抗原成分则形成免疫耐受。但在免疫功能失调时，免疫应答可造成组织损伤并引起各种免疫性疾病：免疫应答效应过强可造成功能紊乱或组织损伤，引发超敏反应；自身耐受状态被破坏可导致自身免疫病；免疫防御和免疫监视功能降低则导致机体反复感染或肿瘤发生。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-short003",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试比较固有免疫和适应性免疫应答。",
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
        "固有免疫与适应性免疫的比较",
        "①获得形式：固有免疫为固有性（先天性）获得，适应性免疫为后天获得。②抗原参与：固有免疫无需抗原激发，适应性免疫需抗原激发。③发挥作用时相：固有免疫早期、快速（数分钟至 4 天），适应性免疫在 4~5 天后发挥效应。④识别受体：固有免疫用模式识别受体，适应性免疫用 T 细胞受体、B 细胞受体。⑤免疫记忆：固有免疫无，适应性免疫有、产生记忆细胞。⑥参与成分：固有免疫参与抑菌杀菌物质、补体、炎症因子、吞噬细胞、NK 细胞、NKT 细胞；适应性免疫参与 T 细胞（细胞免疫，效应 T 细胞等）和 B 细胞（体液免疫，抗体）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch01-introduction-short004",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述适应性免疫应答的定义及其主要特点。",
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
        "适应性免疫应答的定义与特点",
        "适应性免疫应答指体内 T、B 淋巴细胞接受“非己”物质刺激后自身活化、增殖、分化为效应细胞，产生一系列生物学效应（包括清除抗原等）的全过程。与固有免疫相比有三个主要特点，即特异性、耐受性、记忆性。适应性免疫包括体液免疫和细胞介导的免疫两类：体液免疫由 B 细胞产生的抗体介导，主要针对胞外病原体和毒素；细胞介导的免疫（细胞免疫）由 T 细胞介导，主要针对胞内病原体（如胞内寄生菌和病毒）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本书一般无 —— 置空 */
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