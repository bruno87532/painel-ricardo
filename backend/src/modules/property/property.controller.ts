import { Controller, Post, UsePipes, ValidationPipe, Body, Put, Get, Param, Delete, HttpCode, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { CreateUpdatePropertyDto } from "./dto/create-update-property.dto";
import { GetPropertiesByIdsDto } from "./dto/get-properties-by-ids.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("property")
export class PropertyController {
  constructor (private readonly propertyService: PropertyService) {}
  
  @UseGuards(AuthGuard("jwt"))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createPropertty(@Body() data: CreateUpdatePropertyDto) {
    return await this.propertyService.createProperty(data)
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("/:id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updatePropertyById(@Body() data: CreateUpdatePropertyDto, @Param("id") id: string) {
    return await this.propertyService.updatePropertieById(id, data)    
  }

  @Get()
  async getProperties(@Query("page") page?: number) {
    return await this.propertyService.getProperties(page)
  }

  @Get("/:id")
  async getPropertyById(@Param("id") id: string) {
    return await this.propertyService.getPropertyById(id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:id")
  async deleteProperty(@Param("id") id: string) {
    return await this.propertyService.deletePropertyById(id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/ids")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getPropertiesByIds(@Body() data: GetPropertiesByIdsDto) {
    return await this.propertyService.getPropertiesByIds(data)
  }
}