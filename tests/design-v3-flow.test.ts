import { createRequire } from "node:module";
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { crc32 } from "node:zlib";
import { register } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CLEW_STEPS, guideForStep, resolveClewGuide, type ClewStepId } from "@/lib/clew/step-guide";
import { readClewSource } from "@/lib/clew/source-intake";

register("./helpers/css-module-hooks.mjs", import.meta.url);

const STEP_NAMES = [
  "上传",
  "目录识别",
  "章节修正",
  "知识点萃取",
  "讲义生成 + 追问",
  "划重点/批注",
  "学霸笔记",
  "课题工作坊",
] as const;

function makePdf(stream: string): Uint8Array {
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    "2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj\n",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n",
    `4 0 obj << /Length ${Buffer.byteLength(stream)} >> stream\n${stream}\nendstream\nendobj\n`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
  ];
  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(body));
    body += object;
  }
  const xrefStart = Buffer.byteLength(body);
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    xref += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  return new Uint8Array(Buffer.from(body + xref, "latin1"));
}

function zipStore(files: readonly { name: string; data: Buffer }[]): Uint8Array {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const file of files) {
    const name = Buffer.from(file.name);
    const crc = crc32(file.data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(20, 6);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt32LE(crc >>> 0, 14);
    local.writeUInt32LE(file.data.length, 18);
    local.writeUInt32LE(file.data.length, 22);
    const localFull = Buffer.concat([local, name, file.data]);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(crc >>> 0, 16);
    central.writeUInt32LE(file.data.length, 20);
    central.writeUInt32LE(file.data.length, 24);
    central.writeUInt32LE(offset, 42);
    centrals.push(Buffer.concat([central, name]));
    locals.push(localFull);
    offset += localFull.length;
  }
  const centralDir = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDir.length, 12);
  end.writeUInt32LE(offset, 16);
  return new Uint8Array(Buffer.concat([...locals, centralDir, end]));
}

function makeDocx(paragraph: string): Uint8Array {
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body><w:p><w:r><w:t>${paragraph}</w:t></w:r></w:p></w:body>
</w:document>`;
  const types = `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
  return zipStore([
    { name: "[Content_Types].xml", data: Buffer.from(types) },
    { name: "_rels/.rels", data: Buffer.from(rels) },
    { name: "word/document.xml", data: Buffer.from(document) },
  ]);
}

