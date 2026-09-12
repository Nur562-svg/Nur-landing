import { describe, it } from "node:test";
import assert from "node:assert";
import {
  applyLearnerIntakeDefaults,
  createEmptyMaterialIntakeDraft,
} from "@/lib/material-intake";

describe("applyLearnerIntakeDefaults", () => {
  it("marks a learner import as local-only and review-confirmed", () => {
    const next = applyLearnerIntakeDefaults(createEmptyMaterialIntakeDraft("course-1"));

    assert.equal(next.status, "eligible-for-course-builder");
    assert.equal(next.privacy.declaration, "none-observed");
    assert.equal(next.privacy.risk, "none-observed");
    assert.equal(next.privacy.publicationPolicy, "local-only");
    assert.equal(next.review.fileIdentityConfirmed, true);
    assert.equal(next.review.provenanceConfirmed, true);
    assert.equal(next.review.privacyPublicationConfirmed, true);
    assert.equal(next.review.noModelTransferConfirmed, true);
    assert.equal(next.review.status, "confirmed");
    assert.equal(typeof next.review.confirmedAt, "string");
  });
});
