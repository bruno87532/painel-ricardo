import { HttpException, Injectable, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";

@Injectable()
export class PropertyService {
  constructor(private readonly prismaService: PrismaService) { }

  async createProperty(data: CreatePropertyDto) {
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

  async getProperties() {
    try {
      const properties = await this.prismaService.property.findMany({})

      if (!properties) throw new NotFoundException("Properties not found")

      return properties
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching all properties", error)
      throw new InternalServerErrorException("An error ocurred while fetching all properties")
    }
  }

  async updatePropertieById(id: string, data: UpdatePropertyDto) {
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
      const property = await this.prismaService.property.delete({
        where: { id }
      })

      return property
    } catch (error) {
      console.error("An error ocurred while deleting property with id", id, error)
      throw new InternalServerErrorException("An error ocurred while deleting property with id")
    }
  }
}