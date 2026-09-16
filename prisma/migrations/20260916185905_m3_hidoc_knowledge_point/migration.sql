-- CreateTable
CREATE TABLE "HiDocKnowledgePoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keyTerms" JSONB NOT NULL,
    "prerequisites" JSONB NOT NULL,
    "sourcePage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HiDocKnowledgePoint_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "HiDocChapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "HiDocKnowledgePoint_chapterId_order_idx" ON "HiDocKnowledgePoint"("chapterId", "order");
