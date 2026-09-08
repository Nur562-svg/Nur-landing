import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第九章 腹膜 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：0 题
 * - A1/A2/A3 型选择题（a1-single）：2 题
 * - 填空题（fill）：1 题
 * - 判断改错题 + 问答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：7 题（含 B1 组成员；须等于本文件预算 7）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含（一）A1 型题 8、（二）A2 型题 9、（三）B1 共用备选
 *   答案配伍题（1~3 题组、4~6 题组共 6 个小题）、填空题 4、判断改错题 5、
 *   名词解释 10、问答题 5。本文件按 7 道预算在原书顺序中取材并改写。
 *   涉及腹膜／腹膜腔、脏壁腹膜移动成韧带系膜，间位/外位/内位器官分类、小网膜、
 *   大网膜、网膜囊与 Winslow 孔等。A1/A2 型均映射为 a1-single；B1 型按项目规约
 *   组织为 Group b1（4~6 题「腹膜间位/外位/内位器官」组，组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题」→A1/A2 型题、「搁」→胸/
 *   「力/沩」→为、「直肠子宫陷凹（Douglas 腔）」竖排切词合并等），结构名、数值按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch9-peritoneum";
const locatorBase =
  "《系统解剖学习题集》第2版 第九章 腹膜 复习思考题 习题（扫描版原书核对PDF 第126–130页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），0 道（本文件未取材） */
const termItems: readonly AssessmentItemDefinition[] = [];

/** A1/A2 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch9-peritoneum-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "腹膜腔是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "有消化吸收功能",
      "男性腹膜腔与外界相通",
      "包裹所有的腹腔脏器",
      "由壁腹膜和脏腹膜围成",
      "有大量浆液润滑和减少脏器间的摩擦",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "由壁腹膜和脏腹膜围成",
        "腹膜腔是壁腹膜与脏腹膜相互移行、延续共同围成的潜在性腔隙；正常含少量浆液起润滑作用，男性为完全封闭的腔隙，女性借输卵管腹腔口经输卵管、子宫、阴道与外界相通。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch9-peritoneum-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于腹膜腔的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "有吸收功能",
      "全身最大的浆膜",
      "由壁腹膜和脏腹膜围成",
      "女性腹膜腔与外界相通",
      "包裹所有的腹腔脏器",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "包裹所有的腹腔脏器",
        "腹膜并不包裹所有腹腔脏器，而是壁腹膜与脏腹膜各自覆盖腹盆壁内面与脏器表面并相互移行围成潜在性腹膜腔；说其包裹所有腹腔脏器为错误叙述。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），1 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch9-peritoneum-fill001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "Winslow 孔（网膜孔）的围成：前界为____，后界为____，上界为____，下界为____。",
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
        "①肝十二指肠韧带 ②覆盖在下腔静脉表面的腹膜 ③肝尾状叶 ④十二指肠上部",
        "Winslow 孔即网膜孔，是网膜囊借以与腹膜腔其余部分相通的孔口，位于第12胸椎至第2腰椎体的前方。手术遇肝破裂或肝门附近动脉出血时，可将示指伸入孔内、拇指在小网膜游离缘前方加压以暂时止血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch9-peritoneum-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：腹膜腔是由脏腹膜、壁腹膜围成的浆膜腔，为一完全封闭的囊腔。",
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
        "错误；应将“为一完全封闭的囊腔”改为“男性为一完全封闭的囊腔，女性为一开放的囊腔”",
        "腹膜腔由壁腹膜与脏腹膜围成。男性为完全封闭的腔隙，而女性借输卵管腹腔口经输卵管、子宫、阴道与外界相通，故并非所有性别均完全封闭。",
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
    id: "ext-human-anatomy-ch9-peritoneum-b001",
    order: 3,
    questionKind: "b1",
    status: "available",
    groupPrompt: "(4~6 题共用备选答案)：选择下列器官所属的腹膜位置分类。",
    sharedChoices: ["肾", "睾丸", "卵巢", "胰", "子宫"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-human-anatomy-ch9-peritoneum-b001m1",
        order: 3,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "腹膜间位器官",
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
            "子宫",
            "腹膜间位器官指器官大部分被腹膜覆盖、仅少部分未被腹膜覆盖的器官，如肝、胆囊、子宫、膀胱等。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch9-peritoneum-b001m2",
        order: 4,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "腹膜外位器官",
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
            "肾",
            "腹膜外位器官指仅一面被腹膜覆盖、其余各面均不被腹膜覆盖的器官，如肾、肾上腺、胰、输尿管等。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch9-peritoneum-b001m3",
        order: 5,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "腹膜内位器官",
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
            "卵巢",
            "腹膜内位器官指器官全部突向腹膜腔、各面均被腹膜覆盖的器官，如胃、脾、空肠、卵巢等。",
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

/** 问答题（case 组内计分题），0 道（本文件未取材） */
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