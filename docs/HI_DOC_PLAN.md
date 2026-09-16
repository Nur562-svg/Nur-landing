# Hi doc 完整方案（Mentrix 镜像级，NUR LEARN 内）

日期：2026-09-16。状态：待用户确认后开工。

## 0. 已确认的四条决定（用户拍板）

1. **服务器存储接受**：用户上传教材存服务器处理，仅本人可见，跨设备可学。满血。
2. **教材名额仅当月有效**：每月可激活 N 本；下月名额刷新，上月教材要继续学需重新占名额。
3. **Hi doc 全面代替「我的资料」本地快练**：长期只维护一套。
4. **试点课（中医诊断学、生理学）对所有人免费**：官方课名额制只管以后的官方新课。

## 1. 产品结构（首页三入口）

NUR LEARN `/learn` 首页改为三个并列入口：

| 入口 | 内容 | 改动 |
|---|---|---|
| 官方课程学习闭环 | 现有证据体系课程 | 不动（试点课对所有人免费） |
| **Hi doc** | Mentrix 镜像：上传教材 → 目录识别 → 知识点萃取 → 讲义+AI 教学 → 划重点/批注 → 学霸笔记 → 课题工作坊 | 全新 |
| 传统刷题题库 | 现有 15 套题库刷题 | 不动 |

Hi doc 内容观：AI 生成物（讲义/笔记/答疑）按通用 AI 产品方式直接呈现，**不挂**官方课的证据分级（可关联/不可直接等同等只属于官方课闭环）。NUR Agent 继续作为 Hi doc 的教学对话/追问引擎。

## 2. 会员权益（对齐现有支付体系）

| 档位 | 每月可学上传教材 | 官方课程（非试点） |
|---|---|---|
| trial / Basic | 1 本/月 | 自选 2 门 |
| Pro | 3 本/月 | 自选 5 门 |
| Max | 10 本/月 | 全部 |

现有 schema：`membershipTier: "free" | "lite" | "pro"`。**决定：`lite` 更名迁移为 `basic`，`free` 即 trial**（权益一致）。Order.planId 同步映射。档位枚举变为 `free | basic | pro | max`。

名额运转（仅当月有效）：
- `HiDocTextbook.activeMonth`（如 `2026-09`）标记激活月。
- 每月激活数 ≤ 档位额度（trial/basic 1、pro 3、max 10）。
- 上月教材不删除；跨月后进入「已冻结」态，继续学习需占用当月名额重新激活（或升级档位）。
- 删除教材释放当月名额。

官方课名额：新增 `CourseEntitlement`（userId + courseId + grantedAt），试点课白名单对所有人开放、不占名额；上限按档位。

## 3. 数据模型（Prisma 新增，全部挂 userId，私有）

```
HiDocTextbook   教材：title, fileName, storageKey, sizeBytes, pageCount,
                hasTextLayer, status(uploaded|toc_ready|extracting|ready|failed),
                toc Json, activeMonth, deletedAt
HiDocChapter    章节：textbookId, order, title, pageStart, pageEnd, status
HiDocKnowledgePoint 知识点：chapterId, order, title, description,
                keyTerms Json, prerequisites Json, sourcePage
HiDocLesson     讲义：kpId, contentMd, style, generatedAt
HiDocHighlight  划重点/批注：userId, kpId, quote, color, note, anchor Json
HiDocNote       学霸笔记：userId, chapterId, contentMd, generatedAt
HiDocConversation 对话：userId, kpId?, workshopId?, messages Json
HiDocWorkshop   课题：userId, title, note?
HiDocWorkshopFile 课题材料：workshopId, fileName, storageKey, ocrStatus
CourseEntitlement 官方课名额：userId, courseId, grantedAt
```

## 4. 存储与解析

- 存储：**MVP 本地磁盘卷**（docker volume，`/data/hidoc/{userId}/…`），`storageKey` 抽象；上云后切 OSS 适配器，业务代码不动。
- 解析：复用现有 PDF 文字层提取（material-intake 已有）。**首版不做扫描件 OCR**（Mentrix 同样拒扫描版）；强制 OCR 后置。
- 限制（对齐 Mentrix）：单本 ≤1500 页；无文字层 PDF 直接拒绝并提示。

## 5. AI 管线（provider-neutral，DashScope qwen3.7-plus 先行）

复用 `src/lib/course-builder` 的适配器模式 + `src/lib/nur-agent` 运行时。全部 SSE 流式。

