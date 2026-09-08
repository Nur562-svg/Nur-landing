import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 病理学学习指导与习题集 — 第7章 环境和营养性疾病 题库提取（等比取样）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：5 题
 * - 选择题（a1-single）：4 题（A1 型 4 题；本章无 A2 型）
 * - 判断题 + 问答题（short-answer）：6 题（判断题 4、问答题 2）
 * - B1 配伍题：0 组（本书无 B1 型）
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、判断题、选择题（A1 型）、问答题（无 A2 型、无 B1 型、
 *   无填空）；本文件按 15 道预算在原书顺序内取材：名词解释取第 1–5 题、A1 型取第 1–4 题、
 *   判断题取第 1–4 题、问答题取第 1–2 题（全取）；未纳入的题因预算所限。正确项对齐章末
 *   参考答案键号（A1 小节独立编号），选项已随机重排并同步 correctChoiceIndex。判断题答案
 *   按 √/× 键号归位（√=对、×=错）。OCR 错字已按病理学医学语义恢复（如 吸人→吸入、
 *   硫和二氧化碳→硫氧化物和氮氧化物（酸性气溶胶定义）、维生素B，→维生素B1、
 *   Wemicke→Wernicke、百草桔→百草枯、胸疼→胸痛 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pathology-ch07-environmental-and-nutritional-diseases";
