"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useState } from "react";

const patternRows = Array.from({ length: 12 });
const patternWords = Array.from({ length: 18 });

const features = [
  {
    title: "Signal Console",
    description: "A focused surface for exploring models, prompts, and live system traces.",
  },
  {
    title: "Context Engine",
    description: "Structured memory, evaluations, and decisions presented as calm layers.",
  },
  {
    title: "Agent Studio",
    description: "Long-running workflows with clear state, compact cards, and precise controls.",
  },
];

const buildRows = [
  ["01", "Interactive prototype", "Cursor-led hero, hidden language layer, responsive motion."],
  ["02", "Research dashboard", "Dense lists, strong borders, quiet typography, fast scanning."],
  ["03", "Launch microsite", "Editorial sections that keep the first screen dramatic."],
];

const journalRows = [
  ["01", "Designing interfaces that feel intelligent before they say anything"],
  ["02", "Why monochrome systems still make technical products feel premium"],
  ["03", "Using motion as feedback instead of decoration"],
  ["04", "A field guide to layered typography and ambient structure"],
];

export default function Home() {
  const [cursor, setCursor] = useState({ x: -400, y: -400, radius: 0 });

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
        <a href="#top" className="brand-lockup" aria-label="Go to top">
          <span className="brand-mark" aria-hidden="true" />
          <span>Signal Index</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#build">Build</a>
          <a href="#journal">Journal</a>
          <a href="#contact">Contact</a>
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
                  <span key={wordIndex}>S I G N A L</span>
                ))}
              </div>
            ))}
          </div>

          <div className="hero-copy">
            <p>Experimental interface system</p>
            <h1>Hello, I am a living surface</h1>
          </div>

          <div className="reveal-layer" style={revealStyle} aria-hidden="true">
            <div className="pattern-layer pattern-layer-inverted">
              {patternRows.map((_, rowIndex) => (
                <div className="pattern-row pattern-row-inverted" key={rowIndex}>
                  {patternWords.map((__, wordIndex) => (
                    <span key={wordIndex}>L A T E N T</span>
                  ))}
                </div>
              ))}
            </div>
            <div className="hero-copy hero-copy-inverted">
              <p>Hidden layer follows the pointer</p>
              <h2>你好，灵感正在显现</h2>
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
            <h2>Build with the system</h2>
            <p>
              Sharp black borders, warm paper tone, large type, and hover states
              that invert the whole row for immediate feedback.
            </p>
          </div>
          <div className="row-list">
            {buildRows.map(([index, title, description]) => (
              <a className="index-row" href="#contact" key={title}>
                <span className="row-index">{index}</span>
                <span className="row-content">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <span className="row-arrow">-&gt;</span>
              </a>
            ))}
          </div>
        </section>

        <section id="journal" className="list-section">
          <div className="section-heading">
            <h2>Journal</h2>
          </div>
          <div className="row-list">
            {journalRows.map(([index, title]) => (
              <a className="index-row compact" href="#contact" key={title}>
                <span className="row-index">{index}</span>
                <span className="row-content">
                  <strong>{title}</strong>
                </span>
                <span className="row-arrow">-&gt;</span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-band">
          <h2>Bring the style to your product</h2>
          <p>
            This page is an original interpretation of the interaction language:
            no copied logo, no brand assets, and no source imagery.
          </p>
        </section>
      </div>
    </main>
  );
}
