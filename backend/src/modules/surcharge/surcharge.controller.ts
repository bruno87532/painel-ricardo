import { Controller, Post, Get, UsePipes, ValidationPipe, Patch, Delete, Param, Body } from "@nestjs/common";
import { SurchargeService } from "./surcharge.service";
import { CreateSurchargeDto } from "./dto/create-surcharge.dto";
import { UpdateSurchargeDto } from "./dto/update-surcharge.dto";

@Controller("surcharge")
export class SurchargeController {
  constructor(private readonly surchargeService: SurchargeService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createSurcharge(@Body() data: CreateSurchargeDto) {
  }

  @Get()
  async getSurchages() {
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateSurchargeById(@Body() data: UpdateSurchargeDto, @Param("id") id: string) {
  }

  @Delete("/:id")
  async deleteSurchargeById(@Param("id") id: string) {
  }
}