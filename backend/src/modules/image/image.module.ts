import { Module } from "@nestjs/common";
import { ImageService } from "./image.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ImageController } from "./image.controller";
import { GoogleDriveModule } from "../google-drive/google-drive.module";

@Module({
  controllers: [ImageController],
  imports: [
    PrismaModule,
    GoogleDriveModule
  ],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule { }