# M3 会员与配额边界 计划

**优先级**: 当前最高（M2 云同步已完成 + 优化）
**约束**: 不接真实支付；纯 demo 升级；复用现有 M2 数据 + Prisma User；local-first 展示 + server 计算；更新 PROJECT_STATE.md。

## 目标
- 扩展已有的 `MembershipTier`（free / pro）。
- 定义关键资源的配额（quotas）。
- 计算并展示当前使用量（usage）。
- 在账户面板提供清晰的 quota 进度 + 升级提示。
- Demo 升级按钮（点击后将当前用户设为 pro，持久化到 DB）。
- 在高价值入口（Course Builder 私人材料、材料准入等）展示配额影响或 pro 提示。
- 保持所有现有免费体验不变；pro 获得更高限额。

## 建议配额（M3 初始版本，可后续调整）
- 私人材料准入（Material Admission）：free 最多 5 条已同意；pro 50。
- Course Builder 构建次数（或私人分析）：free 每月 3 次；pro 无限制（demo 用总次数）。
- 模考会话：free 每月 10 次；pro 无限制。
- Agent 对话（可选，后续）：free 每日 20 条；pro 更高。

M3 初期优先实现前两项（私人材料 + Course Builder），因为它们与已完成的 M2 私人材料 + Course Builder 强相关。

## 实现策略
1. 新增 `src/lib/quotas.ts`
   - `MembershipQuotas` 类型
   - `getTierQuotas(tier: MembershipTier)`
   - `computeUserQuotas(userId: string)` — 从 Prisma + M2 相关表计算 usage（MaterialAdmissionSyncConsent 计数、MockExamSession 计数、未来可加构建日志）。
   - 返回 `{ tier, quotas: { privateMaterials: { used, limit }, ... } }`

2. 扩展账户面板（learning-dashboard.tsx）
   - 在 tier 下面展示 quota 列表（带进度条或 used/limit）。
   - “升级到 Pro（演示）” 按钮（仅 free 用户可见）。
   - 点击后调用新 API，成功后刷新 session / 状态。

3. 新增 demo 升级 API
   - `POST /api/auth/demo-upgrade` （需要登录）
   - 将当前用户 membershipTier 设为 "pro"，返回新 user view。
   - 仅用于演示，不涉及任何支付逻辑。

4. 在关键 UI 增加提示
   - Course Builder：私人材料分析如果 free 且接近/超配额，显示提示。
   - 材料准入：展示当前已用私人材料配额。

5. 轻度门控（非硬阻断，保持友好）
   - 超额时给出提示 + 升级按钮，不完全禁用核心学习功能。
   - 官方材料 + 本地功能始终可用。

6. M2 联动
   - 配额计算可复用已有的 `getAdmissionSyncConsents` 和 M2 同步数据。
   - 未来可把 quota usage 纳入 learner state sync（可选）。

7. 文档
   - 更新 PROJECT_STATE.md（M3 进度）。
   - 本计划文档 + 完成记录。

## 验证
- npm run check 全绿。
- 登录 free 用户 → 看到配额 + 升级按钮。
- 点击升级 → tier 变成 Pro，配额提升。
- 刷新 / 重新登录后持久化。
- Course Builder / 材料准入有相应提示。

## 后续（M3 之后或 M4）
- 更精细的周期重置（按月）。
- 真实 usage 埋点（构建次数记录）。
- Pro 专属功能标记（无限私人材料、更高 Agent 上下文等）。
- 管理后台（可选）。

日期：2026-08-08 起
状态：启动实施

---

## M3 完成状态（2026-08-08）

**1. Agent 调用真正接上**
- Client: `src/components/nur-agent-chat.tsx` handleSubmit 调用 `recordAgentCallUsage()`
- Server: `src/app/api/nur-agent/chat/route.ts` 每个有效请求记录 + 超限 gate (429 for free)
- 配额刷新通过 "nur-quota-update" 事件 + dashboard fetch

**2. Server 持久化构建历史**
- Prisma User.usage JSON 字段 { courseBuilds, agentCalls }
- `src/lib/quotas.ts` recordServerUsage + compute 合并 server + client
- 记录点：
  - Course Builder private analysis
  - 正常官方包构建
  - Agent 每次 chat

**3. 更多门控**
- API:
  - /api/course-builder private: 超限返回 "quota-exceeded" 429
  - /api/nur-agent/chat: 超限 429
- UI:
  - Course Builder: 私人模式 banner + confirm 软门控
  - MaterialAdmissionReview: 配额计数展示
  - Dashboard: 进度条 + 超限文案 + upgrade 按钮

**4. 配额 UI 改进**
- 进度条 (percent)
- 更好文案 + periodNote (Pro 无限制 / 免费周期)
- Client bump 即时 + server 持久化 合并显示
- Upgrade 后清 client + 重置 server usage

**其他完善（自行）**
- demo-upgrade 重置 usage JSON
- 清除 client bumps on upgrade
- 类型/检查通过 (0 errors)
- 配额计算支持合并

**M3 100% 完成**。后续可在其他地方继续，使用 PROJECT_STATE.md 作为真相。

