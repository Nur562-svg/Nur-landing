import type {
  MaterialCatalog,
  MaterialArtifact,
  SourceReference,
} from "@/types/learning";

export type MaterialValidationIssue = {
  path: string;
  message: string;
};

export type MaterialValidationResult = {
  valid: boolean;
  issues: readonly MaterialValidationIssue[];
};

const sha256Pattern = /^[a-f0-9]{64}$/;

function addIssue(
  issues: MaterialValidationIssue[],
  path: string,
  message: string,
) {
  issues.push({ path, message });
}

function validateNonEmpty(
  value: string,
  issues: MaterialValidationIssue[],
  path: string,
) {
  if (value.trim().length === 0) {
    addIssue(issues, path, "must not be empty");
  }
}

function validateUnique(
  values: readonly string[],
  issues: MaterialValidationIssue[],
  path: string,
) {
  const seen = new Set<string>();
  values.forEach((value) => {
    if (seen.has(value)) {
      addIssue(issues, path, `contains duplicate value: ${value}`);
    }
    seen.add(value);
  });
}

function findArtifactAsset(
  catalog: MaterialCatalog,
  artifact: MaterialArtifact,
) {
  return catalog.assets.find((asset) => asset.id === artifact.assetId);
}

function validateDerivationGraph(
  catalog: MaterialCatalog,
  issues: MaterialValidationIssue[],
) {
  const artifactsById = new Map(
    catalog.artifacts.map((artifact) => [artifact.id, artifact]),
  );

  function visit(
    artifactId: string,
    visiting: Set<string>,
    visited: Set<string>,
  ) {
    if (visiting.has(artifactId)) {
      addIssue(issues, "artifacts.derivedFromArtifactIds", `contains a derivation cycle at: ${artifactId}`);
      return;
    }
    if (visited.has(artifactId)) {
      return;
    }

    visiting.add(artifactId);
    const artifact = artifactsById.get(artifactId);
    artifact?.derivedFromArtifactIds.forEach((parentId) => {
      visit(parentId, visiting, visited);
    });
    visiting.delete(artifactId);
    visited.add(artifactId);
  }

  const visited = new Set<string>();
  catalog.artifacts.forEach((artifact) => {
    visit(artifact.id, new Set<string>(), visited);
  });
}

