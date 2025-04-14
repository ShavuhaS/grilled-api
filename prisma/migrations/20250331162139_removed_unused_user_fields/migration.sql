/*
  Warnings:

  - You are about to drop the column `middle_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "middle_name",
DROP COLUMN "sex";
