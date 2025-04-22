/*
  Warnings:

  - Added the required column `description` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "percentage" INTEGER NOT NULL;
