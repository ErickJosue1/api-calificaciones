-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_career_id_fkey";

-- CreateTable
CREATE TABLE "Period" (
    "id" SERIAL NOT NULL,
    "period" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "career_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
