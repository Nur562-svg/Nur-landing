# Hi doc × Codex 执行任务书（目标模式启动提示词）

用途：把下面「任务提示词」整段粘给 Codex（CLI `codex exec` 或桌面端目标模式）。
Codex 会自动读仓库 `AGENTS.md`；本文件与 `docs/HI_DOC_PLAN.md` 是它的两个必读件。

---

## 任务提示词（粘贴以下全文）

你在 NUR LEARN（/Users/nukeab/projects/Nur-landing，Next.js 16 App Router + React 19 + TS strict + Prisma + Tailwind v4/CSS Modules）实施新主线 **Hi doc**。

**开工前必读（按序，全部读完再动手）：**
1. 仓库 `AGENTS.md` — 产品边界、Tier 1–4 代码边界、设计与验证规则
2. `docs/HI_DOC_PLAN.md` — Hi doc 唯一实施真相源：§2 会员权益（四档与名额）、§7 分期表 M7 行「支付打通（mock→支付宝）｜四档订阅生效」、§8 边界
3. `prisma/schema.prisma` — 现有 Order（userId/planId/tier/period/amountCents/channel/status）、User.membershipTier/membershipExpiresAt、HiDoc 全量模型与四档会员
4. `src/lib/payment/` 全部（`plans.ts` 9 个 SKU 占位价、`types.ts` PaymentChannel/PaymentProvider 接口、`service.ts` 的 createOrder/handleNotify/mockPay/getSubscription/reconcileOrder/reconcilePendingOrders/closeExpiredOrders、`providers/mock.ts`/`wechat.ts`/`alipay.ts` 的 RSA2 自研验签与 redirect/queryOrder）+ `src/app/api/pay/` 四条路由 + `src/components/billing-panel.tsx` 与 `src/app/account/billing/page.tsx`、`src/app/api/auth/upgrade/route.ts` 的 mock 直通 — M7 全部在此基础上打通，不重写抽象
5. `src/lib/membership.ts`（`resolveEffectiveMembershipTier` 到期回退）与 `src/lib/quotas.ts`/`quotas-server.ts`（四档额度读取点）

**优先级裁决（冲突时按此执行）：** `AGENTS.md` 的「Next Product Priority」一节中「Do not ... server material store」等旧约束**已被用户 2026-09-16 的四条决定明确取代**（见 `docs/HI_DOC_PLAN.md` §0）。Hi doc 相关实现以 `docs/HI_DOC_PLAN.md` 为准。AGENTS.md 其余全部边界（Tier 1–4、设计规则、验证要求）继续完全生效。

**本次目标：完成 M7（只做这一期：支付打通 mock→支付宝，四档订阅真实生效。不做微信支付打通、不做 OCR/联网搜索/向量库、不做设计系统 v2 重构）。**

前置状态（已完成并验收）：M0 四档会员迁移+官方课名额+首页三入口（`36e8efc`）、M1 上传/书架/当月名额（`2f41e98`）、M2 目录识别+章节修正（`1debd1a`）、M3 知识点萃取 SSE（`93dfa6d`）、M4 学习页讲义+讲解追问（`285c3d1`）、M5 划重点/批注与学霸笔记（`HiDocHighlight`/`HiDocNote`）、M6 课题工作坊替代「我的资料」（`HiDocWorkshop`/`HiDocWorkshopFile`/workshopId 对话维度，限额 free 1课题·3材料 起四档，`hidocWorkshopChats` 配额，无 key 明确报错不兜底）。验证基线：lint 0 error / test 357 / `npm run check` 通过。

M7 验收（对应 `HI_DOC_PLAN.md` 分期表 M7「支付打通（mock→支付宝）｜四档订阅生效」）：

