import { describe, it } from "node:test";
import assert from "node:assert";
import type { QuestionKind } from "@/types/learning";
import {
  filterQuestionBankItemsByKinds,
  orderQuestionBankItemsByKind,
  parseQuestionBankKindQuery,
  serializeQuestionBankKindQuery,
} from "@/lib/question-kind-labels";

function item(id: string, questionKind: QuestionKind) {
  return { id, questionKind };
}

describe("question bank kind order", () => {
  it("orders items A1 → B1 → B2 → fill → term → short-answer → case", () => {
    const ordered = orderQuestionBankItemsByKind([
      item("t", "term"),
      item("s", "short-answer"),
      item("a", "a1-single"),
      item("c", "case"),
      item("f", "fill"),
    ]);
    assert.deepEqual(ordered.map((entry) => entry.id), ["a", "f", "t", "s", "c"]);
  });

  it("keeps only selected kinds in that same order", () => {
    const filtered = filterQuestionBankItemsByKinds(
      [item("t", "term"), item("a", "a1-single"), item("s", "short-answer")],
      ["short-answer", "a1-single"],
    );
    assert.deepEqual(filtered.map((entry) => entry.id), ["a", "s"]);
  });

  it("serializes selected kinds in filter-chip order", () => {
    assert.equal(
      serializeQuestionBankKindQuery(new Set<QuestionKind>(["short-answer", "a1-single"])),
      "a1-single,short-answer",
    );
    assert.deepEqual(parseQuestionBankKindQuery("short-answer,a1-single"), ["short-answer", "a1-single"]);
    assert.deepEqual(parseQuestionBankKindQuery("nope,term"), ["term"]);
  });
});
