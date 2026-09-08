import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第23章 病毒的感染与免疫 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：12 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：3 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：6 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：25 题（须等于本文件预算 25）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 12、选择题（A1 型 33 + A2 型 5）、B1 型 2 组（共 9 成员）
 *   与简答题 6；本文件按 25 道预算取样，名词解释与简答题全取，选择题取 A1 第 1~3 题，
 *   B1 取第 1 组（39~42 题，4 成员）完整组。正确项对齐章末参考答案键号（A1 1.A 2.E 3.B；
 *   B1 39.C 40.A 41.D 42.B）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 包酒体→包涵体、
 *   千扰素→干扰素、阳止→阻止、彩响→影响、CD4*→CD4⁺、CD8*→CD8⁺、INF-Y→IFN-γ 等），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch23-viral-infection-and-immunity";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第23章 病毒的感染与免疫 习题（核对PDF 第176–185页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），12 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：水平传播",
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
        "水平传播",
        "水平传播：病毒在人群不同个体之间的传播，包括人-人和动物-人之间（包括通过媒介）的传播。病毒可经破损皮肤、黏膜、呼吸道、消化道、血液、泌尿生殖道等途径感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：垂直传播",
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
        "垂直传播",
        "垂直传播：病毒由亲代宿主传给子代，人类主要通过胎盘或产道传播，或产后哺乳及密切接触等形式传播。如风疹病毒、巨细胞病毒、HIV、HBV 及 HCV 等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：包涵体",
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
        "包涵体",
        "包涵体：在某些病毒感染的细胞内，用光学显微镜可看到的与正常细胞结构和着色不同的圆形或卵圆形的斑块。包括体内外感染的细胞，不同的病毒有不同的特征，因此可用于实验室诊断。如狂犬病毒包涵体、巨细胞病毒包涵体等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：CPE",
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
        "CPE",
        "CPE：病毒的致细胞病变作用。把病毒接种于培养细胞上，孵育 1~3 天后，可见到细胞肿胀变圆、聚集、融合、裂解、坏死，并从瓶壁脱落等现象，称 CPE。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：隐性感染",
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
        "隐性感染",
        "隐性感染：病毒进入机体不引起临床症状的感染，又称亚临床感染。隐性感染者虽不表现临床症状，但仍可获得免疫力而终止感染或成为病毒携带者。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：急性感染",
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
        "急性感染",
        "急性感染：又称病原消灭型感染，病毒侵入机体后，在细胞内增殖，经数日乃至数周的潜伏期后发病，除死亡病例外，宿主一般能在出现症状后的一段时间内，将病毒清除掉而进入恢复期。其特点为潜伏期短，发病急，病程数日至数周，病后常获得特异性免疫。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：持续性感染",
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
        "持续性感染",
        "持续性感染：病毒可在机体持续存在数月至数年，甚至数十年。可出现症状，也可不出现症状而长期携带病毒，成为重要的传染源。包括潜伏感染、慢性感染及慢发病毒感染 3 种类型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：潜伏性病毒感染",
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
        "潜伏性病毒感染",
        "潜伏性病毒感染：某些病毒在显性或隐性感染后，潜伏于某些组织器官内而不复制，在一定条件下，病毒被激活又开始复制，使疾病复发。潜伏期查不出病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：慢发病毒感染",
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
        "慢发病毒感染",
        "慢发病毒感染：显性或隐性感染后，病毒潜伏期很长，可达数月、数年甚至数十年。在症状出现后呈进行性加重，最终导致死亡。如麻疹病毒引起的亚急性硬化性全脑炎（SSPE）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病毒携带者",
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
        "病毒携带者",
        "病毒携带者：部分病毒隐性感染者不能产生有效的免疫力，病毒可在体内增殖不被清除，并可长期向外界播散，这种隐性感染者称为病毒携带者，是重要的传染源，在流行病学上具有重要意义。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term011",
    order: 11,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：干扰素",
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
        "干扰素",
        "干扰素：由病毒或其他 IFN 诱生剂诱使人或动物细胞产生的一类糖蛋白。它作用于机体细胞可表现出抗病毒、抗肿瘤及免疫调节等多种生物学活性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-term012",
    order: 12,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病毒中和抗体",
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
        "病毒中和抗体",
        "病毒中和抗体：指针对病毒某些表面抗原的抗体。能与细胞外游离的病毒结合从而消除病毒的感染能力。其作用机制主要是阻止病毒吸附、侵入易感细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-a1001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "病毒垂直传播主要是经",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胎盘", "蚊子叮咬", "吸入", "皮肤损伤", "以上都不是"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胎盘",
        "垂直传播是病毒由亲代宿主传给子代，人类主要通过胎盘或产道传播。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-a1002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "病毒垂直感染的正确概念是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "在公共场所被病毒感染",
      "通过性接触而发生病毒感染",
      "父亲患病毒病传给其子女的病毒感染",
      "母亲患病毒病传给其子女的病毒感染",
      "母体内病毒经胎盘或产道传给胎儿的病毒感染",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "母体内病毒经胎盘或产道传给胎儿的病毒感染",
        "垂直传播指病毒由亲代宿主传给子代，人类主要通过胎盘或产道传播，即母体内病毒经胎盘或产道传给胎儿的病毒感染。原书 A1 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-a1003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可经垂直感染导致胎儿畸形的病毒是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "麻疹病毒",
      "风疹病毒",
      "流感病毒",
      "乙脑病毒",
      "甲肝病毒",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "风疹病毒",
        "风疹病毒可经垂直传播感染胎儿，引起先天性风疹综合征，导致胎儿畸形。原书 A1 答案第 3 题为 B。",
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

