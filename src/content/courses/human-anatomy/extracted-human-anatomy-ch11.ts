import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第十一章 淋巴系统 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - A1/A2/A3 型选择题（a1-single）：0 题
 * - 填空题（fill）：6 题
 * - 判断改错题 + 问答题（short-answer）：6 题（判断改错 3 题 + 问答题 3 题）
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：12（选择题部分未纳入，属取材不足，非答案缺失）
 * - 说明：本章原书依序含（一）A1 型题 32、（二）A2 型题 8、（三）A3 型题、（四）B1 型题
 *   （若干共用备选答案组、约 20 个子题）、填空题 6、名词解释 6、判断改错题 20、问答题 7。
 *   选择题部分（A1/A2/A3/B1）在扫描版 OCR 中题干与选项严重残缺、错序交织、题号与选项
 *   无法可靠对齐（如 A1 答案 32 题、A2 答案 8 题，但正文题干多已丢失），故未纳入提取，
 *   按预算改用填空题、名词解释、判断改错题、问答题等可信考点取满 18 道独立记分题。
 *   涉及淋巴管道（胸导管/右淋巴导管/乳糜池/肠干）、淋巴器官（淋巴结/胸腺/脾/扁桃体）、
 *   局域淋巴结与引流方向（腋/腹股沟/Virchow 淋巴结等）核心内容。
 *   OCR 错字已按医学语义恢复（如「沩/力」→为、「注射人」→注入、「本处」→下缘处、
 *   「胭淋巴结」→腘淋巴结、「A，型题/Az型题/A，型题」→A1/A2/A3 型题、「20.G」→20.C 等），
 *   器官名、结构名、数值与方位均按原文与参考答案保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch11-lymphatic";
