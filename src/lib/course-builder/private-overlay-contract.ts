import type {
  CourseBuildPrivateOverlayInput,
  PrivateMaterialAnalysisAuthorization,
  PrivateOverlayTransferAuthorization,
} from "@/types/course-builder";
import type { ReviewedMaterialOverlayDraft } from "@/types/material-parsing";

export const maximumPrivateOverlayExcerptCount = 80;
export const maximumPrivateOverlayCharacterCount = 40_000;

export function createPrivateOverlayBuildInput(
  overlay: ReviewedMaterialOverlayDraft,
): CourseBuildPrivateOverlayInput | null {
  if (overlay.privacy.declaration !== "none-observed"
    || overlay.privacy.risk !== "none-observed"
  ) {
    return null;
  }

  return {
    version: 1,
    overlayId: overlay.id,
    courseId: overlay.courseId,
    knowledgePointId: overlay.knowledgePointId,
    source: {
      sourceType: overlay.sourceCandidate.sourceType,
      declaredAuthority: overlay.sourceCandidate.declaredAuthority,
      layer: "learner-private",
      authorityReviewStatus: "pending-review",
    },
    privacy: {
      declaration: "none-observed",
      risk: "none-observed",
      publicationPolicy: overlay.privacy.publicationPolicy,
    },
    excerpts: overlay.excerpts.map((excerpt) => ({
      id: excerpt.id,
      sectionId: excerpt.sectionId,
      sectionTitle: excerpt.sectionTitle,
      kind: excerpt.kind,
      text: excerpt.text,
      locator: excerpt.locator,
    })),
  };
}

export function countPrivateOverlayCharacters(
  overlay: CourseBuildPrivateOverlayInput,
): number {
  return overlay.excerpts.reduce((total, excerpt) => total + excerpt.text.length, 0);
}

export function serializePrivateOverlayForDigest(
  overlay: CourseBuildPrivateOverlayInput,
): string {
  return JSON.stringify({
    version: overlay.version,
    overlayId: overlay.overlayId,
    courseId: overlay.courseId,
    knowledgePointId: overlay.knowledgePointId,
    source: overlay.source,
    privacy: overlay.privacy,
    excerpts: overlay.excerpts.map((excerpt) => ({
      id: excerpt.id,
      sectionId: excerpt.sectionId,
      sectionTitle: excerpt.sectionTitle,
      kind: excerpt.kind,
      text: excerpt.text,
      locator: excerpt.locator,
    })),
  });
}

export async function digestPrivateOverlay(
  overlay: CourseBuildPrivateOverlayInput,
): Promise<string> {
  const source = new TextEncoder().encode(serializePrivateOverlayForDigest(overlay));
  const digest = await globalThis.crypto.subtle.digest("SHA-256", source);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createPrivateOverlayTransferAuthorization(
  overlay: CourseBuildPrivateOverlayInput,
  provider: { id: "dashscope"; model: string },
): Promise<PrivateOverlayTransferAuthorization> {
  return {
    version: 1,
    id: `private-transfer-${globalThis.crypto.randomUUID()}`,
    overlayId: overlay.overlayId,
    provider: provider.id,
    model: provider.model,
    courseId: overlay.courseId,
    knowledgePointId: overlay.knowledgePointId,
    excerptCount: overlay.excerpts.length,
    characterCount: countPrivateOverlayCharacters(overlay),
    contentDigest: await digestPrivateOverlay(overlay),
    scope: "one-course-build",
    status: "explicit",
    grant: "authorized-once",
    authorizedAt: new Date().toISOString(),
  };
}

export async function createPrivateMaterialAnalysisAuthorization(
  overlay: CourseBuildPrivateOverlayInput,
  provider: { id: "dashscope"; model: string },
): Promise<PrivateMaterialAnalysisAuthorization> {
  return {
    version: 1,
    id: `private-analysis-${globalThis.crypto.randomUUID()}`,
    overlayId: overlay.overlayId,
    provider: provider.id,
    model: provider.model,
    courseId: overlay.courseId,
    knowledgePointId: overlay.knowledgePointId,
    excerptCount: overlay.excerpts.length,
    characterCount: countPrivateOverlayCharacters(overlay),
    contentDigest: await digestPrivateOverlay(overlay),
    scope: "one-private-analysis",
    status: "explicit",
    grant: "authorized-once",
    authorizedAt: new Date().toISOString(),
  };
}
