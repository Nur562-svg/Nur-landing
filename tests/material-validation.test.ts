import { describe, it } from "node:test";
import assert from "node:assert";
import type { MaterialCatalog } from "@/types/learning";
import { validateMaterialCatalog } from "@/lib/material-validation";

function createMinimalCatalog(overrides: Partial<MaterialCatalog> = {}): MaterialCatalog {
  return {
    id: "test-catalog",
    assets: [
      {
        id: "asset-1",
        sha256: "a".repeat(64),
        byteSize: 1024,
        mediaType: "word",
        originalPathAliases: [{ intakeId: "intake-1", relativePath: "test.docx" }],
        academicContentStatus: "pending",
        transcriptionStatus: "native-text",
        integrityStatus: "intact",
        privacyRisk: "none-observed",
        publicationPolicy: "local-only",
      },
    ],
    families: [
      {
        id: "family-1",
        label: "Test Family",
        artifactIds: ["artifact-1"],
      },
    ],
    artifacts: [
      {
        id: "artifact-1",
        familyId: "family-1",
        assetId: "asset-1",
        label: "Test Artifact",
        versionKind: "original",
        derivationStatus: "not-applicable",
        derivedFromArtifactIds: [],
      },
    ],
    transcriptions: [],
    answerConflicts: [],
    ...overrides,
  };
}

describe("validateMaterialCatalog — positive path", () => {
  it("accepts a valid minimal catalog", () => {
    const result = validateMaterialCatalog(createMinimalCatalog());
    assert.strictEqual(result.valid, true, `Issues: ${result.issues.map((i) => `${i.path}: ${i.message}`).join("; ")}`);
  });
});

describe("validateMaterialCatalog — empty fields", () => {
  it("rejects empty catalog id", () => {
    const catalog = createMinimalCatalog({ id: "" });
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "id" && i.message.includes("empty")));
  });

  it("rejects empty assets array", () => {
    const catalog = createMinimalCatalog({ assets: [] });
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "assets" && i.message.includes("at least one")));
  });
});

describe("validateMaterialCatalog — SHA-256 validation", () => {
  it("rejects invalid SHA-256 hash", () => {
    const catalog = createMinimalCatalog();
    catalog.assets[0].sha256 = "not-a-valid-hash";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path.includes("sha256")));
  });

  it("rejects uppercase SHA-256 hash", () => {
    const catalog = createMinimalCatalog();
    catalog.assets[0].sha256 = "A".repeat(64);
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path.includes("sha256")));
  });
});

describe("validateMaterialCatalog — duplicate constraints", () => {
  it("rejects duplicate asset IDs", () => {
    const catalog = createMinimalCatalog({
      assets: [
        { id: "asset-1", sha256: "a".repeat(64), byteSize: 1024, mediaType: "word", originalPathAliases: [{ intakeId: "i1", relativePath: "a.docx" }], academicContentStatus: "pending", transcriptionStatus: "native-text", integrityStatus: "intact", privacyRisk: "none-observed", publicationPolicy: "local-only" },
        { id: "asset-1", sha256: "b".repeat(64), byteSize: 2048, mediaType: "word", originalPathAliases: [{ intakeId: "i2", relativePath: "b.docx" }], academicContentStatus: "pending", transcriptionStatus: "native-text", integrityStatus: "intact", privacyRisk: "none-observed", publicationPolicy: "local-only" },
      ],
    });
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "assets.id" && i.message.includes("duplicate")));
  });

  it("rejects duplicate asset SHA-256", () => {
    const catalog = createMinimalCatalog({
      assets: [
        { id: "asset-1", sha256: "a".repeat(64), byteSize: 1024, mediaType: "word", originalPathAliases: [{ intakeId: "i1", relativePath: "a.docx" }], academicContentStatus: "pending", transcriptionStatus: "native-text", integrityStatus: "intact", privacyRisk: "none-observed", publicationPolicy: "local-only" },
        { id: "asset-2", sha256: "a".repeat(64), byteSize: 2048, mediaType: "word", originalPathAliases: [{ intakeId: "i2", relativePath: "b.docx" }], academicContentStatus: "pending", transcriptionStatus: "native-text", integrityStatus: "intact", privacyRisk: "none-observed", publicationPolicy: "local-only" },
      ],
    });
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.path === "assets.sha256" && i.message.includes("duplicate")));
  });
});

