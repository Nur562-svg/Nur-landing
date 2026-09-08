import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第四篇实验诊断 第一章 绪论 题库提取
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * == 统计报告 ==
 * - 名词解释：2 题
 * - 问答题（简答）：2 题
 * - 独立题合计：4 题（无选择题、无 B 型配伍题）
 * - 缺失答案：0 题
 * - 无法提取：0 题
 * - 说明：原文个别 OCR 错字（如“珍断特异性”应为“诊断特异性”、“部蹦蹦晦”为版面噪声、“2扣/－怵”为章的乱码）已按医学语义恢复为主题所指内容；所有题目做轻度改写，实验诊断、危急值等定义要点与原则表述均保留原意。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "lab-general";
const chapterLabel = "第四篇实验诊断 第一章 绪论";
const locatorBase =
  "《诊断学学习指导与习题集》第4版 第四篇实验诊断 第一章 绪论 习题（PDF 第224–225页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-diagnosis-${topic}`;

/** 名词解释（term） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-lab-general-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：实验诊断",
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
        "实验诊断",
        "实验诊断是以实验室检查结果或数据为依据，结合其他临床资料，经过综合分析，应用于临床诊断、鉴别诊断、病情观察、疗效监测和预后判断的一种临床诊断方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-lab-general-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：危急值",
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
        "危急值",
        "危急值是指某些检验结果出现异常、超过一定界值时，可能危及病人的生命，医师必须紧急处理，称为危急值。危急值的制订各医院不尽相同，需要临床科室和实验室根据病种差异来商讨制订，不同科室的危急值没有统一标准；出现危急值必须立即报告临床并做详尽记录。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const shortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-lab-general-sa001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "选择实验室检查项目应遵循什么原则？",
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
        "选择检验项目需遵循以下原则：①针对性：选择针对病人不同疾病阶段的最佳检查项目，是临床诊疗的基础；②有效性：选择检查项目时应考虑假阴性和假阳性的存在；③经济性：检查项目要合理选择，防止过度医疗；④及时性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-lab-general-sa002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "诊断性实验项目的常用评价指标有哪些？",
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
        "临床实验室评价检验项目临床应用价值的主要指标有诊断灵敏度、诊断特异性和诊断准确度。①诊断灵敏度：指某检验项目对某种疾病具有鉴别、确认的能力，其数学式为所有病人中获得真阳性结果的百分数；②诊断特异性：指某检验项目确认无某种疾病的能力，其数学式为所有非病人中获得真阴性结果的百分数；③诊断准确度：指某检验项目在实际使用中，所有检验结果中诊断准确结果的百分比。④连续定量数据分析：指使用检验项目临床性能评价（ROC）分析方法制成评价曲线，在曲线上寻找最佳判断界限及其诊断灵敏度和特异性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 本章无 B 型配伍题 */
const b1Groups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...shortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] =
  b1Groups;