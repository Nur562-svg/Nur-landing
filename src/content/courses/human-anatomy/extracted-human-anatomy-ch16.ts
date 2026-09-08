import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第十六章 神经系统的传导通路 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2/A3 型选择题（a1-single）：6 题
 * - 填空题（fill）：4 题
 * - 判断改错题 + 问答题（short-answer）：4 题
 * - B1 配伍题：2 组、共 7 个成员
 * - 独立记分题合计：23 题（含 B1 组成员；须等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型题 22、A2 型题 3、A3 型题（共用题干，1 组）、
 *   B1 共用备选答案配伍题（2 组、各 5 小题）、填空题 5、名词解释 10、
 *   判断改错题 20、问答题 10（含多个临床病例分析）。本文件按 23 道预算在原书
 *   顺序中取材并改写，覆盖深浅感觉（本体感觉、浅感觉/痛温触压）、视觉、听觉、
 *   瞳孔对光反射、锥体系/皮质核束/锥体外系及上下运动神经元、内囊各部纤维等。
 *   A1/A2/A3 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题/A，型题」→A1/A2/A3 型题、
 *   「第V~MI层/第1、N到MI层」→第Ⅰ~Ⅳ层、锥体交叉纤维比例「75%~90%」按原文保留、
 *   「三又神经节」→三叉神经节、「睛状神经节/睫状神经节」→睫状神经节等），
 *   神经核团、传导束、交叉部位、内囊各部和纤维投影区等结构名均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch16-conduction-pathways";
