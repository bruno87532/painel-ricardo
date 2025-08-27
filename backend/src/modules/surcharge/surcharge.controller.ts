import { Controller, Post, Get, UsePipes, ValidationPipe, Put, Delete, Param, Body, Query, UseGuards } from "@nestjs/common";
import { SurchargeService } from "./surcharge.service";
import { CreateUpdateSurchargeDto } from "./dto/create-update-surcharge.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("surcharge")
export class SurchargeController {
  constructor(private readonly surchargeService: SurchargeService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createSurcharge(@Body() data: CreateUpdateSurchargeDto) {
    return await this.surchargeService.createSurcharge(data)
  }

  @Get()
  async getSurchages(@Query("page") page: number) {
    return await this.surchargeService.getSurchages(page)
  }

  @Get("/:id")
  async getSurchageById(@Param("id") id: string) {
    return await this.surchargeService.getSurchargeById(id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateSurchargeById(@Body() data: CreateUpdateSurchargeDto, @Param("id") id: string) {
    return await this.surchargeService.updateSurchargeById(data, id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:id")
  async deleteSurchargeById(@Param("id") id: string) {
    return await this.surchargeService.deleteSurchargeById(id)
  }
}