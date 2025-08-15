import { Module } from "@nestjs/common";
import { SurchargeService } from "./surcharge.service";
import { PrismaModule } from "../prisma/prisma.module";
import { SurchargeController } from "./surcharge.controller";

@Module({
  controllers: [SurchargeController],
  imports: [PrismaModule],
  providers: [SurchargeService],
  exports: [SurchargeService],
})
export class SurchargeModule { }