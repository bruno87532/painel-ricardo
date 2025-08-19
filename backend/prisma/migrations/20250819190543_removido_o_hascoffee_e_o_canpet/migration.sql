/*
  Warnings:

  - You are about to drop the column `canPet` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `hasCoffee` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "canPet",
DROP COLUMN "hasCoffee";
