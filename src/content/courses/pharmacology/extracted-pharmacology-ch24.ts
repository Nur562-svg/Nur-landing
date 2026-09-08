import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第24章 利尿药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：5 题
 * - 填空题（fill）：7 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：3 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书无 B1 型题，bGroups 为空数组）
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 7、选择题（A1 型 21 + A2 型 8）与简答题 5，
 *   无 B1 配伍题。本文件按 16 道预算在原书顺序内取材：名词解释全取、填空题全取、
 *   A1 型题取第 1 题、简答题取第 1–3 题；未取材：A1 第 2–21 题、A2 第 22–29 题、
 *   简答第 4–5 题（预算所限）。参考答案中 A1 型题 1–21 与 A2 型题 22–29 分别独立编号；
 *   本文件 A1 型题第 1 题参考答案键号 B。A1/A2 按项目规约映射为 a1-single，正确项对齐
 *   章末参考答案键号，选项已随机重排并同步 correctChoiceIndex。OCR 错字与双栏错序已按
 *   药理学医学语义恢复（如 葯→药、味塞米→呋塞米、螺肉酯→螺内酯、氨苯蠂啶→氨苯蝶啶、
 *   吲哒帕胺→吲达帕胺、Na*K*2OT→Na⁺-K⁺-2Cl⁻、Ca2*→Ca²⁺ 等），填空题第 3、5、6、7 题
 *   题干空数按参考答案补足，数值（150～200ml、20个/HP、50ml 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch24-diuretics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第24章 利尿药 习题（核对PDF 第153–160页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch24-diuretics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：醛固酮拮抗药",
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
        "醛固酮拮抗药",
        "指人工合成的化学结构与醛固酮相似，具有拮抗醛固酮作用的药物，如螺内酯、依普利酮。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：保钾性利尿药",
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
        "保钾性利尿药",
        "指竞争性拮抗醛固酮（如螺内酯）或直接作用于远曲小管和集合管使 K⁺/Na⁺ 交换减少（如氨苯蝶啶）而产生利尿作用，长期服用可引起高血钾的药物。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：袢利尿药",
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
        "袢利尿药",
        "即高效能利尿药，主要作用部位在髓袢升支粗段，选择性地抑制 NaCl 的重吸收，作用强大，故又称袢利尿药，代表药为呋塞米。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：渗透性利尿药或脱水药",
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
        "渗透性利尿药或脱水药",
        "指一类经注射给药后，可以提高血浆渗透压，产生组织脱水作用的药物。这些药物不易通过毛细血管进入组织，当这些药物通过肾脏时易经肾小球滤过而不易被肾小管再吸收，从而增加水和部分离子的排出，产生渗透性利尿作用。原书名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：噻嗪类利尿药",
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
        "噻嗪类利尿药",
        "作用于远曲小管近端，抑制远曲小管近端 Na⁺-Cl⁻ 共转运子，抑制 NaCl 的重吸收。由于转运至远曲小管的 Na⁺ 增加，促进了 K⁺-Na⁺ 交换，增强 NaCl 和水的排出，产生温和持久的利尿作用。噻嗪类是临床广泛应用的一类口服利尿药和降压药。原书名词解释第 5 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），7 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch24-diuretics-fill001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "袢利尿药有___、___和___，它们利尿作用的部位是___。",
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
        "呋塞米；依他尼酸；布美他尼；髓袢升支粗段皮质部和髓质部",
        "袢利尿药又称高效能利尿药，主要包括呋塞米、依他尼酸、布美他尼，均作用于髓袢升支粗段（皮质部和髓质部），抑制 Na⁺-K⁺-2Cl⁻ 共同转运子。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-fill002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "具有保钾作用的利尿药是___、___、___和___。",
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
        "螺内酯；依普利酮；氨苯蝶啶；阿米洛利",
        "保钾利尿药包括醛固酮受体拮抗药（螺内酯、依普利酮）与肾小管上皮细胞 Na⁺ 通道抑制药（氨苯蝶啶、阿米洛利），均主要作用于远曲小管远端和集合管。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-fill003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "噻嗪类利尿药作用于___，通过抑制___而利尿。",
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
        "髓袢升支粗段皮质部和远曲小管近端；Na⁺-Cl⁻ 共转运子",
        "参考答案列为“髓袢升支粗段皮质部和远曲小管近端、Na⁺-Cl⁻ 共转运子”；教材正文强调噻嗪类主要作用于远曲小管近端，抑制 Na⁺-Cl⁻ 共转运子。题干空数按参考答案补足。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-fill004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "噻嗪类利尿药主要用于___、___和___。",
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
        "水肿；高血压；尿崩症",
        "噻嗪类利尿药主要用于各种原因引起的水肿、高血压以及肾源性尿崩症（通过排 Na⁺ 使血浆渗透压降低而减轻口渴感）。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-fill005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "临床常用的渗透性利尿药是___、___和___。",
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
        "甘露醇；山梨醇；高渗葡萄糖",
        "渗透性利尿药（脱水药）包括甘露醇、山梨醇、高渗葡萄糖、尿素等，静脉注射后提高血浆渗透压，产生组织脱水和渗透性利尿作用；甘露醇和山梨醇用于治疗脑水肿、降低颅内压及青光眼降低眼内压。原书填空题第 5 题答案（题干空数按参考答案补足）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-fill006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "呋塞米的主要不良反应有___、___和___。",
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
        "水和电解质紊乱；耳毒性；高尿酸血症",
        "呋塞米的不良反应主要有：①水与电解质紊乱（低血容量、低血 K⁺、低血 Na⁺、低钾性碱血症，长期应用还可引起低血 Mg²⁺）；②耳毒性，同时使用其他耳毒性药物（如氨基糖苷类抗生素）时较易发生；③高尿酸血症。原书填空题第 6 题答案（题干空数按参考答案补足）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-fill007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "乙酰唑胺可用于治疗___、___的患者，并可用于___。",
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
        "青光眼；急性高山病；碱化尿液",
        "乙酰唑胺抑制碳酸酐酶活性，减少房水生成、降低眼内压，用于青光眼；还可用于急性高山病，以及碱化尿液以促进尿酸、胱氨酸和弱酸性物质（如阿司匹林）的排泄。原书填空题第 7 题答案（题干空数按参考答案补足）。",
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
    id: "ext-pharmacology-ch24-diuretics-a1001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可加速毒物排泄的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["乙酰唑胺", "呋塞米", "噻嗪类", "甘露醇", "氨苯蝶啶"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呋塞米",
        "呋塞米为高效能利尿药，利尿作用强大，可加速某些毒物（如长效巴比妥类、水杨酸类等弱酸性药物）自尿中排泄，用于药物中毒的抢救；噻嗪类、氨苯蝶啶、乙酰唑胺利尿作用弱，甘露醇为渗透性利尿药，均无加速毒物排泄的突出作用。原书 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch24-diuretics-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试比较螺内酯、氨苯蝶啶作用的异同。",
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
        "相同点：均作用于远曲小管和集合管，抑制 Na⁺-K⁺ 交换，具有保钾作用；单用利尿作用弱，长期服用可致高血钾；临床上常与中效或强效利尿药合用。不同点：螺内酯竞争性对抗醛固酮而呈现保钾排 Na⁺ 作用；氨苯蝶啶则直接抑制 K⁺-Na⁺ 交换；对切除肾上腺的动物，螺内酯无利尿作用，而氨苯蝶啶仍可产生利尿作用。",
        "螺内酯为醛固酮的竞争性拮抗药，其利尿作用与体内醛固酮浓度有关，对切除肾上腺的动物无利尿作用；氨苯蝶啶为肾小管上皮细胞 Na⁺ 通道抑制药，直接阻滞管腔 Na⁺ 通道、减少 Na⁺ 重吸收，抑制 K⁺ 分泌，不依赖醛固酮。二者单用利尿作用均弱，长期服用均可致高血钾，临床常与中效或强效利尿药合用治疗顽固性水肿。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述呋塞米利尿作用的分子机制和临床应用。",
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
        "分子机制：特异性地与 Cl⁻ 结合位点结合，抑制分布在髓袢升支管腔膜侧的 Na⁺-K⁺-2Cl⁻ 共转运子，抑制 NaCl 的重吸收，降低肾的稀释与浓缩功能，排出大量接近等渗的尿液；大剂量也可抑制近曲小管的碳酸酐酶活性，使 HCO₃⁻ 排出增加。临床应用：①急性肺水肿和脑水肿；②心、肝、肾等各类水肿，用于其他利尿药无效的严重水肿病人；③急慢性肾衰竭；④高钙血症；⑤加速某些毒物的排泄等。",
        "呋塞米作用迅速、强大、短暂，抑制髓袢升支粗段上皮细胞管腔侧 Na⁺-K⁺-2Cl⁻ 共同转运子后，此段髓质不能维持高渗，抑制集合管水的重吸收；同时可增加肾血流量、改变肾皮质内血流分布，对血管床有直接扩张作用。临床还用于急性肺水肿（可迅速降低左室充盈压）。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch24-diuretics-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述呋塞米利尿作用特点、作用机制及主要不良反应。",
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
        "特点：利尿作用迅速、强大、维持时间短。机制：特异抑制分布在髓袢升支肾小管上皮细胞管腔侧 Na⁺-K⁺-2Cl⁻ 共同转运子，抑制 NaCl 重吸收，使此段髓质不能维持高渗，尿液流经集合管时水的重吸收减少，排尿增多。主要不良反应：水和电解质紊乱（低血容量、低血 K⁺、低血 Na⁺、低钾性碱血症等）、耳毒性、高尿酸血症及其他如胃肠道反应。",
        "呋塞米抑制髓袢升支粗段 Na⁺-K⁺-2Cl⁻ 共转运子，NaCl 重吸收受阻，髓质高渗不能维持，集合管水的重吸收减少；K⁺、Mg²⁺ 及 Ca²⁺ 的排泄也增加。耳毒性在同时使用氨基糖苷类抗生素等耳毒性药物时更易发生。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题：本章原书无 B1 型题，导出空数组 */
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
