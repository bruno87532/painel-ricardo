import { Controller, UsePipes, ValidationPipe, Post, Get, Patch, Param, Body, Delete } from "@nestjs/common";
import { RateRuleService } from "./rate-rule.service";
import { CreateRateRuleDto } from "./dto/create-rate-rule.dto";
import { UpdateRateRuleDto } from "./dto/update-rate-rule.dto";

@Controller("rate-rule")
export class RateRuleController {
  constructor (private readonly rateRuleService: RateRuleService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createRateRule(@Body() data: CreateRateRuleDto) {
    return await this.rateRuleService.createRateRule(data)
  }

  @Get() 
  async getRateRules() {
    return await this.rateRuleService.getRateRules()
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateRateRuleById(@Body() data: UpdateRateRuleDto, @Param("id") id: string) {
    return await this.rateRuleService.updateRateRuleById(id, data)
  }

  @Delete("/:id")
  async deleteRateRuleById(@Param("id") id: string) {
    return await this.rateRuleService.deleteRateRuleById(id)
  }
}