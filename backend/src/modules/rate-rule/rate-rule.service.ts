import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUpdateRateRuleDto } from "./dto/create-update-rate-rule.dto";

@Injectable()
export class RateRuleService {
  constructor(private readonly prismaService: PrismaService) { }

  async createRateRule(data: CreateUpdateRateRuleDto) {
    try {
      const rateRule = await this.prismaService.rateRule.create({
        data
      })

      return rateRule
    } catch (error) {
      console.error("An error ocurred while creating rateRule", error)
      throw new InternalServerErrorException("An error ocurred while creating rateRule")
    }
  }

  async updateRateRuleById(id: string, data: CreateUpdateRateRuleDto) {
    try {
      const rateRule = await this.prismaService.rateRule.update({
        where: { id },
        data
      })

      return rateRule
    } catch (error) {
      console.error("An error ocurred while updating rateRule with id", id, error)
      throw new InternalServerErrorException("An error ocurred while updating rateRule with id")
    }
  }

  async getRateRules(page: number) {
    try {
      
      const limit = 10
      const quantity = await this.prismaService.rateRule.count()
      const rateRules = await this.prismaService.rateRule.findMany({
        skip: (page - 1) * limit,
        take: limit
      })
      
      if (!rateRules) throw new NotFoundException("rateRule not found")

      return {
        rateRules,
        hasNext: quantity > page * limit 
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching rateRules", error)
      throw new InternalServerErrorException("An error ocurred while fetching rateRules")
    }
  }

  async getRateRuleById(id: string) {
    try {
      const rateRule = await this.prismaService.rateRule.findUnique({
        where: { id }
      })

      if (!rateRule) throw new BadRequestException("rateRule not found")

      return rateRule
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching rate rule with id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching rate rule with id")
    }
  }

  async deleteRateRuleById(id: string) {
    try {
      const rateRule = await this.prismaService.rateRule.delete({
        where: { id }
      })

      return rateRule
    } catch (error) {
      console.error("An error ocurred while deleting rateRule with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting rateRule with id")
    }
  }

  async deleteRateRuleByIdProperty(idProperty: string) {
    try {
      const rateRule = await this.prismaService.rateRule.deleteMany({
        where: { propertyId: idProperty }
      })

      return rateRule
    } catch (error) {
      console.error("An error ocurred while deleting rateRule with idProperty", idProperty, error)
      throw new InternalServerErrorException("An error ocurred while deleting rateRule with idProperty")
    }
  }
}