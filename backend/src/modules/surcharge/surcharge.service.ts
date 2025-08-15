import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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
}