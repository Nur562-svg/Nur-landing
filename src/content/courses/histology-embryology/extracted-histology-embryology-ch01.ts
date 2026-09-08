import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第1章 绪论 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社，主编 李继承、江婷婷）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：0 题
 * - 选择题（a1-single）：3 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：0 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：5 题（等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型选择题（第 1~8 题）与 B1 型共用备选答案配伍题
 *   （第 9~10 题），无线其余类型。取其中题干完整、答案可明确锚定的 A1 题
 *   第 2（四大基本组织）、7（PAS 反应）、8（原位杂交）三题，连同 9~10 题的
 *   B1 配伍题成组取满 5 道预算。双栏错序已按医学语义恢复（如「J：皮/上&/越本/蕋
 *   质/媒(EGF)」→上皮/基本/基质），数值（透射电镜分辨率 0.2nm）、缩写保留原值，
 *   未捏造。B1 备选答案（嗜酸性/嗜碱性/中性/嗜银性/异染性）按语义归位到 sharedChoices。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch01-introduction";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第1章 绪论 复习思考题 习题（核对PDF 第9–12页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）— 本章原书无此类题，空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** A1 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch01-introduction-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人体的四大基本组织是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "上皮组织、疏松结缔组织、肌组织、神经组织",
      "上皮组织、固有结缔组织、神经组织、肌组织",
      "上皮组织、肌组织、结缔组织、神经组织",
      "上皮组织、血液、肌组织、神经组织",
      "上皮组织、骨组织、肌组织、神经组织",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上皮组织、肌组织、结缔组织、神经组织",
        "人体的四大基本组织为上皮组织、结缔组织、肌组织和神经组织。其余选项以固有结缔组织、疏松结缔组织、骨组织或血液等代替「结缔组织」，均不正确。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch01-introduction-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "PAS 反应可检测组织中的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "RNA",
      "脂肪",
      "DNA",
      "蛋白聚糖",
      "氨基酸",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "蛋白聚糖",
        "PAS 反应（过碘酸-希夫法）可用于显示多糖或含多糖的蛋白聚糖、糖原等，本题正确项为蛋白聚糖。原书 A1 答案第 7 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch01-introduction-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原位杂交组织化学技术检测组织细胞内",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抗原的分布",
      "酶的分布",
      "染色体的分布",
      "抗体的分布",
      "DNA 或 RNA 的分布",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "DNA 或 RNA 的分布",
        "原位杂交技术利用带标记物的已知碱基序列核酸探针，按碱基互补配对与细胞内待测核酸结合，从而检测 DNA 片段的有无及 mRNA 的活性，故检测的是 DNA 或 RNA 的分布。原书 A1 答案第 8 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/问/论述题（short-answer）— 本章原书无此类题，空数组 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch01-introduction-b001",
    order: 4,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["嗜银性", "嗜碱性", "异染性", "中性", "嗜酸性"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch01-introduction-b001m1",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对苏木精亲合力强的组织细胞成分是",
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
            "嗜碱性",
            "苏木精为碱性染料，能将细胞核等与其亲和力强的成分染成紫蓝色，这种性质称嗜碱性。原书 B1 第 9 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch01-introduction-b001m2",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对伊红亲合力强的组织细胞成分是",
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
            "嗜酸性",
            "伊红为酸性染料，能将细胞质等与其亲和力强的成分染成粉红色，这种性质称嗜酸性。原书 B1 第 10 题答案 A。",
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
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];