1. **目录识别**：PDF 前 N 页文字 → 启发式 + 模型解析章节/页码，可手动修正。
2. **知识点萃取**（按章）：Agent 读该章文字层，定位定义/公式/例题，逐个写知识点（title/description/keyTerms/prerequisites/sourcePage）。流式进度事件与 Mentrix 对齐（识别目录 → 精读第 N/M 个 → 写入知识点）。
3. **备课/讲义**：每知识点一份 lesson markdown；讲解风格账户级（中文为主/术语标原文/全英文）。
4. **教学对话**：NUR Agent 挂 kp 上下文（讲义+原文片段）追问。
5. **学霸笔记**：本章讲义+追问+划重点+批注 → 汇总一份可下载笔记。
6. **课题工作坊**：≤100 页短材料（PDF/图片/md），AI 检索材料 + 关联教材知识点 + 联网搜索（后置）答疑。

成本控制：萃取/备课/笔记每次消耗记录进 `EventLog`；额度不足 503 停住不静默放行（沿用现有配额原则）。

## 6. 页面结构

```
/learn/hi-doc                书架 + 上传（大上传区、名额显示）
/learn/hi-doc/t/[id]         教材详情：章节树 + 萃取进度
/learn/hi-doc/t/[id]/c/[n]   章节学习页：知识点列表 + 讲义 + 追问 + 划重点
/learn/hi-doc/w              课题工作坊列表
/learn/hi-doc/w/[id]         课题内：材料 + 对话
```

API（thin adapters → `src/lib/hidoc/`）：
`/api/hidoc/textbooks`（CRUD+upload）、`/toc`、`/extract`（SSE）、`/chapters/[n]/plan`（SSE）、`/kp/[id]/lesson`、`/kp/[id]/chat`、`/highlights`、`/notes`、`/workshops`、`/workshops/[id]/files`、`/workshops/[id]/chat`。

## 7. 分期实施

| 期 | 内容 | 验收 |
|---|---|---|
| M0 | 档位迁移 lite→basic、+max；CourseEntitlement + 试点课免费；首页三入口壳 | 支付/登录全量测试绿 |
| M1 | 上传+书架+名额（仅当月有效）+文字层校验 | 上传→书架→名额冻结/释放跑通 |
| M2 | 目录识别+手动修正 | 一本真实教材切出正确章节 |
| M3 | 知识点萃取 SSE | 真实一章萃取出带页码溯源的知识点 |
| M4 | 学习页：讲义+讲解对话 | 生成讲义并追问 |
| M5 | 划重点/批注/学霸笔记 | 选中文本→批注→笔记导出 |
| M6 | 课题工作坊（替代「我的资料」） | 短材料答疑 + 快练并入 |
| M7 | 支付打通（mock→支付宝） | 四档订阅生效 |

「我的资料」在 M6 前保持可用并挂「将由 Hi doc 替代」提示；M6 上线后路由跳转 Hi doc。

## 8. 边界（不变）

- 官方课内容真相、注册表、发布权不动。
- Hi doc 数据全部私有挂 userId，不进官方课程目录、不进 `/courses`。
- API key 只在服务端；SSE 带 Bearer；配额不足明确报错。
- 传染病学 Trae 产物仍不入库。

## 9. 开源借鉴（2026-09-16 调研）

| 项目 | 协议 | 用法 |
|---|---|---|
| **DeepTutor**（HKUDS，39.7k★，Python+Next.js16） | Apache-2.0 | 主参考：Book Engine 编译器（`deeptutor/book/`）的分块/上下文/流式进度设计；提示词与「活书」交互模式（首章导读、生成状态、测验嵌入、逐页引用）；M2/M3 直接对标。不整包引入（Python 后端+自带用户体系与 NUR 会员/支付体系冲突） |
| LightRAG（同门） | MIT | 后置：工作坊需跨材料语义搜索时再评估 |
| book-to-skill | MIT | 思路参考：先结构化编译、再按需加载，非检索拼接 |
| CourseGraph | — | 知识点关联图谱的生成方式参考 |

RAG 决策：MVP 用教材文字层原文检索（Mentrix 同款），不引向量库；工作坊语义搜索后置。

## 10. 风险与后置

- 扫描件 OCR：后置（首版明确拒绝并提示）。
- 联网搜索答疑：Mentrix 有，我们 M6 后评估。
- 讲解风格多语言：医学场景先中文为主，风格枚举留好。
- 模型成本：真教材整书萃取烧 token，M0–M4 全程用小样章验证再放开整本。
