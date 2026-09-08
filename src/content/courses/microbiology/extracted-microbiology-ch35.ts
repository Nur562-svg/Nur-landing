import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第35章 真菌学总论 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：9 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：3 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：0 组（本章原书含 2 组 B1 配伍题，本文件预算剩余未纳入）
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 9、填空题 6、选择题（A1 型 16 + A2 型 5）、B1 型 2 组
 *   （共 4 成员）与简答题 5；本文件按 18 道预算取样，名词解释全取，填空题取前 3 道，
 *   选择题取 A1 3 道，简答题取前 3 道，B1 配伍题未纳入。OCR 错字与双栏错序已按
 *   微生物学医学语义恢复（如沙保弱培养基、白假丝酵母、烟曲霉、孢子等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch35-mycology-general";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第35章 真菌学总论 习题（核对PDF 第254–261页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），9 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch35-mycology-general-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：真菌",
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
        "真菌",
        "是一大类真核细胞型微生物。细胞核高度分化，有核膜和核仁，胞浆内有完整的细胞器。细胞壁由几丁质或纤维素组成，不含叶绿素，不分化根、茎、叶。少数为单细胞，多数为多细胞结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：菌丝",
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
        "菌丝",
        "真菌孢子生出嫩芽，形成芽管。芽管逐渐延长呈丝状，称菌丝。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：孢子",
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
        "孢子",
        "孢子是由生殖菌丝产生的圆形或卵圆形结构，是真菌的生殖结构。孢子也是真菌鉴定和分类的主要依据。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：假菌丝",
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
        "假菌丝",
        "类酵母型真菌的母细胞以芽生方式繁殖，出芽产生的芽生孢子持续延长，但不断裂、不与母细胞脱离，产生相互连接成藕节状较长的细胞链，可伸入培养基内，称假菌丝。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：酵母型菌落",
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
        "酵母型菌落",
        "是单细胞真菌的菌落形式。菌落柔软、致密、光滑、湿润。显微镜下观察可见芽生孢子，无菌丝。新生隐球菌的菌落属于此型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：类酵母型菌落",
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
        "类酵母型菌落",
        "亦称酵母样菌落，是单细胞真菌的菌落形式。外观上与酵母型菌落相似，但显微镜下可见呈藕节状细胞链的假菌丝，由菌落向下生长，伸入培养基中。白假丝酵母的菌落属此型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：丝状型菌落",
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
        "丝状型菌落",
        "是多细胞真菌的菌落形式。由菌丝体和孢子所组成。菌落呈絮状、绒毛状或粉末状，菌落正面、背面可呈不同的颜色，其菌落的形态和颜色常作为真菌鉴定、分类的参考。大多数丝状真菌菌落属于此类。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：双相型真菌",
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
        "双相型真菌",
        "有些真菌可因环境条件（如不同成分的培养基和不同温度）的改变，发生两种形态的互变，称为双相型真菌，即在宿主体内或 37°C 培养时呈酵母型，而在 25°C 培养时则呈菌丝型，如球孢子菌、组织胞浆菌、孢子丝菌等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：真菌病",
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
        "真菌病",
        "由致病性真菌和机会致病性真菌引起感染，并表现临床症状者称真菌病。",
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
    id: "ext-microbiology-ch35-mycology-general-a1001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于真核细胞型的微生物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "梅毒螺旋体",
      "沙眼衣原体",
      "流感病毒",
      "白假丝酵母",
      "幽门螺杆菌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "白假丝酵母",
        "白假丝酵母是真菌，属于真核细胞型微生物；流感病毒为非细胞型微生物，幽门螺杆菌、沙眼衣原体、梅毒螺旋体均为原核细胞型微生物。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-a1002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "真菌细胞不具有的结构或成分是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["内质网", "细胞壁", "叶绿素", "线粒体", "细胞核"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "叶绿素",
        "真菌细胞有细胞壁、细胞核、内质网、线粒体等结构，但不含叶绿素，不能进行光合作用。原书 A1 答案第 10 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-a1003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "预防皮肤癣菌感染的最好方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "接种真菌疫苗",
      "注射干扰素、胸腺肽等细胞因子",
      "注意皮肤清洁卫生，避免与患者接触",
      "注射抗真菌抗体",
      "应用抗真菌淋巴细胞",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "注意皮肤清洁卫生，避免与患者接触",
        "预防皮肤癣菌感染主要是注意清洁卫生，避免与患者接触；目前尚无有效的真菌疫苗，抗真菌抗体、细胞因子等不作为常规预防手段。原书 A1 答案第 13 题为 E。",
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
    id: "ext-microbiology-ch35-mycology-general-fill001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "与医学有关的真菌属于 3 个门，分别为___、___及___。",
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
        "子囊菌门；担子菌门；接合菌门",
        "真菌界分为子囊菌门、担子菌门、接合菌门及壶菌门，与医学有关的真菌属于前 3 个门。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-fill002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "真菌按形态、结构分为两类，分别为___和___。",
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
        "单细胞真菌；多细胞真菌",
        "真菌按形态、结构分为单细胞真菌和多细胞真菌两类。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-fill003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "多细胞真菌由___和___两大基本结构组成。",
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
        "菌丝；孢子",
        "多细胞真菌由菌丝和孢子两大基本结构组成。原书填空题第 3 题答案。",
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
    id: "ext-microbiology-ch35-mycology-general-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：比较真菌孢子与细菌芽胞的区别。",
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
        "真菌孢子与细菌芽胞的区别",
        "真菌孢子与细菌芽胞的区别如下：①产生数目：一条菌丝可产生多个真菌孢子，而一个细菌只产生一个芽胞。②形成部位：真菌孢子形成于细胞内或细胞外，细菌芽胞形成于细胞内。③对热抵抗力：真菌孢子对热抵抗力不强，60~70°C 短时间死亡；细菌芽胞对热抵抗力强，煮沸 2 小时不死。④作用：真菌孢子是重要的繁殖方式；细菌芽胞不是繁殖方式，而是对营养缺乏的一种反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述真菌的培养特性。",
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
        "真菌的培养特性",
        "（1）真菌对营养要求不高，最常用的培养基是沙保弱培养基。（2）浅部真菌培养的最适温度为 22~28°C，其生长缓慢，约 1~2 周才出现典型菌落；深部真菌在 37°C 生长最好，生长较快，3~4 天即可长出菌落。（3）培养真菌需较高的湿度和氧。（4）真菌的菌落分三类：酵母型菌落，为单细胞真菌的菌落形式，形态与一般细菌菌落相似，显微镜下可见圆形或卵圆形细胞，以出芽方式繁殖，如新生隐球菌；类酵母型菌落，为单细胞真菌的菌落形式，外观形状似酵母型菌落，但有假菌丝生长伸入培养基内，如白假丝酵母；丝状菌落，是多细胞真菌的菌落形式，由许多疏松的菌丝和孢子构成，部分菌丝向空中生长，另一部分伸入培养基中，如烟曲霉。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch35-mycology-general-short003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：真菌对人类的致病性包括哪几方面？",
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
        "真菌对人类的致病性",
        "（1）真菌感染：由致病性真菌和机会致病性真菌引起感染，并表现临床症状者称为真菌病（mycoses）。同一种疾病可以由不同种真菌引起，一种真菌也可以引起不同类型的疾病。（2）真菌性超敏反应：包括感染性超敏反应和接触性超敏反应。（3）真菌毒素中毒：真菌毒素是真菌在其代谢过程中产生的，可污染农作物、食物或饲料，人类多因食入而引起急、慢性中毒。（4）某些真菌毒素与致癌有关：已证明黄曲霉毒素有致癌作用，与肝癌发生有关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章原书含 2 组，本文件未纳入 —— 置空 */
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
