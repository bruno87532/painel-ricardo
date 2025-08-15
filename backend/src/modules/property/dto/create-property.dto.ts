import { IsString, IsDefined, IsBoolean, IsNotEmpty, MinLength, Min, IsNumber } from "class-validator"
import { Type, Transform } from "class-transformer"

export class CreatePropertyDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @IsDefined()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  canPet: boolean

  @IsDefined()
  @Transform(({ value }) => value === "true" || value === true)
  @IsBoolean()
  hasCoffee: boolean

  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  baseCapacity: number
}