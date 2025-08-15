import { IsString, IsBoolean, IsOptional, MinLength, Min, IsNumber } from "class-validator"
import { Type, Transform } from "class-transformer"

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string

  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  canPet: boolean

  @IsOptional()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  hasCoffee: boolean

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  baseCapacity: number
}