import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUpdateSurchargeDto } from "./dto/create-update-surcharge.dto";

@Injectable()
export class SurchargeService {
  constructor(private readonly prismaService: PrismaService) { }

  async getSurchages(page: number) {
    try {
      const limit = 12
      const quantity = await this.prismaService.surcharge.count()
      const surcharges = await this.prismaService.surcharge.findMany({
        skip: limit * (page - 1),
        take: limit
      })

      if (!surcharges) throw new NotFoundException("Surcharge not found")

      return {
        surcharges,
        ...(page ? { quantity } : {}),
        ...(page ? { lastPage: Math.ceil(quantity / 12) } : {}),
        ...(page ? { hasNext: quantity > limit * page } : {})
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching surcharges", error)
      throw new InternalServerErrorException("An error ocurred while fetching surcharges")
    }
  }

  async createSurcharge(data: CreateUpdateSurchargeDto) {
    try {
      const surcharge = await this.prismaService.surcharge.create({
        data
      })

      return surcharge
    } catch (error) {
      console.error("An error ocurred while creating surcharge", error)
      throw new InternalServerErrorException("An error ocurred while creating surcharge")
    }
  }

  async updateSurchargeById(data: CreateUpdateSurchargeDto, id: string) {
    try {
      const surcharge = await this.prismaService.surcharge.update({
        where: { id },
        data
      })

      return surcharge
    } catch (error) {
      console.error("An error ocurred while updating surcharge with id", id, error)
      throw new InternalServerErrorException("An error ocurred while updating surcharge with id")
    }
  }

  async deleteSurchargeById(id: string) {
    try {
      const surcharge = await this.prismaService.surcharge.delete({
        where: { id }
      })

      return surcharge
    } catch (error) {
      console.error("An error ocurred while deleting surcharge with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting surcharge with id")
    }
  }

  async getSurchargeById(id: string) {
    try {
      const surcharge = await this.prismaService.surcharge.findUnique({
        where: { id }
      })

      if (!surcharge) throw new NotFoundException("Surcharge not found")
      return surcharge
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching surcharge with id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching surcharge with id")
    }
  }

  async deleteSurchargeByIdSurchargeType(idSurchargeType: string) {
    try {
      const surcharges = await this.prismaService.surcharge.deleteMany({ where: { surchargeTypeId: idSurchargeType } })

      return surcharges
    } catch (error) {
      console.error("An error ocurred while deleting surcharge with idSurchargeType", idSurchargeType, error)
      throw new InternalServerErrorException("An error ocurred while deleting surcharge with idSurchargeType")
    }
  }

  async deleteSurchargeByIdProperty(idProperty: string) {
    try {
      const surcharge = await this.prismaService.surcharge.deleteMany({
        where: { propertyId: idProperty }
      })

      return surcharge
    } catch (error) {
      console.error("An error ocurred while deleting surcharge with idProperty", idProperty, error)
      throw new InternalServerErrorException("An error ocurred while deleting surcharge with idProperty")
    }
  }
}