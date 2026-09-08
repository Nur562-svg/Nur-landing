import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 病理学学习指导与习题集 — 第18章 疾病的病理学诊断和研究方法 题库提取（等比取样）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：5 题
 * - 选择题（a1-single）：0 题（含 A1 型、A2 型病例题）
 * - 判断题 + 问答题（short-answer）：3 题（判断题 0、问答题 3）
 * - B1 配伍题：0 组（本书无 B1 型）
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、判断题、选择题（A1/A2）、问答题；本文件按 8 道预算在
 *   原书顺序内取材：名词解释取第 1–5 题（全取）、A1 型取第 0 题、A2 型取第 0 题、判断题取
 *   第 0 题、问答题取第 1–3 题（全取 4 题超出预算，取前 3）；名词解释与问答题合计已占满
 *   8 道预算，故判断题与选择题未纳入，未纳入的题因预算所限。本章选择题仅 A1 型 6 题（无
 *   A2 型病例题）。判断题答案按 √/× 键号归位（√=对、×=错）。OCR 错字已按病理学医学语义
 *   恢复（如 苏丹皿→苏丹Ⅲ、乙二醛→戊二醛、锇酸、荧光原位杂交 FISH、循环肿瘤细胞
 *   CTCs、循环肿瘤 DNA ctDNA、激光扫描共聚焦显微镜 LSCM、第二代测序 NGS、生物信息学、
 *   人工智能、细针穿刺、脱落细胞学等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pathology-ch18-pathological-diagnosis-and-research-methods";