**A. 通道切换与配置**
- `PAYMENT_PROVIDER=alipay` 成为正式生效通道；通道为 alipay 但 `ALIPAY_APP_ID/ALIPAY_PRIVATE_KEY/ALIPAY_PUBLIC_KEY` 任一缺失时，下单**明确报错**（503 + 中文原因「支付通道未配置完整」），不静默回落 mock；mock 仅在显式 `PAYMENT_PROVIDER=mock` 时可用（开发/演示语义保留）
- 密钥只存服务端 env，不渲染、不进客户端 bundle、不进日志；`ALIPAY_NOTIFY_URL` 支持显式覆盖，缺省由 `NEXT_PUBLIC_SITE_URL` 拼装
- 支付宝网关地址支持沙箱/生产切换（env 区分），并在 `docs/PROJECT_STATE.md` 如实记录当前配置指向
- **已定案（2026-09-18 用户拍板，实施时直接使用，勿改动）：**
  1. **正式定价已落 `src/lib/payment/plans.ts`**：Basic ¥19/月、¥49/季、¥149/年；Pro ¥49/月、¥129/季、¥399/年；Max ¥149/月、¥399/季、¥1299/年（季 ≈ 月×8.8 折、年 ≈ 月×7 折，全部满足「周期越长单价越低」）。如发现与下单价不一致的硬编码价格，一律以 plans.ts 为唯一真相源。
  2. **沙箱凭据已写入 `.env.local` 与 `.dev.vars`**（两处必须同步，`.dev.vars` 也是 Next 密钥源）：`PAYMENT_PROVIDER=alipay`、`ALIPAY_APP_ID=9021000168642019`、`ALIPAY_GATEWAY_URL=https://openapi-sandbox.dl.alipaydev.com/gateway.do`、`ALIPAY_PRIVATE_KEY`/`ALIPAY_PUBLIC_KEY`（沙箱 RSA2 密钥对）。网关地址已由 provider 内 `getGatewayUrl()` 读取 `ALIPAY_GATEWAY_URL` 实现，**默认沙箱**；生产部署时只需把 `ALIPAY_GATEWAY_URL` 改为 `https://openapi.alipay.com/gateway.do` 并换正式密钥，代码零改动。
  3. **本地能做的沙箱验证边界（如实记录，不假装）**：下单签名与跳转 URL 构造可用真实沙箱密钥在本地验证（签名正确性可用支付宝沙箱收银台是否接受来检验）；但 notify 异步通知需要支付宝服务器能访问公网 URL——本地开发没有公网地址时，允许用「用沙箱密钥构造一条合法签名的 notify 表单 → POST 到 `/api/pay/notify/alipay` → 断言验签通过、订单变 paid、会员生效」的方式实测验签与开通链路，并在 `design-qa.md` 明确标注这是模拟 notify（非支付宝服务器真实回调）；真实回调待部署公网后补验。
  4. **计费页改版（用户 2026-09-18 要求，参考用户提供的 Cursor 风格定价截图）**：现行 `/account/billing`（`src/components/billing-panel.tsx`，全内联样式、9 卡平铺、月/季/年纵向拉长页面）重构为——**三列档位卡（Basic / Pro / Max 横向排列），档位卡头部右侧放 月/季/年 分段控件（segmented control），切换后价格/按钮文案联动**；卡片内层级：档位名 → 大号价格数字 + 灰色计费单位 → 通栏 CTA → 权益清单（对勾列表，写清各档 Hi doc 教材名额/工作坊/官方课权益）；当前档位卡用描边或角标高亮「当前套餐」；订单记录保留在页面下方。**样式迁移到 CSS Modules**（`src/components/billing-panel.module.css`），遵守项目 no-inline-styles 规范；视觉沿用现有暖纸体系（方直边、纸色、朱/黛语义色），布局节奏参考截图的三列卡+分段控件+大价格数字。390px 时三列退化为单列、分段控件保持可用。

**B. 下单与收银台**
- `/account/billing` 在 alipay 通道下：选档下单 → 创建/复用 pending 订单 → 跳转支付宝收银台（redirect URL）；跳转失败给中文原因
- 支付结果回跳（return_url）后页面轮询 `/api/pay/status` 展示订单状态（pending/paid/closed），不以前端回跳作为开通依据（开通只认验签后的 notify 或主动查单）
- 订单列表如实展示 channel、金额、状态、时间

**C. 异步通知与会员生效**
- `/api/pay/notify/alipay`：RSA2 验签（复用现有自研实现）+ 核对 app_id、订单号、金额与订单一致后才受理；`TRADE_SUCCESS/TRADE_FINISHED` 幂等开通（重复 notify 直接成功，不重复延期）
- 开通在事务内完成：Order → paid + User.membershipTier/membershipExpiresAt 更新；**续费叠加**（在剩余有效期上延长，不吞掉未到期时间）；同一时刻高档覆盖低档的生效策略需明确实现并写入 `docs/PROJECT_STATE.md`
- 会员生效后四档额度立即生效（`computeUserQuotas` 读到新档位：教材当月名额 basic 1 / pro 3 / max 10、工作坊数量与材料数、`hidocChats`/`hidocNotes`/`hidocWorkshopChats` 额度、官方课名额）；到期回退 free 后额度同步回落（`resolveEffectiveMembershipTier` 已有，验证闭环）

