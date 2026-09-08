import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第30章 影响自体活性物质的药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：1 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题；本章取样为 A1 型）
 * - 问答题（short-answer）：2 题（本章为简答题，无论述题）
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、填空题 2、选择题（A1 型 8 + A2 型 4 + B1 型 1 组
 *   共 4 小题）与简答题 2，无论述题。本文件按 9 道预算取材：简答 2 全取、B1 全组（13～16 题，
 *   共 4 成员），剩余 3 题在名词解释（3 源）、填空（2 源）与选择（12 源）间平衡取材，
 *   各取原书首题，保证五种题型均有覆盖。正确项对齐章末参考答案键号（A1 型题 1.E、
 *   A2 型题 9.D、10.C、11.C、12.C；B1 型题 13.A、14.B、15.D、16.C；本文件 A1 型题取第 1 题）。
 *   A1 型题第 4 题题干 OCR「可选择性阻断血小板活化因子受体」按药理学医学语义恢复为
 *   「可选择性阻断 5-HT2 受体」（赛庚啶为选择性 5-HT2 受体拮抗药，并可阻断 H1 受体，
 *   用于预防偏头痛发作及治疗荨麻疹等皮肤黏膜过敏性疾病）；B1 型题第 14 题题干 OCR
 *   「最强的抗凝血药」按医学语义恢复为「最强的血小板聚集抑制药」（依前列醇/PGI2 为
 *   作用最强的血小板聚集抑制药）。OCR 错字已恢复（PGI，→PGI₂、TXA，→TXA₂、PGF2。→PGF₂α、
 *   H，受体→H₁ 受体、H，受体→H₂ 受体、P4s0→P450 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch30-autacoids";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第30章 影响自体活性物质的药物 习题（核对PDF 第205–211页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch30-autacoids-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：自体活性物质",
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
        "自体活性物质",
        "又称局部激素，以旁分泌方式到达邻近部位发挥作用，而不进入血液循环。这些不同种类的自体活性物质，包括前列腺素、组胺、5-羟色胺、白三烯和血管活性肽类（如 P 物质、激肽类、血管紧张素、利尿钠肽、血管活性肠肽、降钙素基因相关肽、神经肽Y和内皮素等）以及一氧化氮和腺苷等，具有不同的结构和药理学活性，广泛存在于体内多组织中。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch30-autacoids-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "PGI2 具有___血小板聚集作用。",
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
        "抑制",
        "对血小板，PGE1 和 PGI2 抑制血小板聚集，而 TXA2 则有强烈促聚集作用。原书填空题第 1 题答案。",
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
    id: "ext-pharmacology-ch30-autacoids-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "自体活性物质不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["组胺", "可的松", "前列腺素", "白三烯", "5-羟色胺"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "可的松",
        "自体活性物质包括前列腺素、组胺、5-羟色胺、白三烯等；可的松为肾上腺皮质激素类药物，不属于自体活性物质。原书 A1 型题第 1 题，参考答案键号 E。",
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
    id: "ext-pharmacology-ch30-autacoids-short001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述内皮素的生物学作用。",
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
        "①收缩血管作用：ET 在体内外均可产生强而持久的血管收缩作用，是至今发现的最强的缩血管物质，其收缩血管作用可能与心肌缺血、心肌梗死、脑缺血、脑卒中及肾衰竭等心、脑血管疾病有关；②促进平滑肌细胞分裂：促进血管平滑肌细胞 DNA 的合成和有丝分裂，使血管平滑肌增殖，促进动脉粥样硬化的发生；③收缩内脏平滑肌：对支气管、消化道、泌尿生殖道等多种内脏平滑肌有强大收缩作用，与支气管哮喘有密切关系；④正性肌力作用：增强心脏（心房肌、心室肌）收缩力，作用强大而持久，使心肌耗氧量增高，加重心肌缺血。",
        "内皮素（endothelins, ETs）通过其受体发挥上述生物学作用，内皮素拮抗药包括内皮素受体拮抗药和内皮素转化酶抑制剂。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch30-autacoids-short002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述5-羟色胺受体拮抗剂的分类、药理作用及临床应用。",
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
        "①赛庚啶和苯噻啶：均选择性阻断 5-HT2 受体，并可阻断组胺 H1 受体、具有较弱的抗胆碱作用，可用于预防偏头痛发作及治疗荨麻疹等皮肤黏膜过敏性疾病；不良反应有口干、嗜睡等，青光眼、前列腺肥大及尿闭患者忌用。②昂丹司琼：选择性阻断 5-HT3 受体，具有强大的镇吐作用，主要用于癌症病人手术和化疗伴发的严重恶心、呕吐。③麦角生物碱类 5-HT 拮抗药：除阻断 5-HT 受体外，还可作用于 α 肾上腺素能受体和多巴胺受体，按化学结构分两类：胺生物碱（美西麦角，5-HT2 受体拮抗药，用于偏头痛的预防治疗，机制可能与抑制血小板聚集、减少花生四烯酸释放、减轻炎症反应有关）；肽生物碱（麦角胺能明显收缩血管、减轻动脉搏动，可显著缓解偏头痛，用于偏头痛的诊断和治疗）。",
        "5-羟色胺（5-HT）又名血清素，主要分布于松果体和下丘脑，可能参与痛觉、睡眠、体温等生理功能的调节。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（原书 13～16 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch30-autacoids-b001",
    order: 6,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["米索前列醇", "白三烯", "前列地尔", "依前列醇", "卡前列素"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-pharmacology-ch30-autacoids-b001m1",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "临床用于诊断和治疗阳痿的药物是",
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
            "前列地尔",
            "前列地尔（PGE1）可海绵体内注射用于诊断和治疗勃起功能障碍（阳痿）。原书 B1 型题第 13 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch30-autacoids-b001m2",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "最强的血小板聚集抑制药是",
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
            "依前列醇",
            "依前列醇（人工合成的 PGI2）抑制 ADP、胶原纤维、花生四烯酸等诱导的血小板聚集和释放，是作用最强的血小板聚集抑制药（原题 OCR「最强的抗凝血药」按医学语义恢复为「最强的血小板聚集抑制药」）。原书 B1 型题第 14 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch30-autacoids-b001m3",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "治疗溃疡、防治溃疡复发的是",
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
            "米索前列醇",
            "米索前列醇为 PGE1 衍生物，抑制胃酸分泌并保护胃黏膜，用于消化性溃疡的治疗及防治溃疡复发。原书 B1 型题第 15 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch30-autacoids-b001m4",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要用于终止妊娠和宫缩无力导致的产后顽固性出血的是",
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
            "卡前列素",
            "卡前列素（PGF2α 类）可强烈兴奋子宫平滑肌，主要用于终止妊娠及宫缩无力导致的产后顽固性出血。原书 B1 型题第 16 题，参考答案键号 C。",
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
