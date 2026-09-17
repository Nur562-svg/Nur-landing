-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "membershipTier" TEXT NOT NULL DEFAULT 'free',
    "membershipExpiresAt" DATETIME,
    "emailVerifiedAt" DATETIME,
    "hiDocLessonStyle" TEXT NOT NULL DEFAULT 'zh-primary',
    "usage" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "displayName", "email", "emailVerifiedAt", "id", "membershipExpiresAt", "membershipTier", "passwordHash", "updatedAt", "usage") SELECT "createdAt", "displayName", "email", "emailVerifiedAt", "id", "membershipExpiresAt", "membershipTier", "passwordHash", "updatedAt", "usage" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
