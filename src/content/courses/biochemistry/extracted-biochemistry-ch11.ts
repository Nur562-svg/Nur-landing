import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第11章 真核基因 与 基因组 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2 型选择题（a1-single）：3 题
 * - 简答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含名词解释 3、【A1型题】1–9、【A2型题】10–11、
 *   【B1型题】12–13、14–15、16–17（三组共用备选答案）与简答题 1–4。本文件
 *   按 8 道预算在原书顺序中取材并改写，覆盖断裂基因、启动子（核内基因组与染色质
 *   基本结构单位）等本章核心知识点。A1/A2 型均映射为 a1-single；B1 型按项目规约
 *   组织为 Group b1（取 12–13 题共用备选答案“连续/不连续”配伍一组的两个成员）。
 *   正确项逐一对齐源参考答案（1.A 线性双链DNA分子、3.D 细胞核、5.B 核小体、
 *   12.B 连续的 [原核]、13.A 不连续的 [真核]）。选项顺序已随机重排并同步
 *   correctChoiceIndex（0 起）。原生文本双栏错序已按真核基因与基因组的医学语义恢复
 *   （题干/选项被打散重建，如“线性双链/环状双链/线性单链”等载体选项重新归位），
 *   缩写与专名（mRNA、DNA、RNA、Alu家族、内含子、外显子、断裂基因等）保留原文，
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch11-eukaryotic-genome";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第11章 真核基因 与 基因组 复习思考题 习题（核对原书PDF 第191–195页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch11-eukaryotic-genome-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：断裂基因（split gene）",
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
        "断裂基因",
        "断裂基因是指真核生物的结构基因中，由若干个编码序列与非编码序列互相间隔开、但又连续镶嵌而成的不连续基因（内含子与外显子相间排列）。去除内含子（非编码序列）后再连接，即可翻译出由连续氨基酸组成的完整蛋白质。其意义在于作为生物进化的缓冲区，提供多种进化方向。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch11-eukaryotic-genome-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：启动子（promoter）",
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
        "启动子",
        "启动子是 RNA 聚合酶特异性识别、结合并启动转录的 DNA 序列，有方向性，位于转录起始位点上游。真核生物有三类启动子：RNA Pol I 启动子主要启动 rRNA 基因转录，RNA Pol II 启动子主要启动 mRNA 基因、一些小 RNA 基因和 lncRNA 的转录，RNA Pol III 启动子主要启动 5S rRNA、tRNA、U6 snRNA 等 RNA 分子编码基因的转录。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch11-eukaryotic-genome-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "真核生物染色体基因组是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "环状双链DNA分子",
      "线性双链DNA分子",
      "环状单链DNA分子",
      "线性单链RNA分子",
      "线性单链DNA分子",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "线性双链DNA分子",
        "原书 A1 型选择题答案第一题为 A，即真核生物染色体基因组是线性双链 DNA 分子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch11-eukaryotic-genome-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "真核生物基因组主要存在于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["线粒体", "细胞核", "质粒", "高尔基体", "核糖体"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞核",
        "原书 A1 型选择题答案第三题为 D，即真核生物基因组（细胞核染色体 DNA）主要存在于细胞核内；另有一部分遗传物质存在于线粒体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch11-eukaryotic-genome-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "真核生物染色质的基本结构单位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["β-片层", "核小体", "a-螺旋", "结构域"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "核小体",
        "原书 A1 型选择题答案第五题为 B，即核小体是真核生物染色质的基本结构单位（每个核小体单位约包含 200bp 的 DNA，DNA 缠绕组蛋白八聚体形成核小体核心颗粒）。",
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
    id: "ext-biochem-ch11-eukaryotic-genome-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "真核基因组的结构特点是什么？",
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
        "真核基因组的结构特点",
        "真核基因组的结构特点包括：①转录产物多为单顺反子 RNA；②基因是不连续的，内部存在不编码蛋白质的内含子；③存在大量的重复序列；④编码区域所占比例较小；⑤基因组远大于原核生物基因组，具有许多复制起点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（取原书 12–13 题共用备选答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch11-eukaryotic-genome-b001",
    order: 6,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["连续的", "不连续的", "无规律性", "不需要启动序列", "瞬时的"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-biochem-ch11-eukaryotic-genome-b001m1",
        order: 6,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "原核生物的结构基因是",
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
            "连续的",
            "原书 B1 型考试题 12 题答案为 B（连续的），即原核生物的结构基因是连续的，不含有内含子。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch11-eukaryotic-genome-b001m2",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "真核生物的结构基因是",
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
            "不连续的",
            "原书 B1 型题 13 题答案为 A（不连续的），即真核生物的结构基因为断裂基因，其编码序列与非编码序列（内含子）间隔排列，因而是不连续的。",
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
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];