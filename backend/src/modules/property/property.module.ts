import { Module } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PropertyController } from "./property.controller";
import { RateRuleModule } from "../rate-rule/rate-rule.module";
import { SurchargeModule } from "../surcharge/surcharge.module";
import { DetailModule } from "../details/detail.module";
import { ImageModule } from "../image/image.module";

@Module({
  controllers: [PropertyController],
  imports: [
    ImageModule,
    PrismaModule,
    DetailModule,
    RateRuleModule,
    SurchargeModule
  ],
  providers: [PropertyService],
  exports: [PropertyService]
})
export class PropertyModule { }