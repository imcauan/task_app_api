/*
  Warnings:

  - Added the required column `title` to the `columns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "columns" ADD COLUMN     "title" TEXT NOT NULL;