export function validateMaterialCatalog(
  catalog: MaterialCatalog,
): MaterialValidationResult {
  const issues: MaterialValidationIssue[] = [];

  validateNonEmpty(catalog.id, issues, "id");
  if (catalog.assets.length === 0) {
    addIssue(issues, "assets", "must contain at least one material asset");
  }

  validateUnique(catalog.assets.map((asset) => asset.id), issues, "assets.id");
  validateUnique(catalog.assets.map((asset) => asset.sha256), issues, "assets.sha256");
  validateUnique(catalog.families.map((family) => family.id), issues, "families.id");
  validateUnique(catalog.artifacts.map((artifact) => artifact.id), issues, "artifacts.id");
  validateUnique(
    catalog.assets.flatMap((asset) => asset.originalPathAliases.map((alias) => alias.intakeId)),
    issues,
    "assets.originalPathAliases.intakeId",
  );
  validateUnique(
    catalog.assets.flatMap((asset) => asset.originalPathAliases.map((alias) => alias.relativePath)),
    issues,
    "assets.originalPathAliases.relativePath",
  );

  const knownAssetIds = new Set(catalog.assets.map((asset) => asset.id));
  const knownFamilyIds = new Set(catalog.families.map((family) => family.id));
  const knownArtifactIds = new Set(catalog.artifacts.map((artifact) => artifact.id));

  catalog.assets.forEach((asset, assetIndex) => {
    const path = `assets[${assetIndex}]`;
    if (!sha256Pattern.test(asset.sha256)) {
      addIssue(issues, `${path}.sha256`, "must be a lowercase 64-character SHA-256");
    }
    if (!Number.isInteger(asset.byteSize) || asset.byteSize < 1) {
      addIssue(issues, `${path}.byteSize`, "must be a positive integer");
    }
    if (asset.originalPathAliases.length === 0) {
      addIssue(issues, `${path}.originalPathAliases`, "must retain at least one original path alias");
    }
    asset.originalPathAliases.forEach((alias, aliasIndex) => {
      validateNonEmpty(alias.intakeId, issues, `${path}.originalPathAliases[${aliasIndex}].intakeId`);
      validateNonEmpty(alias.relativePath, issues, `${path}.originalPathAliases[${aliasIndex}].relativePath`);
    });

    if (
      (asset.transcriptionStatus === "ocr-pending"
        || asset.transcriptionStatus === "ocr-transcribed")
      && asset.academicContentStatus === "verified"
    ) {
      addIssue(
        issues,
        `${path}.academicContentStatus`,
        "unreviewed OCR cannot be upgraded to verified academic content",
      );
    }
    if (
      asset.integrityStatus === "tracked-changes"
      && asset.academicContentStatus === "verified"
    ) {
      addIssue(
        issues,
        `${path}.academicContentStatus`,
        "tracked changes must be resolved before academic content can be verified",
      );
    }
    if (
      asset.privacyRisk === "identifiable-person"
      && asset.publicationPolicy !== "local-only"
    ) {
      addIssue(
        issues,
        `${path}.publicationPolicy`,
        "assets with identifiable people must remain local-only",
      );
    }
    if (
      asset.integrityStatus === "misfiled"
      && asset.publicationPolicy !== "local-only"
    ) {
      addIssue(
        issues,
        `${path}.publicationPolicy`,
        "misfiled assets must remain local-only until resolved",
      );
    }
    if (
      asset.publicationPolicy === "approved"
      && (asset.privacyRisk !== "none-observed"
        || asset.integrityStatus !== "intact"
        || asset.transcriptionStatus === "ocr-pending"
        || asset.transcriptionStatus === "ocr-transcribed")
    ) {
      addIssue(
        issues,
        `${path}.publicationPolicy`,
        "approved publication requires intact, privacy-safe, reviewed content",
      );
    }
  });

  catalog.artifacts.forEach((artifact, artifactIndex) => {
    const path = `artifacts[${artifactIndex}]`;
    validateNonEmpty(artifact.label, issues, `${path}.label`);
    if (!knownAssetIds.has(artifact.assetId)) {
      addIssue(issues, `${path}.assetId`, `references unknown asset: ${artifact.assetId}`);
    }
    if (!knownFamilyIds.has(artifact.familyId)) {
      addIssue(issues, `${path}.familyId`, `references unknown family: ${artifact.familyId}`);
    }
    validateUnique(artifact.derivedFromArtifactIds, issues, `${path}.derivedFromArtifactIds`);
    artifact.derivedFromArtifactIds.forEach((parentId) => {
      if (!knownArtifactIds.has(parentId)) {
        addIssue(issues, `${path}.derivedFromArtifactIds`, `references unknown artifact: ${parentId}`);
      }
      if (parentId === artifact.id) {
        addIssue(issues, `${path}.derivedFromArtifactIds`, "cannot reference itself");
      }
    });

    if (artifact.versionKind === "derived") {
      if (artifact.derivedFromArtifactIds.length === 0) {
        addIssue(issues, `${path}.derivedFromArtifactIds`, "derived artifacts must retain their parents");
      }
      if (artifact.derivationStatus === "not-applicable") {
        addIssue(issues, `${path}.derivationStatus`, "derived artifacts must declare derivation confidence");
      }
    } else if (
      artifact.derivedFromArtifactIds.length > 0
      || artifact.derivationStatus !== "not-applicable"
    ) {
      addIssue(
        issues,
        path,
        "non-derived artifacts cannot contain derived-from metadata",
      );
    }

    const asset = findArtifactAsset(catalog, artifact);
    if (
      artifact.versionKind === "tracked-revision"
      && asset?.integrityStatus !== "tracked-changes"
    ) {
      addIssue(
        issues,
        `${path}.versionKind`,
        "tracked revisions must resolve to an asset with tracked changes",
      );
    }
  });

  catalog.families.forEach((family, familyIndex) => {
    const path = `families[${familyIndex}]`;
    validateNonEmpty(family.label, issues, `${path}.label`);
    if (family.artifactIds.length === 0) {
      addIssue(issues, `${path}.artifactIds`, "must contain at least one artifact");
    }
    validateUnique(family.artifactIds, issues, `${path}.artifactIds`);
    family.artifactIds.forEach((artifactId) => {
      const artifact = catalog.artifacts.find((item) => item.id === artifactId);
      if (!artifact) {
        addIssue(issues, `${path}.artifactIds`, `references unknown artifact: ${artifactId}`);
      } else if (artifact.familyId !== family.id) {
        addIssue(issues, `${path}.artifactIds`, `artifact belongs to another family: ${artifactId}`);
      }
    });

    const reciprocalIds = catalog.artifacts
      .filter((artifact) => artifact.familyId === family.id)
      .map((artifact) => artifact.id);
    reciprocalIds.forEach((artifactId) => {
      if (!family.artifactIds.includes(artifactId)) {
        addIssue(issues, `${path}.artifactIds`, `is missing family artifact: ${artifactId}`);
      }
    });
  });

  validateDerivationGraph(catalog, issues);

  validateUnique(
    catalog.transcriptions.map((transcription) => transcription.id),
    issues,
    "transcriptions.id",
  );
  catalog.transcriptions.forEach((transcription, transcriptionIndex) => {
    const path = `transcriptions[${transcriptionIndex}]`;
    validateNonEmpty(transcription.notice, issues, `${path}.notice`);
    const artifact = catalog.artifacts.find(
      (item) => item.id === transcription.artifactId,
    );
    if (!artifact) {
      addIssue(issues, `${path}.artifactId`, `references unknown artifact: ${transcription.artifactId}`);
    } else {
      const asset = findArtifactAsset(catalog, artifact);
      if (asset?.transcriptionStatus !== transcription.status) {
        addIssue(
          issues,
          `${path}.status`,
          "must match the underlying material asset transcription state",
        );
      }
    }
    if (
      transcription.status === "ocr-transcribed"
      && transcription.academicContentStatus === "verified"
    ) {
      addIssue(
        issues,
        `${path}.academicContentStatus`,
        "unreviewed OCR transcription cannot be verified academic content",
      );
    }
    if (transcription.locators.length === 0) {
      addIssue(issues, `${path}.locators`, "must retain at least one OCR region locator");
    }
    validateUnique(transcription.locators.map((locator) => locator.id), issues, `${path}.locators.id`);
    transcription.locators.forEach((locator, locatorIndex) => {
      const locatorPath = `${path}.locators[${locatorIndex}]`;
      if (locator.artifactId !== transcription.artifactId) {
        addIssue(issues, `${locatorPath}.artifactId`, "must match the transcription artifact");
      }
      if (locator.kind !== "ocr-region") {
        addIssue(issues, `${locatorPath}.kind`, "transcription locators must use ocr-region");
      }
      validateNonEmpty(locator.value, issues, `${locatorPath}.value`);
      validateNonEmpty(locator.label, issues, `${locatorPath}.label`);
    });
  });

  validateUnique(
    catalog.answerConflicts.map((conflict) => conflict.id),
    issues,
    "answerConflicts.id",
  );
  catalog.answerConflicts.forEach((conflict, conflictIndex) => {
    const path = `answerConflicts[${conflictIndex}]`;
    validateNonEmpty(conflict.prompt, issues, `${path}.prompt`);
    validateNonEmpty(conflict.notice, issues, `${path}.notice`);
    if (conflict.variants.length < 2) {
      addIssue(issues, `${path}.variants`, "must retain at least two conflicting variants");
    }
    validateUnique(conflict.variants.map((variant) => variant.id), issues, `${path}.variants.id`);
    validateUnique(conflict.locators.map((locator) => locator.id), issues, `${path}.locators.id`);
    conflict.locators.forEach((locator, locatorIndex) => {
      validateNonEmpty(locator.value, issues, `${path}.locators[${locatorIndex}].value`);
      validateNonEmpty(locator.label, issues, `${path}.locators[${locatorIndex}].label`);
      if (!knownArtifactIds.has(locator.artifactId)) {
        addIssue(issues, `${path}.locators[${locatorIndex}].artifactId`, `references unknown artifact: ${locator.artifactId}`);
      }
    });

    const normalizedAnswers = new Set<string>();
    conflict.variants.forEach((variant, variantIndex) => {
      const variantPath = `${path}.variants[${variantIndex}]`;
      validateNonEmpty(variant.label, issues, `${variantPath}.label`);
      if (variant.confidence === "verified") {
        addIssue(
          issues,
          `${variantPath}.confidence`,
          "unresolved conflict variants cannot be verified",
        );
      }
      if (variant.content.length === 0) {
        addIssue(issues, `${variantPath}.content`, "must contain answer content");
      }
      variant.content.forEach((content, contentIndex) => {
        validateNonEmpty(content, issues, `${variantPath}.content[${contentIndex}]`);
      });
      const normalized = variant.content.join("\n").trim();
      if (normalizedAnswers.has(normalized)) {
        addIssue(issues, `${path}.variants`, "must contain genuinely different answer variants");
      }
      normalizedAnswers.add(normalized);
      if (variant.sourceArtifactIds.length === 0) {
        addIssue(issues, `${variantPath}.sourceArtifactIds`, "must retain answer provenance");
      }
      validateUnique(variant.sourceArtifactIds, issues, `${variantPath}.sourceArtifactIds`);
      variant.sourceArtifactIds.forEach((artifactId) => {
        if (!knownArtifactIds.has(artifactId)) {
          addIssue(issues, `${variantPath}.sourceArtifactIds`, `references unknown artifact: ${artifactId}`);
        }
      });
    });
  });

  return { valid: issues.length === 0, issues };
}

