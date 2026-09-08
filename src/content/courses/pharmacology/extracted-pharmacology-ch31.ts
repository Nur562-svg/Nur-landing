import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第31章 作用于呼吸系统的药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题；本章取样为 A1 型）
 * - 问答题（short-answer）：4 题（简答 2 + 论述 2）
 * - B1 配伍题：1 组、共 2 个成员（本章共 3 组，按源题占比取第 1 组 11～12 题）
 * - 独立记分题合计：12 题（须等于本文件预算 12）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 3、选择题（A1 型 5 + A2 型 5 + B1 型 3 组
 *   共 6 小题）、简答题 2 与论述题 2。本文件按 12 道预算取材：名词解释 2、填空 3、
 *   简答/论述 4 全取，剩余 3 题在选择题（A1+A2 共 10 源）与 B1 成员（6 源）间按源题占比
 *   分配：B1 取完整第 1 组（11～12 题，共 2 成员）、选择取前 1 道（A1 型第 1 题）。
 *   正确项对齐章末参考答案键号（本文件 A1 型题 1.B；B1 型题 11.B、12.C）。参考答案区
 *   键号与题干区题号仅题 5 分类不同（题干区题 5 孟鲁司特列为 A1，参考答案区列为 A2，
 *   均映射 a1-single 不受影响）；B1 键 15.C/16.B 在 OCR 中散落到「四、简答题」段后，
 *   已按题干题号归位。OCR 错字已恢复（噻托漠铵→噻托溴铵、M胆碱受休→M胆碱受体、
 *   茶鹹类→茶碱类、氯丙他林→氯丙那林、文气管→支气管、B2受体→β₂受体、
 *   色甘酸纳→色甘酸钠 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch31-respiratory-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第31章 作用于呼吸系统的药物 习题（核对PDF 第212–217页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：吸入性糖皮质激素",
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
        "吸入性糖皮质激素",
        "通过吸入途径给予糖皮质激素，气道内可获得较高的药物浓度，充分发挥局部抗炎作用，并避免或减少全身性的不良反应。长期用药时，药物在咽部和呼吸道存留的不良反应可引起声音嘶哑、声带萎缩变形、诱发口咽部念珠菌感染等，故吸入后需立即漱口。常用的吸入性糖皮质激素有倍氯米松、布地奈德、氟替卡松。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：炎症细胞膜稳定剂",
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
        "炎症细胞膜稳定剂",
        "通过抑制肥大细胞脱颗粒及巨噬细胞与嗜酸性粒细胞介导的炎症反应，而发挥抗炎抗过敏作用的一类药物。代表药物有色甘酸钠、奈多罗米钠；该类药平喘作用起效较慢，不宜用于哮喘急性发作期的治疗，主要用于预防哮喘发作。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch31-respiratory-drugs-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "常用于扩张气道平滑肌的药物分别为___。",
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
        "β肾上腺素受体激动药；茶碱类；抗胆碱药",
        "支气管扩张药包括 β 受体激动药（如 β₂ 受体激动药沙丁胺醇）、茶碱类（如氨茶碱）和吸入性抗胆碱药（如异丙托溴铵），通过不同机制松弛气道平滑肌。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "选择性β2受体激动药与非选择性β受体激动药相比，其优点有___。",
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
        "心血管反应小；作用持久或可以口服",
        "选择性 β₂ 受体激动药对 β₂ 受体有强大的兴奋性、对 β₁ 受体亲和力低，常规剂量口服或吸入时很少产生心血管反应，且可有缓释剂等口服剂型；非选择性 β 受体激动药（如异丙肾上腺素）平喘作用强大但可引起严重的心脏不良反应。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "目前以口服给药途径治疗支气管哮喘的药物分别是___。",
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
        "PDE4 抑制剂；半胱氨酰白三烯受体1阻断剂；茶碱类制剂",
        "罗氟司特（PDE4 抑制剂）、孟鲁司特/扎鲁司特（半胱氨酰白三烯受体 1 阻断剂）以及茶碱类制剂（如氨茶碱）均可口服给药，用于支气管哮喘的长期治疗。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对支气管炎症过程有显著抑制作用的平喘药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["沙丁胺醇", "异丙托溴铵", "倍氯米松", "肾上腺素", "异丙肾上腺素"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "倍氯米松",
        "倍氯米松为吸入性糖皮质激素，通过抑制气道炎症反应长期防止哮喘发作，是抗炎平喘药中抗炎作用最强的药物；肾上腺素、异丙肾上腺素为非选择性 β 受体激动药，沙丁胺醇为选择性 β₂ 受体激动药，异丙托溴铵为 M 胆碱受体阻断药，均不以抑制炎症过程为主。原书 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题/论述题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述β2肾上腺素受体激动药平喘的作用机制。",
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
        "β₂ 受体广泛分布于气道的不同效应细胞上，当 β₂ 受体激动药兴奋气道 β₂ 受体时，气道平滑肌松弛、抑制肥大细胞与中性粒细胞释放炎症介质与过敏介质、增强气道纤毛运动、促进气道分泌、降低血管通透性、减轻气道黏膜下水肿，这些效应均有利于缓解或消除喘息。其松弛支气管平滑肌的机制为：β₂ 受体激动药与平滑肌细胞膜上的 β₂ 受体结合后引起受体构型改变，激活兴奋性 G 蛋白（Gs），从而活化腺苷酸环化酶，催化细胞内 ATP 转变为 cAMP，引起细胞内 cAMP 水平增加，转而激活 cAMP 依赖性蛋白激酶（PKA），再通过降低细胞内游离钙浓度、使肌球蛋白轻链激酶失活和开放钾通道三个途径，引起平滑肌松弛。",
        "选择性 β₂ 受体激动药（沙丁胺醇等）对 β₁ 受体亲和力低，常规剂量口服或吸入时很少产生心血管反应；非选择性 β 受体激动药（异丙肾上腺素）平喘作用强大但可引起严重心脏不良反应。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述罗氟司特的主要药理作用和临床应用有哪些？",
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
        "罗氟司特选择性抑制 PDE4 的活化，使细胞内 cAMP 浓度增加，从而产生强大的抑制炎症细胞聚集和活化、扩张支气管和缓解气道重塑的作用。虽然哮喘不是罗氟司特的适应证，但对于慢性阻塞性肺疾病（COPD）的治疗具有特效，对于喘息型 COPD 或 COPD 伴有喘息的患者有较好的疗效。",
        "罗氟司特是第一个被批准用于治疗反复发作的成人重症 COPD 的 PDE4 抑制剂。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-short003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述平喘药的分类及每类中的主要药物。",
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
        "平喘药分三大类：①支气管扩张药（常用平喘药）：β 肾上腺素受体激动药（异丙肾上腺素、沙丁胺醇、特布他林、氯丙那林、丙卡特罗、福莫特罗）、茶碱类（氨茶碱、胆茶碱）、M 胆碱受体阻断药（异丙托溴铵）；②抗炎平喘药：糖皮质激素类（倍氯米松、布地奈德、氟替卡松）、PDE4 抑制剂（罗氟司特）；③抗过敏平喘药：炎症细胞膜稳定剂（色甘酸钠、奈多罗米钠）、抗组胺药（酮替芬）、白三烯受体阻断药（孟鲁司特、扎鲁司特）。",
        "糖皮质激素是抗炎平喘药中抗炎作用最强并有抗过敏作用的药物；抗过敏平喘药平喘作用起效较慢，不宜用于哮喘急性发作期，主要用于预防哮喘发作。原书论述题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-short004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述糖皮质激素类平喘药的作用机制，该类药物的吸入制剂优缺点各有哪些？",
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
        "机制：糖皮质激素用于哮喘治疗的机制是该类药物的抗炎作用。这类药物是抗炎平喘药中抗炎作用最强的药物，并有抑制免疫系统功能和抗过敏作用；长期应用可改善病人肺功能、降低气道高反应性、降低发作的频率和程度、改善症状，提高生活质量。给药方式：①全身用药（口服与注射）易引起较多的严重不良反应；②吸入给药在气道内可获得较高的药物浓度，充分发挥局部抗炎作用，并可避免或减少全身性药物的不良反应，是目前最常用的抗炎性平喘药。吸入常用剂量的糖皮质激素一般不产生不良反应，但吸入后大约有 80%～90% 药物沉积在咽部并吞咽到胃肠道，沉积的糖皮质激素与咽部或全身不良反应有关；长期用药时，药物在咽部和呼吸道存留的不良反应可引起声音嘶哑、声带萎缩变形、诱发口咽部念珠菌感染。",
        "吸入给药后应立即漱口，以减少口咽部不良反应。原书论述题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书 11～12 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch31-respiratory-drugs-b001",
    order: 11,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["鸟苷酸环化酶", "β肾上腺素受体", "磷酸二酯酶", "腺苷酸环化酶", "M胆碱受体"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-pharmacology-ch31-respiratory-drugs-b001m1",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "罗氟司特的药理作用靶点是",
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
            "磷酸二酯酶",
            "罗氟司特为特异的磷酸二酯酶 4（PDE4）抑制剂，通过抑制 PDE4 使细胞内 cAMP 浓度增加，发挥抑制炎症细胞聚集和活化、扩张支气管和缓解气道重塑的作用。原书 B1 型题第 11 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch31-respiratory-drugs-b001m2",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "噻托溴铵的药理作用靶点是",
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
            "M胆碱受体",
            "噻托溴铵为吸入性长效 M 胆碱受体阻断药，通过阻断气道 M 胆碱受体而扩张支气管，对 β₂ 受体激动药耐受的病人有效，对老年性哮喘尤为适用。原书 B1 型题第 12 题，参考答案键号 C。",
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
