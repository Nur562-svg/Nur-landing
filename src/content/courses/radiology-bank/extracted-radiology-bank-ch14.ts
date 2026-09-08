import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学影像学学习指导与习题集 第3版 — 第14章 非血管疾病的介入治疗 题库提取（等比取样）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：6 题（均为 A1 型，A2 型未纳入）
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：0 组 / 0 成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、填空题、选择题（A1/A2/B1）、简答题；本文件按 13 道预算在
 *   原书顺序内取材：名词解释取第 1–2 题、填空题取第 1–3 题、A1 型取第 1–6 题（A2 型
 *   未纳入）、B 型不取（本章 B1 配额为 0）、简答题取第 1–2 题；未纳入的题因预算所限。
 *   正确项对齐章末参考答案键号（A1/A2/B1 全书连续编号；本章参考答案区 OCR 将「A2 型题」
 *   小节标题错置于 A1 键号 4 之后，经医学语义核对 A1 键号实为 1–9、A2 键号为 10–12，本
 *   文件所取 A1 第 1–6 题按 1.E 2.D 3.B 4.E 5.D 6.B 归位），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按医学影像学医学语义恢复（如 介人→介入、内酒管→内导管、
 *   黄疽→黄疸 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "radiology-bank-ch14-ir-nonvascular";
const locatorBase =
  "《医学影像学学习指导与习题集》第3版 第14章 非血管疾病的介入治疗 习题（核对PDF 第187–191页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道（原书第 1–2 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：非血管介入技术",
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
        "非血管介入技术：主要是应用穿刺针、导丝、引流管及内导管、支架等介入器材，对血管系统以外的组织、器官适于介入技术的疾病进行治疗。",
        "非血管介入技术以穿刺针、导丝、引流管、内导管、支架等器材治疗血管系统以外组织、器官的疾病；OCR「内酒管」已按医学影像学语义恢复为「内导管」。原书第14章名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：PICD",
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
        "PICD：为 Percutaneous transhepatic cholangic drainage 的缩写，即经皮穿刺胆道引流术。",
        "PICD（经皮穿刺胆道引流术）用于梗阻性黄疸的胆道减压引流。原书第14章名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道（原书第 1–3 题） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "胆道梗阻介入治疗包括___。",
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
        "经皮胆道引流术；胆道支架置入术",
        "胆道梗阻介入治疗包括经皮胆道引流术和胆道支架置入术。原书第14章填空题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "经皮胆道引流及支架置入术后常见并发症包括___。",
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
        "出血；胆系感染；引流管移位；支架移位；胆瘘",
        "经皮胆道引流及支架置入术后常见并发症包括出血、胆系感染、引流管移位、支架移位及胆瘘。原书第14章填空题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "消化道狭窄的介入治疗主要包括___。",
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
        "食管狭窄的球囊成形/支架术；胃、十二指肠支架术；直肠、乙状结肠支架术",
        "消化道狭窄介入治疗包括食管狭窄的球囊成形/支架术、胃十二指肠支架术及直肠乙状结肠支架术。原书第14章填空题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），6 道（A1 型原书第 1–6 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下选项中，不是 PTCD 手术禁忌证的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "有明显的出血征象",
      "大量腹水",
      "肝功能衰竭",
      "对比剂过敏",
      "恶性肿瘤侵犯胰腺十二指肠区、压迫胆总管",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "恶性肿瘤侵犯胰腺十二指肠区、压迫胆总管",
        "PTCD 禁忌证包括明显出血征象、大量腹水、肝功能衰竭、对比剂过敏等；恶性肿瘤侵犯胰腺十二指肠区、压迫胆总管属恶性梗阻性黄疸，恰是 PTCD 的适应证而非禁忌证。原书第14章 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列消化道哪个部位还不能进行管腔成形术的介入治疗",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["食管", "胃", "十二指肠", "回肠", "直肠"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "回肠",
        "目前食管、胃、十二指肠、直肠（及乙状结肠）可行管腔成形术，回肠尚不能进行。原书第14章 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "食管狭窄金属支架成形术不适宜",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "晚期食管癌",
      "年龄偏小的儿童食管化学性烧伤",
      "食管气管瘘的患者",
      "食管癌术后复发患者",
      "贲门癌",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "年龄偏小的儿童食管化学性烧伤",
        "儿童食管化学性烧伤后狭窄不宜置入金属支架（支架不可取出、影响生长发育），为本术不适宜情形。原书第14章 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列选项不属于介入治疗非血管管腔成形术范围",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胆道成形术",
      "鼻泪管成形术",
      "泌尿道成形术",
      "消化道成形术",
      "椎体成形术",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "椎体成形术",
        "非血管管腔成形术包括胆道、鼻泪管、泌尿道、消化道成形术；椎体成形术属骨组织介入，不属管腔成形术范围。原书第14章 A1 型题第 4 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列气管狭窄疾病，哪种首先考虑球囊扩张成形术",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "气管多发性软化症",
      "恶性肿瘤引起的气管狭窄",
      "气管内膜结核引起的狭窄",
      "气管插管或切开术后局限性狭窄",
      "以上均可",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "气管插管或切开术后局限性狭窄",
        "气管插管或切开术后局限性狭窄适合首先行球囊扩张成形术。原书第14章 A1 型题第 5 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "确诊腰椎间盘突出症主要依赖",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["症状和体征", "CT 和 MRI", "腰椎 X 线片", "脊髓造影", "SPECT"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CT 和 MRI",
        "确诊腰椎间盘突出症主要依赖 CT 和 MRI 影像学检查。原书第14章 A1 型题第 6 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道（原书第 1–2 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述胆道引流术有哪些引流方式。",
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
        "胆道引流术的引流方式有：单纯外引流、胆道内-内引流、胆道支架置入。",
        "胆道引流方式包括单纯外引流、胆道内-内引流及胆道支架置入。原书第14章简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch14-ir-nonvascular-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述消化道管腔狭窄/梗阻介入治疗的适应证。",
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
        "①食管癌不能手术切除者；②食管癌术后吻合口复发者；③纵隔转移性肿瘤压迫或侵及食管引起的严重梗阻者；④单纯球囊扩张无效的难治性良性食管狭窄者，目前主张采用可回收全覆膜支架置入术；⑤恶性肿瘤向腔内生长或外压十二指肠管腔引起狭窄/梗阻者；⑥恶性肿瘤向腔内生长或外压直肠、乙状结肠狭窄/梗阻者；⑦急性直肠、乙状结肠梗阻，外科手术前过渡期暂时缓解。",
        "消化道狭窄/梗阻介入适应证覆盖食管癌不能切除、术后吻合口复发、纵隔肿瘤压迫、难治性良性狭窄及恶性肿瘤引起的十二指肠、直肠乙状结肠狭窄梗阻，以及术前过渡性缓解。原书第14章简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题（bGroups），0 组（本章 B1 配额为 0） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...fillItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
