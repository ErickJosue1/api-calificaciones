-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'TEACHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role";
