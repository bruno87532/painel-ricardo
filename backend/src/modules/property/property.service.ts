import { HttpException, Injectable, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUpdatePropertyDto } from "./dto/create-update-property.dto";
import { GetPropertiesByIdsDto } from "./dto/get-properties-by-ids.dto";
import { RateRuleService } from "../rate-rule/rate-rule.service";
import { SurchargeService } from "../surcharge/surcharge.service";
import { DetailService } from "../details/detail.service";
import { ImageService } from "../image/image.service";

@Injectable()
export class PropertyService {
  constructor(
    private readonly detailService: DetailService,
    private readonly prismaService: PrismaService,
    private readonly surchargeService: SurchargeService,
    private readonly rateRuleService: RateRuleService,
    private readonly imageService: ImageService,
  ) { }

  async createProperty(data: CreateUpdatePropertyDto) {
    try {
      const property = await this.prismaService.property.create({
        data
      })

      return property
    } catch (error) {
      console.error("An error ocurred while creating property with name", data.name, error)
      throw new InternalServerErrorException("An error ocurred while creating property with name")
    }
  }

  async getProperties(page?: number) {
    try {
      const limit = 12
      const quantity = page ? await this.prismaService.property.count() : 0
      const options: { skip?: number; take?: number } = page ? {
        skip: limit * (page - 1),
        take: limit
      } : {}
      const properties = await this.prismaService.property.findMany(options)

      if (!properties) throw new NotFoundException("Properties not found")

      return {
        properties,
        ...(page ? { quantity } : {}),
        ...(page ? { lastPage: Math.ceil(quantity / 12) } : {}),
        ...(page ? { hasNext: quantity > limit * page } : {})
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching all properties", error)
      throw new InternalServerErrorException("An error ocurred while fetching all properties")
    }
  }

  async updatePropertieById(id: string, data: CreateUpdatePropertyDto) {
    try {
      const property = await this.prismaService.property.update({
        where: { id },
        data
      })

      return property
    } catch (error) {
      console.error("An error ocurred while updating properties with id", id, error)
      throw new InternalServerErrorException("An error ocurred while updating properties with id")
    }
  }

  async deletePropertyById(id: string) {
    try {
      await this.rateRuleService.deleteRateRuleByIdProperty(id)
      await this.surchargeService.deleteSurchargeByIdProperty(id)
      await this.detailService.deleteDetailByIdProperty(id)
      await this.imageService.deleteImageByIdProperty(id)

      const property = await this.prismaService.property.delete({
        where: { id }
      })

      return property
    } catch (error) {
      console.error("An error ocurred while deleting property with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting property with id")
    }
  }

  async getPropertyById(id: string) {
    try {
      const property = await this.prismaService.property.findUnique({
        where: { id }
      })

      if (!property) throw new NotFoundException("Property not found")

      return property
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching property by id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching property by id")
    }
  }

  async getPropertiesByIds(data: GetPropertiesByIdsDto) {
    try {
      const properties = await this.prismaService.property.findMany({
        where: {
          id: {
            in: data.ids
          }
        }
      })

      if (!properties) throw new NotFoundException("property not found")

      return properties
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching properties with ids", data.ids, error)
      throw new InternalServerErrorException("An error ocurred while fetching properties with ids")
    }
  }
}