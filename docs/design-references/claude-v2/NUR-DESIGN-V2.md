# NUR LEARN 设计系统 v2（Claude 库适配版）

日期：2026-09-18。状态：**已定案（用户 2026-09-18 拍板方案 A）**。生效时机：**M7 完成后的整体框架重构（NUR Workspace 壳）**；M6–M7 期间现行设计规则完全不变（AGENTS.md「Design Rules」继续生效，v2 只是先落参考资产与决策，不改任何在跑页面）。

## 0. 已定案的决定

1. **采用 Claude 风格库的整体体系**（token 层 + 组件层 + 组合层三层使用），定位是「NUR 暖纸体系 v2」——借结构与 token 模型，不做 Claude 品牌外壳的整包复制。
2. **圆角采用库的完整体系**（8/12/16/20/24px），废弃「方直边 square containers」旧规。视觉年轻化一代；严肃感由宋体显示标题与细线保留。（用户 2026-09-18：A）
3. **字体本地化映射**（衬线读、无衬线操作的骨架不变，字体栈中文优先）：
   - `--font-display`：Newsreader 位 → `"Songti SC", "Noto Serif SC", "STSong", serif`（显示/大标题）
   - `--font-serif`（阅读面）：Lora 位 → `"Noto Serif SC", "Songti SC", serif`
   - `--font-sans`（紧凑 UI）：Poppins 位 → `"MiSans", "PingFang SC", "HarmonyOS Sans SC", system-ui, sans-serif`
   - `--font-mono`：Geist Mono 位 → `ui-monospace, "SF Mono", Menlo, monospace`（沿用现有）
   - 拉丁原字体仅作英文/数字回退，不删除（Newsreader/Lora/Poppins 追加在中文栈之后，中英混排时英文走拉丁衬线）。
4. **暗色模式一并采纳**：暖炭灰（非纯黑）体系随 token 层直接带入；首批只在工作台壳生效，官方课/Hi doc 现有页面跟随壳切换，不单独定制。
5. **Lucide 图标继续沿用**（两边同源，零迁移成本）。

## 1. 采纳路径（三层）

| 层 | 来源真相源 | 用法 |
|---|---|---|
| Token | `docs/design-references/claude-v2/colors_and_type.css`（360 行：7 组原色阶 50–900 + 语义层 + 暗色 + 圆角/间距/阴影/字体） | 语义层映射进 `globals.css` 的 `@theme`；原色阶作为唯一取值来源，页面一律吃语义 token |
| 组件 | `claude-v2/components.css` + `claude-v2/preview/*.html`（6 件套：button/card/input/badge/chat-bubble/navigation） | 从 CSS+预览移植为 React + CSS Modules；`components/*.json` 只当目录用（自标 legacy-inferred/low，不作实现依据） |
| 组合 | `claude-v2/ui_kits/website/index.html`（812 行，248px 侧栏 + ⌘K + New chat + 统计卡/对话线程/表格）与 `ui_kits/app/index.html` | website UIKit = NUR Workspace 三栏壳的排版基准；app UIKit = 移动端组合参考 |

## 2. 色彩映射（Claude → NUR 语义）

| Claude token | 值 | NUR 用途 |
|---|---|---|
| `--brand-500` | `#C96442` terracotta | 唯一主强调（替换现行朱砂主强调位；朱砂语义降为划线/警示族） |
| `--bg-100` / `--bg-200` / `--bg-300` | `#FAF9F5` / `#F5F4EF` / `#EDE9DE` | 页面底 / 卡面 / 弱化面 |
| `--text-800` / `--text-500` | `#3D3929` / `#6E6D68` | 正文墨 / 次级墨 |
| `--border-300` | `#DAD9D4` | 常规细线 |
| `--success-500` / `--error-500` | `#788C5D` 橄榄绿 / `#D64545` 哑红 | 状态注释色（不是第二主色） |
| `--sidebar` | `#F5F4EE` | 工作台侧栏 |
| 现行黛蓝 slate-blue | 保留 | 语义族（链接/信息）沿用，映射到 `--chart-2 #9C87F5` 邻域时需单独评审 |

跨组件铁律（原库 §6，全文采纳）：层级靠字号/间距/对比而非重字重；色调分离优先于加边框、避免嵌套边框堆叠；中性色干结构活、主强调只给最强动作；开放排版优先于密集仪表盘；禁用态降调不降可读性。

## 3. 与现有资产的关系

- **M5 四色划线**（琥珀/朱砂/黛蓝/青玉）是低饱和注释族，与 v2 主强调不冲突，直接保留。
- **Hi doc 对话面板**：user=主色实底 / assistant=纸卡+边框的两级模式与库的 chat-bubble 完全同构，框架重构时从 `preview/component-chat-bubble.html` 对标升级（含 thread 容器与 disabled 态）。
- **官方课闭环**：证据分级标签（可关联/不可直接等同）属教学语义，不随视觉体系变化。
- 旧规则中「warm ivory paper, black ink, thin rules, Songti headings」的精神全部保留；仅「square containers」一条被本文件取代。

## 4. 生效与授权边界

- 生效顺序：框架重构（R1 壳）时 token 层先行 → 组件层随壳落地 → 组合层作为验收基准。此前**不预改任何在跑页面**。
- 该库为对 Claude 品牌线索的独立重建（见其 README §Source），仓库内仅作设计参考资产存放于 `docs/design-references/claude-v2/`（不进 public、不被业务代码 import）。产品身份仍是 NUR LEARN 自己的暖纸体系。
- 库内 UIKit 使用 Google Fonts CDN 与 unpkg React，仅作离线参考页，禁止在生产依赖。
