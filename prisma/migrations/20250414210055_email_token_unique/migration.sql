/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `verify_email_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verify_email_tokens_token_key" ON "verify_email_tokens"("token");
