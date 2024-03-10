/*
  Warnings:

  - You are about to drop the column `transctionId` on the `Todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Todo_transctionId_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "transctionId",
ADD COLUMN     "transactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_transactionId_key" ON "Todo"("transactionId");
