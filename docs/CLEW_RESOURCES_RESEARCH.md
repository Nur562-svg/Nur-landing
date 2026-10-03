# Ariadne Clew 可用资源调研报告（2026-09-30 深夜）

日期：2026-09-30。状态：深度调研完成，供 M2 任务书参考。
调研范围：教材编译、PDF 解析、Agent Harness、间隔重复、医学教育、知识图谱。

---

## 一、教材编译/课件编译（核心参考）

### 1. book-to-skill（12.7k★，MIT）

**是什么**：将 PDF/EPUB/DOCX 技术书籍编译为 AI Agent 可加载的 Skill 文件。

**核心机制**：
- 本地提取（pdftotext/docling/ebooklib）→ LLM 结构化分析 → 生成 `SKILL.md` + `chapters/` + `glossary.md` + `patterns.md` + `cheatsheet.md`
- 运行时只加载 ~4,000 token 核心 + ~1,000 token 相关章节，比全量加载省 24-51× token

**对 Clew 的借鉴**：
- **预编译思想**：教材处理一次，多次使用，避免每次重复解析
- **章节级按需加载**：Clew 的讲义/答疑可按章节加载，不整本载入
- **结构>摘要**：生成结构化知识（框架、规则、反模式），不是简单总结

**GitHub**: https://github.com/awesome-edu/book-to-skill

---

### 2. 知纲（课件编译器，TRAE 大赛作品）

**是什么**：Web 端课件编译工具，PDF/PPTX → 两层知识结构 → 知识卡片 → 完整笔记 → 全库问答。

**核心机制**：
- **证据层**：逐页提取原文，存 EvidenceAtom，用户可编辑
- **两层知识结构**：CourseTopic（粗粒度）+ UnitContentItem（细粒度）
- **AI 重排**：拓扑排序推荐学习顺序，用户可切换原序/AI 序
- **三视图**：初学（完整）/ 复习（折叠推导）/ 备考（最大压缩）
- **失败隔离**：单知识点失败不影响其他，可单独重试

**对 Clew 的借鉴**：
- **证据绑定**：每个知识点绑定原文页码，可追溯（医学学习硬要求）
- **两层结构**：Clew 的 Chapter → KP 已有，可增加 KP 内部结构（定义/公式/推导/案例）
- **三视图**：Clew 的讲义可派生初学/复习/备考三视图，不重新生成事实
- **失败隔离**：单章/单 KP 失败不阻塞整体

**GitHub**: https://github.com/lingchuan2024/zhigang-courseware-compiler

---

### 3. OpenMAIC（清华大学，AGPL-3.0）

**是什么**：多智能体编排将文档转为交互式课堂（幻灯片+测验+模拟+项目）。

**核心机制**：
- 两阶段生成：大纲生成 → 场景内容生成
- LangGraph 状态机管理智能体轮次
- 播放引擎：idle → playing → live

**对 Clew 的借鉴**：
- **状态机**：Clew 的教材处理也可用状态机（uploaded → toc_ready → extracting → ready）
- **播放引擎**：讲义生成进度可作为「播放」状态管理

**注意**：AGPL-3.0 传染性，商业使用需联系清华。只借鉴思路，不抄代码。

**GitHub**: https://github.com/thu-maic/openmaic

---

## 二、PDF 解析工具（技术选型）

| 工具 | 语言 | 特点 | 适用场景 |
|------|------|------|---------|
| **pdf-ts** | TypeScript | 基于 Mozilla PDF.js，简单 API | 文字层提取（已有） |
| **pdfnano** | TypeScript | 无外部依赖，恢复损坏 PDF | 备用方案 |
| **pdfexcavator** | TypeScript | 表格/图形/布局分析，OCR 支持 | 复杂教材（表格多） |
| **MinerU** | Python | 复杂 PDF（公式/表格/OCR）| 扫描件/复杂排版（后置） |
| **docling** | Python | 技术书籍（代码/表格/公式）| 医学教材（公式多）|

**Clew 现状**：已用 `pdfjs-dist` 文字层提取。
**建议**：保持现有，复杂教材后置接 pdfexcavator 或 MinerU。

---

## 三、Agent Harness/框架（架构参考）

### 1. Vercel AI SDK ToolLoopAgent（已安装）

**是什么**：`ai` 包内置的 Agent 循环，支持工具调用、流式输出、人工审批。

**核心 API**：
```typescript
import { ToolLoopAgent, tool } from 'ai';

const agent = new ToolLoopAgent({
  model: openai('gpt-4'),
  tools: { search: tool({ ... }) },
  stopWhen: isStepCount(10),
});
```

**对 Clew 的借鉴**：
- **已安装**：Ariadne 已有 `ai` + `@ai-sdk/openai`，无需新增依赖
- **provider-neutral**：换模型只需改 provider，不改业务逻辑
- **工具审批**：`needsApproval` → Clew 的配额检查

---

### 2. Open Harness（TypeScript，MIT）

**是什么**：基于 Vercel AI SDK 的轻量 Agent Harness，文件系统工具 + bash + MCP。

**核心机制**：
- `new Agent({ model, tools, subagents })`
- 事件流：`text.delta` / `tool.done` / `done`
- AGENTS.md 支持

**对 Clew 的借鉴**：
- **子 Agent**：Clew 的萃取/讲义/答疑可作为子 Agent，并行处理
- **事件流**：Clew 的 SSE 可标准化为事件流

