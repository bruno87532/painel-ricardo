/*
  Warnings:

  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Details" DROP CONSTRAINT "Details_propertyId_fkey";

-- DropTable
DROP TABLE "public"."Details";

-- CreateTable
CREATE TABLE "public"."Detail" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Detail" ADD CONSTRAINT "Detail_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
