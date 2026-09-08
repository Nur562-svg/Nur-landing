import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第13章 全身麻醉药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：0 题（本章原书无填空题）
 * - 选择题（a1-single）：1 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、选择题（A1 型 6 + A2 型 1 + B1 型 1 组共 2 小题）
 *   与简答题 2，无填空题；本文件按 5 道预算在原书顺序内取材（term 1、a1 1、short 1、
 *   B1 完整组 2 成员）。A1 型正确项对齐章末参考答案键号（1.D），B1 成员对齐键号
 *   （8.C、9.E）；选项已随机重排并同步 correctChoiceIndex。A2 型病例题（第 7 题）及
 *   简答第 2 题因预算未纳入。OCR 错字与符号已按药理学医学语义恢复
 *   （如 葯→药、硫贲妥钠→硫喷妥钠、依托味酯→依托咪酯、恩氣烷→恩氟烷），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch13-general-anesthetics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第13章 全身麻醉药 习题（核对PDF 第83–86页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch13-general-anesthetics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：最小肺泡浓度",
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
        "最小肺泡浓度",
        "是指在常压（一个大气压）下，能使50%患者痛觉消失的肺泡气体中全麻药的浓度，是评价吸入性麻醉药麻醉强度的指标。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章原书无填空题 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch13-general-anesthetics-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "吸入性麻醉由第二期（兴奋期）转入第三期（外科麻醉期）的主要标志是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "意识完全消失",
      "痛觉消失",
      "各种反射消失",
      "呼吸由不规则变为规则",
      "血压降低，心率加快",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呼吸由不规则变为规则",
        "吸入性麻醉药在第二期（兴奋期）转入第三期（外科麻醉期）时，呼吸由不规则变为规则，是进入外科麻醉期的主要标志。原书 A1 型题第 1 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch13-general-anesthetics-short001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "列举至少三个常用的吸入性麻醉药和三个常用的静脉麻醉药物。",
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
        "（1）吸入性麻醉药：乙醚、氟烷、恩氟烷、异氟烷、地氟烷、七氟烷和氧化亚氮等（列举其中三个即可）；（2）静脉麻醉药：硫喷妥钠、氯胺酮、丙泊酚、依托咪酯、咪达唑仑和右美托咪定等（列举其中三个即可）。",
        "吸入性麻醉药经气道吸入给药，常用者有乙醚、氟烷、恩氟烷、异氟烷、氧化亚氮等；静脉麻醉药经静脉注射给药，常用者有硫喷妥钠、氯胺酮、丙泊酚、依托咪酯等。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书第 8～9 题组） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch13-general-anesthetics-b001",
    order: 4,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["丙泊酚", "苯二氮䓬类", "氯胺酮", "芬太尼", "异氟烷"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-pharmacology-ch13-general-anesthetics-b001m1",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能产生明显的分离麻醉作用的麻醉药物是",
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
            "氯胺酮",
            "氯胺酮可产生意识模糊、短暂性记忆缺失及明显的分离麻醉作用，常用于短时体表小手术。原书 B1 型题第 8 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch13-general-anesthetics-b001m2",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "不属于静脉麻醉药的是",
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
            "异氟烷",
            "异氟烷为吸入性麻醉药，不属于静脉麻醉药；丙泊酚、氯胺酮、芬太尼等均为静脉麻醉用药。原书 B1 型题第 9 题，参考答案键号 E。",
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
