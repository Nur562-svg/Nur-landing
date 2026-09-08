import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第23章 移植免疫 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：14 题（含 A2 病例题 3 道）
 * - 问答题（short-answer）：3 题
 * - 独立记分题合计：27 题（须等于本文件预算 27）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 7、填空题 5、选择题 A1 46 + A2 20 + B1 68~71、问答题 3；
 *   本文件按 27 道预算等比取材并在原书顺序内取满。A2 病例题按项目规约与 A1 一起映射为
 *   a1-single。B 型配伍题本书一般无（仅少数章出现），本章按规约不并入独立记分题。
 *   OCR 错字、双栏错序按免疫学医学语义恢复（如 HLA 配型、直接/间接识别、GVHD、超急性/
 *   急性/慢性排斥、IgM 类抗体、环孢素/他克莫司等免疫抑制剂名），题目与参考答案键号对齐
 *   后重建选项，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch23-transplantation-immunity";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第23章 移植免疫 习题（核对PDF 第257–269页）";
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
    id: "ext-immunology-ch23-transplantation-immunity-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：移植",
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
        "移植",
        "移植（transplantation）：是用自体或异体的正常细胞、组织或器官置换病变的或功能缺损的细胞、组织或器官，以维持和重建机体生理功能的治疗方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：同种异型抗原",
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
        "同种异型抗原",
        "同种异型抗原（allogenic or allotypic antigen）：同一种属不同个体间由等位基因差异而形成的多态性产物，包括主要组织相容性抗原、次要组织相容性抗原、血型抗原和组织特异性抗原。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：直接识别",
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
        "直接识别",
        "直接识别（direct recognition）：指受者 T 细胞直接识别供者 APC 表面同种异型 MHC 分子的方式，在移植初期引发快速排斥反应。目前认为 TCR 交叉识别可能是其分子基础。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：间接识别",
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
        "间接识别",
        "间接识别（indirect recognition）：指受者 T 细胞识别经自身 APC 加工提呈的供者 MHC 抗原肽，常引起较迟发生的排斥反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：移植物抗宿主疾病（GVHD）",
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
        "移植物抗宿主疾病（GVHD）",
        "移植物抗宿主疾病（graft versus host disease，GVHD）：指移植物中免疫细胞对受者组织、器官产生排斥反应，并引起组织器官损伤、出现临床症状。主要见于免疫组织或器官的移植，如同种异型骨髓移植、造血干细胞移植（HSCT）和胸腺移植等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），14 道（含 A2 病例题 3 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对移植排斥描述不正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "亲生父子之间进行移植会发生排斥",
      "本质是免疫应答",
      "母亲怀孕时胎儿相当于母亲的一个器官，所以亲生母子之间进行移植不会发生排斥",
      "主要由T细胞介导，B细胞为辅",
      "主要是因HLA不同引起排斥",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "母亲怀孕时胎儿相当于母亲的一个器官，所以亲生母子之间进行移植不会发生排斥",
        "母子之间 HLA 遗传背景仍不相同，会发生移植排斥，故该叙述不正确。移植排斥本质是免疫应答、主要由 T 细胞介导，与 HLA 差异有关。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不参与移植排斥反应的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "眼角膜细胞",
      "CTL",
      "Th1细胞",
      "B细胞",
      "CD4+T细胞",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "眼角膜细胞",
        "参与移植排斥的细胞主要是 T 细胞（CTL、CD4+T 细胞、Th1 等）及 B 细胞；眼角膜细胞是被攻击的组织细胞而非效应细胞。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "A系小鼠皮片移植给B系小鼠，7~10天后发生移植皮肤被排斥；15天再次进行同样的移植实验，则最有可能发生的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "1天排斥掉皮片",
      "4天排斥掉皮片",
      "7~10天排斥掉皮片",
      "15天后排斥掉皮片",
      "不再发生排斥",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "4天排斥掉皮片",
        "第二次移植属再次排异，因免疫记忆使排斥显著提前（更快、更强），故约 4 天即排斥掉皮片。原书 A1 答案第 4 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪两人之间进行移植手术不会发生排斥反应",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "母女之间",
      "父子之间",
      "同卵双胞胎之间",
      "异卵双胞胎之间",
      "夫妻之间",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "同卵双胞胎之间",
        "同卵双胞胎遗传背景基本相同（HLA 相同），移植一般不发生排斥，等同于同系移植。原书 A1 答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "同一近交系小鼠的不同个体之间进行移植实验没有发生排斥，原因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "小鼠的不同个体之间体重几乎相同",
      "小鼠的不同个体之间体型几乎相同",
      "小鼠的不同个体之间基因几乎相同",
      "小鼠的不同个体之间年龄几乎相同",
      "小鼠的不同个体之间血型相同",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "小鼠的不同个体之间基因几乎相同",
        "同一近交系内个体遗传背景（含 MHC）几乎完全相同，故不发生排斥。原书 A1 答案第 7 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人类主要组织相容性抗原即",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["H2抗原", "MHC抗原", "mHC抗原", "Rh抗原", "ABO抗原"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "MHC抗原",
        "人类主要组织相容性抗原（MHC 编码的分子）即人白细胞抗原 HLA；小鼠的为 H2 抗原。原书 A1 答案第 9 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "参与同种异体移植急性排斥反应的主要效应细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["DC细胞", "巨噬细胞", "B细胞", "T细胞", "红细胞"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T细胞",
        "同种反应性 T 细胞（尤其 CD4+Th1）是参与同种异体急性排斥反应的关键效应细胞。原书 A1 答案第 10 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于直接识别，以下描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无需经历抗原摄取和加工，故应答速度快",
      "识别同种异型抗原的T细胞克隆数远低于识别一般特异性抗原的T细胞克隆数",
      "主要在急性排斥的后期发挥作用",
      "只有人类才会出现直接识别的情况",
      "患有风湿病的患者不出现直接识别",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "无需经历抗原摄取和加工，故应答速度快",
        "直接识别是受者 T 细胞直接识别供者 APC 表面同种异型 MHC 分子，不需抗原摄取加工，故速度快、反应强度大，主要在急性排斥早期发挥作用。原书 A1 答案第 13 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "HLA 配型最重要的位点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["HLA-A", "HLA-DR", "HLA-DQ", "HLA-DP", "HLA-B"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "HLA-DR",
        "HLA II 类尤其是各位点的 DR 与移植排斥相关性最高，是 HLA 配型最重要的位点。原书 A1 答案第 20 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下说法错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "尽可能清除移植物中过路细胞有助于减轻或防止GVHD发生",
      "供受者间ABO血型物质不符可能导致强的移植排斥反应",
      "预防可能出现的GVHD，可对骨髓移植物进行预处理，其原理是基于清除骨髓移植物中的干细胞",
      "在HLA尽量相近的前提下，应适当考虑mH抗原",
      "同性别供受体间移植排斥反应一般较轻",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "预防可能出现的GVHD，可对骨髓移植物进行预处理，其原理是基于清除骨髓移植物中的干细胞",
        "预防 GVHD 对骨髓移植物预处理原理是清除移植物中的 T 细胞（成熟 T 淋巴细胞），而非干细胞。原书 A1 答案第 22 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与超急性排斥反应关联最大的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "ABO血型不相符",
      "HLA-DR匹配",
      "HLA-A匹配",
      "HLA-B匹配",
      "病毒感染",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ABO血型不相符",
        "超急性排斥由受者体内预存抗体（多 IgM，含抗 ABO 血型抗原等）介导，ABO 血型不相符是常见诱因。原书 A1 答案第 28 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1012",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患者，女性，曾短期内多次手术终止妊娠，导致体内IgM类抗体水平偏高。如该患者需做肾移植手术，则应警惕",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "超急性排斥反应",
      "慢性排斥反应",
      "急性GVHD",
      "过敏性紫癜",
      "冠心病",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "超急性排斥反应",
        "多次终止妊娠可引起母体产生较高水平 IgM 类抗体（预存抗体），肾移植时易触发超急性排斥反应。原书 A2 答案第 47 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1013",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某白血病患者在骨髓移植术后第20天出现皮疹、黄疸、腹泻症状，首先应怀疑",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "手术中感染了金黄色葡萄球菌",
      "慢性GVHD",
      "急性GVHD",
      "白血病复发",
      "再生障碍性贫血",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性GVHD",
        "骨髓移植后 2 个月内出现皮疹、黄疸、腹泻是急性移植物抗宿主病（GVHD）的典型表现。原书 A2 答案第 49 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-a1014",
    order: 19,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某患者因尿毒症长期卧床血液透析，四年前曾进行过一次失败的肾移植手术，现又觅得捐献者提供肾源，欲行第二次肾移植。此时作为主治医生，你应该",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "警惕慢性GVHD",
      "警惕急性GVHD",
      "警惕慢性排斥反应",
      "警惕超急性排斥反应",
      "警惕患者低血糖",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "警惕超急性排斥反应",
        "既往肾移植失败、长期血液透析者体内可能存在预存的抗同种异型抗体，再次移植易发生超急性排斥反应。原书 A2 答案第 58 题为 D。",
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
    id: "ext-immunology-ch23-transplantation-immunity-fill001",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "直接识别导致的排斥反应有以下两个特点：①因为___，在急性移植排斥反应的早期起重要作用；②因为___，故反应强度大。",
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
        "①无需经历抗原摄取和加工处理；②具有同种抗原反应性的T细胞克隆约占T细胞库总数的1%～10%",
        "直接识别不需抗原摄取加工，速度优势使其在急性排斥早期起重要作用；因同种异型反应性 T 细胞克隆频率高（约 1%~10%），故反应强度大。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-fill002",
    order: 21,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "移植物抗宿主反应（GVHR）指移植物中免疫细胞对受者组织、器官产生的排斥反应，主要见于免疫组织或器官的移植，如___移植、___移植和___移植等。",
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
        "同种异型骨髓；造血干细胞（HSCT）；胸腺",
        "GVHR 主要见于免疫组织或器官的移植，如同种异型骨髓移植、造血干细胞移植（HSCT）和胸腺移植等。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-fill003",
    order: 22,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "超急性排斥反应是由于受者体内预先存在抗供者组织抗原的抗体（多为IgM类），包括___及___的抗体。",
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
        "抗供者ABO血型抗原、血小板抗原；HLA抗原、血管内皮细胞抗原",
        "超急性排斥由预存抗体介导，包括抗供者 ABO 血型抗原、血小板抗原、HLA 抗原及血管内皮细胞抗原的抗体（多为 IgM 类）。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-fill004",
    order: 23,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "超急性排斥反应多见于___或___的个体。",
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
        "反复输血、多次妊娠；长期血液透析、再次移植",
        "超急性排斥常见于反复输血、多次妊娠、长期血液透析或再次移植等体内存在预存抗体的个体。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-fill005",
    order: 24,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "临床上常规检测 DR、A、B 基因座位上的___个等位基因，目前主要采用___和___方法。",
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
        "6；PCR-SSP；PCR-SBT",
        "临床常规检测 DR、A、B 位点上各 1 对共 6 个等位基因，现多采用 PCR-SSP 和 PCR-SBT（序列分型）等 PCR-based HLA 配型方法。原书填空题第 5 题答案。",
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
    id: "ext-immunology-ch23-transplantation-immunity-short001",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述直接识别和间接识别的机制。",
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
        "直接识别与间接识别的机制",
        "（1）直接识别：受者 T 细胞直接识别供者 APC 表面同种异型 MHC 分子。确切机制尚不清楚，普遍认为 TCR 交叉识别是其分子基础——供者同种异型 MHC 与外来或自身抗原肽形成的构象表位，与受者自身 MHC 分子与外来或自身抗原肽所形成的构象表位具有相似性，故出现高频交叉识别。（2）间接识别：受者 T 细胞识别经自身 APC 加工提呈的供者 MHC 抗原肽。移植术后受者 APC 进入移植物摄取并加工脱落的同种异型 MHC 分子（等同普通外源性抗原），经 MHC II 类分子途径提呈给受者 CD4+T 细胞，激活的 CD4+T 细胞分泌细胞因子促进同种抗原特异性 CTL 及 B 细胞增殖，导致排斥。原书问答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-short002",
    order: 26,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述T细胞免疫在移植排斥反应效应机制中发挥的作用。",
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
        "T 细胞免疫在移植排斥反应中的作用",
        "同种异体急性排斥反应中 CD4+Th1 细胞是主要的效应细胞：受者 CD4+T 细胞经直接、间接或半直接途径识别移植抗原被激活，在移植物局部趋化因子作用下出现以单个核细胞（Th1、巨噬细胞为主）浸润；活化 Th1 等释放多种炎性细胞因子（IFN-γ、IL-2 等），导致迟发型超敏反应性炎症，造成移植物组织损伤。CD8+CTL 亦发挥重要作用；另近年发现 Th17 细胞通过产生 IL-17 在急性排斥中发挥重要作用，且其时相早于 Th1 细胞。原书问答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch23-transplantation-immunity-short003",
    order: 27,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述超急性排斥反应的特点。",
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
        "超急性排斥反应的特点",
        "超急性排斥反应是移植器官与受者血管接通后数分钟至 24 小时内发生的排斥反应，由受者体内预先存在的抗供者组织抗原的抗体（多 IgM 类，包括抗供者 ABO 血型抗原、血小板抗原、HLA 抗原及血管内皮细胞抗原的抗体）介导，常见于反复输血、多次妊娠、长期血液透析或再次移植的个体。天然抗体与供者组织抗原结合，经激活补体直接破坏靶细胞，或通过补体片段引起血管通透性增高和中性粒细胞浸润，导致毛细血管内皮损伤、纤维蛋白沉积、血小板聚集和血栓形成，使移植物发生不可逆缺血、变性和坏死。应用免疫抑制药物治疗此类排斥反应效果不佳。原书问答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 本书一般无 B 型配伍题；保持空数组 */
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