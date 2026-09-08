import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第2章 免疫器官和组织 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：8 题
 * - 问答题（short-answer）：4 题
 * - 独立记分题合计：21 题（须等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 9、填空题 6、选择题（A1 型 42 + A2 型 4）、问答题 5 及
 *   B1 配伍题 3 组；本文件按 21 道预算取材，本章一般无多选，故未映射多选。中枢/外周免疫
 *   器官、细胞分化成熟部位、淋巴细胞归巢与再循环为取材重点。原书 A2 型题号在参考答案
 *   区与 A1/B1 混排（章节尾键号相连编排），已按「题号—键号」对应关系恢复正确项。OCR 错字
 *   与符号已按免疫学医学语义恢复（CD34/CD117、MALT、MolJ>等），数值与细胞因子名保留原值。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch02-immune-organs";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第2章 免疫器官和组织 习题（核对PDF 第20–30页）";
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
    id: "ext-immunology-ch02-immune-organs-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：中枢免疫器官",
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
        "中枢免疫器官",
        "是免疫细胞发生、分化、发育和成熟的场所。人或其他哺乳类动物的中枢免疫器官包括骨髓和胸腺。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：外周免疫器官",
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
        "外周免疫器官",
        "是成熟淋巴细胞（T 细胞、B 细胞）定居的场所，也是这些淋巴细胞针对外来抗原刺激后启动初次免疫应答的主要部位。包括淋巴结、脾脏和黏膜相关淋巴组织等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：黏膜相关淋巴组织",
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
        "黏膜相关淋巴组织",
        "主要指呼吸道、肠道及泌尿生殖道黏膜固有层和上皮细胞下散在的无被膜淋巴组织，以及某些带有生发中心的器官化淋巴组织（如扁桃体、小肠的派尔集合淋巴结及阑尾等）。黏膜免疫系统是人体重要的防御屏障，也是发生局部特异性免疫应答的主要部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：M 细胞",
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
        "M 细胞（微皱褶细胞）",
        "散布于肠黏膜派尔集合淋巴滤泡（微皱褶）上皮细胞之间的一种特化的抗原转运细胞，可通过吸附、胞饮和内吞等方式摄取肠腔内抗原性异物，并以囊泡形式转运给 M 细胞下方的巨噬细胞或树突状细胞，引起特异性免疫应答。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：淋巴细胞归巢",
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
        "淋巴细胞归巢",
        "指成熟淋巴细胞离开中枢免疫器官后，经血液循环趋向性迁移并寄居于外周免疫器官或组织特定区域的过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch02-immune-organs-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫系统是由",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中枢免疫器官和外周免疫器官组成",
      "免疫器官和黏膜免疫系统组成",
      "胸腺和骨髓组成",
      "免疫器官、免疫细胞和免疫分子组成",
      "T 细胞和 B 细胞组成",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫器官、免疫细胞和免疫分子组成",
        "免疫系统由免疫器官（中枢和外周）、免疫细胞和免疫分子三部分构成。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "哺乳类动物的中枢免疫器官包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "淋巴结和脾脏",
      "胸腺和骨髓",
      "腔上囊和胸腺",
      "骨髓和黏膜相关淋巴组织",
      "淋巴结和骨髓",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸腺和骨髓",
        "哺乳类动物（包括人类）的中枢免疫器官为胸腺和骨髓；腔上囊是禽类 B 细胞分化成熟的场所，不属于哺乳类。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "绝大多数 T 细胞分化成熟的场所是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["骨髓", "腔上囊", "脾脏", "胸腺", "淋巴结"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸腺",
        "胸腺是 T 细胞分化、发育、成熟的场所；骨髓是 B 细胞分化成熟的场所。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人类 B 细胞分化成熟的场所是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["骨髓", "腔上囊", "脾脏", "胸腺", "淋巴结"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "骨髓",
        "人类 B 细胞在骨髓内分化、成熟；禽类 B 细胞则在腔上囊（法氏囊）分化成熟。原书 A1 答案第 6 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "淋巴结内 T 细胞约占淋巴细胞总数的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["55%", "75%", "25%", "35%", "10%"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "75%",
        "淋巴结内 T 细胞约占淋巴细胞总数的 75%，B 细胞约占 25%。原书 A1 答案第 7 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肠黏膜固有层浆细胞主要分泌的抗体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IgM", "IgA", "IgG", "IgE", "IgD"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IgA",
        "肠黏膜固有层浆细胞主要分泌分泌型 IgA（SIgA），参与黏膜局部免疫。原书 A1 答案第 22 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人类造血干细胞表面具有鉴别意义的标志是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "CD16 和 CD56",
      "CD1a 和 CD11c",
      "CD3 和 CD4",
      "CD34 和 CD117",
      "CD3 和 CD8",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD34 和 CD117",
        "人类造血干细胞表面主要的鉴别标志为 CD34 和 CD117（即 c-kit，干细胞因子受体）；后者可与多种干细胞因子结合，诱导干细胞发育分化。原书 A1 答案第 23 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "禽类 B 细胞分化成熟的场所是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["腔上囊", "胸腺", "骨髓", "脾脏", "淋巴结"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腔上囊",
        "禽类淋巴细胞在腔上囊（法氏囊）内分化成熟为 B 细胞，故 B 细胞又称囊依赖性淋巴细胞。原书 A1 答案第 24 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch02-immune-organs-fill001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "中枢免疫器官中，B 细胞分化、成熟的场所是___，T 细胞分化、成熟的场所是___。",
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
        "骨髓；胸腺",
        "中枢免疫器官包括骨髓和胸腺：B 细胞在骨髓分化、成熟，T 细胞在胸腺分化、成熟。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-fill002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "在骨髓分化成熟的淋巴细胞有___和___。",
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
        "B 细胞；NK 细胞",
        "骨髓是 B 细胞和 NK 细胞分化成熟的场所；T 细胞则在胸腺内分化成熟。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-fill003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "位于呼吸道、消化道及泌尿生殖道黏膜下层的淋巴组织称为___。",
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
        "黏膜相关淋巴组织",
        "呼吸道、消化道及泌尿生殖道黏膜下层的淋巴组织称为黏膜相关淋巴组织（MALT），也称黏膜免疫系统（MIS）。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-fill004",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "淋巴细胞在血液、淋巴液、淋巴器官或组织间反复循环的过程称___。",
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
        "淋巴细胞再循环",
        "定居在外周免疫器官的淋巴细胞经输出淋巴管入淋巴循环、经血液循环重返外周免疫器官和组织，如此反复循环的过程即淋巴细胞再循环，是维持正常免疫应答的必要条件。原书填空题第 6 题答案。",
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
    id: "ext-immunology-ch02-immune-organs-short001",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述胸腺微环境的组成及其作用。",
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
        "胸腺微环境的组成与作用",
        "胸腺微环境主要由胸腺基质细胞及其分泌的细胞因子和胸腺肽类分子以及细胞外基质组成。胸腺基质细胞以胸腺上皮细胞为主，还包括巨噬细胞、树突状细胞和成纤维细胞等，通过两种方式参与胸腺细胞分化：①分泌 SCF、IL-1、IL-2 和趋化因子等多种细胞因子调节胸腺细胞发育和细胞间相互作用；分泌胸腺素、胸腺九肽、胸腺生成素等多种胸腺肽类分子促进胸腺细胞增殖、分化和发育；②细胞-细胞间的相互接触：通过黏附分子及其配体、细胞因子及其受体、辅助受体及其配体、抗原肽-MHC 分子复合物与 TCR 的相互作用等诱导和促进胸腺细胞分化、发育和成熟。细胞外基质（包括胶原、网状纤维蛋白、葡萄糖胺聚糖等）可促进上皮细胞与胸腺细胞接触，并促进胸腺细胞在胸腺内移行和成熟。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-short002",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述免疫器官的组成及其在免疫中的主要作用。",
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
        "免疫器官的组成与作用",
        "免疫器官按其发生和功能不同分为中枢免疫器官和外周免疫器官，二者通过血液循环及淋巴循环互相联系。中枢免疫器官发生较早，由骨髓和胸腺组成，多能造血干细胞在此发育为成熟免疫细胞后经血液循环输送至外周免疫器官。外周免疫器官发生相对较晚，由淋巴结、脾脏及黏膜相关淋巴组织等组成，成熟免疫细胞在这些部位定居，接受抗原刺激后产生免疫应答。通过血液、淋巴和血液-淋巴循环网络，可将固有免疫细胞聚集到病原体等抗原性异物存在的部位发挥抗感染免疫作用，也可使摄取加工抗原性异物的抗原提呈细胞进入外周免疫器官或组织，启动适应性免疫应答，产生免疫效应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-short003",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述淋巴细胞再循环的生物学意义。",
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
        "淋巴细胞再循环的意义",
        "①通过淋巴细胞再循环，可使体内淋巴细胞在外周免疫器官和组织中的分布更趋合理，淋巴组织不断从循环池中得到新的淋巴细胞补充，有助于增强机体免疫功能；②增加带有各种特异性抗原受体的 T 细胞和 B 细胞（包括记忆细胞）与抗原及 APC 接触的机会，有利于适应性免疫应答的产生；③使机体所有免疫器官和组织联系成一个有机整体，将免疫信息传递给全身各处的淋巴细胞和其他免疫细胞，有利于动员免疫细胞和效应细胞迁移至病原体、肿瘤或其他抗原性异物所在部位发挥免疫效应。因此，淋巴细胞再循环是维持机体正常免疫应答并发挥免疫功能的必要条件。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch02-immune-organs-short004",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述骨髓的功能。",
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
        "骨髓的功能",
        "①是各类血细胞和免疫细胞发生的场所：骨髓多能造血干细胞在骨髓微环境中首先分化为髓样祖细胞和淋巴样祖细胞，再分化为各种血细胞和淋巴细胞。②是 B 细胞分化成熟的场所：骨髓产生的淋巴祖细胞一部分迁入胸腺发育成熟为 T 细胞，另一部分在骨髓内分化为成熟 B 细胞。③是再次体液免疫应答的主要部位：活化的记忆性 B 细胞在外周免疫器官受抗原刺激后可经淋巴液和血液返回骨髓，在骨髓分化成熟为浆细胞，产生大量以 IgG 为主的抗体，是血清抗体的主要来源。",
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