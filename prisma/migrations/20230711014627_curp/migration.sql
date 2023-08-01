/*
  Warnings:

  - Added the required column `curp` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matricule` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "curp" TEXT NOT NULL,
ADD COLUMN     "matricule" TEXT NOT NULL;
