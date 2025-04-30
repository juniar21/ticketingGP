/*
  Warnings:

  - Made the column `referral` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "referral" SET NOT NULL;
