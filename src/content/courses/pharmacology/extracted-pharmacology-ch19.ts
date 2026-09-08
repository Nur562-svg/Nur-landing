import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第19章 镇痛药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：2 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 3、选择题（A1 型 14 + A2 型 3 + B1 型 2 组
 *   各 2 小题）与简答题 2、论述题 1；本文件按 10 道预算在原书顺序内取材。名词解释全取 2，
 *   填空题全取 3，选择题取 A1 型前 2 道（映射为 a1-single），问答题取简答题第 1 道，
 *   B1 型取第 1 组（18～19 题共用备选答案）完整 2 成员。正确项对齐章末参考答案键号
 *   （A1 型题 1.D/2.A、B1 型题 18.C/19.B），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复（如 码啡/巴啡/玛啡→吗啡、
 *   葯→药、孤東核→孤束核、K/6/H 受体→κ/μ 受体、CO2、奥狄括约肌、阿片受体部分
 *   激动药等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch19-analgesics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第19章 镇痛药 习题（核对PDF 第117–124页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch19-analgesics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：镇痛药",
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
        "作用于中枢神经系统特定部位，在不影响患者意识状态下选择性地解除或减轻疼痛，并同时缓解疼痛引起的不愉快情绪的药物。",
        "镇痛药通过激动中枢神经系统特定部位的阿片受体而产生镇痛作用，因易产生药物依赖性或成瘾性、易导致药物滥用及停药戒断症状，故又称阿片类镇痛药（麻醉性镇痛药、成瘾性镇痛药）。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch19-analgesics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：耐受性",
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
        "长期用药后中枢神经系统对药物敏感性降低，需要增加剂量才能达到原有药效的现象。",
        "阿片类药物长期应用后易产生耐受性；与此相关的是依赖性，可分为身体依赖性和精神依赖性，这是本类药易导致药物滥用及停药戒断症状的原因。原书名词解释第 2 题。",
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
    id: "ext-pharmacology-ch19-analgesics-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "镇痛药中镇痛作用最强的是___，非麻醉性镇痛药是___。",
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
        "二氢埃托啡；喷他佐辛",
        "二氢埃托啡镇痛作用强；喷他佐辛为阿片受体部分激动药，成瘾性小，在药政管理上已列入非麻醉品，适用于各种慢性疼痛。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch19-analgesics-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "喷他佐辛激动___受体，拮抗___受体。",
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
        "κ受体；μ受体",
        "喷他佐辛为阿片受体部分激动药（激动-拮抗药），主要激动 κ 受体、拮抗 μ 受体，与本章重点内容表“激动κ受体、拮抗μ受体”一致；参考答案键号 OCR 记为 K、δ、H，按药理学医学语义归位为 κ、μ。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch19-analgesics-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "___常与___、异丙嗪组成冬眠合剂。",
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
        "哌替啶；氯丙嗪",
        "哌替啶、氯丙嗪与异丙嗪组成冬眠合剂，用于“人工冬眠”（配合物理降温降低体温、基础代谢及组织耗氧量）。原书填空题第 3 题答案。",
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
    id: "ext-pharmacology-ch19-analgesics-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "心源性哮喘应选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["异丙肾上腺素", "氢化可的松", "麻黄碱", "哌替啶", "肾上腺素"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "哌替啶",
        "哌替啶可治疗心源性哮喘，机制与吗啡类似：镇静作用消除焦虑、恐惧情绪，扩张外周血管降低外周阻力和心脏负荷，降低呼吸中枢对 CO2 的敏感性缓解急促表浅的呼吸；哌替啶成瘾性较吗啡弱且无明显便秘。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch19-analgesics-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "吗啡的药理作用有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "镇痛、止泻、缩血管",
      "镇痛、呼吸兴奋",
      "镇痛、镇静、镇咳",
      "镇痛、镇静、散瞳",
      "镇痛、镇静、抗震颤麻痹",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "镇痛、镇静、镇咳",
        "吗啡具有强大的镇痛、镇静作用，并直接抑制咳嗽中枢产生镇咳作用；对瞳孔呈缩瞳（中毒时针尖样瞳孔为其特征），抑制呼吸而非兴奋，止泻作用源于胃肠道平滑肌张力升高、蠕动减弱（而非缩血管）。原书 A1 型题第 2 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch19-analgesics-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述镇痛药的分类及其代表药。",
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
        "①阿片受体激动药：如吗啡（及相关药物哌替啶、美沙酮、芬太尼等）；②阿片受体部分激动药（激动-拮抗药）：如喷他佐辛（布托啡诺、丁丙诺啡、纳布啡等）；③其他镇痛药：如曲马多、罗通定等。",
        "镇痛药按作用机制分为阿片受体激动药、阿片受体部分激动药（混合型激动-拮抗剂）和其他镇痛药三类；阿片受体拮抗药纳洛酮不属于镇痛药。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch19-analgesics-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "边缘系统及蓝斑核",
      "延脑的孤束核",
      "脑干极后区",
      "中脑盖前核",
      "丘脑内侧、脑室及导水管周围灰质",
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
        id: "ext-pharmacology-ch19-analgesics-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与吗啡缩瞳作用有关的阿片受体位于",
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
            "中脑盖前核",
            "吗啡兴奋支配瞳孔的副交感神经引起缩瞳，中毒时呈针尖样瞳孔为其特征，缩瞳作用与中脑盖前核的阿片受体有关。原书 B1 型题第 18 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch19-analgesics-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与情绪、精神活动有关的阿片受体位于",
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
            "边缘系统及蓝斑核",
            "吗啡激动边缘系统和蓝斑核的阿片受体，可改善疼痛引起的焦虑、紧张、恐惧等情绪反应，并可伴有欣快感。原书 B1 型题第 19 题，参考答案键号 B。",
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
