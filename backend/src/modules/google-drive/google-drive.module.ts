import { google } from "googleapis"
import { Module } from "@nestjs/common"
import { GoogleDriveService } from "./google-drive.service"
import { ConfigService } from "@nestjs/config"
import { GoogleDriveController } from "./google-drive.controller"

@Module({
  providers: [
    GoogleDriveService,
    {
      provide: "DRIVE_CLIENT",
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: configService.get<string>("GOOGLE_CLIENT_EMAIL"),
            private_key: configService.get<string>("GOOGLE_PRIVATE_KEY")?.split(String.raw`\n`).join("\n"),
          },
          scopes: ["https://www.googleapis.com/auth/drive"]
        })
        return google.drive({ version: "v3", auth })
      }
    }
  ],
  exports: [GoogleDriveService],
  controllers: [GoogleDriveController]
})
export class GoogleDriveModule { }