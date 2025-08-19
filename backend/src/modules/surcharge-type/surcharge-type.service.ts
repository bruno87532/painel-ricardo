import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUpdateSurchargeTypeDto } from "./dto/create-update-surcharge-type.dto";
import { SurchargeService } from "../surcharge/surcharge.service";

@Injectable()
export class SurchargeTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly surchargeService: SurchargeService
  ) { }

  async createSurchargeType(data: CreateUpdateSurchargeTypeDto) {
    try {
      const surchargeType = await this.prismaService.surchargeType.create({
        data
      })

      return surchargeType
    } catch (error) {
      console.error("An error ocurred while creating surchargeType", error)
      throw new InternalServerErrorException("An error ocurred while creating surchargeType")
    }
  }

  async updateSurchargeType(id: string, data: CreateUpdateSurchargeTypeDto) {
    try {
      const surchargeType = await this.prismaService.surchargeType.update({
        where: { id },
        data
      })

      return surchargeType
    } catch (error) {
      console.error("An error ocurred while updating surchargeType with id", id, error)
      throw new InternalServerErrorException("An error ocurred while updating surchargeType with id")
    }
  }

  async getSurchargeTypes() {
    try {
      const surchargeTypes = await this.prismaService.surchargeType.findMany({})

      if (surchargeTypes.length === 0) throw new NotFoundException("surchargeTypes not found")

      return surchargeTypes
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching surchargeTypes", error)
      throw new InternalServerErrorException("An error ocurred while fetching surchargeTypes")
    }
  }

  async getSurchargeTypeById(id: string) {
    try {
      const surchargeType = await this.prismaService.surchargeType.findUnique({
        where: { id }
      })
      if (!surchargeType) throw new NotFoundException("surchargeType not found")

      return surchargeType
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching surchargeType with id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching surchargeType with id")
    }
  }

  async deleteSurchargeType(id: string) {
    try {
      await this.surchargeService.deleteSurchargeByIdSurchargeType(id)
      const surchargeType = await this.prismaService.surchargeType.delete({ where: { id } })

      return surchargeType
    } catch (error) {
      console.error("An error ocurred while deleting surchargeType with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting surchargeType with id")
    }
  }
}