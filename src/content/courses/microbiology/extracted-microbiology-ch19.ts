import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第19章 立克次体 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：0 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 3、选择题（A1 型 15 + A2 型 2）、B1 型 2 组
 *   （18~20 题 3 成员、21~24 题 4 成员）与简答题 2；本文件按 10 道预算在原书顺序内取材，
 *   名词解释、填空题与简答题全取，B1 取第一组（18~20 题，3 成员，覆盖主要致病性立克次体），
 *   预算内未纳入选择题。正确项对齐章末参考答案键号（B1 18.B 19.D 20.E）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如 小杆歯→小杆菌、以节肢动物力传播媒介→
 *   以节肢动物为传播媒介、OX」g→OX2、OX，→OXk、2*天→2天 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch19-rickettsia";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第19章 立克次体 习题（核对PDF 第150–154页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch19-rickettsia-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Rickettsia",
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
        "Rickettsia（立克次体）",
        "立克次体是一类严格活细胞内寄生、以节肢动物为传播媒介、引起斑疹伤寒、恙虫病等传染病的革兰阴性小杆菌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch19-rickettsia-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Weil-Felix reaction",
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
        "Weil-Felix reaction（外斐反应）",
        "外斐反应是用变形杆菌 OX19、OX2、OXk 菌株的抗原代替立克次体抗原，检测患者血清中有无立克次体抗体及其效价的非特异性交叉凝集试验，用于辅助诊断立克次体病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），本章预算内未纳入 —— 置空 */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch19-rickettsia-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "立克次体属主要侵犯___细胞，埃里希体属和无形体属主要感染___源细胞。",
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
        "血管内皮；骨髓",
        "立克次体属主要侵犯血管内皮细胞，埃里希体属和无形体属主要感染骨髓来源细胞。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch19-rickettsia-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "培养立克次体常用的方法有：___、___和___。",
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
        "细胞培养法；鸡胚培养法；动物接种法",
        "培养立克次体常用细胞培养法、鸡胚卵黄囊培养法和动物接种法。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch19-rickettsia-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "立克次体病病人不能使用___类药物。",
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
        "磺胺",
        "立克次体对氯霉素和四环素类抗生素敏感性高，而磺胺类药物可促进其生长繁殖，故立克次体病病人不能使用磺胺类药物。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch19-rickettsia-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述立克次体的共同特点。",
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
        "立克次体的共同特点",
        "立克次体具有以下共同特点：①为革兰阴性细菌；②有细胞壁，但形态多样；③专性活细胞内寄生，以二分裂方式繁殖；④以节肢动物作为传播媒介或储存宿主；⑤多数是人畜共患病的病原体，在人类引起发热出疹性疾病；⑥对多种抗生素敏感，但磺胺类药物可刺激其增殖。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch19-rickettsia-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述普氏立克次体、斑疹伤寒立克次体和恙虫病东方体的所致疾病、传染源和传播方式。",
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
        "三种主要立克次体的所致疾病、传染源和传播方式",
        "（1）普氏立克次体是流行性斑疹伤寒的病原体，病人是唯一传染源，体虱是主要传播媒介，当受染虱叮咬健康人时，立克次体随粪便排泄于皮肤上，从搔抓的皮肤破损处侵入人体，人也可通过口、鼻和眼结膜等途径接触鼠蚤粪便而受染。（2）斑疹伤寒立克次体是地方性斑疹伤寒的病原体，其自然宿主是啮齿类动物（主要为鼠），由鼠蚤或鼠虱在鼠群中传播，当鼠蚤叮咬人时，将斑疹伤寒立克次体传染给人，再通过人虱在人群中传播。（3）恙虫病东方体是恙虫病的病原体，为自然疫源性疾病，主要流行于啮齿类动物，野鼠和家鼠为主要传染源，兔类和鸟类也能为传染源。恙虫病东方体寄生在恙螨体内，通过恙螨幼虫叮咬在鼠间传播或使人感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 3 成员（题组18-20） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch19-rickettsia-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "嗜吞噬细胞无形体",
      "斑疹伤寒立克次体",
      "普氏立克次体",
      "查菲埃里希体",
      "恙虫病东方体",
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
        id: "ext-microbiology-ch19-rickettsia-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "鼠型斑疹伤寒的病原体是",
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
            "斑疹伤寒立克次体",
            "斑疹伤寒立克次体是地方性斑疹伤寒（鼠型斑疹伤寒）的病原体，啮齿类动物为主要传染源和储存宿主。原书 B1 答案第 18 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch19-rickettsia-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "感染的靶细胞主要为单核细胞和巨噬细胞的是",
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
            "查菲埃里希体",
            "查菲埃里希体经蜱叮咬传播，引起人单核细胞埃里希体病，主要感染单核细胞和巨噬细胞。原书 B1 答案第 19 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch19-rickettsia-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要寄生在中性粒细胞的是",
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
            "嗜吞噬细胞无形体",
            "嗜吞噬细胞无形体经蜱叮咬传播，引起人粒细胞无形体病，主要寄生在中性粒细胞。原书 B1 答案第 20 题为 E。",
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
