import { describe, it } from "node:test";
import assert from "node:assert";
import { pdfPageItemsToParagraphs } from "@/lib/pdf-local-parser";

describe("pdf text layer paragraphization", () => {
  it("joins soft line wraps and splits blank lines into paragraphs", () => {
    const paragraphs = pdfPageItemsToParagraphs([
      { str: "1. 静息心率", hasEOL: true },
      { str: "约为", hasEOL: false },
      { str: "75 次", hasEOL: true },
      { str: "", hasEOL: true },
      { str: "A. 40", hasEOL: true },
      { str: "B. 75", hasEOL: true },
    ]);
    assert.deepEqual(paragraphs, [
      "1. 静息心率 约为75 次",
      "A. 40 B. 75",
    ]);
  });

  it("ignores non-string items", () => {
    assert.deepEqual(pdfPageItemsToParagraphs([{ hasEOL: true }, { str: "题干", hasEOL: true }]), ["题干"]);
  });
});
