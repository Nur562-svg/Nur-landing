import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第26章 肠道病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：0 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：4 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 5、选择题（A1 型 12 + A2 型 4）、B1 型 2 组
 *   （共 4 成员）与简答题 4；本文件按 16 道预算取样，名词解释、填空与简答题全取，
 *   B1 取第 1 组（17~18 题，2 成员）完整组，预算内未纳入选择题。正确项对齐章末参考答案
 *   键号（B1 17.B 18.A）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 疱症性咽峡炎→
 *   疱疹性咽峡炎、沩→为、水疮性→水疱性 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch26-enteroviruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第26章 肠道病毒 习题（核对PDF 第198–204页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch26-enteroviruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肠道病毒（enterovirus）",
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
        "肠道病毒（enterovirus）",
        "肠道病毒：是指经消化道感染和传播、能在肠道中复制、并引起人类相关疾病的胃肠道感染病毒，归类于小 RNA 病毒科。这类病毒虽然主要经消化道传播和感染，但引起的主要疾病却在肠道外，如脊髓灰质炎、心肌炎、手足口病等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：新型肠道病毒（new enteroviruses）",
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
        "新型肠道病毒（new enteroviruses）",
        "新型肠道病毒：是指 1969 年以后陆续分离到的肠道病毒，目前包括有 68、69、70、71 等多种血清型。新型肠道病毒主要经粪-口途径传播，可引起多种神经系统疾病以及其他部位的疾病，如手足口病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：脊髓灰质炎病毒（poliovirus）",
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
        "脊髓灰质炎病毒（poliovirus）",
        "脊髓灰质炎病毒：是肠道病毒的典型代表，基因组为单正链 RNA，病毒体呈球形，直径 24~30nm。经粪-口途径传播后，主要侵犯脊髓前角运动神经细胞，导致小儿麻痹症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：口服脊髓灰质炎减毒活疫苗（OPV）",
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
        "口服脊髓灰质炎减毒活疫苗（OPV）",
        "口服脊髓灰质炎减毒活疫苗（OPV）：是三型脊髓灰质炎病毒的混合疫苗，口服免疫类似自然感染，可诱发血清抗体和肠道局部 sIgA，阻止野毒株在肠道的增殖和人群中的流行，保护效果较好，但安全性弱于灭活脊髓灰质炎疫苗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：埃可病毒（echovirus）",
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
        "埃可病毒（echovirus）",
        "埃可病毒：亦称人肠道致细胞病变孤儿病毒，是肠道病毒的一类，生物学性状与柯萨奇病毒相似，主要通过粪-口途径传播，可引起严重的心肌炎等疾病，也可只引起轻微的呼吸道感染症状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），本章无 —— 置空 */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch26-enteroviruses-fill001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "肠道病毒是无___的小 RNA 病毒，衣壳为___对称型，基因组为___。",
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
        "包膜；二十面体立体；单正链 RNA（+ssRNA）",
        "肠道病毒为无包膜的小 RNA 病毒，衣壳二十面体立体对称，基因组为单正链 RNA（+ssRNA），不分节段。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-fill002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "脊髓灰质炎病毒是___的病原体，主要侵犯___，导致急性弛缓性肢体麻痹，病人以儿童多见，故亦称___。",
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
        "脊髓灰质炎；脊髓前角运动神经元；小儿麻痹症",
        "脊髓灰质炎病毒主要侵犯脊髓前角运动神经细胞，引起急性弛缓性肢体麻痹，病人以儿童多见，故亦称小儿麻痹症。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-fill003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "脊髓灰质炎病毒的主要外露衣壳蛋白为___，与病毒吸附有关；脊髓灰质炎病毒在细胞表面的受体是细胞黏附分子___。",
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
        "VP1；CD155",
        "VP1 是脊髓灰质炎病毒外露的主要衣壳蛋白，为受体结合部位，可诱导产生中和抗体；细胞黏附分子 CD155 是脊髓灰质炎病毒的受体。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-fill004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "手足口病是一种急性传染病，可由 20 多种肠道病毒引起，但以___和___常见。",
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
        "A 组柯萨奇病毒 16 型（CVA16）；肠道病毒 71 型（EV71）",
        "手足口病可由 20 多种肠道病毒引起，但以 A 组柯萨奇病毒 16 型（CVA16）和肠道病毒 71 型（EV71）常见。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-fill005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "根据柯萨奇病毒对乳鼠的致病特点和对细胞培养的敏感性不同，可将其分为___和___两组，其中，___组是病毒性心肌炎常见的病原体。",
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
        "A 组；B 组；B",
        "柯萨奇病毒根据对乳鼠的致病特点和对细胞培养的敏感性不同分为 A、B 两组，其中 B 组是病毒性心肌炎常见的病原体。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch26-enteroviruses-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述肠道病毒的共同特征，主要包括哪些病毒？",
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
        "肠道病毒的共同特征及主要病毒",
        "肠道病毒的共同特征包括：（1）归类于小 RNA 病毒科肠道病毒属，无包膜的小 RNA 病毒，形态微小，衣壳二十面体立体对称，基因组为单正链 RNA（+ssRNA），基因组结构高度相似；主要经粪-口途径传播，以隐性感染多见。（2）多数能在有相应膜受体的易感细胞中增殖，迅速产生细胞病变。（3）对理化因素的抵抗力较强，能耐受胃酸、蛋白酶和胆汁的作用，对乙醚和去垢剂有一定抗性。（4）主要经粪-口途径传播，以隐性感染多见。肠道病毒主要有脊髓灰质炎病毒、柯萨奇病毒、埃可病毒，以及新型肠道病毒，包括 68、69、70 和 71 等多种型别。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述柯萨奇病毒和埃可病毒的感染和致病特点，所致疾病有哪些？",
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
        "柯萨奇病毒和埃可病毒的感染和致病特点及所致疾病",
        "柯萨奇病毒和埃可病毒的受体分布于多种组织和细胞，因而引起的疾病谱复杂。柯萨奇病毒和埃可病毒主要通过粪-口途径传播，其致病的显著特点是：病毒主要在肠道中增殖，却很少引起肠道疾病；不同的肠道病毒可引起相同的临床疾病，同一型病毒也可引起几种不同的临床疾病。柯萨奇病毒和埃可病毒所致疾病有心肌炎和扩张型心肌病、手足口病、无菌性脑膜炎、疱疹性咽峡炎、流行性胸痛和眼病等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述脊髓灰质炎病毒感染和致病机制的特点。",
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
        "脊髓灰质炎病毒感染和致病机制的特点",
        "脊髓灰质炎病毒的传染源是脊髓灰质炎病人或无症状带毒者，主要通过粪-口途径传播。感染人体后，由于不同个体免疫状况的不同，感染结局可表现多种不同的方式。其致病机制可大致总结如下：病毒（污染食物和水）→口→咽部→肠道淋巴组织内增殖→粪便排毒→隐性感染（90%~95%）；发热，全身不适，胃肠道和呼吸道症状→顿挫感染（4%~8%）；第一次病毒血症→全身淋巴结、肝、脾等网状内皮细胞和消化道黏膜中增殖→第二次病毒血症→病毒侵入中枢神经系统，引起发热、头痛、麻痹前驱症状→非麻痹型脊髓灰质炎（1%~2%）；大量病毒破坏脊髓前角运动神经细胞→弛缓性肢体麻痹（0.1%~0.2%）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch26-enteroviruses-short004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：目前新型肠道病毒包括哪些血清型，各自主要所致的疾病是什么？",
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
        "新型肠道病毒的血清型及所致疾病",
        "新型肠道病毒是指 1969 年以后陆续分离到的肠道病毒，目前的新型肠道病毒包括 68、69、70、71 四种血清型。对于目前的四种新型肠道病毒，除肠道病毒 69 型的致病性不清楚外，其余三型病毒均可在人体引起不同疾病：肠道病毒 68 型主要引起儿童毛细支气管炎和肺炎，肠道病毒 70 型是人类急性出血性结膜炎（俗称“红眼病”）的主要病原体，而肠道病毒 71 型除引起人类中枢神经系统感染外，还可引起手足口病（HFMD）的暴发流行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 2 成员（题组17-18；预算内未纳入第二组19-20） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch26-enteroviruses-b001",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "引起病毒性心肌炎",
      "引起手足口病",
      "引起无菌性脑膜炎",
      "引起疱疹性咽峡炎",
      "引起婴幼儿腹泻",
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
        id: "ext-microbiology-ch26-enteroviruses-b001m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "肠道病毒 71 型",
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
            "引起手足口病",
            "肠道病毒 71 型（EV71）是人类手足口病的主要病原体，常引起重症感染。原书 B1 答案第 17 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch26-enteroviruses-b001m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "柯萨奇病毒 B 组",
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
            "引起病毒性心肌炎",
            "柯萨奇病毒 B 组是病毒性心肌炎的重要病原体。原书 B1 答案第 18 题为 A。",
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
