-- DropForeignKey
ALTER TABLE "columns" DROP CONSTRAINT "columns_workspaceId_fkey";

-- AlterTable
ALTER TABLE "columns" ALTER COLUMN "workspaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "columns" ADD CONSTRAINT "columns_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
