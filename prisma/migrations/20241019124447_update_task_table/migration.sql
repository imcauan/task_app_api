/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_workspaceId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "workspaceId";
