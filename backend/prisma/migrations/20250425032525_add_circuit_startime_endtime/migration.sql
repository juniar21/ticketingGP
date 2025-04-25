-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "circuit" TEXT,
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3);
