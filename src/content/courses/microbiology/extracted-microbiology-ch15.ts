import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第15章 动物源性细菌 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：5 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：4 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、选择题（A1 型 16 + A2 型 3）、B1 型 3 组（9 成员）
 *   与简答题 4（含 2 道病例分析）；本文件按 18 道预算在原书顺序内取材，名词解释与简答题全取，
 *   选择题取前 5 道，B1 取第一组（20~22 题，3 成员）。正确项对齐章末参考答案键号
 *   （A1 1.A 2.B 3.B 4.A 5.E；B1 20.C 21.E 22.A）。OCR 错字与双栏错序已按微生物学医学语义恢复
 *   （如 草兰→革兰、英膜/荬膜→荚膜、G*→G⁺、炭痘→炭疽、环疽→坏疽、5:5×10°L→5.5×10⁹/L 等），
 *   数值（40.3°C、1cm×3cm、2 米以下等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch15-zoonotic-bacteria";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第15章 动物源性细菌 习题（核对PDF 第117–124页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：动物源性细菌",
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
        "动物源性细菌",
        "以动物作为传染源，能引起动物和人类发生人畜共患病的病原菌称动物源性细菌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：波浪热",
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
        "波浪热",
        "布鲁菌侵入机体后进入血流，出现菌血症，患者发热。随后细菌进入肝、脾、骨髓和淋巴结等脏器细胞，发热也渐消退。细菌在细胞内繁殖到一定程度可再度入血，又出现菌血症而致体温升高。如此反复形成的菌血症，使患者的热型呈波浪式，临床上称波浪热。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：黑死病",
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
        "黑死病",
        "由鼠疫耶尔森菌引起的肺鼠疫患者出现高热寒战，咳嗽、胸痛、咯血，病人多因呼吸困难或心力衰竭而死亡。死亡病人的皮肤常呈黑紫色，故称“黑死病”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：炭疽",
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
        "炭疽",
        "炭疽芽胞杆菌引起的皮肤炭疽，局部出现小疖，继而周围形成水疱、脓疮，最后出现坏死和黑色焦痂，故名炭疽。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：猫抓病",
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
        "猫抓病",
        "由汉塞巴通体感染引起的。患者大多有被猫或狗咬伤、抓伤或接触史，局部皮肤出现脓疱，淋巴结肿大，发热、厌食、肌痛和脾肿大等临床综合征。常合并结膜炎伴耳前淋巴结肿大，称为帕里诺（Parinaud）眼淋巴结综合征，为“猫抓病”的重要特征之一。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：F1 抗原",
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
        "F1 抗原",
        "F1 抗原是鼠疫耶尔森菌的荚膜抗原，不耐热的糖蛋白，具有抗吞噬的作用，故与其毒力相关。抗原性强，其相应抗体具有免疫保护作用，100°C 加热 15 分钟，即失去抗原性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人类最常见的炭疽病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠炭疽",
      "皮肤炭疽",
      "肺炭疽",
      "肝炭疽",
      "脑膜炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "皮肤炭疽",
        "皮肤炭疽约占炭疽病例的 95% 以上，是炭疽病最常见的临床类型。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可产生芽胞的动物源性细菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "鼠疫耶尔森菌",
      "炭疽芽胞杆菌",
      "布鲁菌",
      "蜡状芽胞杆菌",
      "枯草芽胞杆菌",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "炭疽芽胞杆菌",
        "炭疽芽胞杆菌为革兰阳性粗大杆菌，能形成芽胞（芽胞位于菌体中央、小于菌体），是动物源性细菌中可产生芽胞者。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "布鲁菌感染人体后，使机体的热型呈波浪式是因为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "内毒素的释放",
      "反复形成菌血症",
      "细菌进入血液",
      "细菌被中性粒细胞吞噬",
      "细菌被巨噬细胞吞噬",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "反复形成菌血症",
        "布鲁菌侵入机体后被吞噬成为胞内寄生菌，反复形成菌血症，使患者的热型呈波浪式，临床上称为波浪热。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "鼠疫耶尔森菌的传播媒介是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["鼠蚤", "人虱", "恙螨", "蚊", "蜱"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "鼠蚤",
        "啮齿类动物是鼠疫耶尔森菌的贮存宿主，鼠蚤是其主要传播媒介，传播途径是鼠蚤叮咬、呼吸道。原书 A1 答案第 4 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列病原体不是人畜共患病病原体的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "鼠疫耶尔森菌",
      "布鲁菌",
      "炭疽芽胞杆菌",
      "贝纳柯克斯体",
      "百日咳鲍特菌",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "百日咳鲍特菌",
        "百日咳鲍特菌仅感染人，人是其唯一宿主，不属于人畜共患病病原体；鼠疫耶尔森菌、布鲁菌、炭疽芽胞杆菌、贝纳柯克斯体均为人畜共患病病原体。原书 A1 答案第 5 题为 E。",
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

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述布鲁菌的致病物质及对人和动物的致病特点。",
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
        "布鲁菌的致病物质及对人和动物的致病特点",
        "布鲁菌的致病物质主要是内毒素。荚膜与侵袭性酶（透明质酸酶、过氧化氢酶等）增强了该菌的侵袭力，使细菌能突破皮肤和黏膜的屏障作用进入宿主体内，并在机体脏器内大量繁殖和快速扩散入血流。布鲁菌感染家畜引起母畜流产，病畜还可表现为睾丸炎、附睾炎、乳腺炎、子宫炎等，人类主要通过接触病畜或接触被污染的畜产品，经皮肤、黏膜、眼结膜、消化道、呼吸道等不同途径感染。布鲁菌侵入机体后，反复形成菌血症，使患者的热型呈波浪式，临床上称为波浪热。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：炭疽芽胞杆菌可通过哪些途径感染人体及临床分型？",
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
        "炭疽芽胞杆菌的感染途径及所致疾病",
        "（1）经皮肤小伤口感染，引起皮肤炭疽。（2）经呼吸道吸入炭疽芽胞杆菌的芽胞而感染，引起肺炭疽。（3）经食入未煮透的病畜肉而感染，引起肠炭疽。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：患者，男，36岁，私自猎捕旱獭，并与他人共同食用。4天后自感畏寒、全身不适，因剧烈头痛、恶心、呕吐就诊，入院时体温39.8°C，烦躁不安，意识模糊，心律不齐，血压下降，呼吸急促。入院第2天皮肤黏膜先有出血斑，继而大片出血及伴有黑便、血尿，腹股沟、腋下、颈部淋巴结肿大、坚硬、剧痛。试解析：①该患者最可能患什么病？该疾病的传染源和传播途径是什么？②该病原体还可以引起哪些其他疾病及其临床表现。③该病原体的主要微生物学诊断方法有哪些？④预防该疾病流行的主要措施是什么？",
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
        "鼠疫病例分析",
        "①该患者最可能患上腺鼠疫，啮齿类动物是鼠疫耶尔森菌的贮存宿主，鼠蚤为其主要传播媒介。鼠疫一般先在鼠类间发病和流行，通过鼠蚤的叮咬而传染人类，人患鼠疫后，又可通过人蚤或呼吸道等途径在人群间流行。②临床上还可以引起肺鼠疫和败血症型鼠疫。肺鼠疫：吸入染菌的尘埃则引起原发性肺鼠疫，病人高热寒战，咳嗽、胸痛、咯血，病人多因呼吸困难或心力衰竭而死亡，死亡病人的皮肤常呈黑紫色，故有“黑死病”之称。败血症型鼠疫：重症腺鼠疫或肺鼠疫患者的病原菌可侵入血流，导致败血症型鼠疫，发生休克和 DIC，皮肤黏膜见出血点及瘀斑，全身中毒症状和中枢神经系统症状明显，死亡率高。③该病的诊断方法主要是以流行病学和临床表现进行诊断，非授权单位严禁实行微生物学检查，以防止病原体扩散。血清学诊断在疾病早期意义不大。④灭鼠、灭蚤是切断鼠疫传播环节和根除鼠间鼠疫及防止向人群传播的根本措施。一旦发现患者应尽快隔离，以阻断人间鼠疫进一步流行。与患者接触者可口服磺胺嘧啶，对具有潜在感染可能性的人群进行预防接种。我国目前使用无毒株 EV 活菌苗。早期应用抗生素是降低病死率的关键。腺鼠疫常用链霉素加磺胺类药物治疗，肺鼠疫和败血症鼠疫常用链霉素或阿米卡星加四环素治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-short004",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：李某，家中饲养山羊多年，近日家中连续出现不明原因山羊死亡。李某食用病死山羊肉后于今日出现连续性呕吐，右手部出现疖肿，继而出现坏死并形成特殊的黑色焦痂，查体发现患者全身中毒症状重，伴肠麻痹及血便。试解析：①患者感染了什么致病菌，诊断依据是什么？②家中病死山羊应如何处置，为什么？③这样病例的处置原则是什么？",
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
        "炭疽病例分析",
        "①根据患者有接触和食用病畜史，以及手部疖肿，继而出现坏死并形成特殊的黑色焦痂的表现可初步诊断为炭疽芽胞杆菌感染。相关检验检疫部门可在无菌条件下取渗出物或血液涂片染色，见细菌呈竹节状排列可辅助诊断炭疽芽胞杆菌感染。②在相关部门监控下立即对余下的病死山羊进行深埋 2 米以下处理以隔离传染源，严禁擅自处理病畜、剥皮和煮食以切断传播途径。③处置原则是逐级上报疾病控制中心，尽快在当地医院明确诊断，立即接受隔离治疗，控制病情，预防重点应放在控制家畜的感染和牧场的污染上。对疫区家畜应进行预防接种。特异性预防用炭疽减毒活疫苗进行皮上划痕接种，免疫力可维持 1 年。治疗以青霉素首选，也可选用其他广谱抗生素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 3 成员（题组20-22；取材预算内未纳入后两组23-25、26-28） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch15-zoonotic-bacteria-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "产气荚膜梭菌",
      "布鲁菌",
      "破伤风梭菌",
      "鼠疫耶尔森菌",
      "炭疽芽胞杆菌",
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
        id: "ext-microbiology-ch15-zoonotic-bacteria-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可引起气性坏疽的是",
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
            "产气荚膜梭菌",
            "产气荚膜梭菌是引起气性坏疽的主要病原菌。原书 B1 答案第 20 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch15-zoonotic-bacteria-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "涂片染色呈竹节状排列的革兰阳性菌是",
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
            "炭疽芽胞杆菌",
            "炭疽芽胞杆菌为革兰阳性粗大杆菌，是致病菌中最大者，呈竹节状排列。原书 B1 答案第 21 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch15-zoonotic-bacteria-b001m3",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "感染动物后，引起母畜流产的是",
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
            "布鲁菌",
            "布鲁菌感染家畜引起母畜流产，是其特征性致病表现。原书 B1 答案第 22 题为 A。",
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