describe("validateMaterialCatalog — cross-reference constraints", () => {
  it("rejects artifact referencing unknown asset", () => {
    const catalog = createMinimalCatalog();
    catalog.artifacts[0].assetId = "unknown-asset";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("unknown asset")));
  });

  it("rejects artifact referencing unknown family", () => {
    const catalog = createMinimalCatalog();
    catalog.artifacts[0].familyId = "unknown-family";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("unknown family")));
  });

  it("rejects family referencing unknown artifact", () => {
    const catalog = createMinimalCatalog();
    catalog.families[0].artifactIds = ["unknown-artifact"];
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("unknown artifact")));
  });
});

describe("validateMaterialCatalog — derivation constraints", () => {
  it("rejects self-referencing derivation", () => {
    const catalog = createMinimalCatalog();
    catalog.artifacts[0].derivedFromArtifactIds = ["artifact-1"];
    catalog.artifacts[0].versionKind = "derived";
    catalog.artifacts[0].derivationStatus = "declared";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("cannot reference itself")));
  });

  it("rejects derived artifact without parents", () => {
    const catalog = createMinimalCatalog();
    catalog.artifacts[0].versionKind = "derived";
    catalog.artifacts[0].derivationStatus = "declared";
    catalog.artifacts[0].derivedFromArtifactIds = [];
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("must retain their parents")));
  });

  it("rejects non-derived artifact with derived-from metadata", () => {
    const catalog = createMinimalCatalog();
    catalog.artifacts[0].versionKind = "original";
    catalog.artifacts[0].derivedFromArtifactIds = ["artifact-2"];
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("cannot contain derived-from")));
  });

  it("detects derivation cycles", () => {
    const catalog = createMinimalCatalog({
      artifacts: [
        { id: "art-1", familyId: "family-1", assetId: "asset-1", label: "A", versionKind: "derived", derivationStatus: "declared", derivedFromArtifactIds: ["art-2"] },
        { id: "art-2", familyId: "family-1", assetId: "asset-1", label: "B", versionKind: "derived", derivationStatus: "declared", derivedFromArtifactIds: ["art-1"] },
      ],
    });
    catalog.families[0].artifactIds = ["art-1", "art-2"];
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("derivation cycle")));
  });
});

describe("validateMaterialCatalog — privacy and publication", () => {
  it("rejects identifiable-person with non-local-only policy", () => {
    const catalog = createMinimalCatalog();
    catalog.assets[0].privacyRisk = "identifiable-person";
    catalog.assets[0].publicationPolicy = "approved";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("identifiable")));
  });

  it("rejects misfiled integrity with non-local-only policy", () => {
    const catalog = createMinimalCatalog();
    catalog.assets[0].integrityStatus = "misfiled";
    catalog.assets[0].publicationPolicy = "structured-excerpts-only";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("misfiled")));
  });

  it("rejects OCR content promoted to verified", () => {
    const catalog = createMinimalCatalog();
    catalog.assets[0].transcriptionStatus = "ocr-transcribed";
    catalog.assets[0].academicContentStatus = "verified";
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("unreviewed OCR")));
  });
});

describe("validateMaterialCatalog — family-artifact reciprocity", () => {
  it("rejects family missing a reciprocal artifact", () => {
    const catalog = createMinimalCatalog({
      artifacts: [
        { id: "art-1", familyId: "family-1", assetId: "asset-1", label: "A", versionKind: "original", derivationStatus: "not-applicable", derivedFromArtifactIds: [] },
        { id: "art-2", familyId: "family-1", assetId: "asset-1", label: "B", versionKind: "original", derivationStatus: "not-applicable", derivedFromArtifactIds: [] },
      ],
    });
    // Family only lists art-1, missing art-2
    catalog.families[0].artifactIds = ["art-1"];
    const result = validateMaterialCatalog(catalog);
    assert.strictEqual(result.valid, false);
    assert.ok(result.issues.some((i) => i.message.includes("missing family artifact")));
  });
});
