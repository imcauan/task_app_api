/*
  Warnings:

  - You are about to drop the column `striepSubscriptionId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "striepSubscriptionId",
ADD COLUMN     "stripeSubscriptionId" TEXT;
