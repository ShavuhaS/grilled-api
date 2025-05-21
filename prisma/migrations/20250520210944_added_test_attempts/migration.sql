/*
  Warnings:

  - You are about to drop the `test_results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_choice_answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_question_answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "test_results" DROP CONSTRAINT "test_results_test_id_fkey";

-- DropForeignKey
ALTER TABLE "test_results" DROP CONSTRAINT "test_results_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_choice_answers" DROP CONSTRAINT "user_choice_answers_test_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "user_choice_answers" DROP CONSTRAINT "user_choice_answers_user_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "user_question_answers" DROP CONSTRAINT "user_question_answers_test_question_id_fkey";

-- DropForeignKey
ALTER TABLE "user_question_answers" DROP CONSTRAINT "user_question_answers_user_id_fkey";

-- DropTable
DROP TABLE "test_results";

-- DropTable
DROP TABLE "user_choice_answers";

-- DropTable
DROP TABLE "user_question_answers";

-- CreateTable
CREATE TABLE "test_attempts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "test_id" TEXT NOT NULL,
    "result" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_attempt_answers" (
    "id" TEXT NOT NULL,
    "test_attempt_id" TEXT NOT NULL,
    "test_question_id" TEXT NOT NULL,
    "answer" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_attempt_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_choice_answers" (
    "attempt_answer_id" TEXT NOT NULL,
    "test_answer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "test_attempts_user_id_test_id_key" ON "test_attempts"("user_id", "test_id");

-- CreateIndex
CREATE UNIQUE INDEX "test_attempt_answers_test_attempt_id_test_question_id_key" ON "test_attempt_answers"("test_attempt_id", "test_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "test_choice_answers_attempt_answer_id_test_answer_id_key" ON "test_choice_answers"("attempt_answer_id", "test_answer_id");

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "lesson_tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempt_answers" ADD CONSTRAINT "test_attempt_answers_test_attempt_id_fkey" FOREIGN KEY ("test_attempt_id") REFERENCES "test_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempt_answers" ADD CONSTRAINT "test_attempt_answers_test_question_id_fkey" FOREIGN KEY ("test_question_id") REFERENCES "test_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_choice_answers" ADD CONSTRAINT "test_choice_answers_attempt_answer_id_fkey" FOREIGN KEY ("attempt_answer_id") REFERENCES "test_attempt_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_choice_answers" ADD CONSTRAINT "test_choice_answers_test_answer_id_fkey" FOREIGN KEY ("test_answer_id") REFERENCES "test_question_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
