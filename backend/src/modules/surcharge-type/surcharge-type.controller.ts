import { UseGuards, Controller, UsePipes, ValidationPipe, Body, Post, Put, Param, Delete, Get, HttpCode, HttpStatus, Query } from "@nestjs/common"
import { SurchargeTypeService } from "./surcharge-type.service"
import { CreateUpdateSurchargeTypeDto } from "./dto/create-update-surcharge-type.dto"
import { GetSurchargeTypesByIdsDto } from "./dto/get-surcharge-types-by-ids.dto"
import { AuthGuard } from "@nestjs/passport"

@Controller("surcharge-type")
export class SurchargeTypeController {
  constructor(private readonly surchargeTypeService: SurchargeTypeService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createSurchargeType(@Body() data: CreateUpdateSurchargeTypeDto) {
    return await this.surchargeTypeService.createSurchargeType(data)
  }

  @Get("/:id")
  async getSurchargeTypeById(@Param("id") id: string) {
    return await this.surchargeTypeService.getSurchargeTypeById(id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateSurchargeType(@Body() data: CreateUpdateSurchargeTypeDto, @Param("id") id: string) {
    return await this.surchargeTypeService.updateSurchargeType(id, data)
  }

  @Get()
  async getSurchargeTypes(@Query("page") page?: number) {
    return await this.surchargeTypeService.getSurchargeTypes(page)
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:id")
  async deleteSurchargeType(@Param("id") id: string) {
    return await this.surchargeTypeService.deleteSurchargeType(id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/ids")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getPropertiesByIds(@Body() data: GetSurchargeTypesByIdsDto) {
    return await this.surchargeTypeService.getSurchargeTypesByIds(data)
  }
}