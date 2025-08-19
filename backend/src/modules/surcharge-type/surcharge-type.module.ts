import { Module } from "@nestjs/common";
import { SurchargeTypeService } from "./surcharge-type.service";
import { PrismaModule } from "../prisma/prisma.module";
import { SurchargeModule } from "../surcharge/surcharge.module";

@Module({
  imports: [PrismaModule, SurchargeModule],
  providers: [SurchargeTypeService],
  exports: [SurchargeTypeService]
})
export class SurchargeTypeModule { }