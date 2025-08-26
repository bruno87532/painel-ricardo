import { Controller, Post, UseInterceptors, UploadedFile, ValidationPipe, UsePipes, Body, Put, Param, Get, Query, Delete } from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateUpdateImageDto } from "./dto/create-update-image.dto";
import { ImageInterceptor } from "common/interceptor/image.interceptor";

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post()
  @UseInterceptors(ImageInterceptor("file"))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateUpdateImageDto
  ) {
    return await this.imageService.createImage(file, data)
  }

  @Put("/:id")
  @UseInterceptors(ImageInterceptor("file"))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateImageById(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateUpdateImageDto,
    @Param("id") id: string
  ) {
    return await this.imageService.updateImage(file, data, id)
  }

  @Get("/:id")
  async getImageById(@Param("id") id: string) {
    return await this.imageService.getImageById(id)
  }

  @Get() 
  async getImages(@Query("page") page?: number) {
    return await this.imageService.getImages(page)
  }

  @Delete("/:id")
  async deleteImageById(@Param("id") id: string) {
    return await this.imageService.deleteImageById(id)
  }
}