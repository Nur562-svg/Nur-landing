import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第37章 胰岛素及其他降血糖药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：3 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 5 组共 13 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、填空题 5、选择题（A1 型 8 + A2 型 5 + B1 型 5 组
 *   共 13 小题）与简答题 2；本文件按 11 道预算取材：名词解释全取、填空题全取、
 *   A1 型题取第 1–2 题、简答题取第 1 题；A2 型题（9–13）、B1 型题（14–26）因预算
 *   未纳入。正确项对齐章末参考答案键号（A1 型题 1.C、2.E；本文件答案键号自 1–26
 *   连续编号），选项已随机重排并同步 correctChoiceIndex。OCR 错字已按药理学医学语义
 *   恢复（如 磺酰豚类→磺酰脲类、8-葡萄糖苷酶抑制剂→α-葡萄糖苷酶抑制剂、
 *   二甲双脈→二甲双胍、过氧化物酶增殖体受体-Y→过氧化物酶体增殖物激活受体-γ、
 *   维生素B。→维生素B₆、血糖 18mmolL→18mmol/L 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch37-insulin-antidiabetics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第37章 胰岛素及其他降血糖药 习题（核对PDF 第245–249页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：胰岛素受体",
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
        "由两个α亚单位及两个β亚单位组成的大分子蛋白复合物，胰岛素与胰岛素受体结合进而产生降血糖等生物效应。",
        "胰岛素受体属酪氨酸激酶型受体，广泛分布于肝、脂肪、肌肉等靶组织细胞膜上，胰岛素与其结合后启动下游信号转导而发挥降糖等效应。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：胰岛素抵抗",
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
        "血中出现拮抗胰岛素作用的物质增多、pH降低时，胰岛素与受体结合减少，或血中大量游离脂肪酸和酮体妨碍葡萄糖的摄取、利用，使胰岛素作用锐减，需短时间内增加胰岛素剂量的现象，称胰岛素抵抗。",
        "胰岛素抵抗是胰岛素敏感性下降的表现，常见于肥胖、2 型糖尿病患者，也是临床需要增加胰岛素用量的原因之一。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：α-葡萄糖苷酶抑制剂",
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
        "此类药物在小肠上皮刷状缘与碳水化合物竞争水解碳水化合物的糖苷水解酶，从而减慢碳水化合物水解及产生葡萄糖的速度并延缓葡萄糖的吸收。",
        "α-葡萄糖苷酶抑制剂（如阿卡波糖、伏格列波糖）通过延缓肠道碳水化合物水解与葡萄糖吸收而降低餐后血糖。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-fill001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "糖尿病口服用药包括___和___等。",
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
        "磺酰脲类；双胍类",
        "常用口服降血糖药包括磺酰脲类、双胍类、胰岛素增敏剂、α-葡萄糖苷酶抑制剂及餐时血糖调节剂等五类。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-fill002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "胰岛素主要促进肝脏、脂肪、肌肉等靶组织___和___的储存。",
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
        "糖原；脂肪",
        "胰岛素通过胰岛素受体促进肝脏、脂肪、肌肉等靶组织糖原和脂肪的储存，从而降低血糖。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-fill003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "胰岛素最常见的不良反应是___。",
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
        "低血糖",
        "低血糖症是胰岛素最重要也是最常见的不良反应，其他不良反应还包括过敏反应、胰岛素抵抗、脂肪萎缩等。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-fill004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "噻唑烷酮类化合物改善胰岛素抵抗及降糖的机制与竞争性激活___，调节胰岛素反应性基因的转录有关。",
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
        "过氧化物酶体增殖物激活受体-γ（PPAR-γ）",
        "噻唑烷酮类化合物是胰岛素增敏剂，竞争性激活过氧化物酶体增殖物激活受体-γ（PPAR-γ），调节胰岛素反应性基因的转录，从而改善胰岛素抵抗、降低血糖。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-fill005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "第___代磺酰脲类能使血小板黏附力减弱，刺激纤溶酶原的合成。",
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
        "三",
        "第三代磺酰脲类（如格列美脲等）除降血糖外，还能使血小板黏附力减弱、刺激纤溶酶原的合成，对水排泄及凝血功能产生影响。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-a1001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "双胍类降糖药最常见的副作用是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "过敏性皮疹",
      "低血糖",
      "胃肠道反应",
      "乳酸性酸中毒",
      "肝功异常",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃肠道反应",
        "双胍类（如二甲双胍）最常见的不良反应是胃肠道反应，如恶心、呕吐、腹泻等；乳酸性酸中毒为最严重但少见的不良反应。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-a1002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有降血糖及抗利尿作用的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "二甲双胍",
      "苯乙双胍",
      "格列吡嗪",
      "氯磺丙脲",
      "甲苯磺丁脲",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "氯磺丙脲",
        "氯磺丙脲为第一代磺酰脲类长效降糖药，除降血糖外还有明显的抗利尿作用（促进抗利尿激素分泌），可用于尿崩症。原书 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch37-insulin-antidiabetics-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "糖尿病胰岛素治疗的适应证是什么？",
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
        "糖尿病胰岛素治疗的适应证主要有：①1型糖尿病；②糖尿病酮症酸中毒、高渗性昏迷和乳酸性酸中毒的高血糖；③合并重症感染、消耗性疾病、视网膜病变、肾病、神经病变、急性心肌梗死、脑血管意外；④因伴发病需外科治疗的围手术期；⑤妊娠和分娩；⑥2型患者经饮食及口服降糖药治疗未获得良好控制；⑦全胰腺切除引起的继发性糖尿病。",
        "胰岛素是治疗1型糖尿病和合并各种急性或严重并发症的糖尿病的重要药物，2型糖尿病经饮食及口服降糖药控制不佳者也需使用。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 5 组共 13 小题，完整组超出剩余预算，未取样，导出空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
