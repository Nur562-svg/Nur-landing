import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第21章 螺旋体 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：6 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：12 题（须等于本文件预算 12）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、选择题（A1 型 18 + A2 型 3）与问答题 3，无填空与 B1。
 *   本文件按 12 道预算在原书顺序内取材：名词解释与问答题全取，选择题取 A1 第 1~6 题。
 *   正确项对齐章末参考答案键号（A1 1.E 2.B 3.B 4.C 5.D 6.C）。OCR 错字与双栏错序已按
 *   微生物学医学语义恢复（如 钧端螺旋体→钩端螺旋体、菜姆病→莱姆病、力→为、
 *   硬蟀→硬蜱、菱缩性肌皮炎→萎缩性肌皮炎、脊髓癆→脊髓痨 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch21-spirochetes";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第21章 螺旋体 习题（核对PDF 第162–167页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch21-spirochetes-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：内鞭毛",
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
        "内鞭毛",
        "内鞭毛：螺旋体的鞭毛位于外膜和柱形原生质体之间，紧紧缠绕在柱形原生质体表面呈螺旋状，与细菌鞭毛伸展于菌体外膜外表面明显不同，故称为内鞭毛。内鞭毛是螺旋体的运动器官。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：硬下疳",
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
        "硬下疳",
        "硬下疳：梅毒螺旋体感染后约 3 周，病人外生殖器皮下出现质地较硬的软骨样无痛性病灶，称为硬性下疳（硬下疳），其溃疡渗出物中含大量梅毒螺旋体，传染性极强。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：慢性移行性红斑",
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
        "慢性移行性红斑",
        "慢性移行性红斑（erythema chronicum migrans, ECM）：病人被携带莱姆病病原体的疫蜱叮咬后，在叮咬部位可出现红色斑疹或丘疹，继而扩大为圆形皮损，直径 5~50cm，边缘鲜红，中央呈退行性变，称为慢性移行性红斑；多个 ECM 重叠在一起可形成枪靶形。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch21-spirochetes-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "螺旋体常用的染色方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "革兰染色法",
      "抗酸染色法",
      "阿培脱染色法",
      "吉姆萨染色法",
      "镀银染色法",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "镀银染色法",
        "螺旋体革兰染色阴性但不易着色，常用 Fontana 镀银染色法，镀银染色后菌体呈棕褐色。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "钩端螺旋体主要的感染途径是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "接触病人或病兽",
      "接触疫水或疫土",
      "经呼吸道感染",
      "经消化道感染",
      "经节肢动物叮咬",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "接触疫水或疫土",
        "钩端螺旋体能穿透完整的皮肤、黏膜或其破损处侵入人体，主要经接触疫水或疫土（含钩端螺旋体的水或湿土）感染，引起钩端螺旋体病。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起人类梅毒的病原体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "钩端螺旋体",
      "苍白密螺旋体",
      "伯氏疏螺旋体",
      "雅司螺旋体",
      "回归热疏螺旋体",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "苍白密螺旋体",
        "梅毒由苍白密螺旋体苍白亚种（梅毒螺旋体）引起，主要通过性接触传播。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起人类莱姆病的病原体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "钩端螺旋体",
      "苍白密螺旋体",
      "伯氏疏螺旋体",
      "雅司螺旋体",
      "回归热疏螺旋体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "伯氏疏螺旋体",
        "莱姆病由伯氏疏螺旋体（莱姆螺旋体）引起，蜱为传播媒介，人和多种动物均可感染。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "培养钩端螺旋体的培养基是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肉汤培养基",
      "哥伦比亚培养基",
      "布氏培养基",
      "Korthof 培养基",
      "牛心脑浸液培养基",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Korthof 培养基",
        "钩端螺旋体常用含 10% 兔血清的 Korthof 培养基和不含兔血清的 EMJH 培养基培养，最佳生长温度为 28~30°C，生长缓慢。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "传播莱姆病的节肢动物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["蚊", "蚤", "蜱", "蛉", "虱"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "蜱",
        "莱姆病由伯氏疏螺旋体引起，蜱（硬蜱）为传播媒介，人和多种动物均可感染。原书 A1 答案第 6 题为 C。",
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

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch21-spirochetes-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：钩端螺旋体病发病过程及疾病转归。",
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
        "钩端螺旋体病发病过程及疾病转归",
        "钩端螺旋体能穿透完整的皮肤、黏膜或其破损处侵入人体，在局部迅速繁殖，并经淋巴系统或直接进入血循环引起钩端螺旋体血症，出现中毒性败血症症状，如高热、乏力、头痛、腓肠肌疼痛等，也可有眼结膜充血、浅表淋巴结肿大等体征。钩端螺旋体随血流播散至各个脏器，因不同脏器病变程度不一而临床表现差异较大，毛细血管性出血、微循环障碍及黄疸是常见的典型症状和体征，临床上分为肺出血型、流感伤寒型、黄疸出血型、肾型和脑膜脑炎型，多数为流感伤寒型，其病情较轻，但肺弥漫出血型病人病死率高达 50% 以上，黄疸出血型、肾型和脑膜脑炎型病人也常因肾衰竭或呼吸衰竭而死亡。部分病人可出现眼和神经系统并发症，病程一般为一周至一个月。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：后天性梅毒病程分期及各期临床特点。",
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
        "后天性梅毒病程分期及各期临床特点",
        "后天性梅毒的感染过程分三期，表现为反复、潜伏和再发现象：①第一期梅毒：约在感染后 3 周左右局部出现无痛性硬下疳，多见于外生殖器，其溃疡渗出物中含大量梅毒螺旋体，传染性极强，病程约 1 个月；下疳常自愈，进入血液中的梅毒螺旋体潜伏于体内，经 2~3 个月无症状的潜伏期后进入第二期。②第二期梅毒：全身皮肤黏膜常出现梅毒疹、周身淋巴结肿大，在梅毒疹和淋巴结中有大量梅毒螺旋体，如不治疗，一般 3 周至 3 个月后体征可消退；从硬性下疳至梅毒疹消失这段时间称为早期梅毒（即第一、二期梅毒），此期传染性强，但破坏性较小。③第三期梅毒：也称晚期梅毒。此期不仅出现皮肤黏膜溃疡性坏死病灶，同时还表现为内脏器官或组织损伤，严重者初次发病 10~15 年后，出现多组织多器官慢性炎性损伤、慢性肉芽肿、树胶肿（梅毒瘤），可引起心血管树胶肿及中枢神经系统病变，出现动脉瘤、脊髓痨或全身麻痹等。此期病灶中不易找到梅毒螺旋体，病程长、传染性小，但破坏性大，可危及生命。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch21-spirochetes-short003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：莱姆病病程分期及各期临床特点。",
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
        "莱姆病病程分期及各期临床特点",
        "莱姆病是一种慢性全身传染性疾病，病程可分早期局部性感染、早期播散性感染和晚期持续性感染三期：①早期局部性感染：疫蜱叮咬部位出现红色斑疹或丘疹，继而扩大为边缘鲜红的圆形皮损，中央呈退行性变，称为慢性移行性红斑（ECM），多个 ECM 重叠在一起可形成枪靶形，伴有头痛、发热、肌肉和关节疼痛、局部淋巴结肿大等症状。②早期播散性感染：主要表现为继发性红斑、面神经麻痹、脑膜炎等。③晚期持续性感染：主要表现为慢性关节炎、周围神经炎和慢性萎缩性肌皮炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章无 —— 置空 */
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
