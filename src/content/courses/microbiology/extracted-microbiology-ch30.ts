import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第30章 出血热病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：3 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、选择题（A1 型 10 + A2 型 2）、B1 型 2 组（共 7 成员）
 *   与简答题 3；本文件按 11 道预算取样，名词解释与简答题全取，选择题取 A1 2 道 + A2 1 道，
 *   B1 取第 1 组（13~15 题，3 成员）。OCR 错字与双栏错序已按微生物学医学语义恢复
 *   （如 I 型/III 型超敏反应、Gn/Gc 糖蛋白、56~60°C 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch30-hemorrhagic-fever-viruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第30章 出血热病毒 习题（核对PDF 第226–231页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病毒性出血热",
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
        "病毒性出血热",
        "由病毒引起的以发热、出血和不同脏器的损害为主要特征的一大类疾病的统称。引起出血热的病毒种类较多，分属于不同的病毒科、属，我国已发现的主要有汉坦病毒、克里米亚-刚果出血热病毒和登革病毒，分别引起肾综合征出血热、新疆出血热、登革热/登革出血热。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：HFRS",
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
        "HFRS",
        "即肾综合征出血热。该病由汉坦病毒科的多种病毒引起；主要的传染源为啮齿动物；动物源性传播为主要传播方式；疾病的发生和流行具有明显的地区性和季节性。HFRS 在临床上以发热、出血、急性肾功能损害和免疫功能紊乱为突出表现，病后可获稳定而持久的免疫力。",
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
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不引起出血热的病毒是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "登革病毒",
      "汉坦病毒",
      "埃博拉病毒",
      "狂犬病病毒",
      "黄热病病毒",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "狂犬病病毒",
        "汉坦病毒、登革病毒、黄热病病毒、埃博拉病毒均可引起出血热；狂犬病病毒引起狂犬病，不引起出血热。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "汉坦病毒的核酸类型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "单片段单正链 RNA",
      "双股 RNA",
      "多片段单负链 RNA",
      "单片段单负链 RNA",
      "多片段单正链 RNA",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多片段单负链 RNA",
        "汉坦病毒基因组为单股负链 RNA，分为 L、M、S 三个片段，属多片段单负链 RNA 病毒。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患者，男，陕西省西安市户县人，11 月在农田连续干农活，某晚突发高热，体温在 39°C 以上，脸色潮红，口服退烧药后体温缓慢下降，但自身感觉更加难受。入院 3 天后，体温仍在 38~39°C 之间，脸色和前胸潮红，头疼、眼眶疼痛，腋下和背部有明显的出血点；血常规和尿常规检查结果显示：白细胞升高，血小板降低，且有蛋白尿。引起该疾病的病原体最有可能是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "流感病毒",
      "乙型脑炎病毒",
      "登革病毒",
      "麻疹病毒",
      "汉坦病毒",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "汉坦病毒",
        "患者为陕西农村居民，秋冬季发病，表现为高热、颜面潮红、出血点、血小板降低、蛋白尿等，符合肾综合征出血热（HFRS）的临床特点，其病原体为汉坦病毒。原书 A2 答案第 11 题为 D。",
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
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述汉坦病毒的生物学性状。",
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
        "汉坦病毒的生物学性状",
        "汉坦病毒基因组为单股负链 RNA，分为 L、M、S 三个片段，分别编码病毒的 RNA 聚合酶（L）、包膜糖蛋白（Gn 和 Gc）和核衣壳蛋白（NP）。病毒颗粒多数呈圆形或卵圆形，表面有脂质双层包膜，包膜表面有由 Gn 和 Gc 糖蛋白组成的突起；Gn 和 Gc 糖蛋白上均有中和抗原位点和血凝活性位点。多种传代、原代及二倍体细胞均对汉坦病毒敏感，但病毒在培养细胞中生长缓慢，且大多并不产生明显的细胞病变。汉坦病毒对大多数啮齿动物均呈自限性的隐性感染。汉坦病毒抵抗力不强，对酸、脂溶剂、一般消毒剂敏感，56~60°C 1 小时、紫外线照射等也均可灭活病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述肾综合征出血热的流行病学特点。",
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
        "肾综合征出血热的流行病学特点",
        "汉坦病毒所致的肾综合征出血热（HFRS）的主要宿主动物和传染源均为啮齿动物。HFRS 可能的传播途径有 3 类 5 种，即动物源性传播（包括通过呼吸道、消化道和伤口途径）、垂直（胎盘）传播和虫媒（螨媒）传播。HFRS 的发生和流行具有明显的地区性和季节性。在我国，汉坦病毒的主要宿主动物和感染源是黑线姬鼠和褐家鼠，主要存在着姬鼠型疫区、家鼠型疫区和混合型疫区；姬鼠型疫区的 HFRS 流行高峰主要在冬季，家鼠型疫区的流行高峰在春季，而混合型疫区在冬、春季均可出现流行高峰。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-short003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：以肾综合征出血热为例简述汉坦病毒的致病特点。",
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
        "汉坦病毒的致病特点",
        "汉坦病毒所致的肾综合征出血热（HFRS）具有以下特点：（1）HFRS 起病急、发展快，典型病例具有三大主症，即发热、出血和急性肾功能损害，其典型临床经过可分为发热期、低血压休克期、少尿期、多尿期和恢复期。（2）HFRS 的发病机制及病理变化很复杂，病毒作为发病的始动因素，一方面可直接导致感染细胞和脏器的结构与功能损害，另一方面可激发机体的免疫应答，并进而导致免疫病理损伤。①病毒的直接损伤作用：汉坦病毒可感染体内多种组织细胞，特别是血管内皮细胞，引起细胞肿胀和损伤、细胞间隙形成、血管通透性增加等；汉坦病毒感染还可造成血小板损伤并直接引起细胞凋亡；感染的单核细胞可携带病毒向其他组织扩散。②免疫病理损伤：汉坦病毒诱导机体产生的体液免疫和细胞免疫具有双重作用，既参与机体对病毒的清除，又可介导对机体的免疫损伤，参与病毒的致病过程。其中体液免疫应答可导致 I 型和 III 型超敏反应，引起血管和组织的病理损伤，产生低血压、休克、出血和肾脏功能障碍。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["蚊", "蜱", "蚤", "鼠", "虱"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "汉坦病毒的传播媒介是",
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
            "鼠",
            "汉坦病毒的主要宿主动物和传染源为啮齿动物（鼠），其传播途径以动物源性传播为主，亦可经螨媒传播。原书 B1 答案第 13 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "登革病毒的传播媒介是",
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
            "蚊",
            "登革病毒经蚊（埃及伊蚊、白纹伊蚊）叮咬传播。原书 B1 答案第 14 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch30-hemorrhagic-fever-viruses-b001m3",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "克里米亚-刚果出血热病毒的传播媒介是",
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
            "蜱",
            "克里米亚-刚果出血热病毒以硬蜱（特别是亚洲璃眼蜱）为传播媒介，蜱既是传播媒介也因病毒经卵传代而成为储存宿主。原书 B1 答案第 15 题为 B。",
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
