-- CreateTable
CREATE TABLE "ClewStudySession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "textbookId" TEXT NOT NULL,
    "chapterId" TEXT,
    "kpId" TEXT,
    "profileId" TEXT NOT NULL,
    "currentStageIndex" INTEGER NOT NULL DEFAULT 0,
    "stageStates" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActiveAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    CONSTRAINT "ClewStudySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClewCompileCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textbookId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "progress" JSONB,
    "tocData" JSONB,
    "chapters" JSONB,
    "kpPackages" JSONB,
    "contentFingerprint" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ClewEvidenceAtom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textbookId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "contextBefore" TEXT,
    "contextAfter" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ClewKnowledgePointEvidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kpId" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "relevanceScore" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClewKnowledgePointEvidence_kpId_fkey" FOREIGN KEY ("kpId") REFERENCES "HiDocKnowledgePoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClewKnowledgePointEvidence_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "ClewEvidenceAtom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HiDocKnowledgePoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keyTerms" JSONB NOT NULL,
    "prerequisites" JSONB NOT NULL,
    "sourcePage" INTEGER NOT NULL,
    "loopProfileId" TEXT NOT NULL DEFAULT 'concept-mastery',
    "loopProfileAssignedBy" TEXT NOT NULL DEFAULT 'ai-suggested',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HiDocKnowledgePoint_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "HiDocChapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HiDocKnowledgePoint" ("chapterId", "createdAt", "description", "id", "keyTerms", "order", "prerequisites", "sourcePage", "title") SELECT "chapterId", "createdAt", "description", "id", "keyTerms", "order", "prerequisites", "sourcePage", "title" FROM "HiDocKnowledgePoint";
DROP TABLE "HiDocKnowledgePoint";
ALTER TABLE "new_HiDocKnowledgePoint" RENAME TO "HiDocKnowledgePoint";
CREATE INDEX "HiDocKnowledgePoint_chapterId_order_idx" ON "HiDocKnowledgePoint"("chapterId", "order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ClewStudySession_userId_status_idx" ON "ClewStudySession"("userId", "status");

-- CreateIndex
CREATE INDEX "ClewStudySession_userId_kpId_status_idx" ON "ClewStudySession"("userId", "kpId", "status");

-- CreateIndex
CREATE INDEX "ClewStudySession_userId_textbookId_idx" ON "ClewStudySession"("userId", "textbookId");

-- CreateIndex
CREATE UNIQUE INDEX "ClewCompileCache_textbookId_key" ON "ClewCompileCache"("textbookId");

-- CreateIndex
CREATE INDEX "ClewCompileCache_state_idx" ON "ClewCompileCache"("state");

-- CreateIndex
CREATE INDEX "ClewEvidenceAtom_textbookId_chapterId_idx" ON "ClewEvidenceAtom"("textbookId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "ClewEvidenceAtom_chapterId_pageNumber_key" ON "ClewEvidenceAtom"("chapterId", "pageNumber");

-- CreateIndex
CREATE INDEX "ClewKnowledgePointEvidence_kpId_idx" ON "ClewKnowledgePointEvidence"("kpId");

-- CreateIndex
CREATE UNIQUE INDEX "ClewKnowledgePointEvidence_kpId_evidenceId_key" ON "ClewKnowledgePointEvidence"("kpId", "evidenceId");
