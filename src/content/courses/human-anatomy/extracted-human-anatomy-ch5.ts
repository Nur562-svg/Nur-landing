import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第五章 呼吸系统 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - A1/A2/A3 型选择题（a1-single）：6 题
 * - 填空题（fill）：4 题
 * - 判断改错题 + 问答题（short-answer）：4 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：20 题（含 B1 组成员；须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择（A1 型题 32、A2 型题、A3 型题 10 及 B1 共用备选答案配伍题）、
 *   填空题 25、名词解释 16、判断改错题 22、问答题 10。本文件按 20 道预算在原书顺序中取材并改写，
 *   覆盖呼吸系统各主要知识点（鼻腔与鼻旁窦、喉与声门、气管与主支气管、肺与肺段、胸膜腔与胸膜隐窝、纵隔）。
 *   A1/A2/A3 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题/Ag型题」→A1/A2/A3 型题、「沩/力」→为，
 *   并据「呼吸道」「喉腔」「鼻旁窦」等医学语义校正被打乱的题干与选项顺序），
 *   结构名、数值与单位（cm/第几肋/喉软骨名称）均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch5-respiratory";
const locatorBase =
  "《系统解剖学习题集》第2版 第五章 呼吸系统 复习思考题 习题（扫描版原书核对PDF 第86–96页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch5-respiratory-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：下呼吸道",
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
        "下呼吸道",
        "下呼吸道是指气管和各级支气管（临床上常将气管及各级支气管称为下呼吸道）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Little 区",
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
        "Little 区",
        "在鼻中隔前下份有一个易于出血的区域称 Little 区，此区血管丰富且位置表浅，受外伤或干燥空气刺激后血管易破裂出血，90%左右的鼻出血均发生在此部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：支气管肺段",
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
        "支气管肺段",
        "每个肺段支气管及其分支分布区的全部肺组织总称为支气管肺段（简称肺段），是肺的形态学和功能学的基本单位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch5-respiratory-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于呼吸道的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "喉属于下呼吸道",
      "上呼吸道仅有呼吸功能",
      "口腔属于上呼吸道",
      "上呼吸道包括鼻、咽、喉",
      "肺和支气管为下呼吸道",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上呼吸道包括鼻、咽、喉",
        "临床上通常将鼻、咽和喉称为上呼吸道，将气管和各级支气管称为下呼吸道，肺和支气管属于下呼吸道，口腔不属于（或部分属于）上呼吸道。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "呼吸道最狭窄的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["声门下腔", "前庭裂", "喉前庭", "声门裂", "喉中间腔"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "声门裂",
        "声门裂是喉腔中最狭窄的部位，位于两侧声襞与前庭襞之间，也是呼吸道最狭窄的部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "上颌窦的开口位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "上鼻道和半月裂孔",
      "下鼻道",
      "中鼻甲的黏膜",
      "中鼻道和半月裂孔",
      "中鼻甲内侧面",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中鼻道和半月裂孔",
        "上颌窦开口于中鼻道后部的半月裂孔，是鼻旁窦中开口位置较高的代表之一。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "吞食鱼刺容易滞留的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["咽隐窝", "咽后壁", "软腭黏膜的深部", "梨状隐窝", "腭扁桃体窝内"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "梨状隐窝",
        "梨状隐窝位于喉咽部、喉口的两侧，是异物（如鱼刺）容易滞留的部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "喉软骨中哪块损伤可产生喉狭窄",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["杓状软骨", "小角状软骨", "会厌软骨", "环状软骨", "甲状软骨"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "环状软骨",
        "环状软骨是喉软骨中唯一完整的软骨环，对维持喉腔通气道形态起支架作用，损伤时易致喉腔狭窄。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "声门裂位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "方形膜下缘",
      "两侧前庭襞之间",
      "两侧喉室之间",
      "两侧声韧带之间",
      "两侧声襞之间",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "两侧声襞之间",
        "声门裂位于两侧声襞之间，为喉腔最狭窄的部位，是临床喉镜检查的重要标志。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch5-respiratory-fill001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "上呼吸道包括____，下呼吸道包括____和____。",
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
        "①鼻、咽、喉 ②气管 ③支气管",
        "上呼吸道包括鼻、咽和喉，下呼吸道包括气管、支气管及其后的各级支气管（此处按源答案取气管和支气管）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-fill002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "喉软骨包括不成对的____和成对的____。",
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
        "①甲状软骨、环状软骨、会厌软骨 ②杓状软骨",
        "喉软骨中不成对有甲状软骨、环状软骨和会厌软骨，成对的为杓状软骨（此外还有小角软骨和楔状软骨）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-fill003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "壁胸膜根据其所附着的部位可分为____。",
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
        "①胸膜顶 ②肋胸膜 ③膈胸膜 ④纵隔胸膜",
        "壁胸膜根据所附着的部位分为胸膜顶、肋胸膜、膈胸膜和纵隔胸膜四部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-fill004",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "纵隔四分法是先将其分为____和____，后者又被分为____、____和____。",
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
        "①上纵隔 ②下纵隔 ③前纵隔 ④中纵隔 ⑤后纵隔",
        "四分法先将纵隔分为上纵隔和下纵隔，下纵隔又以心包为界（前后）分为前纵隔、中纵隔和后纵隔。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题 + 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch5-respiratory-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：左主支气管较垂直，而右主支气管较水平，所以气管异物易落入右主支气管。",
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
        "错误；应将“左主支气管较垂直、右主支气管较水平”改为“左主支气管较水平、右主支气管较垂直”",
        "左主支气管细而长、嵴下角大、走行较倾斜（接近水平），右主支气管短而粗、嵴下角小、走行较垂直，故气管异物易坠入右主支气管，原题左右描述相反。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：上颌窦是鼻旁窦最大者，其开口位置低于窦底，其分泌物容易流出。",
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
        "错误；应将“低于”改为“高于”、“容易”改为“不易”",
        "上颌窦是最大的鼻旁窦，其开口位置高于窦底，分泌物不易自然流出，故易继发感染，这正是上颌窦炎发病率高、体位引流需采用头低足高位的原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "气管异物多坠入哪侧支气管？为什么？",
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
        "多坠入右侧支气管",
        "因为右主支气管短而粗、嵴下角小、走行较垂直，而左主支气管细而长、嵴下角大、走行较倾斜，故经气管坠入的异物多进入右侧支气管。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch5-respiratory-short004",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述喉的软骨名称。",
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
        "喉的软骨名称",
        "喉的软骨包括不成对的甲状软骨、环状软骨和会厌软骨，以及成对的杓状软骨，此外还有小角软骨和楔状软骨等。其中环状软骨是喉软骨中唯一完整的软骨环，平对第6颈椎，是颈部重要的体表标志。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-human-anatomy-ch5-respiratory-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["声门下腔", "前庭裂", "喉中间腔", "喉腔", "喉前庭"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-human-anatomy-ch5-respiratory-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "声襞较前庭襞更突向",
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
            "喉腔",
            "两侧声襞均较前庭襞更突向喉腔，是喉内声带所在的部位。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch5-respiratory-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "前庭襞之间的裂隙",
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
            "前庭裂",
            "两侧前庭襞之间形成的裂隙称前庭裂，前庭裂以上的喉腔部分为喉前庭。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch5-respiratory-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "喉室位于",
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
            "喉中间腔",
            "喉室位于喉中间腔的两侧壁，是前庭襞与声襞之间突向外的隐窝。",
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