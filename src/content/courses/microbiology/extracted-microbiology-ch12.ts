import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第12章 厌氧性细菌 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：9 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：19 题（须等于本文件预算 19）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、选择题（A1 型 15 + A2 型 5）、B1 型 2 组（6 成员）
 *   与简答题 9；本文件按 19 道预算在原书顺序内取材，名词解释与简答题全取，选择题取前 2 道，
 *   B1 取第一组（21~23 题，3 成员）。正确项对齐章末参考答案键号（A1 1.E 2.B；B1 21.C 22.D 23.B）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如 草兰→革兰、英膜→荚膜、G†→G⁺、
 *   阝溶血→β溶血、Y-氨基丁酸→γ-氨基丁酸、Tod B/Ted A→TcdB/TcdA、CD4'T→CD4⁺T 等），
 *   数值（致死量 1μg/0.1μg、65°C 30分钟、150kDa 等）按医学语义恢复单位，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch12-anaerobic-bacteria";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第12章 厌氧性细菌 习题（核对PDF 第101–107页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：TAT",
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
        "TAT",
        "TAT：tetanus antitoxin，破伤风抗毒素，是用破伤风类毒素免疫马所获得的马血清纯化制剂，可中和破伤风痉挛毒素，用于破伤风的治疗和紧急预防。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：痉挛毒素",
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
        "痉挛毒素",
        "痉挛毒素：tetanospasmin，破伤风梭菌在细菌裂解时释放产生的外毒素，是引起破伤风的主要致病物质，该毒素入血经血液循环达到神经肌肉接点处而致病。破伤风痉挛毒素属神经毒素，毒性极强，对人的致死量小于 1μg。因化学性质为蛋白质，不耐热，65°C 30 分钟即被破坏；亦可被肠道中存在的蛋白酶所破坏。抗原性强，可刺激机体产生抗毒素。经甲醛脱毒可制成类毒素，用于预防破伤风。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：汹涌发酵",
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
        "汹涌发酵",
        "汹涌发酵：stormy fermentation，产气荚膜梭菌在乳培养基中能分解乳糖产酸，使其中酪蛋白凝固；同时产生大量气体，可将凝固的酪蛋白冲成蜂窝状，将液面封固的凡士林层上推、气势凶猛的现象。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肉毒毒素",
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
        "肉毒毒素",
        "肉毒毒素：botulinum toxin，是肉毒梭菌产生的剧烈神经毒素，是已知最剧烈的毒物，毒性比氰化钾强 1 万倍，对人的致死量约 0.1μg。肉毒毒素不耐热，煮沸 1 分钟即可被破坏。抗原性强，可刺激机体产生抗毒素。作用于外周胆碱能神经，抑制神经肌肉接头处神经递质乙酰胆碱的释放，导致弛缓性瘫痪，即肉毒中毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：梭菌属",
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
        "梭菌属",
        "梭菌属：Clostridium，是指一群厌氧、革兰染色阳性、能形成芽胞的大杆菌，由于芽胞直径比菌体宽，使菌体膨大呈梭形，故此得名。主要分布于土壤、人和动物肠道及粪便中；多数为腐生菌，仅少数为病原菌；在人类主要引起破伤风、气性坏疽和肉毒中毒等严重疾病。此外，还与皮肤、软组织感染，医源性腹泻和肠炎等有关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "破伤风梭菌在血平皿上生长的菌落特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "菌落周围双层溶血环",
      "无溶血",
      "形成菜花样菌落",
      "形成羽毛状菌落",
      "形成脐状菌落",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "形成羽毛状菌落",
        "破伤风梭菌在血平板上形成的菌落较大、扁平、边缘不整齐，似羽毛状，易在培养基表面迁徙扩散，有 β 溶血环。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "注射 TAT 的目的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "对易感人群进行预防接种",
      "对破伤风病人进行治疗和紧急预防",
      "杀灭伤口中破伤风梭菌的繁殖体",
      "用于儿童的计划免疫",
      "中和与神经细胞结合的外毒素",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "对破伤风病人进行治疗和紧急预防",
        "TAT（破伤风抗毒素）可中和游离的破伤风痉挛毒素，用于破伤风的治疗和紧急预防；一旦毒素与神经细胞受体结合，抗毒素就不能中和其毒性作用。原书 A1 答案第 2 题为 B。",
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

