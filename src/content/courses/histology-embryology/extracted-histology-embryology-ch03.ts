import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第3章 结缔组织 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 选择题（a1-single）：8 题（含 X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：2 题
 * - B1 配伍题：1 组、共 6 个成员
 * - 独立记分题合计：21 题（等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：1（原书 A1 第 1 题「狭义结缔组织是指」参考答案
 *   仅写「疏松结缔组织和致密结缔组织」，与固有结缔组织（含脂肪、网状）的教材定义
 *   可能相左、无法可靠锚定唯一答案，予以跳过并换用同源多选映射题补足预算）
 * - 说明：本章原书依序含 A1 型选择题（第 1~13 题）、B1 型配伍题（14~19）、多选题
 *   （20~26）、名词解释 5 个、简答题 3 个、论述题 2 个，无线其余类型。按 21 道预算
 *   等比取材：名词解释 5 个全取；A1 取 7 个答案清晰题 + 1 个 X 型映射（第 20 题巨噬
 *   细胞功能）；简答/论述取 2 个（结缔组织共同特征、花粉过敏相关细胞）；B1 组 6 个
 *   成员全取。双栏错序已按组织学语义恢复（「幾/越/薨/离/病」→基质/结缔等），数字
 *   （透明质酸拉直可达 2.5 nm）等保留原值，未捏造。原书 A1 第 9、11 题因题干缺
 *   「正确/错误」字样、易引发歧义，未纳入。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch03-connective-tissue";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第3章 结缔组织 复习思考题 习题（核对PDF 第22–28页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch03-connective-tissue-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：成纤维细胞",
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
        "成纤维细胞",
        "成纤维细胞是疏松和致密结缔组织中最主要的细胞，较大，多突起；胞核较大、卵圆形、着色浅、核仁明显，胞质较丰富呈弱嗜碱性。电镜下胞质富于粗面内质网和高尔基复合体，主要合成和分泌构成结缔组织的纤维和基质成分。静止状态时呈长梭形称纤维细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：分子筛",
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
        "分子筛",
        "疏松结缔组织基质中的一些化学成分形成的立体构型，其主要化学成分是蛋白多糖。以透明质酸分子为主干、借连接蛋白将其他多糖分子结合构成蛋白多糖复合物，其构型即为具有许多微孔的分子筛。分子筛使基质成为限制细菌扩散的防御屏障。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：致密结缔组织",
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
        "致密结缔组织",
        "可分为规则和不规则致密结缔组织，是一种以纤维为主要成分的固有结缔组织。纤维粗大、排列致密，基质和细胞成分少，以支持和连接为主要功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：组织液",
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
        "组织液",
        "在组织的细胞间质内不断流动的液体。它从毛细血管动脉端渗出，在毛细血管静脉端或毛细淋巴管处回流到血和淋巴内，在不断更新中与细胞进行物质交换。组织液是构成细胞生存微环境的重要成分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：网状组织",
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
        "网状组织",
        "分布在造血器官和淋巴器官内的一种结缔组织，由网状细胞、网状纤维和基质组成。网状细胞有突起、相互连接成网，细胞可产生网状纤维。网状纤维细而有分支、互相交错，依附在网状细胞及其突起上，共同构成器官的支架，并参与构成造血诱导微环境或淋巴细胞分化的微环境。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型及 X 型映射选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "成纤维细胞转变为纤维细胞表示其",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "进入衰老状态",
      "功能旺盛",
      "功能静止",
      "准备分裂增生",
      "即将死亡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "功能静止",
        "成纤维细胞处于静止状态时呈长梭形，细胞核变小、染色深，此时称纤维细胞，故转变为纤维细胞表示其功能静止。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "使浆细胞胞质呈嗜碱性的超微结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "大量分泌颗粒",
      "许多线粒体",
      "丰富的粗面内质网",
      "丰富的滑面内质网",
      "发达的高尔基复合体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "丰富的粗面内质网",
        "浆细胞胞质内含大量密集的粗面内质网，故胞质呈嗜碱性；浅染区（核旁）富含高尔基复合体。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "胞质内含嗜碱性分泌颗粒的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "浆细胞",
      "成纤维细胞",
      "巨噬细胞",
      "纤维细胞",
      "肥大细胞",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大细胞",
        "肥大细胞胞质内充满粗大的嗜碱性颗粒，具有异染性。原书 A1 答案第 4 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与花粉引起的过敏反应有关的两种细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肥大细胞和单核细胞",
      "巨噬细胞和浆细胞",
      "成纤维细胞和巨噬细胞",
      "肥大细胞和浆细胞",
      "单核细胞和成纤维细胞",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大细胞和浆细胞",
        "花粉过敏反应中，浆细胞受刺激产生抗体 IgE，肥大细胞（及嗜碱性粒细胞）表面的 IgE 受体与之结合后处于致敏状态，再次接触花粉时触发脱颗粒释放组胺等引起过敏反应。原书 A1 答案第 5 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "构成基质蛋白聚糖聚合体主干的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "核心蛋白",
      "硫酸角质素",
      "氨基聚糖",
      "透明质酸",
      "硫酸软骨素",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "透明质酸",
        "蛋白多糖以透明质酸分子为主干，借连接蛋白将其他多糖（如硫酸软骨素等）结合构成蛋白多糖复合物。原书 A1 答案第 6 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肿瘤细胞等可产生能破坏基质防御屏障的物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "溶菌酶",
      "碱性磷酸酶",
      "胶原蛋白酶",
      "酸性磷酸酶",
      "透明质酸酶",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "透明质酸酶",
        "分子筛以透明质酸为主干，肿瘤细胞可产生透明质酸酶分解之，从而破坏基质的防御屏障、利于侵袭转移。原书 A1 答案第 7 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "产生肝素的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "巨噬细胞",
      "浆细胞",
      "肥大细胞",
      "脂肪细胞",
      "成纤维细胞",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肥大细胞",
        "肥大细胞参与过敏反应，可释放和合成组胺、肝素等物质。原书 A1 答案第 8 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于巨噬细胞主要功能的是（原题为多选题「巨噬细胞的主要功能是」，取其一个正确功能）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "合成和分泌抗体",
      "分化为浆细胞",
      "吞噬病原体等",
      "合成和释放组胺、肝素",
      "分泌大量免疫球蛋白",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吞噬病原体等",
        "巨噬细胞具有吞噬、抗原呈递和分泌作用，可吞噬病原体等异物并分泌多种活性物质。合成和分泌抗体、分化为浆细胞是 B 淋巴细胞的功能，合成和释放组胺、肝素是肥大细胞的功能。原书多选题第 20 题答案 CDE，本项目取吞噬病原体为映射正确项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/论述题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch03-connective-tissue-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述结缔组织的共同特征。",
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
        "结缔组织的共同特征",
        "由少量的细胞和大量的细胞间质组成，细胞种类多、分散、无极性。细胞间质包括均质状的基质、细丝状的纤维和不断循环更新的组织液。广义结缔组织包括固有结缔组织、血液及软骨和骨，一般所称结缔组织即指固有结缔组织。结缔组织在体内广泛分布，具有支持、连接、营养、保护、修复等多种功能。结缔组织起源于胚胎时期的间充质，间充质由间充质细胞和少量稀薄的基质构成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch03-connective-tissue-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试述结缔组织中与花粉导致的过敏反应有关的细胞的相关作用。",
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
        "与花粉过敏反应有关的细胞及其作用",
        "主要有浆细胞、肥大细胞、嗜碱性粒细胞和嗜酸性粒细胞。浆细胞受到花粉刺激后产生抗体 IgE；肥大细胞和嗜碱性粒细胞表面有大量 IgE 受体，当 IgE 与这两种细胞表面的受体结合后，机体对该过敏原便处于致敏状态。当再次接触同种花粉时，后者便与结合在两种细胞表面的 IgE 结合，使其激活而脱颗粒，释放组胺、白三烯等物质引起过敏反应。发生过敏反应时，在两种细胞释放的嗜酸性粒细胞趋化因子作用下，嗜酸性粒细胞移向过敏反应部位，释放组胺酶和芳基硫酸酯酶，前者分解组胺、后者灭活白三烯，从而抑制过敏反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 6 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch03-connective-tissue-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["浆细胞", "间充质细胞", "肥大细胞", "成纤维细胞", "巨噬细胞"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch03-connective-tissue-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "细胞质中含有溶酶体最多的细胞是",
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
            "巨噬细胞",
            "巨噬细胞胞质内含大量溶酶体、吞噬体、吞饮小泡及残余体。原书 B1 第 14 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch03-connective-tissue-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可分泌弹性蛋白的细胞是",
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
            "成纤维细胞",
            "成纤维细胞合成和分泌构成结缔组织的纤维（包括胶原纤维、弹性纤维等的蛋白成分）和基质。原书 B1 第 15 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch03-connective-tissue-b001m3",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "参与体液免疫的细胞是",
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
            "浆细胞",
            "浆细胞来源于 B 淋巴细胞，可产生抗体，参与机体的体液免疫。原书 B1 第 16 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch03-connective-tissue-b001m4",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可分化为脂肪细胞的细胞是",
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
            "间充质细胞",
            "未分化间充质细胞是多能的，可增殖分化为成纤维细胞、脂肪细胞、内皮细胞、平滑肌等。原书 B1 第 17 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch03-connective-tissue-b001m5",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "具有抗原提呈作用的细胞是",
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
            "巨噬细胞",
            "巨噬细胞具有吞噬、抗原呈递和分泌作用，可将吞入的抗原加工处理后提呈给淋巴细胞。原书 B1 第 18 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch03-connective-tissue-b001m6",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与花粉引起的过敏反应密切相关的细胞是",
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
            "肥大细胞",
            "肥大细胞表面有 IgE 受体，致敏后再次接触过敏原可脱颗粒释放组胺等引起过敏反应。原书 B1 第 19 题答案 E。",
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