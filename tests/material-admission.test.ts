import { describe, it } from "node:test";
import assert from "node:assert";
import type { MaterialAdmissionRecord } from "@/types/material-admission";
import {
  validateMaterialAdmissionRecord,
  parseMaterialAdmissionStoreJson,
  createEmptyMaterialAdmissionStore,
} from "@/lib/material-admission";

const validSha256 = "a".repeat(64);

function createValidRecord(overrides: Partial<MaterialAdmissionRecord> = {}): MaterialAdmissionRecord {
  return {
    version: 1,
    id: "admission-test-1",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    status: "pending-review",
    sourceTrace: {
      intakeDraftId: "draft-1",
      intakeBatchId: "batch-1",
      candidateId: "candidate-1",
      overlayId: "overlay-1",
      courseId: "tcm-diagnostics",
      courseTitle: "中医诊断学",
      knowledgePointId: "kp-diet",
      knowledgePointTitle: "问饮食口味",
      chapterTitle: "问诊",
    },
    identity: {
      asset: {
        id: "local-asset-1",
        sha256: validSha256,
        byteSize: 1024,
        mediaType: "word",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        academicContentStatus: "available",
        transcriptionStatus: "native-text",
        integrityStatus: "pending-review",
        privacyRisk: "none-observed",
        publicationPolicy: "local-only",
        originalPathAliases: [],
      },
    },
    provenance: {
      sourceType: "study-note",
      declaredAuthority: "student",
      effectiveLayer: "learner-private",
      school: { status: "pending", value: null },
      teacher: { status: "pending", value: null },
      academicYear: { status: "declared", value: "2026" },
      semester: { status: "declared", value: "2" },
    },
    catalogCandidate: {
      sourceFamily: {
        id: "family-1",
        label: "测试来源",
        artifactIds: ["artifact-1"],
      },
      artifact: {
        id: "artifact-1",
        familyId: "family-1",
        assetId: "local-asset-1",
        label: "测试 artifact",
        versionKind: "original",
        derivationStatus: "not-applicable",
        derivedFromArtifactIds: [],
      },
      admissionScope: "local-candidate-only",
      materialCatalogMutation: "not-authorized",
    },
    acceptedTranscription: {
      status: "native-text",
      acceptance: "human-accepted-overlay",
      acceptedAt: "2026-08-01T00:00:00.000Z",
      parser: {
        id: "browser-docx-semantic-v1",
        library: "mammoth",
        libraryVersion: "1.12.0",
      },
      locators: [
        { id: "loc-1", artifactId: "artifact-1", kind: "docx-semantic-block", value: "0", label: "Block 0" },
      ],
      excerpts: [
        { id: "exc-1", blockId: "b-1", sectionId: "s-1", sectionTitle: "Section 1", kind: "paragraph", text: "测试摘录内容", locatorId: "loc-1" },
      ],
      pendingBodyStored: false,
      excludedBodyStored: false,
    },
    privacyPublication: {
      declaration: "none-observed",
      risk: "none-observed",
      publicationPolicy: "local-only",
      rawBinaryPersistence: "session-only-not-stored",
      absolutePathStored: false,
      fileHandleStored: false,
      originalFileNameStored: false,
    },
    conflictReview: {
      status: "none-observed",
      note: "未观察到冲突",
    },
    authorityReview: {
      status: "confirmed-learner-private-only",
      declaredAuthority: "student",
      effectiveAuthority: "learner-private",
      authorityElevationGranted: false,
      notice: "learner-private 确认",
    },
    rights: {
      courseBuilderUse: "not-authorized",
      modelTransfer: "not-authorized",
      publication: "not-authorized",
      courseRegistryWrite: "not-authorized",
    },
    review: {
      fileIdentityConfirmed: true,
      provenanceConfirmed: true,
      acceptedTranscriptionConfirmed: true,
      privacyPublicationConfirmed: true,
      sourceFamilyArtifactConfirmed: true,
      conflictDispositionConfirmed: true,
      learnerPrivateAuthorityConfirmed: true,
      independentRightsGateConfirmed: true,
      status: "confirmed",
      approvedAt: "2026-08-01T01:00:00.000Z",
    },
    notices: {
      candidateNotice: "候选通知",
      exportNotice: "导出通知",
    },
    ...overrides,
  };
}

