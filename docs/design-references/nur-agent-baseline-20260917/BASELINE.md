# NUR Agent 像素级基线

- **日期**: 2026-09-17
- **分支**: `feat/saturn-ring`
- **提交**: `cc18e53`（土星环前后弧分层修复后）
- **页面**: `/learn` · FAB 位于 `bottom:28px; right:28px`
- **用途**: 后续形象/动态迭代前的冻结快照；改动后与本目录对照

## 文件清单

| 文件 | 尺寸 | 说明 |
|---|---|---|
| `contact-sheet-8-states@3x.png` | 4320×2700 | 8 态 128px 放大对照（viewport@3x） |
| `fab-64@3x-<emotion>.png` | 192×192 | 真实 FAB 64px @ devicePixelRatio=3 |
| `fab-64-<emotion>.png` | 64×64 | 真实 FAB @ DPR=1（CSS 像素） |
| `fab-56-mobile-idle.png` | 56×56 | 移动端 FAB（390 视口） |
| `dock-open-idle.png` | 1440×900 | 抽屉打开 · idle |
| `learn-page-idle-context.png` | 1440×900 | 学习页语境 · idle FAB |

情绪枚举：`idle` `thinking` `happy` `sad` `angry` `surprised` `encourage` `sleepy`

## SVG 几何（viewBox 0 0 64 64）

坐标以 64 网格为准；源码见 `src/components/nur-agent-face.tsx`。

| 元素 | 参数 |
|---|---|
| 球心 | `(32, 32)` |
| 球半径 | `r = 17.4` |
| 高光 | ellipse `(26, 25) rx=5.8 ry=3.4`，fill `#fff` opacity `0.58` |
| 环椭圆 | `rx = 27`，`ry = 9.2`，中心即球心 |
| 环倾角 | `rotate(-16°)` 绕 `(32, 32)` |
| 远端环 path | `M 5 32 A 27 9.2 0 0 1 59 32`（上弧 sweep=1） |
| 近端环 path | `M 5 32 A 27 9.2 0 0 0 59 32`（下弧 sweep=0） |
| 远端环描边 | `stroke-width 1.7`，round cap |
| 近端环描边 | `stroke-width 2.55`，round cap + glow filter |
| 眼（左/右） | rect `x=24.4/35.4` `y=26` `w=4.2` `h=9.4` `rx=2.1`，fill `#1a1a1a` |
| 眼神跟随 | `translate(lookX*3.2, lookY*2.4)`，感应半径 320px，fullAt 100px |

### 绘制顺序（决定环绕深度）

1. 远端环（上弧，压暗）
2. 球体 + 高光
3. 眼睛
4. 近端环（下弧，本色 + 光晕）

## 材质与滤镜

| 项 | 值 |
|---|---|
| 球体渐变 | radialGradient `cx=34% cy=28% r=70%`：`#ffffff` → `#f7f3eb`(48%) → `#ddd6c8`(82%) → `#c4bdb0`(100%) |
| 球体投影 | CSS `drop-shadow(0 2px 4px rgb(16 16 15 / 16%))` |
| 环光晕 | SVG `feGaussianBlur stdDeviation=1.6`，merge 叠两层 blur + SourceGraphic |
| 远端环色 | `color-mix(in srgb, var(--ring) 42%, #1a1a1a)`，opacity `0.55` |
| 近端环色 | `var(--ring)` 全色 |

## 情绪色板（`--ring`）

| 情绪 | 色值 |
|---|---|
| idle | `#17659a` |
| thinking | `#6b5a9e` |
| happy | `#2f6f4e` |
| sad | `#3d6a88` |
| angry | `#bf2118` |
| surprised | `#b06a2b` |
| encourage | `#5a6288` |
| sleepy | `#8a857c` |

## 眼型变换（CSS，基于胶囊 rect）

| 情绪 | 眼变换 |
|---|---|
| idle / thinking | 自然胶囊 + blink 动画 |
| thinking | 眼组 `translate(0, -2.4px)` |
| happy | `scaleY(0.28) translateY(4px)` |
| sad | 眼组 `translate(0, 2.6px)` |
| angry | 左 `rotate(-22deg)` / 右 `rotate(22deg)` + 微位移 |
| surprised | `scale(1.18, 1.12)` |
| encourage | 右眼 `scaleY(0.22) translateY(3px)` |
| sleepy | `scaleY(0.16)` |

## 旁挂符号（`.mark`）

| 情绪 | 内容 | 位置 |
|---|---|---|
| thinking | `?` | top 2% right 8% |
| surprised | `!` | 同上 |
| angry | （样式显示 mark，content 未设，当前不可见） | 同上 |
| sleepy | `z` | top 0 right 4%，字号 9px |
| 其余 | 隐藏 | opacity 0 |

## 动画

| 名称 | 时长/曲线 | 触发 |
|---|---|---|
| orb-breathe | 3.6s ease-in-out infinite，scale 1↔1.04 | idle, encourage |
| orb-bounce | 480ms cubic-bezier(.34,1.56,.64,1)，scale(1.12,0.92) | happy |
| orb-shake | 380ms ease-in-out，translateX ±1.6px | sad, angry |
| orb-pop | 360ms cubic-bezier(.34,1.56,.64,1)，scale 0.92→1.08→1 | surprised |
| orb-blink | 4.8s，92–94% scaleY(0.12) | idle, thinking 眼 |
| press | scale 0.92，80ms ease-out | data-press=true |

`prefers-reduced-motion: reduce` 时全部 animation: none。

## Dock 壳层尺寸

| 项 | 桌面 | 移动 ≤640 |
|---|---|---|
| FAB | 64×64 | 56×56 |
| FAB 位置 | bottom 28 / right 28 | bottom 16 / right 16 |
| 抽屉 | 420px 宽，`#f4efe4` | 100% 宽 |
| 头部小球 | 28×28 | 同 |

## 复现截图

```bash
# dev server
cd /Users/nukeab/projects/Nur-landing-saturn && npx next dev -p 3001
# Playwright：deviceScaleFactor=3，冻结 animation，对 [aria-label*="打开 NUR Agent"] 截图
# 再对 document.querySelectorAll("[data-emotion]") 逐个 setAttribute 切情绪
```

## 已知基线瑕疵（迭代时可对照）

1. angry 的 `.mark` 有 opacity 但无 `content`，符号实际上不显示
2. FAB 64px 下旁挂符号与环端点距离偏紧
3. 环光晕在浅象牙底上偏柔，对比海报霓虹感更克制
