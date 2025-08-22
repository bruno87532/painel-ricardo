import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUpdateDetailDto } from "./dto/create-update-detail.dto";

@Injectable()
export class DetailService {
  constructor(private readonly prismaService: PrismaService) { }

  async createDetail(data: CreateUpdateDetailDto) {
    try {
      const detail = await this.prismaService.detail.create({
        data
      })

      return detail
    } catch (error) {
      console.error("An error ocurred while creating detail", error)
      throw new InternalServerErrorException("An error ocurred while creating detail")
    }
  }

  async getDetailById(id: string) {
    try {
      const detail = await this.prismaService.detail.findUnique({
        where: { id }
      })

      if (!detail) throw new NotFoundException("Detail not found")

      return detail
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching detail with id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching detail with id")
    }
  }

  async updateDetailById(id: string, data: CreateUpdateDetailDto) {
    try {
      const detail = await this.prismaService.detail.update({
        where: { id },
        data
      })

      return detail
    } catch (error) {
      console.error("An error ocurred while updating detail with id", id, error)
      throw new InternalServerErrorException("An error ocurred while updating detail with id")
    }
  }

  async getDetails(page?: number) {
    try {
      const quantity = page ? await this.prismaService.detail.count() : 0
      const limit = 10

      const options: { skip?: number; take?: number } = page ? { skip: (page - 1) * limit, take: limit } : {}
      const details = await this.prismaService.detail.findMany(options)

      if (details.length === 0) throw new NotFoundException("Details not found")

      return {
        details,
        ...(page ? { hasNext: quantity > limit * page } : {})
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching details", error)
      throw new InternalServerErrorException("An error ocurred while fetching details")
    }
  }

  async deleteDetailById(id: string) {
    try {
      const detail = await this.prismaService.detail.delete({ where: { id } })

      return detail
    } catch (error) {
      console.error("An error ocurred while deleting detail with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting detail with id")
    }
  }

  async deleteDetailByIdProperty(idProperty: string) {
    try {
      const details = await this.prismaService.detail.deleteMany({ where: { propertyId: idProperty } })
    
      return details
    } catch (error) {
      console.error("An error ocurred whiile deleting details with idProperty", idProperty, error)
      throw new InternalServerErrorException("An error ocurred whiile deleting details with idProperty")
    }
  }
}