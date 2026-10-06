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
    "sourcePageAnnotated" BOOLEAN NOT NULL DEFAULT false,
    "loopProfileId" TEXT NOT NULL DEFAULT 'concept-mastery',
    "loopProfileAssignedBy" TEXT NOT NULL DEFAULT 'ai-suggested',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HiDocKnowledgePoint_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "HiDocChapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HiDocKnowledgePoint" ("chapterId", "createdAt", "description", "id", "keyTerms", "loopProfileAssignedBy", "loopProfileId", "order", "prerequisites", "sourcePage", "title") SELECT "chapterId", "createdAt", "description", "id", "keyTerms", "loopProfileAssignedBy", "loopProfileId", "order", "prerequisites", "sourcePage", "title" FROM "HiDocKnowledgePoint";
DROP TABLE "HiDocKnowledgePoint";
ALTER TABLE "new_HiDocKnowledgePoint" RENAME TO "HiDocKnowledgePoint";
CREATE INDEX "HiDocKnowledgePoint_chapterId_order_idx" ON "HiDocKnowledgePoint"("chapterId", "order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
