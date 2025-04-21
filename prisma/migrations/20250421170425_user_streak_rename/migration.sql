/*
  Warnings:

  - You are about to drop the column `last_login` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `login_streak` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "last_login",
DROP COLUMN "login_streak",
ADD COLUMN     "last_learning" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "learning_streak" INTEGER NOT NULL DEFAULT 0;
