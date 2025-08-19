/*
  Warnings:

  - You are about to drop the column `kind` on the `Surcharge` table. All the data in the column will be lost.
  - Added the required column `surchargeTypeId` to the `Surcharge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Surcharge" DROP COLUMN "kind",
ADD COLUMN     "surchargeTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."SurchargeType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SurchargeType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Surcharge" ADD CONSTRAINT "Surcharge_surchargeTypeId_fkey" FOREIGN KEY ("surchargeTypeId") REFERENCES "public"."SurchargeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
