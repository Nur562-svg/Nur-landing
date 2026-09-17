-- CreateTable
CREATE TABLE "HiDocWorkshop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocWorkshop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HiDocWorkshopFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workshopId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "hasTextLayer" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'uploaded',
    "ocrStatus" TEXT NOT NULL DEFAULT 'not-attempted',
    "failureReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocWorkshopFile_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "HiDocWorkshop" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HiDocConversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kpId" TEXT,
    "workshopId" TEXT,
    "messages" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HiDocConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HiDocConversation_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "HiDocWorkshop" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HiDocConversation" ("createdAt", "id", "kpId", "messages", "updatedAt", "userId") SELECT "createdAt", "id", "kpId", "messages", "updatedAt", "userId" FROM "HiDocConversation";
DROP TABLE "HiDocConversation";
ALTER TABLE "new_HiDocConversation" RENAME TO "HiDocConversation";
CREATE INDEX "HiDocConversation_userId_updatedAt_idx" ON "HiDocConversation"("userId", "updatedAt");
CREATE UNIQUE INDEX "HiDocConversation_userId_kpId_key" ON "HiDocConversation"("userId", "kpId");
CREATE UNIQUE INDEX "HiDocConversation_userId_workshopId_key" ON "HiDocConversation"("userId", "workshopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "HiDocWorkshop_userId_updatedAt_idx" ON "HiDocWorkshop"("userId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "HiDocWorkshopFile_storageKey_key" ON "HiDocWorkshopFile"("storageKey");

-- CreateIndex
CREATE INDEX "HiDocWorkshopFile_workshopId_idx" ON "HiDocWorkshopFile"("workshopId");
