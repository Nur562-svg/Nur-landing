"use client";

import { V2Badge } from "@/components/ui/v2/badge";
import { V2Button } from "@/components/ui/v2/button";
import { V2Card } from "@/components/ui/v2/card";
import { V2ChatBubble, V2ChatThread } from "@/components/ui/v2/chat-bubble";
import { V2Input } from "@/components/ui/v2/input";
import { V2BottomNav, V2SideRail, V2TabStrip } from "@/components/ui/v2/navigation";
import styles from "./design-system.module.css";

const SCALE_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;

const SCALES: readonly { key: string; label: string; standard: string }[] = [
  { key: "brand", label: "brand · terracotta", standard: "500 #C96442 主强调" },
  { key: "text", label: "text", standard: "800 #3D3929 正文墨" },
  { key: "bg", label: "bg", standard: "100 #FAF9F5 页面底" },
  { key: "icon", label: "icon", standard: "700 #3D3929" },
  { key: "border", label: "border", standard: "300 #DAD9D4 细线" },
  { key: "success", label: "success · 橄榄绿", standard: "500 #788C5D" },
  { key: "error", label: "error · 哑红", standard: "500 #D64545" },
];

const SEMANTIC_SWATCHES: readonly { cls: string; token: string }[] = [
  { cls: styles.semBackground, token: "--v2-background" },
  { cls: styles.semCard, token: "--v2-card" },
  { cls: styles.semPopover, token: "--v2-popover" },
  { cls: styles.semMuted, token: "--v2-muted" },
  { cls: styles.semPrimary, token: "--v2-primary" },
  { cls: styles.semSecondary, token: "--v2-secondary" },
  { cls: styles.semBorder, token: "--v2-border" },
  { cls: styles.semRing, token: "--v2-ring" },
  { cls: styles.semForeground, token: "--v2-foreground" },
  { cls: styles.semMutedForeground, token: "--v2-muted-foreground" },
  { cls: styles.semSuccess, token: "--v2-success" },
  { cls: styles.semError, token: "--v2-error" },
  { cls: styles.semSidebar, token: "--v2-sidebar" },
  { cls: styles.semSidebarAccent, token: "--v2-sidebar-accent" },
];

const V4_TOKEN_SWATCHES: readonly { cls: string; token: string; note: string }[] = [
  { cls: styles.semBackground, token: "--v2-background", note: "亮 #FAF9F5 · 暗 #201E19 暖炭" },
  { cls: styles.semSidebar, token: "--v2-sidebar", note: "亮 #F2F0E8 · 暗 #191813" },
  { cls: styles.semPrimary, token: "--v2-primary", note: "唯一交互强调（暗 #D97757）" },
  { cls: styles.semCinnabar, token: "--v3-cinnabar", note: "别名 → --v2-primary" },
  { cls: styles.semSlate, token: "--v3-slate-blue", note: "信息色：链接/溯源定位" },
  { cls: styles.semSelected, token: "--v3-selected-bg", note: "选中态底（导航/KP 药丸共用）" },
];

const TAB_ITEMS = [
  { id: "lesson", label: "讲义" },
  { id: "writing", label: "写作室" },
  { id: "case", label: "推理室" },
  { id: "disabled", label: "维护中", disabled: true },
] as const;

const RAIL_ITEMS = [
  { id: "clew", label: "Clew", href: "/learn/clew" },
  { id: "courses", label: "官方课程", href: "/courses" },
  { id: "question-bank", label: "题库", href: "/question-bank" },
  { id: "membership", label: "会员", href: "/account/billing" },
] as const;

const BOTTOM_NAV_ITEMS = [
  { id: "learn", label: "学习", href: "/learn" },
  { id: "courses", label: "课程", href: "/courses" },
  { id: "account", label: "会员", href: "/account/billing" },
] as const;