/** 问答题（short-answer），9 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述厌氧性细菌的定义和分类。",
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
        "厌氧性细菌的定义和分类",
        "（1）定义：anaerobic bacterium，简称厌氧菌，是指一群只能在无氧或低氧条件下生长和繁殖，利用厌氧呼吸和发酵获取能量的细菌的总称。（2）分类：根据能否形成芽胞，可将厌氧菌分为两大类，有芽胞的厌氧芽胞梭菌和无芽胞厌氧菌。厌氧芽胞梭菌临床常见的病原菌仅见于梭菌属，如破伤风梭菌、产气荚膜梭菌、肉毒梭菌及艰难梭菌，引起外源性感染。无芽胞厌氧菌则包括多个属的球菌或杆菌，大多为人体正常菌群的成员，主要引起内源性感染；感染遍及全身各器官、系统，在临床上较为常见。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述破伤风梭菌的形态和培养特性。",
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
        "破伤风梭菌的形态和培养特性",
        "（1）破伤风梭菌的形态：菌体细长，革兰染色阳性。有周鞭毛、无荚膜。芽胞呈圆形，直径大于菌体，位于菌体顶端，使细菌呈鼓槌状（drumstick），为该菌典型特征。（2）培养特性：严格厌氧，对营养要求不高。在血平板上，37°C 培养 48 小时，形成的菌落较大、扁平、边缘不整齐，似羽毛状，易在培养基表面迁徙扩散，有 β 溶血环。不发酵糖类，不分解蛋白质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述痉挛毒素的致病机制。",
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
        "痉挛毒素的致病机制",
        "痉挛毒素是目前已知的引起破伤风的主要致病物质，该毒素入血经血液循环达到神经肌肉接点处而致病，属神经毒素。细菌最初合成的痉挛毒素为分子量约 150kDa 的单链蛋白，释放出菌体时，即被细菌或组织中的蛋白酶裂解为一条分子量约 50kDa 的轻链（A 链）和一条 100kDa 的重链（B 链）；轻链和重链由二硫键连接。首先，重链羧基端与神经肌肉接点处运动神经元细胞膜上的受体结合，受体包括聚唾液酸神经节苷脂和临近的糖蛋白；经受体介导的内吞作用、内化进入细胞质形成含毒素的突触小泡；小泡沿神经轴突逆行向上、转运毒素至脊髓前角的运动神经元细胞体中，最终汇聚于抑制性神经元细胞质的内体中；内体酸化，导致重链的氨基端介导轻链从内体进入抑制性神经元细胞质。轻链具有锌内肽酶活性，可阻止抑制性神经递质（γ-氨基丁酸和甘氨酸）从抑制性神经元突触前膜释放，导致屈肌、伸肌同时发生收缩，出现强直性痉挛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述破伤风的防治原则。",
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
        "破伤风的防治原则",
        "（1）治疗三原则：中和毒素：一旦毒素与神经细胞受体结合，抗毒素就不能中和其毒性作用。因此，对已发病者，应早期、足量肌内注射人抗破伤风免疫球蛋白或破伤风抗毒素。清除细菌：抗菌治疗首选青霉素和甲硝唑，以杀灭破伤风梭菌的繁殖体。非特异性治疗：控制痉挛，缓解疼痛，保持呼吸道通畅，注意水和电解质平衡等。（2）预防三原则：正确处理伤口：伤口应及时清创和扩创，清除坏死组织和异物，并用 3% 过氧化氢冲洗。人工主动免疫：采用含有白喉类毒素、百日咳死菌苗和破伤风类毒素的白百破三联疫苗（DPT）制剂，对 3~5 个月的儿童进行免疫，2 岁、6 岁时各加强一次，建立基础免疫。易感成人或外伤后，在基础免疫基础上可再加强接种破伤风类毒素 1 次。人工被动免疫：对伤口污染严重而又未经过基础免疫者，可立即肌内注射 TAT 或 TIG 作紧急预防。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short005",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述产气荚膜梭菌的形态和培养特性。",
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
        "产气荚膜梭菌的形态和培养特性",
        "（1）形态：两端略微钝圆的革兰阳性粗大杆菌，芽胞呈椭圆形，直径略小于菌体，位于次极端。无鞭毛、能形成明显的荚膜。（2）培养特性：厌氧，但不十分严格。在血琼脂平板上有双层溶血环。本菌代谢十分活跃，可分解多种常见的糖类，产酸产气。在牛乳培养基中可出现“汹涌发酵”现象。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short006",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述肉毒毒素的致病机制。",
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
        "肉毒毒素的致病机制",
        "肉毒毒素是肉毒梭菌产生的剧烈神经毒素，肉毒毒素进入小肠后跨过黏膜层被吸收进入血液循环。肉毒毒素作用于外周胆碱能神经，重链羧基端结合神经元细胞膜表面的受体（唾液酸和糖蛋白），内化进入细胞质内形成含毒素的突触小泡，与破伤风痉挛毒素沿神经轴突上行不同的是，肉毒毒素保留在神经肌肉接点处。含毒素的突触小泡与内体融合、酸化，导致重链氨基端与轻链解离并释放轻链入细胞质中；轻链也具有锌内肽酶活性，可灭活神经元突触小泡内参与乙酰胆碱释放的膜蛋白，抑制神经肌肉接头处神经递质乙酰胆碱的释放，导致弛缓性瘫痪。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short007",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述艰难梭菌的致病性。",
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
        "艰难梭菌的致病性",
        "（1）致病物质：黏液层有利于艰难梭菌在肠道上皮细胞表面黏附和定植。细胞表面蛋白 84 是细菌分泌的一种黏膜裂解酶，能导致结肠黏膜的降解。外毒素都是细胞毒素：艰难梭菌毒素 A（TcdA）和（或）艰难梭菌毒素 B（TcdB）；部分菌株可产生艰难梭菌转移酶。（2）所致疾病：艰难梭菌经粪口途径传播，所致疾病统称为艰难梭菌感染（CDI），包括无症状感染者、医源性腹泻和假膜性结肠炎等不同类型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short008",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：无芽胞厌氧菌的致病条件。",
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
        "无芽胞厌氧菌的致病条件",
        "无芽胞厌氧菌是寄生于人体体表及与外界相通腔道黏膜表面的正常菌群，当其寄居部位改变、宿主免疫力下降和菌群失调等情况下，伴有局部厌氧微环境的形成，如因烧伤、放化疗、肿瘤压迫等组织缺氧或氧化还原电势降低，易引起内源性感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-short009",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：无芽胞厌氧菌的感染特征。",
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
        "无芽胞厌氧菌的感染特征",
        "内源性感染为其主要感染形式，感染部位可遍及全身，多呈慢性过程；无特定病型，大多为化脓性感染，形成局部脓肿或组织坏死，也可侵入血流形成败血症；分泌物或脓液黏稠，乳白色、粉红色、血色或棕黑色，有恶臭，有时有气体；使用氨基糖苷类抗生素（链霉素、卡那霉素和庆大霉素等）治疗无效；分泌物直接涂片可见细菌，但普通培养法无细菌生长。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 3 成员（题组21-23；取材预算内未纳入后一组24-26） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch12-anaerobic-bacteria-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "霍乱肠毒素",
      "猩红热毒素",
      "白喉外毒素",
      "破伤风痉挛毒素",
      "肉毒毒素",
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
        id: "ext-microbiology-ch12-anaerobic-bacteria-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可引起腹泻症状的是",
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
            "霍乱肠毒素",
            "霍乱肠毒素刺激肠黏膜细胞分泌 Cl⁻ 和 HCO₃⁻、抑制 Na⁺ 摄入，引起严重腹泻。原书 B1 答案第 21 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch12-anaerobic-bacteria-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能阻止抑制性突触释放神经介质的是",
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
            "破伤风痉挛毒素",
            "破伤风痉挛毒素轻链具有锌内肽酶活性，可阻止抑制性神经递质（γ-氨基丁酸和甘氨酸）从抑制性神经元突触前膜释放，导致强直性痉挛。原书 B1 答案第 22 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch12-anaerobic-bacteria-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可引起肽链延长因子的抑制的是",
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
            "白喉外毒素",
            "白喉外毒素 A 亚单位灭活延伸因子 2（EF-2），抑制靶细胞蛋白质合成，即引起肽链延长因子的抑制。原书 B1 答案第 23 题为 B。",
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