const locatorBase =
  "《病理学学习指导与习题集》 第7章 环境和营养性疾病 习题（核对PDF 第105–113页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道（原书第 1–5 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：环境污染（Environmental pollution）",
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
        "环境污染指人类在其社会活动和日常生活中直接或间接地向环境排放超过人类社会自身自净能力的化学物质或能量，造成大气、水、噪声及放射性污染，对人类生态系统、生存与发展带来不利影响。",
        "环境污染的核心是排放量超过环境的自净能力，污染类型包括大气污染、水污染、噪声污染及放射性污染。原书第7章名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：职业病（occupational disease）",
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
        "职业病指劳动者在职业活动中因接触粉尘、放射性物质和其他有毒有害物质而引起的疾病。",
        "职业病强调“职业活动”中的接触史，致病因素包括粉尘、放射性物质和其他有毒有害物质，属于职业及环境暴露性污染范畴。原书第7章名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：酸性气溶胶（acid aerosols）",
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
        "酸性气溶胶指排放到大气中的硫氧化物和氮氧化物被氧化生成的硫酸和硝酸溶解于水或微粒表面而形成的气溶胶。",
        "OCR 原文为“硫和二氧化碳被氧化生成的硫酸和硝酸”，按病理学医学语义恢复为“硫氧化物和氮氧化物”（二氧化碳不生成硝酸）。酸性气溶胶可刺激呼吸道上皮，改变黏膜纤毛上皮细胞的自净功能，进一步加重哮喘病患者的呼吸功能。原书第7章名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：PM2.5（particulate matter 2.5）",
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
        "PM2.5 指环境空气中空气动力学当量直径小于等于 2.5μm 的颗粒物。",
        "PM2.5 颗粒小，吸入后易于停留在肺泡，被巨噬细胞和中性粒细胞吞噬后释放炎性介质，引起肺部疾病。原书第7章名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：慢性酒精中毒（chronic alcoholism）",
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
        "慢性酒精中毒指长期摄入一定量的乙醇引起的中枢神经系统严重中毒，其特征表现为性格改变、智能衰退和心理障碍。",
        "慢性酒精中毒的每天摄入量一般以大于 45g/d 为标准（10g 乙醇约等于 25ml 浓度为 52% 的高度酒）。原书第7章名词解释第 5 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道（A1 型原书第 1–4 题；本章无 A2 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一种物质中毒可引起周围神经系统病变，出现腕下垂或足下垂，还可刺激牙龈使近齿龈处的色素沉着",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["汞", "氟", "铅", "砷", "镉"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "铅",
        "铅中毒可致周围运动神经损害，累及桡神经和腓神经引起特征性的腕下垂（wrist drop）和足下垂（foot drop）；过量的铅还可刺激牙龈使近齿龈处色素沉着，形成另一种“铅线”。原书第7章选择题 A1 型第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一种物质中毒能够通过抑制维生素 K 和环氧化物还原酶而阻止肝脏生产凝血酶原，破坏血液的凝固功能",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["对硫磷", "溴敌隆", "敌百虫", "甲醇", "百草枯"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溴敌隆",
        "溴敌隆为灭鼠药，通过抑制维生素 K 和环氧化物还原酶而阻止肝脏生产凝血酶原，破坏血液的凝固功能。原书第7章选择题 A1 型第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一种物质摄入过量也会引起甲状腺肿",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["汞", "砷", "碘", "氟", "镉"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "碘",
        "碘摄入过量会引起甲状腺肿，水源性高碘是造成高碘性甲状腺肿流行的主要原因；碘摄入不足则引起以脑发育障碍及弥散性非毒性甲状腺肿为主要特征的碘缺乏病。原书第7章选择题 A1 型第 3 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "铅中毒的作用机制较为复杂，不包括下列哪一项",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "与钙离子竞争，影响骨的钙代谢",
      "与红细胞中的血红蛋白结合，随血流进入器官和组织中心",
      "抑制多种酶活性，使相应的代谢过程障碍",
      "抑制 1,25-二羟维生素D的生成",
      "抑制神经突触的传导，使大脑皮质兴奋和抑制功能紊乱",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "与红细胞中的血红蛋白结合，随血流进入器官和组织中心",
        "铅中毒的机制包括抑制多种酶活性使相应的代谢过程障碍、抑制神经突触的传导使大脑皮质兴奋和抑制功能紊乱、与钙离子竞争影响骨的钙代谢、抑制 1,25-二羟维生素D的生成等；选项“与红细胞中的血红蛋白结合，随血流进入器官和组织中心”不属于铅中毒的作用机制。原书第7章选择题 A1 型第 4 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断题 + 问答题（short-answer），6 道（判断题第 1–4 题、问答题第 1–2 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：微粒吸入后易停留在肺泡，被巨噬细胞和中性粒细胞吞噬后释放出炎性介质。",
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
        "对。微粒吸入后易停留在肺泡，被巨噬细胞和中性粒细胞吞噬后释放出炎性介质。",
        "直径为 3~5μm 的微粒最容易被吸入并沉着在肺部，被巨噬细胞和中性粒细胞吞噬后释放出炎性介质，引起肺部疾病。原书第7章判断题第 1 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：臭氧化学性质高度稳定，容易与细胞膜表面的不饱和脂肪酸发生反应，导致炎性介质的释放，引起呼吸道的炎症。",
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
        "错。臭氧化学性质高度不稳定，容易与细胞膜表面的不饱和脂肪酸发生反应，生成过多的自由基而发挥毒性作用，导致炎性介质的释放，引起呼吸道的炎症。",
        "题干称臭氧化学性质“高度稳定”，与正文“臭氧化学性质高度不稳定”相悖，故为错。原书第7章判断题第 2 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-short003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：长期吸入二氧化硅（矽）粉尘，可导致矽肺。",
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
        "对。长期吸入二氧化硅（矽）粉尘，可导致矽肺。",
        "长期吸入二氧化硅（矽）粉尘可导致矽肺，属于职业暴露性污染引起的肺部疾病。原书第7章判断题第 3 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-short004",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：酸性气溶胶可刺激呼吸道上皮，改变黏膜纤毛上皮细胞的自净功能，进一步加重哮喘病患者的呼吸功能。",
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
        "对。酸性气溶胶可刺激呼吸道上皮，改变黏膜纤毛上皮细胞的自净功能，进一步加重哮喘病患者的呼吸功能。",
        "酸性气溶胶刺激呼吸道上皮，改变黏膜纤毛上皮细胞的自净功能，进一步加重哮喘病患者的呼吸功能。原书第7章判断题第 4 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-short005",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：请列举三种常见的金属污染物，并分别说明其对机体的危害。",
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
        "常见的金属污染物包括铅、汞、砷、镉等。①铅中毒：过多的铅在体内蓄积引起神经、消化、呼吸和免疫系统急性或慢性中毒，铅中毒性脑病可出现脑水肿甚至脑疝形成，镜下见脑组织充血、点片状出血、神经细胞灶性坏死，病灶附近伴星形细胞弥漫性增生、血管扩张及毛细血管增生；成人铅中毒表现为周围运动神经损害，累及桡神经和腓神经引起腕下垂和足下垂，还可引起胃肠道周围神经病变导致胃肠道疼痛；肾脏损害主要为近曲小管上皮细胞线粒体和细胞核的改变、肾纤维化和肾小管重吸收障碍，临床上可出现氨基酸尿、糖尿和高磷酸盐尿。②汞中毒：金属汞易挥发并通过血脑屏障进入脑组织，氧化为汞离子后与脑内蛋白质结合造成脑损害，临床上表现视觉受限、瘫痪、共济失调、发声困难及听力障碍，病理改变主要为小脑萎缩和视皮质海绵状软化；无机汞以离子态与金属硫蛋白结合易在肾蓄积，表现为肾近曲小管上皮细胞坏死、无尿性肾衰竭，慢性汞中毒出现蛋白尿甚至肾病综合征，可见膜性肾小球肾炎改变。③砷中毒：引起中枢神经麻痹，出现四肢疼痛性痉挛、意识模糊、谵妄、昏迷、血压下降及呼吸困难，可伴肝脏及心肌损害；地方性砷中毒主要表现为皮肤损害（皮肤角化、色素沉着或色素脱失）、消化系统、神经系统、心血管系统和呼吸系统改变，以及癌症特别是皮肤癌和肝癌。④镉中毒：镉对呼吸系统、肾脏和骨骼具有毒性作用，一次大量吸入可引起急性肺炎和肺水肿，能损伤肾小管和肝细胞，诱发低色素贫血和肺气肿；慢性镉中毒主要引起肺纤维化、肺气肿、肾小管损害（可致蛋白尿）等。",
        "参考答案列举了铅、汞、砷、镉四种金属污染物（题问三种，答案给出四种），分别说明其对神经、呼吸、消化、肾脏、骨骼等系统的危害。原书第7章问答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch07-environmental-and-nutritional-diseases-short006",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述酒精中毒对机体的主要危害。",
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
        "酒精中毒对机体的主要危害包括：①消化系统：酒精对肝损害非常严重，慢性酒精中毒可引起脂肪肝和肝硬化，还可引起消化性溃疡、反流性食管炎和急性胰腺炎等。②神经系统：慢性酒精中毒可造成大脑皮质萎缩；引起维生素 B1 缺乏可造成 Wernicke-Korsakoff 脑病；引起烟酸缺乏造成糙皮性脑病。③心血管系统：酒精中毒可引起扩张型心肌病，又称酒精性心肌病，病理改变有心肌变性、纤维化及心腔扩张，临床表现为心悸、气急、胸闷、胸痛、心律失常、心力衰竭等，可发生晕厥和猝死。④其他系统：酒精中毒可引起巨幼细胞性贫血、血小板减少、急慢性肌病；男性酒精中毒常引起不育、性欲下降、男性乳腺发育；女性酒精中毒常引起骨质疏松症。⑤胎儿酒精综合征：母亲在妊娠期间酗酒造成的永久性出生缺陷。⑥多器官功能衰竭。",
        "参考答案按消化系统、神经系统、心血管系统、其他系统、胎儿酒精综合征、多器官功能衰竭六方面归纳酒精中毒的危害。原书第7章问答题第 2 题参考答案。",
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