**GitHub**: https://github.com/maxgfeller/open-harness

---

### 3. Flue（Astro 团队，TypeScript）

**是什么**：Agent Harness 框架，createAgent() + createWorkflow() + 沙箱。

**核心机制**：
- 五包：@flue/runtime / @flue/cli / @flue/sdk / @flue/opentelemetry / @flue/postgres
- 沙箱适配器：local() / daytona() / 自定义
- Skills 系统：Markdown 文件作为一等公民

**对 Clew 的借鉴**：
- **Skills 系统**：Clew 的医学知识可作为 Skill 加载（如「中医诊断学·脏腑辨证」）
- **沙箱**：Clew 的教材处理可在隔离环境运行，安全

**注意**：2026 年 2 月发布，API 可能不稳定。只借鉴思路。

**GitHub**: https://github.com/withastro/flue

---

## 四、间隔重复/记忆算法（FSRS）

### ts-fsrs（open-spaced-repetition）

**是什么**：TypeScript 实现的 FSRS（Free Spaced Repetition Scheduler）算法。

**核心 API**：
```typescript
import { fsrs, generatorParameters } from 'ts-fsrs';

const params = generatorParameters({ enable_short_term: true });
const f = fsrs(params);
const card = f.new_card();
const scheduling = f.schedule(card, new Date());
```

**对 Clew 的借鉴**：
- **可直接使用**：Ariadne 现有 `src/lib/fsrs.ts` 是简化版，可考虑迁移到 ts-fsrs（更完整）
- **医学验证**：多项研究证实 FSRS 在医学院校有效（Anki 用户成绩高 6-13%）

**GitHub**: https://github.com/open-spaced-repetition/ts-fsrs

---

## 五、医学教育/知识图谱（领域参考）

### 1. 医学 AI 教育政策与共识

- **教育部《教师生成式 AI 应用指引（第一版）》**（2025-11）：六大应用方向 + 30 个场景
- **《医学教师的人工智能素养专家共识（2025）》**：CAIP-ME 框架，25 项能力
- **广东医科大学 AI 医学院**：GDMU-AIMS，20+ 医学大模型入驻

**对 Clew 的启示**：
- 医学教育 AI 需「医生主导」「AI 辅助」，Clew 的答疑不能替代教师判断
- 需关注伦理、数据安全、可追溯性

---

### 2. 知识图谱工具

| 工具 | 语言 | 特点 | 适用场景 |
|------|------|------|---------|
| **Cytoscape.js** | JavaScript | 图论库，Web 可视化 | 脏腑/经络/方剂关系图 |
| **D3.js** | JavaScript | 力导向图，灵活 | 自定义知识图谱 |
| **Neo4j** | 图数据库 | 存储医学知识图谱 | 大规模医学知识（后置）|

**对 Clew 的借鉴**：
- **Concept graph 块**：DeepTutor 的 14 种块之一，医学场景高价值（脏腑关系、经络走向）
- **轻量方案**：知纲用纯 SVG 知识网，不引入 Cytoscape 等重依赖，Clew 可借鉴

---

## 六、综合推荐：Clew 技术选型

| 模块 | 推荐方案 | 理由 |
|------|---------|------|
| **教材编译管线** | 自研，借鉴 book-to-skill + 知纲 + DeepTutor | 预编译 + 证据绑定 + 两层结构 |
| **PDF 解析** | 现有 pdfjs-dist，后置 pdfexcavator/MinerU | 保持简单，复杂教材后置 |
| **Agent 循环** | Vercel AI SDK ToolLoopAgent | 已安装，provider-neutral，工具审批 |
| **工具系统** | 自研单层 ClewTool | 简单，硬编码验证价值后再抽象 |
| **间隔重复** | 现有 src/lib/fsrs.ts，后置 ts-fsrs | 保持现有，验证后迁移 |
| **知识图谱** | 纯 SVG（借鉴知纲），后置 Cytoscape.js | 轻量，不引入重依赖 |
| **状态管理** | Zustand（借鉴知纲）或现有 React state | 知纲用 Zustand，Clew 可用现有 |
| **测试** | Vitest（借鉴知纲 41 个测试） | 知纲用 Vitest，Clew 现有 node:test |

---

## 七、M2 任务书关键决策（基于调研）

| 决策 | 选项 | 推荐 |
|------|------|------|
| Harness 基础 | Vercel AI SDK ToolLoopAgent vs 自研 | **ToolLoopAgent**（已安装，省时间） |
| 教材编译 | 全量编译 vs 按需编译 | **预编译 + 按需加载**（book-to-skill 模式） |
| 知识结构 | 单层 KP vs 两层（Chapter→KP→内部结构） | **两层**（知纲模式，医学需要） |
| 证据绑定 | 有 vs 无 | **有**（医学硬要求，知纲模式） |
| 视图派生 | 单视图 vs 三视图（初学/复习/备考） | **三视图**（知纲模式，P2 做） |
| 失败处理 | 整体失败 vs 单点失败隔离 | **单点失败隔离**（知纲模式） |
| 知识图谱 | 无 vs 纯 SVG vs Cytoscape | **纯 SVG**（知纲模式，P3 做） |

---

## 八、下一步

1. **你确认以上技术选型**（或调整）
2. **我写 ZCODE-M2 任务书**（基于调研结果）
3. **Zcode 执行 M2**
4. **我验收，写 M3**

**确认？**