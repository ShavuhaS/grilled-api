-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "published_version_id" TEXT;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_published_version_id_fkey" FOREIGN KEY ("published_version_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
