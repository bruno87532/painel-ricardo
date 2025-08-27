import { Injectable, InternalServerErrorException, HttpException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GoogleDriveService } from "../google-drive/google-drive.service";
import { CreateUpdateImageDto } from "./dto/create-update-image.dto";

@Injectable()
export class ImageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleDriveService: GoogleDriveService
  ) { }

  async createImage(file: Express.Multer.File, data: CreateUpdateImageDto) {
    try {
      const res = await this.googleDriveService.uploadImage(file)
      await this.googleDriveService.makePublicFile(res.id)
      const image = await this.prismaService.image.create({
        data: {
          idDrive: res.id,
          ...data
        }
      })
      return image
    } catch (error) {
      console.error("An error ocurred while creating image", error)
      throw new InternalServerErrorException("An error ocurred while creating image")
    }
  }

  async updateImage(file: Express.Multer.File, data: CreateUpdateImageDto, id: string) {
    try {
      const image = await this.getImageById(id)
      await this.googleDriveService.deleteFile(image.idDrive)
      const res = await this.googleDriveService.uploadImage(file)
      await this.googleDriveService.makePublicFile(res.id)
      const updatedImage = await this.prismaService.image.update({
        where: { id },
        data: {
          idDrive: res.id,
          propertyId: data.propertyId,
          description: data.description
        }
      })
      return updatedImage
    } catch (error) {
      console.error("An error ocurred while updating image with id", id, error)
      throw new InternalServerErrorException("An error ocurred while updating image with id")
    }
  }

  async getImageById(id: string) {
    try {
      const image = await this.prismaService.image.findUnique({
        where: { id }
      })

      if (!image) throw new NotFoundException("Image not found")

      return image
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching image with id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching image with id")
    }
  }

  async getImages(page?: number) {
    try {
      const quantity = page ? await this.prismaService.image.count() : 0
      const limit = 12
      const options: { skip?: number; take?: number } = page ? {
        skip: (page - 1) * limit,
        take: limit
      } : {}

      const images = await this.prismaService.image.findMany(options)

      if (images.length === 0) throw new NotFoundException("Image not found")

      return {
        images,
        ...(page ? { quantity } : {}),
        ...(page ? { lastPage: Math.ceil(quantity / 12) } : {}),
        ...(page ? { hasNext: quantity > limit * page } : {})
      }
    } catch (error) {
      console.error("An error ocurred while fetching images", error)
      throw new InternalServerErrorException("An error ocurred while fetching images")
    }
  }

  async deleteImageById(id: string) {
    try {
      const image = await this.getImageById(id)
      await this.googleDriveService.deleteFile(image.idDrive)
      const deletedImage = await this.prismaService.image.delete({
        where: { id }
      })

      return deletedImage
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while deleting image with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting image with id")
    }
  }

  async deleteImageByIdProperty(idProperty: string) {
    try {
      const images = await this.prismaService.image.deleteMany({
        where: {
          propertyId: idProperty
        }
      })

      return images
    } catch (error) {
      console.error("An error ocurred while deleting image with idProperty", idProperty, error)
      throw new InternalServerErrorException("An error ocurred while deleting image with idProperty")
    }
  }
}