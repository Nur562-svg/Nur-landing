import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第11章 螺杆菌属 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：0 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 8 + A2 型 2）、B1 型 1 组（2 成员）与简答题 1；
 *   本文件按 5 道预算在原书顺序内取材，简答题全取，选择题取前 2 道，B1 取唯一一组
 *   （11~12 题，2 成员）。正确项对齐章末参考答案键号（A1 1.E 2.A；B1 11.A 12.D）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如 病原菌内→病原菌是、吲哚实验→吲哚试验、
 *   CO，→CO₂、02→O₂ 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch11-helicobacter";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第11章 螺杆菌属 习题（核对PDF 第98–100页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），本章无 —— 置空 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** A1/A2 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch11-helicobacter-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与慢性胃炎和消化性溃疡密切相关的病原菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "空肠弯曲菌",
      "变形杆菌",
      "大肠埃希菌",
      "幽门螺杆菌",
      "鼠伤寒沙门菌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "幽门螺杆菌",
        "幽门螺杆菌是慢性胃炎、胃溃疡和十二指肠溃疡的主要病因，并与胃癌和胃黏膜相关淋巴瘤（MALT）的发生密切相关。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch11-helicobacter-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可作为快速鉴定幽门螺杆菌的试验是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "乳糖发酵试验",
      "尿素酶试验",
      "吲哚试验",
      "肥达试验",
      "菊糖发酵试验",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尿素酶试验",
        "幽门螺杆菌尿素酶丰富，可迅速分解尿素释放氨，快速尿素酶试验是鉴定该菌的主要依据之一。原书 A1 答案第 2 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch11-helicobacter-short001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述幽门螺杆菌的主要致病机制。",
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
        "幽门螺杆菌的主要致病机制",
        "幽门螺杆菌的主要致病物质为侵袭因子和毒素。与侵袭密切相关的物质为尿素酶、鞭毛和菌毛等。①尿素酶通过分解胃中的尿素，在菌体表面产生“氨云”，中和胃酸，形成有利于幽门螺杆菌生存的微环境。②幽门螺杆菌通过鞭毛运动穿入胃黏膜表面的稠厚黏液层，到达胃黏膜上皮细胞表面，依靠菌体表面的菌毛或黏附素黏附定植于细胞表面，克服宿主防御机制，生长繁殖。③幽门螺杆菌通过招募免疫细胞至胃黏膜组织启动免疫应答，促进胃部炎症发生。④空泡毒素 A（VacA）可导致胃黏膜上皮细胞产生空泡样病变，诱发人消化性溃疡。⑤细胞毒素相关蛋白 A（CagA）增加了胃癌发生的危险性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 2 成员（题组11-12） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch11-helicobacter-b001",
    order: 4,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "尿素酶",
      "鞭毛",
      "菌毛",
      "细胞毒素相关蛋白 A",
      "空泡毒素 A",
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
        id: "ext-microbiology-ch11-helicobacter-b001m1",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "幽门螺杆菌能够克服胃内酸性环境而生存的主要物质是",
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
            "尿素酶",
            "尿素酶分解胃中尿素产生“氨云”中和胃酸，使幽门螺杆菌能克服胃内酸性环境而生存。原书 B1 答案第 11 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch11-helicobacter-b001m2",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与幽门螺杆菌致癌密切相关的是",
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
            "细胞毒素相关蛋白 A",
            "细胞毒素相关蛋白 A（CagA）增加了胃癌发生的危险性，与幽门螺杆菌致癌密切相关。原书 B1 答案第 12 题为 D。",
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
