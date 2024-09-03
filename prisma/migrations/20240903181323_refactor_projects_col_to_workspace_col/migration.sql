/*
  Warnings:

  - You are about to drop the column `project_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `_MembershipToProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspace_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MembershipToProject" DROP CONSTRAINT "_MembershipToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_MembershipToProject" DROP CONSTRAINT "_MembershipToProject_B_fkey";

-- DropForeignKey
ALTER TABLE "_MembershipToTask" DROP CONSTRAINT "_MembershipToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "membership" DROP CONSTRAINT "membership_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "project_id",
ADD COLUMN     "workspace_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MembershipToProject";

-- DropTable
DROP TABLE "membership";

-- DropTable
DROP TABLE "projects";

-- CreateTable
CREATE TABLE "memberships" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembershipToTask" ADD CONSTRAINT "_MembershipToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
