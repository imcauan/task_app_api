/*
  Warnings:

  - You are about to drop the `_UserToWorkspace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_B_fkey";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserToWorkspace";

-- CreateTable
CREATE TABLE "_WorkspaceMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkspaceMembers_AB_unique" ON "_WorkspaceMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkspaceMembers_B_index" ON "_WorkspaceMembers"("B");

-- AddForeignKey
ALTER TABLE "_WorkspaceMembers" ADD CONSTRAINT "_WorkspaceMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkspaceMembers" ADD CONSTRAINT "_WorkspaceMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
