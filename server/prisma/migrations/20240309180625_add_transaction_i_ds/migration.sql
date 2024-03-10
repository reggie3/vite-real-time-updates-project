/*
  Warnings:

  - A unique constraint covering the columns `[transctionId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "transctionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_transctionId_key" ON "Todo"("transctionId");
