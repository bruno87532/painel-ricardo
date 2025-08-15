import { Module } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { PrismaModule } from "../prisma/prisma.module";
import { PropertyController } from "./property.controller";

@Module({
  controllers: [PropertyController],
  imports: [PrismaModule],
  providers: [PropertyService],
  exports: [PropertyService]
})
export class PropertyModule { }