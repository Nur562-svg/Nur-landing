import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第23章 作用于肾素-血管紧张素系统的药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释题，termItems 为空数组）
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 3、选择题（A1 型 12 + A2 型 3 + B1 型 2 组共 8 小题）与
 *   简答题 4，无名词解释题。本文件按 9 道预算取材：填空题全取、A1 型题取第 1 题、简答题取
 *   第 1 题、B1 取第一组完整组（16–19 题）；未取材：A1 第 2–12 题、A2 第 13–15 题、
 *   简答第 2–4 题、B1 第二组（20–23 题，预算所限）。参考答案键号自 1–23 连续编号，
 *   A2 型题第 15 题键号 15.A 在参考答案中散落于 B1 区，已按题号与药理学医学语义归位；
 *   B1 第一组键号 16.E、17.A、18.B、19.C 对应该组 16–19 题。B1 第二组（20–23 题）选项 C
 *   “减少血管紧张素I的生成”按药理学医学语义判断应为“减少血管紧张素Ⅱ的生成”
 *   （卡托普利为 ACE 抑制药，减少 AngⅡ 生成而非 AngⅠ 生成；本组未取材，仅供后续核对）。
 *   正确项对齐章末参考答案键号（A1 型题 1.D；B1 型题 16.E、17.A、18.B、19.C），选项已
 *   随机重排并同步 correctChoiceIndex。OCR 错字已按医学语义恢复
 *   （如 葯→药、阿列吉伦→阿利吉仑、2n2+/Zn²⁺、血管紧张素1→血管紧张素Ⅰ、
 *   血管紧张素11→血管紧张素Ⅱ、ATI→AT₁ 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch23-renin-angiotensin-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第23章 作用于肾素-血管紧张素系统的药物 习题（核对PDF 第148–152页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）：本章原书无名词解释题，导出空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch23-renin-angiotensin-drugs-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "许多 ACE 抑制药为前药，如___和___等，必须在体内经过转化才能起作用。",
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
        "依那普利；福辛普利",
        "依那普利含羧基酯（-COOCH₃），必须在体内转化为依那普利酸（-COOH）才能与 Zn²⁺ 结合发挥作用；福辛普利含磷酸酯（-POOR），须转化为福辛普利酸（-POOH）才起作用。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch23-renin-angiotensin-drugs-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "血管紧张素原由肾素转化成十肽的___，后者经血管紧张素转化酶切去两个肽转化为___，其作用于___受体，产生收缩血管、促进肾上腺皮质释放醛固酮、增加血容量、升高血压等作用。",
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
        "血管紧张素Ⅰ；血管紧张素Ⅱ；AT₁受体",
        "肾素将血管紧张素原转化为十肽的血管紧张素Ⅰ（AngⅠ），后者经血管紧张素转化酶（ACE）切去两个肽转化为血管紧张素Ⅱ（AngⅡ）；AngⅡ 作用于 AT₁ 受体，产生收缩血管、促进肾上腺皮质释放醛固酮、增加血容量、升高血压等作用。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch23-renin-angiotensin-drugs-fill003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "卡托普利及其他多种 ACE 抑制药被迫停药的主要原因是产生了___的不良反应，可能与___在体内蓄积有关。",
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
        "咳嗽；缓激肽",
        "ACE 抑制药在抑制 AngⅠ 转化的同时使缓激肽降解减少、在体内蓄积，引起刺激性干咳，是卡托普利及其他多种 ACE 抑制药被迫停药的主要原因。原书填空题第 3 题答案。",
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
    id: "ext-pharmacology-ch23-renin-angiotensin-drugs-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可特异地抑制肾素-血管紧张素转化酶的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["利血平", "卡托普利", "氢氯噻嗪", "可乐定", "美卡拉明"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "卡托普利",
        "卡托普利是含巯基（-SH）的血管紧张素转化酶抑制药（ACEI），可特异性地抑制 ACE、减少血管紧张素Ⅱ生成，是第一个用于临床口服有效的 ACE 抑制药。原书 A1 型题第 1 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch23-renin-angiotensin-drugs-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 ACEI 的基本药理作用。",
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
        "阻止AngⅡ生成；保存缓激肽活性；保护血管内皮细胞；抗心肌缺血与心肌保护；增敏胰岛素受体；阻止心血管病理性重构",
        "ACEI 的基本药理作用包括：①阻止 AngⅡ 的生成；②保存缓激肽的活性；③保护血管内皮细胞；④抗心肌缺血与心肌保护；⑤增敏胰岛素受体；⑥阻止心血管病理性重构。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（原书 16～19 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch23-renin-angiotensin-drugs-b001",
    order: 6,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "辛伐他汀",
      "阿利吉仑",
      "卡托普利",
      "氨氯地平",
      "缬沙坦",
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
        id: "ext-pharmacology-ch23-renin-angiotensin-drugs-b001m1",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于肾素抑制药的是",
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
            "阿利吉仑",
            "阿利吉仑是口服有效的低分子量非肽类肾素抑制药，结合肾素并阻止血管紧张素原转化为血管紧张素Ⅰ，从而抑制血浆肾素活性。原书 B1 型题第 16 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch23-renin-angiotensin-drugs-b001m2",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于 ACEI 的是",
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
            "卡托普利",
            "卡托普利为含巯基的血管紧张素转化酶抑制药（ACEI），用于高血压、充血性心力衰竭及糖尿病性肾病等的治疗。原书 B1 型题第 17 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch23-renin-angiotensin-drugs-b001m3",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于 ARB 的是",
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
            "缬沙坦",
            "缬沙坦为血管紧张素Ⅱ受体（AT₁ 受体）拮抗药（ARB），对 AT₁ 受体有选择性阻断作用，用于抗高血压治疗。原书 B1 型题第 18 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch23-renin-angiotensin-drugs-b001m4",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于钙拮抗剂的是",
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
            "氨氯地平",
            "氨氯地平为二氢吡啶类钙通道阻滞药（钙拮抗剂），长效、半衰期长，用于高血压和心绞痛的治疗。原书 B1 型题第 19 题，参考答案键号 C。",
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
