import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第05章 细菌耐药性 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：3 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、选择题（A1 型 8 + A2 型 4 + B1 型 1 组 3 小题）与
 *   简答题 3，无填空题。本文件按 13 道预算在原书顺序内取材：名词解释取前 4 道、简答全
 *   取；选择题取 A1 第 1~3 题；B1 取唯一一组（13~15，3 成员）完整组。正确项对齐章末
 *   参考答案键号。OCR 错字与双栏错序已按微生物学医学语义恢复（如 B-内酰胺→β-内酰胺
 *   等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch05-drug-resistance";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第05章 细菌耐药性 习题（核对PDF 第45–49页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch05-drug-resistance-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗菌药物（antimicrobial agents）",
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
        "抗菌药物",
        "抗菌药物是指具有抑菌或杀菌活性，用于治疗和预防细菌性感染的药物，包括抗生素和人工合成的药物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗生素（antibiotics）",
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
        "抗生素",
        "抗生素是指对特定微生物有抑制或杀灭作用的各种微生物（包括细菌、真菌和放线菌属）产物，分子量较低，低浓度时就能发挥其生物活性，有天然和人工半合成两类。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细菌耐药性（bacterial antimicrobial agent resistance）",
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
        "细菌耐药性",
        "细菌耐药性是指细菌对抗菌药物的相对不敏感性和抵抗性。耐药性的程度通常用药物对细菌的最小抑菌浓度表示。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：固有耐药性（intrinsic resistance）",
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
        "固有耐药性",
        "固有耐药性是指细菌对某些抗菌药物的天然不敏感，来源于细菌染色体上的耐药基因或天然缺乏药物作用的靶位，可代代相传，具有典型的种属特异性，且始终如一可以预测。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch05-drug-resistance-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "两性霉素 B 对细菌无效是因为细菌",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞膜缺乏固醇类",
      "细胞壁肽聚糖成分",
      "细胞壁脂质成分",
      "细胞膜磷脂成分",
      "细胞壁过于致密",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞膜缺乏固醇类",
        "两性霉素 B 能与真菌细胞膜上的固醇类结合，导致细胞膜通透性增加而杀菌；细菌细胞膜缺乏固醇类，故两性霉素 B 对细菌无效。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细菌耐药是指药物对菌株的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "最小抑菌浓度等于治疗浓度",
      "最小抑菌浓度大于治疗浓度",
      "最大抑菌浓度小于治疗浓度",
      "最小抑菌浓度小于治疗浓度",
      "最大抑菌浓度大于治疗浓度",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "最小抑菌浓度大于治疗浓度",
        "耐药性的程度通常用药物对细菌的最小抑菌浓度（MIC）表示，当 MIC 大于治疗浓度时，常规用药不能抑制该菌生长，即为耐药。原书 A1 答案第 2 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关固有耐药性的描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可代代相传",
      "来源于基因突变",
      "来源于细菌染色体上的耐药基因",
      "始终如一可以预测",
      "具有典型的种属特异性",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "来源于基因突变",
        "固有耐药性来源于细菌染色体上的耐药基因或天然缺乏药物作用的靶位，可代代相传，具有典型的种属特异性且始终如一可以预测；来源于基因突变的是获得耐药性。原书 A1 答案第 3 题为 B。",
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
    id: "ext-microbiology-ch05-drug-resistance-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述抗菌药物的作用机制及主要类别。",
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
        "抗菌药物的作用机制及主要类别",
        "抗菌药物的作用机制分为四类：①干扰细胞壁合成：抑制肽聚糖合成，细胞壁缺损，细菌裂解死亡，主要药物有 β-内酰胺类、多肽类和环丝氨酸等；②损伤细胞膜功能：多黏菌素可与细胞膜内磷脂结合，导致胞膜裂开、胞内成分外漏，两性霉素 B 可与真菌细胞膜上的固醇类结合，导致细胞膜通透性增加；③抑制蛋白质合成：氨基糖苷类和四环素类主要作用于细菌核糖体的 30S 亚单位，氯霉素和红霉素等主要作用于 50S 亚单位；④影响核酸及叶酸代谢：利福平特异性地与依赖 DNA 的 RNA 聚合酶结合抑制 mRNA 转录，喹诺酮类可抑制 DNA 旋转酶，磺胺类可竞争二氢叶酸合成酶，影响核酸合成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述细菌耐药性产生的机制。",
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
        "细菌耐药性产生的机制",
        "细菌耐药性的产生包括遗传机制和生化机制。（1）遗传机制：分为固有耐药性和获得耐药性。固有耐药性来源于细菌染色体上的耐药基因，可代代相传，具有典型的种属特异性；获得耐药性指细菌 DNA 的改变导致其获得了耐药性表型，细菌可通过基因突变、转移和重组等方式获得耐药表型。（2）生化机制：①钝化酶的产生：细菌产生的钝化酶通过水解或修饰，使药物在作用前即被破坏而失去抗菌作用；②药物作用靶位的改变：细菌改变抗生素作用靶位的蛋白结构和数量，影响药物与靶位的结合；③抗菌药物的渗透障碍：细胞壁障碍和（或）外膜通透性改变严重影响抗菌效能；④主动外排机制：细菌外膜上特殊的主动外排系统可将不同种类药物同时泵出，使菌体内药物浓度下降；⑤生物膜形成和细菌自身代谢状态的改变：细菌通过形成生物膜阻挡抗菌药物渗入，还可通过改变自身代谢状态（如休眠状态的芽胞菌）逃避抗菌药物的作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch05-drug-resistance-short003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述细菌耐药性的防治策略。",
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
        "细菌耐药性的防治策略",
        "①合理使用抗菌药物：严格遵守用药原则，以药敏试验作为用药依据；②严格执行消毒隔离制度：隔离耐药菌感染的病人，定期检查医务人员带菌情况；③加强药政管理：建立细菌耐药性监测网，抗菌药物凭医生处方供应，严格规范农牧渔业抗菌药物使用，药物的轮休可能恢复敏感性；④研发抗菌药物：改良现有抗生素，寻找有效的酶抑制剂，研发阻断耐药质粒转移和传播的药物，开发抗菌肽、微生物制剂和植物来源的药物；⑤寻找新手段：研发疫苗，建立新一代噬菌体疗法；⑥破坏耐药基因：探索利用分子生物学手段特异性消除细菌耐药基因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员（题组 13~15） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch05-drug-resistance-b001",
    order: 11,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["青霉素G", "红霉素", "链霉素", "土霉素", "氯霉素"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-microbiology-ch05-drug-resistance-b001m1",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "β-内酰胺类药物是",
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
            "青霉素G",
            "青霉素 G 属于 β-内酰胺类抗生素，通过抑制转肽酶、干扰细胞壁肽聚糖合成而杀菌。原书 B1 答案第 13 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch05-drug-resistance-b001m2",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "大环内酯类药物是",
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
            "红霉素",
            "红霉素属于大环内酯类抗生素，主要作用于细菌核糖体 50S 亚单位，抑制蛋白质合成。原书 B1 答案第 14 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch05-drug-resistance-b001m3",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "氨基糖苷类药物是",
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
            "链霉素",
            "链霉素属于氨基糖苷类抗生素，主要作用于细菌核糖体 30S 亚单位，抑制蛋白质合成。原书 B1 答案第 15 题为 C。",
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
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
