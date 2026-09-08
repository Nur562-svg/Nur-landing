import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 病理学学习指导与习题集 — 第1章 细胞和组织的适应与损伤 题库提取（等比取样）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：6 题
 * - 选择题（a1-single）：7 题（A1 型 5、A2 型病例题 2）
 * - 判断题 + 问答题（short-answer）：10 题（判断题 6、问答题 4）
 * - B1 配伍题：0 组（本书无 B1 型）
 * - 独立记分题合计：23 题（须等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、判断题、选择题（A1/A2）、问答题；本文件按 23 道预算在
 *   原书顺序内取材：名词解释取第 1–6 题、A1 型取第 1–5 题、A2 型取第 34–35 题、判断题取
 *   第 1–6 题、问答题取第 1–4 题；未纳入的题因预算所限。正确项对齐章末参考答案键号
 *   （A1/A2 各小节独立编号），选项已随机重排并同步 correctChoiceIndex。判断题答案按
 *   √/× 键号归位（√=对、×=错）。OCR 错字已按病理学医学语义恢复（如 调亡→凋亡、
 *   菱缩→萎缩、目噬→自噬、猜亡→凋亡、病理性色素沉者→病理性色素沉着、苏丹皿→苏丹Ⅲ、
 *   帕内特细胞→潘氏细胞、Rusell 小体→Russell 小体、子官颈→子宫颈、Barret 食管→
 *   Barrett 食管、去神经性菱缩→去神经性萎缩等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pathology-ch01-cell-adaptation-and-injury";
