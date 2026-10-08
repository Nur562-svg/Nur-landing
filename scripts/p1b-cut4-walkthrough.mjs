/**
 * P1-B 第四刀走查：useStudyAssessment（自测 + FSRS 复习打分）真实链路探针。
 *
 * 验证面（设计评审批 P1-B 第四刀门槛）：
 *  1. 自测面板经 hook 渲染：道数/已标记 meta、标记按钮、data-mark 翻转；
 *  2. localStorage 标记写入与按讲义版本恢复（reload 后 meta 恢复）；
 *  3. 全标记自动提交 → 结果 note（真实服务端往返）；
 *  4. 复习打分三键：错误路径（请求注入失败 →「打分暂时未能记录」）+ 成功路径
 *     （「已记录：下次复习…」+ 排期文案替换三键）；
 *  5. 「只看还需看」筛选（hook 过滤派生）；
 *  6. 明暗 × 1440/390 截图 + console 0 + 横向溢出 0。
 *
 * 账号：v4qa2-1791112494@example.com（密码 m6d-walkthrough）；KP=v4qa-kp-01（有讲义 + 到期复习条目）。
 * 走查副作用（须在 design-qa 注记）：消耗 v4qa-kp-01 一条到期复习打分（FSRS 前移）+ 一次自测提交事件。
 *
 * 用法：node scripts/p1b-cut4-walkthrough.mjs --base http://localhost:3000
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
const TAG = arg("tag", "p1b-cut4");
const KP = arg("kp", "v4qa-kp-01");
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
      // 打分错误路径由 route.abort 注入（ERR_FAILED 是探针预期产物，非产品错误），不计入门槛
      if (/net::ERR_FAILED/.test(message.text())) {
        return;
      }
      consoleErrors.push(`[${viewport.width}${dark ? " dark" : ""}] ${message.text().slice(0, 200)}`);
    }
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(`[${viewport.width}${dark ? " dark" : ""}] pageerror: ${String(error).slice(0, 200)}`);
  });
  return { context, page };
}

async function gotoStudy(page) {
  await page.goto(`${BASE}/learn/clew/t/v4qa-textbook-1/c/1?kp=${KP}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => document.querySelector("#clew-selfcheck-title") !== null,
    { timeout: 20_000 },
  );
  await page.evaluate(() => document.querySelector("#clew-selfcheck-title")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(600);
}

function metaText(page) {
  return page.evaluate(() => {
    const panel = document.querySelector('[aria-labelledby="clew-selfcheck-title"]');
    return panel?.querySelector("p")?.textContent ?? "";
  });
}

/** DOM click + waitFor（既有方法学：getByRole 点击对 React 渲染时序有竞态假阴性）。 */
async function clickButtonByText(page, scopeSelector, text) {
  await page.waitForFunction(
    (sel) => Boolean(document.querySelector(sel)),
    scopeSelector,
    { timeout: 10_000 },
  );
  await page.evaluate(
    ({ sel, text }) => {
      const scope = document.querySelector(sel);
      const btn = Array.from(scope?.querySelectorAll("button") ?? []).find((b) =>
        (b.textContent ?? "").trim().startsWith(text),
      );
      btn?.click();
      if (!btn) throw new Error(`button not found: ${text}`);
    },
    { sel: scopeSelector, text },
  );
}

async function waitForStatus(page, scopeSelector, pattern, timeout = 15_000) {
  return page
    .waitForFunction(
      ({ sel, source }) => {
        const re = new RegExp(source);
        const scope = document.querySelector(sel);
        const statuses = Array.from(scope?.querySelectorAll('[role="status"]') ?? []);
        return statuses.some((el) => re.test(el.textContent ?? ""));
      },
      { sel: scopeSelector, source: pattern.source },
      { timeout },
    )
    .then(() => true)
    .catch(() => false);
}

