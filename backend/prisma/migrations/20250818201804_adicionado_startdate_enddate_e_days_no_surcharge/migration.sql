-- AlterTable
ALTER TABLE "public"."Surcharge" ADD COLUMN     "days" "public"."typeDay"[],
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);
