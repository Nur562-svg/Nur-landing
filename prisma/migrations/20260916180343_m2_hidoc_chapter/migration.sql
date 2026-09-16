-- CreateTable
CREATE TABLE "HiDocChapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "textbookId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "pageStart" INTEGER NOT NULL,
    "pageEnd" INTEGER NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocChapter_textbookId_fkey" FOREIGN KEY ("textbookId") REFERENCES "HiDocTextbook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "HiDocChapter_textbookId_order_idx" ON "HiDocChapter"("textbookId", "order");
