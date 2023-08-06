/*
  Warnings:

  - You are about to drop the column `career_id` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `Criteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CriteriaGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `careerId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `period` on the `Subject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CriteriaGrade" DROP CONSTRAINT "CriteriaGrade_criteria_id_fkey";

-- DropForeignKey
ALTER TABLE "CriteriaGrade" DROP CONSTRAINT "CriteriaGrade_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_career_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_user_id_fkey";

-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_userId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "career_id",
DROP COLUMN "user_id",
ADD COLUMN     "careerId" INTEGER NOT NULL,
DROP COLUMN "period",
ADD COLUMN     "period" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Criteria";

-- DropTable
DROP TABLE "CriteriaGrade";

-- DropTable
DROP TABLE "scores";

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "grade1" DOUBLE PRECISION NOT NULL,
    "grade2" DOUBLE PRECISION NOT NULL,
    "grade3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
