import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第19章 遗传病的治疗 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：5 题
 * - A1/A2 型选择题（统一映射为 a1-single 单选）：14 题（A1 型 10 道 + A2 型 4 道）
 * - 简答题：3 题
 * - B1 共用备选答案配伍题：1 组、共 5 个成员
 * - 独立记分题合计：27 题（含 B1 组成员；须等于本文件预算 27）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 5、A1 型选择题 10、A2 型选择题 10、
 *   B1 共用备选答案配伍题两组各 5、简答题 3，无 X 型多选、无独立（非选择型）病例。
 *   本文件按预算 27 等比取材：全部 5 道名词解释、全部 10 道 A1、前 4 道 A2（原书
 *   第 11–14 题）、B1 第二组（26–30 题，遗传病治疗手段配伍）5 个成员、全部 3 道简答。
 *   所有选择题均为单选，正确项逐一对齐源参考答案（A1：1.B 2.E 3.B 4.C 5.A 6.E
 *   7.A 8.E 9.B 10.A；A2：11.D 12.A 13.A 14.A；B1 组 2：26.B 27.D 28.A 29.E 30.C），
 *   选项顺序已随机重排并同步 correctChoiceIndex（0 起）。OCR 错字按语义恢复，如实注明：
 *   “耙细胞”→靶细胞、“荁”（Y）→α1、“加v/v0”→in vivo、“av/vv”→ex vivo、
 *   “靑锿胺”→青霉胺、“轻基脲”→羟基脲、“骨髄”→骨髓、“氣化”→氯化等；治疗方式
 *   （手术/药物/饮食/干细胞/器官移植/基因治疗/基因编辑）、酶抑制剂与药物名、以及
 *   凝血因子IX、铜/苯丙氨酸代谢等数值与概念均保留原值，未捏造。本章无 X 型题，
 *   xMapNote 常量按共享契约保留备用。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch19-genetic-therapy";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第19章 遗传病的治疗 复习思考题 习题（PDF 第111–115页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-term001",
    order: 1,
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
        "基因治疗（gene therapy）是指用重组DNA技术将具有正常基因及其表达所需的序列导入到病变细胞或体细胞中，以替代或补偿缺陷基因的功能，或抑制缺陷基因的过度表达，从而达到治疗遗传性或获得性疾病的目的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：同源重组法（homologous recombination）",
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
        "同源重组法",
        "同源重组法（homologous recombination）是指用外源性目的基因进行定位或原位修复有缺陷的基因组DNA时，导入的外源基因与染色体上的靶基因序列在同源序列之间发生重组而插入到染色体上，这样外源基因不是随机地而是专一地整合到靶细胞的特定位点，从而取代原位点上的缺陷基因序列。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因增强（gene augmentation）",
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
        "基因增强",
        "基因增强（gene augmentation）是基因治疗的策略之一，意即将目的基因导入病变细胞或其他细胞，目的基因的表达产物可以弥补缺陷细胞的功能或使原有的功能得到加强。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：种系基因治疗（germline gene therapy）",
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
        "种系基因治疗",
        "种系基因治疗（germline gene therapy）是相对于体细胞基因治疗（somatic cell gene therapy）而言的，意即通过改变或插入遗传物质于生殖细胞中进行的遗传病基因治疗措施。目前，在人体身上进行的所有种系基因治疗研究是被禁止的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因组编辑（genome editing）",
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
        "基因组编辑",
        "基因组编辑（genome editing）是近年来发展起来的可对基因组进行靶向识别和精确编辑的一种新兴技术，可完成目标基因的定点敲除、突变、敲入等，主要包括锌指核酸酶（ZFN）、转录激活因子样效应物核酸酶（TALEN）和CRISPR/Cas技术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），14 道（A1 型 10 道 + A2 型 4 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "肝豆状核变性（Wilson病）是神经内科最常见的一种常染色体隐性遗传病，属于铜代谢障碍性疾病。应用某些药物与铜离子形成螯合物的原理，可给予患者服用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "青霉素",
      "硫酸镁",
      "青霉胺",
      "维生素B12",
      "去铁胺",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青霉胺",
        "原书 A1 型选择题答案第一题为 B，即青霉胺。青霉胺（penicillamine）能与铜离子结合形成螯合物促进铜的排出，用于肝豆状核变性（Wilson病）的治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "目前，饮食疗法治疗遗传病的基本原则是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "少食多餐",
      "补其所缺",
      "禁其所忌",
      "去其所余",
      "口服维生素",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "禁其所忌",
        "原书 A1 型选择题答案第二题为 E，即禁其所忌。饮食疗法治疗遗传病的原则为“禁其所忌、去其所余、补其所缺”，其中禁其所忌即控制底物或中间产物的摄人。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某些遗传病源于某些酶缺乏而不能形成机体所必需的代谢产物，对这些遗传病进行治疗时可给予相应酶的补充，便可使症状得到明显的改善，达到治疗的目的。这种治疗策略称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "补其所缺",
      "添加",
      "补缺",
      "基因修正",
      "基因治疗",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "补缺",
        "原书 A1 型选择题答案第三题为 B，即补缺（补其所缺）。对酶缺乏而不能形成机体所必需代谢产物的遗传病，给予相应酶的补充以补其所缺，使症状得到改善，属于“补其所缺”策略。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "基因治疗时去除整个变异基因，用有功能的正常基因取代，从而使致病基因得到永久的更正。这种治疗策略称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因添加",
      "基因修复",
      "基因突变",
      "基因失活",
      "基因复制",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因修复",
        "原书 A1 型选择题答案第四题为 C，即基因修复（基因修正）。去除整个变异基因并以有功能的正常基因取代，使致病基因得到永久更正，属基因修复策略。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "世界上首例成功进行基因治疗的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "家族性高胆固醇血症",
      "ADA缺乏症",
      "囊性纤维化",
      "血友病B",
      "α1-抗胰蛋白酶缺乏症",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ADA缺乏症",
        "原书 A1 型选择题答案第五题为 A，即 ADA 缺乏症（腺苷脱氨酶缺乏症）。世界上首例成功进行的基因治疗即为严重联合免疫缺陷的 ADA 缺乏症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "给苯丙酮尿症患儿喂哺低苯丙氨酸奶粉，属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "酶疗法",
      "禁其所忌",
      "补其所缺",
      "维生素疗法",
      "去其所余",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "禁其所忌",
        "原书 A1 型选择题答案第六题为 E，即禁其所忌。苯丙酮尿症（PKU）患儿喂哺低苯丙氨酸奶粉，是通过限制苯丙氨酸摄人、避免其代谢产物堆积，属“禁其所忌”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "镰状细胞贫血患者可使用哪一种药物进行治疗",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "丝裂霉素",
      "羟基脲（hydroxyurea）",
      "抗生素",
      "维生素",
      "γ-干扰素",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "羟基脲",
        "原书 A1 型选择题答案第七题为 A，即羟基脲（hydroxyurea）。羟基脲可提高胎儿血红蛋白（HbF）水平，用于镰状细胞贫血的治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于基因治疗的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "目前只有少数疾病进入临床试验阶段",
      "需要保证克隆基因进入靶细胞内能够得到有效调节",
      "目前基因治疗的研究仅瞄准对发病机制明确的单基因病",
      "基因编辑技术能够进行基因修复",
      "需要保证克隆基因的有效表达",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "目前基因治疗的研究仅瞄准单基因病",
        "原书 A1 型选择题答案第八题为 E，即该表述错误。目前基因治疗研究已不局限于发病机制明确的单基因病，已扩展到多基因病与获得性疾病等方面，故“仅瞄准单基因病”的描述是错误的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "将目的基因导入病变细胞或其他细胞，目的基因的表达产物可以补偿缺陷细胞的功能或使原有的功能得到加强。这种治疗策略称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因转移",
      "反义技术",
      "基因增强",
      "基因突变",
      "基因复制",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因增强",
        "原书 A1 型选择题答案第九题为 B，即基因增强（gene augmentation）。将目的基因导入病变细胞，其表达产物补偿缺陷细胞功能或使原有功能加强，正是基因增强策略的定义。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "导入外源基因去干扰、抑制有害的基因表达。例如，向肿瘤细胞中导入肿瘤抑制基因，以抑制癌基因的异常表达。这种治疗策略称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因抑制",
      "三螺旋DNA技术",
      "反义技术",
      "基因添加",
      "基因转移",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基因抑制",
        "原书 A1 型选择题答案第十题为 A，即基因抑制。导入外源基因干扰、抑制有害基因（如癌基因）的表达，是基因抑制的治疗策略。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性患者，15个月。间断抽搐3个月就诊，患儿出生时正常，母乳喂养，不能独坐和站立，肌张力高，不认识父母，皮肤白皙，头发浅黄，尿液有鼠尿味，尿三氯化铁试验阳性（+++）。对该患儿目前主要的治疗方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "左旋多巴",
      "口服甲状腺片",
      "四氢生物蝶呤",
      "低苯丙氨酸饮食",
      "5-羟色胺",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "低苯丙氨酸饮食",
        "原书 A2 型选择题答案第十一题为 D，即低苯丙氨酸饮食。该患儿为典型苯丙酮尿症（PKU），目前主要治疗方法是低苯丙氨酸饮食（禁其所忌）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1012",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性患者，56天，全身皮肤黄染53天就诊，出生时正常，生后3天皮肤黏膜开始黄染，渐加重，同时吐奶严重，生后纯母乳喂养，尿蛋白（＋），尿胆红素（＋＋），尿半乳糖（＋＋＋）。目前，对该患儿的治疗可用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "停用乳类，改用米汤、豆浆等喂养",
      "低苯丙氨酸饮食",
      "低脂饮食",
      "奶粉喂养",
      "四氢生物蝶呤",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "停用乳类，改用米汤、豆浆等喂养",
        "原书 A2 型选择题答案第十二题为 A，即停用乳类、改用米汤豆浆喂养。该患儿为半乳糖血症，需尽早停用含乳糖/半乳糖的乳类，改用不含乳糖的喂养方式（禁其所忌）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1013",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性患者，17岁，进行性加重智力障碍、肢体震颤3年就诊。表情淡漠，双侧角膜周边见棕绿色素环，宽约2mm，晶体轻度浑浊，血铜蓝蛋白41.2mg/L（参考值220～580mg/L），尿铜3319μg/24h（参考值0～60μg/24h）。该患儿治疗不可用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "苯巴比妥",
      "补充锌剂",
      "避免进食动物内脏等含铜高的食物",
      "青霉胺",
      "对症治疗",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "苯巴比妥",
        "原书 A2 型选择题答案第十三题为 A，即苯巴比妥。该患儿为肝豆状核变性（Wilson病），治疗应驱铜（如青霉胺、补充锌剂）、限制含铜高的食物，苯巴比妥并非本病的治疗药物，故为“不可用”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-a1014",
    order: 19,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某女性患者，28个月。发热、寒战、气促就诊，皮肤黄，结膜苍白，肝脾大，Hb45g/L，RBC1.8×10^12/L，WBC32×10^9/L，镰变试验阳性。对该患儿目前最有效的治疗是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "骨髓移植",
      "补充锌剂",
      "血浆过滤",
      "补充维生素",
      "加强营养",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "骨髓移植",
        "原书 A2 型选择题答案第十四题为 A，即骨髓移植。该患儿为镰状细胞贫血，目前最有效的治疗是骨髓移植（造血干细胞移植）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];
