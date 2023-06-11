/*
  Warnings:

  - Added the required column `year` to the `CheckRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckRoom" ADD COLUMN     "year" INTEGER NOT NULL;
