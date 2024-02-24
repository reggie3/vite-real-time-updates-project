-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "assignee" TEXT DEFAULT '',
ADD COLUMN     "cost" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "creator" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "description" TEXT DEFAULT '',
ADD COLUMN     "location" TEXT DEFAULT '';