const locatorBase =
  "《系统解剖学习题集》第2版 第十六章 神经系统的传导通路 复习思考题 习题（扫描版原书核对PDF 第277–286页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：本体感觉",
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
        "本体感觉",
        "本体感觉指肌、腱、关节等器官在不同状态（运动或静止）时产生的感觉，又称深感觉，包括位置觉、运动觉和震动觉。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：锥体外系",
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
        "锥体外系",
        "锥体外系指锥体系以外的影响和控制躯体运动的一切传导途径，结构十分复杂，包括大脑皮质（主要是躯体运动区和躯体感觉区）、纹状体、背侧丘脑、红核、黑质和小脑等。锥体外系主要是协调锥体系的活动，两者协同完成运动功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "躯干和四肢的意识性本体感觉传导通路中，第2级神经元的胞体位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脊髓后角固有核",
      "三叉神经节内",
      "脊髓侧角",
      "延髓薄束核和楔束核",
      "延髓的下橄榄核",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "延髓薄束核和楔束核",
        "躯干和四肢意识性本体感觉通路第2级神经元胞体位于延髓的薄束核和楔束核，发出的纤维经内侧丘系交叉上行，止于背侧丘脑腹后外侧核。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者在闭眼时不能确定损伤对侧关节的位置、运动方向以及两点间距离，损伤的结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["薄束", "脊髓胸核", "小脑", "楔束", "内侧丘系"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内侧丘系",
        "闭眼时不能确定关节位置、运动方向及两点间距离属于深感觉（本体感觉与精细触觉）障碍，且症状在对侧，提示损伤位于内侧丘系（已交叉）水平。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "视觉传导通路中，何种结构的损伤可导致双眼视野颞侧半偏盲",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一侧视束",
      "一侧视神经",
      "视交叉中部",
      "一侧视交叉外侧部",
      "一侧外侧膝状体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "视交叉中部",
        "视交叉中部主要含有来自两眼视网膜鼻侧半交叉的纤维，损伤后双眼鼻侧半视网膜信息中断，导致双眼颞侧半视野偏盲（双颞侧偏盲）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "无论光照哪一侧瞳孔，患侧的瞳孔直接及间接对光反射都消失，但健侧的瞳孔对光反射都存在，损伤了",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "健侧的动眼神经",
      "健侧的视神经",
      "患侧的动眼神经",
      "视交叉",
      "患侧的视神经",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "患侧的动眼神经",
        "患侧瞳孔直接及间接对光反射均消失，而健侧反射存在，说明患侧动眼神经受损（缩瞳传出纤维中断），与传入（视神经）无关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "经过内囊膝的纤维束是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "视辐射",
      "皮质脊髓侧束",
      "皮质脊髓前束",
      "皮质核束",
      "丘脑中央辐射",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "皮质核束",
        "皮质核束经行于内囊膝，止于脑干脑神经运动核；丘脑中央辐射和视辐射及皮质脊髓束分别经行于内囊后肢或前部。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在皮质脊髓束中，发生锥体交叉的纤维约占",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["40%~50%", "100%", "10%~20%", "60%~70%", "75%~90%"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "75%~90%",
        "皮质脊髓束的纤维多数（约75%~90%）在延髓下端腹侧中线上交叉，构成皮质脊髓侧束，其余不交叉者构成皮质脊髓前束。",
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
    id: "ext-human-anatomy-ch16-conduction-pathways-fill001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "躯干和四肢意识性本体感觉传导通路的第1级神经元胞体位于____，第2级神经元的胞体位于____，第3级神经元的胞体位于____。",
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
        "①脊神经节内 ②延髓薄束核和楔束核 ③背侧丘脑腹后外侧核",
        "第1级神经元为脊神经节内假单极神经元，其中枢突经后根内侧部入后索组成薄束、楔束，止于延髓薄束核和楔束核（第2级）；第2级纤维经内侧丘系交叉止于背侧丘脑腹后外侧核（第3级），其纤维经内囊后肢投射至中央后回中、上部和中央旁小叶后部。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-fill002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "头面部痛温觉和粗触压觉传导通路的第1级神经元胞体位于____，其中枢突内传导痛温觉的纤维终止于____核，传导触压觉的纤维终止于____核；第2级神经元的胞体位于此核内，发出的纤维交叉后组成三叉丘系，止于____；第3级神经元的胞体在此结构内，其纤维最终投射到____。",
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
        "①三叉神经节内 ②三叉神经脊束核 ③三叉神经脑桥核 ④背侧丘脑腹后内侧核 ⑤中央后回下部",
        "头面部浅感觉第1级神经元胞体位于三叉神经节内（假单极神经元）；传导痛温觉的中枢突止于三叉神经脊束核，传导触压觉的止于三叉神经脑桥核；第2级纤维交叉组成三叉丘系止于背侧丘脑腹后内侧核（第3级），其纤维投射至中央后回下部。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-fill003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "在视觉传导通路中，____为第1级神经元，____为第2级神经元；来自两眼视网膜____半的纤维交叉，交叉后的纤维形成视束，终止于____；第3级神经元的胞体位于此结构内，其纤维经内囊____，最终投射到____。",
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
        "①视网膜双极细胞 ②节细胞 ③鼻侧半 ④外侧膝状体 ⑤后肢 ⑥端脑距状沟周围的视区皮质",
        "视觉通路中视网膜双极细胞为第1级神经元，节细胞为第2级神经元；节细胞轴突在视神经盘汇集成视神经，在视交叉内来自两眼视网膜鼻侧半的纤维交叉，交叉后视束止于外侧膝状体（第3级），其纤维组成视辐射经内囊后肢投射至端脑距状沟上、下的视区皮质（纹区）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-fill004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "锥体束包括____和____；前者下行经过内囊____，止于脊髓前角细胞；后者经行于内囊____，止于脑干的脑神经运动核。",
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
        "①皮质脊髓束 ②皮质核束 ③后肢的前部 ④膝",
        "锥体束由上运动神经元轴突组成，分为皮质脊髓束（经内囊后肢前部、大脑脚、脑桥、延髓，大部分交叉后止于脊髓前角运动细胞）和皮质核束（经内囊膝，止于脑干脑神经运动核）。",
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
    id: "ext-human-anatomy-ch16-conduction-pathways-short001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：一侧皮质脊髓束在锥体交叉以上的部位受损，主要引起同侧肢体的瘫痪，而躯干肌不受明显的影响。",
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
        "错误；应将“同侧”改为“对侧”",
        "皮质脊髓束的纤维大部分在延髓锥体交叉处交叉至对侧，故锥体交叉以上一侧受损（如内囊病变）主要引起对侧肢体不同程度瘫痪。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-short002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：如果一侧听觉传导通路在外侧丘系以上的部位受损，不会产生明显的听觉障碍。",
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
        "由于听觉通路在外侧丘系以上接受双耳双侧传入，一侧在外侧丘系以上受损不会产生明显的听觉障碍，仅为对侧轻微听力改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-short003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述躯干和四肢意识性本体感觉的传导通路。",
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
        "躯干和四肢意识性本体感觉传导通路的组成与走行",
        "该通路为3级神经元：第1级神经元为脊神经节内假单极神经元，周围突分布于肌、腱、关节处本体感受器及皮肤精细触觉感受器，中枢突经后根内侧部入脊髓后索；第5胸节以下的升支形成薄束，第4胸节以上的升支形成楔束，分别止于延髓薄束核和楔束核。第2级神经元胞体位于薄、楔束核内，其纤维向前绕过中央灰质腹侧与对侧相应纤维交叉，称内侧丘系交叉，交叉后构成内侧丘系，经脑桥被盖前缘、中脑红核外侧，止于背侧丘脑腹后外侧核。第3级神经元胞体在腹后外侧核，发出丘脑中央辐射，经内囊后肢主要投射至中央后回中、上部和中央旁小叶后部，部分纤维投射至中央前回。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-short004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "临床分析：某患者病后9周来诊，表现为右侧身体瘫痪，右臂右腿肌张力增强、腱反射亢进，左眼睑下垂、左眼球向外下方、左瞳孔散大、直接和间接对光反射消失，右鼻唇沟变浅、口角歪向左侧但闭眼与皱额正常，伸舌时舌尖偏向右侧且舌肌无萎缩。请运用解剖学知识解释症状，并判断受损部位。",
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
        "左侧中脑大脑脚底病变并累及左侧动眼神经（动眼神经交叉瘫）",
        "右侧肢体肌张力增强、腱反射亢进说明左侧皮质脊髓束（上运动神经元）受损；左眼睑下垂、眼球向外下方、瞳孔散大、直接和间接对光反射消失，为左侧动眼神经受损；右鼻唇沟变浅、口角歪向左侧而闭眼皱额正常、伸舌偏右且无萎缩，说明左侧皮质核束受损（右侧下部面神经核上瘫、右侧舌下神经核上瘫）。上述结构集中于左侧中脑大脑脚底并与左侧动眼神经毗邻，故判断为左侧中脑大脑脚病变并损伤左侧动眼神经，称动眼神经交叉瘫（Weber综合征）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组（3+4 成员），共 7 个独立记分成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "薄束",
      "楔束",
      "脊髓丘脑束",
      "三叉丘脑束",
      "外侧丘系",
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
        id: "ext-human-anatomy-ch16-conduction-pathways-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "传导上肢（含前胸部）深感觉的纤维束",
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
            "楔束",
            "第4胸节以上的后索升支组成楔束，传导躯干上部及上肢的意识性深感觉与精细触觉。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch16-conduction-pathways-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "传导头面部痛温觉的纤维束",
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
            "三叉丘脑束",
            "三叉神经脊束核（痛温觉）及脑桥核（触压觉）发出的第2级纤维交叉后组成三叉丘脑束（三叉丘系），止于背侧丘脑腹后内侧核。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch16-conduction-pathways-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "何纤维束损伤可能会影响到听觉",
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
            "外侧丘系",
            "听觉传导通路在脑桥至中脑间由蜗神经核上行的纤维组成外侧丘系，其受损可影响听觉；由于双耳双侧上传，故多为程度较轻的听觉障碍。",
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
  {
    id: "ext-human-anatomy-ch16-conduction-pathways-b002",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "皮质脊髓束",
      "皮质核束",
      "皮质脑桥束",
      "顶盖脊髓束",
      "下运动神经元",
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
        id: "ext-human-anatomy-ch16-conduction-pathways-b002m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "支配动眼神经核的纤维束",
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
            "皮质核束",
            "皮质核束支配脑干的脑神经运动核，包括动眼神经核（除受双侧支配的核外，多数脑神经运动核部分受双侧皮质核束支配）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch16-conduction-pathways-b002m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "肢体肌瘫痪，肌张力降低，并出现肌萎缩，可能损伤的结构",
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
            "下运动神经元",
            "下运动神经元（脊髓前角运动细胞、脑神经运动核）受损表现为弛缓性瘫痪：肌张力降低、肌萎缩、腱反射减弱或消失。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch16-conduction-pathways-b002m3",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对侧睑裂以下的面肌和对侧舌肌均瘫痪，可能损伤的结构",
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
            "皮质核束",
            "一侧皮质核束受损导致对侧睑裂以下的面肌瘫痪（面神经核上部受双侧支配、下部仅受对侧支配）和对侧舌肌瘫痪（舌下神经核仅受对侧支配）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch16-conduction-pathways-b002m4",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "同侧上、下肢肌痉挛性瘫痪，而躯干肌不受影响，可能损伤的结构",
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
            "皮质脊髓束",
            "皮质脊髓束支配四肢肌较为严格地对侧（或同侧）运动控制，部分躯干肌受双侧支配，故一侧皮质脊髓束受损主要引起同侧上、下肢痉挛性瘫痪而躯干肌相对不受影响。",
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