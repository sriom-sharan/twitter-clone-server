/*
  Warnings:

  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "otp";

-- CreateTable
CREATE TABLE "OTP" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_user_key" ON "OTP"("user");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
