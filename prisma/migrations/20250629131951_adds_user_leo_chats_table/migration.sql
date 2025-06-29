-- CreateTable
CREATE TABLE "UserLeoChats" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "context" TEXT,

    CONSTRAINT "UserLeoChats_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE INDEX "UserLeoChats_userUid_idx" ON "UserLeoChats"("userUid");

-- CreateIndex
CREATE INDEX "UserLeoChats_createdAt_idx" ON "UserLeoChats"("createdAt");

-- AddForeignKey
ALTER TABLE "UserLeoChats" ADD CONSTRAINT "UserLeoChats_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE; 