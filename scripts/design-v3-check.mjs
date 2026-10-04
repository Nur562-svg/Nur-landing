/**
 * Design system layout readback（R3 引入；DESIGN_V4 批 1 起断言更新为 v4 契约：
 * 壳侧栏 264px、安静进度线 role=progressbar + 「教材路径」措辞）。
 * Usage: node scripts/design-v3-check.mjs --base http://127.0.0.1:3000 --out <dir>
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const BASE = arg("base", "http://127.0.0.1:3000");
const OUT = resolve(arg("out", "docs/design-references"));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(OUT, { recursive: true });

const NARROW_ROUTES = [
  "/learn",
  "/learn/hi-doc",
  "/learn/my-materials",
  "/courses",
  "/courses/tcm-diagnostics",
  "/courses/tcm-diagnostics/knowledge-points/diet-and-taste",
  "/question-bank",
  "/wrong-questions",
  "/account/billing",
];

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-extensions", "--force-color-profile=srgb", "--hide-scrollbars"],
});

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error(`[FAIL] ${message}`);
};

async function readLayout(page) {
  return page.evaluate(() => {
    const sidebar = document.querySelector("aside[aria-label='工作台导航']");
    const canvas = document.querySelector("[data-workspace-canvas]");
    const palette = document.querySelector("[data-command-palette]");
    const text = document.body.innerText;
    const buttons = [...document.querySelectorAll("button, a")];
    const small = buttons.filter((node) => {
      const box = node.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && (box.width < 44 || box.height < 44);
    }).slice(0, 8).map((node) => ({
      label: (node.getAttribute("aria-label") || node.textContent || "").trim().slice(0, 40),
      width: Math.round(node.getBoundingClientRect().width),
      height: Math.round(node.getBoundingClientRect().height),
    }));
    const groups = palette
      ? [...palette.querySelectorAll("[role='group']")].map((group) => ({
        label: group.getAttribute("aria-label"),
        rows: group.querySelectorAll("button").length,
      }))
      : [];
    return {
      sidebar: sidebar ? Math.round(sidebar.getBoundingClientRect().width) : 0,
      canvas: canvas ? Math.round(canvas.getBoundingClientRect().width) : 0,
      palette: palette
        ? {
          x: Math.round(palette.getBoundingClientRect().x),
          width: Math.round(palette.getBoundingClientRect().width),
          bottom: Math.round(window.innerHeight - palette.getBoundingClientRect().bottom),
        }
        : null,
      groups,
      hasEntryGrid: text.includes("官方课程学习闭环") || text.includes("传统刷题题库"),
      // v4（DESIGN_V4 §四/P0-1）：安静进度线 = 2px 细线（role=progressbar）+ 一行小字；
      // 八步名称 chips 已由路径线取代，改为校验「教材路径」措辞。
      hiDoc: {
        progress: Boolean(document.querySelector("[role='progressbar'] i")),
        status: Boolean(document.querySelector("[role='status']")),
        next: text.includes("下一步"),
        path: text.includes("教材路径"),
      },
      overflow: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      },
      small,
      errors: window.__v3Errors ?? [],
    };
  });
}

function watchErrors(page, bucket) {
  page.on("pageerror", (error) => bucket.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") bucket.push(message.text());
  });
}

async function openPage(page, path) {
  const response = await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(400);
  return response?.status() ?? 0;
}

const desktopReads = [];
for (const run of [1, 2]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  watchErrors(page, errors);
  const learnStatus = await openPage(page, "/learn");
  if (learnStatus !== 200) fail(`run ${run} /learn status ${learnStatus}`);
  await page.screenshot({ path: resolve(OUT, `v3-learn-1440-run${run}.png`), fullPage: false });
  const learn = await readLayout(page);
  desktopReads.push({ run, route: "/learn", ...learn });
  console.log(`[1440 run ${run}] /learn sidebar=${learn.sidebar} canvas=${learn.canvas} viewport=1440 canvasRatio=${(learn.canvas / 1440).toFixed(3)} entryCards=${learn.hasEntryGrid}`);
  // v4（DESIGN_V4 §四/P1-6）：壳侧栏 280 → 264px
  if (learn.sidebar !== 264) fail(`run ${run} sidebar ${learn.sidebar}`);
  if (learn.canvas < 1440 * 0.7) fail(`run ${run} canvas ${learn.canvas}`);
  if (learn.hasEntryGrid) fail(`run ${run} still shows the three entry cards`);
  await page.keyboard.press("Meta+k");
  await page.waitForTimeout(250);
  if (!(await page.locator("[data-command-palette]").count())) {
    await page.keyboard.press("Control+k");
    await page.waitForTimeout(250);
  }
  const withPalette = await readLayout(page);
  desktopReads.push({ run, route: "/learn+palette", ...withPalette });
  if (!withPalette.palette) fail(`run ${run} palette missing`);
  else {
    if (withPalette.palette.x > 2 || withPalette.palette.width < 1430) {
      fail(`run ${run} palette ${JSON.stringify(withPalette.palette)}`);
    }
    if (withPalette.palette.bottom > 2) fail(`run ${run} palette not at bottom`);
    for (const group of withPalette.groups) {
      if (group.rows > 6) fail(`run ${run} group ${group.label} has ${group.rows}`);
    }
    console.log(`[1440 run ${run}] palette x=${withPalette.palette.x} width=${withPalette.palette.width} bottomGap=${withPalette.palette.bottom} groups=${JSON.stringify(withPalette.groups)}`);
  }
  await page.screenshot({ path: resolve(OUT, `v3-palette-1440-run${run}.png`), fullPage: false });
  await page.keyboard.press("Escape");
  const hiStatus = await openPage(page, "/learn/hi-doc");
  if (hiStatus !== 200) fail(`run ${run} /learn/hi-doc status ${hiStatus}`);
  const hi = await readLayout(page);
  desktopReads.push({ run, route: "/learn/hi-doc", ...hi });
  if (!hi.hiDoc.progress || !hi.hiDoc.status || !hi.hiDoc.next || !hi.hiDoc.path) {
    fail(`run ${run} hi doc guide ${JSON.stringify(hi.hiDoc)}`);
  }
  console.log(`[1440 run ${run}] /learn/hi-doc sidebar=${hi.sidebar} canvas=${hi.canvas} progress=${hi.hiDoc.progress} status=${hi.hiDoc.status} next=${hi.hiDoc.next} path=${hi.hiDoc.path}`);
  // v4（DESIGN_V4 §四/P1-6）：壳侧栏 280 → 264px
  if (hi.sidebar !== 264 || hi.canvas < 1440 * 0.7) {
    fail(`run ${run} hi doc shell ${hi.sidebar}/${hi.canvas}`);
  }
  await page.screenshot({ path: resolve(OUT, `v3-hidoc-1440-run${run}.png`), fullPage: false });
  if (errors.length > 0) fail(`run ${run} page errors ${errors.slice(0, 4).join(" | ")}`);
  await page.close();
}

const learnRuns = desktopReads.filter((read) => read.route === "/learn");
if (learnRuns.length === 2) {
  const [first, second] = learnRuns;
  if (first.sidebar !== second.sidebar || first.canvas !== second.canvas) {
    fail(`1440 runs disagree ${first.sidebar}/${first.canvas} vs ${second.sidebar}/${second.canvas}`);
  }
}

const narrow = await browser.newPage({ viewport: { width: 390, height: 844 } });
for (const path of NARROW_ROUTES) {
  const status = await openPage(narrow, path);
  const sample = await readLayout(narrow);
  if (status !== 200) fail(`390 ${path} status ${status}`);
  if (sample.overflow.scrollWidth !== sample.overflow.clientWidth || sample.overflow.clientWidth !== 390) {
    fail(`390 ${path} overflow ${sample.overflow.scrollWidth}/${sample.overflow.clientWidth}`);
  }
  const shellControls = sample.small.filter((item) => /导航|搜索|命令|主题|登录|下一步/.test(item.label));
  if (shellControls.length > 0) fail(`390 ${path} small controls ${JSON.stringify(shellControls)}`);
  console.log(`[390] ${path} scrollWidth=${sample.overflow.scrollWidth} clientWidth=${sample.overflow.clientWidth}`);
  if (path === "/learn") {
    await narrow.screenshot({ path: resolve(OUT, "v3-learn-390.png"), fullPage: false });
  }
}
await narrow.goto(`${BASE}/learn/hi-doc`, { waitUntil: "domcontentloaded", timeout: 60000 });
await narrow.screenshot({ path: resolve(OUT, "v3-hidoc-390.png"), fullPage: false });

await browser.close();
console.log(failures === 0 ? "V3 CHECK PASSED" : `V3 CHECK FAILED ${failures}`);
process.exit(failures === 0 ? 0 : 1);
