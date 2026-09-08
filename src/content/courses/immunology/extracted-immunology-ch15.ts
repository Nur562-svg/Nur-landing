import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第15章 黏膜免疫 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：12 题（含 A2 病例题）
 * - 问答题（short-answer）：3 题
 * - 独立记分题合计：22 题（须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 8、填空题 5、选择题 A1 型 35 + A2 型 8、B1 配伍题
 *   2 组 10 小题、问答题 4；按预算等比取材（B1 型按项目规约不纳入 a1-single，故未取）。
 *   A2 病例题保留全部临床细节。OCR 错字与双栏错序已按免疫学医学语义恢复（M细胞、IEL、
 *   plgR/FcRn、CD103⁺DC/CD11b⁺DC、TGF-β、克罗恩病/溃疡性结肠炎等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch15-mucosal-immunity";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第15章 黏膜免疫 习题（核对PDF 第167–176页）";
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
    id: "ext-immunology-ch15-mucosal-immunity-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肠相关淋巴组织",
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
        "肠相关淋巴组织（GALT）",
        "指位于肠道的淋巴组织，包括小肠壁上的派尔集合淋巴结、散在于整个肠道的独立淋巴滤泡、阑尾和「Waldeyer」氏环（腭扁桃体、腺样体和舌扁桃体）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：派尔集合淋巴结",
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
        "派尔集合淋巴结（PP）",
        "指位于小肠壁向肠腔突起的圆顶状结构，人小肠中约有100~200个，富含T细胞、B细胞滤泡和树突状细胞，是启动肠道免疫应答的重要部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：M细胞",
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
        "M细胞",
        "指滤泡相关上皮中少数特化的上皮细胞，可直接将肠腔内的抗原物质内吞并转送至派尔集合淋巴结，促使诱导特异性免疫应答；对抗原具有胞吞转运作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：上皮内淋巴细胞",
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
        "上皮内淋巴细胞（IEL）",
        "指穿插分布在上皮细胞间的小淋巴细胞，几乎全是T细胞，且多为γδT细胞，约80%呈现CD8表型的杀伤性效应细胞。参与抗病毒、细菌、寄生虫感染，维持黏膜上皮组织的稳态和局部免疫平衡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），12 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于黏膜免疫系统组成部分的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胸腺", "泪腺", "唾液腺", "扁桃腺", "分泌期的乳腺"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸腺",
        "黏膜免疫系统由黏膜上皮组织、黏膜相关淋巴组织和肠道共生菌群构成；泪腺、唾液腺、扁桃腺、分泌期乳腺等均属黏膜相关，胸腺属中枢免疫器官，不属于黏膜免疫系统。原书 A1 答案第 3 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于肠相关淋巴组织的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胸腺", "泪腺", "阑尾", "肾上腺", "分泌期的乳腺"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阑尾",
        "肠相关淋巴组织（GALT）包括派尔集合淋巴结、独立淋巴滤泡、阑尾和「Waldeyer」氏环；阑尾属肠相关淋巴组织。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "防御素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["阳离子大蛋白", "阴离子大蛋白", "阳离子小分子肽", "阴离子小分子肽", "不带电荷小分子肽"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阳离子小分子肽",
        "防御素是一类阳离子小分子肽，具有直接杀菌作用，是黏膜抗菌肽的重要成分。原书 A1 答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "被称为黏膜免疫应答诱导部位的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "扁桃体、阑尾、肠系膜淋巴结",
      "腭扁桃体、腺样体、舌扁桃体",
      "派尔集合淋巴结、扁桃体、阑尾",
      "派尔集合淋巴结、独立淋巴滤泡、肠系膜淋巴结",
      "派尔集合淋巴结、独立淋巴滤泡、阑尾",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "派尔集合淋巴结、独立淋巴滤泡、肠系膜淋巴结",
        "黏膜免疫应答的诱导部位包括派尔集合淋巴结、独立淋巴滤泡和肠系膜淋巴结，是抗原识别和肠黏膜免疫细胞激活的主要部位。原书 A1 答案第 11 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在黏膜免疫系统占主导地位的免疫球蛋白是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgA", "IgD", "IgE", "IgG", "IgM"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgA",
        "黏膜B细胞经DC产生的TGF-β和RA诱导向IgA类别转换，黏膜免疫以分泌型IgA（SIgA）为主导免疫球蛋白。原书 A1 答案第 14 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于上皮内淋巴细胞（IEL）的叙述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "位于黏膜固有层",
      "以产生IgA的B细胞为主",
      "以CD4⁺T细胞为主",
      "以初始T细胞为主",
      "多为γδT细胞",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多为γδT细胞",
        "IEL穿插分布在上皮细胞间，几乎全是T细胞，且多为γδT细胞，约80%呈CD8表型；位于黏膜固有层的主要是黏膜效应T细胞。原书 A1 答案第 19 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于黏膜B淋巴细胞叙述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主要分泌IgM为主",
      "派尔集合淋巴结中生发中心的B细胞主要是IgA⁺B细胞",
      "通常是T细胞依赖性的",
      "需有共生菌或外来微生物抗原刺激才能产生",
      "主要分布在黏膜固有层",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "主要分泌IgM为主",
        "黏膜B细胞主要分化为分泌IgA为主的浆细胞（SIgA为主导），而非IgM为主；故「主要分泌IgM为主」错误。原书 A1 答案第 26 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于黏膜DC产生的TGF-β正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "主要由 CD11b⁺ DC 产生",
      "诱导黏膜B细胞向IgE 进行类别转换",
      "促进初始T细胞向 Th17细胞分化",
      "在诱导黏膜免疫耐受中起重要作用",
      "可促进肠道炎症的诱导分子",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "在诱导黏膜免疫耐受中起重要作用",
        "黏膜DC产生的TGF-β诱导黏膜B细胞向IgA类别转换，并在诱导黏膜免疫耐受（联合RA诱导Treg）中起重要作用。原书 A1 答案第 31 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "口服耐受是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "针对经口腔进入的蛋白质抗原产生耐受",
      "是中枢耐受的一种形式",
      "诱导非特异性T细胞产生反应",
      "与CD11b⁺DC 产生IL-12 有关",
      "与黏膜Th17有关",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "针对经口腔进入的蛋白质抗原产生耐受",
        "经口腔进入的蛋白质抗原的默认应答方式为口服耐受（外周耐受的一种），与CD103⁺DC诱导Treg有关，而非CD11b⁺DC产生IL-12或Th17。原书 A1 答案第 33 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1010",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "炎性肠病的主要免疫病理成因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠道微环境的改变（饮食、感染、抗生素）",
      "遗传因素引起淋巴细胞易于活化",
      "遗传因素引起细胞因子过度产生",
      "宿主对病原菌感染产生的免疫应答",
      "肠道菌群失调",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠道菌群失调",
        "炎性肠病（IBD）的主要免疫病理成因是肠道菌群失调（与遗传易感和肠道微环境改变共同作用导致肠黏膜完整性受损、免疫异常活化），属肠道慢性炎症性疾病。原书 A1 答案第 34 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1011",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，男性，20岁，熬夜后出现便血6月余。初为黄色成形便表面带少量鲜血，后发展为稀水样暗红色脓血便，社区医院予抗生素治疗无缓解，大便细菌培养阴性。结肠镜和病理显示升结肠慢性活动性炎，可见隐窝脓肿。该患者最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["急性胃肠炎", "细菌性痢疾", "克罗恩病", "溃疡性结肠炎", "结肠癌"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溃疡性结肠炎",
        "患者为年轻男性慢性脓血便、抗生素无效、细菌培养阴性，结肠镜见结肠慢性活动性炎及隐窝脓肿，符合溃疡性结肠炎（IBD）表现；克罗恩病多呈鹅卵石样、纵行溃疡等。原书 A2 答案第 38 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-a1012",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，女性，23岁，间断腹痛、腹泻1年。无明显诱因出现腹部隐痛，腹泻，初为稀糊便，无黏液脓血，此后球状便与稀糊便交替出现，小肠CTE显示肠管管腔不规则狭窄及扩张，结肠镜示回肠末段和回盲部纵行溃疡，有鹅卵石样改变。该患者最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["阿米巴肠炎", "肠易激综合征", "克罗恩病", "溃疡性结肠炎", "肠结核"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "克罗恩病",
        "年轻女性慢性腹痛腹泻、肠管狭窄扩张，结肠镜见回肠末段和回盲部纵行溃疡伴鹅卵石样改变，是克罗恩病的典型表现。原书 A2 答案第 41 题为 C。",
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
    id: "ext-immunology-ch15-mucosal-immunity-fill001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "黏膜免疫系统由___组织、___组织和___组成。",
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
        "黏膜上皮；黏膜相关淋巴；肠道共生菌群",
        "黏膜免疫系统由黏膜上皮组织、黏膜相关淋巴组织（GALT、NALT、BALT）和肠道共生菌群构成。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-fill002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "黏膜免疫应答的诱导部位包括___、___和___，是抗原识别和肠黏膜免疫细胞激活的主要部位。",
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
        "派尔集合淋巴结；独立淋巴滤泡；肠系膜淋巴结",
        "黏膜免疫应答诱导部位包括派尔集合淋巴结、独立淋巴滤泡和肠系膜淋巴结。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-fill003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "参与黏膜免疫的免疫球蛋白以___和___为主。",
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
        "IgA；IgM",
        "黏膜免疫以分泌型IgA（SIgA）为主导，另有IgM参与；黏膜B细胞向IgA类别转换为主。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch15-mucosal-immunity-short001",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：肠道共生菌群在黏膜免疫中有什么作用？",
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
        "肠道共生菌群辅助营养吸收代谢、维持屏障、与致病菌竞争、保证微环境稳定并调控免疫细胞分化",
        "①可辅助营养物质的摄取、代谢和毒素降解；②可维持上皮组织屏障以阻止病原菌的入侵和聚居；③可与病原菌竞争空间及养料，产生抗微生物物质；④抑制有利于病原菌入侵的上皮组织炎症反应，保证肠道微环境的稳定；⑤调控免疫细胞分化的作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-short002",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：黏膜免疫系统中有哪几类淋巴细胞，它们起什么作用？",
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
        "黏膜淋巴细胞包括IEL、黏膜效应T细胞、黏膜调节T细胞、ILC3和黏膜B淋巴细胞",
        "①上皮内淋巴细胞（IEL）：穿插分布在上皮细胞间，几乎全是T细胞且多为γδT细胞，约80%呈CD8表型杀伤性效应细胞，参与抗病毒、细菌、寄生虫感染，维持黏膜上皮稳态和局部免疫平衡。②黏膜效应T细胞：位于黏膜固有层，由局部黏膜表面持续的非病原性抗原刺激所致，对稳定宿主与肠道菌群共生关系重要；肠黏膜固有层CD4⁺/CD8⁺T细胞比例约3:1，多为Th1和Th17细胞，分泌大量细胞因子。③黏膜调节T细胞：分布于小肠黏膜固有层，为抗原特异的Foxp3⁺Treg，可抑制Th1、Th17、TCRγδ IEL等的活化及功能，调节肠道炎症反应。④固有淋巴细胞3（ILC3）：包括淋巴组织诱导细胞LTi和表达NKp44的细胞，分布于肠黏膜固有层，维持肠上皮稳态、抗感染、诱导外周淋巴组织及器官形成。⑤黏膜B淋巴细胞：黏膜中DC产生TGF-β和RA诱导黏膜B细胞向IgA类别转换，分化成T细胞依赖抗原特异性的IgA⁺B细胞；B1细胞多分化针对非T细胞依赖抗原IgA的浆细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch15-mucosal-immunity-short003",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：请具体描述黏膜淋巴细胞的再循环。",
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
        "黏膜淋巴细胞再循环：诱导部位活化→肠系膜淋巴结→胸导管→血液→回到效应部位分化",
        "位于黏膜免疫应答诱导部位的初始T和B细胞（表达CCR7及L-selectin），受到抗原刺激后（CCR7及L-selectin表达下降）离开诱导部位；然后经肠系膜淋巴结到达胸导管；最终经血液迁移回到黏膜免疫应答的效应部位，分化成效应或记忆T和B细胞（表达CD45RO、α4β7及CCR9）。诱导部位包括派尔集合淋巴结、独立淋巴滤泡、肠系膜淋巴结；效应部位包括黏膜上皮层和黏膜固有层。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题（本书第15章存在，但按契约不提取为独立记分题），置空 */
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