const locatorBase =
  "《病理学学习指导与习题集》 第1章 细胞和组织的适应与损伤 习题（核对PDF 第8–22页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道（原书第 1–6 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：适应（adaptation）",
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
        "适应（adaptation）是细胞和由其构成的组织、器官对于内、外环境中的持续性刺激和各种有害因子而产生的非损伤性应答反应。",
        "适应包括功能代谢和形态结构两方面，形态学上表现为萎缩、肥大、增生和化生，涉及细胞数目、细胞体积或细胞分化的改变。病因去除后，适应细胞可恢复正常；病因持续存在或加强，可导致细胞死亡。原书第1章名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：萎缩（atrophy）",
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
        "萎缩（atrophy）指已发育正常的细胞、组织或器官的体积缩小。",
        "组织与器官的萎缩是指实质细胞体积缩小和（或）数量减少；组织器官的未曾发育或发育不全不属于萎缩。萎缩分为生理性萎缩和病理性萎缩，病理性萎缩依据发生原因又分为营养不良性、压迫性、失用性、去神经性、内分泌性、老化和损伤性萎缩。原书第1章名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：脂褐素（lipofuscin）",
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
        "脂褐素（lipofuscin）是细胞自噬溶酶体内未被彻底消化的细胞器碎片残体。",
        "镜下呈黄褐色微细颗粒状，是细胞以往受到自由基脂质过氧化损伤的标志，又有消耗性色素之称。心肌细胞和肝细胞等萎缩细胞胞质内可出现脂褐素颗粒，萎缩器官因之颜色变深（褐色萎缩）。原书第1章名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肥大（hypertrophy）",
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
        "肥大（hypertrophy）是细胞、组织或器官由于功能增加、合成代谢旺盛，体积增大。",
        "肥大是指实质细胞的体积增大，但可伴有实质细胞数量的增加。在性质上可分为生理性肥大或病理性肥大；在原因上可分为代偿性肥大或功能性肥大、内分泌性肥大。肥大的细胞体积增大、细胞核肥大深染，其功能代偿作用有限。假性肥大指实质细胞萎缩的同时间质脂肪细胞增生，并非实质细胞肥大。原书第1章名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：增生（hyperplasia）",
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
        "增生（hyperplasia）是细胞有丝分裂活跃而致组织或器官内细胞数目增多的现象。",
        "增生常导致组织或器官的体积增大和功能活跃。依据性质可分为生理性增生和病理性增生；依据原因可分为代偿性增生（功能性增生）和分泌性增生（激素性增生）。增生时细胞数量增多，细胞和细胞核形态正常或稍增大，大部分病理性增生会因诱因的去除而停止。原书第1章名词解释第 5 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：化生（metaplasia）",
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
        "化生（metaplasia）是一种分化成熟的细胞类型被另一种分化成熟的细胞类型所取代的过程。",
        "化生通常只出现在分裂增殖能力较活跃的细胞类型中，不是由已分化成熟的细胞直接转变而来，而是由具有分裂增殖和多向分化能力的干细胞或结缔组织中的未分化间充质细胞转分化引起。常见的有鳞状上皮化生、肠上皮化生、假幽门腺化生、Barrett 食管、子宫颈糜烂、骨或软骨化生等。如果引起化生的因素持续存在，则可能引起细胞恶变。原书第1章名词解释第 6 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），7 道（A1 型第 1–5 题、A2 型第 34–35 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于萎缩的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脊髓灰质炎时腿部肌肉的改变",
      "先天性胸腺发育不良",
      "恶病质",
      "阿尔茨海默病时大脑的脑回变窄",
      "肾结石时肾脏体积增大",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "先天性胸腺发育不良",
        "萎缩指已发育正常的细胞、组织或器官的体积缩小，组织器官的未曾发育或发育不全不属于萎缩，故先天性胸腺发育不良不属于萎缩。恶病质属营养不良性萎缩，脊髓灰质炎时腿部肌肉属去神经性萎缩，阿尔茨海默病时大脑脑回变窄属病理性（老年性）萎缩；肾结石时肾脏体积增大系肾盂积水所致，其实质仍发生压迫性萎缩。原书第1章 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "慢性胃炎时胃黏膜的萎缩属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "内分泌性萎缩",
      "营养不良性萎缩",
      "损伤性萎缩",
      "去神经性萎缩",
      "压迫性萎缩",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "损伤性萎缩",
        "慢性胃炎时胃黏膜长期受慢性炎症刺激损伤，其实质细胞萎缩属于损伤性萎缩。病理性萎缩依据发生原因分为营养不良性、压迫性、失用性、去神经性、内分泌性、老化和损伤性萎缩等。原书第1章 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于萎缩的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "大部分生理性萎缩是通过细胞坏死引起的",
      "萎缩的器官体积可以增大",
      "萎缩时器官颜色变深是由于含铁血黄素颗粒的沉着",
      "肿瘤细胞不会发生萎缩",
      "萎缩可以单纯由间质细胞的体积缩小或数量减少引起",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "萎缩的器官体积可以增大",
        "萎缩器官体积一般缩小，但如肾盂积水时肾脏体积可增大（实质萎缩而器官体积增大），故该描述正确。萎缩是实质细胞体积缩小和（或）数量减少，间质细胞不参与；大部分生理性萎缩是通过细胞凋亡引起的；肿瘤细胞也可发生萎缩；萎缩器官颜色变深是脂褐素沉着（褐色萎缩）所致，而非含铁血黄素。原书第1章 A1 型题第 3 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下述组织或器官的体积增大，仅是由肥大引起的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "功能亢进的甲状腺",
      "妊娠期的子宫",
      "高血压时的心肌",
      "一侧肾脏切除后的对侧肾脏",
      "哺乳期的乳腺",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "高血压时的心肌",
        "心肌细胞分裂增殖能力低，其体积增大通常仅由肥大引起，故高血压时心肌的增大仅由肥大所致。哺乳期乳腺、妊娠期子宫、功能亢进甲状腺、一侧肾切除后对侧肾脏的体积增大均由肥大和增生共同引起。原书第1章 A1 型题第 4 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于肥大和增生的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肥大和增生均属于病理状态",
      "原因去除后，肥大和增生不可停止",
      "肥大和增生时细胞体积都可以增大",
      "肥大必定伴有增生",
      "增生仅仅指实质细胞数目增多",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大和增生时细胞体积都可以增大",
        "肥大时细胞体积增大；增生时细胞数量增多，细胞和细胞核形态正常或稍增大，即细胞体积也可增大，故该描述正确。肥大不一定伴有增生；增生可发生于间质细胞；原因去除后肥大和增生可停止；肥大和增生均可分为生理性和病理性，并非都属于病理状态。原书第1章 A1 型题第 5 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患者，女，51 岁，工人。因上腹部反复不适、消化不良三年前来就诊，胃镜检查并病理活检示：胃黏膜上皮内腺体数量减少达三分之一以上、部分腺体以杯状细胞为主，间质内大量淋巴细胞浸润。请问该患者的胃黏膜腺体发生了",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["凋亡", "化生", "增生", "老化", "肥大"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "化生",
        "胃黏膜上皮内腺体减少、部分腺体以杯状细胞为主，提示胃黏膜上皮发生肠上皮化生，即胃黏膜上皮转变为含有杯状细胞的小肠或大肠黏膜上皮组织，属化生。原书第1章 A2 型题第 34 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-a1007",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "叶某，男，39 岁，身高 172cm。1 年前体重 90kg，体检 B 超示肝区近场弥漫性点状高回声；这 1 年加强体育锻炼，每日快走 2 小时，控制饮食，现体重为 75kg，体检 B 超示肝脏正常。请问 1 年前叶某的肝脏病变最有可能为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肝纤维化", "肝硬化", "肝脂肪变", "急性肝炎", "肝细胞水肿"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝脂肪变",
        "患者肥胖（体重 90kg），B 超示肝区弥漫性点状高回声，经锻炼、控制饮食减重后 B 超恢复正常，最可能为肝脂肪变（脂肪肝），减重后脂肪变可消退。原书第1章 A2 型题第 35 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断题 + 问答题（short-answer），10 道（判断题第 1–6 题、问答题第 1–4 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：小儿麻痹症患者腿部肌肉的萎缩属于失用性萎缩。",
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
        "错。小儿麻痹症（脊髓灰质炎）患者腿部肌肉的萎缩属于去神经性萎缩，而非失用性萎缩。",
        "去神经性萎缩因运动神经元或轴突损害引起效应器萎缩，其机制是神经对肌肉运动调节丧失，加之活动减少和骨骼肌细胞分解代谢加速。小儿麻痹症损伤脊髓前角运动神经元，故其肌肉萎缩为去神经性萎缩。原书第1章判断题第 1 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：假性肥大是由于间质脂肪细胞等增生引起的。",
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
        "对。假性肥大是由于某些病理情况下，实质细胞萎缩的同时，间质脂肪细胞等增生，以维持组织、器官的原有体积，甚至造成组织和器官的体积增大。",
        "假性肥大并非实质细胞本身的肥大，而是间质脂肪组织增生所致，故称“假性”。原书第1章判断题第 2 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：内分泌性增生都是病理性增生。",
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
        "错。内分泌性（激素性）增生并非都是病理性增生，也可为生理性增生。",
        "增生依据性质可分为生理性增生和病理性增生，依据原因可分为代偿性增生（功能性增生）和分泌性增生（激素性增生）。内分泌性增生既可以是生理性的（如青春期乳腺发育），也可以是病理性的（如子宫内膜增生）。原书第1章判断题第 3 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short004",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：分裂增殖能力弱的组织或器官其体积增大往往与增生无关。",
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
        "对。对于细胞分裂增殖能力较低的组织或器官，其体积增大通常仅仅是由肥大引起，与增生无关。",
        "对于细胞分裂增殖能力活跃的组织或器官，其体积增大通常由肥大和增生共同引起；而分裂增殖能力低的组织（如心肌、骨骼肌）体积增大主要靠肥大。原书第1章判断题第 4 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short005",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：化生是由原来已分化成熟的细胞通过转分化实现的。",
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
        "错。化生不是由已分化成熟的细胞直接转变过来的，而是由具有分裂增殖和多向分化能力的干细胞或结缔组织中的未分化间充质细胞转分化引起。",
        "化生通常发生在同源性细胞之间，一般是由特异性较低的细胞类型来取代特异性较高的细胞类型。原书第1章判断题第 5 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short006",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：间叶组织的化生在原因清除后往往可以逆转。",
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
        "错。间叶组织的化生大多不可逆。",
        "上皮组织的化生在原因消除后或可恢复，但间叶组织化生大多不可逆。原书第1章判断题第 6 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short007",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：细胞和组织的适应有哪些？它们各自的意义是什么？",
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
        "细胞和组织的适应有萎缩、肥大、增生和化生。适应可以使机体避免细胞和组织受损，在内外环境变化中达到代谢、功能和形态结构上新的平衡。（1）萎缩通过减少细胞体积、数量和降低功能代谢来适应；（2）肥大可致细胞内 DNA 含量和细胞器数量增多，蛋白合成活跃，细胞功能增强；（3）增生则通过细胞数目增多达到功能活跃的目的；（4）化生一方面可以增加机体局部抵御外界刺激的能力，另一方面则会削弱功能，引起恶变。",
        "原书第1章问答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short008",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：肝细胞水肿和肝脂肪变在形态上有何异同？",
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
        "肝细胞水肿和肝脂肪变都可引起肝脏体积增大，边缘圆钝、包膜紧张。（1）肝细胞水肿时，显微镜下见肝细胞体积明显增大，胞质疏松、内可见红染细颗粒物，严重时胞质呈空泡状，细胞核也可体积增大；肉眼观切面颜色变淡。（2）肝脂肪变时，显微镜下见肝细胞体积可增大，胞质内大小不等的球形脂滴，石蜡切片中呈圆形空泡，细胞核被挤至一侧；肉眼观切面油腻呈淡黄色。",
        "原书第1章问答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short009",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：坏死的结局有哪些？",
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
        "坏死的结局有以下几种情况：（1）溶解吸收：水解酶使坏死组织溶解液化，或者被巨噬细胞清除，坏死液化范围较大时可形成囊腔；（2）分离排出：坏死灶较大不易被完全溶解吸收时，坏死物可被分离，形成组织缺损，可形成糜烂、溃疡、窦道、瘘管、空洞等现象；（3）机化与包裹：坏死组织等可被肉芽组织取代，发生机化；坏死组织太大时，则由肉芽组织包围形成包裹，两者最终都可形成纤维瘢痕。",
        "原书第1章问答题第 3 题参考答案。此外，按本章正文，坏死还可通过钙化（坏死细胞和细胞碎片未被及时清除时引起营养不良性钙化）等方式进行修复。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch01-cell-adaptation-and-injury-short010",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：坏死和凋亡在形态学和生化特征上有哪些区别？",
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
        "（1）形态学：坏死细胞肿胀、核染色质絮状或边集，细胞膜及细胞器膜溶解破裂，细胞自溶；凋亡时细胞固缩，核染色质边集，细胞膜及细胞器膜完整，膜可发泡成芽，形成凋亡小体。（2）生化特征：坏死是不耗能的被动过程，不依赖 ATP，无新蛋白合成，DNA 降解不规律，片段大小不一，琼脂凝胶电泳通常不呈梯状带；凋亡是耗能的主动过程，依赖 ATP，有新蛋白合成，凋亡早期 DNA 规律降解为 180~200bp 片段，琼脂凝胶电泳呈特征性梯状带。",
        "原书第1章问答题第 4 题参考答案。",
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
  ...termItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
