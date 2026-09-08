import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第8章 胆碱受体阻断药（1）—M胆碱受体阻断药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：1 题
 * - 选择题（a1-single）：2 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 4、选择题（A1 型 6 + A2 型 2 + B1 型 2 组
 *   各 2 小题）与简答（论述）3；本文件按 9 道预算在原书顺序内取材。名词解释全取 2，
 *   填空题取前 1 道，选择题取前 2 道 A1 型题，问答题取前 2 道，B1 型取第 1 组（9～10 题）
 *   完整 2 成员。正确项对齐章末参考答案键号（A1 型题 1.D/2.D、B1 型题 9.A/10.D），
 *   选项与共用备选答案已随机重排并同步 correctChoiceIndex。OCR 错字与符号已按药理学
 *   医学语义恢复（如 眼内压、调节麻痹、东莨菪碱、托吡卡胺、哌仑西平等），数值
 *   （0.5mg、1~2mg 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch08-muscarinic-antagonists";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第8章 胆碱受体阻断药（1）—M胆碱受体阻断药 习题（核对PDF 第53–56页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：M 胆碱受体阻断药",
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
        "M 胆碱受体阻断药",
        "指能与胆碱受体结合但不产生或极少产生拟胆碱作用，却能阻碍乙酰胆碱或胆碱受体激动药与平滑肌、心肌、腺体、外周神经节和中枢神经系统的 M 胆碱受体结合，从而拮抗其拟胆碱作用的药物。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：调节麻痹",
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
        "调节麻痹",
        "睫状肌 M 受体被阻断，使睫状肌松弛退向外缘，悬韧带拉紧致晶状体呈扁平状态，屈光度降低，不能将近物清晰地成像于视网膜上，而造成视近物模糊不清、视远物清晰，即称为调节麻痹。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），1 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "阿托品对眼的作用包括___、___和___。",
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
        "扩瞳；眼内压升高；调节麻痹",
        "阿托品阻断瞳孔括约肌与睫状肌上的 M 胆碱受体，松弛瞳孔括约肌和睫状肌，出现扩瞳、眼内压升高和调节麻痹。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "阿托品对眼的作用为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "缩瞳，眼内压升高，调节麻痹",
      "扩瞳，眼内压降低，调节痉挛",
      "扩瞳，眼内压升高，调节麻痹",
      "缩瞳，眼内压降低，调节痉挛",
      "缩瞳，眼内压升高，调节痉挛",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "扩瞳，眼内压升高，调节麻痹",
        "阿托品阻断瞳孔括约肌和睫状肌上的 M 胆碱受体，使瞳孔扩大（扩瞳）、房水回流受阻致眼内压升高，并因睫状肌松弛出现调节麻痹。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "全身麻醉前给予阿托品的目的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "松弛骨骼肌",
      "增强麻醉药的作用",
      "减少呼吸道腺体分泌",
      "镇静",
      "减少患者对术中不良刺激的记忆",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "减少呼吸道腺体分泌",
        "阿托品能阻断腺体细胞膜上 M 胆碱受体，使呼吸道腺体分泌减少，防止全麻过程中呼吸道分泌物过多阻塞气道及引起吸入性肺炎，故作为麻醉前给药。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述阿托品的药理作用、临床应用及不良反应。",
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
        "药理作用：①腺体：阻断腺体细胞膜上 M 胆碱受体，使腺体分泌减少，对唾液腺和汗腺作用最明显；②眼：阻断眼部所有 M 胆碱受体，松弛瞳孔括约肌和睫状肌，出现扩瞳、眼内压升高和调节麻痹；③平滑肌：对胆碱能神经支配的多种内脏平滑肌有松弛作用，对过度活动或痉挛性收缩的内脏平滑肌作用更明显；④心血管系统：治疗量（0.5mg）可使部分患者心率短暂性轻度减慢，较大剂量（1~2mg）可阻断窦房结 M2 受体，解除迷走神经对心脏的抑制作用，使心率加快；还可拮抗迷走神经过度兴奋所致的房室传导阻滞，也可缩短房室结有效不应期；治疗量对血管与血压无明显影响，大剂量阿托品能引起皮肤血管扩张、皮肤潮红和温热；⑤中枢神经系统：治疗量影响不明显，大剂量可兴奋中枢，中毒剂量可见明显中枢中毒症状，继续增加剂量可使中枢兴奋转抑制，发生昏迷与呼吸麻痹。临床应用：①解除平滑肌痉挛：适用于各种内脏绞痛，也可用于儿童遗尿症，对胆绞痛或肾绞痛疗效较差，常需与阿片类镇痛药合用；②抑制腺体分泌：用于全身麻醉前给药，也可用于严重的盗汗、重金属中毒、帕金森病的流涎症及食管机械性阻塞（肿瘤或狭窄）所致吞咽困难等；③眼科应用：虹膜睫状体炎，验光、眼底检查；④缓慢型心律失常：治疗迷走神经过度兴奋所致的窦性心动过缓、窦房阻滞、房室传导阻滞等；⑤抗休克：对暴发型流行性脑脊髓膜炎、中毒性菌痢、中毒性肺炎等所致的感染性休克可用大剂量阿托品治疗，能解除血管痉挛、舒张外周血管、改善微循环，但对休克伴高热或心率过快者不宜使用；⑥解救有机磷酸酯类中毒。不良反应：阿托品对组织器官的选择性不高，应用其中一种作用时，其他作用则成为副作用，常见口干、视力模糊、心率加快、瞳孔扩大及皮肤潮红等，随剂量增大不良反应逐渐加重，甚至出现明显中枢中毒症状。",
        "按药理作用（腺体、眼、平滑肌、心血管、中枢）、临床应用（内脏绞痛、抑制腺体分泌、眼科、缓慢型心律失常、抗休克、有机磷酸酯类中毒解救）与不良反应（口干、视力模糊、心率加快、瞳孔扩大、皮肤潮红，大剂量中枢中毒）三部分作答。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述东莨菪碱的药理作用和临床应用。",
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
        "药理作用：外周作用与阿托品相似，仅在作用强度上略有差异，其中抑制腺体分泌作用较阿托品强，扩瞳及调节麻痹作用较阿托品稍弱，对心血管系统作用较弱。对中枢神经系统的作用较强，持续时间更久，在治疗剂量时即可引起中枢神经系统抑制；此外，尚有欣快作用。临床应用：①麻醉前给药；②晕动病；③妊娠呕吐及放射病呕吐；④帕金森病。",
        "外周作用同阿托品但有强度差异（抑腺强、扩瞳与调节麻痹稍弱、心血管弱），突出其中枢抑制作用特点，临床应用对应麻醉前给药、晕动病、妊娠呕吐及放射病呕吐、帕金森病。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书 9～10 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch08-muscarinic-antagonists-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "青光眼",
      "眼科检查",
      "缓慢型心律失常",
      "晕动病",
      "快速型心律失常",
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
        id: "ext-pharmacology-ch08-muscarinic-antagonists-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "东莨菪碱可用于治疗",
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
            "晕动病",
            "东莨菪碱对中枢神经系统作用较强，可用于治疗晕动病（防晕止吐）。原书 B1 型题第 9 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch08-muscarinic-antagonists-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "托吡卡胺可用于",
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
            "眼科检查",
            "托吡卡胺为短效合成扩瞳药，扩瞳作用维持时间明显缩短，适用于一般的眼科检查。原书 B1 型题第 10 题，参考答案键号 D。",
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
