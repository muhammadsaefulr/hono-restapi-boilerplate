/*
  Warnings:

  - You are about to drop the column `name` on the `userModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `userModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `userModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `userModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userModel" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "uuid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userModel_email_key" ON "userModel"("email");
