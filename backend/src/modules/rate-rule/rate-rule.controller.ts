import { Controller, UsePipes, ValidationPipe, Post, Get, Put, Param, Body, Delete, Query, UseGuards } from "@nestjs/common";
import { RateRuleService } from "./rate-rule.service";
import { CreateUpdateRateRuleDto } from "./dto/create-update-rate-rule.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("rate-rule")
export class RateRuleController {
  constructor(private readonly rateRuleService: RateRuleService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createRateRule(@Body() data: CreateUpdateRateRuleDto) {
    return await this.rateRuleService.createRateRule(data)
  }

  @Get()
  async getRateRules(@Query("page") page?: number) {
    return await this.rateRuleService.getRateRules(page)
  }

  @Get("/:id")
  async getRateRuleById(@Param("id") id: string) {
    return await this.rateRuleService.getRateRuleById(id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateRateRuleById(@Body() data: CreateUpdateRateRuleDto, @Param("id") id: string) {
    return await this.rateRuleService.updateRateRuleById(id, data)
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:id")
  async deleteRateRuleById(@Param("id") id: string) {
    return await this.rateRuleService.deleteRateRuleById(id)
  }
}