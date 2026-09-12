import { describe, it } from "node:test";
import assert from "node:assert";
import {
  matchQuestionBankFill,
  shouldRecordQuestionBankAttempt,
} from "@/lib/question-bank-written";

describe("matchQuestionBankFill", () => {
  it("treats whitespace as irrelevant", () => {
    assert.equal(matchQuestionBankFill(["75 次/分"], "75次/分"), true);
    assert.equal(matchQuestionBankFill(["75 次/分"], "  75 次/分  "), true);
  });

  it("ignores letter case", () => {
    assert.equal(matchQuestionBankFill(["NaCl"], "nacl"), true);
  });

  it("accepts slash and punctuation aliases inside one expected string", () => {
    assert.equal(matchQuestionBankFill(["75／75次/分"], "75"), true);
    assert.equal(matchQuestionBankFill(["75／75次/分"], "75次/分"), true);
    assert.equal(matchQuestionBankFill(["窦性心律;窦律"], "窦律"), true);
  });

  it("rejects a different answer", () => {
    assert.equal(matchQuestionBankFill(["75 次/分"], "40"), false);
  });

  it("rejects a blank draft", () => {
    assert.equal(matchQuestionBankFill(["75"], ""), false);
    assert.equal(matchQuestionBankFill(["75"], "   "), false);
  });
});

describe("shouldRecordQuestionBankAttempt", () => {
  it("records judged fill answers", () => {
    assert.equal(
      shouldRecordQuestionBankAttempt({
        hasChoices: false,
        questionKind: "fill",
        fillAnswerAvailable: true,
      }),
      true,
    );
  });

  it("does not record fill when no reference exists", () => {
    assert.equal(
      shouldRecordQuestionBankAttempt({
        hasChoices: false,
        questionKind: "fill",
        fillAnswerAvailable: false,
      }),
      false,
    );
  });

  it("does not record term or short-answer into the question-bank attempt store", () => {
    assert.equal(
      shouldRecordQuestionBankAttempt({
        hasChoices: false,
        questionKind: "term",
        fillAnswerAvailable: false,
      }),
      false,
    );
    assert.equal(
      shouldRecordQuestionBankAttempt({
        hasChoices: false,
        questionKind: "short-answer",
        fillAnswerAvailable: false,
      }),
      false,
    );
  });

  it("records choice questions", () => {
    assert.equal(
      shouldRecordQuestionBankAttempt({
        hasChoices: true,
        questionKind: "a1-single",
        fillAnswerAvailable: false,
      }),
      true,
    );
  });
});
