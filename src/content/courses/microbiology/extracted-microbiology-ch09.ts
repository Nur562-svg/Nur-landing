import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第09章 肠杆菌科 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：1 题
 * - 填空题（fill）：6 题
 * - 选择题（a1-single）：7 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：2 组、共 6 个成员
 * - 独立记分题合计：22 题（须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、填空题 6、选择题（A1 型 21 + A2 型 4 + B1 型 12 组
 *   35 小题）与简答题 4。本文件按 22 道预算在原书顺序内取材：名词解释与填空全取、简答
 *   取前 2 道；选择题取 A1 第 1~7 题；B1 取第 1 组（26~27，2 成员）与第 2 组（28~31，
 *   4 成员）完整组。正确项对齐章末参考答案键号。OCR 错字与双栏错序已按微生物学医学语
 *   义恢复（如 0157:H7→O157:H7、IMVIC→IMViC、力→为 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch09-enterobacteriaceae";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第09章 肠杆菌科 习题（核对PDF 第85–92页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肥达试验",
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
        "肥达试验",
        "肥达试验是用已知伤寒沙门菌菌体 O 抗原和鞭毛 H 抗原，以及引起副伤寒的甲型副伤寒沙门菌、肖氏沙门菌和希氏沙门菌鞭毛 H 抗原的诊断菌液与受检血清作试管或微孔板定量凝集试验，测定受检血清中有无相应抗体及其效价的试验。可作为肠热症的辅助诊断。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），7 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肠道致病菌和非致病菌在生化反应上的重要特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "致病菌和非致病菌都发酵乳糖",
      "多数致病菌不发酵乳糖，非致病菌发酵乳糖",
      "多数非致病菌不发酵乳糖，致病菌发酵乳糖",
      "致病菌和非致病菌都不发酵乳糖",
      "以上都不是",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多数致病菌不发酵乳糖，非致病菌发酵乳糖",
        "乳糖发酵试验在初步鉴别肠道致病菌和非致病菌时有重要意义：致病菌一般不分解乳糖，而非致病菌多数能分解乳糖。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "主要引起肠道外感染的肠道杆菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肠产毒素性大肠埃希菌", "普通大肠埃希菌", "宋内志贺菌", "伤寒沙门菌", "鼠伤寒沙门菌"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "普通大肠埃希菌",
        "普通大肠埃希菌（非致病性大肠埃希菌）是肠道正常菌群，当宿主免疫力低下或细菌侵入肠道外部位时，可引起肠道外感染如泌尿道感染、败血症、新生儿脑膜炎等。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起出血性结肠炎的细菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["伤寒沙门菌", "金黄色葡萄球菌", "霍乱弧菌", "O157:H7大肠埃希菌", "希氏沙门菌"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "O157:H7大肠埃希菌",
        "肠出血型大肠埃希菌（EHEC）的常见血清型为 O157:H7，可引起出血性结肠炎，严重者可并发溶血性尿毒综合征。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可引起菌痢样症状的大肠埃希菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠产毒素性大肠埃希菌",
      "肠侵袭性大肠埃希菌",
      "肠致病性大肠埃希菌",
      "肠集聚性大肠埃希菌",
      "肠出血性大肠埃希菌",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠侵袭性大肠埃希菌",
        "肠侵袭性大肠埃希菌（EIEC）侵入结肠黏膜上皮细胞并繁殖，引起炎症反应，临床表现类似细菌性痢疾（菌痢样症状）。原书 A1 答案第 4 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1005",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可引起霍乱样腹泻的大肠埃希菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠产毒素性大肠埃希菌",
      "肠侵袭性大肠埃希菌",
      "肠致病性大肠埃希菌",
      "肠集聚性大肠埃希菌",
      "肠出血性大肠埃希菌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠产毒素性大肠埃希菌",
        "肠产毒素性大肠埃希菌（ETEC）产生肠毒素，引起霍乱样水样腹泻，是婴幼儿和旅游者腹泻的常见病原菌。原书 A1 答案第 5 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1006",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于志贺菌的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["无荚膜", "不形成芽胞", "有鞭毛", "易出现耐药株", "革兰染色阴性"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "有鞭毛",
        "志贺菌属为革兰阴性短小杆菌，无荚膜、无鞭毛、无芽胞，有菌毛；易出现耐药株。故“有鞭毛”的叙述是错误的。原书 A1 答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-a1007",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "志贺菌在我国常见的流行型别有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "痢疾志贺菌和福氏志贺菌",
      "福氏志贺菌和宋内志贺菌",
      "鲍氏志贺菌和痢疾志贺菌",
      "痢疾志贺菌",
      "四种型别都有",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "福氏志贺菌和宋内志贺菌",
        "志贺菌属分 4 群（痢疾、福氏、鲍氏、宋内志贺菌），我国常见的流行型别为福氏志贺菌和宋内志贺菌。原书 A1 答案第 7 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），6 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-fill001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "肠道杆菌的抗原结构主要有___、___和___。",
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
        "菌体O抗原；鞭毛H抗原；荚膜抗原",
        "肠道杆菌的抗原结构主要有菌体（O）抗原、鞭毛（H）抗原和荚膜（K）抗原或包膜抗原。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-fill002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "IMViC试验是指___、___、___和___。",
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
        "吲哚试验；甲基红试验；VP试验；枸橼酸盐利用试验",
        "IMViC 试验是吲哚（I）、甲基红（M）、VP（Vi）和枸橼酸盐利用（C）四项试验的合称，用于鉴别肠道杆菌。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-fill003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "分离肠道杆菌一般选用___培养基。",
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
        "SS平板；EMB平板",
        "分离肠道杆菌一般选用 SS 琼脂平板、EMB（伊红美蓝）平板等肠道选择鉴别培养基。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-fill004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "大肠埃希菌所引起的肠道外感染疾病有___、___和___。",
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
        "败血症；新生儿脑膜炎；泌尿道感染",
        "大肠埃希菌引起的肠道外感染疾病主要有败血症、新生儿脑膜炎和泌尿道感染等。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-fill005",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "志贺菌属的细菌俗称___，是引起___的病原菌。其致病物质包括___、___和___，有的菌株还能产生毒性很强的___。",
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
        "痢疾杆菌；细菌性痢疾；侵袭力；内毒素；外毒素；志贺毒素",
        "志贺菌属俗称痢疾杆菌，是引起细菌性痢疾的病原菌，其致病物质包括侵袭力、内毒素和外毒素，有的菌株（痢疾志贺菌）还能产生毒性很强的志贺毒素（外毒素）。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-fill006",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "人类沙门菌感染有4个类型，分别是___、___、___和___。",
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
        "肠热症；胃肠炎；败血症；无症状带菌者",
        "人类沙门菌感染有 4 个类型，分别是肠热症（伤寒和副伤寒）、胃肠炎（食物中毒）、败血症和无症状带菌者。原书填空题第 6 题答案。",
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
    id: "ext-microbiology-ch09-enterobacteriaceae-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述肠道杆菌的共同特点。",
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
        "肠道杆菌的共同特点",
        "（1）形态结构相似：均为中等大小革兰阴性杆菌，无芽胞，多数有鞭毛和菌毛，少数有荚膜。（2）培养要求不高：为需氧或兼性厌氧菌，营养要求不高，在普通琼脂平板上生长良好，形成光滑、湿润的中等大小菌落；有些细菌在血琼脂平板上可出现溶血环，在液体培养中呈均匀混浊生长。（3）生化反应活泼：触酶阳性，能还原硝酸盐，氧化酶阴性，能分解多种糖类和蛋白质，常用作菌属和菌种的鉴别。乳糖发酵试验在初步鉴别肠道致病菌和非致病菌时有重要意义，致病菌一般不分解乳糖，而非致病菌多数能分解乳糖。（4）抗原结构复杂：主要有菌体（O）抗原、鞭毛（H）抗原和荚膜（K）抗原或包膜抗原。O 抗原存在于细胞壁脂多糖（LPS）层，具有属特异性；H 抗原存在于鞭毛蛋白，不耐热，60°C 30 分钟即被破坏；荚膜抗原具有型特异性，位于 O 抗原外围，能阻止 O 凝集现象，成分为多糖，重要的有伤寒沙门菌的 Vi 抗原、大肠埃希菌的 K 抗原等。（5）抵抗力不强：对理化因素的抵抗力不强，一般加热 60°C 30 分钟即死亡，易被一般消毒剂杀灭，常用氯进行饮水消毒。（6）易发生变异：肠杆菌科细菌易出现变异菌株，除自发突变外，更因相互处于同一密切接触的肠道微环境，可以通过转导、接合或溶原性转换等转移遗传物质，使受体菌获得新的性状而导致变异。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述志贺菌内毒素的致病机制。",
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
        "志贺菌内毒素的致病机制",
        "内毒素作用于肠黏膜，使其通透性增高，进一步促进对内毒素的吸收，引起发热、神智障碍，甚至中毒性休克等一系列症状。内毒素亦可破坏肠黏膜，促进炎症、溃疡、坏死和出血。内毒素尚能作用于肠壁自主神经系统，使肠功能发生紊乱，肠蠕动失调和痉挛，尤其是直肠括约肌痉挛最明显，因而出现腹痛、里急后重等症状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组（题组 26~27 与 28~31） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "IMViC试验结果 -+++",
      "IMViC试验结果 +++-",
      "IMViC试验结果 +-+-",
      "IMViC试验结果 ++--",
      "IMViC试验结果 --++",
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
        id: "ext-microbiology-ch09-enterobacteriaceae-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "大肠埃希菌",
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
            "IMViC试验结果 ++--",
            "大肠埃希菌的 IMViC 试验结果为 ++--（吲哚阳性、甲基红阳性、VP 阴性、枸橼酸盐利用阴性）。原书 B1 答案第 26 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch09-enterobacteriaceae-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "产气肠杆菌",
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
            "IMViC试验结果 --++",
            "产气肠杆菌的 IMViC 试验结果为 --++（吲哚阴性、甲基红阴性、VP 阳性、枸橼酸盐利用阳性）。原书 B1 答案第 27 题为 E。",
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
  {
    id: "ext-microbiology-ch09-enterobacteriaceae-b002",
    order: 19,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "肠产毒素性大肠埃希菌",
      "肠致病性大肠埃希菌",
      "肠侵袭性大肠埃希菌",
      "肠出血性大肠埃希菌",
      "肠集聚性大肠埃希菌",
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
        id: "ext-microbiology-ch09-enterobacteriaceae-b002m1",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "引起出血性结肠炎的细菌是",
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
            "肠出血性大肠埃希菌",
            "肠出血性大肠埃希菌（EHEC）可引起出血性结肠炎，常见血清型为 O157:H7。原书 B1 答案第 28 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch09-enterobacteriaceae-b002m2",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "不产生毒素，主要引起婴幼儿腹泻的细菌是",
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
            "肠致病性大肠埃希菌",
            "肠致病性大肠埃希菌（EPEC）不产生毒素，主要通过黏附和破坏肠黏膜微绒毛引起婴幼儿腹泻。原书 B1 答案第 29 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch09-enterobacteriaceae-b002m3",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能产生志贺样毒素的大肠埃希菌是",
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
            "肠出血性大肠埃希菌",
            "肠出血性大肠埃希菌（EHEC）能产生志贺样毒素（Vero 毒素），引起出血性结肠炎等。原书 B1 答案第 30 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch09-enterobacteriaceae-b002m4",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "引起婴儿和旅游者腹泻的大肠杆菌是",
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
            "肠产毒素性大肠埃希菌",
            "肠产毒素性大肠埃希菌（ETEC）产生肠毒素，是引起婴幼儿和旅游者腹泻（霍乱样水样腹泻）的常见病原菌。原书 B1 答案第 31 题为 A。",
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
