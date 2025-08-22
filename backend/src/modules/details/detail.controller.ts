import { Controller, UsePipes, ValidationPipe, Post, Get, Delete, Put, Body, Param, Query } from "@nestjs/common";
import { DetailService } from "./detail.service";
import { CreateUpdateDetailDto } from "./dto/create-update-detail.dto";

@Controller("details")
export class DetailController {
  constructor (private readonly detailService: DetailService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createDetail(@Body() data: CreateUpdateDetailDto) {
    return await this.detailService.createDetail(data)
  }

  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateDetailById(@Body() data: CreateUpdateDetailDto, @Param("id") id: string) {
    return await this.detailService.updateDetailById(id, data)
  }

  @Delete("/:id")
  async deleteDetailById(@Param("id") id: string) {
    return await this.detailService.deleteDetailById(id)
  }

  @Get()
  async getDetails(@Query("page") page?: number) {
    return await this.detailService.getDetails(page)
  }

  @Get("/:id")
  async getDetailById(@Param("id") id: string) {
    return await this.detailService.getDetailById(id)
  }
}