**D. 对账与关单**
- `/api/pay/reconcile` 在 alipay 通道下用 provider 的 `queryOrder` 真实查单并补偿开通（notify 丢失时的兜底）；查单失败如实返回原因
- `closeExpiredOrders` 对超时 pending 订单的行为在 alipay 通道下确认（本地关单即可，但需如实标注「未调用支付宝关单接口」或实现 `alipay.trade.close`），选择写入 `docs/PROJECT_STATE.md`

**E. 定价与页面**
- `plans.ts` 的 9 个 SKU 价格为占位常量：**实施前先与用户确认正式定价**；用户未拍板则保持占位价并在页面与 `docs/PROJECT_STATE.md` 如实标注「价格为待确认占位」
- 视觉沿用既有设计体系，390px 不横向溢出

**边界（违反即返工）：**
- 不碰 `src/content/courses/`、`src/content/materials/`、课程注册表、发布逻辑；Hi doc 数据私有边界不变
- 不打通微信支付（wechat provider 保留原样）；不做发票/退款流程（如需仅如实标注后置）
- 不改 M0–M6 已验收功能的行为；配额键名不变
- `src/content/courses/infectious-diseases/` 与 `scripts/infectious-*` 未跟踪文件绝不触碰
- 工作区可能有未提交改动（另一条工作线）：保留，不 reset、不 stash、不 push、不纳入本次 commit
- 真实商户号与 ICP 备案是部署前置，不在本期；M7 验收以**支付宝开放平台沙箱**为准

**验证（每期结束必跑）：**
`npm run lint && npm run typecheck && npm run test`，全绿后才允许进入下一项；M7 结束跑 `npm run check`（build 离线时 Google Fonts 报错可忽略，其余必须干净）。
浏览器/API 实测（更新 `design-qa.md`「Hi doc M7」小节 + 截图）：支付宝沙箱真实下单 → 收银台支付 → notify 验签开通 → 档位与额度立即变化（前后对比截图）；重复 notify 幂等；金额篡改的 notify 被拒；无密钥时下单明确报错；续费叠加；到期回退 free 后配额回落；390px 不横向溢出。沙箱不可用时的替代：用沙箱密钥构造真实签名的 notify 报文走验签路径实测，并在 design-qa.md 如实写明验证方式。
单测：notify 验签（正/负/篡改用例）、幂等开通、续费叠加计算、档位映射（lite→basic 兼容）、到期回退、无密钥报错路径、reconcile 补偿。

**提交：**
M7 完成后 git commit（conventional: `feat(pay): ...`），**不 push**。只提交 M7 相关文件 + `docs/PROJECT_STATE.md` + `design-qa.md`。提交前附改动文件清单。

**报告格式：**
完成后输出：完成项清单 / 验证命令与结果 / 新增文件列表 / 遇到的阻塞与取舍（含定价是否已确认、沙箱实测方式）/ 下一步（部署上线：ICP 备案 + 真实商户号 + 生产密钥配置）建议。

---

## Codex 记忆配置说明（给用户看，不粘给 Codex）

- Codex 的「记忆」= 它自动加载的 AGENTS.md 链：全局 `~/.codex/AGENTS.md`（你的是空的，可不放东西）+ 仓库根 `AGENTS.md`（已含 NUR LEARN 全部产品/代码边界，自动生效）+ 子目录 AGENTS.md（进入该目录工作时加载）
- 仓库根 `AGENTS.md` 的「Next Product Priority」记录了 M 系列进度（2026-09-17 已更新到 M6 完成、当前任务 M7；若仍有滞后以本任务书为准）。**浏览器规则（用户 2026-09-17 定）：Chrome 是默认浏览器，如果 Tabbit 浏览器不好用（截图超时/离屏/无 download 事件等），直接改用 Chrome 浏览器。**
- 写过 AGENTS.md 后记得 `bash scripts/sync-agent-rules.sh`

## 目标模式启动命令（CLI，推荐后台跑）

```bash
cd /Users/nukeab/projects/Nur-landing
codex exec --sandbox workspace-write "$(cat docs/HI_DOC_CODEX_BRIEF.md | sed -n '/^## 任务提示词/,/^---$/p' | head -n -1)"
```

或者最简单：打开 `docs/HI_DOC_CODEX_BRIEF.md`，复制「任务提示词」段落到 Codex 桌面端目标模式/聊天框。后台跑完用 `git log` 和 `npm run check` 验收。
