import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSurchargeDto } from "./dto/create-surcharge.dto";
import { UpdateSurchargeDto } from "./dto/update-surcharge.dto";

@Injectable()
export class SurchargeService {
  constructor(private readonly prismaService: PrismaService) { }

  async getSurchages() {
    try {
      const surcharges = await this.prismaService.surcharge.findMany({})

      if (!surcharges) throw new NotFoundException("Surcharge not found")

      return surcharges
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching surcharges", error)
      throw new InternalServerErrorException("An error ocurred while fetching surcharges")
    }
  }

  async createSurcharge(data: CreateSurchargeDto) {
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

  async updateSurchargeById(data: UpdateSurchargeDto, id: string) {
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
}