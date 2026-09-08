import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第26章 神经系统的发生 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社，本章页脚注作者 刘慧雯、刘东华）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：7 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：4 题
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：20 题（须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书习题区依序为 A1 型选择题 14 题、B1 型 2 组（第 15~19、20~25 题）、
 *   多选题 7 题、名词解释 5 题、简答题 3 题、论述题 1 题，无填空题。本文件按 20 道预算在
 *   原文顺序内取材：A1 型 7 题（第 1、5、6、7、10、13、14 题，正确项对齐章末参考答案
 *   键号）、B1 第 15~19 题整组 5 个成员（脑的来源配伍）、名词解释 4（成神经细胞、拉特克
 *   囊、脑积水、脊髓裂）、简答 3 道 + 论述 1 道。另一组 B1（20~25）与多选 7 道未选取（预
 *   算所限）。双栏错序已按医学语义重建题干/选项（如第 5 周五个脑区顺序、脑室起源），发育
 *   阶段、脑区名称均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch26-nervous";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第26章 神经系统的发生 复习思考题 习题（核对PDF 第209–215页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch26-nervous-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：成神经细胞",
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
        "成神经细胞",
        "由神经上皮细胞增殖、迁移分化而来，一般不再分裂增殖，先后依次演变为无极成神经细胞、双极成神经细胞、单极成神经细胞和多极成神经细胞，最后分化为神经细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：拉特克囊",
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
        "拉特克囊",
        "胚胎早期口凹顶部外胚层上皮向背侧间充质内凹陷形成的一个囊状突起，是腺垂体的原基。拉特克囊的远端长大并与神经垂体芽相贴，根部退化消失，与口腔脱离。囊前壁迅速增大形成垂体的远侧部，后壁生长缓慢形成中间部，囊腔大部消失，只残留小的裂隙。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：脑积水",
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
        "脑积水",
        "由于脑室系统发育障碍、脑脊液生成和吸收失去平衡引起的颅内脑脊液异常增多。由中脑导水管和室间孔狭窄或闭锁引起者最常见。临床体征主要见于胎儿头部特别大。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：脊髓裂",
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
        "脊髓裂",
        "由于尾侧的神经沟未闭，大范围的椎弓未发育，表面皮肤裂开，脊髓发育不全并直接暴露于体表。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），7 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch26-nervous-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "神经管壁早期分化形成三层，由内向外依次为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "室管膜层、套层和边缘层",
      "套层、边缘层和室管膜层",
      "边缘层、套层和室管膜层",
      "边缘层、套层和室管膜层",
      "套层、室管膜层和边缘层",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "室管膜层、套层和边缘层",
        "复习纲要：神经上皮停止分化后变为室管膜层；迁至外周的成神经细胞和成神经胶质细胞构成套层；成神经细胞突起伸至套层外周形成边缘层。自内向外为室管膜层、套层和边缘层。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "胚胎第 5 周，三个脑泡形成的脑从头至尾依次是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "端脑、中脑、间脑、后脑和末脑",
      "端脑、间脑、中脑、后脑和末脑",
      "端脑、间脑、后脑、中脑和末脑",
      "端脑、中脑、后脑、间脑和末脑",
      "间脑、端脑、中脑、后脑和末脑",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "端脑、间脑、中脑、后脑和末脑",
        "复习纲要：前脑泡头端膨大形成左右两个端脑、尾端形成间脑；中脑泡演变为中脑；菱脑泡头段演变为后脑、尾段演变为末脑。故从头至尾依次为端脑、间脑、中脑、后脑和末脑。原书 A1 答案第 5 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "小脑来源于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["端脑", "间脑", "中脑", "后脑", "末脑"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "后脑",
        "复习纲要：菱脑泡中的后脑又演变为脑桥和小脑。故小脑来源于后脑。原书 A1 答案第 6 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于神经管的神经上皮的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "最初由单层柱状上皮构成，后来变为假复层柱状上皮",
      "基膜较厚，称外界膜",
      "细胞不断分裂增殖",
      "分化为成神经细胞和成神经胶质细胞",
      "其外周有边缘层",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "其外周有边缘层",
        "神经上皮细胞分裂增殖、分化出成神经细胞和成神经胶质细胞并迁至外周构成套层；套层的成神经细胞再长出突起伸至套层外周形成边缘层。边缘层并非紧贴于神经上皮外周，故该项描述错误，为本题应选答案。原书 A1 答案第 7 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "腺垂体来自",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["口凹外胚层", "中胚层", "内胚层", "神经嵴", "神经管"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "口凹外胚层",
        "复习纲要：口凹顶的外胚层上皮向背侧凹陷形成拉特克囊，其远端长大形成腺垂体。故腺垂体来自口凹外胚层。原书 A1 答案第 10 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "诱导神经管发生的结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["原条", "原结", "脊索", "体节", "神经沟"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脊索",
        "复习纲要背景知识：脊索上方的神经外胚层在脊索的诱导下增厚形成神经板并卷曲成神经管。原书 A1 答案第 13 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大脑皮质组织发生中最先出现的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "顶叶皮质",
      "额叶皮质",
      "枕叶皮质",
      "颞叶皮质",
      "海马和齿状回",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "海马和齿状回",
        "复习纲要：大脑皮质的发生分古皮质、旧皮质和新皮质三个阶段。海马和齿状回是最早出现的皮质结构，相当于古皮质。原书 A1 答案第 14 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/问/论述题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch26-nervous-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述脊膜膨出和脊髓脊膜膨出。",
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
        "脊膜膨出和脊髓脊膜膨出",
        "脊柱裂可发生于脊柱各段，最常见于腰骶部，其发生程度可有不同。其中，中度的脊柱裂比较多见，在患处常形成一个大小不等的皮肤囊袋。如果囊袋中只有脊膜和脑脊液，称脊膜膨出；如果囊袋中既有脊膜和脑脊液，又有脊髓和神经根，则称脊髓脊膜膨出。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述神经上皮的分化。",
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
        "神经上皮的分化",
        "当神经管形成后，管壁变为假复层柱状上皮，上皮的基膜较厚，称外界膜。神经上皮细胞不断分裂增殖，部分细胞迁至神经上皮的外周，称为成神经细胞。之后神经上皮细胞又分化出成神经胶质细胞，也迁至神经上皮的外周。于是，在神经上皮的外周由成神经细胞和成神经胶质细胞构成了一层新细胞层，称套层。此时原位的神经上皮停止分化，变成一层立方形或矮柱状细胞，称室管膜层。套层的成神经细胞起初为圆球形，很快长出突起，突起逐渐增长并伸至套层外周，形成一层新的结构，称边缘层。随着成神经细胞的分化，套层中的成神经胶质细胞分化为星形胶质细胞和少突胶质细胞，并有部分细胞进入边缘层。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述脊髓的发生过程。",
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
        "脊髓的发生过程",
        "神经管的尾段分化为脊髓。套层分化为脊髓灰质，边缘层分化为白质，管腔演化为中央管。神经管的两侧壁因套层中成神经细胞和成神经胶质细胞的增生而迅速增厚，腹侧部增厚形成左右基板，背侧部增厚形成左右翼板。基板形成灰质前角，其中的成神经细胞分化为躯体运动神经元；翼板形成灰质后角，成神经细胞分化为中间神经元。若干成神经细胞聚集于基板和翼板之间形成侧角，成神经细胞分化为内脏传出神经元。边缘层因灰质内神经细胞突起的生长和神经胶质细胞的产生而增厚，发育为白质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch26-nervous-short004",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述大脑的来源和大脑皮质的组织发生。",
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
        "大脑的来源与大脑皮质的组织发生",
        "胚胎第 4 周，神经管头端依次形成前脑泡、中脑泡和后脑泡。至第 5 周，前脑泡的头端向两侧膨大，形成左右两个端脑，以后演变为大脑两个半球。大脑皮质的发生分三个阶段：最早出现古皮质，继而出现旧皮质，最晚出现新皮质。最早出现的皮质结构为海马和齿状回，相当于古皮质；随后，在纹状体的外侧，大量成神经细胞聚集并分化，形成梨状皮质，相当于旧皮质；不久，神经上皮分裂、增殖、分化为成神经细胞，并分期分批迁至表层分化为神经细胞，形成新皮质。由于成神经细胞是分期分批迁移的，皮质中的神经细胞呈层状分布。越早产生和迁移的细胞其位置越深，反之则浅，即靠近皮质表层。胎儿出生时，新皮质已形成 6 层结构。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch26-nervous-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["端脑", "间脑", "中脑", "后脑", "末脑"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch26-nervous-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "大脑半球来源于",
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
            "端脑",
            "前脑泡头端向两侧膨大形成左右两个端脑，后演变为大脑两半球。原书 B1 第 15 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch26-nervous-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "神经垂体来源于",
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
            "间脑",
            "复习纲要：间脑底部的神经外胚层向腹侧延伸形成神经垂体芽，其远端膨大形成神经垂体。原书 B1 第 16 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch26-nervous-b001m3",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脑桥来源于",
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
            "后脑",
            "复习纲要：菱脑泡头段演变为后脑，后脑又演变为脑桥和小脑。故脑桥来源于后脑。原书 B1 第 17 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch26-nervous-b001m4",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "小脑来源于",
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
            "后脑",
            "复习纲要：后脑又演变为脑桥和小脑，故小脑来源于后脑。原书 B1 第 18 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch26-nervous-b001m5",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "延髓来源于",
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
            "末脑",
            "复习纲要：菱脑泡尾段演变为末脑，末脑演变为延髓。原书 B1 第 19 题答案 E。",
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