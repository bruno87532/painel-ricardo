import { Controller, Post, UsePipes, ValidationPipe, Body, Patch, Get, Param, Delete } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";

@Controller("property")
export class PropertyController {
  constructor (private readonly propertyService: PropertyService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createPropertty(@Body() data: CreatePropertyDto) {
    return await this.propertyService.createProperty(data)
  }

  @Patch("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateProperty(@Body() data: UpdatePropertyDto, @Param("id") id: string) {
    return await this.propertyService.updatePropertieById(id, data)    
  }

  @Get()
  async getProperties() {
    return await this.propertyService.getProperties()
  }

  @Delete("/:id")
  async deleteProperty(@Param("id") id: string) {
    return await this.propertyService.deletePropertyById(id)
  }
}