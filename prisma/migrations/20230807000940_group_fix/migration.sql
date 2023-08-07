-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_groupID_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "groupID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
