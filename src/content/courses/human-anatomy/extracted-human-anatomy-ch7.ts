import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第七章 男性生殖系统 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2/A3 型选择题（a1-single）：4 题
 * - 填空题（fill）：3 题
 * - 判断改错题 + 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：13 题（含 B1 组成员；须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含 A1 型题 30、A2 型题 8、B 型共用备选答案配伍题
 *   （共 12 个小题、3 组）、填空题 20、名词解释 10、判断改错题 7、
 *   问答题 5（均计分）。本文件按 13 道预算在原书顺序中取材并改写。
 *   涉及男性生殖腺（睾丸）、输精管道（附睾/输精管/射精管/男性尿道）与
 *   附属腺（精囊/前列腺/尿道球腺）及阴囊、阴茎等结构。
 *   A1/A2/A3 型均映射为 a1-single；B 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题」→A1/A2 型题、「称沩/力」→称为、
 *   「皱嬖」→皱襞、「尖朝上底朝下」→底朝上尖朝下等），结构名、数值与解剖学语义均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch7-male-reproductive";
const locatorBase =
  "《系统解剖学习题集》第2版 第七章 男性生殖系统 复习思考题 习题（扫描版原书核对PDF 第106–113页）";
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
    id: "ext-human-anatomy-ch7-male-reproductive-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：精索",
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
        "精索",
        "精索是一对由腹股沟管深环（腹环）延至睾丸上端的柔软圆索状结构，由三层被膜包被，内含输精管以及睾丸血管、蔓状静脉丛、输精管血管、淋巴管、神经丛和鞘韧带等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肉膜",
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
        "肉膜",
        "肉膜是位于阴囊皮下的浅筋膜，含有平滑肌纤维，可随外界环境温度的变化而舒缩，以调整阴囊内的温度。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题（统一映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch7-male-reproductive-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "男性的生殖腺是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["精囊", "前列腺", "睾丸", "尿道球腺", "附睾"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睾丸",
        "睾丸是男性的生殖腺，具有产生精子和分泌雄激素的双重功能；精囊、前列腺、尿道球腺属于附属腺。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "精子产生于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["精直小管", "生精小管", "睾丸间质细胞", "睾丸小隔", "睾丸网"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "生精小管",
        "精子由睾丸内生精小管上皮中的精原细胞分化发育而来；精直小管、睾丸网为运输通道，睾丸间质细胞分泌雄激素而非产生精子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分泌男性激素的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["附睾管", "白膜", "睾丸间质细胞", "睾丸纵隔", "睾丸网"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睾丸间质细胞",
        "男性激素（雄激素）由睾丸间质细胞分泌，位于生精小管之间的疏松结缔组织中。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "射精管开口于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["尿道球部", "尿道膜部", "尿道前列腺部", "尿道海绵体部", "舟状窝"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尿道前列腺部",
        "射精管由输精管末端与精囊的排泄管汇合而成，向前下穿前列腺实质，开口于尿道前列腺部后壁上。",
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
    id: "ext-human-anatomy-ch7-male-reproductive-fill001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "男性生殖系统中，输送精子的管道包括____、____、____和____。",
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
        "①附睾 ②输精管 ③射精管 ④男性尿道",
        "输送精子的管道（输精管道）包括附睾、输精管、射精管和男性尿道。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-fill002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "男性附属腺包括____、____和____，它们的分泌物参与组成____。",
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
        "①精囊 ②尿道球腺 ③前列腺 ④精液",
        "男性附属腺包括精囊、前列腺和尿道球腺三对，其分泌物共同参与组成精液。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-fill003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "男性尿道有____、____和____三处生理性狭窄，其中____最狭窄。",
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
        "①尿道内口 ②尿道膜部 ③尿道外口 ④尿道外口",
        "男性尿道有三处生理性狭窄，由近及远依次为尿道内口、尿道膜部和尿道外口，其中尿道外口最狭窄。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题 + 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch7-male-reproductive-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：男性生殖腺包括睾丸、精囊、前列腺和尿道球腺。",
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
        "错误；应将“生殖腺”改为“附属腺体”，并删除“睾丸”",
        "男性生殖腺仅指睾丸；精囊、前列腺和尿道球腺属于附属腺体，不属于生殖腺，故原题表述错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch7-male-reproductive-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述输精管的分部及其特点。",
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
        "输精管的分部及其特点",
        "输精管依其行程分为四部：①睾丸部——始于附睾尾，最短较迂曲，沿睾丸后缘和附睾内侧行至睾丸上端；②精索部——介于睾丸上端与腹股沟管皮下环之间，在精索内位于其他结构的后内侧，位置表浅易触及，为输精管结扎的理想部位；③腹股沟管部——全程位于腹股沟管的精索内；④盆部——为最长一段，经腹股沟管腹环出管后弯向内下，越过髂外动、静脉，沿盆侧壁腹膜外行向后下，跨越输尿管末端前内侧至膀胱底后面和直肠前面；两侧输精管在此逐渐接近并膨大形成输精管壶腹，壶腹末端变细穿前列腺，与精囊的输出管汇合成射精管。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（选自原书 B 型题（5~8 题）组） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-human-anatomy-ch7-male-reproductive-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "输精管壶腹",
      "输精管腹股沟管部",
      "输精管盆部",
      "输精管精索部",
      "输精管睾丸部",
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
        id: "ext-human-anatomy-ch7-male-reproductive-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "输精管结扎常选部位是",
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
            "输精管精索部",
            "输精管精索部介于睾丸上端与腹股沟管皮下环之间，位置表浅、易于触及，是输精管结扎的常选部位。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch7-male-reproductive-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "肛门（直肠）指检时可以触及的结构是",
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
            "输精管壶腹",
            "两侧输精管在膀胱底后面（前方为膀胱、后方为直肠）逐渐接近并膨大形成输精管壶腹，因而可经直肠前壁行肛门指检触及该结构。",
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