const locatorBase =
  "《系统解剖学习题集》第2版 第十一章 淋巴系统 复习思考题 习题（扫描版原书核对PDF 第161–169页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 填空题（fill），6 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch11-lymphatic-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "淋巴器官包括______、______、______和______。",
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
        "①淋巴结 ②胸腺 ③脾 ④扁桃体",
        "淋巴器官包括淋巴结、胸腺、脾和扁桃体等，具有产生淋巴细胞、过滤淋巴液和进行免疫应答的功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "胸导管在注入______处接受______、______和______。",
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
        "①左静脉角 ②左颈干 ③左锁骨下干 ④左支气管纵隔干",
        "胸导管在注入左静脉角处接受左颈干、左锁骨下干和左支气管纵隔干，其下端平第12胸椎下缘起自乳糜池（乳糜池另接受左、右腰干和肠干）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-fill003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "颈外侧浅淋巴结和颈外侧深淋巴结分别沿______和______排列。",
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
        "①颈外静脉 ②颈内静脉",
        "颈外侧浅淋巴结沿颈外静脉浅面排列，颈外侧深淋巴结沿颈内静脉排列（后者又分上、下两群）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-fill004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "腋淋巴结分为______、______、______、______和______5群。",
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
        "①胸肌淋巴结 ②外侧淋巴结 ③肩胛下淋巴结 ④中央淋巴结 ⑤尖淋巴结",
        "腋淋巴结按位置分为胸肌淋巴结、外侧淋巴结、肩胛下淋巴结、中央淋巴结和尖淋巴结5群，分别引流上肢、胸壁及乳房等处的淋巴。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-fill005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "腹股沟浅淋巴结的上群和下群分别沿______和______排列。",
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
        "①腹股沟韧带 ②大隐静脉末端",
        "腹股沟浅淋巴结位于腹股沟韧带下方，上群（约4~5个）与腹股沟韧带平行排列，下群（约2~3个）沿大隐静脉末端分布。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-fill006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "______、______和______的输出淋巴管汇合成肠干。",
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
        "①腹腔淋巴结 ②肠系膜上淋巴结 ③肠系膜下淋巴结",
        "腹腔淋巴结、肠系膜上淋巴结和肠系膜下淋巴结的输出淋巴管汇合形成肠干，肠干续连乳糜池或胸导管。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch11-lymphatic-term001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Virchow 淋巴结",
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
        "Virchow 淋巴结",
        "Virchow 淋巴结即左侧斜角肌淋巴结，位于前斜角肌前方。患胸、腹、盆部的肿瘤，尤其是食管腹段癌和胃癌时，癌细胞栓子经胸导管转移至该淋巴结，常可在胸锁乳突肌后缘与锁骨上缘形成的夹角处触摸到肿大的淋巴结。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-term002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：乳糜池",
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
        "乳糜池",
        "乳糜池为胸导管下端的梭形膨大，平对第12胸椎下缘高度，接受左、右腰干和肠干。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-term003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：脾切迹",
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
        "脾切迹",
        "脾切迹位于脾上缘前部，有2~3个，是脾肿大时触诊脾的标志。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-term004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：淋巴系统",
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
        "淋巴系统",
        "淋巴系统由淋巴管道、淋巴组织和淋巴器官组成。淋巴管道和淋巴结的淋巴窦内含有淋巴液。淋巴系统是心血管系统的辅助系统，协助静脉引流组织液；此外，淋巴器官和淋巴组织具有产生淋巴细胞、过滤淋巴液和进行免疫应答的功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-term005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：局部淋巴结",
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
        "局部淋巴结",
        "局部淋巴结是指引流某一器官或部位淋巴的第一级淋巴结，又称为哨位淋巴结。当某器官或部位发生病变时，细菌、毒素、寄生虫或肿瘤细胞可沿淋巴管进入相应的局部淋巴结，引起淋巴结肿大，对临床诊断具有重要意义。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-term006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：右淋巴导管",
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
        "右淋巴导管",
        "右淋巴导管由右颈干、右锁骨下干和右支气管纵隔干汇合形成，注入右静脉角。右淋巴导管引流右上肢、右胸部和右头颈部的淋巴，即全身1/4部位的淋巴。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题 + 问答题（short-answer），6 道（判断改错 3 道 + 问答题 3 道） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch11-lymphatic-short001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：胸导管经主动脉裂孔进入胸腔，在第5胸椎高度由脊柱的右前方行向脊柱的左前方。",
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
        "正确",
        "胸导管自乳糜池经膈的主动脉裂孔进入胸腔，沿脊柱右前方与胸主动脉和奇静脉之间上行，至第5胸椎高度经食管与脊柱之间向左侧斜行至脊柱左前方，叙述正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-short002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：胸导管接受左腰干、右腰干、肠干、左锁骨下干、左支气管纵隔干和左、右颈干。",
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
        "错误；应删除“右颈干”",
        "胸导管起端经乳糜池接受左、右腰干和肠干，在注入左静脉角处接受左颈干、左锁骨下干和左支气管纵隔干，不包含右颈干（右颈干参与构成右淋巴导管），故应删除“右颈干”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-short003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：脾的长轴与第10肋一致，正常时在左肋弓下可触到脾。",
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
        "错误；应将“可触到脾”改为“不能触到脾”",
        "脾的长轴与第10肋一致，正常时脾位于左肋弓深面（左侧第9~11肋深面），在左肋弓下不能触到脾，仅当脾肿大时才可在左肋弓下触及，故原句后半句错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-short004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述胸导管的行程、接受的淋巴干和引流范围。",
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
        "行程、接受的淋巴干与引流范围",
        "胸导管为全身最大的淋巴管，平第12胸椎下缘高度起自乳糜池，经膈的主动脉裂孔进入胸腔，沿脊柱右前方和胸主动脉与奇静脉之间上行，至第5胸椎高度经食管与脊柱之间向左侧斜行，然后沿脊柱左前方上行，经胸廓上口至颈部，在左颈总动脉和左颈内静脉的后方转向前内下方注入左静脉角。乳糜池位于第1腰椎前方，呈囊状膨大，接受左、右腰干和肠干；胸导管在注入左静脉角处接受左颈干、左锁骨下干和左支气管纵隔干。胸导管引流下肢、盆部、腹部、左上肢、左胸部和左头颈部的淋巴，即全身3/4部位的淋巴。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-short005",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述腋淋巴结的分群、位置和引流范围。",
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
        "腋淋巴结 5 群的位置与引流范围",
        "腋淋巴结按位置分为5群：①胸肌淋巴结，位于胸小肌下缘处，沿胸外侧血管排列，引流腹前外侧壁、胸外侧壁以及乳房外侧部和中央部的淋巴；②外侧淋巴结，沿腋静脉排列，收纳除注入锁骨下淋巴结以外的上肢浅、深淋巴管；③肩胛下淋巴结，沿肩胛下血管排列，引流颈后部和背部的淋巴；④中央淋巴结，位于腋窝中央的疏松结缔组织中，收纳上述3群淋巴结的输出淋巴管；⑤尖淋巴结，沿腋静脉近侧端排列，引流乳腺上部的淋巴，并收纳其余4群淋巴结和锁骨下淋巴结的输出淋巴管，其输出淋巴管合成锁骨下干。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch11-lymphatic-short006",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述腹股沟淋巴结的分群、位置和引流范围。",
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
        "腹股沟浅、深淋巴结的位置与引流范围",
        "腹股沟淋巴结按位置分为浅、深两群。腹股沟浅淋巴结位于腹股沟韧带下方，分为上、下两群：上群与腹股沟韧带平行排列，引流腹前外侧壁下部、臀部、会阴和子宫底的淋巴；下群沿大隐静脉末端分布，收纳除足外侧缘和小腿后外侧部以外的下肢浅淋巴管；腹股沟浅淋巴结的输出淋巴管注入腹股沟深淋巴结或髂外淋巴结。腹股沟深淋巴结位于股静脉周围和股管内，引流大腿深部结构和会阴的淋巴，并收纳腘淋巴结深群和腹股沟浅淋巴结的输出淋巴管，其输出淋巴管注入髂外淋巴结。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题与本章 B1 配伍题因扫描版 OCR 题干残缺、无法可靠对齐，均未提取（见文件头说明）。 */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题（空） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

/** 病例题（case，空） */
const caseItems: readonly AssessmentItemDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];