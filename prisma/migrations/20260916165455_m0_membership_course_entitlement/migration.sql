-- CreateTable
CREATE TABLE "CourseEntitlement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "grantedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CourseEntitlement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "CourseEntitlement_userId_grantedAt_idx" ON "CourseEntitlement"("userId", "grantedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CourseEntitlement_userId_courseId_key" ON "CourseEntitlement"("userId", "courseId");

-- M0 数据兼容：旧 lite 会员/订单统一迁移为 basic。
UPDATE "User" SET "membershipTier" = 'basic' WHERE "membershipTier" = 'lite';
UPDATE "Order" SET "tier" = 'basic' WHERE "tier" = 'lite';
UPDATE "Order" SET "planId" = 'basic-' || substr("planId", 6) WHERE "planId" LIKE 'lite-%';
