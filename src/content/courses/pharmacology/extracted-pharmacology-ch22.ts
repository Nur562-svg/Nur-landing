import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第22章 抗心律失常药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：3 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：4 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：5 题（含简答、论述）
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：22 题（须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、填空题 9、选择题（A1 型 29 + A2 型 3 + B1 型 1 组共 5 小题）
 *   与简答/论述题 11；本文件按 22 道预算在原书顺序内取材：名词解释全取、填空题取第 1–5 题、
 *   A1 型题取第 1–4 题、简答题取第 1–5 题、B1 取完整组（33–37 题）。参考答案键号自 1–37
 *   连续编号，其中键号 24.A–29.B 散落于 A2/B1 标题区内，已按题号与药理学医学语义归位至
 *   A1 型题第 24–29 题；键号 32.D 归位至 A2 型题第 32 题；B1 键号 33.A–37.E 对应
 *   33–37 题。B1 题干中 Ⅱ/Ⅲ/Ⅳ 类罗马数字被 OCR 误读（“1类”“頂类”“I类”），按药理学
 *   医学语义恢复为 II 类（普萘洛尔）、III 类（胺碘酮）、IV 类（维拉帕米）。A1/A2/B1 按项目
 *   规约映射为 a1-single/b1，正确项对齐章末参考答案键号（A1 型题 1.C、2.D、3.B、4.D；
 *   B1 型题 33.A、34.B、35.C、36.D、37.E），选项已随机重排并同步 correctChoiceIndex。
 *   OCR 错字已按医学语义恢复（如 阝受体→β受体、葯→药、晋萘洛尔→普萘洛尔、
 *   普肯野/浦氏纤维统一为浦肯野纤维、诚慢→减慢 等），数值与离子符号
 *   （Na⁺、K⁺、Ca²⁺、APD、ERP、Q-T 间期等）按原义保留，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch22-antiarrhythmics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第22章 抗心律失常药 习题（核对PDF 第138–147页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：折返",
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
        "折返",
        "指一次冲动下传后，又可顺着另一环路折回再次兴奋原已兴奋过的心肌。折返激动是心律失常发生的主要机制。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：早后除极",
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
        "早后除极",
        "在心肌细胞复极早期发生的振荡性除极，多发生在动作电位的第 2 或第 3 相，可引发触发活动。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：迟后除极",
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
        "迟后除极",
        "发生在心肌细胞完全复极后的振荡性除极，多发生在动作电位的第 4 相，可引发触发活动。原书名词解释第 3 题。",
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
    id: "ext-pharmacology-ch22-antiarrhythmics-fill001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "后除极有___和___两种类型。",
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
        "早后除极；迟后除极",
        "后除极分早后除极（发生在复极早期，即动作电位第 2 或第 3 相）与迟后除极（发生在完全复极后，即动作电位第 4 相）两种类型，均可引发触发活动。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-fill002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "降低自律性的四种方式是___、___、___和___。",
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
        "降低动作电位4相斜率；提高动作电位的发生阈值；增加静息膜电位绝对值；延长动作电位时程",
        "抗心律失常药可通过降低动作电位 4 相斜率、提高动作电位的发生阈值、增加静息膜电位绝对值、延长动作电位时程等方式降低异常自律性。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-fill003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "___类抗心律失常药有___和___。",
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
        "Ib；利多卡因；苯妥英钠",
        "Ib 类抗心律失常药轻度阻滞钠通道，轻度减慢动作电位 0 相上升速率，降低自律性，缩短或不影响动作电位时程，代表药有利多卡因、苯妥英钠。原书填空题第 3 题答案（题干首空 OCR 仅余“类”字，按参考答案恢复为“Ib 类”）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-fill004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "因为奎尼丁具有___作用，故其治疗心房纤颤常与___合用，以防止___过快。",
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
        "抗胆碱；地高辛；心室率",
        "奎尼丁具有抗胆碱作用，可加快房室传导，使心房纤颤时心室率过快，故常与抑制房室传导的地高辛（强心苷）合用，以防止心室率过快。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-fill005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "急性心肌梗死引起的室性心律失常可用___和___。",
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
        "利多卡因；苯妥英钠",
        "利多卡因和苯妥英钠均属 Ib 类抗心律失常药，主要用于室性心律失常，对急性心肌梗死、心脏手术、麻醉、电复律等引发的室性心律失常有效，利多卡因是急性心肌梗死并发快速型室性心律失常的首选药。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-a1001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "治疗窦性心动过速首选",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["利多卡因", "普萘洛尔", "奎尼丁", "氟卡尼", "苯妥英钠"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "普萘洛尔",
        "普萘洛尔阻断心脏 β 受体，减慢 4 相舒张期除极速率，降低窦房结自律性、减慢心率，是窦性心动过速的首选药。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-a1002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "强心苷中毒所致的快速型心律失常的最佳治疗药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["阿托品", "奎尼丁", "苯妥英钠", "普罗帕酮", "胺碘酮"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "苯妥英钠",
        "苯妥英钠作用类似利多卡因，仅对希-浦系统发生影响，且能增加房室结 0 相除极速率、加快传导，可对抗强心苷中毒所致房室传导阻滞，是强心苷中毒所致快速型心律失常的最佳治疗药物。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-a1003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "阵发性室上性心动过速首选",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["阿托品", "普罗帕酮", "维拉帕米", "奎尼丁", "利多卡因"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "维拉帕米",
        "维拉帕米为阵发性室上性心动过速的首选药：阻滞 Ca²⁺ 通道、抑制慢反应细胞（窦房结、房室结）舒张期除极，降低其自律性、减慢传导并延长有效不应期。原书 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-a1004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "急性心肌梗死引发的室性心动过速首选",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["地高辛", "利多卡因", "维拉帕米", "奎尼丁", "普罗帕酮"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "利多卡因",
        "利多卡因抑制 Na⁺ 内流、促进 K⁺ 外流，仅对希-浦系统有作用，降低浦肯野纤维自律性，主要用于室性心律失常，是急性心肌梗死及各种心脏病并发快速型室性心律失常的首选药。原书 A1 型题第 4 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-short001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述抗心律失常药降低心肌细胞自律性的作用机制。",
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
        "降低动作电位4相斜率；提高动作电位的发生阈值；增加静息膜电位绝对值；延长动作电位时程",
        "抗心律失常药可通过降低动作电位 4 相斜率、提高动作电位的发生阈值、增加静息膜电位绝对值、延长动作电位时程等方式降低异常自律性。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-short002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "第I类抗心律失常药分为三个亚类的药理依据。",
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
        "依据对钠通道阻滞程度（钠通道恢复时间常数）不同分为 Ia、Ib、Ic 三个亚类",
        "I 类抗心律失常药都阻断 Na⁺ 通道，但它们阻断 Na⁺ 通道的程度不同：①Ia 类（T 恢复 1～10s）适度阻滞钠通道，降低动作电位 0 期除极速率，不同程度抑制心肌细胞膜 K⁺、Ca²⁺ 通透性，延长复极过程，且以延长有效不应期更为显著，代表药有奎尼丁、普鲁卡因胺等；②Ib 类（T 恢复＜1s）轻度阻滞钠通道，轻度降低动作电位 0 期除极速率，降低自律性，缩短或不影响动作电位时程，代表药有利多卡因、苯妥英钠等；③Ic 类（T 恢复＞10s）明显阻滞钠通道，显著降低动作电位 0 期除极速率及幅度，减慢传导作用最为明显，代表药有普罗帕酮、氟卡尼等。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-short003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述奎尼丁的药理作用。",
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
        "阻滞 Na⁺ 及多种 K⁺ 通道；抗胆碱及拮抗外周血管 α 受体；减少 Ca²⁺ 内流致负性肌力",
        "奎尼丁的药理作用：①低浓度时即可阻滞 INa、IKr，较高浓度尚可阻滞 IKs、IK1、IKAch 及 ICa(L)；②具有明显的抗胆碱作用和拮抗外周血管 α 受体作用；③阻滞激活状态的钠通道并使通道复活减慢，显著抑制异位起搏和除极化组织的兴奋性和传导性，延长除极化组织的不应期；④阻滞多种钾通道，延长心房、心室和浦肯野细胞的动作电位时程；⑤减少 Ca²⁺ 内流，具有负性肌力作用。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-short004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述奎尼丁的临床应用。",
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
        "广谱抗心律失常药：房颤、房扑、室上性及室性心动过速的转复和预防；频发室上性及室性早搏",
        "奎尼丁为广谱抗心律失常药，适用于心房纤颤、心房扑动、室上性和室性心动过速的转复和预防，还用于频发室上性和室性早搏的治疗，并可用于心房纤颤和心房扑动转律后防止复发。原书简答题第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch22-antiarrhythmics-short005",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述利多卡因治疗室性心律失常的作用基础。",
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
        "对除极化组织（缺血区）作用强；缩短或不影响浦肯野纤维和心室肌 APD；降低自律性",
        "利多卡因阻滞钠通道的激活状态和失活状态，通道恢复至静息态时阻滞作用迅速解除，因此利多卡因对除极化组织（如缺血区）作用强，对缺血或强心苷中毒所致的除极化型心律失常抑制作用较强。心房肌细胞动作电位时程短、钠通道失活态时间短，利多卡因作用弱，故对房性心律失常疗效差。利多卡因抑制参与复极 2 期的少量钠内流，缩短或不影响浦肯野纤维和心室肌的动作电位时程；能减小 4 期去极斜率，提高兴奋阈值，降低自律性。原书简答题第 5 题。",
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
    id: "ext-pharmacology-ch22-antiarrhythmics-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "胺碘酮",
      "普萘洛尔",
      "维拉帕米",
      "利多卡因",
      "奎尼丁",
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
        id: "ext-pharmacology-ch22-antiarrhythmics-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于Ia类抗心律失常药的是",
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
            "奎尼丁",
            "奎尼丁适度阻滞钠通道，属 Ia 类抗心律失常药（Ia 类代表药还有普鲁卡因胺等）。原书 B1 型题第 33 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch22-antiarrhythmics-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于Ib类抗心律失常药的是",
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
            "利多卡因",
            "利多卡因轻度阻滞钠通道，属 Ib 类抗心律失常药（Ib 类代表药还有苯妥英钠等）。原书 B1 型题第 34 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch22-antiarrhythmics-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于II类抗心律失常药的是",
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
            "普萘洛尔",
            "II 类为 β 肾上腺素受体拮抗药，代表药为普萘洛尔等。原题题干 OCR 误读为“1类”，按药理学医学语义恢复为“II 类”。原书 B1 型题第 35 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch22-antiarrhythmics-b001m4",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于III类抗心律失常药的是",
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
            "胺碘酮",
            "III 类为延长动作电位时程药，抑制多种钾电流，延长动作电位时程和有效不应期，代表药为胺碘酮等。原题题干 OCR 误读为“頂类”，按药理学医学语义恢复为“III 类”。原书 B1 型题第 36 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch22-antiarrhythmics-b001m5",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于IV类抗心律失常药的是",
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
            "维拉帕米",
            "IV 类为钙通道阻滞药，抑制 Ca²⁺ 内流，降低窦房结自律性、减慢房室结传导性，代表药为维拉帕米和地尔硫䓬。原题题干 OCR 误读为“I类”，按药理学医学语义恢复为“IV 类”。原书 B1 型题第 37 题，参考答案键号 E。",
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
