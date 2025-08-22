-- CreateTable
CREATE TABLE "public"."Details" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Details" ADD CONSTRAINT "Details_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