/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-short001",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "遗传病治疗的主要手段有哪些？",
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
        "遗传病治疗的主要手段",
        "遗传病的治疗措施通常有手术疗法、药物和饮食疗法，以及基因治疗。手术治疗主要包括手术纠正和器官移植两个方面；药物和饮食治疗的原则是“禁其所忌、去其所余、补其所缺”，即控制底物或中间产物的摄入，减少代谢产物的堆积，排出体内过多的毒物、抑制毒物的生成，补充机体所缺乏的生理性物质以达到治疗的目的；基因治疗是运用重组DNA技术、基因编辑技术等方法，将具有正常基因及其表达所需的序列等导入到病变细胞或体细胞中，以替代或补偿缺陷基因的功能，或抑制基因的过度表达，从而达到治疗遗传病或获得性疾病的目的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-short002",
    order: 26,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "进行成功的基因治疗必须具备的条件是什么？",
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
        "成功基因治疗的必备条件",
        "进行成功的基因治疗必须具备的条件是：①选择合适的疾病；②已知该病分子缺陷的本质；③矫正遗传病的治疗（或正常）基因得到克隆；④克隆基因的有效表达；⑤克隆基因的有效调控；⑥已建立可利用的有效动物模型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-short003",
    order: 27,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述转基因基因治疗的技术路径。",
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
        "转基因基因治疗的技术路径",
        "转基因基因治疗的技术路径主要包括靶细胞的选择、目的基因表达载体的构建、目的基因（或核苷酸）的转移等。靶细胞的选择总体可分为体细胞和生殖细胞，目前主要进行的是体细胞基因治疗，而种系基因治疗研究是被禁止的；其中骨髓细胞是应用最为广泛的靶细胞。目的基因表达载体的构建分为非病毒载体和病毒载体，后者主要包括腺病毒、反转录病毒、腺相关病毒（AAV）等。目的基因的转移包括转移路径和方法，转移途径有两类：一类是in vivo，即直接活体转移；另一类为ex vivo，即回体转移。转移方法包括物理学法、化学法和生物学法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书两组（21–25、26–30），本书按预算取材第 2 组（26–30 题，遗传病治疗手段配伍），1 组 × 5 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch19-genetic-therapy-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["药物治疗", "手术治疗", "基因治疗", "饮食治疗", "器官移植"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch19-genetic-therapy-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "严重唇裂的患者可采用的治疗方法是",
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
            "手术治疗",
            "B1 题第26题答案 B，即手术治疗。严重唇裂属结构畸形，可采用手术（手术纠正）的方法治疗。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch19-genetic-therapy-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "新生儿PKU患者可采用的治疗方法是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 3,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "饮食治疗",
            "B1 题第27题答案 D，即饮食治疗。新生儿PKU需采用低苯丙氨酸饮食治疗（禁其所忌）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch19-genetic-therapy-b001m3",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在临床上对症缓解遗传病患者的症状一般采用的是",
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
            "药物治疗",
            "B1 题第28题答案 A，即药物治疗。临床上常以药物治疗来对症缓解遗传病患者的症状（去其所余、补其所缺等）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch19-genetic-therapy-b001m4",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对遗传性角膜萎缩症的患者可采用的治疗方法是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 4,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "器官移植",
            "B1 题第29题答案 E，即器官移植。遗传性角膜萎缩症患者可采用角膜移植（器官移植）的方法治疗。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch19-genetic-therapy-b001m5",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "若要从根本上治愈单基因病，理想的治疗方法是",
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
            "基因治疗",
            "B1 题第30题答案 C，即基因治疗。要从根本上治愈单基因病，理想的治疗方法是基因治疗（从基因水平纠正缺陷基因）。",
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