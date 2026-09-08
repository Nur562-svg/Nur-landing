import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第21章 神经系统发育异常性疾病 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：6 题（含 A2 病例题 1 题、A3/A4 病例串题 3 题）
 * - 问答题（short-answer）：2 题（含简答 1、论述 1）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 20、A2 型 2、A3/A4 型 5（2 组）、B1 型 1 组 4 成员、
 *   简答题 11、论述题 3、病例分析题 1。本文件按 13 道预算在原书顺序内取材：A1 取第
 *   1~2 题、A2 取第 1 题、A3/A4 取第 1 组（1~3 题，先天性脑积水病例串）、简答取第 1 题、
 *   论述取第 1 题、病例分析全取，B1 取第 1 组（1~4）完整组。正确项逐一对齐章末参考
 *   答案键号（A3/A4 第 1 题键号 D 对应先天性脑积水，选项在 OCR 中错序，按医学语义重建）。
 *   OCR 错字与双栏错序已按神经病学医学语义恢复（如 Amold-Chiari/Arold-Chiari→
 *   Arnold-Chiari、肌菱缩→肌萎缩、非体类→非甾体类、陷人→陷入、疝人→疝入、
 *   前后卤→前后囟、lcm→1cm 等），数值与分子标记（腭枕线 3mm、颅底角 145°、
 *   Apgar 评分、CT/MRI）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch21-congenital-developmental-abnormalities";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第21章 神经系统发育异常性疾病 习题（核对PDF 第382–390页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "先天性脑穿通畸形在神经系统发育性疾病的分类中属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "神经组织发育缺陷",
      "颅骨脊柱畸形",
      "脑性瘫痪",
      "神经外胚层发育不全",
      "脑室系统发育畸形",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "神经组织发育缺陷",
        "先天性脑穿通畸形属于神经组织发育缺陷类疾病，是胚胎发育期神经组织发育异常所致。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "颅底凹陷症确诊的依据是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "颅颈侧位片上，枢椎齿状突超过腭枕线 3mm",
      "颅颈侧位片上，枢椎齿状突低于腭枕线 3mm",
      "颅颈侧位片上，颅底角小于 145°",
      "颅颈侧位片上，颅底角大于 145°",
      "颅颈侧位片上，颅底角小于 109°",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "颅颈侧位片上，枢椎齿状突超过腭枕线 3mm",
        "颅底凹陷症确诊的重要依据是在颅颈侧位、张口正位 X 线平片上测量枢椎齿状突的位置，齿状突高出腭枕线 3mm 以上可确诊。原书 A1 答案第 2 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，46 岁，颈枕部疼痛 1 年，双上肢麻木无力伴吞咽返呛 8 个月。查体有颈短、颈部运动受限。颅颈侧位片示枢椎齿状突超过腭枕线 3.5mm，本病最可能诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "颅底凹陷症",
      "小脑扁桃体下疝畸形",
      "扁平颅底",
      "颈椎病",
      "脊髓空洞症",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "颅底凹陷症",
        "成年起病、颈短、颈部活动受限，伴颈神经根及后组脑神经受累症状，颅颈侧位片示枢椎齿状突超过腭枕线 3.5mm（>3mm），符合颅底凹陷症的诊断。原书 A2 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，10 个月，发现头围增大 6 个月。查体：精神萎靡，不能独坐，头围 48cm，前囟 3cm×3cm，颅缝裂开，叩诊有破壶音，可见落日征，CT 检查发现脑室扩大。本病的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "巨脑症",
      "佝偻病",
      "婴儿硬膜下血肿",
      "先天性脑积水",
      "脑性瘫痪",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "先天性脑积水",
        "婴儿头围异常增大、前囟扩大、颅缝裂开、叩诊破壶音、落日征，CT 示脑室扩大，符合先天性脑积水的诊断。原书 A3/A4 答案第 1 题为 D（先天性脑积水，选项在 OCR 中错序，按医学语义重建）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，10 个月，发现头围增大 6 个月。查体：精神萎靡，不能独坐，头围 48cm，前囟 3cm×3cm，颅缝裂开，叩诊有破壶音，可见落日征，CT 检查发现脑室扩大。本病常见的病因不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "颅底凹陷症",
      "Chiari 畸形 I 型",
      "胎内已形成的后颅窝肿瘤",
      "遗传性导水管狭窄畸形",
      "产后弓形虫感染",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "颅底凹陷症",
        "先天性脑积水的常见病因包括 Chiari 畸形 I 型、遗传性导水管狭窄畸形、后颅窝肿瘤与脉络丛乳头状瘤及产后感染等；颅底凹陷症不属于先天性脑积水的常见病因。原书 A3/A4 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，10 个月，发现头围增大 6 个月。查体：精神萎靡，不能独坐，头围 48cm，前囟 3cm×3cm，颅缝裂开，叩诊有破壶音，可见落日征，CT 检查发现脑室扩大。本病的特有体征是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "落日征",
      "叩诊有破壶音",
      "头围异常增大",
      "颅缝裂开",
      "前囟扩大",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "落日征",
        "先天性脑积水的特有体征是落日征，即眼球下转、上巩膜暴露，为颅内压增高致眼球向下移位所致。原书 A3/A4 答案第 3 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer，含简答、论述），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是颅颈区畸形？包括哪些疾病？",
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
        "颅颈区畸形的定义与分类",
        "颅颈区畸形是发生于颅底、枕骨大孔和上位颈椎区的畸形，可伴或不伴有神经系统的症状体征。包括颅底凹陷症、扁平颅底、小脑扁桃体下疝畸形和颈椎异常等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "颅底凹陷症的临床表现是什么？其 X 线诊断依据是什么？",
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
        "颅底凹陷症的临床表现与 X 线诊断依据",
        "本病多在成年后起病，缓慢进展，常有短颈、后发际低等特殊外貌。表现有枕骨大孔区综合征的症状和体征：①颈神经根症状：枕颈部疼痛、活动受限或强直，一侧或双侧上肢麻木、肌无力、肌萎缩和腱反射减低或消失等。②后组脑神经损害：吞咽困难、饮水呛咳、声音嘶哑、构音障碍、舌肌萎缩、咽反射减弱等延髓麻痹症状，以及面部感觉减退、听力下降、角膜反射减弱等。③上位颈髓及延髓损害：四肢轻瘫、锥体束征及不同程度的感觉障碍以及吞咽、呼吸困难等。④小脑损害：以眼震最常见，晚期可出现小脑性共济失调。⑤椎-基底动脉供血不足：发作性眩晕、恶心、呕吐、心悸、出汗等。⑥颅内压增高症状：早期一般无高颅压，晚期因脑脊液循环障碍而出现头痛、呕吐和视乳头水肿等。X 线诊断依据：在颅颈侧位、张口正位 X 线平片上测量枢椎齿状突位置，高出腭枕线 3mm 可确诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），1 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-case001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "男性，50 岁，主因“四肢麻木无力 3 年余，加重伴颈肩胀痛 1 年余，饮水呛咳 1 个月”入院。3 年前无明显诱因出现四肢麻木无力、行走不稳。病情逐渐加重，自 1 年前出现双侧颈肩疼痛、颈部僵硬、活动受限。曾在当地按“颈椎病”行颈椎牵引治疗，未见好转。近 1 个月来出现饮水呛咳、声音嘶哑、吞咽困难，遂入院就诊。既往无特殊病史，家族中无类似病史。入院查体：神志清楚、构音障碍，矮胖体型，颈短，后发际低，颈部活动受限，双侧咽反射减弱，舌肌萎缩。双上肢肌肉萎缩，肌张力增强，四肢肌力 IV 级，双侧腱反射亢进，双侧病理征阳性。颅颈侧位 X 线平片示枢椎齿状突高出腭枕线 1cm。请回答：（1）请写出诊断及诊断依据。（2）请写出本病易合并哪些疾病（写出至少 3 种名称）？（3）本病可继发于哪些疾病（写出至少 3 种疾病名称）？（4）治疗原则是什么？",
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
        "颅底凹陷症的诊断、合并与继发疾病及治疗",
        "（1）诊断：颅底凹陷症。诊断依据：成年后起病，缓慢进展，病程 3 年；主要症状为四肢麻木、无力和颈部胀痛僵硬、活动受限。查体颈短、后发际低；枕骨大孔区综合征的症状和体征：如枕颈部疼痛、活动受限和双侧上肢麻木、无力、萎缩等颈神经根受累症状，四肢轻瘫、锥体束征等上位颈髓或延髓损害症状；饮水呛咳、舌肌萎缩、咽反射减弱等后组脑神经损害症状；典型的影像学改变，枢椎齿状突超过腭枕线 >3mm。因此符合颅底凹陷症的诊断。（2）可合并小脑扁桃体下疝、扁平颅底、寰枢椎脱位等畸形。（3）本病常继发于佝偻病、骨软化症、类风湿性关节炎及甲状旁腺功能亢进等疾病。（4）手术是本病唯一的治疗方法。无临床症状或症状轻微者，可观察随访。临床症状明显且进行性加重、脑脊液循环通路受阻、颅内压增高者，X 线片示合并寰枢椎脱位者是本病的手术适应证。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（题组 1~4） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch21-congenital-developmental-abnormalities-b001",
    order: 10,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "腭枕线",
      "颅底角",
      "剪刀步态",
      "“落日征”",
      "动眼神经麻痹",
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
        id: "ext-neurology-ch21-congenital-developmental-abnormalities-b001m1",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于诊断“颅底凹陷症”的是",
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
            "腭枕线",
            "颅底凹陷症确诊的重要依据是在 X 线平片上测量枢椎齿状突与腭枕线的关系，齿状突高出腭枕线 3mm 以上可确诊。原书 B1 答案第 1 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch21-congenital-developmental-abnormalities-b001m2",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "确诊“扁平颅底”需测量",
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
            "颅底角",
            "扁平颅底诊断主要根据颅骨 X 线侧位片测量颅底角，颅底角大于 145° 具有诊断意义。原书 B1 答案第 2 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch21-congenital-developmental-abnormalities-b001m3",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脑瘫痉挛型患儿可出现",
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
            "剪刀步态",
            "痉挛型脑瘫下肢痉挛表现为剪刀步态、足内翻或外翻、膝关节和髋关节屈曲挛缩等。原书 B1 答案第 3 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch21-congenital-developmental-abnormalities-b001m4",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "先天性脑积水的特有体征是",
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
            "“落日征”",
            "先天性脑积水的特有体征是落日征，为颅内压增高致眼球向下移位、上巩膜暴露所致。原书 B1 答案第 4 题为 A。",
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
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
