import { Module } from "@nestjs/common";
import { SurchargeTypeService } from "./surcharge-type.service";
import { PrismaModule } from "../prisma/prisma.module";
import { SurchargeModule } from "../surcharge/surcharge.module";
import { SurchargeTypeController } from "./surcharge-type.controller";

@Module({
  imports: [PrismaModule, SurchargeModule],
  providers: [SurchargeTypeService],
  exports: [SurchargeTypeService],
  controllers: [SurchargeTypeController]
})
export class SurchargeTypeModule { }