# NUR Agent 墨点形象 Implementation Plan

> 等用户说「确认执行」后再改代码。

**Goal:** 把右下角 NUR Agent 换成你给的墨点形象（黑卵、两只白胶囊眼），idle 用 6 种挤压变形；连续做错时身体逐渐变成圆角三角→方→五边→六边。

**Architecture:** 不换组件树。继续用 `NurAgentFace` + `bot-emotion` 的 streak。扔掉 Mimo 的正 n 边形采样，改成**固定点数的手绘 SVG path**（和海报一样的卵形），用已有的 CSS `d` 过渡做变形。眼睛只做胶囊，不再加嘴、光环、墨点装饰。

**Tech:** 现有 React + CSS Modules + SVG path，不加依赖。

---

## 现状（不要重做的部分）

Mimo 已经接到 NUR LEARN（不是只在 test-ai）：

- `src/lib/bot-emotion.ts` — 对/错、`wrongStreak`
- `src/components/bot-blob-shapes.ts` — 正多边形采样（你不喜欢的原因）
- `src/components/nur-agent-face.tsx` + `.module.css` — 煤球 + 圆眼

接线保留。只换外形词典和眼睛形状。

## 海报 6 态怎么接到产品

| 海报 | 体态 | 接到 |
|---|---|---|
| ID | 正圆卵 | idle |
| LS | 左倾 | 指针跟随（已有 lookX） |
| TH | 变高 | thinking |
| SC | 压扁变宽 | sad |
| WT | 水滴 | angry / 连续错前的过渡 |
| BL | 贴地扁 | sleepy |

做错几何体（你点名的）：

| 连续错 | 形状 |
|---|---|
| 1 | 圆角三角 |
| 2 | 圆角方 |
| 3 | 圆角五边 |
| 4+ | 圆角六边 |

全部仍是黑填充 + 白胶囊眼，倒角足够圆，不要尖角 clipart。

## 创新建议（执行时默认带上，除非你划掉）

1. **结晶，不是跳变。** 错题多边形从同一套卵形控制点「长出棱」，过渡约 400ms，不要瞬间换成三角形。
2. **眼睛是唯一五官。** 海报没有嘴/眉毛。答对时胶囊眼略弯（用 `border-radius` 不对称），不要画笑脸。
3. **答对立刻融回 ID。** streak 清零，果冻回弹一次。不要惩罚残留到下一章。
4. **不做旧版珍珠轨道环。** 海报是纯剪影。

## 步骤

1. 重写 `bot-blob-shapes.ts`：6 个 idle 卵 path + 4 个圆角多边形，**命令数相同**（才能 CSS morph）。
2. `shapeFromStreak` 优先错题几何；streak=0 时按 emotion 选 ID/TH/SC/WT/BL。
3. `nur-agent-face.module.css`：眼睛改成长胶囊（接近海报），去掉 inkA/B/C 装饰点。
4. `nur-agent-face.tsx`：只保留身体 path + 两只眼；禁 SVG 内 JSX 注释。
5. 题库对/错继续走已有 `notifyQuizResult`（不必改练习逻辑）。
6. `npx tsc --noEmit`；你在题库里连对、连错各看一眼。

## 文件

- Modify: `src/components/bot-blob-shapes.ts`
- Modify: `src/components/nur-agent-face.tsx`
- Modify: `src/components/nur-agent-face.module.css`
- 不动 Agent 对话、配额、题库判定。

## 风险

- CSS `d` 过渡：path 命令数必须一致，否则会跳。
- 错题几何若太尖，会不像海报。倒角优先。
- 视频未能用当前模型解析；以海报静态 6 态为准。
