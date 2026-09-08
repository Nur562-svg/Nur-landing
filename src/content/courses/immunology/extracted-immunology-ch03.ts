import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第3章 抗原 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：8 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：19 题（须等于本文件预算 19）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 5、选择题（A1 型 45 + A2 型 5）、问答题 4 及
 *   B1 配伍题 2 组；本文件按 19 道预算取材，本章一般无多选，故未映射多选。原书选择题答案
 *   键号在章节尾连续编排（A1 与 A2 段标题错位），已按「题号—键号」一一对应恢复（如 A2 型
 *   第 47 题对应键号 C）。OCR 错字与符号已按免疫学医学语义恢复（CD4⁺/CD8⁺ T 细胞表位、
 *   TCR/BCR、MHC I/II 类等），数值保留原值。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch03-antigen";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第3章 抗原 习题（核对PDF 第31–41页）";
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
    id: "ext-immunology-ch03-antigen-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：半抗原",
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
        "半抗原（hapten）",
        "又称不完全抗原，为结构简单的小分子物质，其单独不能诱导免疫应答（不具备免疫原性），但与大分子蛋白质或多聚赖氨酸等载体交联或结合后可获得免疫原性诱导免疫应答；半抗原仍具备免疫反应性，可与应答效应产物（抗体）结合。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原表位",
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
        "抗原表位（epitope）",
        "又称抗原决定基，是抗原分子中决定免疫应答特异性的特殊化学基团，是抗原与 T/B 细胞抗原受体（TCR/BCR）或抗体特异性结合的最小结构与功能单位，一般含 5~15 个氨基酸残基。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：非胸腺依赖性抗原",
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
        "非胸腺依赖性抗原（TI-Ag）",
        "某些抗原刺激机体产生抗体时无需 T 细胞的辅助，又称非 T 细胞依赖性抗原（TI-Ag），如细菌脂多糖（LPS）和荚膜多糖。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：佐剂",
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
        "佐剂（adjuvant）",
        "指预先或与抗原同时注入体内、可增强机体对抗原的免疫应答或改变免疫应答类型的非特异性免疫增强剂，被广泛应用于预防接种疫苗的成分。常见佐剂如卡介苗（BCG）、氢氧化铝、低甲基化 CpG 寡核苷酸等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch03-antigen-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗原的基本特性是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "异物性和免疫反应性",
      "免疫原性和免疫反应性",
      "免疫反应性和异物性",
      "免疫反应性和特异性",
      "免疫原性和特异性",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫原性和免疫反应性",
        "抗原具备免疫原性（诱导机体产生适应性免疫应答的能力）和免疫反应性（与应答效应物质特异性结合的能力）两个基本特性；同时具备两者的物质称完全抗原。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "决定抗原特异性的分子基础是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抗原分子的物理性状",
      "抗原分子的异物性",
      "抗原分子所含的特殊化学基团",
      "抗原分子量的大小",
      "抗原结构的复杂型",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗原分子所含的特殊化学基团",
        "抗原分子中决定免疫应答特异性的特殊化学基团即抗原表位（抗原决定基），是决定抗原特异性的分子结构基础。原书 A1 答案第 3 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "半抗原属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["不完全抗原", "自身抗原", "超抗原", "非胸腺依赖性抗原", "耐受原"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "不完全抗原",
        "半抗原又称不完全抗原，为仅有免疫反应性而无免疫原性的小分子物质，须与载体交联后获得免疫原性。原书 A1 答案第 5 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于半抗原的特性，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "有免疫原性和免疫反应性",
      "有免疫原性，无免疫反应性",
      "有免疫反应性，无免疫原性",
      "与载体结合后才能与相应抗体结合",
      "多克隆激活剂",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "有免疫反应性，无免疫原性",
        "半抗原具备免疫反应性但无免疫原性，须与载体偶联后才具有免疫原性；其与载体结合的意义在于获得免疫原性并诱导抗体产生，而非与抗体结合的必需条件。原书 A1 答案第 8 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于非胸腺依赖性抗原的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["绵羊红细胞", "卡介苗", "脂多糖", "类毒素", "鸡卵清白蛋白"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脂多糖",
        "非胸腺依赖性抗原（TI-Ag）不需 T 细胞辅助即可诱导抗体产生，如细菌脂多糖（LPS）和荚膜多糖；蛋白质抗原多属胸腺依赖性抗原（TD-Ag）。原书 A1 答案第 12 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于胸腺依赖性抗原，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "位于胸腺内部的抗原",
      "需要在胸腺中才能诱导免疫应答的抗原",
      "刺激 B 细胞产生抗体需要 T 细胞辅助的抗原",
      "刺激 T 细胞应答需要 B 细胞辅助的抗原",
      "不需要 T、B 细胞辅助的抗原",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "刺激 B 细胞产生抗体需要 T 细胞辅助的抗原",
        "胸腺依赖性抗原（TD-Ag）刺激 B 细胞产生抗体时须依赖 T 细胞的辅助，多为蛋白质抗原；非胸腺依赖性抗原（TI-Ag）无需 T 细胞辅助。原书 A1 答案第 29 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗原结合价是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一个抗原中 T 细胞表位的数目",
      "抗原的氨基酸长度",
      "一个抗原中能与抗体结合的抗原表位数目",
      "半抗原结合载体的能力",
      "抗原的易接近性",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一个抗原中能与抗体结合的抗原表位数目",
        "抗原结合价指一个抗原分子中能与抗体结合的抗原表位数目。原书 A1 答案第 32 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，女性，40 岁，因心慌气短、眩晕、乏力、呼吸困难、下肢浮肿等症状 1 个月就诊，心电图和心脏超声检查显示左心室增大、心脏瓣膜病变，实验室检查证实感染 A 族溶血性链球菌，临床诊断为风湿性心脏病。该患者发病的主要机制为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "A 族溶血性链球菌感染心肌细胞",
      "A 族溶血性链球菌破坏红细胞导致氧含量不足",
      "抗 A 族溶血性链球菌抗原的抗体交叉攻击人心肌细胞",
      "A 族溶血性链球菌异常激活补体",
      "A 族溶血性链球菌刺激细胞因子过度释放",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗 A 族溶血性链球菌抗原的抗体交叉攻击人心肌细胞",
        "A 族溶血性链球菌抗原与人体心肌组织含有共同抗原表位（异嗜性抗原），感染诱生的特异性抗体可产生交叉反应攻击人心肌细胞，引发风湿性心脏病。原书 A2 答案第 47 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch03-antigen-fill001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "抗原具备___和___两个重要特性。",
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
        "免疫原性；免疫反应性",
        "抗原的两个基本特性为免疫原性（诱导机体产生适应性免疫应答的能力）和免疫反应性（与应答效应物质特异性结合的能力）。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-fill002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "病毒感染细胞合成的病毒蛋白为___，与 MHC I 类分子结合，最终被 CD8⁺ T 细胞识别；细菌毒素等抗原为___，与 MHC II 类分子结合，最终被 CD4⁺ T 细胞识别。",
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
        "内源性抗原；外源性抗原",
        "内源性抗原（如病毒感染细胞合成的病毒蛋白、肿瘤抗原）在胞质中被加工为抗原肽并与 MHC I 类分子结合，激活 CD8⁺ T 细胞；外源性抗原（如细菌蛋白、毒素）在内体溶酶体中被降解为抗原肽并与 MHC II 类分子结合，激活 CD4⁺ T 细胞。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-fill003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "非特异性免疫刺激剂包括___、___和___。",
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
        "超抗原；佐剂；丝裂原",
        "非特异性免疫刺激剂包括超抗原、佐剂和丝裂原三类，均可非特异性增强或改变免疫应答。原书填空题第 5 题答案。",
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
    id: "ext-immunology-ch03-antigen-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述抗原的基本特性。",
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
        "抗原的基本特性",
        "抗原具备免疫原性和免疫反应性两个特性：免疫原性指抗原被 T、B 细胞表面特异性抗原受体（TCR 或 BCR）识别及结合，诱导机体产生适应性免疫应答（活化的 T/B 细胞或抗体）的能力；免疫反应性指抗原与其诱导产生的免疫效应物质（活化的 T/B 细胞或抗体）特异性结合的能力。同时具备免疫原性和免疫反应性的物质称完全抗原。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 T 细胞抗原表位与 B 细胞抗原表位的异同。",
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
        "T/B 细胞表位的异同",
        "T 细胞表位需由 APC 加工处理后与 MHC 分子结合成复合物并提呈于 APC 表面，为线性表位。T 细胞表位又分：①CD8⁺ T 细胞表位，含 8~10 个氨基酸，其中第 2、9 位为锚定氨基酸；②CD4⁺ T 细胞表位，较长，含 13~17 个氨基酸。BCR 或抗体识别的 B 细胞表位，无需 APC 加工和提呈，含 5~15 个氨基酸，多为构象表位、少数为线性表位，位于抗原分子表面。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-short003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试比较 TD-Ag 和 TI-Ag 的特点。",
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
        "TD-Ag 与 TI-Ag 的比较",
        "①结构特点：TD-Ag 复杂、含多种表位，TI-Ag 含单一表位；②表位组成：TD-Ag 含 B 细胞和 T 细胞表位，TI-Ag 主要为重复 B 细胞表位；③T 细胞辅助：TD-Ag 必需，TI-Ag 无需；④MHC 限制性：TD-Ag 有，TI-Ag 无；⑤激活的 B 细胞：TD-Ag 激活 B2 细胞，TI-Ag 激活 B1 细胞；⑥免疫应答类型：TD-Ag 为体液免疫和细胞免疫，TI-Ag 为体液免疫；⑦抗体类型：TD-Ag 为 IgM、IgG、IgA 等，TI-Ag 为 IgM；⑧免疫记忆：TD-Ag 有，TI-Ag 无。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch03-antigen-short004",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述超抗原的性质及作用机制。",
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
        "超抗原的性质及作用机制",
        "超抗原（SAg）为多克隆激活剂，只需极低浓度（1~10 ng/ml）即可非特异性激活人体总 T 细胞库中 2%~20% 的 T 细胞克隆，产生极强的免疫应答。作用机制：SAg 不像普通抗原肽结合于 MHC 分子沟槽内，而是一端直接与 TCR 的 Vβ 链 CDR3 外侧区域结合，另一端交联 MHC II 类分子抗原结合槽外侧，以完整蛋白形式激活 T 细胞，不涉及 MHC 提呈抗原及 TCR 识别的过程，无 MHC 限制性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章一般无 —— 置空 */
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