import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第1章 绪论 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：1 题（含 A2 病例题 0 题、A3/A4 病例串题 0 题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - 病例分析题（case）：0 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：2 题（须等于本文件预算 2）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 4、简答题 5，无 A2/A3/A4/B1/病例分析题型。
 *   本文件按 2 道预算在原书顺序内取材：A1 取第 1 题、简答取第 1 题。正确项逐一对齐
 *   章末参考答案键号。OCR 错字已按神经病学医学语义恢复（如 定向诊迷→定向诊断、
 *   行和认知→行为和认知、MIIDNIGHTS→MIDNIGHTS 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch01-introduction";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第1章 绪论 习题（核对PDF 第6–8页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch01-introduction-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列都是神经病学的总体目标，除外",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "发展神经科学",
      "提高对疾病的认识水平",
      "及时对疾病进行合理的诊断",
      "尽可能恰当地对症治疗",
      "提高治愈率，降低死亡率和致残率",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尽可能恰当地对症治疗",
        "神经病学的总体目标是：发展神经科学，提高对疾病的认识水平，及时对疾病进行合理的诊断，同时尽可能针对病因恰当治疗，提高治愈率，降低死亡率和致残率；而非“对症治疗”。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题/论述题（统一映射为 short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch01-introduction-short001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是神经病学？",
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
        "神经病学（neurology）是研究神经系统疾病和骨骼肌疾病病因、发病机制、临床表现、诊断和鉴别诊断、预防和治疗以及康复等内容的一门临床学科。",
        "神经病学是神经科学（neuroscience）中的一门临床分支，其研究对象既包括中枢神经系统、周围神经系统疾病，也包括骨骼肌疾病；神经病学和精神病学是两门不同的学科。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），本章无此题型 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 配伍题组（b1），本章无此题型 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...a1Items, ...shortItems, ...caseItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
