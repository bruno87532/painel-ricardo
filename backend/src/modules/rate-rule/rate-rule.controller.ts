import { Controller, UsePipes, ValidationPipe, Post, Get, Put, Param, Body, Delete } from "@nestjs/common";
import { RateRuleService } from "./rate-rule.service";
import { CreateUpdateRateRuleDto } from "./dto/create-update-rate-rule.dto";

@Controller("rate-rule")
export class RateRuleController {
  constructor (private readonly rateRuleService: RateRuleService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createRateRule(@Body() data: CreateUpdateRateRuleDto) {
    return await this.rateRuleService.createRateRule(data)
  }

  @Get() 
  async getRateRules() {
    return await this.rateRuleService.getRateRules()
  }

  @Get("/:id")
  async getRateRuleById(@Param("id") id: string) {
    return await this.rateRuleService.getRateRuleById(id)
  }

  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateRateRuleById(@Body() data: CreateUpdateRateRuleDto, @Param("id") id: string) {
    return await this.rateRuleService.updateRateRuleById(id, data)
  }

  @Delete("/:id")
  async deleteRateRuleById(@Param("id") id: string) {
    return await this.rateRuleService.deleteRateRuleById(id)
  }
}