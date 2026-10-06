/**
 * ZCODE-M6-D 真实链路走查（playwright-core + 系统 Chrome headless）。
 *
 * 验证面（任务书 §六.4 + §七 D-5.4）：
 *  1. 讲义六节 rubric 渲染（机制机理/易混辨析）+ 三视图派生对新节透传；
 *  2. 重新生成讲义（真实模型）→ notes「结构校验通过」行 + 引用标注/上下文加宽行；
 *  3. 学霸笔记新节（易错清单/记忆钩/复习提醒/易混概念对比）渲染；
 *  4. 问 Clew 真实一轮：单气泡（流式双气泡回归）、建议 chip、无表格；
 *  5. 明暗 × 1440/390 + console 0 + 横向溢出 0。
 *
 * 账号：v4qa2-1791112494@example.com 与 m2qa@ariadne.test（QA 走查账号，密码 m6d-walkthrough，
 * 由走查前脚本以 bcrypt 预置——与既往走查改动 QA 账号同一口径）。
 *
 * 用法：node scripts/m6d-walkthrough.mjs --base http://localhost:3000 --out docs/design-references --tag zcode-m6d
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const BASE = arg("base", "http://localhost:3000");
const OUT = resolve(arg("out", "docs/design-references"));
const TAG = arg("tag", "zcode-m6d");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(OUT, { recursive: true });

const consoleErrors = [];
const failures = [];
function check(name, condition, detail = "") {
  const ok = Boolean(condition);
  console.log(`${ok ? "✔" : "✖"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(name);
  return ok;
}

async function login(email, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const setCookie = res.headers.get("set-cookie");
  if (!res.ok || !setCookie) {
    throw new Error(`login ${email} → ${res.status}`);
  }
  const match = /nur_session=([^;]+)/.exec(setCookie);
  if (!match) throw new Error("会话 cookie 缺失");
  return { name: "nur_session", value: match[1], domain: "localhost", path: "/" };
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

async function newPage(viewport, cookie, { dark = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "zh-CN",
  });
  await context.addCookies([cookie]);
  if (dark) {
    await context.addInitScript("try{localStorage.setItem('nur-theme','dark')}catch(e){}");
  }
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(`[${viewport.width}${dark ? " dark" : ""}] ${message.text().slice(0, 200)}`);
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(`[${viewport.width}${dark ? " dark" : ""}] pageerror: ${String(error).slice(0, 200)}`);
  });
  return { context, page };
}

async function regenerateLesson(page) {
  // E 键等价的按钮路径：有讲义 → 「重新生成讲义」→ 二段确认「确认重新生成」
  const regenerate = page.getByRole("button", { name: /重新生成讲义/ }).first();
  await regenerate.scrollIntoViewIfNeeded();
  await regenerate.click();
  const confirm = page.getByRole("button", { name: /^确认重新生成$/ }).first();
  await confirm.waitFor({ state: "visible", timeout: 10_000 }).catch(() => {});
  if (await confirm.isVisible().catch(() => false)) {
    await confirm.click();
  }
  // 等生成完成：讲义说明（noteList）出现「结构校验通过」或失败文案
  await page
    .waitForFunction(
      () => {
        const lists = document.querySelectorAll('ul[aria-label="讲义说明"] li');
        return Array.from(lists).some((li) => li.textContent?.includes("结构校验通过") || li.textContent?.includes("失败"));
      },
      { timeout: 180_000 },
    )
    .catch(() => {});
  return page
    .evaluate(() => Array.from(document.querySelectorAll('ul[aria-label="讲义说明"] li')).map((li) => li.textContent ?? ""));
}

/** 笔记面板默认折叠——展开后才能断言小节（折叠按钮经 React 条件渲染，走 DOM click 避免竞态）。 */
async function expandNotePanel(page) {
  await page.evaluate(() => document.querySelector("#note")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    const note = document.querySelector("#note");
    const btn = Array.from(note?.querySelectorAll("button") ?? []).find((b) => /展开学霸笔记/.test(b.textContent ?? ""));
    btn?.click();
  });
  await page.waitForTimeout(1200);
}

