import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第29章 作用于血液及造血系统的药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：0 题（本章无填空题）
 * - 选择题（a1-single）：9 题（含 A1 型、A2 型病例题；本章取样均为 A1 型）
 * - 问答题（short-answer）：5 题（简答 3 + 论述 2）
 * - B1 配伍题：1 组、共 5 个成员（本章共 2 组，按源题占比取第 1 组 33～37 题）
 * - 独立记分题合计：21 题（须等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、选择题（A1 型 21 + A2 型 11 + B1 型 2 组共 10 小题）、
 *   简答题 3 与论述题 2，无填空题。本文件按 21 道预算取材：名词解释 2 全取、简答/论述 5
 *   全取，剩余 14 题在选择题（A1+A2 共 32 源）与 B1 成员（10 源）间按源题占比分配：
 *   B1 取完整第 1 组（33～37 题，共 5 成员）、选择取前 9 道（A1 型第 1～9 题）。
 *   参考答案区键号与题干区题号相差 1（题干区 A1 为 1～21、A2 为 22～32、B1 为 33～42；
 *   参考答案区 A1 为 1～20、A2 为 21～32、B1 为 33～42），已按题干题号与药理学医学语义
 *   归位；键 32.A 实为 A2 型第 32 题（胃切除术后巨幼红细胞性贫血不用叶酸的原因）答案，
 *   按题号归位。本文件 A1 型题键号 1.E、2.A、3.E、4.C、5.D、6.A、7.C、8.C、9.B；
 *   B1 型题 33.A、34.E、35.C、36.B、37.D。B1 型第 35、36 题题干 OCR「凝血酶/纤溶酶」
 *   错乱已按药理学医学语义重建（35 抑制纤溶酶原活化→氨甲苯酸；36 促进纤溶酶原转变为
 *   纤溶酶→阿替普酶）。OCR 错字已恢复（抗凝血酶皿→抗凝血酶III、Ia/Xa→IIa/Xa、
 *   TXA，→TXA₂、PGil→PGI₂、维生素 Br2→维生素B12、水蜂素→水蛭素、氯毗格雷→氯吡格雷、
 *   阿背单抗→阿昔单抗 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch29-blood-hematopoietic-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第29章 作用于血液及造血系统的药物 习题（核对PDF 第196–204页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：双联抗血小板治疗",
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
        "双联抗血小板治疗",
        "在阿司匹林基础上加用血小板 P2Y12 受体拮抗药（如噻氯匹定、氯吡格雷等），已被证实对于接受冠状动脉介入治疗术的患者有明确获益，被称为双联抗血小板治疗。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：新型口服抗凝药",
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
        "新型口服抗凝药",
        "血栓栓塞性疾病治疗的新兴替代选择，主要包括 IIa 因子（凝血酶）抑制剂达比加群酯与 Xa 因子抑制药利伐沙班等。与华法林相比，具有药代动力学和药效学可预测、可以采用无需常规抗凝监测的固定剂量疗法、与食物和其他药物相互作用少等优点，主要临床应用为替代华法林，用于非瓣膜病性房颤患者。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），0 道（本章无填空题） */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），9 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关肝素的作用机制，说法正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "直接灭活凝血因子 IIa、VIIa、IXa、Xa",
      "加强抗凝血酶 III 的抗凝活性",
      "拮抗维生素K",
      "直接与凝血酶结合，抑制其活性",
      "抑制凝血因子的生物合成",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "加强抗凝血酶 III 的抗凝活性",
        "肝素带有大量阴电荷、呈强酸性，通过与抗凝血酶 III（AT-III）结合加速 IIa、VIIa、IXa、Xa、XIa、XIIa 等凝血因子的灭活而发挥抗凝作用，并非直接灭活凝血因子。原书 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于肝素的抗凝作用特点，叙述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["静脉给药起效迅速", "作用强大", "口服给药起效慢", "体内、外均有抗凝作用", "作用持续时间短"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "口服给药起效慢",
        "肝素为带阴电荷的大分子酸性黏多糖，口服不被吸收（口服无效），需静脉或皮下给药，故“口服给药起效慢”表述错误；静脉给药起效迅速、体内外均有效、作用强大、作用持续时间短均为其特点。原书 A1 型题第 2 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于肝素适应证的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["急性肺栓塞", "DIC 中期", "血液透析", "下肢深静脉血栓", "心脏瓣膜置换术"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DIC 中期",
        "肝素临床用于血栓栓塞性疾病、DIC 早期及体外抗凝（血液透析、心脏瓣膜置换术等），DIC 中期已进入继发性纤溶亢进期，不宜使用肝素。原书 A1 型题第 3 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于肝素禁忌证的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["严重高血压", "消化性溃疡", "急性心肌梗死", "肝功能不全", "肾功能不全"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性心肌梗死",
        "肝素禁忌证包括对肝素过敏、有出血倾向及出血性疾病、消化性溃疡、严重高血压、肝肾功能不全等；急性心肌梗死属血栓栓塞性疾病，是肝素的适应证而非禁忌证。原书 A1 型题第 4 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关华法林的作用机制，说法正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "直接与凝血酶结合，抑制其活性",
      "灭活凝血因子 IIa、VIIa、IXa、Xa",
      "拮抗维生素K，抑制凝血因子的生物合成",
      "加强抗凝血酶 III 的抗凝活性",
      "灭活凝血因子 IIa、Xa、IXa、XIa、XIIa",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "拮抗维生素K，抑制凝血因子的生物合成",
        "香豆素类（华法林）为维生素K拮抗药，抑制维生素K在肝内由环氧化物向氢醌型转化，从而抑制凝血因子 II、VII、IX、X 的合成，属口服抗凝药，体内有效、体外无效。原书 A1 型题第 5 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关水蛭素的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "由水蛭血液中提取",
      "灭活凝血因子 IIa、VIIa、IXa、Xa",
      "过量可用鱼精蛋白对抗",
      "直接抑制凝血酶活性",
      "过量可用维生素K对抗",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "直接抑制凝血酶活性",
        "水蛭素为凝血酶直接抑制药，直接与凝血酶结合，抑制凝血酶及其诱导的血小板聚集及分泌作用；由水蛭唾液腺中提取（非血液），过量时鱼精蛋白对其无效（鱼精蛋白解救肝素过量出血），维生素K解救香豆素类过量出血。原书 A1 型题第 6 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关抗血小板药的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "双嘧达莫拮抗 GP IIb/IIIa 受体",
      "阿司匹林剂量越小，抗血小板作用越强",
      "水蛭素无抗血小板作用",
      "利多格雷会引起骨髓抑制",
      "噻氯匹定可抑制 ADP 介导的血小板活化",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "噻氯匹定可抑制 ADP 介导的血小板活化",
        "噻氯匹定属抑制 ADP 活化血小板的药物，选择性及特异性干扰 ADP 介导的血小板活化，抑制血小板聚集和黏附；阿司匹林小剂量抑制 COX-1 减少 TXA2 合成，双嘧达莫为磷酸二酯酶抑制药，水蛭素为凝血酶直接抑制药，利多格雷为 TXA2 合酶抑制药。原书 A1 型题第 7 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1008",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "阿昔单抗的抗血小板作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制 TXA2 合酶，使 TXA2 合成减少",
      "阻断血小板膜糖蛋白 IIb/IIIa 受体",
      "抑制磷酸二酯酶",
      "使血管内皮产生 PGI2 增多",
      "抑制腺苷的摄取",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阻断血小板膜糖蛋白 IIb/IIIa 受体",
        "阿昔单抗是血小板膜糖蛋白 IIb/IIIa 受体单克隆抗体，通过与 GP IIb/IIIa 受体结合抑制血小板聚集，对血栓形成及溶栓治疗防止血管再闭塞有明显治疗作用。原书 A1 型题第 8 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-a1009",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关氯吡格雷的描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "为血小板 P2Y12 受体拮抗药",
      "有骨髓抑制的不良反应",
      "抑制 ADP 介导的血小板黏附和聚集",
      "常与阿司匹林合用于 PTCA 术后",
      "为前体药，代谢产物有活性",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "有骨髓抑制的不良反应",
        "氯吡格雷为前体药，活性代谢物与噻氯匹定作用相似但作用更强、不良反应少；骨髓抑制是噻氯匹定的不良反应，氯吡格雷一般不引起。氯吡格雷为血小板 P2Y12 受体拮抗药，常与阿司匹林合用于 PTCA 术后。原书 A1 型题第 9 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题/论述题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述肝素抗凝作用机制。",
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
        "肝素的抗凝作用主要依赖于抗凝血酶 III（AT-III）。AT-III 是凝血酶及因子 XIIa、XIa、IXa、Xa 等含丝氨酸残基蛋白酶的抑制剂，与凝血酶通过精氨酸-丝氨酸肽键相结合，形成 AT-III-凝血酶复合物而使酶灭活。肝素与 AT-III 结合后使 AT-III 构型改变、活性部位充分暴露，迅速与因子 IIa、Xa、IXa、XIa、XIIa、纤溶酶等结合并抑制这些因子，肝素可加速这一反应达千倍以上。",
        "肝素带大量阴电荷、呈强酸性，分子大小影响其抗凝活性；体内、体外均有效，口服无效，静脉、皮下给药。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述肝素的主要不良反应及应用注意事项。",
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
        "①自发性出血：表现为各种黏膜出血、关节腔积血和伤口出血等，老年妇女和肾衰竭病人常致出血；用药期间应定期监测部分凝血活酶时间（APTT），一旦发生出血可缓慢静脉注射硫酸鱼精蛋白解救。②短暂性血小板减少症：多数发生在给药后 7～10 天，与免疫反应有关，停药后约 4 天恢复。③其他：过敏反应（哮喘、荨麻疹、结膜炎和发热等）；长期应用可致骨质疏松和骨折；孕妇应用可致早产及死胎。",
        "肝素自发性出血时使用鱼精蛋白解救，鱼精蛋白为强碱性蛋白质，可与带负电荷的肝素结合成稳定复合物使其失去抗凝活性。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述香豆素类抗凝药的抗凝作用机制及特点。",
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
        "双香豆素（香豆素类）是维生素K拮抗药，抑制维生素K在肝内由环氧化物向氢醌型转化，从而阻止维生素K的反复利用。维生素K是γ-羧化酶的辅酶，其循环受阻则影响含有谷氨酸残基的凝血因子 II、VII、IX、X 的前体及抗凝血蛋白 C、抗凝血蛋白 S 的γ-羧化作用，使这些因子停留于无凝血活性的前体阶段，从而影响凝血过程；对已经γ-羧化的因子无抑制作用。",
        "特点：①起效慢，作用时间长；②体内有效，体外无效；③口服有效。主要用于防治血栓栓塞性疾病，过量出血可用维生素K对抗，并有致畸作用。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-short004",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述抗血小板药的分类、代表药物及主要作用机制。",
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
        "抗血小板药又称血小板抑制药，即抑制血小板黏附、聚集以及释放等功能的药物。①抑制血小板代谢的药物：环氧酶抑制药阿司匹林通过与 COX-1 第 530 位丝氨酸残基结合使之乙酰化，不可逆抑制 COX-1 活性，抑制血小板 TXA2 合成，抑制血小板聚集、防止血栓形成；TXA2 合酶抑制药和 TXA2 受体阻断药利多格雷为强大的 TXA2 合酶抑制剂，并具中度的 TXA2 受体拮抗作用。②增加血小板内 cAMP 的药物：依前列醇抑制 ADP、胶原纤维、花生四烯酸等诱导的血小板聚集和释放；双嘧达莫抑制磷酸二酯酶活性、增加血管内皮细胞 PGI2 生成和活性、抑制腺苷再摄取，使细胞内 cAMP 含量增加；西洛他唑为可逆性磷酸二酯酶（PDE-III）抑制剂，升高血小板内 cAMP 而抗血小板、扩张血管。③抑制 ADP 活化血小板的药物：噻氯匹定选择性及特异性干扰 ADP 介导的血小板活化，可逆性抑制血小板聚集和黏附；氯吡格雷为前体药，活性代谢物作用相似而更强。④血小板膜糖蛋白 IIb/IIIa 受体阻断药：阿昔单抗是 GP IIb/IIIa 受体单克隆抗体，抑制血小板聚集。",
        "小剂量阿司匹林通过抑制 COX-1 减少血小板 TXA2 合成，用于防治冠状动脉性疾病、心肌梗死、脑梗死、深静脉血栓形成和肺梗死等。原书论述题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-short005",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述维生素B12的药理作用机制及临床应用。",
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
        "维生素B12为细胞分裂和维持神经组织髓鞘完整所必需，体内主要参与下列代谢：①甲钴胺是甲基转移酶的辅酶，后者为同型半胱氨酸转甲硫氨酸和 5-甲基四氢叶酸转四氢叶酸的反应所必需，同时使四氢叶酸循环利用；维生素B12缺乏时叶酸代谢循环受阻，出现叶酸缺乏症。②5'-脱氧腺苷钴胺是甲基丙二酰辅酶A变位酶的辅酶，可促使甲基丙二酰辅酶A转变为琥珀酰辅酶A而进入三羧酸循环代谢；维生素B12缺乏时甲基丙二酰辅酶A蓄积，后者与脂肪酸合成的中间产物丙二酰辅酶A结构相似，导致异常脂肪酸合成，神经髓鞘完整性受损，出现神经损害。临床应用：主要用于治疗恶性贫血，需注射使用，辅以叶酸；与叶酸合用治疗各种巨幼红细胞性贫血；作为神经系统疾病（如神经炎、神经萎缩等）、肝脏疾病（肝炎、肝硬化等）的辅助治疗；还可用于高同型半胱氨酸血症。",
        "维生素B12缺乏可出现巨幼红细胞性贫血和神经症状。原书论述题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员（原书 33～37 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["氯吡格雷", "氨甲苯酸", "阿司匹林", "阿昔单抗", "阿替普酶"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与血小板膜糖蛋白 IIb/IIIa 受体结合的药物是",
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
            "阿昔单抗",
            "阿昔单抗是血小板膜糖蛋白 IIb/IIIa 受体单克隆抗体，抑制血小板聚集作用明显。原书 B1 型题第 33 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "阻断血小板 ADP 受体的药物是",
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
            "氯吡格雷",
            "氯吡格雷为血小板 P2Y12（ADP）受体拮抗药，抑制 ADP 介导的血小板黏附和聚集，用于预防脑卒中、心肌梗死及外周动脉血栓性疾病复发。原书 B1 型题第 34 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抑制纤溶酶原活化的药物是",
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
            "氨甲苯酸",
            "氨甲苯酸属纤维蛋白溶解抑制药，竞争性抑制纤维蛋白溶酶原激活因子，使纤溶酶原不能转变为纤溶酶，从而抑制纤维蛋白的溶解、产生止血作用。原书 B1 型题第 35 题，参考答案键号 C（题干 OCR「凝血酶/纤溶酶」错乱已按医学语义重建）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-b001m4",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "促进纤溶酶原转变为纤溶酶，发挥溶栓作用的药物是",
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
            "阿替普酶",
            "阿替普酶（组织型纤溶酶原激活物）激活内源性纤溶酶原转变为纤溶酶，水解血栓中纤维蛋白而溶栓，对血栓具有选择性，出血少。原书 B1 型题第 36 题，参考答案键号 B（题干 OCR「凝血酶/纤溶酶」错乱已按医学语义重建）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch29-blood-hematopoietic-drugs-b001m5",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "小剂量抑制血小板环氧酶的药物是",
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
            "阿司匹林",
            "小剂量阿司匹林抑制 COX-1，减少血小板 TXA2 的合成，抑制血小板聚集、防止血栓形成。原书 B1 型题第 37 题，参考答案键号 D。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