describe("validateMaterialAdmissionRecord — positive path", () => {
  it("accepts a fully valid record", () => {
    const record = createValidRecord();
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, true, `Expected valid but got issues: ${result.issues.map((i) => `${i.code}: ${i.message}`).join("; ")}`);
    assert.strictEqual(result.readyForApproval, true);
  });
});

describe("validateMaterialAdmissionRecord — rejection paths", () => {
  it("rejects wrong version", () => {
    const record = createValidRecord({ version: 99 as never });
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-version"));
  });

  it("rejects invalid SHA-256", () => {
    const record = createValidRecord();
    record.identity.asset.sha256 = "not-a-valid-sha";
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-identity"));
  });

  it("rejects zero byteSize", () => {
    const record = createValidRecord();
    record.identity.asset.byteSize = 0;
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-identity"));
  });

  it("rejects non-learner-private effective layer", () => {
    const record = createValidRecord();
    (record.provenance as { effectiveLayer: string }).effectiveLayer = "school-official";
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-provenance"));
  });

  it("rejects catalog candidate with mismatched artifact references", () => {
    const record = createValidRecord();
    record.catalogCandidate.artifact.familyId = "wrong-family";
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-catalog-candidate"));
  });

  it("rejects empty excerpts", () => {
    const record = createValidRecord();
    record.acceptedTranscription.excerpts = [];
    record.acceptedTranscription.locators = [];
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-transcription"));
  });

  it("rejects pending-review conflict status", () => {
    const record = createValidRecord();
    record.conflictReview = { status: "pending-review", note: "" };
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "conflict-review-required"));
  });

  it("rejects authority elevation granted", () => {
    const record = createValidRecord();
    (record.authorityReview as { authorityElevationGranted: boolean }).authorityElevationGranted = true;
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "authority-review-required"));
  });

  it("rejects rights boundary violation", () => {
    const record = createValidRecord();
    (record.rights as { courseBuilderUse: string }).courseBuilderUse = "authorized";
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "rights-boundary-violated"));
  });

  it("rejects incomplete human review", () => {
    const record = createValidRecord();
    record.review.fileIdentityConfirmed = false;
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "human-review-required"));
  });

  it("rejects approved status without full review", () => {
    const record = createValidRecord({ status: "approved-as-local-candidate" });
    record.review.fileIdentityConfirmed = false;
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "human-review-required"));
  });

  it("rejects identifiable-person risk with non-local-only policy", () => {
    const record = createValidRecord();
    record.identity.asset.privacyRisk = "identifiable-person";
    record.privacyPublication.risk = "identifiable-person";
    (record.privacyPublication as { publicationPolicy: string }).publicationPolicy = "structured-excerpts-only";
    const result = validateMaterialAdmissionRecord(record);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.code === "invalid-privacy-publication"));
  });
});

describe("parseMaterialAdmissionStoreJson", () => {
  it("returns empty store for null input", () => {
    const store = parseMaterialAdmissionStoreJson(null);
    assert.strictEqual(store.records.length, 0);
    assert.strictEqual(store.version, 1);
  });

  it("returns empty store for invalid JSON", () => {
    const store = parseMaterialAdmissionStoreJson("not-json");
    assert.strictEqual(store.records.length, 0);
  });

  it("returns empty store for wrong version", () => {
    const store = parseMaterialAdmissionStoreJson(JSON.stringify({ version: 99, records: [] }));
    assert.strictEqual(store.records.length, 0);
  });

  it("returns empty store for records with pending-review status", () => {
    const record = createValidRecord({ status: "pending-review" });
    const store = parseMaterialAdmissionStoreJson(JSON.stringify({
      version: 1,
      records: [record],
    }));
    assert.strictEqual(store.records.length, 0);
  });
});

describe("createEmptyMaterialAdmissionStore", () => {
  it("creates a store with version 1 and empty records", () => {
    const store = createEmptyMaterialAdmissionStore();
    assert.strictEqual(store.version, 1);
    assert.strictEqual(store.records.length, 0);
  });
});
