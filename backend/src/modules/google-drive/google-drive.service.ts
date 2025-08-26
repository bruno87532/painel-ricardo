import { Injectable, Inject, InternalServerErrorException, BadRequestException, HttpException } from "@nestjs/common";
import { drive_v3 } from "googleapis";
import { Readable } from "stream";
import { ConfigService } from "@nestjs/config";
import { runInThisContext } from "vm";

@Injectable()
export class GoogleDriveService {
  constructor(
    @Inject("DRIVE_CLIENT") private readonly driveClient: drive_v3.Drive,
    private readonly configService: ConfigService
  ) { }

  async uploadImage(file: Express.Multer.File): Promise<{
    id: string
  }> {
    const parent = this.configService.get<string>("GOOGLE_FOLDER")
    if (!parent) throw new BadRequestException("Parent is required")
    try {
      const stream = Readable.from(file.buffer)
      const res = await this.driveClient.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          parents: [parent]
        },
        media: {
          mimeType: file.mimetype,
          body: stream
        }
      })

      if (!res.data.id) throw new BadRequestException("Id is required")

      return {
        id: res.data.id
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while uploading the image to google drive", error)
      throw new InternalServerErrorException("An error ocurred while uploading the image to google drive")
    }
  }

  async makePublicFile(id: string) {
    try {
      const res = await this.driveClient.permissions.create({
        fileId: id,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      })
    } catch (error) {
      console.error("An error ocurred while leaving public file in the google drive", error)
      throw new InternalServerErrorException("An error ocurred while leaving public file in the google drive")
    }
  }

  async deleteFile(id: string) {
    try {
      await this.driveClient.files.delete({
        fileId: id
      })
    } catch (error) {
      console.error("An error ocurred while deleting file from drive with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting file from drive with id")
    }
  }

  async getImageFromDriveById(id: string) {
    try {
      const res = await this.driveClient.files.get({
        fileId: id,
        alt: "media",
        fields: "name, mimeType"
      }, { responseType: "stream" })

      const [fileName, mimeType] = await this.getMetaDataFromDriveById(id)
      const stream = res.data
      const buffer = await this.streamToBuffer(stream)

      return { buffer: buffer.toString('base64'), fileName, mimeType }
    } catch (error) {
      console.error("An error ocurred while downloading image from drive")
      throw new InternalServerErrorException("An error ocurred while downloading image from drive")
    }
  }

  private async getMetaDataFromDriveById(id: string) {
    try {
      const res = await this.driveClient.files.get({
        fileId: id,
        fields: "name, mimeType"
      })

      const fileName = res.data.name ?? "image"
      const mimeType = res.data.mimeType ?? "application/octet-stream"

      return [fileName, mimeType]
    } catch (error) {
      console.error("An error ocurred while fetching metadatas from drive")
      throw new InternalServerErrorException("An error ocurred while downloading image from drive")
    }
  }

  private async streamToBuffer(stream: Readable) {
    const chunks: Uint8Array[] = []

    for await (const chunk of stream) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
    }

    return Buffer.concat(chunks)
  }
}