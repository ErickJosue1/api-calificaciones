/*
  Warnings:

  - The primary key for the `scores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `scores` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `scores` table. All the data in the column will be lost.
  - You are about to drop the `Period` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectId` to the `scores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `scores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Period" DROP CONSTRAINT "Period_career_id_fkey";

-- DropForeignKey
ALTER TABLE "Period" DROP CONSTRAINT "Period_subject_id_fkey";

-- AlterTable
ALTER TABLE "scores" DROP CONSTRAINT "scores_pkey",
DROP COLUMN "id",
DROP COLUMN "subject",
ADD COLUMN     "subjectId" INTEGER NOT NULL,
ADD COLUMN     "teacherId" INTEGER NOT NULL,
ADD CONSTRAINT "scores_pkey" PRIMARY KEY ("subjectId", "teacherId", "userId");

-- DropTable
DROP TABLE "Period";

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
