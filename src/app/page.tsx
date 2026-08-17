"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

const patternRows = Array.from({ length: 20 });
const patternWords = Array.from({ length: 22 });

const courseNames = [
  "中医基础理论",
  "中医诊断学",
  "中药学",
  "方剂学",
  "伤寒论",
  "金匮要略",
  "温病学",
  "内经选读",
  "人体解剖学",
  "组织胚胎学",
  "生理学",
  "生物化学",
  "病理学",
  "病理生理学",
  "药理学",
  "医学免疫学",
  "病原生物学",
  "诊断学",
  "内科学",
  "外科学",
  "针灸学",
  "中医内科学",
  "中医外科学",
];

const features = [
  {
    title: "证据先行",
    description: "每个知识点从可追溯的教材、讲义与题源证据出发，先取证再下结论。",
  },
  {
    title: "双镜对照",
    description: "中医与现代医学视角并列呈现，用明确的关系标签避免虚假等同。",
  },
  {
    title: "辨证输出",
    description: "主观题完整表达与案例推理链训练，把理解真正落到答题上。",
  },
];

const buildRows = [
  ["01", "问诊 · 问饮食口味", "取证 → 双镜对照 → 输出评分 → 案例迁移，完整学习闭环。"],
  ["02", "望舌苔 / 问寒热 / 常见病脉", "五个源证锚定的中医诊断深度循环，共用同一套类型契约。"],
  ["03", "内环境与稳态", "西医为主的知识点切片，生理学机制迁移训练。"],
];

const journalRows = [
  ["01", "为什么中医与西医应当并列呈现，而不是互相替代"],
  ["02", "辨证推理链最容易断在哪里，以及如何补上"],
  ["03", "主观题「差一点」的答案，缺的往往是结构而非知识"],
  ["04", "一场期末考试背后的学习节奏设计"],
];

export default function Home() {
  const [cursor, setCursor] = useState({ x: -400, y: -400, radius: 0 });

  // Deterministic grid (no Math.random) so SSR HTML matches client hydration.
  const shuffledCourses = useMemo(() => {
    const total = patternRows.length * patternWords.length;
    return Array.from({ length: total }, (_, index) => {
      // Mild row/column stride so adjacent cells are not identical.
      const stride =
        (index * 7 + Math.floor(index / patternWords.length) * 3) % courseNames.length;
      return courseNames[stride];
    });
  }, []);

  function handleHeroPointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      radius: window.matchMedia("(max-width: 700px)").matches ? 118 : 170,
    });
  }

  function handleHeroPointerLeave() {
    setCursor((current) => ({ ...current, radius: 0 }));
  }

  const revealStyle = {
    "--reveal-x": `${cursor.x}px`,
    "--reveal-y": `${cursor.y}px`,
    "--reveal-radius": `${cursor.radius}px`,
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-black">
      <header className="site-shell sticky top-0 z-30 border-b border-black bg-[#f7f4ef]/92 backdrop-blur">
        <Link href="/learn" className="brand-lockup" aria-label="NUR LEARN 学习首页">
          <span>NUR LEARN</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#build">学习闭环</a>
          <a href="#journal">辨证札记</a>
          <Link href="/learn">进入应用</Link>
        </nav>
      </header>

      <div id="top" className="page-frame">
        <section
          className="hero-panel"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={handleHeroPointerLeave}
        >
          <div className="pattern-layer" aria-hidden="true">
            {patternRows.map((_, rowIndex) => (
              <div className="pattern-row" key={rowIndex}>
                {patternWords.map((__, wordIndex) => (
                  <span key={wordIndex}>Nur learn</span>
                ))}
              </div>
            ))}
          </div>

          <div className="hero-copy">
            <p>&nbsp;</p>
            <h1>你好，这是 NUR LEARN</h1>
          </div>

          <div className="reveal-layer" style={revealStyle} aria-hidden="true">
            <div className="pattern-layer pattern-layer-inverted">
              {patternRows.map((_, rowIndex) => (
                <div className="pattern-row pattern-row-inverted" key={rowIndex}>
                  {patternWords.map((__, wordIndex) => (
                    <span key={wordIndex}>
                      {shuffledCourses[rowIndex * patternWords.length + wordIndex]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="hero-copy hero-copy-inverted">
              <p>即可开始学习</p>
              <h2>你好，成绩将飞速提升</h2>
            </div>
          </div>
        </section>

        <section className="feature-grid" aria-label="Product directions">
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-visual" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section id="build" className="list-section">
          <div className="section-heading">
            <h2>顺着学习闭环走</h2>
            <p>
              Nur learn专为医学生创建的学习闭环，从而提升学习效率、得分能力，用户还可选择提供已标注的学习资料来创建的属于自己的学习闭环
            </p>
          </div>
          <div className="row-list">
            {buildRows.map(([index, title, description]) => (
              <Link className="index-row" href="/learn" key={title}>
                <span className="row-index">{index}</span>
                <span className="row-content">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <span className="row-arrow">-&gt;</span>
              </Link>
            ))}
          </div>
        </section>

        <section id="journal" className="list-section">
          <div className="section-heading">
            <h2>辨证札记</h2>
          </div>
          <div className="row-list">
            {journalRows.map(([index, title]) => (
              <div className="index-row compact" key={title} role="article">
                <span className="row-index">{index}</span>
                <span className="row-content">
                  <strong>{title}</strong>
                </span>
                <span className="row-arrow" aria-hidden="true">-&gt;</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-band">
          <h2>把理解落到答题上</h2>
          <p>
            每个知识点从证据出发，用双镜对照建立理解，再通过主观题写作与案例推理，
            把辨证能力真正转化为考场上的表达。
          </p>
          <Link href="/learn" className="contact-cta">
            进入 NUR LEARN 学习平台 →
          </Link>
        </section>
      </div>
    </main>
  );
}