const locatorBase =
  "《病理学学习指导与习题集》 第18章 疾病的病理学诊断和研究方法 习题（核对PDF 第293–299页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道（原书第 1–5 题，全取） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：荧光原位杂交（fluorescence in situ hybridization, FISH）",
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
        "荧光原位杂交是以荧光标记取代同位素标记而形成的一种新的原位杂交方法。其基本原理是将 DNA（或 RNA）探针用特异性的核苷酸分子标记，然后将探针直接杂交到染色体或 DNA 纤维切片上，再用与荧光素分子偶联的单克隆抗体与探针分子特异性结合，来检测 DNA 序列在染色体或 DNA 纤维切片上的定性、定位、相对定量分析。",
        "FISH 是原位杂交（ISH）技术的一种，以荧光素直接或间接标记已知 DNA 探针，可在组织切片、细胞涂片或染色体标本上原位检测特定 DNA 序列，用于基因在染色体上的定位、染色体数量异常和染色体易位等的检测。原书第18章名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA 芯片（DNA chip）",
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
        "DNA 芯片又称基因芯片，是指固着在固相载体上的高密度的 DNA 微点阵。即将大量靶基因或寡核苷酸片段有序、高密度地（点与点间距一般小于 500μm）排列在如硅片、玻璃片、聚丙烯或尼龙膜等载体上，形成基因芯片。",
        "DNA 芯片是生物芯片技术的一种，按功能用途可分为表达谱基因芯片、诊断芯片和检测芯片等三大类，可用于基因表达谱分析、肿瘤基因分型、基因突变检测、新基因的寻找以及抗生素和抗肿瘤药物的筛选和疾病的诊断等。原书第18章名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：循环肿瘤细胞（circulating tumor cell, CTCs）",
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
        "循环肿瘤细胞是指由实体瘤或转移灶释放进入外周血循环的肿瘤细胞。大部分肿瘤细胞进入循环系统后被免疫系统识别并清除，但少量肿瘤细胞会获得新的特征而在血循环中存活，这些细胞即是循环肿瘤细胞。",
        "CTCs 是液体活检的主要研究对象之一，与循环肿瘤 DNA（ctDNA）共同反映肿瘤分子谱特征，对肿瘤的早期诊断、疗效监测、预后评估及个体化治疗具有重要的临床意义。原书第18章名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：虚拟切片（virtual slides）",
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
        "虚拟切片是指系统通过计算机控制自动显微镜移动，并对观察到的病理切片（或图像）进行全自动聚焦扫描，逐幅自动采集数字化的显微图像，高精度多视野无缝隙自动拼图，拼接成一幅完整切片的数字图像。",
        "虚拟切片即数字切片，具有高清晰度、高分辨率、色彩逼真、操作便捷、易于保存、便于检索及教学管理等优点，在病理科信息管理、病理学教学、远程病理会诊和病理学研究中都有重要的应用。原书第18章名词解释第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：原位 PCR 技术（in situ polymerase chain reaction, in situ PCR）",
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
        "原位 PCR 技术是将 PCR 的高效扩增与原位杂交的细胞及组织学定位相结合，在冷冻切片或石蜡包埋组织切片、细胞涂片或培养细胞爬片上检测和定位核酸的技术。",
        "原位 PCR 可用于基因突变、基因重排的观察和研究，外源性基因的检测和定位，临床上还可用于对接受了基因治疗的患者体内导入基因的检测等。原书第18章名词解释第 5 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），0 道（本章选择题仅 A1 型 6 题，预算已由名词解释与问答题占满，未纳入） */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** 判断题 + 问答题（short-answer），3 道（判断题 0、问答题原书第 1–3 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：免疫组织化学染色技术的应用有哪些方面？",
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
        "免疫组织化学（IHC）可用于各种蛋白质或肽类物质表达水平的检测、细胞属性的判定、淋巴细胞的免疫表型分析、细胞增殖和凋亡的研究、激素受体和耐药基因蛋白表达的检测，以及细胞周期和信号转导的研究等。在常规的病理诊断中免疫组化应用包括：判断肿瘤的来源及类型；对肿瘤的良恶性进行综合判断；发现微小转移灶；激素受体及生长因子检测可判断预后和指导临床治疗；肿瘤多药耐药检测指导肿瘤化疗药物的选择；免疫相关性疾病的辅助诊断；病原微生物的检测等。",
        "IHC 利用抗原-抗体特异性结合反应检测和定位组织或细胞中的某种化学物质，最常用的检测显示系统是辣根过氧化物酶（HRP）-二甲基联苯胺（DAB）系统，阳性信号呈棕色细颗粒状。原书第18章问答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：激光扫描共聚焦显微镜的主要功能有哪些？",
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
        "①细胞、组织光学切片：利用计算机及图像处理系统对组织、细胞及亚细胞结构进行断层扫描，该功能也被形象地称为“细胞CT”或“显微CT”；②三维立体空间结构重建；③对活细胞的长时间动态观察；④细胞内酸碱度及细胞离子的定量测定；⑤采用荧光漂白恢复技术（FRAP）进行细胞间通信、细胞骨架的构成、生物膜结构和大分子组装等的研究；⑥细胞膜流动性测定和光活化技术等。",
        "激光扫描共聚焦显微镜（LSCM）将光学显微镜、激光扫描技术和计算机图像处理技术相结合，具有高分辨率、深度识别能力及纵向分辨率，主要使用直接或间接免疫荧光染色和荧光原位杂交技术。原书第18章问答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch18-pathological-diagnosis-and-research-methods-short003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：流式细胞术在医学基础研究和临床检测中的应用包括哪些方面？",
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
        "流式细胞术可应用于以下方面：①细胞 DNA 含量检测。通过检测细胞的 DNA 含量，进一步进行细胞周期、细胞倍体以及凋亡的分析；②肿瘤诊断与抗肿瘤药物研究。如对淋巴造血疾病进行免疫分型、细胞多药耐药基因的检测、癌基因和抑癌基因的检测；③细胞分选；④细胞内钙离子的测定；⑤细胞内蛋白质的测定。",
        "流式细胞术（FCM）是一种可对细胞或亚细胞结构进行快速测量的新型分析技术和分选技术，测量速度快，每秒钟可计测数万个细胞，可进行物理、化学特性等多参数测量。原书第18章问答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题（bGroups），0 组（本书无 B1 型） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