/** 问答题（short-answer），6 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：病毒感染的传播方式有哪些？试简述垂直传播的临床意义。",
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
        "病毒感染的传播方式及垂直传播的临床意义",
        "病毒感染的传播方式可分为水平传播和垂直传播。水平传播是病毒在人群不同个体之间的传播；垂直传播是病毒由亲代宿主传给子代，人类主要通过胎盘或产道传播。垂直传播在医学上的重要意义在于许多病毒通过此方式引起先天性感染，包括早产、死胎、智力障碍、先天性心脏病、先天畸形等。常见的有风疹病毒、巨细胞病毒、HIV、乙型肝炎病毒等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "问答题：什么叫病毒潜伏感染，它和隐性感染有何不同？什么叫慢性感染？它和慢发病毒感染有何区别？",
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
        "潜伏感染、隐性感染、慢性感染与慢发病毒感染的区别",
        "病毒潜伏感染：某些病毒在显性或隐性感染后，病毒基因存在于细胞内，有的病毒潜伏于某些组织器官内而不复制。但在一定条件下，病毒被激活又开始复制，使疾病复发。在潜伏期查不出病毒。隐性感染：病毒进入机体后不引起临床症状的感染。病毒隐性感染者虽不出现临床症状，但仍可获得免疫力而终止感染。慢性感染：病毒在显性或隐性感染后未完全清除，血中可持续检测出病毒，因而可经输血、注射而传播。患者可表现轻微或无临床症状，但常反复发作，迁延不愈，例如乙型肝炎、丙型肝炎。慢发病毒感染：指病毒显性或隐性感染后，有很长的潜伏期，可达数月、数年甚至数十年。在症状出现后呈进行性加重，最终导致死亡。为慢性发展进行性加重的病毒感染，较为少见但后果严重。如 HIV 引起的艾滋病、麻疹病毒引起的亚急性硬化性全脑炎等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-short003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：概述持续性病毒感染的种类及可能的机制。",
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
        "持续性病毒感染的种类及可能机制",
        "持续性病毒感染包括慢性感染、潜伏感染、慢发病毒感染三种类型。形成持续性感染有病毒和机体两方面的因素：①机体免疫功能弱，无力完全清除病毒，使得病毒在体内可长期存留；②病毒存在于受保护的部位，可逃避宿主的免疫作用；③某些病毒的抗原性太弱，机体难以产生免疫应答将其清除；④有些病毒在感染过程中产生缺损性干扰颗粒，干扰病毒增殖，因而改变了病毒感染过程，形成持续性感染；⑤病毒基因整合在宿主细胞的基因组中，长期与宿主细胞共存。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-short004",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试简述病毒是如何致病的？",
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
        "病毒的致病机制",
        "病毒的致病机制可包括两个方面：病毒感染对宿主细胞的直接作用和病毒感染引起的免疫病理作用。但在宿主体内，这两个方面的机制很难截然分开。病毒对组织细胞的直接作用，不同的病毒可通过不同的机制引起损伤，某些病毒感染后引起细胞死亡，即杀细胞性感染，例如脊髓灰质炎病毒。某些病毒感染细胞后不引起细胞裂解、死亡，例如流感病毒、疱疹病毒等，这些病毒以出芽方式释放子代。这种感染情况也可在细胞膜上出现病毒抗原，引起免疫损伤。其他直接损伤的机制还有细胞凋亡、形成包涵体、基因整合引起的细胞转化等。不同的病毒引起的免疫病理损伤机制也不尽相同，主要有抗体介导的免疫损伤和细胞介导的免疫损伤，包括由病毒感染引起的 II 型（细胞毒型）、III 型（免疫复合物型）超敏反应和 IV 型（迟发型）超敏反应。此外免疫病理机制还包括病毒感染后产生 IFN-γ、TNF-α、IL-1 等大量的致炎性细胞因子导致的病理作用以及病毒感染诱发的宿主免疫功能抑制等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-short005",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：什么是干扰素？它有哪些特性？其抗病毒作用机制如何？",
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
        "干扰素的特性及抗病毒作用机制",
        "干扰素是由病毒或其他干扰素诱生剂诱使人或动物细胞产生的一类糖蛋白。它作用于机体细胞可表现出抗病毒、抗肿瘤及免疫调节等多种生物活性。其抗病毒作用无特异性，但具有种属特异性。抗病毒作用机制：干扰素不能直接灭活病毒，而是通过诱导细胞合成抗病毒蛋白（antiviral protein, AVP）发挥效应。干扰素与敏感细胞表面的干扰素受体结合，触发信号传递等一系列的生物化学过程，激活细胞内基因合成多种 AVP，通过降解病毒 mRNA、破坏病毒蛋白质翻译起始过程，导致病毒多肽链合成受阻等方面实现对病毒的抑制作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-short006",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：哪些病毒感染与肿瘤的发生密切相关？",
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
        "与肿瘤发生密切相关的病毒感染",
        "人类嗜 T 细胞病毒与成人 T 细胞白血病及淋巴瘤；EB 病毒与鼻咽癌及 Burkitt 淋巴瘤；人乳头瘤病毒与宫颈癌；人疱疹病毒 8 型与卡波西肉瘤；乙型肝炎病毒及丙型肝炎病毒与肝癌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 4 成员（题组39-42；预算内未纳入第二组43-47） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch23-viral-infection-and-immunity-b001",
    order: 22,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["HIV", "HBV", "HAV", "EBV", "HPV"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-microbiology-ch23-viral-infection-and-immunity-b001m1",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要经消化道传播的病原体是",
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
            "HAV",
            "甲型肝炎病毒（HAV）主要经粪-口（消化道）途径传播。原书 B1 答案第 39 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch23-viral-infection-and-immunity-b001m2",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "最易形成慢发病毒感染的病原体是",
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
            "HIV",
            "人类免疫缺陷病毒（HIV）感染后潜伏期长，症状出现后呈进行性加重，最易形成慢发病毒感染（艾滋病）。原书 B1 答案第 40 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch23-viral-infection-and-immunity-b001m3",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "最易形成潜伏感染的病原体是",
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
            "EBV",
            "EB 病毒（EBV）感染后潜伏于 B 淋巴细胞等组织器官内，在一定条件下被激活复发，最易形成潜伏感染。原书 B1 答案第 41 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch23-viral-infection-and-immunity-b001m4",
        order: 25,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "最易形成慢性感染的病原体是",
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
            "HBV",
            "乙型肝炎病毒（HBV）感染后未完全清除，血中可持续检测出病毒，最易形成慢性感染。原书 B1 答案第 42 题为 B。",
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
