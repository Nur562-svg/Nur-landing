import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 病理学学习指导与习题集 — 第8章 遗传性疾病和儿童疾病 题库提取（等比取样）
 * 来源：《病理学学习指导与习题集》（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：4 题
 * - 选择题（a1-single）：4 题（A1 型 3、A2 型病例题 1）
 * - 判断题 + 问答题（short-answer）：7 题（判断题 4、问答题 3）
 * - B1 配伍题：0 组（本书无 B1 型）
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、判断题、选择题（A1/A2）、问答题；本文件按 15 道预算在
 *   原书顺序内取材：名词解释取第 1–4 题、A1 型取第 1–3 题、A2 型取第 1 题、判断题取
 *   第 1–4 题、问答题取第 1–3 题；未纳入的题因预算所限。正确项对齐章末参考答案键号
 *   （A1/A2 各小节独立编号），选项已随机重排并同步 correctChoiceIndex。判断题答案按
 *   √/× 键号归位（√=对、×=错）。OCR 错字已按病理学医学语义恢复（如 特妹面容→特殊面容、
 *   destrophin→dystrophin、×连锁→X连锁、B地中海贫血→β地中海贫血、a珠蛋白→α珠蛋白、
 *   B珠蛋白→β珠蛋白、B-葡萄糖脑苷脂酶→β-葡萄糖脑苷脂酶、B-GBA→β-GBA、
 *   t（14921q）→t（14q21q）、先大愚型→先天愚型、3.岁→3 岁等），数值与单位保留原值，
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pathology-ch08-genetic-and-childhood-diseases";
const locatorBase =
  "《病理学学习指导与习题集》 第8章 遗传性疾病和儿童疾病 习题（核对PDF 第114–121页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道（原书第 1–4 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Gaucher 细胞（Gaucher cell）",
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
        "Gaucher 细胞（Gaucher cell）是指巨噬细胞溶酶体内葡萄糖脑苷脂贮积，细胞体积大、细胞浆呈“皱纹纸”样，称 Gaucher 细胞。",
        "Gaucher 病是 β-葡萄糖脑苷脂酶基因突变导致 β-GBA 活性缺乏，造成肝、脾和骨骼等器官的巨噬细胞溶酶体内葡萄糖脑苷脂贮积，这些细胞体积大（直径可达 10μm），胞浆呈“皱纹纸”样。原书第8章名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Down 综合征（Down syndrome）",
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
        "Down 综合征（Down syndrome）是由于生殖细胞在减数分裂过程中染色体不分离，导致患者出现明显智力落后、特殊面容、生长发育障碍及多发畸形。",
        "Down 综合征即 21-三体综合征（先天愚型），是最常见的常染色体病，其发生与母亲年龄等因素有关。原书第8章名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：先天畸形（congenital malformation）",
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
        "先天畸形（congenital malformation）是患儿出生时在外形或体内形成可识别的结构或功能缺陷。",
        "先天畸形是出生缺陷的主要类型之一，与遗传和（或）环境因素有密切关系，但还有多达 50% 的先天畸形原因不明。原书第8章名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：畸化（disruption）",
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
        "畸化（disruption）是由于缺血、感染和外伤等外部干扰因素使原来正常发育的器官出现异常。",
        "畸化也称继发性畸形，与先天畸形（原发性畸形）不同，其器官在发育早期原本正常，因外部干扰因素而出现异常。原书第8章名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道（A1 型第 1–3 题、A2 型第 1 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于碱基替换的生物学效应，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无义突变",
      "嵌合突变",
      "同义突变",
      "终止密码突变",
      "错义突变",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "嵌合突变",
        "碱基替换（点突变）的生物学效应包括同义突变、错义突变、无义突变和终止密码突变；嵌合突变是指个体体内同时存在两种或两种以上遗传性状不同的细胞系，不属于碱基替换的生物学效应。原书第8章 A1 型题第 1 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "遗传性疾病的特征是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "家族聚集性",
      "垂直传递",
      "以上都正确",
      "先天性和终身性",
      "遗传病在亲代和子代按一定比例出现",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "以上都正确",
        "遗传病具有垂直传递、先天性、终身性及家族聚集性的特点，并且在亲代和子代按一定比例出现，故以上各项均正确。原书第8章 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "染色体病可能出现的核型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "三倍体",
      "单倍体",
      "非整倍体",
      "以上都可能",
      "四倍体",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "以上都可能",
        "染色体病由染色体数目和结构异常导致；染色体数目异常包括整倍体改变（如单倍体、三倍体、四倍体）和非整倍体改变，故以上核型均可能出现。原书第8章 A1 型题第 3 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患儿，男，3 岁，近期常出现昏迷，身材较同龄儿童矮小。B 超发现肝脏肿大，空腹血糖低于正常值。该患儿最可能发生的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病毒性肝炎",
      "肝糖原贮积症",
      "慢性肝淤血",
      "糖尿病",
      "胆汁性肝硬化",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝糖原贮积症",
        "患儿肝肿大、空腹血糖低、身材矮小并出现昏迷，符合 I 型糖原贮积症（G-6-P 酶缺乏致糖原分解障碍）的临床表现。原书第8章 A2 型题第 1 题（原书编号 21），参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断题 + 问答题（short-answer），7 道（判断题第 1–4 题、问答题第 1–3 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题：肌营养不良症患儿开始出现爬楼梯困难、特殊的爬起站立姿势，常在 12 岁前丧失站立和行走能力。",
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
        "对。肌营养不良症患儿 3~5 岁起病，开始出现爬楼梯困难、特殊的爬起站立姿势，常在 12 岁前丧失站立和行走能力。",
        "Duchenne 型肌营养不良症患儿进行性肌萎缩、肌无力，3~5 岁起病，爬楼梯困难、爬起站立时先翘臀（特殊的爬起站立姿势），12 岁前丧失站立和行走能力，20 岁前常死于心力衰竭或呼吸衰竭。原书第8章判断题第 1 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题：肌营养不良症患者出现进行性肌萎缩、肌无力，常死于心力衰竭或呼吸衰竭。",
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
        "对。肌营养不良症患者出现进行性肌萎缩、肌无力，常死于心力衰竭或呼吸衰竭。",
        "Duchenne 型肌营养不良症患儿进行性肌萎缩、肌无力伴小腿腓肠肌假性肥大，因骨骼肌和心肌细胞膜结构完整性受影响，常在 20 岁前死于心力衰竭或呼吸衰竭。原书第8章判断题第 2 题，参考答案键号 √。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题：血友病 C 患者常在新生儿发病，皮肤、黏膜出血，关节大量积血。",
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
        "错。血友病 C（因子 XI 缺乏症）出血倾向较轻，一般不在新生儿期发病，也不以关节大量积血为主要表现。",
        "血友病是一组遗传性凝血功能障碍的出血性疾病，血友病 C 为因子 XI（PTA）缺乏，临床表现较轻；常在新生儿发病、皮肤黏膜出血、关节大量积血是重型血友病（如血友病 A/B）的特征。原书第8章判断题第 3 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "判断题：β 地中海贫血是由于 α 珠蛋白基因突变所致。",
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
        "错。β 地中海贫血是由于 β 珠蛋白基因突变所致，α 地中海贫血才是由于 α 珠蛋白基因突变所致。",
        "地中海贫血是血红蛋白中珠蛋白合成缺如或不足导致的溶血性贫血，属常染色体隐性遗传病；β 地中海贫血由 β 珠蛋白基因突变所致，α 地中海贫血由 α 珠蛋白基因突变所致，两者不能混淆。原书第8章判断题第 4 题，参考答案键号 ×。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short005",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述唐氏综合征患者常见的临床表现及可能的核型。",
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
        "临床表现：①智力落后、智商低；②特殊面容：头小而圆、面部扁平，眼距宽、眼裂小、外眼角上斜、眼内眦赘皮，耳位低、外耳小，唇厚舌大、流涎等；③特殊的皮肤纹理如贯通手；④发育迟缓：骨龄落后于年龄、四肢短、草鞋脚及出牙延迟等；⑤男性无生育能力，女性可有生育能力。此外，约 30% 患者有先天性心脏病，并发白血病的风险增加，40 岁后出现 Alzheimer 病，免疫力低下易发生感染。可能的核型：①标准型占 95%，核型为 47XX（或 XY），+21；②易位型占 2.5%~5%，核型为 46XX（或 XY），-14，+t（14q21q）；③嵌合体型占 2%~4%，核型为 46XX（或 XY）/47XX（或 XY），+21。",
        "Down 综合征（21-三体综合征）是最常见的常染色体病，由生殖细胞减数分裂时染色体不分离所致。原书第8章问答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short006",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述肌营养不良症患者的临床表现及发病机制。",
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
        "临床表现：进行性肌萎缩、肌无力伴小腿腓肠肌假性肥大。3~5 岁起病，患儿开始出现爬楼梯困难、特殊的爬起站立姿势，在 12 岁前丧失站立和行走能力，在 20 岁前死于心力衰竭或呼吸衰竭。发病机制：定位于 Xp21.2 的 DMD 基因突变，导致 dystrophin 不能合成，使骨骼肌和心肌细胞膜的结构完整性受影响，从而导致骨骼肌和心肌细胞萎缩和肌无力。",
        "最常见的 Duchenne 型肌营养不良症为 X 连锁隐性遗传，因 DMD 基因缺失突变导致维持肌细胞膜结构完整性的 dystrophin 不能合成。原书第8章问答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pathology-pathology-ch08-genetic-and-childhood-diseases-short007",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述出生缺陷的类型。",
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
        "出生缺陷的类型包括：①畸形（malformation）：某一器官或器官的某一部分原发性缺失，基本原因是发育过程中的遗传缺陷导致发育阻滞或方向错误，如房间隔缺损、室间隔缺损、唇裂、腭裂、神经管缺损等；②畸化（disruption）：由于缺血、感染和外伤等外部干扰因素使原来正常发育的器官出现异常，也称继发性畸形；③变形（deformation）：因不正常的机械力扭曲牵拉正常的结构而形成的缺陷；④序列征（sequence）：一种异常因素导致一系列继发性畸形，如 Potter 序列征；⑤综合征（syndrome）：已知致病病因并有一定的可识别的畸形模式，如染色体畸变引起的 Down 综合征。",
        "出生缺陷是患儿出生时在外形或体内形成的可识别的结构或功能缺陷，包括畸形、畸化、变形、序列征和综合征，与遗传和（或）环境因素密切相关。原书第8章问答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题（bGroups），0 组（本书无 B1 型） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
