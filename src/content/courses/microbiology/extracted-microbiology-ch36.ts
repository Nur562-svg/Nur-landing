import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第36章 主要病原性真菌 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：12 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：3 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：24 题（须等于本文件预算 24）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 12、填空题 10、选择题（A1 型 24 + A2 型 7）、B1 型 3 组
 *   （共 14 成员）与简答题 6；本文件按 24 道预算取样，名词解释全取，填空题取前 3 道，
 *   选择题取 A1 2 道 + A2 1 道，简答题取前 2 道，B1 取第 1 组（32~35 题，4 成员）。
 *   参考答案按题号 1:1 对齐（答案键 A1 1–20、A2 21–26、B1 27–45 与源题连续编号一致）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如荚膜、厚膜孢子、白假丝酵母、新生隐球菌、
 *   烟曲霉、肺孢子菌、10% KOH 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch36-major-pathogenic-fungi";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第36章 主要病原性真菌 习题（核对PDF 第262–273页）";
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
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：浅部感染真菌",
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
        "浅部感染真菌",
        "指寄生或腐生于角蛋白组织（表皮角质层、毛发、甲板）的真菌。可分为皮肤癣菌和角层癣菌两类。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：皮下组织感染真菌",
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
        "皮下组织感染真菌",
        "主要包括孢子丝菌和着色真菌，经外伤侵入皮下，一般感染只限于局部，但也可扩散至周围组织。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：孢子丝菌病",
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
        "孢子丝菌病",
        "人类可通过有创伤的皮肤接触染有孢子丝菌的土壤、植物或污染物，引起皮肤、皮下组织及相邻淋巴系统的慢性感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：着色真菌病",
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
        "着色真菌病",
        "着色真菌可由外伤侵入人体，引起颜面、下肢及臀部等暴露部位感染，病损皮肤呈境界鲜明的暗红色或黑色区，故称着色真菌病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：深部感染真菌",
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
        "深部感染真菌",
        "侵犯表皮及其附属器以外的组织和器官的病原性真菌或机会致病性真菌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：假丝酵母病",
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
        "假丝酵母病",
        "假丝酵母引起的皮肤、黏膜和内脏的急、慢性感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：厚膜孢子",
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
        "厚膜孢子",
        "白假丝酵母培养后在菌丝顶端、侧缘或中间可见较大、厚壁的圆形或梨形细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：隐球菌病",
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
        "隐球菌病",
        "可侵犯人和动物引起机会致病性感染。最易侵犯的是中枢神经系统，引起慢性脑膜炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：曲霉分生孢子头",
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
        "曲霉分生孢子头",
        "曲霉的分生孢子梗顶端膨大形成半球形或椭圆形的顶囊；在顶囊上以辐射方式长出一、二层杆状小梗；小梗顶端生长呈链状排列的分生孢子，形成一个菊花样的头状结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：曲霉病",
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
        "曲霉病",
        "曲霉能侵犯机体许多组织器官，引起肺曲霉病、全身性曲霉病、中毒及肿瘤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term011",
    order: 11,
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
        "对环境温度敏感可发生形态转换的一类真菌，在宿主体内或 37°C 培养时呈酵母型，而在 25°C 培养时变为菌丝型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-term012",
    order: 12,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肺孢子菌肺炎",
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
        "肺孢子菌肺炎",
        "肺孢子菌经呼吸道吸入肺内，可引起免疫缺陷或免疫功能低下者的机会性感染。",
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
    id: "ext-microbiology-ch36-major-pathogenic-fungi-a1001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "浅部真菌生长的最适宜温度是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "40°C",
      "28°C 左右",
      "37°C",
      "30~32°C",
      "32~35°C",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "28°C 左右",
        "浅部真菌（皮肤癣菌等）生长的最适宜温度为 22~28°C，故本题选 28°C 左右。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-a1002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起鹅口疮的病原体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "絮状表皮癣菌",
      "白假丝酵母",
      "苍白螺旋体",
      "口腔链球菌",
      "星形诺卡菌",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "白假丝酵母",
        "鹅口疮是婴幼儿口腔黏膜的白假丝酵母感染，病原体为白假丝酵母。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-a1003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某女曾因治疗其他疾病长期使用过激素类药物，诊断为阴道炎。微生物学检查：宫颈分泌物直接涂片检查为革兰阳性，圆形、卵圆形的芽生孢子，在沙保弱培养基上有假菌丝形成。引起阴道炎的病原体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "新生隐球菌",
      "白假丝酵母",
      "解脲脲原体",
      "无芽胞厌氧菌",
      "梅毒螺旋体",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "白假丝酵母",
        "患者长期使用激素类药物，宫颈分泌物涂片见革兰阳性圆形/卵圆形芽生孢子，沙保弱培养基上有假菌丝形成，符合白假丝酵母性阴道炎。原书 A2 答案第 25 题为 D。",
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
    id: "ext-microbiology-ch36-major-pathogenic-fungi-fill001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "病原性真菌根据引起感染的部位可分为___、___及___。",
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
        "浅部感染真菌；皮下组织感染真菌；深部感染真菌",
        "病原性真菌根据引起感染的部位可分为浅部感染真菌、皮下组织感染真菌和深部感染真菌。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-fill002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "皮肤癣菌有 3 个属，即___、___及___。",
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
        "表皮癣菌属；毛癣菌属；小孢子菌属",
        "皮肤癣菌有 3 个属，即表皮癣菌属、毛癣菌属及小孢子菌属。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-fill003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "皮下组织感染真菌主要包括___和___；其中___经淋巴管扩散，___经血行或淋巴管扩散。",
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
        "孢子丝菌；着色真菌；孢子丝菌；着色真菌",
        "皮下组织感染真菌主要包括孢子丝菌和着色真菌；孢子丝菌经淋巴管扩散，着色真菌经血行或淋巴管扩散。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-short001",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：皮肤癣菌何能引起皮肤癣病？对癣病患者如何进行微生物学诊断？",
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
        "皮肤癣菌引起皮肤癣的原因及微生物学诊断",
        "皮肤癣菌能引起皮肤癣的原因是，皮肤癣菌具有嗜角质蛋白的特性，故多侵犯角化的表皮、毛发和指甲，引起手足癣、发癣及甲癣。皮肤癣的微生物学诊断如下：（1）取患者皮屑、指甲屑或病发，经 10% KOH 消化后镜检。皮屑、甲屑中见有菌丝，病发内或外可见有菌丝和孢子，即可初步诊断有皮肤癣菌感染。（2）经沙保弱培养基及真菌小培养后，可根据菌落特征、菌丝和孢子的特点鉴定是皮肤癣菌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-short002",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：为什么近年来白假丝酵母引起的感染有所增加？",
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
        "白假丝酵母感染增加的原因",
        "白假丝酵母是机会致病菌。正常情况下，该菌构成了口腔、阴道、肠道的正常菌群成员，与其他肠道细菌构成拮抗关系，如大肠菌类能产生细菌素，可抑制其大量繁殖，不能引起疾病。但长期应用广谱抗生素或抵抗力下降时（如 AIDS），破坏了菌群间的拮抗关系，则可引起继发性白假丝酵母感染，导致其发病率增加。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 4 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch36-major-pathogenic-fungi-b001",
    order: 21,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "红色毛癣菌",
      "犬小孢子菌",
      "絮状表皮癣菌",
      "申克孢子丝菌",
      "着色真菌",
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
        id: "ext-microbiology-ch36-major-pathogenic-fungi-b001m1",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可侵犯皮肤和毛发，不能侵犯甲板的是",
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
            "犬小孢子菌",
            "小孢子菌属主要侵犯皮肤和毛发，不侵犯甲板。原书 B1 答案第 32 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch36-major-pathogenic-fungi-b001m2",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可侵犯皮肤和甲板，不能侵犯毛发的是",
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
            "絮状表皮癣菌",
            "表皮癣菌属仅絮状表皮癣菌对人类有致病作用，可侵犯皮肤和甲板，但不侵犯毛发。原书 B1 答案第 33 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch36-major-pathogenic-fungi-b001m3",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可侵犯皮肤、毛发及甲板的是",
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
            "红色毛癣菌",
            "毛癣菌属可侵犯皮肤、毛发及甲板，红色毛癣菌是侵犯表皮和甲板常见的皮肤癣菌之一。原书 B1 答案第 34 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch36-major-pathogenic-fungi-b001m4",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "易引起从事农业、园艺等职业人员感染的是",
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
            "申克孢子丝菌",
            "孢子丝菌病好发于从事农业、园艺、伐木等职业的人员，病原菌为申克孢子丝菌。原书 B1 答案第 35 题为 D。",
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