describe("design system v3 Clew path and local parsers", () => {
  let guideHtml = "";

  before(async () => {
    await import("./helpers/css-module-stub.mjs");
    const guide = await import("../src/components/clew-path-guide");
    const sample = guideForStep("toc", { textbookId: "tb-1", chapterOrder: 1 });
    guideHtml = renderToStaticMarkup(React.createElement(guide.ClewPathGuide, { guide: sample }));
  });

  it("names all eight steps and gives each a next action, progress, status, and target", () => {
    assert.deepEqual(CLEW_STEPS.map((step) => step.name), [...STEP_NAMES]);
    const context = { textbookId: "tb-1", chapterOrder: 2, workshopId: "ws-1" };
    for (const step of CLEW_STEPS) {
      const guide = guideForStep(step.id as ClewStepId, context);
      assert.equal(guide.currentName, step.name);
      assert.deepEqual([...guide.steps], [...STEP_NAMES]);
      assert.ok(guide.nextAction.trim().length > 0);
      assert.ok(guide.statusHint.trim().length > 0);
      assert.equal(guide.progressMax, 8);
      assert.ok(guide.progressValue >= 1 && guide.progressValue <= 8);
      assert.match(guide.progressLabel, /^\d \/ 8$/);
      assert.equal(guide.nextControl, "下一步");
      assert.match(guide.nextHref, /^\//);
    }
    const emptyShelf = resolveClewGuide({ surface: "shelf", signedIn: true });
    assert.equal(emptyShelf.nextHref, "/learn/clew#upload");
    const shelfWithBook = resolveClewGuide({ surface: "shelf", signedIn: true, textbookId: "tb-9" });
    assert.equal(shelfWithBook.nextHref, "/learn/clew/t/tb-9#recognize");
    assert.equal(resolveClewGuide({ surface: "shelf", signedIn: false }).nextHref, "/login?next=/learn/clew");
    assert.match(guideHtml, /下一步/);
    // v4 安静进度线（DESIGN_V4 §四/P0-1）：2px 细线 + role=progressbar + 「教材路径」措辞，线尾保留下一步文字链
    assert.match(guideHtml, /role="progressbar"/);
    assert.match(guideHtml, /aria-label="教材路径进度"/);
    assert.match(guideHtml, /教材路径/);
    assert.match(guideHtml, /pathBarFill/);
    assert.match(guideHtml, /role="status"/);
    assert.equal(guideHtml.includes("可关联"), false);
    assert.equal(guideHtml.includes("不可直接等同"), false);
  });

  it("reads a text-layer PDF with pdf.js and a DOCX with mammoth, and refuses scans", async () => {
    const phrase = "Ariadne text layer sample for diagnostics";
    const pdf = await readClewSource(
      "sample.pdf",
      makePdf(`BT /F1 24 Tf 72 720 Td (${phrase}) Tj ET`),
    );
    assert.equal(pdf.ok, true);
    if (pdf.ok) {
      assert.equal(pdf.kind, "pdf");
      assert.ok(pdf.text.includes(phrase));
      assert.ok((pdf.pageCount ?? 0) >= 1);
    }

    const docxPhrase = "Ariadne docx sample spleen qi deficiency notes";
    const docx = await readClewSource("notes.docx", makeDocx(docxPhrase));
    assert.equal(docx.ok, true);
    if (docx.ok) {
      assert.equal(docx.kind, "docx");
      assert.equal(docx.pageCount, null);
      assert.ok(docx.text.includes(docxPhrase));
    }

    const scanned = await readClewSource("scan.pdf", makePdf(""));
    assert.equal(scanned.ok, false);
    if (!scanned.ok) {
      assert.equal(scanned.code, "unsupported-scan");
      assert.match(scanned.message, /扫描|文字层|图片/);
    }

    const imageDocx = await readClewSource("picture.docx", makeDocx(""));
    assert.equal(imageDocx.ok, false);
    if (!imageDocx.ok) {
      assert.equal(imageDocx.code, "unsupported-scan");
      assert.match(imageDocx.message, /扫描|图片|文字/);
    }

    const legacy = await readClewSource("old.doc", new Uint8Array([1, 2, 3, 4]));
    assert.equal(legacy.ok, false);
    if (!legacy.ok) {
      assert.equal(legacy.code, "invalid-file");
      assert.match(legacy.message, /\.doc/);
    }

    const image = await readClewSource("plate.png", new Uint8Array([137, 80, 78, 71]));
    assert.equal(image.ok, false);
    if (!image.ok) {
      assert.equal(image.code, "unsupported-scan");
      assert.match(image.message, /图片/);
    }
  });

  it("feeds a real DOCX into the lesson excerpt path and labels pages 页码待确认", async () => {
    const nodeRequire = createRequire(import.meta.url);
    const Module = nodeRequire("module") as { _resolveFilename: (...args: unknown[]) => string };
    const originalResolve = Module._resolveFilename;
    const stubPath = nodeRequire.resolve("./helpers/server-only-empty.cjs");
    Module._resolveFilename = function resolveServerOnly(request: unknown, ...rest: unknown[]) {
      if (request === "server-only") return stubPath;
      return originalResolve.call(this, request, ...rest);
    };
    const phrase = "Ariadne docx spleen qi deficiency lesson excerpt for the diagnostics textbook chapter";
    const { readClewKnowledgePointExcerpt } = await import("../src/lib/clew/source-excerpt");
    const { getClewStorage } = await import("../src/lib/clew/storage");
    const { buildClewStorageKey } = await import("../src/lib/clew/storage-key");
    const { buildHeuristicLesson } = await import("../src/lib/clew/lesson-heuristic");
    const { buildClewChatSystemPrompt } = await import("../src/lib/clew/chat-prompt");
    const { buildClewNoteHeader } = await import("../src/lib/clew/note-heuristic");
    const storage = getClewStorage();
    const storageKey = buildClewStorageKey("v3docxuser", "v3docxtb", "spleen.docx");
    await storage.putObject(storageKey, makeDocx(phrase));
    try {
      const excerpt = await readClewKnowledgePointExcerpt({
        storageKey,
        fileName: "spleen.docx",
        chapterTitle: "脾虚",
        sourcePage: 1,
        chapterPageStart: 1,
        chapterPageEnd: 1,
      });
      assert.equal(excerpt.ok, true);
      if (!excerpt.ok) return;
      assert.equal(excerpt.locatorLabel, "页码待确认");
      assert.deepEqual(excerpt.pages, []);
      assert.ok(excerpt.excerpt.includes(phrase));
      assert.equal(/第\s*1\s*页/.test(excerpt.excerpt), false);

      const lesson = buildHeuristicLesson({
        knowledgePoint: {
          title: "spleen qi deficiency",
          description: "脾失健运，清阳不升。",
          keyTerms: ["脾虚"],
          prerequisites: [],
          sourcePage: 1,
        },
        textbookTitle: "诊断学笔记",
        chapterTitle: "脾虚",
        sourceExcerpt: excerpt.excerpt,
        fileName: "spleen.docx",
        style: "zh-primary",
        generatedAtLabel: "2026-09-24 12:00",
      });
      assert.match(lesson, /页码待确认/);
      assert.ok(lesson.includes(phrase));
      assert.equal(/依据第\s*1\s*页/.test(lesson), false);

      const prompt = buildClewChatSystemPrompt({
        textbookTitle: "诊断学笔记",
        chapterTitle: "脾虚",
        knowledgePoint: {
          title: "spleen qi deficiency",
          description: "脾失健运，清阳不升。",
          keyTerms: [],
          prerequisites: [],
          sourcePage: 1,
        },
        chapterKnowledgePointTitles: ["spleen qi deficiency"],
        lessonMarkdown: null,
        sourceExcerpt: excerpt.excerpt,
        fileName: "spleen.docx",
        style: "zh-primary",
      });
      assert.match(prompt, /页码待确认/);
      assert.ok(prompt.includes(phrase));
      assert.equal(/第\s*1\s*页/.test(prompt), false);

      const note = buildClewNoteHeader({
        title: "脾虚 · 学霸笔记",
        generator: { kind: "heuristic" },
        generatedAtLabel: "2026-09-24 12:00",
        notice: "对照教材。",
        context: {
          textbookTitle: "诊断学笔记",
          chapterOrder: 1,
          chapterTotal: 1,
          chapterTitle: "脾虚",
          pageStart: 1,
          pageEnd: 1,
          fileName: "spleen.docx",
          points: [],
        },
      });
      assert.match(note, /页码待确认/);
      assert.equal(/第\s*1\s*页/.test(note), false);
    } finally {
      Module._resolveFilename = originalResolve;
      await storage.removeObject(storageKey);
    }
  });
});
