import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { RateRuleService } from "./rate-rule.service";
import { RateRuleController } from "./rate-rule.controller";

@Module({
  imports: [PrismaModule],
  controllers: [RateRuleController],
  providers: [RateRuleService],
  exports: [RateRuleService]
})
export class RateRuleModule { }