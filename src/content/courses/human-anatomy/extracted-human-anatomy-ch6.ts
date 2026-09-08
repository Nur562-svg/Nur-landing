import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第6章 泌尿系统 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - A1/A2/A3 型选择题（a1-single）：5 题
 * - 填空题（fill）：3 题
 * - 判断改错题 + 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：17 题（含 B1 组成员；须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0（如实记录换题）
 * - 说明：本章原书依序含 A1 型题、A2 型题、A3 型题（含共用题干）、
 *   B1 共用备选答案配伍题、填空题、名词解释、判断改错题、问答题（另有填图不计分）。
 *   本文件按 17 道预算在原书顺序中取材并改写。涉及肾的形态/位置/被膜/肾蒂/肾门/肾段、
 *   输尿管的分段与狭窄、膀胱的形态/毗邻/膀胱三角、泌尿系统组成与功能等。
 *   A1/A2/A3 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题」→A1/A2 型题、「As型题」→A3型题、
 *   「力/沩」→为、「改次」→改为、「皱嬖」→皱襞、「肾孟」→肾盂、「骼」→髂、「日」→目、
 *   答案键「13.G/14.G」→13.C/14.C、「I1.D」→11.D 等），器官名、结构名、数值与单位均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch6-urinary";
const locatorBase =
  "《系统解剖学习题集》第2版 第6章 泌尿系统 复习思考题 习题（扫描版原书核对PDF 第97–105页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为共用题干/多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肾锥体",
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
        "肾锥体",
        "构成肾髓质的圆锥形结构，其底朝向肾皮质，尖朝向肾窦，尖部伸入肾小盏内形成肾乳头并此处有乳头孔。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：膀胱三角",
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
        "膀胱三角",
        "膀胱底内面，由两个输尿管口与尿道内口之间形成的三角区。此处膀胱黏膜与肌层紧密连结，缺少黏膜下层组织，无论膀胱扩张或收缩始终保持平滑，是肿瘤、结核和炎症的好发部位，膀胱镜检查时应特别注意。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肾蒂",
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
        "肾蒂",
        "出入肾门的结构（肾静脉、肾动脉、肾盂及肾门的神经、淋巴管等）被结缔组织包裹而成肾蒂。肾蒂内各结构自前向后依次为肾静脉、肾动脉、肾盂末端，自上而下为肾动脉、肾静脉、肾盂。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肾的被膜由外向内依次是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脂肪囊、肾筋膜、纤维囊",
      "肾筋膜、纤维囊、脂肪囊",
      "肾筋膜、脂肪囊、纤维囊",
      "纤维囊、脂肪囊、肾筋膜",
      "脂肪囊、纤维囊、肾筋膜",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾筋膜、脂肪囊、纤维囊",
        "肾的被膜由外向内依次为肾筋膜、脂肪囊和纤维囊，它们对肾起固定和保护作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "右肾的毗邻",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "内上方为脾",
      "外上方为胃",
      "下方为结肠左曲",
      "内侧缘邻近十二指肠降部",
      "前上方为胃",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内侧缘邻近十二指肠降部",
        "右肾内侧缘邻近右肾上腺和十二指肠降部，右肾前面上部邻肝右叶，外上方无胃，下方邻结肠右曲（非结肠左曲），故B升为正确毗邻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肾门的高度平对",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["第2腰椎体", "第1腰椎体", "第12胸椎体", "第3腰椎体", "第11胸椎体"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第1腰椎体",
        "肾门约平对第1腰椎体平面，其体表投影点位于腰背部竖脊肌外侧缘与第12肋的夹角处（肾区/肋脊角）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于肾构造的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肾锥体基底朝向皮质，尖朝向肾窦",
      "肾乳头开口于肾盂",
      "肾锥体之间的皮质为肾柱",
      "可分为浅层的皮质和深层的髓质两部分",
      "肾髓质由许多小的管道组成",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾乳头开口于肾盂",
        "肾乳头上的乳头孔开口于肾小盏，而非肾盂，故该项叙述错误。肾实质可分浅层皮质和深层髓质，肾锥体基底朝向皮质、尖朝向肾窦，肾锥体之间伸入的皮质为肾柱。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肾门位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "肾的外侧缘",
      "肾的内侧缘",
      "肾的上端",
      "肾的前面",
      "肾的下端",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾的内侧缘",
        "肾门位于肾的内侧缘中部，是肾的血管、神经、淋巴管及肾盂出入肾的部位。",
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
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-fill001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "肾蒂主要结构的排列关系，自前向后依次为____、____、____；自上而下为____、____、____。",
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
        "①肾静脉 ②肾动脉 ③肾盂末端 ④肾动脉 ⑤肾静脉 ⑥肾盂",
        "肾蒂内各结构自前向后依次为肾静脉、肾动脉、肾盂末端；自上而下依次为肾动脉、肾静脉、肾盂。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-fill002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "肾门的高度约平第____腰椎体，其体表投影点位于腰背部____与____的夹角处，此角称为____。",
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
        "①1 ②竖脊肌外侧缘 ③第12肋 ④肾区（肋脊角）",
        "肾门约平对第1腰椎体平面，体表投影点位于腰背部竖脊肌外侧缘与第12肋的夹角处，该角称为肾区（肋脊角），是临床肾囊封闭和肾鉴别的常用部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-fill003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "输尿管有三个狭窄，上狭窄位于____，中狭窄位于____，下狭窄位于____。",
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
        "①肾盂输尿管移行处 ②跨越髂血管处 ③输尿管的壁内部",
        "输尿管的三个狭窄分别是肾盂输尿管移行处、跨越髂血管处和输尿管的壁内部，这些狭窄处是结石易滞留的部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题 + 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：泌尿系统由肾、输尿管、膀胱、尿道和前列腺组成。",
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
        "错误；应删除“和前列腺”",
        "泌尿系统由肾、输尿管、膀胱和尿道四部分组成；前列腺属于男性生殖系统的腺体，不属于泌尿系统。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：第12肋斜越左肾后面上部，斜越右肾后面的中部。",
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
        "错误；应将“上部”改为“中部”、“中部”改为“上部”",
        "第12肋斜越左肾后面的中部、右肾后面的上部，原题将左、右肾的被越行部位写反。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述输尿管的行程、分段及狭窄。",
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
        "输尿管的行程、分段与狭窄",
        "输尿管约平对第2腰椎体上缘起自肾盂末端，沿腹膜后方腰大肌前面下行，跨过髂血管前方入盆腔，最后斜穿膀胱壁终止于膀胱，分为输尿管腹部、输尿管盆部和输尿管壁内部。有三个狭窄：上狭窄位于肾盂输尿管移行处；中狭窄位于跨越髂血管处；下狭窄位于输尿管的壁内部。",
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
    id: "ext-human-anatomy-human-anatomy-ch6-urinary-b001",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["膀胱尖", "膀胱体", "膀胱颈", "膀胱三角", "输尿管间襞"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-human-anatomy-human-anatomy-ch6-urinary-b001m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "膀胱充盈时，超过耻骨联合上缘的结构是",
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
            "膀胱尖",
            "膀胱充盈时体积增大向上膨隆，膀胱尖可越过耻骨联合上缘，故临床上可在耻骨联合上缘行膀胱穿刺。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-human-anatomy-ch6-urinary-b001m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "膀胱的最下部称为",
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
            "膀胱颈",
            "膀胱的最下部（尿道内口周围）称为膀胱颈，在男性与前列腺底相接，在女性与尿生殖膈相接。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-human-anatomy-ch6-urinary-b001m3",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "膀胱镜检查时应特别注意的部位是",
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
            "膀胱三角",
            "膀胱三角位于膀胱底内面、两输尿管口与尿道内口之间，黏膜始终保持平滑，是肿瘤、结核和炎症的好发部位，故膀胱镜检查时应特别注意。",
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