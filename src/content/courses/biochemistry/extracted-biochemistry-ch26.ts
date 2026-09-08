import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第26章 基因诊断 和 基因治疗 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：9 题
 * - A1/A2 型选择题（a1-single）：8 题（A1 型 5 题 + A2 型 3 题）
 * - 简答题（short-answer）：0 题
 * - B1 配伍题：1 组、共 3 个成员（第42~44题 Southern/Northern/Western 印迹检测对象配伍）
 * - 独立记分题合计：20 题（须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0（已按源「参考答案」逐题锚定正确项，如实记录）
 * - 说明：本章原书题型分布为名词解释 9、A1 型选择题 38、A2 型选择题 3、B1 型配伍题
 *   10（分 4 组）、简答题 9。原生文本双栏错序导致部分 A1 题干与选项被打散，本文件按
 *   基因诊断（PCR-测序-基因芯片、等位基因特异 PCR、突变检测、RFLP/SSCP、印迹杂交）
 *   与基因治疗（病毒/非病毒载体、反义核酸、RNAi、基因置换/矫正/添加、离体 in vitro / 在体
 *   in vivo 途径）医学语义恢复题干、补全被拆散的选项。取满预算 20 题：全部 9 道名词解释、
 *   5 道代表性 A1 选择题、全部 3 道 A2 选择题，以及 1 组（3 成员）B1 配伍题；未纳入预算的
 *   其余 A1 选择题与简答题按预算舍去，不虚构、不凑数。数值、缩略语（PCR、RNA、DNA、
 *   SSCP、RFLP、ASO、ADA、PAH、BRCA 等）均保留原文。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "biochem-ch26-gene-diagnostics";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第26章 基因诊断 和 基因治疗 复习思考题 习题（核对原书PDF 第363–374页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），9 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch26-gene-diagnostics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因诊断（gene diagnosis）",
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
        "基因诊断",
        "基因诊断属于分子诊断，是以 DNA 和 RNA 为诊断材料，利用现代分子生物学和分子遗传学的技术方法，直接检测基因结构与功能及基因表达的异常，从而对疾病作出诊断的方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：斑点杂交（dot blot hybridization）",
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
        "斑点杂交",
        "斑点杂交是将待测样品的 RNA 或 DNA 变性后直接点样于硝酸纤维素膜上或尼龙膜上，然后再与相应的探针杂交并显示结果，用于基因组中特定基因及其表达的定性及定量研究。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：原位杂交（in situ hybridization, ISH）",
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
        "原位杂交",
        "原位杂交是用已标记的核酸探针与组织切片或细胞中的待测核酸互补序列杂交，从而对组织细胞中的核酸进行定性、定位和相对定量分析的方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：单链构象多态性（single-strand conformation polymorphism, SSCP）",
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
        "单链构象多态性",
        "单链构象多态性是一种基于单链 DNA 构象差别的快速、敏感、有效的检测 DNA 突变位点和多态性的方法。在非变性条件下，DNA 分子为维持其稳定而自身折叠形成具有一定空间结构的构象，这种构象由单链 DNA 分子中碱基序列决定，DNA 分子中的碱基变异导致其空间构象改变，从而使电泳迁移率发生改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：限制性片段长度多态性（restriction fragment length polymorphism, RFLP）",
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
        "限制性片段长度多态性",
        "限制性片段长度多态性是基于基因组中存在着许多限制性核酸内切酶位点，当用某种或几种限制性核酸内切酶对某一段基因消化时，就会产生大小不同的特定片段，这些片段称为限制性片段；在同种生物不同个体中出现的不同长度限制性片段类型就称为限制性片段长度多态性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA 指纹（DNA fingerprinting）",
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
        "DNA 指纹",
        "DNA 指纹是指人与人之间的某些 DNA 序列特征具有高度的个体特异性和终生稳定性，当利用人类染色体上小卫星 DNA 的核心序列为探针进行 RFLP 分析时，可检测到大量的高度可变区，从而产生相应的高度特异性图谱，正如人的指纹一般，故称为 DNA 指纹。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因治疗（gene therapy）",
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
        "基因治疗",
        "基因治疗是以改变人遗传物质为基础的生物医学治疗，即通过一定方式将人正常基因或有治疗作用的 DNA 片段导入人体靶细胞以矫正或置换致病基因的治疗方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因添加（gene augmentation）",
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
        "基因添加",
        "基因添加又称基因增补，是指通过导入外源基因使靶细胞表达其本身不表达的基因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因干预（gene interference）",
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
        "基因干预",
        "基因干预又称基因沉默或基因失活，是指采用特定的方式抑制某个基因的表达，或者通过破坏某个基因的结构而使之不能表达，以达到治疗疾病的目的；策略有反义核酸、核酶或干扰 RNA 技术等。",
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
    id: "ext-biochem-ch26-gene-diagnostics-a1001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于基因诊断的描述，错误的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "用于检测基因结构或表达异常",
      "检测对象包括 DNA、RNA 或蛋白质",
      "仅适用于遗传病的诊断",
      "可利用连锁的遗传标志进行间接诊断",
      "检测基因包括病原微生物的特定基因",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "仅适用于遗传病的诊断",
        "原书 A1 型选择题答案第 1 题为 C，即“仅适用于遗传病的诊断”是错误的。基因诊断可用于单基因病、多基因病及感染性疾病等多种疾患，应用范围广泛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以几滴血迹为样品即能进行基因诊断，体现了该技术具有的哪一项特点？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "高特异性",
      "应用范围广",
      "高灵敏性",
      "可早期诊断",
      "可快速诊断",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "高灵敏性",
        "原书 A1 型选择题答案第 2 题为 C，即高灵敏性。极微量（几滴血迹）样品即可检出，体现基因诊断灵敏度高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列各项中，不属于目前基因诊断常用的分子杂交技术的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Southern 印迹法",
      "Northern 印迹法",
      "Western 印迹法",
      "原位杂交",
      "DNA 芯片",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Western 印迹法",
        "原书 A1 型选择题答案第 3 题为 C，即 Western 印迹法。Western 印迹用于检测蛋白质，不属于基因诊断常用的核酸分子杂交技术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1004",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "点突变并未导致限制性酶切位点的改变时，不能用于该样本基因诊断的技术是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "DNA 测序",
      "PCR-RFLP",
      "PCR-ASO",
      "PCR-SSCP",
      "Southern 印迹",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "PCR-RFLP",
        "原书 A1 型选择题答案第 5 题为 B，即 PCR-RFLP。RFLP 依赖限制性内切酶识别位点的改变，若点突变未改变酶切位点则不能采用该方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1005",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "核酸分子杂交的原理是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "碱基互补配对",
      "磷酸化",
      "抗原抗体结合",
      "甲基化",
      "配体受体结合",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "碱基互补配对",
        "原书 A1 型选择题答案第 13 题为 E，即碱基互补配对。核酸分子杂交的本质是探针与待测核酸按碱基互补配对原则结合成双链。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1006",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "β 地中海贫血除极少数由基因缺失引起外，绝大多数由 β 珠蛋白基因不同类型的点突变（单个碱基的取代、插入或缺失）所致，但病人的 β 珠蛋白基因突变往往不涉及限制性酶切位点的改变，因此不宜采用下列哪种方法进行基因诊断？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "PCR-RFLP",
      "PCR-ASO",
      "DNA 测序",
      "反向斑点杂交",
      "PCR-变性高效液相色谱",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "PCR-RFLP",
        "原书 A2 型选择题答案第 39 题为 B，即 PCR-RFLP。因 β 珠蛋白基因点突变不涉及限制性酶切位点改变，RFLP 不适用，不宜采用该方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1007",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "第一例接受基因治疗的病人是一名 4 岁女孩，因体内缺乏腺苷脱氨酶（ADA）而患有重度联合免疫缺陷症。采用的治疗方法为：先分离外周血单个核细胞，用含有 CD3 抗体和 IL-2 的培养液培养促进 T 淋巴细胞增殖，再以携带 ADA 基因的逆转录病毒感染 T 细胞，数日后回输给病人，经反复治疗免疫功能明显增强。这一基因治疗策略属于下列哪一类？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因置换",
      "基因矫正",
      "基因干预",
      "基因增补",
      "基因免疫治疗",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因增补",
        "原书 A2 型选择题答案第 40 题为 D，即基因增补（基因添加）。不删除缺陷基因，而是将正常 ADA 基因导入靶细胞以补偿其功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch26-gene-diagnostics-a1008",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "1 岁男童，智力发育迟缓、皮肤干燥、毛发色浅，汗液尿液呈鼠尿味，高度疑诊苯丙酮酸尿症（phenylketonuria, PKU）。该病病因是肝内苯丙氨酸羟化酶（PAH）基因突变导致 PAH 缺乏，苯丙氨酸不能转变为酪氨酸。对该病最理想的基因治疗策略是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因置换",
      "基因矫正",
      "基因干预",
      "自杀基因治疗",
      "基因免疫治疗",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因置换",
        "原书 A2 型选择题答案第 41 题为 A，即基因置换。用正常基因通过重组原位替换致病基因是最为理想的治疗策略。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer）：本章未纳入预算，为空数组 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题（42~44题：Southern/Northern/Western 印迹检测对象），1 组、3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch26-gene-diagnostics-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "DNA",
      "RNA",
      "蛋白质",
      "多糖类",
      "脂肪",
    ],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch26-gene-diagnostics-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "（42 题）Southern 印迹法检测的是",
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
            "DNA",
            "原书 B1 型题参考答案 42 题为 A，即 DNA。Southern 印迹以标记的 DNA 探针检测样本中的 DNA。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch26-gene-diagnostics-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "（43 题）Northern 印迹法检测的是",
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
            "RNA",
            "原书 B1 型题参考答案 43 题为 B，即 RNA。Northern 印迹以标记的 DNA 或 RNA 探针检测样本中的总 RNA 或 mRNA。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch26-gene-diagnostics-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "（44 题）Western 印迹法检测的是",
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
            "蛋白质",
            "原书 B1 型题参考答案 44 题为 C，即蛋白质。Western 印迹（蛋白印迹）用于检测特异性蛋白质。",
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
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];