export function validateSourceMaterialReferences(
  source: SourceReference,
  catalog: MaterialCatalog,
): MaterialValidationResult {
  const issues: MaterialValidationIssue[] = [];
  const artifactIds = source.materialArtifactIds ?? [];
  const locators = source.locators ?? [];
  const knownArtifactIds = new Set(catalog.artifacts.map((artifact) => artifact.id));

  validateUnique(artifactIds, issues, "materialArtifactIds");
  validateUnique(locators.map((locator) => locator.id), issues, "locators.id");
  artifactIds.forEach((artifactId) => {
    if (!knownArtifactIds.has(artifactId)) {
      addIssue(issues, "materialArtifactIds", `references unknown artifact: ${artifactId}`);
    }
  });

  locators.forEach((locator, locatorIndex) => {
    const path = `locators[${locatorIndex}]`;
    validateNonEmpty(locator.value, issues, `${path}.value`);
    validateNonEmpty(locator.label, issues, `${path}.label`);
    const artifact = catalog.artifacts.find((item) => item.id === locator.artifactId);
    if (!artifact) {
      addIssue(issues, `${path}.artifactId`, `references unknown artifact: ${locator.artifactId}`);
      return;
    }
    if (artifactIds.length > 0 && !artifactIds.includes(locator.artifactId)) {
      addIssue(issues, `${path}.artifactId`, "must also appear in materialArtifactIds");
    }
    if (locator.kind === "ocr-region") {
      const asset = findArtifactAsset(catalog, artifact);
      if (
        asset?.transcriptionStatus !== "ocr-transcribed"
        && asset?.transcriptionStatus !== "ocr-reviewed"
      ) {
        addIssue(issues, `${path}.kind`, "OCR locators must resolve to an OCR transcription asset");
      }
      if (source.status === "verified" && asset?.transcriptionStatus !== "ocr-reviewed") {
        addIssue(issues, `${path}.kind`, "unreviewed OCR cannot support a verified source");
      }
    }
  });

  return { valid: issues.length === 0, issues };
}

function assertValidationResult(
  label: string,
  result: MaterialValidationResult,
) {
  if (result.valid) {
    return;
  }
  const details = result.issues
    .map((issue) => `- ${issue.path}: ${issue.message}`)
    .join("\n");
  throw new Error(`${label} validation failed:\n${details}`);
}

export function assertValidMaterialCatalog(catalog: MaterialCatalog) {
  assertValidationResult(catalog.id, validateMaterialCatalog(catalog));
}
