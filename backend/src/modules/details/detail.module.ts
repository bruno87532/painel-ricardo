import { Module } from "@nestjs/common";
import { DetailService } from "./detail.service";
import { DetailController } from "./detail.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [DetailController],
  providers: [DetailService],
  exports: [DetailService]
})
export class DetailModule { }