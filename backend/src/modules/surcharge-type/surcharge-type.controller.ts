import { Controller, UsePipes, ValidationPipe, Body, Post, Put, Param, Delete, Get } from "@nestjs/common"
import { SurchargeTypeService } from "./surcharge-type.service"
import { CreateUpdateSurchargeTypeDto } from "./dto/create-update-surcharge-type.dto"

@Controller("surcharge-type")
export class SurchargeTypeController {
  constructor (private readonly surchargeTypeService: SurchargeTypeService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createSurchargeType(@Body() data: CreateUpdateSurchargeTypeDto) {
    return await this.surchargeTypeService.createSurchargeType(data)
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateSurchargeType(@Body() data: CreateUpdateSurchargeTypeDto, @Param("id") id: string) {
    return await this.surchargeTypeService.updateSurchargeType(id, data)
  }

  @Get()
  async getSurchargeTypes() {
    return await this.surchargeTypeService.getSurchargeTypes()
  }

  @Delete()
  async deleteSurchargeType(@Param("id") id: string) {
    return await this.surchargeTypeService.deleteSurchargeType(id)
  }
}