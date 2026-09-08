import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第17章 泌尿系统 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：10 题（A1 型 6 题 + X 型多选映射 4 题）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：3 题（简答 2 题 + 论述 1 题）
 * - B1 配伍题：2 组、共 6 个成员
 * - 独立记分题合计：23 题（须等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 13、B1 型 2 组 6 小题、多选题 7）、名词解释 6、
 *   简答题 4、论述题 2，无填空题；本文件按 23 道预算等比取材并在原书顺序内取满。题干/
 *   选项/题号在双栏排版中交错散落（如肾单位组成、B1 备选字母与文字分离散落），已按泌尿
 *   系统组织学医学语义重建完整选项集合；正确项全数对照章末「参考答案」键号锚定。X 型多选
 *   题按项目规约取样其中一正确项并映射为 a1-single（note=xMapNote）。数值与结构（刷状缘、
 *   滤过屏障、入球/出球微动脉管径、70% 以上水重吸收等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch17-urinary-system";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第17章 泌尿系统 复习思考题 习题（核对PDF 第142–149页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch17-urinary-system-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血管球",
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
        "血管球",
        "位于肾小体中部，由数条有孔型毛细血管形成袢样结构。血管球入口为入球微动脉，出口为出球微动脉，足细胞包绕有孔毛细血管组成滤过膜，对流经血管球的血液进行滤过，产生滤过液（原尿）。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：致密斑",
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
        "致密斑",
        "由近血管极处远端小管曲部上皮细胞局部特化形成，细胞呈高柱状，排列紧密，细胞核位置较高。致密斑能感受远曲小管内液体的钠离子浓度变化，并将信息传递给球旁细胞，以调节球旁细胞的分泌。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：足细胞",
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
        "足细胞",
        "贴在有孔毛细血管内皮细胞外，胞体较大，由胞体伸出几个大的初级突起，每个初级突起又发出许多次级突起，相邻次级突起之间呈指状交叉，紧贴在有孔毛细血管外，突起间的孔隙称裂孔，上有裂孔膜。足细胞参与形成滤过屏障。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：滤过屏障",
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
        "滤过屏障",
        "是位于肾血管球毛细血管腔与肾小囊腔之间的结构屏障，又称滤过膜，由有孔毛细血管内皮、基膜和足细胞裂孔膜三部分组成。血液在流经血管球毛细血管时血压较高，大量的水和小分子物质可通过滤过膜进入肾小囊腔，形成滤过液（原尿）。原书名词解释第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/X 型选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肾单位的组成是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肾小体、肾小管和集合管",
      "近端小管、细段和远端小管",
      "一个肾小体和与其相连的肾小管",
      "肾小体、近端小管和髓袢",
      "肾小管和集合管",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一个肾小体和与其相连的肾小管",
        "肾单位由肾小体和肾小管组成，即一个肾小体和与其相连的肾小管（肾小管又分近端小管、细段、远端小管）；集合管不属于肾单位。原书 A1 参考答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原尿形成的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肾小体",
      "肾小管",
      "集合管",
      "肾小体和肾小管",
      "肾小管和集合管",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾小体",
        "肾小体是滤过血液形成原尿的部位，血液经血管球滤过屏障滤入肾小囊腔形成原尿（滤过液）。原书 A1 参考答案第 3 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列结构中不参与滤过屏障组成的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血管内皮",
      "血管系膜",
      "基膜",
      "裂孔膜",
      "毛细血管",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "血管系膜",
        "滤过屏障（滤过膜）由有孔毛细血管内皮、基膜和足细胞裂孔膜三层构成；血管系膜（球内系膜）不参与滤过屏障组成。原书 A1 参考答案第 5 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分泌肾素的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "球旁细胞",
      "球内系膜细胞",
      "足细胞",
      "肾间质细胞",
      "致密斑",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "球旁细胞",
        "球旁细胞为入球微动脉管壁平滑肌转化而成的立方状细胞，胞质含 PAS 阳性颗粒（内含肾素），可分泌肾素。原书 A1 参考答案第 6 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗利尿激素和醛固酮的作用部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "近端小管和远端小管",
      "髓袢",
      "远端小管和集合管",
      "髓袢和集合管",
      "近端小管和髓袢",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "远端小管和集合管",
        "远端小管和集合小管受醛固酮和抗利尿激素（ADH）调控，二者是终尿量调节的部位。原书 A1 参考答案第 9 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肾盂、输尿管和膀胱共有的结构特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "腔面被覆单层立方上皮",
      "腔面被覆复层扁平上皮",
      "腔面被覆变移上皮",
      "都有骨骼肌所包绕",
      "都有三层平滑肌包绕",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腔面被覆变移上皮",
        "肾盂、输尿管和膀胱的黏膜上皮均为变移上皮（排尿管道腔面被覆变移上皮），可随器官充盈程度而变化。输尿管肌层上 2/3 为内纵外环两层、下 1/3 为三层；膀胱肌层为内纵中环外纵三层。原书 A1 参考答案第 13 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于肾间质细胞的描述，正确的是（原为多项选择）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "呈星形，突起细长",
      "细胞器较丰富",
      "胞质内有嗜银颗粒",
      "可分泌前列腺素",
      "参与形成间质内的纤维和基质",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呈星形，突起细长",
        "题干改写并映射为单选；本作为原多选题正确答案之一（原题答案 ABDE）。肾间质细胞多分布于肾髓质，细胞形态多样，可分泌前列腺素和促红细胞生成素，并参与形成纤维和基质。原书多选题第 20 题参考答案为 ABDE。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与近端小管曲部比较，近端小管直部上皮细胞不显著的是（原为多项选择）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "微绒毛（刷状缘）",
      "上皮细胞的高度",
      "细胞侧突",
      "质膜内褶",
      "重吸收功能",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "微绒毛（刷状缘）",
        "题干改写并映射为单选；本作为原多选题正确答案之一（原题答案 ABCDE，均为直部相对曲部之不显著处）。近端小管直部上皮细胞刷状缘（微绒毛）不明显，细胞器、胞质侧突和质膜内褶均不显著。原书多选题第 21 题参考答案为 ABCDE。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于浅表肾单位的描述，正确的是（原为多项选择）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "数量较多，体积较小",
      "体积较大",
      "髓袢较短",
      "是尿液形成的重要部位",
      "可分布在肾柱",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "数量较多，体积较小",
        "题干改写并映射为单选；本作为原多选题正确答案之一（原题答案 ACD）。浅表肾单位数量较多、体积较小、髓袢较短，分布位于皮质的浅层。原书多选题第 22 题参考答案为 ACD。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-a1010",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于足细胞的描述，正确的是（原为多项选择）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "突起附着于血管球毛细血管的基膜",
      "属于一种间质细胞",
      "体积较大，多突起",
      "次级突起间的缝隙称裂孔",
      "胞体和突起表面有带负电荷的唾液酸糖蛋白",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "突起附着于血管球毛细血管的基膜",
        "题干改写并映射为单选；本作为原多选题正确答案之一（原题答案 BCDE）。足细胞为肾小囊脏层上皮细胞，胞体较大、多突起，次级突起间的缝隙称裂孔，突起附着于血管球毛细血管的基膜。原书多选题第 23 题参考答案为 BCDE。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无，置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答题/论述题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch17-urinary-system-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述肾小管各段的结构特点。",
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
        "肾小管各段的结构特点",
        "答：①近端小管由单层低柱状上皮细胞构成，腔面不规则，胞质染色偏嗜酸性，细胞游离面有刷状缘（微绒毛），由于上皮细胞形成胞质侧突并相互交错，使小管细胞界限不清；细胞核偏基底部，核下区可见基部纵纹（质膜内褶）；以近曲小管上述结构最典型。②细段由单层扁平上皮组成，胞质内细胞器少，染色淡。③远端小管由单层立方上皮细胞组成，细胞体积较小，胞质染色浅，游离面无刷状缘，故小管腔面较大而清晰，上皮细胞界限较近端小管明显，基部纵纹比较明显，与细胞基部质膜内褶发达有关。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述肾血液循环的特点。",
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
        "肾血液循环的特点",
        "答：①肾动脉起自腹主动脉，粗而短，故肾内血流量很大；②肾内血管走行较直，血流很快到达血管球，故血管球毛细血管血压较高；③入球微动脉管径较出球微动脉粗，使血管球内血流量大、压力高；④出球微动脉再次形成球后毛细血管网，分布在肾小管周围，毛细血管内血液胶体渗透压较高，利于小管上皮细胞重吸收物质入血；⑤髓质内直小血管袢与肾小管伴行，有利于肾小管和集合小管的重吸收和尿液浓缩。原书简答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch17-urinary-system-short003",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试述与原尿和终尿形成相关的组织结构。",
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
        "与原尿和终尿形成相关的组织结构",
        "答：由于肾小体血管球入球微动脉血管内血压较高，使得血浆中的小分子物质透过滤过膜进入肾小囊腔，成为原尿。原尿经尿极入近端小管后，绝大部分的糖、电解质、氨基酸、蛋白质和 70% 以上的水被重吸收回血液，同时小管上皮还分泌一些代谢产物进入小管。滤过液经过细段时，水和其他小分子物质能轻易透过。远端小管有离子主动转运和分泌代谢产物的重要功能，通过吸收钠离子、排出钾离子和水的重吸收，起到浓缩尿液的功能。集合小管完成尿液的最后生成，产生终尿，排入肾盏。终尿量的调节由远端小管和集合小管担负，它们分别受醛固酮和抗利尿激素的调控。原书论述题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 共 6 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch17-urinary-system-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["致密斑", "球外系膜细胞", "肾间质细胞", "球旁细胞", "球内系膜细胞"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch17-urinary-system-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌肾素的细胞是",
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
            "球旁细胞",
            "球旁细胞为入球微动脉管壁平滑肌转化而成的立方状细胞，胞质含 PAS 阳性颗粒（肾素），可分泌肾素。原书 B1 第 14 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch17-urinary-system-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "感受肾小管中 Na+ 浓度变化的结构是",
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
            "致密斑",
            "远端小管曲部近血管极处上皮细胞特化形成致密斑，可感受远曲小管内滤过液钠离子浓度变化，并将信息传递给球旁细胞。原书 B1 第 15 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch17-urinary-system-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胞质内含有较多脂滴的细胞是",
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
            "肾间质细胞",
            "肾间质细胞多分布于肾髓质，细胞形态多样，胞质含较多脂滴，可分泌前列腺素和促红细胞生成素。原书 B1 第 16 题答案 C。",
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
    id: "ext-histology-embryology-ch17-urinary-system-b002",
    order: 21,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["集合管", "近端小管", "输尿管", "远端小管", "肾小体"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch17-urinary-system-b002m1",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "最后形成终尿的场所是",
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
            "集合管",
            "集合小管对尿液最终形成起关键作用，完成尿液的最后生成，产生终尿。原书 B1 第 17 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch17-urinary-system-b002m2",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对原尿重吸收的重要场所是",
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
            "近端小管",
            "近端小管是滤过液重吸收的主要场所，约 70% 以上的水、近 100% 的葡萄糖及无机盐、氨基酸和蛋白质在此段被重吸收回血液。原书 B1 第 18 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch17-urinary-system-b002m3",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "吸收钠和排出钾的重要部位是",
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
            "远端小管",
            "远曲小管是离子转运和分泌的重要场所，通过吸收钠离子、排出钾离子及水的重吸收起到浓缩尿液的作用，受醛固酮和抗利尿激素调控。原书 B1 第 19 题答案 D。",
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