function overflowOf(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

/* ================= 主走查（1440 light） ================= */
const cookie = await login("v4qa2-1791112494@example.com", "m6d-walkthrough");
const PANEL = '[aria-labelledby="clew-selfcheck-title"]';

{
  const { context, page } = await newPage({ width: 1440, height: 900 }, cookie);
  await gotoStudy(page);

  // 1. hook 派生渲染：meta + 打分三键（到期）
  const meta0 = await metaText(page);
  check("自测 meta 渲染（N 道 · 已标记 0 道）", /道 · 已标记 0 道/.test(meta0), meta0);
  const dueButtons = await page.evaluate(() => {
    const group = document.querySelector('[role="group"][aria-label="复习打分"]');
    return group ? Array.from(group.querySelectorAll("button")).map((b) => (b.textContent ?? "").trim()) : [];
  });
  check("到期打分三键渲染", JSON.stringify(dueButtons) === JSON.stringify(["再来一次", "有点难", "记住了"]), dueButtons.join("/"));

  // 2. 打分错误路径（注入网络失败 → 诚实报错，不清排期；route.abort 走 catch 分支文案「（网络问题）」）
  await page.route("**/api/clew/reviews/*", (route) => (route.request().method() === "PATCH" ? route.abort("failed") : route.continue()));
  await clickButtonByText(page, '[role="group"][aria-label="复习打分"]', "记住了");
  const errorNoteShown = await waitForStatus(page, PANEL, /打分暂时未能记录/);
  check("打分错误路径：诚实报错", errorNoteShown, "「打分暂时未能记录…」");
  await page.unroute("**/api/clew/reviews/*");

  // 3. 打分成功路径（真实 FSRS 前移）
  await clickButtonByText(page, '[role="group"][aria-label="复习打分"]', "记住了");
  await waitForStatus(page, PANEL, /已记录：下次复习/);
  check("打分成功：确认 note", await waitForStatus(page, PANEL, /已记录：下次复习.*「我的学习 · 今日复习」同步更新/), "「已记录：下次复习…」");
  await page.waitForTimeout(800);
  const scheduledText = await page.evaluate(() => {
    const row = document.querySelector('[aria-labelledby="clew-selfcheck-title"]');
    return Array.from(row?.querySelectorAll("p") ?? []).map((p) => p.textContent ?? "").find((t) => t.includes("复习排期中")) ?? "";
  });
  check("打分后三键替换为排期文案", /复习排期中：下次/.test(scheduledText), scheduledText.slice(0, 60));

  // 4. 自测标记：第 1 题还需看 + localStorage 写入
  await clickButtonByText(page, PANEL, "还需看");
  await page.waitForTimeout(400);
  const mark1 = await page.evaluate(() => {
    const li = document.querySelector('[aria-labelledby="clew-selfcheck-title"] li[data-mark="shaky"]');
    return li !== null;
  });
  check("标记「还需看」→ data-mark=shaky", mark1);
  const stored = await page.evaluate(() => window.localStorage.getItem("nur-learn:clew-selfcheck:v4qa-kp-01"));
  check("localStorage 标记写入（经 study-preferences）", Boolean(stored && JSON.parse(stored).marks), (stored ?? "").slice(0, 80));
  const meta1 = await metaText(page);
  check("meta 出现「还需看 1 道」", /还需看 1 道/.test(meta1), meta1);

  // 5. 其余全部标「会了」→ 自动提交（真实服务端）→ 结果 note
  //    每次点第一个未标记项（data-mark="idle"）的「会了」——面板按钮文案同名，须按项定位
  const itemCount = await page.evaluate(
    () => document.querySelectorAll('[aria-labelledby="clew-selfcheck-title"] li[data-mark]').length,
  );
  for (let i = 0; i < itemCount - 1; i += 1) {
    await clickButtonByText(page, `${PANEL} li[data-mark="idle"]`, "会了");
    await page.waitForTimeout(350);
  }
  await waitForStatus(page, PANEL, /已把|已重新计为|已记录；|「评」环节完成/, 20_000);
  const submitNote = await page.evaluate(() => {
    const panel = document.querySelector('[aria-labelledby="clew-selfcheck-title"]');
    return Array.from(panel?.querySelectorAll('[role="status"]') ?? []).map((el) => el.textContent ?? "").join(" | ");
  });
  check(
    "全标记自动提交 → 结果 note",
    /已把 1 道「还需看」|已重新计为「还需看」|已记录；本次提交/.test(submitNote),
    submitNote.slice(0, 120),
  );
  const metaDone = await metaText(page);
  check("meta「已完成」", /· 已完成/.test(metaDone), metaDone);

  // 6. 筛选（hook 过滤派生）
  await clickButtonByText(page, PANEL, "只看还需看");
  await page.waitForTimeout(400);
  const filtered = await page.evaluate(
    () => document.querySelectorAll('[aria-labelledby="clew-selfcheck-title"] li[data-mark]').length,
  );
  check("「只看还需看」过滤到 1 项", filtered === 1, `visible=${filtered}`);

  // 7. 恢复路径：reload → 标记按讲义版本恢复
  //    注：SSR 首屏 HTML 的 meta 恒为「已标记 0 道」（恢复在 hydration 后的 effect 里）——
  //    固定短等待会读到 SSR 初始态（假阴性），此处等待 meta 与存储一致（竞态消除，方法学同前批注记）。
  const storedBefore = await page.evaluate(() => window.localStorage.getItem("nur-learn:clew-selfcheck:v4qa-kp-01"));
  check("reload 前存储完好（3 题标记）", Boolean(storedBefore && Object.keys(JSON.parse(storedBefore).marks ?? {}).length === 3));
  await gotoStudy(page);
  const storedAfter = await page.evaluate(() => window.localStorage.getItem("nur-learn:clew-selfcheck:v4qa-kp-01"));
  const expectedMarked = Object.keys(JSON.parse(storedAfter ?? "{}").marks ?? {}).length;
  const restoredInTime = await page
    .waitForFunction(
      (expected) => {
        const p = document.querySelector('[aria-labelledby="clew-selfcheck-title"] p');
        return new RegExp(`已标记 ${expected} 道`).test(p?.textContent ?? "");
      },
      expectedMarked,
      { timeout: 8_000 },
    )
    .then(() => true)
    .catch(() => false);
  check("reload 后标记恢复（已标记 N 道，等 hydration）", restoredInTime, `expected=${expectedMarked}`);
  const metaRestored = await metaText(page);
  check("reload 后标记恢复（已标记 N 道）", /已标记 [1-9] 道/.test(metaRestored), metaRestored);
  const shakyRestored = await page.evaluate(
    () => document.querySelectorAll('[aria-labelledby="clew-selfcheck-title"] li[data-mark="shaky"]').length,
  );
  check("reload 后「还需看」标记仍在", shakyRestored === 1, `shaky=${shakyRestored}`);

  // 8. 截图（明 1440）
  await page.evaluate(() => document.querySelector("#clew-selfcheck-title")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: resolve(OUT, `${TAG}-selfcheck-light-1440.png`), fullPage: false });
  await context.close();
}

/* ================= 明暗 × 1440/390 截图 + 溢出 + console ================= */
for (const viewport of [
  { width: 1440, height: 900, tag: "1440" },
  { width: 390, height: 844, tag: "390" },
]) {
  for (const dark of [false, true]) {
    const { context, page } = await newPage(viewport, cookie, { dark });
    await gotoStudy(page);
    const overflow = await overflowOf(page);
    check(`横向溢出 0（${viewport.tag}${dark ? " dark" : " light"}）`, overflow <= 1, `overflow=${overflow}px`);
    await page.screenshot({ path: resolve(OUT, `${TAG}-selfcheck-${dark ? "dark" : "light"}-${viewport.tag}.png`), fullPage: false });
    await context.close();
  }
}

await browser.close();

console.log(`\nconsole errors: ${consoleErrors.length}`);
for (const line of consoleErrors.slice(0, 10)) console.log("  ", line);
if (failures.length > 0 || consoleErrors.length > 0) {
  console.error(`\n失败 ${failures.length} 项：${failures.join("、")}`);
  process.exit(1);
}
console.log("P1-B 第四刀走查全部通过。");
