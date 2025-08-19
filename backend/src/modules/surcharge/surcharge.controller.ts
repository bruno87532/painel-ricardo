import { Controller, Post, Get, UsePipes, ValidationPipe, Put, Delete, Param, Body } from "@nestjs/common";
import { SurchargeService } from "./surcharge.service";
import { CreateSurchargeDto } from "./dto/create-surcharge.dto";

@Controller("surcharge")
export class SurchargeController {
  constructor(private readonly surchargeService: SurchargeService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createSurcharge(@Body() data: CreateSurchargeDto) {
    return await this.surchargeService.createSurcharge(data)
  }

  @Get()
  async getSurchages() {
    return await this.surchargeService.getSurchages()
  }

  @Get("/:id")
  async getSurchageById(@Param("id") id: string) {
    return await this.surchargeService.getSurchargeById(id)
  }

  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateSurchargeById(@Body() data: CreateSurchargeDto, @Param("id") id: string) {
    return await this.surchargeService.updateSurchargeById(data, id)
  }

  @Delete("/:id")
  async deleteSurchargeById(@Param("id") id: string) {
    return await this.surchargeService.deleteSurchargeById(id)
  }
}