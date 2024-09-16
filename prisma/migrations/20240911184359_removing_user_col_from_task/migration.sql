/*
  Warnings:

  - You are about to drop the column `projectId` on the `memberships` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `_MembershipToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MembershipToTask" DROP CONSTRAINT "_MembershipToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_MembershipToTask" DROP CONSTRAINT "_MembershipToTask_B_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_workspace_id_fkey";

-- AlterTable
ALTER TABLE "memberships" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "workspace_id",
ADD COLUMN     "membershipId" TEXT,
ADD COLUMN     "workspaceId" TEXT;

-- DropTable
DROP TABLE "_MembershipToTask";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
