import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第40章 β-内酰胺类抗生素 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：5 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 5、选择题（A1 型 23 + A2 型 1 + B1 型
 *   1 组共 3 小题）与简答题 7；本文件按 17 道预算取材：名词解释全取、填空题全取、
 *   A1 型题取第 1–5 题、简答题取第 1–2 题、B1 型取完整组（25～27 题）3 成员；
 *   A1 型题第 6–23 题、A2 型题第 24 题及简答题第 3–7 题因预算未纳入。参考答案键号
 *   自 1–27 连续编号，其中键号 21–23（主要自肾小管分泌/β-内酰胺酶抑制药/单环
 *   β-内酰胺类）散落于【A2型题】标题区内，已按题号与药理学医学语义归位至 A1 型题
 *   第 21–23 题；键号 24.A 归位至 A2 型题第 24 题；B1 键号 25.E、26.C、27.D 对应
 *   25–27 题。正确项对齐章末参考答案键号（A1 型题 1.D/2.B/3.D/4.E/5.C；
 *   B1 型题 25.E/26.C/27.D），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 B-内酰胺类→β-内酰胺类、
 *   青莓素→青霉素、脈拉西林→哌拉西林、氮曲南→氨曲南、头孢噻昐→头孢噻吩 等），
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch40-beta-lactam-antibiotics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第40章 β-内酰胺类抗生素 习题（核对PDF 第262–268页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：赫氏反应",
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
        "应用青霉素G治疗梅毒、钩端螺旋体、雅司、鼠咬热或炭疽等感染时，可有症状加剧现象，表现为全身不适、寒战、发热、咽痛、肌痛、心跳加快等症状，这种治疗矛盾现象称为赫氏反应。",
        "赫氏反应可能是大量病原体被杀死后释放的物质所引起的，多在首次给药后发生，需向患者说明并做好处理准备。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：牵制机制",
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
        "β-内酰胺酶可与某些耐酶的β-内酰胺类抗生素迅速而又牢固地结合，使药物停留在胞浆膜外间隙中，不能到达作用靶位（PBPs）发挥抗菌作用。此非酶解机制的耐药性称为牵制机制或陷阱机制。",
        "牵制机制是细菌对β-内酰胺类抗生素产生耐药性的机制之一，与酶解破坏机制不同，属非酶解型耐药。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "β-内酰胺类抗生素化学结构中均具有___，是与___结合而产生杀菌作用的靶位，也是___灭活抗生素的靶点。",
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
        "β-内酰胺环；青霉素结合蛋白（PBPs）；β-内酰胺酶",
        "β-内酰胺类抗生素依靠β-内酰胺环与细菌胞浆膜上的青霉素结合蛋白（PBPs）结合而杀菌，β-内酰胺环也是β-内酰胺酶水解灭活的靶点。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "青霉素G对革兰氏阴性菌无效是由于不易透过___，故青霉素G抗菌谱___。",
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
        "磷脂外膜（外膜屏障）；窄",
        "青霉素G不易透过革兰阴性菌细胞壁外的脂多糖外膜（磷脂外膜），故对其无效，抗菌谱窄；原书参考答案仅给出“磷脂外膜、窄”两项，题干按答案适配为两空。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "青霉素必须临用前配制是为了防止___和___。",
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
        "效价降低；诱发过敏",
        "青霉素水溶液在室温中不稳定易降解，效价降低，且其降解产物可成为致敏原，故应新鲜配制以减少抗原性。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-fill004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "头孢菌素类的优点是具有抗菌谱___，抗菌作用___，对β-内酰胺酶___，过敏反应与青霉素仅有___。",
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
        "广；强；稳定；部分交叉",
        "头孢菌素类与青霉素类有相似的理化特性、作用机制和临床应用，具有抗菌谱广、杀菌力强、对β-内酰胺酶较稳定及过敏反应少等特点。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-fill005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "β-内酰胺酶抑制药有___、___和___，它们与青霉素组成复方，其应用目的是___。",
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
        "克拉维酸；舒巴坦；他唑巴坦；通过抑制β-内酰胺酶而扩大并加强不耐酶的β-内酰胺类抗生素的作用",
        "β-内酰胺酶抑制药本身抗菌活性弱，但能抑制细菌产生的β-内酰胺酶，与不耐酶的青霉素类组成复方可扩大抗菌谱、增强疗效。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），5 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "青霉素的抗菌作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制DNA多聚酶，影响DNA的合成",
      "与细菌胞浆膜结合，破坏胞浆膜结构",
      "抑制菌体蛋白的合成",
      "与PBPs结合，阻止细胞壁黏肽合成",
      "破坏细胞壁使水分内渗",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "与PBPs结合，阻止细胞壁黏肽合成",
        "β-内酰胺类抗生素作用于细菌胞浆膜上的青霉素结合蛋白（PBPs），抑制细胞壁黏肽合成，使菌体失去渗透屏障，膨胀、裂解而死亡，并触发自溶酶活性促进细菌破裂溶解。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与丙磺舒竞争肾小管分泌的抗生素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "青霉素",
      "链霉素",
      "异烟肼",
      "多黏菌素B",
      "氯霉素",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青霉素",
        "青霉素主要以原形自肾小管分泌排出，丙磺舒可与青霉素竞争肾小管分泌，合用时延缓青霉素排泄、延长其作用时间。原书 A1 型题第 2 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-a1003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于青霉素类描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "青霉素只对繁殖期细菌有杀灭作用",
      "青霉素类的抗菌谱相同",
      "各种青霉素均可口服",
      "广谱青霉素完全可以取代青霉素G",
      "青霉素对繁殖期和静止期均有杀菌作用",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青霉素只对繁殖期细菌有杀灭作用",
        "青霉素是抑制细胞壁黏肽合成的繁殖期杀菌药，只对繁殖期细菌有杀灭作用，对静止期细菌作用弱；不同青霉素的抗菌谱、口服吸收及耐酶特性并不相同。原书 A1 型题第 3 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-a1004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "青霉素吸收后其体内分布情况是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "如果脑膜有炎症或给予大剂量时，可以分布到包括脑脊液在内的所有细胞外液中",
      "血液中",
      "除脑脊液外的所有体液中",
      "细胞外液",
      "泌尿生殖系统",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "如果脑膜有炎症或给予大剂量时，可以分布到包括脑脊液在内的所有细胞外液中",
        "青霉素不易透过血脑屏障，但脑膜有炎症或给予大剂量时，可分布到包括脑脊液在内的所有细胞外液中。原书 A1 型题第 4 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-a1005",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于青霉素结合蛋白（PBPs）下列描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "PBPs有多种类型",
      "当诱导产生新的PBPs时，则β-内酰胺类抗生素抗菌作用增强",
      "某些细菌胞浆膜具有PBPs",
      "当PBPs谱型发生改变则对β-内酰胺类抗生素产生抗药性",
      "β-内酰胺抗生素与PBPs结合导致细菌变形死亡",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "当诱导产生新的PBPs时，则β-内酰胺类抗生素抗菌作用增强",
        "PBPs结构改变、合成量增加或产生新的PBPs，会降低与β-内酰胺类抗生素的亲和力、结合减少而丧失抗菌作用，即产生耐药性，而非抗菌作用增强。原书 A1 型题第 5 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-short001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "青霉素G有哪些主要的优点和缺点？",
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
        "优点：对革兰阳性菌作用强，抗菌作用强、毒性低、价格便宜。缺点：抗菌谱窄、不耐酸、不耐酶，发生过敏性休克率较高。",
        "青霉素G是抑制细胞壁黏肽合成的繁殖期杀菌药，为革兰阳性菌感染的首选药；应用时必须做皮肤过敏试验并备好肾上腺素等急救措施。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-short002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "β-内酰胺类抗生素抗菌的作用机制是什么？",
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
        "①β-内酰胺类抗生素的抗菌作用机制主要是作用于细菌胞浆膜上的青霉素结合蛋白（PBPs），抑制细胞壁黏肽合成酶的活性，从而阻碍细胞壁黏肽的合成，导致细胞壁缺损，使菌体失去渗透屏障，膨胀、裂解而死亡；②触发细菌的自溶酶活性，促进细菌破裂溶解而产生杀菌作用。",
        "β-内酰胺类抗生素是繁殖期杀菌药，其杀菌作用依赖对 PBPs 的抑制和自溶酶活性的触发，细菌缺少自溶酶时可产生耐药。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员（原书 25～27 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch40-beta-lactam-antibiotics-b001",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "哌拉西林",
      "氯唑西林",
      "阿莫西林",
      "青霉素G",
      "美西林",
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
        id: "ext-pharmacology-ch40-beta-lactam-antibiotics-b001m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对铜绿假单胞杆菌有作用的是",
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
            "哌拉西林",
            "哌拉西林属抗铜绿假单胞菌广谱青霉素，对铜绿假单胞杆菌有良好抗菌作用。原书 B1 型题第 25 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch40-beta-lactam-antibiotics-b001m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可用于耐青霉素G的金黄色葡萄球菌引起的感染的是",
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
            "氯唑西林",
            "氯唑西林属耐酶青霉素，对产酶（耐青霉素G）的金黄色葡萄球菌有效。原书 B1 型题第 26 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch40-beta-lactam-antibiotics-b001m3",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对酸稳定性高，可以口服的是",
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
            "阿莫西林",
            "阿莫西林为广谱青霉素，耐酸、口服吸收良好。原书 B1 型题第 27 题，参考答案键号 D。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
