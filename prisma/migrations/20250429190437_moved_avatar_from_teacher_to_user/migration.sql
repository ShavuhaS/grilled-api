/*
  Warnings:

  - You are about to drop the column `avatar` on the `teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT;
