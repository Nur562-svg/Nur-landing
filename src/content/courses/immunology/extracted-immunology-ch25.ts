import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第25章 免疫学防治 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：11 题（含 A2 病例题 1 道）
 * - 问答题（short-answer）：3 题
 * - 独立记分题合计：24 题（须等于本文件预算 24）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 8、填空题 8、选择题 A1 17 + A2 15 + B1 33~44、问答题 7；
 *   本文件按 24 道预算等比取材并在原书顺序内取满。A2 病例题按项目规约与 A1 一起映射为
 *   a1-single。B 型配伍题本书一般无，本章按规约不并入独立记分题。防治章节侧重主动/被动
 *   免疫、疫苗类型（灭活/减毒活/类毒素/合成肽/亚单位/DNA/重组载体疫苗）与免疫制剂
 *   （抗毒素、免疫球蛋白、免疫抑制剂等），OCR 错字与双栏错序已按免疫学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch25-immunoprophylaxis";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第25章 免疫学防治 习题（核对PDF 第280–289页）";
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
    id: "ext-immunology-ch25-immunoprophylaxis-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：人工主动免疫",
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
        "人工主动免疫",
        "人工主动免疫：用人工制备的疫苗接种机体，使之主动产生特异性免疫应答，从而预防感染的措施。人工主动免疫制剂主要包括死疫苗（灭活疫苗）、减毒活疫苗和类毒素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：人工被动免疫",
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
        "人工被动免疫",
        "人工被动免疫：给人体注射含特异性抗体的免疫血清或细胞因子等制剂，用以治疗或紧急预防感染的措施。人工被动免疫制剂主要包括抗毒素、人免疫球蛋白制剂、细胞因子与单克隆抗体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：重组载体疫苗",
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
        "重组载体疫苗",
        "重组载体疫苗：将编码病原体有效免疫原的基因插入载体（减毒的病毒或细菌）基因组中，接种后目的基因随疫苗株在体内的增殖而表达，从而获得预期免疫效应的疫苗。目前使用最广的载体是痘苗病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：DNA疫苗",
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
        "DNA疫苗",
        "DNA 疫苗：用编码病原体有效免疫原的基因与细菌质粒构建的重组体，直接转染宿主细胞，使其表达目的抗原（保护性抗原），从而诱导机体产生相应特异性免疫作用的疫苗。该疫苗在体内可持续表达，可诱导体液免疫和细胞免疫，维持时间长，是疫苗发展方向之一。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗毒素",
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
        "抗毒素",
        "抗毒素：用细菌外毒素或类毒素免疫动物制备的免疫血清，具有中和外毒素毒性的作用。该制剂对人而言是异种蛋白，应用时应注意 I 型超敏反应的发生。常用的有破伤风抗毒素、白喉抗毒素等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），11 道（含 A2 病例题 1 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列情况属于人工主动免疫的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "通过胎盘、初乳获得的免疫",
      "通过隐性感染获得的免疫",
      "通过注射类毒素获得的免疫",
      "通过注射丙种球蛋白获得的免疫",
      "通过患感染性疾病获得的免疫",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "通过注射类毒素获得的免疫",
        "类毒素是人工主动免疫制剂，注射后使机体主动产生特异性免疫；胎盘/初乳属自然被动，隐性感染和患病属自然主动，丙种球蛋白属人工被动。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列情况属于人工被动免疫的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "通过胎盘、初乳获得的免疫",
      "通过患感染性疾病获得的免疫",
      "通过注射疫苗获得的免疫",
      "通过注射抗毒素获得的免疫",
      "通过注射类毒素获得的免疫",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "通过注射抗毒素获得的免疫",
        "抗毒素是人工被动免疫制剂，被动输入特异性抗体；疫苗/类毒素为人工主动，胎盘/初乳为自然被动，患病为自然主动。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种属于自然被动免疫",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "注射丙种球蛋白",
      "注射抗毒素血清",
      "从母体经胎盘得到的抗体",
      "接种类毒素产生的抗体",
      "接种疫苗产生的抗体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "从母体经胎盘得到的抗体",
        "胎儿或新生儿经胎盘、初乳从母体被动获得抗体，属自然被动免疫；丙种球蛋白、抗毒素为人工被动，类毒素、疫苗为人工主动。原书 A1 答案第 3 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "密切接触白喉患者的儿童应给予的免疫措施是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "白喉类毒素",
      "BCG",
      "白喉抗毒素",
      "丙种球蛋白",
      "胎盘球蛋白",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "白喉抗毒素",
        "密切接触白喉患者需紧急预防，应给予白喉抗毒素（人工被动免疫，中和白喉外毒素）。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪项属于人工主动免疫",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "注射丙种球蛋白预防麻疹",
      "接种卡介苗预防结核",
      "注射胸腺肽治疗恶性肿瘤",
      "静脉注射CIK细胞治疗肿瘤",
      "注射破伤风抗毒素治疗破伤风",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "接种卡介苗预防结核",
        "卡介苗是减毒活疫苗，接种属人工主动免疫；丙种球蛋白、破伤风抗毒素属人工被动，胸腺肽、CIK 细胞属免疫治疗。原书 A1 答案第 6 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "根据有效免疫原的氨基酸序列，设计合成的免疫原性多肽称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "合成肽疫苗",
      "结合疫苗",
      "亚单位疫苗",
      "重组抗原疫苗",
      "灭活疫苗",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "合成肽疫苗",
        "按有效免疫原的氨基酸序列人工合成免疫原性多肽即为合成肽疫苗。原书 A1 答案第 7 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "提取病原体中有效免疫原制成的抗原称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "灭活疫苗",
      "合成肽疫苗",
      "结合疫苗",
      "亚单位疫苗",
      "重组抗原疫苗",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "亚单位疫苗",
        "提取病原体中的有效免疫原（亚单位成分）制成的是亚单位疫苗。原书 A1 答案第 8 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "由编码病原体有效免疫原的基因与细菌质粒构建形成的重组体称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "合成肽疫苗",
      "重组载体疫苗",
      "重组抗原疫苗",
      "DNA疫苗",
      "结合疫苗",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA疫苗",
        "编码免疫原的基因与细菌质粒构建重组体（重组质粒直接注入机体表达抗原）即为 DNA 疫苗。原书 A1 答案第 9 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对减毒活疫苗叙述有误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "用减毒或无毒活病原体制成",
      "一般只需接种一次",
      "比死疫苗更安全",
      "保存要求比死疫苗高",
      "能诱导细胞免疫形成和特异性抗体产生",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "比死疫苗更安全",
        "减毒活疫苗存在接种后潜在返株（野毒株）风险，对免疫低下者有致病可能，故并非比死疫苗更安全；其免疫效果好、接种次数少，但保存要求高。原书 A2 答案第 19 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于人免疫球蛋白制剂，下述哪项是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "从血浆或胎盘血中分离制成",
      "可用于病毒性疾病的预防",
      "可用于免疫缺陷病的治疗",
      "只含IgG类抗体",
      "一般为多价抗血清",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "只含IgG类抗体",
        "人免疫球蛋白制剂是从大量混合血浆或胎盘血分离的浓缩剂，含多类/多价抗体，并非只含 IgG。原书 A2 答案第 25 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫抑制疗法不宜用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "超敏反应病",
      "自身免疫病",
      "感染",
      "炎症",
      "移植排斥反应",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "感染",
        "免疫抑制会使机体抗感染能力下降、加重感染，故免疫抑制疗法不宜用于感染；主要用于超敏反应病、自身免疫病、炎症及移植排斥反应等。原书 A2 答案第 27 题为 C。",
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
    id: "ext-immunology-ch25-immunoprophylaxis-fill001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "疫苗的基本要求是___。",
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
        "安全、有效、实用",
        "疫苗的基本要求是安全、有效、实用。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-fill002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "常见的人工主动疫苗分为___；人工被动免疫包括___。",
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
        "灭活疫苗（死疫苗）、减毒活疫苗、类毒素；抗毒素、人免疫球蛋白制剂、细胞因子与单克隆抗体",
        "人工主动免疫制剂包括灭活疫苗、减毒活疫苗和类毒素；人工被动免疫制剂包括抗毒素、人免疫球蛋白制剂及细胞因子与单克隆抗体。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-fill003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "类毒素是将毒素用甲醛处理，使其___，但仍保持___，制成的生物制品。",
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
        "失去外毒素毒性；免疫原性",
        "类毒素由细菌外毒素经 0.3%~0.4% 甲醛处理制成，已失去外毒素毒性但仍保留免疫原性，接种后可诱导产生抗毒素。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-fill004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "免疫抑制剂能抑制机体的免疫功能，常用于防止___的发生和___的治疗。",
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
        "移植排斥反应；自身免疫病",
        "免疫抑制剂主要用于防止移植排斥反应的发生和自身免疫病的治疗。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-fill005",
    order: 21,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "我国儿童计划免疫的常用疫苗有 5 种，即___。",
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
        "卡介苗、小儿麻痹症（脊髓灰质炎）疫苗、百白破疫苗、麻疹活疫苗、乙型肝炎疫苗",
        "我国儿童计划免疫常用 5 种疫苗：卡介苗、小儿麻痹症（脊髓灰质炎）疫苗、百白破疫苗、麻疹活疫苗和乙型肝炎疫苗。原书填空题第 5 题答案。",
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
    id: "ext-immunology-ch25-immunoprophylaxis-short001",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是生物应答调节剂及其主要分类？",
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
        "生物应答调节剂（BRM）的概念与分类",
        "生物应答调节剂（biological response modifier，BRM）指具有促进或调节免疫功能的制剂，通常对免疫功能正常者无影响，而对免疫功能异常、尤其是免疫功能低下者有促进或调节作用。其主要分类包括治疗性疫苗、单克隆抗体、细胞因子、微生物及其产物、人工合成分子等。原书问答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-short002",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述计划免疫的含义及意义。",
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
        "计划免疫的含义及意义",
        "计划免疫是指根据某些特定传染病的疫情监测和人群免疫状况分析，按照规定的免疫程序有计划地进行人群预防接种，提高人群免疫水平，达到控制以至最终消灭相应传染病的目的而采取的重要措施。其意义在于通过制定合理免疫程序并严格实施接种，提高接种率、充分发挥疫苗效果，使人群达到并维持较高免疫水平，有效控制传染病的流行。原书问答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch25-immunoprophylaxis-short003",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述常用的人工免疫制剂。",
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
        "常用的人工免疫制剂",
        "（1）人工主动免疫制剂（疫苗接种使机体产生特异性免疫预防感染）：①灭活疫苗（死疫苗）：选用免疫原性强的病原体经培养后用理化方法灭活制成，细菌类有霍乱、百日咳、伤寒、钩端螺旋体疫苗等，病毒类有狂犬病、乙型脑炎、流感疫苗等；②减毒活疫苗：用减毒或无毒力活病原体制成，细菌类有卡介苗，病毒类有脊髓灰质炎（口服）、麻疹、腮腺炎等；③类毒素：外毒素经 0.3%~0.4% 甲醛处理，丧失毒性而保留免疫原性，如破伤风类毒素、白喉类毒素。（2）人工被动免疫制剂（注射含特异性抗体或细胞因子的制剂以治疗或紧急预防感染）：①抗毒素：如破伤风抗毒素、白喉抗毒素；②人免疫球蛋白制剂：肌肉注射用于甲型肝炎、麻疹、脊髓灰质炎等病毒病预防，静脉注射用于原发/继发免疫缺陷病治疗；③细胞因子与单克隆制剂：如 IFN-α、G-CSF、GM-CSF 等。原书问答题第 4 题。",
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