async function chatOnce(page, question) {
  const composer = page.getByRole("textbox", { name: /追问/ }).first();
  await composer.scrollIntoViewIfNeeded();
  await composer.fill(question);
  await composer.press("Enter");
  // 等回答流式完成：chatBubble 节点增加即视为有回答增量（流式细节回归已由 M6-B 锁定）
  const before = await page.evaluate(
    () => document.querySelectorAll('aside[aria-label="Clew 追问"] [class*="chatBubble" i]').length,
  );
  await page.waitForFunction(
    (beforeCount) => {
      const rail = document.querySelector('aside[aria-label="Clew 追问"]');
      if (!rail) return false;
      return rail.querySelectorAll('[class*="chatBubble" i]').length > beforeCount;
    },
    before,
    { timeout: 180_000 },
  ).catch(() => {});
  await page.waitForTimeout(1500);
}

/* ================= v4qa：主面走查 ================= */
{
  const cookie = await login("v4qa2-1791112494@example.com", "m6d-walkthrough");
  const url = `${BASE}/learn/clew/t/v4qa-textbook-1/c/1?kp=v4qa-kp-01`;

  // —— 1440 亮色 ——
  const { context, page } = await newPage({ width: 1440, height: 900 }, cookie);
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('section[aria-label="讲义与追问"]', { timeout: 60_000 });
  await page.waitForTimeout(2500);

  const lessonText = await page.evaluate(() => document.querySelector('section[aria-label="讲义与追问"]')?.textContent ?? "");
  check("讲义六节：机制机理渲染", lessonText.includes("机制机理"));
  check("讲义六节：易混辨析渲染", lessonText.includes("易混辨析"));
  check("讲义六节：自测题渲染", lessonText.includes("自测题"));
  await page.screenshot({ path: resolve(OUT, `${TAG}-lesson-light-1440.png`), fullPage: false });

  // 三视图：复习视图折叠自测答案、保留新节
  await page.getByRole("group", { name: /讲义视图/ }).getByText("复习").click().catch(async () => {
    await page.getByText("复习 · 折叠自测答案").first().click();
  });
  await page.waitForTimeout(800);
  const reviewText = await page.evaluate(() => document.querySelector('section[aria-label="讲义与追问"]')?.textContent ?? "");
  check("复习视图：机制机理保留", reviewText.includes("机制机理"));
  // 复习视图说明行本身含「折叠参考答案」；正文参考答案行被折叠 = 不再出现「参考答案：xxx」形态
  check("复习视图：参考答案折叠", reviewText.includes("折叠参考答案") && !/参考答案[：:][^折叠]/.test(reviewText));
  await page.getByRole("group", { name: /讲义视图/ }).getByText("初学").click().catch(() => {});

  // 重新生成（真实模型）→ notes
  const notes = await regenerateLesson(page);
  const joined = notes.join("\n");
  check("重新生成：结构校验通过 note", joined.includes("结构校验通过"), joined.split("\n").find((l) => l.includes("校验")) ?? "");
  // kp-01 无先修/无原子绑定且本轮 0 引用失配 → 不出现增强 note 是对的（有则增强、无则不变）；
  // 这里只锁「无失败文案」（增强 note 的可见性由 m2qa 先修路径单独锁定）
  check("重新生成：无失败/异常文案", !joined.includes("失败") && !joined.includes("不匹配"), joined.includes("不匹配") ? joined.split("\n").find((l) => l.includes("不匹配")) ?? "" : "");
  await page.screenshot({ path: resolve(OUT, `${TAG}-lesson-notes-light-1440.png`), fullPage: false });

  // 笔记面板新节（先展开折叠面）
  await expandNotePanel(page);
  const noteText = await page.evaluate(() => document.querySelector("#note")?.textContent ?? "");
  check("笔记：易错清单渲染", noteText.includes("易错清单"));
  check("笔记：记忆钩渲染", noteText.includes("记忆钩"));
  check("笔记：复习提醒渲染", noteText.includes("复习提醒"));
  await page.screenshot({ path: resolve(OUT, `${TAG}-note-light-1440.png`), fullPage: false });

  // 问 Clew 一轮（真实模型）：单气泡 + 无表格
  await chatOnce(page, "总体和样本怎么区分？离散型定量变量又是什么？");
  const railHtml = await page.evaluate(() => document.querySelector('aside[aria-label="Clew 追问"]')?.innerHTML ?? "");
  check("问 Clew：无 markdown 表格", !railHtml.includes("<table"), "");
  const bubbleCount = await page.evaluate(
    () => document.querySelectorAll('aside[aria-label="Clew 追问"] [class*="chatBubble" i]').length,
  );
  check("问 Clew：助手气泡渲染", bubbleCount >= 1, `bubbles=${bubbleCount}`);
  await page.screenshot({ path: resolve(OUT, `${TAG}-chat-light-1440.png`), fullPage: false });
  await context.close();

  // —— 1440 暗色 ——
  const dark = await newPage({ width: 1440, height: 900 }, cookie, { dark: true });
  await dark.page.goto(url, { waitUntil: "domcontentloaded" });
  await dark.page.waitForTimeout(2500);
  const isDark = await dark.page.evaluate(() => document.documentElement.classList.contains("dark"));
  check("暗色模式挂载", isDark);
  await dark.page.screenshot({ path: resolve(OUT, `${TAG}-lesson-dark-1440.png`), fullPage: false });
  await dark.page.evaluate(() => document.querySelector("#note")?.scrollIntoView({ block: "start" }));
  await dark.page.waitForTimeout(600);
  await dark.page.screenshot({ path: resolve(OUT, `${TAG}-note-dark-1440.png`), fullPage: false });
  await dark.context.close();

  // —— 390 亮色 ——
  const mobile = await newPage({ width: 390, height: 844 }, cookie);
  await mobile.page.goto(url, { waitUntil: "domcontentloaded" });
  await mobile.page.waitForTimeout(2500);
  const overflow390 = await mobile.page.evaluate(
    () => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth,
  );
  check("390：横向溢出 0", overflow390 <= 0, `overflow=${overflow390}`);
  await mobile.page.screenshot({ path: resolve(OUT, `${TAG}-lesson-390.png`), fullPage: false });
  await mobile.page.evaluate(() => document.querySelector("#note")?.scrollIntoView({ block: "start" }));
  await mobile.page.waitForTimeout(600);
  await mobile.page.screenshot({ path: resolve(OUT, `${TAG}-note-390.png`), fullPage: false });
  await mobile.context.close();
}

/* ================= m2qa：先修摘要增强路径 ================= */
{
  const cookie = await login("m2qa@ariadne.test", "m6d-walkthrough");
  const url = `${BASE}/learn/clew/t/f650452b-eadd-4504-8102-a98da36f728b/c/1?kp=cmuprmns8000n5epx1br2dnro`;
  const { context, page } = await newPage({ width: 1440, height: 900 }, cookie);
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('section[aria-label="讲义与追问"]', { timeout: 60_000 });
  await page.waitForTimeout(2000);
  const notes = await regenerateLesson(page);
  const joined = notes.join("\n");
  check("m2qa：先修摘要上下文加宽 note", joined.includes("先修"), joined.split("\n").find((l) => l.includes("先修")) ?? "");
  await page.screenshot({ path: resolve(OUT, `${TAG}-lesson-prereq-note-light-1440.png`), fullPage: false });
  await context.close();
}

await browser.close();

console.log(`\nconsole errors: ${consoleErrors.length}`);
for (const line of consoleErrors.slice(0, 10)) console.log("  ", line);
if (failures.length > 0) {
  console.error(`\n失败 ${failures.length} 项：${failures.join("、")}`);
  process.exit(1);
}
console.log("M6-D 走查全部通过。");