export function DesignSystemPreview() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Ariadne · DESIGN SYSTEM V4 · QUIET</p>
          <h1 className={styles.title}>设计系统预览</h1>
          <p className={styles.lead}>
            v4 Quiet（docs/DESIGN_V4.md）：暖象牙/暖炭双主题平涂、层级靠灰度、朱砂唯一强调
            （--v2-primary，--v3-cinnabar 为别名）、宋体只给文档标题与品牌、细边框或无边框、
            阴影仅浮层、动效仅流式光标/spinner/状态过渡。非颜色 token 沿用 v2 不动；
            token 唯一来源是 globals.css。明暗切换用壳顶栏右侧的日/月按钮。
          </p>
        </div>
      </header>

      <section className={styles.section} aria-label="原色阶">
        <h2 className={styles.sectionTitle}>原色阶（7 组 × 50–900）</h2>
        <p className={styles.sectionNote}>取值唯一来源：docs/design-references/claude-v2/colors_and_type.css，已落地 globals.css。</p>
        <div className={styles.stack}>
          {SCALES.map((scale) => (
            <div key={scale.key} className={styles.scaleGroup}>
              <p className={styles.scaleName}>{scale.label} · 标准：{scale.standard}</p>
              <div className={styles.scaleRow}>
                {SCALE_STEPS.map((step) => (
                  <div key={step}>
                    <div className={`${styles.swatch} ${styles[`${scale.key}${step}`]}`} />
                    <p className={styles.swatchLabel}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="语义 token">
        <h2 className={styles.sectionTitle}>语义 token（--v2-*）</h2>
        <div className={styles.semanticGrid}>
          {SEMANTIC_SWATCHES.map((swatch) => (
            <div key={swatch.token} className={styles.semanticCard}>
              <span className={`${styles.semanticDot} ${swatch.cls}`} aria-hidden="true" />
              <span>{swatch.token}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="Button">
        <h2 className={styles.sectionTitle}>Button</h2>
        <div className={styles.row}>
          <V2Button variant="primary">开始一段学习</V2Button>
          <V2Button variant="primary" disabled>开始一段学习</V2Button>
          <V2Button variant="secondary">打开设计指南</V2Button>
          <V2Button variant="secondary" disabled>打开设计指南</V2Button>
          <V2Button variant="ghost">打开设计指南</V2Button>
          <V2Button variant="ghost" disabled>打开设计指南</V2Button>
        </div>
      </section>

      <section className={styles.section} aria-label="Badge">
        <h2 className={styles.sectionTitle}>Badge</h2>
        <div className={styles.row}>
          <V2Badge variant="filled">简答</V2Badge>
          <V2Badge variant="filled" disabled>名词解释</V2Badge>
          <V2Badge variant="muted">病例分析</V2Badge>
          <V2Badge variant="muted" disabled>简答</V2Badge>
          <V2Badge variant="outline">待确认</V2Badge>
          <V2Badge variant="outline" disabled>待导入</V2Badge>
        </div>
      </section>

      <section className={styles.section} aria-label="Card">
        <h2 className={styles.sectionTitle}>Card</h2>
        <div className={styles.cardsGrid}>
          <V2Card eyebrow="Reading Card" title="总结这一章" body="v2 卡片用柔和层级与编辑排版承载长文阅读，层级靠字号与间距而非重字重。">
            <p className={styles.sectionNote}>floating（默认）</p>
          </V2Card>
          <V2Card variant="sunken" eyebrow="Editorial Sidebar" title="会话笔记" body="凹陷面承载辅助提示，不与主响应争抢注意力。">
            <p className={styles.sectionNote}>sunken</p>
          </V2Card>
          <V2Card variant="emphasis" eyebrow="Ariadne" title="发布前复核" body="最高优先级提示使用最强对比与最深阴影。">
            <p className={`${styles.sectionNote} ${styles.emphasisNote}`}>emphasis</p>
          </V2Card>
          <V2Card variant="disabled" eyebrow="Context locked" title="暂不可用" body="禁用态降调不降可读性，保持同一套间距与圆角。">
            <p className={styles.sectionNote}>disabled</p>
          </V2Card>
        </div>
      </section>

      <section className={styles.section} aria-label="Input">
        <h2 className={styles.sectionTitle}>Input</h2>
        <div className={styles.row}>
          <div className={styles.stack}>
            <V2Input variant="field" placeholder="搜索组件…" aria-label="独立输入框" />
            <V2Input variant="field" value="问一个证据层面的问题" readOnly aria-label="独立输入框（有值）" />
            <V2Input variant="field" placeholder="禁用态" disabled aria-label="独立输入框（禁用）" />
          </div>
          <div className={styles.stack}>
            <V2Input variant="bar" placeholder="内嵌式输入条…" aria-label="内嵌输入条" />
            <V2Input variant="bar" value="问一个证据层面的问题" readOnly aria-label="内嵌输入条（有值）" />
            <V2Input variant="bar" placeholder="禁用态" disabled aria-label="内嵌输入条（禁用）" />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Chat Bubble">
        <h2 className={styles.sectionTitle}>Chat Bubble</h2>
        <div className={styles.row}>
          <div className={styles.stack}>
            <p className={styles.demoLabel}>User / Assistant</p>
            <V2ChatBubble role="user" meta="你 · 刚刚">这一段的辨证链在哪里断了？</V2ChatBubble>
            <V2ChatBubble role="assistant" meta="Ariadne Agent · 1 分钟">先回到舌象证据：苔白腻提示痰湿，再对齐脉象。注意这是「可关联」，不能直接等同现代医学诊断。</V2ChatBubble>
            <V2ChatBubble role="user" meta="你 · 排队中" disabled>继续追问典型病案。</V2ChatBubble>
            <V2ChatBubble role="assistant" meta="Ariadne Agent · 不可用" disabled>这一轮服务暂不可用。</V2ChatBubble>
          </div>
          <div className={styles.stack}>
            <p className={styles.demoLabel}>Thread</p>
            <V2ChatThread>
              <V2ChatBubble role="user" meta="你 · 刚刚">推荐一条本周学习路径。</V2ChatBubble>
              <V2ChatBubble role="assistant" meta="Ariadne Agent · 1 分钟">先完成「口味与食欲」知识点，再做主观题写作与病案推理，最后回流错题。</V2ChatBubble>
            </V2ChatThread>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Navigation">
        <h2 className={styles.sectionTitle}>Navigation</h2>
        <div className={styles.rowStretch}>
          <div>
            <p className={styles.demoLabel}>Tab Strip</p>
            <V2TabStrip items={TAB_ITEMS} activeId="lesson" aria-label="页签导航示例" />
          </div>
          <div>
            <p className={styles.demoLabel}>Sidebar Rail</p>
            <V2SideRail brand="Ariadne" items={RAIL_ITEMS} activeId="clew" aria-label="侧栏导航示例" />
          </div>
          <div>
            <p className={styles.demoLabel}>Bottom Nav</p>
            <V2BottomNav items={BOTTOM_NAV_ITEMS} activeId="learn" aria-label="底部导航示例" />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="v4 Quiet token">
        <h2 className={styles.sectionTitle}>v4 Quiet token（批 1，2026-10-04）</h2>
        <p className={styles.sectionNote}>
          暗色页面底调为暖炭 #201E19（原 #262624）、侧栏 #191813；亮色侧栏收为一档灰 #F2F0E8。
          --v2-primary 为唯一交互强调 token，--v3-cinnabar 收敛为其别名；石板蓝降为信息色。
        </p>
        <div className={styles.semanticGrid}>
          {V4_TOKEN_SWATCHES.map((swatch) => (
            <div key={swatch.token} className={styles.semanticCard}>
              <span className={`${styles.semanticDot} ${swatch.cls}`} aria-hidden="true" />
              <span>
                {swatch.token}
                <span className={styles.v4TokenNote}>{swatch.note}</span>
              </span>
            </div>
          ))}
        </div>
        <div className={styles.v4DemoRow}>
          <div>
            <p className={styles.demoLabel}>选中态药丸（--v3-selected-*，导航与知识点共用）</p>
            <div className={styles.v4PillRow}>
              <span className={`${styles.v4Pill} ${styles.v4PillActive}`}>Clew 学习台</span>
              <span className={styles.v4Pill}>官方课程</span>
              <span className={styles.v4Pill}>题库</span>
            </div>
          </div>
          <div>
            <p className={styles.demoLabel}>知识点评选行</p>
            <div className={styles.v4PillRow}>
              <span className={`${styles.v4KpRow} ${styles.v4PillActive}`}>02 四诊合参原则 · 已有讲义</span>
              <span className={styles.v4KpRow}>03 望舌色 · 未生成讲义</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="字体样张">
        <h2 className={styles.sectionTitle}>字体栈（v2 定案映射）</h2>
        <div className={styles.typeGrid}>
          <div className={styles.typeSample}>
            <p className={styles.typeDisplay}>从证据开始辨证 Aa123</p>
            <p className={styles.typeMeta}>--v2-font-display · Songti SC / Noto Serif SC / Newsreader 回退</p>
          </div>
          <div className={styles.typeSample}>
            <p className={styles.typeSerif}>阅读面：循四诊证据，逐一推演证型边界，避免把「可关联」当作「等同」。</p>
            <p className={styles.typeMeta}>--v2-font-serif · Noto Serif SC / Songti SC / Lora 回退</p>
          </div>
          <div className={styles.typeSample}>
            <p className={styles.typeSans}>紧凑 UI：题量 30 · 单选 10 · 名词解释 5 · 本周复习 3 项</p>
            <p className={styles.typeMeta}>--v2-font-sans · MiSans / PingFang SC / Poppins 回退</p>
          </div>
          <div className={styles.typeSample}>
            <p className={styles.typeMono}>--v2-radius 8/12/16/20/24px · --v2-spacing 4px · 2026-09-19</p>
            <p className={styles.typeMeta}>--v2-font-mono · 与既有 --font-mono 相同</p>
          </div>
          <div className={styles.typeSample}>
            <p className={styles.typeKai}>知径</p>
            <p className={styles.typeMeta}>--v3-font-kai（v4 新增）· Kaiti SC / STKaiti / KaiTi · 只给品牌「知径」</p>
          </div>
          <div className={styles.typeSample}>
            <p className={styles.typeDoc}>学习文档面正文：四诊合参是指望、闻、问、切四种诊法互相印证、彼此校准，综合判断证候。</p>
            <p className={styles.typeMeta}>--v4-doc-size 15px / --v4-doc-leading 1.85（v4 新增）· 只给学习文档主列</p>
          </div>
        </div>
      </section>
    </div>
  );
}
