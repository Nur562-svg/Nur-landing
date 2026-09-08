import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学影像学学习指导与习题集 第3版 — 第06章 乳腺 题库提取（等比取样）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：4 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：9 题（A1 型 8、A2 型病例题 1）
 * - 简答题（short-answer）：3 题
 * - B1 配伍题：1 组 / 3 成员
 * - 独立记分题合计：22 题（须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、填空题、选择题（A1/A2/B1）、简答题；本文件按 22 道预算在
 *   原书顺序内取材：名词解释取第 1–4 题、填空题取第 1–3 题、A1 型取第 1–8 题、A2 型取第
 *   26 题（即 A2 第 1 题）、B 型取第 28–30 题（1 组）、简答题取第 1–3 题；未纳入的题因预算
 *   所限（选择题原第 10 题参考答案键号在 OCR 中缺失，不在取材范围）。正确项对齐章末
 *   参考答案键号（A1/A2/B1 全书连续编号），选项与共用备选答案已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按医学影像学医学语义恢复（如 T,WI→T1WI、T2WI、DWI、
 *   ADC、CDFI、介人→介入、钆（Cd）→钆（Gd） 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "radiology-bank-ch06-breast";
const locatorBase =
  "《医学影像学学习指导与习题集》第3版 第06章 乳腺 习题（核对PDF 第86–92页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道（原书第 1–4 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch06-breast-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Cooper 韧带",
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
        "Cooper 韧带：皮肤及浅筋膜的浅层纤维与浅筋膜深层的结缔组织纤维束之间有网状束带相连，称之为乳腺悬吊韧带，又名 Cooper 韧带。",
        "Cooper 韧带即乳腺悬吊韧带，对乳腺起支持固定作用，乳腺癌时受牵拉可形成皮肤凹陷。原书第06章名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：导管征",
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
        "导管征：乳头下一支或数支乳导管增粗、密度增高、边缘粗糙。",
        "导管征为乳腺 X 线上乳头后方乳导管增粗、致密、边缘粗糙的表现，多提示导管内病变。原书第06章名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：晕圈征",
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
        "晕圈征：肿块周围一圈薄的透亮带，为肿块推压周围脂肪组织形成。",
        "晕圈征常见于乳腺良性肿块（如纤维腺瘤）周围，为被推压的脂肪组织形成的透亮环。原书第06章名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：漏斗征",
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
        "漏斗征：乳头后方癌灶与乳头间有浸润时，导致乳头回缩、内陷。",
        "漏斗征是乳腺癌侵犯乳头后方组织、牵拉乳头导致回缩内陷的征象，提示癌灶与乳头间有浸润。原书第06章名词解释第 4 题参考答案。",
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
    id: "ext-radiology-radiology-bank-ch06-breast-fill001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "填空题：目前乳腺影像学检查主要以____为主，两者结合是目前国际上广泛采用的检查方法并被认为是乳腺影像学检查最佳的组合；____检查因其具有的成像优势，可成为其重要补充方法。",
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
        "第1空：X线摄影；第2空：超声检查；第3空：MRI（重要补充方法）。",
        "目前乳腺影像学检查主要以 X 线摄影与超声检查为主，两者结合为国际上广泛采用的最佳组合，MRI 因多参数成像优势可作为重要补充方法。原书第06章填空题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-fill002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "填空题：美国放射学会提出的乳腺影像报告和数据系统将乳腺分为四型：____、____、____和____。",
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
        "第1空：脂肪型；第2空：散在纤维腺体型；第3空：不均质纤维腺体型；第4空：致密型。",
        "BI-RADS 将乳腺分为脂肪型、散在纤维腺体型、不均质纤维腺体型和致密型四型，腺体越致密病变检出敏感性越低。原书第06章填空题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-fill003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "填空题：X线对发生在____乳腺中病变的检出率最高，对发生在____乳腺中病变的检出率最低。",
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
        "第1空：脂肪型；第2空：致密型。",
        "脂肪型乳腺内病变与脂肪背景对比良好，检出率最高；致密型乳腺腺体致密，会掩盖小病灶，检出敏感性降低。原书第06章填空题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），9 道（A1 型原书第 1–8 题、A2 型原书第 26 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "乳腺常规X线摄影位置为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "头尾位＋内外斜位",
      "头尾位＋外内斜位",
      "侧位＋内外斜位",
      "侧位＋外内斜位",
      "头尾位＋侧位",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "头尾位＋内外斜位",
        "乳腺常规 X 线摄影位置为头尾位（CC）加内外斜位（MLO），两者结合可较完整显示乳腺。原书第06章 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "乳腺X线摄影检查最佳时间为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "月经期",
      "月经后1周",
      "绝经后",
      "与经期无关",
      "月经前期",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "月经后1周",
        "月经后 1 周乳腺充血水肿减轻，X 线摄影受经期腺体改变影响最小，为最佳检查时间。原书第06章 A1 型题第 2 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于乳腺 MRI 检查，下列哪项描述是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "患者取仰卧位，不需要采用乳腺专用线圈",
      "乳腺 MRI 检查除平扫外，应常规行 MRI 增强检查（除单纯观察乳腺假体有无溢漏外）",
      "MRI 扫描范围应包括全乳腺，必要时包括腋窝",
      "脂肪抑制成像技术对发现病灶较为敏感，特别是对较大的脂肪型乳腺更有价值",
      "患者取俯卧位，采用乳腺专用线圈",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "患者取仰卧位，不需要采用乳腺专用线圈",
        "乳腺 MRI 检查患者取俯卧位、乳腺自然下垂，并采用乳腺专用线圈，故该项描述错误。原书第06章 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于乳腺 MRI 检查的优势，下列哪项描述是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "对致密型乳腺内的肿瘤和乳腺癌术后局部复发诊断准确性高",
      "能显示病变中微小钙化",
      "动态增强检查有助于良恶性病变的鉴别",
      "对多中心、多灶性乳腺癌检出优于其他影像学检查方法",
      "MRI 软组织分辨力极高，对发现乳腺病变具有较高的敏感性",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "能显示病变中微小钙化",
        "MRI 对微小钙化不敏感，显示微小钙化主要依靠乳腺 X 线摄影，故该项描述错误。原书第06章 A1 型题第 4 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1005",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于乳腺X线检查，下列哪项描述是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "X 线对胸壁异常改变的观察、乳腺腋尾部病变以及腋窝和内乳淋巴结肿大的检出优于 MRI",
      "X 线的密度分辨力高，可清晰显示乳腺的解剖结构",
      "X 线对显示微小砂粒状钙化特别是数目较少的钙化好于 MRI",
      "X 线检查具有一定的辐射",
      "X 线摄影成像原理，取决于病变对 X 线的吸收量",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "X 线对胸壁异常改变的观察、乳腺腋尾部病变以及腋窝和内乳淋巴结肿大的检出优于 MRI",
        "X 线对胸壁异常、乳腺腋尾部病变及腋窝、内乳淋巴结肿大的检出不如 MRI，该项描述错误。原书第06章 A1 型题第 5 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1006",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "目前乳腺影像学检查方法中，以下哪两者结合是目前国际上广泛采用的检查方法并被认为是乳腺影像学检查最佳的组合",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "X线摄影＋CT",
      "超声＋CT",
      "超声＋MRI",
      "X线摄影＋超声",
      "X线摄影＋MRI",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "X线摄影＋超声",
        "X 线摄影与超声检查相结合是目前国际上广泛采用的最佳乳腺影像学检查组合。原书第06章 A1 型题第 6 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1007",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于乳腺纤维腺瘤，下列哪项描述是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "纤维腺瘤在 X 线上通常表现为边缘光滑锐利，密度近似正常腺体密度",
      "部分纤维腺瘤在 X 线片上可见钙化",
      "超声或 MRI 检查无助于发现发生在致密型乳腺内的纤维腺瘤",
      "纤维腺瘤的 X 线检出率因肿瘤的部位、大小、病理特征、钙化情况及乳腺本身类型而异",
      "纤维腺瘤临床检查多为类圆形肿块，边界清楚，活动度好",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "超声或 MRI 检查无助于发现发生在致密型乳腺内的纤维腺瘤",
        "超声或 MRI 软组织分辨力高，有助于发现发生在致密型乳腺内的纤维腺瘤，该项描述错误。原书第06章 A1 型题第 7 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1008",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于乳腺超声检查，下列哪项描述是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "超声检查不能明确区分直径在 1cm 以上的囊、实性肿块",
      "超声检查具有实时性，可动态观察病灶的弹性和活动性",
      "对病变可行超声引导下活检及术前定位",
      "超声检查无射线辐射性",
      "超声检查能清晰显示乳腺内各层结构",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "超声检查不能明确区分直径在 1cm 以上的囊、实性肿块",
        "超声能明确区分直径在 1cm 以上的囊、实性肿块，该项描述错误。原书第06章 A1 型题第 8 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-a1009",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患者，女性，38 岁，右乳肿物发现 1 年，不伴疼痛及其他不适。临床检查于右乳中上可触及 1.5cm × 1.0cm 肿物，质地硬，边界清楚，活动度好，腋下未及肿大淋巴结。MRI 检查显示动态增强后于右乳中上可见一类圆形渐进性强化肿块，时间-信号强度曲线呈平台型，边界清楚，直径约 1.0cm，内部信号较均匀，考虑为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "乳腺脓肿",
      "乳腺囊肿",
      "乳腺炎症",
      "纤维腺瘤",
      "乳腺癌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "纤维腺瘤",
        "肿块边界清楚、动态增强呈渐进性强化、时间-信号强度曲线呈平台型、内部信号均匀，符合乳腺纤维腺瘤表现。原书第06章 A2 型题第 26 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），3 道（原书第 1–3 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch06-breast-short001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "乳腺恶性肿块在X线上表现是什么？",
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
        "乳腺恶性肿块在 X 线上表现：肿块的形状多呈分叶状或不规则形；肿块的边缘多呈小分叶、毛刺或浸润，或兼而有之；肿块密度多较高，高于同等大小的良性肿块；肿块内可伴或不伴有多发细小钙化。",
        "恶性肿块以分叶状或不规则形、边缘毛刺或浸润、密度较高为特征，可伴细小钙化。原书第06章简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-short002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "乳腺恶性钙化在X线上表现是什么？",
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
        "乳腺恶性钙化在 X 线上表现：恶性钙化形态多呈细小砂粒状、线样或线样分支状，大小不等，浓淡不一；分布上常密集成簇或呈线性及段性走行；钙化可单独存在，亦可位于肿块内或外。钙化的大小、形态和分布是鉴别良恶性病变的重要依据。",
        "恶性钙化以细小砂粒状、线样分支状、成簇或段样走行为特征。原书第06章简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch06-breast-short003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "乳腺纤维腺瘤在超声上诊断要点是什么？",
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
        "纤维腺瘤在超声上多表现为圆形或卵圆形，边缘光滑锐利，界限清楚，横径通常大于纵径，有时可见包膜回声，内部为均匀或比较均匀的低回声，肿块后方回声正常或增强，常有侧方声影，CDFI 显示病变通常无彩色血流或血流较少。",
        "纤维腺瘤超声以圆形或卵圆形、边缘光滑、横径大于纵径、内部均匀低回声、后方回声正常或增强及血流稀少为诊断要点。原书第06章简答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 / 3 成员（原书第 28–30 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch06-breast-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "平台型",
      "流出型",
      "阶梯上升型",
      "阶梯下降型",
      "渐增型",
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
        id: "ext-radiology-radiology-bank-ch06-breast-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "注药后于动态增强早期时相信号强度达到最高峰，在延迟期信号强度无明显变化的是",
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
            "平台型",
            "乳腺 MRI 动态增强曲线平台型表现为早期达峰后延迟期信号强度无明显变化。原书第06章 B 型题第 28 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-radiology-radiology-bank-ch06-breast-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在整个动态观察时间内，病变信号强度表现为缓慢持续增加的是",
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
            "渐增型",
            "乳腺 MRI 动态增强曲线渐增型表现为整个动态观察时间内病变信号强度缓慢持续增加。原书第06章 B 型题第 29 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-radiology-radiology-bank-ch06-breast-b001m3",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "病变于动态增强早期时相信号强度达到最高峰，其后减低的是",
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
            "流出型",
            "乳腺 MRI 动态增强曲线流出型表现为早期达峰后信号强度逐渐减低。原书第06章 B 型题第 30 题，参考答案键号 C。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
